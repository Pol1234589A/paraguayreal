import Link from 'next/link';
import React, { use } from 'react';
import { setRequestLocale } from 'next-intl/server';
import { pageMetadata } from '../../../lib/seo';
import { useTranslations } from 'next-intl';
import Breadcrumb from '../../../components/UI/Breadcrumb';
import SchemaOrg from '../../../components/SEO/SchemaOrg';
import { 
  Zap, 
  CheckCircle2, 
  XCircle, 
  BarChart3, 
  ShieldCheck, 
  DollarSign, 
  HelpCircle, 
  ArrowRight,
  MapPin,
  Clock,
  Sparkles,
  MessageCircle
} from 'lucide-react';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const titles = {
    es: "Tráfico Real: Promocionamos tu Anuncio en Todo Paraguay | ParaguayReal",
    en: "Real Traffic: We Promote Your Listing Across Paraguay | ParaguayReal",
    pt: "Tráfego Real: Promovemos seu Anúncio em Todo o Paraguai | ParaguayReal"
  };

  const descriptions = {
    es: "No somos un marketplace pasivo. Invertimos pauta activa en Facebook, Instagram y Google para mostrar tu propiedad, vehículo o negocio a compradores reales en Paraguay. Conoce nuestros packs con análisis de resultados.",
    en: "We are not a passive marketplace. We invest in active Facebook, Instagram and Google ads to showcase your property, vehicle or business to real buyers in Paraguay.",
    pt: "Não somos um marketplace passivo. Investimos em anúncios pagos no Facebook, Instagram e Google para mostrar seu imóvel, veículo ou negócio a compradores reais no Paraguai."
  };

  return pageMetadata({
    locale,
    path: '/promocionar',
    title: titles[locale] || titles.es,
    description: descriptions[locale] || descriptions.es
  });
}

