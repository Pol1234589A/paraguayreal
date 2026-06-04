import React from 'react';
import Breadcrumb from '../../../components/UI/Breadcrumb';
import UpdatedBadge from '../../../components/UI/UpdatedBadge';

export async function generateMetadata({ params: { locale } }) {
  const titles = {
    es: "Política de Privacidad | ParaguayReal",
    en: "Privacy Policy | ParaguayReal",
    pt: "Política de Privacidade | ParaguayReal"
  };

  return {
    title: titles[locale] || titles.es,
    description: "Declaración de privacidad, minimización de datos y seguridad en el uso de mapas interactivos de ParaguayReal."
  };
}

export default function PrivacidadPage({ params: { locale } }) {
  const breadcrumbs = [
    { label: locale === 'en' ? "Privacy Policy" : locale === 'pt' ? "Política de Privacidade" : "Política de Privacidad", url: "/privacidad" }
  ];

  const content = {
    es: {
      title: "Política de Privacidad",
      subtitle: "Compromiso de protección de datos personales y política de no recolección en ParaguayReal.",
      sec1Title: "1. Compromiso de Minimización",
      sec1Desc: "ParaguayReal opera bajo el principio de minimización de datos. No requerimos la creación de cuentas de usuario, registros obligatorios ni suscripciones para consultar la guía, el mapa interactivo de lugares o los artículos del blog. Navegarás de forma completamente anónima.",
      sec2Title: "2. Datos de Ubicación Geográfica",
      sec2Desc: "Los mapas interactivos de nuestra plataforma incluyen una función voluntaria de localización en tiempo real para facilitarte la navegación y ubicarte respecto a los puntos de interés recomendados. Este proceso se ejecuta estrictamente de forma local en tu navegador (cliente). ParaguayReal no almacena ni rastrea en ningún servidor tus coordenadas geográficas o historial de navegación.",
      sec3Title: "3. Enlaces a Terceros",
      sec3Desc: "Nuestro sitio contiene hipervínculos a servicios externos (como mapas de Google Maps, ubicaciones oficiales de embajadas o videos de YouTube). No poseemos control sobre las políticas de privacidad o el uso de cookies de dichos terceros. Te aconsejamos leer sus políticas al salir de nuestro portal.",
      sec4Title: "4. Consultas y Contacto",
      sec4Desc: "Si tienes cualquier pregunta sobre el funcionamiento técnico de la plataforma o deseas enviar alguna aclaración impositiva o de lugares, puedes contactar con nuestro equipo a través de: contacto@paraguayreal.com"
    },
    en: {
      title: "Privacy Policy",
      subtitle: "Personal data protection commitment and non-collection policy on ParaguayReal.",
      sec1Title: "1. Data Minimization Stance",
      sec1Desc: "ParaguayReal operates under the data minimization principle. We do not require user account creation, registration, or subscriptions to browse the guides, map features, or blog posts. You navigate completely anonymously.",
      sec2Title: "2. Geolocation Data",
      sec2Desc: "Our interactive maps feature an optional, client-side real-time location tool to help position yourself relative to recommended points of interest. This process runs purely within your local browser. ParaguayReal does not store, transmit, or track your coordinates or location history on any server.",
      sec3Title: "3. Third-Party Links",
      sec3Desc: "Our portal contains hyperlinks to external services (such as Google Maps, official embassy web pages, or YouTube videos). We do not control the privacy structures or cookie tracking systems of these third parties. We suggest reading their privacy policy pages when visiting.",
      sec4Title: "4. Inquiries & Contact",
      sec4Desc: "If you have any questions regarding the technical mechanics of the site, or want to submit tax/place edits, feel free to reach out to: contacto@paraguayreal.com"
    },
    pt: {
      title: "Política de Privacidade",
      subtitle: "Compromisso de proteção de dados pessoais e política de não-coleta no ParaguayReal.",
      sec1Title: "1. Princípio da Minimização de Dados",
      sec1Desc: "O ParaguayReal funciona sob o princípio de minimização. Não exigimos a criação de contas de usuário, registros ou assinaturas para acessar nosso guia, mapa ou blog. Você navega de forma 100% anônima.",
      sec2Title: "2. Dados de Localização Geográfica",
      sec2Desc: "Os mapas interativos contêm uma ferramenta opcional de geolocalização em tempo real. Esse processo ocorre de maneira totalmente local no seu navegador. O ParaguayReal não armazena, rastreia ou envia para servidores externos o seu histórico de localização.",
      sec3Title: "3. Links para Terceiros",
      sec3Desc: "Nosso site possui links para serviços externos (como Google Maps, sites de embaixadas ou vídeos do YouTube). Não controlamos a política de privacidade e cookies dessas plataformas terceiras. Recomendamos ler as políticas delas ao sair do nosso site.",
      sec4Title: "4. Dúvidas e Contato",
      sec4Desc: "Para qualquer dúvida sobre o funcionamento técnico ou sugestões de locais, entre em contato através de: contacto@paraguayreal.com"
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
        <div className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 font-display">{data.sec4Title}</h2>
          <p>{data.sec4Desc}</p>
        </div>
      </div>
    </div>
  );
}
