import { ARTICLES_DB } from '../lib/blogData';
import { SITE_URL, LOCALES } from '../lib/seo';

const STATIC_PATHS = ['', '/mapa', '/precios', '/vivir/barrios', '/turismo', '/negocios', '/blog', '/legal', '/privacidad', '/cookies'];
const CITIES = ['asuncion', 'ciudad-del-este', 'encarnacion'];

function entry(path, { priority, changeFrequency, lastModified, esOnly = false }) {
  // Spanish-only content is listed once (en/pt canonicalise to es)
  const locales = esOnly ? ['es'] : LOCALES;
  return locales.map((locale) => ({
    url: `${SITE_URL}/${locale}${path}`,
    ...(lastModified && { lastModified }),
    changeFrequency,
    priority,
    alternates: {
      ...(!esOnly && { languages: Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}/${l}${path}`])) })
    }
  }));
}

export default function sitemap() {
  return [
    ...STATIC_PATHS.flatMap((path) =>
      entry(path, {
        priority: path === '' ? 1.0 : path.match(/legal|privacidad|cookies/) ? 0.2 : 0.8,
        changeFrequency: path === '' ? 'daily' : 'weekly'
      })
    ),
    ...CITIES.flatMap((city) => entry(`/ciudades/${city}`, { priority: 0.7, changeFrequency: 'weekly', esOnly: true })),
    ...Object.entries(ARTICLES_DB).flatMap(([slug, article]) =>
      entry(`/blog/${slug}`, { priority: 0.6, changeFrequency: 'monthly', lastModified: article.dateIso, esOnly: true })
    )
  ];
}
