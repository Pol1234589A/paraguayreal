import React, { use } from 'react';
import { setRequestLocale } from 'next-intl/server';
import { pageMetadata } from '../../../lib/seo';
import SchemaOrg from '../../../components/SEO/SchemaOrg';
import { getPlaces } from '../../../lib/places';

import InteractiveMap from '../../../components/Map/LazyInteractiveMap';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const titles = {
    es: "Mapa Interactivo de Paraguay | ParaguayReal",
    en: "Interactive Map of Paraguay | ParaguayReal",
    pt: "Mapa Interativo do Paraguai | ParaguayReal"
  };

  return pageMetadata({
    locale,
    path: '/mapa',
    title: titles[locale] || titles.es,
    description: "Mapa geolocalizado con puntos clave: embajadas, sanatorios, coworkings, supermercados y atractivos turísticos en Paraguay."
  });
}

export default function MapaPage({ params, searchParams }) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const sp = use(searchParams);
  const siteUrl = 'https://paraguayreal.com';

  const mapSchema = {
    "@context": "https://schema.org",
    "@type": "Map",
    "name": "Mapa Interactivo de Paraguay",
    "description": "Visualización cartográfica interactiva de puntos de interés y servicios en Paraguay.",
    "url": `${siteUrl}/${locale}/mapa`,
    "mapType": "Hybrid"
  };

  return (
    <div className="h-[calc(100dvh-64px)] overflow-hidden w-full">
      <SchemaOrg schema={mapSchema} />
      <InteractiveMap initialPlaces={getPlaces(locale)} locale={locale} searchParams={sp} />
    </div>
  );
}
