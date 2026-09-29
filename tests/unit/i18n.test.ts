import { expect, test } from 'vitest';
import id from '../../src/i18n/id.json';
import { formatDate } from '../../src/i18n';

/** Semua path key, mis. "about.mission[3]". */
function paths(value: unknown, path = ''): string[] {
  if (Array.isArray(value)) return value.flatMap((item, i) => paths(item, `${path}[${i}]`));
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, child]) =>
      paths(child, path ? `${path}.${key}` : key),
    );
  }
  return value ? [] : [path];
}

test('kamus tidak berisi teks kosong', () => {
  expect(paths(id)).toEqual([]);
});

test('formatDate memakai format Indonesia', () => {
  expect(formatDate(new Date('2026-09-29T00:00:00Z'))).toBe('29 September 2026');
});
