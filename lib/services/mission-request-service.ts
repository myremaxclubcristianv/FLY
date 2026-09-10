import { FlightRequest, RequestLifecycleStatus } from "@/types/flight-request";
import { generateServerMissionReference } from "./mission-service";

const STORAGE_KEY = "air_mission_requests";

export interface StoredQuote {
  id: string;
  operatorLegalName: string;
  operatorBrand: string;
  aocNumber: string;
  aircraftModel: string;
  aircraftCategory: string;
  tailNumber?: string;
  estimatedFlightTime: string;
  priceRangeFormatted: string;
  pricingStatus: "INDICATIVE" | "REQUEST" | "LIVE";
  validityUntil: string;
  inclusions: string[];
  baggageAllowance: string;
  cancellationPolicy: string;
  verificationStatus: "VERIFIED" | "OFFICIAL_SOURCE";
}

export interface MissionDetailRecord extends FlightRequest {
  id: string;
  referenceId: string;
  status: RequestLifecycleStatus;
  statusLabel: string;
  assignedAdvisor: string;
  quotes: StoredQuote[];
  recommendedAircraft: string;
  recommendedCategory: string;
  estimatedFlightTime: string;
  recommendationReason: string;
  constraints: string[];
  isDemoRecord?: boolean;
}

export class MissionRequestService {
  private getInitialDemoRequests(): MissionDetailRecord[] {
    return [
      {
        id: "req-alpha-101",
        referenceId: "AIR-2026-F982A1",
        from: "Bucharest Băneasa (LRBS / BBU)",
        to: "Nice Côte d'Azur (LFMN / NCE)",
        tripType: "ONE_WAY",
        date: "2026-09-24",
        time: "10:30 EET",
        dateFlexibility: "EXACT",
        passengers: 4,
        budgetPreference: "STANDARD_CHARTER",
        priority: "FASTEST",
        purpose: "EXECUTIVE_BUSINESS",
        requirements: ["WIFI_ONBOARD", "VIP_TARMAC_TRANSFER"],
        name: "VIP Executive Member",
        email: "client@air.aero",
        phone: "+40 722 000 001",
        message: "Direct transfer needed to Port Hercule following arrival.",
        status: "PRESENTED",
        statusLabel: "Sample Audited Dossier // Indicative Archive",
        assignedAdvisor: "AIR Flight Operations Desk // LRBS",
        createdAt: "2026-09-08T14:30:00Z",
        isDemoRecord: true,
        recommendedAircraft: "Embraer Phenom 300E",
        recommendedCategory: "Light Jet",
        estimatedFlightTime: "2h 15m",
        recommendationReason:
          "Highest speed light jet in Europe (453 KTS) with low cabin altitude, non-stop range across the Mediterranean corridor, and direct Băneasa home-base availability.",
        constraints: ["Certified runway >= 1,100m", "Standard IFR flight plan"],
        quotes: [
          {
            id: "q-101",
            operatorLegalName: "Ion Ţiriac Air S.R.L.",
            operatorBrand: "Ţiriac Air",
            aocNumber: "RO-003",
            aircraftModel: "Embraer Phenom 300E",
            aircraftCategory: "LIGHT_JET",
            tailNumber: "YR-TYA",
            estimatedFlightTime: "2h 15m",
            priceRangeFormatted: "€8,400 - €9,800",
            pricingStatus: "INDICATIVE",
            validityUntil: "2026-09-21 18:00 EET",
            inclusions: [
              "VIP handling at Băneasa FBO Lounge",
              "In-flight executive champagne & catering",
              "Private terminal fast-track processing",
            ],
            baggageAllowance: "65 cu ft hold (6 hard cases + 4 carry-ons)",
            cancellationPolicy: "80% refund up to 48 hours prior to departure",
            verificationStatus: "OFFICIAL_SOURCE",
          },
          {
            id: "q-102",
            operatorLegalName: "Ion Ţiriac Air S.R.L.",
            operatorBrand: "Ţiriac Air",
            aocNumber: "RO-003",
            aircraftModel: "Bombardier Challenger 350",
            aircraftCategory: "SUPER_MIDSIZE_JET",
            tailNumber: "YR-TIA",
            estimatedFlightTime: "2h 05m",
            priceRangeFormatted: "€14,500 - €16,800",
            pricingStatus: "INDICATIVE",
            validityUntil: "2026-09-21 12:00 EET",
            inclusions: [
              "Full stand-up cabin with dedicated flight hostess",
              "Hot VIP gourmet catering",
              "High-speed Ka-band satellite Wi-Fi",
            ],
            baggageAllowance: "106 cu ft luggage hold",
            cancellationPolicy: "90% refund up to 72 hours prior to departure",
            verificationStatus: "OFFICIAL_SOURCE",
          },
        ],
      },
      {
        id: "req-beta-202",
        referenceId: "AIR-2026-C44109",
        from: "Bucharest Băneasa (LRBS / BBU)",
        to: "Mamaia Beach Heliport / Constanța",
        tripType: "ONE_WAY",
        date: "2026-10-12",
        time: "14:00 EET",
        dateFlexibility: "PLUS_MINUS_1_DAY",
        passengers: 4,
        budgetPreference: "SUPERIOR_COMFORT",
        priority: "MOST_MEMORABLE",
        purpose: "PRIVATE_LEISURE",
        requirements: ["HELIPAD_DIRECT"],
        name: "Private Charter Client",
        email: "client@air.aero",
        phone: "+40 722 000 002",
        message: "Helipad transfer directly to beachfront resort landing pad.",
        status: "SOURCING",
        statusLabel: "Active Operator Sourcing in Progress",
        assignedAdvisor: "AIR Rotary Wing Concierge",
        createdAt: "2026-09-09T09:15:00Z",
        recommendedAircraft: "Airbus H145 / Bell 429",
        recommendedCategory: "Twin-Engine Helicopter",
        estimatedFlightTime: "52m",
        recommendationReason:
          "Direct point-to-point flight bypassing A2 motorway congestion. Twin-engine reliability with luxury executive interior and beachfront pad landing authorization.",
        constraints: ["Day VFR / IFR weather dependent", "6 passengers max with soft luggage"],
        quotes: [],
      },
    ];
  }

