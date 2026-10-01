import { expect, test } from '@playwright/test';

test('setiap link menu punya section tujuan di halaman utama', async ({ page }) => {
  await page.goto('/');
  const ids = await page
    .locator('header [data-section-link]')
    .evaluateAll((links) => links.map((a) => (a as HTMLElement).dataset.sectionLink!));
  expect(ids.length).toBeGreaterThan(0);
  for (const id of ids) await expect(page.locator(`#${id}`)).toHaveCount(1);
});

test('menu menggulir ke section dan menandainya aktif', async ({ page, isMobile }) => {
  test.skip(isMobile, 'Menu desktop');
  await page.goto('/');
  const link = page.locator('header nav a[data-section-link="contact"]');
  await link.click();
  await expect(page).toHaveURL(/\/#contact$/);
  await expect(page.locator('#contact')).toBeInViewport();
  await expect(link).toHaveAttribute('aria-current', 'true');
});

test('menu mobile bisa dibuka dan ditutup dengan keyboard', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'Menu mobile hanya tampil di layar kecil');
  await page.goto('/');
  const openButton = page.locator('[data-mobile-menu-open]');
  await openButton.click();
  const dialog = page.locator('[data-mobile-menu]');
  await expect(dialog).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(openButton).toBeFocused();
});

test('skip link memindahkan fokus ke konten utama', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: 'Lompat ke konten utama' });
  await expect(skip).toBeFocused();
  await skip.press('Enter');
  await expect(page).toHaveURL(/#main$/);
});

test('konten tetap tampil saat animasi dimatikan (reduced motion)', async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto('/');
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  const hidden = await page
    .locator('[data-reveal]')
    .evaluateAll((els) => els.filter((el) => getComputedStyle(el).opacity === '0').length);
  expect(hidden).toBe(0);
  await context.close();
});

test('kontak: nomor seluler ke WhatsApp, form berlabel dan memvalidasi isian wajib', async ({
  page,
}) => {
  await page.goto('/#contact');
  await expect(page.locator('#contact a[href^="https://wa.me/62"]')).toHaveCount(1);

  const form = page.locator('[data-contact-form]');
  await expect(form).toHaveAttribute('data-email', 'kantor.impala@gmail.com');
  await expect(form.getByLabel(/Nama lengkap/)).toBeVisible();
  await expect(form.getByLabel(/Instansi/)).toBeVisible();
  await expect(form.getByLabel(/Layanan yang dibutuhkan/).locator('option')).not.toHaveCount(0);

  // Isian wajib kosong → browser menahan pengiriman, halaman tidak berpindah.
  await form.getByRole('button', { name: /Kirim via email/ }).click();
  await expect(form.getByLabel(/Nama lengkap/)).toBeFocused();
  await expect(page).toHaveURL(/#contact$/);
});

test('legalitas: sertifikat bisa dipratinjau di dialog dan menautkan PDF-nya', async ({ page }) => {
  await page.goto('/#legality');
  const link = page.getByRole('link', { name: /Lihat dokumen\s*Sistem Manajemen Mutu/ });
  await expect(link).toHaveAttribute('href', '/dokumen/iso-9001-2015.pdf');

  await link.click();
  const dialog = page.getByRole('dialog', { name: /ISO 9001:2015/ });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('img', { name: /ISO 9001:2015/ })).toBeVisible();
  await expect(dialog.getByRole('link', { name: /Buka PDF/ })).toHaveAttribute(
    'href',
    '/dokumen/iso-9001-2015.pdf',
  );

  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(link).toBeFocused();
});
