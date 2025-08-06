## ThemeManager.vue

<template>
  <div class="dropdown dropdown-end">
    <button
      class="btn btn-ghost btn-circle"
      tabindex="0"
      :title="`Current theme: ${currentThemeDefinition?.displayName || 'Unknown'}`"
      aria-label="Theme selector"
    >
      <svg
        class="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"
        />
      </svg>
    </button>

    <div class="dropdown-content mt-3 z-[1] card card-compact w-80 bg-base-100 shadow-xl border border-base-300">
      <div class="card-body">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-bold text-lg">Theme Settings</h3>
          <DarkModeToggle />
        </div>

        <!-- System theme toggle -->
        <div class="form-control mb-4">
          <label class="label cursor-pointer">
            <span class="label-text">Follow system theme</span>
            <input
              type="checkbox"
              class="toggle toggle-primary"
              :checked="systemThemeEnabled"
              @change="handleSystemThemeToggle"
            />
          </label>
        </div>

        <!-- Theme categories -->
        <div class="space-y-4">
          <!-- Custom themes -->
          <div v-if="customThemes.length > 0">
            <h4 class="font-semibold text-sm text-base-content/70 mb-2">Custom Themes</h4>
            <div class="grid grid-cols-2 gap-2">
              <button
                v-for="theme in customThemes"
                :key="theme.name"
                @click="selectTheme(theme.name)"
                :class="[
                  'btn btn-sm justify-start',
                  currentTheme === theme.name ? 'btn-primary' : 'btn-ghost'
                ]"
                :disabled="systemThemeEnabled"
              >
                <div
                  class="w-3 h-3 rounded-full border border-base-300 mr-2"
                  :style="{ backgroundColor: theme.colors?.primary || '#264869' }"
                ></div>
                {{ theme.displayName }}
              </button>
            </div>
          </div>

          <!-- Standard themes -->
          <div v-if="standardThemes.length > 0">
            <h4 class="font-semibold text-sm text-base-content/70 mb-2">Standard Themes</h4>
            <div class="max-h-48 overflow-y-auto">
              <div class="grid grid-cols-2 gap-2">
                <button
                  v-for="theme in standardThemes"
                  :key="theme.name"
                  @click="selectTheme(theme.name)"
                  :class="[
                    'btn btn-sm justify-start',
                    currentTheme === theme.name ? 'btn-primary' : 'btn-ghost'
                  ]"
                  :disabled="systemThemeEnabled"
                >
                  <div
                    class="w-3 h-3 rounded-full border border-base-300 mr-2"
                    :style="{ backgroundColor: getThemePreviewColor(theme.name) }"
                  ></div>
                  {{ theme.displayName }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Current theme info -->
        <div class="mt-4 p-3 bg-base-200 rounded-lg">
          <div class="text-sm">
            <div class="font-medium">{{ currentThemeDefinition?.displayName }}</div>
            <div class="text-base-content/60">
              {{ currentThemeDefinition?.isDark ? 'Dark' : 'Light' }} theme
              {{ currentThemeDefinition?.category === 'custom' ? '• Custom' : '' }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useThemeStore } from '@/stores/theme';
import DarkModeToggle from '@/components/ui/DarkModeToggle.vue';

const themeStore = useThemeStore();

// Computed properties
const currentTheme = computed(() => themeStore.currentTheme);
const currentThemeDefinition = computed(() => themeStore.currentThemeDefinition);
const customThemes = computed(() => themeStore.customThemes);
const standardThemes = computed(() => themeStore.standardThemes);
const systemThemeEnabled = computed(() => themeStore.systemThemeEnabled);

// Theme selection
const selectTheme = (themeName: string) => {
  themeStore.setTheme(themeName);
};

// System theme handling
const handleSystemThemeToggle = (event: Event) => {
  const target = event.target as HTMLInputElement;
  themeStore.enableSystemTheme(target.checked);
};

// Get preview color for themes without defined colors
const getThemePreviewColor = (themeName: string): string => {
  const colorMap: Record<string, string> = {
    light: '#ffffff',
    dark: '#1f2937',
    cupcake: '#fef3c7',
    bumblebee: '#fbbf24',
    emerald: '#10b981',
    corporate: '#3b82f6',
    synthwave: '#e879f9',
    retro: '#fbbf24',
    valentine: '#e879f9',
    halloween: '#ff6600',
    garden: '#10b981',
    forest: '#059669',
    aqua: '#06b6d4',
    lofi: '#6b7280',
    pastel: '#fbbf24',
    fantasy: '#e879f9',
    wireframe: '#6b7280',
    black: '#000000',
    luxury: '#d4af37',
    dracula: '#bd93f9',
    cmyk: '#0891b2',
    autumn: '#dc2626',
    business: '#1f2937',
    acid: '#84cc16',
    lemonade: '#fbbf24',
    night: '#0f172a',
    coffee: '#78350f',
    winter: '#3b82f6',
    dim: '#374151',
    nord: '#5e81ac',
    sunset: '#f97316'
  };

  return colorMap[themeName] || '#6b7280';
};
</script>

---

## ThemeSelector.vue

<template>
  <div class="dropdown dropdown-end">
    <button class="btn btn-ghost btn-circle" tabindex="0" title="Change theme">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
      </svg>
    </button>
    <ul class="dropdown-content mt-3 z-[1] p-2 shadow-xl menu menu-sm bg-base-100 rounded-box w-52 border border-base-300">
      <li class="menu-title">
        <span>Choose Theme</span>
      </li>
      <li v-for="theme in availableThemes" :key="theme.value">
        <button
          @click="setTheme(theme.value)"
          :class="{ 'active': currentTheme === theme.value }"
          class="flex items-center justify-between"
        >
          <span>{{ theme.label }}</span>
          <div
            class="w-4 h-4 rounded-full border border-base-300"
            :style="{ backgroundColor: theme.color }"
          ></div>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useThemeStore } from '@/stores';

