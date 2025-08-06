import type { App } from 'vue';
import { useThemeStore } from '@/stores/theme';
import { availableThemes, defaultTheme, defaultDarkTheme } from '@/config/themes';

export interface ThemeManagerOptions {
  light?: string;
  dark?: string;
  watchSystemTheme?: boolean;
}

export const createThemeManager = (options: ThemeManagerOptions = {}) => {
  return {
    install(app: App) {
      // Get theme store instance
      const themeStore = useThemeStore();

      console.log('Theme Plugin: Initializing with options:', options);

      // Store the defaults for reference, but don't apply them directly
      const defaults = {
        light: options.light || defaultTheme,
        dark: options.dark || defaultDarkTheme
      };

      console.log('Theme Plugin: Storing defaults:', defaults);
      app.provide('themeDefaults', defaults);

      // Initialize theme system - this will load from localStorage if available
      const cleanup = themeStore.initializeTheme();

      // Set system theme watching if provided, but don't force theme change
      if (typeof options.watchSystemTheme === 'boolean') {
        console.log('Theme Plugin: Setting watchSystemTheme to:', options.watchSystemTheme);
        themeStore.setWatchSystemTheme(options.watchSystemTheme, false);
      }

      // Make theme store available globally
      app.config.globalProperties.$theme = themeStore;

      // Provide theme store for composition API
      app.provide('themeStore', themeStore);

      // Cleanup on app unmount
      if (cleanup) {
        app.config.globalProperties.$themeCleanup = cleanup;
      }
    },
  };
};

// Export the store for direct use
export { useThemeStore } from '@/stores/theme';
