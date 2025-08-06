<template>
  <div class="theme-demo p-6 space-y-6">
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-bold">Theme Demo</h2>
      <ThemeSwitcher
        :show-theme-selector="true"
        :show-simple-toggle="true"
        :show-system-toggle="true"
      />
    </div>

    <!-- Current Theme Info -->
    <div class="alert alert-info">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <div>
        <div class="font-bold">Current Theme: {{ currentTheme }}</div>
        <div class="text-xs">{{ isCurrentThemeDark ? 'Dark' : 'Light' }} theme • System watching: {{ watchSystemTheme ? 'On' : 'Off' }}</div>
      </div>
    </div>

    <!-- Color Palette -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h3 class="card-title">Color Palette</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="text-center">
            <div class="w-16 h-16 bg-primary rounded-lg mx-auto mb-2"></div>
            <span class="text-sm">Primary</span>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-secondary rounded-lg mx-auto mb-2"></div>
            <span class="text-sm">Secondary</span>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-accent rounded-lg mx-auto mb-2"></div>
            <span class="text-sm">Accent</span>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-neutral rounded-lg mx-auto mb-2"></div>
            <span class="text-sm">Neutral</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Component Examples -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Buttons -->
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h3 class="card-title">Buttons</h3>
          <div class="space-y-2">
            <div class="flex flex-wrap gap-2">
              <button class="btn">Default</button>
              <button class="btn btn-primary">Primary</button>
              <button class="btn btn-secondary">Secondary</button>
              <button class="btn btn-accent">Accent</button>
            </div>
            <div class="flex flex-wrap gap-2">
              <button class="btn btn-outline">Outline</button>
              <button class="btn btn-outline btn-primary">Primary</button>
              <button class="btn btn-ghost">Ghost</button>
              <button class="btn btn-link">Link</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Form Elements -->
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h3 class="card-title">Form Elements</h3>
          <div class="space-y-4">
            <input type="text" placeholder="Text input" class="input input-bordered w-full" />
            <select class="select select-bordered w-full">
              <option disabled selected>Select option</option>
              <option>Option 1</option>
              <option>Option 2</option>
            </select>
            <div class="form-control">
              <label class="label cursor-pointer">
                <span class="label-text">Checkbox</span>
                <input type="checkbox" class="checkbox" />
              </label>
            </div>
            <div class="form-control">
              <label class="label cursor-pointer">
                <span class="label-text">Toggle</span>
                <input type="checkbox" class="toggle" />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Alerts -->
    <div class="space-y-4">
      <div class="alert alert-info">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span>Info alert with theme colors</span>
      </div>
      <div class="alert alert-success">
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Success alert with theme colors</span>
      </div>
      <div class="alert alert-warning">
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <span>Warning alert with theme colors</span>
      </div>
      <div class="alert alert-error">
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Error alert with theme colors</span>
      </div>
    </div>

    <!-- Progress and Stats -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h3 class="card-title">Progress Bars</h3>
          <div class="space-y-2">
            <progress class="progress progress-primary w-full" value="32" max="100"></progress>
            <progress class="progress progress-secondary w-full" value="56" max="100"></progress>
            <progress class="progress progress-accent w-full" value="78" max="100"></progress>
          </div>
        </div>
      </div>

      <div class="stats shadow">
        <div class="stat">
          <div class="stat-title">Total Users</div>
          <div class="stat-value">31K</div>
          <div class="stat-desc">Jan 1st - Feb 1st</div>
        </div>
        <div class="stat">
          <div class="stat-title">New Users</div>
          <div class="stat-value">4,200</div>
          <div class="stat-desc">↗︎ 400 (22%)</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useThemeStore } from '@/stores/theme';
import ThemeSwitcher from '@/Components/ThemeSwitcher.vue';

// Use Pinia store directly
const themeStore = useThemeStore();

const currentTheme = computed(() => themeStore.currentTheme);
const isCurrentThemeDark = computed(() => themeStore.isCurrentThemeDark);
const watchSystemTheme = computed(() => themeStore.watchSystemTheme);
</script>

<style scoped>
.theme-demo {
  @apply theme-transition;
}
</style>
