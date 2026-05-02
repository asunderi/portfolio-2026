export interface Skill {
  skill: string;
  category: 'Design' | 'Code' | 'Tool';
  years: number;
  level: number;
  fav: boolean;
}

export interface Personality {
  city: string;
  email: string;
  currentlyPlaying: string;
  currentlyListening: string;
  currentlyWatching: string;
  currentlyDrinking: string;
  cats: number;
  yearsInIndustry: number;
  projectsShipped: number;
  toDoList: string;
  bobasConsumed: number;
  hoursInBG3: number;
}

export const SKILLS: Skill[] = [
  { skill: 'Adobe Illustrator', category: 'Tool',   years: 10, level: 5, fav: false },
  { skill: 'Adobe InDesign',    category: 'Tool',   years: 10, level: 5, fav: true  },
  { skill: 'Adobe Photoshop',   category: 'Tool',   years: 10, level: 5, fav: false },
  { skill: 'Affinity',          category: 'Tool',   years: 5,  level: 4, fav: false },
  { skill: 'Brand Strategy',    category: 'Design', years: 7,  level: 4, fav: false },
  { skill: 'Design Systems',    category: 'Design', years: 8,  level: 5, fav: false },
  { skill: 'Figma',             category: 'Tool',   years: 7,  level: 5, fav: true  },
  { skill: 'Graphic Design',    category: 'Design', years: 10, level: 5, fav: false },
  { skill: 'HTML5/CSS',         category: 'Code',   years: 8,  level: 4, fav: false },
  { skill: 'Illustration',      category: 'Design', years: 6,  level: 4, fav: false },
  { skill: 'Mobile Design',     category: 'Design', years: 6,  level: 5, fav: false },
  { skill: 'Prototyping',       category: 'Design', years: 9,  level: 5, fav: false },
  { skill: 'Typography',        category: 'Design', years: 10, level: 5, fav: false },
  { skill: 'UI/UX Design',      category: 'Design', years: 6,  level: 5, fav: true  },
  { skill: 'Vue.js/Nuxt',       category: 'Code',   years: 4,  level: 4, fav: false },
  { skill: 'Web Design',        category: 'Design', years: 10, level: 5, fav: false },
];

export const PERSONALITY: Personality = {
  city: 'Portage, Michigan',
  email: 'anastacia.lt.frost@gmail.com',
  currentlyPlaying: 'Baldur\'s Gate (still)',
  currentlyWatching: 'Hannibal (rewatch, season 2)',
  currentlyDrinking: 'brown sugar boba tea',
  currentlyListening: 'Joji - Hotel California',
  cats: 2,
  yearsInIndustry: 10,
  projectsShipped: 147,
  toDoList: '52',
  bobasConsumed: 1284,
  hoursInBG3: 650,
};
