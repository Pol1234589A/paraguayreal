import React from 'react';
import SeguridadClientPage from './SeguridadClientPage';

export async function generateMetadata({ params: { locale } }) {
  const titles = {
    es: "Evaluación de Riesgo y Seguridad por Distritos en Paraguay | ParaguayReal",
    en: "Risk Assessment and Safety by District in Paraguay | ParaguayReal",
    pt: "Avaliação de Risco e Segurança por Distrito no Paraguai | ParaguayReal"
  };
  const descriptions = {
    es: "Portal interactivo con el Índice de Amenaza Geopolítica (IAG) y matriz de seguridad de los 262 municipios de Paraguay. Busca zonas seguras y rojas.",
    en: "Interactive portal featuring the Geopolitical Threat Index (IAG) and safety matrix for all 262 municipalities in Paraguay. Find safe and red zones.",
    pt: "Portal interativo com o Índice de Ameaça Geopolítica (IAG) e matriz de segurança dos 262 municípios do Paraguai. Busque áreas seguras e vermelhas."
  };

  return {
    title: titles[locale] || titles.es,
    description: descriptions[locale] || descriptions.es
  };
}

export default function SeguridadPage({ params: { locale } }) {
  return <SeguridadClientPage locale={locale} />;
}
