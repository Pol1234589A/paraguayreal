import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumb({ items = [], locale = 'es' }) {
  const siteUrl = 'https://paraguayreal.com';

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Inicio",
        "item": `${siteUrl}/${locale}`
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": item.label,
        "item": item.url ? `${siteUrl}/${locale}${item.url}` : undefined
      }))
    ]
  };

  return (
    <nav className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 py-4 select-none">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <a
        href={`/${locale}`}
        className="flex items-center gap-1 hover:text-emerald-600 transition"
      >
        <Home className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Inicio</span>
      </a>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3 h-3 text-slate-300 shrink-0" />
            {isLast || !item.url ? (
              <span className="font-semibold text-slate-800 truncate max-w-[200px] sm:max-w-none">
                {item.label}
              </span>
            ) : (
              <a
                href={`/${locale}${item.url}`}
                className="hover:text-emerald-600 transition truncate max-w-[200px] sm:max-w-none"
              >
                {item.label}
              </a>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
