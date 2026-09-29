import Eyebrow from '../ui/Eyebrow';
import Section from '../ui/Section';
import SectionHeading from '../ui/SectionHeading';

export type Routine = { frequency: string; description: string };
export type OperationTrack = { title: string; goals: string[]; routines: Routine[] };

export type OperationsSectionProps = {
  /** Anchor untuk navigasi one-page. */
  id?: string;
  /** id judul untuk `aria-labelledby`; unik per halaman. Default: `${id}-title`. */
  titleId?: string;
  index?: string;
  eyebrow: string;
  title: string;
  lead?: string;
  /** Label daftar tujuan, mis. "Tujuan". */
  goalsTitle: string;
  /** Label daftar rutinitas, mis. "Rencana kerja". */
  routinesTitle: string;
  tracks: OperationTrack[];
};

/** Standar kerja per lini layanan: tujuan + jadwal pengawasan/pelatihan (harian → dua bulanan). */
export default function OperationsSection({
  id,
  titleId = `${id ?? 'operations'}-title`,
  index,
  eyebrow,
  title,
  lead,
  goalsTitle,
  routinesTitle,
  tracks,
}: OperationsSectionProps) {
  return (
    <Section id={id} labelledBy={titleId}>
      <SectionHeading id={titleId} index={index} eyebrow={eyebrow} title={title} lead={lead} />
      <div className="mt-16 grid gap-16 lg:grid-cols-2 lg:gap-12" data-reveal-group>
        {tracks.map((track) => (
          <article
            key={track.title}
            className="rounded-card border border-neutral-200 p-6 sm:p-10"
            data-reveal
          >
            <h3 className="font-serif text-title-lg font-normal">{track.title}</h3>

            <Eyebrow as="p" tone="light" className="mt-8">
              {goalsTitle}
            </Eyebrow>
            <ul className="mt-4 space-y-3">
              {track.goals.map((goal) => (
                <li key={goal} className="flex gap-3 leading-relaxed text-neutral-600">
                  <span className="mt-3 h-px w-3 shrink-0 bg-accent-700" aria-hidden="true" />
                  {goal}
                </li>
              ))}
            </ul>

            <Eyebrow as="p" tone="light" className="mt-10">
              {routinesTitle}
            </Eyebrow>
            <ol className="mt-4 divide-y divide-neutral-200 border-y border-neutral-200">
              {track.routines.map((routine) => (
                <li key={routine.frequency} className="grid gap-1 py-4 sm:grid-cols-3 sm:gap-6">
                  <p className="text-small font-semibold text-accent-700">{routine.frequency}</p>
                  <p className="leading-relaxed text-neutral-600 sm:col-span-2">
                    {routine.description}
                  </p>
                </li>
              ))}
            </ol>
          </article>
        ))}
      </div>
    </Section>
  );
}
