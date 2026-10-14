import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // In development the Spring Boot API runs on :8080; the dev server forwards /api to it.
    proxy: { '/api': 'http://localhost:8080' },
  },
  build: {
    // three.js (~1 MB) is lazy-loaded with the footer scene, so its large chunk never blocks the first paint.
    chunkSizeWarningLimit: 1100,
  },
});
