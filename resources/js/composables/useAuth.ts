import { useAuthStore } from '@/stores/auth';
import { usePage } from '@inertiajs/vue3';
import { computed, onMounted, watch } from 'vue';
import type { PageProps } from '@/types';

export function useAuth() {
    const authStore = useAuthStore();
    const page = usePage<PageProps & { [key: string]: any }>();

    // Initialize auth store on mount
    onMounted(() => {
        authStore.initializeAuth();
    });

    // Watch for page props changes and update user
    watch(
        () => page.props.auth?.user,
        (newUser) => {
            if (newUser && (!authStore.user || authStore.user.id !== newUser.id)) {
                authStore.persistUser(newUser);
            }
        },
        { immediate: true }
    );

    // Computed properties
    const user = computed(() => authStore.user);
    const isAuthenticated = computed(() => authStore.isAuthenticated);
    const isLoading = computed(() => authStore.isLoading);
    const error = computed(() => authStore.error);
    const hasVerifiedEmail = computed(() => authStore.hasVerifiedEmail);
    const hasTwoFactorEnabled = computed(() => authStore.hasTwoFactorEnabled);

    // Auth actions
    const login = (userData: any) => {
        authStore.setLoading(true);
        authStore.persistUser(userData);
        authStore.setLoading(false);
    };

    const logout = () => {
        authStore.clearPersistedUser();
    };

    const updateProfile = (userData: Partial<any>) => {
        if (authStore.user) {
            const updatedUser = { ...authStore.user, ...userData };
            authStore.persistUser(updatedUser);
        }
    };

    const clearError = () => {
        authStore.clearError();
    };

    const setError = (errorMessage: string) => {
        authStore.setError(errorMessage);
    };

    return {
        // State
        user,
        isAuthenticated,
        isLoading,
        error,
        hasVerifiedEmail,
        hasTwoFactorEnabled,

        // Actions
        login,
        logout,
        updateProfile,
        clearError,
        setError,

        // Direct store access for advanced usage
        store: authStore
    };
}
