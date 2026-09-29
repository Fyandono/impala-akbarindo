import id from './id.json';

/** Bahasa situs: dipakai untuk atribut `lang`, Open Graph, serta format tanggal & angka. */
export const lang = 'id';
export const intlLocale = 'id-ID';
export const ogLocale = 'id_ID';

/** Semua teks UI situs ada di id.json. */
export type Dictionary = typeof id;
export const dict: Dictionary = id;

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat(intlLocale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}
