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
            name: 'Vue Loom Carousel',
        },
        rollupOptions: {
            // make sure to externalize deps that shouldn't be bundled
            // into your library
            external: [
                '@vue-loom/vue-loom',
                '@vue-loom/vue-loom/ui',
                '@vueuse/core',
                'class-variance-authority',
                'clsx',
                'embla-carousel-vue',
                'lucide-vue-next',
                'radix-vue',
                'tailwind-merge',
                'vue',
            ],
            input: Object.fromEntries(
                glob.sync([
                    'src/components/*{.ts,.vue}',
                    'src/index.ts',
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
                    '@vue-loom/vue-loom': 'vueLoom',
                    'class-variance-authority': 'classVarianceAuthority',
                    clsx: 'clsx',
                    'embla-carousel-vue': 'emblaCarouselVue',
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
