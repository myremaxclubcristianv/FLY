import { FlightRequest, RequestLifecycleStatus } from "@/types/flight-request";
import { generateServerMissionReference } from "./mission-service";
import { validateLifecycleTransition } from "../auth/rbac";

const STORAGE_KEY = "air_mission_requests";

export type QuoteStatus =
  | "RECEIVED"
  | "UNDER_REVIEW"
  | "PRESENTED"
  | "ACCEPTED"
  | "DECLINED"
  | "EXPIRED";

export interface StoredQuote {
  id: string;
  operatorId?: string;
  operatorLegalName: string;
  operatorBrand: string;
  aocNumber: string;
  aircraftModel: string;
  aircraftCategory: string;
  tailNumber?: string;
  route?: string;
  estimatedFlightTime?: string;
  departureDate?: string;
  returnDate?: string;
  passengers?: number;
  totalPrice?: number;
  currency?: string;
  priceRangeFormatted: string;
  pricingStatus: "INDICATIVE" | "REQUEST" | "LIVE";
  validityUntil: string;
  inclusions: string[];
  exclusions?: string[];
  baggageAllowance: string;
  cancellationPolicy: string;
  operatorReference?: string;
  source: string;
  receivedAt: string;
  reviewedAt?: string;
  status: QuoteStatus;
  verificationStatus: "OFFICIAL_SOURCE" | "VERIFIED" | "PUBLIC" | "INDICATIVE" | "SIMULATED / ARCHIVE";
  isArchiveSample?: boolean;
}

export interface MissionTimelineEvent {
  time: string;
  event: string;
  actor: "CUSTOMER" | "OPERATOR" | "AIR_OPS" | "DECISION_ENGINE" | "SYSTEM";
  notes?: string;
}

