<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="card bg-base-100 w-96 max-w-full mx-4">
      <div class="card-body">
        <h3 class="card-title">Color Picker</h3>

        <!-- Current color display -->
        <div class="flex items-center gap-4 mb-4">
          <div class="w-16 h-16 rounded-lg border-2 border-base-300"
               :style="{ backgroundColor: color }"></div>
          <div>
            <input type="text"
                   :value="color"
                   @input="(e) => updateColor((e.target as HTMLInputElement).value)"
                   class="input input-bordered w-full font-mono text-sm" />
            <div class="text-xs text-base-content/70 mt-1">
              {{ color.toUpperCase() }}
            </div>
          </div>
        </div>

        <!-- Color picker input -->
        <div class="form-control mb-4">
          <label class="label">
            <span class="label-text">Choose Color</span>
          </label>
          <input type="color"
                 :value="color"
                 @input="(e) => updateColor((e.target as HTMLInputElement).value)"
                 class="w-full h-12 rounded cursor-pointer" />
        </div>

        <!-- Preset colors -->
        <div class="mb-4">
          <label class="label">
            <span class="label-text">Preset Colors</span>
          </label>
          <div class="grid grid-cols-8 gap-2">
            <button v-for="presetColor in presetColors"
                    :key="presetColor"
                    @click="updateColor(presetColor)"
                    class="w-8 h-8 rounded border-2 border-base-300 hover:scale-110 transition-transform"
                    :style="{ backgroundColor: presetColor }"
                    :title="presetColor">
            </button>
          </div>
        </div>

        <!-- Color formats -->
        <div class="mb-4">
          <label class="label">
            <span class="label-text">Color Formats</span>
          </label>
          <div class="grid grid-cols-3 gap-2">
            <button @click="copyToClipboard(color)"
                    class="btn btn-xs btn-outline">
              HEX
            </button>
            <button @click="copyToClipboard(rgbColor)"
                    class="btn btn-xs btn-outline">
              RGB
            </button>
            <button @click="copyToClipboard(hslColor)"
                    class="btn btn-xs btn-outline">
              HSL
            </button>
          </div>
        </div>

        <!-- Action buttons -->
        <div class="card-actions justify-end">
          <button @click="$emit('close')" class="btn btn-ghost">
            Cancel
          </button>
          <button @click="confirmColor" class="btn btn-primary">
            Apply
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

interface Props {
  color: string;
}

interface Emits {
  (e: 'close'): void;
  (e: 'color-selected', color: string): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// State
const localColor = ref(props.color);

// Computed properties
const presetColors = [
  '#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff',
  '#800000', '#008000', '#000080', '#808000', '#800080', '#008080', '#c0c0c0', '#808080',
  '#9999ff', '#993366', '#ffffcc', '#ccffff', '#660066', '#ff8080', '#0066cc', '#ccccff',
  '#000080', '#ff00ff', '#ffff00', '#00ffff', '#800080', '#800000', '#008080', '#0000ff'
];

const rgbColor = computed(() => {
  const hex = localColor.value.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgb(${r}, ${g}, ${b})`;
});

const hslColor = computed(() => {
  const hex = localColor.value.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
});

// Methods
const updateColor = (newColor: string) => {
  // Ensure it's a valid hex color
  if (/^#[0-9A-F]{6}$/i.test(newColor)) {
    localColor.value = newColor;
  }
};

const confirmColor = () => {
  emit('color-selected', localColor.value);
};

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    // You could add a toast notification here
    console.log('Color copied to clipboard:', text);
  } catch (err) {
    console.error('Failed to copy color:', err);
  }
};

// Initialize
onMounted(() => {
  localColor.value = props.color;
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

/* Color grid hover effects */
.grid.grid-cols-8.gap-2 button {
  transition: all 0.2s ease;
}

.grid.grid-cols-8.gap-2 button:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>
