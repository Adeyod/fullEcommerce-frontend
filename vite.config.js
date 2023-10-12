import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import pluginRewriteAll from 'vite-plugin-rewrite-all';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), pluginRewriteAll()],

  // added
  build: {
    // Specify your entry point
    rollupOptions: {
      input: '/src/main.jsx', // Replace with the actual path to your entry file
    },
  },
});
