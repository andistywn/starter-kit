import { computed, onMounted } from 'vue';
import { usePage } from '@inertiajs/vue3';
import { useAuth } from './useAuth';
import { useTheme } from './useTheme';
import { useNotifications } from './useNotifications';
import type { InertiaPageProps } from '@/types';

export function useApp() {
    const page = usePage<InertiaPageProps>();
    const auth = useAuth();
    const theme = useTheme();
    const notifications = useNotifications();

    // Initialize app on mount
    onMounted(() => {
        // Handle flash messages from Laravel
        if (page.props.flash) {
            notifications.handleFlashMessages(page.props.flash);
        }

        // Initialize theme system
        theme.store.initializeTheme();

        // Initialize auth from page props
        if (page.props.auth?.user) {
            auth.store.persistUser(page.props.auth.user);
        }
    });

    // App-wide computed properties
    const isLoading = computed(() => auth.isLoading.value);
    const hasErrors = computed(() => !!auth.error.value);
    const currentUser = computed(() => auth.user.value);
    const isAuthenticated = computed(() => auth.isAuthenticated.value);
    const currentTheme = computed(() => theme.currentTheme.value);
    const isDarkMode = computed(() => theme.isDarkMode.value);

    // App-wide methods
    const handleError = (error: any, context?: string) => {
        console.error(`App Error${context ? ` (${context})` : ''}:`, error);

        let message = 'An unexpected error occurred';

        if (error.response?.data?.message) {
            message = error.response.data.message;
        } else if (error.message) {
            message = error.message;
        }

        notifications.error(message, {
            title: context ? `${context} Error` : 'Error'
        });
    };

    const handleSuccess = (message: string, context?: string) => {
        notifications.success(message, {
            title: context ? `${context} Success` : 'Success'
        });
    };

    // Navigation helpers
    const redirectToLogin = () => {
        window.location.href = '/login';
    };

    const redirectToDashboard = () => {
        window.location.href = '/dashboard';
    };

    // Theme helpers
    const toggleTheme = () => {
        theme.toggleDark();
        notifications.info(`Switched to ${theme.isDarkMode.value ? 'dark' : 'light'} theme`);
    };

    // Auth helpers
    const handleLogout = async () => {
        try {
            auth.logout();
            notifications.success('Logged out successfully');
            redirectToLogin();
        } catch (error) {
            handleError(error, 'Logout');
        }
    };

    return {
        // State
        isLoading,
        hasErrors,
        currentUser,
        isAuthenticated,
        currentTheme,
        isDarkMode,

        // Store instances
        auth,
        theme,
        notifications,

        // Methods
        handleError,
        handleSuccess,
        redirectToLogin,
        redirectToDashboard,
        toggleTheme,
        handleLogout,

        // Page props
        page
    };
}
