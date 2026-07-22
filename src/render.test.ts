import { describe, expect, it } from "vitest";
import { about, certifications, education, experience, projects } from "./content";
import {
  renderAbout,
  renderCertList,
  renderEducationItem,
  renderExperienceItem,
  renderOpenToWork,
  renderProjectCard,
  renderSiteLinks,
} from "./render";
import type { OpenToWork, Project } from "./content";

const sampleProject: Project = {
  title: "Sample",
  problem: "A problem.",
  approach: "An approach.",
  detail: "A detail.",
  stack: ["Python", "SQLite"],
  links: [{ label: "GitHub", href: "https://example.com/repo" }],
  featured: true,
};

const sampleOtw: OpenToWork = {
  enabled: true,
  teaser: "psst — open to work",
  label: "Open to work",
  availability: "Available now · remote",
  roles: ["AI Engineer", "LLM Engineer"],
  pitch: "Available for engineering roles.",
  cta: { label: "Get in touch", href: "mailto:hi@example.com", primary: true },
};

describe("renderOpenToWork", () => {
  it("renders the collapsed teaser, roles, pitch, and CTA when enabled", () => {
    const chip = renderOpenToWork(sampleOtw);
    expect(chip).not.toBeNull();
    expect(chip?.querySelector(".otw-teaser")?.textContent).toBe("psst — open to work");
    expect(chip?.querySelector(".otw-dot")).not.toBeNull();
    expect(chip?.querySelector(".otw-heading")?.textContent).toBe("Open to work");
    expect(chip?.querySelector(".otw-availability")?.textContent).toBe("Available now · remote");
    expect([...(chip?.querySelectorAll(".otw-roles li") ?? [])].map((li) => li.textContent)).toEqual(
      ["AI Engineer", "LLM Engineer"],
    );
    expect(chip?.querySelector(".otw-pitch")?.textContent).toBe("Available for engineering roles.");
    const cta = chip?.querySelector<HTMLAnchorElement>(".otw-panel a");
    expect(cta?.getAttribute("href")).toBe("mailto:hi@example.com");
    expect(cta?.className).toBe("button-link");
  });

  it("toggles the is-open class and aria-expanded when the trigger is clicked", () => {
    const chip = renderOpenToWork(sampleOtw);
    const trigger = chip?.querySelector<HTMLButtonElement>(".otw-trigger");
    expect(trigger?.getAttribute("aria-expanded")).toBe("false");
    trigger?.click();
    expect(chip?.classList.contains("is-open")).toBe(true);
    expect(trigger?.getAttribute("aria-expanded")).toBe("true");
    trigger?.click();
    expect(chip?.classList.contains("is-open")).toBe(false);
    expect(trigger?.getAttribute("aria-expanded")).toBe("false");
  });

  it("returns null when disabled", () => {
    expect(renderOpenToWork({ ...sampleOtw, enabled: false })).toBeNull();
  });

  it("returns null once the until date has passed", () => {
    const chip = renderOpenToWork(
      { ...sampleOtw, until: "2026-01-01" },
      new Date("2026-06-01T00:00:00"),
    );
    expect(chip).toBeNull();
  });

  it("still renders while the until date is in the future", () => {
    const chip = renderOpenToWork(
      { ...sampleOtw, until: "2026-12-31" },
      new Date("2026-06-01T00:00:00"),
    );
    expect(chip).not.toBeNull();
  });
});

