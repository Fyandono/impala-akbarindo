import { cx } from '../cx';
import type { ResponsiveImage } from '../types';
import Section from '../ui/Section';
import SectionHeading from '../ui/SectionHeading';

export type ProjectRow = {
  client: string;
  service: string;
  /** Nilai kontrak yang sudah diformat, mis. "Rp 9.769.380.280". Kosong = kolom nilai disembunyikan. */
  value?: string;
};

/** Klien pada strip berjalan; tanpa logo, nama ditampilkan sebagai teks. */
export type ClientItem = { name: string; logo?: ResponsiveImage };

export type ExperienceSectionProps = {
  /** Anchor untuk navigasi one-page. */
  id?: string;
  /** id judul untuk `aria-labelledby`; unik per halaman. Default: `${id}-title`. */
  titleId?: string;
  index?: string;
  eyebrow: string;
  title: string;
  lead?: string;
  /** Label kolom: pemberi kerja, jenis pekerjaan, nilai kontrak. */
  labels: { client: string; service: string; value: string; total: string };
  projects: ProjectRow[];
  /** Total nilai kontrak yang sudah diformat. Kosong = baris total disembunyikan. */
  total?: string;
  /** Judul strip klien, mis. "Instansi yang telah kami layani". */
  clientsTitle?: string;
  clients?: ClientItem[];
};

/** Rekam jejak kontrak: pemberi kerja, jenis pekerjaan, dan (opsional) nilai kontrak + total. */
export default function ExperienceSection({
  id,
  titleId = `${id ?? 'experience'}-title`,
  index,
  eyebrow,
  title,
  lead,
  labels,
  projects,
  total,
  clientsTitle,
  clients = [],
}: ExperienceSectionProps) {
  const showValues = projects.some((project) => project.value);
  return (
    <Section id={id} tone="muted" labelledBy={titleId}>
      <SectionHeading id={titleId} index={index} eyebrow={eyebrow} title={title} lead={lead} />

      <div className="mt-16">
        <div
          className="hidden grid-cols-12 gap-6 border-b border-primary-900 pb-4 text-eyebrow font-semibold text-primary-900 uppercase md:grid"
          aria-hidden="true"
          data-reveal="fade"
        >
          <span className={showValues ? 'col-span-6' : 'col-span-8'}>{labels.client}</span>
          <span className={showValues ? 'col-span-3' : 'col-span-4'}>{labels.service}</span>
          {showValues && <span className="col-span-3 text-right">{labels.value}</span>}
        </div>
        <ol className="divide-y divide-neutral-200 border-b border-neutral-200" data-reveal-group>
          {projects.map((project) => (
            <li
              key={`${project.client}-${project.service}`}
              className="group relative grid gap-2 py-6 md:grid-cols-12 md:items-baseline md:gap-6"
              data-reveal="left"
            >
              <span
                className="absolute inset-y-0 -left-4 w-0.5 origin-top scale-y-0 bg-accent-700 transition-transform duration-500 group-hover:scale-y-100"
                aria-hidden="true"
              />
              <h3
                className={cx(
                  'text-body-lg transition-transform duration-500 group-hover:translate-x-2',
                  showValues ? 'md:col-span-6' : 'md:col-span-8',
                )}
              >
                {project.client}
              </h3>
              <p
                className={cx(
                  'text-small text-neutral-600',
                  showValues ? 'md:col-span-3' : 'md:col-span-4',
                )}
              >
                <span className="sr-only">{labels.service}: </span>
                {project.service}
              </p>
              {project.value && (
                <p className="font-medium text-primary-900 tabular-nums md:col-span-3 md:text-right">
                  <span className="sr-only">{labels.value}: </span>
                  {project.value}
                </p>
              )}
            </li>
          ))}
        </ol>
        {total && (
          <dl className="mt-8 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
            <dt className="text-eyebrow font-semibold text-accent-700 uppercase">{labels.total}</dt>
            <dd className="font-serif text-title-lg font-light text-primary-900 tabular-nums">
              {total}
            </dd>
          </dl>
        )}
      </div>

      {clients.length > 0 && (
        <div className="mt-16 border-t border-neutral-300 pt-8" data-reveal>
          {clientsTitle && (
            <h3 className="text-eyebrow font-semibold text-primary-500 uppercase">
              {clientsTitle}
            </h3>
          )}
          {/* Marquee: daftar asli + duplikat (aria-hidden) agar gerakan tanpa jeda. Logo dekoratif (alt kosong) karena nama klien selalu tertulis. */}
          <div className="marquee mt-5 overflow-hidden mask-fade-x">
            <div className="marquee-track flex w-max">
              {[false, true].map((clone) => (
                <ul
                  key={String(clone)}
                  className={cx(
                    'flex shrink-0 gap-3 pr-3 motion-reduce:flex-wrap',
                    clone && 'marquee-clone',
                  )}
                  aria-hidden={clone || undefined}
                >
                  {clients.map((client) => (
                    <li
                      key={client.name}
                      className="flex h-20 items-center gap-4 rounded-card border border-neutral-200 bg-white px-5 text-small whitespace-nowrap text-primary-700 motion-reduce:whitespace-normal"
                    >
                      {client.logo && (
                        <img
                          {...client.logo}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          className="h-11 w-auto shrink-0 object-contain"
                        />
                      )}
                      {client.name}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}
