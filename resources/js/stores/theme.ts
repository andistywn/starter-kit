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
        }
    };

    // Set theme with persistence
    const setTheme = (theme: string) => {
        if (!isValidTheme(theme) && !customThemes.value.some(t => t.name === theme)) {
            console.warn(`Invalid theme: ${theme}`);
            return;
        }

        applyTheme(theme);
        localStorage.setItem(STORAGE_KEYS.THEME, theme);
    };

    // Toggle between light and dark themes
    const toggleDark = () => {
        const newTheme = isCurrentThemeDark.value ? defaultTheme : defaultDarkTheme;
        setTheme(newTheme);
    };

    // Set system theme watching
    const setWatchSystemTheme = (watch: boolean, updateTheme: boolean = true) => {
        watchSystemTheme.value = watch;
        localStorage.setItem(STORAGE_KEYS.WATCH_SYSTEM, JSON.stringify(watch));

        if (watch && updateTheme) {
            const systemIsDark = getSystemTheme();
            const newTheme = systemIsDark ? defaultDarkTheme : defaultTheme;
            setTheme(newTheme);
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
        // Load custom themes
        const savedCustomThemes = localStorage.getItem(STORAGE_KEYS.CUSTOM_THEMES);
        if (savedCustomThemes) {
            try {
                customThemes.value = JSON.parse(savedCustomThemes);
            } catch (e) {
                console.warn('Failed to parse custom themes from storage');
            }
        }

        // Load watch system preference
        const savedWatchSystem = localStorage.getItem(STORAGE_KEYS.WATCH_SYSTEM);
        if (savedWatchSystem) {
            try {
                watchSystemTheme.value = JSON.parse(savedWatchSystem);
            } catch (e) {
                watchSystemTheme.value = true;
            }
        }

        // Load theme
        const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
        if (savedTheme && (isValidTheme(savedTheme) || customThemes.value.some(t => t.name === savedTheme))) {
            applyTheme(savedTheme);
        } else if (watchSystemTheme.value) {
            const systemIsDark = getSystemTheme();
            const newTheme = systemIsDark ? defaultDarkTheme : defaultTheme;
            applyTheme(newTheme);
        } else {
            applyTheme(defaultTheme);
        }
    };

    // Initialize theme system
    const initializeTheme = () => {
        loadTheme();

        // Watch for system theme changes
        if (typeof window !== 'undefined') {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const handleSystemThemeChange = (e: MediaQueryListEvent) => {
                if (watchSystemTheme.value) {
                    const newTheme = e.matches ? defaultDarkTheme : defaultTheme;
                    setTheme(newTheme);
                }
            };

            mediaQuery.addEventListener('change', handleSystemThemeChange);

            // Return cleanup function
            return () => {
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
