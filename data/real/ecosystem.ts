export interface EcosystemProject {
  id: string;
  name: string;
  shortName: string;
  category:
    | "executive"
    | "aviation"
    | "real-estate"
    | "insurance"
    | "finance"
    | "technology"
    | "health"
    | "grants";
  categoryLabel: string;
  categoryLabelRo: string;
  tagline: string;
  taglineRo: string;
  description: string;
  descriptionRo: string;
  url: string;
  isPrimary?: boolean; // AIR is hero
  verified: boolean;
  statusBadge: "ACTIVE" | "VERIFIED" | "HERO";
  ctaText: string;
  ctaTextRo: string;
  metricsOrHighlight?: string;
  metricsOrHighlightRo?: string;
  disclaimer?: string;
  disclaimerRo?: string;
}

export interface EcosystemCategory {
  id: string;
  label: string;
  labelRo: string;
  description: string;
  descriptionRo: string;
}

export const ECOSYSTEM_CATEGORIES: EcosystemCategory[] = [
  {
    id: "aviation",
    label: "Aviation & Private Travel",
    labelRo: "Aviație Privată & Travel Executiv",
    description: "Core aviation concierge and high-performance flight solutions.",
    descriptionRo: "Concierge de aviație privată și soluții rapide de transport aerian.",
  },
  {
    id: "executive",
    label: "Executive & Personal Brand",
    labelRo: "Brand Executiv & Strategic",
    description: "Central brand, strategic advisory, and ecosystem governance.",
    descriptionRo: "Brand personal central, consultanță strategică și viziune de business.",
  },
  {
    id: "real-estate",
    label: "Real Estate & Construction",
    labelRo: "Imobiliare de Lux & Construcții",
    description: "Prime residential portfolios, international acquisitions, and construction intelligence.",
    descriptionRo: "Proprietăți de lux, achiziții internaționale și inteligență în construcții.",
  },
  {
    id: "insurance",
    label: "Insurance & Asset Protection",
    labelRo: "Asigurări & Protecție Patrimonială",
    description: "Personal and enterprise risk mitigation advisory.",
    descriptionRo: "Consultanță în managementul riscului și protecția activelor patrimoniale.",
  },
  {
    id: "finance",
    label: "Credit & Financial Advisory",
    labelRo: "Consultanță Credite & Finanțare",
    description: "Independent capital structuring and debt cost optimization.",
    descriptionRo: "Consultanță financiară independentă și optimizare credite ipotecare.",
  },
  {
    id: "technology",
    label: "Media, AI & Digital Platforms",
    labelRo: "Tehnologie, AI & Platforme Digitale",
    description: "Real estate intelligence OS and verified action networks.",
    descriptionRo: "Sisteme inteligente de analiză imobiliară și rețele de verificare a realizărilor.",
  },
  {
    id: "health",
    label: "Health & Longevity Intelligence",
    labelRo: "Sănătate & Longevitate",
    description: "Evidence-based wellness frameworks and health science.",
    descriptionRo: "Educație bazată pe știință, longevitate și inteligență în wellness.",
  },
  {
    id: "grants",
    label: "Subvenții & Public Grants",
    labelRo: "Subvenții & Fonduri Nerambursabile",
    description: "National platform filtering EU grants, state aid, and business funding.",
    descriptionRo: "Platformă națională pentru fonduri europene, granturi IMM și ajutoare de stat.",
  },
];

