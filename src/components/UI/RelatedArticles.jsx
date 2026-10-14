import Link from 'next/link';
import React from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';

export default function RelatedArticles({ posts = [], locale = "es" }) {
  const articles = posts;

  if (articles.length === 0) return null;

  return (
    <div className="space-y-4">
      <h4 className="text-base font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
        <BookOpen className="w-4 h-4 text-emerald-600" />
        <span>Artículos Relacionados</span>
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.slice(0, 3).map((art, index) => (
          <Link
            key={art.slug}
            href={`/${locale}/blog/${art.slug}`}
            className="group block bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition duration-200"
          >
            <div className="h-32 bg-slate-100 relative">
              <img loading="lazy" decoding="async"
                src={art.photo}
                alt={art.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
            </div>
            <div className="p-4 space-y-2">
              <span className="text-[11px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded uppercase">
                {art.category}
              </span>
              <h5 className="font-bold text-xs text-slate-800 line-clamp-2 group-hover:text-emerald-600 transition leading-snug">
                {art.title}
              </h5>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
