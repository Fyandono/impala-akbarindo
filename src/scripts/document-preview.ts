/**
 * Pratinjau dokumen legalitas: link `data-document-preview` membuka gambar dokumennya di <dialog>
 * (DocumentPreview.astro). Tanpa JS — atau saat diklik dengan Ctrl/Cmd — link tetap membuka
 * berkasnya di tab baru.
 */
const dialog = document.querySelector<HTMLDialogElement>('[data-document-dialog]');
const image = dialog?.querySelector<HTMLImageElement>('[data-dialog-image]');
const title = dialog?.querySelector<HTMLElement>('[data-dialog-title]');
const file = dialog?.querySelector<HTMLAnchorElement>('[data-dialog-file]');

if (dialog && image && title && file) {
  document.addEventListener('click', (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const trigger = (event.target as Element).closest<HTMLAnchorElement>('[data-document-preview]');
    if (!trigger) return;
    event.preventDefault();

    const { documentPreview, documentTitle = '', documentFile } = trigger.dataset;
    image.src = documentPreview!;
    image.alt = documentTitle;
    title.textContent = documentTitle;
    file.hidden = !documentFile;
    if (documentFile) file.href = documentFile;
    dialog.showModal();
    dialog.scrollTop = 0;
  });

  dialog.querySelector('[data-dialog-close]')?.addEventListener('click', () => dialog.close());
  // Tutup saat klik area gelap di luar dokumen.
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
}

export {};
