import React from 'react';
import { Mail, Compass } from 'lucide-react';

export default function Footer({ locale = 'es', t }) {
  const translate = (key, defaultVal) => t ? t(key) : defaultVal;

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Pitch */}
          <div className="space-y-4 md:col-span-2">
            <h4 className="text-white font-extrabold text-lg flex items-center gap-2">
              <Compass className="w-5 h-5 text-emerald-500" />
              <span>ParaguayReal</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              {translate("Footer.pitch", "Paraguay sin filtros. Tu recurso de confianza número uno para planificar tu viaje, mudanza o inversiones en Paraguay.")}
            </p>
          </div>

          {/* Site Sections */}
          <div className="space-y-3 text-xs">
            <span className="text-white font-black uppercase tracking-wider block">Menú Rápido</span>
            <ul className="space-y-2">
              <li><a href={`/${locale}/mapa`} className="hover:text-emerald-500 hover:underline transition">Mapa Interactivo</a></li>
              <li><a href={`/${locale}/precios`} className="hover:text-emerald-500 hover:underline transition">Costo de Vida</a></li>
              <li><a href={`/${locale}/vivir/barrios`} className="hover:text-emerald-500 hover:underline transition">Barrios de Asunción</a></li>
              <li><a href={`/${locale}/ciudades/asuncion`} className="hover:text-emerald-500 hover:underline transition">Guía de Ciudades</a></li>
            </ul>
          </div>

          {/* Suggest a Place */}
          <div className="space-y-3 text-xs">
            <span className="text-white font-black uppercase tracking-wider block">Colabora</span>
            <p className="text-slate-400 leading-relaxed">
              {translate("Footer.suggestion", "¿Falta algún lugar clave en nuestro mapa?")}
            </p>
            <a
              href="mailto:sugerencias@paraguayreal.com?subject=Sugerencia de lugar para el Mapa de Paraguay"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{translate("Footer.suggestionBtn", "Sugerir Lugar")}</span>
            </a>
          </div>

        </div>

        {/* Divider & Copyright */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs gap-4 text-slate-500">
          <span>&copy; {new Date().getFullYear()} ParaguayReal. {translate("Footer.rights", "Todos los derechos reservados.")}</span>
          <div className="flex gap-4">
            <a href={`/${locale}/privacidad`} className="hover:underline hover:text-slate-400">Privacidad</a>
            <a href={`/${locale}/cookies`} className="hover:underline hover:text-slate-400">Cookies</a>
            <a href={`/${locale}/legal`} className="hover:underline hover:text-slate-400">Aviso Legal</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
