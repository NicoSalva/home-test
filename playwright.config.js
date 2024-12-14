import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000, 
  use: {
    browserName: 'chromium', 
    headless: false, 
    baseURL: 'http://localhost:3100', 
  },
});
