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

## Fonts

Self-hosted Latin subsets in `public/fonts` (SIL OFL 1.1, except Ubuntu under the Ubuntu Font Licence 1.0, see `public/fonts/UFL-LICENSE.txt`): Oxanium (hero headline), Sofia Sans Semi Condensed 600 (titles), Ubuntu 400/700 (body and UI), Commit Mono 400 (labels, code), Red Hat Text 400/400 italic/600 (post bodies). Rebuild with `scripts/build-fonts.py` (see its header). `@font-face` rules and size-adjusted fallbacks live in `src/styles/fonts.css`.
