
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
      // logic: Check .env file first, if missing/empty, use the provided hardcoded key.
      'process.env': JSON.stringify({
        API_KEY: env.API_KEY || "AIzaSyAlY-3In4-2CjQ4Y5Hut_kQ-nhKeHlwZzc",
        NODE_ENV: mode
      })
    }
  };
});
