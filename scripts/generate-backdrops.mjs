// Membuat latar foto section (src/assets/backdrops/) dari foto dokumentasi.
// Jalankan: npm run backdrops. Lihat docs/CONTENT_GUIDE.md ("Latar foto section").
//
// Foto tetap berwarna dan tajam; hanya dipotong ke 16:9, kontrasnya diratakan, saturasinya sedikit
// diredam agar menyatu dengan palet brand, lalu dipertajam tipis karena sumbernya kecil (foto HP).
// Kegelapan & rona warna diatur CSS (PhotoBackdrop) supaya teks di atasnya tetap kontras AA.
import sharp from 'sharp';

/** Nama file keluaran → foto sumber. */
const backdrops = {
  'pembinaan-fisik': 'src/assets/gallery/pembinaan-fisik.jpg',
  'pelatihan-cleaning-service': 'src/assets/gallery/pelatihan-cleaning-service.jpg',
};

for (const [name, source] of Object.entries(backdrops)) {
  await sharp(source)
    .resize(1920, 1080, { fit: 'cover', position: 'attention' })
    .normalise()
    .modulate({ saturation: 0.85 })
    .sharpen({ sigma: 0.8 })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(`src/assets/backdrops/${name}.jpg`);
}

console.log(`OK: ${Object.keys(backdrops).length} latar foto`);
