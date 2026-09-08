import { VerifiableEntity } from "./verification";

export type { DataStatus, VerificationStatus, VerifiableEntity } from "./verification";
export type { FlightRequest, FlightPriority, FlightOption } from "./flight-request";

export interface Operator extends VerifiableEntity {
  id: string;
  name: string;
  country: string;
  operator_type: string;
}

export interface Aircraft extends VerifiableEntity {
  id: string;
  manufacturer: string;
  model: string;
  category: string;
  passengers: number | null;
  operator_id: string | null;
}

export interface Experience extends VerifiableEntity {
  id: string;
  title: string;
  description: string;
  location: string;
  duration: string;
  passengers: string;
}

export interface Destination extends VerifiableEntity {
  id: string;
  name: string;
  country: string;
  description: string;
}

export interface Quote extends VerifiableEntity {
  id: string;
  flight_request_id: string;
  operator_id: string | null;
  amount: number | null;
  currency: string;
}
