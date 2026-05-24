import type { ReactNode } from "react";
import { ArrowUpRightIcon } from "@/components/icons";
import type { Project } from "@/content/site";

function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-border px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider text-muted">
      {children}
    </span>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex flex-col rounded-xl border border-border bg-card p-5 transition-colors hover:border-foreground/20">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-medium leading-snug tracking-tight">{project.title}</h3>
        <div className="flex shrink-0 flex-wrap justify-end gap-1.5">
          {project.featured && <Badge>Flagship</Badge>}
          {project.privateWork && <Badge>Private</Badge>}
        </div>
      </div>

      <div className="mt-3 space-y-2 text-sm">
        <p className="text-muted">{project.problem}</p>
        <p>{project.approach}</p>
        <p className="text-muted">{project.detail}</p>
      </div>

      {project.stack.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-md bg-foreground/5 px-2 py-0.5 font-mono text-[0.7rem] text-muted"
            >
              {tech}
            </li>
          ))}
        </ul>
      )}

      {project.links.length > 0 && (
        <div className="mt-auto flex flex-wrap gap-4 pt-4">
          {project.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-mono text-xs transition-colors hover:text-accent"
            >
              {link.label}
              <ArrowUpRightIcon width={13} height={13} />
            </a>
          ))}
        </div>
      )}

      {project.privateWork && project.links.length === 0 && (
        <p className="mt-auto pt-4 font-mono text-xs text-muted">No public repo</p>
      )}
    </article>
  );
}
