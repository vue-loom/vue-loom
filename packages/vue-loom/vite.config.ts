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
            name: 'Vue Loom',
        },
        rollupOptions: {
            // make sure to externalize deps that shouldn't be bundled
            // into your library
            external: [
                '@tailwindcss/forms',
                '@tailwindcss/typography',
                '@vueuse/core',
                'autoprefixer',
                'class-variance-authority',
                'clsx',
                'lucide-vue-next',
                'radix-vue',
                'tailwind-merge',
                'tailwindcss',
                'tailwindcss-animate',
                'vue-sonner',
                'vue'
            ],
            input: Object.fromEntries(
                glob.sync([
                    'src/**/*{.ts,.vue}',
                ], {}).map(file => [
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
                    if (name === 'index') {
                        return 'index.[format].js'
                    }

                    return '[name].[format].js';
                },
                globals: {
                    '@tailwindcss/forms': 'tailwindcssForms',
                    '@tailwindcss/typography': 'tailwindcssTypography',
                    '@vueuse/core': 'vueuseCore',
                    'autoprefixer': 'autoprefixer',
                    'class-variance-authority': 'classVarianceAuthority',
                    clsx: 'clsx',
                    'lucide-vue-next': 'lucideVueNext',
                    'radix-vue': 'radixVue',
                    'tailwind-merge': 'tailwindMerge',
                    'tailwindcss': 'tailwindcss',
                    'tailwindcss-animate': 'tailwindcssAnimate',
                    'vue-sonner': 'vueSonner',
                    vue: 'vue',
                }
            },
        },
    },
    plugins: [vue()],
})
