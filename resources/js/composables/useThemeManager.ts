import { ref, reactive, computed, readonly } from 'vue';
import { availableThemes, defaultTheme, defaultDarkTheme, type ThemeConfig } from '@/config/themes';

// Theme manager state
const currentTheme = ref<string>(defaultTheme);
const isDarkMode = ref<boolean>(false);
const watchSystemTheme = ref<boolean>(true);

// Default themes for light/dark toggle
const defaults = reactive({
  light: defaultTheme,
  dark: defaultDarkTheme,
  watchSystemTheme: true,
});

// Check system preference
const getSystemTheme = (): boolean => {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
};

// Initialize theme manager
const initializeTheme = () => {
  // Get saved theme from localStorage or use default
  const savedTheme = localStorage.getItem('theme');
  const savedWatchSystem = localStorage.getItem('watchSystemTheme');

  // Set watch system preference
  watchSystemTheme.value = savedWatchSystem ? JSON.parse(savedWatchSystem) : defaults.watchSystemTheme;

  // Set initial theme
  if (savedTheme && isValidTheme(savedTheme)) {
    currentTheme.value = savedTheme;
  } else if (watchSystemTheme.value) {
    isDarkMode.value = getSystemTheme();
    currentTheme.value = isDarkMode.value ? defaults.dark : defaults.light;
  } else {
    currentTheme.value = defaults.light;
  }

  // Apply theme to document
  applyTheme(currentTheme.value);
};

// Apply theme to document
const applyTheme = (theme: string) => {
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.className = `theme-transition ${theme}`;

  // Update body class for additional styling
  document.body.className = `theme-${theme}`;

  // Save to localStorage
  localStorage.setItem('theme', theme);
};

// Check if theme is valid
const isValidTheme = (theme: string): boolean => {
  return availableThemes.some(t => t.name === theme);
};

// Get theme configuration
const getThemeConfig = (themeName: string): ThemeConfig | undefined => {
  return availableThemes.find(t => t.name === themeName);
};

// Theme manager composable
export const useThemeManager = () => {
  // Set theme
  const setTheme = (theme: string) => {
    if (!isValidTheme(theme)) {
      console.warn(`Invalid theme: ${theme}`);
      return;
    }

    currentTheme.value = theme;
    applyTheme(theme);

    // Update dark mode state based on theme
    const themeConfig = getThemeConfig(theme);
    if (themeConfig) {
      isDarkMode.value = themeConfig.isDark;
    }
  };

  // Get current theme
  const getTheme = () => currentTheme.value;

  // Toggle between light and dark themes
  const toggleDark = () => {
    const newTheme = currentTheme.value === defaults.light ? defaults.dark : defaults.light;
    setTheme(newTheme);
  };

  // Set default themes
  const setDefaults = (themes: { light?: string; dark?: string }) => {
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
    watchSystemTheme.value = watch;
    localStorage.setItem('watchSystemTheme', JSON.stringify(watch));

    if (watch && updateTheme) {
      isDarkMode.value = getSystemTheme();
      const newTheme = isDarkMode.value ? defaults.dark : defaults.light;
      setTheme(newTheme);
    }
  };

  // Get system theme watching status
  const getWatchSystemTheme = () => watchSystemTheme.value;

  // Get available themes
  const getAvailableThemes = () => availableThemes;

  // Get themes by type (light/dark)
  const getThemesByType = (isDark: boolean) => {
    return availableThemes.filter(theme => theme.isDark === isDark);
  };

  // Computed properties
  const currentThemeConfig = computed(() => getThemeConfig(currentTheme.value));
  const isCurrentThemeDark = computed(() => currentThemeConfig.value?.isDark || false);

  return {
    // State
    currentTheme: readonly(currentTheme),
    isDarkMode: readonly(isDarkMode),
    watchSystemTheme: readonly(watchSystemTheme),

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

// Initialize theme manager when module loads
let initialized = false;

export const initThemeManager = () => {
  if (initialized) return;

  initialized = true;
  initializeTheme();

  // Watch for system theme changes
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const handleSystemThemeChange = (e: MediaQueryListEvent) => {
    if (watchSystemTheme.value) {
      isDarkMode.value = e.matches;
      const newTheme = e.matches ? defaults.dark : defaults.light;
      currentTheme.value = newTheme;
      applyTheme(newTheme);
    }
  };

  mediaQuery.addEventListener('change', handleSystemThemeChange);

  // Return cleanup function
  return () => {
    mediaQuery.removeEventListener('change', handleSystemThemeChange);
  };
};

// Auto-initialize if in browser environment
if (typeof window !== 'undefined') {
  initThemeManager();
}
