// Games shown at the top of Work. Source: "game titles/GameTitles.txt" (logos are the *_High.png files, exported to public/media/games).
// Fields that are not known are left out and simply not shown.
export interface GameLink {
  label: string;
  href: string;
  external?: boolean; // opens in a new tab
}

export interface Game {
  slug: string;
  title: string;
  logo: string;
  studio: string;
  released: string;
  role?: string;
  platform?: string;
  desc?: string; // two short lines, written from the store/website pages
  links: GameLink[]; // first one is drawn as the gold button
}

// Newest first.
export const GAMES: Game[] = [
  {
    slug: 'tamitos',
    title: 'Tamitos (early access)',
    logo: '/media/games/tamitos.webp',
    studio: 'Qorpo',
    released: '2026',
    role: 'Senior technical animator',
    platform: 'Unreal, Windows',
    desc:
      'A 3D adventure where two sisters, Ela and Lumi, learn to understand autistic friends who see the world differently.',
    links: [
      { label: 'Website', href: 'https://tamitos.com/en', external: true },
      { label: 'Trailer', href: '/games/tamitos/' },
    ],
  },
  {
    slug: 'aneemate',
    title: 'Aneemate',
    logo: '/media/games/aneemate.webp',
    studio: 'Qorpo',
    released: '2025',
    role: 'Senior technical animator',
    platform: 'Unreal, Windows',
    desc:
      'A fantasy creature-bonding extraction shooter: a creature chooses you and shares an Aura that shapes your power.',
    links: [
      { label: 'Epic Games', href: 'https://store.epicgames.com/p/aneemate-896b7e', external: true },
      { label: 'Procedural animation', href: '/work/tps-procedural-animation/' },
    ],
  },
  {
    slug: 'citizen-conflict',
    title: 'Citizen Conflict',
    logo: '/media/games/citizen-conflict.webp',
    studio: 'Qorpo',
    released: '2024',
    role: 'Senior technical animator',
    platform: 'Unreal, Windows',
    desc:
      'A free-to-play hero shooter in a futuristic dystopia, where three rival factions fight for control.',
    links: [
      { label: 'Epic Games', href: 'https://store.epicgames.com/p/citizen-conflict-95e40e', external: true },
      { label: 'Animation system', href: '/work/tps-animation-system/' },
    ],
  },
  {
    slug: 'hardambil',
    title: 'Hardambil',
    logo: '/media/games/hardambil.webp',
    studio: 'DeedemaGames',
    released: '2018',
    role: 'Technical artist',
    platform: 'Unity, Android',
    desc:
      'A real-time online strategy game for Android, played against other people.',
    links: [
      { label: 'Trailer', href: 'https://www.youtube.com/watch?v=h3LDTvjCU4s', external: true },
      { label: 'Maya to Blender exporter', href: '/work/maya-to-blender/' },
    ],
  },
  {
    slug: 'parvaneh',
    title: 'Parvaneh: Legacy of the Light’s Guardians',
    logo: '/media/games/parvaneh.webp',
    studio: 'BeardedBird',
    released: '2014',
    role: 'Modeler, Technical artist',
    platform: 'Unity, Windows',
    desc:
      'Action-adventure in the world of Naria, where a boy defends his village from the Khazdaks polluting its river.',
    links: [
      {
        label: 'Steam',
        href: 'https://store.steampowered.com/app/353990/Parvaneh_Legacy_of_the_Lights_Guardians/',
        external: true,
      },
      { label: 'Squash-stretchy bones', href: '/work/squash-stretch-bones/' },
    ],
  },
  {
    slug: 'lehestan',
    title: 'Lehestan',
    logo: '/media/games/lehestan.webp',
    studio: 'BeardedBird',
    released: '2013',
    role: 'Modeler',
    platform: 'Unity, Android',
    desc:
      'A casual mobile game: Naria is the one healthy city in Gitima, and you help it fight off attacking creatures.',
    links: [{ label: 'Cafe Bazaar', href: 'https://cafebazaar.ir/app/com.BeardedBird.Lehestan', external: true }],
  },
];
