import securityData from '../../../data/security.json';

const DEPT_CENTERS = {
  "distrito-capital": [-57.635, -25.285],
  "concepcion": [-57.434, -23.407],
  "san-pedro": [-57.076, -24.089],
  "cordillera": [-57.142, -25.386],
  "guaira": [-56.446, -25.749],
  "caaguazu": [-56.440, -25.446],
  "caazapa": [-56.368, -26.196],
  "itapua": [-55.867, -27.331],
  "misiones": [-57.144, -26.635],
  "paraguari": [-57.150, -25.621],
  "alto-parana": [-54.611, -25.510],
  "central": [-57.433, -25.350],
  "neembucu": [-58.292, -26.867],
  "amambay": [-55.733, -22.567],
  "canindeyu": [-54.306, -24.063],
  "presidente-hayes": [-57.524, -25.093],
  "boqueron": [-60.032, -22.350],
  "alto-paraguay": [-57.873, -21.039]
};

const PREDEFINED_DISTRICTS = {
  "concepción": [-57.434, -23.407],
  "horqueta": [-57.072, -23.344],
  "yby yaú": [-56.533, -23.017],
  "belén": [-57.256, -23.467],
  "san lázaro": [-57.900, -22.100],
  "loreto": [-57.274, -23.268],
  "san pedro de ycuamandiyú": [-57.076, -24.089],
  "san estanislao": [-56.440, -24.660],
  "santa rosa del aguaray": [-56.517, -23.883],
  "capiibary": [-56.117, -24.800],
  "choré": [-56.600, -24.183],
  "antequera": [-57.108, -24.133],
  "villa del rosario": [-57.031, -24.444],
  "itacurubí del rosario": [-56.683, -24.498],
  "nueva germania": [-56.567, -23.900],
  "caacupé": [-57.142, -25.386],
  "san bernardino": [-57.296, -25.311],
  "altos": [-57.250, -25.264],
  "tobatí": [-57.067, -25.267],
  "eusebio ayala": [-56.967, -25.383],
  "piribebuy": [-57.050, -25.483],
  "itacurubí de la cordillera": [-56.867, -25.450],
  "atyrá": [-57.167, -25.350],
  "caraguatay": [-56.817, -25.233],
  "emboscada": [-57.350, -25.150],
  "villarrica": [-56.446, -25.749],
  "independencia": [-56.267, -25.683],
  "paso yobai": [-55.983, -25.717],
  "coronel oviedo": [-56.440, -25.446],
  "caaguazú": [-56.014, -25.462],
  "j. eulogio estigarribia": [-55.833, -25.350],
  "san josé de los arroyos": [-56.750, -25.450],
  "caazapá": [-56.368, -26.196],
  "san juan nepomuceno": [-55.900, -26.100],
  "yuty": [-56.250, -26.617],
  "encarnación": [-55.867, -27.331],
  "bella vista": [-55.567, -27.033],
  "hohenau": [-55.650, -27.083],
  "obligado": [-55.617, -27.050],
  "carmen del paraná": [-56.150, -27.217],
  "coronel bogado": [-56.233, -27.167],
  "san cosme y damián": [-56.333, -27.317],
  "tomás romero pereira": [-55.250, -26.533],
  "cambyretá": [-55.817, -27.317],
  "capitán miranda": [-55.800, -27.200],
  "trinidad": [-55.700, -27.133],
  "san juan bautista": [-57.144, -26.635],
  "san ignacio guazú": [-57.152, -26.886],
  "ayolas": [-56.840, -27.400],
  "villa florida": [-57.133, -26.400],
  "santa rosa": [-56.817, -26.867],
  "san miguel": [-57.050, -26.500],
  "santiago": [-56.767, -26.983],
  "paraguarí": [-57.150, -25.621],
  "carapeguá": [-57.233, -25.767],
  "yaguarón": [-57.283, -25.567],
  "ybycuí": [-57.050, -26.017],
  "caapucú": [-57.200, -26.233],
  "quiindy": [-57.250, -25.967],
  "la colmena": [-56.817, -25.883],
  "ciudad del este": [-54.611, -25.510],
  "hernandarias": [-54.633, -25.400],
  "presidente franco": [-54.617, -25.567],
  "minga guazú": [-54.750, -25.533],
  "santa rita": [-55.067, -25.783],
  "naranjal": [-55.183, -25.967],
  "yguazú": [-55.000, -25.467],
  "san alberto": [-54.900, -24.983],
  "areguá": [-57.385, -25.313],
  "luque": [-57.485, -25.265],
  "san lorenzo": [-57.508, -25.339],
  "lambaré": [-57.620, -25.334],
  "fernando de la mora": [-57.550, -25.317],
  "capiatá": [-57.433, -25.350],
  "limpio": [-57.483, -25.183],
  "mariano roque alonso": [-57.533, -25.217],
  "ñemby": [-57.533, -25.400],
  "villa elisa": [-57.583, -25.383],
  "itauguá": [-57.333, -25.383],
  "itá": [-57.367, -25.483],
  "ypacaraí": [-57.283, -25.400],
  "villeta": [-57.567, -25.467],
  "san antonio": [-57.550, -25.417],
  "guarambaré": [-57.467, -25.483],
  "ypané": [-57.533, -25.450],
  "pilar": [-58.292, -26.867],
  "alberdi": [-58.133, -26.183],
  "humaitá": [-58.500, -27.050],
  "cerrito": [-57.900, -27.317],
  "laureles": [-57.900, -27.150],
  "pedro juan caballero": [-55.733, -22.567],
  "capitán bado": [-55.533, -23.250],
  "bella vista norte": [-56.517, -22.133],
  "zanja pytá": [-55.850, -22.650],
  "salto del guairá": [-54.306, -24.063],
  "curuguaty": [-55.683, -24.467],
  "katueté": [-54.750, -24.250],
  "la paloma": [-54.617, -24.117],
  "nueva esperanza": [-54.683, -24.433],
  "ypejhú": [-55.450, -23.900],
  "villa hayes": [-57.524, -25.093],
  "benjamín aceval": [-57.550, -24.967],
  "josé falcón": [-57.717, -25.250],
  "nanawa": [-57.700, -25.250],
  "puerto pinasco": [-57.850, -22.683],
  "general josé maría bruguez": [-58.833, -24.750],
  "filadelfia": [-60.032, -22.350],
  "loma plata": [-59.833, -22.383],
  "mariscal josé félix estigarribia": [-60.633, -22.033],
  "fuerte olimpo": [-57.873, -21.039],
  "bahía negra": [-58.167, -20.233],
  "carmelo peralta": [-57.900, -21.683],
  "puerto casado": [-57.933, -22.283]
};

