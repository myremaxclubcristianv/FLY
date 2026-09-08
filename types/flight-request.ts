import { DataStatus } from "./verification";

export type FlightPriority =
  | "FASTEST"
  | "BEST_VALUE"
  | "MOST_COMFORTABLE"
  | "MOST_PRIVATE"
  | "MOST_MEMORABLE";

export interface FlightRequest {
  from: string;
  to: string;
  date: string;
  passengers: number;
  time?: string;
  budget?: string;
  priority: FlightPriority;
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export interface TransportOption {
  id: string;
  category: "HELICOPTER" | "TURBOPROP" | "LIGHT_JET" | "MIDSIZE_JET" | "GROUND" | "COMBINED";
  name: string;
  tagline: string;
  estimatedDuration: string;
  status: DataStatus;
  keyBenefit: string;
  suitableFor: string;
  isPrimary?: boolean;
}

export interface DecisionPayload {
  missionTitle: string;
  origin: string;
  destination: string;
  passengers: number;
  dataStatus: DataStatus;
  summaryReason: string;
  primaryOption: TransportOption;
  alternativeOptions: TransportOption[];
}
