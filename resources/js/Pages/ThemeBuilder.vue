<script setup>
import { Head } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import ThemeBuilderMain from '@/Components/ThemeBuilder/ThemeBuilderMain.vue';

defineProps({
    title: {
        type: String,
        default: 'Theme Builder',
    },
});
</script>

<template>
    <Head :title="title" />

    <AppLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 dark:text-white leading-tight">
                Theme Builder
            </h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-base-100 overflow-hidden shadow-xl sm:rounded-lg">
                    <ThemeBuilderMain />
                </div>
            </div>
        </div>
    </AppLayout>
</template>
