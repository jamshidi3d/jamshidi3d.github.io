# Build brief (final): personal site for MohammadHossein (MH) Jamshidi

For the building agent. Drop this file in the repo root as `AGENTS.md` or `CLAUDE.md`. Every section marked **FINAL** is decided; do not reopen it. Anything the owner must still supply is listed in section 17 and marked `TODO(owner)` in the code. Never invent facts (projects, papers, dates, employers, numbers, press quotes).

Visual reference (mockup canvas): https://claude.ai/artifact/BjYFv2tq2idVjTSHjLUNpG
Boards: Desktop Home, Desktop Work, Mobile Home, Listing styles, Blog post page, Project page. Use them for layout, spacing and colour of everything EXCEPT the Home hero: **the Home and Mobile boards still show the old random Lab piece in the hero, and a "Home banner option" board shows a black hole. Both are superseded by section 4b (the Khosrobot hero).** Text inside the Post and Project boards is SAMPLE text written to show the format; never ship it as real content.

---

## 1. Purpose (FINAL)

- Owner: PhD candidate in physics (cosmology) and technical artist / physics programmer since 2012. He also has substantial 3D modelling experience.
- ONE site that shows both careers together: physics/cosmology research and game/tech-art/tools work, with writing, small interactive web apps (Lab), portfolio, 3D models and publications in one place.
- Audiences: recruiters (tools programmer, physics/animation programmer, tech animator), academics, the Blender and graphics community. All get the same site; do not split it by audience. Roles are expressed with tags, not separate sections.
- Tagline: **"I make physics move."**
- Intro: "Simulation, rigging and tools, from game animation to cosmology research. I'm a PhD candidate in physics and have worked as a technical artist since 2012. This is where the two meet."
- Tone: quiet, confident, content-first. Not commercial.
- **Authenticity rule (FINAL):** nothing on the site may be presented as the owner's work unless it is. Anything AI-assisted or adapted from a known technique is labelled and credited. No third-party models or demos in Work. (A black-hole shader built earlier was dropped for this reason.)

## 2. Existing content to migrate

- Blog (Jekyll, Chirpy): https://jamshidi3d.github.io/ . Migrate all posts with dates and tags. Keep old URLs working (redirect map).
- Portfolio (Bootstrap Freelancer theme, 11 projects): https://jamshidi3d.github.io/portfolio . Merge into Work; redirect old pages.
- Blender official user story: https://www.blender.org/user-stories/cosmology-with-geometry-nodes/ (Feb 17 2026). Shown as a Home card (kind WRITING, tag BLENDER.ORG) and in a press section on About (also 80.lv and BlenderNation; URLs from owner).
- **Never** add a "Featured on… / covered by…" line anywhere. The owner judged it show-off.

## 3. Information architecture (FINAL)

Top nav: **Work · Lab · Research · Writing · About**, plus **Contact** as a plain amber link at the far right. Logo: amber-outlined "MH" square, name, and the line "physics · graphics · tools".

- **Work**: portfolio projects by theme, filterable by tag; also a **Models** section (section 7b).
- **Lab**: small interactive web apps and simulations, including the Khosrobot sandbox.
- **Research**: publications, talks, code and data, two CV downloads.
- **Writing**: blog posts, tutorials, essays.
- **About**: story, press, links, CVs, credits.

Role tags (filters, lowercase with `#`): `#tools #physics #animation #tech-art #modeling`.

Work themes: 1) Rigging and animation, 2) GPU and simulation, 3) Pipeline and tools, 4) Science and visualization. Plus the **Models** section and a short **Earlier work** list (section 6).

## 4. Page layouts (FINAL)

**Header**: on top, 72px, bottom border 1px `#263040`; content in a centered column, side padding 56px on desktop.

