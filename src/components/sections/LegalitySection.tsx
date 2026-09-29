import Eyebrow from '../ui/Eyebrow';
import NusantaraPattern from '../ui/NusantaraPattern';
import Section from '../ui/Section';
import SectionHeading from '../ui/SectionHeading';

export type Credential = {
  /** Kode singkat, mis. "ISO 9001:2015" (opsional). */
  code?: string;
  title: string;
  description: string;
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
};

/** Section gelap: sertifikasi (kartu berkode) dan daftar perizinan usaha. */
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
}: LegalitySectionProps) {
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
      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" data-reveal-group>
        {certifications.map((item) => (
          <li
            key={item.title}
            className="lift flex flex-col rounded-card border border-white/15 bg-white/5 p-6"
            data-reveal="scale"
          >
            {item.code && (
              <p className="text-small font-semibold tracking-wide text-accent-400">{item.code}</p>
            )}
            <h4 className="mt-3 text-title-sm text-white">{item.title}</h4>
            <p className="mt-3 text-small leading-relaxed text-primary-200">{item.description}</p>
          </li>
        ))}
      </ul>

      <Eyebrow as="h3" tone="dark" className="mt-16">
        {permitsTitle}
      </Eyebrow>
      <ul className="mt-8 grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3" data-reveal-group>
        {permits.map((item) => (
          <li key={item.title} className="border-t border-white/15 pt-5" data-reveal="left">
            <h4 className="text-body-lg text-white">{item.title}</h4>
            <p className="mt-2 text-small leading-relaxed text-primary-200">{item.description}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
