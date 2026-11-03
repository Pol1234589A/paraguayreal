'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import Breadcrumb from '../../../components/UI/Breadcrumb';
import { 
  PlusCircle, 
  CheckCircle2, 
  Zap, 
  DollarSign, 
  Phone, 
  FileText, 
  Image as ImageIcon, 
  ArrowRight,
  Sparkles,
  MessageCircle
} from 'lucide-react';

export default function PublicarPage({ params }) {
  const t = useTranslations();

  const [formData, setFormData] = useState({
    category: 'inmueble_venta',
    title: '',
    price: '',
    currency: 'PYG',
    dept: 'Central',
    city: 'Asunción',
    neighborhood: '',
    description: '',
    ownerName: '',
    whatsapp: '',
    photoLinks: '',
    planType: 'departamental' // 'gratis', 'local', 'departamental', 'nacional'
  });

  const [submitted, setSubmitted] = useState(false);

  const breadcrumbs = [
    { label: t("Navigation.map") ? 'Inicio' : 'Inicio', url: "/" },
    { label: "Publicar Anuncio", url: "/publicar" }
  ];

  const categories = [
    { id: 'inmueble_venta', label: 'Propiedad en Venta (Casa, Depto, Dúplex)' },
    { id: 'inmueble_alquiler', label: 'Propiedad en Alquiler' },
    { id: 'terrenos', label: 'Terreno / Lote / Fracción' },
    { id: 'vehiculos', label: 'Vehículo (Auto, Camioneta, Moto)' },
    { id: 'negocios', label: 'Negocio, Fondo de Comercio o Maquinaria' },
    { id: 'servicios', label: 'Servicio Profesional / Inversión' }
  ];

  const departments = [
    'Asunción (Capital)',
    'Central',
    'Alto Paraná (CDE)',
    'Itapúa (Encarnación)',
    'Cordillera (San Bernardino, Caacupé)',
    'Caaguazú',
    'Guairá (Villarrica)',
    'Chaco / Boquerón / Pdte. Hayes',
    'Otro Departamento'
  ];

  const planOptions = [
    {
      id: 'gratis',
      title: 'Publicación Estándar',
      badge: 'Básica',
      price: '0 ₲',
      priceSub: '100% Gratis',
      desc: 'Tu anuncio se lista en el catálogo orgánico de la web. Depende de que alguien entre a buscarlo.',
      highlight: false
    },
    {
      id: 'local',
      title: 'Tráfico Local',
      badge: 'Campaña 7 Días',
      price: '350.000 ₲',
      priceSub: '~$45 USD',
      desc: 'Pauta paga en Facebook/Instagram para 4.000 - 8.000 personas en tu ciudad + Reporte analítico.',
      highlight: false
    },
    {
      id: 'departamental',
      title: 'Tráfico Departamental',
      badge: 'Más Elegido 🔥',
      price: '700.000 ₲',
      priceSub: '~$90 USD',
      desc: 'Pauta en Central + Asunción o Alto Paraná para 12.000 - 25.000 personas en Meta Ads + WhatsApp directo.',
      highlight: true
    },
    {
      id: 'nacional',
      title: 'Tráfico Paraguay Total',
      badge: 'Máximo Impacto',
      price: '1.400.000 ₲',
      priceSub: '~$180 USD',
      desc: 'Pauta en todo el país (Meta + Google) para 35.000 a 65.000+ personas + Reporte integral.',
      highlight: false
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const existing = JSON.parse(localStorage.getItem('pyr_draft_ads') || '[]');
        existing.push({ ...formData, createdAt: new Date().toISOString() });
        localStorage.setItem('pyr_draft_ads', JSON.stringify(existing));
      }
    } catch {
      // Ignorar errores en modo incógnito
    }
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Construir mensaje de WhatsApp para enviar el anuncio al equipo de Paraguay Real
  const buildWhatsAppUrl = () => {
    const selectedPlanObj = planOptions.find(p => p.id === formData.planType);
    const planText = selectedPlanObj ? `${selectedPlanObj.title} (${selectedPlanObj.price})` : formData.planType;
    const targetPhone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "595981000000";

    const message = `*Nuevo Anuncio para Paraguay Real*
📌 *Título:* ${formData.title}
🏷️ *Categoría:* ${formData.category}
💰 *Precio:* ${formData.currency === 'PYG' ? `${formData.price} ₲` : `${formData.price} USD`}
📍 *Ubicación:* ${formData.city}, ${formData.dept} (${formData.neighborhood || 'Sin barrio'})
👤 *Contacto:* ${formData.ownerName}
📱 *WhatsApp Vendedor:* ${formData.whatsapp}
🚀 *Modalidad elegida:* ${planText}
🖼️ *Fotos:* ${formData.photoLinks || 'A enviar por WhatsApp'}
📝 *Descripción:* ${formData.description}`;

    return `https://wa.me/${targetPhone}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumb items={breadcrumbs} locale="es" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* Encabezado */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider">
            <PlusCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Publicación Abierta & Tráfico Real</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
            Publica tu Anuncio en Paraguay Real
          </h1>
          <p className="text-slate-600 text-sm max-w-xl mx-auto">
            La publicación estándar es <strong>100% gratuita</strong>. Si quieres acelerar la venta, puedes activar una campaña de Tráfico Real con anuncios pagados en Facebook, Instagram y Google.
          </p>
        </div>

        {/* Pantalla de Confirmación Post-Envío */}
        {submitted ? (
          <div className="bg-white border border-emerald-200 rounded-3xl p-8 sm:p-12 shadow-xl space-y-6 text-center animate-fadeIn">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold text-slate-900">
                ¡Datos de tu Anuncio Recibidos!
              </h2>
              <p className="text-slate-600 text-sm max-w-md mx-auto">
                {formData.planType === 'gratis'
                  ? 'Tu anuncio pasará a revisión para ser incorporado al catálogo gratuito de Paraguay Real.'
                  : `Has seleccionado ${planOptions.find(p => p.id === formData.planType)?.title}. Para poner en marcha los anuncios de inmediato, confirma los detalles con nuestro equipo en WhatsApp.`}
              </p>
            </div>

            {/* Resumen */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left text-xs sm:text-sm space-y-2 max-w-lg mx-auto">
              <p><strong>Título:</strong> {formData.title}</p>
              <p><strong>Precio:</strong> {formData.price} {formData.currency}</p>
              <p><strong>Ubicación:</strong> {formData.city}, {formData.dept}</p>
              <p><strong>Modalidad:</strong> {planOptions.find(p => p.id === formData.planType)?.title} ({planOptions.find(p => p.id === formData.planType)?.price})</p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg transition text-sm cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirmar y Enviar por WhatsApp</span>
              </a>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="px-5 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-sm transition cursor-pointer"
              >
                Modificar Datos
              </button>
            </div>

            <p className="text-[11px] text-slate-400">
              * El equipo de Paraguay Real revisa cada publicación para mantener la política de Precio Justo y evitar anuncios fraudulentos.
            </p>
          </div>
        ) : (
          /* Formulario de Publicación */
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Bloque 1: Datos del Bien */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
              <h2 className="text-lg font-extrabold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-600" />
                <span>1. Información del Producto o Propiedad</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Categoría *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    required
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Título Atractivo *
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Ej. Casa moderna 3 hab. con piscina en Luque"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
              </div>

              {/* Precio y Moneda */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Precio Justo *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="price"
                      placeholder="Ej. 450.000.000 o 65.000"
                      value={formData.price}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                    <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Moneda *
                  </label>
                  <select
                    name="currency"
                    value={formData.currency}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="PYG">Guaraníes (₲)</option>
                    <option value="USD">Dólares (USD $)</option>
                  </select>
                </div>
              </div>

              {/* Ubicación */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Departamento *
                  </label>
                  <select
                    name="dept"
                    value={formData.dept}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  >
                    {departments.map((d, i) => (
                      <option key={i} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Ciudad / Municipio *
                  </label>
                  <input
                    type="text"
                    name="city"
                    placeholder="Ej. Luque, Asunción, CDE"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Barrio / Zona
                  </label>
                  <input
                    type="text"
                    name="neighborhood"
                    placeholder="Ej. Villa Morra, Maka'i"
                    value={formData.neighborhood}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Descripción */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Descripción Detallada *
                </label>
                <textarea
                  name="description"
                  rows={4}
                  placeholder="Detalla las características clave, medidas de terreno o superficie construida, servicios disponibles, estado de titulación o documentos, etc."
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              {/* Fotos */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Enlace a Fotos / Imágenes
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="photoLinks"
                    placeholder="Enlace de Google Drive, Dropbox, post o carpeta de fotos"
                    value={formData.photoLinks}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                  <ImageIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
                <span className="text-[11px] text-slate-400 block mt-1">
                  * También podrás adjuntar las fotos directamente al chatear con nuestro equipo por WhatsApp.
                </span>
              </div>
            </div>

            {/* Bloque 2: Contacto del Vendedor */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
              <h2 className="text-lg font-extrabold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <Phone className="w-5 h-5 text-emerald-600" />
                <span>2. Datos de Contacto Directo</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Tu Nombre o Empresa *
                  </label>
                  <input
                    type="text"
                    name="ownerName"
                    placeholder="Ej. Carlos Giménez"
                    value={formData.ownerName}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Número de WhatsApp para Compradores *
                  </label>
                  <input
                    type="tel"
                    name="whatsapp"
                    placeholder="Ej. +595 981 123456"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                  <span className="text-[11px] text-slate-400 block mt-1">
                    Los compradores harán clic directo para hablar contigo.
                  </span>
                </div>
              </div>
            </div>

            {/* Bloque 3: Elige la Modalidad de Visibilidad (Upsell a Tráfico Real) */}
            <div className="bg-white border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-emerald-600 fill-emerald-600" />
                  <span>3. ¿Cómo quieres que se vea tu anuncio?</span>
                </h2>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                  Inversión en Pauta
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {planOptions.map((opt) => (
                  <label
                    key={opt.id}
                    className={`cursor-pointer rounded-2xl p-5 border-2 transition-all flex flex-col justify-between space-y-3 ${
                      formData.planType === opt.id
                        ? 'border-emerald-600 bg-emerald-50/40 shadow-xs ring-2 ring-emerald-500/20'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          opt.highlight ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {opt.badge}
                        </span>
                        <input
                          type="radio"
                          name="planType"
                          value={opt.id}
                          checked={formData.planType === opt.id}
                          onChange={handleChange}
                          className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                        />
                      </div>

                      <h4 className="font-extrabold text-slate-900 text-base">{opt.title}</h4>
                      <div className="flex items-baseline gap-1.5 mt-1">
                        <span className="text-xl font-black text-slate-900">{opt.price}</span>
                        <span className="text-xs font-semibold text-slate-500">{opt.priceSub}</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">{opt.desc}</p>
                    </div>

                    {opt.id !== 'gratis' && (
                      <div className="pt-2 border-t border-slate-100 text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Incluye Informe Analítico Final</span>
                      </div>
                    )}
                  </label>
                ))}
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-600 space-y-1">
                <span className="font-bold text-slate-800">💡 Nota de Transparencia de Paraguay Real:</span>
                <p>
                  No prometemos milagros ni ventas garantizadas. Toda contratación de Tráfico Real se destina a compra activa de anuncios en Meta Ads y Google con reporte verificable de clics e impresiones.
                </p>
              </div>
            </div>

            {/* Botón de Envío */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base rounded-2xl shadow-xl transition-all hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Guardar y Continuar</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
