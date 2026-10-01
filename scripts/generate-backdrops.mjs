// Membuat latar foto section (src/assets/backdrops/) dari foto dokumentasi, plus tekstur grain.
// Jalankan: npm run backdrops. Lihat docs/CONTENT_GUIDE.md ("Latar foto section").
//
// Foto dokumentasi umumnya dari kamera HP dan beresolusi rendah, jadi tidak ditampilkan apa adanya:
// dijadikan hitam-putih, kontrasnya diratakan, lalu diblur tipis agar terbaca sebagai tekstur.
// Warna & kegelapan diatur CSS (PhotoBackdrop). Sorotan diredam (× 0,7) supaya teks di atasnya
// tetap memenuhi kontras AA pada bagian foto yang paling terang.
import sharp from 'sharp';

/** Nama file keluaran → foto sumber. */
const backdrops = {
  'pembinaan-fisik': 'src/assets/gallery/pembinaan-fisik.jpg',
  'pelatihan-cleaning-service': 'src/assets/gallery/pelatihan-cleaning-service.jpg',
  'pelatihan-hidran': 'src/assets/gallery/pelatihan-hidran.jpg',
};

for (const [name, source] of Object.entries(backdrops)) {
  await sharp(source)
    .resize(1920, 1080, { fit: 'cover', position: 'attention' })
    .grayscale()
    .normalise()
    .blur(2)
    .linear(0.7, 0)
    .jpeg({ quality: 82 })
    .toFile(`src/assets/backdrops/${name}.jpg`);
}

// Butiran film: noise abu-abu netral, di-tile dan dicampur lewat mix-blend (utilitas `grain`).
await sharp({
  create: {
    width: 128,
    height: 128,
    channels: 3,
    background: { r: 128, g: 128, b: 128 },
    noise: { type: 'gaussian', mean: 128, sigma: 36 },
  },
})
  .grayscale()
  .png({ compressionLevel: 9 })
  .toFile('src/assets/textures/grain.png');

console.log(`OK: ${Object.keys(backdrops).length} latar foto, src/assets/textures/grain.png`);
