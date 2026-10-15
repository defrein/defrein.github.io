import { BookOpenText, CalendarDays, Camera, Disc3, LibraryBig, PanelsTopLeft } from '@lucide/svelte';

export const toolCategories = [
  { id: 'fun', title: 'Fun' },
  { id: 'productivity', title: 'Productivity' },
  { id: 'portfolio-archive', title: 'Portfolio Archive' },
] as const;

type ToolCategory = typeof toolCategories[number]['id'];
type Tool = { title: string; description: string; href: string; icon: typeof Disc3; category: ToolCategory };

// Keep these destinations relative to the domain root, matching the original portfolio.
// Add a tool and its category here; the matching section updates automatically.
export const tools: Tool[] = [
  {
    title: 'Roulette Wheel',
    description: 'Add your choices, spin the wheel, and let it pick. Keep track of previous results.',
    href: '/others/roulette-wheel/',
    icon: Disc3,
    category: 'fun',
  },
  {
    title: 'Photobooth',
    description: 'Open my photobooth for a quick photo session.',
    href: '/photobooth/',
    icon: Camera,
    category: 'fun',
  },
  {
    title: 'NLM Viewer',
    description: 'Browse journal records, choose which fields to display, and save the data as JSON.',
    href: '/others/NLM_viewer/',
    icon: BookOpenText,
    category: 'productivity',
  },
  {
    title: 'Story',
    description: 'A quiet place to browse stories and settle into a read.',
    href: '/others/story/',
    icon: LibraryBig,
    category: 'fun',
  },
  {
    title: 'MyJadwal',
    description: 'See the week at a glance, with time for work, learning, exercise, and rest.',
    href: '/others/jadwal/',
    icon: CalendarDays,
    category: 'productivity',
  },
  {
    title: 'Portfolio v1',
    description: 'Revisit the first version of my personal portfolio.',
    href: '/v.1/',
    icon: PanelsTopLeft,
    category: 'portfolio-archive',
  },
  {
    title: 'Portfolio v2',
    description: 'Explore the second version of my personal portfolio.',
    href: '/v.2/',
    icon: PanelsTopLeft,
    category: 'portfolio-archive',
  },
  {
    title: 'Portfolio v3',
    description: 'Take a look around the third version of my personal portfolio.',
    href: '/v.3/',
    icon: PanelsTopLeft,
    category: 'portfolio-archive',
  },
];
