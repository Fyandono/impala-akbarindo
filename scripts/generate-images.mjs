// Membuat apple-touch-icon.png dan og-default.jpg dari logo. Jalankan: node scripts/generate-images.mjs
// Monogram diambil dari public/favicon.svg.
import { readFileSync } from 'node:fs';
import sharp from 'sharp';

const shortName = process.argv[2] ?? 'PT Impala Akbarindo';
const tagline = process.argv[3] ?? 'Jasa Outsourcing Profesional · Bandung';
const mark = readFileSync('public/favicon.svg', 'utf8').match(/<path[^>]* d="([^"]+)"/)[1];

await sharp('public/favicon.svg', { density: 600 })
  .resize(180, 180)
  .png()
  .toFile('public/apple-touch-icon.png');

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#120D0E"/><stop offset="1" stop-color="#2B2324"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <path d="M860 0H1200V630H1010Z" fill="#9D191E" fill-opacity="0.55"/>
  <path d="M800 0H840L990 630H950Z" fill="#9D191E" fill-opacity="0.35"/>
  <g transform="translate(96 205) scale(1.6)"><path fill="#E2454C" fill-rule="evenodd" d="${mark}"/></g>
  <text x="330" y="305" font-family="Helvetica, Arial, sans-serif" font-size="60" font-weight="700" fill="#FFFFFF">${shortName}</text>
  <text x="332" y="365" font-family="Helvetica, Arial, sans-serif" font-size="28" fill="#E0D9D9">${tagline}</text>
</svg>`;

await sharp(Buffer.from(og)).jpeg({ quality: 85 }).toFile('src/assets/og-default.jpg');
console.log('OK: public/apple-touch-icon.png, src/assets/og-default.jpg');
