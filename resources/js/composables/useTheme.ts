import { useThemeStore } from '@/stores/theme';
import { computed, onMounted, onUnmounted } from 'vue';

export function useTheme() {
    const themeStore = useThemeStore();
    let cleanup: (() => void) | undefined;

    // Initialize theme system on mount
    onMounted(() => {
        cleanup = themeStore.initializeTheme();
    });

    // Cleanup on unmount
    onUnmounted(() => {
        if (cleanup) {
            cleanup();
        }
    });

    // Computed properties
    const currentTheme = computed(() => themeStore.currentTheme);
    const currentThemeConfig = computed(() => themeStore.currentThemeConfig);
    const availableThemes = computed(() => themeStore.allAvailableThemes);
    const lightThemes = computed(() => themeStore.lightThemes);
    const darkThemes = computed(() => themeStore.darkThemes);
    const isDarkMode = computed(() => themeStore.isDarkMode);
    const isCurrentThemeDark = computed(() => themeStore.isCurrentThemeDark);
    const watchSystemTheme = computed(() => themeStore.watchSystemTheme);
    const customThemes = computed(() => themeStore.customThemes);

    // Theme actions
    const setTheme = (theme: string) => {
        themeStore.setTheme(theme);
    };

    const toggleDark = () => {
        themeStore.toggleDark();
    };

    const setWatchSystemTheme = (watch: boolean, updateTheme = true) => {
        themeStore.setWatchSystemTheme(watch, updateTheme);
    };

    const addCustomTheme = (theme: any) => {
        themeStore.addCustomTheme(theme);
    };

    const removeCustomTheme = (themeName: string) => {
        themeStore.removeCustomTheme(themeName);
    };

    const resetToDefaults = () => {
        themeStore.resetToDefaults();
    };

    // Utility functions
    const isValidTheme = (theme: string) => {
        return themeStore.isValidTheme(theme);
    };

    const getSystemTheme = () => {
        return themeStore.getSystemTheme();
    };

    return {
        // State
        currentTheme,
        currentThemeConfig,
        availableThemes,
        lightThemes,
        darkThemes,
        isDarkMode,
        isCurrentThemeDark,
        watchSystemTheme,
        customThemes,

        // Actions
        setTheme,
        toggleDark,
        setWatchSystemTheme,
        addCustomTheme,
        removeCustomTheme,
        resetToDefaults,

        // Utilities
        isValidTheme,
        getSystemTheme,

        // Direct store access for advanced usage
        store: themeStore
    };
}
