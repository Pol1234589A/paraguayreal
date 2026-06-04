import React from 'react';
import { Navigation } from 'lucide-react';

export default function DirectionsButton({ label = "Cómo llegar", url }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all duration-200 cursor-pointer w-full sm:w-auto"
    >
      <Navigation className="w-3.5 h-3.5 text-white" />
      <span>{label}</span>
    </a>
  );
}
