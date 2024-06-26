import {extname, relative, resolve} from 'path'
import {fileURLToPath} from 'node:url'
import {glob} from 'glob'
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {libInjectCss} from 'vite-plugin-lib-inject-css'
import path from "path";
import tailwind from "tailwindcss";
import autoprefixer from "autoprefixer";

// https://vitejs.dev/config/
export default defineConfig({
    css: {
        postcss: {
            plugins: [tailwind(), autoprefixer()],
        },
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src/"),
        },
    },
    // If our .vue files have a style, it will be compiled as a single `.css` file under /dist.
    plugins: [vue(), libInjectCss()],
    build: {
        // Output compiled files to /dist.
        outDir: './dist',
        lib: {
            // Set the entry point (file that contains our components exported).
            entry: resolve(__dirname, 'src/index.ts'),
            formats: ['es'],
            // Name of the library.
            // name: 'vue-loom',
            // We are building for CJS and ESM, use a function to rename automatically files.
            // Example: my-component-library.esm.js
            fileName: (format) => `vue-loom.${format}.js`,
        },
        rollupOptions: {
            // Vue is provided by the parent project, don't compile Vue source-code inside our library.
            external: [
                'vue',
                'dayjs',
                '@heroicons/vue/24/outline',
                '@heroicons/vue/24/solid',
                '@inertiajs/vue3',
                '@vitejs/plugin-vue',
            ],
            output: {
                globals: {vue: 'Vue'},
                assetFileNames: 'assets/[name][extname]',
                entryFileNames: function ({name}) {
                    if (name === 'index') {
                        return 'vue-loom.[format].js'
                    }

                    return '[name].[format].js';
                },
                chunkFileNames: (chunkInfo) => {
                    return 'shared/' + chunkInfo.name.split('.')[0] + '.[format].js';
                },
                // preserveModules: true
            },
            input: Object.fromEntries(
                glob.sync(['src/**/*{.ts,.vue}'], {
                    ignore: 'src/globals/*.ts'
                }).map(file => [
                    // The name of the entry point
                    // src/nested/foo.ts becomes nested/foo
                    relative(
                        'src',
                        file.slice(0, file.length - extname(file).length)
                    ),
                    // The absolute path to the entry file
                    // src/nested/foo.ts becomes /project/src/nested/foo.ts
                    fileURLToPath(new URL(file, import.meta.url))
                ])
            ),
        },
        cssCodeSplit: true,
    },
});
