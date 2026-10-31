import { test, expect } from '@playwright/test';

const pages = ['/', '/about.html', '/portfolio.html', '/services.html', '/resume.html', '/contact.html'];
const widths = [375, 390, 768, 1024, 1440];

for (const url of pages) {
  for (const w of widths) {
    test(`${url} @ ${w}px`, async ({ page }) => {
      await page.setViewportSize({ width: w, height: 800 });
      await page.goto(url);
      const overflow = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        bodyScroll: document.body.scrollWidth,
      }));
      console.log(url, w, JSON.stringify(overflow));
      expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth + 1);
    });
  }
}
