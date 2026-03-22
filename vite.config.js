import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  publicDir: 'static', // Define a new directory for static assets to avoid conflicting with outDir
  build: {
    outDir: 'public',
    emptyOutDir: true // Maakt de map leeg voor elke build, voorkomt conflicten
  }
})