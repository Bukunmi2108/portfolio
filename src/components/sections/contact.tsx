import { Section } from "@/components/section";
import {
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
} from "@/components/icons";
import { site } from "@/content/site";

const link =
  "inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-foreground/30";

export function Contact() {
  return (
    <Section id="contact" label="Contact" title="Get in touch">
      <p className="max-w-xl text-base leading-relaxed text-foreground/90">
        Open to applied-AI engineering work in legal and other regulated
        domains. The fastest way to reach me is email.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a href={`mailto:${site.email}`} className={link}>
          <MailIcon width={16} height={16} />
          {site.email}
        </a>
        <a
          href={site.social.github}
          target="_blank"
          rel="noreferrer"
          className={link}
        >
          <GitHubIcon width={16} height={16} />
          GitHub
        </a>
        <a
          href={site.social.linkedin}
          target="_blank"
          rel="noreferrer"
          className={link}
        >
          <LinkedInIcon width={16} height={16} />
          LinkedIn
        </a>
      </div>
    </Section>
  );
}
