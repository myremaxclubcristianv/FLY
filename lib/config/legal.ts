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
  platformRole:
    "Platformă tehnologică de decizie, căutare și conciergerie aeronautică privată (Private Aviation Decision, Sourcing & Concierge Platform)",
  
  // Non-carrier disclosure (mandatory for aviation brokerage & tech concierge)
  carrierDisclosure:
    "AIR este o platformă tehnologică de căutare, decizie și conciergerie aeronautică. AIR nu este un transportator aerian direct (Direct Air Carrier), nu deține aeronave operate pe propriul Certificat de Operator Aerian (AOC) și nu efectuează transporturi aeriene în regie proprie. Toate zborurile intermediate sau prezentate pe platformă sunt operate exclusiv de operatori aerieni comerciali autorizați, deținători de AOC valid emis de autoritățile aeronautice competente (AACR / EASA / autorități naționale echivalente).",

  // Configurable Legal Entity Registry (Explicitly tagged)
  entity: {
    legalName: "[CONFIGURABLE: Denumire Societate Comercială — În curs de înregistrare]",
    tradeRegisterNumber: "[CONFIGURABLE: Număr Înregistrare Registrul Comerțului — JXX/XXXX/XXXX]",
    taxIdNumber: "[CONFIGURABLE: Cod Unic de Înregistrare / CIF]",
    vatIdNumber: "[CONFIGURABLE: Număr Identificare TVA — ROXXXXXXXX]",
    shareCapital: "[CONFIGURABLE: Capital Social Subscris și Vărsat]",
    registeredOffice: "[CONFIGURABLE: Sediul Social — București, România]",
    correspondenceAddress: "[CONFIGURABLE: Adresă Corespondență — Str. ..., București, România]",
    legalRepresentative: "[CONFIGURABLE: Reprezentant Legal / Administrator]",
    primaryContactEmail: "contact@air.aero",
    legalEmail: "legal@air.aero",
    privacyEmail: "privacy@air.aero",
    dpoEmail: "[CONFIGURABLE: Responsabil Protecția Datelor — dpo@air.aero]",
    supportPhone: "[CONFIGURABLE: Linie Suport Clienți / Desk Operațional]",
  },

  // Regulatory and Competent Authorities Registry
  regulatory: {
    governingLaw: "Legislația din România și Regulamentele Uniunii Europene (UE)",
    competentCourts: "Instanțele judecătorești competente de la sediul operatorului platformei (București, România)",
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

  // Document Versioning & Audit Timestamps
  versioning: {
    effectiveDate: "11 Septembrie 2026",
    lastUpdated: "11 Septembrie 2026",
    version: "1.0.0-PROD-FOUNDATION",
    complianceReviewStatus: "PRE-LAUNCH DRAFT // LAWYER AUDIT REQUIRED PRIOR TO PUBLIC TICKETING",
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
        "Cadrul contractual general aplicabil utilizării platformei AIR, solicitărilor de zbor, cotațiilor de la operatori și serviciilor de conciergerie aeronautică.",
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
        "Transparență privind mecanismele de stocare locală (localStorage), cookie-urile strict necesare și absența modulelor de urmărire terțe neesențiale.",
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
        "Clarificarea caracterului informativ al specificațiilor aeronavelor, autonomiei, calculelor de viteză și dependenței de factori meteo și aprobări de trafic.",
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
        "Diferențierea stărilor solicitării: REQUEST, QUOTE, PRESENTED și CONFIRMED. Confirmarea zborului are loc doar prin contractul de charter încheiat cu operatorul.",
      summaryEn:
        "Distinction between REQUEST, QUOTE, PRESENTED, and CONFIRMED. Missions are confirmed only upon formal contract execution.",
    },
    {
      id: "cancellation-refunds",
      slug: "/legal/cancellation-refunds",
      titleRo: "Politica de Anulare și Rambursare",
      titleEn: "Cancellation & Refund Policy",
      category: "POLICY",
      summaryRo:
        "Condițiile aplicabile anulării zborurilor, costurile nerecuperabile (poziționare, handling, sloturi, de-icing) și termenele operatorilor AOC.",
      summaryEn:
        "Terms governing flight cancellation, non-refundable operational expenses (positioning, slots, FBO handling, de-icing), and AOC operator schedules.",
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
        "Protection of AIR trademarks, decision algorithms, editorial spreads, and attribution of third-party aerospace manufacturer trademarks.",
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
        "Angajamentul AIR pentru un web accesibil, conformitate tipografică, navigație asistată și canal de sesizare a eventualelor bariere digitale.",
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
        "Canalul dedicat pentru transmiterea solicitărilor de acces, rectificare, ștergere, restricționare sau portabilitate a datelor cu caracter personal.",
      summaryEn:
        "Dedicated protocol and form for submitting GDPR access, rectification, erasure, restriction, or portability requests.",
    },
  ] as LegalDocumentItem[],
} as const;
