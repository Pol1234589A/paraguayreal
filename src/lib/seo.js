export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://paraguayreal.com').replace(/\/$/, '');
import { routing } from '../i18n/routing';

export const LOCALES = routing.locales;
export const DEFAULT_LOCALE = routing.defaultLocale;

const OG_LOCALES = { es: 'es_PY', en: 'en_US', pt: 'pt_BR' };

/** Canonical + hreflang alternates for a locale-prefixed path ('' = home). */
export function pageAlternates(locale, path = '', { onlyDefaultLocale = false, locales = LOCALES } = {}) {
  // Content that exists only in the default locale: en/pt canonicalise to it (no false hreflang).
  if (onlyDefaultLocale) return { canonical: `/${DEFAULT_LOCALE}${path}` };
  const languages = Object.fromEntries(locales.map((l) => [l, `/${l}${path}`]));
  languages['x-default'] = `/${DEFAULT_LOCALE}${path}`;
  return { canonical: `/${locale}${path}`, languages };
}

/** Full per-page metadata: title, description, canonical, hreflang, Open Graph, Twitter. */
export function pageMetadata({ locale, path = '', title, description, image = '/logo.png', type = 'website', extra = {}, onlyDefaultLocale = false, locales }) {
  return {
    title,
    description,
    alternates: pageAlternates(locale, path, { onlyDefaultLocale, ...(locales && { locales }) }),
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
