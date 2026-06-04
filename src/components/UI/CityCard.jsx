import React from 'react';
import { Star, Shield, ArrowRight, DollarSign } from 'lucide-react';

export default function CityCard({ city, locale = 'es' }) {
  const { name, slug, description, photo, safety, cost, pros = [] } = city;

  return (
    <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col group h-full">
      {/* City Photo */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100 shrink-0">
        <img
          src={photo}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
        <h3 className="absolute bottom-4 left-5 text-xl font-extrabold text-white font-display">
          {name}
        </h3>
      </div>

      {/* Info & Metrics */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
            {description}
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-4 py-2 border-y border-slate-100 text-xs">
            <div className="flex items-center gap-1.5 text-slate-700">
              <Shield className="w-4 h-4 text-emerald-600" />
              <div>
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Seguridad</span>
                <span className="font-semibold">{safety}</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-slate-700">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              <div>
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Costo</span>
                <span className="font-semibold">{cost}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pros summary */}
        {pros.length > 0 && (
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Destacados:</span>
            <ul className="text-xs text-slate-600 space-y-1 list-disc pl-4">
              {pros.slice(0, 2).map((pro, index) => (
                <li key={index} className="truncate">{pro}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Link */}
        <div className="pt-2">
          <a
            href={`/${locale}/ciudades/${slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 group-hover:text-emerald-700 transition"
          >
            <span>Explorar {name}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
}
