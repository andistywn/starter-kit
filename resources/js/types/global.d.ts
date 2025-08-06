import { PageProps as InertiaPageProps } from '@inertiajs/core';
import { PageProps as AppPageProps } from './index';

declare global {
    interface Window {
        // Add any global window properties here
    }

    function route(name?: string, params?: any, absolute?: boolean): any;
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

declare module '@/Components/*.vue' {
    import type { DefineComponent } from 'vue';
    const component: DefineComponent<{}, {}, any>;
    export default component;
}