**Home, desktop**
1. One top section, two columns. LEFT: h1 slogan (about 64 to 84px) + intro paragraph. RIGHT: the **Khosrobot hero** (section 4b), borderless, standing on a faint floor line. No random Lab piece, no shuffle button.
2. Below: "FEATURED AND LATEST" with hashtag filters, then the listing (section 5).

**Work and every other page**: NO hero character. Page title, filters, listing only.

**Mobile (390px reference)**: header with logo/name left and a 44x44 hamburger right (three lines, turns into X). The menu is a full overlay: numbered items 01 to 05 with a one-line description each, plus Contact / GitHub / CV / Scholar. Below the header: slogan (about 42px), intro, then the character (larger, below the text), then the listing in one column.

## 4b. Home hero: the Khosrobot character (FINAL)

**What it is.** The owner's own model, Khosrobot: a gold, round-bodied robot on a single wheel, with articulated arms and hands (hand door panels), orange shoulder plates, a crown and a textured beard. It matches the amber theme; the black tire gives contrast. Scope for the live version: **body + wheel + hands** (head, crown and beard rigid at first; a short bone chain for beard jiggle is a later extra).

**Concept: a one-wheel ball-bot that balances itself.** The visitor can grab it and push it around.
- Drag the body: the wheel rolls without slipping, the body leans like an inverted pendulum, the arms trail with springs.
- Drag a hand: the arm follows through its linkage, the body shifts to stay up.
- Release: it wobbles, then settles back to balanced by itself.
- Idle: a small breathing loop. Optional extra: a double-click opens the hand doors.
- It can roll anywhere along the floor line, under the headline, without covering the text (text stays real HTML above or beside it).

**Physics scope (keep small, but fully 3D).** The mechanism is genuinely 3D: the body can lean and fall in any direction, and the arms and hands move in 3D. About 8 rigid bodies: body, wheel, two upper arms, two hands, two door flaps, on a ground plane. Physics engine: **Rapier 3D** (decision FINAL, section 4c). The geometry rig keeps arm and hand linkages valid; Rapier adds body, wheel, joints and secondary motion.

**Rendering.**
- Fixed front three-quarter camera with slight pointer parallax. No orbit.
- Metallic gold material lit by a small baked environment, soft contact shadow, no heavy effects, dark ground.
- **Poster first:** a transparent Cycles render of the same pose loads instantly (it is also the Open Graph image and the no-WebGL fallback). The live canvas fades in when ready.
- Canvas is a box around the character that blends into the page background (no visible edge).
- Render on demand: draw only while something moves; at rest use no GPU. Pause off-screen. Cap pixel density. Reduced motion: poster only, with a "Play" control.

**Touch and keyboard.** On touch, a drag captures the touch only when it starts on the character (raycast on pointer down); everywhere else the page scrolls normally (`touch-action: pan-y`). Keyboard: a "Shake" button and arrow-key nudges; the canvas has an `aria-label`.

**Delivery in two steps (recommended).**
- **v1 (ship early):** the rendered poster plus a simple drag with springs and idle breathing.
- **v2:** the full ball-bot physics on Rapier 3D, with the ported rig solver and the balance controller (section 4c). Rapier is loaded lazily after the poster is shown; v1 loads no physics engine.

## 4c. Khosrobot web port: architecture (FINAL)

