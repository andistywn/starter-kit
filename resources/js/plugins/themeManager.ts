import type { App } from 'vue';
import { useThemeManager, initThemeManager } from '@/composables/useThemeManager';

export interface ThemeManagerOptions {
  light?: string;
  dark?: string;
  watchSystemTheme?: boolean;
}

export const createThemeManager = (options: ThemeManagerOptions = {}) => {
  return {
    install(app: App) {
      // Initialize theme manager
      const cleanup = initThemeManager();

      // Get theme manager instance
      const themeManager = useThemeManager();

      // Set default themes if provided
      if (options.light || options.dark) {
        themeManager.setDefaults({
          light: options.light,
          dark: options.dark,
        });
      }

      // Set system theme watching if provided
      if (typeof options.watchSystemTheme === 'boolean') {
        themeManager.setWatchSystemTheme(options.watchSystemTheme);
      }

      // Make theme manager available globally
      app.config.globalProperties.$theme = themeManager;

      // Provide theme manager for composition API
      app.provide('themeManager', themeManager);

      // Cleanup on app unmount
      app.config.globalProperties.$themeManagerCleanup = cleanup;
    },
  };
};

// Export the composable for direct use
export { useThemeManager } from '@/composables/useThemeManager';
