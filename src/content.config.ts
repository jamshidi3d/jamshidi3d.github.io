import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

import { ROLE_TAGS, THEMES } from './data/site';

const step = z.object({ title: z.string(), text: z.string() });

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
    badge: z.string().optional(), // e.g. BLENDER.ORG
    external: z.string().url().optional(), // listed only, links elsewhere
    home: z.number().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, writing };
