/**
 * Audita todas las páginas con Lighthouse en modo móvil, sobre el build real.
 *
 *   npm run build && npm run preview     (en otra terminal, puerto 4321)
 *   npm run lighthouse
 *
 * Variables opcionales:
 *   BASE=http://localhost:4321   URL del servidor de preview
 *   CHROME_PATH=…                ruta a Chrome/Brave/Chromium si no lo encuentra
 */
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

const BASE = process.env.BASE ?? 'http://localhost:4321';
const RUTAS = [
  '/',
  '/placas-de-marmol/',
  '/placas-con-fotografia/',
  '/placas-de-aluminio/',
  '/cruces-de-metal/',
  '/floreros-y-flores/',
  '/trabajos/',
  '/como-pedir/',
  '/contacto/',
];

const dir = mkdtempSync(path.join(tmpdir(), 'lh-'));
const filas = [];

for (const ruta of RUTAS) {
  const salida = path.join(dir, ruta.replace(/\//g, '_') + '.json');
  execFileSync(
    'npx',
    [
      'lighthouse',
      BASE + ruta,
      '--quiet',
      '--chrome-flags=--headless=new --no-sandbox',
      '--output=json',
      `--output-path=${salida}`,
    ],
    { stdio: 'ignore' }
  );
  const d = JSON.parse(readFileSync(salida, 'utf8'));
  const p = (k) => Math.round(d.categories[k].score * 100);
  filas.push({
    ruta,
    Rendimiento: p('performance'),
    Accesibilidad: p('accessibility'),
    'Buenas prácticas': p('best-practices'),
    SEO: p('seo'),
    LCP: d.audits['largest-contentful-paint'].displayValue,
    CLS: d.audits['cumulative-layout-shift'].displayValue,
    TBT: d.audits['total-blocking-time'].displayValue,
  });
  console.log(`✔ ${ruta}`);
}

console.table(filas);
rmSync(dir, { recursive: true, force: true });
