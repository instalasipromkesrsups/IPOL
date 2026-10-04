import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/IPOL/', // 👈 PENTING: Harus ada garis miring dan nama repo persis seperti ini
})
