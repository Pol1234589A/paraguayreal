import React from 'react';
import { useTranslations } from 'next-intl';
import Breadcrumb from '../../../components/UI/Breadcrumb';
import UpdatedBadge from '../../../components/UI/UpdatedBadge';
import SchemaOrg from '../../../components/SEO/SchemaOrg';
import { 
  Briefcase, 
  TrendingUp, 
  Coins, 
  Building2, 
  Factory, 
  Scale, 
  Globe, 
  Trees, 
  Compass, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Ship,
  Train
} from 'lucide-react';

export async function generateMetadata({ params: { locale } }) {
  const titles = {
    es: "Negocios e Inversión en Paraguay: Guía 2026 | ParaguayReal",
    en: "Business & Investment in Paraguay: 2026 Guide | ParaguayReal",
    pt: "Negócios e Investimentos no Paraguai: Guia 2026 | ParaguayReal"
  };

  const descriptions = {
    es: "Descubre las ventajas fiscales de Paraguay (regla 10-10-10), la Ley de Maquila para el Mercosur, la cultura de negocios y los sectores de inversión agraria e inmobiliaria.",
    en: "Discover Paraguay's tax advantages (10-10-10 rule), the Maquila Law for Mercosur access, local business culture, and agricultural and real estate investment sectors.",
    pt: "Descubra as vantagens fiscais do Paraguai (regra 10-10-10), a Lei de Maquila para o Mercosul, a cultura de negócios e os setores de investimento agrícola e imobiliário."
  };

  return {
    title: titles[locale] || titles.es,
    description: descriptions[locale] || descriptions.es
  };
}

