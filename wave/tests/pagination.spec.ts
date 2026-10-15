import { test, expect } from '@playwright/test';

test('project pagination changes page, restores history, and resets when filtered', async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/wave/');
  const size = testInfo.project.name === 'mobile' ? 5 : 6;
  const pager = page.getByRole('navigation', { name: 'Project pagination' });
  await expect(page.locator('.project-grid article')).toHaveCount(size);
  await expect(pager.getByRole('button', { name: 'Previous project page' })).toBeDisabled();
  await pager.getByRole('button', { name: 'Next project page' }).click();
  await expect(page).toHaveURL('/wave/?projectPage=2#work');
  await expect(page.locator('.project-grid article')).toHaveCount(7 - size);
  await expect(page.getByRole('heading', { name: 'Building Condition Analysis', exact: true })).toBeVisible();
  await expect(pager.getByRole('button', { name: 'Next project page' })).toBeDisabled();
  await page.reload();
  await expect(page.locator('.project-grid article')).toHaveCount(7 - size);
  await pager.getByRole('button', { name: 'Previous project page' }).click();
  await expect(page.locator('.project-grid article')).toHaveCount(size);
  await page.goBack();
  await expect(page.locator('.project-grid article')).toHaveCount(7 - size);
  await page.getByRole('group', { name: 'Filter projects by discipline' }).getByRole('button', { name: 'Robotics & IoT' }).click();
  await expect(page.locator('.project-grid article')).toHaveCount(2);
  await expect(pager.getByRole('button', { name: 'Project page 1', exact: true })).toHaveAttribute('aria-current', 'page');
  await expect(page).toHaveURL('/wave/?discipline=robotics#work');
});

test('project layout and page sizes adapt between desktop, tablet, and mobile', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/wave/');
  const cards = page.locator('.project-grid article');
  const columns = () => page.locator('.project-grid').evaluate(el => getComputedStyle(el).gridTemplateColumns.split(' ').length);
  await expect(cards).toHaveCount(6);
  expect(await columns()).toBe(3);
  await page.setViewportSize({ width: 768, height: 1024 });
  await expect(cards).toHaveCount(6);
  expect(await columns()).toBe(2);
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(cards).toHaveCount(5);
  expect(await columns()).toBe(1);
  await page.getByRole('button', { name: 'Project page 2', exact: true }).click();
  await expect(cards).toHaveCount(2);
  await page.setViewportSize({ width: 1440, height: 1000 });
  await expect(cards).toHaveCount(6);
  await expect(page.getByRole('button', { name: 'Project page 1', exact: true })).toHaveAttribute('aria-current', 'page');
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
});

test('invalid project page values are clamped without empty results', async ({ page }) => {
  await page.goto('/wave/?projectPage=999#work');
  await expect(page.getByRole('button', { name: 'Project page 2', exact: true })).toHaveAttribute('aria-current', 'page');
  await expect(page.getByRole('heading', { name: 'Building Condition Analysis', exact: true })).toBeVisible();
  await page.goto('/wave/?projectPage=invalid#work');
  await expect(page.getByRole('button', { name: 'Project page 1', exact: true })).toHaveAttribute('aria-current', 'page');
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });
  test('all Markdown project links and their content remain available', async ({ page }) => {
    await page.goto('/wave/');
    await expect(page.locator('.project-grid article')).toHaveCount(7);
    await page.getByRole('heading', { name: 'Building Condition Analysis', exact: true }).getByRole('link').click();
    await expect(page.getByRole('heading', { name: 'The work', exact: true })).toBeVisible();
    await expect(page.locator('.story-copy')).toContainText('Organized information management for public facilities.');
  });
});
