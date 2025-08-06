export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    profile_photo_url: string;
    two_factor_enabled: boolean;
}

export interface PageProps {
    auth: {
        user: User;
    };
    flash: {
        message?: string;
        error?: string;
    };
    errors: Record<string, string>;
}

export interface ThemeConfig {
    name: string;
    displayName: string;
    colors: {
        primary: string;
        secondary: string;
        accent: string;
        neutral: string;
    };
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
