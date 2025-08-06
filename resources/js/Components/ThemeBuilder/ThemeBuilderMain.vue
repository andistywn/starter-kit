<template>
  <div class="theme-builder p-6 space-y-6">
    <!-- Header with actions -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold">Theme Builder</h1>
        <p class="text-base-content/70">Create and customize your themes</p>
      </div>
      <div class="flex gap-2">
        <button @click="resetToDefaults" class="btn btn-outline">
          Reset to Defaults
        </button>
        <button @click="showExportModal = true" class="btn btn-primary">
          Export Theme
        </button>
        <button @click="showImportModal = true" class="btn btn-secondary">
          Import Theme
        </button>
      </div>
    </div>

    <!-- Current theme info -->
    <div class="alert alert-info">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <div>
        <div class="font-bold">Current Theme: {{ currentTheme }}</div>
        <div class="text-xs">{{ isCurrentThemeDark ? 'Dark' : 'Light' }} theme • System watching: {{ watchSystemTheme ? 'On' : 'Off' }}</div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Theme Selection -->
      <div class="lg:col-span-1">
        <div class="card bg-base-200 shadow-xl">
          <div class="card-body">
            <h3 class="card-title">Theme Selection</h3>

            <!-- Theme Type Filter -->
            <div class="form-control">
              <label class="label cursor-pointer">
                <span class="label-text">Theme Type</span>
                <select v-model="selectedThemeType" class="select select-bordered select-sm">
                  <option value="all">All Themes</option>
                  <option :value="false">Light Themes</option>
                  <option :value="true">Dark Themes</option>
                </select>
              </label>
            </div>

            <!-- Theme List -->
            <div class="space-y-2 max-h-96 overflow-y-auto">
              <div v-for="theme in filteredThemes" :key="theme.name"
                   class="card card-compact cursor-pointer transition-all hover:shadow-lg"
                   :class="{ 'border-2 border-primary': currentTheme === theme.name }"
                   @click="selectTheme(theme.name)">
                <div class="card-body">
                  <div class="flex items-center justify-between">
                    <div>
                      <h4 class="font-semibold">{{ theme.displayName }}</h4>
                      <p class="text-xs text-base-content/70">{{ theme.isDark ? 'Dark' : 'Light' }}</p>
                      <span v-if="isCustomTheme(theme.name)" class="badge badge-outline badge-xs mt-1">
                        Custom
                      </span>
                    </div>
                    <div class="flex items-center gap-2">
                      <div class="flex gap-1">
                        <div class="w-4 h-4 rounded border border-base-content/20"
                             :style="{ backgroundColor: theme.colors.primary }"></div>
                        <div class="w-4 h-4 rounded border border-base-content/20"
                             :style="{ backgroundColor: theme.colors.secondary }"></div>
                        <div class="w-4 h-4 rounded border border-base-content/20"
                             :style="{ backgroundColor: theme.colors.accent }"></div>
                      </div>
                      <button v-if="isCustomTheme(theme.name)"
                              @click.stop="confirmDeleteTheme(theme.name)"
                              class="btn btn-ghost btn-xs btn-circle"
                              title="Delete theme">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Theme Customization -->
      <div class="lg:col-span-2">
        <div class="card bg-base-200 shadow-xl">
          <div class="card-body">
            <h3 class="card-title">Theme Customization</h3>

            <!-- Color Locks -->
            <div class="mb-6">
              <h4 class="font-semibold mb-3">Color Locks</h4>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div v-for="color in lockableColors" :key="color.key" class="form-control">
                  <label class="label cursor-pointer justify-start gap-2">
                    <input type="checkbox"
                           :checked="lockedColors[color.key]"
                           @change="toggleColorLock(color.key)"
                           class="checkbox checkbox-sm" />
                    <span class="label-text text-sm">{{ color.label }}</span>
                  </label>
                </div>
              </div>
            </div>

            <!-- Color Editors -->
            <div class="space-y-4">
              <div v-for="color in editableColors" :key="color.key" class="form-control">
                <label class="label justify-between">
                  <span class="label-text font-medium">{{ color.label }}</span>
                  <div class="flex items-center gap-2">
                    <input type="color"
                           :value="currentColorValues[color.key]"
                           @input="(e) => updateColor(color.key, (e.target as HTMLInputElement).value)"
                           class="w-8 h-8 rounded border-0 cursor-pointer" />
                           <input type="text"
                          :value="currentColorValues[color.key]"
                          @input="(e) => updateColor(color.key, (e.target as HTMLInputElement).value)"
                          class="input input-bordered input-sm w-24" />
                    <button @click="openColorPicker(color.key)"
                            class="btn btn-ghost btn-sm btn-circle">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                      </svg>
                    </button>
                  </div>
                </label>
                <div class="h-4 rounded mt-2 border border-base-300"
                     :style="{ backgroundColor: currentColorValues[color.key] }"></div>
              </div>
            </div>

            <!-- Theme Actions -->
            <div class="card-actions justify-end mt-6">
              <button @click="saveAsNewTheme" class="btn btn-primary">
                Save as New Theme
              </button>
              <button @click="updateCurrentTheme" class="btn btn-secondary">
                Update Current Theme
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Live Preview -->
    <div class="card bg-base-200 shadow-xl">
      <div class="card-body">
        <h3 class="card-title">Live Preview</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Button Preview -->
          <div class="text-center">
            <h4 class="font-semibold mb-2">Buttons</h4>
            <div class="space-y-2">
              <button class="btn btn-sm">Default</button>
              <button class="btn btn-primary btn-sm">Primary</button>
              <button class="btn btn-secondary btn-sm">Secondary</button>
              <button class="btn btn-accent btn-sm">Accent</button>
            </div>
          </div>

          <!-- Alert Preview -->
          <div class="text-center">
            <h4 class="font-semibold mb-2">Alerts</h4>
            <div class="alert alert-info alert-sm">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>Info</span>
            </div>
            <div class="alert alert-success alert-sm">
              <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 w-4 h-4" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Success</span>
            </div>
          </div>

          <!-- Card Preview -->
          <div class="text-center">
            <h4 class="font-semibold mb-2">Cards</h4>
            <div class="card bg-base-100 shadow-md card-sm">
              <div class="card-body">
                <h5 class="card-title">Card Title</h5>
                <p class="card-text text-sm">Card content with theme colors</p>
              </div>
            </div>
          </div>

          <!-- Input Preview -->
          <div class="text-center">
            <h4 class="font-semibold mb-2">Inputs</h4>
            <input type="text" placeholder="Text input" class="input input-bordered input-sm w-full" />
            <select class="select select-bordered select-sm w-full mt-2">
              <option>Select option</option>
              <option>Option 1</option>
              <option>Option 2</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Color Picker Modal -->
    <ColorPickerModal
      v-if="showColorPicker"
      :color="currentColorValues[selectedColorForPicker]"
      @close="showColorPicker = false"
      @color-selected="updateColorFromPicker" />

    <!-- Export Modal -->
    <ExportThemeModal
      v-if="showExportModal"
      :theme="currentThemeConfig"
      @close="showExportModal = false" />

    <!-- Import Modal -->
    <ImportThemeModal
      v-if="showImportModal"
      @close="showImportModal = false"
      @theme-imported="handleThemeImported" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useThemeStore } from '@/stores/theme';
