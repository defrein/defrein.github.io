import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const captureDir = new URL('./review/', import.meta.url);
await mkdir(captureDir, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
for (const [name, width] of [['desktop', 1440], ['mobile', 390]]) {
  const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
  await page.goto('http://127.0.0.1:4322/wave/', { waitUntil: 'networkidle' });
  const result = await page.evaluate(async () => {
    const logos = [...document.querySelectorAll('.wordmark img, .footer-brand img')];
    await Promise.all(logos.map(image => image.decode()));
    const colorCheck = async (source) => {
      const image = new Image();
      image.src = source;
      await image.decode();
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(image, 0, 0, 256, 256);
      const pixels = ctx.getImageData(0, 0, 256, 256).data;
      let visible = 0;
      let nonBlack = 0;
      for (let i = 0; i < pixels.length; i += 4) {
        if (pixels[i + 3]) {
          visible++;
          if (pixels[i] || pixels[i + 1] || pixels[i + 2]) nonBlack++;
        }
      }
      return { visible, nonBlack };
    };
    return {
      logos: logos.length,
      widths: logos.map(image => Math.round(image.getBoundingClientRect().width)),
      logoColor: await colorCheck(logos[0].src),
      faviconColor: await colorCheck(document.querySelector('link[rel="icon"]').href),
      overflow: document.documentElement.scrollWidth > innerWidth,
    };
  });
  console.log(JSON.stringify({ name, ...result }));
  if (result.logos !== 2 || !result.logoColor.visible || result.logoColor.nonBlack || !result.faviconColor.visible || result.faviconColor.nonBlack || result.overflow) throw new Error('Identity asset verification failed');
  await page.screenshot({ path: fileURLToPath(new URL(`identity-${name}.png`, captureDir)) });
  await page.locator('footer').screenshot({ path: fileURLToPath(new URL(`identity-footer-${name}.png`, captureDir)) });
  await page.close();
}
await browser.close();
