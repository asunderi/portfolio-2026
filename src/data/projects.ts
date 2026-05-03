export interface Project {
  id: string;
  title: string;
  role: string;
  year: string;
  tags: string[];
  color: 'mint' | 'wine';
  thumbnail: string;
  problem: string;
  solution: string;
  stack: string[];
  images: string[];
}

export const PROJECTS: Project[] = [
    {
        id: 'p01',
        title: 'NorthStar Care Community',
        role: 'Web Design + Development',
        year: '2026',
        tags: ['Brand', 'Identity', 'CMS'],
        color: 'mint',
        thumbnail: '/images/nscc/nscc-thumbnail.jpg',
        problem: 'A multibrand hospice organization with a fragmented web presence — separate brand properties, inconsistent content workflows, and no unified design language connecting the organization\'s services.',
        solution: 'Working across teams to modernize the content management workflow, establish a shared design system across brands, and rebuild web properties that are accessible, consistent, and maintainable by non-technical staff.',
        stack: ['Figma', 'WordPress'],
        images: [
            '/images/nscc/ccn-butterfly.jpg',
        ],
    },
  {
    id: 'p02',
    title: 'Hettinger & Robinson',
    role: 'Logo Design',
    year: '2023',
    tags: ['Logo', 'Identity', 'Legal'],
    color: 'mint',
    thumbnail: '/images/hr/hr-logo.jpg',
    problem: 'A law firm needing a mark that communicated trust, professionalism, and just enough modernity to avoid looking like a stock template from 1996.',
    solution: 'Initial-based logo with a balanced composition, carefully considered typography, and a color system built to hold up across print letterhead, digital signatures, and everything in between.',
    stack: ['Illustrator'],
    images: [
      '/images/hr/hr-colors.jpg',
    ],
  },
    {
        id: 'p03',
        title: 'Consumers Energy',
        role: 'UI/UX Design',
        year: '2022',
        tags: ['Enterprise', 'UI/UX', 'Web App'],
        color: 'mint',
        thumbnail: '/images/consumers/consumers-thumbnail.jpg',
        problem: 'Field crews at a major utility company documenting storm damage across disconnected spreadsheets and paper forms. Data was slow, lossy, and took days to parse into anything actionable.',
        solution: 'UX design for a Power Apps damage assessment workflow — user journey maps, storyboards for multi-step processes, and Figma prototypes translated within the platform\'s constraints.',
        stack: ['Figma', 'Illustrator', 'Photoshop', 'Microsoft PowerApps'],
        images: [],
    },
  {
    id: 'p04',
    title: 'Getting Started',
    role: 'Web Design + Development',
    year: '2022',
    tags: ['Web', 'UX', 'Education'],
    color: 'wine',
    thumbnail: '/images/kvcc/kvcc-thumbnail.jpg',
    problem: 'A community college enrollment department whose process overwhelmed first-generation students on day one. The steps existed — buried three levels deep in the main site, written for administrators.',
    solution: 'A dedicated enrollment guide that broke the process into human-sized steps. Clear hierarchy, integrated 3D campus tours, copy that treated students like adults navigating something genuinely new.',
    stack: ['HTML/SCSS', 'CMS', 'Figma', 'Illustrator'],
    images: [
      '/images/kvcc/gs-home.jpg',
      '/images/kvcc/gs-guest.jpg',
      '/images/kvcc/gs-tours.jpg',
      '/images/kvcc/gs-info.jpg',
    ],
  },
  {
    id: 'p05',
    title: 'Groceries List',
    role: 'Brand Identity',
    year: '2021',
    tags: ['Brand', 'App', 'Identity'],
    color: 'wine',
    thumbnail: '/images/groceries/groceries-list.jpg',
    problem: 'A dead-simple grocery list web app — no ads, no accounts, no nonsense — that needed a brand to match. Nothing overdesigned, nothing that would age in two years.',
    solution: 'A playful, minimal logo and color system designed for clarity across both light and dark modes. One icon. Two themes. The philosophy of the app made visible.',
    stack: ['Illustrator', 'Photoshop', 'Figma'],
    images: [
      '/images/groceries/logos.jpg',
      '/images/groceries/app-light.jpg',
      '/images/groceries/app-dark.jpg',
    ],
  },
    {
        id: 'p06',
        title: 'Summit',
        role: 'UI/UX + Web Development',
        year: '2021',
        tags: ['Web App', 'Events', 'UX'],
        color: 'wine',
        thumbnail: '/images/kvcc/summit.jpg',
        problem: 'A bi-annual faculty development event that outgrew its informal scheduling system. Faculty and staff needed to browse, register for, and track multiple simultaneous breakout sessions — live, during the event.',
        solution: 'A standalone web application with authenticated login, real-time session registration, and scheduling across parallel tracks. Coordinated with four departments to get every detail accurate before doors opened.',
        stack: ['Vue.js', 'Tailwind CSS', 'Figma'],
        images: [
        ],
    },
  {
    id: 'p07',
    title: 'Staff Development',
    role: 'UI/UX + Web Development',
    year: '2020',
    tags: ['Web App', 'UX', 'Systems'],
    color: 'mint',
    thumbnail: '/images/kvcc/staff-registrations.jpg',
    problem: 'An internal onboarding and training platform for a 1,500-person institution. Employees tracked certifications, registered for enrichment sessions, and navigated a complex event calendar — in a system that had grown organically for years with no design involvement.',
    solution: 'A unified visual system for the entire staff development web presence. Component-level design that scaled across every department while keeping one coherent identity across hundreds of sessions per year.',
    stack: ['Laravel', 'Tailwind CSS', 'GitHub', 'Figma'],
    images: [
      '/images/kvcc/staff-events.jpg',
    ],
  },
  {
    id: 'p08',
    title: 'ControlNET',
    role: 'Brand Identity, Web Design + Development',
    year: '2019',
    tags: ['Web', 'Brand', 'Identity', 'CMS'],
    color: 'wine',
    thumbnail: '/images/controlnet/cn-thumbnail.jpg',
    problem: 'A digital controls company spanning HVAC and building security across Michigan with a logo untouched for nearly ten years and a web presence that did not communicate the scale or precision of the actual work.',
    solution: 'Designed a custom city skyline logo incorporating landmarks from every Michigan location — one mark that told the full geographic story. Then rebuilt the entire web and print presence around it: redesigned landing pages, all print materials and web forms, social media graphics, and HVAC and security system interfaces in Niagara across multiple facilities.',
    stack: ['HTML/SCSS', 'WordPress', 'Illustrator', 'Photoshop', 'InDesign'],
    images: [
      '/images/controlnet/logo/ford-decal.jpg',
      '/images/controlnet/logo/cn-brand-colors.jpg',
      '/images/controlnet/logo/cn-brand-elements.jpg',
      '/images/controlnet/logo/cn-brand-cover.jpg',
      '/images/controlnet/access-control.jpg',
      '/images/controlnet/solutions.jpg',
      '/images/controlnet/testimonials.jpg',
      '/images/controlnet/hvac.jpg',
    ],
  },
  {
    id: 'p09',
    title: 'Strife',
    role: 'Web + Email Design, Development',
    year: '2014',
    tags: ['Web', 'Email', 'Game', 'Marketing'],
    color: 'mint',
    thumbnail: '/images/s2games/index.jpg',
    problem: 'A new casual MOBA launching into a competitive market needed a web presence and campaign that could carry hero reveals, player portals, live event coverage, PAX Prime marketing, and a launch email series — all at once.',
    solution: 'Designed and built multiple site sections as part of a three-person team: hero pages pulling live game API data, a player portal, and full PAX print and digital marketing. Ran a parallel email campaign in two tracks — clean and accessible for clarity, immersive and atmospheric for excitement — with dynamic recipient variables and assets rendered directly from in-game 3D models.',
    stack: ['HTML/SCSS', 'Illustrator', 'Photoshop'],
    images: [
      '/images/s2games/strife-hero.jpg',
      '/images/s2games/strife-pets.jpg',
      '/images/s2games/strife-portal.jpg',
      '/images/s2games/strife-start.jpg',
      '/images/s2games/emails/email-beta.jpg',
      '/images/s2games/emails/email-feedback.jpg',
      '/images/s2games/emails/email-welcome.jpg',
      '/images/s2games/emails/email-chosen.jpg',
    ],
  },
];
