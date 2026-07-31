import "./style.css";
import {
  about,
  certifications,
  contactLinks,
  education,
  experience,
  heroLinks,
  openToWork,
  projects,
} from "./content";
import {
  WORK_HASH_PREFIX,
  renderAbout,
  renderCertList,
  renderEducationItem,
  renderExperienceItem,
  renderOpenToWork,
  renderProjectCard,
  renderProjectDialog,
  renderSiteLinks,
} from "./render";

function mount(id: string, content: Node | Node[]): void {
  const target = document.getElementById(id);
  if (!target) throw new Error(`Missing mount point #${id}`);
  target.replaceChildren(...(Array.isArray(content) ? content : [content]));
}

mount("hero-links", renderSiteLinks(heroLinks));
mount("about-copy", renderAbout(about));
mount("project-list", projects.map(renderProjectCard));

// Project details live at #work/<slug>. The URL is the single source of truth:
// links navigate, hashchange opens, and closing the dialog unwinds the URL, so
// Back closes a dialog and a shared link opens straight into one.
const dialogs = new Map(projects.map((p) => [p.slug, renderProjectDialog(p)] as const));
mount("project-dialogs", [...dialogs.values()]);

function slugFromHash(): string | null {
  const hash = location.hash.slice(1);
  return hash.startsWith(WORK_HASH_PREFIX) ? hash.slice(WORK_HASH_PREFIX.length) : null;
}

function syncDialogs(): void {
  const slug = slugFromHash();
  for (const [openSlug, dialog] of dialogs) {
    if (openSlug !== slug && dialog.open) dialog.close();
  }
  const target = slug === null ? undefined : dialogs.get(slug);
  if (target && !target.open) target.showModal();
}

// True once the user has navigated within the page, which tells the close
// handler whether going Back is safe or whether we arrived here by deep link.
let navigatedInPage = false;

for (const [slug, dialog] of dialogs) {
  dialog.addEventListener("close", () => {
    // Only unwind when the URL still names this dialog; if the hash already
    // moved on, syncDialogs closed it and history is correct as it stands.
    if (slugFromHash() !== slug) return;
    if (navigatedInPage) history.back();
    else history.replaceState(null, "", location.pathname + location.search);
  });

  // Padding sits on .pd-body, so the dialog itself is only ever the backdrop.
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
}

window.addEventListener("hashchange", () => {
  navigatedInPage = true;
  syncDialogs();
});

syncDialogs();
mount("experience-list", experience.map(renderExperienceItem));
mount("education-list", education.map(renderEducationItem));
mount("cert-list", renderCertList(certifications));
mount("contact-links", renderSiteLinks(contactLinks));

// Fixed-position chip lives outside #main; only appended when the flag is live.
const otwChip = renderOpenToWork(openToWork);
if (otwChip) document.body.append(otwChip);

const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());

// Set --i per card; style.css uses it to stagger the fade-up animation delay.
document.querySelectorAll<HTMLElement>(".project-card").forEach((card, i) => {
  card.style.setProperty("--i", String(i));
});
