import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "https://shinobiseb.github.io/weather-api-app-2/",
  plugins: [react()],
  build: {
    outDir: 'docs'
  }
})