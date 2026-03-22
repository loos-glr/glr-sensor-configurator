import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  build: {
    outDir: 'dist',
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