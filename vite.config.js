import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
  },
  optimizeDeps: {
    disabled: false,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'https': 'agent-base',
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
    commonjsOptions: {
      include: [],
      transformMixedEsModules: false,
    },
  },
})
