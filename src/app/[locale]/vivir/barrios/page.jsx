import React from 'react';
import BarriosClientPage from './BarriosClientPage';

export async function generateMetadata({ params: { locale } }) {
  const titles = {
    es: "Guía de Zonas y Barrios en Paraguay: Seguridad y Alquileres | ParaguayReal",
    en: "Neighborhoods and Areas in Paraguay: Safety & Rent | ParaguayReal",
    pt: "Guia de Zonas e Bairros no Paraguai: Segurança e Aluguel | ParaguayReal"
  };
  const descriptions = {
    es: "Explora de forma interactiva la geografía de la vivienda, precios de alquiler, seguridad, zonas rojas de exclusión y alertas de raudales pluviales de las principales ciudades de Paraguay.",
    en: "Explore interactively the geography of housing, rental prices, safety, critical exclusion zones, and flash flood warnings of major cities in Paraguay.",
    pt: "Explore de forma interativa a geografia da moradia, preços de aluguel, segurança, zonas vermelhas de exclusão e alertas de enxurradas das principais cidades do Paraguai."
  };

  return {
    title: titles[locale] || titles.es,
    description: descriptions[locale] || descriptions.es
  };
}

export default function BarriosPage({ params: { locale } }) {
  return <BarriosClientPage locale={locale} />;
}
