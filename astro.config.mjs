// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';
import { loadEnv } from 'vite';

// Domain production. Dipakai untuk canonical, sitemap, dan Open Graph.
// Urutan: variabel environment (CI) → file .env lokal → domain bawaan Firebase Hosting.
const env = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');
const SITE_URL = process.env.SITE_URL || env.SITE_URL || 'https://impala-akbarindo.web.app';

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'never',
  build: { format: 'file' },
  // Shiki memakai inline style yang bertentangan dengan CSP; situs ini tidak menampilkan blok kode.
  markdown: { syntaxHighlight: false },
  integrations: [sitemap({ filter: (page) => !page.endsWith('/404') }), react()],
  security: {
    // Astro menambahkan hash untuk setiap script & style yang dirender ke <meta http-equiv="Content-Security-Policy">.
    // Header yang tidak didukung di <meta> (mis. frame-ancestors) diatur di firebase.json.
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data: https://*.google-analytics.com https://*.googletagmanager.com",
        "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com",
        "font-src 'self'",
        // Peta kantor di section Kontak (iframe Google Maps).
        'frame-src https://www.google.com',
        "base-uri 'self'",
        // Form kontak hanya membuka aplikasi email (mailto:), tanpa server.
        'form-action mailto:',
        "object-src 'none'",
        'upgrade-insecure-requests',
      ],
      scriptDirective: {
        resources: ["'self'", 'https://www.googletagmanager.com'],
      },
    },
  },
  vite: {
    plugins: [tailwindcss()],
    // Jangan inline aset kecil sebagai data: URI (melanggar CSP font-src 'self').
    build: { assetsInlineLimit: 0 },
  },
});
