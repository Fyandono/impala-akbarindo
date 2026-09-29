import { getCollection, type CollectionEntry } from 'astro:content';
import type { Credential, LegalitySectionProps } from '../../components/sections/LegalitySection';
import { dict } from '../../i18n';
import { byOrder, type SectionData } from './shared';

type Entry = Pick<CollectionEntry<'credentials'>, 'data'>;

/** Ambil kredensial satu grup (`certification`/`permit`), urut `order`. */
export function mapCredentials(entries: Entry[], group: Entry['data']['group']): Credential[] {
  return entries
    .filter((e) => e.data.group === group)
    .sort(byOrder)
    .map(({ data }) => ({
      code: data.code,
      title: data.title,
      description: data.description,
    }));
}

export async function loadLegality(): Promise<SectionData<LegalitySectionProps>> {
  const { legality } = dict;
  const entries = await getCollection('credentials');
  return {
    eyebrow: dict.nav.legality,
    title: legality.title,
    lead: legality.lead,
    certificationsTitle: legality.certifications,
    certifications: mapCredentials(entries, 'certification'),
    permitsTitle: legality.permits,
    permits: mapCredentials(entries, 'permit'),
  };
}
