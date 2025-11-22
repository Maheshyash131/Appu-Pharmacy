import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,      // allow access from localhost / network
    port: 5173,      // Vite dev server port
    strictPort: true,
    hmr: {
      protocol: 'ws', // use WebSocket
      host: 'localhost',
      port: 5173,
    },
  },
  resolve: {
    alias: {
      '@': '/src',   // optional, for easier imports
    },
  },
})