  public getAllRequests(): MissionDetailRecord[] {
    if (typeof window === "undefined") {
      return this.getInitialDemoRequests();
    }
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = this.getInitialDemoRequests();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : this.getInitialDemoRequests();
    } catch {
      return this.getInitialDemoRequests();
    }
  }

  public getRequestByReference(refId: string): MissionDetailRecord | undefined {
    const list = this.getAllRequests();
    return list.find(
      (r) => r.referenceId.toLowerCase() === refId.toLowerCase() || r.id === refId
    );
  }

  public createRequest(data: Omit<FlightRequest, "id" | "referenceId" | "status" | "createdAt"> & {
    recommendedAircraft?: string;
    recommendedCategory?: string;
    estimatedFlightTime?: string;
    recommendationReason?: string;
    constraints?: string[];
  }): MissionDetailRecord {
    const ref = generateServerMissionReference();
    const newRecord: MissionDetailRecord = {
      ...data,
      id: `req-${Date.now()}`,
      referenceId: ref,
      status: "REQUESTED",
      statusLabel: "Mission Logged // Sourcing Dispatch Initiated",
      assignedAdvisor: "AIR Operations Center (Bucharest)",
      createdAt: new Date().toISOString(),
      recommendedAircraft: data.recommendedAircraft || "Embraer Phenom 300E",
      recommendedCategory: data.recommendedCategory || "Light Jet",
      estimatedFlightTime: data.estimatedFlightTime || "1h 35m",
      recommendationReason:
        data.recommendationReason ||
        "AIR Decision Engine evaluated mission vector, speed requirements, and passenger load for optimal routing.",
      constraints: data.constraints || ["Runway >= 1,200m", "Standard IFR clearance"],
      quotes: [],
    };

    if (typeof window !== "undefined") {
      const current = this.getAllRequests();
      const updated = [newRecord, ...current];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }

    return newRecord;
  }
}

export const missionRequestService = new MissionRequestService();
