import { FlightMission, FlightOption, AircraftCategory } from "../../types/domain";
import { evaluateMissionDecision } from "./decision-engine";

export function generateServerMissionReference(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let randomCode = "";
  for (let i = 0; i < 6; i++) {
    randomCode += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `AIR-2026-${randomCode}`;
}

export interface MissionRepository {
  createMission(data: Omit<FlightMission, "id" | "createdAt" | "status">): Promise<FlightMission>;
  getOptionsForMission(mission: FlightMission): Promise<FlightOption[]>;
}

export class ProductionMissionService implements MissionRepository {
  async createMission(
    data: Omit<FlightMission, "id" | "createdAt" | "status">
  ): Promise<FlightMission> {
    const referenceId = generateServerMissionReference();
    const mission: FlightMission = {
      ...data,
      id: referenceId,
      referenceId,
      status: "OPTIONS_READY",
      createdAt: new Date().toISOString(),
    };
    return mission;
  }

  async getOptionsForMission(mission: FlightMission): Promise<FlightOption[]> {
    const decisionResult = evaluateMissionDecision({
      origin: mission.origin,
      destination: mission.destination,
      passengerCount: mission.passengers,
      priority: mission.priority,
    });

    const primaryOption: FlightOption = {
      id: `opt-${mission.id}-1`,
      missionId: mission.id,
      aircraftCategory: decisionResult.category,
      aircraftName: decisionResult.recommendedModelName.toUpperCase(),
      operatorName: "AIR Operational Access Network (Verified AOC)",
      routing: `${mission.origin} → ${mission.destination} (Optimal Vector)`,
      estimatedDuration: decisionResult.estimatedDuration,
      pricingStatus: "INDICATIVE",
      indicativePriceRange: "INDICATIVE QUOTE REQUIRED",
      availabilityStatus: "REQUEST",
      verificationStatus: "DATA_VERIFIED",
      dataStatus: decisionResult.dataStatus,
      recommendationScore: decisionResult.recommendationScore,
      recommendationReason: decisionResult.rationale,
      isPrimary: true,
    };

    const alternativeOptions: FlightOption[] = decisionResult.alternatives.map((alt, idx) => ({
      id: `opt-${mission.id}-${idx + 2}`,
      missionId: mission.id,
      aircraftCategory: alt.category as AircraftCategory,
      aircraftName: alt.title.toUpperCase(),
      operatorName: "AIR Partner Supply Network",
      routing: `${mission.origin} → ${mission.destination}`,
      estimatedDuration: alt.estimatedDuration,
      pricingStatus: alt.pricingStatus,
      indicativePriceRange: alt.indicativePriceRange,
      availabilityStatus: "REQUEST",
      verificationStatus: "IDENTITY_CHECKED",
      dataStatus: "INDICATIVE",
      recommendationScore: decisionResult.recommendationScore - (idx + 1) * 8,
      recommendationReason: alt.rationale,
      isPrimary: false,
    }));

    return [primaryOption, ...alternativeOptions];
  }
}

export const missionService = new ProductionMissionService();
