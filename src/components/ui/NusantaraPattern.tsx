import { useId } from 'react';
import { cx } from '../cx';

export type NusantaraPatternProps = {
  /** `dark` = garis putih tipis untuk section gelap; `light` = garis gelap sangat samar. */
  tone?: 'dark' | 'light';
  /** Arah pola memudar agar tidak bersaing dengan teks. */
  fade?: 'right' | 'left' | 'center';
  className?: string;
};

/**
 * Motif garis miring tipis — mengikuti kemiringan kaki huruf "A" pada logo dan bidang diagonal
 * di company profile. Letakkan sebagai anak section yang `relative isolate overflow-hidden`.
 */
export default function NusantaraPattern({
  tone = 'dark',
  fade = 'right',
  className,
}: NusantaraPatternProps) {
  const id = `stripes-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  return (
    <svg
      className={cx(
        'pointer-events-none absolute inset-0 -z-10 size-full',
        tone === 'dark' ? 'text-white/10' : 'text-primary-900/5',
        fade === 'right' && 'pattern-fade-right',
        fade === 'left' && 'pattern-fade-left',
        fade === 'center' && 'pattern-fade-center',
        className,
      )}
      aria-hidden="true"
    >
      <defs>
        <pattern
          id={id}
          width="32"
          height="32"
          patternUnits="userSpaceOnUse"
          patternTransform="skewX(-16)"
        >
          <path d="M0.5 0V32" fill="none" stroke="currentColor" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