describe("renderProjectCard", () => {
  it("renders title, copy, stack chips, and links", () => {
    const card = renderProjectCard(sampleProject);
    expect(card.querySelector(".pc-title")?.textContent).toBe("Sample");
    expect(card.querySelector(".pc-problem")?.textContent).toBe("A problem.");
    expect(card.querySelector(".pc-approach")?.textContent).toBe("An approach.");
    expect(card.querySelector(".pc-detail")?.textContent).toBe("A detail.");
    expect([...card.querySelectorAll(".pc-stack li")].map((li) => li.textContent)).toEqual([
      "Python",
      "SQLite",
    ]);
    const link = card.querySelector<HTMLAnchorElement>(".pc-links a");
    expect(link?.href).toBe("https://example.com/repo");
    expect(link?.rel).toBe("noopener noreferrer");
  });

  it("marks featured projects with a class and badge", () => {
    const card = renderProjectCard(sampleProject);
    expect(card.classList.contains("featured")).toBe(true);
    expect(card.querySelector(".pc-badge")?.textContent).toBe("Featured");

    const plain = renderProjectCard({ ...sampleProject, featured: false });
    expect(plain.classList.contains("featured")).toBe(false);
    expect(plain.querySelector(".pc-badge")).toBeNull();
  });

  it("marks private work with a badge alongside the featured one", () => {
    const card = renderProjectCard({ ...sampleProject, privateWork: true });
    const badges = [...card.querySelectorAll(".pc-badge")].map((b) => b.textContent);
    expect(badges).toEqual(["Featured", "Private"]);
  });

  it("omits the links container when there are no links", () => {
    const card = renderProjectCard({ ...sampleProject, links: [] });
    expect(card.querySelector(".pc-links")).toBeNull();
  });

  it("renders every project from content without throwing", () => {
    for (const project of projects) {
      const card = renderProjectCard(project);
      expect(card.querySelector(".pc-title")?.textContent).toBe(project.title);
      expect(card.querySelectorAll(".pc-links a")).toHaveLength(project.links.length);
    }
  });
});

describe("renderExperienceItem", () => {
  it("renders role, company with location, dates, bullets, and stack", () => {
    const entry = experience[0];
    const item = renderExperienceItem(entry);
    expect(item.querySelector(".xp-role")?.textContent).toBe(entry.role);
    expect(item.querySelector(".xp-company")?.textContent).toContain(entry.company);
    expect(item.querySelector(".xp-dates")?.textContent).toBe(`${entry.start} — ${entry.end}`);
    expect(item.querySelectorAll(".xp-bullets li")).toHaveLength(entry.bullets.length);
    expect(item.querySelector(".xp-stack")?.textContent).toBe(entry.stack);
  });

  it("omits the stack line when absent", () => {
    const entry = experience.find((e) => !e.stack);
    expect(entry).toBeDefined();
    expect(renderExperienceItem(entry!).querySelector(".xp-stack")).toBeNull();
  });
});

describe("renderSiteLinks", () => {
  it("styles primary links as buttons and secures external ones", () => {
    const host = document.createElement("div");
    host.append(
      renderSiteLinks([
        { label: "me@example.com", href: "mailto:me@example.com", primary: true },
        { label: "GitHub", href: "https://github.com/example" },
        { label: "Resume", href: "/resume.pdf" },
      ]),
    );
    const [email, github, resume] = [...host.querySelectorAll("a")];

    expect(email.classList.contains("button-link")).toBe(true);
    expect(email.target).toBe("");

    expect(github.classList.contains("button-link")).toBe(false);
    expect(github.target).toBe("_blank");
    expect(github.rel).toBe("noopener noreferrer");

    expect(resume.target).toBe("_blank");
    expect(resume.rel).toBe("noopener");
  });
});

describe("renderAbout / renderEducationItem / renderCertList", () => {
  it("renders one paragraph per about entry", () => {
    const host = document.createElement("div");
    host.append(renderAbout(about));
    expect(host.querySelectorAll("p")).toHaveLength(about.length);
  });

  it("renders education entries", () => {
    const card = renderEducationItem(education[0]);
    expect(card.querySelector(".edu-degree")?.textContent).toBe(education[0].degree);
    expect(card.querySelector(".edu-school")?.textContent).toContain(education[0].school);
  });

  it("renders one chip per certification", () => {
    const host = document.createElement("ul");
    host.append(renderCertList(certifications));
    expect(host.querySelectorAll("li")).toHaveLength(certifications.length);
  });
});