The owner will port the Khosrobot rig logic and a **light version of Physirig** to the web. **Physics engine decision (FINAL): Rapier 3D** (`@dimforge/rapier3d` or `-compat`, WASM), not a custom solver. Build it as three modules in TypeScript; `khosrig` has no dependencies, and `physirig-lite` depends only on Rapier:
1. **`khosrig` (rig solver):** the geometry/calculus logic that places parts. Plain math, ported line for line. No dependencies.
2. **`physirig-lite` (physics layer on Rapier):** builds the Rapier world from the rig description file and adds the Physirig idea on top.
   - **Bodies and colliders:** simple primitives only (sphere or ball for the wheel, capsules and boxes for body, arms, hands and flaps). Never use the render meshes as colliders.
   - **Joints:** revolute and spherical joints with limits and motors; the pose-following behaviour comes from motorised joints or small corrective forces that pull each body toward the animated pose (the core Physirig idea, simplified).
   - **Balance controller:** a feedback loop (PD or LQR-style) on body lean that drives the wheel torque. Tune on the web, not by copying Unity numbers (PhysX and Rapier differ).
   - **Drag:** pointer ray picks a body and applies a spring force or a kinematic target to it (never teleports).
   - **Stepping:** fixed time step (60 or 120 Hz) with an accumulator, a cap on catch-up steps, a few solver iterations, sleeping when at rest.
   - No mesh colliders, no continuous collision, no large scenes. The site says plainly that this is a light web version and does not claim to be the full Physirig.
3. **Viewer and interaction:** three.js (tree-shaken), pointer handling and the loader. Meshes copy their transforms from Rapier bodies each frame, with the Z-up to Y-up conversion in one place.

**Loading Rapier.** Fetch it as a separate lazy chunk after the poster has painted and the page is idle; do not bundle it into the first-load JavaScript. Expect roughly 0.5 to 1.5 MB (measure with the real build; use Brotli on the host or the `-compat` build with the WASM inlined only if the host cannot serve `.wasm` correctly). Until Rapier is ready, v1 behaviour (poster and simple spring drag) stays active. If loading fails or WebAssembly is missing, stay on the poster and v1 behaviour.

Supporting pieces:
- **Rig description file (JSON):** bones, constraints, limits, colliders. A Blender Python exporter writes it next to a glTF; the web reads it. The same file could drive Unity later.
- **Golden tests:** run the original Blender/Unity logic on a set of poses and save the expected joint transforms as JSON. The `khosrig` port must match within a small tolerance (Vitest). **Physics is tested by behaviour, not by frame-by-frame numbers**, because Unity's PhysX and Rapier will not agree numerically: check that it balances, that arm and hand reach limits and joint angles stay within tolerance, and that it settles after a push of a given size. Deterministic fixed time step; no allocations per frame.
- **Conventions:** Blender is Z-up and three.js is Y-up, quaternion orders differ. Convert in exactly one place (the exporter or the loader), nowhere else.
- **Export only what the web needs:** the deform skeleton and the mechanical constraints, not the animator control rig.
- **Stability tests:** a fuzz test of random drags for 60 seconds must show no jitter, no explosions, and sleep at rest. Tune with damping, speed clamps and substeps.

**Repos.** The solver and physics libraries live in a **separate public repo (MIT)** with a placeholder model to demo them. The character's files do not go in any public repo (section 11).

## 5. Listing style (FINAL: hybrid)

One `Listing` component with a `variant` prop: `card | row | index`.
- **Home**: the top 3 featured items as `card` (image on top, kind + date, title, blurb; 3 columns), the rest as `row` (132x76 thumbnail left, title + blurb filling the line, kind + date right-aligned).
- **Work page**: `row`, grouped by theme. The Models section uses its own grid (section 7b).
- **Research and Writing**: `index` (date, kind, title, one line; no images), grouped by year in reverse chronological order. Writing may use `card` for a post with a strong image.
- **Mobile**: all variants collapse to one column; `row` thumbnails shrink to 96px.
Switching a page's style must be a one-line change.

Item fields: `kind` (WORK | WRITING | RESEARCH), `date`, `title`, `blurb`, `tags[]`, `tools[]`, `href`, `image?`, `video?`, `visibility`.

