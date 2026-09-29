import { getCollection, type CollectionEntry } from 'astro:content';
import type { AboutIntroProps } from '../../components/sections/AboutIntro';
import type { StatsBandProps } from '../../components/sections/StatsBand';
import type { ValueItem, ValuesGridProps } from '../../components/sections/ValuesGrid';
import type { VisionMissionProps } from '../../components/sections/VisionMission';
import { site } from '../../config/site';
import { dict, lang } from '../../i18n';
import { byOrder, type SectionData } from './shared';

export function mapValues(entries: Pick<CollectionEntry<'values'>, 'data'>[]): ValueItem[] {
  return [...entries]
    .sort(byOrder)
    .map(({ data }) => ({ title: data.title, description: data.description }));
}

/** Semua props untuk rangkaian section "Tentang Kami". */
export async function loadAbout() {
  const { about, home } = dict;
  return {
    intro: {
      eyebrow: dict.nav.about,
      title: about.title,
      lead: about.lead,
      body: about.body,
    } satisfies SectionData<AboutIntroProps>,
    stats: {
      title: home.statsTitle,
      note: home.statsNote,
      stats: [...site.stats],
      locale: lang,
    } satisfies SectionData<StatsBandProps>,
    visionMission: {
      visionTitle: about.visionTitle,
      vision: about.vision,
      missionTitle: about.missionTitle,
      mission: about.mission,
    } satisfies SectionData<VisionMissionProps>,
    values: {
      eyebrow: about.valuesEyebrow,
      title: about.valuesTitle,
      values: mapValues(await getCollection('values')),
    } satisfies SectionData<ValuesGridProps>,
  };
}
