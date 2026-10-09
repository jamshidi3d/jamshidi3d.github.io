# jamshidi3d.github.io

Personal site of MH Jamshidi: physics, graphics and tools. Built with Astro, deployed to GitHub Pages with GitHub Actions.

```
npm install
npm run dev       # http://localhost:4321
npm run build     # type-check + static build into dist/
```

- Work: `src/content/projects/*.md`
- Writing: `src/content/writing/*.md` (Markdown/MDX, KaTeX, code highlighting)
- Research data: `src/data/research.ts`; contact links: `src/data/site.ts`
- Home hero: `src/components/Hero.astro` and `src/scripts/hero-cube.ts` (placeholder cube; the Khosrobot character replaces it later)
- Old Jekyll URLs redirect via `redirects` in `astro.config.mjs`.

See `BUILD_BRIEF.md` for the design brief and `TODO.md` for what the owner still has to supply.
