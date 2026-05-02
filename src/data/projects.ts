export interface Project {
  id: string;
  title: string;
  role: string;
  year: string;
  tags: string[];
  color: 'mint' | 'wine';
  problem: string;
  solution: string;
  stack: string[];
  images: number;
}

export const PROJECTS: Project[] = [
  {
    id: 'p01',
    title: 'Polaris Health',
    role: 'Brand + UI/UX Design',
    year: '2025',
    tags: ['Brand', 'Mobile', 'Design Systems'],
    color: 'mint',
    problem: 'A telehealth startup with a clinical, sterile interface that scared off the very users it was meant to comfort. They needed to feel like a calm friend — not a hospital intake form.',
    solution: 'Rebuilt the visual language around warm neutrals, a softened typographic system, and a gentle motion grammar. Designed a 60-component design system from scratch.',
    stack: ['Figma', 'Design Tokens', 'Framer', 'After Effects'],
    images: 4,
  },
  {
    id: 'p02',
    title: 'Kettle & Co.',
    role: 'Identity + Web Design + Build',
    year: '2024',
    tags: ['Brand', 'Web', 'Illustration'],
    color: 'wine',
    problem: 'A specialty tea roaster with eight years of cult following and a website that looked like it was made in 2011. Beautiful product, invisible online.',
    solution: 'Editorial e-commerce. Custom illustrations for each tea origin, a typographic system that reads like a magazine, and a build that loads in under 1.2s.',
    stack: ['Illustrator', 'Figma', 'Next.js', 'Sanity', 'Tailwind'],
    images: 6,
  },
  {
    id: 'p03',
    title: 'Marrow OS',
    role: 'UX Lead + Prototyping',
    year: '2024',
    tags: ['UX', 'Prototyping', 'Dashboard'],
    color: 'mint',
    problem: 'An internal data tool used by 300 analysts every day, with seventeen tabs and a search that returned nothing. Power users were building shadow tools in spreadsheets.',
    solution: 'Six months of shadowing, mapping, and rebuilding. Replaced the tab graveyard with a command-palette-first workflow. Search now returns everything in <100ms.',
    stack: ['Figma', 'React', 'Storybook', 'User research'],
    images: 5,
  },
  {
    id: 'p04',
    title: 'Foxglove Studio',
    role: 'Identity Design',
    year: '2023',
    tags: ['Brand', 'Print', 'Typography'],
    color: 'wine',
    problem: 'A boutique architecture firm that wanted to feel rigorous without feeling cold. Their last brand was forty different fonts in a trench coat.',
    solution: 'A single typographic system with extreme weight contrast as the entire visual identity. Letterhead, signage, monograph, web — all built from the same five rules.',
    stack: ['InDesign', 'Illustrator', 'Glyphs', 'Print production'],
    images: 4,
  },
  {
    id: 'p05',
    title: 'Lumen Newsletter',
    role: 'Email Design + Templates',
    year: '2024',
    tags: ['Email', 'Templates', 'Systems'],
    color: 'mint',
    problem: 'A media company sending 14M emails per week from twelve different templates that all rendered slightly wrong on Outlook. Nobody knew which one was canonical.',
    solution: 'One template system. Component-driven, dark-mode aware, Outlook-tested. Open rates up 18%, design team rebuilt their week.',
    stack: ['MJML', 'Figma', 'Litmus', 'Email design tokens'],
    images: 3,
  },
  {
    id: 'p06',
    title: 'Cardinal Field Guide',
    role: 'Editorial + Illustration',
    year: '2023',
    tags: ['Editorial', 'Illustration', 'Print'],
    color: 'wine',
    problem: 'A nature nonprofit needed a 240-page field guide for amateur birders. They had photographs but no design language and an aggressive print deadline.',
    solution: 'Two-column editorial grid, hand-drawn species illustrations, a color-coded index that doubles as a cover system. Reprinted twice.',
    stack: ['InDesign', 'Procreate', 'Affinity Designer'],
    images: 5,
  },
  {
    id: 'p07',
    title: 'Ostara App',
    role: 'Mobile UI + Motion',
    year: '2025',
    tags: ['Mobile', 'Motion', 'UI'],
    color: 'mint',
    problem: 'A meditation app in a saturated category needed to feel different on first open. The brief: "make it feel like dawn."',
    solution: 'A time-of-day color system that drifts across the screen as you use it. Every interaction has a soft return animation. No streaks, no badges, no shame.',
    stack: ['Figma', 'Lottie', 'Principle', 'Swift handoff'],
    images: 4,
  },
  {
    id: 'p08',
    title: 'Driftwood Records',
    role: 'Web + Brand Refresh',
    year: '2023',
    tags: ['Web', 'Brand', 'Music'],
    color: 'wine',
    problem: 'An indie label with a roster they were proud of and a website that ranked them dead last in everything. They needed personality, fast.',
    solution: 'A site that behaves like a record sleeve — typographic, layered, slightly broken-on-purpose. Each artist page has its own type pairing.',
    stack: ['Figma', 'Astro', 'GSAP', 'Sanity'],
    images: 4,
  },
];
