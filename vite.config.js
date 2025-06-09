import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/my-portfolio/',
  publicDir: 'public',
  assetsInclude: ['**/*.glb', '**/*.gltf', '**/*.hdr'],

  build: {
    outDir: 'docs',
    minify: 'terser',
    sourcemap: false,
    target: 'es2020',

    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],
          'three': ['three', '@react-three/fiber', '@react-three/drei'],
          'animation': ['@react-spring/three', '@react-spring/core'],
          'ui': ['@react-three/postprocessing']
        },
        chunkFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'vendor') return 'vendor-[hash].js'
          if (chunkInfo.name === 'three') return 'three-[hash].js'
          return 'chunks/[name]-[hash].js'
        },

        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          const ext = info[info.length - 1]

          if (/glb|gltf|fbx|obj/.test(ext)) {
            return `models/[name]-[hash][extname]`
          }
          if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp|hdr/.test(ext)) {
            return `textures/[name]-[hash][extname]`
          }
          return `assets/[name]-[hash][extname]`
        }
      },
      external: [],
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'],
      },
      mangle: {
        safari10: true,
      },
    },

    chunkSizeWarningLimit: 1000,
  },
  server: {
    port: 3000,
    hmr: {
      overlay: false,
    },
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'three',
      '@react-three/fiber',
      '@react-three/drei',
      '@react-spring/three'
    ],
    exclude: ['@react-three/rapier'],
  },
})