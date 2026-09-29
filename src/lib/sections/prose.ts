import { getEntry, render } from 'astro:content';
import { site } from '../../config/site';
import { dict } from '../../i18n';

/** Section teks Markdown yang tampil di halaman utama, sesuai `site.features`. */
export const proseSectionKeys = (['governance', 'sustainability'] as const).filter(
  (key) => site.features[key],
);

/** Muat isi section teks dari src/content/pages/<key>.md. */
export async function loadProseSections() {
  return Promise.all(
    proseSectionKeys.map(async (key) => {
      const entry = await getEntry('pages', key);
      if (!entry) throw new Error(`Konten tidak ditemukan: src/content/pages/${key}.md`);
      const { Content } = await render(entry);
      return {
        key,
        eyebrow: dict.nav[key],
        title: entry.data.title,
        lead: entry.data.description,
        Content,
      };
    }),
  );
}
