import { test, expect } from '@playwright/test';

test('renders the portfolio without missing assets or browser errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  await page.goto('/wave/');
  await expect(page).toHaveTitle(/Wahni Adnani/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('possibility.');
  await expect(page.locator('.project-grid article')).toHaveCount(7);
  await page.locator('img').evaluateAll(images => images.forEach(image => { (image as HTMLImageElement).loading = 'eager'; }));
  await expect.poll(() => page.locator('img').evaluateAll(images => (images as HTMLImageElement[]).every(image => image.complete && image.naturalWidth > 0))).toBe(true);
  await expect(page.locator('.project-grid img')).toHaveCount(7);
  const broken = await page.locator('img').evaluateAll(images => (images as HTMLImageElement[]).filter(image => !image.complete || image.naturalWidth === 0).map(image => image.getAttribute('src')));
  expect(broken).toEqual([]);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  expect(overflow).toBe(false);
  expect(errors).toEqual([]);
});

test('filters real projects and resets the gallery', async ({ page }) => {
  await page.goto('/wave/');
  const filters = page.getByRole('group', { name: 'Filter projects by discipline' });
  await filters.getByRole('button', { name: 'Robotics & IoT' }).click();
  await expect(page.locator('.project-grid article')).toHaveCount(2);
  await expect(page.getByRole('status').filter({ hasText: '2 projects' })).toBeVisible();
  await filters.getByRole('button', { name: 'AI & Machine Learning' }).click();
  await expect(page.locator('.project-grid article')).toHaveCount(3);
  await filters.getByRole('button', { name: 'Web & Software' }).click();
  await expect(page.locator('.project-grid article')).toHaveCount(5);
  await filters.getByRole('button', { name: 'All work', exact: true }).click();
  await expect(page.locator('.project-grid article')).toHaveCount(7);
});

test('discipline shortcut selects the gallery and project details are addressable', async ({ page }) => {
  await page.goto('/wave/');
  await page.locator('.disciplines').getByRole('link', { name: 'Robotics & IoT' }).click();
  await expect(page.locator('.project-grid article')).toHaveCount(2);
  await page.getByRole('heading', { name: 'Autonomous Robot', exact: true }).getByRole('link').click();
  await expect(page).toHaveURL('/wave/projects/autonomous-robot-2024/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Autonomous Robot');
  await expect(page.getByRole('heading', { name: 'The work' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)).toBe(false);
  await page.getByRole('link', { name: 'Back to all work' }).click();
  await expect(page).toHaveURL('/wave/#work');
});

test('CV and every project route resolve', async ({ request }) => {
  const slugs = ['jats-editor', 'autonomous-robot-2024', 'rescue-robot-2023', 'digital-printing', 'fuzzy-production', 'payment-management', 'building-condition'];
  for (const slug of slugs) {
    const response = await request.get(`/wave/projects/${slug}/`);
    expect(response.status(), slug).toBe(200);
  }
  const cv = await request.get('/wave/documents/WAHNI_ADNANI_NOVEMBER_2025.pdf');
  expect(cv.status()).toBe(200);
  expect(cv.headers()['content-type']).toContain('application/pdf');
});

test('navigation and email copy work', async ({ page, context }, testInfo) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/wave/');
  if (testInfo.project.name === 'mobile') {
    await page.getByRole('button', { name: 'Open navigation' }).click();
    await expect(page.getByRole('button', { name: 'Close navigation' })).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('Escape');
    await expect(page.getByRole('button', { name: 'Open navigation' })).toBeFocused();
    await page.getByRole('button', { name: 'Open navigation' }).click();
  }
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: "Let's talk" }).click();
  await expect(page).toHaveURL('/wave/#contact');
  await page.getByRole('button', { name: 'Copy email' }).click();
  await expect(page.getByRole('button', { name: 'Copied!' })).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('adnaniwahni@gmail.com');
});
