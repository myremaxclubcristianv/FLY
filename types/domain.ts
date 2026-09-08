import { DataStatus, VerificationStatus, DataSource } from "./verification";

export type OperatorType =
  | "CHARTER"
  | "HELICOPTER"
  | "EXECUTIVE_AVIATION"
  | "AIRCRAFT_MANAGEMENT"
  | "FLIGHT_SCHOOL"
  | "EXPERIENCE_PROVIDER"
  | "HANDLING"
  | "MAINTENANCE"
  | "OTHER";

export type AircraftCategory =
  | "HELICOPTER"
  | "VERY_LIGHT_JET"
  | "LIGHT_JET"
  | "MIDSIZE_JET"
  | "SUPER_MIDSIZE_JET"
  | "LARGE_CABIN_JET"
  | "TURBOPROP"
  | "EXECUTIVE_AIRCRAFT";

export type AviationLocationType =
  | "AIRPORT"
  | "HELIPORT"
  | "AERODROME"
  | "FBO"
  | "PAD";

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

export interface Operator {
  id: string;
  slug: string;
  legalName: string;
  displayName: string;
  country: string;
  baseLocationId?: string;
  baseAirportName?: string;
  operatorType: OperatorType;
  website?: string;
  contactEmail?: string;
  contactPhone?: string;
  fleetCount?: number;
  servicesSummary?: string[];
  verificationStatus: VerificationStatus;
  dataStatus: DataStatus;
  source?: DataSource;
  lastVerifiedAt?: string;
}

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
  homeBaseLocationId?: string;
  homeBaseName?: string;
  operatorId?: string;
  operatorDisplayName?: string;
  cabinHighlights?: string;
  verificationStatus: VerificationStatus;
  dataStatus: DataStatus;
  source?: DataSource;
  lastVerifiedAt?: string;
}

export interface AviationLocation {
  id: string;
  slug: string;
  name: string;
  type: AviationLocationType;
  iata?: string;
  icao?: string;
  city: string;
  country: string;
  latitude?: number;
  longitude?: number;
  operatingHours?: string;
  restrictions?: string[];
  fboFacilities?: string[];
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

export interface SearchResultItem {
  id: string;
  type: "OPERATOR" | "AIRCRAFT" | "LOCATION" | "EXPERIENCE" | "DESTINATION" | "JOURNAL";
  title: string;
  subtitle?: string;
  href: string;
  dataStatus: DataStatus;
  categoryTag?: string;
}
