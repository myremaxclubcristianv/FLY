import { FlightMission, FlightOption } from "../../types/domain";
import { MissionRepository, ProductionMissionService } from "../services/mission-service";
import { createClient } from "../supabase/server";

export class SupabaseMissionRepository implements MissionRepository {
  private fallback = new ProductionMissionService();

  async createMission(
    data: Omit<FlightMission, "id" | "createdAt" | "status">
  ): Promise<FlightMission> {
    const supabase = await createClient();
    if (!supabase) {
      return this.fallback.createMission(data);
    }

    const { data: row, error } = await supabase
      .from("missions")
      .insert({
        origin: data.origin,
        destination: data.destination,
        date: data.date,
        preferred_time: data.preferredTime,
        passengers: data.passengers,
        priority: data.priority,
        baggage: data.baggage,
        notes: data.notes,
        status: "SUBMITTED",
      })
      .select()
      .single();

    if (error || !row) {
      console.warn("[AIR SUPABASE MISSION REPO] Falling back to local mission creation:", error);
      return this.fallback.createMission(data);
    }

    return {
      id: String(row.id),
      origin: String(row.origin),
      destination: String(row.destination),
      date: String(row.date),
      preferredTime: row.preferred_time ? String(row.preferred_time) : undefined,
      passengers: Number(row.passengers),
      priority: row.priority as FlightMission["priority"],
      baggage: row.baggage ? String(row.baggage) : undefined,
      notes: row.notes ? String(row.notes) : undefined,
      status: row.status as FlightMission["status"],
      createdAt: String(row.created_at),
    };
  }

  async getOptionsForMission(mission: FlightMission): Promise<FlightOption[]> {
    return this.fallback.getOptionsForMission(mission);
  }
}
