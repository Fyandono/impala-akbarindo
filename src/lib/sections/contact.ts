import { getCollection } from 'astro:content';
import type { ContactDetail, ContactSectionProps } from '../../components/sections/ContactSection';
import { site } from '../../config/site';
import { dict } from '../../i18n';
import { whatsappHref, type MailTemplate } from '../contact-form';
import { byOrder, type SectionData } from './shared';

type Contact = {
  phone: string;
  mobile?: { number: string; name?: string };
  email: string;
  address: { street: string; city: string; region: string; postalCode: string };
};
type Social = { name: string; url: string };
type Labels = {
  phone: string;
  mobile: string;
  email: string;
  instagram: string;
  /** Pesan pembuka WhatsApp untuk nomor seluler. */
  whatsappText: string;
};

/** `+62 21 000 0000` → `tel:+62210000000`. */
export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, '')}`;

/** `https://www.instagram.com/nama/` → `@nama`. */
export const instagramHandle = (url: string) =>
  `@${new URL(url).pathname.split('/').filter(Boolean)[0] ?? ''}`;

export function contactDetails(contact: Contact, social: readonly Social[], labels: Labels) {
  const details: ContactDetail[] = [
    { label: labels.phone, value: contact.phone, href: telHref(contact.phone) },
  ];
  if (contact.mobile) {
    const { number, name } = contact.mobile;
    details.push({
      label: labels.mobile,
      value: name ? `${number} (${name})` : number,
      href: whatsappHref(number, labels.whatsappText),
      external: true,
    });
  }
  details.push({ label: labels.email, value: contact.email, href: `mailto:${contact.email}` });
  const instagram = social.find((item) => item.name === 'Instagram');
  if (instagram) {
    details.push({
      label: labels.instagram,
      value: instagramHandle(instagram.url),
      href: instagram.url,
      external: true,
    });
  }
  return details;
}

export function addressLines({ address }: Contact): string[] {
  return [address.street, `${address.city}, ${address.region} ${address.postalCode}`];
}

/** Data form kontak (dirender ContactForm.astro; email disusun di browser, tanpa server). */
export type ContactFormData = {
  email: string;
  strings: Omit<typeof dict.contact.form, 'mail'>;
  mail: MailTemplate;
  services: string[];
};

export async function loadContact(): Promise<
  SectionData<ContactSectionProps> & { form: ContactFormData }
> {
  const { contact } = dict;
  const { mail, ...strings } = contact.form;
  const services = (await getCollection('business')).sort(byOrder).map((s) => s.data.title);
  return {
    eyebrow: dict.nav.contact,
    title: contact.title,
    lead: contact.lead,
    officeTitle: contact.office,
    legalName: site.legalName,
    addressLines: addressLines(site.contact),
    details: contactDetails(site.contact, site.social, contact),
    map: {
      embedUrl: site.contact.mapsEmbedUrl,
      title: contact.mapTitle,
      href: site.contact.mapsUrl,
      label: contact.openMaps,
    },
    opensInNewTabLabel: dict.common.opensInNewTab,
    form: {
      email: site.contact.email,
      strings,
      mail,
      services: [...services, strings.serviceOther],
    },
  };
}
