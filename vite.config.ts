import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  css: {
    modules: {
      localsConvention: 'camelCaseOnly'
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/variables"; @import "./src/breakpoints"; @import "./src/typography"; @import "./src/mixins";`
      }
    }
  },
  server: {
    port: 3000
  }
})
