import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/cmsc128.1-labexer1/', // https://dev.to/shashannkbawa/deploying-vite-app-to-github-pages-3ane
  plugins: [vue()]
})
