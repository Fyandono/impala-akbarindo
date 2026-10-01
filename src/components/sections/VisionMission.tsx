import type { ResponsiveImage } from '../types';
import Eyebrow from '../ui/Eyebrow';
import Section from '../ui/Section';

export type VisionMissionProps = {
  /** Anchor untuk navigasi one-page. */
  id?: string;
  /** id judul untuk `aria-labelledby`; unik per halaman. Default: `${id}-title`. */
  titleId?: string;
  visionTitle: string;
  vision: string;
  missionTitle: string;
  mission: string[];
  /** Foto latar dekoratif (redup di latar gelap). */
  backdrop?: ResponsiveImage;
};

/** Section gelap: pernyataan visi besar di kiri, daftar misi bernomor di kanan. */
export default function VisionMission({
  visionTitle,
  vision,
  missionTitle,
  mission,
  backdrop,
  id,
  titleId = `${id ?? 'vision'}-title`,
}: VisionMissionProps) {
  return (
    <Section
      tone="dark"
      spacing="compact"
      id={id}
      labelledBy={titleId}
      backdrop={backdrop}
      containerClassName="grid gap-16 lg:grid-cols-2"
    >
      <div data-reveal>
        <Eyebrow as="h2" id={titleId} tone="dark">
          {visionTitle}
        </Eyebrow>
        <p className="mt-6 text-statement font-semibold text-white">{vision}</p>
      </div>
      <div data-reveal>
        <Eyebrow as="h2" tone="dark">
          {missionTitle}
        </Eyebrow>
        <ol className="mt-6 space-y-6" data-reveal-group>
          {mission.map((item, i) => (
            <li key={item} className="flex gap-5 border-t border-white/15 pt-6" data-reveal="left">
              <span className="text-small font-semibold text-accent-400" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-body-lg leading-relaxed text-primary-100">{item}</span>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
