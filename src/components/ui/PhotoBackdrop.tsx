import { cx } from '../cx';
import type { ResponsiveImage } from '../types';

export type PhotoBackdropProps = {
  /** Foto hitam-putih dari src/assets/backdrops/ (scripts/generate-backdrops.mjs); `alt` kosong. */
  image: ResponsiveImage;
  /** `dark` = foto redup di latar `primary-950`; `light` = foto sangat samar di latar terang. */
  tone?: 'dark' | 'light';
};

/**
 * Foto dokumentasi sebagai tekstur latar section: redup + butiran film, murni dekoratif.
 * Letakkan sebagai anak pertama section yang `relative isolate overflow-hidden`
 * (`backdropHostClass`). Kegelapan foto dijaga agar teks di atasnya tetap kontras AA.
 */
export default function PhotoBackdrop({ image, tone = 'dark' }: PhotoBackdropProps) {
  const dark = tone === 'dark';
  return (
    <div className="pointer-events-none absolute inset-0 -z-20" aria-hidden="true">
      <img
        {...image}
        loading="lazy"
        decoding="async"
        className={cx('size-full object-cover', dark ? 'opacity-25' : 'backdrop-fade-y opacity-8')}
      />
      {dark && (
        <div className="absolute inset-0 bg-linear-to-b from-primary-950 via-transparent to-primary-950" />
      )}
      <div
        className={cx(
          'absolute inset-0 grain',
          dark ? 'opacity-40 mix-blend-overlay' : 'opacity-5 mix-blend-multiply',
        )}
      />
    </div>
  );
}
