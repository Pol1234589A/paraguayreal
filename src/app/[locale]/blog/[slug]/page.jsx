import React from 'react';
import { setRequestLocale } from 'next-intl/server';
import Breadcrumb from '../../../../components/UI/Breadcrumb';
import UpdatedBadge from '../../../../components/UI/UpdatedBadge';
import RelatedArticles from '../../../../components/UI/RelatedArticles';
import SchemaOrg from '../../../../components/SEO/SchemaOrg';
import { Calendar, User, Clock } from 'lucide-react';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { getPost, getAllPosts, getAllSlugs, postLocales } from '../../../../lib/blog';
import LazyMiniMap from '../../../../components/Map/LazyMiniMap';
import { notFound } from 'next/navigation';
import { pageMetadata, LOCALES, SITE_URL } from '../../../../lib/seo';

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    getAllSlugs().map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }) {
  const { slug, locale } = await params;
  const article = getPost(slug, locale);
  if (!article) return {};

  return pageMetadata({
    locale,
    path: `/blog/${slug}`,
    title: `${article.title} | ParaguayReal`,
    description: article.description,
    image: article.photo,
    type: 'article',
    onlyDefaultLocale: !article.translated,
    locales: postLocales(slug),
    extra: { publishedTime: article.date, authors: [article.author] }
  });
}

export default async function ArticlePage({ params }) {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  const article = getPost(slug, locale);

  if (!article) notFound();
  const { content } = await compileMDX({
    source: article.content,
    components: { MiniMap: LazyMiniMap },
    options: { mdxOptions: { remarkPlugins: [remarkGfm] } }
  });
  const related = getAllPosts(locale).filter((p) => p.slug !== slug).slice(0, 3);

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
    "datePublished": article.date,
    "dateModified": article.date,
    "mainEntityOfPage": `${SITE_URL}/${locale}/blog/${slug}`,
    "inLanguage": article.locale,
    "author": {
      "@type": "Person",
      "name": article.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "ParaguayReal",
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/logo.png`
      }
    }
  };

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <SchemaOrg schema={articleSchema} />
      <Breadcrumb items={breadcrumbs} locale={locale} />

      {/* Title & Metadata */}
      <div className="space-y-4">
        <span className="bg-emerald-50 text-emerald-800 text-[11px] font-bold px-2.5 py-0.5 rounded-sm uppercase border border-emerald-100">
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
            <span>{new Date(article.date).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
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
      <div className="h-64 sm:h-96 w-full rounded-2xl overflow-hidden shadow-sm bg-slate-100">
        <img loading="lazy" decoding="async"
          src={article.photo}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content body */}
      <div className="prose prose-slate max-w-none prose-sm sm:prose-base pt-4">
        {content}
      </div>

      {/* Related section */}
      <section className="border-t border-slate-200/80 pt-10 mt-12">
        <RelatedArticles posts={related} locale={locale} />
      </section>
    </article>
  );
}