export const ECOSYSTEM_PROJECTS: EcosystemProject[] = [
  // A. Aviation (Hero)
  {
    id: "air-aviation",
    name: "AIR by Cristian Văduva",
    shortName: "AIR Private Aviation",
    category: "aviation",
    categoryLabel: "Aviation & Private Travel",
    categoryLabelRo: "Aviație Privată & Travel Executiv",
    tagline: "The easiest way to fly.",
    taglineRo: "Cea mai directă cale de a zbura.",
    description:
      "Private aviation concierge, bespoke aircraft charter coordination, empty leg ferry optimization, and aircraft sourcing advisory based at Bucharest Băneasa (LRBS).",
    descriptionRo:
      "Concierge de aviație privată, coordonare zboruri charter, optimizare zboruri ferry (empty legs) și consultanță pentru achiziția de aeronave cu baza la București Băneasa (LRBS).",
    url: "https://fly.cristianvaduva.com",
    isPrimary: true,
    verified: true,
    statusBadge: "HERO",
    ctaText: "Current Platform",
    ctaTextRo: "Platforma Curentă",
    metricsOrHighlight: "LRBS / BBU Executive Hub • Worldwide AOC Network",
    metricsOrHighlightRo: "Hub Executiv LRBS / BBU • Rețea Operatorii AOC Licențiați",
    disclaimer:
      "AIR operates as an aviation concierge and decision intelligence platform; flights are operated exclusively by licensed commercial AOC air carriers.",
    disclaimerRo:
      "AIR este o platformă de concierge aeronautic și asistență decizională; toate zborurile sunt operate exclusiv de operatori aerieni licențiați cu AOC.",
  },

  // B. Executive & Personal Brand
  {
    id: "executive-brand",
    name: "Cristian Văduva — Executive Advisory",
    shortName: "Executive",
    category: "executive",
    categoryLabel: "Executive & Personal Brand",
    categoryLabelRo: "Brand Executiv & Strategic",
    tagline: "Executive Advisor · Investor · Strategist",
    taglineRo: "Consilier Executiv · Investitor · Strateg",
    description:
      "Strategic executive advisory, high-level institutional relationships, capital structuring, cross-border deal flow, and business ecosystem leadership.",
    descriptionRo:
      "Consultanță strategică la nivel executiv, relații instituționale, structurare de capital, negocieri complexe și coordonarea ecosistemului de afaceri.",
    url: "https://executive.cristianvaduva.com",
    verified: true,
    statusBadge: "VERIFIED",
    ctaText: "Explore Executive Advisory",
    ctaTextRo: "Accesează Profilul Executiv",
    metricsOrHighlight: "Cross-Border Strategy & Capital Allocation",
    metricsOrHighlightRo: "Strategie Transfrontalieră & Alocare de Capital",
  },
  {
    id: "main-brand",
    name: "Cristian Văduva — Official Platform",
    shortName: "Cristian Văduva",
    category: "executive",
    categoryLabel: "Executive & Personal Brand",
    categoryLabelRo: "Brand Executiv & Strategic",
    tagline: "Luxury Real Estate · Monaco · Dubai · Bucharest",
    taglineRo: "Imobiliare de Lux · Monaco · Dubai · București",
    description:
      "Central personal brand platform, exclusive buyer & seller representation, portfolio advisory, market insights, and gateway to all ecosystem services.",
    descriptionRo:
      "Platforma centrală de brand, reprezentare exclusivă imobiliară, consultanță de portofoliu și punctul central de acces către toate proiectele din ecosistem.",
    url: "https://cristianvaduva.com",
    verified: true,
    statusBadge: "VERIFIED",
    ctaText: "Visit Main Platform",
    ctaTextRo: "Vizitează Platforma Centrală",
    metricsOrHighlight: "Monaco • Dubai • Bucharest Hub",
    metricsOrHighlightRo: "Punct de Prezență Monaco • Dubai • București",
  },

  // C. Real Estate & Construction
  {
    id: "homefind",
    name: "HomeFind Romania",
    shortName: "HomeFind",
    category: "real-estate",
    categoryLabel: "Real Estate & Construction",
    categoryLabelRo: "Imobiliare de Lux & Construcții",
    tagline: "Verified Real Estate Romania",
    taglineRo: "Proprietăți Imobiliare Verificate în România",
    description:
      "Curated platform for verified residential and commercial properties in Bucharest, Ilfov, and prime Romanian regions with exclusive client representation.",
    descriptionRo:
      "Platformă de proprietăți imobiliare verificate, tranzacții securizate și reprezentare exclusivă pentru cumpărători și vânzători în București, Ilfov și zone premium.",
    url: "https://homefind.cristianvaduva.com",
    verified: true,
    statusBadge: "VERIFIED",
    ctaText: "Explore HomeFind",
    ctaTextRo: "Explorează HomeFind",
    metricsOrHighlight: "100% Verified Legal Proof & Documentation",
    metricsOrHighlightRo: "Documentație și Verificare Juridică 100%",
  },
  {
    id: "aixluxury",
    name: "AiXLuxury",
    shortName: "AiXLuxury",
    category: "real-estate",
    categoryLabel: "Real Estate & Construction",
    categoryLabelRo: "Imobiliare de Lux & Construcții",
    tagline: "Luxury Real Estate Powered by Cristian Văduva",
    taglineRo: "Consultanță Imobiliară Ultra-Premium",
    description:
      "International luxury real estate advisory focusing on trophy assets, waterfront residences, architectural penthouses, and prime capital acquisitions in Monaco and Bucharest.",
    descriptionRo:
      "Portofoliu ultra-luxury de proprietăți unice, penthouse-uri remarcabile, reședințe de vacanță pe malul apei și consultanță privată pentru achiziții strategice.",
    url: "https://aixluxury.com",
    verified: true,
    statusBadge: "VERIFIED",
    ctaText: "Discover AiXLuxury",
    ctaTextRo: "Descoperă AiXLuxury",
    metricsOrHighlight: "Monaco & Bucharest Prime Portfolios",
    metricsOrHighlightRo: "Portofoliu Monaco & București",
  },
  {
    id: "dubai",
    name: "Dubai Real Estate & Investment",
    shortName: "Dubai Advisory",
    category: "real-estate",
    categoryLabel: "Real Estate & Construction",
    categoryLabelRo: "Imobiliare de Lux & Construcții",
    tagline: "Independent Dubai Market Intelligence",
    taglineRo: "Inteligență & Investiții Imobiliare în Dubai",
    description:
      "Statutory investment underwriting, developer verification, off-plan opportunities, and tax-efficient wealth preservation in the United Arab Emirates.",
    descriptionRo:
      "Cercetare independentă, verificare dezvoltatori autorizați DLD/RERA, oportunități off-plan și optimizarea randamentului investițional în Emiratele Arabe Unite.",
    url: "https://dubai.cristianvaduva.com",
    verified: true,
    statusBadge: "VERIFIED",
    ctaText: "Explore Dubai Advisory",
    ctaTextRo: "Explorează Piața Dubai",
    metricsOrHighlight: "RERA/DLD Compliance Underwriting",
    metricsOrHighlightRo: "Conformitate RERA / DLD & Asistență Directă",
  },
  {
    id: "constructions",
    name: "CONSTRUCTIONS by AiXLuxury",
    shortName: "Constructions",
    category: "real-estate",
    categoryLabel: "Real Estate & Construction",
    categoryLabelRo: "Imobiliare de Lux & Construcții",
    tagline: "Construction Intelligence for Romania's Built Environment",
    taglineRo: "Informații Structurate din Sectorul Construcțiilor",
    description:
      "Structured intelligence on verified developers, general contractors, structural engineers, and architectural practices shaping commercial and luxury developments.",
    descriptionRo:
      "Bază de cunoștințe și analiză de piață privind antreprenorii generali de construcții, dezvoltatorii verificați, inginerii și birourile de arhitectură din România.",
    url: "https://constructions.cristianvaduva.com",
    verified: true,
    statusBadge: "VERIFIED",
    ctaText: "View Construction Intelligence",
    ctaTextRo: "Accesează Portalul Construcții",
    metricsOrHighlight: "Verified Developers & Engineering Directory",
    metricsOrHighlightRo: "Director de Dezvoltatori & Inginerie Verificată",
  },

  // D. Insurance & Asset Protection
  {
    id: "insurance-advisory",
    name: "Cristian Văduva — Insurance Advisory",
    shortName: "Insurance Advisory",
    category: "insurance",
    categoryLabel: "Insurance & Asset Protection",
    categoryLabelRo: "Asigurări & Protecție Patrimonială",
    tagline: "Premium Insurance Advisor & Partner Generali România",
    taglineRo: "Consultant Asigurări Premium & Partener Generali România",
    description:
      "Strategic advisory in personal life and health insurance, corporate risk management, and business asset protection in partnership with Generali România.",
    descriptionRo:
      "Consultanță strategică în asigurări de viață, sănătate, riscuri corporative și protecția patrimoniului de afaceri, în parteneriat cu Generali România.",
    url: "https://insurance.cristianvaduva.com",
    verified: true,
    statusBadge: "VERIFIED",
    ctaText: "Consult Insurance Desk",
    ctaTextRo: "Consultanță Asigurări",
    metricsOrHighlight: "Partner Generali România • Authorized Advisor",
    metricsOrHighlightRo: "Partener Generali România • Consultant Autorizat",
    disclaimer:
      "Insurance services are provided independently through authorized insurance advisory partnerships. AIR by Cristian Văduva is an aviation platform and not an insurer or insurance broker.",
    disclaimerRo:
      "Serviciile de asigurare sunt furnizate independent prin parteneriate de consultanță autorizate. AIR este o platformă de aviație și nu este asigurător sau broker de asigurare.",
  },

  // E. Credit & Finance
  {
    id: "cv-finance",
    name: "CV Finance — Credit Advisory",
    shortName: "CV Finance",
    category: "finance",
    categoryLabel: "Credit & Financial Advisory",
    categoryLabelRo: "Consultanță Credite & Finanțare",
    tagline: "Credit Advisory & Financial Optimization",
    taglineRo: "Consultanță Credite & Optimizare Financiară",
    description:
      "Independent financial consulting for mortgage loans, strategic debt refinancing, monthly rate optimization, and structured commercial financing.",
    descriptionRo:
      "Consultanță financiară independentă pentru credite ipotecare, refinanțare strategică, optimizarea ratelor lunare și structurarea capitalului pentru investiții.",
    url: "https://credite.cristianvaduva.com",
    verified: true,
    statusBadge: "VERIFIED",
    ctaText: "Optimize Financing",
    ctaTextRo: "Optimizare Financiară",
    metricsOrHighlight: "Independent Mortgage & Refinancing Advisory",
    metricsOrHighlightRo: "Consultanță Independentă Ipotecar & Refinanțare",
  },

  // F. Media, AI & Technology Platforms
  {
    id: "aix-os",
    name: "AiX OS™ — Real Estate Intelligence",
    shortName: "AiX OS™",
    category: "technology",
    categoryLabel: "Media, AI & Digital Platforms",
    categoryLabelRo: "Tehnologie, AI & Platforme Digitale",
    tagline: "See Market Changes Faster & Make Better Decisions",
    taglineRo: "Identifică Schimbările din Piață și Ia Decizii Mai Bune",
    description:
      "Algorithmic valuation engines, real-time market pulse monitoring, yield calculators, and cadastral analytical tools evaluating real estate fair value before acquisition.",
    descriptionRo:
      "Algoritmi de evaluare a valorii reale a proprietăților, calculatoare de yield, monitorizare de piață în timp real și suport decizional cadastral avansat.",
    url: "https://os.aixluxury.com",
    verified: true,
    statusBadge: "VERIFIED",
    ctaText: "Access AiX OS™",
    ctaTextRo: "Accesează Platforma AiX OS™",
    metricsOrHighlight: "Real-Time Yield Calculators & Market Analytics",
    metricsOrHighlightRo: "Calculatoare de Yield & Analitică de Piață în Timp Real",
  },
  {
    id: "aether-network",
    name: "AETHER — Proof of Action",
    shortName: "AETHER",
    category: "technology",
    categoryLabel: "Media, AI & Digital Platforms",
    categoryLabelRo: "Tehnologie, AI & Platforme Digitale",
    tagline: "The Network for What You Actually Achieve",
    taglineRo: "Rețeaua Dedicată Realizărilor Tale Autentice",
    description:
      "Action tracking and milestone network turning real-world accomplishments into verifiable Proofs, calculating your Flex Score, and sharing authentic progress.",
    descriptionRo:
      "Rețea centrată pe execuție și rezultate: transformă acțiunile reale în dovezi verificabile (Proofs), calculează Flex Score-ul și validează progresul autentic.",
    url: "https://aether.cristianvaduva.com",
    verified: true,
    statusBadge: "VERIFIED",
    ctaText: "Discover AETHER",
    ctaTextRo: "Descoperă AETHER",
    metricsOrHighlight: "Action Proof Engine & Social Circles",
    metricsOrHighlightRo: "Motor de Validare a Execuției & Cercuri de Progres",
  },

  // G. Health & Longevity
  {
    id: "aix-health",
    name: "AiX Health — Health Intelligence",
    shortName: "AiX Health",
    category: "health",
    categoryLabel: "Health & Longevity Intelligence",
    categoryLabelRo: "Sănătate & Longevitate",
    tagline: "Evidence-Based Health Education & Longevity Intelligence",
    taglineRo: "Educație în Sănătate Bazată pe Dovezi & Longevitate",
    description:
      "Evidence-based health education, longevity research, fitness science, nutritional frameworks, supplement analysis, and wellness intelligence.",
    descriptionRo:
      "Cercetare bazată pe dovezi în știința longevității, protocoale nutriționale, analiza suplimentelor și educație structurată pentru performanță fizică și mentală.",
    url: "https://health.cristianvaduva.com",
    verified: true,
    statusBadge: "VERIFIED",
    ctaText: "Explore Health Intelligence",
    ctaTextRo: "Explorează AiX Health",
    metricsOrHighlight: "Evidence-Based Longevity & Fitness Science",
    metricsOrHighlightRo: "Cercetare Științifică în Longevitate & Nutriție",
  },

  // H. Subvenții & Public Grants
  {
    id: "subventii-romania",
    name: "SUBVENȚII România",
    shortName: "SUBVENȚII România",
    category: "grants",
    categoryLabel: "Subvenții & Public Grants",
    categoryLabelRo: "Subvenții & Fonduri Nerambursabile",
    tagline: "National Platform for Grants, EU Funding & State Aid",
    taglineRo: "Platforma Națională de Finanțări pentru Antreprenori și IMM-uri",
    description:
      "Comprehensive portal for European non-reimbursable funds, start-up grants, digitalization measures, green transition financing, AFIR interventions, and national aid schemes.",
    descriptionRo:
      "Portal național pentru granturi europene nerambursabile, finanțare start-up-uri și IMM-uri, tranziție verde, digitalizare, intervenții AFIR, plăți APIA și ajutoare de stat.",
    url: "https://subventii.cristianvaduva.com",
    verified: true,
    statusBadge: "VERIFIED",
    ctaText: "Find Grant Funding",
    ctaTextRo: "Găsește Finanțare Nerambursabilă",
    metricsOrHighlight: "EU Structural Grants & State Aid Programs",
    metricsOrHighlightRo: "Fonduri Europene Structurale & Scheme de Stat",
  },
];

