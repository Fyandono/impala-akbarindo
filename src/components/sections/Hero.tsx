import { Fragment } from 'react';
import BrandMark from '../ui/BrandMark';
import Button from '../ui/Button';
import ColumnLines from '../ui/ColumnLines';
import Container from '../ui/Container';
import Eyebrow from '../ui/Eyebrow';
import NusantaraPattern from '../ui/NusantaraPattern';

type Action = { label: string; href: string };

export type HeroProps = {
  eyebrow: string;
  title: string;
  lead: string;
  primary: Action;
  secondary?: Action;
  /** Keterangan singkat di kanan atas, mis. ["Bandung, Jawa Barat", "ISO 9001 · 14001 · 45001"]. */
  meta?: string[];
  /** Label link "scroll ke bawah". */
  scrollLabel: string;
};

/**
 * Hero homepage layar penuh, gaya arsitektural: garis kolom, judul display besar & tebal,
 * garis rambut pemisah lead dan aksi. Satu per halaman — berisi `<h1>`.
 * Animasi masuk murni CSS (global.css: hero-word, hero-enter, hero-mark) — tidak menunggu JS.
 */
export default function Hero({
  eyebrow,
  title,
  lead,
  primary,
  secondary,
  meta = [],
  scrollLabel,
}: HeroProps) {
  const words = title.split(' ');
  return (
    <>
      <section className="relative isolate flex min-h-svh flex-col overflow-hidden bg-primary-950 text-white">
        {/* Latar sinematik: gradien + cahaya lembut. Ganti/lengkapi dengan foto/video klien. */}
        <div className="absolute inset-0 -z-20" aria-hidden="true">
          <div className="absolute inset-0 bg-linear-to-b from-primary-900 via-primary-950 to-primary-950" />
          <div
            data-parallax
            className="absolute -top-1/3 -right-1/4 aspect-square w-3/4 rounded-full bg-accent-700/20 blur-3xl"
          />
          <div data-parallax="-12" className="absolute inset-0 hidden md:block">
            <BrandMark className="hero-mark absolute -right-24 -bottom-8 h-5/6 w-auto text-white/5" />
          </div>
          <div className="hero-sweep absolute inset-y-0 left-0 w-1/4 bg-linear-to-r from-transparent via-accent-500/10 to-transparent" />
        </div>
        <NusantaraPattern fade="right" />
        <ColumnLines />

        <Container className="flex flex-1 flex-col pt-32 pb-10 md:pt-36">
          <div className="hero-enter hero-enter-1 flex items-center justify-between gap-6 text-eyebrow font-semibold uppercase">
            <Eyebrow tone="dark">{eyebrow}</Eyebrow>
            {meta.length > 0 && (
              <ul className="hidden gap-8 text-primary-200 sm:flex">
                {meta.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex flex-1 flex-col justify-end pt-20">
            <h1 className="max-w-6xl text-display text-white">
              {words.map((word, i) => (
                <Fragment key={i}>
                  {i > 0 && ' '}
                  <span className="hero-word-mask">
                    <span className="hero-word">{word}</span>
                  </span>
                </Fragment>
              ))}
            </h1>
            <div className="relative mt-14 grid gap-10 pt-10 lg:grid-cols-12">
              <span
                className="hero-rule absolute inset-x-0 top-0 h-px bg-white/15"
                aria-hidden="true"
              />
              <p className="hero-enter hero-enter-2 text-lead text-primary-200 lg:col-span-6">
                {lead}
              </p>
              <div className="hero-enter hero-enter-3 flex flex-wrap items-start gap-4 lg:col-span-5 lg:col-start-8 lg:justify-end">
                <Button href={primary.href} variant="accent">
                  {primary.label}
                </Button>
                {secondary && (
                  <Button href={secondary.href} variant="ghost-light">
                    {secondary.label}
                  </Button>
                )}
              </div>
            </div>
          </div>

          <a
            href="#content-start"
            className="hero-enter hero-enter-4 group mt-16 hidden items-center gap-4 self-start text-eyebrow font-semibold text-white/60 uppercase transition-colors hover:text-white md:flex"
          >
            <span className="relative h-px w-10 overflow-hidden bg-white/25" aria-hidden="true">
              <span className="scroll-cue absolute inset-0 bg-current" />
            </span>
            {scrollLabel}
          </a>
        </Container>
      </section>
      <span id="content-start" />
    </>
  );
}
