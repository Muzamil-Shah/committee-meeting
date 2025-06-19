import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),  // Aliasing src to '@' for easier imports
    },
  },
  build: {
    target: 'esnext',  // Target modern browsers for smaller bundle
    sourcemap: false,  // Set to true if you need source maps
    chunkSizeWarningLimit: 1000,  // Adjusting chunk size limit for warnings
    rollupOptions: {
      output: {
        // Manual chunking based on libraries used in the project
        manualChunks: {
          react: ['react', 'react-dom'],
          radix: [
            '@radix-ui/react-checkbox',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-popover',
            '@radix-ui/react-radio-group',
            '@radix-ui/react-select',
            '@radix-ui/react-tabs',
            '@radix-ui/react-toast',
            '@radix-ui/react-tooltip',
          ],
          tanstack: ['@tanstack/react-query', '@tanstack/react-table','@tanstack/react-query-devtools'],
          zod: ['zod'],
          recharts: ['recharts'],
        },
      },
    },
    minify: 'esbuild',  // Use esbuild for faster builds
    commonjsOptions: {
      include: [/node_modules/],  // Include all commonjs modules
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`,  // Preload your SCSS variables (optional)
      },
    },
  },
  server: {
    port: 8182,  // Set your development server port
    host: true,  // Allows accessing the dev server from external devices
  },
});
