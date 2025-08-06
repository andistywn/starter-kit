import { ref } from 'vue';

export interface Notification {
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    title?: string;
    message: string;
    duration?: number;
    persistent?: boolean;
    actions?: Array<{
        label: string;
        action: () => void;
        style?: 'primary' | 'secondary';
    }>;
}

const notifications = ref<Notification[]>([]);
let notificationId = 0;

export function useNotifications() {
    // Add notification
    const addNotification = (notification: Omit<Notification, 'id'>): string => {
        const id = `notification-${++notificationId}`;
        const newNotification: Notification = {
            id,
            duration: 5000,
            persistent: false,
            ...notification
        };

        notifications.value.push(newNotification);

        // Auto-remove if not persistent
        if (!newNotification.persistent && newNotification.duration) {
            setTimeout(() => {
                removeNotification(id);
            }, newNotification.duration);
        }

        return id;
    };

    // Remove notification
    const removeNotification = (id: string) => {
        const index = notifications.value.findIndex(n => n.id === id);
        if (index > -1) {
            notifications.value.splice(index, 1);
        }
    };

    // Clear all notifications
    const clearNotifications = () => {
        notifications.value = [];
    };

    // Convenience methods for different types
    const success = (message: string, options?: Partial<Omit<Notification, 'id' | 'type' | 'message'>>) => {
        return addNotification({
            type: 'success',
            message,
            ...options
        });
    };

    const error = (message: string, options?: Partial<Omit<Notification, 'id' | 'type' | 'message'>>) => {
        return addNotification({
            type: 'error',
            message,
            persistent: true, // Errors should be persistent by default
            ...options
        });
    };

    const warning = (message: string, options?: Partial<Omit<Notification, 'id' | 'type' | 'message'>>) => {
        return addNotification({
            type: 'warning',
            message,
            ...options
        });
    };

    const info = (message: string, options?: Partial<Omit<Notification, 'id' | 'type' | 'message'>>) => {
        return addNotification({
            type: 'info',
            message,
            ...options
        });
    };

    // Handle flash messages from Laravel
    const handleFlashMessages = (flash: { message?: string; error?: string; success?: string; warning?: string; info?: string }) => {
        if (flash.success) success(flash.success);
        if (flash.error) error(flash.error);
        if (flash.warning) warning(flash.warning);
        if (flash.info) info(flash.info);
        if (flash.message) info(flash.message);
    };

    return {
        // State
        notifications,

        // Methods
        addNotification,
        removeNotification,
        clearNotifications,

        // Convenience methods
        success,
        error,
        warning,
        info,

        // Laravel integration
        handleFlashMessages
    };
}

// Global notification instance for use across the app
export const globalNotifications = useNotifications();
