import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Education' }).click();
  await expect(page.getByRole('banner')).toContainText('Education');
  await page.getByRole('link', { name: 'Open Source' }).click();
  await expect(page.locator('#organizations')).toContainText('Contributed Organizations');
  await page.getByRole('link', { name: 'Contact Me' }).click();
  await expect(page.locator('#root')).toContainText('See My Resume');
});

test('test2', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Home' }).click();
  await expect(page.locator('#greeting')).toContainText('A passionate individual who always thrives to utilize technologies to address realistic issues, such as Education, Personal Growth, Music and etc.');
})
