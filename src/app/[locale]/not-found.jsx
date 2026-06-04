'use client';

import React from 'react';
import { Compass, Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 bg-slate-50 text-slate-800 select-none">
      <div className="space-y-6 max-w-md">
        <Compass className="w-16 h-16 text-emerald-600 mx-auto animate-spin" style={{ animationDuration: '4s' }} />
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 leading-tight">
          Página no encontrada
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Lo sentimos, la página que buscas no existe o se ha movido. Explora nuestro menú o vuelve al inicio para seguir navegando.
        </p>
        <div className="pt-4">
          <a
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Volver al Inicio</span>
          </a>
        </div>
      </div>
    </div>
  );
}
