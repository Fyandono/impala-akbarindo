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

/**
 * Struktur organisasi sebagai hierarki atas → bawah: tiap kelompok (komisaris, direksi, manajer, dst.)
 * satu tingkat penuh di tengah, dihubungkan garis vertikal — urutan `groups` = urutan jenjang.
 */
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
      <ol className="mt-16 flex flex-col items-center">
        {groups.map((group, i) => (
          <li key={group.title} className="flex w-full flex-col items-center">
            {i > 0 && <span className="my-10 h-16 w-px bg-neutral-300" aria-hidden="true" />}
            <h3
              className="flex flex-col items-center gap-4 text-center font-serif text-title text-primary-900"
              data-reveal="fade"
            >
              <span className="h-1 w-8 bg-accent-700" aria-hidden="true" />
              {group.title}
            </h3>
            <ul
              className="mt-10 flex w-full flex-wrap justify-center gap-x-6 gap-y-14 sm:gap-x-8 lg:gap-x-10"
              data-reveal-group
            >
              {group.people.map((person) => (
                <li key={person.name} className="w-2/5 sm:w-44 lg:w-48">
                  <PersonCard {...person} as="h4" viewProfileLabel={viewProfileLabel} />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  );
}
