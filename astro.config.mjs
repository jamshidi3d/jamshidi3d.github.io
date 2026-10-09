import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { unified } from '@astrojs/markdown-remark';

export default defineConfig({
  site: 'https://jamshidi3d.github.io',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [mdx(), sitemap()],
  markdown: {
    processor: unified({ remarkPlugins: [remarkMath], rehypePlugins: [rehypeKatex] }),
    shikiConfig: { theme: 'github-dark-dimmed', wrap: false },
  },
  // Old Jekyll URLs keep working.
  redirects: {
    '/posts/cmb_in_geometry_nodes/': '/writing/cmb-in-geometry-nodes/',
    '/tabs/about/': '/about/',
    '/tabs/portfolio/': '/portfolio/',
    '/tabs/categories/': '/writing/',
    '/tabs/tags/': '/writing/',
    '/categories/': '/writing/',
    '/tags/': '/writing/',
    '/archives/': '/writing/',
  },
});
