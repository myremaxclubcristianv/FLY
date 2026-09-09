export type ProviderConnectionStatus = "CONNECTED" | "DEGRADED" | "NOT_CONNECTED" | "MAINTENANCE" | "ERROR";
export type PricingStatus = "LIVE" | "INDICATIVE" | "REQUEST";
export type AvailabilityStatus = "AVAILABLE" | "UNAVAILABLE" | "PENDING" | "UNKNOWN" | "EXPIRED";
export type FlightTrackingStatus = "PLANNED" | "CONFIRMED" | "BOARDING" | "DEPARTED" | "AIRBORNE" | "LANDED" | "COMPLETED" | "NOT_CONNECTED";

export interface LiveAvailabilityResult {
  providerName: string;
  connectionStatus: ProviderConnectionStatus;
  isLive: boolean;
  aircraftSupplyId?: string;
  tailNumber?: string;
  status: AvailabilityStatus;
  indicativeHourlyRate?: number;
  currency: string;
  checkedAt: string;
  expiresAt?: string;
  notes: string;
}

export interface LivePricingResult {
  providerName: string;
  connectionStatus: ProviderConnectionStatus;
  isLive: boolean;
  pricingStatus: PricingStatus;
  totalPrice?: number;
  currency: string;
  breakdown?: {
    basePrice?: number;
    positioning?: number;
    landingHandling?: number;
    fuelSurcharge?: number;
    taxes?: number;
  };
  validUntil?: string;
  notes: string;
}

export interface LiveFlightTrackingResult {
  providerName: string;
  connectionStatus: ProviderConnectionStatus;
  isLive: boolean;
  trackingStatus: FlightTrackingStatus;
  tailNumber?: string;
  latitude?: number;
  longitude?: number;
  altitudeFt?: number;
  speedKts?: number;
  scheduledDeparture?: string;
  scheduledArrival?: string;
  estimatedArrival?: string;
  notes: string;
}

export interface AviationProviderAdapter {
  checkConnection(providerName: string): Promise<ProviderConnectionStatus>;
  getAircraftAvailability(tailNumber: string, date: string): Promise<LiveAvailabilityResult>;
  getIndicativeQuote(originIcao: string, destinationIcao: string, category: string): Promise<LivePricingResult>;
  getFlightTracking(trackingRef: string): Promise<LiveFlightTrackingResult>;
}
