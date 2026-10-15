'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const LazyNeighborhoodMap = dynamic(
  () => import('./NeighborhoodMap'),
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

export default LazyNeighborhoodMap;
