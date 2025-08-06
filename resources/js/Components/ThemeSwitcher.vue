<template>
    <div class="theme-switcher">
        <!-- Theme Dropdown -->
        <div class="dropdown dropdown-end" v-if="showThemeSelector">
            <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a4 4 0 004-4V5z">
                    </path>
                </svg>
            </div>
            <ul tabindex="0"
                class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 max-h-96 overflow-y-auto">
                <li class="menu-title">
                    <span>Choose Theme</span>
                </li>
                <li v-for="theme in availableThemes" :key="theme.name">
                    <a @click="selectTheme(theme.name)" :class="{ active: currentTheme === theme.name }"
                        class="flex items-center justify-between">
                        <span>{{ theme.displayName }}</span>
                        <div class="w-3 h-3 rounded-full border border-base-content/20"
                            :style="{ backgroundColor: theme.colors.primary }"></div>
                    </a>
                </li>
            </ul>
        </div>

        <!-- Simple Dark/Light Toggle -->
        <div v-if="showSimpleToggle" class="flex items-center gap-2">
            <label class="swap swap-rotate">
                <input type="checkbox" :checked="isCurrentThemeDark" @change="toggleDark" class="sr-only" />

                <!-- Sun icon -->
                <svg class="swap-off w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                        clip-rule="evenodd"></path>
                </svg>

                <!-- Moon icon -->
                <svg class="swap-on w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                </svg>
            </label>
        </div>

        <!-- System Theme Toggle -->
        <div v-if="showSystemToggle" class="form-control">
            <label class="label cursor-pointer">
                <span class="label-text">Auto</span>
                <input type="checkbox" :checked="watchSystemTheme" @change="toggleSystemWatch"
                    class="toggle toggle-sm" />
            </label>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useThemeManager } from '@/composables/useThemeManager';

interface Props {
    showThemeSelector?: boolean;
    showSimpleToggle?: boolean;
    showSystemToggle?: boolean;
    variant?: 'dropdown' | 'inline' | 'minimal';
}

withDefaults(defineProps<Props>(), {
    showThemeSelector: true,
    showSimpleToggle: false,
    showSystemToggle: false,
    variant: 'dropdown',
});

const themeManager = useThemeManager();

// Computed properties
const currentTheme = computed(() => themeManager.getTheme());
const availableThemes = computed(() => themeManager.getAvailableThemes());
const isCurrentThemeDark = computed(() => themeManager.isCurrentThemeDark.value);
const watchSystemTheme = computed(() => themeManager.getWatchSystemTheme());

// Methods
const selectTheme = (themeName: string) => {
    themeManager.setTheme(themeName);
};

const toggleDark = () => {
    themeManager.toggleDark();
};

const toggleSystemWatch = () => {
    themeManager.setWatchSystemTheme(!watchSystemTheme.value);
};
</script>

<style scoped>
.theme-switcher {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.dropdown-content {
    scrollbar-width: thin;
    scrollbar-color: oklch(var(--color-primary)) oklch(var(--color-base-200));
}

.dropdown-content::-webkit-scrollbar {
    width: 6px;
}

.dropdown-content::-webkit-scrollbar-track {
    background: oklch(var(--color-base-200));
}

.dropdown-content::-webkit-scrollbar-thumb {
    background: oklch(var(--color-primary));
    border-radius: 9999px;
}

.menu li>a.active {
    background-color: oklch(var(--color-primary));
    color: oklch(var(--color-primary-content));
}

.swap svg {
    transition-property: transform;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms;
}

.swap-rotate .swap-on,
.swap-rotate .swap-indeterminate,
.swap-rotate input:indeterminate~.swap-on {
    transform: rotate(45deg);
}
</style>
