import { DataStatus, VerificationStatus, DataSource } from "./verification";

export type CompanyCategory =
  | "AOC_AIR_OPERATOR"
  | "CHARTER_BROKER"
  | "FBO"
  | "GROUND_HANDLING"
  | "FLIGHT_SCHOOL"
  | "MRO"
  | "AIRCRAFT_MANAGEMENT"
  | "AIRCRAFT_SALES"
  | "AVIATION_FINANCE"
  | "AVIATION_INSURANCE"
  | "AIRPORT_OPERATOR"
  | "HELICOPTER_OPERATOR"
  | "TRAINING_ORGANIZATION"
  | "AVIATION_TECHNOLOGY"
  | "OTHER_AVIATION_SERVICES";

export type AircraftCategory =
  | "VERY_LIGHT_JET"
  | "LIGHT_JET"
  | "MIDSIZE_JET"
  | "SUPER_MIDSIZE_JET"
  | "LARGE_CABIN_JET"
  | "TURBOPROP"
  | "HELICOPTER"
  | "EXECUTIVE_AIRCRAFT";

export type AviationLocationType =
  | "AIRPORT"
  | "AERODROME"
  | "HELIPORT"
  | "HELIPAD"
  | "FBO";

export type LandingAccessStatus =
  | "CERTIFIED"
  | "PRIVATE_PRIOR_APPROVAL"
  | "LANDING_BY_PRIOR_APPROVAL"
  | "REQUEST"
  | "NOT_VERIFIED";

export type RouteType =
  | "SCHEDULED"
  | "CHARTER_MISSION"
  | "ROUTE_INTELLIGENCE"
  | "HELICOPTER_TRANSFER"
  | "INTERMODAL"
  | "REQUEST";

export type ExperienceCategory =
  | "SCENIC_FLIGHT"
  | "FIRST_FLIGHT"
  | "SUNSET"
  | "PROPOSAL"
  | "PHOTOGRAPHY"
  | "CASTLE"
  | "MOUNTAIN"
  | "EVENT"
  | "CORPORATE"
  | "GIFT_A_FLIGHT";

export type JournalCategory =
  | "AVIATION_NEWS"
  | "PRIVATE_AVIATION"
  | "AIRCRAFT"
  | "HELICOPTERS"
  | "AIRPORTS"
  | "BUSINESS_AVIATION"
  | "OWNERSHIP"
  | "CHARTER"
  | "PILOT_LIFE"
  | "TECHNOLOGY"
  | "AVIATION_FINANCE"
  | "AVIATION_INSURANCE"
  | "TRAVEL"
  | "ROMANIA_FROM_ABOVE"
  | "REGULATIONS";

export type MissionPriority =
  | "FASTEST"
  | "BEST_VALUE"
  | "MOST_COMFORTABLE"
  | "MOST_PRIVATE"
  | "MOST_MEMORABLE";

export type MissionStatus =
  | "DRAFT"
  | "SUBMITTED"
  | "ANALYZING"
  | "OPTIONS_READY"
  | "QUOTE_REQUESTED"
  | "CONFIRMED"
  | "CANCELLED";

export type QuoteStatus =
  | "DRAFT"
  | "REQUESTED"
  | "SENT"
  | "RECEIVED"
  | "UNDER_REVIEW"
  | "PRESENTED"
  | "ACCEPTED"
  | "DECLINED"
  | "EXPIRED"
  | "CANCELLED";

export interface Company {
  id: string;
  slug: string;
  legalName: string;
  displayName: string;
  country: string;
  city?: string;
  baseLocationId?: string;
  baseAirportIcao?: string;
  baseAirportName?: string;
  category: CompanyCategory;
  operatorType?: CompanyCategory;
  website?: string;
  contactEmail?: string;
  contactPhone?: string;
  aocVerified?: boolean;
  aocNumber?: string;
  fleetCount?: number;
  servicesSummary: string[];
  certifications?: string[];
  fleetModels?: string[];
  verificationStatus: VerificationStatus;
  dataStatus: DataStatus;
  source?: DataSource;
  lastVerifiedAt?: string;
}

// Backward compatibility alias
export type Operator = Company;
export type OperatorType = CompanyCategory;