const themeStore = useThemeStore();

const currentTheme = computed(() => themeStore.currentTheme);

const availableThemes = [
  // Custom UB themes first
  { label: 'UB Light', value: 'ub_theme_light', color: '#f7fcfd' },
  { label: 'UB Dark', value: 'ub_theme', color: '#264869' },
  { label: 'Ube', value: 'ube', color: '#1f2937' },
  // Standard themes
  //   { label: 'Light', value: 'light', color: '#ffffff' },
//   { label: 'Dark', value: 'dark', color: '#1f2937' },
  { label: 'Cupcake', value: 'cupcake', color: '#fef3c7' },
//   { label: 'Bumblebee', value: 'bumblebee', color: '#fbbf24' },
//   { label: 'Emerald', value: 'emerald', color: '#10b981' },
//   { label: 'Corporate', value: 'corporate', color: '#3b82f6' },
//   { label: 'Synthwave', value: 'synthwave', color: '#e879f9' },
  { label: 'Retro', value: 'retro', color: '#fbbf24' },
//   { label: 'Cyberpunk', value: 'cyberpunk', color: '#ff7ac6' },
//   { label: 'Valentine', value: 'valentine', color: '#e879f9' },
//   { label: 'Halloween', value: 'halloween', color: '#ff6600' },
//   { label: 'Garden', value: 'garden', color: '#10b981' },
//   { label: 'Forest', value: 'forest', color: '#059669' },
//   { label: 'Aqua', value: 'aqua', color: '#06b6d4' },
//   { label: 'Lofi', value: 'lofi', color: '#6b7280' },
//   { label: 'Pastel', value: 'pastel', color: '#fbbf24' },
//   { label: 'Fantasy', value: 'fantasy', color: '#e879f9' },
//   { label: 'Wireframe', value: 'wireframe', color: '#6b7280' },
//   { label: 'Black', value: 'black', color: '#000000' },
//   { label: 'Luxury', value: 'luxury', color: '#d4af37' },
  { label: 'Dracula', value: 'dracula', color: '#bd93f9' },
//   { label: 'CMYK', value: 'cmyk', color: '#0891b2' },
//   { label: 'Autumn', value: 'autumn', color: '#dc2626' },
  { label: 'Business', value: 'business', color: '#1f2937' },
//   { label: 'Acid', value: 'acid', color: '#84cc16' },
//   { label: 'Lemonade', value: 'lemonade', color: '#fbbf24' },
//   { label: 'Night', value: 'night', color: '#0f172a' },
//   { label: 'Coffee', value: 'coffee', color: '#78350f' },
//   { label: 'Winter', value: 'winter', color: '#3b82f6' },
//   { label: 'Dim', value: 'dim', color: '#374151' },
//   { label: 'Nord', value: 'nord', color: '#5e81ac' },
//   { label: 'Sunset', value: 'sunset', color: '#f97316' }
];

