import React from 'react';
import { useTranslations } from 'next-intl';
import PriceTable from '../../../components/UI/PriceTable';
import FAQAccordion from '../../../components/UI/FAQAccordion';
import UpdatedBadge from '../../../components/UI/UpdatedBadge';
import Breadcrumb from '../../../components/UI/Breadcrumb';
import SchemaOrg from '../../../components/SEO/SchemaOrg';

export async function generateMetadata({ params: { locale } }) {
  const titles = {
    es: "Costo de Vida en Paraguay: Precios 2026 | ParaguayReal",
    en: "Cost of Living in Paraguay: Prices 2026 | ParaguayReal",
    pt: "Custo de Vida no Paraguai: Preços 2026 | ParaguayReal"
  };

  return {
    title: titles[locale] || titles.es,
    description: "Consulta precios detallados y actualizados de alquileres, comida, internet, nafta y servicios básicos en Paraguay."
  };
}

export default function PreciosPage({ params: { locale } }) {
  const t = useTranslations();

  const breadcrumbs = [
    { label: t("Navigation.prices") || "Precios", url: "/precios" }
  ];

  const faqs = [
    {
      question: "¿Cuál es el sueldo mínimo legal en Paraguay?",
      answer: "El salario mínimo legal vigente en Paraguay es de 2.680.373 PYG mensuales (aproximadamente 365 USD al cambio actual de 2026). Sin embargo, un profesional calificado suele ganar entre 4.000.000 y 8.000.000 PYG."
    },
    {
      question: "¿Cuánto dinero se necesita para vivir solo en Asunción?",
      answer: "Para una persona soltera que desee vivir con comodidad en un barrio seguro de Asunción (como Villa Morra o Las Mercedes), el costo mensual promedio oscila entre 800 y 1.200 USD. Esto cubre alquiler de un monoambiente, servicios, alimentación y ocio básico."
    },
    {
      question: "¿Es barata la energía eléctrica en Paraguay?",
      answer: "Sí, la tarifa eléctrica residencial en Paraguay (proveída por la ANDE) es una de las más económicas de América Latina debido a la gran generación hidroeléctrica de Itaipú. Sin embargo, el uso intensivo del aire acondicionado en verano (de noviembre a marzo) puede elevar las facturas mensuales a rangos de 40 a 90 USD."
    }
  ];

  // Specific schema specification for price structured data
  const priceSpecificationSchema = {
    "@context": "https://schema.org",
    "@type": "PriceSpecification",
    "name": "Índice de Precios ParaguayReal",
    "priceCurrency": "PYG",
    "valueAddedTaxIncluded": true
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 select-none">
      <SchemaOrg schema={priceSpecificationSchema} />
      <Breadcrumb items={breadcrumbs} locale={locale} />
      
      {/* Intro Header */}
      <div className="space-y-4 mb-8">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-3xl font-extrabold text-slate-900 font-display">
            {t("Prices.title") || "Precios y Costo de Vida en Paraguay"}
          </h1>
          <UpdatedBadge />
        </div>
        <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
          {t("Prices.subtitle") || "Recopilación honesta y actualizada de precios reales de supermercados, alquileres y servicios en Paraguay."}
        </p>
      </div>

      {/* Main Prices Table */}
      <section className="mb-12">
        <PriceTable t={t} />
      </section>

      {/* FAQ Accordion Section */}
      <section className="border-t border-slate-200 pt-10">
        <h2 className="text-xl font-bold text-slate-950 font-display mb-6">
          Preguntas frecuentes sobre el costo de vida
        </h2>
        <FAQAccordion faqs={faqs} />
      </section>
    </div>
  );
}
