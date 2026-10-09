import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

import { ROLE_TAGS, THEMES } from './data/site';

const step = z.object({ title: z.string(), text: z.string() });

// YouTube videos shown as click-to-load facades. "mine" = made by me; "by others" gets a credit link.
const video = z.object({
  id: z.string(),
  title: z.string(),
  role: z.enum(['mine', 'by others']),
  author: z.string().optional(),
  start: z.number().optional(),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    dateLabel: z.string().optional(),
    theme: z.enum(THEMES),
    blurb: z.string(),
    tags: z.array(z.enum(ROLE_TAGS)),
    tools: z.array(z.string()),
    byline: z.string().optional(), // e.g. "Blender.org": shown in the card label, adds the external-link arrow; not a category
    client: z.string().optional(),
    public: z.boolean().default(true), // false: show only the generic description, hide client/studio
    videos: z.array(video).default([]),
    visibility: z.enum(['video', 'turntable', 'live', 'open-source']).default('video'),
    image: z.string().optional(),
    video: z.string().optional(),
    // case-study blocks (all optional; empty blocks are hidden)
    summary: z.string().optional(),
    problem: z.string().optional(),
    constraint: z.string().optional(),
    idea: z.string().optional(),
    result: z.string().optional(),
    role: z.string().optional(),
    steps: z.array(step).max(4).optional(),
    links: z.array(z.object({ label: z.string(), href: z.string() })).default([]),
    related: z.array(z.string()).default([]),
    // listing
    home: z.number().optional(), // rank on the Home page (1 = first)
    earlier: z.boolean().default(false), // short "Earlier work" entry, no full page
    draft: z.boolean().default(false),
  }),
});

const writing = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    dek: z.string().optional(),
    blurb: z.string(),
    categories: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    roles: z.array(z.enum(ROLE_TAGS)).default([]),
    image: z.string().optional(),
    byline: z.string().optional(), // e.g. "Blender.org": shown in the card label, adds the external-link arrow; not a category
    kind: z.enum(['WRITING', 'RESEARCH']).default('WRITING'),
    hideInWriting: z.boolean().default(false), // not written by me: keep out of the Writing index
    videos: z.array(video).default([]),
    external: z.string().url().optional(), // listed only, links elsewhere
    home: z.number().optional(),
    draft: z.boolean().default(false),
  }),
});

// 3D models shown on Work. Third-party viewers load only after a click.
const models = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/models' }),
  schema: z.object({
    title: z.string(),
    blurb: z.string(),
    tags: z.array(z.enum(ROLE_TAGS)).default(['modeling']),
    tools: z.array(z.string()).default([]),
    triangles: z.string().optional(),
    image: z.string().optional(), // local copy of the Sketchfab thumbnail
    sketchfab: z.object({ id: z.string(), slug: z.string(), author: z.string(), authorUrl: z.string() }),
    audio: z.object({ src: z.string(), credit: z.string(), creditUrl: z.string().optional() }).optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, writing, models };
