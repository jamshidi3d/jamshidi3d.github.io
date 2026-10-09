import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts } from '../lib/items';
import { SITE } from '../data/site';

export async function GET(context: APIContext) {
  const posts = await getPosts();
  return rss({
    title: SITE.name,
    description: SITE.description,
    site: context.site ?? SITE.url,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.blurb,
      pubDate: p.data.date,
      link: p.data.external ?? `/writing/${p.id}/`,
    })),
  });
}
