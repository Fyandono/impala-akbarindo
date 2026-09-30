import { cx } from '../cx';
import PersonCard, { type PersonCardProps } from '../ui/PersonCard';
import Section from '../ui/Section';
import SectionHeading from '../ui/SectionHeading';

export type ManagementGroup = {
  /** Nama kelompok, mis. "Dewan Komisaris". */
  title: string;
  people: Omit<PersonCardProps, 'as' | 'viewProfileLabel'>[];
};

export type ManagementSectionProps = {
  /** Anchor untuk navigasi one-page. */
  id?: string;
  /** id judul untuk `aria-labelledby`; unik per halaman. Default: `${id}-title`. */
  titleId?: string;
  index?: string;
  eyebrow: string;
  title: string;
  groups: ManagementGroup[];
  viewProfileLabel: string;
};

/*
 * Di desktop (6 kolom) kelompok kecil berbagi baris: tiap kelompok selebar jumlah anggotanya,
 * dengan lebar kartu yang sama di semua kelompok.
 */
const spans = {
  1: 'lg:col-span-1',
  2: 'lg:col-span-2',
  3: 'lg:col-span-3',
  4: 'lg:col-span-4',
  5: 'lg:col-span-5',
  6: 'lg:col-span-6',
} as const;
const innerColumns = {
  1: 'lg:grid-cols-1',
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
  5: 'lg:grid-cols-5',
  6: 'lg:grid-cols-6',
} as const;

/** Struktur organisasi (komisaris, direksi, manajer, dst.), dikelompokkan dengan label bergaris. */
export default function ManagementSection({
  id,
  titleId = `${id ?? 'management'}-title`,
  index,
  eyebrow,
  title,
  groups,
  viewProfileLabel,
}: ManagementSectionProps) {
  return (
    <Section id={id} labelledBy={titleId}>
      <SectionHeading id={titleId} index={index} eyebrow={eyebrow} title={title} />
      <div className="mt-16 grid gap-x-6 gap-y-20 sm:gap-x-8 lg:grid-cols-6 lg:gap-x-10 lg:gap-y-24">
        {groups.map((group) => {
          const columns = Math.min(group.people.length, 6) as 1 | 2 | 3 | 4 | 5 | 6;
          return (
            <div key={group.title} className={spans[columns]}>
              <h3
                className="flex items-center gap-3 border-t-2 border-primary-900 pt-5 font-serif text-title font-normal text-primary-900"
                data-reveal="fade"
              >
                <span className="h-6 w-1 shrink-0 bg-accent-700" aria-hidden="true" />
                {group.title}
              </h3>
              <ul
                className={cx(
                  'mt-10 grid grid-cols-2 gap-x-6 gap-y-14 sm:grid-cols-4 sm:gap-x-8 lg:gap-x-10 lg:gap-y-16',
                  innerColumns[columns],
                )}
                data-reveal-group
              >
                {group.people.map((person) => (
                  <li key={person.name}>
                    <PersonCard {...person} as="h4" viewProfileLabel={viewProfileLabel} />
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
