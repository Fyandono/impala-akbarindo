import { cx } from '../cx';
import type { ResponsiveImage } from '../types';

export type PhotoBackdropProps = {
  /** Foto berwarna dari src/assets/backdrops/ (scripts/generate-backdrops.mjs); `alt` kosong. */
  image: ResponsiveImage;
  /** `dark` = foto di bawah gradasi arang di latar `primary-950`; `light` = foto samar di latar terang. */
  tone?: 'dark' | 'light';
};

/**
 * Foto dokumentasi sebagai latar section, murni dekoratif. Section gelap: foto berwarna digradasi
 * arang ke arah teks plus rona merah brand; section terang: foto samar yang memudar ke putih.
 * Letakkan sebagai anak pertama section yang `relative isolate overflow-hidden`
 * (`backdropHostClass`). Kegelapan lapisan dijaga agar teks di atasnya tetap kontras AA.
 */
export default function PhotoBackdrop({ image, tone = 'dark' }: PhotoBackdropProps) {
  const dark = tone === 'dark';
  return (
    <div className="pointer-events-none absolute inset-0 -z-20" aria-hidden="true">
      <img
        {...image}
        loading="lazy"
        decoding="async"
        className={cx('size-full object-cover', !dark && 'backdrop-fade-y opacity-15')}
      />
      {dark && (
        <>
          <div className="absolute inset-0 bg-linear-to-r from-primary-950/90 via-primary-950/80 to-primary-950/70" />
          <div className="absolute inset-0 bg-linear-to-tl from-accent-700/20 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-linear-to-b from-primary-950 via-transparent to-primary-950" />
        </>
      )}
    </div>
  );
}
