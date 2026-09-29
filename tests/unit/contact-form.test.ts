import { describe, expect, test } from 'vitest';
import { buildMailto, whatsappHref } from '../../src/lib/contact-form';

describe('whatsappHref', () => {
  test('format internasional dan lokal (0…) menjadi 62…', () => {
    expect(whatsappHref('+62 813 2121 2110')).toBe('https://wa.me/6281321212110');
    expect(whatsappHref('0813-2121-2110')).toBe('https://wa.me/6281321212110');
  });

  test('menyertakan pesan pembuka ter-encode', () => {
    expect(whatsappHref('+62 813 2121 2110', 'Halo PT & kawan')).toBe(
      'https://wa.me/6281321212110?text=Halo%20PT%20%26%20kawan',
    );
  });
});

describe('buildMailto', () => {
  const template = {
    subject: 'Permintaan Penawaran - {sender}',
    greeting: 'Halo,',
    intro: 'Kebutuhan:',
    closing: 'Terima kasih.',
    labels: { name: 'Nama', organization: 'Instansi', service: 'Layanan', message: 'Catatan' },
    fallbackSender: 'Calon Mitra',
  };
  const decode = (url: string) => {
    const [to, query] = url.replace(/^mailto:/, '').split('?');
    const params = new URLSearchParams(query);
    return { to, subject: params.get('subject'), body: params.get('body') };
  };

  test('subjek memakai instansi, isi hanya baris yang terisi', () => {
    const mail = decode(
      buildMailto('kantor@example.com', template, {
        name: ' Budi ',
        organization: 'Dinas A',
        service: 'Jasa Kebersihan',
        message: '',
      }),
    );
    expect(mail.to).toBe('kantor@example.com');
    expect(mail.subject).toBe('Permintaan Penawaran - Dinas A');
    expect(mail.body).toBe(
      'Halo,\n\nKebutuhan:\n- Nama: Budi\n- Instansi: Dinas A\n- Layanan: Jasa Kebersihan\n\nTerima kasih.',
    );
  });

  test('subjek jatuh ke nama lalu fallback', () => {
    const empty = { name: '', organization: '', service: '', message: '' };
    expect(decode(buildMailto('a@b.c', template, { ...empty, name: 'Budi' })).subject).toBe(
      'Permintaan Penawaran - Budi',
    );
    expect(decode(buildMailto('a@b.c', template, empty)).subject).toBe(
      'Permintaan Penawaran - Calon Mitra',
    );
  });
});
