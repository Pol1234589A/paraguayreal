import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function Breadcrumb({ items = [], locale = 'es' }) {
  const t = useTranslations();
  const siteUrl = 'https://paraguayreal.com';

  const formatUrl = (url) => {
    if (!url) return '';
    if (url.startsWith(`/${locale}/`) || url === `/${locale}`) return url;
    return url.startsWith('/') ? `/${locale}${url}` : `/${locale}/${url}`;
  };

  const homeLabel = t ? (t("Navigation.home") || "Inicio") : "Inicio";

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": homeLabel,
        "item": `${siteUrl}/${locale}`
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": item.label,
        "item": item.url ? `${siteUrl}${formatUrl(item.url)}` : undefined
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
        <span className="hidden sm:inline">{homeLabel}</span>
      </a>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const targetUrl = formatUrl(item.url);
        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3 h-3 text-slate-300 shrink-0" />
            {isLast || !item.url ? (
              <span className="font-semibold text-slate-800 truncate max-w-[200px] sm:max-w-none">
                {item.label}
              </span>
            ) : (
              <a
                href={targetUrl}
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
