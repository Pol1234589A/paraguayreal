import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { parse as parseYaml } from 'yaml';

const LOCALES = ['es', 'en', 'pt'];
const read = (p) => fs.readFileSync(p, 'utf8');
const json = (p) => JSON.parse(read(p));

function frontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  assert.ok(m, 'missing frontmatter');
  return { data: parseYaml(m[1]), body: m[2] };
}

function flatten(obj, prefix = '') {
  return Object.entries(obj).flatMap(([k, v]) =>
    v && typeof v === 'object' ? flatten(v, `${prefix}${k}.`) : [`${prefix}${k}`]
  );
}

test('i18n messages have the same keys in every locale', () => {
  const base = flatten(json('messages/es.json')).sort();
  for (const l of LOCALES) assert.deepEqual(flatten(json(`messages/${l}.json`)).sort(), base, l);
});

test('blog posts: required frontmatter, and translations keep date/maps in sync with es', () => {
  const required = ['title', 'description', 'date', 'category', 'readTime', 'author', 'photo'];
  for (const file of fs.readdirSync('content/blog/es')) {
    const es = frontmatter(read(path.join('content/blog/es', file)));
    for (const l of LOCALES) {
      const f = path.join('content/blog', l, file);
      if (!fs.existsSync(f)) continue;
      const post = frontmatter(read(f));
      for (const k of required) assert.ok(post.data[k], `${f}: missing ${k}`);
      assert.equal(String(post.data.date), String(es.data.date), `${f}: date differs`);
      const maps = post.body.match(/<MiniMap[\s\S]*?\/>/g) || [];
      assert.equal(maps.length, (es.body.match(/<MiniMap/g) || []).length, `${f}: MiniMap count`);
      for (const m of maps) assert.match(m, /lat=\{-?[\d.]+\}[\s\S]*lng=\{-?[\d.]+\}/, `${f}: MiniMap needs numeric lat/lng`);
    }
  }
});

test('places: Google Maps links match coordinates, i18n covers every place', () => {
  const places = json('data/places.json').features;
  const i18n = json('data/places.i18n.json');
  const ids = new Set();
  for (const f of places) {
    const p = f.properties;
    assert.ok(!ids.has(p.id), `duplicate id ${p.id}`);
    ids.add(p.id);
    const [lng, lat] = f.geometry.coordinates;
    assert.ok(p.googleMapsUrl.includes(`${lat},${lng}`), `${p.id}: googleMapsUrl vs coordinates`);
    assert.ok(p.googleMapsDirections.includes(`${lat},${lng}`), `${p.id}: directions vs coordinates`);
    for (const l of ['en', 'pt']) {
      const t = i18n[p.id]?.[l];
      assert.ok(t, `${p.id}: missing ${l} translation`);
      assert.equal(t.tags.length, p.tags.length, `${p.id}/${l}: tags length`);
    }
    if (p.photo.startsWith('/')) assert.ok(fs.existsSync(path.join('public', p.photo)), `${p.id}: missing ${p.photo}`);
  }
});
