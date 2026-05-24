import { Section } from "@/components/section";
import { technical } from "@/content/site";

export function Technical() {
  return (
    <Section id="stack" label="Technical" title="Stack">
      <dl className="space-y-6">
        {technical.map((group) => (
          <div
            key={group.label}
            className="grid gap-2 sm:grid-cols-[10rem_1fr] sm:gap-4"
          >
            <dt className="font-mono text-xs uppercase tracking-wider text-muted">
              {group.label}
            </dt>
            <dd>
              <ul className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md bg-foreground/5 px-2 py-0.5 font-mono text-[0.7rem] text-foreground/80"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
