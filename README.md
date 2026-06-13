# portfolio

Personal site — [bukunmi-portfolio.vercel.app](https://bukunmi-portfolio.vercel.app).

Vite + vanilla TypeScript + one stylesheet. No framework, zero runtime dependencies.

```bash
pnpm install
pnpm dev        # local dev server
pnpm test       # vitest (happy-dom)
pnpm lint       # strict tsc
pnpm build      # static output in dist/
```

All content lives in [`src/content.ts`](src/content.ts); pure DOM builders in
[`src/render.ts`](src/render.ts) render it into the [`index.html`](index.html) shell.
