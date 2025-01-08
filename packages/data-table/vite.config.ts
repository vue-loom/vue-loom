import path, {extname, relative} from 'path'
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {fileURLToPath} from "node:url";
import {glob} from 'glob'

export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            formats: ['es'],
            name: 'Vue Loom Data Table',
        },
        rollupOptions: {
            // make sure to externalize deps that shouldn't be bundled
            // into your library
            external: [
                '@tanstack/vue-table',
                '@vue-loom/vue-loom',
                '@vue-loom/utils',
                '@vueuse/core',
                'class-variance-authority',
                'clsx',
                'lucide-vue-next',
                'radix-vue',
                'tailwind-merge',
                'vue',
            ],
            input: Object.fromEntries(
                glob.sync([
                    'src/index.ts',
                    'src/components/data-table/index.ts',
                ], {
                }).map(file => [
                    relative(
                        'src',
                        file.slice(0, file.length - extname(file).length)
                    ),
                    fileURLToPath(new URL(file, import.meta.url))
                ])
            ),
            output: {
                chunkFileNames: (chunkInfo) => {
                    return 'shared/' + chunkInfo.name.split('.')[0] + '.[format].js';
                },
                entryFileNames: function ({name}) {
                    if(name === 'index') {
                        return 'index.[format].js'
                    }

                    return '[name].[format].js';
                },
                globals: {
                    '@tanstack/vue-table': 'tanstackVueTable',
                    '@vue-loom/vue-loom': 'vueLoom',
                    '@vue-loom/utils': 'vueLoomUtils',
                    'class-variance-authority': 'classVarianceAuthority',
                    clsx: 'clsx',
                    'lucide-vue-next': 'lucideVueNext',
                    'radix-vue': 'radixVue',
                    'tailwind-merge': 'tailwindMerge',
                    vue: 'Vue',
                }
            },
        },
    },
    plugins: [vue()],
})