**Home featured items, in order**
1. Cosmology with Geometry Nodes (WRITING, BLENDER.ORG, Feb 2026): "Using Geometry Nodes to compute, visualize and debug CMB analyses." (card)
2. Physirig, physics-based rigging (WORK, ongoing) (card)
3. Procedural animation for a TPS game (WORK, Nov 2024) (card)
4. Animation system for a TPS game (WORK, Nov 2024)
5. Cap anomaly in the CMB (RESEARCH, Nov 2023)
6. Visualizing the CMB with geometry nodes (WRITING, Mar 2023)
7. Compute-shader effects (WORK, Mar 2021)
8. Toy2d / Hajmineh (WORK, Oct 2019)
9. Physics simulations / FeelPhysics (WORK, Feb 2019)

## 6. Work: project data and case-study template (FINAL)

Projects (title, year, tools, blurb):
- Physirig, 2022, Python/C++/Blender: collisions, constraints and physical posing for any custom rig, on PhysX.
- Procedural animations for a TPS game, 2024, Unreal/Blender: control-rig and physics-based motion for biped and quadruped characters.
- Animation system for a TPS game, 2024, Unreal/Blender: smooth inputs, leaning and hip rotation, with some physics in the loop.
- Geometry-based rigging (Khosrobot), 2018, Python/Blender/Unity: mechanical rigging driven by calculus and geometry, made for an AR project. (Its web port is the Home hero; link the two.)
- Compute-shader effects, 2021, C#/Unity/Blender: shrink-wrapping, heat flow and burning on the GPU, for a VR cable termination project.
- Physics simulations (FeelPhysics), 2019, C#/Unity/3ds Max/Blender: from-scratch simulations for an educational game of interactive experiments.
- Toy2d (Hajmineh), 2019, Python/OpenGL/Blender/3ds Max: unwrapped patterns of 3D models for cardboard-craft kits.
- Game-ready stylized character rig, 2019, Python/Blender/Unity: exports to any engine, with no blendshapes needed.
- Maya to Blender animation exporter, 2018, Python/Maya/Blender: moves animation and hair between the two packages.
- Maya environment simulator, 2018, MaxScript/3ds Max: lets Maya animators work inside 3ds Max with familiar tools.
- Squash-stretchy game-bones, 2013, 3ds Max/Maya/Unity: exportable squash and stretch bone chains for game engines.

**Curation (FINAL).** Fewer, stronger items beat eleven equal ones. Keep about seven main projects; move the weakest and oldest (for example the 2013 squash-stretch bones and the 2018 exporters) into a short **Earlier work** list (blurb + clip, no full page). The owner decides the final cut.

**Project page template.** The owner shows his *idea*, not proprietary code or assets. Every project page has these blocks, generated from frontmatter (`summary`, `problem`, `constraint`, `idea`, `result`, `role`, `diagram`):
1. **Problem**: what was broken or impossible, 1 to 2 sentences.
2. **Constraint**: what ruled out the obvious fix (performance budget, engine limit, workflow).
3. **Idea**: the insight that solved it, in plain words, with one freshly drawn diagram or sketch.
4. **Result**: what changed, with a number or a before/after clip if available.
5. **Tools and role**: one line, stating what the owner did versus the team.
Rules: draw new diagrams, never screenshot internal tools or code; describe techniques in general terms, not a studio's implementation; no client names or unreleased details without permission.
**Priority for deep case studies:** Physirig, the TPS animation system, the CMB with geometry nodes. Every kept project needs a one-line result (`TODO(owner)` if missing; never invent numbers).

## 6b. Project page layout (FINAL, see the "Project page" board)

