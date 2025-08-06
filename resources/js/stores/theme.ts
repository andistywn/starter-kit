import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { availableThemes, defaultTheme, defaultDarkTheme, getThemeByName, isValidTheme } from '@/config/themes';
import type { ThemeConfig } from '@/config/themes';

export const useThemeStore = defineStore('theme', () => {
    const currentTheme = ref<string>(defaultTheme);
    const isDarkMode = ref<boolean>(false);
    const watchSystemTheme = ref<boolean>(true);
    const customThemes = ref<ThemeConfig[]>([]);

    // Computed properties
    const allAvailableThemes = computed(() => [...availableThemes, ...customThemes.value]);
    const currentThemeConfig = computed(() => getThemeByName(currentTheme.value));
    const isCurrentThemeDark = computed(() => currentThemeConfig.value?.isDark || false);
    const lightThemes = computed(() => allAvailableThemes.value.filter(theme => !theme.isDark));
    const darkThemes = computed(() => allAvailableThemes.value.filter(theme => theme.isDark));

    // Theme persistence keys
    const STORAGE_KEYS = {
        THEME: 'theme',
        WATCH_SYSTEM: 'watchSystemTheme',
        CUSTOM_THEMES: 'customThemes'
    };

    // Get system theme preference
    const getSystemTheme = (): boolean => {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    };

    // Apply theme to document
    const applyTheme = (theme: string) => {
        console.log('Theme Store: Applying theme:', theme);

        if (!isValidTheme(theme) && !customThemes.value.some(t => t.name === theme)) {
            console.warn(`Invalid theme: ${theme}`);
            return;
        }

        document.documentElement.setAttribute('data-theme', theme);
        document.documentElement.className = `theme-transition ${theme}`;
        document.body.className = `theme-${theme}`;

        // Update state
        currentTheme.value = theme;
        const themeConfig = getThemeByName(theme) || customThemes.value.find(t => t.name === theme);
        if (themeConfig) {
            isDarkMode.value = themeConfig.isDark;
            console.log('Theme Store: Updated isDarkMode to:', isDarkMode.value);
        }
    };

    // Set theme with persistence
    const setTheme = (theme: string) => {
        console.log('Theme Store: Setting theme:', theme);

        if (!isValidTheme(theme) && !customThemes.value.some(t => t.name === theme)) {
            console.warn(`Invalid theme: ${theme}`);
            return;
        }

        applyTheme(theme);
        localStorage.setItem(STORAGE_KEYS.THEME, theme);
        console.log('Theme Store: Saved theme to localStorage:', theme);
    };

    // Toggle between light and dark themes
    const toggleDark = () => {
        const newTheme = isCurrentThemeDark.value ? defaultTheme : defaultDarkTheme;
        setTheme(newTheme);
    };

    // Set system theme watching
    const setWatchSystemTheme = (watch: boolean, updateTheme: boolean = true) => {
        console.log('Theme Store: Setting watchSystemTheme to:', watch, 'updateTheme:', updateTheme);
        watchSystemTheme.value = watch;
        localStorage.setItem(STORAGE_KEYS.WATCH_SYSTEM, JSON.stringify(watch));

        if (watch && updateTheme) {
            const systemIsDark = getSystemTheme();
            const newTheme = systemIsDark ? defaultDarkTheme : defaultTheme;
            console.log('Theme Store: Updating theme based on system preference to:', newTheme);
            setTheme(newTheme);
        } else {
            console.log('Theme Store: Not updating theme based on system preference (updateTheme:', updateTheme, ')');
        }
    };

    // Add custom theme
    const addCustomTheme = (theme: ThemeConfig) => {
        // Check if theme already exists
        const existingIndex = customThemes.value.findIndex(t => t.name === theme.name);
        if (existingIndex >= 0) {
            customThemes.value[existingIndex] = theme;
        } else {
            customThemes.value.push(theme);
        }

        // Persist custom themes
        localStorage.setItem(STORAGE_KEYS.CUSTOM_THEMES, JSON.stringify(customThemes.value));
    };

    // Remove custom theme
    const removeCustomTheme = (themeName: string) => {
        customThemes.value = customThemes.value.filter(theme => theme.name !== themeName);
        localStorage.setItem(STORAGE_KEYS.CUSTOM_THEMES, JSON.stringify(customThemes.value));

        // If current theme is being removed, switch to default
        if (currentTheme.value === themeName) {
            setTheme(defaultTheme);
        }
    };

    // Load theme from storage
    const loadTheme = () => {
        console.log('Theme Store: Loading theme from storage');

        // Load custom themes
        const savedCustomThemes = localStorage.getItem(STORAGE_KEYS.CUSTOM_THEMES);
        console.log('Theme Store: Saved custom themes from localStorage:', savedCustomThemes);

        if (savedCustomThemes) {
            try {
                customThemes.value = JSON.parse(savedCustomThemes);
                console.log('Theme Store: Parsed custom themes:', customThemes.value);
            } catch (e) {
                console.warn('Failed to parse custom themes from storage');
            }
        }

        // Load watch system preference
        const savedWatchSystem = localStorage.getItem(STORAGE_KEYS.WATCH_SYSTEM);
        console.log('Theme Store: Saved watchSystemTheme from localStorage:', savedWatchSystem);

        if (savedWatchSystem) {
            try {
                watchSystemTheme.value = JSON.parse(savedWatchSystem);
                console.log('Theme Store: watchSystemTheme set to:', watchSystemTheme.value);
            } catch (e) {
                watchSystemTheme.value = true;
                console.log('Theme Store: Error parsing watchSystemTheme, defaulting to true');
            }
        }

        // Load theme
        const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
        console.log('Theme Store: Saved theme from localStorage:', savedTheme);

        if (savedTheme && (isValidTheme(savedTheme) || customThemes.value.some(t => t.name === savedTheme))) {
            console.log('Theme Store: Using saved theme from localStorage:', savedTheme);
            applyTheme(savedTheme);
        } else if (watchSystemTheme.value) {
            const systemIsDark = getSystemTheme();
            const newTheme = systemIsDark ? defaultDarkTheme : defaultTheme;
            console.log('Theme Store: Using system preference theme:', newTheme);
            applyTheme(newTheme);
        } else {
            console.log('Theme Store: Using default theme:', defaultTheme);
            applyTheme(defaultTheme);
        }
    };

    // Initialize theme system
    const initializeTheme = () => {
        console.log('Theme Store: Initializing theme system');
        loadTheme();

        // Watch for system theme changes
        if (typeof window !== 'undefined') {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            console.log('Theme Store: System prefers dark mode:', mediaQuery.matches);

            const handleSystemThemeChange = (e: MediaQueryListEvent) => {
                console.log('Theme Store: System theme changed, prefers dark:', e.matches);

                if (watchSystemTheme.value) {
                    const newTheme = e.matches ? defaultDarkTheme : defaultTheme;
                    console.log('Theme Store: Updating theme based on system change to:', newTheme);
                    setTheme(newTheme);
                } else {
                    console.log('Theme Store: System theme changed but watchSystemTheme is false, ignoring');
                }
            };

            mediaQuery.addEventListener('change', handleSystemThemeChange);
            console.log('Theme Store: Added system theme change listener');

            // Return cleanup function
            return () => {
                console.log('Theme Store: Cleaning up system theme change listener');
                mediaQuery.removeEventListener('change', handleSystemThemeChange);
            };
        }
    };

    // Reset to defaults
    const resetToDefaults = () => {
        localStorage.removeItem(STORAGE_KEYS.THEME);
        localStorage.removeItem(STORAGE_KEYS.WATCH_SYSTEM);
        localStorage.removeItem(STORAGE_KEYS.CUSTOM_THEMES);

        currentTheme.value = defaultTheme;
        watchSystemTheme.value = true;
        customThemes.value = [];

        loadTheme();
    };

    return {
        // State
        currentTheme,
        isDarkMode,
        watchSystemTheme,
        customThemes,

        // Computed
        allAvailableThemes,
        currentThemeConfig,
        isCurrentThemeDark,
        lightThemes,
        darkThemes,

        // Actions
        setTheme,
        toggleDark,
        setWatchSystemTheme,
        addCustomTheme,
        removeCustomTheme,
        loadTheme,
        initializeTheme,
        resetToDefaults,

        // Utilities
        getSystemTheme,
        isValidTheme: (theme: string) => isValidTheme(theme) || customThemes.value.some(t => t.name === theme)
    };
});
