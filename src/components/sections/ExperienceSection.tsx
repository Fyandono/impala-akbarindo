import { cx } from '../cx';
import type { ResponsiveImage } from '../types';
import Section from '../ui/Section';
import SectionHeading from '../ui/SectionHeading';

export type ProjectRow = {
  client: string;
  /** Logo pemberi kerja (dekoratif; nama selalu tertulis di sebelahnya). */
  logo?: ResponsiveImage;
  service: string;
  /** Nilai kontrak yang sudah diformat, mis. "Rp 9.769.380.280". Kosong = kolom nilai disembunyikan. */
  value?: string;
};

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
  /** Klien lain tanpa rincian kontrak (logo opsional). */
  othersTitle?: string;
  others?: { name: string; logo?: ResponsiveImage }[];
};

/** Rekam jejak kontrak: logo & nama pemberi kerja, jenis pekerjaan, (opsional) nilai + total. */
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
  othersTitle,
  others = [],
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
              className="grid gap-2 py-5 md:grid-cols-12 md:items-center md:gap-6"
              data-reveal
            >
              <div
                className={cx(
                  'flex items-center gap-4',
                  showValues ? 'md:col-span-6' : 'md:col-span-8',
                )}
              >
                <span className="flex h-12 w-20 shrink-0 items-center justify-center">
                  {project.logo && (
                    <img
                      {...project.logo}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="max-h-12 max-w-full object-contain"
                    />
                  )}
                </span>
                <h3 className="text-body-lg">{project.client}</h3>
              </div>
              <p
                className={cx(
                  'pl-24 text-small text-neutral-600 md:pl-0',
                  showValues ? 'md:col-span-3' : 'md:col-span-4',
                )}
              >
                <span className="sr-only">{labels.service}: </span>
                {project.service}
              </p>
              {project.value && (
                <p className="pl-24 font-medium text-primary-900 tabular-nums md:col-span-3 md:pl-0 md:text-right">
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
            <dd className="font-serif text-title-lg font-semibold text-primary-900 tabular-nums">
              {total}
            </dd>
          </dl>
        )}
      </div>

      {others.length > 0 && (
        <div className="mt-16" data-reveal>
          {othersTitle && (
            <h3 className="text-eyebrow font-semibold text-primary-500 uppercase">{othersTitle}</h3>
          )}
          <ul className="mt-5 flex flex-wrap gap-3">
            {others.map((client) => (
              <li
                key={client.name}
                className="flex min-h-14 items-center gap-3 rounded-card border border-neutral-300 bg-white px-4 py-2 text-small text-primary-700"
              >
                {client.logo && (
                  <img
                    {...client.logo}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="max-h-9 w-auto max-w-20 object-contain"
                  />
                )}
                {client.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Section>
  );
}
