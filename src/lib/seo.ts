import { LINKS, NAV, SITE } from '../data/site';

/** structured data (schema.org JSON-LD) builders; Base.astro puts them in one @graph with the Person, the WebSite and the breadcrumbs */
export type JsonLd = Record<string, unknown>;

export const PERSON_ID = `${SITE.url}/#person`;
export const abs = (path: string) => new URL(path, SITE.url).href;

export const personLd = (): JsonLd => ({
  '@type': 'Person',
  '@id': PERSON_ID,
  name: SITE.fullName,
  alternateName: SITE.name,
  url: SITE.url,
  email: `mailto:${LINKS.email}`,
  jobTitle: 'Physics PhD candidate and technical artist',
  sameAs: [LINKS.github, LINKS.linkedin, LINKS.scholar, LINKS.orcid, LINKS.inspire].filter(Boolean),
});

export const websiteLd = (): JsonLd => ({
  '@type': 'WebSite',
  '@id': `${SITE.url}/#website`,
  name: SITE.fullName,
  alternateName: SITE.name,
  url: SITE.url,
  description: SITE.description,
  publisher: { '@id': PERSON_ID },
});

/** Home > section > page, from the address: only sections that exist are named (a page outside them gets Home > page) */
export function breadcrumbLd(pathname: string, title?: string): JsonLd | null {
  const segs = pathname.split('/').filter(Boolean);
  if (!segs.length) return null;
  const section = NAV.find((n) => n.href === `/${segs[0]}/`) ?? (segs[0] === 'models' ? NAV.find((n) => n.href === '/work/') : undefined);
  const crumbs: { name: string; href: string }[] = [{ name: 'Home', href: '/' }];
  if (section) crumbs.push({ name: section.label, href: section.href });
  if (!section || pathname !== section.href) crumbs.push({ name: title ?? segs[segs.length - 1], href: pathname });
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: abs(c.href) })),
  };
}

export const webApplicationLd = (o: { name: string; description: string; path: string; image?: string }): JsonLd => ({
  '@type': 'WebApplication',
  name: o.name,
  description: o.description,
  url: abs(o.path),
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'Any',
  browserRequirements: 'Requires JavaScript and WebGL',
  isAccessibleForFree: true,
  author: { '@id': PERSON_ID },
  ...(o.image ? { image: abs(o.image) } : {}),
});

export const blogPostingLd = (o: { title: string; description?: string; path: string; date: Date; image?: string; tags?: string[] }): JsonLd => ({
  '@type': 'BlogPosting',
  headline: o.title,
  ...(o.description ? { description: o.description } : {}),
  url: abs(o.path),
  mainEntityOfPage: abs(o.path),
  datePublished: o.date.toISOString(),
  dateModified: o.date.toISOString(),
  author: { '@id': PERSON_ID },
  publisher: { '@id': PERSON_ID },
  ...(o.image ? { image: abs(o.image) } : {}),
  ...(o.tags?.length ? { keywords: o.tags.join(', ') } : {}),
});

export const scholarlyArticleLd = (o: { title: string; authors?: string[]; date: Date; venue?: string; doi?: string; href?: string; abstract?: string }): JsonLd => ({
  '@type': 'ScholarlyArticle',
  headline: o.title,
  name: o.title,
  datePublished: o.date.toISOString().slice(0, 10),
  ...(o.authors?.length ? { author: o.authors.map((name) => ({ '@type': 'Person', name })) } : {}),
  ...(o.venue ? { isPartOf: { '@type': 'Periodical', name: o.venue.split(',')[0] } } : {}),
  ...(o.doi ? { identifier: { '@type': 'PropertyValue', propertyID: 'DOI', value: o.doi } } : {}),
  ...(o.href ? { url: o.href, sameAs: o.href } : {}),
  ...(o.abstract ? { abstract: o.abstract } : {}),
});
