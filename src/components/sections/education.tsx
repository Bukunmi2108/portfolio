import { Section } from "@/components/section";
import { education } from "@/content/site";

export function Education() {
  return (
    <Section id="education" label="Education" title="Education">
      <div className="space-y-8">
        {education.map((entry) => (
          <div key={entry.school}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
              <h3 className="font-medium tracking-tight">{entry.degree}</h3>
              <span className="font-mono text-xs text-muted">{entry.period}</span>
            </div>
            <p className="mt-0.5 font-mono text-xs text-muted">{entry.school}</p>
            <p className="mt-2 text-sm leading-relaxed text-foreground/90">
              {entry.detail}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
