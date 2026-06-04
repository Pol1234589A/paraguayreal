import React from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Inter, Playfair_Display } from 'next/font/google';
import Navbar from '../../components/UI/Navbar';
import Footer from '../../components/UI/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export async function generateMetadata({ params: { locale } }) {
  const titles = {
    es: "ParaguayReal | Guía de Viaje, Costo de Vida y Residencia en Paraguay",
    en: "ParaguayReal | Travel Guide, Cost of Living & Residency in Paraguay",
    pt: "ParaguayReal | Guia de Viagem, Custo de Vida e Residência no Paraguai"
  };

  const descriptions = {
    es: "Toda la verdad sobre Paraguay sin filtros. Precios de supermercados, alquileres, seguridad y cómo obtener la residencia permanente.",
    en: "The truth about Paraguay unfiltered. Supermarket prices, rents, safety, and how to obtain permanent residency.",
    pt: "A verdade sobre o Paraguai sem filtros. Preços de supermercados, aluguéis, segurança e como obter residência permanente."
  };

  return {
    title: titles[locale] || titles.es,
    description: descriptions[locale] || descriptions.es,
    metadataBase: new URL('https://paraguayreal.com'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'es': '/es',
        'en': '/en',
        'pt': '/pt'
      }
    }
  };
}

export default async function LocaleLayout({ children, params: { locale } }) {
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <body className="font-sans antialiased text-slate-800 bg-slate-50 min-h-screen flex flex-col">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Navbar locale={locale} />
          <main className="flex-1">
            {children}
          </main>
          <Footer locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
