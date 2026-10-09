export const SITE = {
  name: 'MH Jamshidi',
  fullName: 'MohammadHossein Jamshidi',
  tagline: 'I make Physics Move',
  intro:
    "Simulation, rigging and tools, from game animation to cosmology research. I'm a PhD candidate in physics and have worked as a technical artist since 2012. This is where the two meet.",
  description:
    'MohammadHossein (MH) Jamshidi: physics PhD candidate (cosmology) and technical artist. Simulation, rigging and tools, writing and research.',
  url: 'https://jamshidi3d.github.io',
};

export const NAV = [
  { href: '/work/', label: 'Work', desc: 'Rigging, simulation and tools' },
  { href: '/lab/', label: 'Lab', desc: 'Small interactive experiments' },
  { href: '/research/', label: 'Research', desc: 'Publications, talks and code' },
  { href: '/writing/', label: 'Writing', desc: 'Notes, tutorials and essays' },
  { href: '/about/', label: 'About', desc: 'Story, links and credits' },
];

// Links that are not known yet are left undefined and simply not rendered.
// TODO(owner): LinkedIn, Scholar, ORCID, INSPIRE, CV PDFs.
export const LINKS: {
  email: string;
  github: string;
  linkedin?: string;
  scholar?: string;
  orcid?: string;
  inspire?: string;
  cvIndustry?: string;
  cvAcademic?: string;
} = {
  email: 'jamshidi3d@gmail.com',
  github: 'https://github.com/Jamshidi3d',
};

export const ROLE_TAGS = ['tools', 'physics', 'animation', 'tech-art', 'modeling'] as const;

export const THEMES = [
  'Rigging and animation',
  'GPU and simulation',
  'Pipeline and tools',
  'Science and visualization',
] as const;
