import React from 'react';

const BASE = "inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer w-full sm:w-auto";
const VARIANTS = {
  primary: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs",
  secondary: "bg-slate-800 hover:bg-slate-700 text-slate-100",
  outline: "border border-slate-300 hover:border-slate-400 text-slate-700 hover:bg-slate-50"
};

/** Shared external-link button used by the directions / Google Maps actions. */
export default function MapLinkButton({ url, label, icon, variant = "outline" }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={`${BASE} ${VARIANTS[variant]}`}>
      {icon}
      <span>{label}</span>
    </a>
  );
}
