import Link from 'next/link';
import React, { use } from 'react';
import { setRequestLocale } from 'next-intl/server';
import { pageAlternates, SITE_URL } from '../../lib/seo';
import { useTranslations } from 'next-intl';
import SearchBar from '../../components/UI/SearchBar';

import CityMap from '../../components/Map/LazyCityMap';
import SchemaOrg from '../../components/SEO/SchemaOrg';
import { getPlaces } from '../../lib/places';
import { Map, DollarSign, UserCheck, Compass, Briefcase, Building, ShieldCheck, ArrowRight } from 'lucide-react';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
    alternates: pageAlternates(locale),
    openGraph: { siteName: 'ParaguayReal', url: `/${locale}`, type: 'website', images: [{ url: '/logo.png' }] },
    twitter: { card: 'summary_large_image', images: ['/logo.png'] }
  };
}

export default function HomePage({ params }) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations();

  // Organization structured schema for AI engines and search crawlers
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ParaguayReal",
    "url": SITE_URL,
    "logo": `${SITE_URL}/logo.png`,
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "info@paraguayreal.com"
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "ParaguayReal",
    "url": SITE_URL
  };

  // 6 subcategories grid definitions
  const categories = [
    {
      title: t("Home.categories.costOfLiving.title"),
      desc: t("Home.categories.costOfLiving.desc"),
      url: "/precios",
      icon: <DollarSign className="w-5 h-5 text-emerald-600" />,
      bg: "bg-emerald-50"
    },
    {
      title: t("Home.categories.howToMove.title"),
      desc: t("Home.categories.howToMove.desc"),
      url: "/blog/como-obtener-residencia-permanente-paraguay",
      icon: <UserCheck className="w-5 h-5 text-blue-600" />,
      bg: "bg-blue-50"
    },
    {
      title: t("Home.categories.tourism.title"),
      desc: t("Home.categories.tourism.desc"),
      url: "/turismo",
      icon: <Compass className="w-5 h-5 text-amber-600" />,
      bg: "bg-amber-50"
    },
    {
      title: t("Home.categories.business.title"),
      desc: t("Home.categories.business.desc"),
      url: "/negocios",
      icon: <Briefcase className="w-5 h-5 text-purple-600" />,
      bg: "bg-purple-50"
    },
    {
      title: t("Home.categories.cities.title"),
      desc: t("Home.categories.cities.desc"),
      url: "/ciudades/asuncion",
      icon: <Building className="w-5 h-5 text-slate-600" />,
      bg: "bg-slate-50"
    },
    {
      title: t("Home.categories.safety.title"),
      desc: t("Home.categories.safety.desc"),
      url: "/blog/seguridad-infraestructura-paraguay-emigrantes",
      icon: <ShieldCheck className="w-5 h-5 text-red-600" />,
      bg: "bg-red-50"
    }
  ];

  return (
    <div className="space-y-16 pb-20">
      <SchemaOrg schema={organizationSchema} />
      <SchemaOrg schema={websiteSchema} />

      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white py-20 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-emerald-950/40 via-slate-950 to-slate-950 z-0 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display leading-tight text-white">
            {t("Hero.title")}
          </h1>
          <p className="text-slate-300 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {t("Hero.subtitle")}
          </p>

          {/* Search bar integration */}
          <div className="pt-4 flex justify-center">
            <SearchBar placeholder={t("Hero.searchPlaceholder")} locale={locale} />
          </div>

          {/* CTAs */}
          <div className="pt-6 flex flex-wrap gap-4 justify-center items-center">
            <Link
              href={`/${locale}/mapa`}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg transition-all hover:scale-105 duration-200 cursor-pointer"
            >
              {t("Hero.ctaPrimary")}
            </Link>
            <Link
              href={`/${locale}/vivir/barrios`}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl border border-slate-700 transition"
            >
              {t("Hero.ctaSecondary")}
            </Link>
          </div>

          <p className="text-[11px] sm:text-xs text-slate-500 font-semibold tracking-wide">
            {t("Hero.trending")}
          </p>
        </div>
      </section>

      {/* Category Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-extrabold text-slate-900 font-display mb-1 text-center">
          {t("Home.gridTitle")}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mb-10 text-center">
          {t("Home.gridSubtitle")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Map Card - Spans 2 cols */}
          <div className="md:col-span-2 bg-linear-to-br from-emerald-800 to-slate-950 text-white p-8 rounded-3xl flex flex-col justify-between shadow-xl group min-h-[260px] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
            <div>
              <span className="bg-emerald-500 text-white text-[11px] font-black px-2.5 py-0.5 rounded-full uppercase leading-none inline-block mb-3">
                {t("Home.toolBadge")}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-white mb-2">
                {t("Home.toolTitle")}
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm max-w-md leading-relaxed">
                {t("Home.toolDesc")}
              </p>
            </div>
            <div className="pt-6">
              <Link
                href={`/${locale}/mapa`}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all"
              >
                <span>{t("Home.exploreMap")}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Simple Cards */}
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-100 p-6 rounded-2xl shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className={`p-2.5 rounded-xl w-fit ${cat.bg}`}>
                  {cat.icon}
                </div>
                <div className="space-y-1">
                  <h4 className="font-extrabold text-slate-900 text-base">{cat.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{cat.desc}</p>
                </div>
              </div>
              <div className="pt-6">
                <Link
                  href={`/${locale}${cat.url}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700 transition"
                >
                  <span>{t("Home.exploreCategory")}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Map Preview Section on Home */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-200/60 pt-16">
        <div className="text-center space-y-2 mb-8">
          <h2 className="text-2xl font-extrabold text-slate-900 font-display flex items-center justify-center gap-2">
            <Map className="w-6 h-6 text-emerald-600" />
            <span>{t("Home.previewTitle")}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
            {t("Home.previewDesc")}
          </p>
        </div>

        <CityMap cityKey="asuncion" places={getPlaces(locale)} locale={locale} />
      </section>
    </div>
  );
}
