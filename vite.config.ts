
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    plugins: [react()],
    publicDir: 'public', 
    build: {
      outDir: 'dist',
      sourcemap: false,
      target: 'esnext' 
    },
    server: {
      host: true
    },
    define: {
      // Properly stringify the process.env object to include API_KEY.
      // This avoids conflicts where 'process.env' is defined as {} effectively wiping out nested keys.
      'process.env': JSON.stringify({
        API_KEY: env.API_KEY,
        NODE_ENV: mode
      })
    }
  };
});
