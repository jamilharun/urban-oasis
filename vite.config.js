import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Tailwind config changes are handled by scripts/dev.mjs, which restarts the
// process — a Vite-level restart cannot, since Node caches the config module.
export default defineConfig({
  plugins: [react()],
});
