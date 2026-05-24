"use client";

import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@/components/icons";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="inline-flex size-9 items-center justify-center rounded-md border border-border text-muted transition-colors hover:border-foreground/30 hover:text-foreground"
      aria-label="Toggle theme"
    >
      {/* No mounted-guard needed: this markup is theme-independent. The `.dark`
          class (set by next-themes' pre-hydration script) drives icon visibility
          via CSS, so server and client HTML match. Don't add a mount guard. */}
      <SunIcon className="hidden dark:block" />
      <MoonIcon className="block dark:hidden" />
    </button>
  );
}