export interface MissionDetailRecord extends FlightRequest {
  id: string;
  referenceId: string;
  status: RequestLifecycleStatus;
  statusLabel: string;
  assignedAdvisor: string;
  quotes: StoredQuote[];
  selectedQuoteId?: string;
  airReviewNotes?: string;
  recommendedAircraft: string;
  recommendedCategory: string;
  estimatedFlightTime: string;
  recommendationReason: string;
  constraints: string[];
  timeline: MissionTimelineEvent[];
  isDemoRecord?: boolean;
  userId?: string;
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
        timeline: [
          { time: "2026-09-08T14:30:00Z", event: "Mission Created via Customer Planner", actor: "CUSTOMER" },
          { time: "2026-09-08T14:32:00Z", event: "AIR Decision Engine evaluated parameters: Phenom 300E recommended", actor: "DECISION_ENGINE" },
          { time: "2026-09-08T14:40:00Z", event: "AOC Operator quote logged from Ion Ţiriac Air S.R.L. (RO-003)", actor: "OPERATOR" },
          { time: "2026-09-08T15:10:00Z", event: "AIR Flight Operations safety audit passed: Presented to Client Portal", actor: "AIR_OPS" },
        ],
        quotes: [
          {
            id: "q-101",
            operatorLegalName: "Ion Ţiriac Air S.R.L.",
            operatorBrand: "Ţiriac Air",
            aocNumber: "RO-003",
            aircraftModel: "Embraer Phenom 300E",
            aircraftCategory: "LIGHT_JET",
            tailNumber: "YR-TYA",
            route: "LRBS → LFMN",
            departureDate: "2026-09-24 10:30 EET",
            passengers: 4,
            totalPrice: 8800,
            currency: "EUR",
            priceRangeFormatted: "€8,400 - €9,800",
            pricingStatus: "INDICATIVE",
            validityUntil: "2026-09-21 18:00 EET",
            inclusions: [
              "VIP handling at Băneasa FBO Lounge",
              "In-flight executive champagne & catering",
              "Private terminal fast-track processing",
            ],
            exclusions: ["De-icing if required by winter weather"],
            baggageAllowance: "65 cu ft hold (6 hard cases + 4 carry-ons)",
            cancellationPolicy: "80% refund up to 48 hours prior to departure",
            source: "Historical Operator Filing (AACR RO-003)",
            receivedAt: "2026-09-08T14:40:00Z",
            reviewedAt: "2026-09-08T15:05:00Z",
            status: "PRESENTED",
            verificationStatus: "OFFICIAL_SOURCE",
            isArchiveSample: true,
          },
          {
            id: "q-102",
            operatorLegalName: "Ion Ţiriac Air S.R.L.",
            operatorBrand: "Ţiriac Air",
            aocNumber: "RO-003",
            aircraftModel: "Bombardier Challenger 350",
            aircraftCategory: "SUPER_MIDSIZE_JET",
            tailNumber: "YR-TIA",
            route: "LRBS → LFMN",
            departureDate: "2026-09-24 10:30 EET",
            passengers: 4,
            totalPrice: 15500,
            currency: "EUR",
            priceRangeFormatted: "€14,500 - €16,800",
            pricingStatus: "INDICATIVE",
            validityUntil: "2026-09-21 12:00 EET",
            inclusions: [
              "Full stand-up cabin with dedicated flight hostess",
              "Hot VIP gourmet catering",
              "High-speed Ka-band satellite Wi-Fi",
            ],
            exclusions: ["Special ground limousine transfers"],
            baggageAllowance: "106 cu ft luggage hold",
            cancellationPolicy: "90% refund up to 72 hours prior to departure",
            source: "Historical Operator Filing (AACR RO-003)",
            receivedAt: "2026-09-08T14:45:00Z",
            reviewedAt: "2026-09-08T15:05:00Z",
            status: "PRESENTED",
            verificationStatus: "OFFICIAL_SOURCE",
            isArchiveSample: true,
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
        timeline: [
          { time: "2026-09-09T09:15:00Z", event: "Mission Created via Customer Planner", actor: "CUSTOMER" },
          { time: "2026-09-09T09:18:00Z", event: "AIR Operations logged dispatch for coastal rotary wing sourcing", actor: "AIR_OPS" },
        ],
        quotes: [],
      },
    ];
  }

  private inMemoryStore: MissionDetailRecord[] | null = null;

  private saveRequests(requests: MissionDetailRecord[]): void {
    this.inMemoryStore = requests;
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
      } catch {
        // Safe storage write fallback
      }
    }
  }

  public getAllRequests(): MissionDetailRecord[] {
    if (typeof window === "undefined") {
      if (!this.inMemoryStore) {
        this.inMemoryStore = this.getInitialDemoRequests();
      }
      return this.inMemoryStore;
    }
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = this.getInitialDemoRequests();
      this.saveRequests(initial);
      return initial;
    }
    try {
      const parsed = JSON.parse(raw);
      const res = Array.isArray(parsed) && parsed.length > 0 ? parsed : this.getInitialDemoRequests();
      this.inMemoryStore = res;
      return res;
    } catch {
      return this.getInitialDemoRequests();
    }
  }

  public getUserRequests(userEmail?: string): MissionDetailRecord[] {
    const all = this.getAllRequests();
    if (!userEmail) return all;
    return all.filter((r) => !r.email || r.email.toLowerCase() === userEmail.toLowerCase() || r.isDemoRecord);
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
    userId?: string;
  }): MissionDetailRecord {
    const ref = generateServerMissionReference();
    const now = new Date().toISOString();
    const newRecord: MissionDetailRecord = {
      ...data,
      id: `req-${Date.now()}`,
      referenceId: ref,
      status: "REQUESTED",
      statusLabel: "Mission Logged // Sourcing Dispatch Initiated",
      assignedAdvisor: "AIR Operations Center (Bucharest)",
      createdAt: now,
      recommendedAircraft: data.recommendedAircraft || "Embraer Phenom 300E",
      recommendedCategory: data.recommendedCategory || "Light Jet",
      estimatedFlightTime: data.estimatedFlightTime || "1h 35m",
      recommendationReason:
        data.recommendationReason ||
        "AIR Decision Engine evaluated mission vector, speed requirements, and passenger load for optimal routing.",
      constraints: data.constraints || ["Runway >= 1,200m", "Standard IFR clearance"],
      timeline: [
        { time: now, event: "Mission Created via Customer Planner", actor: "CUSTOMER" },
        { time: now, event: "AIR Flight Operations registered dispatch reference", actor: "SYSTEM" },
      ],
      quotes: [],
    };

    const current = this.getAllRequests();
    const updated = [newRecord, ...current];
    this.saveRequests(updated);

    return newRecord;
  }

  public updateLifecycleStatus(
    refId: string,
    status: RequestLifecycleStatus,
    statusLabel?: string,
    actor: MissionTimelineEvent["actor"] = "AIR_OPS",
    notes?: string
  ): MissionDetailRecord | undefined {
    const all = this.getAllRequests();
    const idx = all.findIndex(
      (r) => r.referenceId.toLowerCase() === refId.toLowerCase() || r.id === refId
    );
    if (idx === -1) return undefined;

    const current = all[idx];

    // Validate lifecycle transition rules
    const validation = validateLifecycleTransition(
      current.status,
      status,
      actor === "CUSTOMER" ? "CLIENT" : "OPERATIONS",
      current.quotes && current.quotes.length > 0,
      Boolean(current.airReviewNotes)
    );

    if (!validation.allowed) {
      console.warn(
        `[MISSION LIFECYCLE REJECTED] Cannot transition ${current.referenceId} from ${current.status} to ${status}: ${validation.reason}`
      );
      return undefined;
    }

    const now = new Date().toISOString();
    const defaultLabels: Record<RequestLifecycleStatus, string> = {
      REQUESTED: "Mission Logged // Sourcing Dispatch Initiated",
      SOURCING: "Active Operator Sourcing in Progress",
      QUOTES_RECEIVED: "Operator Bids Received // Pending Review",
      AIR_REVIEW: "Safety & Schedule Audit in Progress",
      PRESENTED: "Quotes Presented for Client Selection",
      CONFIRMED: "Mission Flight Confirmed",
      CANCELLED: "Mission Cancelled",
    };

    const updated: MissionDetailRecord = {
      ...current,
      status,
      statusLabel: statusLabel || defaultLabels[status] || status,
      timeline: [
        ...(current.timeline || []),
        {
          time: now,
          event: `Status updated to ${status}${notes ? `: ${notes}` : ""}`,
          actor,
          notes,
        },
      ],
    };

    all[idx] = updated;
    this.saveRequests(all);
    return updated;
  }

  public attachQuote(refId: string, quote: Omit<StoredQuote, "id" | "receivedAt">): MissionDetailRecord | undefined {
    const all = this.getAllRequests();
    const idx = all.findIndex(
      (r) => r.referenceId.toLowerCase() === refId.toLowerCase() || r.id === refId
    );
    if (idx === -1) return undefined;

    const current = all[idx];

    // Prevent attaching quotes to completed or cancelled missions
    if (current.status === "CONFIRMED" || current.status === "CANCELLED") {
      console.warn(`[ATTACH QUOTE REJECTED] Mission ${current.referenceId} is in terminal state ${current.status}.`);
      return undefined;
    }

    const now = new Date().toISOString();
    const newQuote: StoredQuote = {
      ...quote,
      id: `q-${Date.now()}`,
      receivedAt: now,
      status: quote.status || "RECEIVED",
    };

    const updatedQuotes = [...(current.quotes || []), newQuote];
    const newStatus: RequestLifecycleStatus =
      current.status === "REQUESTED" || current.status === "SOURCING"
        ? "QUOTES_RECEIVED"
        : current.status;

    const updated: MissionDetailRecord = {
      ...current,
      status: newStatus,
      statusLabel: newStatus === "QUOTES_RECEIVED" ? "Operator Bids Received // Pending Review" : current.statusLabel,
      quotes: updatedQuotes,
      timeline: [
        ...(current.timeline || []),
        {
          time: now,
          event: `Operator quote logged from ${quote.operatorBrand} (${quote.aircraftModel})`,
          actor: "OPERATOR",
          notes: `Price: ${quote.priceRangeFormatted}`,
        },
      ],
    };

    all[idx] = updated;
    this.saveRequests(all);
    return updated;
  }

  public updateQuoteStatus(
    refId: string,
    quoteId: string,
    status: QuoteStatus
  ): MissionDetailRecord | undefined {
    const all = this.getAllRequests();
    const idx = all.findIndex(
      (r) => r.referenceId.toLowerCase() === refId.toLowerCase() || r.id === refId
    );
    if (idx === -1) return undefined;

    const current = all[idx];
    const now = new Date().toISOString();
    const updatedQuotes = current.quotes.map((q) =>
      q.id === quoteId
        ? {
            ...q,
            status,
            reviewedAt: status === "PRESENTED" || status === "UNDER_REVIEW" ? now : q.reviewedAt,
          }
        : q
    );

    const updated: MissionDetailRecord = {
      ...current,
      quotes: updatedQuotes,
      timeline: [
        ...(current.timeline || []),
        {
          time: now,
          event: `Quote ${quoteId} status set to ${status}`,
          actor: "AIR_OPS",
        },
      ],
    };

    all[idx] = updated;
    this.saveRequests(all);
    return updated;
  }

  public recordAirReview(
    refId: string,
    reviewNotes: string,
    approvedQuoteIds?: string[]
  ): MissionDetailRecord | undefined {
    const all = this.getAllRequests();
    const idx = all.findIndex(
      (r) => r.referenceId.toLowerCase() === refId.toLowerCase() || r.id === refId
    );
    if (idx === -1) return undefined;

    const current = all[idx];

    // Cannot review a mission with zero quotes
    if (!current.quotes || current.quotes.length === 0) {
      console.warn(`[AIR REVIEW REJECTED] Cannot conduct safety review on mission ${current.referenceId} with 0 quotes.`);
      return undefined;
    }

    const now = new Date().toISOString();
    const updatedQuotes = current.quotes.map((q) => {
      if (!approvedQuoteIds || approvedQuoteIds.includes(q.id)) {
        return { ...q, status: "PRESENTED" as QuoteStatus, reviewedAt: now };
      }
      return q;
    });

    const updated: MissionDetailRecord = {
      ...current,
      status: "PRESENTED",
      statusLabel: "Quotes Presented for Client Selection",
      airReviewNotes: reviewNotes,
      quotes: updatedQuotes,
      timeline: [
        ...(current.timeline || []),
        {
          time: now,
          event: `AIR Operations safety audit approved: ${reviewNotes}`,
          actor: "AIR_OPS",
          notes: reviewNotes,
        },
      ],
    };

    all[idx] = updated;
    this.saveRequests(all);
    return updated;
  }

  public confirmMission(refId: string, quoteId: string): MissionDetailRecord | undefined {
    const all = this.getAllRequests();
    const idx = all.findIndex(
      (r) => r.referenceId.toLowerCase() === refId.toLowerCase() || r.id === refId
    );
    if (idx === -1) return undefined;

    const current = all[idx];

    // Ensure mission is in PRESENTED status before confirming
    if (current.status !== "PRESENTED") {
      console.warn(
        `[MISSION CONFIRMATION REJECTED] Mission ${current.referenceId} must be in PRESENTED state to confirm. Current state: ${current.status}.`
      );
      return undefined;
    }

    const selectedQuote = current.quotes.find((q) => q.id === quoteId);
    if (!selectedQuote) {
      console.warn(`[MISSION CONFIRMATION REJECTED] Quote ${quoteId} does not exist in mission ${current.referenceId}.`);
      return undefined;
    }

    const now = new Date().toISOString();
    const updatedQuotes = current.quotes.map((q) => ({
      ...q,
      status: q.id === quoteId ? ("ACCEPTED" as QuoteStatus) : ("DECLINED" as QuoteStatus),
    }));

    const updated: MissionDetailRecord = {
      ...current,
      status: "CONFIRMED",
      statusLabel: "Mission Confirmed // Aircraft Dispatched",
      selectedQuoteId: quoteId,
      quotes: updatedQuotes,
      timeline: [
        ...(current.timeline || []),
        {
          time: now,
          event: `Client confirmed flight on ${selectedQuote?.aircraftModel || "Selected Aircraft"} (${selectedQuote?.operatorBrand || "Operator"})`,
          actor: "CUSTOMER",
          notes: `Confirmed option: ${selectedQuote?.priceRangeFormatted || ""}`,
        },
      ],
    };

    all[idx] = updated;
    this.saveRequests(all);
    return updated;
  }

  public deleteRequest(refId: string): boolean {
    const all = this.getAllRequests();
    const filtered = all.filter(
      (r) => r.referenceId.toLowerCase() !== refId.toLowerCase() && r.id !== refId
    );
    if (filtered.length === all.length) return false;
    this.saveRequests(filtered);
    return true;
  }
}

export const missionRequestService = new MissionRequestService();

