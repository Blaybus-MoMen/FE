import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { VitePWA } from 'vite-plugin-pwa'



export default defineConfig({
  base: '/mentee/',
  envDir: __dirname,
  plugins: [
    tailwindcss(),
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    VitePWA({
      registerType: 'autoUpdate',
      filename: 'sw.js',
      injectRegister: 'auto',
      manifest: {
        id: '/mentee/',
        name: 'Mentee App',
        short_name: 'Mentee',
        start_url: '/mentee/',
        scope: '/mentee/',
        display: 'standalone',
        background_color: '#001871',
        theme_color: '#001871',
        icons: [
          {
            src: '/mentee/icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: '/mentee/icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
        screenshots: [
          {
            src: '/mentee/screenshots/desktop.png',
            sizes: '1280x720',
            type: 'image/png',
            form_factor: 'wide',
            label: '데스크톱 화면',
          },
          {
            src: '/mentee/screenshots/mobile.png',
            sizes: '750x1334',
            type: 'image/png',
            form_factor: 'narrow',
            label: '모바일 화면',
          },
        ],
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
  resolve: {
    alias: {
      '@package': path.resolve(__dirname, '../../package'),
      '@': path.resolve(__dirname, 'src'),
      '@app': path.resolve(__dirname, 'src/app'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@entities': path.resolve(__dirname, 'src/entities'),
      '@features': path.resolve(__dirname, 'src/features'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@shared': path.resolve(__dirname, 'src/shared'),
    },
  },
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://221.148.101.200:8089',
  //       changeOrigin: true,
  //     },
  //   },
  // },
})