const staticFeatures = {
  type: "FeatureCollection",
  features: [
    // === ASUNCIÓN & GRAN ASUNCIÓN ===
    {
      type: "Feature",
      properties: {
        id: "villa-morra",
        city: "asuncion",
        name: "Villa Morra",
        center: [-57.588, -25.295],
        safety: "seguro",
        safetyText_es: "Muy Seguro (Seguridad privada y comercial)",
        safetyText_en: "Very Safe (Private and commercial security)",
        safetyText_pt: "Muito Seguro (Segurança privada e comercial)",
        rentPrice: 1200,
        rentText_es: "$800 - $1,600 USD/mes",
        rentText_en: "$800 - $1,600 USD/month",
        rentText_pt: "$800 - $1.600 USD/mês",
        pros_es: "Bares, centros comerciales, gastronomía premium, eje de negocios",
        pros_en: "Bars, shopping centers, premium dining, business hub",
        pros_pt: "Bares, shopping centers, gastronomia premium, centro de negócios",
        cons_es: "Tráfico pesado en horas pico, costo de vida elevado",
        cons_en: "Heavy rush hour traffic, high cost of living",
        cons_pt: "Trânsito pesado nos horários de pico, alto custo de vida"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[-57.596, -25.289],[-57.579,-25.289],[-57.579,-25.3015],[-57.596,-25.3015],[-57.596,-25.289]]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "las-mercedes",
        city: "asuncion",
        name: "Las Mercedes",
        center: [-57.610, -25.280],
        safety: "seguro",
        safetyText_es: "Seguro (Zona residencial tranquila y de moda)",
        safetyText_en: "Safe (Quiet and trendy residential area)",
        safetyText_pt: "Seguro (Zona residencial tranquila e da moda)",
        rentPrice: 900,
        rentText_es: "$600 - $1,200 USD/mes",
        rentText_en: "$600 - $1,200 USD/month",
        rentText_pt: "$600 - $1.200 USD/mês",
        pros_es: "Cultura, cafés de especialidad, casonas restauradas, cercanía al centro",
        pros_en: "Culture, specialty cafes, restored historic houses, close to downtown",
        pros_pt: "Cultura, cafés de especialidade, casarões restaurados, proximidade ao centro",
        cons_es: "Calles angostas para estacionar",
        cons_en: "Narrow streets for parking",
        cons_pt: "Ruas estreitas para estacionar"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[-57.621, -25.274],[-57.601,-25.274],[-57.601,-25.286],[-57.621,-25.286],[-57.621,-25.274]]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "mburucuya",
        city: "asuncion",
        name: "Mburucuyá",
        center: [-57.557, -25.257],
        safety: "muy-seguro",
        safetyText_es: "Excelente (Muy residencial y exclusivo)",
        safetyText_en: "Excellent (Highly residential and exclusive)",
        safetyText_pt: "Excelente (Muito residencial e exclusivo)",
        rentPrice: 1500,
        rentText_es: "$1,200 - $2,200 USD/mes",
        rentText_en: "$1,200 - $2,200 USD/month",
        rentText_pt: "$1.200 - $2.200 USD/mês",
        pros_es: "Calles empedradas arboladas, tranquilidad extrema, embajadas cercanas",
        pros_en: "Tree-lined cobbled streets, extreme peace, nearby embassies",
        pros_pt: "Ruas de paralelepípedos arborizadas, tranquilidad extrema, embaixadas próximas",
        cons_es: "Comercios dispersos, dependes del vehículo",
        cons_en: "Scattered shops, car dependent",
        cons_pt: "Comércio disperso, dependência de veículo"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[-57.568, -25.25],[-57.548,-25.25],[-57.548,-25.263],[-57.568,-25.263],[-57.568,-25.25]]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "centro",
        city: "asuncion",
        name: "Centro Histórico",
        center: [-57.635, -25.287],
        safety: "precaucion",
        safetyText_es: "Precaución (Seguro de día, solitario de noche)",
        safetyText_en: "Caution (Safe by day, lonely at night)",
        safetyText_pt: "Cuidado (Seguro de dia, deserto à noite)",
        rentPrice: 500,
        rentText_es: "$350 - $700 USD/mes",
        rentText_en: "$350 - $700 USD/month",
        rentText_pt: "$350 - $700 USD/mês",
        pros_es: "Conectividad total, alquileres económicos, patrimonio histórico",
        pros_en: "Total connectivity, affordable rents, historical heritage",
        pros_pt: "Conectividade total, aluguéis econômicos, patrimônio histórico",
        cons_es: "Falta de actividad nocturna comercial, edificios descuidados",
        cons_en: "Lack of nightlife commercial activity, run-down buildings",
        cons_pt: "Falta de atividade comercial noturna, prédios descuidados"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[-57.643, -25.279],[-57.628,-25.279],[-57.628,-25.293],[-57.643,-25.293],[-57.643,-25.279]]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "manora",
        city: "asuncion",
        name: "Manora",
        center: [-57.569, -25.281],
        safety: "muy-seguro",
        safetyText_es: "Excelente (Altamente residencial y corporativo premium)",
        safetyText_en: "Excellent (Highly residential and premium corporate)",
        safetyText_pt: "Excelente (Altamente residencial e corporativo premium)",
        rentPrice: 1600,
        rentText_es: "$1,000 - $2,000 USD/mes",
        rentText_en: "$1,000 - $2,000 USD/month",
        rentText_pt: "$1.000 - $2.000 USD/mês",
        pros_es: "Cercanía a Paseo La Galería y Shopping del Sol, máxima seguridad, residencial exclusivo",
        pros_en: "Near Paseo La Galería & Shopping del Sol, maximum safety, exclusive residential",
        pros_pt: "Próximo ao Paseo La Galería e Shopping del Sol, máxima segurança, residencial exclusivo",
        cons_es: "Tránsito congestionado en accesos, precios elevados",
        cons_en: "Congested access traffic, high prices",
        cons_pt: "Trânsito congestionado nos acessos, preços elevados"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[-57.585, -25.282],[-57.573,-25.282],[-57.573,-25.29],[-57.585,-25.29],[-57.585,-25.282]]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "ycua-sati",
        city: "asuncion",
        name: "Ycua Sati",
        center: [-57.550, -25.281],
        safety: "muy-seguro",
        safetyText_es: "Excelente (Distrito financiero moderno y residencial)",
        safetyText_en: "Excellent (Modern financial and residential district)",
        safetyText_pt: "Excelente (Distrito financeiro moderno e residencial)",
        rentPrice: 1300,
        rentText_es: "$900 - $1,700 USD/mes",
        rentText_en: "$900 - $1,700 USD/month",
        rentText_pt: "$900 - $1.700 USD/mês",
        pros_es: "Eje corporativo, construcciones nuevas, calles tranquilas hacia el interior",
        pros_en: "Corporate hub, new constructions, quiet inner streets",
        pros_pt: "Centro corporativo, novas construções, ruas internas tranquilas",
        cons_es: "Ruido por obras constantes, costo de vida alto",
        cons_en: "Constant construction noise, high cost of living",
        cons_pt: "Ruído de obras constantes, alto custo de vida"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[-57.57, -25.283],[-57.548,-25.283],[-57.548,-25.296],[-57.57,-25.296],[-57.57,-25.283]]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "los-laureles",
        city: "asuncion",
        name: "Los Laureles",
        center: [-57.581, -25.308],
        safety: "seguro",
        safetyText_es: "Seguro (Zona residencial familiar y muy verde)",
        safetyText_en: "Safe (Family-friendly and very green residential area)",
        safetyText_pt: "Seguro (Zona residencial familiar e muito verde)",
        rentPrice: 800,
        rentText_es: "$550 - $1,100 USD/mes",
        rentText_en: "$550 - $1,100 USD/month",
        rentText_pt: "$550 - $1.100 USD/mês",
        pros_es: "Calles tranquilas y arboladas, ambiente familiar, buenos colegios cerca",
        pros_en: "Quiet and tree-lined streets, family atmosphere, good nearby schools",
        pros_pt: "Ruas tranquilas e arborizadas, ambiente familiar, boas escolas próximas",
        cons_es: "Conexiones viales hacia el centro congestionadas",
        cons_en: "Congested road connections to downtown",
        cons_pt: "Conexões viárias para o centro congestionadas"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[-57.568, -25.305],[-57.55,-25.305],[-57.55,-25.317],[-57.568,-25.317],[-57.568,-25.305]]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "sajonia",
        city: "asuncion",
        name: "Sajonia",
        center: [-57.655, -25.295],
        safety: "precaucion",
        safetyText_es: "Precaución (Seguro de día, calles oscuras de noche)",
        safetyText_en: "Caution (Safe by day, dark streets at night)",
        safetyText_pt: "Cuidado (Seguro de dia, ruas escuras à noite)",
        rentPrice: 600,
        rentText_es: "$400 - $800 USD/mes",
        rentText_en: "$400 - $800 USD/month",
        rentText_pt: "$400 - $800 USD/mês",
        pros_es: "Vistas al río Paraguay, Parque Carlos A. López, barrio tradicional y tranquilo",
        pros_en: "Views of Paraguay River, Carlos A. López Park, traditional and quiet neighborhood",
        pros_pt: "Vistas do rio Paraguai, Parque Carlos A. López, bairro tradicional e tranquilo",
        cons_es: "Lejos del nuevo centro corporativo, humedad alta por cercanía al río",
        cons_en: "Far from the new corporate center, high humidity due to river proximity",
        cons_pt: "Longe do novo centro corporativo, alta umidade devido à proximidade do rio"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[-57.665, -25.287],[-57.643,-25.287],[-57.643,-25.305],[-57.665,-25.305],[-57.665,-25.287]]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "trinidad",
        city: "asuncion",
        name: "Santísima Trinidad",
        center: [-57.582, -25.261],
        safety: "seguro",
        safetyText_es: "Seguro (Histórico y de rápido desarrollo vertical)",
        safetyText_en: "Safe (Historic and rapidly developing high-rise area)",
        safetyText_pt: "Seguro (Histórico e em rápido desenvolvimento vertical)",
        rentPrice: 750,
        rentText_es: "$500 - $1,000 USD/mes",
        rentText_en: "$500 - $1,000 USD/month",
        rentText_pt: "$500 - $1.000 USD/mês",
        pros_es: "Mucha vegetación, rápido acceso a la Costanera, combinación de casonas y torres nuevas",
        pros_en: "Abundant vegetation, fast access to Costanera, mix of old mansions and new towers",
        pros_pt: "Muita vegetação, rápido acesso à Costanera, mistura de casarões e novas torres",
        cons_es: "Servicios de transporte público deficientes en algunas zonas",
        cons_en: "Deficient public transport services in some areas",
        cons_pt: "Serviços de transporte público deficientes em algumas áreas"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[-57.585, -25.248],[-57.56,-25.248],[-57.56,-25.265],[-57.585,-25.265],[-57.585,-25.248]]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "chacarita",
        city: "asuncion",
        name: "La Chacarita & Pelopincho",
        center: [-57.625, -25.280],
        safety: "evitar",
        safetyText_es: "Evitar estrictamente / Zona Roja (Foco criminal violento)",
        safetyText_en: "Strictly avoid / Red Zone (Violent crime hotspot)",
        safetyText_pt: "Evitar estritamente / Zona Vermelha (Foco violento de crimes)",
        rentPrice: 150,
        rentText_es: "$100 - $250 USD/mes",
        rentText_en: "$100 - $250 USD/month",
        rentText_pt: "$100 - $250 USD/mês",
        pros_es: "Cercanía al microcentro histórico, costos de alquiler mínimos",
        pros_en: "Near historic downtown, minimal rental costs",
        pros_pt: "Próximo ao centro histórico, aluguéis mínimos",
        cons_es: "Elevadísimo índice de asaltos a mano armada y robos. Falta de patrullaje.",
        cons_en: "Extremely high rate of armed robberies. Lack of police patrols.",
        cons_pt: "Altíssima taxa de assaltos à mão armada. Falta de policiamento."
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[-57.632, -25.276],[-57.618,-25.276],[-57.618,-25.285],[-57.632,-25.285],[-57.632,-25.276]]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "banado-sur",
        city: "asuncion",
        name: "Bañado Sur & Cateura",
        center: [-57.650, -25.325],
        safety: "evitar",
        safetyText_es: "Evitar estrictamente / Zona Roja (Alta marginalidad y basural)",
        safetyText_en: "Strictly avoid / Red Zone (High marginalization and landfill)",
        safetyText_pt: "Evitar estritamente / Zona Vermelha (Alta marginalidade e lixão)",
        rentPrice: 120,
        rentText_es: "$80 - $200 USD/mes",
        rentText_en: "$80 - $200 USD/month",
        rentText_pt: "$80 - $200 USD/mês",
        pros_es: "Costo de vida muy bajo",
        pros_en: "Very low cost of living",
        pros_pt: "Custo de vida muito baixo",
        cons_es: "Asentamientos inundables por el río, nula seguridad y focos de delincuencia organizada",
        cons_en: "Flood-prone riverside slums, zero safety and organized crime rings",
        cons_pt: "Favelas inundáveis pelo rio, segurança nula e crime organizado"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[-57.634029, -25.325],[-57.638057,-25.321522],[-57.641161,-25.319067],[-57.643692,-25.316259],[-57.646983,-25.311312],[-57.653551,-25.308887],[-57.659202,-25.312249],[-57.661767,-25.317101],[-57.660961,-25.321808],[-57.660231,-25.325],[-57.662476,-25.328633],[-57.663039,-25.333753],[-57.659218,-25.337773],[-57.65292,-25.338248],[-57.647632,-25.335745],[-57.64278,-25.335005],[-57.637757,-25.333219],[-57.63452,-25.329507],[-57.634029,-25.325]]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "mundo-aparte",
        city: "asuncion",
        name: "Mundo Aparte (Bº B. Caballero)",
        center: [-57.608, -25.298],
        safety: "evitar",
        safetyText_es: "Evitar estrictamente / Zona Roja (Tráfico de drogas)",
        safetyText_en: "Strictly avoid / Red Zone (Drug trafficking hub)",
        safetyText_pt: "Evitar estritamente / Zona Vermelha (Tráfico de drogas)",
        rentPrice: 180,
        rentText_es: "$120 - $250 USD/mes",
        rentText_en: "$120 - $250 USD/month",
        rentText_pt: "$120 - $250 USD/mês",
        pros_es: "Precios de alquiler muy baratos",
        pros_en: "Very cheap rental prices",
        pros_pt: "Aluguéis muito baratos",
        cons_es: "Presencia constante de pandillas y venta de estupefacientes en la vía pública",
        cons_en: "Constant gang presence and street-level drug sales",
        cons_pt: "Presença constante de gangues e venda de drogas na via pública"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[-57.592285, -25.298],[-57.596641,-25.294692],[-57.600616,-25.293043],[-57.601716,-25.289292],[-57.605041,-25.284575],[-57.611605,-25.281644],[-57.617521,-25.284807],[-57.620317,-25.289732],[-57.619488,-25.294655],[-57.619343,-25.298],[-57.621149,-25.301829],[-57.620564,-25.306434],[-57.615966,-25.309039],[-57.610581,-25.30971],[-57.605572,-25.309017],[-57.600617,-25.30823],[-57.594939,-25.306768],[-57.591356,-25.302846],[-57.592285,-25.298]]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "pettirossi",
        city: "asuncion",
        name: "Pettirossi & Mercado 4",
        center: [-57.620, -25.300],
        safety: "precaucion",
        safetyText_es: "Precaución (Muy comercial de día, desierto de noche)",
        safetyText_en: "Caution (Highly commercial by day, empty at night)",
        safetyText_pt: "Cuidado (Muito comercial de dia, deserto à noite)",
        rentPrice: 400,
        rentText_es: "$300 - $550 USD/mes",
        rentText_en: "$300 - $550 USD/month",
        rentText_pt: "$300 - $550 USD/mês",
        pros_es: "Abastos baratos, transporte público hacia todas las ciudades, comercios masivos",
        pros_en: "Cheap supplies, public transport to all cities, massive commerce",
        pros_pt: "Alimentos baratos, transporte para todas as cidades, comércio massivo",
        cons_es: "Polución sonora y de residuos, alta aglomeración de carteristas y motochorros",
        cons_en: "Noise and trash pollution, dense pickpockets and motorcycle thieves",
        cons_pt: "Poluição sonora e de lixo, batedores de carteira e motoqueiros ladrões"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[-57.605491, -25.3],[-57.603801,-25.295283],[-57.607685,-25.291733],[-57.613305,-25.290723],[-57.617673,-25.28944],[-57.622805,-25.287274],[-57.629209,-25.28724],[-57.634381,-25.290346],[-57.634962,-25.295643],[-57.630651,-25.3],[-57.629986,-25.302908],[-57.629303,-25.306245],[-57.628755,-25.312131],[-57.623535,-25.316036],[-57.616761,-25.314696],[-57.612982,-25.309724],[-57.610888,-25.306116],[-57.609128,-25.303166],[-57.605491,-25.3]]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "terminal-asuncion",
        city: "asuncion",
        name: "Zonas de la Terminal",
        center: [-57.595, -25.325],
        safety: "precaucion",
        safetyText_es: "Precaución de noche (Zonas de tránsito y paradas)",
        safetyText_en: "Caution at night (Transit and bus stop areas)",
        safetyText_pt: "Cuidado à noite (Áreas de trânsito e rodoviária)",
        rentPrice: 450,
        rentText_es: "$300 - $600 USD/mes",
        rentText_en: "$300 - $600 USD/month",
        rentText_pt: "$300 - $600 USD/mês",
        pros_es: "Acceso inmediato a transporte interurbano e internacional, alquileres económicos",
        pros_en: "Immediate access to intercity and international buses, budget rents",
        pros_pt: "Acesso imediato a transporte intermunicipal e internacional, aluguéis baratos",
        cons_es: "Arrebatos por descuidos y asaltos rápidos nocturnos en calles aledañas",
        cons_en: "Opportunistic bagsnatching and quick night robberies on side streets",
        cons_pt: "Furtos por descuidos e assaltos noturnos rápidos nas ruas próximas"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[-57.578226, -25.325],[-57.577933,-25.32003],[-57.582985,-25.316934],[-57.589275,-25.317067],[-57.593146,-25.316586],[-57.597167,-25.315169],[-57.603498,-25.313224],[-57.610219,-25.314784],[-57.61364,-25.319573],[-57.61033,-25.325],[-57.6062,-25.328261],[-57.604026,-25.331059],[-57.601993,-25.334689],[-57.597705,-25.337275],[-57.592152,-25.337922],[-57.587359,-25.335587],[-57.584306,-25.332179],[-57.581135,-25.329037],[-57.578226,-25.325]]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "general-diaz",
        city: "asuncion",
        name: "General Díaz & Ciudad Nueva",
        center: [-57.615, -25.292],
        safety: "seguro",
        safetyText_es: "Seguro (Residencial familiar de clase media consolidada)",
        safetyText_en: "Safe (Established middle-class family residential)",
        safetyText_pt: "Seguro (Residencial familiar de classe média consolidada)",
        rentPrice: 700,
        rentText_es: "$500 - $900 USD/mes",
        rentText_en: "$500 - $900 USD/month",
        rentText_pt: "$500 - $900 USD/mês",
        pros_es: "Calles tranquilas de día, colegios y clínicas de nivel, alquileres equilibrados",
        pros_en: "Quiet daytime streets, reputable schools and clinics, balanced rents",
        pros_pt: "Ruas tranquilas de dia, boas escolas e clínicas, aluguéis equilibrados",
        cons_es: "Tráfico vehicular de entrada y escasez de estacionamiento",
        cons_en: "Incoming commuter traffic and parking scarcity",
        cons_pt: "Trânsito de entrada de veículos e falta de vagas"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[-57.597825, -25.292],[-57.603266,-25.288583],[-57.60641,-25.286234],[-57.608058,-25.282381],[-57.612389,-25.280154],[-57.617804,-25.27928],[-57.622817,-25.281168],[-57.625347,-25.285054],[-57.627779,-25.288279],[-57.63243,-25.292],[-57.633157,-25.297287],[-57.627571,-25.300438],[-57.621621,-25.301175],[-57.616863,-25.300454],[-57.613001,-25.301069],[-57.60767,-25.302157],[-57.600719,-25.301586],[-57.595588,-25.297652],[-57.597825,-25.292]]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "carmelitas",
        city: "asuncion",
        name: "Carmelitas & Las Lomas",
        center: [-57.565, -25.275],
        safety: "muy-seguro",
        safetyText_es: "Excelente (Zona residencial y diplomática exclusiva)",
        safetyText_en: "Excellent (Exclusive residential and diplomatic zone)",
        safetyText_pt: "Excelente (Zona residencial e diplomática de prestígio)",
        rentPrice: 1700,
        rentText_es: "$1,200 - $2,500 USD/mes",
        rentText_en: "$1,200 - $2,500 USD/month",
        rentText_pt: "$1.200 - $2.500 USD/mês",
        pros_es: "Grandes casonas, seguridad privada activa, abundantes árboles, máxima calma",
        pros_en: "Large mansions, active private security, tree-covered streets, maximum quietness",
        pros_pt: "Casarões de luxo, segurança privada ativa, ruas arborizadas, calmaria total",
        cons_es: "Costo de vida premium, alquileres muy costosos en USD",
        cons_en: "Premium cost of living, very expensive rents in USD",
        cons_pt: "Custo de vida de alto padrão, aluguéis caros em dólares"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[-57.546873, -25.275],[-57.551781,-25.271151],[-57.557509,-25.269972],[-57.560087,-25.268192],[-57.562508,-25.263693],[-57.568027,-25.261266],[-57.574662,-25.261612],[-57.578096,-25.266209],[-57.577357,-25.271402],[-57.57922,-25.275],[-57.579125,-25.279113],[-57.577861,-25.283633],[-57.572655,-25.285607],[-57.56731,-25.285479],[-57.563028,-25.283945],[-57.558678,-25.28376],[-57.551401,-25.284129],[-57.546424,-25.280409],[-57.546873,-25.275]]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "recoleta",
        city: "asuncion",
        name: "Recoleta",
        center: [-57.585, -25.298],
        safety: "muy-seguro",
        safetyText_es: "Excelente (Residencial de ingresos altos)",
        safetyText_en: "Excellent (High-income residential area)",
        safetyText_pt: "Excelente (Área residencial de alta renda)",
        rentPrice: 1100,
        rentText_es: "$850 - $1,500 USD/mes",
        rentText_en: "$850 - $1,500 USD/month",
        rentText_pt: "$850 - $1.500 USD/mês",
        pros_es: "Conectividad total hacia el WTC, centros médicos premium, tranquilidad",
        pros_en: "Total connectivity to WTC, premium medical centers, peace",
        pros_pt: "Conectividade completa com o WTC, hospitais de luxo, tranquilidade",
        cons_es: "Eje comercial con calles saturadas en horarios laborales",
        cons_en: "Commercial core with saturated streets during business hours",
        cons_pt: "Centro comercial com ruas congestionadas no horário de expediente"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[-57.596, -25.3015],[-57.579,-25.3015],[-57.579,-25.314],[-57.596,-25.314],[-57.596,-25.3015]]]
      }
    },
    // --- NUEVOS ENCLAVES GRAN ASUNCIÓN ---
    {
      type: "Feature",
      properties: {
        id: "barrio-jara",
        city: "asuncion",
        name: "Barrio Jara",
        center: [-57.608, -25.275],
        safety: "seguro",
        safetyText_es: "Seguro (Barrio tradicional residencial muy arbolado)",
        safetyText_en: "Safe (Traditional tree-lined residential neighborhood)",
        safetyText_pt: "Seguro (Bairro tradicional residencial muito arborizado)",
        rentPrice: 700,
        rentText_es: "$500 - $900 USD/mes",
        rentText_en: "$500 - $900 USD/month",
        rentText_pt: "$500 - $900 USD/mês",
        pros_es: "Calles arboladas, ambiente de barrio tranquilo, cercanía a universidades y sanatorios",
        pros_en: "Shady streets, quiet neighborhood environment, close to universities & hospitals",
        pros_pt: "Ruas arborizadas, ambiente residencial tranquilo, próximo a universidades e clínicas",
        cons_es: "Tránsito complicado en accesos principales en horas punta",
        cons_en: "Complicated traffic at main access points during rush hours",
        cons_pt: "Trânsito lento nas principais vias de acesso nas horas de pico"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[-57.594018, -25.275],[-57.593051,-25.270647],[-57.595625,-25.266693],[-57.600487,-25.26459],[-57.605865,-25.265313],[-57.610323,-25.264461],[-57.616536,-25.263172],[-57.622993,-25.264935],[-57.625059,-25.270033],[-57.62161,-25.275],[-57.618185,-25.277966],[-57.61564,-25.280129],[-57.614991,-25.284687],[-57.611213,-25.289579],[-57.604436,-25.291168],[-57.599716,-25.286478],[-57.597603,-25.281979],[-57.596191,-25.278438],[-57.594018,-25.275]]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "villa-aurelia",
        city: "asuncion",
        name: "Villa Aurelia",
        center: [-57.568, -25.312],
        safety: "seguro",
        safetyText_es: "Seguro (Barrio residencial consolidado y arbolado)",
        safetyText_en: "Safe (Established leafy residential neighborhood)",
        safetyText_pt: "Seguro (Bairro residencial consolidado e arborizado)",
        rentPrice: 850,
        rentText_es: "$600 - $1,100 USD/mes",
        rentText_en: "$600 - $1,100 USD/month",
        rentText_pt: "$600 - $1.100 USD/mês",
        pros_es: "Muy tranquilo, excelente conectividad vial hacia Eusebio Ayala y Mcal. López",
        pros_en: "Very quiet, excellent road connectivity to Eusebio Ayala and Mcal. López",
        pros_pt: "Muito tranquilo, ótima conectividade para Eusebio Ayala e Mcal. López",
        cons_es: "Pérdida de tranquilidad en calles secundarias de carácter comercial",
        cons_en: "Loss of quietness on secondary commercial streets",
        cons_pt: "Perda de tranquilidade nas ruas secundárias comerciais"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[-57.548468, -25.312],[-57.54927,-25.306546],[-57.554913,-25.303215],[-57.561827,-25.303446],[-57.566373,-25.30462],[-57.569993,-25.302957],[-57.575845,-25.301129],[-57.582694,-25.302136],[-57.585493,-25.306906],[-57.582701,-25.312],[-57.580521,-25.315646],[-57.57884,-25.319277],[-57.576162,-25.32331],[-57.570965,-25.325454],[-57.565604,-25.322869],[-57.562026,-25.320278],[-57.559064,-25.317999],[-57.552576,-25.316491],[-57.548468,-25.312]]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "roberto-l-pettit",
        city: "asuncion",
        name: "Barrio Roberto L. Pettit",
        center: [-57.635, -25.320],
        safety: "evitar",
        safetyText_es: "Evitar estrictamente / Zona Roja (Alta marginalidad y hurtos)",
        safetyText_en: "Strictly avoid / Red Zone (High marginalization and theft)",
        safetyText_pt: "Evitar estritamente / Zona Vermelha (Alta marginalidade e furtos)",
        rentPrice: 160,
        rentText_es: "$100 - $220 USD/mes",
        rentText_en: "$100 - $220 USD/month",
        rentText_pt: "$100 - $220 USD/mês",
        pros_es: "Costos de alquiler mínimos",
        pros_en: "Minimal rental costs",
        pros_pt: "Aluguéis mínimos",
        cons_es: "Elevados índices de asaltos cometidos por motochorros y pandillas. Inseguro a toda hora.",
        cons_en: "High rates of muggings by motorcycle thieves (motochorros) & gangs. Unsafe 24/7.",
        cons_pt: "Altas taxas de assaltos por motoqueiros e gangues. Inseguro a qualquer hora."
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[-57.617317, -25.32],[-57.622719,-25.316424],[-57.62749,-25.314959],[-57.629628,-25.312557],[-57.632446,-25.308411],[-57.638248,-25.305265],[-57.643588,-25.308101],[-57.64626,-25.312441],[-57.647582,-25.316336],[-57.649873,-25.32],[-57.649699,-25.32428],[-57.648289,-25.328921],[-57.642127,-25.329875],[-57.637031,-25.329217],[-57.632958,-25.329265],[-57.62763,-25.330213],[-57.620452,-25.329766],[-57.615656,-25.325633],[-57.617317,-25.32]]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "tacumbu-santa-ana",
        city: "asuncion",
        name: "Tacumbú & Santa Ana",
        center: [-57.648, -25.310],
        safety: "evitar",
        safetyText_es: "Evitar estrictamente / Zona Roja (Conflictos carcelarios e inseguridad)",
        safetyText_en: "Strictly avoid / Red Zone (Prison conflicts and insecurity)",
        safetyText_pt: "Evitar estritamente / Zona Vermelha (Conflitos prisionais e insegurança)",
        rentPrice: 150,
        rentText_es: "$100 - $200 USD/mes",
        rentText_en: "$100 - $200 USD/month",
        rentText_pt: "$100 - $200 USD/mês",
        pros_es: "Alquileres sumamente bajos",
        pros_en: "Extremely low rents",
        pros_pt: "Aluguéis extremamente baixos",
        cons_es: "Presencia de la penitenciaría, enfrentamientos de bandas y delincuencia nocturna.",
        cons_en: "Presence of the penitentiary, gang clashes, and high night crime.",
        cons_pt: "Presença de penitenciária, confrontos de gangues e crimes noturnos."
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[-57.631726, -25.31],[-57.633375,-25.305742],[-57.638458,-25.303595],[-57.642589,-25.302503],[-57.645882,-25.30039],[-57.650825,-25.297183],[-57.658165,-25.295915],[-57.66375,-25.299428],[-57.662601,-25.305749],[-57.660214,-25.31],[-57.657211,-25.312682],[-57.658155,-25.316817],[-57.656186,-25.321343],[-57.651016,-25.323686],[-57.645192,-25.322738],[-57.640842,-25.319919],[-57.637059,-25.317344],[-57.63303,-25.314359],[-57.631726,-25.31]]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "republicano-caracolito",
        city: "asuncion",
        name: "Barrio Republicano (Caracolito)",
        center: [-57.628, -25.332],
        safety: "evitar",
        safetyText_es: "Evitar estrictamente / Zona Roja (Microtráfico de estupefacientes)",
        safetyText_en: "Strictly avoid / Red Zone (Drug micro-trafficking hub)",
        safetyText_pt: "Evitar estritamente / Zona Vermelha (Tráfico de drogas local)",
        rentPrice: 140,
        rentText_es: "$90 - $180 USD/mes",
        rentText_en: "$90 - $180 USD/month",
        rentText_pt: "$90 - $180 USD/mês",
        pros_es: "Costo de vida muy económico",
        pros_en: "Very economical cost of living",
        pros_pt: "Custo de vida muito barato",
        cons_es: "Venta y consumo de estupefacientes en la vía pública, asaltos constantes a transeúntes.",
        cons_en: "Street-level drug sales and consumption, constant muggings of pedestrians.",
        cons_pt: "Venda e consumo de drogas na rua, assaltos constantes a pedestres."
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[-57.614224, -25.332],[-57.618848,-25.329335],[-57.61959,-25.326355],[-57.620677,-25.321852],[-57.624899,-25.31793],[-57.631494,-25.316146],[-57.636929,-25.319627],[-57.63797,-25.325307],[-57.638233,-25.32902],[-57.641385,-25.332],[-57.642347,-25.336177],[-57.64079,-25.340586],[-57.635221,-25.342006],[-57.630419,-25.342973],[-57.625478,-25.343443],[-57.619756,-25.343423],[-57.613219,-25.341922],[-57.61105,-25.336935],[-57.614224,-25.332]]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "tablada-nueva",
        city: "asuncion",
        name: "Tablada Nueva",
        center: [-57.602, -25.260],
        safety: "evitar",
        safetyText_es: "Evitar estrictamente / Zona Roja (Zona de mataderos y marginalidad)",
        safetyText_en: "Strictly avoid / Red Zone (Slaughterhouse area and marginality)",
        safetyText_pt: "Evitar estritamente / Zona Vermelha (Área de matadouros e favelas)",
        rentPrice: 150,
        rentText_es: "$100 - $200 USD/mes",
        rentText_en: "$100 - $200 USD/month",
        rentText_pt: "$100 - $200 USD/mês",
        pros_es: "Cercano al río Paraguay",
        pros_en: "Close to the Paraguay River",
        pros_pt: "Próximo ao rio Paraguai",
        cons_es: "Olores fuertes por mataderos, altos índices de delincuencia común y falta de iluminación.",
        cons_en: "Strong odors from slaughterhouses, high rates of common crime & lack of streetlights.",
        cons_pt: "Cheiro forte de matadouros, altas taxas de criminalidade comum e falta de iluminação."
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[-57.585857, -25.26],[-57.585343,-25.25515],[-57.590316,-25.252157],[-57.595876,-25.251514],[-57.600194,-25.251805],[-57.604434,-25.248957],[-57.611187,-25.24727],[-57.617061,-25.24989],[-57.619157,-25.255004],[-57.615588,-25.26],[-57.612133,-25.262951],[-57.610428,-25.265658],[-57.608699,-25.269283],[-57.604933,-25.273307],[-57.5991,-25.273159],[-57.594252,-25.270736],[-57.590943,-25.267422],[-57.587372,-25.264259],[-57.585857,-25.26]]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "kambala-anaretai",
        city: "asuncion",
        name: "Kambala & Añareta'i",
        center: [-57.610, -25.290],
        safety: "evitar",
        safetyText_es: "Evitar estrictamente / Zona Roja (Focos de delincuencia en pasillos)",
        safetyText_en: "Strictly avoid / Red Zone (Crime spots in narrow alleys)",
        safetyText_pt: "Evitar estritamente / Zona Vermelha (Focos de crimes em becos)",
        rentPrice: 170,
        rentText_es: "$110 - $230 USD/mes",
        rentText_en: "$110 - $230 USD/month",
        rentText_pt: "$110 - $230 USD/mês",
        pros_es: "Ubicación céntrica en Asunción",
        pros_en: "Central location in Asunción",
        pros_pt: "Localização central em Assunção",
        cons_es: "Pasillos laberínticos con alta incidencia de asaltos rápidos y venta de crack.",
        cons_en: "Labyrinthine alleys with high incidence of quick robberies and crack sales.",
        cons_pt: "Becos estreitos com alta incidência de furtos rápidos e venda de crack."
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[-57.591619, -25.29],[-57.596474,-25.286062],[-57.601579,-25.284347],[-57.604168,-25.281919],[-57.607475,-25.278544],[-57.613004,-25.276369],[-57.618492,-25.278233],[-57.621277,-25.28243],[-57.622341,-25.286407],[-57.624668,-25.29],[-57.626754,-25.294878],[-57.623348,-25.29896],[-57.617437,-25.300305],[-57.611911,-25.298669],[-57.608242,-25.297976],[-57.603618,-25.298843],[-57.596003,-25.299396],[-57.591099,-25.295504],[-57.591619,-25.29]]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "abasto-villa-bikini",
        city: "asuncion",
        name: "Mercado de Abasto (Villa Bikini)",
        center: [-57.575, -25.335],
        safety: "evitar",
        safetyText_es: "Evitar estrictamente / Zona Roja (Robos agravados en adyacencias)",
        safetyText_en: "Strictly avoid / Red Zone (Aggravated robberies in surrounding streets)",
        safetyText_pt: "Evitar estritamente / Zona Vermelha (Roubos violentos nas proximidades)",
        rentPrice: 200,
        rentText_es: "$130 - $260 USD/mes",
        rentText_en: "$130 - $260 USD/month",
        rentText_pt: "$130 - $260 USD/mês",
        pros_es: "Precios mayoristas en alimentos a pasos",
        pros_en: "Wholesale food prices within walking distance",
        pros_pt: "Alimentos a preços de atacado a poucos passos",
        cons_es: "Alta delincuencia y presencia de pandillas e indigencia violenta en las calles de noche.",
        cons_en: "High crime rates, gang presence, and violent vagrancy on the streets at night.",
        cons_pt: "Alta criminalidade, presença de gangues e mendicância violenta nas ruas à noite."
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[-57.555358, -25.335],[-57.559728,-25.330553],[-57.566406,-25.329231],[-57.570294,-25.32848],[-57.572922,-25.325574],[-57.577913,-25.321782],[-57.585317,-25.320705],[-57.589792,-25.325071],[-57.588197,-25.331157],[-57.587788,-25.335],[-57.586348,-25.338304],[-57.586083,-25.34244],[-57.58301,-25.346099],[-57.577655,-25.347046],[-57.572559,-25.346073],[-57.56817,-25.344464],[-57.562625,-25.343307],[-57.557712,-25.340034],[-57.555358,-25.335]]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "itapytapunta-varadero",
        city: "asuncion",
        name: "Itapytãpunta & Varadero",
        center: [-57.658, -25.282],
        safety: "precaucion",
        safetyText_es: "Precaución (Calles solitarias y robos vehiculares)",
        safetyText_en: "Caution (Lonely streets and car burglaries)",
        safetyText_pt: "Cuidado (Ruas desertas e furtos de veículos)",
        rentPrice: 400,
        rentText_es: "$300 - $550 USD/mes",
        rentText_en: "$300 - $550 USD/month",
        rentText_pt: "$300 - $550 USD/mês",
        pros_es: "Vistas panorámicas del río, mirador tradicional de Asunción, ambiente bohemio",
        pros_en: "Panoramic river views, traditional lookout point, bohemian atmosphere",
        pros_pt: "Vistas panorâmicas do rio, mirante tradicional de Assunção, clima boêmio",
        cons_es: "Calles muy oscuras de noche, desolado tras el atardecer con robos recurrentes.",
        cons_en: "Very dark streets at night, completely isolated after sunset with recurrent robberies.",
        cons_pt: "Ruas muito escuras, deserto após o pôr do sol com assaltos recorrentes."
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[-57.637671, -25.282],[-57.642822,-25.277581],[-57.648445,-25.275586],[-57.652722,-25.274687],[-57.655727,-25.271687],[-57.660915,-25.268773],[-57.667011,-25.269513],[-57.670428,-25.273657],[-57.671229,-25.278148],[-57.671653,-25.282],[-57.672063,-25.286095],[-57.671697,-25.291195],[-57.665884,-25.292924],[-57.660209,-25.292022],[-57.656071,-25.290753],[-57.65181,-25.290577],[-57.645479,-25.290405],[-57.639387,-25.28742],[-57.637671,-25.282]]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "santa-maria-asuncion",
        city: "asuncion",
        name: "Barrio Santa María",
        center: [-57.550, -25.305],
        safety: "precaucion",
        safetyText_es: "Precaución (Robos domiciliarios y asaltos rápidos)",
        safetyText_en: "Caution (Home burglaries and quick robberies)",
        safetyText_pt: "Cuidado (Furtos a residências e assaltos rápidos)",
        rentPrice: 450,
        rentText_es: "$300 - $600 USD/mes",
        rentText_en: "$300 - $600 USD/month",
        rentText_pt: "$300 - $600 USD/mês",
        pros_es: "Tranquilo de día, buenos accesos vehiculares",
        pros_en: "Quiet by day, good road access routes",
        pros_pt: "Tranquilo de dia, bons acessos para carros",
        cons_es: "Frecuentes reportes de robos domiciliarios y hurtos vehiculares (detrás del Cementerio del Este).",
        cons_en: "Frequent reports of home break-ins and vehicle thefts (behind the Eastern Cemetery).",
        cons_pt: "Frequentes relatos de roubo a casas e furtos de carros (atrás do Cemitério do Leste)."
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[-57.534139, -25.305],[-57.533995,-25.30034],[-57.53989,-25.298213],[-57.544493,-25.29737],[-57.54804,-25.296106],[-57.552786,-25.29236],[-57.559318,-25.292088],[-57.565645,-25.294498],[-57.565945,-25.300357],[-57.561754,-25.305],[-57.558819,-25.307568],[-57.559806,-25.311582],[-57.558203,-25.316366],[-57.553134,-25.319219],[-57.547148,-25.317938],[-57.542597,-25.315258],[-57.539743,-25.311886],[-57.536312,-25.308986],[-57.534139,-25.305]]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "lambare-centro",
        city: "asuncion",
        name: "Lambaré Centro",
        center: [-57.615, -25.348],
        safety: "precaucion",
        safetyText_es: "Precaución (Frecuentes asaltos y severos problemas de infraestructura)",
        safetyText_en: "Caution (Frequent robberies and severe infrastructure problems)",
        safetyText_pt: "Cuidado (Frequentes assaltos e graves problemas de infraestrutura)",
        rentPrice: 480,
        rentText_es: "$350 - $650 USD/mes",
        rentText_en: "$350 - $650 USD/month",
        rentText_pt: "$350 - $650 USD/mês",
        pros_es: "Alquileres más económicos que en Asunción, cercanía a la capital",
        pros_en: "More affordable rents than Asunción, close proximity to the capital",
        pros_pt: "Aluguéis mais baratos que em Assunção, muito perto da capital",
        cons_es: "Enormes baches en la red vial y riesgo extremo de raudales pluviales en días de lluvia.",
        cons_en: "Huge potholes on roads and extreme danger of flash floods (raudales) on rainy days.",
        cons_pt: "Grandes buracos nas ruas e risco extremo de enxurradas (raudales) em dias de chuva."
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[-57.597885, -25.348],[-57.602056,-25.344231],[-57.605729,-25.341776],[-57.608163,-25.338527],[-57.61231,-25.335797],[-57.617805,-25.335275],[-57.622836,-25.337142],[-57.62448,-25.341636],[-57.626979,-25.344512],[-57.631483,-25.348],[-57.632326,-25.353045],[-57.628773,-25.357245],[-57.622122,-25.357869],[-57.616869,-25.356478],[-57.613141,-25.356432],[-57.60801,-25.357685],[-57.601181,-25.357277],[-57.597173,-25.353191],[-57.597885,-25.348]]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "ita-enramada",
        city: "asuncion",
        name: "Ita Enramada & Cerro Lambaré",
        center: [-57.640, -25.355],
        safety: "precaucion",
        safetyText_es: "Precaución de noche (Zona residencial con sectores desolados)",
        safetyText_en: "Caution at night (Residential area with isolated sectors)",
        safetyText_pt: "Cuidado à noite (Área residencial com setores desertos)",
        rentPrice: 520,
        rentText_es: "$380 - $750 USD/mes",
        rentText_en: "$380 - $750 USD/month",
        rentText_pt: "$380 - $750 USD/mês",
        pros_es: "Acceso al río Paraguay, vistas hermosas, club náutico, tranquilidad de día",
        pros_en: "Access to the Paraguay River, beautiful views, yacht club, quiet by day",
        pros_pt: "Acesso ao rio Paraguai, belas vistas, iate clube, tranquilidade de dia",
        cons_es: "Villas inestables en las laderas del cerro (villa Cobín) con robos recurrentes de noche.",
        cons_en: "Unstable shantytowns on hill slopes (villa Cobín) with recurrent thefts at night.",
        cons_pt: "Favelas nas encostas do morro (villa Cobín) com furtos recorrentes à noite."
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[-57.623733, -25.355],[-57.626321,-25.351017],[-57.630126,-25.348372],[-57.634,-25.346686],[-57.637269,-25.34261],[-57.64339,-25.339617],[-57.650079,-25.341035],[-57.652006,-25.346941],[-57.651275,-25.351717],[-57.650265,-25.355],[-57.650379,-25.358022],[-57.653238,-25.363887],[-57.649294,-25.367878],[-57.643098,-25.369055],[-57.63751,-25.366296],[-57.633789,-25.363607],[-57.629181,-25.362262],[-57.626383,-25.358965],[-57.623733,-25.355]]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "san-lorenzo-centro",
        city: "asuncion",
        name: "San Lorenzo Centro",
        center: [-57.518, -25.342],
        safety: "precaucion",
        safetyText_es: "Precaución (Frecuentes robos en paradas y caos vehicular)",
        safetyText_en: "Caution (Frequent thefts at bus stops and traffic chaos)",
        safetyText_pt: "Cuidado (Frequentes furtos em pontos de ônibus e caos no trânsito)",
        rentPrice: 420,
        rentText_es: "$300 - $550 USD/mes",
        rentText_en: "$300 - $550 USD/month",
        rentText_pt: "$300 - $550 USD/mês",
        pros_es: "Alta densidad de comercios, restaurantes baratos y conectividad metropolitana",
        pros_en: "High density of shops, budget dining, and metropolitan connectivity",
        pros_pt: "Grande variedade de lojas, comida barata e conexões metropolitanas",
        cons_es: "Tránsito sumamente congestionado y ruidoso, delincuencia común alta en paradas de bus de noche.",
        cons_en: "Highly congested and noisy traffic, high common crime at bus stops at night.",
        cons_pt: "Trânsito muito lento e barulhento, crime comum alto nos pontos de ônibus à noite."
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[-57.50511, -25.342],[-57.503333,-25.337729],[-57.505133,-25.333363],[-57.510109,-25.331066],[-57.515616,-25.331183],[-57.520611,-25.330153],[-57.526639,-25.330029],[-57.532158,-25.332496],[-57.533727,-25.337421],[-57.529579,-25.342],[-57.527686,-25.34482],[-57.527962,-25.348687],[-57.526289,-25.353485],[-57.521483,-25.357804],[-57.514705,-25.356949],[-57.510443,-25.352472],[-57.509661,-25.347598],[-57.506784,-25.345266],[-57.50511,-25.342]]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "campus-una",
        city: "asuncion",
        name: "Campus UNA (San Lorenzo)",
        center: [-57.522, -25.330],
        safety: "seguro",
        safetyText_es: "Seguro (Entorno universitario activo y custodiado)",
        safetyText_en: "Safe (Active and guarded university environment)",
        safetyText_pt: "Seguro (Ambiente universitário ativo e monitorado)",
        rentPrice: 380,
        rentText_es: "$250 - $480 USD/mes",
        rentText_en: "$250 - $480 USD/month",
        rentText_pt: "$250 - $480 USD/mês",
        pros_es: "Excelente ambiente juvenil, bibliotecas, centros deportivos, gran oferta estudiantil",
        pros_en: "Excellent youth environment, libraries, sports centers, great student housing options",
        pros_pt: "Excelente clima universitário, bibliotecas, centros esportivos, boa oferta estudantil",
        cons_es: "Mucho tráfico estudiantil y delincuencia oportunista en los portones del campus de noche.",
        cons_en: "Heavy student traffic and opportunistic crime at campus gates at night.",
        cons_pt: "Grande fluxo de estudantes e pequenos furtos nos portões do campus à noite."
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[-57.502502, -25.33],[-57.506274,-25.325421],[-57.512173,-25.323404],[-57.517358,-25.323567],[-57.520007,-25.320956],[-57.52467,-25.317885],[-57.531363,-25.317026],[-57.536982,-25.319943],[-57.537243,-25.325562],[-57.535645,-25.33],[-57.533615,-25.333382],[-57.53285,-25.337283],[-57.530224,-25.341396],[-57.524738,-25.342422],[-57.519727,-25.340311],[-57.515409,-25.339133],[-57.511014,-25.337375],[-57.504871,-25.334988],[-57.502502,-25.33]]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "fdm-zona-norte",
        city: "asuncion",
        name: "Fernando de la Mora (Norte)",
        center: [-57.552, -25.318],
        safety: "seguro",
        safetyText_es: "Seguro (Integración ordenada residencial de clase media-alta)",
        safetyText_en: "Safe (Organized middle-to-high class residential integration)",
        safetyText_pt: "Seguro (Integração residencial organizada de classe média-alta)",
        rentPrice: 650,
        rentText_es: "$450 - $850 USD/mes",
        rentText_en: "$450 - $850 USD/month",
        rentText_pt: "$450 - $850 USD/mês",
        pros_es: "Excelente conectividad hacia Asunción, calles pavimentadas y limpias, tranquilidad",
        pros_en: "Excellent connectivity to Asunción, paved and clean streets, tranquility",
        pros_pt: "Excelente ligação com Assunção, ruas limpas e asfaltadas, tranquilidade",
        cons_es: "Costo de vida más alto que en zona sur, ruidos de obras de construcción.",
        cons_en: "Higher cost of living than the South zone, noise from new construction works.",
        cons_pt: "Custo de vida mais alto que na zona sul, ruído de obras de construção."
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[-57.535159, -25.318],[-57.541469,-25.314934],[-57.543774,-25.312478],[-57.545611,-25.309147],[-57.549058,-25.304653],[-57.555094,-25.303963],[-57.560332,-25.306455],[-57.563398,-25.310348],[-57.565775,-25.313989],[-57.567658,-25.318],[-57.568483,-25.3228],[-57.563782,-25.325909],[-57.558906,-25.32757],[-57.553911,-25.326668],[-57.549852,-25.327744],[-57.544264,-25.328719],[-57.536356,-25.328502],[-57.534145,-25.323199],[-57.535159,-25.318]]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "fdm-zona-sur",
        city: "asuncion",
        name: "Fernando de la Mora (Sur)",
        center: [-57.545, -25.332],
        safety: "precaucion",
        safetyText_es: "Precaución de noche (Calles secundarias oscuras y delincuencia)",
        safetyText_en: "Caution at night (Dark secondary streets and crime)",
        safetyText_pt: "Cuidado à noite (Ruas secundárias escuras e crimes)",
        rentPrice: 500,
        rentText_es: "$350 - $650 USD/mes",
        rentText_en: "$350 - $650 USD/month",
        rentText_pt: "$350 - $650 USD/mês",
        pros_es: "Alquileres accesibles, comercios muy variados de conveniencia",
        pros_en: "Affordable rents, wide variety of convenience retail shops",
        pros_pt: "Aluguéis acessíveis, grande variedade de pequenos comércios",
        cons_es: "Calles secundarias sin pavimentación adecuada, inundaciones pluviales recurrentes.",
        cons_en: "Secondary streets without proper paving, recurrent heavy street flooding.",
        cons_pt: "Ruas secundárias sem asfalto adequado, enxurradas recorrentes em dias de chuva."
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[-57.52522, -25.332],[-57.530456,-25.327765],[-57.535969,-25.325938],[-57.540046,-25.325136],[-57.542743,-25.321762],[-57.548032,-25.318246],[-57.55397,-25.31957],[-57.557542,-25.323581],[-57.558471,-25.328077],[-57.557841,-25.332],[-57.558545,-25.335944],[-57.557615,-25.340468],[-57.553392,-25.343628],[-57.547455,-25.343139],[-57.542904,-25.341511],[-57.538873,-25.340489],[-57.532474,-25.340408],[-57.525931,-25.337553],[-57.52522,-25.332]]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "villa-elisa-centro",
        city: "asuncion",
        name: "Villa Elisa Centro",
        center: [-57.592, -25.378],
        safety: "seguro",
        safetyText_es: "Excelente (Una de las ciudades dormitorio más seguras y ordenadas)",
        safetyText_en: "Excellent (One of the safest and most organized commuter towns)",
        safetyText_pt: "Excelente (Uma das cidades-dormitório mais seguras e organizadas)",
        rentPrice: 450,
        rentText_es: "$320 - $600 USD/mes",
        rentText_en: "$320 - $600 USD/month",
        rentText_pt: "$320 - $600 USD/mês",
        pros_es: "Plazas y espacios públicos muy cuidados, patrullaje activo, tranquilidad",
        pros_en: "Very well-kept parks and public spaces, active policing, peacefulness",
        pros_pt: "Praças e parques bem cuidados, policiamento ativo, tranquilidade",
        cons_es: "Gran dependencia de transporte privado y embotellamientos severos para entrar a Asunción.",
        cons_en: "High dependence on private transport & severe traffic jams to enter Asunción.",
        cons_pt: "Grande dependência de carro e longos engarrafamentos para entrar em Assunção."
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[-57.576549, -25.378],[-57.581616,-25.374976],[-57.584076,-25.372681],[-57.586082,-25.3698],[-57.589157,-25.365102],[-57.595433,-25.362424],[-57.601245,-25.365189],[-57.603416,-25.370337],[-57.603443,-25.374668],[-57.605073,-25.378],[-57.606041,-25.382088],[-57.604459,-25.386364],[-57.599402,-25.388257],[-57.594217,-25.388059],[-57.589874,-25.387645],[-57.583843,-25.389303],[-57.577635,-25.387643],[-57.57365,-25.383343],[-57.576549,-25.378]]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "mra-centro",
        city: "asuncion",
        name: "M. Roque Alonso Centro",
        center: [-57.528, -25.215],
        safety: "seguro",
        safetyText_es: "Seguro (Clase media con alto crecimiento comercial y logístico)",
        safetyText_en: "Safe (Middle class with high retail and logistics growth)",
        safetyText_pt: "Seguro (Classe média com grande crescimento comercial e logístico)",
        rentPrice: 520,
        rentText_es: "$380 - $700 USD/mes",
        rentText_en: "$380 - $700 USD/month",
        rentText_pt: "$380 - $700 USD/mês",
        pros_es: "Cercano a shoppings, acceso rápido a Limpio y al Chaco por nuevo puente",
        pros_en: "Close to malls, quick access to Limpio and Chaco via new bridge",
        pros_pt: "Perto de shoppings, acesso rápido a Limpio e ao Chaco pela nova ponte",
        cons_es: "Tránsito pesado de camiones en avenidas principales, ruidos molestos.",
        cons_en: "Heavy cargo truck traffic on main avenues, noise issues.",
        cons_pt: "Tráfego pesado de caminhões de carga nas avenidas principais, barulho."
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[-57.508935, -25.215],[-57.509876,-25.209723],[-57.515984,-25.206934],[-57.522823,-25.207827],[-57.526152,-25.206617],[-57.53039,-25.204157],[-57.536161,-25.203692],[-57.541995,-25.205606],[-57.543801,-25.210399],[-57.542115,-25.215],[-57.540888,-25.218753],[-57.539804,-25.222924],[-57.53608,-25.226196],[-57.530728,-25.227379],[-57.525804,-25.224964],[-57.522294,-25.222906],[-57.518877,-25.221124],[-57.513073,-25.219346],[-57.508935,-25.215]]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "limpio-centro",
        city: "asuncion",
        name: "Limpio Centro",
        center: [-57.485, -25.168],
        safety: "precaucion",
        safetyText_es: "Precaución (Calles comerciales caóticas y asaltos menores)",
        safetyText_en: "Caution (Chaotic commercial streets and petty theft)",
        safetyText_pt: "Cuidado (Ruas comerciais caóticas e pequenos furtos)",
        rentPrice: 380,
        rentText_es: "$250 - $480 USD/mes",
        rentText_en: "$250 - $480 USD/month",
        rentText_pt: "$250 - $480 USD/mês",
        pros_es: "Terrenos muy económicos, abundancia de comercios minoristas",
        pros_en: "Extremely affordable land plots, abundance of retail shops",
        pros_pt: "Terrenos muito baratos, abundância de pequenas lojas",
        cons_es: "Falta de desagües pluviales e inundaciones de calles principales, olores industriales en algunas zonas.",
        cons_en: "Lack of storm sewers, flooding on main streets, industrial odors in some zones.",
        cons_pt: "Falta de drenagem, enchentes nas ruas principais, cheiro industrial em certas áreas."
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[-57.469208, -25.168],[-57.4731,-25.164535],[-57.477801,-25.163168],[-57.478482,-25.158969],[-57.48199,-25.154345],[-57.48864,-25.151484],[-57.494184,-25.155274],[-57.496098,-25.16055],[-57.49595,-25.164812],[-57.496679,-25.168],[-57.497875,-25.171749],[-57.498271,-25.176909],[-57.493855,-25.18027],[-57.48755,-25.179568],[-57.482595,-25.178911],[-57.477508,-25.178381],[-57.471721,-25.176914],[-57.467765,-25.173019],[-57.469208,-25.168]]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "limpio-piquete-cue",
        city: "asuncion",
        name: "Limpio (Piquete Cué)",
        center: [-57.465, -25.138],
        safety: "seguro",
        safetyText_es: "Seguro (Entorno natural fluvial tranquilo)",
        safetyText_en: "Safe (Peaceful riverside natural environment)",
        safetyText_pt: "Seguro (Ambiente natural tranquilo à beira do rio)",
        rentPrice: 320,
        rentText_es: "$220 - $400 USD/mes",
        rentText_en: "$220 - $400 USD/month",
        rentText_pt: "$220 - $400 USD/mês",
        pros_es: "Pesca deportiva, bellos paisajes naturales a orillas del río, tranquilidad extrema",
        pros_en: "Recreational fishing, beautiful river landscapes, extreme tranquility",
        pros_pt: "Pesca esportiva, belas paisagens naturais no rio, tranquilidade extrema",
        cons_es: "Distante de los centros financieros, requiere vehículo propio para conectividad.",
        cons_en: "Far from financial hubs, requires private vehicle for connectivity.",
        cons_pt: "Distante dos centros de negócios, exige carro próprio para transporte."
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[-57.450252, -25.138],[-57.449977,-25.133626],[-57.453316,-25.130157],[-57.457794,-25.128015],[-57.462633,-25.127262],[-57.467482,-25.12674],[-57.47402,-25.125502],[-57.479314,-25.128392],[-57.480638,-25.133447],[-57.478678,-25.138],[-57.474305,-25.140709],[-57.4736,-25.143773],[-57.472195,-25.147969],[-57.468347,-25.153185],[-57.461547,-25.153665],[-57.457004,-25.14908],[-57.454944,-25.14475],[-57.453507,-25.141347],[-57.450252,-25.138]]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "limpio-asentamiento-salado",
        city: "asuncion",
        name: "Limpio (A. Salado)",
        center: [-57.505, -25.155],
        safety: "evitar",
        safetyText_es: "Evitar estrictamente / Zona Roja (Asentamiento de alta vulnerabilidad)",
        safetyText_en: "Strictly avoid / Red Zone (Highly vulnerable settlement)",
        safetyText_pt: "Evitar estritamente / Zona Vermelha (Ocupação de alta vulnerabilidade)",
        rentPrice: 130,
        rentText_es: "$80 - $180 USD/mes",
        rentText_en: "$80 - $180 USD/month",
        rentText_pt: "$80 - $180 USD/mês",
        pros_es: "Costo de alquiler extremadamente bajo",
        pros_en: "Extremely low rental cost",
        pros_pt: "Custo de aluguel extremamente baixo",
        cons_es: "Alta incidencia de delincuencia común, falta de saneamiento básico y venta de estupefacientes.",
        cons_en: "High rate of common crime, lack of basic sanitation, and street-level drug sales.",
        cons_pt: "Alta incidência de crimes, falta de saneamento básico e venda de drogas."
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[-57.49054, -25.155],[-57.494978,-25.152082],[-57.497039,-25.149656],[-57.498558,-25.146074],[-57.501852,-25.140716],[-57.508306,-25.14],[-57.513891,-25.14268],[-57.515989,-25.147623],[-57.51799,-25.151218],[-57.520572,-25.155],[-57.520195,-25.159425],[-57.517125,-25.163139],[-57.511359,-25.163812],[-57.506974,-25.163955],[-57.502645,-25.165686],[-57.49673,-25.16646],[-57.490466,-25.164756],[-57.487479,-25.160102],[-57.49054,-25.155]]]
      }
    },

    // === LUQUE ===
    {
      type: "Feature",
      properties: {
        id: "laurelty",
        city: "luque",
        name: "Laurelty & Country Montesol",
        center: [-57.490, -25.285],
        safety: "muy-seguro",
        safetyText_es: "Excelente (Urbanizaciones exclusivas con seguridad armada)",
        safetyText_en: "Excellent (Exclusive estates with armed private security)",
        safetyText_pt: "Excelente (Urbanizações exclusivas com segurança armada)",
        rentPrice: 1800,
        rentText_es: "$1,200 - $2,500 USD/mes",
        rentText_en: "$1,200 - $2,500 USD/month",
        rentText_pt: "$1.200 - $2.500 USD/mês",
        pros_es: "Casas quintas de alto nivel, entornos verdes, paz y seguridad total",
        pros_en: "Premium country homes, green surroundings, total peace and security",
        pros_pt: "Casas de campo de alto padrão, áreas verdes, paz e segurança total",
        cons_es: "Custo de alquiler elevado, dependencias del coche para compras básicas",
        cons_en: "High rental cost, car-dependent for basic shopping",
        cons_pt: "Custo de aluguel elevado, dependência de carro para compras básicas"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[-57.470075, -25.285],[-57.471403,-25.279585],[-57.478094,-25.277008],[-57.484615,-25.277538],[-57.488402,-25.27775],[-57.492298,-25.274575],[-57.498442,-25.273302],[-57.504349,-25.275368],[-57.505923,-25.280363],[-57.504724,-25.285],[-57.502688,-25.288694],[-57.500972,-25.292366],[-57.498486,-25.296758],[-57.492789,-25.297653],[-57.48764,-25.295705],[-57.484561,-25.292536],[-57.480381,-25.291457],[-57.475201,-25.289309],[-57.470075,-25.285]]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "canada-san-rafael",
        city: "luque",
        name: "Cañada San Rafael",
        center: [-57.510, -25.265],
        safety: "muy-seguro",
        safetyText_es: "Excelente (Residencial cerrado moderno y seguro)",
        safetyText_en: "Excellent (Modern and secure gated residential community)",
        safetyText_pt: "Excelente (Residencial fechado moderno e seguro)",
        rentPrice: 1100,
        rentText_es: "$800 - $1,500 USD/mes",
        rentText_en: "$800 - $1,500 USD/month",
        rentText_pt: "$800 - $1.500 USD/mês",
        pros_es: "Inmediaciones del Aeropuerto, sede Conmebol y Club de Oficiales. Gran conectividad.",
        pros_en: "Near Airport, Conmebol headquarters & Officers Club. Great connectivity.",
        pros_pt: "Próximo ao Aeroporto, sede Conmebol e Clube de Oficiais. Ótima conectividade.",
        cons_es: "Alta demanda encarece los precios rápidamente",
        cons_en: "High demand is pushing up prices rapidly",
        cons_pt: "Alta demanda encarece os preços rapidamente"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[-57.493512, -25.265],[-57.498109,-25.261538],[-57.502786,-25.260157],[-57.504356,-25.257179],[-57.507076,-25.251733],[-57.513601,-25.24866],[-57.519683,-25.251583],[-57.521962,-25.25697],[-57.520541,-25.261931],[-57.521842,-25.265],[-57.522531,-25.268649],[-57.522215,-25.273199],[-57.518401,-25.276641],[-57.512632,-25.276942],[-57.507752,-25.275201],[-57.50279,-25.27499],[-57.497219,-25.27358],[-57.493099,-25.269921],[-57.493512,-25.265]]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "villa-adela",
        city: "luque",
        name: "Villa Adela & Segundo Barrio",
        center: [-57.480, -25.255],
        safety: "seguro",
        safetyText_es: "Seguro (Clase media con quinchos y piscinas compartidas)",
        safetyText_en: "Safe (Middle class complexes with shared pools & grills)",
        safetyText_pt: "Seguro (Classe média com piscinas e churrasqueiras compartilhadas)",
        rentPrice: 550,
        rentText_es: "$380 - $700 USD/mes",
        rentText_en: "$380 - $700 USD/month",
        rentText_pt: "$380 - $700 USD/mês",
        pros_es: "Propuestas de gama media a estrenar, ambiente familiar, costos moderados",
        pros_en: "Brand new middle-class properties, family environment, moderate costs",
        pros_pt: "Imóveis de classe média novos, ambiente familiar, custos moderados",
        cons_es: "Accesos viales hacia Asunción muy congestionados en hora punta",
        cons_en: "Road accesses to Asunción very congested during rush hours",
        cons_pt: "Acessos viários para Assunção muito congestionados no horário de pico"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[-57.461675, -25.255],[-57.464631,-25.250525],[-57.470818,-25.248836],[-57.475163,-25.248297],[-57.477771,-25.244887],[-57.482746,-25.24254],[-57.489945,-25.24122],[-57.494753,-25.245097],[-57.494048,-25.25091],[-57.492893,-25.255],[-57.492632,-25.258678],[-57.491608,-25.262792],[-57.487668,-25.265625],[-57.482616,-25.266867],[-57.47787,-25.264665],[-57.473754,-25.263655],[-57.467961,-25.263082],[-57.461921,-25.260264],[-57.461675,-25.255]]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "luque-centro",
        city: "luque",
        name: "Luque Centro",
        center: [-57.485, -25.270],
        safety: "precaucion",
        safetyText_es: "Precaución (Tráfico pesado de día, solitario de noche)",
        safetyText_en: "Caution (Heavy traffic by day, quiet at night)",
        safetyText_pt: "Cuidado (Trânsito pesado de dia, deserto à noite)",
        rentPrice: 350,
        rentText_es: "$250 - $450 USD/mes",
        rentText_en: "$250 - $450 USD/month",
        rentText_pt: "$250 - $450 USD/mês",
        pros_es: "Comercios, transporte y ferias locales de filigrana a pie",
        pros_en: "Shops, transport and local filigree jewelry fairs within walking distance",
        pros_pt: "Comércio, transporte e feiras locais de filigrana a pé",
        cons_es: "Polución acústica, riesgo de raudales pluviales críticos (Mcal. López y Curupayty)",
        cons_en: "Acoustic pollution, risk of critical flash floods (Mcal. López & Curupayty)",
        cons_pt: "Poluição sonora, risco de enxurradas pluviais críticas (Mcal. López e Curupayty)"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[-57.464515, -25.27],[-57.46717,-25.264808],[-57.474295,-25.262814],[-57.479292,-25.262091],[-57.483176,-25.261722],[-57.487242,-25.259828],[-57.494012,-25.257513],[-57.498657,-25.260832],[-57.499464,-25.265789],[-57.49992,-25.27],[-57.497948,-25.27377],[-57.497598,-25.278457],[-57.493567,-25.28187],[-57.487722,-25.282351],[-57.482888,-25.279584],[-57.479742,-25.277285],[-57.475573,-25.276328],[-57.469356,-25.274555],[-57.464515,-25.27]]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "aeropuerto-conmebol",
        city: "luque",
        name: "Eje Aeropuerto & Conmebol",
        center: [-57.518, -25.255],
        safety: "muy-seguro",
        safetyText_es: "Excelente (Seguridad militarizada y corporativa de primer nivel)",
        safetyText_en: "Excellent (First-class militarized and corporate security)",
        safetyText_pt: "Excelente (Segurança militar e corporativa de primeiro nível)",
        rentPrice: 1300,
        rentText_es: "$900 - $1,800 USD/mes",
        rentText_en: "$900 - $1,800 USD/month",
        rentText_pt: "$900 - $1.800 USD/mês",
        pros_es: "Presencia de hoteles de lujo, centros empresariales, seguridad extrema por entes diplomáticos",
        pros_en: "Presence of luxury hotels, business centers, extreme security by diplomatic entities",
        pros_pt: "Hotéis de luxo, centros empresariais, segurança muito reforçada por embaixadas",
        cons_es: "Ruidos de turbinas por despegues de aviones en el Silvio Pettirossi",
        cons_en: "Jet engine noises from planes taking off at Silvio Pettirossi Airport",
        cons_pt: "Barulho de turbinas por decolagens de aviões no Silvio Pettirossi"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[-57.498146, -25.255],[-57.50127,-25.250129],[-57.507926,-25.248238],[-57.512841,-25.247852],[-57.5162,-25.246831],[-57.520536,-25.243493],[-57.527785,-25.241441],[-57.533238,-25.244771],[-57.533392,-25.250518],[-57.531236,-25.255],[-57.529851,-25.258451],[-57.52878,-25.262237],[-57.525974,-25.266049],[-57.52069,-25.267204],[-57.515576,-25.265999],[-57.512053,-25.26324],[-57.507556,-25.262011],[-57.501686,-25.25975],[-57.498146,-25.255]]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "nueva-asuncion",
        city: "luque",
        name: "Nueva Asunción (Asentamientos)",
        center: [-57.525, -25.230],
        safety: "evitar",
        safetyText_es: "Evitar estrictamente / Zona Roja (Asentamientos de alta marginalidad)",
        safetyText_en: "Strictly avoid / Red Zone (Highly marginalized settlements)",
        safetyText_pt: "Evitar estritamente / Zona Vermelha (Ocupações de alta marginalidade)",
        rentPrice: 140,
        rentText_es: "$100 - $200 USD/mes",
        rentText_en: "$100 - $200 USD/month",
        rentText_pt: "$100 - $200 USD/mês",
        pros_es: "Alquileres sumamente baratos",
        pros_en: "Extremely cheap rental costs",
        pros_pt: "Aluguéis extremamente baratos",
        cons_es: "Carencia de desagües e iluminación, altos índices de delincuencia común y venta de drogas",
        cons_en: "Lack of drainage and street lighting, high rate of common crime and drug sales",
        cons_pt: "Falta de drenagem e iluminação, altos índices de crimes e venda de drogas"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[-57.508117, -25.23],[-57.511269,-25.226002],[-57.515885,-25.223882],[-57.518472,-25.220955],[-57.522488,-25.218604],[-57.528316,-25.214955],[-57.534944,-25.216222],[-57.537751,-25.221441],[-57.536081,-25.226773],[-57.53553,-25.23],[-57.53617,-25.233252],[-57.537535,-25.238414],[-57.534689,-25.243425],[-57.528214,-25.24458],[-57.522354,-25.242007],[-57.518087,-25.239579],[-57.51516,-25.236605],[-57.510446,-25.234238],[-57.508117,-25.23]]]
      }
    },
    // --- NUEVOS ENCLAVES LUQUE ---
    {
      type: "Feature",
      properties: {
        id: "luque-tarumandy",
        city: "luque",
        name: "Luque (Tarumandy)",
        center: [-57.410, -25.230],
        safety: "precaucion",
        safetyText_es: "Precaución (Zona de expansión con desabastecimiento de agua)",
        safetyText_en: "Caution (Expansion area with water supply shortages)",
        safetyText_pt: "Cuidado (Zona de expansão com escassez de água)",
        rentPrice: 300,
        rentText_es: "$200 - $400 USD/mes",
        rentText_en: "$200 - $400 USD/month",
        rentText_pt: "$200 - $400 USD/mês",
        pros_es: "Terrenos amplios y económicos para quintas o viviendas unifamiliares",
        pros_en: "Large and affordable land plots for country homes or single family units",
        pros_pt: "Terrenos amplos e baratos para chácaras ou casas unifamiliares",
        cons_es: "Dificultades históricas de agua (dependencia de pozos) y cercanía de faenamiento ganadero.",
        cons_en: "Historical water issues (well dependency) and proximity to cattle slaughterhouses.",
        cons_pt: "Dificuldades históricas de água (poço artesiano) e proximidade de matadouros."
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[-57.393577, -25.23],[-57.396539,-25.226081],[-57.40035,-25.223522],[-57.403962,-25.221633],[-57.407366,-25.218049],[-57.413246,-25.215272],[-57.419574,-25.216735],[-57.42171,-25.222139],[-57.420114,-25.227055],[-57.420521,-25.23],[-57.421376,-25.233312],[-57.422516,-25.238402],[-57.419261,-25.242832],[-57.412959,-25.243423],[-57.407341,-25.242062],[-57.403513,-25.238989],[-57.399599,-25.236982],[-57.39486,-25.234408],[-57.393577,-25.23]]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "luque-makai",
        city: "luque",
        name: "Luque (Maka'i)",
        center: [-57.465, -25.275],
        safety: "seguro",
        safetyText_es: "Seguro (Zona residencial consolidada de clase media)",
        safetyText_en: "Safe (Established middle-class residential area)",
        safetyText_pt: "Seguro (Zona residencial consolidada de classe média)",
        rentPrice: 480,
        rentText_es: "$350 - $600 USD/mes",
        rentText_en: "$350 - $600 USD/month",
        rentText_pt: "$350 - $600 USD/mês",
        pros_es: "Ambiente familiar arbolado, comercios locales cercanos, buena conectividad con el centro",
        pros_en: "Tree-lined family environment, close local shops, good connectivity with center",
        pros_pt: "Ambiente familiar arborizado, comércio local perto, boas conexões com o centro",
        cons_es: "Tránsito lento en avenidas principales durante horas punta.",
        cons_en: "Slow-moving traffic on main avenues during peak rush hours.",
        cons_pt: "Trânsito lento nas avenidas principais nos horários de pico."
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[-57.449012, -25.275],[-57.452958,-25.271494],[-57.456041,-25.268986],[-57.458609,-25.266145],[-57.462155,-25.262092],[-57.468392,-25.259608],[-57.474641,-25.261641],[-57.476555,-25.267243],[-57.475848,-25.271841],[-57.474999,-25.275],[-57.477426,-25.278618],[-57.477831,-25.283613],[-57.47354,-25.286833],[-57.467691,-25.287211],[-57.462461,-25.286521],[-57.457976,-25.284733],[-57.453471,-25.282739],[-57.448981,-25.279664],[-57.449012,-25.275]]]
      }
    },

    // === CIUDAD DEL ESTE ===
    {
      type: "Feature",
      properties: {
        id: "parana-country-club",
        city: "ciudad-del-este",
        name: "Paraná Country Club",
        center: [-54.600, -25.445],
        safety: "muy-seguro",
        safetyText_es: "Excelente (Máxima seguridad blindada, armada y patrullas)",
        safetyText_en: "Excellent (Maximum armored, armed security and active patrols)",
        safetyText_pt: "Excelente (Máxima segurança blindada, armada e patrulhas)",
        rentPrice: 3500,
        rentText_es: "$2,500 - $5,000 USD/mes",
        rentText_en: "$2,500 - $5,000 USD/month",
        rentText_pt: "$2.500 - $5.000 USD/mês",
        pros_es: "Campo de golf, colegios, supermercados y seguridad interna armada",
        pros_en: "Golf course, private schools, supermarkets and armed internal security",
        pros_pt: "Campo de golfe, escolas, supermercados e segurança interna armada",
        cons_es: "Elevado costo, alejado del microcentro fronterizo",
        cons_en: "Very expensive, far from the border commercial center",
        cons_pt: "Custo muito elevado, longe do centro comercial da fronteira"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[-54.580389, -25.445],[-54.585035,-25.440643],[-54.591192,-25.439087],[-54.595298,-25.438485],[-54.597874,-25.435353],[-54.60282,-25.432204],[-54.609687,-25.431577],[-54.614364,-25.435358],[-54.614619,-25.440743],[-54.611939,-25.445],[-54.611493,-25.448347],[-54.610867,-25.452295],[-54.608102,-25.456226],[-54.602506,-25.456369],[-54.597864,-25.454691],[-54.593231,-25.454379],[-54.588294,-25.452858],[-54.583241,-25.44988],[-54.580389,-25.445]]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "boqueron",
        city: "ciudad-del-este",
        name: "Barrio Boquerón",
        center: [-54.622, -25.512],
        safety: "seguro",
        safetyText_es: "Seguro (Zona residencial verde, universidades y torres premium)",
        safetyText_en: "Safe (Green residential area, universities & premium towers)",
        safetyText_pt: "Seguro (Zona residencial verde, universidades e edifícios de luxo)",
        rentPrice: 900,
        rentText_es: "$600 - $1,200 USD/mes",
        rentText_en: "$600 - $1,200 USD/month",
        rentText_pt: "$600 - $1.200 USD/mês",
        pros_es: "Edificios de alta gama (Palladio Ecotower), lagos recreativos cercanos y buena gastronomía",
        pros_en: "High-end developments (Palladio), nearby lakes, and excellent restaurants",
        pros_pt: "Prédios de alto padrão (Palladio), lagos de lazer próximos e ótimos restaurantes",
        cons_es: "Alquileres premium en el eje corporativo",
        cons_en: "Premium rents along the business district",
        cons_pt: "Aluguéis premium no eixo corporativo"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[-54.602588, -25.512],[-54.6067,-25.507545],[-54.6126,-25.50569],[-54.617357,-25.505566],[-54.620049,-25.503147],[-54.624673,-25.499875],[-54.63134,-25.499058],[-54.635364,-25.503029],[-54.636532,-25.507768],[-54.6344,-25.512],[-54.635599,-25.51596],[-54.633737,-25.519879],[-54.629786,-25.522788],[-54.624638,-25.523971],[-54.619898,-25.521539],[-54.616217,-25.520013],[-54.609849,-25.520156],[-54.603626,-25.51735],[-54.602588,-25.512]]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "km8",
        city: "ciudad-del-este",
        name: "Kilómetro 8",
        center: [-54.660, -25.510],
        safety: "seguro",
        safetyText_es: "Seguro (Desarrollos nuevos de lofts y condominios cerrados)",
        safetyText_en: "Safe (New loft developments and gated communities)",
        safetyText_pt: "Seguro (Novos lofts e condomínios fechados)",
        rentPrice: 550,
        rentText_es: "$400 - $800 USD/mes",
        rentText_en: "$400 - $800 USD/month",
        rentText_pt: "$400 - $800 USD/mês",
        pros_es: "Departamentos a estrenar amoblados (Zuba 12), rentas accesibles, entorno tranquilo",
        pros_en: "Brand new furnished apartments (Zuba 12), budget rents, quiet surroundings",
        pros_pt: "Apartamentos mobiliados novos (Zuba 12), aluguéis acessíveis, ambiente tranquilo",
        cons_es: "Distante del centro, requiere movilidad independiente",
        cons_en: "Far from downtown, requires private transportation",
        cons_pt: "Distante do centro, exige meio de transporte próprio"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[-54.644614, -25.51],[-54.64429,-25.505426],[-54.648372,-25.502194],[-54.654265,-25.502053],[-54.658141,-25.501566],[-54.662712,-25.497697],[-54.669038,-25.497477],[-54.675646,-25.499497],[-54.676055,-25.505325],[-54.672234,-25.51],[-54.669157,-25.512666],[-54.669463,-25.516353],[-54.668003,-25.521089],[-54.663155,-25.524316],[-54.65686,-25.524246],[-54.652071,-25.520987],[-54.649841,-25.516819],[-54.645772,-25.514143],[-54.644614,-25.51]]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "cde-centro",
        city: "ciudad-del-este",
        name: "Microcentro Comercial",
        center: [-54.607, -25.511],
        safety: "precaucion",
        safetyText_es: "Precaución (Comercio diurno dinámico, desierto de noche)",
        safetyText_en: "Caution (Busy shopping by day, completely deserted at night)",
        safetyText_pt: "Cuidado (Comércio diurno movimentado, deserto à noite)",
        rentPrice: 320,
        rentText_es: "$230 - $450 USD/mes",
        rentText_en: "$230 - $450 USD/month",
        rentText_pt: "$230 - $450 USD/mês",
        pros_es: "Alquileres accesibles para estudiantes, cercanía al Puente de la Amistad",
        pros_en: "Affordable rents for students, near the Friendship Bridge to Brazil",
        pros_pt: "Aluguéis acessíveis para estudantes, próximo à Ponte da Amizade",
        cons_es: "Hurtos y estafas comerciales, inseguridad después de las 17:00 hs",
        cons_en: "Pickpocketing and electronic scams, unsafe streets after 5:00 PM",
        cons_pt: "Furtos e golpes em lojas, ruas inseguras após as 17:00"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[-54.589675, -25.511],[-54.594805,-25.507449],[-54.599269,-25.50581],[-54.601029,-25.502727],[-54.604235,-25.498456],[-54.610503,-25.495107],[-54.616796,-25.497426],[-54.619001,-25.502944],[-54.618108,-25.507766],[-54.618902,-25.511],[-54.620416,-25.514907],[-54.619618,-25.51947],[-54.61467,-25.521628],[-54.609553,-25.522584],[-54.604647,-25.521676],[-54.599403,-25.521527],[-54.593278,-25.520211],[-54.588338,-25.516434],[-54.589675,-25.511]]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "exclusion-cde",
        city: "ciudad-del-este",
        name: "Exclusión de Apps (Zonas Rojas)",
        center: [-54.595, -25.530],
        safety: "evitar",
        safetyText_es: "Evitar (Zonas críticas donde Bolt/Uber se niegan a entrar)",
        safetyText_en: "Avoid (Critical areas where Bolt/Uber refuse to enter)",
        safetyText_pt: "Evitar (Áreas críticas onde Bolt/Uber recusam entrar)",
        rentPrice: 150,
        rentText_es: "$100 - $200 USD/mes",
        rentText_en: "$100 - $200 USD/month",
        rentText_pt: "$100 - $200 USD/mês",
        pros_es: "Precios extremadamente bajos (para residentes locales de subsistencia)",
        pros_en: "Extremely low prices (only suited for local subsistence residents)",
        pros_pt: "Preços extremamente baixos (para moradores locais de subsistência)",
        cons_es: "Remansito, San Rafael, San Agustín y San Antonio. Violencia y asaltos frecuentes.",
        cons_en: "Remansito, San Rafael, San Agustín & San Antonio. Violent crime and robbery.",
        cons_pt: "Remansito, San Rafael, San Agustín e San Antônio. Crime violento e roubo de carros."
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[-54.578498, -25.53],[-54.583673,-25.526702],[-54.58803,-25.525321],[-54.589207,-25.521973],[-54.592257,-25.517556],[-54.598168,-25.515625],[-54.604374,-25.517011],[-54.606715,-25.522136],[-54.606803,-25.526563],[-54.608278,-25.53],[-54.608679,-25.533983],[-54.607383,-25.538312],[-54.602305,-25.540122],[-54.597371,-25.540757],[-54.592926,-25.539409],[-54.587823,-25.539945],[-54.580669,-25.53962],[-54.57694,-25.535259],[-54.578498,-25.53]]]
      }
    },
    // --- NUEVOS ENCLAVES CDE & HERNANDARIAS ---
    {
      type: "Feature",
      properties: {
        id: "cde-san-rafael",
        city: "ciudad-del-este",
        name: "CDE (Barrio San Rafael)",
        center: [-54.595, -25.505],
        safety: "evitar",
        safetyText_es: "Evitar estrictamente / Zona Roja (Foco criminal violento y exclusión de Apps)",
        safetyText_en: "Strictly avoid / Red Zone (Violent crime hotspot & transport exclusion)",
        safetyText_pt: "Evitar estritamente / Zona Vermelha (Foco violento de crimes e exclusão de Apps)",
        rentPrice: 150,
        rentText_es: "$100 - $200 USD/mes",
        rentText_en: "$100 - $200 USD/month",
        rentText_pt: "$100 - $200 USD/mês",
        pros_es: "Costos de alquiler sumamente bajos",
        pros_en: "Extremely low rental costs",
        pros_pt: "Custos de aluguel extremamente baixos",
        cons_es: "Los conductores de Bolt/Uber se niegan a entrar por asaltos violentos frecuentes y robo de coches.",
        cons_en: "Bolt/Uber drivers refuse to enter due to frequent violent robberies & carjacking.",
        cons_pt: "Motoristas de aplicativos recusam-se a entrar por frequentes assaltos violentos e roubo de carros."
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[-54.575248, -25.505],[-54.579209,-25.500402],[-54.586717,-25.49944],[-54.590012,-25.498088],[-54.592902,-25.49548],[-54.597825,-25.492182],[-54.604543,-25.491777],[-54.608272,-25.496091],[-54.608572,-25.501048],[-54.6082,-25.505],[-54.607268,-25.508572],[-54.606947,-25.51302],[-54.603097,-25.51622],[-54.597619,-25.516881],[-54.592783,-25.51506],[-54.588774,-25.513627],[-54.582684,-25.513267],[-54.576676,-25.510335],[-54.575248,-25.505]]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "cde-remansito",
        city: "ciudad-del-este",
        name: "CDE (Barrio Remansito)",
        center: [-54.602, -25.538],
        safety: "evitar",
        safetyText_es: "Evitar estrictamente / Zona Roja (Alta peligrosidad y contrabando)",
        safetyText_en: "Strictly avoid / Red Zone (High danger and smuggling operations)",
        safetyText_pt: "Evitar estritamente / Zona Vermelha (Alta periculosidade e contrabando)",
        rentPrice: 140,
        rentText_es: "$90 - $180 USD/mes",
        rentText_en: "$90 - $180 USD/month",
        rentText_pt: "$90 - $180 USD/mês",
        pros_es: "Alquileres extremadamente baratos",
        pros_en: "Extremely cheap rental prices",
        pros_pt: "Aluguéis muito baratos",
        cons_es: "Pérdida total del control policial de noche, delincuencia armada activa y crimen de frontera.",
        cons_en: "Total loss of police control at night, active armed crime, and border smuggling rings.",
        cons_pt: "Perda de policiamento à noite, criminalidade armada ativa e crimes de fronteira."
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[-54.588162, -25.538],[-54.592455,-25.535221],[-54.594711,-25.533107],[-54.595259,-25.528659],[-54.598941,-25.52412],[-54.605449,-25.522352],[-54.611336,-25.525064],[-54.613017,-25.530604],[-54.612467,-25.534952],[-54.614302,-25.538],[-54.615885,-25.542043],[-54.614726,-25.546543],[-54.610042,-25.549143],[-54.60441,-25.548934],[-54.599671,-25.548568],[-54.594115,-25.548926],[-54.588148,-25.547299],[-54.585926,-25.54268],[-54.588162,-25.538]]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "cde-san-agustin-antonio",
        city: "ciudad-del-este",
        name: "CDE (San Agustín & S. Antonio)",
        center: [-54.592, -25.515],
        safety: "evitar",
        safetyText_es: "Evitar estrictamente / Zona Roja (Asaltos constantes en la vía pública)",
        safetyText_en: "Strictly avoid / Red Zone (Constant muggings on public streets)",
        safetyText_pt: "Evitar estritamente / Zona Vermelha (Assaltos constantes em vias públicas)",
        rentPrice: 130,
        rentText_es: "$80 - $180 USD/mes",
        rentText_en: "$80 - $180 USD/month",
        rentText_pt: "$80 - $180 USD/mês",
        pros_es: "Alquileres muy asequibles",
        pros_en: "Very affordable rental prices",
        pros_pt: "Aluguéis muito baratos",
        cons_es: "Altos índices de asaltos con armas blancas y de fuego, inseguridad extrema tras el atardecer.",
        cons_en: "High rates of armed robberies with knives/firearms, extreme insecurity after sunset.",
        cons_pt: "Altas taxas de roubo à mão armada, insegurança extrema após o pôr do sol."
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[-54.578372, -25.515],[-54.582694,-25.51229],[-54.583464,-25.50927],[-54.584925,-25.505196],[-54.588797,-25.500467],[-54.595605,-25.498642],[-54.600789,-25.502822],[-54.601594,-25.508559],[-54.60268,-25.51189],[-54.604941,-25.515],[-54.607286,-25.519451],[-54.604977,-25.523711],[-54.599194,-25.524968],[-54.594196,-25.524965],[-54.589667,-25.525585],[-54.583676,-25.526534],[-54.577844,-25.524503],[-54.576147,-25.519616],[-54.578372,-25.515]]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "hernandarias-centro",
        city: "ciudad-del-este",
        name: "Hernandarias Centro",
        center: [-54.635, -25.415],
        safety: "seguro",
        safetyText_es: "Seguro (Tranquilidad del interior con sinergia de Itaipú)",
        safetyText_en: "Safe (Quiet inland town with Itaipú synergy)",
        safetyText_pt: "Seguro (Tranquilidade do interior com a usina de Itaipu)",
        rentPrice: 450,
        rentText_es: "$300 - $600 USD/mes",
        rentText_en: "$300 - $600 USD/month",
        rentText_pt: "$300 - $600 USD/mês",
        pros_es: "Excelente cuidado de áreas verdes públicas, ambiente de retiro natural",
        pros_en: "Excellent upkeep of public green areas, natural retirement environment",
        pros_pt: "Excelente manutenção de praças públicas, ambiente de retiro natural",
        cons_es: "Oferta comercial básica, requiere traslado a CDE para trámites médicos y bancos.",
        cons_en: "Basic commercial options, requires travel to CDE for medical needs and banking.",
        cons_pt: "Comércio básico, exige deslocamento a CDE para hospitales e serviços bancários."
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[-54.617584, -25.415],[-54.621446,-25.411053],[-54.625587,-25.408681],[-54.62886,-25.406492],[-54.632686,-25.4045],[-54.638118,-25.400853],[-54.644804,-25.401416],[-54.648741,-25.405776],[-54.646832,-25.411555],[-54.644872,-25.415],[-54.644885,-25.417878],[-54.646615,-25.422797],[-54.644024,-25.427504],[-54.63813,-25.429201],[-54.632224,-25.427593],[-54.62837,-25.424186],[-54.623708,-25.42258],[-54.620129,-25.41933],[-54.617584,-25.415]]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "hernandarias-costa-lago",
        city: "ciudad-del-este",
        name: "Hernandarias (Costa del Lago)",
        center: [-54.580, -25.405],
        safety: "muy-seguro",
        safetyText_es: "Excelente (Zona residencial natural premium muy vigilada)",
        safetyText_en: "Excellent (Highly policed premium lakeside residential area)",
        safetyText_pt: "Excelente (Área residencial premium no lago com alta vigilância)",
        rentPrice: 900,
        rentText_es: "$600 - $1,300 USD/mes",
        rentText_en: "$600 - $1,300 USD/month",
        rentText_pt: "$600 - $1.300 USD/mês",
        pros_es: "Aire purificado por reservas biológicas de Itaipú, casas modernas de élite, seguridad",
        pros_en: "Clean air from Itaipú forest reserves, modern upscale homes, high security",
        pros_pt: "Ar limpo das reservas de Itaipu, casas de alto padrão modernas, segurança",
        cons_es: "Costo de vida elevado en áreas cerradas premium.",
        cons_en: "High cost of living inside premium gated developments.",
        cons_pt: "Alto custo de vida dentro dos condomínios fechados de elite."
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[-54.566473, -25.405],[-54.564346,-25.400442],[-54.56765,-25.39671],[-54.573193,-25.395568],[-54.577751,-25.394798],[-54.582348,-25.394349],[-54.588839,-25.392753],[-54.595228,-25.394777],[-54.596679,-25.400143],[-54.592282,-25.405],[-54.590082,-25.407936],[-54.587968,-25.410348],[-54.587307,-25.415125],[-54.5833,-25.419972],[-54.576745,-25.419767],[-54.571868,-25.416269],[-54.56969,-25.411921],[-54.567823,-25.408546],[-54.566473,-25.405]]]
      }
    },

    // === SAN BERNARDINO ===
    {
      type: "Feature",
      properties: {
        id: "aqua-village",
        city: "san-bernardino",
        name: "Aqua Village & Insignia Club",
        center: [-57.310, -25.315],
        safety: "muy-seguro",
        safetyText_es: "Excelente (Máxima exclusividad residencial vacacional)",
        safetyText_en: "Excellent (Maximum vacation residential exclusivity)",
        safetyText_pt: "Excelente (Máxima exclusividade residencial de veraneio)",
        rentPrice: 2800,
        rentText_es: "$1,500 - $4,000 USD/mes (Anual) / Verano: hasta $15,000",
        rentText_en: "$1,500 - $4,000 USD/mo (Annual) / Summer: up to $15,000",
        rentText_pt: "$1.500 - $4.000 USD/mês (Anual) / Verão: até $15.000",
        pros_es: "Laguna artificial Crystal Lagoons, playa privada, seguridad perimetral de primer nivel",
        pros_en: "Crystal Lagoons crystal-clear lagoon, private beach, high-level perimeter security",
        pros_pt: "Lagoa artificial Crystal Lagoons, praia privada, segurança de ponta 24hs",
        cons_es: "Precios inflados por estacionalidad veraniega extrema (Diciembre a Febrero)",
        cons_en: "Extremely high seasonal inflation in summer months (Dec to Feb)",
        cons_pt: "Preços inflacionados pela extrema sazonalidade do verão (Dezembro a Fevereiro)"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[-57.294532, -25.315],[-57.299172,-25.311847],[-57.302754,-25.310136],[-57.304133,-25.30687],[-57.307198,-25.302287],[-57.313302,-25.300017],[-57.319683,-25.301582],[-57.321476,-25.307296],[-57.321491,-25.311654],[-57.322188,-25.315],[-57.323015,-25.31879],[-57.323,-25.323727],[-57.318209,-25.326375],[-57.31256,-25.326615],[-57.307725,-25.325323],[-57.302188,-25.325824],[-57.296536,-25.324038],[-57.292864,-25.31999],[-57.294532,-25.315]]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "puerta-del-lago",
        city: "san-bernardino",
        name: "Puerta del Lago & El Cortijo",
        center: [-57.289, -25.300],
        safety: "muy-seguro",
        safetyText_es: "Excelente (Casas quintas residenciales arboladas)",
        safetyText_en: "Excellent (Wooded residential vacation estates)",
        safetyText_pt: "Excelente (Casas de campo residenciais arborizadas)",
        rentPrice: 1000,
        rentText_es: "$600 - $1,500 USD/mes",
        rentText_en: "$600 - $1,500 USD/month",
        rentText_pt: "$600 - $1.500 USD/mês",
        pros_es: "Amplios patios con piscina y quincho, calma total ideal para el retiro",
        pros_en: "Large yards with swimming pools and grills, peaceful retirement spot",
        pros_pt: "Grandes quintais com piscina e churrasqueira, calmaria ideal para aposentados",
        cons_es: "Ruidos de fiestas juveniles los fines de semana de verano",
        cons_en: "Noisy summer parties during summer weekends",
        cons_pt: "Barulho de festas de jovens nos fins de semana de verão"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[-57.274771, -25.3],[-57.279902,-25.297351],[-57.280942,-25.294591],[-57.281667,-25.28984],[-57.285773,-25.285359],[-57.292525,-25.284008],[-57.297939,-25.287614],[-57.299481,-25.292964],[-57.300737,-25.296582],[-57.301392,-25.3],[-57.303685,-25.304276],[-57.301461,-25.308365],[-57.296304,-25.31012],[-57.291205,-25.310006],[-57.286465,-25.3115],[-57.281066,-25.310994],[-57.274652,-25.309631],[-57.27242,-25.304828],[-57.274771,-25.3]]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "ciervo-cua",
        city: "san-bernardino",
        name: "Ciervo Cuá & Centro",
        center: [-57.270, -25.320],
        safety: "muy-seguro",
        safetyText_es: "Excelente (Zona urbana y de retiro muy pacífica)",
        safetyText_en: "Excellent (Very peaceful urban and retirement area)",
        safetyText_pt: "Excelente (Área urbana e de retiro muito tranquila)",
        rentPrice: 650,
        rentText_es: "$450 - $900 USD/mes",
        rentText_en: "$450 - $900 USD/month",
        rentText_pt: "$450 - $900 USD/mês",
        pros_es: "Cercanía a cafeterías premium, supermercados y vida cívica del pueblo",
        pros_en: "Walking distance to premium cafes, supermarkets and town life",
        pros_pt: "Próximo a cafeterias premium, supermercados e à vida pacata da vila",
        cons_es: "En invierno (Abril a Septiembre) se vuelve muy solitario con pocos comercios abiertos",
        cons_en: "In winter (April to Sept) it becomes extremely quiet with fewer open shops",
        cons_pt: "No inverno (Abril a Setembro) torna-se muito isolado com pouco comércio aberto"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[-57.254888, -25.32],[-57.255076,-25.315654],[-57.258818,-25.312494],[-57.263632,-25.311176],[-57.267881,-25.310388],[-57.272494,-25.308685],[-57.278887,-25.307686],[-57.284857,-25.310027],[-57.286286,-25.315258],[-57.283591,-25.32],[-57.278573,-25.322496],[-57.278002,-25.325372],[-57.277105,-25.329845],[-57.273327,-25.335096],[-57.266681,-25.335056],[-57.262199,-25.33081],[-57.259221,-25.327236],[-57.257212,-25.323723],[-57.254888,-25.32]]]
      }
    },
    // --- NUEVOS ENCLAVES SANBER, ALTOS, YPACARAÍ, AREGUÁ ---
    {
      type: "Feature",
      properties: {
        id: "sanber-toledo-altos",
        city: "san-bernardino",
        name: "Toledo House (Loma Altos)",
        center: [-57.265, -25.295],
        safety: "muy-seguro",
        safetyText_es: "Excelente (Máxima exclusividad residencial natural)",
        safetyText_en: "Excellent (Maximum natural residential exclusivity)",
        safetyText_pt: "Excelente (Máxima exclusividade residencial de montanha)",
        rentPrice: 1100,
        rentText_es: "$700 - $1,600 USD/mes",
        rentText_en: "$700 - $1,600 USD/month",
        rentText_pt: "$700 - $1.600 USD/mês",
        pros_es: "Espectaculares vistas de cerros, entorno campestre de lujo, casas boutique de primer nivel",
        pros_en: "Spectacular views of hills, premium countryside setting, boutique homes",
        pros_pt: "Vistas espetaculares das montanhas, ambiente de campo de luxo, casas boutique",
        cons_es: "Lejos de supermercados del centro, requiere movilidad independiente.",
        cons_en: "Far from downtown supermarkets, requires private transportation.",
        cons_pt: "Longe de supermercados do centro, exige meio de transporte próprio."
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[-57.247936, -25.295],[-57.248254,-25.290124],[-57.253679,-25.2874],[-57.259535,-25.287427],[-57.263142,-25.286571],[-57.267436,-25.283947],[-57.27357,-25.283125],[-57.280323,-25.284714],[-57.282408,-25.289931],[-57.279404,-25.295],[-57.276074,-25.298224],[-57.273128,-25.300456],[-57.272372,-25.305215],[-57.267969,-25.308468],[-57.26209,-25.308202],[-57.257982,-25.304724],[-57.254855,-25.30181],[-57.250139,-25.299327],[-57.247936,-25.295]]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "ypacarai-centro",
        city: "san-bernardino",
        name: "Ypacaraí Centro",
        center: [-57.285, -25.402],
        safety: "seguro",
        safetyText_es: "Seguro (Tranquila ciudad de clase media con arraigo histórico)",
        safetyText_en: "Safe (Quiet middle-class town with historical roots)",
        safetyText_pt: "Seguro (Cidade de classe média tranquila e histórica)",
        rentPrice: 450,
        rentText_es: "$300 - $600 USD/mes",
        rentText_en: "$300 - $600 USD/month",
        rentText_pt: "$300 - $600 USD/mês",
        pros_es: "Ambiente familiar apacible, bajo costo de vida, folclore local del ferrocarril",
        pros_en: "Peaceful family atmosphere, low cost of living, local historic train folklore",
        pros_pt: "Ambiente familiar calmo, baixo custo de vida, folclore local da ferrovia",
        cons_es: "Red vial interna algo desgastada, pocas opciones de ocio comercial.",
        cons_en: "Somewhat worn internal road network, few commercial leisure options.",
        cons_pt: "Ruas internas um pouco desgastadas, poucas opções de lazer comercial."
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[-57.269709, -25.402],[-57.272454,-25.398347],[-57.2771,-25.396697],[-57.278597,-25.393128],[-57.28208,-25.38875],[-57.288537,-25.385952],[-57.294941,-25.388226],[-57.297308,-25.393738],[-57.295712,-25.398881],[-57.294822,-25.402],[-57.297755,-25.405714],[-57.297762,-25.410567],[-57.294255,-25.414824],[-57.28772,-25.41434],[-57.282504,-25.413324],[-57.277685,-25.412136],[-57.272445,-25.410428],[-57.268352,-25.406847],[-57.269709,-25.402]]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "aregua-centro",
        city: "san-bernardino",
        name: "Areguá Centro",
        center: [-57.385, -25.312],
        safety: "seguro",
        safetyText_es: "Seguro (Ciudad colonial, artística y de descanso de fin de semana)",
        safetyText_en: "Safe (Colonial, artistic town and weekend getaway hotspot)",
        safetyText_pt: "Seguro (Cidade colonial, artística e refúgio de fim de semana)",
        rentPrice: 550,
        rentText_es: "$350 - $750 USD/mes",
        rentText_en: "$350 - $750 USD/month",
        rentText_pt: "$350 - $750 USD/mês",
        pros_es: "Casonas coloniales con gran patrimonio cultural, ferias de artesanía y frutilla, aire puro",
        pros_en: "Historic colonial houses, craft and strawberry fairs, clean air",
        pros_pt: "Casarões coloniais históricos, feiras de artesanato e morango, ar puro",
        cons_es: "Grave contaminación biológica del lago Ypacaraí que impide bañarse, tráfico denso los domingos.",
        cons_en: "Severe biological pollution in Lake Ypacaraí prohibiting swimming, heavy Sunday traffic.",
        cons_pt: "Grave poluição biológica do lago Ypacaraí (banho proibido), trânsito pesado aos domingos."
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[-57.36936, -25.312],[-57.375028,-25.309096],[-57.376818,-25.306507],[-57.378383,-25.302831],[-57.382071,-25.29871],[-57.388416,-25.296502],[-57.393464,-25.300272],[-57.39601,-25.304609],[-57.398018,-25.308209],[-57.398804,-25.312],[-57.400607,-25.316544],[-57.396718,-25.319866],[-57.392353,-25.322188],[-57.387159,-25.321796],[-57.38291,-25.321485],[-57.377023,-25.323053],[-57.370328,-25.321849],[-57.366563,-25.317368],[-57.36936,-25.312]]]
      }
    },

    // === ENCRAWNACIÓN ===
    {
      type: "Feature",
      properties: {
        id: "encarnacion-playa",
        city: "encarnacion",
        name: "Playa San José & Costanera",
        center: [-55.875, -27.335],
        safety: "muy-seguro",
        safetyText_es: "Excelente (Máxima percepción de seguridad del país a orillas del río)",
        safetyText_en: "Excellent (Highest safety perception in the country, by the river)",
        safetyText_pt: "Excelente (Maior percepção de segurança do país à beira-rio)",
        rentPrice: 900,
        rentText_es: "$600 - $1,300 USD/mes",
        rentText_en: "$600 - $1,300 USD/month",
        rentText_pt: "$600 - $1.300 USD/mês",
        pros_es: "Playa fluvial de primer nivel, costanera limpia y caminable de 25 km, seguridad excelente",
        pros_en: "World-class river beach, clean and walkable 25 km boardwalk, excellent safety",
        pros_pt: "Praia fluvial de alto nível, costanera limpa e caminhável de 25 km, ótima segurança",
        cons_es: "Precios premium de alquiler en la zona costera, gran afluencia de turistas en verano.",
        cons_en: "Premium rental prices along the coastal strip, heavy tourist crowds in summer.",
        cons_pt: "Preços de aluguel premium na faixa costeira, grande fluxo de turistas no verão."
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[-55.859967, -27.335],[-55.863764,-27.331728],[-55.866769,-27.329475],[-55.868435,-27.325903],[-55.871794,-27.320454],[-55.878621,-27.318574],[-55.884279,-27.322143],[-55.88553,-27.327932],[-55.884569,-27.332214],[-55.885438,-27.335],[-55.888148,-27.338828],[-55.88823,-27.343881],[-55.883522,-27.346809],[-55.877746,-27.347457],[-55.872434,-27.346641],[-55.868208,-27.344411],[-55.862436,-27.343434],[-55.859383,-27.339547],[-55.859967,-27.335]]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "encarnacion-centro",
        city: "encarnacion",
        name: "Encarnación Centro",
        center: [-55.862, -27.330],
        safety: "seguro",
        safetyText_es: "Seguro (Casco urbano comercial ordenado y familiar)",
        safetyText_en: "Safe (Organized, family-friendly commercial town center)",
        safetyText_pt: "Seguro (Centro comercial urbano familiar e organizado)",
        rentPrice: 600,
        rentText_es: "$400 - $850 USD/mes",
        rentText_en: "$400 - $850 USD/month",
        rentText_pt: "$400 - $850 USD/mês",
        pros_es: "Excelente oferta gastronómica regional, bancos ágiles con pasaporte, plazas muy limpias",
        pros_en: "Excellent regional dining, smooth banking with just passport, clean public plazas",
        pros_pt: "Excelente gastronomia regional, bancos rápidos com passaporte, praças muito limpas",
        cons_es: "Tránsito algo lento en accesos comerciales fronterizos hacia Posadas.",
        cons_en: "Somewhat slow-moving traffic at commercial border access routes to Posadas (Argentina).",
        cons_pt: "Trânsito lento nas rotas de acesso da fronteira com Posadas (Argentina)."
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[-55.845736, -27.33],[-55.850296,-27.326592],[-55.854196,-27.324762],[-55.856282,-27.322076],[-55.859017,-27.316468],[-55.865416,-27.314502],[-55.871883,-27.316305],[-55.873466,-27.322303],[-55.873418,-27.326675],[-55.874051,-27.33],[-55.875018,-27.333791],[-55.874978,-27.338712],[-55.870075,-27.341189],[-55.864547,-27.341554],[-55.859668,-27.340578],[-55.85439,-27.340545],[-55.8487,-27.338928],[-55.843955,-27.335254],[-55.845736,-27.33]]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "encarnacion-mboi-kae",
        city: "encarnacion",
        name: "Barrio Mboi Ka'e",
        center: [-55.895, -27.322],
        safety: "seguro",
        safetyText_es: "Seguro (Tranquilo barrio residencial a pasos del río)",
        safetyText_en: "Safe (Quiet residential neighborhood steps from the river)",
        safetyText_pt: "Seguro (Bairro residencial calmo a poucos passos do rio)",
        rentPrice: 500,
        rentText_es: "$350 - $700 USD/mes",
        rentText_en: "$350 - $700 USD/month",
        rentText_pt: "$350 - $700 USD/mês",
        pros_es: "Excelente playa alternativa, ambiente residencial apacible, menores costos de alquiler",
        pros_en: "Excellent alternative beach, peaceful residential environment, lower rents",
        pros_pt: "Excelente praia alternativa, clima residencial calmo, menores custos de aluguel",
        cons_es: "Distante del centro comercial, se requiere coche.",
        cons_en: "Far from the commercial core, private car required.",
        cons_pt: "Afastado do centro comercial, necessita de carro."
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[-55.877047, -27.322],[-55.87939,-27.317455],[-55.884661,-27.315059],[-55.89007,-27.315169],[-55.893076,-27.313271],[-55.897785,-27.309364],[-55.904724,-27.308525],[-55.909537,-27.312241],[-55.909804,-27.317689],[-55.906606,-27.322],[-55.906275,-27.325283],[-55.905087,-27.328771],[-55.902919,-27.332973],[-55.897861,-27.334979],[-55.892474,-27.333461],[-55.888134,-27.331514],[-55.883667,-27.329608],[-55.879349,-27.326557],[-55.877047,-27.322]]]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "encarnacion-tirol",
        city: "encarnacion",
        name: "Capitán Miranda (Tirol)",
        center: [-55.795, -27.215],
        safety: "muy-seguro",
        safetyText_es: "Excelente (Zona residencial y de retiro de élite muy tranquila)",
        safetyText_en: "Excellent (Highly peaceful elite residential and retirement area)",
        safetyText_pt: "Excelente (Área residencial de elite e aposentadoria muito calma)",
        rentPrice: 650,
        rentText_es: "$450 - $900 USD/mes",
        rentText_en: "$450 - $900 USD/month",
        rentText_pt: "$450 - $900 USD/mês",
        pros_es: "Bosque nativo exuberante, piscinas naturales, clima templado en invierno, comunidad alemana consolidada",
        pros_en: "Lush native forest, natural spring pools, mild winter climate, established German community",
        pros_pt: "Mata nativa exuberante, piscinas naturais, inverno ameno, comunidade alemã consolidada",
        cons_es: "Requiere movilidad independiente para compras especializadas en Encarnación.",
        cons_en: "Requires private vehicle for specialized shopping in Encarnación.",
        cons_pt: "Exige meio de transporte próprio para compras e bancos em Encarnação."
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[-55.780466, -27.215],[-55.784494,-27.211941],[-55.786955,-27.209599],[-55.787787,-27.205005],[-55.79197,-27.201254],[-55.798695,-27.198233],[-55.80395,-27.202598],[-55.805439,-27.207993],[-55.805332,-27.211992],[-55.805881,-27.215],[-55.808426,-27.218909],[-55.807669,-27.223504],[-55.803213,-27.22638],[-55.797596,-27.226777],[-55.792681,-27.225521],[-55.787673,-27.225153],[-55.782243,-27.223564],[-55.779386,-27.219546],[-55.780466,-27.215]]]
      }
    }
  ]
};

