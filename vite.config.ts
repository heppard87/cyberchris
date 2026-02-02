import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Change this to '/' if you are using a custom domain or heppard87.github.io
  // Use '/cyberchris/' if your URL is heppard87.github.io/cyberchris/
  base: '/', 
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