Desktop, content column 1248px (page padding 56px), top to bottom:
1. **Back link** `← WORK` (mono, muted).
2. **Title block**, max 900px: theme label (amber mono, uppercase) + year; h1 (about 54px, Bricolage 700); one-line blurb (20px, secondary colour).
3. **Main clip**: full width, 520px high, rounded 10px, `#101620` background, bordered. A muted looping video (15 to 30 seconds, no sound), poster image first, lazy-loaded. Below it a mono caption row ("CLIP 1 of 3") and dots to switch clips. Click or hover plays; honour `prefers-reduced-motion` (show the poster only).
4. **Two columns** (gap 72px): LEFT flexible, RIGHT 300px sidebar.
   - LEFT, in order:
     - **WHAT IT IS**: a framed summary box (`#151B23`, 1px border `#263040`, radius 10px, padding 22px 26px), 2 to 3 plain sentences at 19px, so a recruiter gets the point in ten seconds. Frontmatter field `summary`.
     - **01 PROBLEM**, **02 CONSTRAINT**, **03 IDEA**, **04 RESULT**: each is a mono section label (amber number + muted name, bottom rule `#3A465A`) followed by prose at 17px/1.65 in `#C5CDD8`.
     - Inside **03 IDEA**: after the prose, a freshly drawn **diagram** (inline SVG in a bordered `#101620` panel with a mono caption), then a **"How it works" strip** of 3 equal step cards (`STEP 1/2/3` in amber mono, 16px title, 14px muted description). Frontmatter `diagram` and `steps[]` (max 4).
     - Inside **04 RESULT**: a two-column **before / after** clip pair (200px high each, short captions). Frontmatter `result` text plus `before` and `after` media. If a number exists, show it inline; if not, leave a `TODO(owner)`, never invent one.
   - RIGHT sidebar facts, each with a mono label and a bottom rule: ROLE, TOOLS (mono), YEAR, TAGS (mono), SHOWN AS (the `visibility` value: "video + case study", "turntable", "live demo", or "open source"; plus "Source is not published." when `video`), LINKS (amber, e.g. trailer, docs, repo).
5. **MORE WORK**: 3 related projects as `row` listings (section 5).
Optional blocks are hidden when their frontmatter is empty (steps, diagram, before/after), so short older projects render a compact page (summary, one clip, tools).
Mobile: single column; sidebar facts move under the title block as a compact two-column grid; step cards stack; before/after stack.

## 7. Lab (FINAL)

The Home hero is the Khosrobot character, so Home no longer picks a random Lab piece. The Lab page lists pieces as `card`s; each has its own page, README and source link, is self-contained (canvas/WebGL/SVG), pauses when off-screen, and respects `prefers-reduced-motion`.

Launch set, in priority order:
1. **Khosrobot sandbox:** the hero character with a larger stage and controls, linked to the project page and the library repo.
2. **Spring chain:** drag a mass and watch the wave travel.
3. **CMB sky, cap and mask:** slide a hemispherical cap over the Galactic mask.
4. **Double pendulum:** tiny changes, wildly different paths.
Pieces 2 to 4 are listed designs; each must be the owner's own implementation, or be labelled as AI-assisted and credited (authenticity rule, section 1). Later: a CMB sky viewer in WebGL/three.js.

Writing posts should embed small live demos where useful (a spring chain inside a post about waves, a sky viewer inside a CMB post). This is the main differentiator of the site.

## 7b. Models (3D modelling) (FINAL)

The owner has substantial 3D modelling work. It supports the case that he owns the whole pipeline (model, texture, rig, code). Rules:
- Show **6 to 10 of his best models**, not everything. Each has a caption: purpose, triangle count, tools, and one constraint solved. Add a `#modeling` tag. Only models he made, or has written permission to show. **Never other people's models.**
- **Client or employer work is shown visually only.** Use a **pre-rendered interactive turntable**: 36 to 72 frames rendered in Blender, delivered as WebP, where dragging scrubs through frames. No geometry or textures reach the browser, so nothing can be extracted. Provide passes the visitor can toggle: textured, clay and wireframe. Load the first frame as a poster and lazy-load the rest. Budget: measure, probably 0.5 to 1.5 MB per model.
- **Sketchfab** embeds only if the client agrees: downloads off, loaded only after a click ("Click to load 3D"), with a "View on Sketchfab" link. Embeds load third-party scripts, so never auto-load them.
- **Self-hosted live viewers** (`<model-viewer>` or three.js) only for models the owner fully owns, such as Khosrobot, under the licence in section 11.
- Show at most one live 3D viewer on screen at a time.