// --- DYNAMIC GEOPOLITICAL DISTRICT GENERATION ---
const getSafetyLabels = (level) => {
  if (level === 'dark_green') {
    return {
      es: "Muy Seguro / Residencial",
      en: "Very Safe / Residential",
      pt: "Muito Seguro / Residencial"
    };
  }
  if (level === 'green') {
    return {
      es: "Seguro",
      en: "Safe",
      pt: "Seguro"
    };
  }
  if (level === 'yellow') {
    return {
      es: "Precaución de noche",
      en: "Caution at night",
      pt: "Cuidado à noite"
    };
  }
  return {
    es: "Evitar estrictamente / Zona Roja",
    en: "Strictly avoid / Red Zone",
    pt: "Evitar estritamente / Zona Vermelha"
  };
};

const getRegionalText = (deptId) => {
  if (deptId === 'distrito-capital' || deptId === 'central') {
    return {
      es: "Eje urbano de alta conurbación. Precaución ante arrebatos en la vía pública por motochorros y microtráfico.",
      en: "Densely populated urban axis. Use caution regarding opportunistic street muggings and local drug-addiction issues.",
      pt: "Eixo urbano de alta densidade. Cuidado com furtos na via pública por motoqueiros e pequenos furtos."
    };
  }
  if (deptId === 'alto-parana') {
    return {
      es: "Eje comercial e industrial fronterizo. Evitar enclaves informales de contrabando fluvial de noche.",
      en: "Border industrial & commercial hub. Avoid informal river smuggling enclaves at night.",
      pt: "Eixo comercial e industrial de fronteira. Evite áreas informais de contrabando à beira-rio à noite."
    };
  }
  if (['amambay', 'canindeyu', 'concepcion'].includes(deptId)) {
    return {
      es: "Zona de frontera norte. Rutas de tránsito y disputas focalizadas de crimen organizado. Evitar caminos vecinales de noche.",
      en: "Northern border zone. Transit routes and targeted organized crime disputes. Avoid rural roads at night.",
      pt: "Zona de fronteira norte. Rotas de trânsito e conflitos de facções. Evite estradas rurais à noite."
    };
  }
  if (['presidente-hayes', 'boqueron', 'alto-paraguay'].includes(deptId)) {
    return {
      es: "Región Occidental (Chaco). Vacíos demográficos. Bajo riesgo urbano; las colonias menonitas ofrecen excelente seguridad autogestionada.",
      en: "Western Region (Chaco). Low density. Low urban crime; Mennonite colonies offer excellent self-managed safety.",
      pt: "Região Ocidental (Chaco). Baixa densidade. Baixo crime urbano; as colônias menonitas oferecem ótima segurança autogestionada."
    };
  }
  return {
    es: "Franja de estabilidad centro-sur. Economías tranquilas y fuerte control vecinal. Entorno pacífico.",
    en: "Central-southern stability belt. Quiet agricultural economies and strong neighborly ties. Peaceful environment.",
    pt: "Cinturão de estabilidade centro-sul. Economias agrícolas tranquilas e laços vizinhos fortes. Ambiente pacífico."
  };
};