const setTheme = (theme: string) => {
  themeStore.setTheme(theme);
};
</script>

---

## ThemeToggle.vue

<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAppearance } from '@/composables/useAppearance';
import { Monitor, Moon, Sun } from 'lucide-vue-next';
import { computed } from 'vue';

const { appearance, updateAppearance } = useAppearance();

const themes = [
    {
        value: 'light' as const,
        label: 'Light',
        icon: Sun,
    },
    {
        value: 'dark' as const,
        label: 'Dark',
        icon: Moon,
    },
    {
        value: 'system' as const,
        label: 'System',
        icon: Monitor,
    },
];

const currentTheme = computed(() => {
    return themes.find(theme => theme.value === appearance.value) || themes[2];
});
</script>

<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <Button variant="ghost" size="icon" class="h-8 w-8">
                <component :is="currentTheme.icon" class="h-4 w-4" />
                <span class="sr-only">Toggle theme</span>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuItem v-for="theme in themes" :key="theme.value" @click="updateAppearance(theme.value)"
                class="cursor-pointer">
                <component :is="theme.icon" class="mr-2 h-4 w-4" />
                {{ theme.label }}
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
</template>

---

## useTheme.ts
import { ref, computed, watch, onMounted, type Ref } from 'vue';
import { useLocalStorage } from './useLocalStorage';

// Theme configuration that matches tailwind.config.js
export interface ThemeDefinition {
  name: string;
  displayName: string;
  isDark: boolean;
  category: 'custom' | 'standard';
  colors?: {
    primary: string;
    secondary: string;
    accent: string;
    neutral: string;
    base: string;
  };
}

export interface ThemeConfig {
  themes: ThemeDefinition[];
  defaultTheme: string;
  darkTheme: string;
  lightTheme: string;
  storageKey: string;
}

// Theme definitions that match tailwind.config.js daisyui.themes
const THEME_DEFINITIONS: ThemeDefinition[] = [
  // Custom UB themes
  {
    name: 'ub_theme',
    displayName: 'UB Dark',
    isDark: true,
    category: 'custom',
    colors: {
      primary: '#264869',
      secondary: '#fcb900',
      accent: '#93a4b5',
      neutral: '#2c474e',
      base: '#1a3449',
    },
  },
  {
    name: 'ub_theme_light',
    displayName: 'UB Light',
    isDark: false,
    category: 'custom',
    colors: {
      primary: '#264869',
      secondary: '#fcb900',
      accent: '#2c474e',
      neutral: '#93a4b5',
      base: '#f7fcfd',
    },
  },
  // Standard DaisyUI themes
  { name: 'light', displayName: 'Light', isDark: false, category: 'standard' },
  { name: 'dark', displayName: 'Dark', isDark: true, category: 'standard' },
  { name: 'cupcake', displayName: 'Cupcake', isDark: false, category: 'standard' },
  { name: 'bumblebee', displayName: 'Bumblebee', isDark: false, category: 'standard' },
  { name: 'emerald', displayName: 'Emerald', isDark: false, category: 'standard' },
  { name: 'corporate', displayName: 'Corporate', isDark: false, category: 'standard' },
  { name: 'synthwave', displayName: 'Synthwave', isDark: true, category: 'standard' },
  { name: 'retro', displayName: 'Retro', isDark: false, category: 'standard' },
  { name: 'valentine', displayName: 'Valentine', isDark: false, category: 'standard' },
  { name: 'halloween', displayName: 'Halloween', isDark: true, category: 'standard' },
  { name: 'garden', displayName: 'Garden', isDark: false, category: 'standard' },
  { name: 'forest', displayName: 'Forest', isDark: true, category: 'standard' },
  { name: 'aqua', displayName: 'Aqua', isDark: false, category: 'standard' },
  { name: 'lofi', displayName: 'Lo-Fi', isDark: false, category: 'standard' },
  { name: 'pastel', displayName: 'Pastel', isDark: false, category: 'standard' },
  { name: 'fantasy', displayName: 'Fantasy', isDark: false, category: 'standard' },
  { name: 'wireframe', displayName: 'Wireframe', isDark: false, category: 'standard' },
  { name: 'black', displayName: 'Black', isDark: true, category: 'standard' },
  { name: 'luxury', displayName: 'Luxury', isDark: true, category: 'standard' },
  { name: 'dracula', displayName: 'Dracula', isDark: true, category: 'standard' },
  { name: 'cmyk', displayName: 'CMYK', isDark: false, category: 'standard' },
  { name: 'autumn', displayName: 'Autumn', isDark: false, category: 'standard' },
  { name: 'business', displayName: 'Business', isDark: true, category: 'standard' },
  { name: 'acid', displayName: 'Acid', isDark: false, category: 'standard' },
  { name: 'lemonade', displayName: 'Lemonade', isDark: false, category: 'standard' },
  { name: 'night', displayName: 'Night', isDark: true, category: 'standard' },
  { name: 'coffee', displayName: 'Coffee', isDark: true, category: 'standard' },
  { name: 'winter', displayName: 'Winter', isDark: false, category: 'standard' },
  { name: 'dim', displayName: 'Dim', isDark: true, category: 'standard' },
  { name: 'nord', displayName: 'Nord', isDark: false, category: 'standard' },
  { name: 'sunset', displayName: 'Sunset', isDark: false, category: 'standard' },
];

