'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const LazyMiniMap = dynamic(
  () => import('./MiniMap'),
  {
    ssr: false,
    loading: () => (
      <div className="h-[250px] w-full bg-slate-100 flex items-center justify-center rounded-xl border border-slate-200">
        <span className="text-[11px] uppercase font-mono tracking-wider animate-pulse">Cargando mini mapa del lugar...</span>
      </div>
    )
  }
);

export default LazyMiniMap;
