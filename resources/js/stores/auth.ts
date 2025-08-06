import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { User } from '@/types';

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null);
    const isLoading = ref(false);
    const error = ref<string | null>(null);

    const isAuthenticated = computed(() => !!user.value);
    const hasVerifiedEmail = computed(() => !!user.value?.email_verified_at);
    const hasTwoFactorEnabled = computed(() => !!user.value?.two_factor_enabled);

    const setUser = (userData: User) => {
        user.value = userData;
        error.value = null;
    };

    const updateUser = (userData: Partial<User>) => {
        if (user.value) {
            user.value = { ...user.value, ...userData };
        }
    };

    const setLoading = (loading: boolean) => {
        isLoading.value = loading;
    };

    const setError = (errorMessage: string | null) => {
        error.value = errorMessage;
    };

    const logout = () => {
        user.value = null;
        error.value = null;
        isLoading.value = false;
    };

    const clearError = () => {
        error.value = null;
    };

    // Initialize user from session storage if available
    const initializeAuth = () => {
        const storedUser = sessionStorage.getItem('auth_user');
        if (storedUser) {
            try {
                const userData = JSON.parse(storedUser);
                setUser(userData);
            } catch (e) {
                console.warn('Failed to parse stored user data');
                sessionStorage.removeItem('auth_user');
            }
        }
    };

    // Persist user to session storage
    const persistUser = (userData: User) => {
        sessionStorage.setItem('auth_user', JSON.stringify(userData));
        setUser(userData);
    };

    // Clear persisted user data
    const clearPersistedUser = () => {
        sessionStorage.removeItem('auth_user');
        logout();
    };

    return {
        // State
        user,
        isLoading,
        error,

        // Computed
        isAuthenticated,
        hasVerifiedEmail,
        hasTwoFactorEnabled,

        // Actions
        setUser,
        updateUser,
        setLoading,
        setError,
        logout,
        clearError,
        initializeAuth,
        persistUser,
        clearPersistedUser
    };
});
