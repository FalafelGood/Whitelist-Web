import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import vercel from 'vite-plugin-vercel/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    vercel({
      cleanUrls: false,
      rewrites: [
        { source: '/(.*)', destination: '/index.html' },
      ]
    })
  ],
})
