
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Cast process to any to avoid "Property 'cwd' does not exist on type 'Process'" error
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
      // Polyfill process.env object to avoid "process is not defined" errors
      'process.env': {},
      // Replaces process.env.API_KEY in client code with the actual string value
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  };
});
