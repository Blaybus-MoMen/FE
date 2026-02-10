import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
    base: '/mentor/',
    envDir: './',
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
                id: '/mentor/',
                name: 'Mentor App',
                short_name: 'Mentor',
                start_url: '/mentor/',
                scope: '/mentor/',
                display: 'standalone',
                background_color: '#001871',
                theme_color: '#001871',
                icons: [
                    {
                        src: '/mentor/icons/icon-192.png',
                        sizes: '192x192',
                        type: 'image/png',
                        purpose: 'maskable',
                    },
                    {
                        src: '/mentor/icons/icon-512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'maskable',
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
