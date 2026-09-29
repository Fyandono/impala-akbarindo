/** Form kontak → buka aplikasi email dengan subjek & isi pesan yang sudah tersusun (mailto:). */
import { buildMailto, type MailTemplate } from '../lib/contact-form';

document.querySelectorAll<HTMLFormElement>('[data-contact-form]').forEach((form) => {
  const email = form.dataset.email ?? '';
  const template = JSON.parse(form.dataset.mail ?? '{}') as MailTemplate;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const value = (key: string) => String(data.get(key) ?? '');
    window.location.href = buildMailto(email, template, {
      name: value('name'),
      organization: value('organization'),
      service: value('service'),
      message: value('message'),
    });
  });
});
