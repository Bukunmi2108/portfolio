import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/icons";
import { languages, site } from "@/content/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto flex max-w-2xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="font-mono text-xs text-muted">
            © {year} {site.fullName}
          </p>
          <p className="font-mono text-xs text-muted">{languages.join(" · ")}</p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={`mailto:${site.email}`}
            aria-label="Email"
            className="text-muted transition-colors hover:text-foreground"
          >
            <MailIcon />
          </a>
          <a
            href={site.social.github}
            aria-label="GitHub"
            target="_blank"
            rel="noreferrer"
            className="text-muted transition-colors hover:text-foreground"
          >
            <GitHubIcon />
          </a>
          <a
            href={site.social.linkedin}
            aria-label="LinkedIn"
            target="_blank"
            rel="noreferrer"
            className="text-muted transition-colors hover:text-foreground"
          >
            <LinkedInIcon />
          </a>
        </div>
      </div>
    </footer>
  );
}
