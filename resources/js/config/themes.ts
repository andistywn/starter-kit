export interface ThemeConfig {
  name: string;
  displayName: string;
  isDark: boolean;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    neutral: string;
    'base-100': string;
    'base-200': string;
    'base-300': string;
  };
}

export const availableThemes: ThemeConfig[] = [
  // Built-in Daisy UI themes
  {
    name: 'light',
    displayName: 'Light',
    isDark: false,
    colors: {
      primary: '#570df8',
      secondary: '#f000b8',
      accent: '#37cdbe',
      neutral: '#3d4451',
      'base-100': '#ffffff',
      'base-200': '#f2f2f2',
      'base-300': '#e5e6e6',
    },
  },
  {
    name: 'dark',
    displayName: 'Dark',
    isDark: true,
    colors: {
      primary: '#661ae6',
      secondary: '#d926aa',
      accent: '#1fb2a5',
      neutral: '#191d24',
      'base-100': '#2a303c',
      'base-200': '#242933',
      'base-300': '#20252e',
    },
  },
  {
    name: 'cupcake',
    displayName: 'Cupcake',
    isDark: false,
    colors: {
      primary: '#65c3c8',
      secondary: '#ef9fbc',
      accent: '#eeaf3a',
      neutral: '#291334',
      'base-100': '#faf7f5',
      'base-200': '#efeae6',
      'base-300': '#e7e2df',
    },
  },
  {
    name: 'bumblebee',
    displayName: 'Bumblebee',
    isDark: false,
    colors: {
      primary: '#e0a82e',
      secondary: '#f9d72f',
      accent: '#181830',
      neutral: '#181830',
      'base-100': '#ffffff',
      'base-200': '#f9fafb',
      'base-300': '#d1d5db',
    },
  },
  {
    name: 'emerald',
    displayName: 'Emerald',
    isDark: false,
    colors: {
      primary: '#66cc8a',
      secondary: '#377cfb',
      accent: '#ea5234',
      neutral: '#333c4d',
      'base-100': '#ffffff',
      'base-200': '#f9fafb',
      'base-300': '#d1d5db',
    },
  },
  {
    name: 'corporate',
    displayName: 'Corporate',
    isDark: false,
    colors: {
      primary: '#4b6bfb',
      secondary: '#7b92b2',
      accent: '#67cba0',
      neutral: '#181a2a',
      'base-100': '#ffffff',
      'base-200': '#f9fafb',
      'base-300': '#d1d5db',
    },
  },
  {
    name: 'synthwave',
    displayName: 'Synthwave',
    isDark: true,
    colors: {
      primary: '#e779c1',
      secondary: '#58c7f3',
      accent: '#f3cc30',
      neutral: '#20134e',
      'base-100': '#1d1536',
      'base-200': '#16122c',
      'base-300': '#140f26',
    },
  },
  {
    name: 'retro',
    displayName: 'Retro',
    isDark: false,
    colors: {
      primary: '#ef9995',
      secondary: '#a4cbb4',
      accent: '#dc8850',
      neutral: '#2e282a',
      'base-100': '#ece3ca',
      'base-200': '#e4d8b7',
      'base-300': '#ddd0a7',
    },
  },
  {
    name: 'cyberpunk',
    displayName: 'Cyberpunk',
    isDark: true,
    colors: {
      primary: '#ff7598',
      secondary: '#75d1f0',
      accent: '#c07eec',
      neutral: '#423f00',
      'base-100': '#ffee00',
      'base-200': '#f3e600',
      'base-300': '#e6d600',
    },
  },
  {
    name: 'valentine',
    displayName: 'Valentine',
    isDark: false,
    colors: {
      primary: '#e96d7b',
      secondary: '#a991f7',
      accent: '#88dbdd',
      neutral: '#af4670',
      'base-100': '#f8ddd4',
      'base-200': '#f2d1c5',
      'base-300': '#ecc5b6',
    },
  },
  {
    name: 'halloween',
    displayName: 'Halloween',
    isDark: true,
    colors: {
      primary: '#f28c18',
      secondary: '#6d3a9c',
      accent: '#51a800',
      neutral: '#1b1d1d',
      'base-100': '#212121',
      'base-200': '#1e1e1e',
      'base-300': '#1a1a1a',
    },
  },
  {
    name: 'garden',
    displayName: 'Garden',
    isDark: false,
    colors: {
      primary: '#5c7f67',
      secondary: '#ecf4e7',
      accent: '#fae5e5',
      neutral: '#5d5656',
      'base-100': '#e3f2fd',
      'base-200': '#d1e7dd',
      'base-300': '#b8dcc0',
    },
  },
  {
    name: 'forest',
    displayName: 'Forest',
    isDark: true,
    colors: {
      primary: '#1eb854',
      secondary: '#1fd65f',
      accent: '#1db584',
      neutral: '#19362d',
      'base-100': '#171212',
      'base-200': '#140f0f',
      'base-300': '#110c0c',
    },
  },
  {
    name: 'aqua',
    displayName: 'Aqua',
    isDark: true,
    colors: {
      primary: '#09ecf3',
      secondary: '#966fb3',
      accent: '#ffe999',
      neutral: '#3b8ac4',
      'base-100': '#345da7',
      'base-200': '#2f5490',
      'base-300': '#2a4b7a',
    },
  },
  {
    name: 'lofi',
    displayName: 'Lo-Fi',
    isDark: false,
    colors: {
      primary: '#0d0d0d',
      secondary: '#1a1a1a',
      accent: '#262626',
      neutral: '#0d0d0d',
      'base-100': '#fafafa',
      'base-200': '#f4f4f5',
      'base-300': '#e4e4e7',
    },
  },
  {
    name: 'pastel',
    displayName: 'Pastel',
    isDark: false,
    colors: {
      primary: '#d1c1d7',
      secondary: '#f6cbd1',
      accent: '#b4e9d1',
      neutral: '#70acc7',
      'base-100': '#ffffff',
      'base-200': '#f9fafb',
      'base-300': '#d1d5db',
    },
  },
  {
    name: 'fantasy',
    displayName: 'Fantasy',
    isDark: false,
    colors: {
      primary: '#6e0b75',
      secondary: '#a21caf',
      accent: '#c026d3',
      neutral: '#1f2937',
      'base-100': '#ffffff',
      'base-200': '#f9fafb',
      'base-300': '#d1d5db',
    },
  },
  {
    name: 'wireframe',
    displayName: 'Wireframe',
    isDark: false,
    colors: {
      primary: '#b8b8b8',
      secondary: '#b8b8b8',
      accent: '#b8b8b8',
      neutral: '#b8b8b8',
      'base-100': '#ffffff',
      'base-200': '#f0f0f0',
      'base-300': '#e0e0e0',
    },
  },
  {
    name: 'black',
    displayName: 'Black',
    isDark: true,
    colors: {
      primary: '#343232',
      secondary: '#343232',
      accent: '#343232',
      neutral: '#0d0d0d',
      'base-100': '#000000',
      'base-200': '#0d0d0d',
      'base-300': '#1a1a1a',
    },
  },
  {
    name: 'luxury',
    displayName: 'Luxury',
    isDark: true,
    colors: {
      primary: '#ffffff',
      secondary: '#152747',
      accent: '#513448',
      neutral: '#28241e',
      'base-100': '#09090b',
      'base-200': '#0a0a0c',
      'base-300': '#16181d',
    },
  },
  {
    name: 'dracula',
    displayName: 'Dracula',
    isDark: true,
    colors: {
      primary: '#ff79c6',
      secondary: '#bd93f9',
      accent: '#ffb86c',
      neutral: '#414558',
      'base-100': '#282a36',
      'base-200': '#1e1f29',
      'base-300': '#16171d',
    },
  },
  // Custom starter themes
  {
    name: 'starter-light',
    displayName: 'Starter Light',
    isDark: false,
    colors: {
      primary: '#3b82f6',
      secondary: '#64748b',
      accent: '#06b6d4',
      neutral: '#1f2937',
      'base-100': '#ffffff',
      'base-200': '#f8fafc',
      'base-300': '#e2e8f0',
    },
  },
  {
    name: 'starter-dark',
    displayName: 'Starter Dark',
    isDark: true,
    colors: {
      primary: '#60a5fa',
      secondary: '#94a3b8',
      accent: '#22d3ee',
      neutral: '#374151',
      'base-100': '#1f2937',
      'base-200': '#111827',
      'base-300': '#0f172a',
    },
  },
];

export const defaultTheme = 'starter-light';
export const defaultDarkTheme = 'starter-dark';

export function getThemeByName(name: string): ThemeConfig | undefined {
  return availableThemes.find(theme => theme.name === name);
}

export function getThemesByType(isDark: boolean): ThemeConfig[] {
  return availableThemes.filter(theme => theme.isDark === isDark);
}

export function isValidTheme(name: string): boolean {
  return availableThemes.some(theme => theme.name === name);
}
