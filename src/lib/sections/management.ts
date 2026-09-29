import { getCollection, type CollectionEntry } from 'astro:content';
import type {
  ManagementGroup,
  ManagementSectionProps,
} from '../../components/sections/ManagementSection';
import { dict } from '../../i18n';
import { responsiveImage } from '../image';
import { byOrder, type SectionData } from './shared';

type Person = ManagementGroup['people'][number];
type Entry = CollectionEntry<'management'>;

/** Ubah entri koleksi `management` menjadi props polos untuk PersonCard. */
export async function personCardProps(entry: Pick<Entry, 'data'>): Promise<Person> {
  const { data } = entry;
  return {
    name: data.name,
    position: data.position,
    bio: data.bio,
    photo: await responsiveImage(
      data.photo,
      data.name,
      '(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw',
      [240, 480],
    ),
  };
}

/** Kelompokkan entri per `group` sesuai urutan `groups`, masing-masing diurutkan `order`. */
export function groupPeople<T extends Pick<Entry, 'data'>>(
  entries: T[],
  groups: readonly { key: Entry['data']['group']; title: string }[],
): { title: string; entries: T[] }[] {
  return groups.map((group) => ({
    title: group.title,
    entries: entries.filter((e) => e.data.group === group.key).sort(byOrder),
  }));
}

export async function loadManagement(): Promise<SectionData<ManagementSectionProps>> {
  const { management } = dict;
  const groups = groupPeople(await getCollection('management'), [
    { key: 'commissioner', title: management.commissioners },
    { key: 'director', title: management.directors },
    { key: 'manager', title: management.managers },
    { key: 'division', title: management.divisions },
    { key: 'staff', title: management.staff },
  ]);
  return {
    eyebrow: dict.nav.management,
    title: management.title,
    viewProfileLabel: management.viewProfile,
    groups: await Promise.all(
      groups
        .filter((group) => group.entries.length > 0)
        .map(async (group) => ({
          title: group.title,
          people: await Promise.all(group.entries.map((e) => personCardProps(e))),
        })),
    ),
  };
}
