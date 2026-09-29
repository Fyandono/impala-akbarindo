import { expect, test } from 'vitest';
import { legalNav, mainNav, sectionHref, sectionIndex } from '../../src/config/navigation';
import { site } from '../../src/config/site';
import { dict } from '../../src/i18n';

test('menu hanya berisi section yang fiturnya aktif', () => {
  for (const item of mainNav) {
    if (item.feature) expect(site.features[item.feature]).toBe(true);
  }
});

test('id section unik', () => {
  const ids = mainNav.map((item) => item.id);
  expect(new Set(ids).size).toBe(ids.length);
});

test('setiap item menu punya label', () => {
  for (const item of [...mainNav, ...legalNav]) expect(dict.nav[item.key]).toBeTruthy();
});

test('sectionHref mengarah ke anchor di beranda', () => {
  expect(sectionHref('contact')).toBe('/#contact');
});

test('sectionIndex berurutan mengikuti menu', () => {
  expect(mainNav.map((item) => sectionIndex(item.id))).toEqual(
    mainNav.map((_, i) => String(i + 1).padStart(2, '0')),
  );
});
