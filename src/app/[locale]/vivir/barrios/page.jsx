import React from 'react';
import dynamic from 'next/dynamic';
import Breadcrumb from '../../../../components/UI/Breadcrumb';
import UpdatedBadge from '../../../../components/UI/UpdatedBadge';

// Lazy load the polygon map to avoid SSR issues
const NeighborhoodMap = dynamic(
  () => import('../../../../components/Map/NeighborhoodMap'),
  {
    ssr: false,
    loading: () => (
      <div className="h-[500px] w-full flex flex-col items-center justify-center bg-slate-100 text-slate-500 font-semibold gap-3 rounded-2xl border border-slate-200">
        <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs uppercase font-mono tracking-wider">Cargando Mapa de Barrios...</span>
      </div>
    )
  }
);

export async function generateMetadata({ params: { locale } }) {
  const titles = {
    es: "Mejores Barrios de Asunción: Seguridad y Alquileres | ParaguayReal",
    en: "Best Neighborhoods in Asunción: Safety & Rent | ParaguayReal",
    pt: "Melhores Bairros de Assunção: Segurança e Aluguel | ParaguayReal"
  };

  return {
    title: titles[locale] || titles.es,
    description: "Mapa interactivo de los barrios residenciales de Asunción: Villa Morra, Las Mercedes, Mburucuyá y Centro. Índices de seguridad y costos."
  };
}

export default function BarriosPage({ params: { locale } }) {
  const breadcrumbs = [
    { label: "Vivir", url: "/vivir/barrios" },
    { label: "Barrios de Asunción", url: "/vivir/barrios" }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 select-none space-y-8">
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
      <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
        <h3 className="font-extrabold text-slate-900 text-lg">Resumen de Recomendaciones</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900">¿Dónde viven la mayoría de los extranjeros?</h4>
            <p>
              **Villa Morra** y el eje de la **Avenida Aviadores del Chaco (Manora, Ycua Sati)** son las zonas preferidas debido a la inmensa cantidad de servicios, oficinas corporativas, gimnasios modernos y centros comerciales de lujo a distancias caminables.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900">¿Cuál es el barrio más tranquilo y seguro?</h4>
            <p>
              **Mburucuyá** destaca por ser puramente residencial, con calles empedradas cubiertas por enormes copas de árboles y presencia de embajadas, lo que garantiza una vigilancia y patrullaje policial superior al promedio.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
