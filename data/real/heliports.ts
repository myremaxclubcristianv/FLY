export type HeliportStatus =
  | "OFFICIALLY_CERTIFIED"
  | "AUTHORIZED_PRIVATE_FACILITY"
  | "LANDING_SITE_NOT_VERIFIED"
  | "RESTRICTED_OR_PROHIBITED";

export type HeliportFacilityType =
  | "CERTIFIED_HELIPORT"
  | "CERTIFIED_AERODROME_STAND"
  | "AUTHORIZED_HOSPITAL_HELIPAD"
  | "PRIVATE_ESTATE_PAD"
  | "UNVERIFIED_OFF_AIRFIELD";

export interface HeliportRecord {
  id: string;
  slug: string;
  name: string;
  officialDesignation?: string;
  icao?: string;
  facilityType: HeliportFacilityType;
  status: HeliportStatus;
  statusLabelRo: string;
  statusLabelEn: string;
  city: string;
  region: "Bucharest & Ilfov" | "Transylvania & Brașov" | "Black Sea Coast" | "Danube Delta" | "Moldavia";
  country: "Romania";
  latitude?: number;
  longitude?: number;
  coordinatesFormatted?: string;
  elevationFt?: number;
  fatospecs?: string;
  lighting?: string;
  operatingHours?: string;
  permissionRequirements: string;
  permissionRequirementsRo: string;
  operationalRestrictions: string[];
  operatorOrAuthority: string;
  sourceName: string;
  sourceUrl: string;
  effectiveCycle: string;
  lastVerifiedAt: string;
  heroImage: string;
  isOfficialPublicHeliport: boolean;
  notesRo: string;
  notesEn: string;
}

