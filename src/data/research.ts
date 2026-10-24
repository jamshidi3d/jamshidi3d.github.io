// Publications, talks and code. TODO(owner): datasets, the thesis title.
export type ResearchEntry = {
  title: string;
  date: Date;
  blurb?: string;
  tags: string[];
  href?: string;
  home?: number;
  authors?: string[];
  venue?: string;
  doi?: string;
  abstract?: string;
};

export const publications: ResearchEntry[] = [
  {
    title: 'On the (Higher Multipoles) Variance Asymmetry in the Cosmic Microwave Background',
    date: new Date('2024-08-01'),
    authors: ['MohammadHossein Jamshidi', 'Abdolali Banihashemi', 'Nima Khosravi'],
    venue: 'The Astrophysical Journal, 972(1), 77',
    doi: '10.3847/1538-4357/ad68ff',
    href: 'https://doi.org/10.3847/1538-4357/ad68ff',
    tags: ['physics'],
    home: 5,
    blurb:
      'MohammadHossein Jamshidi, Abdolali Banihashemi, Nima Khosravi. The Astrophysical Journal 972(1), 77.',
    abstract:
      'We have studied the cosmic microwave background (CMB) map looking for features beyond cosmological isotropy. We began by tiling the CMB variance maps (which are produced by different smoothing scales) with stripes of different sizes along the most prominent dipole direction. We were able to confirm previous findings regarding the significance of the dipole. Furthermore, we discovered that some of the higher multipoles exhibit significance comparable to the dipole that naturally depends on the smoothing scales. In the end, we discussed this result having an eye on the look-elsewhere-effect. We believe our results may indicate an anomalous patch in the CMB sky that warrants further investigation.',
  },
];

export const talks: ResearchEntry[] = [
  {
    title: 'Higher multipole anomalies in the CMB',
    date: new Date('2023-07-10'),
    venue: 'DSU2023 (The Dark Side of the Universe), Kigali, Rwanda',
    tags: ['physics'],
    blurb: 'DSU2023 (The Dark Side of the Universe), Kigali, Rwanda. 10-14 July 2023.',
  },
];
export const code: ResearchEntry[] = [
  {
    title: 'patch_cosmic_parameters',
    date: new Date('2026-07-24'),
    tags: ['physics', 'python'],
    href: 'https://github.com/Jamshidi3d/patch_cosmic_parameters',
    blurb:
      'Python package and notebooks that fit the cosmological parameters to the Planck TT, TE and EE power spectra on the full sky and on 12 separate patches of it, to see whether different parts of the sky agree.',
  },
  {
    title: 'cosmic_projection_and_aberation',
    date: new Date('2026-09-16'),
    tags: ['physics', 'python'],
    href: 'https://github.com/Jamshidi3d/cosmic_projection_and_aberation',
    blurb:
      'Python code to add the Doppler aberration to a HEALPix sky map and to project maps: it resamples a deformed sphere onto a standard HEALPix grid with area weights and cuts out flat gnomonic patches, with an optional GPU backend.',
  },
  {
    title: 'rtl-tex-editor',
    date: new Date('2026-09-04'),
    tags: ['tools'],
    href: 'https://github.com/Jamshidi3d/rtl-tex-editor',
    blurb:
      'A local TeX and Markdown editor for right-to-left languages such as Persian: lines mix directions correctly, LaTeX commands and math stay left-to-right, and there is a live PDF preview with two-way SyncTeX.',
  },
  {
    title: 'CosmicBlenderNodes',
    date: new Date('2023-12-12'),
    tags: ['physics', 'blender'],
    href: 'https://github.com/Jamshidi3d/CosmicBlenderNodes',
    blurb:
      "Cosmology in Blender's geometry nodes: Blender files that visualise the HEALPix sphere and CMB data, the Doppler boost, the Mollweide projection, weak lensing and spherical harmonics.",
  },
  {
    title: 'cmb_anomaly_detection',
    date: new Date('2022-03-19'),
    tags: ['physics', 'python'],
    href: 'https://github.com/Jamshidi3d/cmb_anomaly_detection',
    blurb:
      'Notebooks and utilities for detecting the directional anomaly in the CMB map: local variance at higher multipoles, local skewness and kurtosis, and a galactic foreground model.',
  },
];
