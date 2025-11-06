// playwright.config.ts (updated)
import { defineConfig } from '@playwright/test';

export default defineConfig({
  // Auto-start local server before tests
  webServer: {
    command: 'pnpm dev', // Command to start your React app
    url: 'http://localhost:3000', // URL your app runs on
    timeout: 120 * 1000, // Wait up to 2 minutes for server to start
    reuseExistingServer: !process.env.CI, // Reuse server if it's already running (not in CI)
  },
  use: {
    headless: true,
    baseURL: 'http://localhost:3000', // Matches the webServer URL
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
  ],
  timeout: 30000,
});
