import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { createSiteServer } from './preview-site.mjs';
import { resumeData } from '../portfolio/src/lib/data/resume.js';

const { chromium, expect } = createRequire(new URL('../wave/package.json', import.meta.url))('@playwright/test');
const output = fileURLToPath(new URL('../wave/.impeccable/review/root-migration/', import.meta.url));
await mkdir(output, { recursive: true });
const server = createSiteServer();
await new Promise(done => server.listen(0, '127.0.0.1', done));
const origin = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--use-fake-device-for-media-stream', '--use-fake-ui-for-media-stream'] });
const results = [];
try {
  for (const [name, width] of [['desktop', 1440], ['mobile', 390]]) {
    const context = await browser.newContext({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
    const errors = [];
    context.on('page', page => {
      page.on('pageerror', error => errors.push(error.message));
      page.on('response', response => {
        if (response.url().startsWith(origin) && response.status() >= 400 && !response.url().endsWith('/favicon.ico')) errors.push(`${response.status()}: ${response.url()}`);
      });
    });
    const page = await context.newPage();
    await page.goto(`${origin}/`);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('possibility.');
    await expect(page.getByRole('button', { name: 'All work', exact: true })).toBeEnabled();
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: `${output}${name}-wave.png`, fullPage: false });
    if (width < 701) await page.getByRole('button', { name: 'Open navigation' }).click();
    await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Tools', exact: true }).click();
    await expect(page).toHaveURL(`${origin}/tools/`);
    await page.addStyleTag({ content: '.site-header { position: static !important; }' });
    const archive = page.getByRole('region', { name: 'Portfolio Archive', exact: true });
    await expect(archive.getByRole('link')).toHaveCount(4);
    await archive.screenshot({ path: `${output}${name}-archive.png` });
    const popupPromise = page.waitForEvent('popup');
    await archive.getByRole('link', { name: 'Portfolio v4', exact: true }).click();
    const legacy = await popupPromise;
    await legacy.waitForLoadState();
    await expect(legacy).toHaveURL(`${origin}/portfolio/`);
    await expect(legacy).toHaveTitle(/Portfolio v4/);
    await expect(legacy.locator('#hero')).toBeVisible();
    await legacy.evaluate(() => document.fonts.ready);
    await legacy.screenshot({ path: `${output}${name}-v4.png`, fullPage: false, animations: 'disabled' });
    await expect(legacy.locator('#projects img')).toHaveCount(resumeData.featuredProjects.length);
    await legacy.getByRole('button', { name: 'AI/ML', exact: true }).click();
    await expect(legacy.locator('#projects img')).toHaveCount(resumeData.featuredProjects.filter(project => project.category === 'ai').length);
    const photo = await context.newPage();
    await photo.goto(`${origin}/photobooth/?from=tools#camera`);
    await expect(photo).toHaveURL(`${origin}/portfolio/photobooth/?from=tools#camera`);
    await expect(photo.getByRole('heading', { name: 'Photobooth', exact: true })).toBeVisible();
    await expect(photo.locator('video')).toBeVisible();
    await expect.poll(() => photo.locator('video').evaluate(video => video.readyState)).toBeGreaterThanOrEqual(2);
    await photo.evaluate(() => document.fonts.ready);
    await photo.screenshot({ path: `${output}${name}-photobooth.png`, fullPage: false });
    expect(errors).toEqual([]);
    results.push({ name, root: new URL(page.url()).pathname, legacy: new URL(legacy.url()).pathname, photobooth: new URL(photo.url()).pathname, archiveEntries: 4, errors });
    await context.close();
  }
  await writeFile(`${output}browser-results.json`, JSON.stringify(results, null, 2));
  console.log('PASS: desktop/mobile root navigation, Portfolio v4 new-tab hydration/filtering, and Photobooth compatibility URL.');
} finally {
  await browser.close();
  await new Promise(done => server.close(done));
}
