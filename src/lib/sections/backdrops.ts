import type { ImageMetadata } from 'astro';
import cleaningTraining from '../../assets/backdrops/pelatihan-cleaning-service.jpg';
import hydrantTraining from '../../assets/backdrops/pelatihan-hidran.jpg';
import physicalTraining from '../../assets/backdrops/pembinaan-fisik.jpg';
import { responsiveImage, type ResponsiveImage } from '../image';

/**
 * Foto latar per section (hasil scripts/generate-backdrops.mjs). Ganti foto sebuah section di sini;
 * hapus barisnya untuk mengembalikan section itu ke latar polos.
 */
const backdrops = {
  stats: hydrantTraining,
  vision: physicalTraining,
  operations: cleaningTraining,
} satisfies Record<string, ImageMetadata>;

export type BackdropKey = keyof typeof backdrops;

/** Foto latar selebar layar; `alt` kosong karena murni dekoratif. */
export const loadBackdrop = (key: BackdropKey): Promise<ResponsiveImage> =>
  responsiveImage(backdrops[key], '', '100vw', [768, 1280, 1920]);
