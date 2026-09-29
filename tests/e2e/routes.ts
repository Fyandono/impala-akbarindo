import { readdirSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = join(process.cwd(), 'dist');

function walk(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return entry.name === '_astro' ? [] : walk(path);
    return entry.name.endsWith('.html') ? [path] : [];
  });
}

/** Semua halaman hasil build (kecuali 404), mis. `/` dan `/privacy`. */
export const routes = walk(DIST)
  .map((file) => `/${relative(DIST, file).replace(/\.html$/, '')}`.replace(/^\/index$/, '/'))
  .filter((route) => route !== '/404')
  .sort();

export const routeSet = new Set(routes);
