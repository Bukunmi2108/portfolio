/**
 * Pure DOM builders. Each function returns a detached element/fragment built
 * from content data — no document queries, no side effects — so they are
 * directly testable under happy-dom and mounted by main.ts.
 */

import type { Education, Experience, Project, SiteLink } from "./content";

function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className?: string,
  text?: string,
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

export function renderSiteLinks(links: readonly SiteLink[]): DocumentFragment {
  const frag = document.createDocumentFragment();
  for (const link of links) {
    const a = el("a", link.primary ? "button-link" : undefined, link.label);
    a.href = link.href;
    if (link.href.startsWith("http")) {
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    } else if (!link.href.startsWith("mailto:")) {
      // Same-origin documents (the resume PDF) open in a new tab.
      a.target = "_blank";
      a.rel = "noopener";
    }
    frag.append(a);
  }
  return frag;
}

export function renderAbout(paragraphs: readonly string[]): DocumentFragment {
  const frag = document.createDocumentFragment();
  for (const text of paragraphs) frag.append(el("p", "", text));
  return frag;
}

export function renderProjectCard(project: Project): HTMLElement {
  const card = el("article", project.featured ? "project-card featured" : "project-card");

  const head = el("div", "pc-head");
  head.append(el("h3", "pc-title", project.title));
  if (project.featured) head.append(el("span", "pc-badge", "Featured"));
  if (project.privateWork) head.append(el("span", "pc-badge", "Private"));
  card.append(head);

  card.append(el("p", "pc-problem", project.problem));
  card.append(el("p", "pc-approach", project.approach));
  card.append(el("p", "pc-detail", project.detail));

  const stack = el("ul", "pc-stack");
  stack.setAttribute("aria-label", "Stack");
  for (const item of project.stack) stack.append(el("li", "", item));
  card.append(stack);

  if (project.links.length > 0) {
    const links = el("div", "pc-links");
    for (const link of project.links) {
      const a = el("a", "", link.label);
      a.href = link.href;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      links.append(a);
    }
    card.append(links);
  }

  return card;
}

export function renderExperienceItem(entry: Experience): HTMLLIElement {
  const item = el("li", "xp-item");

  const head = el("div", "xp-head");
  const title = el("div");
  title.append(el("h3", "xp-role", entry.role));
  title.append(
    el("p", "xp-company", entry.location ? `${entry.company} · ${entry.location}` : entry.company),
  );
  head.append(title);
  head.append(el("p", "xp-dates", `${entry.start} — ${entry.end}`));
  item.append(head);

  const bullets = el("ul", "xp-bullets");
  for (const bullet of entry.bullets) bullets.append(el("li", "", bullet));
  item.append(bullets);

  if (entry.stack) item.append(el("p", "xp-stack", entry.stack));

  return item;
}

export function renderEducationItem(entry: Education): HTMLElement {
  const card = el("article", "edu-item");
  card.append(el("h3", "edu-degree", entry.degree));
  card.append(el("p", "edu-school", `${entry.school} · ${entry.period}`));
  card.append(el("p", "edu-detail", entry.detail));
  return card;
}

export function renderCertList(items: readonly string[]): DocumentFragment {
  const frag = document.createDocumentFragment();
  for (const item of items) frag.append(el("li", "", item));
  return frag;
}
