// Publications. TODO(owner): add talks, code/datasets, the thesis title.
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
    blurb:
      'MohammadHossein Jamshidi, Abdolali Banihashemi, Nima Khosravi. The Astrophysical Journal 972(1), 77.',
    abstract:
      'We have studied the cosmic microwave background (CMB) map looking for features beyond cosmological isotropy. We began by tiling the CMB variance maps (which are produced by different smoothing scales) with stripes of different sizes along the most prominent dipole direction. We were able to confirm previous findings regarding the significance of the dipole. Furthermore, we discovered that some of the higher multipoles exhibit significance comparable to the dipole that naturally depends on the smoothing scales. In the end, we discussed this result having an eye on the look-elsewhere-effect. We believe our results may indicate an anomalous patch in the CMB sky that warrants further investigation.',
  },
];

export const talks: ResearchEntry[] = [];
export const code: ResearchEntry[] = [];
