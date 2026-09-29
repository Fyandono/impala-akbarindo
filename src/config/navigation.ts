import type { Dictionary } from '../i18n';
import { site, type FeatureKey } from './site';

/** Section di halaman utama (one-page). `id` dipakai sebagai anchor: `/#about`. */
export type SectionNavItem = { key: keyof Dictionary['nav']; id: string; feature?: FeatureKey };

const sections: SectionNavItem[] = [
  { key: 'about', id: 'about' },
  { key: 'services', id: 'services' },
  { key: 'operations', id: 'operations' },
  { key: 'experience', id: 'experience' },
  { key: 'management', id: 'management' },
  { key: 'legality', id: 'legality' },
  { key: 'gallery', id: 'gallery', feature: 'gallery' },
  { key: 'governance', id: 'governance', feature: 'governance' },
  { key: 'sustainability', id: 'sustainability', feature: 'sustainability' },
  { key: 'news', id: 'news', feature: 'news' },
  { key: 'contact', id: 'contact' },
];

export const mainNav = sections.filter((item) => !item.feature || site.features[item.feature]);

/** Link ke section; bekerja dari halaman mana pun (mis. dari halaman legal kembali ke beranda). */
export const sectionHref = (id: string) => `/#${id}`;

/** Nomor urut section ("01", "02", …) mengikuti urutan menu yang aktif. */
export const sectionIndex = (id: string) =>
  String(mainNav.findIndex((item) => item.id === id) + 1).padStart(2, '0');

export const legalNav: { key: keyof Dictionary['nav']; path: string }[] = [
  { key: 'privacy', path: '/privacy' },
  { key: 'cookies', path: '/cookies' },
  { key: 'terms', path: '/terms' },
];
