import type { ResponsiveImage } from '../types';
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
  /** Foto latar dekoratif (redup di latar gelap). */
  backdrop?: ResponsiveImage;
};

/** Section gelap berfoto: standar kerja per lini layanan — tujuan + jadwal pengawasan/pelatihan. */
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
  backdrop,
}: OperationsSectionProps) {
  return (
    <Section id={id} tone="dark" labelledBy={titleId} backdrop={backdrop}>
      <SectionHeading
        id={titleId}
        index={index}
        eyebrow={eyebrow}
        title={title}
        lead={lead}
        tone="dark"
      />
      <div className="mt-16 grid gap-16 lg:grid-cols-2 lg:gap-12" data-reveal-group>
        {tracks.map((track) => (
          <article
            key={track.title}
            className="lift rounded-card border border-white/15 bg-primary-950/70 p-6 sm:p-10"
            data-reveal
          >
            <h3 className="font-serif text-title-lg text-white">{track.title}</h3>

            <Eyebrow as="p" tone="dark" className="mt-8">
              {goalsTitle}
            </Eyebrow>
            <ul className="mt-4 space-y-3">
              {track.goals.map((goal) => (
                <li key={goal} className="flex gap-3 leading-relaxed text-primary-100">
                  <span className="mt-3 h-px w-3 shrink-0 bg-accent-400" aria-hidden="true" />
                  {goal}
                </li>
              ))}
            </ul>

            <Eyebrow as="p" tone="dark" className="mt-10">
              {routinesTitle}
            </Eyebrow>
            <ol
              className="mt-4 divide-y divide-white/15 border-y border-white/15"
              data-reveal-group
            >
              {track.routines.map((routine) => (
                <li
                  key={routine.frequency}
                  className="grid gap-1 py-4 sm:grid-cols-3 sm:gap-6"
                  data-reveal="left"
                >
                  <p className="text-small font-semibold text-accent-400">{routine.frequency}</p>
                  <p className="leading-relaxed text-primary-100 sm:col-span-2">
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
