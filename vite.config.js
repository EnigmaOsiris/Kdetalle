import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/plataformaVentas/', // Cambiar si el nombre del repositorio es diferente
})
