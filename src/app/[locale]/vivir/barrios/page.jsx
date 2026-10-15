import React, { use } from 'react';
import { setRequestLocale } from 'next-intl/server';
import { pageMetadata } from '../../../../lib/seo';
import Breadcrumb from '../../../../components/UI/Breadcrumb';
import UpdatedBadge from '../../../../components/UI/UpdatedBadge';

import NeighborhoodMap from '../../../../components/Map/LazyNeighborhoodMap';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const titles = {
    es: "Mejores Barrios de Asunción: Seguridad y Alquileres | ParaguayReal",
    en: "Best Neighborhoods in Asunción: Safety & Rent | ParaguayReal",
    pt: "Melhores Bairros de Assunção: Segurança e Aluguel | ParaguayReal"
  };

  return pageMetadata({
    locale,
    path: '/vivir/barrios',
    title: titles[locale] || titles.es,
    description: "Mapa interactivo de los barrios residenciales de Asunción: Villa Morra, Las Mercedes, Mburucuyá y Centro. Índices de seguridad y costos."
  });
}

export default function BarriosPage({ params }) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const breadcrumbs = [
    { label: "Vivir", url: "/vivir/barrios" },
    { label: "Barrios de Asunción", url: "/vivir/barrios" }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      <Breadcrumb items={breadcrumbs} locale={locale} />

      {/* Header text */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-3xl font-extrabold text-slate-900 font-display">
            Zonas y Barrios de Asunción: Seguridad y Precios
          </h1>
          <UpdatedBadge />
        </div>
        <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
          Elegir la zona correcta en Asunción es el paso fundamental antes de mudarte. A continuación te presentamos un mapa detallado con la delimitación y estadísticas de seguridad, costos promedio de alquileres, y pros y contras de cada barrio residencial de referencia.
        </p>
      </div>

      {/* Map wrapper */}
      <section>
        <NeighborhoodMap />
      </section>

      {/* Additional details */}
      <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-4">
        <h3 className="font-extrabold text-slate-900 text-lg">Resumen de Recomendaciones</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900">¿Dónde viven la mayoría de los extranjeros?</h4>
            <p>
              <strong>Villa Morra</strong> y el eje de la <strong>Avenida Aviadores del Chaco (Manora, Ycua Sati)</strong> son las zonas preferidas debido a la inmensa cantidad de servicios, oficinas corporativas, gimnasios modernos y centros comerciales de lujo a distancias caminables.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900">¿Cuál es el barrio más tranquilo y seguro?</h4>
            <p>
              <strong>Mburucuyá</strong> destaca por ser puramente residencial, con calles empedradas cubiertas por enormes copas de árboles y presencia de embajadas, lo que garantiza una vigilancia y patrullaje policial superior al promedio.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
