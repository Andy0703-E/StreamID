// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import AstroPWA from '@vite-pwa/astro';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel({
    webAnalytics: { enabled: true }
  }),
  integrations: [
    react(),
    AstroPWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'logo.png'],
      manifest: {
        name: 'StreamID',
        short_name: 'StreamID',
        description: 'Nonton Anime, Drama, dan TV Indonesia Terlengkap',
        start_url: '/',
        display: 'standalone',
        background_color: '#0f1115',
        theme_color: '#e11d48',
        icons: [
          {
            src: '/pwa-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/pwa-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: '/pwa-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/pwa-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        navigateFallback: null
      },
      devOptions: {
        enabled: true
      }
    })
  ],
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
