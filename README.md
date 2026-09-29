# Website PT Impala Akbarindo

Website company profile **one-page** statis berbahasa Indonesia **PT Impala Akbarindo** (jasa outsourcing, Bandung), dibangun dari template company profile: satu halaman panjang berisi section (Tentang, Layanan, Standar Kerja, Pengalaman, Manajemen, Legalitas, Dokumentasi, Kontak) dengan navbar anchor yang menandai section aktif. Halaman terpisah hanya untuk legal (privasi, cookie, syarat).
Dibangun dengan **Astro + TypeScript + Tailwind CSS v4**, di-hosting di **Firebase Hosting**.

Spesifikasi & keputusan arsitektur: [`SPEC.md`](SPEC.md).

## Prasyarat

- Node.js versi di `.nvmrc` (`nvm use`)
- npm
- Firebase CLI (hanya untuk deploy manual): `npm i -g firebase-tools`

## Mulai

```bash
npm install
cp .env.example .env      # opsional: isi PUBLIC_GA_MEASUREMENT_ID
npm run dev               # http://localhost:4321
```

## Perintah

| Perintah            | Fungsi                                                  |
| ------------------- | ------------------------------------------------------- |
| `npm run dev`       | Server pengembangan dengan hot reload                   |
| `npm run build`     | Build situs statis ke `dist/`                           |
| `npm run preview`   | Menyajikan `dist/` secara lokal                         |
| `npm run check`     | Typecheck (TypeScript + Astro + skema konten)           |
| `npm run lint`      | ESLint + cek format Prettier + cek design token         |
| `npm run format`    | Merapikan format semua file                             |
| `npm run test`      | Unit test (Vitest) lalu E2E (Playwright, butuh `dist/`) |
| `npm run test:unit` | Unit test saja (tanpa build)                            |
| `npm run test:ci`   | Build lalu tes                                          |
| `npm run images`    | Membuat ulang `apple-touch-icon.png` dan OG image       |

Pertama kali menjalankan tes: `npx playwright install chromium`.

## Struktur

```
src/
├── config/        site.ts (identitas, kontak, feature flags), navigation.ts
├── content/       konten: layanan, manajemen, standar kerja, kontrak, legalitas, galeri, halaman teks
├── i18n/          id.json (semua teks UI) + helper format tanggal/angka
├── components/    ui/, layout/, sections/, seo/
├── layouts/       BaseLayout, MarkdownPageLayout
├── lib/sections/  data tiap section (konten + i18n → props komponen)
├── pages/         index (one-page, hanya komposisi) + halaman legal + 404
├── scripts/       animasi, header, consent, analytics
└── styles/        global.css (design tokens)
tests/unit/        Vitest (logika murni)
tests/e2e/         Playwright + axe
docs/              panduan konten, branding, deploy, keamanan
```

## Dokumentasi

- [Panduan konten](docs/CONTENT_GUIDE.md) — mengubah teks, direksi, bisnis, berita
- [Branding klien baru](docs/BRANDING.md) — logo, warna, font
- [Deployment](docs/DEPLOYMENT.md) — Firebase, GitHub Actions, domain
- [Keamanan](docs/SECURITY.md) — header, CSP, dependency

# corporate-template

# impala-akbarindo
