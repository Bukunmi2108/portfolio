import "./style.css";
import {
  about,
  certifications,
  contactLinks,
  education,
  experience,
  heroLinks,
  projects,
} from "./content";
import {
  renderAbout,
  renderCertList,
  renderEducationItem,
  renderExperienceItem,
  renderProjectCard,
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
mount("experience-list", experience.map(renderExperienceItem));
mount("education-list", education.map(renderEducationItem));
mount("cert-list", renderCertList(certifications));
mount("contact-links", renderSiteLinks(contactLinks));

const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());

// Set --i per card; style.css uses it to stagger the fade-up animation delay.
document.querySelectorAll<HTMLElement>(".project-card").forEach((card, i) => {
  card.style.setProperty("--i", String(i));
});
