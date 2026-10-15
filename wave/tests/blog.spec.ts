import { test, expect } from '@playwright/test';

const article = '/wave/blog/building-a-rubiks-cube/';
const title = 'Building a Rubik’s cube with Svelte and CSS';

test('blog navigation opens the Markdown article and its table of contents', async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/wave/');
  if (testInfo.project.name === 'mobile') {
    await page.getByRole('button', { name: 'Open navigation' }).click();
  }
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Blog', exact: true }).click();
  await expect(page).toHaveURL('/wave/blog/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Notes from');
  await expect(page.locator('.post-list > article')).toHaveCount(1);
  await page.getByRole('heading', { name: title }).getByRole('link').click();
  await expect(page).toHaveURL(article);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(title);
  await expect(page.locator('.prose pre')).toHaveCount(3);
  await expect(page.locator('.prose table')).toBeVisible();
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'article');
  await page.getByRole('navigation', { name: 'Article contents' }).getByRole('link', { name: 'Let six repetitions close the loop' }).click();
  await expect(page).toHaveURL(`${article}#let-six-repetitions-close-the-loop`);
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
  expect(await page.locator('.prose').evaluate(el => parseFloat(getComputedStyle(el).fontSize))).toBeGreaterThanOrEqual(16);
  await page.locator('.article-end').getByRole('link', { name: 'All articles' }).click();
  await expect(page).toHaveURL('/wave/blog/');
  expect(errors).toEqual([]);
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('article content and anchor navigation work', async ({ page }) => {
  const response = await page.goto(article);
  expect(response?.status()).toBe(200);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(title);
  await expect(page.locator('.prose')).toContainText('There is no hidden reset');
  await expect(page.locator('.prose pre')).toHaveCount(3);
  await page.getByRole('navigation', { name: 'Article contents' }).getByRole('link', { name: 'Start with the pieces' }).click();
  await expect(page).toHaveURL(`${article}#start-with-the-pieces`);
  });
});
