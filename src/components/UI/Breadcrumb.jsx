import Link from 'next/link';
import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { SITE_URL } from '../../lib/seo';
import { jsonLd } from '../../lib/jsonLd';

const HOME_LABEL = { es: 'Inicio', en: 'Home', pt: 'Início' };

export default function Breadcrumb({ items = [], locale = 'es' }) {
  const siteUrl = SITE_URL;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": HOME_LABEL[locale] || HOME_LABEL.es,
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
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 py-4">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(schema) }}
      />

      <Link
        href={`/${locale}`}
        className="flex items-center gap-1 hover:text-emerald-600 transition"
      >
        <Home className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">{HOME_LABEL[locale] || HOME_LABEL.es}</span>
      </Link>

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
              <Link
                href={`/${locale}${item.url}`}
                className="hover:text-emerald-600 transition truncate max-w-[200px] sm:max-w-none"
              >
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
