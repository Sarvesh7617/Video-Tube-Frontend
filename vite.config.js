import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host:true,
    proxy:'http://localhost:/8000',
    port:5174
  },
  plugins: [
    tailwindcss(),
    react()],
})
