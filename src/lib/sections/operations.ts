import { getCollection, type CollectionEntry } from 'astro:content';
import type {
  OperationTrack,
  OperationsSectionProps,
} from '../../components/sections/OperationsSection';
import { dict } from '../../i18n';
import { loadBackdrop } from './backdrops';
import { byOrder, type SectionData } from './shared';

export function mapOperations(
  entries: Pick<CollectionEntry<'operations'>, 'data'>[],
): OperationTrack[] {
  return [...entries].sort(byOrder).map(({ data }) => ({
    title: data.title,
    goals: [...data.goals],
    routines: data.routines.map(({ frequency, description }) => ({ frequency, description })),
  }));
}

export async function loadOperations(): Promise<SectionData<OperationsSectionProps>> {
  const { operations } = dict;
  return {
    eyebrow: dict.nav.operations,
    title: operations.title,
    lead: operations.lead,
    goalsTitle: operations.goalsTitle,
    routinesTitle: operations.routinesTitle,
    tracks: mapOperations(await getCollection('operations')),
    backdrop: await loadBackdrop('operations'),
  };
}
