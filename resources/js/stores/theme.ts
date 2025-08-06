import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { ThemeConfig } from '@/types';

export const useThemeStore = defineStore('theme', () => {
    const currentTheme = ref('light');
    const availableThemes = ref<ThemeConfig[]>([
        {
            name: 'light',
            displayName: 'Light',
            colors: {
                primary: '#3b82f6',
                secondary: '#64748b',
                accent: '#f59e0b',
                neutral: '#374151',
            },
        },
        {
            name: 'dark',
            displayName: 'Dark',
            colors: {
                primary: '#60a5fa',
                secondary: '#94a3b8',
                accent: '#fbbf24',
                neutral: '#d1d5db',
            },
        },
        {
            name: 'cupcake',
            displayName: 'Cupcake',
            colors: {
                primary: '#65c3c8',
                secondary: '#ef9fbc',
                accent: '#eeaf3a',
                neutral: '#291334',
            },
        },
    ]);

    const setTheme = (theme: string) => {
        currentTheme.value = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    };

    const loadTheme = () => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);
    };

    const addCustomTheme = (theme: ThemeConfig) => {
        availableThemes.value.push(theme);
    };

    return {
        currentTheme,
        availableThemes,
        setTheme,
        loadTheme,
        addCustomTheme
    };
});
