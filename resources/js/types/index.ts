export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    profile_photo_url: string;
    two_factor_enabled: boolean;
    created_at?: string;
    updated_at?: string;
    current_team?: Team;
    current_team_id?: number;
    all_teams?: Team[];
}

export interface Team {
    id: number;
    name: string;
    personal_team: boolean;
    created_at: string;
    updated_at: string;
}

export interface PageProps {
    auth: {
        user: User;
    };
    jetstream: {
        hasTeamFeatures: boolean;
        managesProfilePhotos: boolean;
        hasApiFeatures: boolean;
        canCreateTeams: boolean;
        hasTermsAndPrivacyPolicyFeature: boolean;
    };
    flash: {
        message?: string;
        error?: string;
        success?: string;
        warning?: string;
        info?: string;
    };
    errors: Record<string, string>;
}

export interface AuthResponse {
    user: User;
    token?: string;
    message: string;
}

export interface ProfileUpdateResponse {
    user: User;
    message: string;
}

export interface ApiError {
    message: string;
    errors?: Record<string, string[]>;
    status: number;
}

// Form-related types
export interface FormData {
    [key: string]: any;
}

export interface ValidationErrors {
    [field: string]: string | string[];
}

// Store state types
export interface AuthState {
    user: User | null;
    isLoading: boolean;
    error: string | null;
}

export interface ThemeState {
    currentTheme: string;
    isDarkMode: boolean;
    watchSystemTheme: boolean;
    customThemes: any[];
}

// API response types
export interface ApiResponse<T = any> {
    data: T;
    message?: string;
    status: number;
}

export interface PaginatedResponse<T = any> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
}

// Inertia-specific types
export interface InertiaPageProps extends PageProps {
    [key: string]: any;
}
