import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://220.69.74.96:1200',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
