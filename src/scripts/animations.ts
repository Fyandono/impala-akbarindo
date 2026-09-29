import { animate, inView, scroll } from 'motion';

const root = document.documentElement;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/*
 * Animasi yang butuh library `motion`: counter angka dan parallax.
 * Reveal on scroll ada di reveal.ts (tanpa library) agar teks tidak menunggu modul ini dimuat.
 */

/** Angka berhitung naik: <span data-counter="50">50</span> */
function initCounters() {
  inView('[data-counter]', (el) => {
    const target = Number(el.getAttribute('data-counter'));
    if (!Number.isFinite(target)) return;
    const format = new Intl.NumberFormat(root.lang || 'id');
    animate(0, target, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (value) => {
        el.textContent = format.format(Math.round(value));
      },
    });
  });
}

/**
 * Parallax halus: <div data-parallax> bergeser 10% (atau nilai `data-parallax`, mis. "-15")
 * selama section induknya di-scroll.
 */
function initParallax() {
  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    const section = el.closest('section') ?? el;
    const shift = Number(el.dataset.parallax) || 10;
    scroll(
      animate(el, { transform: ['translateY(0%)', `translateY(${shift}%)`] }, { ease: 'linear' }),
      { target: section, offset: ['start start', 'end start'] },
    );
  });
}

if (!reducedMotion) {
  initCounters();
  initParallax();
}
