import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { DEFAULT_LOCALE, LOCALES } from './seo';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

function fileFor(locale, slug) {
  return path.join(BLOG_DIR, locale, `${slug}.mdx`);
}

function readSlugs(locale) {
  const dir = path.join(BLOG_DIR, locale);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith('.mdx')).map((f) => f.replace(/\.mdx$/, ''));
}

/** Locales in which a post has its own translation. */
export function postLocales(slug) {
  return LOCALES.filter((l) => fs.existsSync(fileFor(l, slug)));
}

/** Post frontmatter + raw MDX body for a locale, falling back to the default locale. */
export function getPost(slug, locale = DEFAULT_LOCALE) {
  const actual = fs.existsSync(fileFor(locale, slug)) ? locale : DEFAULT_LOCALE;
  const file = fileFor(actual, slug);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, 'utf8'));
  return {
    slug,
    locale: actual,
    translated: actual === locale,
    title: data.title,
    description: data.description,
    category: data.category,
    readTime: data.readTime,
    author: data.author || 'ParaguayReal',
    photo: data.photo,
    date: data.date ? new Date(data.date).toISOString().slice(0, 10) : undefined,
    content
  };
}

/** All posts (metadata only) for a locale, newest first; untranslated ones fall back to es. */
export function getAllPosts(locale = DEFAULT_LOCALE) {
  const slugs = new Set([...readSlugs(DEFAULT_LOCALE), ...readSlugs(locale)]);
  return [...slugs]
    .map((slug) => {
      const { content, ...meta } = getPost(slug, locale);
      return meta;
    })
    .sort((a, b) => (b.date || '').localeCompare(a.date || ''));
}

export function getAllSlugs() {
  return readSlugs(DEFAULT_LOCALE);
}
