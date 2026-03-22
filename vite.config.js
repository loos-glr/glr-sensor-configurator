import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  publicDir: 'static', // Define a new directory for static assets to avoid conflicting with outDir
  build: {
    outDir: 'public',
    emptyOutDir: true // Maakt de map leeg voor elke build, voorkomt conflicten
  },
  rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        hardware: resolve(__dirname, 'hardware.html'),
        board: resolve(__dirname, 'board.html'),
        faq: resolve(__dirname, 'faq.html')
      }
    }
})