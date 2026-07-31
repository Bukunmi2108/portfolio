/**
 * Integration test: main.ts must find every mount point in the real
 * index.html. Lives in its own file because importing main.ts runs its
 * module side effects once.
 */

import { readFileSync } from "node:fs";
import { expect, it, vi } from "vitest";
import { WORK_HASH_PREFIX } from "./render";
import {
  certifications,
  contactLinks,
  education,
  experience,
  heroLinks,
  openToWork,
  projects,
} from "./content";
import { renderOpenToWork } from "./render";

it("main.ts mounts all content into the real index.html", async () => {
  const html = readFileSync("index.html", "utf8");
  document.body.innerHTML = html
    .slice(html.indexOf("<body>") + "<body>".length, html.indexOf("</body>"))
    // Strip script tags so happy-dom doesn't try to fetch them.
    .replace(/<script[\s\S]*?<\/script>/g, "");

  await import("./main");

  expect(document.querySelectorAll("#hero-links a")).toHaveLength(heroLinks.length);
  expect(document.getElementById("about-copy")?.children.length).toBeGreaterThan(0);
  expect(document.querySelectorAll("#project-list .project-card")).toHaveLength(projects.length);
  // One detail dialog per project, all closed until the hash names one.
  const dialogs = [...document.querySelectorAll<HTMLDialogElement>("#project-dialogs dialog.pd")];
  expect(dialogs).toHaveLength(projects.length);
  expect(dialogs.map((d) => d.id)).toEqual(projects.map((p) => `pd-${p.slug}`));
  expect(dialogs.some((d) => d.open)).toBe(false);
  expect(document.querySelectorAll("#experience-list .xp-item")).toHaveLength(experience.length);
  expect(document.querySelectorAll("#education-list .edu-item")).toHaveLength(education.length);
  expect(document.querySelectorAll("#cert-list li")).toHaveLength(certifications.length);
  expect(document.querySelectorAll("#contact-links a")).toHaveLength(contactLinks.length);
  expect(document.getElementById("year")?.textContent).toBe(String(new Date().getFullYear()));
  // The open-to-work chip mounts to <body>, outside #main — gated on the config.
  const expectedChips = renderOpenToWork(openToWork) ? 1 : 0;
  expect(document.querySelectorAll("body > .otw-chip")).toHaveLength(expectedChips);
});

/** Drive the hash the way a link click does, then let the listener react. */
function navigateTo(hash: string): void {
  location.hash = hash;
  window.dispatchEvent(new Event("hashchange"));
}

const dialogFor = (slug: string) =>
  document.getElementById(`pd-${slug}`) as HTMLDialogElement | null;

it("opens the dialog named by the hash and closes the previous one", () => {
  const [first, second] = projects;

  navigateTo(`#${WORK_HASH_PREFIX}${first.slug}`);
  expect(dialogFor(first.slug)?.open).toBe(true);

  navigateTo(`#${WORK_HASH_PREFIX}${second.slug}`);
  expect(dialogFor(first.slug)?.open).toBe(false);
  expect(dialogFor(second.slug)?.open).toBe(true);

  // Navigating away from #work/* closes whatever was open.
  navigateTo("#work");
  expect(dialogFor(second.slug)?.open).toBe(false);
});

it("ignores hashes that name no project", () => {
  navigateTo(`#${WORK_HASH_PREFIX}not-a-real-project`);
  expect([...document.querySelectorAll<HTMLDialogElement>("dialog.pd")].some((d) => d.open)).toBe(
    false,
  );
});

it("unwinds history when the dialog is dismissed", () => {
  const { slug } = projects[0];
  navigateTo(`#${WORK_HASH_PREFIX}${slug}`);
  expect(dialogFor(slug)?.open).toBe(true);

  // Esc and the close button both surface as a native close event. Going Back
  // is what clears the hash; the navigation itself is async, so assert the
  // intent rather than the resulting URL.
  const back = vi.spyOn(history, "back");
  dialogFor(slug)?.close();
  expect(dialogFor(slug)?.open).toBe(false);
  expect(back).toHaveBeenCalledTimes(1);
  back.mockRestore();
});

it("leaves history alone when a dialog closes because the hash moved on", () => {
  const [first, second] = projects;
  navigateTo(`#${WORK_HASH_PREFIX}${first.slug}`);

  const back = vi.spyOn(history, "back");
  navigateTo(`#${WORK_HASH_PREFIX}${second.slug}`);

  // The first dialog was closed by the sync, not dismissed by the user, so
  // unwinding here would pop the entry that just opened the second one.
  expect(dialogFor(first.slug)?.open).toBe(false);
  expect(dialogFor(second.slug)?.open).toBe(true);
  expect(back).not.toHaveBeenCalled();
  back.mockRestore();
});