const generatedFeatures = [];
let countPerDept = {};

securityData.forEach(dept => {
  const deptId = dept.id;
  const deptName = dept.department;
  countPerDept[deptId] = 0;

  const levels = ['red', 'yellow', 'green', 'dark_green'];
  levels.forEach(level => {
    const districts = dept[level] || [];
    districts.forEach(distName => {
      const cleaned = distName.split('(')[0].trim().toLowerCase();
      let coords = PREDEFINED_DISTRICTS[cleaned];

      if (!coords) {
        const center = DEPT_CENTERS[deptId] || [-58.0, -23.5];
        const placedCount = countPerDept[deptId];
        const cols = 5;
        const row = Math.floor(placedCount / cols);
        const col = placedCount % cols;
        const offsetLng = (col - (cols - 1) / 2) * 0.16;
        const offsetLat = (row - 1.5) * 0.16;
        coords = [center[0] + offsetLng, center[1] + offsetLat];
        countPerDept[deptId]++;
      }

      const labels = getSafetyLabels(level);
      const regText = getRegionalText(deptId);
      const size = 0.035;
      const [lng, lat] = coords;

      generatedFeatures.push({
        type: "Feature",
        properties: {
          id: `district-${deptId}-${cleaned.replace(/\s+/g, '-')}`,
          city: "nacional",
          departmentId: deptId,
          department: deptName,
          name: distName,
          center: [lng, lat],
          safety: level === 'red' ? 'evitar' : level === 'yellow' ? 'precaucion' : level === 'green' ? 'seguro' : 'muy-seguro',
          safetyText_es: labels.es,
          safetyText_en: labels.en,
          safetyText_pt: labels.pt,
          rentPrice: 0,
          rentText_es: "No disponible (Zonificación Rural/Distrital)",
          rentText_en: "Not available (Rural/District Zoning)",
          rentText_pt: "Não disponível (Zoneamento Rural/Distrital)",
          pros_es: `Dpto: ${deptName}. ${regText.es}`,
          pros_en: `Dept: ${deptName}. ${regText.en}`,
          pros_pt: `Estado: ${deptName}. ${regText.pt}`,
          cons_es: level === 'red' ? "Riesgo alto. Evitar desplazamientos no esenciales." : level === 'yellow' ? "Precaución nocturna aconsejada." : "Baja conflictividad registrada.",
          cons_en: level === 'red' ? "High risk. Avoid non-essential travel." : level === 'yellow' ? "Night caution advised." : "Low recorded conflict.",
          cons_pt: level === 'red' ? "Alto risco. Evite viagens não essenciais." : level === 'yellow' ? "Aconselha-se cautela noturna." : "Baixa taxa de criminalidade."
        },
        geometry: {
          type: "Polygon",
          coordinates: (function() {
            let hash = 0;
            const seedStr = deptId + '-' + cleaned;
            for (let i = 0; i < seedStr.length; i++) { hash = (hash << 5) - hash + seedStr.charCodeAt(i); hash |= 0; }
            const pseudoRand = (idx) => { const x = Math.sin(hash + idx * 9999) * 10000; return x - Math.floor(x); };
            const pts = [];
            const numPts = 16;
            for (let i = 0; i < numPts; i++) {
              const angle = (i / numPts) * 2 * Math.PI;
              const wave1 = Math.sin(angle * 3 + pseudoRand(1) * Math.PI) * 0.20;
              const wave2 = Math.cos(angle * 2 + pseudoRand(2) * Math.PI) * 0.12;
              const rFactor = 0.9 + wave1 + wave2 + (pseudoRand(i+3) - 0.5) * 0.1;
              pts.push([Number((lng + Math.cos(angle) * size * 1.1 * rFactor).toFixed(6)), Number((lat + Math.sin(angle) * size * 0.9 * rFactor).toFixed(6))]);
            }
            pts.push([pts[0][0], pts[0][1]]);
            return [pts];
          })()
        }
      });
    });
  });
});

