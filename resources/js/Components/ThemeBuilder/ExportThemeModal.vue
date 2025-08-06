<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="card bg-base-100 w-96 max-w-full mx-4">
      <div class="card-body">
        <h3 class="card-title">Export Theme</h3>

        <!-- Theme Info -->
        <div class="mb-4 p-4 bg-base-200 rounded-lg">
          <h4 class="font-semibold mb-2">{{ theme?.displayName || 'Unknown Theme' }}</h4>
          <div class="text-sm text-base-content/70">
            <p>Name: {{ theme?.name }}</p>
            <p>Type: {{ theme?.isDark ? 'Dark' : 'Light' }}</p>
          </div>
        </div>

        <!-- Export Format -->
        <div class="form-control mb-4">
          <label class="label">
            <span class="label-text">Export Format</span>
          </label>
          <select v-model="selectedFormat" class="select select-bordered">
            <option value="json">JSON (Recommended)</option>
            <option value="css">CSS Variables</option>
            <option value="tailwind">Tailwind Config</option>
          </select>
        </div>

        <!-- Preview -->
        <div class="mb-4">
          <label class="label">
            <span class="label-text">Preview</span>
          </label>
          <div class="card bg-base-200">
            <div class="card-body p-4">
              <pre class="text-xs overflow-x-auto">{{ exportPreview }}</pre>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="card-actions justify-between">
          <button @click="copyToClipboard" class="btn btn-outline btn-sm">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Copy
          </button>

          <div class="flex gap-2">
            <button @click="$emit('close')" class="btn btn-ghost btn-sm">
              Cancel
            </button>
            <button @click="downloadFile" class="btn btn-primary btn-sm">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import type { ThemeConfig } from '@/config/themes';

interface Props {
  theme: ThemeConfig | undefined;
}

interface Emits {
  (e: 'close'): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// State
const selectedFormat = ref('json');

// Computed properties
const exportPreview = computed(() => {
  if (!props.theme) return 'No theme data available';

  switch (selectedFormat.value) {
    case 'json':
      return JSON.stringify({
        name: props.theme.name,
        displayName: props.theme.displayName,
        isDark: props.theme.isDark,
        colors: props.theme.colors,
        exportedAt: new Date().toISOString(),
      }, null, 2);

    case 'css':
      return `:root {
  --color-primary: ${props.theme.colors.primary};
  --color-secondary: ${props.theme.colors.secondary};
  --color-accent: ${props.theme.colors.accent};
  --color-neutral: ${props.theme.colors.neutral};
  --color-base-100: ${props.theme.colors['base-100']};
  --color-base-200: ${props.theme.colors['base-200']};
  --color-base-300: ${props.theme.colors['base-300']};
}`;

    case 'tailwind':
      return `module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '${props.theme.colors.primary}',
        secondary: '${props.theme.colors.secondary}',
        accent: '${props.theme.colors.accent}',
        neutral: '${props.theme.colors.neutral}',
        'base-100': '${props.theme.colors['base-100']}',
        'base-200': '${props.theme.colors['base-200']}',
        'base-300': '${props.theme.colors['base-300']}',
      },
    },
  },
};`;

    default:
      return 'Invalid format';
  }
});

// Methods
const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(exportPreview.value);
    // You could add a toast notification here
    console.log('Theme exported to clipboard');
  } catch (err) {
    console.error('Failed to copy to clipboard:', err);
  }
};

const downloadFile = () => {
  if (!props.theme) return;

  const content = exportPreview.value;
  const fileName = `${props.theme.name}-theme.${selectedFormat.value}`;
  const mimeType = selectedFormat.value === 'json' ? 'application/json' : 'text/plain';

  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Initialize
onMounted(() => {
  selectedFormat.value = 'json';
});
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

/* Code preview styling */
pre {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  line-height: 1.4;
}

/* Button hover effects */
.btn {
  transition: all 0.2s ease;
}

.btn:hover {
  transform: translateY(-1px);
}
</style>
