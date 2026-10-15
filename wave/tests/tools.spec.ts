import { test, expect } from '@playwright/test';

const destinations = [
  '/others/roulette-wheel/', '/others/NLM_viewer/', '/others/story/',
  '/others/jadwal/', '/photobooth/', '/v.1/', '/v.2/', '/v.3/',
];

test('Tools navigation opens the directory and retains the original destinations', async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/wave/');
  if (testInfo.project.name === 'mobile') await page.getByRole('button', { name: 'Open navigation' }).click();
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Tools', exact: true }).click();
  await expect(page).toHaveURL('/wave/tools/');
  await expect(page).toHaveTitle('Tools — Wahni Adnani');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Tools for');
  if (testInfo.project.name === 'mobile') {
    const toggle = page.getByRole('button', { name: 'Open navigation' });
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await toggle.click();
  }
  await expect(page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Tools', exact: true })).toHaveAttribute('aria-current', 'page');
  if (testInfo.project.name === 'mobile') await page.keyboard.press('Escape');
  const links = page.locator('.tools-grid a');
  await expect(links).toHaveCount(8);
  expect(await links.evaluateAll(items => items.map(item => item.getAttribute('href')))).toEqual(destinations);
  await expect(page.locator('.tools-grid img')).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'NLM Viewer', exact: true })).toHaveAttribute('href', '/others/NLM_viewer/');
  await links.first().focus();
  await expect(links.first()).toBeFocused();
  expect(await links.first().evaluate(link => getComputedStyle(link).outlineStyle)).toBe('solid');
  await page.keyboard.press('Tab');
  await expect(links.nth(1)).toBeFocused();

  const widths = testInfo.project.name === 'desktop' ? [1440, 1100, 768, 701] : [390, 320];
  for (const width of widths) {
    await page.setViewportSize({ width, height: 1000 });
    const columns = await page.locator('.tools-grid').evaluate(grid => getComputedStyle(grid).gridTemplateColumns.split(' ').length);
    expect(columns).toBe(width > 1100 ? 3 : width > 700 ? 2 : 1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), `overflow at ${width}px`).toBe(false);
  }
  expect(errors).toEqual([]);
});

test('Tools content and links remain usable without JavaScript', async ({ browser }, testInfo) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: testInfo.project.use.viewport });
  const page = await context.newPage();
  try {
    await page.goto(`${testInfo.project.use.baseURL}/wave/tools/`);
    await expect(page.locator('.tools-grid a')).toHaveCount(8);
    await expect(page.locator('.tools-grid p')).toHaveCount(8);
    expect(await page.locator('.tools-grid a').evaluateAll(items => items.map(item => item.getAttribute('href')))).toEqual(destinations);
    expect(await page.locator('.tools-grid p').first().evaluate(node => parseFloat(getComputedStyle(node).fontSize))).toBeGreaterThanOrEqual(16);
  } finally {
    await context.close();
  }
});
