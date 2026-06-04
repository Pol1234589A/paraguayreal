'use client';

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Breadcrumb from './Breadcrumb';
import UpdatedBadge from './UpdatedBadge';
import { Search, MapPin, Star, Calendar, Compass, ArrowRight, Check } from 'lucide-react';

const CityMap = dynamic(
  () => import('../Map/CityMap'),
  {
    ssr: false,
    loading: () => (
      <div className="h-[450px] w-full flex items-center justify-center bg-slate-100 rounded-xl border border-slate-200">
        <span className="text-xs text-slate-500 font-mono animate-pulse uppercase tracking-wider">Cargando mapa turístico de Paraguay...</span>
      </div>
    )
  }
);

export default function TourismClient({ placesFeatures, locale }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  // Filter features to keep only tourism places
  const allTourismPlaces = useMemo(() => {
    return placesFeatures.filter(
      (place) => place.properties.category === 'turismo'
    );
  }, [placesFeatures]);

  // Handle active tab categorization
  const filteredPlaces = useMemo(() => {
    return allTourismPlaces.filter((place) => {
      // 1. Tab filter
      const city = place.properties.city;
      const tags = place.properties.tags || [];
      const id = place.properties.id || '';

      if (activeTab === 'asuncion' && city !== 'asuncion') return false;
      if (activeTab === 'encarnacion-cde' && city !== 'encarnacion' && city !== 'ciudad-del-este') return false;
      if (activeTab === 'cordillera-aregua' && 
          city !== 'interior' && 
          !tags.includes('cordillera') && 
          !id.startsWith('aregua') && 
          !id.startsWith('altos') && 
          !id.startsWith('atyra') &&
          !id.includes('caacupe') &&
          !id.includes('bernardino')) {
        // Double check specifically for Cordillera cities under interior
        if (city === 'interior') {
          const lowerId = id.toLowerCase();
          const isCordillera = lowerId.includes('aregua') || 
                               lowerId.includes('altos') || 
                               lowerId.includes('atyra') || 
                               lowerId.includes('caacupe') || 
                               lowerId.includes('san-bernardino');
          if (!isCordillera) return false;
        } else {
          return false;
        }
      }
      if (activeTab === 'interior' && city !== 'interior') {
        // Exclude cordillera/aregua if activeTab is strictly other interior
        const lowerId = id.toLowerCase();
        const isCordillera = lowerId.includes('aregua') || 
                             lowerId.includes('altos') || 
                             lowerId.includes('atyra') || 
                             lowerId.includes('caacupe') || 
                             lowerId.includes('san-bernardino');
        if (isCordillera) return false;
      }

      // 2. Search query filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const name = place.properties.name.toLowerCase();
        const desc = place.properties.description.toLowerCase();
        const address = place.properties.address.toLowerCase();
        const placeTags = (place.properties.tags || []).map(t => t.toLowerCase());

        const matchesQuery = name.includes(query) || 
                             desc.includes(query) || 
                             address.includes(query) ||
                             placeTags.some(t => t.includes(query));
        if (!matchesQuery) return false;
      }

      return true;
    });
  }, [allTourismPlaces, activeTab, searchQuery]);

  const breadcrumbs = [
    { label: 'Turismo', url: '/turismo' }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 select-none space-y-8">
      <Breadcrumb items={breadcrumbs} locale={locale} />

      {/* Header section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <UpdatedBadge />
          <span className="bg-amber-100 text-amber-900 border border-amber-200 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
            Guía Oficial
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-display leading-tight text-slate-900 flex items-center gap-3">
          <Compass className="w-10 h-10 text-emerald-600 animate-spin-slow" />
          <span>Turismo y Lugares en Paraguay</span>
        </h1>
        <p className="text-slate-500 text-sm sm:text-base max-w-3xl leading-relaxed">
          Descubre los tesoros naturales, históricos y culturales de Paraguay. Desde la Costanera y museos coloniales de la capital hasta las imponentes ruinas jesuíticas, cascadas de la selva paranaense y lagos de Cordillera.
        </p>
      </div>

      {/* Search and Filters row */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por nombre, etiquetas o ciudad..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
          />
        </div>

        {/* Tab buttons */}
        <div className="flex flex-wrap gap-1.5 scrollbar-none overflow-x-auto">
          {[
            { id: 'all', label: 'Todos' },
            { id: 'asuncion', label: 'Asunción' },
            { id: 'cordillera-aregua', label: 'Areguá & Cordillera' },
            { id: 'encarnacion-cde', label: 'Encarnación / CDE' },
            { id: 'interior', label: 'Otros Interior' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Places */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-lg font-bold text-slate-900">
            Atracciones Recomendadas ({filteredPlaces.length})
          </h2>
          <span className="text-xs text-slate-400 font-medium">
            Mostrando resultados filtrados
          </span>
        </div>

        {filteredPlaces.length === 0 ? (
          <div className="text-center py-20 bg-white border border-slate-100 rounded-3xl space-y-4">
            <Compass className="w-12 h-12 text-slate-300 mx-auto" />
            <p className="text-slate-500 font-semibold text-sm">
              No encontramos lugares turísticos con esos filtros. ¡Prueba buscando otro término!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlaces.map((place) => {
              const p = place.properties;
              return (
                <div
                  key={p.id}
                  className="bg-white border border-slate-100/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                    <img
                      src={p.photo || 'https://images.unsplash.com/photo-1590487988256-9ed24133863e?w=500'}
                      alt={p.name}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 right-3 bg-emerald-500 text-white text-[9px] font-black px-2 py-0.5 rounded uppercase leading-none shadow-sm">
                      {p.city === 'interior' ? 'Interior' : p.city}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-[10px] font-extrabold text-slate-400 block uppercase tracking-wide">
                          {p.address}
                        </span>
                      </div>

                      <h3 className="font-extrabold text-slate-900 text-base leading-snug line-clamp-1">
                        {p.name}
                      </h3>

                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                        {p.description}
                      </p>
                    </div>

                    <div className="space-y-3 pt-3 border-t border-slate-50">
                      {/* Rating and Hours */}
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                          <span className="font-bold text-slate-700">{p.rating || '4.5'}</span>
                        </div>
                        <span className="text-[10px] font-semibold text-slate-500 block truncate max-w-[150px]">
                          🕒 {p.hours || 'Acceso libre'}
                        </span>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {(p.tags || []).slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="bg-slate-50 text-slate-500 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Direction Links */}
                      <div className="pt-2 flex gap-2">
                        <a
                          href={p.googleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 text-center py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl transition border border-emerald-100/60"
                        >
                          Ver Mapa
                        </a>
                        <a
                          href={p.googleMapsDirections || p.googleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 text-center py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition shadow-sm"
                        >
                          Cómo Llegar
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Map visualization of the filtered places */}
      <section className="space-y-4 pt-4 border-t border-slate-100">
        <div className="space-y-1">
          <h2 className="text-xl font-extrabold text-slate-900 font-display">
            Mapa de Atractivos Filtrados
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Navega por las coordenadas exactas de las atracciones turísticas seleccionadas. Haz clic en los pines para ver fotos y detalles de horarios.
          </p>
        </div>

        {/* We pass the filtered features array so the map only displays what is selected on the screen */}
        <CityMap cityKey="all" places={filteredPlaces} locale={locale} />
      </section>
    </div>
  );
}
