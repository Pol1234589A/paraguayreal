import React from 'react';
import { Calendar } from 'lucide-react';

export default function UpdatedBadge({ dateText = "Junio 2026", label = "Actualizado" }) {
  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold uppercase tracking-wide border border-emerald-100 select-none shadow-sm">
      <Calendar className="w-3 h-3 text-emerald-600 animate-pulse" />
      <span>{label}: {dateText}</span>
    </div>
  );
}
