// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel({
    webAnalytics: { enabled: true }
  }),
  integrations: [react()],
  server: {
    headers: {}
  },
  // Performance optimizations
  vite: {
    ssr: {
      external: ['hls.js']
    },
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: false, // Keep consoles for Vercel debugging
        },
      },
      chunkSizeWarningLimit: 1000
    },
    optimizeDeps: {
      include: ['hls.js', 'react', 'react-dom']
    }
  }
});
