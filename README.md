# ParaguayReal

Guía en es/en/pt sobre vivir, invertir y viajar en Paraguay. Next.js 14 (App Router) + next-intl + Tailwind, con mapa interactivo (Mapbox, Google Maps o Leaflet como fallback).

## Desarrollo

```bash
cp .env.example .env.local   # añade tus tokens de mapa
npm install
npm run dev                  # http://localhost:3005
npm run build && npm run lint
```

## Variables de entorno

| Variable | Uso |
| --- | --- |
| `NEXT_PUBLIC_MAPBOX_TOKEN` | Motor Mapbox (prioritario). Es público: restríngelo por dominio en Mapbox. |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Motor Google Maps (si no hay token Mapbox). Restríngela por dominio. |
| `NEXT_PUBLIC_SITE_URL` | URL base para canonical, sitemap y JSON-LD (por defecto `https://paraguayreal.com`). |

Sin ninguna clave de mapa se usa Leaflet + OpenStreetMap.

## Estructura

- `src/app/[locale]/…` páginas; `src/lib/seo.js` metadatos (canonical, hreflang, Open Graph) y `src/app/sitemap.js`/`robots.js`.
- `content/blog/<locale>/*.mdx` artículos del blog (frontmatter + MDX; hoy solo `es`; si falta la traducción se sirve el español con canonical a `/es`). Lector en `src/lib/blog.js`.
- `data/places.json` lugares del mapa (GeoJSON); `data/prices.json` precios.
- `messages/*.json` textos de interfaz.
