import {
  DownloadIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
} from "@/components/icons";
import { site } from "@/content/site";

const chips = ["Production legal-AI", "RAG", "Agents", "Pipelines"];

const secondaryCta =
  "inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-foreground/30";

export function Hero() {
  return (
    <section className="mx-auto max-w-2xl px-6 pt-16 pb-12 sm:pt-24 sm:pb-16">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
        {site.location}
      </p>

      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
        {site.role}
      </h1>

      <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-sm text-muted">
        {chips.map((chip, i) => (
          <span key={chip} className="flex items-center gap-2">
            {i > 0 && <span className="text-accent">·</span>}
            {chip}
          </span>
        ))}
      </p>

      <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/90">
        LLB (First Class) + MSc Financial Engineering. I ship AI systems in
        regulated, high-stakes domains.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href={site.resumePath}
          download
          className="inline-flex items-center gap-2 rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          <DownloadIcon width={16} height={16} />
          Resume
        </a>
        <a
          href={site.social.github}
          target="_blank"
          rel="noreferrer"
          className={secondaryCta}
        >
          <GitHubIcon width={16} height={16} />
          GitHub
        </a>
        <a
          href={site.social.linkedin}
          target="_blank"
          rel="noreferrer"
          className={secondaryCta}
        >
          <LinkedInIcon width={16} height={16} />
          LinkedIn
        </a>
        <a href={`mailto:${site.email}`} className={secondaryCta}>
          <MailIcon width={16} height={16} />
          Email
        </a>
      </div>
    </section>
  );
}
