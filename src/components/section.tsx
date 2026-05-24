import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Section({
  id,
  label,
  title,
  children,
  className,
}: {
  id?: string;
  label?: string;
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("scroll-mt-20 py-12 sm:py-16", className)}>
      <div className="mx-auto max-w-2xl px-6">
        {(label || title) && (
          <header className="mb-8">
            {label && (
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted">
                {label}
              </p>
            )}
            {title && (
              <h2 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
                {title}
              </h2>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
