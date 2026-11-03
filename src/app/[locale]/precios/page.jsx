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
      question: t("Prices.faq1Question") || "¿Cuál es el sueldo mínimo legal en Paraguay?",
      answer: t("Prices.faq1Answer") || "El salario mínimo legal vigente en Paraguay es de 2.680.373 PYG mensuales (aproximadamente 365 USD al cambio actual de 2026). Sin embargo, un profesional calificado suele ganar entre 4.000.000 y 8.000.000 PYG."
    },
    {
      question: t("Prices.faq2Question") || "¿Cuánto dinero se necesita para vivir solo en Asunción?",
      answer: t("Prices.faq2Answer") || "Para una persona soltera que desee vivir con comodidad en un barrio seguro de Asunción (como Villa Morra o Las Mercedes), el costo mensual promedio oscila entre 800 y 1.200 USD. Esto cubre alquiler de un monoambiente, servicios, alimentación y ocio básico."
    },
    {
      question: t("Prices.faq3Question") || "¿Es barata la energía eléctrica en Paraguay?",
      answer: t("Prices.faq3Answer") || "Sí, la tarifa eléctrica residencial en Paraguay (proveída por la ANDE) es una de las más económicas de América Latina debido a la gran generación hidroeléctrica de Itaipú. Sin embargo, el uso intensivo del aire acondicionado en verano (de noviembre a marzo) puede elevar las facturas mensuales a rangos de 40 a 90 USD. La tarifa residencial promedio es de aproximadamente 0,059 USD por kWh."
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
        <PriceTable t={t} locale={locale} />
      </section>

      {/* Monthly Budget Profiles */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-slate-900 font-display mb-2">
          {t("Prices.profilesTitle") || "Presupuestos Mensuales Integrados por Perfil"}
        </h2>
        <p className="text-sm text-slate-600 mb-6">
          {t("Prices.profilesSubtitle") || "Estimación detallada de gastos y rentas mensuales reales a junio de 2026:"}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Nomad Card */}
          <div className="bg-white rounded-xl shadow-md border border-slate-100 p-6 flex flex-col justify-between hover:border-emerald-200 transition">
            <div>
              <span className="text-xs bg-emerald-50 text-emerald-800 font-bold px-2 py-1 rounded">
                {t("Prices.profileNomad") || "Persona Sola / Nómada Digital (Básico)"}
              </span>
              <div className="mt-4 space-y-2 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>{t("Prices.profileHeaderRent") || "Rango de Alquiler"}:</span>
                  <span className="font-semibold text-slate-800">$250 - $300 USD</span>
                </div>
                <div className="flex justify-between">
                  <span>{t("Prices.profileHeaderLivingCost") || "Costo de Vida (Excl. Alquiler)"}:</span>
                  <span className="font-semibold text-slate-800">$450 - $510 USD</span>
                </div>
              </div>
            </div>
            <div className="border-t border-slate-100 mt-6 pt-4 flex justify-between items-center">
              <span className="text-xs font-bold text-slate-400 uppercase">{t("Prices.profileHeaderTotal") || "Presupuesto Total"}</span>
              <span className="text-lg font-black text-emerald-600">$750 - $810 USD</span>
            </div>
          </div>

          {/* Couple Card */}
          <div className="bg-white rounded-xl shadow-md border border-slate-100 p-6 flex flex-col justify-between hover:border-emerald-200 transition">
            <div>
              <span className="text-xs bg-blue-50 text-blue-800 font-bold px-2 py-1 rounded">
                {t("Prices.profileCouple") || "Pareja sin Hijos (Confort Medio)"}
              </span>
              <div className="mt-4 space-y-2 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>{t("Prices.profileHeaderRent") || "Rango de Alquiler"}:</span>
                  <span className="font-semibold text-slate-800">$400 - $500 USD</span>
                </div>
                <div className="flex justify-between">
                  <span>{t("Prices.profileHeaderLivingCost") || "Costo de Vida (Excl. Alquiler)"}:</span>
                  <span className="font-semibold text-slate-800">$670 - $740 USD</span>
                </div>
              </div>
            </div>
            <div className="border-t border-slate-100 mt-6 pt-4 flex justify-between items-center">
              <span className="text-xs font-bold text-slate-400 uppercase">{t("Prices.profileHeaderTotal") || "Presupuesto Total"}</span>
              <span className="text-lg font-black text-emerald-600">$1,170 - $1,240 USD</span>
            </div>
          </div>

          {/* Family Card */}
          <div className="bg-white rounded-xl shadow-md border border-slate-100 p-6 flex flex-col justify-between hover:border-emerald-200 transition">
            <div>
              <span className="text-xs bg-purple-50 text-purple-800 font-bold px-2 py-1 rounded">
                {t("Prices.profileFamily") || "Familia de Cuatro (Estándar Medio)"}
              </span>
              <div className="mt-4 space-y-2 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>{t("Prices.profileHeaderRent") || "Rango de Alquiler"}:</span>
                  <span className="font-semibold text-slate-800">$600 - $900 USD</span>
                </div>
                <div className="flex justify-between">
                  <span>{t("Prices.profileHeaderLivingCost") || "Costo de Vida (Excl. Alquiler)"}:</span>
                  <span className="font-semibold text-slate-800">$1,600 USD</span>
                </div>
              </div>
            </div>
            <div className="border-t border-slate-100 mt-6 pt-4 flex justify-between items-center">
              <span className="text-xs font-bold text-slate-400 uppercase">{t("Prices.profileHeaderTotal") || "Presupuesto Total"}</span>
              <span className="text-lg font-black text-emerald-600">$2,200 - $2,500 USD</span>
            </div>
          </div>
        </div>
      </section>

      {/* Regional Rent Comparison Matrix */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-slate-900 font-display mb-2">
          {t("Prices.compareTitle") || "Matriz Comparativa de Alquileres Regionales"}
        </h2>
        <p className="text-sm text-slate-600 mb-6">
          {t("Prices.compareSubtitle") || "Precios de referencia para unidades estándar recopilados a junio de 2026:"}
        </p>
        <div className="bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                  <th className="px-6 py-3.5">{t("Prices.compareHeaderCity") || "Ubicación / Ciudad"}</th>
                  <th className="px-6 py-3.5">{t("Prices.compareHeaderType") || "Tipo de Inmueble y Área"}</th>
                  <th className="px-6 py-3.5">{t("Prices.compareHeaderPyg") || "Precio (Moneda Local)"}</th>
                  <th className="px-6 py-3.5 text-right">{t("Prices.compareHeaderUsd") || "Equivalente en USD"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {/* Asunción */}
                <tr className="hover:bg-slate-50/50 transition">
                  <td className="px-6 py-4 font-bold text-slate-900" rowSpan={4}>Asunción</td>
                  <td className="px-6 py-4">{t("Prices.rentStudioCenter") || "Dpto. 1 Dormitorio (Centro Asunción)"}</td>
                  <td className="px-6 py-4 font-mono font-semibold">2.200.000 ₲</td>
                  <td className="px-6 py-4 font-mono font-extrabold text-emerald-600 text-right">$300</td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition">
                  <td className="px-6 py-4">{t("Prices.rentFamilyCenter") || "Dpto. 3 Dormitorios (Centro Asunción)"}</td>
                  <td className="px-6 py-4 font-mono font-semibold">5.800.000 ₲</td>
                  <td className="px-6 py-4 font-mono font-extrabold text-emerald-600 text-right">$800</td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition">
                  <td className="px-6 py-4">{t("Prices.rentStudioSub") || "Dpto. 1 Dormitorio (Suburbio Asunción)"}</td>
                  <td className="px-6 py-4 font-mono font-semibold">1.500.000 ₲</td>
                  <td className="px-6 py-4 font-mono font-extrabold text-emerald-600 text-right">$200</td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition">
                  <td className="px-6 py-4">{t("Prices.rentFamilySub") || "Dpto. 3 Dormitorios (Suburbio Asunción)"}</td>
                  <td className="px-6 py-4 font-mono font-semibold">3.600.000 ₲</td>
                  <td className="px-6 py-4 font-mono font-extrabold text-emerald-600 text-right">$500</td>
                </tr>
                {/* Luque */}
                <tr className="hover:bg-slate-50/50 transition">
                  <td className="px-6 py-4 font-bold text-slate-900" rowSpan={3}>Luque</td>
                  <td className="px-6 py-4">{t("Prices.rentStudioLuque") || "Monoambiente / Loft (Luque Centro)"}</td>
                  <td className="px-6 py-4 font-mono font-semibold">1.800.000 ₲</td>
                  <td className="px-6 py-4 font-mono font-extrabold text-emerald-600 text-right">$250</td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition">
                  <td className="px-6 py-4">{t("Prices.rentFamilyLuque") || "Casa 3 Dormitorios (Luque Residencial)"}</td>
                  <td className="px-6 py-4 font-mono font-semibold">4.400.000 ₲</td>
                  <td className="px-6 py-4 font-mono font-extrabold text-emerald-600 text-right">$600</td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition">
                  <td className="px-6 py-4">{t("Prices.rentPremiumLuque") || "Residencia Country (Luque Premium)"}</td>
                  <td className="px-6 py-4 font-mono font-semibold">11.000.000 ₲</td>
                  <td className="px-6 py-4 font-mono font-extrabold text-emerald-600 text-right">$1.500</td>
                </tr>
                {/* Ciudad del Este */}
                <tr className="hover:bg-slate-50/50 transition">
                  <td className="px-6 py-4 font-bold text-slate-900" rowSpan={3}>Ciudad del Este</td>
                  <td className="px-6 py-4">{t("Prices.rentStudioCde") || "Dpto. 1 Dormitorio (CDE Centro)"}</td>
                  <td className="px-6 py-4 font-mono font-semibold">2.000.000 ₲</td>
                  <td className="px-6 py-4 font-mono font-extrabold text-emerald-600 text-right">$270</td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition">
                  <td className="px-6 py-4">{t("Prices.rentFamilyCde") || "Dpto. 2 Dormitorios (CDE Boquerón)"}</td>
                  <td className="px-6 py-4 font-mono font-semibold">3.700.000 ₲</td>
                  <td className="px-6 py-4 font-mono font-extrabold text-emerald-600 text-right">$500</td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition">
                  <td className="px-6 py-4">{t("Prices.rentPremiumCde") || "Mansión de Lujo (CDE Country Club)"}</td>
                  <td className="px-6 py-4 font-mono font-semibold">18.000.000 ₲</td>
                  <td className="px-6 py-4 font-mono font-extrabold text-emerald-600 text-right">$2.500</td>
                </tr>
                {/* San Bernardino */}
                <tr className="hover:bg-slate-50/50 transition">
                  <td className="px-6 py-4 font-bold text-slate-900" rowSpan={3}>San Bernardino</td>
                  <td className="px-6 py-4">{t("Prices.rentFamilySanber") || "Casa 3 Dormitorios (Sanber Anual)"}</td>
                  <td className="px-6 py-4 font-mono font-semibold">5.000.000 ₲</td>
                  <td className="px-6 py-4 font-mono font-extrabold text-emerald-600 text-right">$680</td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition">
                  <td className="px-6 py-4">{t("Prices.rentSummerSanber") || "Dpto. Insignia (Sanber Temporada)"}</td>
                  <td className="px-6 py-4 font-mono font-semibold">11.000.000 ₲</td>
                  <td className="px-6 py-4 font-mono font-extrabold text-emerald-600 text-right">$1.500</td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition">
                  <td className="px-6 py-4">{t("Prices.rentSummerLuxSanber") || "Casa Boutique Lago (Sanber Verano)"}</td>
                  <td className="px-6 py-4 font-mono font-semibold">22.000.000 ₲</td>
                  <td className="px-6 py-4 font-mono font-extrabold text-emerald-600 text-right">$3.000</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 text-[11px] text-slate-400 font-medium">
            {t("Prices.sourcesText") || "Fuentes de referencia de precios: Infocasas, Century 21 y Re/Max Paraguay."}
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="border-t border-slate-200 pt-10">
        <h2 className="text-xl font-bold text-slate-950 font-display mb-6">
          {t("Prices.faqTitle") || "Preguntas frecuentes sobre el costo de vida"}
        </h2>
        <FAQAccordion faqs={faqs} />
      </section>
    </div>
  );
}
