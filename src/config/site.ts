/**
 * Identitas & pengaturan perusahaan. Sumber: company profile PT Impala Akbarindo (docs/).
 * Lihat docs/BRANDING.md.
 */
export const site = {
  legalName: 'PT Impala Akbarindo',
  shortName: 'Impala Akbarindo',
  /** Tahun berdiri (opsional). Isi bila sudah dikonfirmasi agar tampil di hero & data terstruktur. */
  foundingYear: undefined as number | undefined,

  tagline: 'Mitra jasa outsourcing yang profesional dan terpercaya',

  contact: {
    address: {
      street: 'Jl. Setrasari Tengah No. 1-H, Sukarasa, Kec. Sukasari',
      city: 'Kota Bandung',
      region: 'Jawa Barat',
      postalCode: '40152',
      country: 'ID',
    },
    phone: '+62 22 8202 7114',
    /** Nomor seluler + nama narahubung. */
    mobile: { number: '+62 813 2121 2110', name: 'Agung Al Akbar' },
    email: 'kantor.impala@gmail.com',
    mapsUrl: 'https://maps.google.com/?cid=11560825878718990543',
    /** URL embed Google Maps (iframe). Domainnya harus ada di `frame-src` CSP (astro.config.mjs). */
    mapsEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.1149876997843!2d107.5893679!3d-6.8768245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e7c35d685915%3A0xa0704de2833048cf!2sPT%20IMPALA%20AKBARINDO!5e0!3m2!1sen!2sid!4v1790670972876!5m2!1sen!2sid',
  },

  social: [{ name: 'Instagram', url: 'https://www.instagram.com/impalaakbarindo/' }],

  /** Angka kunci di beranda. `value` berupa angka agar bisa dianimasikan. */
  stats: [
    { value: 5, label: 'Lini layanan outsourcing' },
    { value: 9, label: 'Kontrak instansi yang telah ditangani' },
    { value: 7, label: 'Dokumen legalitas & perizinan usaha' },
    { value: 3, label: 'Sertifikasi sistem manajemen ISO' },
  ] as { value: number; suffix?: string; label: string }[],

  /**
   * Tampilkan nilai kontrak (per kontrak + total) di section Pengalaman.
   * Data tetap tersimpan di src/content/projects.yaml; `false` = tidak ikut ter-publish.
   */
  showContractValues: false,

  /** Section opsional di halaman utama. Section nonaktif tidak dirender dan tidak tampil di navigasi. */
  features: {
    gallery: true,
    governance: false,
    sustainability: false,
    news: false,
  },
} as const;

export type FeatureKey = keyof typeof site.features;
