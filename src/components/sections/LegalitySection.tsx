import type { ResponsiveImage } from '../types';
import Eyebrow from '../ui/Eyebrow';
import NusantaraPattern from '../ui/NusantaraPattern';
import Section from '../ui/Section';
import SectionHeading from '../ui/SectionHeading';

export type Credential = {
  /** Kode singkat, mis. "ISO 9001:2015" (opsional). */
  code?: string;
  /** Nomor dokumen/sertifikat (opsional). */
  number?: string;
  title: string;
  description: string;
  /** Pindaian dokumen (opsional): thumbnail untuk kartu + URL gambar besar untuk pratinjau. */
  preview?: { thumbnail: ResponsiveImage; src: string };
  /** URL berkas asli (PDF) — opsional; dibuka di tab baru. */
  fileHref?: string;
};

export type LegalitySectionProps = {
  /** Anchor untuk navigasi one-page. */
  id?: string;
  /** id judul untuk `aria-labelledby`; unik per halaman. Default: `${id}-title`. */
  titleId?: string;
  index?: string;
  eyebrow: string;
  title: string;
  lead?: string;
  certificationsTitle: string;
  certifications: Credential[];
  permitsTitle: string;
  permits: Credential[];
  /** Label di depan nomor dokumen, mis. "No.". */
  numberLabel: string;
  /** Label link pratinjau dokumen, mis. "Lihat dokumen". */
  viewDocumentLabel: string;
};

/**
 * Section gelap: sertifikasi (kartu dengan pindaian sertifikat, nomor, dan pratinjau) dan daftar
 * perizinan usaha. Pratinjau dibuka di dialog DocumentPreview.astro.
 */
export default function LegalitySection({
  id,
  titleId = `${id ?? 'legality'}-title`,
  index,
  eyebrow,
  title,
  lead,
  certificationsTitle,
  certifications,
  permitsTitle,
  permits,
  numberLabel,
  viewDocumentLabel,
}: LegalitySectionProps) {
  /**
   * Atribut link pratinjau: dibuka di dialog oleh src/scripts/document-preview.ts; tanpa JS
   * membuka berkas (atau gambarnya) di tab baru.
   */
  const previewLink = ({ code, title, preview, fileHref }: Credential) => ({
    href: fileHref ?? preview?.src,
    target: '_blank',
    rel: 'noopener noreferrer',
    'data-document-preview': preview?.src,
    'data-document-title': code ? `${code} — ${title}` : title,
    'data-document-file': fileHref,
  });
  /** Nomor dokumen + link pratinjaunya; tidak dirender bila keduanya kosong. */
  const reference = (item: Credential) => (
    <>
      {item.number && (
        <p className="mt-3 text-small wrap-break-word text-primary-200">
          {numberLabel} <span className="font-semibold text-white tabular-nums">{item.number}</span>
        </p>
      )}
      {item.preview && (
        <a
          {...previewLink(item)}
          className="mt-4 inline-flex items-center gap-2 self-start text-small font-semibold text-accent-400 underline underline-offset-4 hover:text-white"
        >
          {viewDocumentLabel}
          <span className="sr-only">{item.title}</span>
        </a>
      )}
    </>
  );
  const scanned = certifications.filter((item) => item.preview);
  const unscanned = certifications.filter((item) => !item.preview);
  return (
    <Section id={id} tone="dark" labelledBy={titleId} className="relative isolate overflow-hidden">
      <NusantaraPattern fade="left" />
      <SectionHeading
        id={titleId}
        index={index}
        eyebrow={eyebrow}
        title={title}
        lead={lead}
        tone="dark"
      />

      <Eyebrow as="h3" tone="dark" className="mt-16">
        {certificationsTitle}
      </Eyebrow>
      {scanned.length > 0 && (
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" data-reveal-group>
          {scanned.map((item) => (
            <li
              key={item.title}
              className="lift flex flex-col rounded-card border border-white/15 bg-white/5 p-4"
              data-reveal="scale"
            >
              {/* Link kedua ke dokumen yang sama; yang terbaca pembaca layar adalah "Lihat dokumen". */}
              <a
                {...previewLink(item)}
                tabIndex={-1}
                aria-hidden="true"
                className="group block aspect-document overflow-hidden rounded-card bg-white"
              >
                <img
                  {...item.preview!.thumbnail}
                  loading="lazy"
                  decoding="async"
                  className="size-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </a>
              <div className="flex flex-1 flex-col px-2 pt-5 pb-2">
                {item.code && (
                  <p className="text-small font-semibold tracking-wide text-accent-400">
                    {item.code}
                  </p>
                )}
                <h4 className="mt-2 text-title-sm text-white">{item.title}</h4>
                <p className="mt-2 text-small leading-relaxed text-primary-200">
                  {item.description}
                </p>
                {reference(item)}
              </div>
            </li>
          ))}
        </ul>
      )}
      {unscanned.length > 0 && (
        <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" data-reveal-group>
          {unscanned.map((item) => (
            <li
              key={item.title}
              className="lift flex flex-col rounded-card border border-white/15 bg-white/5 p-6"
              data-reveal="scale"
            >
              {item.code && (
                <p className="text-small font-semibold tracking-wide text-accent-400">
                  {item.code}
                </p>
              )}
              <h4 className="mt-3 text-title-sm text-white">{item.title}</h4>
              <p className="mt-3 text-small leading-relaxed text-primary-200">{item.description}</p>
              {reference(item)}
            </li>
          ))}
        </ul>
      )}

      <Eyebrow as="h3" tone="dark" className="mt-16">
        {permitsTitle}
      </Eyebrow>
      <ul className="mt-8 grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3" data-reveal-group>
        {permits.map((item) => (
          <li
            key={item.title}
            className="flex flex-col border-t border-white/15 pt-5"
            data-reveal="left"
          >
            <h4 className="text-body-lg text-white">{item.title}</h4>
            <p className="mt-2 text-small leading-relaxed text-primary-200">{item.description}</p>
            {reference(item)}
          </li>
        ))}
      </ul>
    </Section>
  );
}
