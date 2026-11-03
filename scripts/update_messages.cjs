const fs = require('fs');
const path = require('path');

const locales = ['es', 'en', 'pt'];

const newKeys = {
  es: {
    Navigation: {
      neighborhoods: "Barrios",
      home: "Inicio"
    },
    Footer: {
      pitch: "Paraguay sin filtros. Tu recurso de confianza número uno para planificar tu viaje, mudanza o inversiones en Paraguay.",
      quickMenu: "Menú Rápido",
      interactiveMap: "Mapa Interactivo",
      costOfLiving: "Costo de Vida",
      neighborhoods: "Guía de Barrios",
      securityMatrix: "Portal de Seguridad",
      citiesGuide: "Guía de Ciudades",
      collaborate: "Colabora",
      suggestion: "¿Falta algún lugar clave en nuestro mapa?",
      suggestionBtn: "Sugerir Lugar",
      rights: "Todos los derechos reservados.",
      privacy: "Privacidad",
      cookies: "Cookies",
      legalNotice: "Aviso Legal"
    },
    Barrios: {
      compareHeaderCity: "Municipio / Ciudad"
    },
    Map: {
      noPlacesFound: "No se encontraron lugares en esta zona.",
      howToGetThere: "Cómo llegar",
      viewGuide: "Ver Guía Geografía Sagrada"
    },
    Tourism: {
      title: "Turismo y Lugares en Paraguay",
      subtitle: "Descubre los tesoros naturales, históricos y culturales de Paraguay. Desde la Costanera y museos coloniales de la capital hasta las imponentes ruinas jesuíticas, cascadas de la selva paranaense y lagos de Cordillera.",
      officialGuide: "Guía Oficial",
      searchPlaceholder: "Buscar por nombre, etiquetas o ciudad...",
      allTabs: "Todos",
      recAttractions: "Atracciones Recomendadas ({count})",
      showingFiltered: "Mostrando resultados filtrados",
      noResults: "No encontramos lugares turísticos con esos filtros. ¡Prueba buscando otro término!",
      viewInMap: "Ver en el Mapa"
    }
  },
  en: {
    Navigation: {
      neighborhoods: "Neighborhoods",
      home: "Home"
    },
    Footer: {
      pitch: "Paraguay unfiltered. Your #1 trusted resource for planning your trip, relocation, or investments in Paraguay.",
      quickMenu: "Quick Menu",
      interactiveMap: "Interactive Map",
      costOfLiving: "Cost of Living",
      neighborhoods: "Neighborhoods Guide",
      securityMatrix: "Security Portal",
      citiesGuide: "Cities Guide",
      collaborate: "Collaborate",
      suggestion: "Is a key location missing from our map?",
      suggestionBtn: "Suggest a Place",
      rights: "All rights reserved.",
      privacy: "Privacy Policy",
      cookies: "Cookies",
      legalNotice: "Legal Notice"
    },
    Barrios: {
      compareHeaderCity: "Municipality / City"
    },
    Map: {
      noPlacesFound: "No places found in this area.",
      howToGetThere: "Get Directions",
      viewGuide: "View Sacred Geography Guide"
    },
    Tourism: {
      title: "Tourism & Places in Paraguay",
      subtitle: "Discover the natural, historical, and cultural treasures of Paraguay. From Asunción's riverfront and colonial museums to Jesuit ruins, rainforest waterfalls, and Cordillera lakes.",
      officialGuide: "Official Guide",
      searchPlaceholder: "Search by name, tags, or city...",
      allTabs: "All",
      recAttractions: "Recommended Attractions ({count})",
      showingFiltered: "Showing filtered results",
      noResults: "No tourist places found with those filters. Try searching another term!",
      viewInMap: "View on Map"
    }
  },
  pt: {
    Navigation: {
      neighborhoods: "Bairros",
      home: "Início"
    },
    Footer: {
      pitch: "Paraguai sem filtros. Seu recurso de confiança número um para planejar sua viagem, mudança ou investimentos no Paraguai.",
      quickMenu: "Menu Rápido",
      interactiveMap: "Mapa Interativo",
      costOfLiving: "Custo de Vida",
      neighborhoods: "Guia de Bairros",
      securityMatrix: "Portal de Segurança",
      citiesGuide: "Guia de Cidades",
      collaborate: "Colabore",
      suggestion: "Falta algum lugar importante no nosso mapa?",
      suggestionBtn: "Sugerir Local",
      rights: "Todos os direitos reservados.",
      privacy: "Privacidade",
      cookies: "Cookies",
      legalNotice: "Aviso Legal"
    },
    Barrios: {
      compareHeaderCity: "Município / Cidade"
    },
    Map: {
      noPlacesFound: "Nenhum local encontrado nesta área.",
      howToGetThere: "Como chegar",
      viewGuide: "Ver Guia de Geografia Sagrada"
    },
    Tourism: {
      title: "Turismo e Lugares no Paraguai",
      subtitle: "Descubra os tesouros naturais, históricos e culturais do Paraguai. Da orla de Assunção e museus coloniais às ruínas jesuítas, cachoeiras e lagos de Cordillera.",
      officialGuide: "Guia Oficial",
      searchPlaceholder: "Buscar por nome, tags ou cidade...",
      allTabs: "Todos",
      recAttractions: "Atrações Recomendadas ({count})",
      showingFiltered: "Mostrando resultados filtrados",
      noResults: "Nenhum local turístico encontrado com esses filtros. Tente buscar outro termo!",
      viewInMap: "Ver no Mapa"
    }
  }
};

locales.forEach(loc => {
  const filePath = path.join(__dirname, '..', 'messages', `${loc}.json`);
  let json = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // Deep merge
  const additions = newKeys[loc];
  Object.keys(additions).forEach(section => {
    json[section] = json[section] || {};
    Object.assign(json[section], additions[section]);
  });

  fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf8');
  console.log(`Updated messages/${loc}.json successfully`);
});
