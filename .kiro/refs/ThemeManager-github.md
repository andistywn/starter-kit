Directory structure:
└── kaandesu-vue-daisyui-theme-manager/
    ├── README.md
    ├── CONTRIBUTING.md
    ├── create-config.js
    ├── index.html
    ├── LICENSE
    ├── package.json
    ├── postcss.config.js
    ├── SECURITY.md
    ├── set-config-path.js
    ├── tailwind.config.js
    ├── tsconfig-build.json
    ├── tsconfig.json
    ├── tsconfig.node.json
    ├── vite.config.ts
    ├── src/
    │   ├── App.vue
    │   ├── main.ts
    │   ├── style.css
    │   ├── vite-env.d.ts
    │   └── themeManager/
    │       ├── index.ts
    │       ├── reactives.ts
    │       └── types.ts
    └── .github/
        └── workflows/
            └── deploy.yml


Files Content:

================================================
FILE: README.md
================================================
# Vue Daisy UI Theme Manager Plugin

This plugin allows you to change the theme of your application at runtime. It also allows you to watch for system theme changes and update the theme accordingly.

[live-demo](https://kaandesu.github.io/vue-daisyui-theme-manager/)

Install:

```bash
npm i vue-daisyui-theme-manager
```

## Setup

As you install `theme-manager.config.ts` will be automatically created and added to the root folder of your project. <br> You can set up the available themes in this file. It will be also used as type definition. But don't forget to specify the list of themes in `tailwind.config.js` as well. More information about setting up the themes at [DaisyUI Themes Setup](https://daisyui.com/docs/themes/).

# API

## Initial Setup

As you insts

## Plugin Setup: `createThemeManager`

Initiate the plugin with the default theme and the dark theme. Theme options are from Daisiy UI themes as well as some custom added themes. Check all the built-in [DaisyUI Themes](https://daisyui.com/docs/themes/). <br> Create your own custom daisy ui theme [here](https://daisyui.com/theme-generator/) and add it to the `tailwind.config.js` file! <br>

```ts
type DaisyThemes = "light" | "default" | "dark" | "cupcake" |
 "bumblebee" | "emerald" | "corporate" | "synthwave" | "retro" | "cyberpunk" |
  "valentine" | "halloween" | "garden" |  'forest' | 'aqua' | 'lofi' | 'pastel' |
  'fantasy' | 'wireframe' | 'black' | 'luxury' | 'dracula' | 'cmyk' | 'autumn' |
  'business' | 'acid' | 'lemonade' | 'night' | 'coffee' | | "winter"
```

### Type definition

```ts
export type ThemeOptions = {
  light: DaisyThemes
  dark: DaisyThemes
  watchSystemTheme: boolean
}

createThemeManager(options?: ThemeOptions): (app: App) => void
```

### Usage in main.ts

The `light` and `dark` options are the default themes that will be used when "`toggleDark()`" is called. Or when "`set({theme:'default'})`" is being called.

```ts
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import { createThemeManager } from '@/plugins/themeManager'

const app = createApp(App)
app.use(
  createThemeManager({
    light: 'aqua',
    dark: 'coffee',
    watchSystemTheme: true,
  })
)

app.mount('#app')
```

<hr />

## Usage in the component: `useThemeManager()`

### Type definition

```ts
const themeManagerInstance = {
  set,
  get,
  toggleDark,
  setDefaults,
  getDefaults,
  watchSystemTheme,
  isDark,
}
```

### Installation

```ts
import { useThemeManager } from '@/plugins/themeManager'
const $theme = useThemeManager()
```

### Methods

- `set` - Set a theme from the daisy theme options defined in the `tailwind.config.js`<br> Type definition:
  ```ts
  set({theme: DaisyThemes}): void
  ```
  usage example:
  ```ts
  $theme.set({theme:'light'})
  ```
- `get` - Get the current active theme <br> Type definition:
  ```ts
  get(): DaisyThemes
  ```
  Usage example:
  ```ts
  $theme.get() // ie: 'coffee'
  ```
- `toggleDark` - Toggle between the default light and dark themes that were defined in the plugin setup <br> Type definition:
  ```ts
  toggleDark(): void
  ```
  Usage example:
  ```ts
  $theme.toggleDark()
  ```
- `setDefaults` - Set the default light and dark themes after the plugin has been initiated. <br> Type definition:
  ```ts
  setDefaults(themes: { light?: DaisyThemes; dark?: DaisyThemes }): void
  ```
  Usage example:
  ```ts
  $theme.setDefaults({ light: 'aqua', dark: 'business' })
  ```
- `getDefaults` - Get the default light and dark themes <br> Type definition:
  ```ts
  getDefaults(): { light: DaisyThemes; dark: DaisyThemes }
  ```
  Usage example:
  ```ts
  $theme.getDefaults() // ie: { light: 'aqua', dark: 'business' }
  ```
- `watchSystemTheme` - Watch for system theme changes, and set if you want it to update the theme `immediately` to the default theme that corresponds to the system mode (light/dark). `updateTheme` is set to `true` by default. <br> Type definition:
  ```ts
  watchSystemTheme(bool?: boolean, updateTheme: boolean = true): boolean
  ```
  Usage example:
  ```ts
  /* Returns if the theme manager watching the active system theme */
  $theme.watchSystemTheme() // ie: true
  /*
    Theme will change to the default theme that corresponds
    to the system mode (light/dark)
  */
  $theme.watchSystemTheme(true)
  /* theme will remain the same even if the system theme changes */
  $theme.watchSystemTheme(false)
  /* theme will not change immidiatly to the default theme that corresponds to the system mode (light/dark)
     it will change if the theme of the system changes again
  */
  $theme.watchSystemTheme(true, false)
  ```
- `isDark` - Get the current system theme <br> Type definition:
  ```ts
  isDark(): boolean
  ```
  Usage example:
  ```ts
  $theme.isDark() // ie: true
  ```

<hr>

## Contributing

Contributions to the project is highly appreciated. If you have any suggestions/questions/requests please consider [opening an issue](https://github.com/kaandesu/vue-daisyui-theme-manager/issues/new). If you want to contribute to the project, fixing an open issue is greatly recommended and appreciated. To see the all contribution rules please check the [contribution rules](CONTRIBUTING.md).

## License

This project is licensed under `MIT License` if you want to see more, please check [LICENSE](LICENSE) for more information.

## Credits

This project is created and actively maintained by [kaandesu](https://github.com/kaandesu)



================================================
FILE: CONTRIBUTING.md
================================================
# How to contribute

### ❗ **Common mistakes**

- Opening a pull request without a description or a proper name is not fun for the reviewer, so try to explain your change as much as possible either by text or a code snippet.
- Adding new dependencies or modifying the `package.json` will most likely be not accepted or will be accepted in a long time since adding a new dependency to the codebase can be tricky.
- This project uses `npm`, so please try to respect the choice and try to use it.

### 📝 Useful scripts

These are the useful scripts that you can use while developing. You can find them in the `package.json` file. You can run them by using `npm run <script_name>`.

| Script           | Description                            |
| ---------------- | -------------------------------------- |
| `dev`            | Start the development environment      |
| `build`          | Type check and build the app           |
| `generate:types` | Generate all the types for the project |

### 🐛 **Did you find a bug?**

Ensure the bug was not already reported by searching on GitHub under [Issues](https://github.com/kaandesu/vue-daisyui-theme-manager/issues). If you're unable to find an open issue addressing the problem, [open a new one](https://github.com/kaandesu/vue-daisyui-theme-manager/issues/new). Be sure to include a **title and clear description**, as much relevant information as possible demonstrating the expected behavior that is not occurring.

### 💡 **Do you want to add a new feature or change an existing one?**

[Open a GitHub issue](https://github.com/kaandesu/vue-daisyui-theme-manager/issues/new) stating your feature request clearly. We can discuss it on the issue thread, then you can implement it! 🎉

### ✨ **Did you write a change that fixes a bug?**

Open a new GitHub pull request with the patch.

1. Fork the repository
2. Modify the code and make your amazing change
3. Create your feature branch
   ```sh
   git checkout -b feature/<your_feature>
   ```
4. Add your changes
   ```sh
   git add .
   ```
5. Commit your changes _(please respect the commit message standards)_
   ```sh
   git commit -m "feat: added amazing things!"
   ```
6. Push your changes
   ```sh
   git push -u origin feature/<your_feature>
   ```
7. Open a pull request from your branch
   - State your change in the title according to the [conventional commit guidelines](https://www.conventionalcommits.org/en/v1.0.0/).
   - Please respect the pull request template while writing your PR description.

Open source software is beautiful, all of your contributions are much appreciated

Thanks!



================================================
FILE: create-config.js
================================================
import fs from 'fs';
import path from 'path';
console.log('Current working directory:', process.cwd());
const configContent = `// add the names of the themes you want to use here
// warning: you need to specify them in tailwind.config.js as well
// DO NOT REMOVE: 'default', 'light', 'dark'
export default[
  'default',
  'light',
  'dark',
  'storm',
  'breeze',
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
] as const;
`


const projectDir = process.env.INIT_CWD;
process.chdir(projectDir);
console.log('Changed working directory:', projectDir);
const filePath = path.join(projectDir, 'theme-manager.config.ts');

fs.mkdirSync('./src', { recursive: true });
fs.writeFileSync(filePath, configContent);

console.log(`Created ${filePath}`);


================================================
FILE: index.html
================================================
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Symbols+Outlined">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Symbols">
    <title>Vite + Vue + TS</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>



================================================
FILE: LICENSE
================================================
MIT License

Copyright (c) 2023 İ. Kaan Yılmaz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.



================================================
FILE: package.json
================================================
{
  "name": "vue-daisyui-theme-manager",
  "author": "I Kaan Yilmaz <kaandesu00@gmail.com> (https://github.com/kaandesu)",
  "version": "0.0.29",
  "license": "MIT",
  "description": "A plugin that allows you to change DaisyUI themes during runtime. As well as, setting default light and dark themes, and matching the system theme.",
  "contributors": [
    {
      "name": "I Kaan Yilmaz",
      "email": "kaandesu00@gmail.com"
    }
  ],
  "keywords": [
    "vue",
    "daisyUI",
    "theme",
    "vue3",
    "tailwindcss"
  ],
  "repository": {
    "type": "git",
    "url": "https://github.com/kaandesu/vue-daisyui-theme-manager.git"
  },
  "homepage": "https://kaandesu.github.io/vue-daisyui-theme-manager/",
  "bugs": {
    "url": "https://github.com/kaandesu/vue-daisyui-theme-manager/issues"
  },
  "files": [
    "dist",
    "create-config.js",
    "set-config-path.js"
  ],
  "main": "./dist/vue-daisyui-theme-manager.umd.cjs",
  "module": "./dist/vue-daisyui-theme-manager.js",
  "exports": {
    ".": {
      "import": "./dist/vue-daisyui-theme-manager.js",
      "require": "./dist/vue-daisyui-theme-manager.umd.cjs"
    }
  },
  "types": "./dist/types.d.ts",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build && cp ./create-config.js ./dist && npm run generate:types && npm run build:live-demo",
    "build:live-demo": "vite build --mode live-demo --outDir ./live-demo",
    "generate:types": "vue-tsc -p tsconfig-build.json",
    "set-conf": "node set-config-path.js",
    "postinstall": "node create-config.js && npm run set-conf"
  },
  "dependencies": {
    "daisyui": "^2.51.6",
    "vue": "^3.2.47",
    "vue-daisyui-theme-manager": "^0.0.28"
  },
  "devDependencies": {
    "@types/node": "^18.15.11",
    "@vitejs/plugin-vue": "^4.1.0",
    "autoprefixer": "^10.4.14",
    "postcss": "^8.4.23",
    "tailwindcss": "^3.3.2",
    "typescript": "^4.9.3",
    "vite": "^4.2.0",
    "vue-tsc": "^1.2.0"
  }
}



================================================
FILE: postcss.config.js
================================================
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}



================================================
FILE: SECURITY.md
================================================
# Security Policy

## Supported Versions

We release patches for security vulnerabilities. Here are the versions that are currently being supported with security updates. If you are using an older version, please upgrade.

| Version | Supported |
| ------- | --------- |
| 0.0.x   | ✅        |

## Reporting a Vulnerability

If you discover a security vulnerability within this project, please contanct to the maintainer(s). The maintainer(s) can be found in the [README file](README.md#credits). Please do not disclose security-related issues publicly until a patch has been announced. Thank you for improving the security of this project! We appreciate your efforts and responsible disclosure and will make every effort to acknowledge your contributions.



================================================
FILE: set-config-path.js
================================================
import fs from 'fs'
import path from 'path'

const projectDir = process.env.INIT_CWD;
process.chdir(projectDir);
const configFile = `${projectDir}/../../theme-manager.config`;

const content = `
import config from ${JSON.stringify(configFile)};
export default config;
`;

const packageDir = process.cwd();
const filePath = path.join(packageDir, 'dist', 'theme-config.ts');

fs.mkdirSync(path.join(packageDir, 'dist'), { recursive: true });
fs.writeFileSync(filePath, content);

console.log(`Created ${filePath}`);



================================================
FILE: tailwind.config.js
================================================
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        storm: {
          primary: "#9aa5ce",
          secondary: "#565f89",
          accent: "#bb9af7",
          neutral: "#111827",
          "base-100": "#24283b",
          info: "#2ac3de",
          success: "#9ece6a",
          warning: "#e0af68",
          error: "#f7768e",
        },
        breeze: {
          primary: "#6807f0",
          secondary: "#6b21a8",
          accent: "#db2777",
          neutral: "#170824",
          "base-100": "#f2f2f2",
          info: "#2ac3de",
          success: "#9ece6a",
          warning: "#e0af68",
          error: "#f7768e",
        },
      },
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
    ],
  },
};



================================================
FILE: tsconfig-build.json
================================================
{
    "compilerOptions": {
      "target": "ESNext",
      "useDefineForClassFields": true,
      "module": "ESNext",
      "moduleResolution": "Node",
      "strict": true,
      "jsx": "preserve",
      "resolveJsonModule": true,
      "isolatedModules": true,
      "esModuleInterop": true,      
      "lib": ["ESNext", "DOM"],
      "skipLibCheck": true,
      "types": ["node"],
      "declaration": true,
      "emitDeclarationOnly": true,
      "outDir": "./dist",
      "baseUrl": "./"      
    },
    "include": [      
      "src/themeManager/*.ts",
      "src/themeManager/*.js"       
    ],        
    "references": [{ "path": "./tsconfig.node.json" }]
  }
  


================================================
FILE: tsconfig.json
================================================
{
  "compilerOptions": {
    "target": "ESNext",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "strict": true,
    "jsx": "preserve",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "lib": ["ESNext", "DOM"],
    "skipLibCheck": true,
    "types": ["node"],    
    "baseUrl": "./"        
  },
  "include": ["src/themeManager/*.ts", "src/themeManager/*.d.ts", "src/themeManager/*.tsx", "src/themeManager/*.vue"],    
  "references": [{ "path": "./tsconfig.node.json" }]
}



================================================
FILE: tsconfig.node.json
================================================
{
  "compilerOptions": {
    "composite": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "allowSyntheticDefaultImports": true 
  },
  "include": ["vite.config.ts"]
   
}



================================================
FILE: vite.config.ts
================================================
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  if (mode === 'live-demo') {
    return {
      base: './',
      plugins: [vue()],
    }
  } else {
    return {
      plugins: [vue()],
      build: {
        lib: {
          entry: resolve(__dirname, 'src/themeManager'),
          name: 'VueDaisyUIThemeManager',
          fileName: 'vue-daisyui-theme-manager',
        },
        rollupOptions: {
          external: ['vue'],
          output: {
            globals: {
              vue: 'Vue',
            },
          },
        },
      },
    }
  }
})



