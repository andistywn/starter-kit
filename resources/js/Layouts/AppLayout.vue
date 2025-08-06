<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import Banner from '@/Components/Banner.vue';
import NavigationMenu from '@/Components/NavigationMenu.vue';

interface Props {
  title?: string;
}

defineProps<Props>();
</script>

<template>
  <div>
    <Head :title="title" />

    <Banner />

    <div class="min-h-screen bg-base-200">
      <!-- Navigation -->
      <NavigationMenu />

      <!-- Page Heading -->
      <header v-if="$slots.header" class="bg-base-100 shadow-sm">
        <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <slot name="header" />
        </div>
      </header>

      <!-- Page Content -->
      <main class="pb-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>
