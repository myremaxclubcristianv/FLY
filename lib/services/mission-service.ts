import { FlightMission, FlightOption } from "../../types/domain";

export interface MissionRepository {
  createMission(mission: Omit<FlightMission, "id" | "createdAt" | "status">): Promise<FlightMission>;
  getOptionsForMission(mission: FlightMission): Promise<FlightOption[]>;
}

export class DemoMissionService implements MissionRepository {
  async createMission(
    data: Omit<FlightMission, "id" | "createdAt" | "status">
  ): Promise<FlightMission> {
    const id = `msn-${Date.now()}`;
    const mission: FlightMission = {
      ...data,
      id,
      status: "OPTIONS_READY",
      createdAt: new Date().toISOString(),
    };
    return mission;
  }

  async getOptionsForMission(mission: FlightMission): Promise<FlightOption[]> {
    const isHeliCandidate =
      mission.origin.toLowerCase().includes("bucharest") &&
      (mission.destination.toLowerCase().includes("bran") ||
        mission.destination.toLowerCase().includes("brașov") ||
        mission.destination.toLowerCase().includes("brasov"));

    const options: FlightOption[] = [
      {
        id: `opt-${mission.id}-1`,
        missionId: mission.id,
        aircraftCategory: isHeliCandidate ? "HELICOPTER" : "LIGHT_JET",
        aircraftName: isHeliCandidate ? "TWIN-ENGINE EXECUTIVE HELICOPTER" : "LIGHT EXECUTIVE JET",
        operatorName: isHeliCandidate ? "Carpathian Heli Access" : "Danube Executive Charter",
        routing: isHeliCandidate ? "Direct Pad-to-Pad Access" : "Direct Airfield-to-Airfield Vector",
        estimatedDuration: isHeliCandidate ? "42 MIN FLIGHT" : "45 MIN FLIGHT",
        pricingStatus: "REQUEST",
        indicativePriceRange: "QUOTE REQUIRED",
        availabilityStatus: "REQUEST",
        verificationStatus: "IDENTITY_CHECKED",
        dataStatus: "INDICATIVE",
        recommendationScore: 98,
        recommendationReason: isHeliCandidate
          ? "Fastest door-to-destination option bypassing highway congestion and landing directly at destination pad."
          : "Optimal balance of range, flight speed, and cabin comfort for this distance.",
        isPrimary: true,
      },
      {
        id: `opt-${mission.id}-2`,
        missionId: mission.id,
        aircraftCategory: "TURBOPROP",
        aircraftName: "EXECUTIVE TURBOPROP VIA BRAȘOV (LROV)",
        operatorName: "Transylvania Air Shuttle",
        routing: "Regional Airfield Landing + Short Ground Transfer",
        estimatedDuration: "25 MIN FLIGHT + 35 MIN GROUND",
        pricingStatus: "REQUEST",
        indicativePriceRange: "QUOTE REQUIRED",
        availabilityStatus: "REQUEST",
        verificationStatus: "DATA_VERIFIED",
        dataStatus: "INDICATIVE",
        recommendationScore: 88,
        recommendationReason: "Higher baggage capacity ceiling and all-weather operational capability.",
        isPrimary: false,
      },
      {
        id: `opt-${mission.id}-3`,
        missionId: mission.id,
        aircraftCategory: "HELICOPTER",
        aircraftName: "CAR + HELICOPTER INTERMODAL",
        operatorName: "Carpathian Heli Access",
        routing: "Peripheral Heliport Transfer + Direct Air Flight",
        estimatedDuration: "15 MIN GROUND + 35 MIN FLIGHT",
        pricingStatus: "REQUEST",
        indicativePriceRange: "QUOTE REQUIRED",
        availabilityStatus: "REQUEST",
        verificationStatus: "IDENTITY_CHECKED",
        dataStatus: "INDICATIVE",
        recommendationScore: 82,
        recommendationReason: "Bypasses city exit traffic via pre-positioned northern departure pad.",
        isPrimary: false,
      },
    ];

    return options;
  }
}

export const missionService = new DemoMissionService();
