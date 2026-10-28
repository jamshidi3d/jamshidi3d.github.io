export const SITE = {
  name: 'MH Jamshidi',
  fullName: 'MohammadHossein Jamshidi',
  tagline: 'I make Physics Move',
  intro:
    'My work runs from physics research to game animation and rigging, with AI solutions built into both. I’m a PhD candidate in cosmology and have worked as a technical artist since 2012. Simulation problems are where the two meet.',
  description:
    'Physics research, game animation and rigging, with AI solutions built into both. PhD candidate in cosmology and technical artist since 2012.',
  url: 'https://jamshidi3d.github.io',
};

export const NAV = [
  { href: '/work/', label: 'Work', desc: 'Games, simulations, tools etc.' },
  { href: '/lab/', label: 'Lab', desc: 'Interactive experiments & toys' },
  { href: '/research/', label: 'Research', desc: 'Publications, talks & code' },
  { href: '/writing/', label: 'Writing', desc: 'Notes, tutorials & essays' },
  { href: '/about/', label: 'About', desc: 'Story, links & credits' },
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
  cvIndustry: '/cv/Jamshidi_Resume_Game-Industry_Technical-Animator.pdf',
  cvAcademic: '/cv/Jamshidi_Resume_Academic_Physics-Cosmology.pdf',
};

export const ROLE_TAGS = ['tools', 'physics', 'animation', 'tech-art', 'modeling'] as const;

export const THEMES = [
  'Rigging and animation',
  'GPU and simulation',
  'Pipeline and tools',
  'Science and visualization',
] as const;