export const NEIGHBORHOODS_DATA = {
  type: "FeatureCollection",
  features: [...staticFeatures.features, ...generatedFeatures]
};

export const CITY_COORDINATES = {
  "asuncion": { center: [-57.595, -25.285], zoom: 11.5 },
  "luque": { center: [-57.485, -25.265], zoom: 12.0 },
  "ciudad-del-este": { center: [-54.620, -25.510], zoom: 12.0 },
  "san-bernardino": { center: [-57.295, -25.312], zoom: 12.0 },
  "encarnacion": { center: [-55.866, -27.330], zoom: 12.0 },
  "nacional": { center: [-58.400, -23.400], zoom: 6.2 }
};

export const CITY_DESCRIPTIONS = {
  "asuncion": {
    es: "Guía de seguridad y costos promedio de alquiler en las zonas residenciales clave de Asunción y municipios dormitorio del área metropolitana.",
    en: "Safety guide and average rent costs in key residential areas of Asunción and commuter towns in the metropolitan area.",
    pt: "Guia de segurança e custos médios de aluguel nas principais áreas residenciais de Assunção e subúrbios da área metropolitana."
  },
  "luque": {
    es: "Explora las áreas residenciales, barrios cerrados y conectividad en la zona de expansión de Luque.",
    en: "Explore residential areas, gated communities, and connectivity in Luque's expansion zone.",
    pt: "Explore áreas residenciais, condomínios fechados e conectividade na zona de expansão de Luque."
  },
  "ciudad-del-este": {
    es: "Zonas exclusivas, microcentro comercial, Hernandarias y áreas críticas de seguridad en la Triple Frontera.",
    en: "Exclusive zones, commercial downtown, Hernandarias, and critical safety areas in the Triple Border.",
    pt: "Zonas exclusivas, centro comercial, Hernandarias e áreas críticas de segurança na Tríplice Fronteira."
  },
  "san-bernardino": {
    es: "Enclaves de verano premium, Altos, Areguá, Ypacaraí y pacíficos barrios de retiro a orillas del Lago.",
    en: "Premium summer hotspots, Altos, Areguá, Ypacaraí, and peaceful retirement areas on the shores of Lake.",
    pt: "Locais de veraneio premium, Altos, Areguá, Ypacaraí e áreas pacíficas de aposentadoria às margens do Lago."
  },
  "encarnacion": {
    es: "Explora la Perla del Sur, sus hermosas playas fluviales, la costanera y las seguras zonas residenciales de retiro en Capitán Miranda.",
    en: "Explore the Pearl of the South, its beautiful river beaches, the costanera, and safe retirement residential areas in Capitán Miranda.",
    pt: "Explore a Pérola do Sul, suas belas praias fluviais, a costanera e as áreas seguras de aposentadoria em Capitán Miranda."
  },
  "nacional": {
    es: "Cobertura de seguridad y riesgo geopolítico de los 262 municipios en los 17 departamentos de la República.",
    en: "Security and geopolitical risk coverage of the 262 municipalities across all 17 departments of the Republic.",
    pt: "Cobertura de segurança e risco geopolítico dos 262 municípios nos 17 estados da República."
  }
};

export const CITIES = [
  { key: 'asuncion', label: { es: 'Asunción', en: 'Asunción', pt: 'Assunção' } },
  { key: 'luque', label: { es: 'Luque', en: 'Luque', pt: 'Luque' } },
  { key: 'ciudad-del-este', label: { es: 'Ciudad del Este', en: 'Ciudad del Este', pt: 'Ciudad del Este' } },
  { key: 'san-bernardino', label: { es: 'San Bernardino', en: 'San Bernardino', pt: 'San Bernardino' } },
  { key: 'encarnacion', label: { es: 'Encarnación', en: 'Encarnación', pt: 'Encarnação' } },
  { key: 'nacional', label: { es: 'Nacional', en: 'National', pt: 'Nacional' } }
];
