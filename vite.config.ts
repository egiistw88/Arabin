import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  publicDir: 'public', // Explicitly serve static files from public folder
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
  server: {
    host: true
  }
});