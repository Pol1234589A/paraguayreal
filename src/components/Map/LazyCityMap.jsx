'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const LazyCityMap = dynamic(() => import('./CityMap'), {
  ssr: false,
  loading: () => <div className="h-[450px] w-full bg-slate-100 rounded-xl border border-slate-200 animate-pulse" />
});

export default LazyCityMap;
