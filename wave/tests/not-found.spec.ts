import { test, expect } from '@playwright/test';

test('missing URLs serve the custom 404 with working recovery links', async ({ page, request }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  const response = await page.goto('/wave/projects/missing-project/deep-link/');
  expect(response?.status()).toBe(404);
  await expect(page).toHaveTitle('404 — Page not found — Wahni Adnani');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Page not found.');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex');
  const recovery = page.getByRole('navigation', { name: 'Keep exploring.' });
  const links = recovery.getByRole('link');
  expect(await links.evaluateAll(items => items.map(item => item.getAttribute('href')))).toEqual(['/wave/#work', '/wave/blog/', '/wave/tools/']);
  for (const path of ['/wave/', '/wave/blog/', '/wave/tools/']) expect((await request.get(path)).status()).toBe(200);
  await page.getByRole('link', { name: 'Back to home', exact: true }).focus();
  expect(await page.getByRole('link', { name: 'Back to home', exact: true }).evaluate(link => getComputedStyle(link).outlineStyle)).toBe('solid');
  await page.keyboard.press('Tab');
  await expect(links.first()).toBeFocused();
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
  await page.getByRole('link', { name: 'Back to home', exact: true }).click();
  await expect(page).toHaveURL('/wave/');
  await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
  expect(errors).toEqual([]);
});

test('404 recovery remains available without JavaScript', async ({ browser }, testInfo) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: testInfo.project.use.viewport });
  const page = await context.newPage();
  try {
    const direct = await page.goto(`${testInfo.project.use.baseURL}/wave/404.html`);
    expect(direct?.status()).toBe(200);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    const response = await page.goto(`${testInfo.project.use.baseURL}/wave/this-page-does-not-exist/`);
    expect(response?.status()).toBe(404);
    await page.getByRole('navigation', { name: 'Keep exploring.' }).getByRole('link', { name: /Blog/ }).click();
    await expect(page).toHaveURL(`${testInfo.project.use.baseURL}/wave/blog/`);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  } finally {
    await context.close();
  }
});
