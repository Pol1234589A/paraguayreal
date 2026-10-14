export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://paraguayreal.com').replace(/\/$/, '');
export const LOCALES = ['es', 'en', 'pt'];
export const DEFAULT_LOCALE = 'es';

const OG_LOCALES = { es: 'es_PY', en: 'en_US', pt: 'pt_BR' };

/** Canonical + hreflang alternates for a locale-prefixed path ('' = home). */
export function pageAlternates(locale, path = '', { onlyDefaultLocale = false } = {}) {
  // Content that exists only in the default locale: en/pt canonicalise to it (no false hreflang).
  if (onlyDefaultLocale) return { canonical: `/${DEFAULT_LOCALE}${path}` };
  const languages = Object.fromEntries(LOCALES.map((l) => [l, `/${l}${path}`]));
  languages['x-default'] = `/${DEFAULT_LOCALE}${path}`;
  return { canonical: `/${locale}${path}`, languages };
}

/** Full per-page metadata: title, description, canonical, hreflang, Open Graph, Twitter. */
export function pageMetadata({ locale, path = '', title, description, image = '/logo.png', type = 'website', extra = {}, onlyDefaultLocale = false }) {
  return {
    title,
    description,
    alternates: pageAlternates(locale, path, { onlyDefaultLocale }),
    openGraph: {
      title,
      description,
      url: `/${locale}${path}`,
      siteName: 'ParaguayReal',
      locale: OG_LOCALES[locale] || OG_LOCALES.es,
      type,
      images: [{ url: image }],
      ...extra,
    },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}
