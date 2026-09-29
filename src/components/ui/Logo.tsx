import { cx } from '../cx';
import BrandMark from './BrandMark';

export type LogoProps = {
  /** Nama singkat perusahaan di samping monogram. */
  name: string;
  className?: string;
};

/** Logo: monogram merah + nama perusahaan (`currentColor`, mengikuti warna teks induk). */
export default function Logo({ name, className }: LogoProps) {
  return (
    <span className={cx('inline-flex items-center gap-3', className)}>
      <BrandMark className="h-9 w-auto shrink-0 text-accent-600" />
      <span className="text-body leading-tight font-bold tracking-tight uppercase">{name}</span>
    </span>
  );
}
