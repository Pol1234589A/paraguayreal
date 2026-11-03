'use client';

import React, { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import Breadcrumb from '../../../../components/UI/Breadcrumb';
import UpdatedBadge from '../../../../components/UI/UpdatedBadge';
import { 
  ShieldAlert, Shield, Search, Sliders, ChevronDown, CheckCircle, 
  MapPin, AlertTriangle, AlertOctagon, HelpCircle, Eye, Info
} from 'lucide-react';
import securityData from '../../../../../data/security.json';

const REGIONAL_REPORTS = {
  asuncionCentral: {
    title: {
      es: "Distrito Capital y Central: Conurbación y Densidad de Riesgo",
      en: "Capital District and Central: Conurbation & Risk Density",
      pt: "Distrito Capital e Central: Conurbação e Densidade de Risco"
    },
    text: {
      es: "Siendo el eje urbano y de mayor densidad demográfica del país, Asunción y su conurbación departamental (Luque, Lambaré, San Lorenzo, Limpio) concentran el mayor índice de criminalidad común. El riesgo delictivo está dominado por asaltos de oportunidad en la vía pública perpetrados por delincuentes en motocicleta ('motochorros') y hurtos vinculados a microtráfico urbano ('chespis'). La fragmentación socio-espacial es pronunciada: barrios premium como Manorá o Carmelitas coexisten a pocos metros de asentamientos informales de alta precariedad en las riberas del río (Chacarita y los Bañados), determinando una transición abrupta de la seguridad en pocas cuadras.",
      en: "As the urban core and most densely populated axis of the country, Asunción and its conurbation (Luque, Lambaré, San Lorenzo, Limpio) concentrate the highest rate of common crime. Street robberies by motorcycle thieves ('motochorros') and petty theft linked to urban drug addiction ('chespis') dominate the risk profile. Socio-spatial polarization is high: premium neighborhoods like Manorá and Carmelitas sit adjacent to highly precarious riverside informal settlements (Chacarita and the Bañados), creating abrupt safety transitions within blocks.",
      pt: "Como eixo urbano e área de maior densidade demográfica do país, Assunção e sua conurbação (Luque, Lambaré, San Lorenzo, Limpio) concentram os maiores índices de criminalidade comum. O risco está dominado por assaltos na via pública por motoqueiros ('motochorros') e pequenos furtos ligados à dependência química urbana ('chespis'). A polarização socioespacial é acentuada: bairros de luxo como Manorá ou Carmelitas coexistem a poucos metros de favelas precárias na beira do rio (Chacarita e Bañados), determinando transições abruptas de segurança em poucas quadras."
    }
  },
  tripleFrontera: {
    title: {
      es: "Alto Paraná: Eje Comercial e Industrial de la Triple Frontera",
      en: "Alto Paraná: Commercial and Industrial Hub of the Triple Border",
      pt: "Alto Paraná: Eixo Comercial e Industrial da Tríplice Fronteira"
    },
    text: {
      es: "La geografía de la seguridad en Alto Paraná está dictada por su permeabilidad fronteriza con Brasil. En Ciudad del Este, el microcentro experimenta una alta concentración comercial diurna propensa a hurtos y estafas complejas de contrabando, pero se deshabita por completo tras las 17:00 hs, disparando el riesgo de asaltos. Además, existe una negativa formal de plataformas de transporte (Bolt/Uber) de entrar a zonas rojas de contrabando fluvial como el barrio San Rafael o Remansito. En contraposición, la ciudad alberga el Paraná Country Club en Hernandarias, el enclave residencial más seguro y resguardado de la región mediante control militar y seguridad armada.",
      en: "Alto Paraná's safety geography is governed by its border permeability with Brazil. In Ciudad del Este, the commercial center is active by day but empties out entirely after 5:00 PM, increasing robbery risks. Gated transport exclusions occur, with Bolt and Uber drivers refusing to enter river smuggling red zones like San Rafael or Remansito. Conversely, the department hosts the Paraná Country Club in Hernandarias, the safest and most militarized gated community in the region with private armed security.",
      pt: "A geografia de segurança em Alto Paraná é ditada pela fronteira porosa com o Brasil. Em Ciudad del Este, o centro comercial registra alta atividade diurna propensa a furtos, mas fica deserto após as 17h, aumentando o risco de assaltos. Existe inclusive recusa formal de motoristas de aplicativo (Bolt/Uber) em entrar em zonas vermelhas de contrabando fluvial como o bairro San Rafael ou Remansito. Por outro lado, a região abriga o Paraná Country Club em Hernandarias, o condomínio fechado mais seguro do país com controle militarizado."
    }
  },
  fronteraNorte: {
    title: {
      es: "Frontera Norte: Rutas de Tránsito y Cultivos Ilícitos",
      en: "Northern Border: Transit Routes and Illicit Crops",
      pt: "Fronteira Norte: Rotas de Trânsito e Cultivos Ilícitos"
    },
    text: {
      es: "Los departamentos fronterizos de Amambay, Canindeyú y Concepción constituyen el corredor de tránsito de sustancias ilícitas hacia el mercado de Brasil. En esta región opera la influencia directa de facciones criminales transnacionales de gran envergadura (PCC y Comando Vermelho). El riesgo se traduce en sicariato focalizado, disputas territoriales y debilidad institucional en zonas rurales. Si bien los cascos urbanos consolidados como Pedro Juan Caballero y Saltos del Guairá presentan resguardo y actividad comercial de día, las carreteras secundarias e interdepartamentales deben evitarse estrictamente durante el horario nocturno.",
      en: "The border departments of Amambay, Canindeyú, and Concepción serve as the primary transit corridor for illicit goods toward Brazil. Major transnational criminal factions (PCC and Comando Vermelho) exert direct influence here. Risks involve targeted hits (sicariato), territorial disputes, and weak institutional presence in rural zones. While urban centers like Pedro Juan Caballero and Saltos del Guairá are safe by day, secondary roads and inter-departmental highways should be avoided at night.",
      pt: "Os estados fronteiriços de Amambay, Canindeyú e Concepción constituem o corredor de trânsito de substâncias ilícitas rumo ao Brasil. A influência de facções transnacionais (PCC e Comando Vermelho) é direta nesta ecorregião, gerando riscos de pistolagem (sicariato), disputas e fraca presença estatal nas áreas rurais. Embora os centros urbanos tenham movimento comercial seguro de dia, as rodovias secundárias devem ser totalmente evitadas à noite."
    }
  },
  chacoCentral: {
    title: {
      es: "Chaco Central y Occidental: Vacíos demográficos y Autogestión",
      en: "Central and Western Chaco: Demographic Voids & Self-Management",
      pt: "Chaco Central e Ocidental: Vazios Demográficos e Autogestão"
    },
    text: {
      es: "La Región Occidental o Chaco presenta el desafío de enormes superficies territoriales desérticas con muy baja densidad demográfica. El riesgo aquí no proviene de la criminalidad común urbana, sino del abigeato organizado de ganado y la logística aérea ilegal en pistas clandestinas aisladas en Alto Paraguay y el Chaco Seco. En este escenario, destacan los núcleos urbanos de las colonias menonitas (Filadelfia, Loma Plata, Neuland), caracterizados por sistemas excepcionales de autogestión de seguridad comunitaria, bajísimos índices de vulnerabilidad social y una seguridad humana superior al promedio nacional.",
      en: "The Western Chaco region features vast, empty territories with low population density. Risks here stem from organized cattle rustling (abigeato) and clandestine landing strip logistics in remote dry forest sectors rather than common street crime. Exceptionally, the urban cores of the Mennonite colonies (Filadelfia, Loma Plata, Neuland) feature top-tier self-managed community safety, extremely low vulnerability, and security indices well above the national average.",
      pt: "A Região Ocidental ou Chaco apresenta o desafio de vastos territórios desertos com baixíssima densidade populacional. O risco não vem do crime urbano comum, mas sim do roubo de gado (abigeato) e da logística aérea clandestina no Chaco Seco. Neste cenário, destacam-se os centros urbanos das colônias menonitas (Filadelfia, Loma Plata), caracterizados por sistemas excepcionais de autogestão de segurança comunitária e criminalidade quase nula."
    }
  },
  estabilidadSur: {
    title: {
      es: "Franja de Estabilidad: Cohesión Social y Tradición",
      en: "Stability Belt: Social Cohesion and Tradition",
      pt: "Cinturão de Estabilidade: Coesão Social e Tradição"
    },
    text: {
      es: "Los departamentos del centro-sur del país (Misiones, Paraguarí, Ñeembucú, Caazapá, Guairá y Cordillera) registran los índices de criminalidad más bajos de la República. Amparados en economías agropecuarias estables de escala familiar, comunidades de baja densidad y un tejido social tradicional de fuerte control vecinal, estos distritos ofrecen un entorno pacífico. Pilar (Ñeembucú) destaca de forma histórica por su seguridad de 'puertas abiertas', mientras que San Bernardino (Cordillera) ofrece un entorno de alta gama con fuerte refuerzo policial en los meses veraniegos.",
      en: "The central-southern departments (Misiones, Paraguarí, Ñeembucú, Caazapá, Guairá, and Cordillera) register the lowest crime rates in the Republic. Driven by stable family-scale agricultural economies, low-density communities, and a traditional social fabric with strong neighborly ties, these districts offer a peaceful environment. Pilar (Ñeembucú) is historically famous for its 'open-door' safety, while San Bernardino (Cordillera) offers high-end summer residential security with strong police patrols.",
      pt: "Os estados do centro-sul do país (Misiones, Paraguarí, Ñeembucú, Caazapá, Guairá e Cordillera) registram os menores índices de criminalidade do Paraguai. Sustentados em economias agropecuárias familiares, comunidades de baixa densidade e laços de controle vizinho tradicionais, estes distritos oferecem paz. Pilar (Ñeembucú) destaca-se pela sua segurança de 'portas abertas', e San Bernardino (Cordillera) oferece segurança de alto padrão com patrulha policial reforçada."
    }
  }
};

export default function SeguridadClientPage({ locale }) {
  const t = useTranslations();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('all');
  const [iagEnv, setIagEnv] = useState('urbano');
  const [expandedReport, setExpandedReport] = useState(null);

  const breadcrumbs = [
    { label: t("Navigation.live") || "Vivir", url: `/${locale}/vivir` },
    { label: t("Navigation.neighborhoods") || "Barrios", url: `/${locale}/vivir/barrios` },
    { label: t("Security.title") || "Portal de Seguridad", url: `/${locale}/vivir/seguridad` }
  ];

  // Weight values for IAG formula simulation
  const iagWeights = useMemo(() => {
    return iagEnv === 'urbano'
      ? { w1: 0.4, w2: 0.1, w3: 0.3, w4: 0.2, desc: "En entornos urbanos, la delincuencia común (hurtos, robos por motochorros) y la vulnerabilidad socioeconómica son los factores predominantes en la inseguridad diaria." }
      : { w1: 0.1, w2: 0.5, w3: 0.2, w4: 0.2, desc: "En zonas rurales y áreas de frontera, el crimen organizado de alta intensidad (narcotráfico, contrabando) y la falta de cobertura estatal dictan el riesgo real." };
  }, [iagEnv]);

  // Master lists filtered by active selections
  const filteredDepartments = useMemo(() => {
    if (selectedDept === 'all') return securityData;
    return securityData.filter(d => d.id === selectedDept);
  }, [selectedDept]);

  // Global search result builder
  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return [];
    
    const results = [];
    const term = searchTerm.toLowerCase().trim();

    securityData.forEach(dept => {
      // Search in red list
      dept.red.forEach(dist => {
        if (dist.toLowerCase().includes(term) || dept.department.toLowerCase().includes(term)) {
          results.push({ name: dist, department: dept.department, level: 'red', label: t ? t("Security.redTitle") : "Evitar / Zona Roja" });
        }
      });
      // Search in yellow list
      dept.yellow.forEach(dist => {
        if (dist.toLowerCase().includes(term) || dept.department.toLowerCase().includes(term)) {
          results.push({ name: dist, department: dept.department, level: 'yellow', label: t ? t("Security.yellowTitle") : "Precaución de Noche" });
        }
      });
      // Search in green list
      dept.green.forEach(dist => {
        if (dist.toLowerCase().includes(term) || dept.department.toLowerCase().includes(term)) {
          results.push({ name: dist, department: dept.department, level: 'green', label: t ? t("Security.greenTitle") : "Seguro" });
        }
      });
      // Search in dark green list
      dept.dark_green.forEach(dist => {
        if (dist.toLowerCase().includes(term) || dept.department.toLowerCase().includes(term)) {
          results.push({ name: dist, department: dept.department, level: 'dark_green', label: t ? t("Security.darkGreenTitle") : "Muy Seguro / Residencial" });
        }
      });
    });

    return results;
  }, [searchTerm, t]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 select-none space-y-8">
      <Breadcrumb items={breadcrumbs} locale={locale} />

      {/* Header Panel */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-3xl font-extrabold text-slate-900 font-display">
            {t ? t("Security.title") : "Portal de Seguridad y Riesgo por Distritos"}
          </h1>
          <UpdatedBadge />
        </div>
        <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
          {t ? t("Security.subtitle") : "Análisis cartográfico tridimensional de la seguridad pública y el riesgo geopolítico de los 262 municipios de la República."}
        </p>
      </div>

      {/* Geopolitical Threat Equation (IAG) Widget */}
      <section className="bg-slate-900 text-white rounded-2xl border border-slate-800 shadow-xl overflow-hidden p-6 relative">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none hidden md:block">
          <Sliders className="w-40 h-40" />
        </div>
        
        <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center border-b border-slate-800 pb-5 mb-5">
          <div className="space-y-1">
            <h3 className="font-extrabold text-lg flex items-center gap-2 text-emerald-400">
              <Shield className="w-5 h-5" />
              <span>{t ? t("Security.iagTitle") : "Índice de Amenaza Geopolítica (IAG)"}</span>
            </h3>
            <p className="text-xs text-slate-400 max-w-xl">
              {t ? t("Security.iagDesc") : "Fórmula matemática utilizada para ponderar los riesgos de delincuencia, crimen organizado y debilidad institucional en Paraguay."}
            </p>
          </div>
          <div className="flex gap-2 bg-slate-800 p-1 rounded-xl shrink-0">
            <button
              onClick={() => setIagEnv('urbano')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition ${
                iagEnv === 'urbano'
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t ? t("Security.envUrbano") : "Entorno Urbano"}
            </button>
            <button
              onClick={() => setIagEnv('rural')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition ${
                iagEnv === 'rural'
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t ? t("Security.envRural") : "Frontera / Rural"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Ecuación renderizada */}
          <div className="lg:col-span-7 bg-slate-950/65 p-6 rounded-xl border border-slate-800/80 flex flex-col justify-center items-center text-center py-8">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-4">
              {t ? t("Security.formulaLabel") : "Fórmula del IAG:"}
            </span>
            <div className="text-lg sm:text-2xl font-mono tracking-wide font-bold text-white leading-loose select-all">
              I<span className="text-xs align-sub">AG</span> = <span className="text-emerald-400">{iagWeights.w1}</span>·C<span className="text-xs align-sub">c</span> + <span className="text-emerald-400">{iagWeights.w2}</span>·C<span className="text-xs align-sub">o</span> + <span className="text-emerald-400">{iagWeights.w3}</span>·V<span className="text-xs align-sub">s</span> - <span className="text-emerald-400">{iagWeights.w4}</span>·E<span className="text-xs align-sub">p</span>
            </div>
            <p className="text-xs text-slate-400 mt-5 leading-relaxed max-w-md font-sans">
              {iagWeights.desc}
            </p>
          </div>

          {/* Glosario de variables */}
          <div className="lg:col-span-5 space-y-3.5 text-xs">
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-md bg-slate-800 flex items-center justify-center font-bold text-emerald-400 shrink-0 font-mono">Cc</span>
              <div>
                <span className="font-extrabold text-slate-200 block">Criminalidad Común (Cc)</span>
                <span className="text-slate-400">Incidencia de hurtos, atracos callejeros y delincuencia por motochorros.</span>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-md bg-slate-800 flex items-center justify-center font-bold text-emerald-400 shrink-0 font-mono">Co</span>
              <div>
                <span className="font-extrabold text-slate-200 block">Crimen Organizado (Co)</span>
                <span className="text-slate-400">Logística de contrabando fronterizo, rutas de narcotráfico y sicariato.</span>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-md bg-slate-800 flex items-center justify-center font-bold text-emerald-400 shrink-0 font-mono">Vs</span>
              <div>
                <span className="font-extrabold text-slate-200 block">Vulnerabilidad Social (Vs)</span>
                <span className="text-slate-400">Presencia de asentamientos precarios e informalidad en infraestructura.</span>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-md bg-slate-800 flex items-center justify-center font-bold text-emerald-400 shrink-0 font-mono">Ep</span>
              <div>
                <span className="font-extrabold text-slate-200 block">Eficacia Institucional (Ep)</span>
                <span className="text-slate-400">Poder disuasivo, comisaría local, patrullajes y autodefensa comunitaria.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* District Search Engine */}
      <section className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-4">
        <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
          <Search className="w-5 h-5 text-slate-500" />
          <span>{t ? t("Security.searchLabel") : "Buscador Universal de Distritos"}</span>
        </h3>
        <div className="relative">
          <Search className="absolute left-3.5 top-3.5 text-slate-400 w-5 h-5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t ? t("Security.searchPlaceholder") : "Ingresa el nombre de cualquier municipio o sector (ej. Chacarita, Santa Rita...)"}
            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
          />
        </div>

        {/* Search Results */}
        {searchTerm.trim() && (
          <div className="space-y-3 pt-2 animate-fadeIn">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
              {t ? t("Security.resultsFound", { count: searchResults.length }) : `${searchResults.length} distritos encontrados.`}
            </span>
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {searchResults.map((res, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 flex flex-col justify-between gap-3 hover:shadow-sm transition">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span className="font-medium truncate">{res.department}</span>
                      </div>
                      <h4 className="font-extrabold text-sm text-slate-900">{res.name}</h4>
                    </div>
                    <div>
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        res.level === 'dark_green' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200/60' :
                        res.level === 'green' ? 'bg-green-100 text-green-800 border border-green-200/60' :
                        res.level === 'yellow' ? 'bg-amber-100 text-amber-800 border border-amber-200/60' :
                        'bg-red-100 text-red-800 border border-red-200/60 animate-pulse'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          res.level === 'dark_green' ? 'bg-emerald-500' :
                          res.level === 'green' ? 'bg-green-500' :
                          res.level === 'yellow' ? 'bg-amber-500' : 'bg-red-500'
                        }`} />
                        <span>{res.label}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-xl italic">
                {t ? t("Security.noResults") : "No se encontraron distritos que coincidan con la búsqueda."}
              </div>
            )}
          </div>
        )}
      </section>

      {/* Master Matrix Department Selector */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
              <Eye className="w-5 h-5 text-emerald-600" />
              <span>Matriz Maestra de Zonificación de Riesgo</span>
            </h3>
            <p className="text-xs text-slate-500">
              Visualización por columnas del estado de seguridad y control territorial en cada departamento.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest hidden sm:inline">
              {t ? t("Security.deptSelectLabel") : "Departamento:"}
            </span>
            <div className="relative shrink-0">
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="appearance-none bg-slate-100 border border-slate-200 rounded-xl pl-4 pr-10 py-2.5 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
              >
                <option value="all">{t ? t("Security.allDepts") : "Todos los Departamentos"}</option>
                {securityData.map((d) => (
                  <option key={d.id} value={d.id}>{d.department}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3.5 top-3.5 text-slate-500 w-3.5 h-3.5 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Matrix Render */}
        <div className="space-y-6">
          {filteredDepartments.map((dept) => (
            <div key={dept.id} className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden p-6 space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h4 className="font-extrabold text-base text-slate-900">{dept.department}</h4>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  {dept.red.length + dept.yellow.length + dept.green.length + dept.dark_green.length} distritos analizados
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                
                {/* Muy Seguro / Verde Oscuro */}
                <div className="bg-emerald-50/20 p-4 rounded-xl border border-emerald-100/30 flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-xs border-b border-emerald-100/50 pb-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{t ? t("Security.darkGreenTitle") : "Muy Seguro (Verde Oscuro)"}</span>
                  </div>
                  {dept.dark_green.length > 0 ? (
                    <ul className="space-y-1 text-xs text-slate-600 font-medium">
                      {dept.dark_green.map((dist, i) => <li key={i} className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-emerald-500" />{dist}</li>)}
                    </ul>
                  ) : (
                    <span className="text-[10px] text-slate-400 italic">Ninguno</span>
                  )}
                </div>

                {/* Seguro / Verde Claro */}
                <div className="bg-green-50/20 p-4 rounded-xl border border-green-100/30 flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-green-800 font-extrabold text-xs border-b border-green-100/50 pb-2">
                    <Shield className="w-4 h-4 text-green-600 shrink-0" />
                    <span>{t ? t("Security.greenTitle") : "Seguro (Verde Claro)"}</span>
                  </div>
                  {dept.green.length > 0 ? (
                    <ul className="space-y-1 text-xs text-slate-600 font-medium">
                      {dept.green.map((dist, i) => <li key={i} className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-green-500" />{dist}</li>)}
                    </ul>
                  ) : (
                    <span className="text-[10px] text-slate-400 italic">Ninguno</span>
                  )}
                </div>

                {/* Precaución de noche / Amarillo */}
                <div className="bg-amber-50/20 p-4 rounded-xl border border-amber-100/30 flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-amber-800 font-extrabold text-xs border-b border-amber-100/50 pb-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{t ? t("Security.yellowTitle") : "Precaución (Amarillo)"}</span>
                  </div>
                  {dept.yellow.length > 0 ? (
                    <ul className="space-y-1 text-xs text-slate-600 font-medium">
                      {dept.yellow.map((dist, i) => <li key={i} className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-amber-500" />{dist}</li>)}
                    </ul>
                  ) : (
                    <span className="text-[10px] text-slate-400 italic">Ninguno</span>
                  )}
                </div>

                {/* Evitar Estrictamente / Rojo */}
                <div className="bg-red-50/20 p-4 rounded-xl border border-red-100/30 flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-red-800 font-extrabold text-xs border-b border-red-100/50 pb-2">
                    <AlertOctagon className="w-4 h-4 text-red-600 shrink-0" />
                    <span>{t ? t("Security.redTitle") : "Evitar (Rojo)"}</span>
                  </div>
                  {dept.red.length > 0 ? (
                    <ul className="space-y-1 text-xs text-slate-600 font-semibold">
                      {dept.red.map((dist, i) => <li key={i} className="flex items-center gap-1.5 text-red-950"><span className="w-1 h-1 rounded-full bg-red-500 shrink-0" />{dist}</li>)}
                    </ul>
                  ) : (
                    <span className="text-[10px] text-slate-400 italic">Ninguno</span>
                  )}
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Regional Analysis Details Accordion */}
      <section className="space-y-4">
        <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
          <Info className="w-5 h-5 text-emerald-600" />
          <span>Diagnósticos de Seguridad y Conflictividad Regional</span>
        </h3>

        <div className="space-y-3">
          {Object.keys(REGIONAL_REPORTS).map((key) => {
            const report = REGIONAL_REPORTS[key];
            const isExpanded = expandedReport === key;

            return (
              <div key={key} className="bg-white border border-slate-200/80 rounded-xl overflow-hidden shadow-sm transition">
                <button
                  onClick={() => setExpandedReport(isExpanded ? null : key)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none hover:bg-slate-50 transition"
                >
                  <span className="font-extrabold text-slate-900 text-sm">{report.title[locale] || report.title.es}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                </button>
                {isExpanded && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100/60 animate-slideDown">
                    {report.text[locale] || report.text.es}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
