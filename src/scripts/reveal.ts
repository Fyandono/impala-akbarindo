/**
 * Reveal on scroll tanpa library: elemen [data-reveal] mendapat class `is-revealed` saat masuk
 * viewport (sekali saja). Anak dari [data-reveal-group] muncul bergiliran.
 * Sengaja dipisah dari animations.ts (motion) agar teks tidak menunggu library dimuat.
 */
const root = document.documentElement;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reducedMotion && 'IntersectionObserver' in window) {
  document.querySelectorAll<HTMLElement>('[data-reveal-group]').forEach((group) => {
    group
      .querySelectorAll<HTMLElement>(':scope > * > [data-reveal], :scope > [data-reveal]')
      .forEach((el, i) => el.style.setProperty('--reveal-delay', `${Math.min(i * 90, 540)}ms`));
  });

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        // Juga tampilkan elemen yang sudah terlewat (mis. lompat ke section lewat menu).
        if (!entry.isIntersecting && entry.boundingClientRect.top > 0) continue;
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px' },
  );
  document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));
}

root.classList.add('anim-ready');
