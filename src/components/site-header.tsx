import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { DownloadIcon } from "@/components/icons";
import { site } from "@/content/site";

const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "Writing", href: "/writing" },
  { label: "Experience", href: "/#experience" },
  { label: "Contact", href: "/#contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-2xl items-center justify-between gap-4 px-6">
        <Link
          href="/"
          className="font-mono text-sm font-medium tracking-tight transition-colors hover:text-accent"
        >
          {site.name}
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          <ul className="hidden items-center gap-1 sm:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-md px-2.5 py-1.5 font-mono text-xs text-muted transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <a
            href={site.resumePath}
            className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 font-mono text-xs text-muted transition-colors hover:border-foreground/30 hover:text-foreground"
            download
          >
            <DownloadIcon width={14} height={14} />
            <span>Resume</span>
          </a>

          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
