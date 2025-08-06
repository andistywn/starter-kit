import { PageProps as InertiaPageProps } from '@inertiajs/core';
import { PageProps as AppPageProps, Team } from './index';
import { ComponentCustomProperties } from 'vue';

declare global {
    interface Window {
        // Add any global window properties here
    }

    function route(name?: string, params?: any, absolute?: boolean): any;
}

// Make route function and $page available in Vue component templates
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        route: typeof route;
        $page: {
            props: {
                auth: {
                    user: {
                        name: string;
                        email: string;
                        profile_photo_url: string;
                        current_team?: Team;
                        current_team_id?: number;
                        all_teams?: Team[];
                    };
                };
                jetstream: {
                    hasTeamFeatures: boolean;
                    managesProfilePhotos: boolean;
                    hasApiFeatures: boolean;
                    canCreateTeams: boolean;
                };
                [key: string]: any;
            };
            [key: string]: any;
        };
    }
}

declare module '@inertiajs/core' {
    interface PageProps extends InertiaPageProps, AppPageProps {
        [key: string]: any;
    }
}

declare module '*.vue' {
    import type { DefineComponent } from 'vue';
    const component: DefineComponent<{}, {}, any>;
    export default component;
}

// Improve type declarations for component imports
declare module '@/Components/*.vue' {
    import type { DefineComponent } from 'vue';
    const component: DefineComponent<{}, {}, any>;
    export default component;
}

// Explicitly declare imported components
declare module '@/Components/Dropdown.vue' {
    import type { DefineComponent } from 'vue';
    const component: DefineComponent<{}, {}, any>;
    export default component;
}

declare module '@/Components/DropdownLink.vue' {
    import type { DefineComponent } from 'vue';
    const component: DefineComponent<{}, {}, any>;
    export default component;
}

declare module '@/Components/NavLink.vue' {
    import type { DefineComponent } from 'vue';
    const component: DefineComponent<{}, {}, any>;
    export default component;
}

declare module '@/Components/ResponsiveNavLink.vue' {
    import type { DefineComponent } from 'vue';
    const component: DefineComponent<{}, {}, any>;
    export default component;
}
