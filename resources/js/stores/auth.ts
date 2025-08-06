import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { User } from '@/types';

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null);

    const isAuthenticated = computed(() => !!user.value);

    const setUser = (userData: User) => {
        user.value = userData;
    };

    const logout = () => {
        user.value = null;
    };

    const updateUser = (userData: Partial<User>) => {
        if (user.value) {
            user.value = { ...user.value, ...userData };
        }
    };

    return {
        user,
        isAuthenticated,
        setUser,
        logout,
        updateUser
    };
});
