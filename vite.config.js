import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/index.js',
      name: 'ReactAuthClient',
      formats: ['es', 'umd'],
      fileName: (format) => `react-auth-client.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'axios', 'prop-types'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          axios: 'axios',
          'prop-types': 'PropTypes'
        }
      }
    }
  }
});