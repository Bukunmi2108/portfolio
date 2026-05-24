import { Section } from "@/components/section";
import { cn } from "@/lib/cn";
import { experience } from "@/content/site";

export function Experience() {
  return (
    <Section id="experience" label="Experience" title="Where I've worked">
      <ol className="relative space-y-10 border-l border-border pl-6">
        {experience.map((job) => (
          <li key={`${job.company}-${job.start}`} className="relative">
            <span
              className={cn(
                "absolute -left-[1.7rem] top-1.5 size-2.5 rounded-full border-2 border-background",
                job.end === "Present" ? "bg-accent" : "bg-border"
              )}
              aria-hidden
            />
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
              <h3 className="font-medium tracking-tight">
                {job.role}{" "}
                <span className="text-muted">· {job.company}</span>
              </h3>
              <span className="font-mono text-xs text-muted">
                {job.start} – {job.end}
              </span>
            </div>
            {job.location && (
              <p className="mt-0.5 font-mono text-xs text-muted">{job.location}</p>
            )}
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-foreground/90">
              {job.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-2.5">
                  <span className="mt-2 size-1 shrink-0 rounded-full bg-muted" aria-hidden />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
            {job.stack && (
              <p className="mt-3 font-mono text-xs text-muted">{job.stack}</p>
            )}
          </li>
        ))}
      </ol>
    </Section>
  );
}
