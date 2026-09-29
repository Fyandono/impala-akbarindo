import { getCollection, type CollectionEntry } from 'astro:content';
import type { BusinessCardProps } from '../../components/sections/BusinessCard';
import type { BusinessSectionProps } from '../../components/sections/BusinessSection';
import { dict } from '../../i18n';
import { responsiveImage } from '../image';
import { byOrder, type SectionData } from './shared';

/** Ubah entri koleksi `business` (lini layanan) menjadi props polos untuk BusinessCard. */
export async function businessCardProps(
  entry: Pick<CollectionEntry<'business'>, 'data'>,
  index: number,
  href?: string,
): Promise<BusinessCardProps> {
  const { data } = entry;
  return {
    title: data.title,
    summary: data.summary,
    image: await responsiveImage(
      data.image,
      data.imageAlt,
      '(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw',
    ),
    index,
    href,
  };
}

export async function loadBusiness(): Promise<SectionData<BusinessSectionProps>> {
  const entries = (await getCollection('business')).sort(byOrder);
  return {
    eyebrow: dict.nav.services,
    title: dict.business.title,
    lead: dict.business.lead,
    cards: await Promise.all(entries.map((entry, i) => businessCardProps(entry, i))),
  };
}
