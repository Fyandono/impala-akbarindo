import { getImage } from 'astro:assets';
import { getCollection, type CollectionEntry } from 'astro:content';
import type { DocumentPreviewStrings } from '../../components/sections/DocumentPreview.astro';
import type { Credential, LegalitySectionProps } from '../../components/sections/LegalitySection';
import { dict } from '../../i18n';
import { responsiveImage } from '../image';
import { byOrder, type SectionData } from './shared';

type Entry = Pick<CollectionEntry<'credentials'>, 'data'>;

/** Kredensial sebelum pindaian dokumennya dioptimasi (thumbnail + gambar pratinjau). */
export type CredentialDraft = Omit<Credential, 'preview'> & {
  preview?: Entry['data']['preview'];
};

/** Ambil kredensial satu grup (`certification`/`permit`), urut `order`. */
export function mapCredentials(entries: Entry[], group: Entry['data']['group']): CredentialDraft[] {
  return entries
    .filter((e) => e.data.group === group)
    .sort(byOrder)
    .map(({ data }) => ({
      code: data.code,
      number: data.number,
      title: data.title,
      description: data.description,
      preview: data.preview,
      fileHref: data.file,
    }));
}

/** Optimasi pindaian dokumen (bila ada): thumbnail untuk kartu + gambar besar untuk pratinjau. */
const withPreview = (drafts: CredentialDraft[]): Promise<Credential[]> =>
  Promise.all(
    drafts.map(async ({ preview, ...credential }) => ({
      ...credential,
      preview: preview && {
        // alt kosong: kode & judul sertifikat sudah tertulis di kartu yang sama.
        thumbnail: await responsiveImage(
          preview,
          '',
          '(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw',
          [320, 640],
        ),
        src: (await getImage({ src: preview, width: Math.min(preview.width, 1400) })).src,
      },
    })),
  );

export async function loadLegality(): Promise<
  SectionData<LegalitySectionProps> & { preview: DocumentPreviewStrings }
> {
  const { legality } = dict;
  const entries = await getCollection('credentials');
  return {
    eyebrow: dict.nav.legality,
    title: legality.title,
    lead: legality.lead,
    certificationsTitle: legality.certifications,
    certifications: await withPreview(mapCredentials(entries, 'certification')),
    permitsTitle: legality.permits,
    permits: await withPreview(mapCredentials(entries, 'permit')),
    numberLabel: legality.number,
    viewDocumentLabel: legality.viewDocument,
    preview: {
      close: legality.closePreview,
      openFile: legality.openFile,
      opensInNewTab: dict.common.opensInNewTab,
    },
  };
}
