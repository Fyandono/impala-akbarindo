import { defineCollection, reference } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** Teks tampil wajib diisi. */
const text = z.string().min(1);

const management = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/management' }),
  schema: ({ image }) =>
    z.object({
      name: z.string().min(1),
      group: z.enum(['commissioner', 'director', 'manager', 'division', 'staff']),
      position: text,
      /** Opsional; bila kosong kartu tidak menampilkan tombol "Lihat profil". */
      bio: text.optional(),
      photo: image(),
      order: z.number().int(),
    }),
});

const business = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/business' }),
  schema: ({ image }) =>
    z.object({
      title: text,
      summary: text,
      description: text,
      image: image(),
      imageAlt: text,
      order: z.number().int(),
    }),
});

const values = defineCollection({
  loader: file('src/content/values.yaml'),
  schema: z.object({ title: text, description: text, order: z.number().int() }),
});

/** Standar kerja per lini layanan: tujuan + rutinitas pengawasan/pelatihan. */
const operations = defineCollection({
  loader: file('src/content/operations.yaml'),
  schema: z.object({
    title: text,
    goals: z.array(text).min(1),
    routines: z.array(z.object({ frequency: text, description: text })).min(1),
    order: z.number().int(),
  }),
});

/**
 * Pengalaman kontrak. `client` = id di clients.yaml (nama & logo); `value` = nilai kontrak dalam
 * rupiah (angka bulat, tampil hanya bila `site.showContractValues`).
 */
const projects = defineCollection({
  loader: file('src/content/projects.yaml'),
  schema: z.object({
    client: reference('clients'),
    service: text,
    value: z.number().int().positive(),
    order: z.number().int(),
  }),
});

/**
 * Legalitas & sertifikasi. `code` mis. "ISO 9001:2015"; `number` = nomor dokumen/sertifikat;
 * `preview` = pindaian dokumen (gambar di src/assets/legal/) untuk thumbnail & pratinjau;
 * `file` = berkas PDF aslinya di public/dokumen/. Semua opsional.
 */
const credentials = defineCollection({
  loader: file('src/content/credentials.yaml'),
  schema: ({ image }) =>
    z.object({
      group: z.enum(['certification', 'permit']),
      code: z.string().min(1).optional(),
      number: text.optional(),
      preview: image().optional(),
      file: z
        .string()
        .regex(/^\/dokumen\/[a-z0-9-]+\.pdf$/)
        .optional(),
      title: text,
      description: text,
      order: z.number().int(),
    }),
});

/** Klien (nama + logo opsional di src/assets/clients/), dirujuk oleh `projects`. */
const clients = defineCollection({
  loader: file('src/content/clients.yaml'),
  schema: ({ image }) =>
    z.object({
      name: text,
      logo: image().optional(),
      order: z.number().int(),
    }),
});

/** Foto dokumentasi. Taruh file gambar di src/assets/gallery/ lalu daftarkan di gallery.yaml. */
const gallery = defineCollection({
  loader: file('src/content/gallery.yaml'),
  schema: ({ image }) =>
    z.object({
      image: image(),
      caption: text,
      order: z.number().int(),
    }),
});

/** Halaman teks (legal, tata kelola, keberlanjutan). Path: pages/<slug>.md */
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    updatedAt: z.coerce.date(),
  }),
});

/** Berita. Path: news/<slug>.md */
const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().min(1),
      description: z.string().min(1),
      date: z.coerce.date(),
      cover: image(),
      coverAlt: z.string().min(1),
      draft: z.boolean().default(false),
    }),
});

export const collections = {
  management,
  business,
  values,
  operations,
  projects,
  clients,
  credentials,
  gallery,
  pages,
  news,
};
