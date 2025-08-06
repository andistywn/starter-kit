import { useThemeStore } from '@/stores/theme';
import { computed, onMounted } from 'vue';

export function useTheme() {
    const themeStore = useThemeStore();

    const currentTheme = computed(() => themeStore.currentTheme);
    const availableThemes = computed(() => themeStore.availableThemes);

    // Load theme on mount
    onMounted(() => {
        themeStore.loadTheme();
    });

    return {
        currentTheme,
        availableThemes,
        setTheme: themeStore.setTheme,
        loadTheme: themeStore.loadTheme,
        addCustomTheme: themeStore.addCustomTheme,
    };
}
