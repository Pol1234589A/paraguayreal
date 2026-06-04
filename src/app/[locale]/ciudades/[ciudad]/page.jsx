import React from 'react';
import dynamic from 'next/dynamic';
import Breadcrumb from '../../../../components/UI/Breadcrumb';
import UpdatedBadge from '../../../../components/UI/UpdatedBadge';
import SchemaOrg from '../../../../components/SEO/SchemaOrg';
import placesGeoJSON from '../../../../../data/places.json';
import { Check, X, Shield, DollarSign, MapPin } from 'lucide-react';

const CityMap = dynamic(
  () => import('../../../../components/Map/CityMap'),
  {
    ssr: false,
    loading: () => (
      <div className="h-[450px] w-full flex items-center justify-center bg-slate-100 rounded-xl border border-slate-200">
        <span className="text-xs text-slate-500 uppercase font-mono animate-pulse">Cargando mapa de la ciudad...</span>
      </div>
    )
  }
);

const CITIES_DATA = {
  "asuncion": {
    name: "Asunción",
    description: "La capital de Paraguay y el epicentro financiero, cultural y de negocios del país. Mezcla rascacielos modernos con casonas coloniales y áreas residenciales sumamente arboladas.",
    safety: "Favorable (Evitando el centro de noche)",
    cost: "Alto ($800 - $1,500 USD/mes)",
    photo: "https://images.unsplash.com/photo-1590487988256-9ed24133863e?w=800&auto=format&fit=crop&q=80",
    pros: [
      "Principal centro de empleo profesional y de negocios.",
      "Excelente variedad de colegios privados y sanatorios médicos.",
      "Vida nocturna, bares y restaurantes internacionales de alto nivel."
    ],
    cons: [
      "El tráfico vehicular en horas punta es pesado.",
      "Infraestructura vial con baches durante días de lluvias fuertes."
    ]
  },
  "ciudad-del-este": {
    name: "Ciudad del Este",
    description: "Ubicada en la Triple Frontera con Brasil y Argentina, es una de las zonas de libre comercio más grandes del mundo. Dinámica, multicultural e ideal para comerciantes e inversores tecnológicos.",
    safety: "Moderada (Cuidado en el microcentro)",
    cost: "Medio ($600 - $1,000 USD/mes)",
    photo: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&auto=format&fit=crop&q=80",
    pros: [
      "Oportunidades masivas de comercio e importación.",
      "Acceso directo e inmediato al mercado de Brasil (Foz de Yguazú).",
      "Cercanía a maravillas naturales como los Saltos del Monday."
    ],
    cons: [
      "El microcentro comercial es muy caótico y ruidoso.",
      "Poca actividad cultural y de ocio después del cierre de tiendas."
    ]
  },
  "encarnacion": {
    name: "Encarnación",
    description: "Conocida como la 'Perla del Sur', es la ciudad veraniega por excelencia y destaca por sus playas de río impecables, su costanera limpia y ordenada y un ritmo de vida sumamente seguro y pacífico.",
    safety: "Excelente (La más segura del país)",
    cost: "Medio ($500 - $900 USD/mes)",
    photo: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
    pros: [
      "Playas fluviales seguras y costanera de primer mundo.",
      "Nivel de seguridad ciudadana superior al resto del país.",
      "Tranquilidad y ambiente familiar impecable."
    ],
    cons: [
      "La actividad económica e industrial es más reducida.",
      "En invierno la oferta de entretenimiento disminuye considerablemente."
    ]
  }
};

export async function generateMetadata({ params: { ciudad } }) {
  const city = CITIES_DATA[ciudad];
  if (!city) return { title: "Ciudad no encontrada" };

  return {
    title: `Vivir en ${city.name}: Guía Completa de Precios y Zonas | ParaguayReal`,
    description: `Descubre todo sobre vivir en ${city.name}: pros y contras, seguridad, costos promedio de vida y mapa de lugares recomendados.`
  };
}

export default function CiudadPage({ params: { ciudad, locale } }) {
  const city = CITIES_DATA[ciudad];

  if (!city) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center font-bold">
        Ciudad no encontrada en nuestra base de datos.
      </div>
    );
  }

  const breadcrumbs = [
    { label: "Ciudades", url: "/ciudades/asuncion" },
    { label: item => item.toUpperCase(), label: city.name, url: `/ciudades/${ciudad}` }
  ];

  // Structured Place schemas
  const placeSchema = {
    "@context": "https://schema.org",
    "@type": "Place",
    "name": city.name,
    "description": city.description,
    "image": city.photo,
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "PY",
      "addressLocality": city.name
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 select-none space-y-8">
      <SchemaOrg schema={placeSchema} />
      <Breadcrumb items={breadcrumbs} locale={locale} />

      {/* Hero Banner */}
      <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden shadow-lg bg-slate-900 text-white">
        <img
          src={city.photo}
          alt={city.name}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/30 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 space-y-2">
          <UpdatedBadge />
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display leading-none">
            Guía de Vida en {city.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 max-w-xl line-clamp-2">
            {city.description}
          </p>
        </div>
      </div>

      {/* Pros & Cons */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pros */}
        <div className="bg-emerald-50/30 border border-emerald-100 rounded-xl p-5 space-y-3">
          <h3 className="font-extrabold text-slate-900 text-sm sm:text-base flex items-center gap-1.5">
            <Check className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Ventajas de vivir en {city.name}</span>
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-700 list-none pl-1">
            {city.pros.map((pro, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold shrink-0 mt-0.5">•</span>
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Cons */}
        <div className="bg-red-50/20 border border-red-100 rounded-xl p-5 space-y-3">
          <h3 className="font-extrabold text-slate-900 text-sm sm:text-base flex items-center gap-1.5">
            <X className="w-5 h-5 text-red-600 shrink-0" />
            <span>Desventajas de vivir en {city.name}</span>
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-700 list-none pl-1">
            {city.cons.map((con, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-red-500 font-bold shrink-0 mt-0.5">•</span>
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Quick Stats Panel */}
      <section className="bg-white rounded-xl border border-slate-100 p-5 shadow-sm grid grid-cols-2 gap-4 text-xs sm:text-sm">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-emerald-600" />
          <div>
            <span className="text-[10px] font-bold text-slate-400 block uppercase">Nivel de Seguridad</span>
            <span className="font-semibold text-slate-800">{city.safety}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-emerald-600" />
          <div>
            <span className="text-[10px] font-bold text-slate-400 block uppercase">Costo Mensual Estimado</span>
            <span className="font-semibold text-slate-800">{city.cost}</span>
          </div>
        </div>
      </section>

      {/* Local Map */}
      <section className="space-y-4">
        <h3 className="font-extrabold text-slate-950 text-base sm:text-lg flex items-center gap-2">
          <MapPin className="w-5 h-5 text-emerald-600" />
          <span>Lugares Recomendados en {city.name}</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          Explora los centros de salud, comercios y zonas turísticas clave que hemos catalogado para {city.name}. Puedes hacer clic en los pines para obtener rutas directas de Google Maps.
        </p>
        <CityMap cityKey={ciudad} places={placesGeoJSON.features} locale={locale} />
      </section>
    </div>
  );
}
