import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [tailwindcss()],
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        about: resolve(import.meta.dirname, 'about.html'),
        portfolio: resolve(import.meta.dirname, 'portfolio.html'),
        services: resolve(import.meta.dirname, 'services.html'),
        resume: resolve(import.meta.dirname, 'resume.html'),
        contact: resolve(import.meta.dirname, 'contact.html'),
      },
    },
  },
});
