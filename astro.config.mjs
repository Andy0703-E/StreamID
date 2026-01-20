// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  // Performance optimizations
  vite: {
    ssr: {
      external: ['hls.js']
    },
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
        },
      },
      rollupOptions: {
        output: {
          manualChunks: {
            'hls': ['hls.js'],
            'react': ['react', 'react-dom'],
          }
        }
      },
      chunkSizeWarningLimit: 1000
    },
    optimizeDeps: {
      include: ['hls.js', 'react', 'react-dom']
    }
  }
});
