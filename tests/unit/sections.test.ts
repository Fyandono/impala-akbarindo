import { describe, expect, test } from 'vitest';
import { mapValues } from '../../src/lib/sections/about';
import {
  addressLines,
  contactDetails,
  instagramHandle,
  telHref,
} from '../../src/lib/sections/contact';
import {
  formatRupiah,
  mapProjects,
  otherClientIds,
  totalValue,
} from '../../src/lib/sections/experience';
import { mapCredentials } from '../../src/lib/sections/legality';
import { groupPeople } from '../../src/lib/sections/management';
import { latestNews } from '../../src/lib/sections/news';
import { mapOperations } from '../../src/lib/sections/operations';
import { byOrder } from '../../src/lib/sections/shared';

describe('about', () => {
  test('mapValues urut berdasarkan order', () => {
    const values = [
      { data: { order: 2, title: 'B', description: 'b' } },
      { data: { order: 1, title: 'A', description: 'a' } },
    ];
    expect(mapValues(values).map((v) => v.title)).toEqual(['A', 'B']);
  });
});

describe('management', () => {
  test('groupPeople mengelompokkan sesuai urutan grup dan mengurutkan order', () => {
    const people = [
      { data: { group: 'director', order: 11, name: 'D2' } },
      { data: { group: 'commissioner', order: 1, name: 'K1' } },
      { data: { group: 'director', order: 10, name: 'D1' } },
    ] as const;
    const groups = groupPeople([...people] as never[], [
      { key: 'commissioner', title: 'Komisaris' },
      { key: 'director', title: 'Direksi' },
    ]) as unknown as { title: string; entries: (typeof people)[number][] }[];
    expect(groups.map((g) => [g.title, g.entries.map((e) => e.data.name)])).toEqual([
      ['Komisaris', ['K1']],
      ['Direksi', ['D1', 'D2']],
    ]);
  });
});

describe('news', () => {
  const entry = (id: string, date: string, draft = false) =>
    ({ id, data: { date: new Date(date), draft } }) as never;

  test('latestNews: tanpa draft, terbaru dulu, dibatasi', () => {
    const entries = [
      entry('lama', '2026-01-01'),
      entry('baru', '2026-05-01'),
      entry('draf', '2026-07-01', true),
      entry('tengah', '2026-03-01'),
    ];
    const result = latestNews(entries, 2) as unknown as { id: string }[];
    expect(result.map((e) => e.id)).toEqual(['baru', 'tengah']);
  });
});

describe('operations', () => {
  test('mapOperations urut order dan menyalin tujuan & rutinitas', () => {
    const entries = [
      {
        data: {
          order: 2,
          title: 'Keamanan',
          goals: ['Aman'],
          routines: [{ frequency: 'Harian', description: 'Patroli' }],
        },
      },
      { data: { order: 1, title: 'Kebersihan', goals: ['Bersih'], routines: [] } },
    ];
    expect(mapOperations(entries)).toEqual([
      { title: 'Kebersihan', goals: ['Bersih'], routines: [] },
      {
        title: 'Keamanan',
        goals: ['Aman'],
        routines: [{ frequency: 'Harian', description: 'Patroli' }],
      },
    ]);
  });
});

