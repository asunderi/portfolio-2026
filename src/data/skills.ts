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
  currentlyWatching: string;
  currentlyDrinking: string;
  cats: number;
  yearsInIndustry: number;
  projectsShipped: number;
  coffeesConsumed: string;
  bobasConsumed: number;
  hoursInBG3: number;
}

export const SKILLS: Skill[] = [
  { skill: 'UI/UX Design',      category: 'Design', years: 10, level: 5, fav: true  },
  { skill: 'Design Systems',    category: 'Design', years: 8,  level: 5, fav: true  },
  { skill: 'Brand Strategy',    category: 'Design', years: 7,  level: 4, fav: false },
  { skill: 'Typography',        category: 'Design', years: 10, level: 5, fav: true  },
  { skill: 'Web Design',        category: 'Design', years: 10, level: 5, fav: false },
  { skill: 'Mobile Design',     category: 'Design', years: 8,  level: 5, fav: false },
  { skill: 'Prototyping',       category: 'Design', years: 9,  level: 5, fav: false },
  { skill: 'Illustration',      category: 'Design', years: 6,  level: 4, fav: false },
  { skill: 'Infographics',      category: 'Design', years: 7,  level: 4, fav: false },
  { skill: 'Email Design',      category: 'Design', years: 6,  level: 4, fav: false },
  { skill: 'Graphic Design',    category: 'Design', years: 10, level: 5, fav: false },
  { skill: 'Web Development',   category: 'Code',   years: 8,  level: 4, fav: true  },
  { skill: 'Figma',             category: 'Tool',   years: 7,  level: 5, fav: true  },
  { skill: 'Adobe Illustrator', category: 'Tool',   years: 10, level: 5, fav: false },
  { skill: 'Adobe Photoshop',   category: 'Tool',   years: 10, level: 5, fav: false },
  { skill: 'Adobe InDesign',    category: 'Tool',   years: 10, level: 5, fav: false },
  { skill: 'Adobe XD',          category: 'Tool',   years: 6,  level: 4, fav: false },
  { skill: 'Affinity Designer', category: 'Tool',   years: 5,  level: 4, fav: false },
  { skill: 'Affinity Photo',    category: 'Tool',   years: 5,  level: 4, fav: false },
];

export const PERSONALITY: Personality = {
  city: 'Portage, Michigan',
  email: 'hello@anastaciafrost.com',
  currentlyPlaying: 'Tears of the Kingdom (still)',
  currentlyWatching: 'Hannibal (rewatch, season 2)',
  currentlyDrinking: 'taro boba, no ice',
  cats: 2,
  yearsInIndustry: 10,
  projectsShipped: 147,
  coffeesConsumed: '∞',
  bobasConsumed: 1284,
  hoursInBG3: 312,
};
