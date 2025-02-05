import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/fetchcontainers': 'http://localhost:8080',
      '/restartcontainer': 'http://localhost:8080',
      '/pausecontainer': 'http://localhost:8080',
      '/removecontainer': 'http://localhost:8080',
      '/killcontainer': 'http://localhost:8080',
    },
  },
})
