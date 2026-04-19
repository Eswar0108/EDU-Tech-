import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    
     react(),
     tailwindcss()
    
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/call/ws": {
        target: "ws://127.0.0.1:8000",
        ws: true,
      },
      "/notifications/ws": {
        target: "ws://127.0.0.1:8000",
        ws: true,
      },
    },
  },
})
