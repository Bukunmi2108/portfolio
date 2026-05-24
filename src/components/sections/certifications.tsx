import { Section } from "@/components/section";
import { certifications } from "@/content/site";

export function Certifications() {
  return (
    <Section id="certifications" label="Certifications" title="Certifications">
      <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
        {certifications.map((cert) => (
          <li key={cert} className="flex gap-2 text-sm text-foreground/80">
            <span className="mt-2 size-1 shrink-0 rounded-full bg-muted" aria-hidden />
            <span>{cert}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
