// Reads photos from /gallery, makes web-sized copies in data/img, and writes data/gallery.json.
// Runs automatically on every push (see .github/workflows/pages.yml).
// Manual run:  node scripts/build-gallery.mjs
import { readdirSync, statSync, mkdirSync, writeFileSync, copyFileSync, existsSync, rmSync } from 'node:fs';
import { join, extname, basename, dirname, relative, sep } from 'node:path';
import { execFileSync } from 'node:child_process';

const DIR = 'gallery';
const IMG = 'data/img';
const OUT = 'data/gallery.json';
// every common photo format; capital letters (.JPG, .PNG) work too
const TYPES = new Set(['.jpg', '.jpeg', '.jpe', '.jfif', '.png', '.webp', '.gif', '.avif', '.tif', '.tiff', '.bmp', '.svg', '.heic', '.heif']);
// formats browsers can show as they are, if resizing is not possible
const COPY_OK = new Set(['.jpg', '.jpeg', '.jpe', '.jfif', '.png', '.webp', '.gif', '.avif', '.bmp', '.svg']);

let sharp = null;
try {
  sharp = (await import('sharp')).default;
} catch {
  console.log('sharp not available: using the original photos as they are');
}

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    if (e.name.startsWith('.')) return [];
    const p = join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });
}

const pretty = (s) => {
  s = s.replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim();
  return s.charAt(0).toUpperCase() + s.slice(1);
};
// "01-cold-room.jpg" -> "Cold room" (the number only controls the order)
const titleOf = (name) => pretty(name.replace(/^\d+[\s._-]+/, '') || name);

function updated(file, st) {
  try {
    const d = execFileSync('git', ['log', '-1', '--format=%cI', '--', file], { encoding: 'utf8' }).trim();
    if (d) return d;
  } catch {}
  return st.mtime.toISOString();
}

rmSync(IMG, { recursive: true, force: true });

const files = existsSync(DIR)
  ? walk(DIR)
      .filter((f) => TYPES.has(extname(f).toLowerCase()))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  : [];

const items = [];
for (const f of files) {
  const parts = relative(DIR, f).split(sep);
  const rel = parts.join('/');
  const st = statSync(f);
  const ext = extname(f).toLowerCase();
  let full = `${IMG}/full/${rel}`;
  let thumb = full;
  let done = false;
  mkdirSync(dirname(full), { recursive: true });

  if (sharp && ext !== '.svg') {
    try {
      const still = ext !== '.gif'; // animated GIFs keep their animation, so no auto-rotate
      const open = (animated) => {
        const img = sharp(f, { animated });
        return still ? img.rotate() : img;
      };
      const bigOut = `${IMG}/full/${rel}.webp`;
      const smallOut = `${IMG}/thumb/${rel}.webp`;
      mkdirSync(dirname(smallOut), { recursive: true });
      await open(!still).resize({ width: 1800, withoutEnlargement: true }).webp({ quality: 80 }).toFile(bigOut);
      await open(false).resize({ width: 800, withoutEnlargement: true }).webp({ quality: 72 }).toFile(smallOut);
      full = bigOut;
      thumb = smallOut;
      done = true;
    } catch (err) {
      console.log(`could not resize ${rel}: ${err.message}`);
    }
  }

  if (!done) {
    if (!COPY_OK.has(ext)) {
      console.log(`skipped ${rel}: this format cannot be shown on a website. Save it as JPG or PNG and upload again.`);
      continue;
    }
    copyFileSync(f, full);
  }

  items.push({
    title: titleOf(basename(f, extname(f))),
    category: parts.length > 1 ? pretty(parts[0]) : '',
    thumb,
    full,
    updated: updated(f, st),
  });
}

mkdirSync('data', { recursive: true });
writeFileSync(OUT, JSON.stringify({ generated: new Date().toISOString(), items }, null, 2));
console.log(`gallery.json: ${items.length} photo(s)${sharp ? ' (resized)' : ''}`);
