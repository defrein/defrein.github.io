import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = new URL('./review/', import.meta.url);
await mkdir(root, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
for (const [name, width, height] of [['desktop', 1440, 1000], ['mobile', 390, 844], ['tablet', 768, 1024]]) {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('http://127.0.0.1:4322/wave/', { waitUntil: 'networkidle' });
  await page.evaluate(async () => {
    document.querySelectorAll('img').forEach(image => { image.loading = 'eager'; });
    await Promise.all([...document.images].map(image => image.decode().catch(() => {})));
    await document.fonts.ready;
  });
  const dimensions = await page.evaluate(() => ({ width: innerWidth, content: document.documentElement.scrollWidth, images: [...document.images].map(image => ({ loaded: image.complete && image.naturalWidth > 0, source: image.getAttribute('src') })) }));
  console.log(JSON.stringify({ name, ...dimensions, errors }));
  await page.screenshot({ path: fileURLToPath(new URL(`${name}.png`, root)), fullPage: true });
  await page.screenshot({ path: fileURLToPath(new URL(`${name}-hero.png`, root)), fullPage: false });
  if (name !== 'tablet') {
    await page.goto('http://127.0.0.1:4322/wave/projects/autonomous-robot-2024/', { waitUntil: 'networkidle' });
    await page.screenshot({ path: fileURLToPath(new URL(`detail-${name}.png`, root)), fullPage: true });
  }
  await page.close();
}
await browser.close();
