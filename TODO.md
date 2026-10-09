# TODO(owner)

Nothing below is invented on the site; missing items are simply hidden or listed here.

- Contact links: LinkedIn, Scholar, ORCID, INSPIRE (`src/data/site.ts`); both CV PDFs.
- Research: publications/talks/code data, thesis title (`src/data/research.ts`); link for "Cap anomaly in the CMB".
- Press: 80.lv and BlenderNation URLs (About).
- Projects: one-line result and role sentence per project; problem/constraint/idea/diagram for the three deep case studies (Physirig, TPS animation system, CMB with geometry nodes); media for "Procedural animation for a TPS game".
- Confirm which old portfolio assets may be shown (client/employer rights); client names were left off on purpose.
- Decide the "Earlier work" cut (`earlier: true` in project frontmatter).
- Models section (turntables), Lab pieces, Khosrobot hero, OG image (currently the Khosrobot project image).
- Heavy videos (about 129 MB) are in `public/media/video`; move to R2/YouTube when ready.

- "Procedural animation for a TPS game": the text is migrated (from the Feb 2026 web-archive copy of the old portfolio), but its image (`img/portfolio/procedural_animation.png`) and clip (`video/portfolio/proc_anim.mp4`) are not in git or the web archive. Copy them into `public/media/img` and `public/media/video` and add `image:` / `video:` to `src/content/projects/tps-procedural-animation.md`.