export const REAL_ROMANIA_HELIPORTS: HeliportRecord[] = [
  {
    id: "hp-tuzla-lrtz",
    slug: "tuzla-certified-heliport-lrtz",
    name: "Regional Air Services Tuzla Certified Heliport",
    officialDesignation: "Heliportul Regional Air Services Tuzla",
    icao: "LRTZ",
    facilityType: "CERTIFIED_HELIPORT",
    status: "OFFICIALLY_CERTIFIED",
    statusLabelRo: "HELIPORT CERTIFICAT AACR",
    statusLabelEn: "OFFICIALLY CERTIFIED HELIPORT",
    city: "Tuzla / Constanța",
    region: "Black Sea Coast",
    country: "Romania",
    latitude: 43.9856,
    longitude: 28.6083,
    coordinatesFormatted: "43°59'08\"N 028°36'30\"E",
    elevationFt: 18,
    fatospecs: "FATO 30 × 30 m Asphalt + Grass TLOF",
    lighting: "Night VFR Certified Omni-directional Lighting & Beacon",
    operatingHours: "HJ (Daylight Operations / Night VFR on prior coordination)",
    permissionRequirements: "Prior Permission Required (PPR) for civilian charters; full handling services on site.",
    permissionRequirementsRo: "Prior Permission Required (PPR); servicii complete de handling la sol.",
    operationalRestrictions: [
      "Mandatory PPR from Regional Air Services Tuzla",
      "Offshore energy helicopter traffic prioritization",
      "Customs & border police available upon 24h prior notification",
    ],
    operatorOrAuthority: "Regional Air Services SRL",
    sourceName: "AACR Certified Aerodromes & Heliports Register",
    sourceUrl: "https://regionalair.ro",
    effectiveCycle: "AACR Published Directory Cycle 2026",
    lastVerifiedAt: "2026-10-24",
    heroImage: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&q=80",
    isOfficialPublicHeliport: true,
    notesRo: "Cel mai activ heliport civil dedicat de pe litoralul românesc. Bază principală pentru zboruri offshore în Marea Neagră, transferuri VIP spre Delta Dunării și zboruri litorale.",
    notesEn: "The primary certified civilian helicopter base on the Romanian Black Sea coast. Serves offshore flights, VIP charter transfers to the Danube Delta, and coastal private flights.",
  },
  {
    id: "hp-lrbs-rotor",
    slug: "bucharest-baneasa-rotor-stand-lrbs",
    name: "Bucharest Băneasa Aurel Vlaicu VIP Rotor Stand",
    officialDesignation: "Platforma Elicoptere Aeroportul Internațional București Băneasa",
    icao: "LRBS",
    facilityType: "CERTIFIED_AERODROME_STAND",
    status: "OFFICIALLY_CERTIFIED",
    statusLabelRo: "STAND ELICOPTERE CERTIFICAT AEROPORT",
    statusLabelEn: "CERTIFIED AERODROME ROTOR STAND",
    city: "Bucharest",
    region: "Bucharest & Ilfov",
    country: "Romania",
    latitude: 44.5032,
    longitude: 26.1021,
    coordinatesFormatted: "44°30'12\"N 026°06'08\"E",
    elevationFt: 305,
    fatospecs: "Dedicated Executive Apron Stands with Direct Taxiway Access",
    lighting: "Full ICAO Category I Aerodrome Lighting",
    operatingHours: "H24 (Night operations subject to noise abatement rules)",
    permissionRequirements: "Eurocontrol flight plan, mandatory airport slot, and FBO handling clearance.",
    permissionRequirementsRo: "Plan de zbor Eurocontrol, slot aeroportuar și asistență FBO obligatorii.",
    operationalRestrictions: [
      "PPR mandatory through Băneasa Business Flight Terminal / RAS / Alpha Handling",
      "Strict northern departure noise abatement corridors",
      "Direct intermodal connection from incoming fixed-wing private jets",
    ],
    operatorOrAuthority: "CN Aeroporturi București SA (CNAB)",
    sourceName: "ROMATSA / CNAB AIP Romania AD 2.LRBS",
    sourceUrl: "https://www.aisro.ro",
    effectiveCycle: "AIP Romania AIRAC Cycle 2026",
    lastVerifiedAt: "2026-10-24",
    heroImage: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
    isOfficialPublicHeliport: true,
    notesRo: "Principalul punct de plecare și tranzit VIP din capitală. Permite transfer direct din avion privat în elicopter bimotor pentru destinații în Transilvania sau pe Valea Prahovei.",
    notesEn: "Premier executive rotorcraft staging gateway for Bucharest. Direct VIP intermodal transition from private jets to helicopters for missions across Romania.",
  },
  {
    id: "hp-brasov-ghimbav-lrbv",
    slug: "brasov-ghimbav-executive-helipad-lrbv",
    name: "Brașov-Ghimbav International Airport Executive Rotor Stand",
    officialDesignation: "Stand Elicoptere Aeroportul Internațional Brașov-Ghimbav",
    icao: "LRBV",
    facilityType: "CERTIFIED_AERODROME_STAND",
    status: "OFFICIALLY_CERTIFIED",
    statusLabelRo: "STAND ELICOPTERE CERTIFICAT AEROPORT",
    statusLabelEn: "CERTIFIED AERODROME ROTOR STAND",
    city: "Brașov / Ghimbav",
    region: "Transylvania & Brașov",
    country: "Romania",
    latitude: 45.7042,
    longitude: 25.5242,
    coordinatesFormatted: "45°42'15\"N 025°31'27\"E",
    elevationFt: 1739,
    fatospecs: "Concrete GA Rotor Parking Stand",
    lighting: "Full Aerodrome Night Lighting & Remote Tower ATC",
    operatingHours: "Published operational hours (Subject to NOTAM / Remote Tower schedule)",
    permissionRequirements: "Airport slot and handling coordination with Ghimbav Airport Administration.",
    permissionRequirementsRo: "Slot de operare și coordonare handling cu administrația aeroportuară.",
    operationalRestrictions: [
      "PPR and flight plan filing mandatory",
      "Proximity to mountainous terrain requires adherence to published IFR/VFR routing",
      "Immediate vehicle access to Poiana Brașov (25 min) and Bran corridor",
    ],
    operatorOrAuthority: "Consiliul Județean Brașov / R.A. AIBG",
    sourceName: "ROMATSA AIP Romania AD 2.LRBV",
    sourceUrl: "https://www.aisro.ro",
    effectiveCycle: "AIP Romania Cycle 2026",
    lastVerifiedAt: "2026-10-24",
    heroImage: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
    isOfficialPublicHeliport: true,
    notesRo: "Poarta aeriană modernă spre Transilvania. Oferă infrastructură completă de handling pentru elicoptere VIP și avioane private la poalele Carpaților.",
    notesEn: "Modern certified aviation hub serving Transylvania, Poiana Brașov ski area, and the Bran medieval corridor with complete handling support.",
  },
  {
    id: "hp-cluj-rotor-lrcl",
    slug: "cluj-napoca-airport-rotor-stand-lrcl",
    name: "Cluj-Napoca Avram Iancu Airport Rotorcraft Stand",
    officialDesignation: "Platforma Rotorcraft Aeroportul Internațional Avram Iancu Cluj",
    icao: "LRCL",
    facilityType: "CERTIFIED_AERODROME_STAND",
    status: "OFFICIALLY_CERTIFIED",
    statusLabelRo: "STAND ELICOPTERE CERTIFICAT AEROPORT",
    statusLabelEn: "CERTIFIED AERODROME ROTOR STAND",
    city: "Cluj-Napoca",
    region: "Transylvania & Brașov",
    country: "Romania",
    latitude: 46.785,
    longitude: 23.6861,
    coordinatesFormatted: "46°47'06\"N 023°41'10\"E",
    elevationFt: 1033,
    fatospecs: "Dedicated GA Apron Stand",
    lighting: "CAT II Aerodrome Lighting",
    operatingHours: "H24",
    permissionRequirements: "Slot coordination, handling agreement, and flight plan.",
    permissionRequirementsRo: "Coordonare slot, contract de handling și plan de zbor.",
    operationalRestrictions: ["PPR mandatory for General Aviation movements"],
    operatorOrAuthority: "Aeroportul Internațional Avram Iancu Cluj R.A.",
    sourceName: "ROMATSA AIP Romania AD 2.LRCL",
    sourceUrl: "https://www.aisro.ro",
    effectiveCycle: "AIP Romania Cycle 2026",
    lastVerifiedAt: "2026-10-24",
    heroImage: "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=1200&q=80",
    isOfficialPublicHeliport: true,
    notesRo: "Nod aeronautic major pentru zboruri de afaceri în nord-vestul României, conectând centrele corporative din Cluj cu restul Europei.",
    notesEn: "Key business aviation gateway in Transylvania connecting corporate regional headquarters with certified FBO and apron parking.",
  },
  {
    id: "hp-danube-delta-resorts",
    slug: "danube-delta-private-landing-locations",
    name: "Danube Delta Off-Airfield Landing Locations (Crișan / Murighiol)",
    officialDesignation: "Puncte Private de Aterizare Elicoptere — Delta Dunării",
    facilityType: "UNVERIFIED_OFF_AIRFIELD",
    status: "LANDING_SITE_NOT_VERIFIED",
    statusLabelRo: "AMPLASAMENT NECONFIRMAT // NECESITĂ AVIZ SPECIAL",
    statusLabelEn: "LANDING SITE NOT VERIFIED — REQUIRES SPECIAL CLEARANCE",
    city: "Crișan / Murighiol / Sfântu Gheorghe",
    region: "Danube Delta",
    country: "Romania",
    coordinatesFormatted: "Puncte VFR sezoniere (coordonate în funcție de resort)",
    permissionRequirements: "Mandatory environmental permit from ARBDD, landowner written consent, and AOC operator safety reconnaissance.",
    permissionRequirementsRo: "Aviz de mediu ARBDD obligatoriu, acord scris proprietar teren și evaluare de siguranță a operatorului AOC.",
    operationalRestrictions: [
      "NOT an officially published public heliport in AIP Romania",
      "Strict protection rules enforced by the Danube Delta Biosphere Reserve Authority (ARBDD)",
      "VFR daylight flights only; twin-engine turbine helicopter with flotation gear strongly recommended",
      "Landing feasibility must be verified on a mission-by-mission basis with certified air operators",
    ],
    operatorOrAuthority: "Amplasamente private / Resorturi turistice independente",
    sourceName: "Aeronautical Due Diligence / ARBDD Environmental Guidelines",
    sourceUrl: "http://arbdd.gov.ro",
    effectiveCycle: "Advisory Guidance 2026",
    lastVerifiedAt: "2026-10-24",
    heroImage: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80",
    isOfficialPublicHeliport: false,
    notesRo: "ATENȚIE: Resorturile din Delta Dunării nu sunt heliporturi publice certificate. Aterizarea unui elicopter este strict condiționată de autorizațiile de mediu ARBDD, acordul proprietarului și evaluarea de risc a comandantului de bord.",
    notesEn: "CAUTION: Danube Delta private resorts are not certified public heliports. Any off-airfield helicopter touchdown requires environmental permits from ARBDD, landowner permission, and operator risk assessment.",
  },
  {
    id: "hp-transylvania-castle-pads",
    slug: "transylvania-castle-landing-access",
    name: "Transylvania Estate & Alpine Access Points (Bran / Peleș Corridor)",
    officialDesignation: "Zone Aterizare Off-Airfield Valea Prahovei / Bran",
    facilityType: "UNVERIFIED_OFF_AIRFIELD",
    status: "LANDING_SITE_NOT_VERIFIED",
    statusLabelRo: "AMPLASAMENT NECONFIRMAT // NECESITĂ ACORD LOCAL",
    statusLabelEn: "LANDING SITE NOT VERIFIED — ADVANCE PERMISSION REQUIRED",
    city: "Bran / Sinaia / Râșnov",
    region: "Transylvania & Brașov",
    country: "Romania",
    coordinatesFormatted: "Zone montane VFR specifice fiecărei proprietăți",
    permissionRequirements: "Advance landowner permission, local authority notification, and PIC mountain landing qualification.",
    permissionRequirementsRo: "Acord scris al proprietarului de teren, notificare autorități locale și calificare de munte a pilotului comandant.",
    operationalRestrictions: [
      "NOT an officially certified public heliport",
      "VFR daylight flights only under favorable alpine meteorological conditions",
      "Strict minimum safe altitudes over protected monuments and residential clusters",
      "Touchdown clearance must be evaluated by the operating AOC carrier",
    ],
    operatorOrAuthority: "Proprietăți private / Domenii istorice",
    sourceName: "AIR Operational Due Diligence",
    sourceUrl: "https://www.caa.ro",
    effectiveCycle: "Advisory Guidance 2026",
    lastVerifiedAt: "2026-10-24",
    heroImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    isOfficialPublicHeliport: false,
    notesRo: "Zborurile spre proprietăți private sau castele din Transilvania se operează exclusiv ca misiuni speciale cu aprobare prealabilă. AIR nu declară niciun domeniu privat drept heliport autorizat fără certificat oficial.",
    notesEn: "Private estate and alpine castle transfers operate exclusively on a prior-approval basis. AIR does not list private properties as authorized heliports without official documentation.",
  },
];

export class HeliportRepository {
  public static getAllHeliports(): HeliportRecord[] {
    return REAL_ROMANIA_HELIPORTS;
  }

  public static getHeliportBySlug(slug: string): HeliportRecord | null {
    return REAL_ROMANIA_HELIPORTS.find((h) => h.slug === slug) || null;
  }

  public static getHeliportsByRegion(region: string): HeliportRecord[] {
    return REAL_ROMANIA_HELIPORTS.filter((h) => h.region.toLowerCase().includes(region.toLowerCase()));
  }

  public static getCertifiedHeliports(): HeliportRecord[] {
    return REAL_ROMANIA_HELIPORTS.filter((h) => h.status === "OFFICIALLY_CERTIFIED");
  }

  public static getHeliportByIcao(icao: string): HeliportRecord | null {
    return REAL_ROMANIA_HELIPORTS.find((h) => h.icao?.toUpperCase() === icao.toUpperCase()) || null;
  }
}
