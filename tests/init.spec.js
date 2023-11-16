// @ts-check
import { test, expect } from '@playwright/test';

const domain = process.env.DOMAIN ?? '';

test('Setup', async ({ page }) => {
    await page.goto('https://' + domain, {timeout: 70000});
    // Get all a elements
    const links = await page.getByRole('link', {includeHidden: true}).all();
    // Loop through links
    let allow_links = [];
    for (let link of links) {
      let href = await link.getAttribute('href');
      if (href?.indexOf('http') !== -1) {
        if (href?.indexOf(domain) !== -1) {
            href = href
                ?.replace('https://', '')
                ?.replace('http://', '')
                ?.replace('www.', '')
                ?.replace(domain, '') ?? '';
        }
        else {
            continue;
        }
      }
      //  if trimmed href is empty, skip it
      if (href?.trim() === '') {
          continue;
      }
      if (href?.indexOf('mailto') !== -1) {
          continue;
      }
      if (href?.indexOf('about:blank') !== -1) {
          continue;
      }
      if (href?.indexOf('javascript') !== -1) {
          continue;
      }
      if (href?.indexOf('tel') !== -1) {
          continue;
      }
      // if link not start with /, skip it
      if (href?.indexOf('/') !== 0) {
          continue;
      }
      allow_links.push(href);
    }
    // Remove duplicates
    allow_links = [...new Set(allow_links)];
    // Sort links
    allow_links.sort();
    // Write allow_links to file as json
    const fs = require('fs');
    fs.writeFileSync('tests/links.json', JSON.stringify(allow_links, null, 2));
});
