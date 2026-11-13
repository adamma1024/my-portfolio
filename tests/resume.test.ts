import { test, expect } from '@playwright/test';

const screenResume = '.resume-page > .resume-a4';

test('resume defaults to English', async ({ page }) => {
  await page.goto('/resume');
  const resume = page.locator(screenResume);
  await expect(resume).toContainText('EXPERIENCE');
  await expect(resume).toContainText('Lin Ma');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});

test('resume renders Chinese via ?lang=zh', async ({ page }) => {
  await page.goto('/resume?lang=zh');
  const resume = page.locator(screenResume);
  await expect(resume).toContainText('马林');
  await expect(resume).toContainText('工作经历');
  await expect(resume).toContainText('教育背景');
  await expect(resume).toContainText('移动端与 Web 工程负责人');
  await expect(resume).not.toContainText('EXPERIENCE');
  await expect(page.locator('html')).toHaveAttribute('lang', 'zh-CN');
});

test('print copy follows the selected language', async ({ page }) => {
  await page.goto('/resume?lang=zh');
  await expect(page.locator('.resume-print-only')).toContainText('工作经历');
});

test('language toggle switches resume and keeps URL in sync', async ({ page }) => {
  await page.goto('/resume');
  const resume = page.locator(screenResume);
  await page.getByRole('button', { name: '中文' }).click();
  await expect(resume).toContainText('工作经历');
  await expect(page).toHaveURL(/[?&]lang=zh/);
  await page.getByRole('button', { name: 'EN' }).click();
  await expect(resume).toContainText('EXPERIENCE');
  await expect(page).not.toHaveURL(/lang=zh/);
});
