import React from 'react';
import Breadcrumb from '../../../components/UI/Breadcrumb';
import UpdatedBadge from '../../../components/UI/UpdatedBadge';

export async function generateMetadata({ params: { locale } }) {
  const titles = {
    es: "Política de Cookies | ParaguayReal",
    en: "Cookie Policy | ParaguayReal",
    pt: "Política de Cookies | ParaguayReal"
  };

  return {
    title: titles[locale] || titles.es,
    description: "Información transparente sobre el uso de cookies y almacenamiento de preferencias locales en ParaguayReal."
  };
}

export default function CookiesPage({ params: { locale } }) {
  const breadcrumbs = [
    { label: locale === 'en' ? "Cookie Policy" : locale === 'pt' ? "Política de Cookies" : "Política de Cookies", url: "/cookies" }
  ];

  const content = {
    es: {
      title: "Política de Cookies",
      subtitle: "Uso transparente de cookies y tecnologías de almacenamiento local en ParaguayReal.",
      sec1Title: "1. ¿Qué son las Cookies?",
      sec1Desc: "Las cookies son pequeños archivos de texto que los sitios web almacenan en su navegador o dispositivo para recordar información sobre su visita, facilitar la navegación y personalizar su experiencia.",
      sec2Title: "2. Cookies Utilizadas en este Sitio",
      sec2Desc: "ParaguayReal utiliza tecnologías mínimas y seguras para garantizar el funcionamiento correcto de la aplicación:",
      sec2Points: [
        "**Preferencias de Idioma:** Almacena temporalmente la selección de idioma (Español, Inglés o Portugués) para entregar el contenido localizado de forma directa.",
        "**Mapas Interactivos (Mapbox / Google Maps / Leaflet):** Las librerías cartográficas pueden almacenar en caché mapas y configuraciones de zoom locales para optimizar el rendimiento de la carga visual y evitar consumos innecesarios de red.",
        "**Firebase Auth / Firestore keys:** Almacena de forma segura credenciales de conexión local si el usuario administrador configura tokens o llaves API."
      ],
      sec3Title: "3. Cómo Administrar las Cookies",
      sec3Desc: "Usted puede restringir, bloquear o borrar las cookies de ParaguayReal o de cualquier otro sitio web utilizando la configuración de su propio navegador de internet. Cada navegador tiene una interfaz diferente (Chrome, Firefox, Safari, Edge), pero suele encontrarse en el menú de 'Privacidad y Seguridad'."
    },
    en: {
      title: "Cookie Policy",
      subtitle: "Transparent use of cookies and local storage technologies on ParaguayReal.",
      sec1Title: "1. What are Cookies?",
      sec1Desc: "Cookies are small text files that websites store on your browser or device to remember information about your visit, ease navigation, and customize your experience.",
      sec2Title: "2. Cookies Used on this Site",
      sec2Desc: "ParaguayReal utilizes minimal, safe technologies to ensure the application functions correctly:",
      sec2Points: [
        "**Language Preferences:** Temporarily stores your language choice (Spanish, English, or Portuguese) to directly serve localized text.",
        "**Interactive Maps (Mapbox / Google Maps / Leaflet):** Mapping SDKs may cache local map tiles and zoom states to optimize visual rendering and avoid redundant bandwidth usage.",
        "**Firebase Auth / Firestore keys:** Securely stores local connection parameters if administrators configure tokens or API keys."
      ],
      sec3Title: "3. How to Manage Cookies",
      sec3Desc: "You can restrict, block, or delete cookies from ParaguayReal or any other website using your web browser's settings. Every browser is configured differently (Chrome, Firefox, Safari, Edge), but options are typically located under the 'Privacy and Security' menu."
    },
    pt: {
      title: "Política de Cookies",
      subtitle: "Uso transparente de cookies e tecnologias de armazenamento local no ParaguayReal.",
      sec1Title: "1. O que são Cookies?",
      sec1Desc: "Cookies são pequenos arquivos de texto que os sites armazenam no seu navegador ou dispositivo para lembrar informações sobre sua visita, facilitar a navegação e personalizar sua experiência.",
      sec2Title: "2. Cookies Utilizados neste Site",
      sec2Desc: "O ParaguayReal utiliza tecnologias mínimas e seguras para garantir o funcionamento correto do aplicativo:",
      sec2Points: [
        "**Preferências de Idioma:** Armazena temporariamente sua preferência de idioma (Espanhol, Inglês ou Português) para entregar o conteúdo localizado diretamente.",
        "**Mapas Interativos (Mapbox / Google Maps / Leaflet):** As bibliotecas de mapas podem armazenar em cache imagens de mapas e níveis de zoom para otimizar o desempenho visual.",
        "**Firebase Auth / Firestore keys:** Armazena com segurança credenciais de conexão local caso o administrador configure chaves de API."
      ],
      sec3Title: "3. Como Gerenciar Cookies",
      sec3Desc: "Você pode restringir, bloquear ou excluir cookies do ParaguayReal ou de qualquer outro site através das configurações do seu navegador (Chrome, Firefox, Safari, Edge), geralmente no menu 'Privacidade e Segurança'."
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

        <div className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 font-display">{data.sec2Title}</h2>
          <p>{data.sec2Desc}</p>
          <ul className="space-y-2 text-xs sm:text-sm pl-4 list-disc">
            {data.sec2Points.map((point, idx) => (
              <li key={idx} dangerouslySetInnerHTML={{ __html: point.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
            ))}
          </ul>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 font-display">{data.sec3Title}</h2>
          <p>{data.sec3Desc}</p>
        </div>
      </div>
    </div>
  );
}
