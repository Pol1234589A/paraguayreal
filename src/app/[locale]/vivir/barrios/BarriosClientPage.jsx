'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import Breadcrumb from '../../../../components/UI/Breadcrumb';
import UpdatedBadge from '../../../../components/UI/UpdatedBadge';
import { AlertOctagon, ShieldAlert, Waves, AlertTriangle, Eye } from 'lucide-react';
import NeighborhoodMap from '../../../../components/Map/NeighborhoodMap';

const CITY_DETAILS = {
  asuncion: {
    title: {
      es: "Zonas y Barrios de Asunción: Seguridad y Precios",
      en: "Neighborhoods and Areas of Asunción: Safety & Prices",
      pt: "Zonas e Bairros de Assunção: Segurança e Preços"
    },
    q1Title: {
      es: "¿Dónde viven la mayoría de los extranjeros?",
      en: "Where do most expats live?",
      pt: "Onde mora a maioria dos estrangeiros?"
    },
    q1Text: {
      es: "Villa Morra y el eje de la Avenida Aviadores del Chaco (Manora, Ycua Sati) son las zonas preferidas debido a la inmensa cantidad de servicios, oficinas corporativas, gimnasios modernos y centros comerciales de lujo a distancias caminables.",
      en: "Villa Morra and the Aviadores del Chaco axis (Manora, Ycua Sati) are the preferred areas due to the immense number of amenities, corporate offices, modern gyms, and luxury shopping centers within walking distance.",
      pt: "Villa Morra e o eixo da Avenida Aviadores del Chaco (Manora, Ycua Sati) são as zonas preferidas devido à imensa quantidade de serviços, escritórios corporativos, academias modernas e shopping centers de luxo a distâncias a pé."
    },
    q2Title: {
      es: "¿Cuál es el barrio más tranquilo y seguro?",
      en: "Which is the quietest and safest neighborhood?",
      pt: "Qual é o bairro mais tranquilo e seguro?"
    },
    q2Text: {
      es: "Mburucuyá destaca por ser puramente residencial, con calles empedradas cubiertas por enormes copas de árboles y presencia de embajadas, lo que garantiza una vigilancia y patrullaje policial superior al promedio.",
      en: "Mburucuyá stands out as a purely residential neighborhood, featuring tree-lined cobbled streets and nearby embassies, which guarantees above-average police patrols and vigilance.",
      pt: "Mburucuyá destaca-se por ser puramente residencial, com ruas arborizadas de paralelepípedos e a presença de embaixadas, o que garante policiamento e patrulha muito superiores à média."
    },
    safetyAlertText: {
      es: "La seguridad en la capital varía por microzona. Para una radicación segura, ten en cuenta las siguientes recomendaciones basadas en reportes locales de 2026:",
      en: "Safety in the capital varies by microzone. For a secure relocation, keep in mind the following recommendations based on local 2026 reports:",
      pt: "A segurança na capital varia de acordo com a microzona. Para uma mudança segura, tenha em conta as seguintes recomendações com base em relatórios locais de 2026:"
    },
    safetyRedZoneText: {
      es: "El barrio Ricardo Brugada (La Chacarita, incluyendo Pelopincho y Barrio Chino) concentra altos niveles de marginalidad y delincuencia violenta. Evítalo por completo. Asimismo, ten precaución en los barrios Roberto L. Pettit, Santa Ana, Tacumbú, Republicano (zona Caracolito), Mundo Aparte y en los alrededores del Mercado de Abasto y la Terminal de Ómnibus por asaltos de motochorros.",
      en: "The Ricardo Brugada neighborhood (La Chacarita, including Pelopincho and Barrio Chino) concentrates high levels of marginalization and violent crime. Avoid it completely. Also, exercise caution in Roberto L. Pettit, Santa Ana, Tacumbú, Republicano (Caracolito zone), Mundo Aparte, and around the Mercado de Abasto and the Bus Terminal due to motorcycle robbery (motochorros).",
      pt: "O bairro Ricardo Brugada (La Chacarita, incluindo Pelopincho e Barrio Chino) concentra altos níveis de marginalidade e criminalidade violenta. Evite-o completamente. Além disso, tenha cautela nos bairros Roberto L. Pettit, Santa Ana, Tacumbú, Republicano (zona Caracolito), Mundo Aparte e ao redor do Mercado de Abasto e do Terminal Rodoviário por assaltos de motoqueiros (motochorros)."
    },
    safetyModZoneText: {
      es: "El microcentro histórico requiere cautela en horario nocturno tras el cierre comercial, especialmente en las inmediaciones de las calles Colón y Oliva. Igualmente, transita con cuidado en Varadero y los alrededores del Cementerio del Este.",
      en: "The historic downtown (microcentro) requires caution at night after businesses close, especially near Colón and Oliva streets. Likewise, walk carefully in Varadero and the areas surrounding the Eastern Cemetery.",
      pt: "O centro histórico (microcentro) requer cautela no horário noturno após o fechamento do comércio, especialmente nas proximidades das ruas Colón e Oliva. Igualmente, transite com cuidado em Varadero e nos arredores do Cemitério do Leste."
    },
    raudalesDesc: {
      es: "El mayor riesgo físico en días de lluvia son los raudales (corrientes de agua torrenciales). Al no contar con un drenaje pluvial completo, las tormentas convierten las pendientes de Asunción y Central en ríos caudalosos que arrastran vehículos. Cruces críticos:",
      en: "The greatest physical risk on rainy days is flash floods (raudales). Lacking complete storm drainage, storms turn Asunción and Central slopes into rushing rivers that sweep vehicles away. Critical intersections:",
      pt: "O maior risco físico em dias de chuva são as enxurradas (raudales). Por não possuir drenagem pluvial completa, as tempestades transformam as ladeiras de Assunção e Central em rios caudalosos que arrastam veículos. Cruzamentos críticos:"
    },
    raudalesPoints: {
      es: "Avda. General Santos y San Antonio, Avda. Perú y Artigas, Avda. República Argentina y Caaguazú, Avda. Eusebio Ayala y Boggiani, Avda. Fernando de la Mora y Victoria.",
      en: "Avda. General Santos & San Antonio, Avda. Perú & Artigas, Avda. República Argentina & Caaguazú, Avda. Eusebio Ayala & Boggiani, Avda. Fernando de la Mora & Victoria.",
      pt: "Avda. General Santos e San Antonio, Avda. Perú e Artigas, Avda. República Argentina e Caaguazú, Avda. Eusebio Ayala e Boggiani, Avda. Fernando de la Mora e Victoria."
    }
  },
  luque: {
    title: {
      es: "Zonas y Barrios de Luque: Conectividad y Expansión",
      en: "Neighborhoods and Areas of Luque: Connectivity & Expansion",
      pt: "Zonas e Bairros de Luque: Conectividade e Expansão"
    },
    q1Title: {
      es: "¿Por qué elegir Luque para residir?",
      en: "Why choose Luque for residence?",
      pt: "Por que escolher Luque para morar?"
    },
    q1Text: {
      es: "Su proximidad estratégica al Aeropuerto Internacional Silvio Pettirossi, la sede de la Conmebol, el Club de Oficiales y el nuevo eje corporativo de Asunción la posicionan como una opción residencial idónea para familias y expatriados de ingresos medios y altos.",
      en: "Its strategic proximity to Silvio Pettirossi International Airport, the Conmebol headquarters, the Officers Club, and Asunción's corporate hub positions it as an ideal residential option for middle and high-income families and expats.",
      pt: "Sua proximidade estratégica do Aeroporto Internacional Silvio Pettirossi, da sede da Conmebol, do Clube de Oficiais e do novo eixo corporativo de Assunção a posiciona como uma opção residencial ideal para famílias e expatriados de classe média e alta."
    },
    q2Title: {
      es: "¿Cuáles son los barrios y condominios cerrados recomendados?",
      en: "Which are the recommended neighborhoods and gated communities?",
      pt: "Quais são os bairros e condomínios fechados recomendados?"
    },
    q2Text: {
      es: "Laurelty, Cañada San Rafael o el Country Montesol ofrecen hermosas viviendas en complejos cerrados con máxima seguridad las 24 horas y amenidades como piscina o quincho. Para la clase media, Villa Adela o el Segundo Barrio brindan excelentes ofertas modernas.",
      en: "Laurelty, Cañada San Rafael, or Country Montesol offer beautiful homes in gated complexes with maximum 24-hour security and amenities like pools or barbecue areas. For the middle class, Villa Adela or the Segundo Barrio provide excellent modern options.",
      pt: "Laurelty, Cañada San Rafael ou Country Montesol oferecem belas casas em condomínios fechados com máxima segurança 24 horas e comodidades como piscina ou churrasqueira. Para a classe média, Villa Adela ou Segundo Barrio oferecem ótimas opções modernas."
    },
    safetyAlertText: {
      es: "Luque destaca por ser muy residencial y seguro dentro de sus urbanizaciones privadas, aunque en la vía pública común conviene adoptar precauciones habituales de noche:",
      en: "Luque stands out for being very residential and safe inside its private developments, though in common public streets typical precautions should be taken at night:",
      pt: "Luque destaca-se por ser muito residencial e seguro dentro de seus condomínios fechados, embora na via pública comum convenha adotar precauções habituais à noite:"
    },
    safetyRedZoneText: {
      es: "Se recomienda evitar caminar a altas horas de la noche por calles poco iluminadas o cercanas a las antiguas vías ferroviarias en desuso y la periferia industrial limítrofe por robos de oportunidad.",
      en: "It is recommended to avoid walking late at night along poorly lit streets or near the old disused railway tracks and the bordering industrial periphery due to crime of opportunity.",
      pt: "Recomenda-se evitar caminhar tarde da noite por ruas pouco iluminadas ou próximas aos antigos trilhos ferroviários desativados e à periferia industrial limítrofe por pequenos roubos."
    },
    safetyModZoneText: {
      es: "El microcentro comercial tradicional de Luque y paradas de transporte público secundarias de noche requieren atención ante la presencia de asaltos menores o carteristas.",
      en: "The traditional commercial center of Luque and secondary public transport stops require alertness at night due to minor robberies or pickpockets.",
      pt: "O centro comercial tradicional de Luque e paradas de transporte público secundárias à noite exigem atenção diante da presença de pequenos assaltos ou batedores de carteira."
    },
    raudalesDesc: {
      es: "Luque posee 15 puntos pluviales de alto peligro durante las lluvias torrenciales del área metropolitana, donde las pendientes canalizan fuertes torrentes de agua. Intersecciones de riesgo:",
      en: "Luque has 15 high-danger pluvial points during heavy tropical downpours in the metropolitan area, where slopes channel strong water currents. Risk intersections:",
      pt: "Luque possui 15 pontos pluviais de alto perigo durante chuvas torrenciais na área metropolitana, onde as ladeiras canalizam fortes enxurradas de água. Cruzamentos de risco:"
    },
    raudalesPoints: {
      es: "Mariscal López y Curupayty, Benigno González y Vía Férrea, Vapor Cué y Capitán Insfrán.",
      en: "Mariscal López & Curupayty, Benigno González & Vía Férrea, Vapor Cué & Capitán Insfrán.",
      pt: "Mariscal López e Curupayty, Benigno González e Vía Férrea, Vapor Cué e Capitán Insfrán."
    }
  },
  "ciudad-del-este": {
    title: {
      es: "Zonas y Barrios de Ciudad del Este: Triple Frontera",
      en: "Neighborhoods and Areas of Ciudad del Este: Triple Border",
      pt: "Zonas e Bairros de Ciudad del Este: Tríplice Fronteira"
    },
    q1Title: {
      es: "¿Cuál es el área residencial más segura de la región?",
      en: "What is the safest residential area in the region?",
      pt: "Qual é a área residencial mais segura da região?"
    },
    q1Text: {
      es: "El Paraná Country Club representa el desarrollo de lujo absoluto más seguro del este del país, ofreciendo canchas de golf, colegios internacionales, supermercados privados y seguridad fuertemente armada las 24 horas.",
      en: "The Paraná Country Club represents the most secure luxury development in the east of the country, offering golf courses, international schools, private supermarkets, and heavily armed 24-hour security.",
      pt: "O Paraná Country Club representa o empreendimento de luxo absoluto mais seguro do leste do país, oferecendo campos de golfe, escolas internacionais, supermercados privados e segurança fortemente armada 24 horas."
    },
    q2Title: {
      es: "¿Dónde residir si buscas un perfil de negocios o estudiante?",
      en: "Where to live for business or student profiles?",
      pt: "Onde morar se você for estudante ou tiver perfil de negócios?"
    },
    q2Text: {
      es: "El Barrio Boquerón destaca por su vida universitaria y residencial premium con torres modernas (como Palladio). El Kilómetro 8 es un área de gran expansión residencial ideal para monoambientes y lofts modernos amoblados (edificio Zuba 12).",
      en: "Barrio Boquerón stands out for its university life and premium residential towers (like Palladio). Kilómetro 8 is a major residential expansion area ideal for modern furnished lofts and apartments (Zuba 12).",
      pt: "O Bairro Boquerón destaca-se pela sua vida universitária e residencial premium com edifícios modernos (como Palladio). O Quilômetro 8 é uma área de grande expansão residencial ideal para lofts e monoambientes modernos mobiliados (edifício Zuba 12)."
    },
    safetyAlertText: {
      es: "CDE posee dinámicas fronterizas particulares. Las aplicaciones de transporte Bolt y Uber aplican una exclusión estricta de ingreso a ciertos barrios catalogados como zonas rojas críticas:",
      en: "CDE has unique border dynamics. Transport apps like Bolt and Uber enforce a strict exclusion zone, refusing to enter certain neighborhoods classified as critical red zones:",
      pt: "CDE tem dinâmicas de fronteira específicas. Os aplicativos de transporte Bolt e Uber impõem uma exclusão rígida de entrada em certos bairros catalogados como zonas vermelhas críticas:"
    },
    safetyRedZoneText: {
      es: "Zonas de exclusión total (Evitar estrictamente): San Rafael, San Agustín, San Antonio y Remansito. Registran una elevada incidencia de asaltos con fines de despojo de vehículos y atracos en la vía pública.",
      en: "Total exclusion zones (Strictly avoid): San Rafael, San Agustín, San Antonio, and Remansito. High rate of armed carjacking and street robberies.",
      pt: "Zonas de exclusão total (Evite estritamente): San Rafael, San Agustín, San Antônio e Remansito. Registram alta incidência de assaltos armados para roubo de carros e pedestres."
    },
    safetyModZoneText: {
      es: "El microcentro comercial tras el horario de cierre (17:00 hs). Las calles quedan desoladas rápidamente, por lo que se recomienda no caminar tras el fin de la actividad comercial diaria.",
      en: "The commercial downtown (microcentro) after closing hours (5:00 PM). Streets empty out rapidly, so walking after commercial hours is highly discouraged.",
      pt: "O centro comercial (microcentro) após o horário de fechamento (17h). As ruas ficam desertas rapidamente, por isso recomenda-se não caminhar após o término da atividade comercial."
    },
    raudalesDesc: {
      es: "Ciudad del Este no registra raudales pluviales que arrastren vehículos como en Central, pero en días de lluvias torrenciales se sugiere precaución al manejar por pendientes pronunciadas:",
      en: "Ciudad del Este does not experience flash floods capable of sweeping cars like in Central, but during tropical storms caution is advised when driving down steep slopes:",
      pt: "Ciudad del Este não registra enxurradas que arrastam veículos como em Central, mas em dias de fortes chuvas sugere-se precaução ao dirigir em ladeiras íngremes:"
    },
    raudalesPoints: {
      es: "Pendiente de la Avenida Monseñor Rodríguez (adyacencias microcentro), y rotondas de acceso del Kilómetro 7 y Kilómetro 8.",
      en: "Monseñor Rodríguez Avenue slope (near downtown), and access roundabouts at Kilómetro 7 and Kilómetro 8.",
      pt: "Ladeira da Avenida Monseñor Rodríguez (próximo ao microcentro) e rotatórias de acesso do Quilômetro 7 e Quilômetro 8."
    }
  },
  "san-bernardino": {
    title: {
      es: "Zonas de San Bernardino: Retiro y Estacionalidad",
      en: "Areas of San Bernardino: Retirement & Seasonality",
      pt: "Zonas de San Bernardino: Retiro e Sazonalidade"
    },
    q1Title: {
      es: "¿Cómo funciona la estacionalidad de los alquileres?",
      en: "How does the rental seasonality work?",
      pt: "Como funciona a sazonalidade dos aluguéis?"
    },
    q1Text: {
      es: "San Bernardino sufre una fluctuación extrema. En temporada veraniega (diciembre a febrero), las tarifas de condominios cerrados de gama alta como Aqua Village, Toledo House o Insignia Club se alquilan por entre $4,000 y $15,000 USD mensuales. En invierno y contratos anuales, los costos caen exponencialmente.",
      en: "San Bernardino experiences extreme price fluctuations. During the summer season (December to February), high-end gated condominiums like Aqua Village, Toledo House, or Insignia Club rent for $4,000 to $15,000 USD per month. In winter and annual contracts, costs drop exponentially.",
      pt: "San Bernardino sofre flutuações extremas. Na temporada de verão (dezembro a fevereiro), condomínios fechados de luxo como Aqua Village, Toledo House ou Insignia Club são alugados por valores entre $4.000 e $15.000 USD mensais. No inverno e em contratos anuais, os custos caem exponencialmente."
    },
    q2Title: {
      es: "¿Cuál es el perfil del residente fuera de temporada?",
      en: "What is the resident profile off-season?",
      pt: "Qual é o perfil do morador fora de temporada?"
    },
    q2Text: {
      es: "Fuera de la época de verano, se convierte en una localidad residencial de retiro y descanso sumamente pacífica, donde es posible rentar casas quintas amobladas en Puerta del Lago, El Cortijo o Ciervo Cuá a valores muy accesibles.",
      en: "Outside the summer season, it becomes an extremely peaceful retirement and relaxation town, where furnished country homes in Puerta del Lago, El Cortijo, or Ciervo Cuá can be rented at very affordable off-season rates.",
      pt: "Fora da época de verão, torna-se uma cidade residencial de retiro e descanso extremamente pacífica, onde é possível alugar chácaras mobiliadas em Puerta del Lago, El Cortijo ou Ciervo Cuá a valores muito acessíveis."
    },
    safetyAlertText: {
      es: "San Bernardino destaca como uno de los distritos urbanos más seguros de Paraguay, con tasas delictivas mínimas durante todo el año:",
      en: "San Bernardino stands out as one of the safest urban districts in Paraguay, with minimal crime rates throughout the year:",
      pt: "San Bernardino destaca-se como um dos distritos urbanos mais seguros do Paraguai, com índices de criminalidade mínimos durante todo o ano:"
    },
    safetyRedZoneText: {
      es: "No se registran zonas de exclusión urbana ni barrios peligrosos en San Bernardino. Se sugiere cuidar la velocidad al transitar la ruta interdepartamental Luque-San Bernardino de noche por iluminación deficiente.",
      en: "There are no urban exclusion zones or dangerous neighborhoods in San Bernardino. It is advised to monitor speed along the Luque-San Bernardino highway at night due to poor lighting.",
      pt: "Não há zonas de exclusão urbana ou bairros perigosos em San Bernardino. Sugere-se moderar a velocidade ao trafegar pela rodovia Luque-San Bernardino à noite devido à iluminação deficiente."
    },
    safetyModZoneText: {
      es: "Precaución durante los fines de semana veraniegos por embotellamientos viales densos y rigurosos controles policiales de alcotest en las avenidas principales del centro.",
      en: "Caution during summer weekends due to dense traffic gridlocks and strict police sobriety check-points on main downtown avenues.",
      pt: "Precaução durante os fins de semana de verão devido a engarrafamentos de trânsito densos e controles policiais rígidos de bafômetro nas avenidas principais do centro."
    },
    raudalesDesc: {
      es: "San Bernardino no sufre de corrientes pluviales críticas (raudales). La principal alerta de infraestructura y ambiente radica en las aguas del Lago Ypacaraí en verano:",
      en: "San Bernardino does not suffer from critical storm runoffs (raudales). The primary environmental and infrastructure warning concerns Lake Ypacaraí's waters in summer:",
      pt: "San Bernardino não sofre com enxurradas críticas (raudales). O principal alerta de infraestrutura e meio ambiente está relacionado às águas do Lago Ypacaraí no verão:"
    },
    raudalesPoints: {
      es: "Monitoreo del agua del Lago Ypacaraí por presencia periódica de cianobacterias en meses de calor y sequía extrema.",
      en: "Monitoring of Lake Ypacaraí water due to the periodic presence of cyanobacteria during hot and dry summer months.",
      pt: "Monitoramento da água do Lago Ypacaraí debido à presença periódica de cianobactérias nos meses de calor e seca extrema."
    }
  },
  "encarnacion": {
    title: {
      es: "Zonas y Barrios de Encarnación: Seguridad y Precios",
      en: "Neighborhoods and Areas of Encarnación: Safety & Prices",
      pt: "Zonas e Bairros de Encarnação: Segurança e Preços"
    },
    q1Title: {
      es: "¿Por qué destaca Encarnación como destino residencial?",
      en: "Why does Encarnación stand out as a residential destination?",
      pt: "Por que Encarnación se destaca como destino residencial?"
    },
    q1Text: {
      es: "Encarnación ofrece la mejor calidad de vida y seguridad ciudadana en Paraguay. Con su costanera impecable de 25 km, playas de río seguras y un entorno sumamente ordenado, es ideal para familias y retirados.",
      en: "Encarnación offers the best quality of life and public safety in Paraguay. With its spotless 25 km waterfront boardwalk, safe river beaches, and highly organized environment, it is ideal for families and retirees.",
      pt: "Encarnação oferece a melhor qualidade de vida e segurança pública do Paraguai. Com sua costanera impecável de 25 km, praias fluviais seguras e ambiente organizado, é ideal para famílias e aposentados."
    },
    q2Title: {
      es: "¿Cuáles son las zonas residenciales recomendadas?",
      en: "Which are the recommended residential areas?",
      pt: "Quais são as áreas residenciais recomendadas?"
    },
    q2Text: {
      es: "La Costanera y Playa San José son las áreas más exclusivas y cotizadas. El casco urbano central ofrece departamentos modernos estables a costos accesibles. Para retiro rural de primer nivel, Capitán Miranda (adyacente) ofrece un microclima templado muy arbolado.",
      en: "The Costanera and Playa San José are the most exclusive and sought-after areas. The central urban core offers stable modern apartments at affordable rates. For premium rural retirement, adjacent Capitán Miranda provides a tree-lined mild microclimate.",
      pt: "A Costanera e a Praia San José são as áreas mais exclusivas e valorizadas. O centro urbano oferece apartamentos modernos e estáveis a custos acessíveis. Para aposentadoria de alto padrão, a vizinha Capitão Miranda oferece um clima ameno e arborizado."
    },
    safetyAlertText: {
      es: "Encarnación es catalogada sistemáticamente como la urbe más segura y ordenada del país, ideal para disfrutar de la vida de puertas abiertas y actividades al aire libre con total tranquilidad:",
      en: "Encarnación is consistently rated as the safest and most organized city in the country, perfect for enjoying an open-doors lifestyle and outdoor activities with peace of mind:",
      pt: "Encarnação é constantemente classificada como a cidade mais segura e organizada do país, ideal para desfrutar da vida de portas abertas e atividades ao ar livre com total tranquilidade:"
    },
    safetyRedZoneText: {
      es: "No se reportan zonas de exclusión urbana ni barrios de peligro criminal violento. Se aconseja adoptar precauciones de seguridad corrientes al caminar de noche por calles periféricas poco iluminadas.",
      en: "There are no reported urban exclusion zones or high-risk violent crime neighborhoods. Standard common sense precautions are recommended when walking at night in poorly lit peripheral streets.",
      pt: "Não há registros de áreas de exclusão urbana ou bairros de alta criminalidade violenta. Recomenda-se adotar precauções comuns de segurança ao caminhar à noite por ruas periféricas pouco iluminadas."
    },
    safetyModZoneText: {
      es: "Precaución en los accesos y adyacencias del Puente Internacional San Roque González de Santa Cruz debido a la alta congestión y demoras vehiculares frecuentes para cruzar hacia Posadas (Argentina).",
      en: "Caution at the access points of the San Roque González International Bridge due to heavy traffic congestion and frequent long delays to cross into Posadas (Argentina).",
      pt: "Precaução nos acessos da Ponte Internacional San Roque González de Santa Cruz devido ao grande congestionamento e atrasos frequentes para cruzar em direção a Posadas (Argentina)."
    },
    raudalesDesc: {
      es: "Encarnación no registra corrientes de agua peligrosas (raudales) capaces de arrastrar vehículos, contando con una planificación urbana con desagües pluviales funcionales. Alertas generales:",
      en: "Encarnación does not experience dangerous flash floods (raudales) capable of sweeping cars, having functional storm drainage systems. General alerts:",
      pt: "Encarnação não registra enxurradas perigosas (raudales) capazes de arrastar veículos, possuindo drenagem pluvial funcional. Alertas gerais:"
    },
    raudalesPoints: {
      es: "Precaución por calzada resbaladiza en pendientes empinadas hacia la costanera y acumulación temporal de agua de lluvia en la rotonda de la Ruta PY01 durante tormentas intensas.",
      en: "Caution due to slippery pavement on steep slopes leading to the costanera and temporary rainwater accumulation on the Route PY01 roundabout during severe storms.",
      pt: "Cuidado com a pista escorregadia nas descidas íngremes em direção à costanera e acúmulo temporário de água na rotatória da Rodovia PY01 em fortes tempestades."
    }
  },
  nacional: {
    title: {
      es: "Seguridad y Riesgo por Municipios de Paraguay (Nivel Nacional)",
      en: "Safety and Geopolitical Risk by Paraguay Municipalities (National Level)",
      pt: "Segurança e Risco por Municípios do Paraguai (Nível Nacional)"
    },
    q1Title: {
      es: "¿Cuáles son las zonas residenciales más seguras de Paraguay?",
      en: "Which are the safest residential areas in Paraguay?",
      pt: "Quais são as áreas residenciais mais seguras do Paraguai?"
    },
    q1Text: {
      es: "Los departamentos del centro-sur como Misiones (San Juan Bautista), Ñeembucú (Pilar) y Cordillera (Altos, Atyrá) registran históricamente los menores índices de criminalidad del país, ideales para retiros tranquilos y familias. Asimismo, en el Chaco Central destacan las colonias menonitas (Filadelfia y Loma Plata) por su excelente autogestión de seguridad.",
      en: "Central-southern departments such as Misiones (San Juan Bautista), Ñeembucú (Pilar), and Cordillera (Altos, Atyrá) historically register the lowest crime rates in the country, ideal for peaceful retirement and families. In the Central Chaco, Mennonite colonies (Filadelfia and Loma Plata) stand out for excellent self-managed security.",
      pt: "Os estados do centro-sul como Misiones (San Juan Bautista), Ñeembucú (Pilar) e Cordillera (Altos, Atyrá) registram historicamente as menores taxas de criminalidade do país, ideais para aposentadoria tranquila e famílias. No Chaco Central, destacam-se as colônias menonitas (Filadelfia e Loma Plata) pela sua excelente autogestão de segurança."
    },
    q2Title: {
      es: "¿Qué variables determinan el Índice de Amenaza Geopolítica (IAG)?",
      en: "What variables determine the Geopolitical Threat Index (IAG)?",
      pt: "Quais variáveis determinam o Índice de Ameaça Geopolítica (IAG)?"
    },
    q2Text: {
      es: "El IAG pondera la delincuencia común (Cc), la logística del crimen organizado transnacional (Co) en zonas de frontera, la vulnerabilidad socioeconómica regional (Vs) y la presencia/eficacia institucional policial (Ep). Este índice clasifica a los 262 municipios en categorías de riesgo visualizables en el mapa.",
      en: "The IAG weights common crime (Cc), transnational organized crime logistics (Co) in border zones, regional socioeconomic vulnerability (Vs), and police institutional presence/effectiveness (Ep). This index classifies all 262 municipalities into risk categories shown on the map.",
      pt: "O IAG pondera a criminalidade comum (Cc), a logística do crime organizado transnacional (Co) em áreas de fronteira, a vulnerabilidade socioeconômica regional (Vs) e a presença/eficácia institucional da polícia (Ep). Esse índice classifica os 262 municípios em categorias de risco visíveis no mapa."
    },
    safetyAlertText: {
      es: "El análisis cartográfico nacional de 2026 identifica zonas críticas de tránsito de mercancías ilícitas y criminalidad común. Ten en cuenta las siguientes advertencias principales:",
      en: "The 2026 national cartographic analysis identifies critical zones of illicit transit and common crime. Keep in mind the following main warnings:",
      pt: "A análise cartográfica nacional de 2026 identifica zonas críticas de trânsito de mercadorias ilícitas e criminalidade comum. Tenha em mente os seguintes avisos principais:"
    },
    safetyRedZoneText: {
      es: "Zonas Rojas Nacionales (Evitar): Fronteras permeables en Amambay (Capitán Bado, Pedro Juan Caballero), Canindeyú (Ypejhú, Curuguaty) y el norte de Concepción (Arroyito, Paso Barreto) debido a rutas activas de narcotráfico. Evita desplazamientos nocturnos en rutas vecinales e interdepartamentales en estas áreas. Igualmente, evitar enclaves informales de contrabando fluvial en Ciudad del Este (San Rafael, Remansito).",
      en: "National Red Zones (Avoid): Permeable border areas in Amambay (Capitán Bado, Pedro Juan Caballero), Canindeyú (Ypejhú, Curuguaty), and northern Concepción (Arroyito, Paso Barreto) due to drug trafficking routes. Avoid night travel on secondary and inter-departmental roads in these areas. Also, avoid river smuggling enclaves in Ciudad del Este (San Rafael, Remansito).",
      pt: "Zonas Vermelhas Nacionais (Evitar): Fronteiras no Amambay (Capitán Bado, Pedro Juan Caballero), Canindeyú (Ypejhú, Curuguaty) e norte de Concepción (Arroyito, Paso Barreto) devido a rotas ativas de narcotráfico. Evite viagens noturnas em rodovias vicinais nessas áreas. Do mesmo modo, evite áreas informais de contrabando em Ciudad del Este (San Rafael, Remansito)."
    },
    safetyModZoneText: {
      es: "Zonas de Precaución (Amarillo): Centros comerciales urbanos de Asunción, Luque, Lambaré, San Lorenzo y Ciudad del Este en horario nocturno por arrebatos cometidos por motochorros. En la Región Occidental (Chaco), se aconseja atención especial en los distritos cercanos a la Transchaco por abigeato y tránsito de logística informal.",
      en: "Caution Zones (Yellow): Urban commercial centers of Asunción, Luque, Lambaré, San Lorenzo, and Ciudad del Este at night due to opportunistic muggings by motorcycle thieves. In the Western Region (Chaco), special attention is advised near the Transchaco highway due to cattle rustling and informal transport corridors.",
      pt: "Zonas de Cuidado (Amarelo): Centros comerciais urbanos de Assunção, Luque, Lambaré, San Lorenzo e Ciudad del Este à noite por assaltos de motoqueiros. Na Região Ocidental (Chaco), aconselha-se atenção especial nos distritos próximos à Transchaco devido ao roubo de gado."
    },
    raudalesDesc: {
      es: "A nivel nacional, los riesgos físicos están determinados por inundaciones y desbordes de los ríos Paraguay y Paraná en áreas bajas desprovistas de defensas costeras funcionales. Durante tormentas severas, la falta de alcantarillado genera raudales torrentosos en áreas urbanas de Central y Asunción. Puntos críticos:",
      en: "Nationally, physical risks are driven by river flooding and overflows of the Paraguay and Paraná rivers in low-lying areas lacking functional sea walls. During severe storms, the lack of drainage creates strong flash floods in Central and Asunción. Critical points:",
      pt: "A nível nacional, os riscos físicos são determinados por enchentes e desbordes dos rios Paraguai e Paraná em áreas baixas sem defesas costeiras funcionais. Durante tempestades, a falta de bueiros gera enxurradas fortes nas áreas urbanas de Central e Assunção. Pontos críticos:"
    },
    raudalesPoints: {
      es: "Bañados y Chacarita en Asunción, riberas bajas de Pilar (Ñeembucú) y Ayolas (Misiones) por desbordes pluviales/fluviales; cruces vehiculares de avenidas empinadas en todo el Departamento Central.",
      en: "Bañados and Chacarita in Asunción, low-lying riverbanks in Pilar (Ñeembucú) and Ayolas (Misiones) due to river overflows; steep vehicle intersections in the entire Central Department.",
      pt: "Bañados e Chacarita em Assunção, margens baixas de Pilar (Ñeembucú) e Ayolas (Misiones) por enchentes; cruzamentos íngremes em todo o estado Central."
    }
  }
};

