import { getCollection, type CollectionEntry } from 'astro:content';
import type {
  ExperienceSectionProps,
  ProjectRow,
} from '../../components/sections/ExperienceSection';
import type { ResponsiveImage } from '../../components/types';
import { site } from '../../config/site';
import { dict, intlLocale } from '../../i18n';
import { responsiveImage } from '../image';
import { byOrder, type SectionData } from './shared';

/** `9769380280` → `Rp 9.769.380.280`. */
export function formatRupiah(value: number): string {
  return new Intl.NumberFormat(intlLocale, {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  })
    .format(value)
    .replace(/\u00a0/g, ' ');
}

type Entry = Pick<CollectionEntry<'projects'>, 'data'>;

type Client = { name: string; logo?: ResponsiveImage };

/**
 * Baris kontrak urut `order`, dengan nama & logo dari klien yang dirujuk.
 * Nilai kontrak hanya disertakan bila `showValues`.
 */
export function mapProjects(
  entries: Entry[],
  clients: ReadonlyMap<string, Client>,
  showValues: boolean,
): ProjectRow[] {
  return [...entries].sort(byOrder).map(({ data }) => {
    const client = clients.get(data.client.id);
    if (!client) throw new Error(`Klien tidak ditemukan di clients.yaml: ${data.client.id}`);
    return {
      client: client.name,
      logo: client.logo,
      service: data.service,
      ...(showValues && { value: formatRupiah(data.value) }),
    };
  });
}

export const totalValue = (entries: Entry[]) =>
  entries.reduce((sum, { data }) => sum + data.value, 0);

/** id klien yang tidak punya baris kontrak (untuk daftar "Juga melayani"), urut `order`. */
export function otherClientIds(
  clients: Pick<CollectionEntry<'clients'>, 'id' | 'data'>[],
  projects: Entry[],
): string[] {
  const listed = new Set(projects.map(({ data }) => data.client.id));
  return [...clients]
    .sort(byOrder)
    .filter((client) => !listed.has(client.id))
    .map((client) => client.id);
}

export async function loadExperience(): Promise<SectionData<ExperienceSectionProps>> {
  const { experience } = dict;
  const [entries, clientEntries] = await Promise.all([
    getCollection('projects'),
    getCollection('clients'),
  ]);
  const clients = new Map<string, Client>(
    await Promise.all(
      clientEntries.map(
        async ({ id, data }) =>
          [
            id,
            {
              name: data.name,
              logo: data.logo && (await responsiveImage(data.logo, '', '80px', [160, 320])),
            },
          ] as const,
      ),
    ),
  );
  const showValues = site.showContractValues;
  return {
    eyebrow: dict.nav.experience,
    title: experience.title,
    lead: experience.lead,
    labels: {
      client: experience.client,
      service: experience.service,
      value: experience.value,
      total: experience.total,
    },
    projects: mapProjects(entries, clients, showValues),
    total: showValues ? formatRupiah(totalValue(entries)) : undefined,
    othersTitle: experience.othersTitle,
    others: otherClientIds(clientEntries, entries).map((id) => clients.get(id)!),
  };
}