// Default theme configuration
const DEFAULT_THEME_CONFIG: ThemeConfig = {
  themes: THEME_DEFINITIONS,
  defaultTheme: 'ub_theme_light',
  darkTheme: 'ub_theme',
  lightTheme: 'ub_theme_light',
  storageKey: 'app-theme',
};

export interface ThemeManager {
  // State
  currentTheme: Ref<string>;
  availableThemes: ThemeDefinition[];
  customThemes: Ref<ThemeDefinition[]>;
  standardThemes: Ref<ThemeDefinition[]>;
  isDarkMode: Ref<boolean>;
  systemThemeEnabled: Ref<boolean>;

  // Actions
  setTheme: (theme: string) => void;
  toggleDarkMode: () => void;
  initializeTheme: () => void;
  watchSystemTheme: (enabled: boolean) => void;
  getThemeDefinition: (themeName: string) => ThemeDefinition | undefined;
  isValidTheme: (themeName: string) => boolean;

  // Utilities
  getThemesByCategory: (category: 'custom' | 'standard') => ThemeDefinition[];
  getCurrentThemeDefinition: () => ThemeDefinition | undefined;
}

let themeManagerInstance: ThemeManager | null = null;

export function useTheme(config: Partial<ThemeConfig> = {}, forceNew = false): ThemeManager {
  // Singleton pattern to ensure consistent theme state across components
  // Allow forcing new instance for testing
  if (themeManagerInstance && !forceNew) {
    return themeManagerInstance;
  }

  const finalConfig = { ...DEFAULT_THEME_CONFIG, ...config };

  // Use localStorage for theme persistence
  const [storedTheme, setStoredTheme] = useLocalStorage(
    finalConfig.storageKey,
    finalConfig.defaultTheme
  );

  const [systemThemeEnabled, setSystemThemeEnabled] = useLocalStorage(
    `${finalConfig.storageKey}-system`,
    false
  );

  // Reactive state
  const currentTheme = ref<string>(storedTheme.value);
  const mediaQuery = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-color-scheme: dark)')
    : null;

  // Computed properties
  const availableThemes = finalConfig.themes;
  const customThemes = computed(() =>
    availableThemes.filter(theme => theme.category === 'custom')
  );
  const standardThemes = computed(() =>
    availableThemes.filter(theme => theme.category === 'standard')
  );

  const isDarkMode = computed(() => {
    const theme = getThemeDefinition(currentTheme.value);
    return theme?.isDark ?? false;
  });

  // Utility functions
  const getThemeDefinition = (themeName: string): ThemeDefinition | undefined => {
    return availableThemes.find(theme => theme.name === themeName);
  };

  const isValidTheme = (themeName: string): boolean => {
    return availableThemes.some(theme => theme.name === themeName);
  };

  const getThemesByCategory = (category: 'custom' | 'standard'): ThemeDefinition[] => {
    return availableThemes.filter(theme => theme.category === category);
  };

  const getCurrentThemeDefinition = (): ThemeDefinition | undefined => {
    return getThemeDefinition(currentTheme.value);
  };

  // Apply theme to DOM
  const applyTheme = (themeName: string) => {
    if (typeof document === 'undefined') return;

    // Set DaisyUI theme attribute
    document.documentElement.setAttribute('data-theme', themeName);

    // Also update the class for any custom CSS that might depend on it
    const themeDefinition = getThemeDefinition(themeName);
    if (themeDefinition) {
      document.documentElement.classList.toggle('dark', themeDefinition.isDark);
      document.documentElement.classList.toggle('light', !themeDefinition.isDark);
    }

    // Dispatch custom event for other components that might need to react
    const event = new CustomEvent('theme-changed', {
      detail: {
        theme: themeName,
        definition: themeDefinition,
        isDark: themeDefinition?.isDark ?? false
      }
    });
    document.dispatchEvent(event);
  };

  // Get system theme preference
  const getSystemTheme = (): string => {
    if (!mediaQuery) return finalConfig.defaultTheme;

    return mediaQuery.matches ? finalConfig.darkTheme : finalConfig.lightTheme;
  };

  // Theme management actions
  const setTheme = (theme: string) => {
    if (!isValidTheme(theme)) {
      console.warn(`Invalid theme: ${theme}. Falling back to default theme.`);
      theme = finalConfig.defaultTheme;
    }

    currentTheme.value = theme;
    setStoredTheme(theme);
    applyTheme(theme);

    // Disable system theme when manually setting theme
    if (systemThemeEnabled.value) {
      setSystemThemeEnabled(false);
    }
  };

  const toggleDarkMode = () => {
    const currentDefinition = getCurrentThemeDefinition();
    if (!currentDefinition) return;

    if (currentDefinition.isDark) {
      // Switch to light theme
      if (currentDefinition.category === 'custom') {
        setTheme(finalConfig.lightTheme);
      } else {
        setTheme('light');
      }
    } else {
      // Switch to dark theme
      if (currentDefinition.category === 'custom') {
        setTheme(finalConfig.darkTheme);
      } else {
        setTheme('dark');
      }
    }
  };

  const watchSystemTheme = (enabled: boolean) => {
    setSystemThemeEnabled(enabled);

    if (enabled && mediaQuery) {
      // Apply system theme immediately
      const systemTheme = getSystemTheme();
      currentTheme.value = systemTheme;
      applyTheme(systemTheme);

      // Set up listener for system theme changes
      const handleSystemThemeChange = () => {
        if (systemThemeEnabled.value) {
          const newSystemTheme = getSystemTheme();
          currentTheme.value = newSystemTheme;
          applyTheme(newSystemTheme);
        }
      };

      mediaQuery.addEventListener('change', handleSystemThemeChange);

      // Return cleanup function
      return () => {
        mediaQuery.removeEventListener('change', handleSystemThemeChange);
      };
    }
  };

  const initializeTheme = () => {
    if (typeof window === 'undefined') return;

    let themeToApply = currentTheme.value;

    // Check if system theme is enabled
    if (systemThemeEnabled.value) {
      themeToApply = getSystemTheme();
      currentTheme.value = themeToApply;
    }

    // Validate and apply theme
    if (!isValidTheme(themeToApply)) {
      themeToApply = finalConfig.defaultTheme;
      currentTheme.value = themeToApply;
      setStoredTheme(themeToApply);
    }

    applyTheme(themeToApply);

    // Set up system theme watching if enabled
    if (systemThemeEnabled.value) {
      watchSystemTheme(true);
    }
  };

  // Watch for theme changes and persist them
  watch(currentTheme, (newTheme) => {
    if (!systemThemeEnabled.value) {
      setStoredTheme(newTheme);
    }
    applyTheme(newTheme);
  });

  // Create the theme manager instance
  const manager = {
    // State
    currentTheme,
    availableThemes,
    customThemes,
    standardThemes,
    isDarkMode,
    systemThemeEnabled,

    // Actions
    setTheme,
    toggleDarkMode,
    initializeTheme,
    watchSystemTheme,
    getThemeDefinition,
    isValidTheme,

    // Utilities
    getThemesByCategory,
    getCurrentThemeDefinition,
  };

  // Store as singleton unless forced new
  if (!forceNew) {
    themeManagerInstance = manager;
  }

  return manager;
}

