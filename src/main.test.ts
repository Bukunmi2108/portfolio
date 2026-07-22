/**
 * Integration test: main.ts must find every mount point in the real
 * index.html. Lives in its own file because importing main.ts runs its
 * module side effects once.
 */

import { readFileSync } from "node:fs";
import { expect, it } from "vitest";
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
  expect(document.querySelectorAll("#experience-list .xp-item")).toHaveLength(experience.length);
  expect(document.querySelectorAll("#education-list .edu-item")).toHaveLength(education.length);
  expect(document.querySelectorAll("#cert-list li")).toHaveLength(certifications.length);
  expect(document.querySelectorAll("#contact-links a")).toHaveLength(contactLinks.length);
  expect(document.getElementById("year")?.textContent).toBe(String(new Date().getFullYear()));
  // The open-to-work chip mounts to <body>, outside #main — gated on the config.
  const expectedChips = renderOpenToWork(openToWork) ? 1 : 0;
  expect(document.querySelectorAll("body > .otw-chip")).toHaveLength(expectedChips);
});