## 8. Visual design system (FINAL)

Dark only, amber accent. Quiet. No gradients, glassmorphism or glows (the metallic shading of the character is the one exception), no big CTAs, no pill buttons, no marketing copy.

Colours: background `#0D1117`; surface `#151B23`; image background `#101620`; lines `#263040` (borders) and `#3A465A` (section rules); text `#E6EAF0`; secondary `#A9B4C4` / `#C5CDD8`; muted `#8A96A8`; **amber `#FFB454`** only for kind labels, active nav item, links, Contact and small highlights; blue `#3C6FE0` and grey `#5F6B7C` for drawings only. Add `<meta name="color-scheme" content="dark">`.

Fonts (self-hosted, not loaded from Google at runtime): **Bricolage Grotesque** headings (700 for slogan and page titles, 500 elsewhere); **Instrument Sans** body/UI; **JetBrains Mono** labels, dates, tags and tool lists (small, kind labels uppercase with 1px letter-spacing); **Source Serif 4** (or Newsreader) for long reading in Writing and About; **KaTeX** for math. No other families.

Effects (subtle): the hero character is the main motion on the site; row/card hover is 150ms ease with the title turning white and/or a 1px amber line, no lift or scale; Work thumbnails show a still image and play a short muted loop on hover only; optional very faint grid behind the hero at 3 to 5% opacity; honour `prefers-reduced-motion` everywhere.

## 9. Research page

Sections: Publications (title, authors, venue, year, links to arXiv/DOI/code/data), Talks (with slides), Code and datasets, CV downloads. Generate the list from a data file (BibTeX or JSON exported from ORCID / INSPIRE / Scholar). Add Zenodo DOIs for code and data releases. Two CV downloads: industry and academic. Include the thesis title and institution. Layout: `index` variant grouped by year.

## 10. Writing page

Markdown/MDX in the repo, serif body, KaTeX math, code highlighting, tags, reading time, RSS. `index` variant grouped by year (the plain year-grouped list style of blog.maximeheckel.com is the model for this page).

**Planned flagship posts (owner writes):** (1) "Moving a Blender rig to the browser", on the Khosrobot port; (2) one piece that joins the two careers (what cosmology taught him about rigging, or the other way round). Each ships with a live demo where it helps. Date every post and keep the newest first.

## 10b. Blog post page layout (FINAL, see the "Blog post page" board)

Desktop: three zones centred in the page: LEFT rail 190px, CENTRE reading column **680px**, 72px gaps.
- **Left rail**: `← WRITING` back link, then "ON THIS PAGE", a table of contents generated from `h2`s (14px, left rule `#263040`; the section in view is amber and the others secondary). Sticky while scrolling. Hidden below 1100px.
- **Header**: mono row with kind (amber) + date + reading time; h1 (about 46px, Bricolage 700); a 21px serif dek in `#A9B4C4`; tags in mono. A 1px rule separates the header from the body.
- **Body** in **Source Serif 4**, 19px/1.72, `#C5CDD8`; `h2` in Bricolage 500 at 28px; links amber.
- **Live demo figure** (a React/Astro island): full panel `#101620`, 1px border, radius 10px, slightly **wider than the text** (about 40px out on each side), with a mono caption "FIG n · LIVE · what to do" and a "view source →" link to the demo's code. It must pause off-screen and have a static fallback image.
- **Equations** with KaTeX: block equations centred in a `#151B23` panel, 26px.
- **Code blocks**: `#151B23`, 1px border, radius 8px, a header bar with the filename and a copy button, mono 13px/1.7, syntax-highlighted in the palette (muted comments).
- **Post footer**: licence line (mono: text CC BY-NC 4.0, code MIT, source on GitHub), then PREVIOUS and NEXT post links (mono label + title).
Mobile: single column, no left rail; TOC becomes a collapsible "On this page" at the top; figures go full width.

