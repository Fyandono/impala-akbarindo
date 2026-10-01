import { cx } from '../cx';
import BrandMark from './BrandMark';
import Wordmark from './Wordmark';

export type LogoProps = {
  /** Nama perusahaan untuk pembaca layar (wordmark-nya sendiri berupa gambar). */
  name: string;
  className?: string;
};

/** Logo: monogram merah + wordmark "IMPALA" (`currentColor`, mengikuti warna teks induk). */
export default function Logo({ name, className }: LogoProps) {
  return (
    <span className={cx('inline-flex items-center gap-3', className)}>
      <BrandMark className="h-9 w-auto shrink-0 text-accent-600" />
      <Wordmark className="h-5 w-auto shrink-0" />
      <span className="sr-only">{name}</span>
    </span>
  );
}
