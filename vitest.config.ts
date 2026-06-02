import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
  },
  resolve: {
    alias: {
      '@domain': resolve(__dirname, './src/domain'),
      '@ui': resolve(__dirname, './src/ui')
    }
  }
});
