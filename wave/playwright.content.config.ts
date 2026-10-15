import { defineConfig } from '@playwright/test';
import base from './playwright.config';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  ...base,
  testDir: './tests/content',
  testIgnore: [],
  use: { ...base.use, baseURL: 'http://127.0.0.1:4332' },
  webServer: {
    cwd: fileURLToPath(new URL('./tests/fixture-site/', import.meta.url)),
    command: 'npx astro build && npx astro preview --host 127.0.0.1 --port 4332',
    url: 'http://127.0.0.1:4332/wave/slider/',
    reuseExistingServer: false,
  },
});