export default function PromocionarPage({ params }) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations();

  const breadcrumbs = [
    { label: t("Navigation.map") ? (locale === 'en' ? 'Home' : locale === 'pt' ? 'Início' : 'Inicio') : 'Inicio', url: "/" },
    { label: "Promoción con Tráfico Real", url: "/promocionar" }
  ];

  // WhatsApp de coordinación comercial de Paraguay Real
  const WHATSAPP_CONTACT = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "595981000000";

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Tráfico Real - Publicidad Activa ParaguayReal",
    "provider": {
      "@type": "Organization",
      "name": "ParaguayReal",
      "url": "https://paraguayreal.com"
    },
    "description": "Servicio de pauta publicitaria activa en Meta Ads y Google para propiedades, vehículos y comercios en Paraguay.",
    "areaServed": {
      "@type": "Country",
      "name": "Paraguay"
    }
  };

  const plans = [
    {
      id: "local",
      name: "Pack Local / Ciudad",
      badge: "Ideal para alquileres y autos",
      priceGpy: "350.000 ₲",
      priceUsd: "~$45 USD",
      duration: "7 días de pauta activa",
      reach: "4.000 a 8.000 personas alcanzadas",
      target: "1 Ciudad o zona puntual (ej. Asunción, Luque, CDE, Encarnación)",
      color: "border-slate-200 hover:border-slate-400",
      featured: false,
      features: [
        "Inversión publicitaria en Meta Ads (Facebook e Instagram)",
        "Segmentación geográfica precisa por ciudad",
        "Enlace directo a tu ficha y a tu WhatsApp",
        "Diseño y copy adaptado a normativas de Meta",
        "Reporte analítico final con métricas reales",
        "Sin comisiones sobre el valor de tu venta"
      ]
    },
    {
      id: "departamental",
      name: "Pack Departamental",
      badge: "Más Solicitado 🔥",
      priceGpy: "700.000 ₲",
      priceUsd: "~$90 USD",
      duration: "14 días de pauta activa",
      reach: "12.000 a 25.000 personas alcanzadas",
      target: "Departamento Central + Asunción o Alto Paraná completo",
      color: "border-emerald-500 shadow-xl ring-2 ring-emerald-500/20",
      featured: true,
      features: [
        "Mayor presupuesto de pauta en Meta Ads + Google",
        "Cobertura ampliada metropolitana o departamental",
        "Optimización de creatividades a mitad de campaña",
        "Botón de WhatsApp destacado en la web",
        "Reporte analítico intermedio y final",
        "Diagnóstico de precio y competitividad de mercado"
      ]
    },
    {
      id: "nacional",
      name: "Pack Paraguay Total",
      badge: "Inmuebles de alto valor y empresas",
      priceGpy: "1.400.000 ₲",
      priceUsd: "~$180 USD",
      duration: "21 días de pauta activa",
      reach: "35.000 a 65.000+ personas alcanzadas",
      target: "Todo el territorio nacional (Región Oriental y Occidental/Chaco)",
      color: "border-slate-200 hover:border-slate-400",
      featured: false,
      features: [
        "Presupuesto robusto para máxima penetración nacional",
        "Campaña multicanal: Meta Ads + Google Search",
        "Destacado prioritario permanente en la cabecera del portal",
        "Soporte prioritario y ajuste de mensaje durante la campaña",
        "Reporte ejecutivo completo de interacciones y alcance",
        "Acceso directo a inversionistas y compradores de otras ciudades"
      ]
    }
  ];

  const faqs = [
    {
      q: "¿Por qué pagar por Tráfico Real si publicar es gratis?",
      a: "Publicar en Paraguay Real es y siempre será 100% gratis. Pero un anuncio gratis es pasivo: espera que alguien entre al portal y lo busque. Con Tráfico Real, nosotros invertimos dinero de verdad en Facebook, Instagram y Google para poner tu propiedad o vehículo frente a miles de personas que están en su celular en Paraguay en este mismo momento."
    },
    {
      q: "¿Pueden promocionar propiedades inmobiliarias según las reglas de Facebook?",
      a: "Sí, absolutamente. Meta tiene políticas sobre anuncios de vivienda (Special Ad Category) para evitar discriminación y estafas. Nosotros diseñamos los anuncios y las creatividades cumpliendo estrictamente con la normativa oficial: fotos claras, descripción objetiva, precio justo y sin promesas de inversión engañosas. Esto garantiza que el anuncio se apruebe rápido y sin riesgos de bloqueo."
    },
    {
      q: "¿Garantizan que voy a vender mi propiedad o vehículo?",
      a: "No, y cualquier agencia que te prometa una venta garantizada te está mintiendo. El cierre final de la venta depende de que tu precio sea competitivo, del estado de tu bien y de la rapidez con la que atiendas a los interesados por WhatsApp. Lo que nosotros sí garantizamos al 100% es que el presupuesto pactado se invierte en publicidad real y que te entregamos un reporte analítico verídico de cuánta gente lo vio y te contactó."
    },
    {
      q: "¿Qué incluye el Informe de Resultados?",
      a: "Al terminar la campaña recibes un reporte con: 1) Personas reales alcanzadas en Paraguay, 2) Veces que se mostró tu anuncio (impresiones), 3) Visitas a tu ficha completa, 4) Cantidad de clics al botón de tu WhatsApp, y 5) Una valoración honesta de nuestro equipo sobre el interés del mercado frente al precio publicado."
    },
    {
      q: "¿Qué medios de pago aceptan en Paraguay?",
      a: "Aceptamos Transferencia Bancaria Local (SIPAP), depósito bancario, Tigo Money / billeteras electrónicas, tarjetas de crédito/débito a través de Bancard / PagoMóvil, y Criptomonedas (USDT / Bitcoin) para clientes del exterior."
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <SchemaOrg schema={serviceSchema} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumb items={breadcrumbs} locale={locale} />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-black tracking-wide uppercase">
            <Zap className="w-4 h-4 text-emerald-600 fill-emerald-600" />
            <span>Motor de Tráfico Activo — Más que un Marketplace</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 font-display leading-tight tracking-tight">
            No dejes tu anuncio esperando. <br />
            <span className="text-emerald-600">Nosotros pagamos los anuncios</span> para que te compren.
          </h1>

          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Publicar tu anuncio en Paraguay Real es <strong>gratis</strong>. Pero si quieres resultados rápidos, 
            gestionamos e invertimos pauta publicitaria en <strong>Meta Ads y Google</strong> para llevar personas reales a tu WhatsApp en cualquier rincón de Paraguay.
          </p>

          <div className="pt-4 flex flex-wrap gap-4 justify-center items-center">
            <a
              href="#planes"
              className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base rounded-xl shadow-lg transition-all hover:scale-102 duration-200 cursor-pointer"
            >
              Ver Planes de Promoción
            </a>
            <Link
              href={`/${locale}/publicar`}
              className="px-6 py-3.5 bg-white hover:bg-slate-100 text-slate-800 font-bold text-sm sm:text-base rounded-xl border border-slate-200 shadow-xs transition"
            >
              Publicar Gratis Primero (0 ₲)
            </Link>
          </div>

          <div className="pt-2 flex items-center justify-center gap-6 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Sin comisiones por venta
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Reporte con datos reales
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Tráfico en todo Paraguay
            </span>
          </div>
        </div>
      </section>

      {/* Comparison: Marketplace Tradicional vs. Tráfico Real */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center space-y-2 mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            ¿Por qué los clasificados habituales tardan meses?
          </h2>
          <p className="text-slate-600 text-sm max-w-xl mx-auto">
            La diferencia entre sentarse a esperar y salir a buscar a tu comprador de manera activa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Marketplace Común */}
          <div className="bg-white border border-red-100 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-red-50 text-red-600">
                <XCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900">Marketplace Pasivo Tradicional</h3>
                <p className="text-xs text-slate-400">Clasipar, grupos de Facebook, portales comunes</p>
              </div>
            </div>

            <ul className="space-y-3.5 text-sm text-slate-600">
              <li className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span><strong>Dependes de la suerte:</strong> Tu publicación compite con miles de publicaciones y se hunde en 48 horas.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span><strong>Cero inversión externa:</strong> La plataforma no gasta un solo guaraní en promocionar tu producto fuera de su sitio.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span><strong>Curiosos y pérdida de tiempo:</strong> Mensajes de personas sin presupuesto o fuera de tu zona geográfica.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span><strong>Sin estadísticas:</strong> No sabes si nadie te escribe porque nadie lo vio o porque el precio no encaja.</span>
              </li>
            </ul>
          </div>

          {/* Paraguay Real Tráfico Activo */}
          <div className="bg-linear-to-br from-emerald-950 to-slate-900 border border-emerald-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">Paraguay Real con Tráfico Activo</h3>
                <p className="text-xs text-emerald-400">Campaña paga en Meta Ads & Google para tu anuncio</p>
              </div>
            </div>

            <ul className="space-y-3.5 text-sm text-slate-200">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Aparición activa en feeds:</strong> Tu propiedad o vehículo aparece en las pantallas de personas en Facebook e Instagram de tu zona.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Inversión garantizada en pauta:</strong> Destinamos el presupuesto acordado directamente a compra de anuncios.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Contacto directo a tu WhatsApp:</strong> El interesado hace clic y conversa directamente contigo, sin intermediarios.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Informe Analítico Transparente:</strong> Datos reales de alcance, clics e impresiones + diagnóstico de precio.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Planes y Tarifas */}
      <section id="planes" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-10">
        <div className="text-center space-y-2 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider">
            <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
            <span>Tarifas Claras y Sin Letra Pequeña</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-display">
            Elige el Alcance de tu Campaña
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
            Cada paquete incluye el presupuesto de anuncios en Meta Ads / Google, optimización técnica y el informe analítico de resultados.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((p) => {
            const whatsappMsg = encodeURIComponent(
              `Hola Paraguay Real, quiero activar el ${p.name} (${p.priceGpy}) para promocionar mi anuncio. ¿Cuáles son los pasos?`
            );

            return (
              <div
                key={p.id}
                className={`bg-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between border transition-all duration-300 relative ${p.color}`}
              >
                {p.featured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[11px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md">
                    {p.badge}
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    {!p.featured && (
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        {p.badge}
                      </span>
                    )}
                    <h3 className="text-xl font-extrabold text-slate-900">{p.name}</h3>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{p.target}</span>
                    </p>
                  </div>

                  <div className="border-t border-b border-slate-100 py-4 space-y-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-extrabold text-slate-900">{p.priceGpy}</span>
                      <span className="text-xs text-slate-400 font-semibold">{p.priceUsd}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-medium text-slate-600 pt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-emerald-600" /> {p.duration}
                      </span>
                    </div>
                    <div className="text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md font-semibold mt-2 inline-block">
                      🎯 Estimado: {p.reach}
                    </div>
                  </div>

                  <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
                    {p.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8 space-y-2">
                  <a
                    href={`https://wa.me/${WHATSAPP_CONTACT}?text=${whatsappMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-3 px-4 rounded-xl font-bold text-sm text-center flex items-center justify-center gap-2 transition cursor-pointer shadow-xs ${
                      p.featured
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20"
                        : "bg-slate-900 hover:bg-slate-800 text-white"
                    }`}
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Contratar este Plan</span>
                  </a>
                  <p className="text-[10px] text-slate-400 text-center">
                    Activación rápida en 24h tras confirmar datos
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Qué contiene el Informe Analítico */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider">
                <BarChart3 className="w-4 h-4 text-blue-600" />
                <span>Entregable Transparente</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                ¿Qué incluye tu Análisis de Resultados?
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                A diferencia de pagar anuncios a ciegas en redes sociales, con nosotros recibes un informe claro y digerible que demuestra exactamente qué pasó con tu dinero.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 font-bold text-xs mt-0.5">01</div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Alcance de Personas Únicas</h4>
                    <p className="text-xs text-slate-500">Cuántos perfiles reales en Paraguay vieron tu propiedad en su pantalla.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 font-bold text-xs mt-0.5">02</div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Clics e Interés en Ficha</h4>
                    <p className="text-xs text-slate-500">Cuántos usuarios abrieron los detalles completos, fotos y ubicación.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 font-bold text-xs mt-0.5">03</div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Interacciones a tu WhatsApp</h4>
                    <p className="text-xs text-slate-500">Métrica exacta de personas que presionaron el botón para escribirte directamente.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 font-bold text-xs mt-0.5">04</div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Diagnóstico Honesto de Mercado</h4>
                    <p className="text-xs text-slate-500">Nuestro análisis de Precio Justo: ¿hubo interés pero pocas consultas? Te diremos si el mercado percibe tu precio alto o si la descripción requiere ajustes.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mockup visual del Reporte */}
            <div className="lg:col-span-6 bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-800 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">Ejemplo de Reporte</span>
                  <h4 className="text-sm font-extrabold text-white">Campaña #PYR-4892 (Casa en Luque)</h4>
                </div>
                <span className="text-xs bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded">
                  Completada
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700">
                  <span className="text-[11px] text-slate-400 block">Personas alcanzadas</span>
                  <span className="text-xl font-black text-white">18.420</span>
                  <span className="text-[10px] text-emerald-400 block mt-0.5">Central + Asunción</span>
                </div>
                <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700">
                  <span className="text-[11px] text-slate-400 block">Visitas a la ficha</span>
                  <span className="text-xl font-black text-white">1.240</span>
                  <span className="text-[10px] text-emerald-400 block mt-0.5">CTR 6,7% (Alto)</span>
                </div>
                <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700">
                  <span className="text-[11px] text-slate-400 block">Clics a WhatsApp</span>
                  <span className="text-xl font-black text-emerald-400">42 contactos</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Directo a tu celular</span>
                </div>
                <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700">
                  <span className="text-[11px] text-slate-400 block">Costo / Interés</span>
                  <span className="text-xl font-black text-white">~38 ₲</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Por visita calificada</span>
                </div>
              </div>

              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/60 text-xs text-slate-300 space-y-1">
                <span className="text-emerald-400 font-bold block">💡 Conclusión de Paraguay Real:</span>
                <p>
                  &ldquo;El anuncio generó alta tasa de clics en la zona de Luque y San Lorenzo. De los 42 contactos a WhatsApp, 2 visitas físicas fueron agendadas. El precio de 450M ₲ está perfectamente alineado al promedio de la zona.&rdquo;
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Descargo de Responsabilidad y Política Meta Ads */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-6 sm:p-8 space-y-3">
          <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
            <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
            <span>Política de Honestidad y Cumplimiento de Anuncios</span>
          </div>
          <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed">
            <strong>Transparencia obligatoria:</strong> En Paraguay Real no cobramos comisiones por el cierre de tus ventas ni prometemos resultados mágicos. Toda campaña de pauta publicitaria se ejecuta cumpliendo las <strong>Políticas de Vivienda y Comercio de Meta (Facebook/Instagram)</strong> y de <strong>Google Ads</strong>. No publicamos anuncios con afirmaciones engañosas ni discriminatorias, garantizando la aprobación limpia de la pauta.
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center space-y-2 mb-10">
          <h2 className="text-2xl font-extrabold text-slate-900 font-display">
            Preguntas Frecuentes sobre Tráfico Real
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Todo lo que necesitas saber antes de encender la campaña de tu anuncio.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-2">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{faq.q}</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-6">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 text-center">
        <div className="bg-linear-to-r from-emerald-800 to-teal-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl space-y-5">
          <h2 className="text-2xl sm:text-4xl font-extrabold font-display">
            ¿Listo para poner tu anuncio frente a miles de paraguayos?
          </h2>
          <p className="text-emerald-100 text-xs sm:text-sm max-w-xl mx-auto">
            Puedes publicar gratis ahora mismo en el portal o coordinar directamente con nuestro equipo la activación de tu campaña de Tráfico Real.
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-2">
            <Link
              href={`/${locale}/publicar`}
              className="px-6 py-3 bg-white text-emerald-900 font-bold rounded-xl shadow-lg hover:bg-slate-100 transition text-sm cursor-pointer"
            >
              Publicar Gratis (0 ₲)
            </Link>
            <a
              href={`https://wa.me/${WHATSAPP_CONTACT}?text=${encodeURIComponent("Hola Paraguay Real, quiero información para promocionar mi anuncio con Tráfico Real.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg transition text-sm flex items-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Consultar por WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