describe('experience', () => {
  const ref = (id: string) => ({ collection: 'clients' as const, id });
  const projects = [
    { data: { order: 2, client: ref('b'), service: 'Keamanan', value: 1_500_000 } },
    { data: { order: 1, client: ref('a'), service: 'Kebersihan', value: 9_769_380_280 } },
  ];
  const logo = { src: '/a.png', alt: '', width: 10, height: 10 };
  const clients = new Map([
    ['a', { name: 'Klien A', logo }],
    ['b', { name: 'Klien B' }],
  ]);

  test('formatRupiah memakai format Indonesia', () => {
    expect(formatRupiah(9_769_380_280)).toBe('Rp 9.769.380.280');
  });

  test('mapProjects urut order, memakai nama & logo klien, dan memformat nilai', () => {
    expect(mapProjects(projects, clients, true)).toEqual([
      { client: 'Klien A', logo, service: 'Kebersihan', value: 'Rp 9.769.380.280' },
      { client: 'Klien B', logo: undefined, service: 'Keamanan', value: 'Rp 1.500.000' },
    ]);
  });

  test('mapProjects tanpa nilai kontrak bila disembunyikan', () => {
    expect(mapProjects(projects, clients, false).map((p) => p.value)).toEqual([
      undefined,
      undefined,
    ]);
  });

  test('mapProjects gagal jelas bila klien tidak ada', () => {
    expect(() => mapProjects(projects, new Map(), false)).toThrow(/clients\.yaml/);
  });

  test('totalValue menjumlahkan nilai kontrak', () => {
    expect(totalValue(projects)).toBe(9_770_880_280);
  });

  test('otherClientIds hanya klien tanpa baris kontrak, urut order', () => {
    const all = [
      { id: 'c', data: { order: 3, name: 'Klien C' } },
      { id: 'a', data: { order: 1, name: 'Klien A' } },
      { id: 'd', data: { order: 2, name: 'Klien D' } },
    ];
    expect(otherClientIds(all, projects)).toEqual(['d', 'c']);
  });
});

describe('legality', () => {
  test('mapCredentials memfilter grup dan mengurutkan order', () => {
    const entries = [
      { data: { group: 'permit', order: 1, title: 'NIB', description: 'n', number: '123' } },
      {
        data: {
          group: 'certification',
          order: 2,
          code: 'ISO 45001',
          title: 'K3',
          description: 'k',
        },
      },
      {
        data: {
          group: 'certification',
          order: 1,
          code: 'ISO 9001',
          title: 'Mutu',
          description: 'm',
        },
      },
    ] as const;
    expect(mapCredentials([...entries], 'certification').map((c) => c.code)).toEqual([
      'ISO 9001',
      'ISO 45001',
    ]);
    expect(mapCredentials([...entries], 'permit')).toEqual([
      {
        code: undefined,
        number: '123',
        title: 'NIB',
        description: 'n',
        preview: undefined,
        fileHref: undefined,
      },
    ]);
  });
});

describe('contact', () => {
  const contact = {
    phone: '+62 22 8202 7114',
    mobile: { number: '+62 813 2121 2110', name: 'Agung' },
    email: 'info@example.co.id',
    address: { street: 'Jl. Setrasari 1', city: 'Bandung', region: 'Jabar', postalCode: '40152' },
  };
  const labels = {
    phone: 'Phone',
    mobile: 'WhatsApp',
    email: 'Email',
    instagram: 'Instagram',
    whatsappText: 'Halo',
  };

  test('telHref hanya menyisakan angka dan +', () => {
    expect(telHref('+62 (21) 000-0000')).toBe('tel:+62210000000');
  });

  test('instagramHandle', () => {
    expect(instagramHandle('https://www.instagram.com/impalaakbarindo/')).toBe('@impalaakbarindo');
  });

  test('contactDetails', () => {
    const social = [{ name: 'Instagram', url: 'https://www.instagram.com/contoh/' }];
    expect(contactDetails(contact, social, labels)).toEqual([
      { label: 'Phone', value: '+62 22 8202 7114', href: 'tel:+622282027114' },
      {
        label: 'WhatsApp',
        value: '+62 813 2121 2110 (Agung)',
        href: 'https://wa.me/6281321212110?text=Halo',
        external: true,
      },
      { label: 'Email', value: 'info@example.co.id', href: 'mailto:info@example.co.id' },
      {
        label: 'Instagram',
        value: '@contoh',
        href: 'https://www.instagram.com/contoh/',
        external: true,
      },
    ]);
  });

  test('contactDetails tanpa seluler & Instagram', () => {
    const withoutMobile = { ...contact, mobile: undefined };
    expect(contactDetails(withoutMobile, [], labels).map((d) => d.label)).toEqual([
      'Phone',
      'Email',
    ]);
  });

  test('addressLines', () => {
    expect(addressLines(contact)).toEqual(['Jl. Setrasari 1', 'Bandung, Jabar 40152']);
  });
});

test('byOrder', () => {
  expect([{ data: { order: 3 } }, { data: { order: 1 } }].sort(byOrder)).toEqual([
    { data: { order: 1 } },
    { data: { order: 3 } },
  ]);
});
