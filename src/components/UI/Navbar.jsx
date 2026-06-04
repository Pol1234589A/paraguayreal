'use client';

import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Globe, Menu, X } from 'lucide-react';

export default function Navbar({ locale = 'es' }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const t = useTranslations();

  const translate = (key, defaultVal) => t ? t(key) : defaultVal;

  const navLinks = [
    { label: translate("Navigation.map", "Mapa"), url: "/mapa", isNew: true },
    { label: translate("Navigation.live", "Vivir"), url: "/vivir/barrios", isNew: false },
    { label: translate("Navigation.tourism", "Turismo"), url: "/turismo", isNew: false },
    { label: translate("Navigation.prices", "Precios"), url: "/precios", isNew: false },
    { label: translate("Navigation.moving", "Mudarse"), url: "/blog/como-obtener-residencia-permanente-paraguay", isNew: false },
    { label: translate("Navigation.business", "Negocios"), url: "/negocios", isNew: false },
    { label: translate("Navigation.cities", "Ciudades"), url: "/ciudades/asuncion", isNew: false },
    { label: translate("Navigation.blog", "Blog"), url: "/blog", isNew: false }
  ];

  // Language switcher handler
  const switchLocale = (newLocale) => {
    const segments = pathname.split('/');
    if (segments.length > 1) {
      segments[1] = newLocale;
      router.push(segments.join('/'));
    } else {
      router.push(`/${newLocale}`);
    }
  };

  return (
    <header className="sticky top-0 z-[9999] bg-white border-b border-slate-100 shadow-sm w-full select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <a href={`/${locale}`} className="flex items-center gap-2.5 group cursor-pointer">
          <div className="w-7 h-7 rounded-lg overflow-hidden border border-slate-100 shadow-sm flex items-center justify-center bg-white group-hover:border-emerald-200 transition">
            <img src="/logo.png" alt="ParaguayReal Logo" className="w-full h-full object-cover scale-110" />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-emerald-600 transition">
            Paraguay<span className="text-emerald-600">Real</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={`/${locale}${link.url}`}
              className="text-sm font-semibold text-slate-600 hover:text-emerald-600 hover:underline transition flex items-center gap-1.5"
            >
              <span>{link.label}</span>
              {link.isNew && (
                <span className="bg-red-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase leading-none">
                  {translate("Navigation.mapBadge", "NUEVO")}
                </span>
              )}
            </a>
          ))}
        </nav>

        {/* Desktop Locale Switcher */}
        <div className="hidden lg:flex items-center gap-3 border-l border-slate-200 pl-6 text-xs font-bold text-slate-600">
          <Globe className="w-4 h-4 text-slate-400" />
          <button
            onClick={() => switchLocale('es')}
            className={`hover:text-emerald-600 cursor-pointer ${locale === 'es' ? 'text-emerald-600 font-extrabold underline' : ''}`}
          >
            ES
          </button>
          <span>|</span>
          <button
            onClick={() => switchLocale('en')}
            className={`hover:text-emerald-600 cursor-pointer ${locale === 'en' ? 'text-emerald-600 font-extrabold underline' : ''}`}
          >
            EN
          </button>
          <span>|</span>
          <button
            onClick={() => switchLocale('pt')}
            className={`hover:text-emerald-600 cursor-pointer ${locale === 'pt' ? 'text-emerald-600 font-extrabold underline' : ''}`}
          >
            PT
          </button>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="lg:hidden p-2 text-slate-600 hover:bg-slate-50 rounded-lg focus:outline-none transition"
        >
          {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu panel */}
      {isMobileOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 py-6 space-y-4 animate-slideDown shadow-xl absolute top-16 left-0 right-0 z-[9999]">
          <nav className="flex flex-col gap-3.5">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={`/${locale}${link.url}`}
                onClick={() => setIsMobileOpen(false)}
                className="text-base font-bold text-slate-700 hover:text-emerald-600 transition flex items-center justify-between"
              >
                <span>{link.label}</span>
                {link.isNew && (
                  <span className="bg-red-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase leading-none">
                    {translate("Navigation.mapBadge", "NUEVO")}
                  </span>
                )}
              </a>
            ))}
          </nav>

          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-sm font-bold text-slate-400">
              <Globe className="w-4 h-4" />
              <span>Idioma</span>
            </span>
            <div className="flex gap-4 text-sm font-black text-slate-600">
              <button
                onClick={() => { switchLocale('es'); setIsMobileOpen(false); }}
                className={locale === 'es' ? 'text-emerald-600 underline' : ''}
              >
                ES
              </button>
              <button
                onClick={() => { switchLocale('en'); setIsMobileOpen(false); }}
                className={locale === 'en' ? 'text-emerald-600 underline' : ''}
              >
                EN
              </button>
              <button
                onClick={() => { switchLocale('pt'); setIsMobileOpen(false); }}
                className={locale === 'pt' ? 'text-emerald-600 underline' : ''}
              >
                PT
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
