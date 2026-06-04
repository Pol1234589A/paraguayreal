import React from 'react';
import { Clock, Calendar, ArrowRight } from 'lucide-react';

export default function BlogCard({ post, locale = 'es' }) {
  const { title, description, category, date, readTime, photo, slug } = post;

  return (
    <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group h-full">
      {/* Blog Photo */}
      {photo && (
        <a href={`/${locale}/blog/${slug}`} className="block h-48 w-full overflow-hidden bg-slate-100 shrink-0">
          <img
            src={photo}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </a>
      )}

      {/* Info & Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Metadata */}
          <div className="flex items-center justify-between text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
            <span className="bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded font-bold">
              {category}
            </span>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{date}</span>
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{readTime}</span>
              </span>
            </div>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-emerald-600 transition">
            <a href={`/${locale}/blog/${slug}`}>{title}</a>
          </h3>

          <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
            {description}
          </p>
        </div>

        {/* Read More Link */}
        <div className="pt-2">
          <a
            href={`/${locale}/blog/${slug}`}
            className="inline-flex items-center gap-1 text-xs font-bold text-slate-900 group-hover:text-emerald-600 transition"
          >
            <span>Leer artículo</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
}
