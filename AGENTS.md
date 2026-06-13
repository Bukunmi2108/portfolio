# Portfolio

Single-page portfolio site. Vite + vanilla TypeScript + one stylesheet — **no framework, zero npm runtime dependencies** (the only runtime fetch is the Google Fonts stylesheet). Deployed on Vercel (static `dist/` output).

## Layout

- `index.html` — the page shell, including all meta/OG tags and the static copy (hero headline/tagline, contact blurb). Section list containers are empty; content is rendered into them at load.
- `src/content.ts` — source of truth for all structured content (about, projects, experience, education, certifications, hero/contact link lists). Edit that content here, not in HTML.
- `src/render.ts` — pure DOM builders (no document queries, no side effects). Tested in `src/render.test.ts`.
- `src/main.ts` — entry point: imports the stylesheet, mounts rendered content into `index.html` containers. The mount wiring is covered by `src/main.test.ts` against the real `index.html`.
- `src/style.css` — all styles. Design tokens live in `:root`; change the palette there, not inline.

## Commands

- `pnpm dev` / `pnpm build` / `pnpm preview`
- `pnpm test` — vitest (happy-dom)
- `pnpm lint` — `tsc -b --noEmit` (strict)

## Conventions

- Keep runtime dependencies at zero; reach for vanilla DOM APIs before adding a package.
- New content types: add the type + data to `content.ts`, a pure builder to `render.ts`, a test, then mount in `main.ts`.
- `/og.png` and `/resume.pdf` URLs are referenced externally (LinkedIn scrapes) — don't rename them.
