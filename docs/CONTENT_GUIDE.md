# Panduan Konten

Semua konten ada di repo. Alur umum: **edit file → commit ke branch → buka Pull Request → cek URL preview → merge ke `main`** (otomatis live).

Jalankan `npm run dev` untuk melihat perubahan secara langsung. Jika ada field yang salah/kosong, `npm run build` akan gagal dengan pesan yang menunjuk file bermasalah.

## Di mana mengubah apa

| Yang ingin diubah                                                              | File                                                       |
| ------------------------------------------------------------------------------ | ---------------------------------------------------------- |
| Nama perusahaan, alamat, telepon, email, Instagram, peta, angka kunci beranda  | `src/config/site.ts`                                       |
| Menyalakan/mematikan section Dokumentasi, Tata Kelola, Keberlanjutan, Berita   | `src/config/site.ts` → `features`                          |
| Teks section beranda (hero, profil, komitmen, misi, judul section), label menu | `src/i18n/id.json`                                         |
| Klien & logo (daftar kontrak + "Juga melayani")                                | `src/content/clients.yaml` + logo di `src/assets/clients/` |
| Struktur organisasi (komisaris, direksi, manajer, kepala bidang, staf)         | `src/content/management/*.yaml`                            |
| Lini layanan                                                                   | `src/content/business/*.yaml`                              |
| Keunggulan ("Mengapa memilih kami")                                            | `src/content/values.yaml`                                  |
| Standar kerja (tujuan & rencana kerja per layanan)                             | `src/content/operations.yaml`                              |
| Pengalaman / kontrak (nilai kontrak tampil bila `showContractValues: true`)    | `src/content/projects.yaml`, `src/config/site.ts`          |
| Legalitas & sertifikasi                                                        | `src/content/credentials.yaml`                             |
| Foto dokumentasi                                                               | `src/assets/gallery/` + `src/content/gallery.yaml`         |
| Kebijakan Privasi, Cookie, Syarat                                              | `src/content/pages/{id,en}/*.md`                           |

## Foto dokumentasi (section Dokumentasi)

1. Taruh foto di **`src/assets/gallery/`** (JPG/PNG/WebP, lebar ≥ 1600 px, rasio 3:2 atau 4:3 — tampil terpotong 3:2).
2. Buka `src/content/gallery.yaml`, ubah `image` pada entri yang ada (mis. `../assets/gallery/apel-rutin.jpg`) atau tambah entri baru dengan `caption` dan `order`.
3. Hapus `placeholder-*.svg` bila sudah tidak dipakai. Foto otomatis dikompres (WebP, beberapa ukuran) saat build.

Foto layanan (kartu di section Layanan) saat ini berupa ilustrasi di `src/assets/illustrations/`. Untuk memakai foto: taruh di `src/assets/services/` (rasio 4:5, lebar ≥ 1200 px), lalu ubah `image` di `src/content/business/*.yaml`, mis. `image: ../../assets/services/kebersihan.jpg`.

## Logo klien

Nama & logo klien ada di `src/content/clients.yaml`; logo di `src/assets/clients/` (PNG transparan atau SVG, tinggi ≥ 200 px), mis. `logo: ../assets/clients/bapenda.png`.

- Klien yang dirujuk kontrak di `src/content/projects.yaml` (`client: <id klien>`) tampil di daftar kontrak dengan logonya di kiri nama.
- Klien lain tampil sebagai teks di daftar "Juga melayani".

## Struktur one-page

Semua konten tampil di satu halaman (`/`) yang terbagi menjadi section; menu di header adalah anchor ke section tersebut (`/#about`). Daftar & urutan menu ada di `src/config/navigation.ts`; `id` tiap item harus sama dengan `id` section di `src/pages/index.astro`. Halaman terpisah hanya untuk Kebijakan Privasi, Cookie, dan Syarat Penggunaan.

Section Tata Kelola dan Keberlanjutan diambil dari `src/content/pages/{id,en}/governance.md` dan `sustainability.md`. Karena judul section sudah berupa `<h2>`, subjudul di dalam file tersebut memakai `###`.

## Bahasa

Situs hanya berbahasa Indonesia. Teks UI ada di `src/i18n/id.json`; teks konten langsung ditulis sebagai string biasa di file YAML/Markdown:

```yaml
position: Direktur Utama
```

## Menambah anggota struktur organisasi

1. Simpan foto di `src/assets/management/` (JPG/PNG, rasio 3:4, minimal 640×853 px).
2. Buat file `src/content/management/14-nama-direktur.yaml`:

```yaml
name: Nama Lengkap
group: director # commissioner | director | manager | division | staff
order: 5 # urutan tampil
position: Direktur Pemasaran
bio: Menjabat sejak 2025. ... # opsional
photo: ../../assets/management/nama-lengkap.jpg
```

Foto otomatis dikompres dan dibuat dalam beberapa ukuran (AVIF/WebP) saat build.

## Menambah lini layanan

Salin salah satu file di `src/content/business/`, ubah isinya; kartu otomatis muncul di section Layanan (urut berdasarkan `order`). `imageAlt` wajib diisi: jelaskan isi gambar untuk pengguna pembaca layar.

## Berita

1. Aktifkan `features.news: true` di `site.ts`.
2. Buat file `src/content/news/judul-berita.md`:

```markdown
---
title: Judul Berita
description: Ringkasan 1–2 kalimat.
date: 2026-10-01
cover: ../../assets/news/judul-berita.jpg
coverAlt: Deskripsi gambar
draft: false
---

Isi berita dalam Markdown (disimpan untuk arsip; situs one-page hanya menampilkan judul, tanggal, ringkasan, dan gambar).
```

Tiga berita terbaru tampil sebagai kartu di section Berita. `draft: true` menyembunyikan berita.

## Gambar

- Simpan di `src/assets/…` (bukan `public/`) agar dioptimasi otomatis.
- Gunakan foto berukuran wajar (lebar ≤ 2400 px). Hindari file > 2 MB.
- Setiap gambar informatif wajib punya teks alternatif.
