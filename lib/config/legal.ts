/**
 * AIR — Central Legal Configuration & Compliance Data Registry
 * 
 * Provides centralized, immutable metadata, entity declarations, and 
 * configurable fields for all AIR legal and compliance documents.
 * 
 * IMPORTANT: Configurable legal entity fields are explicitly tagged 
 * and must be updated with verified corporate information prior to commercial operations.
 */

export interface LegalDocumentItem {
  id: string;
  slug: string;
  titleRo: string;
  titleEn: string;
  category: "CORE" | "DISCLAIMER" | "POLICY" | "RIGHTS";
  summaryRo: string;
  summaryEn: string;
}

export const LEGAL_CONFIG = {
  brandName: "AIR",
  brandStatus: "AIR is a brand and trade name used by the platform operating entity.",
  platformRole:
    "Platformă tehnologică de decizie, căutare și conciergerie aeronautică privată (Private Aviation Decision, Sourcing & Concierge Platform)",
  
  // Non-carrier disclosure (mandatory for aviation brokerage & tech concierge)
  carrierDisclosure:
    "AIR este o platformă tehnologică de căutare, decizie și conciergerie aeronautică. AIR nu este un transportator aerian direct (Direct Air Carrier), nu deține aeronave operate pe propriul Certificat de Operator Aerian (AOC) și nu efectuează transporturi aeriene în regie proprie. Toate zborurile intermediate sau prezentate pe platformă sunt operate exclusiv de operatori aerieni comerciali autorizați, deținători de AOC valid emis de autoritățile aeronautice competente (AACR / EASA / autorități naționale echivalente).",

  // Commercial Launch Gate (Readiness Registry)
  commercialLaunchGate: {
    legalEntityConfigured: false,
    companyRegistrationConfigured: false,
    taxIdentityConfigured: false,
    registeredAddressConfigured: false,
    legalRepresentativeConfigured: false,
    dpoConfigured: false,
    paymentConfigured: false,
    operatorIntegrationsConfigured: false,
    commercialTermsApproved: false,
  },

  // Configurable Legal Entity Registry (Zero Invented Data)
  entity: {
    legalName: "[NOT YET CONFIGURED — TO BE COMPLETED BEFORE COMMERCIAL LAUNCH]",
    tradeRegisterNumber: "[NOT YET CONFIGURED — TO BE COMPLETED BEFORE COMMERCIAL LAUNCH]",
    taxIdNumber: "[NOT YET CONFIGURED — TO BE COMPLETED BEFORE COMMERCIAL LAUNCH]",
    vatIdNumber: "[NOT YET CONFIGURED — TO BE COMPLETED BEFORE COMMERCIAL LAUNCH]",
    shareCapital: "[NOT YET CONFIGURED — TO BE COMPLETED BEFORE COMMERCIAL LAUNCH]",
    registeredOffice: "[NOT YET CONFIGURED — TO BE COMPLETED BEFORE COMMERCIAL LAUNCH]",
    correspondenceAddress: "[NOT YET CONFIGURED — TO BE COMPLETED BEFORE COMMERCIAL LAUNCH]",
    legalRepresentative: "[NOT YET CONFIGURED — TO BE COMPLETED BEFORE COMMERCIAL LAUNCH]",
    primaryContactEmail: "[NOT YET CONFIGURED — TO BE COMPLETED BEFORE COMMERCIAL LAUNCH]",
    legalEmail: "[NOT YET CONFIGURED — TO BE COMPLETED BEFORE COMMERCIAL LAUNCH]",
    privacyEmail: "[NOT YET CONFIGURED — TO BE COMPLETED BEFORE COMMERCIAL LAUNCH]",
    dpoEmail: "[NOT YET CONFIGURED — TO BE COMPLETED BEFORE COMMERCIAL LAUNCH]",
    supportPhone: "[NOT YET CONFIGURED — TO BE COMPLETED BEFORE COMMERCIAL LAUNCH]",
  },

  // Payment Status Truth
  payment: {
    status: "PAYMENT PROCESSING: NOT CONFIGURED",
    disclosure:
      "No payment is processed through this website unless and until an applicable payment mechanism is explicitly activated and disclosed.",
    isConfigured: false,
  },

  // Regulatory and Competent Authorities Registry
  regulatory: {
    governingLaw:
      "NOT YET CONFIGURED — The applicable governing law and competent jurisdiction will be identified in the final contractual terms applicable to the relevant AIR service.",
    competentCourts:
      "NOT YET CONFIGURED — Determined by the final applicable charter terms and corporate seat upon commercial launch.",
    supervisoryAuthorityGdpr: {
      name: "Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP)",
      address: "B-dul G-ral. Gheorghe Magheru 28-30, Sector 1, cod poștal 010336, București, România",
      website: "https://www.dataprotection.ro",
      email: "anspdcp@dataprotection.ro",
      phone: "+40.318.059.211",
    },
    aviationAuthority: {
      name: "Autoritatea Aeronautică Civilă Română (AACR) / Agenția Uniunii Europene pentru Siguranța Aviației (EASA)",
      website: "https://www.caa.ro",
    },
    consumerProtectionAuthority: {
      name: "Autoritatea Națională pentru Protecția Consumatorilor (ANPC)",
      website: "https://anpc.ro",
      infocons: "+40 21 9551",
    },
    alternativeDisputeResolution: {
      sal: "https://anpc.ro/ce-este-sal/",
      sol: "https://ec.europa.eu/consumers/odr",
    },
  },

  // Statutory Disclaimers
  disclaimers: {
    generalLegalAdvice:
      "These pages provide general information about the AIR platform and are not a substitute for legal advice. Final legal documents should be reviewed and approved by qualified legal counsel before commercial launch.",
    generalLegalAdviceRo:
      "Aceste pagini oferă informații generale privind platforma AIR și nu înlocuiesc asistența juridică de specialitate. Documentele juridice finale vor fi revizuite și aprobate de avocați calificați înainte de lansarea comercială.",
    accessibilityPrinciples:
      "AIR is designed with accessibility principles in mind and is continuously improved against recognized accessibility guidance.",
  },

  // Document Versioning & Audit Timestamps
  versioning: {
    effectiveDate: "11 Septembrie 2026",
    lastUpdated: "11 Septembrie 2026",
    version: "1.0.0-PROD-FOUNDATION",
    complianceReviewStatus: "PRE-LAUNCH DRAFT // LAWYER REVIEW REQUIRED PRIOR TO COMMERCIAL LAUNCH",
  },

  // Complete Registry of Legal Documents
  documents: [
    {
      id: "terms",
      slug: "/legal/terms",
      titleRo: "Termeni și Condiții Generale",
      titleEn: "General Terms & Conditions",
      category: "CORE",
      summaryRo:
        "Cadrul general aplicabil utilizării platformei AIR, solicitărilor de zbor, cotațiilor de la operatori și serviciilor de conciergerie aeronautică.",
      summaryEn:
        "Contractual framework governing platform usage, mission planning requests, operator quotations, and concierge services.",
    },
    {
      id: "privacy",
      slug: "/legal/privacy",
      titleRo: "Politica de Confidențialitate (GDPR)",
      titleEn: "Privacy Policy (GDPR)",
      category: "CORE",
      summaryRo:
        "Detalierea prelucrării datelor cu caracter personal în conformitate cu Regulamentul (UE) 2016/679 (GDPR), drepturile persoanelor vizate și destinatarii datelor.",
      summaryEn:
        "Comprehensive disclosure of personal data processing under EU GDPR 2016/679, data subject rights, and operator data sharing.",
    },
    {
      id: "cookies",
      slug: "/legal/cookies",
      titleRo: "Politica privind Modulele Cookie și Stocarea Tehnică",
      titleEn: "Cookie & Technical Storage Policy",
      category: "POLICY",
      summaryRo:
        "Transparență privind mecanismele de stocare locală (localStorage), tokenurile tehnice de sesiune și absența modulelor de urmărire terțe publicitare.",
      summaryEn:
        "Transparency regarding local storage mechanisms, strictly necessary session tokens, and zero non-essential third-party tracking.",
    },
    {
      id: "aviation-disclaimer",
      slug: "/legal/aviation-disclaimer",
      titleRo: "Declinare a Răspunderii Aeronautice",
      titleEn: "Aviation Specification Disclaimer",
      category: "DISCLAIMER",
      summaryRo:
        "Clarificarea caracterului informativ al specificațiilor aeronavelor, autonomiei, calculelor de viteză și autorității suverane a comandantului (PIC).",
      summaryEn:
        "Informational status of aircraft specifications, range benchmarks, runway limits, and crew operational determinations.",
    },
    {
      id: "charter-disclaimer",
      slug: "/legal/charter-disclaimer",
      titleRo: "Declinare Cotații și Rezervări Charter",
      titleEn: "Charter Quotation & Booking Disclaimer",
      category: "DISCLAIMER",
      summaryRo:
        "Diferențierea stărilor solicitării: REQUESTED, SOURCING, QUOTES_RECEIVED, AIR_REVIEW, PRESENTED și CONFIRMED. Confirmarea zborului are loc doar prin contractul de charter încheiat cu operatorul titular de AOC.",
      summaryEn:
        "Distinction between REQUESTED, SOURCING, QUOTES_RECEIVED, AIR_REVIEW, PRESENTED, and CONFIRMED. Missions are confirmed only upon formal contract execution.",
    },
    {
      id: "cancellation-refunds",
      slug: "/legal/cancellation-refunds",
      titleRo: "Politica de Anulare și Rambursare",
      titleEn: "Cancellation & Refund Policy",
      category: "POLICY",
      summaryRo:
        "Condițiile aplicabile anulării solicitărilor și zborurilor, dependența de contractul operatorului AOC și informarea privind lipsa procesării plăților online pe website.",
      summaryEn:
        "Terms governing cancellation requests, dependency on AOC carrier charter agreements, and disclosure regarding unconfigured online payment processing.",
    },
    {
      id: "intellectual-property",
      slug: "/legal/intellectual-property",
      titleRo: "Proprietate Intelectuală și Drepturi de Autor",
      titleEn: "Intellectual Property & Copyright",
      category: "CORE",
      summaryRo:
        "Protecția mărcii AIR, software-ului, algoritmilor de decizie, conținutului editorial și recunoașterea mărcilor terțe ale producătorilor de aeronave.",
      summaryEn:
        "Protection of AIR trade name, decision algorithms, editorial spreads, and attribution of third-party aerospace manufacturer trademarks.",
    },
    {
      id: "acceptable-use",
      slug: "/legal/acceptable-use",
      titleRo: "Politica de Utilizare Acceptabilă",
      titleEn: "Acceptable Use Policy",
      category: "POLICY",
      summaryRo:
        "Reguli de conduită pe platformă, interdicția solicitărilor frauduloase, securitatea sistemelor și sancțiunile pentru abuzuri.",
      summaryEn:
        "Standards of platform conduct, prohibition of fraudulent flight inquiries, security restrictions, and misuse penalties.",
    },
    {
      id: "accessibility",
      slug: "/legal/accessibility",
      titleRo: "Declarație de Accesibilitate Web",
      titleEn: "Web Accessibility Statement",
      category: "POLICY",
      summaryRo:
        "Angajamentul AIR pentru un web accesibil, conformitate tipografică, navigație semantică și canal de raportare.",
      summaryEn:
        "AIR commitment to accessible web standards, semantic markup, keyboard accessibility, and feedback reporting channels.",
    },
    {
      id: "gdpr-requests",
      slug: "/legal/gdpr-requests",
      titleRo: "Exercitarea Drepturilor GDPR",
      titleEn: "GDPR Data Subject Rights Request",
      category: "RIGHTS",
      summaryRo:
        "Generator local de solicitări pentru exercitarea drepturilor de acces, rectificare, ștergere, restricționare sau portabilitate a datelor.",
      summaryEn:
        "Local request generator protocol and form for submitting GDPR access, rectification, erasure, restriction, or portability requests.",
    },
  ] as LegalDocumentItem[],
} as const;