================================================
FILE: src/App.vue
================================================
<script setup lang="ts">
import { useThemeManager } from 'vue-daisyui-theme-manager'
const daisyThemes = [
  'default',
  'light',
  'dark',
  'storm',
  'breeze',
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
] as const;
import { ref, computed } from 'vue';
const $theme = useThemeManager()
const changeTheme = (e: any) => $theme.set({theme:e.target.value})
const selected = computed(() => $theme.get())
const useSystem = ref<boolean>($theme.watchSystemTheme())
const toggleWatchSystem = () => $theme.watchSystemTheme(useSystem.value)
const darkToggle = ref<HTMLInputElement>();
const isDarkMode = computed(() => {
  let { dark, light } = $theme.getDefaults()
  if ($theme.get() === dark) return 0
  else if ($theme.get() === light) return 1
  else {
    if (darkToggle.value) darkToggle.value.indeterminate = true
  }
  return 2
})
</script>

<template>
  <div class="container">
    <section class="options-container">
      <div class="flexCol">
        Select theme:
        <select v-model="selected" @change="e => changeTheme(e)" class="select select-primary w-full max-w-xs">
          <option disabled selected>Select a theme!</option>
          <option v-for="theme in daisyThemes" :key="theme">{{ theme }}</option>
        </select>
      </div>
      <div class="flexCol">
        <div class="form-control w-52">
          <label class="cursor-pointer label">
            <span class="label-text">Use System Theme</span>
            <input v-model="useSystem" @change="toggleWatchSystem()" type="checkbox" class="toggle toggle-accent"
              :checked="useSystem" />
          </label>
        </div>
      </div>
      <div class="flexCol">
        <label class="swap swap-rotate" :class="{ 'swap-active': isDarkMode !== 2 && isDarkMode === 0 }">
          <span v-show="isDarkMode !== 2" class="swap-on material-icons-outlined text-3xl">light_mode</span>
          <span v-show="isDarkMode !== 2" class="swap-off material-icons-outlined text-3xl">dark_mode</span>
        </label>
        <span v-if="isDarkMode === 2" class="swap-off material-symbols-outlined text-3xl">circle</span>
        <input @change="$theme.toggleDark()" ref="darkToggle" type="checkbox" class="toggle" />
      </div>
    </section>
    <div class="grid grid-cols-2 gap-2 md:grid-cols-4">
      <button class="btn">Default</button>
      <button class="btn btn-primary">Primary</button>
      <button class="btn btn-secondary">Secondary</button>
      <button class="btn btn-accent">Accent</button>
      <button class="btn btn-info">Info</button>
      <button class="btn btn-success">Success</button>
      <button class="btn btn-warning">Warning</button>
      <button class="btn btn-error">Error</button>
    </div>
    <div class="grid grid-cols-2 place-items-center gap-2 md:grid-cols-4"><span class="badge">Default</span> <span
        class="badge badge-primary">Primary</span> <span class="badge badge-secondary">Secondary</span> <span
        class="badge badge-accent">Accent</span> <span class="badge badge-info">Info</span> <span
        class="badge badge-success">Success</span> <span class="badge badge-warning">Warning</span> <span
        class="badge badge-error">Error</span></div>
    <div class="flex flex-col gap-3">
      <div class="flex flex-col gap-3 md:flex-row">
        <div class="md:w-1/2">
          <div class="tabs"><button class="tab tab-lifted">Tab</button> <button
              class="tab tab-lifted tab-active">Tab</button> <button class="tab tab-lifted">Tab</button></div>
          <div class="flex flex-col"><span class="link">I'm a simple link</span> <span class="link link-primary">I'm a
              simple link</span> <span class="link link-secondary">I'm a simple link</span> <span
              class="link link-accent">I'm a simple link</span></div>
        </div>
        <div class="flex flex-col gap-3 md:w-1/2"><progress value="20" max="100" class="progress">Default</progress>
          <progress value="25" max="100" class="progress progress-primary">Primary</progress> <progress value="30"
            max="100" class="progress progress-secondary">Secondary</progress> <progress value="40" max="100"
            class="progress progress-accent">Accent</progress> <progress value="45" max="100"
            class="progress progress-info">Info</progress> <progress value="55" max="100"
            class="progress progress-success">Success</progress> <progress value="70" max="100"
            class="progress progress-warning">Warning</progress> <progress value="90" max="100"
            class="progress progress-error">Error</progress>
        </div>
      </div>
      <div class="flex flex-col gap-3 md:flex-row">
        <div class="stats bg-base-300 border-base-300 border md:w-1/2">
          <div class="stat">
            <div class="stat-title">Total Page Views</div>
            <div class="stat-value">89,400</div>
            <div class="stat-desc">21% more than last month</div>
          </div>
        </div>
        <div class="flex flex-wrap items-center justify-center gap-3 md:w-1/2">
          <div class="radial-progress" style="--value:60; --size:3.5rem;">60%</div>
          <div class="radial-progress" style="--value:75; --size:3.5rem;">75%</div>
          <div class="radial-progress" style="--value:90; --size:3.5rem;">90%</div>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-3">
      <div class="flex flex-col gap-3 md:flex-row">
        <div class="md:w-1/2">
          <div><input type="checkbox" class="toggle"> <input type="checkbox" class="toggle toggle-primary"> <input
              type="checkbox" class="toggle toggle-secondary"> <input type="checkbox" class="toggle toggle-accent"></div>
          <div><input type="checkbox" class="checkbox"> <input type="checkbox" class="checkbox checkbox-primary">
            <input type="checkbox" class="checkbox checkbox-secondary"> <input type="checkbox"
              class="checkbox checkbox-accent">
          </div>
          <div><input type="radio" name="radio-1" class="radio"> <input type="radio" name="radio-1"
              class="radio radio-primary"> <input type="radio" name="radio-1" class="radio radio-secondary">
            <input type="radio" name="radio-1" class="radio radio-accent">
          </div>
        </div>
        <div class="md:w-1/2"><input type="range" min="0" max="100" class="range range-xs"> <input type="range" min="0"
            max="100" class="range range-xs range-primary"> <input type="range" min="0" max="100"
            class="range range-xs range-secondary"> <input type="range" min="0" max="100"
            class="range range-xs range-accent"></div>
      </div>
      <div class="flex flex-col gap-3 md:flex-row">
        <div class="flex flex-col gap-3 md:w-1/2"><input type="text" placeholder="Default"
            class="input input-bordered w-full"> <input type="text" placeholder="Primary"
            class="input input-primary input-bordered w-full"> <input type="text" placeholder="Secondary"
            class="input input-secondary input-bordered w-full"> <input type="text" placeholder="Accent"
            class="input input-accent input-bordered w-full"></div>
        <div class="flex flex-col gap-3 md:w-1/2"><input type="text" placeholder="Info"
            class="input input-info input-bordered w-full"> <input type="text" placeholder="Success"
            class="input input-success input-bordered w-full"> <input type="text" placeholder="Warning"
            class="input input-warning input-bordered w-full"> <input type="text" placeholder="Error"
            class="input input-error input-bordered w-full"></div>
      </div>
      <div class="navbar bg-neutral text-neutral-content rounded-box">
        <div class="flex-none"><button class="btn btn-square btn-ghost"><svg xmlns="http://www.w3.org/2000/svg"
              fill="none" viewBox="0 0 24 24" class="inline-block h-5 w-5 stroke-current">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg></button></div>
        <div class="flex-1"><button class="btn btn-ghost text-xl normal-case">daisyUI</button></div>
      </div>
      <div class="flex gap-3">
        <div class="flex flex-grow flex-col gap-3">
          <div class="text-4xl font-bold">Text Size 1</div>
          <div class="text-3xl font-bold">Text Size 2</div>
          <div class="text-2xl font-bold">Text Size 3</div>
          <div class="text-xl font-bold">Text Size 4</div>
          <div class="text-lg font-bold">Text Size 5</div>
          <div class="text-sm font-bold">Text Size 6</div>
          <div class="text-xs font-bold">Text Size 7</div>
        </div>
        <ul class="steps steps-vertical">
          <li class="step step-primary">Step 1</li>
          <li class="step step-primary">Step 2</li>
          <li class="step">Step 3</li>
          <li class="step">Step 4</li>
        </ul>
      </div>
    </div>
    <div class="flex flex-col gap-3">
      <div class="alert">
        <div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            class="stroke-info h-6 w-6 flex-shrink-0">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg> <span>12 unread messages. Tap to see.</span></div>
      </div>
      <div class="alert alert-info">
        <div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            class="h-6 w-6 flex-shrink-0 stroke-current">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg> <span>New software update available.</span></div>
      </div>
      <div class="alert alert-success">
        <div><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 flex-shrink-0 stroke-current" fill="none"
            viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg> <span>Your purchase has been confirmed!</span></div>
      </div>
      <div class="alert alert-warning">
        <div><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 flex-shrink-0 stroke-current" fill="none"
            viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z">
            </path>
          </svg> <span>Warning: Invalid email address!</span></div>
      </div>
      <div class="alert alert-error">
        <div><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 flex-shrink-0 stroke-current" fill="none"
            viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg> <span>Error! Task failed successfully.</span></div>
      </div>
    </div>
  </div>


  <RouterView />
