import { getCollection, type CollectionEntry } from 'astro:content';
import type { NewsCardProps } from '../../components/sections/NewsCard';
import type { NewsSectionProps } from '../../components/sections/NewsSection';
import { dict, formatDate } from '../../i18n';
import { responsiveImage } from '../image';
import type { SectionData } from './shared';

type Entry = Pick<CollectionEntry<'news'>, 'id' | 'data'>;

/** Berita terbit (bukan draft), terbaru lebih dulu, maksimal `limit`. */
export function latestNews<T extends Entry>(entries: T[], limit: number): T[] {
  return entries
    .filter((e) => !e.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
    .slice(0, limit);
}

/** Ubah entri koleksi `news` menjadi props polos untuk NewsCard. */
export async function newsCardProps(entry: Entry, href?: string): Promise<NewsCardProps> {
  const { data } = entry;
  return {
    title: data.title,
    description: data.description,
    cover: await responsiveImage(
      data.cover,
      data.coverAlt,
      '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw',
    ),
    dateTime: data.date.toISOString(),
    dateLabel: formatDate(data.date),
    href,
  };
}

export async function loadNews(limit = 3): Promise<SectionData<NewsSectionProps>> {
  const entries = latestNews(await getCollection('news'), limit);
  return {
    eyebrow: dict.nav.news,
    title: dict.news.title,
    emptyLabel: dict.news.empty,
    cards: await Promise.all(entries.map((entry) => newsCardProps(entry))),
  };
}