// Reset function for testing
export function resetThemeManager() {
  themeManagerInstance = null;
}

// Export theme definitions for use in other components
export { THEME_DEFINITIONS, DEFAULT_THEME_CONFIG };

// Export types (avoid conflicts with interface declarations)
export type { ThemeConfig as ThemeConfigType, ThemeDefinition as ThemeDefinitionType };

export default useTheme;

---

## useTheme.test.ts


import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useTheme, THEME_DEFINITIONS, resetThemeManager } from '../../composables/useTheme';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

// Mock window.matchMedia
const matchMediaMock = vi.fn().mockImplementation(query => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}));

// Mock document
const documentMock = {
  documentElement: {
    setAttribute: vi.fn(),
    classList: {
      toggle: vi.fn(),
    },
  },
  dispatchEvent: vi.fn(),
};

describe('useTheme', () => {
  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();

    // Reset the singleton instance
    resetThemeManager();

    // Setup global mocks
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });

    Object.defineProperty(window, 'matchMedia', {
      value: matchMediaMock,
    });

    Object.defineProperty(global, 'document', {
      value: documentMock,
    });

    // Reset localStorage mock to return null by default
    localStorageMock.getItem.mockReturnValue(null);
  });

  it('should initialize with default theme', () => {
    const themeManager = useTheme({}, true); // Force new instance

    expect(themeManager.currentTheme.value).toBe('ub_theme_light');
    expect(themeManager.availableThemes).toEqual(THEME_DEFINITIONS);
  });

  it('should set theme correctly', () => {
    const themeManager = useTheme({}, true);

    themeManager.setTheme('ub_theme');

    expect(themeManager.currentTheme.value).toBe('ub_theme');
    expect(documentMock.documentElement.setAttribute).toHaveBeenCalledWith('data-theme', 'ub_theme');
  });

  it('should validate themes correctly', () => {
    const themeManager = useTheme({}, true);

    expect(themeManager.isValidTheme('ub_theme')).toBe(true);
    expect(themeManager.isValidTheme('ub_theme_light')).toBe(true);
    expect(themeManager.isValidTheme('invalid_theme')).toBe(false);
  });

  it('should get theme definition correctly', () => {
    const themeManager = useTheme({}, true);

    const ubTheme = themeManager.getThemeDefinition('ub_theme');
    expect(ubTheme).toBeDefined();
    expect(ubTheme?.name).toBe('ub_theme');
    expect(ubTheme?.isDark).toBe(true);

    const invalidTheme = themeManager.getThemeDefinition('invalid_theme');
    expect(invalidTheme).toBeUndefined();
  });

  it('should toggle dark mode correctly', () => {
    const themeManager = useTheme({}, true);

    // Start with light theme
    themeManager.setTheme('ub_theme_light');
    expect(themeManager.isDarkMode.value).toBe(false);

    // Toggle to dark mode
    themeManager.toggleDarkMode();
    expect(themeManager.currentTheme.value).toBe('ub_theme');
    expect(themeManager.isDarkMode.value).toBe(true);

    // Toggle back to light mode
    themeManager.toggleDarkMode();
    expect(themeManager.currentTheme.value).toBe('ub_theme_light');
    expect(themeManager.isDarkMode.value).toBe(false);
  });

  it('should categorize themes correctly', () => {
    const themeManager = useTheme({}, true);

    const customThemes = themeManager.getThemesByCategory('custom');
    const standardThemes = themeManager.getThemesByCategory('standard');

    expect(customThemes).toHaveLength(2); // ub_theme and ub_theme_light
    expect(standardThemes.length).toBeGreaterThan(0);

    expect(customThemes.every(theme => theme.category === 'custom')).toBe(true);
    expect(standardThemes.every(theme => theme.category === 'standard')).toBe(true);
  });

  it('should handle invalid theme gracefully', () => {
    const themeManager = useTheme({}, true);
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    themeManager.setTheme('invalid_theme');

    expect(consoleSpy).toHaveBeenCalledWith(
      'Invalid theme: invalid_theme. Falling back to default theme.'
    );
    expect(themeManager.currentTheme.value).toBe('ub_theme_light');

    consoleSpy.mockRestore();
  });

  it('should persist theme to localStorage', () => {
    const themeManager = useTheme({}, true);

    themeManager.setTheme('ub_theme');

    expect(localStorageMock.setItem).toHaveBeenCalledWith('app-theme', '"ub_theme"');
  });

  it('should load theme from localStorage on initialization', () => {
    localStorageMock.getItem.mockReturnValue('"dark"');

    const themeManager = useTheme({}, true);

    expect(themeManager.currentTheme.value).toBe('dark');
  });
});



