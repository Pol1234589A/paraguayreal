'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, BookOpen, X } from 'lucide-react';
import placesGeoJSON from '../../../data/places.json';

// Static site sections/articles to search through
const STATIC_GUIDES = [
  { id: "coste-de-vida", name: "Costo de Vida en Paraguay", url: "/precios", type: "guide" },
  { id: "barrios-asuncion", name: "Seguridad y Barrios en Asunción", url: "/vivir/barrios", type: "guide" },
  { id: "residencia-permanente", name: "Guía de Residencia Permanente", url: "/blog/como-obtener-residencia-permanente-paraguay", type: "guide" },
  { id: "negocios-inversion", name: "Hacer Negocios e Impuestos", url: "/negocios", type: "guide" }
];

export default function SearchBar({ placeholder = "Buscar...", locale = 'es' }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close recommendations on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter items
  useEffect(() => {
    if (query.trim().length === 0) {
      setResults([]);
      return;
    }

    const cleanQuery = query.toLowerCase();

    // 1. Search in GeoJSON places
    const matchedPlaces = placesGeoJSON.features
      .filter((place) =>
        place.properties.name.toLowerCase().includes(cleanQuery) ||
        place.properties.tags.some(tag => tag.toLowerCase().includes(cleanQuery))
      )
      .slice(0, 4)
      .map((place) => ({
        id: place.properties.id,
        name: place.properties.name,
        url: `/mapa?id=${place.properties.id}`,
        type: "place",
        category: place.properties.category
      }));

    // 2. Search in guides
    const matchedGuides = STATIC_GUIDES.filter((guide) =>
      guide.name.toLowerCase().includes(cleanQuery)
    ).slice(0, 3);

    setResults([...matchedPlaces, ...matchedGuides]);
  }, [query]);

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-lg">
      <div className="relative">
        <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all text-slate-800"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 focus:outline-none"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Auto-suggest results dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-100 z-50 max-h-80 overflow-y-auto divide-y divide-slate-50">
          {results.map((item, idx) => (
            <a
              key={idx}
              href={`/${locale}${item.url}`}
              className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition group"
            >
              {item.type === 'place' ? (
                <div className="p-1.5 bg-emerald-50 rounded-lg group-hover:bg-emerald-100 transition">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                </div>
              ) : (
                <div className="p-1.5 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition">
                  <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <span className="block text-xs font-bold text-slate-900 truncate">
                  {item.name}
                </span>
                <span className="block text-[10px] text-slate-400 uppercase font-semibold">
                  {item.type === 'place' ? `Lugar · ${item.category}` : "Guía / Artículo"}
                </span>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
