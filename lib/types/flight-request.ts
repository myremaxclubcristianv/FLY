import type { DataStatus, VerifiableEntity } from "./verification";

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
  priority?: FlightPriority;
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export interface FlightOption extends VerifiableEntity {
  id: string;
  category: string;
  label: string;
  travelTime?: string;
  travelTimeStatus?: DataStatus;
  priceStatus: DataStatus;
  availabilityStatus: DataStatus;
  reasons: string[];
  tradeoffs?: string;
  recommended?: boolean;
}
