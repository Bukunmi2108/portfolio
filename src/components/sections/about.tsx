import { Section } from "@/components/section";
import { about } from "@/content/site";

export function About() {
  return (
    <Section id="about" label="About" title="Profile">
      <div className="space-y-4 text-base leading-relaxed text-foreground/90">
        {about.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </Section>
  );
}
