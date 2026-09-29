import Button from '../ui/Button';
import Section from '../ui/Section';
import SectionHeading from '../ui/SectionHeading';

export type ContactDetail = {
  label: string;
  value: string;
  /** Mis. `tel:+62…` atau `mailto:…`. */
  href?: string;
  /** Link ke situs lain (dibuka di tab baru). */
  external?: boolean;
};

export type ContactSectionProps = {
  /** Anchor untuk navigasi one-page. */
  id?: string;
  /** id judul untuk `aria-labelledby`; unik per halaman. Default: `${id}-title`. */
  titleId?: string;
  index?: string;
  eyebrow: string;
  title: string;
  lead?: string;
  officeTitle: string;
  legalName: string;
  addressLines: string[];
  details: ContactDetail[];
  /** Peta tertanam (iframe Google Maps) + link untuk membuka di aplikasi peta. */
  map: { embedUrl: string; title: string; href: string; label: string };
  /** Teks tersembunyi untuk link yang membuka tab baru. */
  opensInNewTabLabel: string;
};

/** Kontak kantor: alamat, telepon/email/sosial, dan peta tertanam. Tanpa form. */
export default function ContactSection({
  id,
  titleId = `${id ?? 'contact'}-title`,
  index,
  eyebrow,
  title,
  lead,
  officeTitle,
  legalName,
  addressLines,
  details,
  map,
  opensInNewTabLabel,
}: ContactSectionProps) {
  return (
    <Section
      id={id}
      labelledBy={titleId}
      className="border-t border-neutral-200"
      containerClassName="grid gap-12 lg:grid-cols-12"
    >
      <div className="lg:col-span-5">
        <SectionHeading id={titleId} index={index} eyebrow={eyebrow} title={title} lead={lead} />
        <div data-reveal>
          <h3 className="mt-12 text-title">{officeTitle}</h3>
          <address className="mt-4 text-body-lg leading-relaxed text-neutral-600 not-italic">
            <strong className="block text-primary-900">{legalName}</strong>
            {addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>

          <dl className="mt-10 divide-y divide-neutral-200 border-y border-neutral-200">
            {details.map((detail) => (
              <div key={detail.label} className="grid gap-1 py-5 sm:grid-cols-3">
                <dt className="text-small font-semibold text-neutral-500">{detail.label}</dt>
                <dd className="sm:col-span-2">
                  {detail.href ? (
                    <a
                      href={detail.href}
                      className="break-all text-primary-700 hover:underline"
                      {...(detail.external && { target: '_blank', rel: 'noopener noreferrer' })}
                    >
                      {detail.value}
                      {detail.external && <span className="sr-only"> {opensInNewTabLabel}</span>}
                    </a>
                  ) : (
                    detail.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="lg:col-span-6 lg:col-start-7 lg:pt-16" data-reveal="scale">
        <div className="aspect-square overflow-hidden rounded-card border border-neutral-200 bg-neutral-100 sm:aspect-landscape lg:aspect-square">
          <iframe
            src={map.embedUrl}
            title={map.title}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="size-full border-0"
          />
        </div>
        <Button
          href={map.href}
          variant="secondary"
          className="mt-6"
          target="_blank"
          rel="noopener noreferrer"
        >
          {map.label}
          <span className="sr-only">{opensInNewTabLabel}</span>
        </Button>
      </div>
    </Section>
  );
}
