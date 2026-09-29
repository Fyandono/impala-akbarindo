import type { ResponsiveImage } from '../types';
import Section from '../ui/Section';
import SectionHeading from '../ui/SectionHeading';

export type GalleryItem = { image: ResponsiveImage; caption: string };

export type GallerySectionProps = {
  /** Anchor untuk navigasi one-page. */
  id?: string;
  /** id judul untuk `aria-labelledby`; unik per halaman. Default: `${id}-title`. */
  titleId?: string;
  index?: string;
  eyebrow: string;
  title: string;
  lead?: string;
  items: GalleryItem[];
};

/** Grid foto dokumentasi kegiatan dengan keterangan. */
export default function GallerySection({
  id,
  titleId = `${id ?? 'gallery'}-title`,
  index,
  eyebrow,
  title,
  lead,
  items,
}: GallerySectionProps) {
  return (
    <Section id={id} labelledBy={titleId}>
      <SectionHeading id={titleId} index={index} eyebrow={eyebrow} title={title} lead={lead} />
      <ul className="mt-16 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3" data-reveal-group>
        {items.map((item) => (
          <li key={item.caption} data-reveal>
            <figure className="group">
              <div className="aspect-landscape overflow-hidden rounded-card bg-neutral-100">
                <img
                  {...item.image}
                  loading="lazy"
                  decoding="async"
                  className="size-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              <figcaption className="mt-4 border-t border-neutral-200 pt-4 text-small text-neutral-600">
                {item.caption}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  );
}
