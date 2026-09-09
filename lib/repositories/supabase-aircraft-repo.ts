import { Aircraft, AircraftCategory } from "../../types/domain";
import { AircraftRepository } from "../services/aircraft-service";
import { createClient } from "../supabase/server";
import { DEMO_AIRCRAFT } from "../../data/demo/aircraft";

export class SupabaseAircraftRepository implements AircraftRepository {
  async getAll(): Promise<Aircraft[]> {
    const supabase = await createClient();
    if (!supabase) return DEMO_AIRCRAFT;

    const { data, error } = await supabase.from("aircraft").select("*");

    if (error || !data || data.length === 0) {
      return DEMO_AIRCRAFT;
    }

    return data.map(this.mapRowToAircraft);
  }

  async getBySlug(slug: string): Promise<Aircraft | null> {
    const supabase = await createClient();
    if (!supabase) {
      return DEMO_AIRCRAFT.find((ac) => ac.slug === slug) || null;
    }

    const { data, error } = await supabase
      .from("aircraft")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error || !data) {
      return DEMO_AIRCRAFT.find((ac) => ac.slug === slug) || null;
    }

    return this.mapRowToAircraft(data);
  }

  async getByCategory(category: AircraftCategory): Promise<Aircraft[]> {
    const supabase = await createClient();
    if (!supabase) {
      return DEMO_AIRCRAFT.filter((ac) => ac.category === category);
    }

    const { data, error } = await supabase
      .from("aircraft")
      .select("*")
      .eq("category", category);

    if (error || !data || data.length === 0) {
      return DEMO_AIRCRAFT.filter((ac) => ac.category === category);
    }

    return data.map(this.mapRowToAircraft);
  }

  private mapRowToAircraft(row: Record<string, unknown>): Aircraft {
    return {
      id: String(row.id),
      slug: String(row.slug),
      registration: row.registration ? String(row.registration) : undefined,
      manufacturer: String(row.manufacturer),
      model: String(row.model),
      category: (row.category as AircraftCategory) || "LIGHT_JET",
      passengerCapacity: Number(row.passenger_capacity || 4),
      baggageCapacity: row.baggage_capacity ? String(row.baggage_capacity) : undefined,
      typicalCruiseSpeed: row.typical_cruise_speed ? Number(row.typical_cruise_speed) : undefined,
      approximateRange: row.approximate_range ? Number(row.approximate_range) : undefined,
      homeBaseName: row.home_base_name ? String(row.home_base_name) : "Bucharest Băneasa (LRBS / BBU)",
      operatorDisplayName: row.operator_name ? String(row.operator_name) : "Danube Executive Charter",
      cabinHighlights: row.cabin_highlights ? String(row.cabin_highlights) : "Executive club seating.",
      verificationStatus: (row.verification_status as Aircraft["verificationStatus"]) || "DATA_VERIFIED",
      dataStatus: (row.data_status as Aircraft["dataStatus"]) || "INDICATIVE",
      lastVerifiedAt: row.last_verified_at ? String(row.last_verified_at) : undefined,
    };
  }
}
