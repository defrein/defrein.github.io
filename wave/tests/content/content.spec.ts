import { test, expect } from '@playwright/test';

test('multi-image slider supports buttons, keyboard, native scrolling, and resize', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/wave/slider/');
  const slider = page.getByRole('region', { name: 'Test fixture images' });
  const viewport = slider.getByRole('group');
  await expect(slider.getByRole('status')).toHaveText('Image 1 of 2');
  await expect(slider.getByRole('button', { name: 'Previous project image' })).toBeDisabled();
  await slider.getByRole('button', { name: 'Next project image' }).click();
  await expect(slider.getByRole('status')).toHaveText('Image 2 of 2');
  await expect(slider.getByAltText('Second isolated test image')).toBeInViewport();
  await expect(slider.getByRole('button', { name: 'Next project image' })).toBeDisabled();
  await viewport.focus();
  await page.keyboard.press('Home');
  await expect(slider.getByRole('status')).toHaveText('Image 1 of 2');
  await page.keyboard.press('ArrowRight');
  await expect(slider.getByRole('status')).toHaveText('Image 2 of 2');
  await page.setViewportSize({ width: 768, height: 1024 });
  await expect(slider.getByAltText('Second isolated test image')).toBeInViewport();
  await viewport.evaluate(el => { el.scrollLeft = 0; });
  await expect(slider.getByRole('status')).toHaveText('Image 1 of 2');
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });
  test('blog pagination serves five articles per page with native links', async ({ page }) => {
    await page.goto('/wave/blog/');
    await expect(page.locator('.post-list article')).toHaveCount(5);
    const pager = page.getByRole('navigation', { name: 'Blog pagination' });
    await expect(pager.getByRole('link', { name: 'Blog page 1', exact: true })).toHaveAttribute('aria-current', 'page');
    await pager.getByRole('link', { name: 'Next blog page' }).click();
    await expect(page).toHaveURL('/wave/blog/page/2/');
    await expect(page.locator('.post-list article')).toHaveCount(1);
    await expect(page.getByRole('heading', { name: 'Test note 6', exact: true })).toBeVisible();
    await pager.getByRole('link', { name: 'Previous blog page' }).click();
    await expect(page).toHaveURL('/wave/blog/');
    await expect(page.locator('.post-list article')).toHaveCount(5);
  });
});
