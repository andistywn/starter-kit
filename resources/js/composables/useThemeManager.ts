import { ref, reactive, computed, readonly } from 'vue';
import { availableThemes, defaultTheme, defaultDarkTheme, type ThemeConfig } from '@/config/themes';
import { useThemeStore } from '@/stores/theme';

// Use the Pinia store for state management
const themeStore = useThemeStore();

// Default themes for light/dark toggle
const defaults = reactive({
  light: defaultTheme,
  dark: defaultDarkTheme,
  watchSystemTheme: true,
});

// Use the store's system theme detection
const getSystemTheme = (): boolean => {
  return themeStore.getSystemTheme();
};

// Initialize theme manager - now just initializes the store
const initializeTheme = () => {
  console.log('Theme Manager: Initializing theme manager (using store)');

  // Initialize the store which will handle loading from localStorage
  return themeStore.initializeTheme();
};

// Check if theme is valid
const isValidTheme = (theme: string): boolean => {
  return themeStore.isValidTheme(theme);
};

// Get theme configuration
const getThemeConfig = (themeName: string): ThemeConfig | undefined => {
  return availableThemes.find(t => t.name === themeName);
};

// Theme manager composable - now a wrapper around the Pinia store
export const useThemeManager = () => {
  // Set theme
  const setTheme = (theme: string) => {
    console.log('Theme Manager: Setting theme (via store):', theme);
    themeStore.setTheme(theme);
  };

  // Get current theme
  const getTheme = () => themeStore.currentTheme;

  // Toggle between light and dark themes
  const toggleDark = () => {
    console.log('Theme Manager: Toggling dark mode (via store)');
    themeStore.toggleDark();
  };

  // Set default themes
  const setDefaults = (themes: { light?: string; dark?: string }) => {
    console.log('Theme Manager: Setting defaults (via store):', themes);
    // Store the defaults in our local reactive object
    if (themes.light && isValidTheme(themes.light)) {
      defaults.light = themes.light;
    }
    if (themes.dark && isValidTheme(themes.dark)) {
      defaults.dark = themes.dark;
    }
  };

  // Get default themes
  const getDefaults = () => ({
    light: defaults.light,
    dark: defaults.dark,
  });

  // Set system theme watching
  const setWatchSystemTheme = (watch: boolean, updateTheme: boolean = true) => {
    console.log('Theme Manager: Setting watchSystemTheme (via store):', watch);
    themeStore.setWatchSystemTheme(watch, updateTheme);
  };

  // Get system theme watching status
  const getWatchSystemTheme = () => themeStore.watchSystemTheme;

  // Get available themes
  const getAvailableThemes = () => themeStore.allAvailableThemes;

  // Get themes by type (light/dark)
  const getThemesByType = (isDark: boolean) => {
    return isDark ? themeStore.darkThemes : themeStore.lightThemes;
  };

  // Computed properties
  const currentThemeConfig = computed(() => themeStore.currentThemeConfig);
  const isCurrentThemeDark = computed(() => themeStore.isCurrentThemeDark);

  return {
    // State
    currentTheme: computed(() => themeStore.currentTheme),
    isDarkMode: computed(() => themeStore.isDarkMode),
    watchSystemTheme: computed(() => themeStore.watchSystemTheme),

    // Computed
    currentThemeConfig,
    isCurrentThemeDark,

    // Methods
    setTheme,
    getTheme,
    toggleDark,
    setDefaults,
    getDefaults,
    setWatchSystemTheme,
    getWatchSystemTheme,
    getAvailableThemes,
    getThemesByType,
    isValidTheme,
    getThemeConfig,
  };
};

// Initialize theme manager when module loads - now just a wrapper around the store
let initialized = false;

export const initThemeManager = () => {
  console.log('Theme Manager: initThemeManager called, initialized:', initialized);

  if (initialized) {
    console.log('Theme Manager: Already initialized, returning');
    return;
  }

  initialized = true;
  console.log('Theme Manager: Setting initialized to true');

  // Initialize the store
  return initializeTheme();
};

// Auto-initialize if in browser environment
if (typeof window !== 'undefined') {
  console.log('Theme Manager: Browser environment detected, auto-initializing');
  initThemeManager();
} else {
  console.log('Theme Manager: Not in browser environment, skipping auto-initialization');
}
