import { Section } from "@/components/section";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/content/site";

export function SelectedWork() {
  return (
    <Section id="work" label="Selected Work" title="Things I've built">
      <div className="grid items-stretch gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </Section>
  );
}
