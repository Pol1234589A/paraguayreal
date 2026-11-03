import React from 'react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import Breadcrumb from '../../../../components/UI/Breadcrumb';
import UpdatedBadge from '../../../../components/UI/UpdatedBadge';
import SchemaOrg from '../../../../components/SEO/SchemaOrg';
import placesGeoJSON from '../../../../../data/places.json';
import { Check, X, Shield, DollarSign, MapPin, Briefcase } from 'lucide-react';

const CityMap = dynamic(
  () => import('../../../../components/Map/CityMap'),
  {
    ssr: false,
    loading: () => (
      <div className="h-[450px] w-full flex items-center justify-center bg-slate-100 rounded-xl border border-slate-200">
        <span className="text-xs text-slate-500 uppercase font-mono animate-pulse">Cargando mapa de la ciudad...</span>
      </div>
    )
  }
);

const CITIES_DATA = {
  "asuncion": {
    name: "Asunción",
    photo: "https://images.unsplash.com/photo-1590487988256-9ed24133863e?w=800&auto=format&fit=crop&q=80",
    description: {
      es: "La capital de Paraguay y el epicentro financiero, cultural y de negocios del país. Mezcla rascacielos modernos con casonas coloniales y áreas residenciales sumamente arboladas.",
      en: "The capital of Paraguay and the financial, cultural, and business epicentre of the country. It blends modern skyscrapers with colonial mansions and highly tree-lined residential areas.",
      pt: "A capital do Paraguai e o epicentro financeiro, cultural e de negócios do país. Mescla arranha-céus modernos com casarões coloniais e áreas residenciais extremamente arborizadas."
    },
    safety: {
      es: "Favorable (Evitando el centro de noche. Peligro de raudales pluviales en tormentas).",
      en: "Favorable (Avoid downtown at night. Danger of flash floods/raudales during storms).",
      pt: "Favorável (Evitando o centro à noite. Perigo de enxurradas/raudales durante tempestades)."
    },
    cost: {
      es: "Alto ($800 - $1.500 USD/mes)",
      en: "High ($800 - $1,500 USD/month)",
      pt: "Alto ($800 - $1.500 USD/mês)"
    },
    pros: {
      es: [
        "Principal centro de empleo profesional y de negocios.",
        "Excelente variedad de colegios privados y sanatorios médicos de nivel internacional.",
        "Vida nocturna, bares y restaurantes internacionales de alto nivel."
      ],
      en: [
        "Main professional employment and business hub.",
        "Excellent variety of international-level private schools and medical centers.",
        "High-level nightlife, bars, and international restaurants."
      ],
      pt: [
        "Principal centro de emprego profissional e de negócios.",
        "Excelente variedade de escolas particulares e centros médicos de nível internacional.",
        "Vida noturna, bares e restaurantes internacionais de alto nível."
      ]
    },
    cons: {
      es: [
        "El tráfico vehicular en horas punta es denso.",
        "Infraestructura pluvial deficiente: peligro de raudales severos en tormentas.",
        "El transporte público de colectivos tiene baja frecuencia nocturna."
      ],
      en: [
        "Heavy traffic congestion during peak rush hours.",
        "Deficient storm drainage infrastructure: danger of severe flash floods during storms.",
        "Public bus transit has low frequency at night."
      ],
      pt: [
        "Trânsito de veículos pesado nos horários de pico.",
        "Infraestrutura de drenagem pluvial deficiente: perigo de fortes enxurradas em tempestades.",
        "O transporte público de ônibus tem baixa frequência noturna."
      ]
    },
    businessProfile: {
      es: {
        title: "Perfil de Negocios en Asunción",
        desc: "Capital financiera e inmobiliaria de Paraguay. Destaca su eje corporativo (Santa Teresa / Aviadores del Chaco) que concentra el WTC y Paseo La Galería. Es ideal para sedes de software, servicios profesionales, consultoría y fideicomisos inmobiliarios. Se aconseja cautela con la plusvalía especulativa de terrenos, priorizando la renta por alquileres estables (rendimientos del 6% al 8% anual)."
      },
      en: {
        title: "Asunción Business Profile",
        desc: "Financial and real estate capital of Paraguay. It features the corporate axis of Santa Teresa and Aviadores del Chaco, home to the WTC and Paseo La Galería. Ideal for software headquarters, professional services, consulting, and real estate trusts. Caution is advised with speculative land flipping, focusing instead on stable rental yields (6% to 8% annually)."
      },
      pt: {
        title: "Perfil de Negócios em Assunção",
        desc: "Capital financeira e imobiliária do Paraguai. Destaca-se o eixo corporativo (Santa Teresa / Aviadores do Chaco) que concentra o WTC e Paseo La Galería. Ideal para sedes de tecnologia, serviços profissionais, consultoria e fundos imobiliários. Recomenda-se cautela com a especulação rápida de terrenos, focando em renda por aluguel (retornos de 6% a 8% ao ano)."
      }
    },
    keyStats: {
      es: "105.822 empresas (21% del total nacional). Nodo de comando corporativo y financiero. Advertencia de raudales pluviales.",
      en: "105,822 companies (21% of the national total). Corporate and financial command hub. Rain flash flood warning.",
      pt: "105.822 empresas (21% do total nacional). Centro de comando corporativo e financeiro. Alerta de enxurradas (raudales)."
    }
  },
  "ciudad-del-este": {
    name: "Ciudad del Este",
    photo: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&auto=format&fit=crop&q=80",
    description: {
      es: "Ubicada en la Triple Frontera con Brasil y Argentina, es una de las zonas de libre comercio más grandes del mundo. Dinámica, comercial e ideal para empresarios, importadores e industriales.",
      en: "Located on the Triple Border with Brazil and Argentina, it is one of the largest free trade zones in the world. Dynamic, commercial, and ideal for entrepreneurs, importers, and industrial manufacturers.",
      pt: "Localizada na Tríplice Fronteira com o Brasil e a Argentina, é uma das maiores zonas de livre comércio do mundo. Dinâmica, comercial e ideal para empresários, importadores e industriais."
    },
    safety: {
      es: "Moderada (Cuidado en el microcentro. Bolt y Uber excluyen zonas rojas como San Rafael y Remansito).",
      en: "Moderate (Careful in the commercial center. Bolt/Uber drivers exclude red zones like San Rafael and Remansito).",
      pt: "Moderada (Cuidado no microcentro comercial. Bolt e Uber excluem zonas vermelhas como San Rafael e Remansito)."
    },
    cost: {
      es: "Medio ($600 - $1.000 USD/mes)",
      en: "Medium ($600 - $1,000 USD/month)",
      pt: "Médio ($600 - $1.000 USD/mês)"
    },
    pros: {
      es: [
        "Oportunidades masivas de comercio, logística e importación.",
        "Acceso inmediato a Brasil cruzando el Puente de la Amistad (Foz de Yguazú).",
        "Sede de grandes industrias maquiladoras que exportan a todo el Mercosur.",
        "Proximidad a atractivos naturales como los Saltos del Monday."
      ],
      en: [
        "Massive trading, logistics, and import opportunities.",
        "Immediate access to Brazil crossing the Friendship Bridge (Foz de Yguazú).",
        "Home to major maquiladora industries exporting to the entire Mercosur block.",
        "Proximity to natural attractions like Monday Falls."
      ],
      pt: [
        "Oportunidades massivas de comércio, logística e importação.",
        "Acesso imediato ao Brasil cruzando a Ponte da Amizade (Foz do Iguaçu).",
        "Sede de grandes indústrias maquiladoras que exportam para todo o Mercosul.",
        "Proximidade de atrações naturais como os Saltos del Monday."
      ]
    },
    cons: {
      es: [
        "El microcentro comercial es caótico, ruidoso y con congestión vehicular extrema.",
        "Zonas rojas peligrosas para Bolt/Uber (San Rafael, Remansito, San Agustín, San Antonio).",
        "La oferta cultural y de esparcimiento nocturno fuera del comercio es limitada."
      ],
      en: [
        "Commercial downtown is chaotic, noisy, and has extreme traffic congestion.",
        "Dangerous red zones where Bolt/Uber drivers refuse service (San Rafael, Remansito, San Agustín, San Antonio).",
        "Limited cultural and nightlife entertainment options outside of shopping."
      ],
      pt: [
        "O microcentro comercial é caótico, barulhento e com congestionamento de trânsito extremo.",
        "Zonas vermelhas perigosas para Bolt/Uber (San Rafael, Remansito, San Agustín, San Antonio).",
        "A oferta cultural e de lazer noturno fora do comércio é limitada."
      ]
    },
    businessProfile: {
      es: {
        title: "Perfil de Negocios en Ciudad del Este",
        desc: "Eje de importación y manufactura. Es la puerta de entrada principal al régimen de la Ley de Maquila en Alto Paraná (como Hernandarias), facilitando la instalación de industrias que exportan a Brasil y Argentina con arancel cero y solo 1% de impuesto único. Excelente para comercio mayorista, logística y electrónica en la triple frontera."
      },
      en: {
        title: "Ciudad del Este Business Profile",
        desc: "Import and manufacturing hub. It is the main gateway to the Maquila Law regime in Alto Paraná (like Hernandarias), enabling industrial factories to export to Brazil and Argentina duty-free under a flat 1% tax. Highly recommended for wholesale trading, logistics, and electronics near the triple border."
      },
      pt: {
        title: "Perfil de Negócios em Ciudad del Este",
        desc: "Polo de importação e manufatura. É a principal porta de entrada da Lei de Maquila no Alto Paraná (como Hernandarias), facilitando a montagem de indústrias que exportam ao Brasil e Argentina com tarifa zero e imposto único de 1%. Excelente para comércio atacadista, logística e eletrônicos na tríplice fronteira."
      }
    },
    keyStats: {
      es: "65.289 empresas (13% del total nacional). El 25% de los compradores residenciales son brasileños. Alerta de exclusión de Bolt/Uber en San Rafael y Remansito.",
      en: "65,289 companies (13% of the national total). 25% of residential buyers are Brazilian. Bolt/Uber exclusion warning in San Rafael and Remansito.",
      pt: "65.289 empresas (13% do total nacional). 25% dos compradores residenciais são brasileiros. Alerta de exclusão de Bolt/Uber em San Rafael e Remansito."
    }
  },
  "encarnacion": {
    name: "Encarnación",
    photo: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
    description: {
      es: "Conocida como la 'Perla del Sur', destaca por sus hermosas playas fluviales sobre el río Paraná, su costanera impecable y limpia, y un estilo de vida sumamente seguro, ordenado y tranquilo.",
      en: "Known as the 'Pearl of the South', it stands out for its beautiful river beaches along the Paraná River, its clean and impeccable costanera, and a highly safe, orderly, and peaceful lifestyle.",
      pt: "Conhecida como a 'Pérola do Sul', destaca-se por suas belas praias fluviais no rio Paraná, sua costanera limpa e impecável, e um estilo de vida extremamente seguro, ordenado e tranquilo."
    },
    safety: {
      es: "Excelente (La ciudad con mayor percepción de seguridad ciudadana del país).",
      en: "Excellent (The city with the highest public safety rating in the country).",
      pt: "Excelente (A cidade com a maior percepção de segurança pública do país)."
    },
    cost: {
      es: "Medio ($500 - $900 USD/mes)",
      en: "Medium ($500 - $900 USD/month)",
      pt: "Médio ($500 - $900 USD/mês)"
    },
    pros: {
      es: [
        "Playas fluviales seguras y costanera limpia y de primer nivel.",
        "Nivel de seguridad superior al promedio nacional.",
        "Polo agrícola y logístico pujante en el departamento de Itapúa.",
        "Facilidades bancarias donde abren cuentas ágilmente usando pasaporte."
      ],
      en: [
        "Safe river beaches and clean, world-class costanera.",
        "Safety levels superior to the national average.",
        "Thriving agricultural and logistics hub in the Itapúa department.",
        "Banking facilities that open accounts smoothly using just a passport."
      ],
      pt: [
        "Praias fluviais seguras e costanera limpa e de nível internacional.",
        "Nível de segurança superior à média nacional.",
        "Polo agrícola e logístico próspero no departamento de Itapúa.",
        "Facilidades bancárias que permitem abrir contas de forma ágil com pasaporte."
      ]
    },
    cons: {
      es: [
        "El mercado laboral corporativo fuera del sector agropecuario y turismo es pequeño.",
        "Durante el invierno la oferta turística y el entretenimiento disminuyen marcadamente."
      ],
      en: [
        "Corporate job market outside of agribusiness and tourism is small.",
        "During winter, tourist activity and entertainment options decrease significantly."
      ],
      pt: [
        "O mercado de trabalho corporativo fora do setor agrícola e de turismo é reduzido.",
        "Durante o inverno, a atividade turística e as opções de lazer diminuem marcadamente."
      ]
    },
    businessProfile: {
      es: {
        title: "Perfil de Negocios en Encarnación",
        desc: "Hub agroindustrial y logístico. Conectada estratégicamente por el río Paraná, es ideal para agroinversiones (soja, maíz, ganadería) en alianza con las cooperativas agrícolas del departamento de Itapúa. Cuenta con facilidades bancarias (Banco Sudameris en la Costanera) que permiten abrir cuentas ágilmente usando pasaporte."
      },
      en: {
        title: "Encarnación Business Profile",
        desc: "Agro-industrial and logistics hub. Strategically connected via the Paraná River, it is ideal for agricultural investments (soy, corn, livestock) alongside Itapúa's farming cooperatives. Offers excellent banking facilities (e.g. Banco Sudameris on the costanera) allowing account setups with just a passport."
      },
      pt: {
        title: "Perfil de Negócios em Encarnação",
        desc: "Polo agroindustrial e logístico. Conectada pelo Rio Paraná, é ideal para agroinvestimentos (soja, milho, pecuária) com cooperativas locais em Itapúa. Oferece facilidades bancárias (como o Banco Sudameris na Costanera) para abertura de contas de forma ágil com passaporte."
      }
    },
    keyStats: {
      es: "Polo agroindustrial de Itapúa y capital del verano. Planificación moderna con costanera de 25 km. Apertura de cuentas bancarias ágiles con pasaporte.",
      en: "Agro-industrial hub of Itapúa and summer capital. Modern planning with a 25 km waterfront. Smooth bank account setup using a passport.",
      pt: "Centro agroindustrial de Itapúa e capital do verão. Planejamento moderno com costanera de 25 km. Abertura ágil de contas bancárias com passaporte."
    }
  },
  "luque": {
    name: "Luque",
    photo: "https://images.unsplash.com/photo-1590059002624-66551b9e018e?w=800&auto=format&fit=crop&q=80",
    description: {
      es: "Ubicada en la periferia de Asunción, es la sede del aeropuerto internacional y de la CONMEBOL. Combina un fuerte crecimiento inmobiliario con una gran tradición en orfebrería y cultura.",
      en: "Located on the outskirts of Asunción, it is home to the international airport and CONMEBOL. It combines strong real estate growth with a rich tradition in jewelry craft and culture.",
      pt: "Localizada na periferia de Assunção, é a sede do aeroporto internacional e da CONMEBOL. Combina um forte crescimento imobiliário com uma grande tradição em ourivesaria e cultura."
    },
    safety: {
      es: "Moderada (Buen nivel en el oeste residencial; precaución en el este semiurbano por delincuencia común).",
      en: "Moderate (Good level in residential west; caution in semi-urban east due to common crime).",
      pt: "Moderada (Bom nível no oeste residencial; cautela no leste semiurbano devido à delinquência comum)."
    },
    cost: {
      es: "Medio ($500 - $800 USD/mes)",
      en: "Medium ($500 - $800 USD/month)",
      pt: "Médio ($500 - $800 USD/mês)"
    },
    pros: {
      es: [
        "Proximidad estratégica al Aeropuerto Internacional Silvio Pettirossi.",
        "Alquileres y desarrollos de clase media mucho más asequibles que en la capital.",
        "Presencia de centros comerciales, hoteles de negocios y el complejo de la CONMEBOL."
      ],
      en: [
        "Strategic proximity to the Silvio Pettirossi International Airport.",
        "Middle-class rentals and housing projects much more affordable than in the capital.",
        "Presence of shopping malls, business hotels, and the CONMEBOL complex."
      ],
      pt: [
        "Proximidade estratégica do Aeroporto Internacional Silvio Pettirossi.",
        "Aluguéis e empreendimentos de classe média muito mais acessíveis que na capital.",
        "Presença de shoppings, hotéis de negócios e o complexo da CONMEBOL."
      ]
    },
    cons: {
      es: [
        "Marcada asimetría este-oeste; sectores orientales sufren mayor delincuencia.",
        "Peligro de inundación por raudales críticos en intersecciones clave.",
        "Problemas históricos de suministro de agua y dependencia de pozos artesianos locales."
      ],
      en: [
        "Marked east-west asymmetry; eastern sectors suffer from higher crime rates.",
        "Risk of physical danger from severe street flooding (raudales) at critical intersections.",
        "Historical water supply issues and high dependence on local wells."
      ],
      pt: [
        "Marcada assimetria leste-oeste; setores orientais sofrem com maior criminalidade.",
        "Risco de enxurradas críticas (raudales) em cruzamentos importantes.",
        "Problemas históricos de abastecimento de água e alta dependência de poços artesianos locais."
      ]
    },
    businessProfile: {
      es: {
        title: "Perfil de Negocios en Luque",
        desc: "Excelente para negocios de logística, almacenamiento y turismo de negocios por su cercanía al aeropuerto. Capta el 9% del total de obras de construcción metropolitana, siendo idóneo para inversiones residenciales destinadas a la clase media."
      },
      en: {
        title: "Luque Business Profile",
        desc: "Excellent for logistics, storage, and business tourism due to its proximity to the airport. It captures 9% of metropolitian construction projects, making it ideal for residential investments targeting the middle class."
      },
      pt: {
        title: "Perfil de Negócios em Luque",
        desc: "Excelente para negócios de logística, armazenamento e turismo de negócios por sua proximidade com o aeroporto. Concentra 9% das obras de construção metropolitana, sendo ideal para investimentos residenciais de classe média."
      }
    },
    keyStats: {
      es: "Capta el 9% de las obras residenciales y el 2% de oficinas del departamento Central. Sede de la CONMEBOL y el aeropuerto Silvio Pettirossi.",
      en: "Captures 9% of residential works and 2% of offices in the Central department. Home to CONMEBOL and Silvio Pettirossi Airport.",
      pt: "Concentra 9% das obras residenciais e 2% dos escritórios do departamento Central. Sede da CONMEBOL e do aeroporto Silvio Pettirossi."
    }
  },
  "san-lorenzo": {
    name: "San Lorenzo",
    photo: "https://images.unsplash.com/photo-1541829019-213700465268?w=800&auto=format&fit=crop&q=80",
    description: {
      es: "Ciudad universitaria y comercial de gran dinamismo. Sede del campus principal de la Universidad Nacional de Asunción, posee una intensa vida comercial y estudiantil.",
      en: "A highly dynamic university and commercial city. Home to the main campus of the National University of Asunción, it features a bustling student and retail scene.",
      pt: "Cidade universitária e comercial de grande dinamismo. Sede do campus principal da Universidade Nacional de Assunção, possui uma intensa vida estudante e comercial."
    },
    safety: {
      es: "Media-Baja (Alta delincuencia común y robos en paradas de autobús. Requiere precaución).",
      en: "Medium-Low (High common crime and robberies at bus stops. Caution required).",
      pt: "Média-Baixa (Alta criminalidade comum e furtos em paradas de ônibus. Requer cautela)."
    },
    cost: {
      es: "Bajo ($400 - $650 USD/mes)",
      en: "Low ($400 - $650 USD/month)",
      pt: "Baixo ($400 - $650 USD/mês)"
    },
    pros: {
      es: [
        "Gran oferta comercial de bajo costo y servicios de salud primaria accesibles.",
        "Polo estudiantil con alta demanda de alquileres temporarios y de departamentos.",
        "Ambiente dinámico y juvenil con excelente oferta gastronómica rápida."
      ],
      en: [
        "Wide variety of low-cost retail shops and accessible primary healthcare services.",
        "Student hub with high demand for short-term rentals and apartments.",
        "Dynamic, youthful environment with excellent fast-food and dining choices."
      ],
      pt: [
        "Grande oferta comercial de baixo custo e serviços de saúde primária acessíveis.",
        "Polo estudiantil con alta demanda de aluguel por temporada e apartamentos.",
        "Ambiente dinâmico e jovem, com excelente oferta de alimentação rápida."
      ]
    },
    cons: {
      es: [
        "Tránsito vehicular extremadamente caótico y altos niveles de contaminación acústica.",
        "Deficiencias severas en la gestión e infraestructura de escuelas y espacios públicos.",
        "Contaminación microbiológica en pozos artesianos de suministro hídrico local."
      ],
      en: [
        "Extremely chaotic traffic jams and high levels of noise pollution.",
        "Severe deficiencies in public school infrastructure and municipal administration.",
        "Microbiological contamination issues in local water supply wells."
      ],
      pt: [
        "Trânsito de veículos extremamente caótico e altos níveis de poluição sonora.",
        "Graves deficiências na gestão e infraestrutura escolar e de espaços públicos.",
        "Contaminação microbiológica em poços artesianos de abastecimento de água local."
      ]
    },
    businessProfile: {
      es: {
        title: "Perfil de Negocios en San Lorenzo",
        desc: "El mercado estudiantil genera una demanda constante de monoambientes y departamentos de bajo presupuesto. San Lorenzo concentra el 9% de la actividad inmobiliaria metropolitana, siendo ideal para locales de servicios, retail de conveniencia y residencias universitarias."
      },
      en: {
        title: "San Lorenzo Business Profile",
        desc: "The student market drives constant demand for low-budget studio apartments. San Lorenzo holds 9% of the metropolitan real estate activity, making it perfect for services, convenience retail, and student housing."
      },
      pt: {
        title: "Perfil de Negócios em San Lorenzo",
        desc: "O mercado estudantil gera uma demanda constante por quitinetes e apartamentos de baixo orçamento. Concentra 9% da atividade imobiliária metropolitana, ideal para lojas de serviços, conveniência e moradia universitária."
      }
    },
    keyStats: {
      es: "Capta el 9% de la actividad inmobiliaria metropolitana. Sede del campus de la Universidad Nacional de Asunción (UNA) y motor de comercio minorista de bajo costo.",
      en: "Captures 9% of metropolitan real estate activity. Home to the main National University of Asunción (UNA) campus and low-cost retail engine.",
      pt: "Concentra 9% da atividade imobiliária metropolitana. Sede do campus da Universidade Nacional de Assunção (UNA) e motor de comércio de baixo custo."
    }
  },
  "fernando-de-la-mora": {
    name: "Fernando de la Mora",
    photo: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&auto=format&fit=crop&q=80",
    description: {
      es: "Una activa ciudad dormitorio y comercial que conecta Asunción con el resto de la zona metropolitana. Es una de las ciudades con mayor ritmo de edificación residencial del país.",
      en: "An active commuter and commercial city connecting Asunción with the rest of the metropolitan area. It features one of the highest rates of residential construction in the country.",
      pt: "Uma ativa cidade-dormitório e comercial que conecta Assunção com o resto da zona metropolitana. É uma das cidades com maior ritmo de construção residencial do país."
    },
    safety: {
      es: "Aceptable (La zona Norte es más segura y ordenada; la zona Sur requiere mayor precaución).",
      en: "Acceptable (The North zone is safer and cleaner; the South zone requires more caution).",
      pt: "Aceitável (A zona Norte é mais segura e ordenada; a zona Sul requer maior precaução)."
    },
    cost: {
      es: "Medio ($500 - $750 USD/mes)",
      en: "Medium ($500 - $750 USD/month)",
      pt: "Médio ($500 - $750 USD/mês)"
    },
    pros: {
      es: [
        "Integración directa con Asunción, reduciendo distancias de viaje si se vive en zona Norte.",
        "Concentra el 11% de las obras residenciales, con excelente plusvalía inmobiliaria.",
        "Variada oferta de comercios minoristas y colegios sobre las avenidas principales."
      ],
      en: [
        "Direct integration with Asunción, reducing travel times if living in the North zone.",
        "Concentrates 11% of residential projects, offering excellent real estate appreciation.",
        "Diverse retail stores and schools along the main avenues."
      ],
      pt: [
        "Integração direta com Assunção, reduzindo as distâncias se você mora na zona Norte.",
        "Concentra 11% das obras residenciais, com excelente valorização imobiliária.",
        "Variada oferta de comércios varejistas e escolas nas avenidas principais."
      ]
    },
    cons: {
      es: [
        "Embotellamientos de tránsito severos en horas punta sobre la Ruta PY02.",
        "Falta de pavimentación y de alcantarillado pluvial en calles secundarias.",
        "Presencia de puntos de raudales críticos durante tormentas fuertes."
      ],
      en: [
        "Severe traffic jams during rush hours along Route PY02.",
        "Lack of proper paving and storm sewers on secondary streets.",
        "Presence of critical flash flood points during heavy rain."
      ],
      pt: [
        "Congestionamentos severos de trânsito nos horários de pico na Rodovia PY02.",
        "Falta de pavimentação e esgoto pluvial em ruas secundárias.",
        "Presença de pontos críticos de enxurradas em fortes tempestades."
      ]
    },
    businessProfile: {
      es: {
        title: "Perfil de Negocios en Fernando de la Mora",
        desc: "Segundo municipio con más volumen de construcción residencial en el departamento Central (11% de obras habitacionales y 3% corporativas). Ideal para desarrollos de viviendas de gama media para familias jóvenes que trabajan en Asunción."
      },
      en: {
        title: "Fernando de la Mora Business Profile",
        desc: "Second city with the highest volume of residential construction in the Central department (11% housing and 3% corporate). Ideal for mid-range housing developments targeting young families working in Asunción."
      },
      pt: {
        title: "Perfil de Negócios em Fernando de la Mora",
        desc: "Segunda cidade com maior volume de construção residencial no departamento Central (11% residencial e 3% corporativo). Ideal para empreendimentos de médio padrão para famílias jovens que trabalham em Assunção."
      }
    },
    keyStats: {
      es: "Segundo municipio con más construcciones en Central (11% de obras habitacionales y 3% corporativas). Cuellos de botella viales críticos sobre la Ruta PY02.",
      en: "Second municipality with most constructions in Central (11% housing, 3% corporate). Critical road bottlenecks along Route PY02.",
      pt: "Segundo município com mais obras em Central (11% residencial, 3% corporativo). Gargalos viários críticos na Rodovia PY02."
    }
  },
  "lambare": {
    name: "Lambaré",
    photo: "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=800&auto=format&fit=crop&q=80",
    description: {
      es: "Vecina directa del sur de la capital a orillas del río Paraguay. Ofrece un estilo de vida residencial más tranquilo y alquileres más económicos.",
      en: "Direct southern neighbor of the capital along the Paraguay River. It offers a quieter residential lifestyle and more economical rental rates.",
      pt: "Vizinha direta do sul da capital às margens do rio Paraguai. Oferece um estilo de vida residencial mais tranquilo e aluguéis mais econômicos."
    },
    safety: {
      es: "Moderada (Frecuente índice de robos comunes y asaltos nocturnos en áreas desprotegidas).",
      en: "Moderate (Frequent rates of common theft and night muggings in unprotected areas).",
      pt: "Moderada (Frequente índice de furtos comuns e assaltos noturnos em áreas desprotegidas)."
    },
    cost: {
      es: "Medio ($450 - $700 USD/mes)",
      en: "Medium ($450 - $700 USD/month)",
      pt: "Médio ($450 - $700 USD/mês)"
    },
    pros: {
      es: [
        "Costos de suelo y alquileres significativamente más asequibles que en Asunción.",
        "Zonas tranquilas a orillas del río Paraguay, ideales para la recreación y clubes náuticos.",
        "Concentra el 8% del desarrollo inmobiliario residencial metropolitano."
      ],
      en: [
        "Significantly more affordable land and rental costs compared to Asunción.",
        "Quiet areas on the banks of the Paraguay River, ideal for recreation and yacht clubs.",
        "Concentrates 8% of the metropolitan residential real estate development."
      ],
      pt: [
        "Custos de terreno e aluguéis significativamente mais acessíveis que em Assunção.",
        "Zonas tranquilas às margens do rio Paraguai, ideais para lazer e clubes náuticos.",
        "Concentra 8% do desenvolvimento imobiliário residencial metropolitano."
      ]
    },
    cons: {
      es: [
        "Deficiencias severas en el mantenimiento vial municipal, con abundantes baches.",
        "Inexistencia de veredas uniformes y escasa conectividad peatonal.",
        "Riesgos extremos de raudales pluviales con 31 puntos identificados por el municipio."
      ],
      en: [
        "Severe municipal neglect of road maintenance, resulting in deep potholes.",
        "Lack of uniform sidewalks and limited pedestrian connectivity.",
        "Extreme flash flood hazards with 31 critical points identified by the municipality."
      ],
      pt: [
        "Graves deficiências na manutenção das vias municipais, com muitos buracos.",
        "Inexistência de calçadas uniformes e baixa conectividade de pedestres.",
        "Riscos extremos de enxurradas com 31 pontos críticos mapeados pelo município."
      ]
    },
    businessProfile: {
      es: {
        title: "Perfil de Negocios en Lambaré",
        desc: "Lambaré capta el 8% de los proyectos residenciales del Gran Asunción. El mercado inmobiliario se enfoca en casas unifamiliares y dúplex asequibles. Muy atractivo para servicios minoristas y centros educativos debido a su alta densidad familiar."
      },
      en: {
        title: "Lambaré Business Profile",
        desc: "Lambaré captures 8% of residential projects in Greater Asunción. The real estate market focuses on affordable single-family houses and duplexes. Highly attractive for retail services and schools due to its high family density."
      },
      pt: {
        title: "Perfil de Negócios em Lambaré",
        desc: "Lambaré atrai 8% dos projetos residenciais da Grande Assunção. O mercado imobiliário se concentra em casas unifamiliares e duplex acessíveis. Muito atraente para comércio local e escolas pela alta densidade de famílias."
      }
    },
    keyStats: {
      es: "Capta el 8% de obras residenciales y el 3% de oficinas. Cuenta con 31 puntos críticos de raudales pluviales y accesibilidad náutica al río Paraguay.",
      en: "Captures 8% of residential construction and 3% of office space. Features 31 critical flash flood points and nautical access to the Paraguay River.",
      pt: "Concentra 8% de obras residenciais e 3% de escritórios. Possui 31 pontos críticos de enxurradas e acesso náutico ao rio Paraguai."
    }
  },
  "villa-elisa": {
    name: "Villa Elisa",
    photo: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&auto=format&fit=crop&q=80",
    description: {
      es: "Un suburbio residencial ordenado, limpio y seguro del departamento Central. Ideal para familias que buscan tranquilidad y un entorno de baja densidad.",
      en: "A tidy, clean, and safe residential suburb in the Central department. Ideal for families looking for peace and a low-density environment.",
      pt: "Um subúrbio residencial ordenado, limpo e seguro no departamento Central. Ideal para famílias que buscam tranquilidade e um ambiente de baixa densidade."
    },
    safety: {
      es: "Alto (Tasas de delincuencia notablemente bajas y plazas públicas bien cuidadas y vigiladas).",
      en: "High (Notably low crime rates and well-maintained, policed public parks).",
      pt: "Alto (Taxas de criminalidade visivelmente baixas e praças públicas bem cuidada e vigiadas)."
    },
    cost: {
      es: "Medio ($450 - $700 USD/mes)",
      en: "Medium ($450 - $700 USD/month)",
      pt: "Médio ($450 - $700 USD/mês)"
    },
    pros: {
      es: [
        "Planificación urbana limpia y ordenada, superior a la media de la periferia.",
        "Ambiente residencial pacífico de baja altura con excelente sentido de comunidad.",
        "Seguridad ciudadana y espacios públicos familiares muy bien preservados."
      ],
      en: [
        "Clean and organized urban planning, superior to average metropolitan suburbs.",
        "Peaceful low-rise residential environment with a strong sense of community.",
        "Highly preserved public safety and family-friendly public areas."
      ],
      pt: [
        "Planejamento urbano limpo e ordenado, acima da média da periferia metropolitana.",
        "Ambiente residencial pacífico de baixa altura com excelente senso de comunidade.",
        "Segurança pública e espaços de convivência familiar muito bem preservados."
      ]
    },
    cons: {
      es: [
        "Dependencia obligada de transporte privado; el transporte público hacia Asunción es deficiente.",
        "Largos tiempos de viaje debido a la alta congestión en las avenidas de acceso metropolitano.",
        "Deficiencias puntuales en el sistema de salud pública local e infraestructura municipal."
      ],
      en: [
        "Forced dependence on private vehicles; public transport to Asunción is very weak.",
        "Long travel times due to heavy traffic on metropolitan access routes.",
        "Occasional deficiencies reported in the local public health system and clinics."
      ],
      pt: [
        "Dependência obrigatória de transporte particular; o transporte público é deficiente.",
        "Longos tempos de deslocamento pela alta lentidão nas avenidas de acesso metropolitano.",
        "Deficiências pontuais no sistema de saúde pública e na infraestrutura hospitalar local."
      ]
    },
    businessProfile: {
      es: {
        title: "Perfil de Negocios en Villa Elisa",
        desc: "Una ciudad dormitorio con baja densidad de edificios comerciales (1% de construcción vertical metropolitana). Es ideal para inversiones comerciales de nicho residencial: farmacias, gimnasios y centros de recreación de alta calidad."
      },
      en: {
        title: "Villa Elisa Business Profile",
        desc: "A commuter suburb with low density of commercial buildings (1% of vertical projects). Perfect for commercial niche investments targeting families: pharmacies, gyms, and quality recreation spots."
      },
      pt: {
        title: "Perfil de Negócios em Villa Elisa",
        desc: "Uma cidade-dormitório com baixa densidade de prédios comerciais (1% da construção vertical metropolitana). Ideal para investimentos de nicho residencial: farmácias, academias e lazer."
      }
    },
    keyStats: {
      es: "Capta solo el 1% de proyectos de construcción vertical, preservando una baja densidad y altos índices de seguridad familiar y orden municipal.",
      en: "Captures only 1% of vertical construction projects, preserving low density and high family safety ratings with tidy municipal planning.",
      pt: "Concentra apenas 1% dos projetos de construção vertical, preservando baixa densidade e altos índices de segurança familiar e ordem municipal."
    }
  },
  "limpio": {
    name: "Limpio",
    photo: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80",
    description: {
      es: "Ubicada en el norte del departamento Central, es una zona de rápida expansión urbana que destaca por la asequibilidad de sus terrenos y su cercanía al río Paraguay.",
      en: "Located in the north of the Central department, it is a rapidly expanding area known for its highly affordable land prices and proximity to the Paraguay River.",
      pt: "Localizada no norte do departamento Central, é uma zona de rápida expansão urbana que se destaca por seus terrenos baratos e proximidade com o rio Paraguai."
    },
    safety: {
      es: "Moderada-Baja (Presencia de delincuencia común y focos de delincuencia en asentamientos periféricos).",
      en: "Moderate-Low (Presence of common theft and criminal spots in peripheral settlements).",
      pt: "Moderada-Baixa (Presença de criminalidade comum e focos de delinquência em assentamentos periféricos)."
    },
    cost: {
      es: "Bajo ($350 - $550 USD/mes)",
      en: "Low ($350 - $550 USD/month)",
      pt: "Baixo ($350 - $550 USD/mês)"
    },
    pros: {
      es: [
        "Terrenos y propiedades rurales o suburbanas sumamente económicos para construir.",
        "Hermosos entornos fluviales y recreativos en Piquete Cué y el río Salado.",
        "Excelente conectividad logística hacia el Chaco a través del Puente Héroes del Chaco."
      ],
      en: [
        "Extremely affordable land and suburban properties for custom building projects.",
        "Beautiful river environments and fishing spots in Piquete Cué and the Salado River.",
        "Excellent logistics connectivity to the Chaco region via the Héroes del Chaco Bridge."
      ],
      pt: [
        "Terrenos e propriedades rurais ou suburbanas muito baratos para construção.",
        "Belas paisagens fluviais e lazer em Piquete Cué e no Rio Salado.",
        "Excelente conectividade logística com o Chaco através da Ponte Héroes del Chaco."
      ]
    },
    cons: {
      es: [
        "Contaminación olfativa y ambiental en áreas urbanas por industrias de curtidurías y mataderos.",
        "Zonas periféricas (asentamientos como Salado) presentan problemas de marginación social.",
        "Carencia de agua potable de red; alta dependencia de pozos artesianos comunitarios."
      ],
      en: [
        "Odor and environmental issues in urban sectors from local tanneries and slaughterhouses.",
        "Peripheral settlements (like Salado) register social marginalization and safety issues.",
        "Lack of municipal tap water; high dependency on community groundwater wells."
      ],
      pt: [
        "Poluição olfativa e ambiental em áreas urbanas por curtumes e matadouros locais.",
        "Zonas periféricas (assentamentos como Salado) com problemas de marginalização social.",
        "Falta de água encanada; alta dependência de poços artesianos comunitários."
      ]
    },
    businessProfile: {
      es: {
        title: "Perfil de Negocios en Limpio",
        desc: "Excelente oportunidad para compra de tierras baratas y desarrollos industriales de bajo costo. La conectividad mejorada con el Chaco impulsa la instalación de depósitos, centros logísticos y fábricas de mediana escala."
      },
      en: {
        title: "Limpio Business Profile",
        desc: "Excellent opportunity for cheap land acquisitions and industrial developments. Improved connectivity with Chaco drives the creation of warehouses, distribution hubs, and mid-scale factories."
      },
      pt: {
        title: "Perfil de Negócios em Limpio",
        desc: "Excelente oportunidade para aquisição de terras baratas e instalações industriais de baixo custo. A melhoria viária com o Chaco impulsiona galpões, logística e fábricas de médio porte."
      }
    },
    keyStats: {
      es: "Rápido crecimiento demográfico impulsado por tierras asequibles. Humedales del río Salado y alta dependencia de pozos artesianos comunitarios.",
      en: "Rapid demographic growth driven by affordable land. Humedals of the Salado River and high dependency on community groundwater wells.",
      pt: "Rápido crescimento demográfico impulsionado por terras baratas. Pantanais do Rio Salado e alta dependência de poços artesianos comunitários."
    }
  },
  "hernandarias": {
    name: "Hernandarias",
    photo: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80",
    description: {
      es: "Capital de la energía hidroeléctrica del país por albergar la represa de Itaipú. Ofrece un entorno natural muy cuidado y el exclusivo enclave residencial Paraná Country Club.",
      en: "Hydroelectric energy capital of the country, home to the Itaipú Dam. It offers highly preserved green reserves and the exclusive Paraná Country Club gated community.",
      pt: "Capital da energia hidrelétrica do país por abrigar a usina de Itaipu. Oferece um meio ambiente muito bem preservado e o condomínio fechado de luxo Paraná Country Club."
    },
    safety: {
      es: "Excepcional (Dentro del Paraná Country Club con seguridad militarizada; moderada en el casco urbano).",
      en: "Exceptional (Inside Paraná Country Club with military-grade security; moderate in the town center).",
      pt: "Excepcional (Dentro do Paraná Country Club com segurança militarizada; moderada no centro urbano)."
    },
    cost: {
      es: "Alto ($800 - $1.300 USD/mes)",
      en: "High ($800 - $1,300 USD/month)",
      pt: "Alto ($800 - $1.300 USD/mês)"
    },
    pros: {
      es: [
        "Seguridad absoluta e infraestructura vial y eléctrica independiente dentro del Paraná Country Club.",
        "Entorno natural impecable y aire limpio gracias a las reservas biológicas de Itaipú.",
        "Cercanía inmediata a la frontera con Brasil y oportunidades industriales bajo la Ley de Maquila."
      ],
      en: [
        "Absolute security and independent electrical/water networks inside Paraná Country Club.",
        "Impeccable natural environment and clean air due to Itaipú's biological forest reserves.",
        "Immediate proximity to Brazil and industrial opportunities under the Maquila Law."
      ],
      pt: [
        "Segurança total e redes viária e elétrica independentes dentro do Paraná Country Club.",
        "Meio ambiente impecável e ar limpo graças às reservas biológicas de Itaipu.",
        "Proximidade imediata do Brasil e oportunidades industriais sob a Lei de Maquila."
      ]
    },
    cons: {
      es: [
        "Fuera del Paraná Country Club, el centro tiene una oferta comercial y de servicios muy básica.",
        "Dependencia de Ciudad del Este para servicios médicos complejos, trámites y compras especializadas.",
        "Costo de vida muy elevado para residentes dentro de la zona de élite del club."
      ],
      en: [
        "Outside the Paraná Country Club, the town center has limited services and basic retail.",
        "High dependency on Ciudad del Este for high-complexity healthcare, banking, and shopping.",
        "Very high cost of living for residents inside the elite gated community."
      ],
      pt: [
        "Fora do Paraná Country Club, o centro da cidade tem comércio e serviços muito básicos.",
        "Dependência de Ciudad del Este para hospitais de alta complexidade e compras especializadas.",
        "Custo de vida muito alto para residentes dentro do condomínio fechado de elite."
      ]
    },
    businessProfile: {
      es: {
        title: "Perfil de Negocios en Hernandarias",
        desc: "Polo industrial clave de Alto Paraná que se beneficia de la energía de Itaipú y de terrenos industriales de gran superficie. Es perfecto para empresas maquiladoras de capital brasileño y desarrollos logísticos fronterizos."
      },
      en: {
        title: "Hernandarias Business Profile",
        desc: "Key industrial hub in Alto Paraná benefiting from Itaipú's electric power and large industrial land plots. Perfect for manufacturing exporters under the Maquila regime and border logistics projects."
      },
      pt: {
        title: "Perfil de Negócios em Hernandarias",
        desc: "Polo industrial chave no Alto Paraná, beneficiando-se da energia da Itaipu e de grandes áreas industriais. Perfeito para fábricas exportadoras (Lei de Maquila) e centros logísticos de fronteira."
      }
    },
    keyStats: {
      es: "Sede de la represa Itaipú y del exclusivo Paraná Country Club. Enclave residencial de élite con seguridad militarizada e infraestructura independiente.",
      en: "Home to the Itaipú Dam and the exclusive Paraná Country Club. Elite residential enclave with military-grade security and independent infrastructure.",
      pt: "Sede da represa Itaipu e do exclusivo Paraná Country Club. Condomínio residencial de elite com segurança militarizada e infraestrutura independente."
    }
  },
  "villarrica": {
    name: "Villarrica",
    photo: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&auto=format&fit=crop&q=80",
    description: {
      es: "Capital del departamento de Guairá, conocida por su rica tradición cultural, histórica y académica. Es un polo de retiro muy valorado por expatriados alemanes por su bajo costo de vida.",
      en: "Capital of the Guairá department, renowned for its cultural, historical, and academic traditions. It is a highly valued retirement spot for European expats due to its low cost of living.",
      pt: "Capital do departamento de Guairá, conhecida por sua rica tradição cultural, histórica e acadêmica. É um local de aposentadoria muito valorizado por estrangeiros devido ao baixo custo de vida."
    },
    safety: {
      es: "Alto (Ciudad sumamente tranquila con bajos niveles de inseguridad ciudadana y ambiente seguro).",
      en: "High (Extremely peaceful town with very low rates of public safety issues and safe environment).",
      pt: "Alto (Cidade muito tranquila, com baixos índices de violência urbana e ambiente familiar seguro)."
    },
    cost: {
      es: "Bajo ($400 - $650 USD/mes)",
      en: "Low ($400 - $650 USD/month)",
      pt: "Baixo ($400 - $650 USD/mês)"
    },
    pros: {
      es: [
        "Costo de vida e inmobiliario extremadamente accesible en comparación con el eje metropolitano.",
        "Sólida e histórica comunidad de expatriados (de habla alemana) instalada en la región.",
        "Ambiente cultural y universitario activo, con plazas cuidadas e identidad histórica propia."
      ],
      en: [
        "Extremely affordable cost of living and property prices compared to the capital.",
        "Solid and historic German-speaking expat community established in the region.",
        "Active cultural and university scene with well-maintained public plazas and history."
      ],
      pt: [
        "Custo de vida e preços imobiliários muito baratos comparados à região metropolitana.",
        "Sólida e histórica comunidade de estrangeiros (alemães) instalada na região.",
        "Ambiente cultural e universitário ativo, com praças limpas e forte identidade histórica."
      ]
    },
    cons: {
      es: [
        "El ritmo de vida extremadamente pausado ('tiempo paraguayo') puede ralentizar trámites administrativos.",
        "Red vial interna y aceras peatonales muy descuidadas fuera del microcentro urbano.",
        "Acceso a medicina de alta complejidad limitado, requiriendo traslados a Asunción por urgencias."
      ],
      en: [
        "The extremely slow pace of life ('tiempo paraguayo') can delay administrative processes.",
        "Very poorly maintained internal roads and lack of sidewalks outside the central district.",
        "Limited access to high-complexity medical facilities, requiring travel to Asunción for emergencies."
      ],
      pt: [
        "O ritmo de vida muito calmo ('tempo paraguaio') pode atrasar processos e serviços.",
        "Malha viária interna e calçadas de pedestres ruins fora do microcentro comercial.",
        "Acesso limitado a hospitais de alta complexidade, exigindo viagens a Assunção em emergências."
      ]
    },
    businessProfile: {
      es: {
        title: "Perfil de Negocios en Villarrica",
        desc: "Villarrica ofrece un mercado ideal para proyectos de agricultura orgánica, ecoturismo y servicios dedicados a jubilados extranjeros. El bajo costo de la mano de obra y de la tierra facilita el emprendimiento rural sostenible."
      },
      en: {
        title: "Villarrica Business Profile",
        desc: "Villarrica offers an ideal market for organic agriculture, ecotourism, and specialized services for foreign retirees. Low labor and land costs facilitate sustainable rural business setups."
      },
      pt: {
        title: "Perfil de Negócios em Villarrica",
        desc: "Oferece um mercado ideal para agricultura orgânica, ecoturismo e serviços dedicados a aposentados estrangeiros. O baixo custo de mão de obra e terras facilita empreendimentos rurais sustentáveis."
      }
    },
    keyStats: {
      es: "Capital de Guairá. Próspera comunidad de retiro para extranjeros y habla alemana. Costo de vida muy reducido y ambiente académico.",
      en: "Capital of Guairá. Thriving residential retirement community for German-speaking expats. Very low cost of living and academic environment.",
      pt: "Capital do Guairá. Próspera comunidade de aposentados estrangeiros e de língua alemã. Custo de vida muito reduzido e ambiente acadêmico."
    }
  },
  "pilar": {
    name: "Pilar",
    photo: "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?w=800&auto=format&fit=crop&q=80",
    description: {
      es: "Capital del departamento de Ñeembucú, a orillas del río Paraguay. Es conocida nacionalmente como la ciudad más segura y pacífica de Paraguay, con una costanera moderna.",
      en: "Capital of the Ñeembucú department, located on the banks of the Paraguay River. It is nationally famous for being the safest and most peaceful city in Paraguay, featuring a modern waterfront.",
      pt: "Capital do departamento de Ñeembucú, às margens do rio Paraguai. É conhecida no país como a cidade mais segura e pacífica do Paraguai, com uma costanera moderna."
    },
    safety: {
      es: "Excepcional (Índices de criminalidad violenta prácticamente nulos. Estilo de vida de puertas abiertas).",
      en: "Exceptional (Virtually zero violent crime. 'Open door' lifestyle where keys are left in vehicles).",
      pt: "Excepcional (Índices de criminalidade violenta quase nulos. Estilo de vida de portas abertas)."
    },
    cost: {
      es: "Bajo ($350 - $550 USD/mes)",
      en: "Low ($350 - $550 USD/month)",
      pt: "Baixo ($350 - $550 USD/mês)"
    },
    pros: {
      es: [
        "Nivel de seguridad ciudadana inigualable en la región, permitiendo una tranquilidad absoluta.",
        "Hermosa costanera fluvial limpia, moderna y con excelente diseño estético.",
        "Ciudad silenciosa de ritmo pausado, ideal para desconectarse y descansar de ruidos urbanos."
      ],
      en: [
        "Unmatched level of public safety, offering complete peace of mind for families.",
        "Beautiful, clean, and modern riverfront (costanera) with an excellent design.",
        "Quiet town with a slow pace of life, ideal for digital detox and escaping city noise."
      ],
      pt: [
        "Nível de segurança pública inigualável na região, permitindo tranquilidade absoluta.",
        "Bela costanera fluvial limpa, moderna e com excelente desenho urbanístico.",
        "Cidade silenciosa e calma, ideal para descansar e fugir da poluição sonora urbana."
      ]
    },
    cons: {
      es: [
        "El relativo aislamiento geográfico requiere largas horas de carretera para llegar a Asunción.",
        "Mercado laboral y de negocios muy reducido, limitando las oportunidades profesionales locales.",
        "Falta de centros médicos de alta complejidad, obligando a traslados en caso de emergencias críticas."
      ],
      en: [
        "Relative geographic isolation requires several hours of road travel to reach Asunción.",
        "Very small local employment and retail market, limiting professional business opportunities.",
        "Absence of advanced emergency healthcare infrastructure, requiring long-distance transfers."
      ],
      pt: [
        "O relativo isolamento geográfico exige muitas horas de estrada para chegar a Assunção.",
        "Mercado de trabalho e de negócios muito reduzido, limitando carreiras locais.",
        "Ausência de hospitais de alta complexidade, exigindo transferências em emergências críticas."
      ]
    },
    businessProfile: {
      es: {
        title: "Perfil de Negocios en Pilar",
        desc: "El mercado empresarial de Pilar es reducido, centrado en el comercio fluvial y la industria textil (Manufactura de Pilar). Es ideal para profesionales remotos e inversores de nicho que buscan seguridad absoluta y tranquilidad rural."
      },
      en: {
        title: "Pilar Business Profile",
        desc: "Pilar's business market is small, centered around river trade and textile manufacturing (Manufactura de Pilar). Perfect for remote professionals and niche investors seeking absolute safety."
      },
      pt: {
        title: "Perfil de Negócios em Pilar",
        desc: "Mercado empresarial reduzido, focado em comércio fluvial e na indústria têxtil (Manufactura de Pilar). Ideal para profissionais remotos e investidores em segurança e paz."
      }
    },
    keyStats: {
      es: "Capital de Ñeembucú. Tasas de criminalidad violenta prácticamente nulas. Estilo de vida de puertas abiertas y costanera fluvial impecable.",
      en: "Capital of Ñeembucú. Practically zero violent crime rates. Open-door lifestyle and pristine riverfront costanera.",
      pt: "Capital do Ñeembucú. Taxas de criminalidade violenta quase nulas. Estilo de vida de portas abertas e costanera fluvial impecável."
    }
  }
};

