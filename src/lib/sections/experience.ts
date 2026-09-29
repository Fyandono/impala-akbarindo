import { getCollection, type CollectionEntry } from 'astro:content';
import type {
  ClientItem,
  ExperienceSectionProps,
  ProjectRow,
} from '../../components/sections/ExperienceSection';
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

/** Baris kontrak urut `order`; nilai kontrak hanya disertakan bila `showValues`. */
export function mapProjects(entries: Entry[], showValues: boolean): ProjectRow[] {
  return [...entries].sort(byOrder).map(({ data }) => ({
    client: data.client,
    service: data.service,
    ...(showValues && { value: formatRupiah(data.value) }),
  }));
}

export const totalValue = (entries: Entry[]) =>
  entries.reduce((sum, { data }) => sum + data.value, 0);

/** Klien untuk strip logo, urut `order`; logo dioptimasi bila ada. */
export async function loadClients(): Promise<ClientItem[]> {
  const entries = (await getCollection('clients')).sort(byOrder);
  return Promise.all(
    entries.map(async ({ data }) => ({
      name: data.name,
      logo: data.logo && (await responsiveImage(data.logo, data.name, '160px', [160, 320])),
    })),
  );
}

export async function loadExperience(): Promise<SectionData<ExperienceSectionProps>> {
  const { experience } = dict;
  const entries = await getCollection('projects');
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
    projects: mapProjects(entries, showValues),
    total: showValues ? formatRupiah(totalValue(entries)) : undefined,
    clientsTitle: experience.othersTitle,
    clients: await loadClients(),
  };
}