export interface Aircraft {
  id: string;
  slug: string;
  registration?: string;
  manufacturer: string;
  model: string;
  category: AircraftCategory;
  passengerCapacity: number;
  baggageCapacity?: string;
  typicalCruiseSpeed?: number; // KTS
  approximateRange?: number; // NM
  cabinDimensions?: {
    lengthM?: number;
    widthM?: number;
    heightM?: number;
  };
  runwayTakeoffM?: number;
  runwayLandingM?: number;
  mtowKg?: number;
  homeBaseLocationId?: string;
  homeBaseName?: string;
  operatorId?: string;
  operatorDisplayName?: string;
  cabinHighlights?: string;
  strengths?: string[];
  limitations?: string[];
  idealProfile?: string;
  verificationStatus: VerificationStatus;
  dataStatus: DataStatus;
  source?: DataSource;
  lastVerifiedAt?: string;
}

export interface AviationLocation {
  id: string;
  slug: string;
  name: string;
  officialName?: string;
  type: AviationLocationType;
  iata?: string;
  icao?: string;
  city: string;
  country: string;
  latitude?: number;
  longitude?: number;
  runwaySpecs?: {
    lengthM?: number;
    widthM?: number;
    surface?: string;
    pcn?: string;
    designation?: string;
    physicalDimensionsNote?: string;
    declaredDistancesNote?: string;
    toraM?: number;
    todaM?: number;
    asdaM?: number;
    ldaM?: number;
  };
  operationalStatus?: "OPEN_VERIFIED" | "RESTRICTION_REPORTED" | "CLOSED_VERIFIED" | "STATUS_UNVERIFIED";
  operationalStatusNote?: string;
  operatingHours?: string;
  restrictions?: string[];
  fboFacilities?: string[];
  handlingProviders?: string[];
  fuelAvailable?: string[];
  customsImmigration?: string;
  landingAccessStatus?: LandingAccessStatus;
  verificationStatus: VerificationStatus;
  dataStatus: DataStatus;
  source?: DataSource;
  lastVerifiedAt?: string;
}


export interface RouteIntelligence {
  id: string;
  slug: string;
  title: string;
  originCity: string;
  originIcao?: string;
  originIata?: string;
  destinationCity: string;
  destinationIcao?: string;
  destinationIata?: string;
  distanceNm: number;
  routeType: RouteType;
  calculatedDuration: {
    vljet?: string;
    lightJet?: string;
    midsizeJet?: string;
    superMidsize?: string;
    heavyJet?: string;
    turboprop?: string;
    helicopter?: string;
  };
  suitabilityNotes: string;
  scheduledVsCharterNotice: string;
  airportOptions: string[];
  transferPossibilities: string[];
  recommendedAircraftSlugs: string[];
  relatedCompanySlugs: string[];
  verificationStatus: VerificationStatus;
  dataStatus: DataStatus;
  source?: DataSource;
  lastVerifiedAt?: string;
}

export interface DestinationGuide {
  id: string;
  slug: string;
  title: string;
  city: string;
  country: string;
  airports: string[];
  gaAccessNotes: string;
  fboHandlingNotes: string;
  helicopterAccessNotes: string;
  cityTransferTime: string;
  bestTimeFly: string;
  keyAttractions: string[];
  relatedRouteSlugs: string[];
  relatedAircraftSlugs: string[];
  verificationStatus: VerificationStatus;
  dataStatus: DataStatus;
  source?: DataSource;
  lastVerifiedAt?: string;
}

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: JournalCategory;
  author: string;
  publicationDate: string;
  lastUpdatedAt: string;
  readTimeMinutes: number;
  excerpt: string;
  sections: Array<{
    heading: string;
    paragraphs: string[];
  }>;
  relatedEntitySlugs?: string[];
  faq?: Array<{
    question: string;
    answer: string;
  }>;
  verificationStatus: VerificationStatus;
  dataStatus: DataStatus;
  source?: DataSource;
}

export interface AerialRegion {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  country: string;
  aerialHighlights: string[];
  landingAccessNote: string;
  nearbyCertifiedAirports: string[];
  transferOptions: string[];
  weatherConsiderations: string;
  verificationStatus: VerificationStatus;
  dataStatus: DataStatus;
  source?: DataSource;
  lastVerifiedAt?: string;
}