</template>

<style  scoped>
@media (min-width: 1024px) {
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
}

.options-container {
  margin: 1rem;
  display: flex;
  flex-flow: column nowrap;
}

.flexCol {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  gap: 1rem;
  align-items: center;
}
</style>



================================================
FILE: src/main.ts
================================================
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createThemeManager } from '../src/themeManager'

const app = createApp(App)
app.use(createThemeManager({ light: 'light', dark: 'dark', watchSystemTheme: true }))

app.mount('#app')



================================================
FILE: src/style.css
================================================
@tailwind base;
@tailwind components;
@tailwind utilities;

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}




================================================
FILE: src/vite-env.d.ts
================================================
/// <reference types="vite/client" />



================================================
FILE: src/themeManager/index.ts
================================================
import type { App } from 'vue'
import { defaults, pluginInitiated, currentTheme, isDark } from './reactives'
// @ts-ignore
import config from './theme-config'
// @ts-ignore
declare module './theme-config' {
  export interface DaisyThemes {}
}

type ThemeConfigType = typeof config;
// @ts-ignore
export type DaisyThemes = ThemeConfigType[number];

// export type DaisyThemes = (typeof config)[number]
export type ThemeOptions = {
  light: DaisyThemes
  dark: DaisyThemes
  watchSystemTheme: boolean
}

