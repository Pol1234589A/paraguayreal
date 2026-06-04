'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import Breadcrumb from '../../../components/UI/Breadcrumb';
import UpdatedBadge from '../../../components/UI/UpdatedBadge';
import { ARTICLES_DB } from '../../../lib/blogData';
import { Search, Calendar, User, Clock, ArrowRight, BookOpen } from 'lucide-react';

export default function BlogIndexPage({ params: { locale } }) {
  const t = useTranslations();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const breadcrumbs = [
    { label: t("Navigation.blog") || "Blog", url: "/blog" }
  ];

  // Convert ARTICLES_DB object to array for array operations
  const articles = Object.entries(ARTICLES_DB).map(([slug, data]) => ({
    slug,
    ...data
  }));

  // Extract unique categories for filter tabs
  const categories = ['Todos', ...new Set(articles.map(art => art.category))];

  // Filter logic
  const filteredArticles = articles.filter(art => {
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          art.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || art.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 select-none space-y-8">
      <Breadcrumb items={breadcrumbs} locale={locale} />

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 pb-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
              {t("Navigation.blog") || "Blog y Artículos Informativos"}
            </h1>
            <UpdatedBadge />
          </div>
          <p className="text-sm text-slate-600 max-w-xl font-light">
            {locale === 'en' && "Read verified guides, tax reviews, and cost of living reports drafted by local residents."}
            {locale === 'pt' && "Leia guias verificados, análises tributárias e relatórios de custo de vida elaborados por moradores locais."}
            {locale === 'es' && "Explora guías verificadas, análisis tributarios y reportes de costo de vida redactados por residentes locales y expertos."}
          </p>
        </div>

        {/* Search bar inside page */}
        <div className="relative w-full md:max-w-xs shrink-0">
          <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={locale === 'en' ? "Search articles..." : locale === 'pt' ? "Buscar artigos..." : "Buscar artículos..."}
            className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-slate-800 shadow-sm"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 border-b border-slate-100 scrollbar-none">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition select-none cursor-pointer ${
              selectedCategory === cat
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article, idx) => (
            <article 
              key={idx} 
              className="bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Visual Header Image */}
                <div className="h-48 w-full overflow-hidden bg-slate-100 relative">
                  <img
                    src={article.photo}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-slate-900 text-[10px] font-black px-2.5 py-0.5 rounded uppercase shadow-sm">
                    {article.category}
                  </span>
                </div>

                {/* Info Text */}
                <div className="px-5 space-y-2">
                  <h2 className="text-base sm:text-lg font-extrabold text-slate-900 font-display line-clamp-2 leading-snug group-hover:text-emerald-600 transition">
                    <a href={`/${locale}/blog/${article.slug}`}>
                      {article.title}
                    </a>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-3 font-light">
                    {article.description}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-5 pb-5 pt-4 border-t border-slate-50 mt-4 flex items-center justify-between">
                <div className="flex gap-3 text-[10px] text-slate-400 font-semibold">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{article.readTime}</span>
                  </span>
                </div>
                <a 
                  href={`/${locale}/blog/${article.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700 transition"
                >
                  <span>{locale === 'en' ? "Read more" : locale === 'pt' ? "Ler mais" : "Leer artículo"}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl border border-slate-100 space-y-3">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-lg font-bold text-slate-700">No se encontraron artículos</h3>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            Intenta cambiar los términos de búsqueda o selecciona otra categoría de filtros.
          </p>
        </div>
      )}
    </div>
  );
}