export async function generateMetadata({ params: { ciudad, locale } }) {
  const city = CITIES_DATA[ciudad];
  if (!city) return { title: "City not found" };

  const titles = {
    es: `Vivir en ${city.name}: Guía Completa de Precios y Zonas | ParaguayReal`,
    en: `Living in ${city.name}: Complete Guide to Prices & Areas | ParaguayReal`,
    pt: `Viver em ${city.name}: Guia Completo de Preços e Zonas | ParaguayReal`
  };

  const descriptions = {
    es: `Descubre todo sobre vivir en ${city.name}: pros y contras, seguridad, costos promedio de vida y mapa de lugares recomendados.`,
    en: `Discover everything about living in ${city.name}: pros & cons, safety, average living costs, and map of recommended places.`,
    pt: `Descubra tudo sobre viver em ${city.name}: prós e contras, segurança, custos médios de vida e mapa de locais recomendados.`
  };

  return {
    title: titles[locale] || titles.es,
    description: descriptions[locale] || descriptions.es
  };
}

export default function CiudadPage({ params: { ciudad, locale } }) {
  const city = CITIES_DATA[ciudad];
  const t = useTranslations();

  if (!city) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center font-bold">
        {locale === 'en' ? "City not found in our database." : locale === 'pt' ? "Cidade não encontrada em nosso banco de dados." : "Ciudad no encontrada en nuestra base de datos."}
      </div>
    );
  }

  const description = city.description[locale] || city.description.es;
  const safety = city.safety[locale] || city.safety.es;
  const cost = city.cost[locale] || city.cost.es;
  const pros = city.pros[locale] || city.pros.es;
  const cons = city.cons[locale] || city.cons.es;

  const breadcrumbs = [
    { label: t("Navigation.cities") || "Ciudades", url: "/ciudades/asuncion" },
    { label: city.name, url: `/ciudades/${ciudad}` }
  ];

  // Structured Place schemas
  const placeSchema = {
    "@context": "https://schema.org",
    "@type": "Place",
    "name": city.name,
    "description": description,
    "image": city.photo,
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "PY",
      "addressLocality": city.name
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 select-none space-y-8">
      <SchemaOrg schema={placeSchema} />
      <Breadcrumb items={breadcrumbs} locale={locale} />

      {/* Horizontal City Switcher / Selector Navigation Bar */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mt-4 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
        {Object.keys(CITIES_DATA).map((key) => {
          const isActive = key === ciudad;
          const name = CITIES_DATA[key].name;
          return (
            <a
              key={key}
              href={`/${locale}/ciudades/${key}`}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border shrink-0 ${
                isActive
                  ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm font-bold animate-none'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {name}
            </a>
          );
        })}
      </div>

      {/* Hero Banner */}
      <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden shadow-lg bg-slate-900 text-white">
        <img
          src={city.photo}
          alt={city.name}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/30 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 space-y-2">
          <UpdatedBadge />
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display leading-none">
            {t("Cities.guideTitle", { city: city.name }) || `Guía de Vida en ${city.name}`}
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 max-w-xl line-clamp-2">
            {description}
          </p>
        </div>
      </div>

      {/* Pros & Cons */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pros */}
        <div className="bg-emerald-50/30 border border-emerald-100 rounded-xl p-5 space-y-3">
          <h3 className="font-extrabold text-slate-900 text-sm sm:text-base flex items-center gap-1.5">
            <Check className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{t("Cities.prosTitle", { city: city.name }) || `Ventajas de vivir en ${city.name}`}</span>
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-700 list-none pl-1">
            {pros.map((pro, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold shrink-0 mt-0.5">•</span>
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Cons */}
        <div className="bg-red-50/20 border border-red-100 rounded-xl p-5 space-y-3">
          <h3 className="font-extrabold text-slate-900 text-sm sm:text-base flex items-center gap-1.5">
            <X className="w-5 h-5 text-red-600 shrink-0" />
            <span>{t("Cities.consTitle", { city: city.name }) || `Desventajas de vivir en ${city.name}`}</span>
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-700 list-none pl-1">
            {cons.map((con, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-red-500 font-bold shrink-0 mt-0.5">•</span>
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Quick Stats Panel */}
      <section className="bg-white rounded-xl border border-slate-100 p-5 shadow-sm grid grid-cols-2 gap-4 text-xs sm:text-sm">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-emerald-600 animate-pulse" />
          <div>
            <span className="text-[10px] font-bold text-slate-400 block uppercase">
              {t("Cities.safetyTitle") || "Nivel de Seguridad"}
            </span>
            <span className="font-semibold text-slate-800">{safety}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-emerald-600 animate-pulse" />
          <div>
            <span className="text-[10px] font-bold text-slate-400 block uppercase">
              {t("Cities.costTitle") || "Costo Mensual Estimado"}
            </span>
            <span className="font-semibold text-slate-800">{cost}</span>
          </div>
        </div>
      </section>

      {/* Regional Stats Badge/Banner (Decreto & Exclusions Factsheet) */}
      <section className="bg-gradient-to-br from-emerald-600 to-teal-800 rounded-xl p-6 text-white shadow-sm space-y-2">
        <h4 className="text-xs uppercase font-extrabold tracking-wider text-emerald-100">
          {locale === 'es' ? "Dato Estadístico Clave (Junio 2026)" : locale === 'pt' ? "Dado Estatístico Chave (Junho 2026)" : "Key Statistical Fact (June 2026)"}
        </h4>
        <p className="text-sm sm:text-base leading-relaxed font-semibold">
          {city.keyStats?.[locale] || city.keyStats?.es || (t(`Cities.${ciudad}Stats`) || "Estudio Geourbano 2026")}
        </p>
      </section>

      {/* Perfil de Negocios */}
      {city.businessProfile && (
        <section className="bg-emerald-50/20 border border-emerald-100 rounded-xl p-5 space-y-3">
          <h3 className="font-extrabold text-slate-900 text-sm sm:text-base flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{(city.businessProfile[locale] || city.businessProfile.es).title}</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-light">
            {(city.businessProfile[locale] || city.businessProfile.es).desc}
          </p>
        </section>
      )}

      {/* Local Map */}
      <section className="space-y-4">
        <h3 className="font-extrabold text-slate-950 text-base sm:text-lg flex items-center gap-2">
          <MapPin className="w-5 h-5 text-emerald-600" />
          <span>{t("Cities.recommendedPlaces", { city: city.name }) || `Lugares Recomendados en ${city.name}`}</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          {t("Cities.exploreDesc", { city: city.name }) || `Explora los centros de salud, comercios y zonas turísticas clave que hemos catalogado para ${city.name}. Puedes hacer clic en los pines para obtener rutas directas de Google Maps.`}
        </p>
        <CityMap cityKey={ciudad} places={placesGeoJSON.features} locale={locale} />
      </section>
    </div>
  );
}
