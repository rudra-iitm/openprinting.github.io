// scripts/sync-authors.js
// Usage: node scripts/sync-authors.js
// npm install js-yaml node-fetch@2 mkdirp slugify

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const fetch = require('node-fetch');
const mkdirp = require('mkdirp');
const slugify = require('slugify');

const DATA_DIR = path.join(__dirname, '..', 'data');
const PUBLIC_DIR = path.join(__dirname, '..', 'public', 'authors');
const AUTHORS_YML = path.join(DATA_DIR, 'authors.yml');
const OUTPUT_TS = path.join(DATA_DIR, 'authors.ts');
const PLACEHOLDER = '/authors/placeholder.jpg';

mkdirp.sync(PUBLIC_DIR);

function toMailto(email) {
  if (!email) return undefined;
  const t = String(email).trim();
  if (!t) return undefined;
  if (t.startsWith('mailto:')) return t;
  return `mailto:${t}`;
}

function toGithub(u) {
  if (!u) return undefined;
  const s = String(u).trim();
  if (!s) return undefined;
  if (s.startsWith('http')) return s;
  return `https://github.com/${s.replace(/^@/, '')}`;
}

function filenameForName(name) {
  const slug = slugify(String(name || 'unknown'), { lower: true, strict: true });
  return `${slug}.jpg`;
}

async function download(url, destPath) {
  try {
    const res = await fetch(url, { timeout: 20000 });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = await res.buffer();
    fs.writeFileSync(destPath, buf);
    return true;
  } catch (err) {
    console.warn('download failed', url, err.message);
    return false;
  }
}

(async () => {
  if (!fs.existsSync(AUTHORS_YML)) {
    console.error('Missing', AUTHORS_YML);
    process.exit(1);
  }

  const raw = fs.readFileSync(AUTHORS_YML, 'utf8');
  const parsed = yaml.load(raw);

  // YAML is mapping (Till:, Mike:, ...) — convert to array
  const entries = [];
  if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
    for (const key of Object.keys(parsed)) {
      entries.push(parsed[key]);
    }
  } else if (Array.isArray(parsed)) {
    parsed.forEach(p => entries.push(p));
  } else {
    console.error('Unexpected YAML structure');
    process.exit(1);
  }

  const out = [];
  let downloaded = 0;
  let placeholderCount = 0;

  for (const item of entries) {
    const name = item.name || item.full_name || 'Unknown';
    const role = item.bio || undefined;
    const location = item.location || undefined;
    const email = toMailto(item.email || item.mail || undefined);
    const github = toGithub(item.github || item.github_username || undefined);

    // image decision
    let imagePath = PLACEHOLDER;
    if (item.avatar) {
      const fname = filenameForName(name);
      const dest = path.join(PUBLIC_DIR, fname);
      // if avatar looks like a GitHub avatar without extension (like avatars.githubusercontent.com/...), still try download
      const ok = await download(item.avatar, dest);
      if (ok) {
        imagePath = `/authors/${fname}`;
        downloaded++;
      } else {
        imagePath = PLACEHOLDER;
        placeholderCount++;
      }
    } else {
      // no avatar specified
      placeholderCount++;
    }

    out.push({
      name,
      role,
      location,
      email,
      github,
      image: imagePath
    });
  }

  // write authors.ts
  const lines = [];
  lines.push('export interface Author {');
  lines.push('  name: string;');
  lines.push('  role?: string;');
  lines.push('  location?: string;');
  lines.push('  email?: string;');
  lines.push('  github?: string;');
  lines.push('  image?: string;');
  lines.push('}');
  lines.push('');
  lines.push('const authors: Author[] = [');

  for (const a of out) {
    lines.push('  {');
    lines.push(`    name: ${JSON.stringify(a.name)},`);
    lines.push(`    role: ${a.role ? JSON.stringify(a.role) : 'undefined'},`);
    lines.push(`    location: ${a.location ? JSON.stringify(a.location) : 'undefined'},`);
    lines.push(`    email: ${a.email ? JSON.stringify(a.email) : 'undefined'},`);
    lines.push(`    github: ${a.github ? JSON.stringify(a.github) : 'undefined'},`);
    lines.push(`    image: ${a.image ? JSON.stringify(a.image) : JSON.stringify(PLACEHOLDER)},`);
    lines.push('  },');
  }

  lines.push('];');
  lines.push('');
  lines.push('export default authors;');

  fs.writeFileSync(OUTPUT_TS, lines.join('\n'), 'utf8');

  console.log(`Wrote ${OUTPUT_TS} — authors: ${out.length}`);
  console.log(`Downloaded avatars: ${downloaded}, placeholder used: ${placeholderCount}`);
})();
