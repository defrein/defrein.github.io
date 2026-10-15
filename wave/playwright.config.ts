import { defineConfig, devices } from '@playwright/test';
import process from 'node:process';

const port = Number(process.env.PLAYWRIGHT_PORT ?? 4331);
const baseURL = `http://127.0.0.1:${port}`;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: 'list',
  use: { baseURL, channel: 'chrome', trace: 'retain-on-failure' },
  projects: [
    { name: 'desktop', use: { viewport: { width: 1440, height: 1000 } } },
    { name: 'mobile', use: { ...devices['iPhone 13'], defaultBrowserType: 'chromium', channel: 'chrome' } },
  ],
  webServer: { command: `npm run preview -- --port ${port}`, url: `${baseURL}/wave/`, reuseExistingServer: false },
});
