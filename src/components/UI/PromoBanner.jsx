import Link from 'next/link';
import React from 'react';
import { TrendingUp, CheckCircle, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default function PromoBanner({ locale = 'es' }) {
  const content = {
    es: {
      badge: "Servicio de Tráfico Real — Todo Paraguay",
      title1: "¿Tienes una propiedad, vehículo o negocio en Paraguay?",
      titleHighlight: "No esperes sentado: pagamos anuncios para que te vean.",
      desc: "Los marketplaces habituales son pasivos: subes tu anuncio y esperas que alguien busque. En Paraguay Real invertimos pauta publicitaria activa en Meta Ads y Google para llevar compradores calificados directo a tu WhatsApp.",
      freeBadge: "Publicación base 100% gratis",
      truthBadge: "Sin humo: reporte con datos reales",
      coverageBadge: "Cobertura en todo el país",
      plansFrom: "Planes desde",
      measurable: "Retorno Medible",
      price: "350.000 ₲",
      priceUsd: "(~$45 USD) / campaña",
      priceDesc: "Incluye presupuesto publicitario en Meta/Google, segmentación geográfica y entrega de informe analítico al finalizar.",
      btnViewPlans: "Ver Planes de Tráfico",
      btnPostFree: "Publicar Gratis (0 ₲)",
      disclaimer: "* No prometemos ventas milagrosas; garantizamos difusión real, compradores en tu WhatsApp e informes verificables."
    },
    en: {
      badge: "Real Traffic Service — Across Paraguay",
      title1: "Selling a property, vehicle or business in Paraguay?",
      titleHighlight: "Don't just wait around: we buy ads so buyers see you.",
      desc: "Common marketplaces are passive: you post and hope someone searches. At Paraguay Real, we run active paid campaigns on Meta Ads and Google to drive qualified buyers straight to your WhatsApp.",
      freeBadge: "Base listing 100% free",
      truthBadge: "No fluff: verified analytics report",
      coverageBadge: "Nationwide coverage in Paraguay",
      plansFrom: "Plans starting at",
      measurable: "Measurable Reach",
      price: "350,000 ₲",
      priceUsd: "(~$45 USD) / campaign",
      priceDesc: "Includes advertising budget on Meta/Google, geo-targeting, and delivery of an analytical report upon completion.",
      btnViewPlans: "Explore Traffic Plans",
      btnPostFree: "Post for Free (0 ₲)",
      disclaimer: "* No miraculous sales promises; we guarantee real ad spend, WhatsApp buyer inquiries, and verifiable reports."
    },
    pt: {
      badge: "Serviço de Tráfego Real — Todo o Paraguai",
      title1: "Tem um imóvel, veículo ou negócio no Paraguai?",
      titleHighlight: "Não fique só esperando: pagamos anúncios para que te vejam.",
      desc: "Os marketplaces tradicionais são passivos: você publica e espera que alguém procure. No Paraguay Real, investimos em anúncios no Meta Ads e Google para levar compradores qualificados direto ao seu WhatsApp.",
      freeBadge: "Publicação básica 100% gratuita",
      truthBadge: "Sem promessas falsas: relatório com dados reais",
      coverageBadge: "Cobertura em todo o país",
      plansFrom: "Planos a partir de",
      measurable: "Retorno Mensurável",
      price: "350.000 ₲",
      priceUsd: "(~$45 USD) / campanha",
      priceDesc: "Inclui orçamento publicitário no Meta/Google, segmentação geográfica e entrega de relatório analítico ao finalizar.",
      btnViewPlans: "Ver Planos de Tráfego",
      btnPostFree: "Publicar Grátis (0 ₲)",
      disclaimer: "* Não prometemos vendas mágicas; garantimos investimento real em anúncios, contatos no seu WhatsApp e relatórios verificáveis."
    }
  };

  const t = content[locale] || content.es;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-slate-900 via-slate-900 to-emerald-950 text-white p-6 sm:p-10 shadow-2xl border border-slate-800 my-10">
      {/* Decorative Glow */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Value Prop */}
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold tracking-wide uppercase">
            <Zap className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
            <span>{t.badge}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display tracking-tight text-white leading-tight">
            {t.title1} <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-teal-200">
              {t.titleHighlight}
            </span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
            {t.desc}
          </p>

          {/* Value Points */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{t.freeBadge}</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{t.truthBadge}</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
              <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{t.coverageBadge}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Action Card */}
        <div className="lg:col-span-5 bg-slate-800/80 backdrop-blur-md border border-slate-700/80 p-6 rounded-2xl flex flex-col justify-between space-y-5 shadow-xl">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
              <span>{t.plansFrom}</span>
              <span className="text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded">
                {t.measurable}
              </span>
            </div>
            <div className="text-3xl font-extrabold text-white flex items-baseline gap-2">
              <span>{t.price}</span>
              <span className="text-xs font-normal text-slate-400">{t.priceUsd}</span>
            </div>
            <p className="text-xs text-slate-300 leading-normal">
              {t.priceDesc}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              href={`/${locale}/promocionar`}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all hover:scale-[1.02] cursor-pointer text-center"
            >
              <span>{t.btnViewPlans}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href={`/${locale}/publicar`}
              className="inline-flex items-center justify-center px-4 py-3 bg-slate-700/90 hover:bg-slate-700 text-slate-200 font-semibold text-xs sm:text-sm rounded-xl border border-slate-600 transition text-center"
            >
              <span>{t.btnPostFree}</span>
            </Link>
          </div>

          <p className="text-[11px] text-slate-400 text-center italic">
            {t.disclaimer}
          </p>
        </div>
      </div>
    </div>
  );
}
