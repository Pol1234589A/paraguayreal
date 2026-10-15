'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const LazyInteractiveMap = dynamic(
  () => import('./InteractiveMap'),
  {
    ssr: false,
    loading: () => (
      <div className="h-[calc(100dvh-64px)] w-full flex flex-col items-center justify-center bg-slate-950 text-slate-100 font-semibold gap-3">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs text-slate-400 uppercase tracking-widest font-mono">Cargando Mapa Interactivo...</span>
      </div>
    )
  }
);

export default LazyInteractiveMap;