## 11. Open source, licences and what goes in the repo (FINAL)

The site is in a PUBLIC GitHub repo (`jamshidi3d.github.io`); everything committed is public, and GitHub's terms let anyone fork a public repo whatever licence it carries.
- **Code:** MIT (`LICENSE`).
- **Writing, images and video:** CC BY-NC 4.0, or all rights reserved for named assets (`LICENSE-CONTENT.md` says which).
- **The Khosrobot model and textures: ALL RIGHTS RESERVED.** No copying, redistribution or use for AI training. Footer line on the site: "© MH Jamshidi. The Khosrobot character, its model and textures are all rights reserved." Creative Commons has no "view only" option, so no CC licence for the character. Add `<meta name="robots" content="noai, noimageai">` (a request, not enforcement).
- **Keep the master files private:** the full-resolution model, textures and `.blend` never enter any public repo. Publish only a **light, compressed mesh with a small texture atlas** (mobile-optimised), hosted **outside the repo** (private storage such as Cloudflare R2, or a private repo whose deploy step copies it), under hashed file names and never directly linked. An optional custom packed format raises the effort for casual extraction; it is obfuscation, not security. The limit is stated honestly: anything the browser needs, a determined person can extract; the licence and the light version are the protection.
- **Libraries** (`khosrig`, `physirig-lite`) go in a separate public MIT repo with a placeholder model. Rapier is a dependency (Apache-2.0); list it in Credits.
- **Never commit** studio/client assets, NDA material, source of shipped games, unreleased tools, secrets or private drafts. Shipped, client or sellable projects appear as video clips, screenshots, turntables and a written case study only.
- Each project has `visibility: video | turntable | live | open-source` (`video`: no code or source files published; `turntable`: pre-rendered interactive frames, no geometry published; `live`: demo runs in the page; `open-source`: demo plus linked source repo).
- Heavy media (videos, frame sets, large textures) is hosted outside the repo (Cloudflare R2, YouTube/Vimeo unlisted, or Git LFS). Keep `.gitignore` strict for raw project files and `.env`.
- `draft: true` excludes an item from the build, but the file is still visible in a public repo, so private drafts stay on the owner's machine.
- Before any old portfolio asset enters the repo, the owner confirms he may show it (employer/client rights). Prefer a clip over source files.
- A **Credits** section on About lists libraries (three.js and any others), tools, fonts and their licences.

## 12. Technical stack and quality (recommended; explain any deviation)

