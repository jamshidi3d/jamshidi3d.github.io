// TODO(owner): replace with a BibTeX/ORCID export (title, authors, venue, year, links).
export type ResearchEntry = {
  title: string;
  date: Date;
  blurb?: string;
  tags: string[];
  href?: string;
  home?: number;
};

export const publications: ResearchEntry[] = [
  {
    title: 'Cap anomaly in the CMB',
    date: new Date('2023-11-01'),
    tags: ['physics'],
    home: 5,
  },
];

export const talks: ResearchEntry[] = [];
export const code: ResearchEntry[] = [];
