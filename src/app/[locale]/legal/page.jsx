import React from 'react';
import Breadcrumb from '../../../components/UI/Breadcrumb';
import UpdatedBadge from '../../../components/UI/UpdatedBadge';

export async function generateMetadata({ params: { locale } }) {
  const titles = {
    es: "Aviso Legal y Condiciones de Uso | ParaguayReal",
    en: "Legal Notice and Terms of Use | ParaguayReal",
    pt: "Aviso Legal e Termos de Uso | ParaguayReal"
  };

  return {
    title: titles[locale] || titles.es,
    description: "Información legal, propiedad intelectual y términos de uso del sitio web ParaguayReal."
  };
}

export default function LegalPage({ params: { locale } }) {
  const breadcrumbs = [
    { label: locale === 'en' ? "Legal Notice" : locale === 'pt' ? "Aviso Legal" : "Aviso Legal", url: "/legal" }
  ];

  const content = {
    es: {
      title: "Aviso Legal y Condiciones de Uso",
      subtitle: "Términos que regulan el acceso, navegación y uso del portal informativo ParaguayReal.",
      sec1Title: "1. Información General",
      sec1Desc: "En cumplimiento con los deberes de información general, se establece que ParaguayReal es una plataforma digital de carácter informativo e independiente dedicada a recopilar datos y experiencias de vida, turismo y negocios en Paraguay.",
      sec2Title: "2. Condiciones de Uso y Responsabilidad",
      sec2Desc: "El acceso y uso de ParaguayReal le atribuye la condición de usuario. El contenido provisto en este sitio web es exclusivamente de carácter informativo. ParaguayReal no garantiza la absoluta exactitud o actualidad de la información externa (como cotizaciones de divisas o precios de comercios), aunque realiza los mayores esfuerzos por mantener los datos limpios y verídicos.",
      sec3Title: "3. Propiedad Intelectual",
      sec3Desc: "Todos los elementos gráficos, código fuente, logotipos y contenidos de texto del sitio están protegidos por derechos de autor y propiedad intelectual. Queda prohibida la reproducción parcial o total sin consentimiento previo por escrito o mención directa de autoría mediante hipervínculo.",
      sec4Title: "4. Exclusión de Asesoría Profesional",
      sec4Desc: "El contenido referente a visados, radicación permanente, impuestos (regla 10-10-10) y regulaciones financieras locales no constituye asesoría legal, contable ni financiera oficial. Se recomienda encarecidamente al usuario consultar con asesores y profesionales licenciados en Paraguay antes de tomar cualquier decisión de inversión o radicación."
    },
    en: {
      title: "Legal Notice & Terms of Use",
      subtitle: "Terms regulating access, navigation, and usage of the ParaguayReal information portal.",
      sec1Title: "1. General Information",
      sec1Desc: "In compliance with general disclosure guidelines, ParaguayReal is an independent digital information platform dedicated to compiling life, tourism, and business experiences in Paraguay.",
      sec2Title: "2. Terms of Use & Liability",
      sec2Desc: "Accessing and using ParaguayReal designates you as a user. The content provided on this website is for informational purposes only. ParaguayReal does not guarantee absolute accuracy or timeliness of external data (like currency rates or retail prices), though we make our best efforts to keep all data verified and correct.",
      sec3Title: "3. Intellectual Property",
      sec3Desc: "All graphic assets, source code, logos, and textual contents of this site are protected by copyright and intellectual property laws. Reproduction in whole or in part is prohibited without prior written consent or explicit link attribution.",
      sec4Title: "4. Disclaimer of Professional Advice",
      sec4Desc: "Content regarding visas, permanent residency, tax rules (10-10-10 system), and local business laws does not constitute official legal, accounting, or financial advice. Users are strongly advised to consult licensed professionals in Paraguay before making any investment or relocation decisions."
    },
    pt: {
      title: "Aviso Legal e Termos de Uso",
      subtitle: "Termos que regulam o acesso, navegação e uso do portal informativo ParaguayReal.",
      sec1Title: "1. Informações Gerais",
      sec1Desc: "ParaguayReal é uma plataforma digital de caráter estritamente informativo e independente dedicada a compilar dados e experiências sobre vida, turismo e negócios no Paraguai.",
      sec2Title: "2. Condições de Uso e Responsabilidade",
      sec2Desc: "O acesso e uso do ParaguayReal atribui a você a condição de usuário. O conteúdo deste site é exclusivamente para fins informativos. O ParaguayReal não garante a precisão absoluta ou atualidade dos dados externos (como cotações de moedas ou preços de lojas), embora faça o máximo esforço para manter as informações corretas.",
      sec3Title: "3. Propriedade Intelectual",
      sec3Desc: "Todos os elementos gráficos, código-fonte, logotipos e textos do site estão protegidos por direitos autorais. É proibida a reprodução parcial ou total sem consentimento prévio por escrito ou menção direta de autoria com hiperlink.",
      sec4Title: "4. Exclusão de Assessoria Profissional",
      sec4Desc: "As informações referentes a vistos, residência permanente, impostos (regra 10-10-10) e leis financeiras locais não constituem assessoria jurídica, contábil ou financeira oficial. Recomenda-se fortemente consultar profissionais licenciados no Paraguai antes de qualquer decisão de investimento ou mudança."
    }
  };

  const data = content[locale] || content.es;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 select-none space-y-6">
      <Breadcrumb items={breadcrumbs} locale={locale} />
      
      <div className="space-y-4 border-b border-slate-100 pb-6">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-3xl font-extrabold text-slate-900 font-display">
            {data.title}
          </h1>
          <UpdatedBadge />
        </div>
        <p className="text-sm text-slate-600 leading-relaxed max-w-2xl font-light">
          {data.subtitle}
        </p>
      </div>

      <div className="space-y-8 text-sm sm:text-base text-slate-700 leading-relaxed font-light">
        <div className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 font-display">{data.sec1Title}</h2>
          <p>{data.sec1Desc}</p>
        </div>
        <div className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 font-display">{data.sec2Title}</h2>
          <p>{data.sec2Desc}</p>
        </div>
        <div className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 font-display">{data.sec3Title}</h2>
          <p>{data.sec3Desc}</p>
        </div>
        <div className="space-y-2 bg-amber-50/40 p-5 rounded-xl border border-amber-100">
          <h2 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
            ⚠️ {data.sec4Title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-800 mt-2">{data.sec4Desc}</p>
        </div>
      </div>
    </div>
  );
}
