import React from 'react';
import { MapPin } from 'lucide-react';

export default function GoogleMapsButton({ label = "Ver en Google Maps", url, variant = "outline" }) {
  const baseStyle = "inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer w-full sm:w-auto";
  const variants = {
    primary: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm",
    secondary: "bg-slate-800 hover:bg-slate-700 text-slate-100",
    outline: "border border-slate-300 hover:border-slate-400 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseStyle} ${variants[variant]}`}
    >
      <MapPin className="w-3.5 h-3.5 text-red-500" />
      <span>{label}</span>
    </a>
  );
}
