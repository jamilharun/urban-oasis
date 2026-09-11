#!/usr/bin/env node
/**
 * Image pipeline. Run: npm run images
 *
 * Drop a source file into images-src/<category>/<name>.<png|jpg|jpeg|webp> and
 * this grades it to the house target, writes AVIF + WebP into
 * public/images/<category>/, and regenerates src/data/lqip.js.
 *
 * The grade is the point. Ungraded, a set of generated images arrives with
 * wildly different exposure, colour temperature and saturation — measured on
 * the first batch: brightness 63–146, warmth −2 to +45, saturation 18–50%.
 * That mismatch is the single clearest reason a page reads cheap.
 *
 * Colour temperature and saturation normalise fully, because those are the
 * grade. Exposure only moves 65% of the way, because a night lounge should
 * stay darker than a midday garden — forcing every scene to one brightness
 * flattens the set. Then one shared curve: a gentle S with the black point
 * lifted off zero, so nothing crushes.
 *
 * Categories describe what a plate DEPICTS, not where it is used. A plate
 * reused in four places still shows one thing.
 *   building/   the tower, exterior, arrival
 *   rooms/      interior room plates, reusable across suites
 *   amenities/  pool, gym, lounge, spa, chef's table
 *   people/     hosts, staff, portraits
 *   plans/      floor plans and diagrams
 *
 * Naming: <subject>[-<variant>], lowercase and hyphenated —
 *   rooms/loft.avif, rooms/loft-kitchen.avif, plans/loft.avif
 */
import { execFileSync } from 'node:child_process';
import { readdirSync, mkdirSync, existsSync, writeFileSync, readFileSync, statSync } from 'node:fs';
import { join, resolve, dirname, extname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'images-src');
const OUT = join(ROOT, 'public', 'images');
const CATEGORIES = ['building', 'rooms', 'amenities', 'people', 'plans'];

const TARGET_L = 105, TARGET_WARM = 18, TARGET_SAT = 27;
const L_BLEND = 0.65;                 // how far exposure moves toward the target
const GENTLE = { plans: 0.40 };       // a blueprint may stay cool and technical
const AVIF_Q = 65, WEBP_Q = 82, LQIP_PX = 20;

const sh = (args) => execFileSync('magick', args, { encoding: 'utf8' }).trim();
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

function measure(file) {
  const [r, g, b] = sh([file, '-resize', '1x1!', '-format',
    '%[fx:255*r] %[fx:255*g] %[fx:255*b]', 'info:']).split(' ').map(Number);
  const sat = Number(sh([file, '-colorspace', 'HSL', '-resize', '1x1!', '-format', '%[fx:100*g]', 'info:']));
  return { r, g, b, sat, L: (r + g + b) / 3 };
}

const gammaFor = (cur, tgt) =>
  clamp(Math.log(clamp(cur, 2, 253) / 255) / Math.log(clamp(tgt, 2, 253) / 255), 0.72, 1.38);

function grade(file, blend) {
  const first = measure(file);
  const goalL = first.L + blend * (TARGET_L - first.L);
  const goalWarm = blend < 1 && blend !== L_BLEND
    ? (first.r - first.b) + blend * (TARGET_WARM - (first.r - first.b))
    : TARGET_WARM;
  const goalSat = blend === L_BLEND ? TARGET_SAT : first.sat + blend * (TARGET_SAT - first.sat);

  for (let i = 0; i < 3; i++) {
    const m = measure(file);
    const d = (goalWarm - (m.r - m.b)) / 2;
    sh([file,
      '-gamma', gammaFor(m.L, goalL).toFixed(4),
      '-modulate', `100,${clamp((goalSat / Math.max(m.sat, 1)) * 100, 62, 142).toFixed(1)},100`,
      '-channel', 'R', '-gamma', gammaFor(m.r, m.r + d).toFixed(4), '+channel',
      '-channel', 'B', '-gamma', gammaFor(m.b, m.b - d).toFixed(4), '+channel',
      file]);
  }
  sh([file, '-sigmoidal-contrast', '2.5,50%', '+level', '3%,99%', file]);
  return { before: first, after: measure(file) };
}

// ---------------------------------------------------------------------------

for (const c of CATEGORIES) mkdirSync(join(SRC, c), { recursive: true });

const pending = [];
for (const cat of CATEGORIES) {
  const dir = join(SRC, cat);
  for (const f of readdirSync(dir)) {
    if (!/\.(png|jpe?g|webp|tiff?)$/i.test(f)) continue;
    pending.push({ cat, file: join(dir, f), name: basename(f, extname(f)).toLowerCase() });
  }
}

if (pending.length === 0) {
  console.log('No new sources in images-src/. Regenerating placeholders only.\n');
} else {
  console.log(`Processing ${pending.length} new image(s)\n`);
  for (const { cat, file, name } of pending) {
    mkdirSync(join(OUT, cat), { recursive: true });
    const work = join(OUT, cat, `${name}.__work.png`);
    sh([file, work]);
    const { before, after } = grade(work, GENTLE[cat] ?? L_BLEND);
    sh([work, '-quality', String(AVIF_Q), join(OUT, cat, `${name}.avif`)]);
    sh([work, '-quality', String(WEBP_Q), join(OUT, cat, `${name}.webp`)]);
    execFileSync('rm', [work]);
    const kb = (p) => (statSync(p).size / 1024).toFixed(0);
    console.log(
      `  ${(cat + '/' + name).padEnd(26)}` +
      `L ${before.L.toFixed(0)}->${after.L.toFixed(0)}  ` +
      `warm ${(before.r - before.b).toFixed(0)}->${(after.r - after.b).toFixed(0)}  ` +
      `sat ${before.sat.toFixed(0)}->${after.sat.toFixed(0)}   ` +
      `${kb(join(OUT, cat, name + '.avif'))}KB avif / ${kb(join(OUT, cat, name + '.webp'))}KB webp`);
    execFileSync('rm', [file]);   // consumed
  }
  console.log();
}

// --- Placeholders ----------------------------------------------------------
const entries = [];
for (const cat of CATEGORIES) {
  const dir = join(OUT, cat);
  if (!existsSync(dir)) continue;
  for (const f of readdirSync(dir).filter((x) => x.endsWith('.avif')).sort()) {
    const name = basename(f, '.avif');
    const tmp = join(dir, `${name}.__lqip.jpg`);
    sh([join(dir, f), '-resize', `${LQIP_PX}x${LQIP_PX}!`, '-blur', '0x1.2', '-quality', '40', tmp]);
    const b64 = readFileSync(tmp).toString('base64');
    execFileSync('rm', [tmp]);
    entries.push(`  '/images/${cat}/${name}': 'data:image/jpeg;base64,${b64}',`);
  }
}

writeFileSync(join(ROOT, 'src', 'data', 'lqip.js'),
`// GENERATED by scripts/images.mjs — do not edit by hand.
//
// A ${LQIP_PX}px blurred JPEG per plate, inlined so it needs no request. These are
// painted as the <img>'s own background, not a wrapper element, so nothing is
// added to the layout — a wrapper would break the plates that rely on
// object-cover inside a sized parent. Spatially registered with the real
// image, so it reads as resolving rather than popping in.
export const lqip = {
${entries.join('\n')}
};
`);

const bytes = entries.reduce((n, e) => n + e.length, 0);
console.log(`lqip.js: ${entries.length} placeholders, ${(bytes / 1024).toFixed(1)} KB total`);
