import defaultTheme from 'tailwindcss/defaultTheme';
import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './vendor/laravel/jetstream/**/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.vue',
        './resources/js/**/*.ts',
        './resources/js/**/*.js',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            // Custom theme extensions for starter kit branding
            colors: {
                'starter-blue': '#3b82f6',
                'starter-slate': '#64748b',
                'starter-cyan': '#06b6d4',
                'starter-gray': '#1f2937',
            },
        },
    },

    plugins: [daisyui],

    // DaisyUI configuration
    daisyui: {
        themes: [
            'light',
            'dark',
            'cupcake',
            'bumblebee',
            'emerald',
            'corporate',
            'synthwave',
            'retro',
            'cyberpunk',
            'valentine',
            'halloween',
            'garden',
            'forest',
            'aqua',
            'lofi',
            'pastel',
            'fantasy',
            'wireframe',
            'black',
            'luxury',
            'dracula',
            'cmyk',
            'autumn',
            'business',
            'acid',
            'lemonade',
            'night',
            'coffee',
            'winter',
            'starter-light',
            'starter-dark',
        ],
        darkTheme: 'starter-dark',
        base: true,
        styled: true,
        utils: true,
        prefix: '',
        logs: true,
        themeRoot: ':root',
    },

    // Laravel-specific configuration
    corePlugins: {
        preflight: true,
    },

    // Ensure compatibility with Laravel Blade templates
    safelist: [
        // Add any classes that might be dynamically generated
        'theme-transition',
        'btn-gradient',
        'card-hover',
        'form-control-custom',
        'nav-link',
        'scrollbar-thin',
        'text-gradient',
        'glass-effect',
        // Theme-specific classes
        'theme-starter-light',
        'theme-starter-dark',
    ],
};