import ColorPickerModal from './ColorPickerModal.vue';
import ExportThemeModal from './ExportThemeModal.vue';
import ImportThemeModal from './ImportThemeModal.vue';

// Store
const themeStore = useThemeStore();

// State
const selectedThemeType = ref('all');
const showColorPicker = ref(false);
const showExportModal = ref(false);
const showImportModal = ref(false);
const selectedColorForPicker = ref('');
const lockedColors = ref<Record<string, boolean>>({});

// Computed properties
const currentTheme = computed(() => themeStore.currentTheme);
const currentThemeConfig = computed(() => themeStore.currentThemeConfig);
const isCurrentThemeDark = computed(() => themeStore.isCurrentThemeDark);
const watchSystemTheme = computed(() => themeStore.watchSystemTheme);
const availableThemes = computed(() => themeStore.allAvailableThemes);
const customThemes = computed(() => themeStore.customThemes);

// Filtered themes based on type
const filteredThemes = computed(() => {
  if (selectedThemeType.value === 'all') {
    return availableThemes.value;
  }
  return availableThemes.value.filter(theme => theme.isDark === (selectedThemeType.value === 'true'));
});

// Current color values (working copy)
const currentColorValues = ref<Record<string, string>>({});

// Lockable colors
const lockableColors = [
  { key: 'primary', label: 'Primary' },
  { key: 'secondary', label: 'Secondary' },
  { key: 'accent', label: 'Accent' },
  { key: 'neutral', label: 'Neutral' },
];

// Editable colors
const editableColors = [
  { key: 'primary', label: 'Primary' },
  { key: 'secondary', label: 'Secondary' },
  { key: 'accent', label: 'Accent' },
  { key: 'neutral', label: 'Neutral' },
  { key: 'base-100', label: 'Base 100' },
  { key: 'base-200', label: 'Base 200' },
  { key: 'base-300', label: 'Base 300' },
];

// Methods
const selectTheme = (themeName: string) => {
  console.log('ThemeBuilder: Selecting theme:', themeName);
  themeStore.setTheme(themeName);
  loadThemeColors(themeName);
  loadColorLocks(themeName);
};

const loadThemeColors = (themeName: string) => {
  const theme = availableThemes.value.find(t => t.name === themeName);
  if (theme) {
    currentColorValues.value = { ...theme.colors };
  }
};

