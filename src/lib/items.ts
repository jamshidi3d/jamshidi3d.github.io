import { getCollection, type CollectionEntry } from 'astro:content';
import { publications } from '../data/research';

export type Kind = 'WORK' | 'WRITING' | 'RESEARCH' | 'MODELING';

export interface ListItem {
  kind: Kind;
  date: Date;
  dateLabel?: string;
  title: string;
  blurb: string;
  tags: string[];
  tools?: string[];
  href?: string;
  external?: boolean;
  byline?: string;
  hideInWriting?: boolean;
  image?: string;
  video?: string;
  preview?: string;
  home?: number;
  theme?: string;
  earlier?: boolean;
  slug?: string;
}

export const fmtDate = (d: Date) =>
  d.toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });

export const byDateDesc = (a: ListItem, b: ListItem) => b.date.getTime() - a.date.getTime();

export async function getProjects(): Promise<CollectionEntry<'projects'>[]> {
  const all = await getCollection('projects', (p) => !p.data.draft);
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getPosts(): Promise<CollectionEntry<'writing'>[]> {
  const all = await getCollection('writing', (p) => !p.data.draft);
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function projectItem(p: CollectionEntry<'projects'>): ListItem {
  const d = p.data;
  return {
    kind: 'WORK',
    date: d.date,
    dateLabel: d.dateLabel,
    title: d.title,
    blurb: d.blurb,
    tags: d.tags,
    tools: d.tools,
    byline: d.byline,
    href: `/work/${p.id}/`,
    image: d.image,
    video: d.video,
    preview: d.video ? `/media/preview/${d.video.split('/').pop()!.replace(/.mp4$/, '')}.gif` : undefined,
    home: d.home,
    theme: d.theme,
    earlier: d.earlier,
    slug: p.id,
  };
}

export async function getModels(): Promise<CollectionEntry<'models'>[]> {
  const all = await getCollection('models', (m) => !m.data.draft);
  return all.sort((a, b) => a.data.title.localeCompare(b.data.title));
}

// Models have no date; they sort by title and show only "MODELING" in the card label.
export function modelItem(m: CollectionEntry<'models'>): ListItem {
  const d = m.data;
  return {
    kind: 'MODELING',
    date: new Date(0),
    dateLabel: '',
    title: d.title,
    blurb: d.blurb,
    tags: d.tags,
    tools: d.tools,
    href: `/models/${m.id}/`,
    image: d.image,
    slug: m.id,
  };
}

export function postItem(p: CollectionEntry<'writing'>): ListItem {
  const d = p.data;
  return {
    kind: d.kind,
    date: d.date,
    title: d.title,
    blurb: d.blurb,
    tags: d.roles,
    href: d.external ?? `/writing/${p.id}/`,
    external: !!d.external,
    byline: d.byline,
    hideInWriting: d.hideInWriting,
    image: d.image,
    home: d.home,
    slug: p.id,
  };
}

export async function allItems(): Promise<ListItem[]> {
  const [projects, posts] = await Promise.all([getProjects(), getPosts()]);
  const research: ListItem[] = publications.map((r) => ({
    kind: 'RESEARCH',
    date: r.date,
    title: r.title,
    blurb: r.blurb ?? '',
    tags: r.tags,
    href: r.href,
    external: !!r.href && /^https?:/.test(r.href),
    home: r.home,
  }));
  return [...projects.map(projectItem), ...posts.map(postItem), ...research];
}

export function groupByYear<T extends { date: Date }>(items: T[]): [number, T[]][] {
  const map = new Map<number, T[]>();
  for (const it of items) {
    const y = it.date.getUTCFullYear();
    map.set(y, [...(map.get(y) ?? []), it]);
  }
  return [...map.entries()].sort((a, b) => b[0] - a[0]);
}
