// @ts-check
import { test, expect } from '@playwright/test';

const links = require('./links.json');

const domain = process.env.DOMAIN ?? '';

test.describe(`Visual regression`, () => {
  for (let link of links) {
    test(`Check ${link}`, async ({ page }) => {
      let response = await page.goto(`https://${domain}${link}`, {timeout: 70000});
      // Wait that page fully loaded
      await page.waitForLoadState('load', {timeout: 70000});
      // Check page status should be 200
      await expect(response?.ok(), 'Page status should be OK').toBeTruthy();
      // Visual regression
      await expect(page).toHaveScreenshot({ maxDiffPixels: 10 });
    })
  }
});