export const useThemeManager = () => {
  const options: ThemeOptions = {
    light: defaults.light,
    dark: defaults.dark,
    watchSystemTheme: defaults.watchSystemTheme,
  }

  if (!pluginInitiated) {
    defaults.light = options?.light as DaisyThemes
    defaults.dark = options?.dark as DaisyThemes
    defaults.watchSystemTheme = options?.watchSystemTheme
    currentTheme.value = isDark.value ? defaults.dark : defaults.light
  }
  // Watch for system preferred theme changes

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
    isDark.value = event.matches
    const theme = event.matches ? (defaults.dark as DaisyThemes) : (defaults.light as DaisyThemes)
    if (defaults.watchSystemTheme === true) setTheme({theme})
  })

  // Set theme
  const setTheme = (setting : {theme: DaisyThemes}) => {
    let _light = defaults.light as DaisyThemes
    let _dark = defaults.dark as DaisyThemes
    // if default, set theme based on system preferred theme and the default light and dark themes
    let newTheme: DaisyThemes = 'default'
    if (setting.theme === 'default') newTheme = isDark.value ? _dark : _light
    else newTheme = setting.theme

    return document.documentElement.setAttribute('data-theme', (currentTheme.value = newTheme))
  }
  setTheme(currentTheme.value)
  // Get theme
  const getTheme = () => {
    return currentTheme.value
  }
  // Toggle dark mode, using default light and dark themes
  const toggleDark = () => {
    let _light = defaults.light as DaisyThemes
    let _dark = defaults.dark as DaisyThemes
    return document.documentElement.setAttribute(
      'data-theme',
      (currentTheme.value = currentTheme.value === _light ? _dark : _light)
    )
  }
  // Set default light and dark themes
  const setDefaults = (themes: { light?: DaisyThemes; dark?: DaisyThemes }) => {
    defaults.light = themes.light ?? defaults.light
    defaults.dark = themes.dark ?? defaults.dark
    setTheme({theme:'default'})
  }
  // Get default light and dark themes
  const getDefaults = () => {
    return { light: defaults.light, dark: defaults.dark }
  }
  const isWatchingSystemTheme = (bool?: boolean, updateTheme: boolean = true) => {
    if (bool === undefined) return defaults.watchSystemTheme
    if (bool && updateTheme) setTheme({theme:'default'})
    return (defaults.watchSystemTheme = bool)
  }

  const themeManagerInstance = {
    set: setTheme,
    get: getTheme,
    toggleDark,
    setDefaults,
    getDefaults,
    watchSystemTheme: isWatchingSystemTheme,
    isDark,
  }
  pluginInitiated.value = true
  return { ...themeManagerInstance }
}