export const ECOSYSTEM_CONTACT = {
  phoneInternational: "+43 650 953 6345",
  phoneRomania: "+40 767 110 439",
  email: "contact@cristianvaduva.com",
  location: "Bucharest, Romania",
  mainWebsite: "https://cristianvaduva.com",
  linktree: "https://linktr.ee/cristianvaduvarealestate",
  whatsappUrlEn:
    "https://wa.me/436509536345?text=Hello,%20I%20am%20interested%20in%20AIR%20private%20aviation%20and%20the%20Cristian%20Vaduva%20ecosystem.",
  whatsappUrlRo:
    "https://wa.me/436509536345?text=Buna%20ziua,%20sunt%20interesat%20de%20serviciile%20de%20aviatie%20AIR%20si%20ecosistemul%20Cristian%20Vaduva.",
  socials: [
    {
      platform: "Instagram",
      handle: "@cristian_vaduva_cristianv",
      url: "https://instagram.com/cristian_vaduva_cristianv",
      verified: true,
    },
    {
      platform: "Facebook",
      handle: "/CristianVaduvaCV",
      url: "https://www.facebook.com/CristianVaduvaCV",
      verified: true,
    },
    {
      platform: "LinkedIn",
      handle: "Cristian Văduva",
      url: "https://www.linkedin.com/in/cristianvăduva",
      verified: true,
    },
    {
      platform: "YouTube",
      handle: "@CristianVaduvaCV",
      url: "https://youtube.com/@CristianVaduvaCV",
      verified: true,
    },
    {
      platform: "Telegram Direct",
      handle: "@CristianVaduva",
      url: "https://t.me/CristianVaduva",
      verified: true,
    },
    {
      platform: "Telegram Channel",
      handle: "Capital Invest Cristian Văduva",
      url: "https://t.me/capitalinvestcristianvaduva",
      verified: true,
    },
    {
      platform: "TikTok",
      handle: "@cristianvaduvacv",
      url: "https://www.tiktok.com/@cristianvaduvacv",
      verified: true,
    },
    {
      platform: "X / Twitter",
      handle: "@cristianvaduvaa",
      url: "https://twitter.com/cristianvaduvaa",
      verified: true,
    },
  ],
} as const;
