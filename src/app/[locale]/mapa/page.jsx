import React from 'react';
import dynamic from 'next/dynamic';
import SchemaOrg from '../../../components/SEO/SchemaOrg';
import placesGeoJSON from '../../../../data/places.json';

// Dynamically import map with SSR disabled to prevent server-side compilation crashes
const InteractiveMap = dynamic(
  () => import('../../../components/Map/InteractiveMap'),
  {
    ssr: false,
    loading: () => (
      <div className="h-[calc(100vh-64px)] w-full flex flex-col items-center justify-center bg-slate-950 text-slate-100 font-semibold gap-3">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs text-slate-400 uppercase tracking-widest font-mono">Cargando Mapa Interactivo...</span>
      </div>
    )
  }
);

export async function generateMetadata({ params: { locale } }) {
  const titles = {
    es: "Mapa Interactivo de Paraguay | ParaguayReal",
    en: "Interactive Map of Paraguay | ParaguayReal",
    pt: "Mapa Interativo do Paraguai | ParaguayReal"
  };

  return {
    title: titles[locale] || titles.es,
    description: "Mapa geolocalizado con puntos clave: embajadas, sanatorios, coworkings, supermercados y atractivos turísticos en Paraguay."
  };
}

export default function MapaPage({ params: { locale } }) {
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
    <div className="h-[calc(100vh-64px)] overflow-hidden w-full">
      <SchemaOrg schema={mapSchema} />
      <InteractiveMap initialPlaces={placesGeoJSON.features} locale={locale} />
    </div>
  );
}