const loadColorLocks = (themeName: string) => {
  // Load saved locks for this theme
  const savedLocks = localStorage.getItem(`themeLocks_${themeName}`);
  if (savedLocks) {
    lockedColors.value = JSON.parse(savedLocks);
  } else {
    // Default locks for built-in themes
    lockedColors.value = {
      primary: false,
      secondary: false,
      accent: false,
      neutral: false,
    };
  }
};

const updateColor = (colorKey: string, value: string) => {
  currentColorValues.value[colorKey] = value;
};

const openColorPicker = (colorKey: string) => {
  selectedColorForPicker.value = colorKey;
  showColorPicker.value = true;
};

const updateColorFromPicker = (color: string) => {
  if (selectedColorForPicker.value) {
    currentColorValues.value[selectedColorForPicker.value] = color;
  }
  showColorPicker.value = false;
};

const toggleColorLock = (colorKey: string) => {
  lockedColors.value[colorKey] = !lockedColors.value[colorKey];
  localStorage.setItem(`themeLocks_${currentTheme.value}`, JSON.stringify(lockedColors.value));
};

const updateCurrentTheme = () => {
  // Update the current theme with new colors
  const updatedTheme = {
    name: currentTheme.value,
    displayName: currentThemeConfig.value?.displayName || currentTheme.value,
    isDark: isCurrentThemeDark.value,
    colors: {
      primary: currentColorValues.value.primary || '#3b82f6',
      secondary: currentColorValues.value.secondary || '#64748b',
      accent: currentColorValues.value.accent || '#06b6d4',
      neutral: currentColorValues.value.neutral || '#1f2937',
      'base-100': currentColorValues.value['base-100'] || '#ffffff',
      'base-200': currentColorValues.value['base-200'] || '#f8fafc',
      'base-300': currentColorValues.value['base-300'] || '#e2e8f0',
    },
  };

  themeStore.addCustomTheme(updatedTheme);
  themeStore.setTheme(updatedTheme.name);
};

const saveAsNewTheme = () => {
  const newThemeName = prompt('Enter a name for the new theme:');
  if (newThemeName && newThemeName.trim()) {
    const newTheme = {
      name: newThemeName.trim().toLowerCase().replace(/\s+/g, '-'),
      displayName: newThemeName.trim(),
      isDark: isCurrentThemeDark.value,
      colors: {
        primary: currentColorValues.value.primary || '#3b82f6',
        secondary: currentColorValues.value.secondary || '#64748b',
        accent: currentColorValues.value.accent || '#06b6d4',
        neutral: currentColorValues.value.neutral || '#1f2937',
        'base-100': currentColorValues.value['base-100'] || '#ffffff',
        'base-200': currentColorValues.value['base-200'] || '#f8fafc',
        'base-300': currentColorValues.value['base-300'] || '#e2e8f0',
      },
    };

    themeStore.addCustomTheme(newTheme);
    themeStore.setTheme(newTheme.name);
  }
};

const isCustomTheme = (themeName: string): boolean => {
  return !availableThemes.value.some(theme => theme.name === themeName);
};

const confirmDeleteTheme = (themeName: string) => {
  if (confirm(`Are you sure you want to delete the "${themeName}" theme? This action cannot be undone.`)) {
    deleteTheme(themeName);
  }
};

const deleteTheme = (themeName: string) => {
  themeStore.removeCustomTheme(themeName);

  // If we deleted the current theme, switch to default
  if (currentTheme.value === themeName) {
    const defaultThemeName = 'starter-light';
    themeStore.setTheme(defaultThemeName);
    loadThemeColors(defaultThemeName);
    loadColorLocks(defaultThemeName);
  }
};

const resetToDefaults = () => {
  if (confirm('Are you sure you want to reset all themes to defaults?')) {
    themeStore.resetToDefaults();
    loadThemeColors(currentTheme.value);
    loadColorLocks(currentTheme.value);
  }
};

const handleThemeImported = () => {
  // Refresh themes after import
  themeStore.loadTheme();
};

// Initialize
onMounted(() => {
  loadThemeColors(currentTheme.value);
  loadColorLocks(currentTheme.value);
});
</script>

<style scoped>
.theme-builder {
  @apply theme-transition;
}

.card-compact {
  @apply transition-all duration-200;
}

.card-compact:hover {
  @apply transform scale-105;
}

/* Custom scrollbar for theme list */
.space-y-2.max-h-96.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: oklch(var(--color-primary)) oklch(var(--color-base-200));
}

.space-y-2.max-h-96.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.space-y-2.max-h-96.overflow-y-auto::-webkit-scrollbar-track {
  background: oklch(var(--color-base-200));
  border-radius: 9999px;
}

.space-y-2.max-h-96.overflow-y-auto::-webkit-scrollbar-thumb {
  background: oklch(var(--color-primary));
  border-radius: 9999px;
}
</style>
