import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function getProxyConfig() {
  if (process.env.NODE_ENV === 'production') {
    return {
      '/media': {
        target: 'https://storage.googleapis.com/your-bucket-name',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/media/, '')
      }
    };
  }
  return {};
}

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    proxy: getProxyConfig()
  },
});
