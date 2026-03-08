import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Replace 'Yangerila-new2' if your repo name is different
  base: '/Yangerila-new2/', 
})