import React from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';

export default function RelatedArticles({ category = "residencia", currentSlug = "", locale = "es" }) {
  // Demo articles to suggest
  const articles = [
    {
      title: "Cómo obtener la residencia permanente en Paraguay en 2026",
      slug: "como-obtener-residencia-permanente-paraguay",
      category: "residencia",
      photo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&auto=format&fit=crop&q=60"
    },
    {
      title: "Impuestos en Paraguay: Guía completa para extranjeros y freelancers",
      slug: "impuestos-extranjeros-paraguay",
      category: "negocios",
      photo: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=500&auto=format&fit=crop&q=60"
    },
    {
      title: "Mejores barrios para vivir en Asunción: Seguridad y precios",
      slug: "mejores-barrios-asuncion",
      category: "vivir",
      photo: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=500&auto=format&fit=crop&q=60"
    }
  ].filter(art => art.slug !== currentSlug);

  return (
    <div className="space-y-4">
      <h4 className="text-base font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
        <BookOpen className="w-4 h-4 text-emerald-600" />
        <span>Artículos Relacionados</span>
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.slice(0, 3).map((art, index) => (
          <a
            key={index}
            href={`/${locale}/blog/${art.slug}`}
            className="group block bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition duration-200"
          >
            <div className="h-32 bg-slate-100 relative">
              <img
                src={art.photo}
                alt={art.title}
                className="w-full h-full object-cover group-hover:scale-103 transition duration-300"
              />
            </div>
            <div className="p-4 space-y-2">
              <span className="text-[9px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded uppercase">
                {art.category}
              </span>
              <h5 className="font-bold text-xs text-slate-800 line-clamp-2 group-hover:text-emerald-600 transition leading-snug">
                {art.title}
              </h5>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