export const createThemeManager = (options?: ThemeOptions) => {
  return (app: App) => {
    defaults.light = options?.light as DaisyThemes
    defaults.dark = options?.dark as DaisyThemes
    defaults.watchSystemTheme = options?.watchSystemTheme ?? true
    app.config.globalProperties.$theme = useThemeManager()
  }
}



================================================
FILE: src/themeManager/reactives.ts
================================================
import { reactive, ref } from 'vue'
import type { DaisyThemes, ThemeOptions } from './index'
const isDark = ref<boolean>(
  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
)
const defaults = reactive<ThemeOptions>({
  light: 'light',
  dark: 'dark',
  watchSystemTheme: false,
})
const currentTheme = ref<DaisyThemes>('default')
const pluginInitiated = ref<boolean>(false)
export { defaults, currentTheme, pluginInitiated, isDark }



================================================
FILE: src/themeManager/types.ts
================================================
export * from './index'
export * from './reactives'
import { useThemeManager } from './index'
declare module 'vue' {
  interface globalProperties {
    $theme: typeof useThemeManager
  }
}



================================================
FILE: .github/workflows/deploy.yml
================================================
name: Build and Deploy

on:
  push:
    branches:
      - main
      - master

jobs:
  build:
    runs-on: ubuntu-latest
    
    permissions:
      contents: write  # To push a branch 
      pull-requests: write  # To create a PR from that branch
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install           
      - name: Build for production
        run: npm run build:live-demo
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./live-demo

