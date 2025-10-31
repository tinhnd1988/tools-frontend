import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Vite dev server tự động handle history API fallback
  // Production: cần cấu hình server (Apache .htaccess hoặc Nginx)
  build: {
    outDir: 'dist',
  },
  preview: {
    // Đảm bảo preview server cũng handle history API fallback
    port: 4173,
  },
})