export interface Experience {
  id: string;
  slug: string;
  title: string;
  category: ExperienceCategory;
  locationId?: string;
  locationName: string;
  duration?: string;
  capacity?: number;
  description: string;
  highlights?: string[];
  operatorId?: string;
  verificationStatus: VerificationStatus;
  dataStatus: DataStatus;
  source?: DataSource;
  lastVerifiedAt?: string;
}

export interface FlightMission {
  id: string;
  referenceId?: string;
  origin: string;
  destination: string;
  date: string;
  preferredTime?: string;
  passengers: number;
  priority: MissionPriority;
  baggage?: string;
  notes?: string;
  status: MissionStatus;
  createdAt: string;
}

export interface FlightOption {
  id: string;
  missionId: string;
  aircraftId?: string;
  aircraftCategory: AircraftCategory;
  aircraftName: string;
  operatorId?: string;
  operatorName?: string;
  routing: string;
  estimatedDuration: string;
  pricingStatus: "LIVE" | "INDICATIVE" | "REQUEST";
  indicativePriceRange?: string;
  availabilityStatus: "AVAILABLE" | "REQUEST" | "UNAVAILABLE" | "UNKNOWN";
  verificationStatus: VerificationStatus;
  dataStatus: DataStatus;
  recommendationScore?: number;
  recommendationReason: string;
  isPrimary?: boolean;
}

export interface QuoteRequest {
  id: string;
  missionId: string;
  operatorId?: string;
  optionId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  status: QuoteStatus;
  requestedAt: string;
  responseDeadline?: string;
  quoteStatus: QuoteStatus;
  notes?: string;
}

export type ListingStatus =
  | "verified_listing"
  | "unverified_listing"
  | "illustrative_example"
  | "expired_listing";

export interface AircraftForSale {
  id: string;
  slug: string;
  title: string;
  manufacturer: string;
  model: string;
  year: number;
  category: AircraftCategory;
  passengerCapacity: number;
  rangeNm: number;
  totalHours: number;
  priceFormatted: string;
  location: string;
  sellerName: string;
  externalSource: "AVBUYER" | "GLOBALAIR" | "CONTROLLER" | "CURATED";
  externalUrl: string;
  listingStatus: ListingStatus;
  verificationStatus: VerificationStatus;
  dataStatus: DataStatus;
  lastCheckedAt: string;
  image: string;
}


export interface FlightSchool {
  id: string;
  slug: string;
  name: string;
  legalName: string;
  city: string;
  country: string;
  accreditation: string;
  easaCertified: boolean;
  coursesOffered: string[];
  fleetSummary: string;
  simulatorsAvailable: string[];
  website: string;
  contactEmail?: string;
  contactPhone?: string;
  verificationStatus: VerificationStatus;
  dataStatus: DataStatus;
  source?: DataSource;
  lastVerifiedAt?: string;
  image: string;
}

export interface AviationExplainer {
  id: string;
  slug: string;
  title: string;
  category: "REGULATORY" | "OPERATIONS" | "COMMERCIAL" | "PILOT" | "BUSINESS";
  shortDefinition: string;
  detailedExplanation: string[];
  keyTakeaways: string[];
  realWorldExample: string;
  glossaryTerms: Array<{ term: string; definition: string }>;
  authoritativeSource: string;
  image: string;
}

export interface AviationTechArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: "EVTOL" | "SAF" | "ELECTRIC_PROPULSION" | "AVIONICS" | "AAM" | "AI_IN_AVIATION";
  readTimeMinutes: number;
  publicationDate: string;
  excerpt: string;
  sections: Array<{ heading: string; paragraphs: string[] }>;
  image: string;
}

export interface PhotoEssay {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  photographer: string;
  location: string;
  publicationDate: string;
  slides: Array<{ title: string; description: string; location: string }>;
}

export interface SearchResultItem {
  id: string;
  type:
    | "COMPANY"
    | "OPERATOR"
    | "AIRCRAFT"
    | "LOCATION"
    | "ROUTE"
    | "EXPERIENCE"
    | "DESTINATION"
    | "JOURNAL"
    | "REGION"
    | "AIRCRAFT_SALE"
    | "FLIGHT_SCHOOL"
    | "EXPLAINER"
    | "TECH"
    | "PHOTO_ESSAY";
  title: string;
  subtitle?: string;
  href: string;
  dataStatus: DataStatus;
  categoryTag?: string;
}