- **Astro** with content collections (`src/content/{projects,writing,research,lab,models}`), typed frontmatter, MDX, islands for the hero and Lab pieces. Home listing and Work page are generated from content, not hand-written. Deploy with GitHub Actions to GitHub Pages.
- **Hero loading:** the poster is in the HTML and decides LCP. Load three.js and the physics modules (Rapier) lazily after the first paint (idle callback), never blocking it. Target (measure, do not promise): about 400 KB for the first-load hero (poster, viewer, model); the lazy Rapier chunk is counted separately and should stay near 1 MB or less, and 60 fps on a mid-range laptop, steady at 30+ on a mid-range phone. If it is slower, drop render resolution before dropping features.
- Performance: Lighthouse 95+ on all four scores, no layout shift, AVIF/WebP with `srcset`, short muted MP4/WebM loops lazy-loaded.
- Accessibility: keyboard-navigable menu, visible amber focus rings, AA contrast or better, alt text everywhere, the mobile overlay traps focus and closes on Escape; hero fallbacks for reduced motion and no WebGL.
- SEO and sharing: per-page title and description, Open Graph images (the character's poster for the site and posts), `sitemap.xml`, RSS, JSON-LD (`Person`, `ScholarlyArticle`).
- No trackers or cookie banners. If analytics are wanted, a privacy-friendly one (Plausible or GoatCounter), only after asking the owner.

## 13. Things to avoid

- Anything "commercial": hero CTAs, pill buttons, marketing copy, logo walls, testimonials.
- A "Featured on…/covered by…" line.
- A light theme, a sidebar header.
- Separate sites or navigation for "tools" versus "physics".
- Third-party or AI-generated work presented as the owner's; models and demos he did not make.
- Placeholder content passed off as real; mark gaps `TODO(owner)`.
- Any real model or master file in the public repo (section 11).

## 14. Content standards (target: 10 out of 10)

A stranger should be able to tell in three minutes what the owner did, how well, and that others confirm it.
- A one-line **result** on every kept project (number if possible: time saved per shot, cost per frame, users, what shipped).
- Three **deep case studies** with a fresh diagram and a clip: Physirig, the TPS animation system, the CMB with geometry nodes.
- A short **role sentence** per project (owner versus team).
- Real **Research data** (publications, thesis, talks), the Blender story on About, plus 80.lv and BlenderNation.
- Real adoption evidence where it exists (Physirig downloads/users, releases, stars).
- Date everything; newest first; remove any claim that cannot be backed up.
- The hero must reach the **first screen** together with the slogan, three featured cards and a quiet CV link.

## 15. Hero acceptance criteria

- Stable after 60 seconds of rough dragging: no jitter, no explosions, comes to rest.
- Zero GPU use when still; paused when off-screen.
- Poster visible immediately; reduced motion and no WebGL show the poster only; everything else still works.
- On a phone, drag moves the character and scrolling still works elsewhere.
- No master asset in any public repo; hero transfer within the target in section 12.
- With Rapier loaded, the character balances unaided, recovers from a push in any direction, hands and flaps respect their limits, and it sleeps at rest (no CPU or GPU use).
- If Rapier fails to load or WebAssembly is unavailable, the page still shows the poster and the v1 drag with no errors.

## 16. Build order

1. Astro skeleton, self-hosted fonts, colour tokens, header and mobile menu.
2. `Listing` component (three variants) wired to content collections; project page and post page templates (sections 6b and 10b).
3. Home with the **hero v1** (poster, simple drag, idle) and the listing; Work page with filters and the Models section (turntables).
4. Migrate Writing posts (Chirpy) with redirects; KaTeX and code styles.
5. Research page from BibTeX; About with press and Credits; CV downloads.
6. Khosrobot port: audit and rig description exporter, golden tests, `khosrig`, then `physirig-lite` on Rapier 3D (world from the rig file, joints, balance controller, drag), then **hero v2** and the Lab sandbox; publish the library repo.
7. Lab pages for the other pieces; embed live demos in posts; the flagship posts.
8. Accessibility, performance and SEO pass; licence files; deploy.

Definition of done: all pages (including a project page and a post page) match the mockups at 1360px and 390px (hero per section 4b); old URLs redirect; Lighthouse targets met; section 15 passes; no `TODO(owner)` left in shipped content; no restricted asset in any public repo.

## 17. What the owner must still supply

1. Contact links: email, GitHub, LinkedIn, Scholar, ORCID, INSPIRE.
2. Real images and short clips for each Work project (priority: Physirig, TPS animation system, CMB geometry nodes), and a one-line result per project.
3. Exact 80.lv and BlenderNation URLs.
4. Publications source (BibTeX or ORCID), the thesis title and both CV PDFs.
5. Domain decision: keep `jamshidi3d.github.io` or a custom domain.
6. Confirmation of which old portfolio assets he is allowed to publish, including the rights position of the Khosrobot AR project code.
7. For the hero: the Khosrobot export (light mesh, atlas), the list of deform bones and mechanical constraints, a description or copy of the rig logic to port, and a transparent poster render.
8. Whether Physirig is a product and which parts of the light web version may be open source.
9. For Models: the list of 6 to 10 models, which have client permission, the triangle counts and tools, and the turntable renders.
