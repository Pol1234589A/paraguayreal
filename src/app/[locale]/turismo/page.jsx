import React from 'react';
import SchemaOrg from '../../../components/SEO/SchemaOrg';
import TourismClient from '../../../components/UI/TourismClient';
import placesGeoJSON from '../../../../data/places.json';

export async function generateMetadata({ params: { locale } }) {
  const titles = {
    es: "Guía de Turismo en Paraguay: Qué ver y Atractivos Imperdibles | ParaguayReal",
    en: "Tourism Guide in Paraguay: Best Places to Visit | ParaguayReal",
    pt: "Guia de Turismo no Paraguai: O que visitar e atrações | ParaguayReal"
  };

  const descriptions = {
    es: "Descubre los mejores destinos turísticos de Paraguay: Asunción colonial, playas fluviales de Encarnación, compras en Ciudad del Este, cascadas y pueblos de Cordillera.",
    en: "Discover the best travel destinations in Paraguay: historical Asunción, beaches of Encarnación, shopping in Ciudad del Este, waterfalls, and Cordillera towns.",
    pt: "Descubra os melhores destinos turísticos do Paraguai: Assunção colonial, praias de Encarnação, compras em Ciudad del Este e cachoeiras."
  };

  return {
    title: titles[locale] || titles.es,
    description: descriptions[locale] || descriptions.es
  };
}

export default function TurismoPage({ params: { locale } }) {
  const siteUrl = 'https://paraguayreal.com';
  
  // Filter for tourism spots to build structured ItemList schema for SEO crawlers
  const tourismPlaces = placesGeoJSON.features.filter(
    (place) => place.properties.category === 'turismo'
  );

  const listItems = tourismPlaces.map((place, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "item": {
      "@type": "Place",
      "name": place.properties.name,
      "description": place.properties.description,
      "image": place.properties.photo,
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "PY",
        "addressLocality": place.properties.address
      }
    }
  }));

  const tourismSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Lugares Turísticos Recomendados en Paraguay",
    "description": "Lista geolocalizada de atracciones y destinos de interés turístico en Paraguay.",
    "numberOfItems": tourismPlaces.length,
    "itemListElement": listItems
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Turismo en Paraguay - Guía y Mapa",
    "description": "Guía completa de destinos para visitar y conocer en Paraguay.",
    "url": `${siteUrl}/${locale}/turismo`
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <SchemaOrg schema={tourismSchema} />
      <SchemaOrg schema={websiteSchema} />
      <TourismClient placesFeatures={placesGeoJSON.features} locale={locale} />
    </div>
  );
}
