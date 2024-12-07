import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: 'Student Space',
        short_name: 'StudentSpace',
        description: 'StudentSpace for desktop!',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'favicon.svg',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'favicon.svg',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],

})
