import React from 'react';
import Breadcrumb from '../../../../components/UI/Breadcrumb';
import UpdatedBadge from '../../../../components/UI/UpdatedBadge';
import RelatedArticles from '../../../../components/UI/RelatedArticles';
import SchemaOrg from '../../../../components/SEO/SchemaOrg';
import { Calendar, User, Clock } from 'lucide-react';
import { ARTICLES_DB } from '../../../../lib/blogData';

export async function generateMetadata({ params: { slug } }) {
  const article = ARTICLES_DB[slug];
  if (!article) return { title: "Artículo no encontrado" };

  return {
    title: `${article.title} | ParaguayReal`,
    description: article.description
  };
}

export default function ArticlePage({ params: { slug, locale } }) {
  const article = ARTICLES_DB[slug];

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center font-bold">
        El artículo no se encuentra en nuestra base de datos.
      </div>
    );
  }

  const breadcrumbs = [
    { label: "Blog", url: "/blog" },
    { label: article.title, url: `/blog/${slug}` }
  ];

  // Article JSON-LD Structured schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "image": article.photo,
    "datePublished": "2026-05-15T08:00:00+02:00",
    "dateModified": "2026-06-04T12:00:00+02:00",
    "author": {
      "@type": "Person",
      "name": article.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "ParaguayReal",
      "logo": {
        "@type": "ImageObject",
        "url": "https://paraguayreal.com/logo.png"
      }
    }
  };

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 select-none space-y-6">
      <SchemaOrg schema={articleSchema} />
      <Breadcrumb items={breadcrumbs} locale={locale} />

      {/* Title & Metadata */}
      <div className="space-y-4">
        <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded uppercase border border-emerald-100">
          {article.category}
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display leading-tight text-slate-900">
          {article.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-semibold border-y border-slate-100 py-3.5">
          <div className="flex items-center gap-1.5">
            <User className="w-4 h-4 text-slate-300" />
            <span>Por: {article.author}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-slate-300" />
            <span>{article.date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-slate-300" />
            <span>{article.readTime}</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <UpdatedBadge />
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="h-64 sm:h-96 w-full rounded-2xl overflow-hidden shadow bg-slate-100">
        <img
          src={article.photo}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content body */}
      <div className="prose prose-slate max-w-none prose-sm sm:prose-base pt-4">
        {article.content}
      </div>

      {/* Related section */}
      <section className="border-t border-slate-200/80 pt-10 mt-12">
        <RelatedArticles category={article.category.toLowerCase()} currentSlug={slug} locale={locale} />
      </section>
    </article>
  );
}
