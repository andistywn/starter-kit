<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import ApplicationLogo from '@/Components/ApplicationLogo.vue';
import ThemeSwitcher from '@/Components/ThemeSwitcher.vue';

interface Props {
  title?: string;
}

defineProps<Props>();
</script>

<template>
  <div>
    <Head :title="title" />

    <div class="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-base-200">
      <!-- Theme Switcher positioned at top right -->
      <div class="absolute top-4 right-4 z-10">
        <ThemeSwitcher
          :show-theme-selector="true"
          :show-simple-toggle="true"
          :show-system-toggle="false"
        />
      </div>

      <!-- Logo Section -->
      <div class="mb-6">
        <ApplicationLogo class="w-20 h-20 fill-current text-primary" />
      </div>

      <!-- Main Authentication Card -->
      <div class="w-full sm:max-w-md mt-6 px-6 py-8 bg-base-100 shadow-xl overflow-hidden sm:rounded-lg border border-base-300 mx-4 sm:mx-0">
        <slot />
      </div>

      <!-- Footer with responsive design -->
      <div class="mt-8 text-center">
        <p class="text-sm text-base-content/60">
          © {{ new Date().getFullYear() }} Laravel Modern Starter Kit
        </p>
      </div>
    </div>
  </div>
</template>
