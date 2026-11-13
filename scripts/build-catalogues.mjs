// Scans /catalogues and writes data/catalogues.json for the Products page.
// Runs automatically on every push (see .github/workflows/pages.yml).
// Manual run:  node scripts/build-catalogues.mjs
import { readdirSync, statSync, mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { join, extname, basename, relative, sep } from 'node:path';
import { execFileSync } from 'node:child_process';

const DIR = 'catalogues';
const OUT = 'data/catalogues.json';
const TYPES = new Set(['.pdf', '.xlsx', '.xls', '.docx', '.doc']);

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

function updated(file, st) {
  try {
    const d = execFileSync('git', ['log', '-1', '--format=%cI', '--', file], { encoding: 'utf8' }).trim();
    if (d) return d;
  } catch {}
  return st.mtime.toISOString();
}

const items = existsSync(DIR)
  ? walk(DIR)
      .filter((f) => TYPES.has(extname(f).toLowerCase()))
      .map((f) => {
        const parts = relative(DIR, f).split(sep);
        const st = statSync(f);
        return {
          title: pretty(basename(f, extname(f))),
          category: parts.length > 1 ? pretty(parts[0]) : '',
          file: [DIR, ...parts].join('/'),
          type: extname(f).slice(1).toUpperCase(),
          size: st.size,
          updated: updated(f, st),
        };
      })
      .sort((a, b) => a.category.localeCompare(b.category) || b.updated.localeCompare(a.updated))
  : [];

mkdirSync('data', { recursive: true });
writeFileSync(OUT, JSON.stringify({ generated: new Date().toISOString(), items }, null, 2));
console.log(`catalogues.json: ${items.length} file(s)`);
