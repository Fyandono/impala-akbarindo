import Section from '../ui/Section';
import SectionHeading from '../ui/SectionHeading';

export type ValueItem = { title: string; description: string };

export type ValuesGridProps = {
  /** Anchor untuk navigasi one-page. */
  id?: string;
  /** id judul untuk `aria-labelledby`; unik per halaman. Default: `${id}-title`. */
  titleId?: string;
  eyebrow: string;
  title: string;
  values: ValueItem[];
};

/** Nilai perusahaan (mis. AKHLAK) dalam grid berbatas garis rambut. */
export default function ValuesGrid({
  eyebrow,
  title,
  values,
  id,
  titleId = `${id ?? 'values'}-title`,
}: ValuesGridProps) {
  return (
    <Section id={id} spacing="compact" labelledBy={titleId}>
      <SectionHeading id={titleId} eyebrow={eyebrow} title={title} />
      <ul
        className="mt-12 grid gap-px overflow-hidden rounded-card border border-neutral-200 bg-neutral-200 sm:grid-cols-2 lg:grid-cols-3"
        data-reveal-group
      >
        {values.map((value, i) => (
          <li key={value.title} className="group relative bg-white p-8" data-reveal>
            <span
              className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-accent-700 transition-transform duration-700 group-hover:scale-x-100"
              aria-hidden="true"
            />
            <p
              className="text-eyebrow font-semibold text-accent-700 tabular-nums"
              aria-hidden="true"
            >
              {String(i + 1).padStart(2, '0')}
            </p>
            <h3 className="mt-4 text-title-sm">{value.title}</h3>
            <p className="mt-3 leading-relaxed text-neutral-600">{value.description}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
