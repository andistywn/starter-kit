import { ref, reactive, computed } from "vue";
import { useAuthStore } from "@/stores/auth";

interface FormOptions {
    resetOnSuccess?: boolean;
    clearErrorsOnChange?: boolean;
}

export function useForm<T extends Record<string, any>>(
    initialData: T,
    options: FormOptions = {}
) {
    const authStore = useAuthStore();

    const { resetOnSuccess = false, clearErrorsOnChange = true } = options;

    // Form state
    const data = reactive<T>({ ...initialData });
    const errors = ref<Record<string, string>>({});
    const processing = ref(false);
    const wasSuccessful = ref(false);
    const recentlySuccessful = ref(false);

    // Computed
    const hasErrors = computed(() => Object.keys(errors.value).length > 0);
    const isDirty = computed(() => {
        return JSON.stringify(data) !== JSON.stringify(initialData);
    });

    // Clear errors for a specific field
    const clearError = (field: string) => {
        if (errors.value[field]) {
            delete errors.value[field];
        }
    };

    // Clear all errors
    const clearErrors = () => {
        errors.value = {};
    };

    // Set errors from API response
    const setErrors = (apiErrors: Record<string, string | string[]>) => {
        errors.value = {};
        Object.keys(apiErrors).forEach((field) => {
            const error = apiErrors[field];
            errors.value[field] = Array.isArray(error) ? error[0] : error;
        });
    };

    // Set error for specific field
    const setError = (field: string, message: string) => {
        errors.value[field] = message;
    };

    // Reset form to initial state
    const reset = (...fields: (keyof T)[]) => {
        if (fields.length === 0) {
            Object.keys(initialData).forEach((key) => {
                (data as any)[key] = initialData[key];
            });
        } else {
            fields.forEach((field) => {
                (data as any)[field] = initialData[field];
            });
        }
        clearErrors();
        wasSuccessful.value = false;
        recentlySuccessful.value = false;
    };

    // Handle form submission
    const submit = async (submitFn: (data: T) => Promise<any>) => {
        processing.value = true;
        wasSuccessful.value = false;
        recentlySuccessful.value = false;
        clearErrors();
        authStore.clearError();

        try {
            const result = await submitFn({ ...data } as T);

            wasSuccessful.value = true;
            recentlySuccessful.value = true;

            // Reset form if option is enabled
            if (resetOnSuccess) {
                reset();
            }

            // Clear recent success after 2 seconds
            setTimeout(() => {
                recentlySuccessful.value = false;
            }, 2000);

            return result;
        } catch (error: any) {
            wasSuccessful.value = false;

            // Handle validation errors
            if (
                error.response?.status === 422 &&
                error.response?.data?.errors
            ) {
                setErrors(error.response.data.errors);
            } else {
                // Handle other errors
                const errorMessage =
                    error.response?.data?.message ||
                    error.message ||
                    "An error occurred";
                authStore.setError(errorMessage);
            }

            throw error;
        } finally {
            processing.value = false;
        }
    };

    // Watch for data changes to clear errors
    if (clearErrorsOnChange) {
        // Create watchers for each field
        Object.keys(data).forEach((_field) => {
            // Note: In a real implementation, you'd want to use Vue's watch API
            // This is a simplified version for demonstration
        });
    }

    return {
        // State
        data,
        errors,
        processing,
        wasSuccessful,
        recentlySuccessful,

        // Computed
        hasErrors,
        isDirty,

        // Methods
        clearError,
        clearErrors,
        setError,
        setErrors,
        reset,
        submit,
    };
}

// Specialized form composable for authentication
export function useAuthForm<T extends Record<string, any>>(initialData: T) {
    const form = useForm(initialData, { clearErrorsOnChange: true });
    const authStore = useAuthStore();

    // Auth-specific error handling
    const handleAuthError = (error: any) => {
        if (error.response?.status === 401) {
            authStore.setError("Invalid credentials");
        } else if (error.response?.status === 403) {
            authStore.setError("Access denied");
        } else if (error.response?.status === 429) {
            authStore.setError("Too many attempts. Please try again later.");
        }
    };

    // Enhanced submit for auth forms
    const submitAuth = async (submitFn: (data: T) => Promise<any>) => {
        try {
            return await form.submit(submitFn);
        } catch (error) {
            handleAuthError(error);
            throw error;
        }
    };

    return {
        ...form,
        submitAuth,
        handleAuthError,
    };
}
