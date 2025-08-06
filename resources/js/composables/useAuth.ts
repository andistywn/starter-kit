import { useAuthStore } from '@/stores/auth';
import { usePage } from '@inertiajs/vue3';
import { computed } from 'vue';
import type { PageProps } from '@/types';

export function useAuth() {
    const authStore = useAuthStore();
    const page = usePage<PageProps & { [key: string]: any }>();

    // Initialize user from page props if available
    if (page.props.auth?.user && !authStore.user) {
        authStore.setUser(page.props.auth.user);
    }

    const user = computed(() => authStore.user);
    const isAuthenticated = computed(() => authStore.isAuthenticated);

    return {
        user,
        isAuthenticated,
        setUser: authStore.setUser,
        logout: authStore.logout,
        updateUser: authStore.updateUser,
    };
}