export default function BarriosClientPage({ locale }) {
  const t = useTranslations();
  const [currentCity, setCurrentCity] = useState('asuncion');

  const breadcrumbs = [
    { label: t("Navigation.live") || "Vivir", url: `/${locale}/vivir` },
    { label: t("Navigation.neighborhoods") || "Barrios de Paraguay", url: `/${locale}/vivir/barrios` }
  ];

  const cityData = CITY_DETAILS[currentCity] || CITY_DETAILS.asuncion;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 select-none space-y-8">
      <Breadcrumb items={breadcrumbs} locale={locale} />

      {/* Header text */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-3xl font-extrabold text-slate-900 font-display">
            {cityData.title[locale] || cityData.title.es}
          </h1>
          <UpdatedBadge />
        </div>
        <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
          {t("Barrios.subtitle") || "Analizamos de forma exhaustiva los principales barrios residenciales de Paraguay. Selecciona una ciudad en el mapa para explorar delimitaciones, costos de alquiler, índices de seguridad, pros y contras, alertas pluviales y zonas de exclusión."}
        </p>
      </div>

      {/* Map wrapper */}
      <section>
        <NeighborhoodMap locale={locale} currentCity={currentCity} setCurrentCity={setCurrentCity} />
      </section>

      {/* Additional details (Dynamic) */}
      <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4 animate-fadeIn">
        <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
          <span>{t("Barrios.recsTitle") || "Resumen de Recomendaciones"}</span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 uppercase tracking-wider">
            {currentCity === 'ciudad-del-este' ? 'CDE' : currentCity === 'san-bernardino' ? 'Sanber' : currentCity === 'encarnacion' ? 'Encarnación' : currentCity === 'asuncion' ? 'Asunción' : currentCity === 'luque' ? 'Luque' : currentCity === 'nacional' ? (locale === 'en' ? 'National' : locale === 'pt' ? 'Nacional' : 'Nacional') : currentCity}
          </span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900">
              {cityData.q1Title[locale] || cityData.q1Title.es}
            </h4>
            <p>
              {cityData.q1Text[locale] || cityData.q1Text.es}
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900">
              {cityData.q2Title[locale] || cityData.q2Title.es}
            </h4>
            <p>
              {cityData.q2Text[locale] || cityData.q2Text.es}
            </p>
          </div>
        </div>
      </section>

      {/* Safety Alerts and Red Zones */}
      <section className="bg-red-50/50 p-6 rounded-2xl border border-red-100 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <ShieldAlert className="w-6 h-6 text-red-600 animate-pulse" />
          <h3 className="font-extrabold text-red-950 text-lg">
            {t("Barrios.safetyAlertTitle") || "Geografía de la Seguridad y Zonas de Exclusión"}
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-red-900 leading-relaxed max-w-4xl">
          {cityData.safetyAlertText[locale] || cityData.safetyAlertText.es}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-xl border border-red-100/60 shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-red-700 font-bold text-sm">
              <AlertOctagon className="w-4 h-4" />
              <span>{t("Barrios.safetyRedZoneTitle") || "Zonas de Alto Riesgo (Evitar estrictamente):"}</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {cityData.safetyRedZoneText[locale] || cityData.safetyRedZoneText.es}
            </p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-amber-100/60 shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
              <AlertTriangle className="w-4 h-4" />
              <span>{t("Barrios.safetyModZoneTitle") || "Zonas de Riesgo Moderado (Precaución nocturna):"}</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {cityData.safetyModZoneText[locale] || cityData.safetyModZoneText.es}
            </p>
          </div>
        </div>
        {/* Call to action for the district security portal */}
        <div className="pt-5 mt-5 border-t border-red-200/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-extrabold text-red-950 text-sm">
              {locale === 'en' ? "Access the National Safety and Geopolitical Risk Portal" : locale === 'pt' ? "Acesse o Portal de Segurança Nacional e Risco Geopolítico" : "Accede al Portal de Seguridad Nacional y Riesgo Geopolítico"}
            </h4>
            <p className="text-xs text-red-800">
              {locale === 'en' ? "Full coverage of 262 municipalities across all 17 departments with the Threat Index (IAG)." : locale === 'pt' ? "Cobertura completa dos 262 municípios nos 17 estados com o Índice de Ameaça (IAG)." : "Cobertura completa de 262 municipios en los 17 departamentos con el Índice de Amenaza (IAG)."}
            </p>
          </div>
          <a
            href={`/${locale}/vivir/seguridad`}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-sm transition shrink-0"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{locale === 'en' ? "View Safety Portal" : locale === 'pt' ? "Ver Portal de Segurança" : "Ver Portal de Seguridad"}</span>
          </a>
        </div>
      </section>

      {/* Raudales Risk Section */}
      <section className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <Waves className="w-6 h-6 text-blue-600 animate-pulse" />
          <h3 className="font-extrabold text-blue-950 text-lg">
            {currentCity === 'san-bernardino' 
              ? (locale === 'en' ? "Environmental Risks: Lake Ypacaraí" : locale === 'pt' ? "Riscos Ambientais: Lago Ypacaraí" : "Peligro Ambiental: Lago Ypacaraí")
              : (t("Barrios.raudalesTitle") || "Peligro Físico Pluvial: Los Raudales")}
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-blue-900 leading-relaxed max-w-4xl">
          {cityData.raudalesDesc[locale] || cityData.raudalesDesc.es}
        </p>
        
        <div className="bg-white rounded-xl shadow-sm border border-blue-100/60 overflow-hidden">
          <div className="overflow-x-auto text-xs sm:text-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-blue-50 border-b border-blue-100 text-blue-900 font-bold uppercase text-[10px] tracking-wider">
                  <th className="px-6 py-3 w-1/4">
                    {currentCity === 'san-bernardino' 
                      ? (locale === 'en' ? "Environmental Warning" : locale === 'pt' ? "Alerta Ambiental" : "Advertencia Ambiental")
                      : (t("Barrios.compareHeaderCity") || "Municipio / Ciudad")}
                  </th>
                  <th className="px-6 py-3">
                    {currentCity === 'san-bernardino'
                      ? (locale === 'en' ? "Critical Details" : locale === 'pt' ? "Detalhes Críticos" : "Detalles Críticos")
                      : (t("Barrios.raudalesHeaderPoints") || "Puntos Críticos")}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                <tr className="hover:bg-slate-50/50 transition animate-fadeIn">
                  <td className="px-6 py-4 font-bold text-slate-800 capitalize">
                    {currentCity === 'ciudad-del-este' ? 'Ciudad del Este' : currentCity === 'san-bernardino' ? 'San Bernardino' : currentCity === 'encarnacion' ? 'Encarnación' : currentCity === 'asuncion' ? 'Asunción' : currentCity === 'luque' ? 'Luque' : currentCity === 'nacional' ? (locale === 'en' ? 'National Warning' : locale === 'pt' ? 'Alerta Nacional' : 'Alerta Nacional') : currentCity}
                  </td>
                  <td className="px-6 py-4 leading-relaxed font-semibold text-slate-700">
                    {cityData.raudalesPoints[locale] || cityData.raudalesPoints.es}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
