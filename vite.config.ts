import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dts from 'vite-plugin-dts'
import postcss from 'rollup-plugin-postcss'
import Unocss from 'unocss/vite'

export default defineConfig({
  plugins: [
    vue(),
    Unocss(),
    vueJsx(),
    dts({
      entryRoot: './src',
      tsconfigPath: './tsconfig.json',
      outDir: './package/dist'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/'),
      name: '@axm/manage-render',
      fileName: '@axm/manage-render'
    },
    rollupOptions: {
      plugins: [
        postcss({
          plugins: [],
          inject: true,
          extract: false
        })
      ],
      external: ['vue', 'element-plus'],
      output: [
        {
          format: 'es',
          entryFileNames: '[name].mjs',
          // preserveModules: true,
          exports: 'named',
          dir: './package/dist'
        },
        {
          format: 'cjs',
          entryFileNames: '[name].js',
          // preserveModules: true,
          exports: 'named',
          dir: './package/dist'
        }
      ]
    },
    cssCodeSplit: false
  }
})
