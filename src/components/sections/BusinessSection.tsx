import Section from '../ui/Section';
import SectionHeading from '../ui/SectionHeading';
import BusinessCard, { type BusinessCardProps } from './BusinessCard';

export type BusinessSectionProps = {
  /** Anchor untuk navigasi one-page. */
  id?: string;
  /** id judul untuk `aria-labelledby`; unik per halaman. Default: `${id}-title`. */
  titleId?: string;
  index?: string;
  eyebrow: string;
  title: string;
  lead?: string;
  cards: BusinessCardProps[];
};

/** Grid lini layanan / bisnis. */
export default function BusinessSection({
  id,
  titleId = `${id ?? 'business'}-title`,
  index,
  eyebrow,
  title,
  lead,
  cards,
}: BusinessSectionProps) {
  return (
    <Section id={id} tone="muted" labelledBy={titleId}>
      <SectionHeading id={titleId} index={index} eyebrow={eyebrow} title={title} lead={lead} />
      <div className="mt-16 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-5" data-reveal-group>
        {cards.map((card) => (
          <BusinessCard key={card.title} {...card} />
        ))}
      </div>
    </Section>
  );
}
