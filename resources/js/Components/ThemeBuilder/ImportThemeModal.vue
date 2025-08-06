<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="card bg-base-100 w-96 max-w-full mx-4">
      <div class="card-body">
        <h3 class="card-title">Import Theme</h3>

        <!-- Import Method -->
        <div class="form-control mb-4">
          <label class="label">
            <span class="label-text">Import Method</span>
          </label>
          <div class="flex gap-2">
            <button @click="importMethod = 'file'"
                    :class="['btn flex-1', importMethod === 'file' ? 'btn-primary' : 'btn-outline']">
              File Upload
            </button>
            <button @click="importMethod = 'text'"
                    :class="['btn flex-1', importMethod === 'text' ? 'btn-primary' : 'btn-outline']">
              Text Input
            </button>
          </div>
        </div>

        <!-- File Upload -->
        <div v-if="importMethod === 'file'" class="mb-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Select Theme File</span>
            </label>
            <input type="file"
                   accept=".json,.css"
                   @change="handleFileSelect"
                   class="file-input file-input-bordered file-input-primary w-full" />
          </div>
          <div v-if="selectedFile" class="mt-2 text-sm text-base-content/70">
            Selected: {{ selectedFile.name }}
          </div>
        </div>

        <!-- Text Input -->
        <div v-if="importMethod === 'text'" class="mb-4">
          <label class="label">
            <span class="label-text">Theme Data</span>
          </label>
          <textarea v-model="importText"
                    class="textarea textarea-bordered h-32 font-mono text-xs"
                    placeholder="Paste your theme JSON data here..."></textarea>
        </div>

        <!-- Theme Preview -->
        <div v-if="previewTheme" class="mb-4">
          <label class="label">
            <span class="label-text">Preview</span>
          </label>
          <div class="card bg-base-200">
            <div class="card-body p-4">
              <div class="flex items-center justify-between mb-2">
                <h4 class="font-semibold">{{ previewTheme.displayName || previewTheme.name }}</h4>
                <span class="badge" :class="previewTheme.isDark ? 'badge-primary' : 'badge-secondary'">
                  {{ previewTheme.isDark ? 'Dark' : 'Light' }}
                </span>
              </div>
              <div class="grid grid-cols-7 gap-1">
                <div v-for="(color, key) in previewTheme.colors"
                     :key="key"
                     class="w-6 h-6 rounded border border-base-300"
                     :title="`${key}: ${color}`"
                     :style="{ backgroundColor: color }">
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Validation Message -->
        <div v-if="validationMessage"
             :class="['alert', validationType === 'error' ? 'alert-error' : 'alert-success']">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>{{ validationMessage }}</span>
        </div>

        <!-- Actions -->
        <div class="card-actions justify-between">
          <button @click="resetImport" class="btn btn-ghost btn-sm">
            Clear
          </button>

          <div class="flex gap-2">
            <button @click="$emit('close')" class="btn btn-ghost btn-sm">
              Cancel
            </button>
            <button @click="confirmImport"
                    :disabled="!canImport"
                    class="btn btn-primary btn-sm">
              Import Theme
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { ThemeConfig } from '@/config/themes';

interface Emits {
  (e: 'close'): void;
  (e: 'theme-imported'): void;
}

const emit = defineEmits<Emits>();

// State
const importMethod = ref<'file' | 'text'>('file');
const selectedFile = ref<File | null>(null);
const importText = ref('');
const previewTheme = ref<ThemeConfig | null>(null);
const validationMessage = ref('');
const validationType = ref<'error' | 'success'>('error');

// Computed properties
const canImport = computed(() => {
  return previewTheme.value !== null;
});

// Methods
const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (file) {
    selectedFile.value = file;
    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target?.result as string;
      processImportData(content);
    };

    reader.readAsText(file);
  }
};

const processImportData = (data: string) => {
  try {
    let parsedData: any;

    // Try to parse as JSON first
    try {
      parsedData = JSON.parse(data);
    } catch {
      // If JSON parsing fails, try to parse as CSS
      parsedData = parseCSSVariables(data);
    }

    // Validate the theme structure
    const validatedTheme = validateTheme(parsedData);

    if (validatedTheme) {
      previewTheme.value = validatedTheme;
      validationMessage.value = 'Theme is valid and ready to import';
      validationType.value = 'success';
    } else {
      throw new Error('Invalid theme structure');
    }
  } catch (error) {
    previewTheme.value = null;
    validationMessage.value = `Error: ${error instanceof Error ? error.message : 'Invalid theme data'}`;
    validationType.value = 'error';
  }
};

const parseCSSVariables = (css: string): Partial<ThemeConfig> => {
  const theme: Partial<ThemeConfig> = {
    colors: {
      primary: '',
      secondary: '',
      accent: '',
      neutral: '',
      'base-100': '',
      'base-200': '',
      'base-300': '',
    },
  };

  const regex = /--color-([a-z-]+):\s*([^;]+);/g;
  let match;

  while ((match = regex.exec(css)) !== null) {
    const [, colorKey, colorValue] = match;
    // Convert CSS variable names to theme color keys
    const themeKey = colorKey.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
    if (theme.colors && themeKey in theme.colors) {
      (theme.colors as any)[themeKey] = colorValue.trim();
    }
  }

  return theme;
};

const validateTheme = (data: any): ThemeConfig | null => {
  // Check if it has the required structure
  if (!data.name || !data.colors) {
    throw new Error('Theme must have a name and colors property');
  }

  // Check required colors
  const requiredColors = ['primary', 'secondary', 'accent', 'neutral', 'base-100', 'base-200', 'base-300'];
  const missingColors = requiredColors.filter(color => !data.colors[color]);

  if (missingColors.length > 0) {
    throw new Error(`Missing required colors: ${missingColors.join(', ')}`);
  }

  // Return validated theme
  return {
    name: data.name,
    displayName: data.displayName || data.name,
    isDark: data.isDark || false,
    colors: data.colors,
  };
};

const confirmImport = () => {
  if (previewTheme.value) {
    emit('theme-imported');
    emit('close');
  }
};

const resetImport = () => {
  selectedFile.value = null;
  importText.value = '';
  previewTheme.value = null;
  validationMessage.value = '';
  validationType.value = 'error';
};

// Watch for text input changes
importText.value = '';
</script>

<style scoped>
/* Modal animations */
.fixed.inset-0 {
  animation: fadeIn 0.2s ease-out;
}

.card {
  animation: slideUp 0.2s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* File input styling */
.file-input {
  transition: all 0.2s ease;
}

.file-input:focus {
  transform: translateY(-1px);
}

/* Color grid preview */
.grid.grid-cols-7.gap-1 div {
  transition: all 0.2s ease;
}

.grid.grid-cols-7.gap-1 div:hover {
  transform: scale(1.1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* Button hover effects */
.btn {
  transition: all 0.2s ease;
}

.btn:hover:not(:disabled) {
  transform: translateY(-1px);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
