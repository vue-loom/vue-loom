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
            name: 'Vue Loom Utilities',
        },
        rollupOptions: {
            input: Object.fromEntries(
                glob.sync([
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
                }
            },
        },
    },
    plugins: [vue()],
})
