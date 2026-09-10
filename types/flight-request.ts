import { DataStatus, VerificationStatus } from "./verification";

export type FlightPriority =
  | "FASTEST"
  | "BEST_VALUE"
  | "MOST_COMFORTABLE"
  | "MOST_PRIVATE"
  | "MOST_MEMORABLE";

export type TripType = "ONE_WAY" | "ROUND_TRIP";

export type DateFlexibility =
  | "EXACT"
  | "PLUS_MINUS_1_DAY"
  | "PLUS_MINUS_3_DAYS"
  | "FLEXIBLE_MONTH";

export type BudgetPreference =
  | "VALUE_OPTIMIZED"
  | "STANDARD_CHARTER"
  | "SUPERIOR_COMFORT"
  | "ULTRA_LONG_RANGE"
  | "FLEXIBLE";

export type MissionPurpose =
  | "EXECUTIVE_BUSINESS"
  | "PRIVATE_LEISURE"
  | "MOUNTAIN_ALPINE"
  | "TIME_CRITICAL"
  | "SPECIAL_CELEBRATION"
  | "MEDICAL_REPATRIATION";

export type SpecialRequirement =
  | "HELIPAD_DIRECT"
  | "PET_FRIENDLY"
  | "SKI_BULKY_LUGGAGE"
  | "WIFI_ONBOARD"
  | "CABIN_HOSTESS"
  | "VIP_TARMAC_TRANSFER";

export type RequestLifecycleStatus =
  | "REQUESTED"
  | "SOURCING"
  | "QUOTES_RECEIVED"
  | "AIR_REVIEW"
  | "PRESENTED"
  | "CONFIRMED"
  | "CANCELLED";

export interface FlightRequest {
  id?: string;
  referenceId?: string;
  from: string;
  to: string;
  tripType: TripType;
  date: string;
  returnDate?: string;
  time?: string;
  dateFlexibility: DateFlexibility;
  passengers: number;
  budgetPreference: BudgetPreference;
  priority: FlightPriority;
  purpose: MissionPurpose;
  requirements: SpecialRequirement[];
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  status: RequestLifecycleStatus;
  createdAt: string;
}

export interface TransportOption {
  id: string;
  category: "HELICOPTER" | "TURBOPROP" | "VERY_LIGHT_JET" | "LIGHT_JET" | "MIDSIZE_JET" | "SUPER_MIDSIZE_JET" | "LARGE_CABIN_JET" | "INTERMODAL";
  categoryDisplayName: string;
  name: string;
  tagline: string;
  estimatedDuration: string;
  status: DataStatus;
  verificationStatus: VerificationStatus;
  pricingStatus: "LIVE" | "INDICATIVE" | "REQUEST";
  indicativePriceRange?: string;
  keyBenefit: string;
  suitableFor: string;
  operationalConstraints: string[];
  recommendationReason: string;
  routing: string;
  isPrimary?: boolean;
}

export interface DecisionPayload {
  missionTitle: string;
  origin: string;
  destination: string;
  passengers: number;
  tripType: TripType;
  date: string;
  returnDate?: string;
  priority: FlightPriority;
  purpose: MissionPurpose;
  dataStatus: DataStatus;
  verificationStatus: VerificationStatus;
  summaryReason: string;
  primaryOption: TransportOption;
  alternativeOptions: TransportOption[];
}

