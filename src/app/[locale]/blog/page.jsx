import React from 'react';
import BlogIndexClient from '../../../components/UI/BlogIndexClient';
import { pageMetadata } from '../../../lib/seo';

export async function generateMetadata({ params: { locale } }) {
  const titles = {
    es: "Blog: Guías sobre Vivir, Invertir y Viajar en Paraguay | ParaguayReal",
    en: "Blog: Guides to Living, Investing and Traveling in Paraguay | ParaguayReal",
    pt: "Blog: Guias para Viver, Investir e Viajar no Paraguai | ParaguayReal"
  };
  const descriptions = {
    es: "Artículos prácticos sobre costo de vida, residencia, impuestos, negocios y turismo en Paraguay, escritos con datos reales.",
    en: "Practical articles on cost of living, residency, taxes, business and tourism in Paraguay.",
    pt: "Artigos práticos sobre custo de vida, residência, impostos, negócios e turismo no Paraguai."
  };
  return pageMetadata({
    locale,
    path: '/blog',
    title: titles[locale] || titles.es,
    description: descriptions[locale] || descriptions.es
  });
}

export default function BlogIndexPage({ params: { locale } }) {
  return <BlogIndexClient locale={locale} />;
}
