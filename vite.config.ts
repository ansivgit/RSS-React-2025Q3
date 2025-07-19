/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['src/__tests__/test-setup.ts'],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/__tests__/**',
      '**/.{idea,git,cache,output,temp}/**',
      '**/*.config.{ts,js,mjs,cjs}',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      exclude: [
        '**/__tests__',
        '**/main.tsx',
        '**/index.{js,jsx,ts,tsx}',
        '**/types.{js,ts}',
        '**/constants.{js,ts}',
        '**/*.config.{ts,js,mjs,cjs}',
        '**/*.d.ts',
      ],
      thresholds: {
        lines: 50,
        functions: 50,
        branches: 50,
        statements: 80,
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: [
          'import',
          'mixed-decls',
          'color-functions',
          'global-builtin',
        ],
      },
    },
  },
});
