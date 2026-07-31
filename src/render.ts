/**
 * Pure DOM builders. Each function returns a detached element/fragment built
 * from content data - no document queries, no side effects - so they are
 * directly testable under happy-dom and mounted by main.ts.
 */

import type {
  Education,
  Experience,
  OpenToWork,
  Project,
  ProjectLink,
  SiteLink,
} from "./content";

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

/**
 * Floating "open to work" chip. Returns null when the flag is off or the
 * optional `until` date has passed, so main.ts can gate the mount.
 */
export function renderOpenToWork(data: OpenToWork, now: Date = new Date()): HTMLElement | null {
  if (!data.enabled) return null;
  if (data.until && now >= new Date(`${data.until}T23:59:59`)) return null;

  const chip = el("aside", "otw-chip");
  chip.setAttribute("aria-label", "Availability");

  // Collapsed trigger: a pulse dot + inviting teaser. Toggling on click makes
  // the panel reachable without a pointer (touch, keyboard) as well as on hover.
  const trigger = el("button", "otw-trigger");
  trigger.type = "button";
  trigger.setAttribute("aria-expanded", "false");
  trigger.append(el("span", "otw-dot"));
  trigger.append(el("span", "otw-teaser", data.teaser));
  const caret = el("span", "otw-caret", "▾");
  caret.setAttribute("aria-hidden", "true");
  trigger.append(caret);

  const panel = el("div", "otw-panel");
  const panelId = "otw-panel";
  panel.id = panelId;
  trigger.setAttribute("aria-controls", panelId);
  trigger.addEventListener("click", () => {
    const open = chip.classList.toggle("is-open");
    trigger.setAttribute("aria-expanded", String(open));
  });

  // A single inner wrapper is what actually collapses: the panel is a 1-row grid
  // animating 0fr → 1fr, and this child (overflow-hidden) is the one row.
  const inner = el("div", "otw-panel-inner");
  inner.append(el("p", "otw-heading", data.label));
  inner.append(el("p", "otw-availability", data.availability));

  const roles = el("ul", "otw-roles");
  roles.setAttribute("aria-label", "Roles open to");
  for (const role of data.roles) roles.append(el("li", "", role));
  inner.append(roles);

  inner.append(el("p", "otw-pitch", data.pitch));

  const cta = el("a", data.cta.primary ? "button-link" : undefined, data.cta.label);
  cta.href = data.cta.href;
  if (data.cta.href.startsWith("http")) {
    cta.target = "_blank";
    cta.rel = "noopener noreferrer";
  }
  inner.append(cta);
  panel.append(inner);

  chip.append(trigger);
  chip.append(panel);

  return chip;
}

export function renderAbout(paragraphs: readonly string[]): DocumentFragment {
  const frag = document.createDocumentFragment();
  for (const text of paragraphs) frag.append(el("p", "", text));
  return frag;
}

/** Fragment prefix for the per-project detail dialogs: #work/<slug>. */
export const WORK_HASH_PREFIX = "work/";

function chipList(className: string, label: string, items: readonly string[]): HTMLUListElement {
  const list = el("ul", className);
  list.setAttribute("aria-label", label);
  for (const item of items) list.append(el("li", "", item));
  return list;
}

function externalLinks(className: string, links: readonly ProjectLink[]): HTMLElement {
  const container = el("div", className);
  for (const link of links) {
    const a = el("a", "", link.label);
    a.href = link.href;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    container.append(a);
  }
  return container;
}

/**
 * Skim surface: what the project is, the hard facts, the stack. The argument
 * lives in the dialog, reached through a real fragment link so the browser
 * supplies history, Cmd-click, and keyboard behaviour for free.
 */
export function renderProjectCard(project: Project): HTMLElement {
  const card = el("article", project.featured ? "project-card featured" : "project-card");

  const head = el("div", "pc-head");
  head.append(el("h3", "pc-title", project.title));
  if (project.featured) head.append(el("span", "pc-badge", "Featured"));
  if (project.privateWork) head.append(el("span", "pc-badge", "Private"));
  card.append(head);

  card.append(el("p", "pc-summary", project.summary));
  card.append(chipList("pc-proof", "Key facts", project.proof));
  card.append(chipList("pc-stack", "Stack", project.stack));

  const links = externalLinks("pc-links", project.links);
  const more = el("a", "pc-more", "Details");
  more.href = `#${WORK_HASH_PREFIX}${project.slug}`;
  more.setAttribute("aria-label", `Details: ${project.title}`);
  links.append(more);
  card.append(links);

  return card;
}

/**
 * Detail view. Native <dialog> so focus trapping, Esc, and the backdrop come
 * from the platform rather than from us. Padding lives on .pd-body, which keeps
 * `event.target === dialog` an exact test for a backdrop click in main.ts.
 */
export function renderProjectDialog(project: Project): HTMLDialogElement {
  const dialog = el("dialog", "pd");
  dialog.id = `pd-${project.slug}`;
  const titleId = `pd-title-${project.slug}`;
  dialog.setAttribute("aria-labelledby", titleId);

  const body = el("div", "pd-body");

  const head = el("div", "pd-head");
  const title = el("h2", "pd-title", project.title);
  title.id = titleId;
  head.append(title);

  // method="dialog" closes natively, with no script involved.
  const dismiss = el("form", "pd-dismiss");
  dismiss.setAttribute("method", "dialog");
  const close = el("button", "pd-close", "×");
  close.type = "submit";
  close.setAttribute("aria-label", `Close ${project.title}`);
  dismiss.append(close);
  head.append(dismiss);
  body.append(head);

  body.append(el("p", "pd-summary", project.summary));
  body.append(chipList("pd-proof", "Key facts", project.proof));

  const sections: ReadonlyArray<readonly [string, string]> = [
    ["The problem", project.problem],
    ["How it works", project.approach],
    ["Detail", project.detail],
  ];
  for (const [heading, text] of sections) {
    const section = el("section", "pd-section");
    section.append(el("h3", "pd-heading", heading));
    section.append(el("p", "", text));
    body.append(section);
  }

  body.append(chipList("pd-stack", "Stack", project.stack));
  if (project.links.length > 0) body.append(externalLinks("pd-links", project.links));

  dialog.append(body);
  return dialog;
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
  head.append(el("p", "xp-dates", `${entry.start} – ${entry.end}`));
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