export default function NegociosPage({ params: { locale } }) {
  const t = useTranslations();

  const breadcrumbs = [
    { label: t("Navigation.business") || "Negocios", url: "/negocios" }
  ];

  // Raw localized content database to ensure maximum detail and high-fidelity copy
  const localizedData = {
    es: {
      heroTitle: "Negocios e Inversión en Paraguay",
      heroSubtitle: "Una de las economías más estables, fiscales y dinámicas de Sudamérica. Conoce la realidad de emprender, los impuestos y las oportunidades estratégicas sin filtros.",
      investmentGrade: "Grado de Inversión (Baa3 por Moody's en 2024)",
      investmentGradeDesc: "Garantiza seguridad jurídica, estabilidad macroeconómica y atracción de capital extranjero de mediano y largo plazo.",
      demographics: "Pirámide Poblacional Joven",
      demographicsDesc: "La edad media en Paraguay es de 26 años. El 70% de la población es menor de 40 años, asegurando una fuerza laboral productiva.",
      
      taxTitle: "El Sistema Fiscal: Regla del 10-10-10",
      taxDesc: "En Paraguay el esquema impositivo es extremadamente simple, plano y directo. El país se rige bajo el principio de territorialidad, eximiendo de impuestos los ingresos generados fuera del territorio nacional.",
      taxCards: [
        {
          title: "10% IVA",
          desc: "Impuesto al Valor Agregado plano sobre productos y servicios. Para facturas profesionales es altamente deducible.",
          icon: <Coins className="w-6 h-6 text-emerald-600" />
        },
        {
          title: "10% IRE",
          desc: "Impuesto a la Renta Empresarial. La tasa de impuesto de sociedades plana para empresas que operan localmente.",
          icon: <Building2 className="w-6 h-6 text-emerald-600" />
        },
        {
          title: "10% IRP",
          desc: "Impuesto a la Renta Personal para ingresos locales que superen el mínimo imponible de fuente paraguaya.",
          icon: <Briefcase className="w-6 h-6 text-emerald-600" />
        },
        {
          title: "0% Exterior",
          desc: "Principio de territorialidad. Los fondos generados en el extranjero (servicios, trading, software) pagan tasa cero.",
          icon: <Globe className="w-6 h-6 text-emerald-600" />
        }
      ],
      taxWarning: "Deducción Simplificada: Los profesionales independientes pueden deducir gran parte de sus gastos personales anuales (como supermercado, restaurantes, viajes y vehículos) si justifican su relación con la actividad productiva.",

      maquilaTitle: "Régimen de Maquila",
      maquilaSubtitle: "La puerta de acceso libre al Mercosur",
      maquilaDesc: "El régimen de maquila de Paraguay permite a empresas extranjeras importar materia prima y maquinaria bajo suspensión de aranceles, procesarlos o ensamblarlos localmente, y exportar los productos finales pagando un impuesto único del 1% sobre el valor exportado.",
      maquilaPoints: [
        "Impuesto único del 1% sobre el valor facturado de exportación.",
        "Exención total de aranceles para importar materias primas, insumos y bienes de capital.",
        "Certificación de Origen Mercosur, que permite ingresar a mercados gigantes como Brasil y Argentina con arancel cero (evitando las tarifas de hasta el 200% aplicadas a países fuera del bloque).",
        "Costos operativos sumamente bajos, con mano de obra calificada competitiva y el costo de energía eléctrica más barato de la región."
      ],

      investTitle: "Sectores Clave y Advertencias Sinceras",
      investDesc: "No todas las inversiones son fáciles ni seguras. Expatriados y asesores locales con experiencia nos entregan un panorama honesto.",
      investSector1Title: "Mercado Inmobiliario: La Alerta de la Plusvalía",
      investSector1Desc: "Muchos promotores venden terrenos y departamentos con promesas de rápida valorización o especulación rápida. Sin embargo, residentes experimentados advierten que el mercado de reventa a corto plazo en Paraguay no es dinámico. Debido a la inmensa cantidad de tierra disponible y nuevos desarrollos con financiación propia, revender rápido suele ser difícil. La recomendación es invertir pensando en renta por alquiler (rendimientos del 6% al 8% anual en el eje corporativo) o uso propio a largo plazo, no en especulación rápida.",
      investSector2Title: "Sector Agropecuario y Ganadero",
      investSector2Desc: "Paraguay es uno de los mayores exportadores mundiales de soja, maíz y carne vacuna. La inversión en el agro o tierras productivas del Chaco o la Región Oriental es altamente rentable si se hace a través de consorcios o administradores profesionales de confianza. La carne paraguaya es reconocida internacionalmente por su calidad de exportación y costos eficientes.",

      infraTitle: "Megaproyectos que Transforman el País",
      infraDesc: "Paraguay está viviendo una revolución de conectividad continental que redefinirá la logística del Cono Sur.",
      infraGrid: [
        {
          title: "Corredor de la Ruta Bioceánica",
          desc: "Una carretera que cruza el Gran Chaco, conectando los puertos del Atlántico (Brasil) con los puertos del Pacífico (Chile). Actuará como un Canal de Panamá terrestre, revalorizando terrenos logísticos estratégicos.",
          icon: <Compass className="w-8 h-8 text-emerald-600" />
        },
        {
          title: "Tren de Cercanías",
          desc: "Un proyecto ferroviario metropolitano financiado en alianza estratégica con los Emiratos Árabes Unidos. Conectará la Estación Central de Asunción con la ciudad de Ypacaraí en su primera fase.",
          icon: <Train className="w-8 h-8 text-emerald-600" />
        },
        {
          title: "Energía 100% Renovable y Barata",
          desc: "Paraguay posee un inmenso excedente de energía eléctrica hidroeléctrica gracias a las colosales represas de Itaipú y Yacyretá. Esto atrae de forma masiva centros de datos, granjas de minería y fábricas electrointensivas.",
          icon: <Zap className="w-8 h-8 text-emerald-600" />
        }
      ],

      cultureTitle: "La Cultura de Negocios: El 'País de los Amigos'",
      cultureDesc1: "En Paraguay, las relaciones personales y la confianza son el núcleo de todo trato comercial. El país funciona en gran medida bajo dinámicas de relaciones estrechas. Los pitches fríos o reuniones de negocios apuradas rara vez tienen éxito.",
      cultureDesc2: "Un negocio exitoso en Paraguay suele iniciarse compartiendo un tereré, conversando sobre la familia y conociéndose mutuamente. Además, existe una alta valoración por la transparencia: colocar el nombre real de los fundadores en las oficinas corporativas denota seriedad y compromiso con el mercado local.",
      ctaBlog: "Leer Guías de Negocios en el Blog",
      warningHeader: "Advertencia Legal"
    },
    en: {
      heroTitle: "Business & Investment in Paraguay",
      heroSubtitle: "One of the most stable, tax-friendly, and dynamic economies in South America. Get the unfiltered reality on entrepreneurship, taxes, and strategic opportunities.",
      investmentGrade: "Investment Grade (Baa3 by Moody's in 2024)",
      investmentGradeDesc: "Ensures legal security, macroeconomic stability, and attracts medium- and long-term foreign capital.",
      demographics: "Young Population Pyramid",
      demographicsDesc: "The median age in Paraguay is 26. Over 70% of the population is under 40, guaranteeing a highly productive workforce.",
      
      taxTitle: "Tax System: The 10-10-10 Rule",
      taxDesc: "Paraguay's tax framework is extremely simple, flat, and direct. The country operates on a territorial tax basis, meaning any income generated outside of Paraguay is completely tax-exempt.",
      taxCards: [
        {
          title: "10% VAT",
          desc: "Flat Value Added Tax on goods and services. For professional service invoices, it is highly deductible.",
          icon: <Coins className="w-6 h-6 text-emerald-600" />
        },
        {
          title: "10% IRE",
          desc: "Corporate Income Tax. The flat corporate rate for businesses operating locally.",
          icon: <Building2 className="w-6 h-6 text-emerald-600" />
        },
        {
          title: "10% IRP",
          desc: "Personal Income Tax applied on local income exceeding the tax threshold from Paraguayan sources.",
          icon: <Briefcase className="w-6 h-6 text-emerald-600" />
        },
        {
          title: "0% Foreign",
          desc: "Territoriality principle. Income generated abroad (exports of services, trading, software) is tax-free.",
          icon: <Globe className="w-6 h-6 text-emerald-600" />
        }
      ],
      taxWarning: "Simplified Deductions: Independent professionals can deduct a large portion of their personal annual expenses (such as groceries, restaurants, travel, and vehicles) if linked to their productive activity.",

      maquilaTitle: "Maquila Regime",
      maquilaSubtitle: "The duty-free gateway to Mercosur",
      maquilaDesc: "Paraguay's Maquila regime allows foreign companies to import raw materials and machinery duty-free, process or assemble them locally, and re-export the final products paying a single flat tax of 1% on the export value.",
      maquilaPoints: [
        "Single flat tax of 1% on the invoiced export value.",
        "Full tariff exemption on raw materials, components, and capital goods imports.",
        "Mercosur Certificate of Origin, enabling duty-free entry into Brazil and Argentina (bypassing tariffs up to 200% for non-block countries).",
        "Extremely competitive operating costs, skilled labor, and the lowest electricity rates in the region."
      ],

      investTitle: "Key Sectors & Honest Warnings",
      investDesc: "Not all investments are straightforward or safe. Experienced expats and local advisors share an honest outlook.",
      investSector1Title: "Real Estate: The Capital Gains Warning",
      investSector1Desc: "Many developers sell land and apartments promising quick appreciation. However, seasoned residents warn that the short-term resale market in Paraguay is slow. Due to massive land availability and continuous new developments with in-house developer financing, quick resales are difficult. The recommendation is to invest for rental yields (6% to 8% annually in Asunción's corporate hub) or long-term personal use, rather than quick speculation.",
      investSector2Title: "Agriculture & Livestock",
      investSector2Desc: "Paraguay is a leading global exporter of soy, corn, and beef. Investments in agricultural land in the Chaco or Eastern Region are highly lucrative when managed by trusted professional operators. Paraguayan beef is internationally praised for its export quality and cost-efficient production.",

      infraTitle: "Megaprojects Transforming the Country",
      infraDesc: "Paraguay is undergoing a connectivity revolution that will redefine logistics in South America's Southern Cone.",
      infraGrid: [
        {
          title: "Bioceanic Corridor Highway",
          desc: "A highway crossing the Gran Chaco, connecting Atlantic ports (Brazil) with Pacific ports (Chile). It will act as a land-based Panama Canal, boosting strategic logistics land values.",
          icon: <Compass className="w-8 h-8 text-emerald-600" />
        },
        {
          title: "Commuter Rail Project",
          desc: "A metropolitan rail system funded in partnership with the United Arab Emirates. It will connect Asunción Central Station to the city of Ypacaraí in its first phase.",
          icon: <Train className="w-8 h-8 text-emerald-600" />
        },
        {
          title: "Cheap, 100% Renewable Energy",
          desc: "Paraguay has an immense surplus of clean hydroelectric power from the Itaipú and Yacyretá dams, attracting data centers, crypto-mining farms, and power-intensive factories.",
          icon: <Zap className="w-8 h-8 text-emerald-600" />
        }
      ],

      cultureTitle: "Business Culture: The 'Country of Friends'",
      cultureDesc1: "In Paraguay, personal relationships and trust are at the core of every business transaction. The country runs heavily on close social circles. Cold pitches or rushed meetings rarely succeed.",
      cultureDesc2: "A successful venture in Paraguay often begins with sharing a tereré, talking about family, and building rapport. Transparency is highly valued: placing the actual names of the founders on corporate office doors signals serious long-term commitment.",
      ctaBlog: "Read Business Guides on the Blog",
      warningHeader: "Legal Disclaimer"
    },
    pt: {
      heroTitle: "Negócios e Investimentos no Paraguai",
      heroSubtitle: "Uma das economias mais estáveis, fiscais e dinâmicas da América do Sul. Conheça a realidade sobre empreendedorismo, impostos e oportunidades estratégicas sem filtros.",
      investmentGrade: "Grau de Investimento (Baa3 pela Moody's em 2024)",
      investmentGradeDesc: "Garante segurança jurídica, estabilidade macroeconômica e atração de capital estrangeiro de médio e longo prazo.",
      demographics: "Pirâmide Populacional Jovem",
      demographicsDesc: "A idade média no Paraguai é de 26 anos. Cerca de 70% da população tem menos de 40 anos, garantindo força de trabalho produtiva.",
      
      taxTitle: "Sistema Tributário: Regra 10-10-10",
      taxDesc: "No Paraguai o esquema de impostos é extremamente simples, plano e direto. O país opera sob o princípio da territorialidade fiscal, isentando de tributos os rendimentos gerados fora do território nacional.",
      taxCards: [
        {
          title: "10% IVA",
          desc: "Imposto sobre o Valor Agregado plano para bens e serviços. Altamente dedutível para notas fiscais de serviços profissionais.",
          icon: <Coins className="w-6 h-6 text-emerald-600" />
        },
        {
          title: "10% IRE",
          desc: "Imposto sobre a Renta Empresarial. A alíquota corporativa plana para empresas que operam localmente.",
          icon: <Building2 className="w-6 h-6 text-emerald-600" />
        },
        {
          title: "10% IRP",
          desc: "Imposto sobre a Renta Pessoal aplicado a receitas locais que ultrapassem o teto de isenção local.",
          icon: <Briefcase className="w-6 h-6 text-emerald-600" />
        },
        {
          title: "0% Exterior",
          desc: "Princípio da territorialidade. Fundos obtidos no exterior (serviços internacionais, trading, software) pagam taxa zero.",
          icon: <Globe className="w-6 h-6 text-emerald-600" />
        }
      ],
      taxWarning: "Dedução Simplificada: Profissionais independentes podem deduzir grande parte das despesas pessoais anuais (supermercado, restaurantes, viagens e veículos) se relacionadas à sua atividade produtiva.",

      maquilaTitle: "Regime de Maquila",
      maquilaSubtitle: "A porta de acesso livre ao Mercosul",
      maquilaDesc: "O regime de maquila do Paraguai permite que empresas estrangeiras importem matérias-primas e maquinário com suspensão de tarifas, processem ou montem localmente e reexportem com imposto único de 1% sobre o valor exportado.",
      maquilaPoints: [
        "Imposto plano único de 1% sobre o valor faturado de exportação.",
        "Isenção total de tarifas de importação de matérias-primas, insumos e bens de capital.",
        "Certificado de Origem Mercosul, permitindo a entrada no Brasil e Argentina com tarifa zero (evitando impostos de até 200% para países fora do bloco).",
        "Custos operacionais baixos, mão de obra qualificada competitiva e a tarifa elétrica mais barata da região."
      ],

      investTitle: "Setores-Chave e Alertas Honestos",
      investDesc: "Nem todos os investimentos são fáceis ou seguros. Expatriados e consultores locais com experiência entregam uma perspectiva realista.",
      investSector1Title: "Mercado Imobiliário: O Alerta da Valorização",
      investSector1Desc: "Muitos corretores vendem lotes e apartamentos prometendo lucros rápidos com a valorização de mercado. No entanto, residentes alertam que o mercado de revenda a curto prazo no Paraguai não é dinâmico. Pela imensa oferta de terrenos e lançamentos com financiamento direto, revender rápido é difícil. A recomendação é investir focado em renda por aluguel (retornos de 6% a 8% ao ano no eixo corporativo) ou uso próprio de longo prazo, não em especulação rápida.",
      investSector2Title: "Setor Agrícola e Pecuário",
      investSector2Desc: "O Paraguai é um dos maiores exportadores globais de soja, milho e carne bovina. Investimentos em terras produtivas no Chaco ou Região Oriental são altamente lucrativos quando administrados por operadoras de confiança. A carne paraguaia é internacionalmente prestigiada pela alta qualidade e produção eficiente.",

      infraTitle: "Megaprojetos que Transformam o País",
      infraDesc: "O Paraguai está vivenciando uma revolução na infraestrutura de transportes que redefinirá a logística na América do Sul.",
      infraGrid: [
        {
          title: "Corredor da Rota Biooceânica",
          desc: "Rodovia que cruza o Chaco, conectando portos do Atlântico (Brasil) aos portos do Pacífico (Chile). Funcionará como um Canal do Panamá terrestre, valorizando terras logísticas estratégicas.",
          icon: <Compass className="w-8 h-8 text-emerald-600" />
        },
        {
          title: "Trem de Subúrbio",
          desc: "Projeto ferroviário metropolitano financiado em parceria estratégica com os Emirados Árabes Unidos. Conectará a Estação Central de Assunção à cidade de Ypacaraí na primeira fase.",
          icon: <Train className="w-8 h-8 text-emerald-600" />
        },
        {
          title: "Energia 100% Limpa e Barata",
          desc: "O Paraguai possui excedente gigantesco de energia elétrica limpa gerada pelas hidrelétricas de Itaipu e Yacyretá, atraindo data centers, mineração de criptomoedas e indústrias.",
          icon: <Zap className="w-8 h-8 text-emerald-600" />
        }
      ],

      cultureTitle: "Cultura de Negócios: O 'País dos Amigos'",
      cultureDesc1: "No Paraguai, as relações pessoais e a confiança mútua são a base de qualquer negócio. O país opera fortemente sob círculos sociais próximos. Reuniões rápidas ou propostas frias raramente dão resultado.",
      cultureDesc2: "Uma parceria de sucesso no Paraguai geralmente começa compartilhando um tereré, conversando sobre a família e estabelecendo conexões. A transparência é valorizada: colocar o nome real dos fundadores nas portas do escritório demonstra compromisso sério e de longo prazo.",
      ctaBlog: "Ler Guias de Negócios no Blog",
      warningHeader: "Aviso Legal"
    }
  };

  const data = localizedData[locale] || localizedData.es;

  // JSON-LD business page schema for search engines
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": data.heroTitle,
    "description": data.heroSubtitle,
    "url": `https://paraguayreal.com/${locale}/negocios`,
    "mainEntity": {
      "@type": "GovernmentService",
      "serviceType": "Investments and Taxation in Paraguay",
      "provider": {
        "@type": "GovernmentOrganization",
        "name": "ParaguayReal Local Business Guide"
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16 select-none">
      <SchemaOrg schema={pageSchema} />
      
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white py-12 sm:py-16 px-4 border-b border-emerald-900/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-slate-500/10 rounded-full blur-3xl -ml-20 -mb-20"></div>
        
        <div className="max-w-5xl mx-auto space-y-6 relative z-10">
          <Breadcrumb items={breadcrumbs} locale={locale} />
          
          <div className="space-y-3">
            <span className="bg-emerald-500/20 text-emerald-300 text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30 uppercase tracking-wider">
              {data.updated}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white max-w-3xl">
              {data.heroTitle}
            </h1>
          </div>
          <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl font-light">
            {data.heroSubtitle}
          </p>

          {/* Quick indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 max-w-3xl border-t border-slate-700/50">
            <div className="flex gap-3 bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs font-bold text-slate-100">{data.investmentGrade}</h3>
                <p className="text-[11px] text-slate-400 leading-normal mt-0.5">{data.investmentGradeDesc}</p>
              </div>
            </div>
            <div className="flex gap-3 bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition">
              <TrendingUp className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs font-bold text-slate-100">{data.demographics}</h3>
                <p className="text-[11px] text-slate-400 leading-normal mt-0.5">{data.demographicsDesc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-12">
        
        {/* Section 1: Taxes */}
        <section className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display flex items-center gap-2">
              <Coins className="w-6 h-6 text-emerald-600" />
              <span>{data.taxTitle}</span>
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {data.taxDesc}
            </p>
          </div>

          {/* Tax Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.taxCards.map((card, idx) => (
              <div key={idx} className="bg-slate-50/50 hover:bg-slate-50 border border-slate-100 p-5 rounded-xl transition flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="p-2 bg-emerald-50 w-fit rounded-lg border border-emerald-100">
                    {card.icon}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 font-display">{card.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Tax Tip Alert box */}
          <div className="flex gap-3 bg-emerald-50/40 p-4 rounded-xl border border-emerald-100 text-emerald-800 text-xs leading-relaxed">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <p>{data.taxWarning}</p>
          </div>
        </section>

        {/* Section 2: Maquila Regime */}
        <section className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-2">
              <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full uppercase leading-none">
                {data.maquilaSubtitle}
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display flex items-center gap-2">
                <Factory className="w-6 h-6 text-emerald-600" />
                <span>{data.maquilaTitle}</span>
              </h2>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              {data.maquilaDesc}
            </p>

            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              {data.maquilaPoints.map((point, idx) => (
                <li key={idx} className="flex gap-2.5 items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-2"></span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-emerald-950 p-6 rounded-2xl text-white space-y-4 border border-emerald-900 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl"></div>
            <h3 className="text-base font-bold font-display text-emerald-300">Mercosur Export Hub</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-light">
              {locale === 'es' && "Muchas empresas internacionales fabrican piezas o ensamblan productos en Paraguay para reexportar a Brasil y Argentina, sorteando la pesada burocracia de importación de dichos países. Esta ventaja de triangulación es única."}
              {locale === 'en' && "Many international firms manufacture or assemble parts in Paraguay to re-export to Brazil and Argentina, bypassing the massive import bureaucracies. This triangulation benefit is unmatched."}
              {locale === 'pt' && "Muitas empresas internacionais fabricam peças ou montam produtos no Paraguai para reexportar ao Brasil e Argentina, contornando a burocracia e tarifas de importação. Esta triangulação é única."}
            </p>
            <div className="flex gap-3 pt-3 border-t border-slate-700/50 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              <div className="flex items-center gap-1">
                <Ship className="w-3.5 h-3.5" />
                <span>Mercosur</span>
              </div>
              <span>|</span>
              <div className="flex items-center gap-1">
                <Scale className="w-3.5 h-3.5" />
                <span>1% Flat Tax</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Honest Warnings & Sectors */}
        <section className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-amber-500" />
              <span>{data.investTitle}</span>
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {data.investDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Warning 1: Real estate speculation */}
            <div className="bg-amber-50/20 border border-amber-200/50 p-6 rounded-xl space-y-3 hover:shadow-sm transition">
              <h3 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
                <Building2 className="w-5 h-5 text-amber-600" />
                <span>{data.investSector1Title}</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-light">
                {data.investSector1Desc}
              </p>
              <div className="flex items-center gap-1.5 text-xs text-amber-800 font-bold bg-amber-50 px-2.5 py-1 rounded w-fit">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>{locale === 'es' ? "Advertencia de Plusvalía Rápida" : locale === 'pt' ? "Aviso de Lucro Rápido" : "Speculation Warning"}</span>
              </div>
            </div>

            {/* Sector 2: Agriculture */}
            <div className="bg-emerald-50/10 border border-emerald-100 p-6 rounded-xl space-y-3 hover:shadow-sm transition">
              <h3 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
                <Trees className="w-5 h-5 text-emerald-700" />
                <span>{data.investSector2Title}</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-light">
                {data.investSector2Desc}
              </p>
              <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-bold bg-emerald-50 px-2.5 py-1 rounded w-fit">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
                <span>{locale === 'es' ? "Sector Altamente Productivo" : locale === 'pt' ? "Setor Altamente Produtivo" : "Highly Productive"}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Infrastructure */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-emerald-600" />
              <span>{data.infraTitle}</span>
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {data.infraDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.infraGrid.map((item, idx) => (
              <div key={idx} className="bg-white border border-slate-100 p-6 rounded-xl shadow-sm space-y-4 hover:shadow-md transition">
                <div className="p-3 bg-emerald-50 w-fit rounded-lg border border-emerald-100">
                  {item.icon}
                </div>
                <h3 className="text-base font-bold text-slate-900 font-display leading-snug">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Trust and Culture */}
        <section className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 bg-emerald-50 rounded-2xl p-6 border border-emerald-100 text-center space-y-3">
            <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center border border-emerald-200 text-emerald-600 text-2xl">
              🤝
            </div>
            <h3 className="text-base font-bold text-slate-900 font-display">El Factor Social</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-light">
              {locale === 'es' && "Un asado, un tereré y una charla cordial valen más que el mejor dossier técnico corporativo. La relación precede a la transacción."}
              {locale === 'en' && "A barbecue, a tereré, and a friendly conversation are worth more than the best technical business deck. Rapport comes before transaction."}
              {locale === 'pt' && "Um churrasco, um tereré e uma conversa cordial valem mais do que o melhor dossiê técnico. O relacionamento precede a transação."}
            </p>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display">
              {data.cultureTitle}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {data.cultureDesc1}
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              {data.cultureDesc2}
            </p>
          </div>
        </section>

        {/* Link back to blog */}
        <div className="text-center pt-4">
          <a
            href={`/${locale}/blog/cuanto-cuesta-vivir-en-paraguay-2025`}
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-emerald-700 text-white font-bold text-sm px-6 py-3 rounded-xl shadow transition select-none cursor-pointer"
          >
            <span>{data.ctaBlog}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-slate-200/80 pt-6 text-[10px] text-slate-400 text-center max-w-2xl mx-auto leading-relaxed">
          <strong>{data.warningHeader}:</strong> {locale === 'es' && "ParaguayReal no brinda asesoría financiera, impositiva ni legal oficial. Las guías son meramente informativas y se basan en testimonios y leyes vigentes recopiladas de residentes y empresarios locales. Consulta con profesionales matriculados en Paraguay."}
          {locale === 'en' && "ParaguayReal does not provide official financial, tax, or legal advice. The guides are purely informative and based on testimonies and current laws collected from local residents and entrepreneurs. Consult licensed professionals in Paraguay."}
          {locale === 'pt' && "ParaguayReal não fornece consultoria financeira, fiscal ou jurídica oficial. Os guias são meramente informativos e baseados em depoimentos e leis vigentes coletados de residentes e empresários locais. Consulte profissionais licenciados no Paraguai."}
        </div>
      </div>
    </div>
  );
}
