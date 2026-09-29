import { getCollection } from 'astro:content';
import type { GallerySectionProps } from '../../components/sections/GallerySection';
import { dict } from '../../i18n';
import { responsiveImage } from '../image';
import { byOrder, type SectionData } from './shared';

export async function loadGallery(): Promise<SectionData<GallerySectionProps>> {
  const entries = (await getCollection('gallery')).sort(byOrder);
  return {
    eyebrow: dict.nav.gallery,
    title: dict.gallery.title,
    lead: dict.gallery.lead,
    items: await Promise.all(
      entries.map(async ({ data }) => {
        const { caption } = data;
        return {
          caption,
          image: await responsiveImage(
            data.image,
            caption,
            '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw',
            [480, 960],
          ),
        };
      }),
    ),
  };
}
