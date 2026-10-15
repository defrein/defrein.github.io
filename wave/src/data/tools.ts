import { BookOpenText, CalendarDays, Camera, Disc3, LibraryBig, PanelsTopLeft } from '@lucide/svelte';

// Keep these destinations relative to the domain root, matching the original portfolio.
// Add a tool here and import its Lucide icon above; the grid updates automatically.
export const tools = [
  {
    title: 'Roulette Wheel',
    description: 'Add your choices, spin the wheel, and let it pick. Keep track of previous results.',
    href: '/others/roulette-wheel/',
    icon: Disc3,
  },
  {
    title: 'NLM Viewer',
    description: 'Browse journal records, choose which fields to display, and save the data as JSON.',
    href: '/others/NLM_viewer/',
    icon: BookOpenText,
  },
  {
    title: 'Story',
    description: 'A quiet place to browse stories and settle into a read.',
    href: '/others/story/',
    icon: LibraryBig,
  },
  {
    title: 'MyJadwal',
    description: 'See the week at a glance, with time for work, learning, exercise, and rest.',
    href: '/others/jadwal/',
    icon: CalendarDays,
  },
  {
    title: 'Photobooth',
    description: 'Open my photobooth for a quick photo session.',
    href: '/photobooth/',
    icon: Camera,
  },
  {
    title: 'Portfolio v1',
    description: 'Revisit the first version of my personal portfolio.',
    href: '/v.1/',
    icon: PanelsTopLeft,
  },
  {
    title: 'Portfolio v2',
    description: 'Explore the second version of my personal portfolio.',
    href: '/v.2/',
    icon: PanelsTopLeft,
  },
  {
    title: 'Portfolio v3',
    description: 'Take a look around the third version of my personal portfolio.',
    href: '/v.3/',
    icon: PanelsTopLeft,
  },
];
