/**
 * Helper murni untuk kontak: link WhatsApp dan email dari form (mailto:).
 * Dipakai loader (build) dan src/scripts/contact-form.ts (browser); tanpa server, tanpa penyimpanan.
 */

/** `+62 813 2121 2110` + teks → `https://wa.me/6281321212110?text=…` */
export function whatsappHref(number: string, text?: string): string {
  const digits = number.replace(/\D/g, '').replace(/^0/, '62');
  return `https://wa.me/${digits}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
}

export type MailTemplate = {
  /** Subjek; `{sender}` diganti instansi atau nama pengirim. */
  subject: string;
  greeting: string;
  intro: string;
  closing: string;
  /** Label baris isi, urut sesuai `fields`. */
  labels: { name: string; organization: string; service: string; message: string };
  /** Pengganti `{sender}` bila instansi & nama kosong. */
  fallbackSender: string;
};

export type MailFields = { name: string; organization: string; service: string; message: string };

/** Susun link `mailto:` berisi subjek & isi pesan dari isian form. */
export function buildMailto(to: string, template: MailTemplate, fields: MailFields): string {
  const f = {
    name: fields.name.trim(),
    organization: fields.organization.trim(),
    service: fields.service.trim(),
    message: fields.message.trim(),
  };
  const sender = f.organization || f.name || template.fallbackSender;
  const lines = (Object.keys(template.labels) as (keyof MailFields)[])
    .filter((key) => f[key])
    .map((key) => `- ${template.labels[key]}: ${f[key]}`);
  const body = [template.greeting, '', template.intro, ...lines, '', template.closing].join('\n');
  const subject = template.subject.replace('{sender}', sender);
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
