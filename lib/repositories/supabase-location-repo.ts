import { AviationLocation } from "../../types/domain";
import { LocationRepository } from "../services/location-service";
import { createClient } from "../supabase/server";
import { DEMO_LOCATIONS } from "../../data/demo/locations";

export class SupabaseLocationRepository implements LocationRepository {
  async getAll(): Promise<AviationLocation[]> {
    const supabase = await createClient();
    if (!supabase) return DEMO_LOCATIONS;

    const { data, error } = await supabase.from("aviation_locations").select("*");

    if (error || !data || data.length === 0) {
      return DEMO_LOCATIONS;
    }

    return data.map(this.mapRowToLocation);
  }

  async getBySlug(slug: string): Promise<AviationLocation | null> {
    const supabase = await createClient();
    if (!supabase) {
      return DEMO_LOCATIONS.find((loc) => loc.slug === slug) || null;
    }

    const { data, error } = await supabase
      .from("aviation_locations")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error || !data) {
      return DEMO_LOCATIONS.find((loc) => loc.slug === slug) || null;
    }

    return this.mapRowToLocation(data);
  }

  async getByCity(city: string): Promise<AviationLocation[]> {
    const supabase = await createClient();
    if (!supabase) {
      const search = city.toLowerCase();
      return DEMO_LOCATIONS.filter((loc) => loc.city.toLowerCase().includes(search));
    }

    const { data, error } = await supabase
      .from("aviation_locations")
      .select("*")
      .ilike("city", `%${city}%`);

    if (error || !data || data.length === 0) {
      const search = city.toLowerCase();
      return DEMO_LOCATIONS.filter((loc) => loc.city.toLowerCase().includes(search));
    }

    return data.map(this.mapRowToLocation);
  }

  private mapRowToLocation(row: Record<string, unknown>): AviationLocation {
    return {
      id: String(row.id),
      slug: String(row.slug),
      name: String(row.name),
      type: (row.type as AviationLocation["type"]) || "AIRPORT",
      iata: row.iata ? String(row.iata) : undefined,
      icao: row.icao ? String(row.icao) : undefined,
      city: String(row.city),
      country: String(row.country || "Romania"),
      latitude: row.latitude ? Number(row.latitude) : undefined,
      longitude: row.longitude ? Number(row.longitude) : undefined,
      operatingHours: row.operating_hours ? String(row.operating_hours) : undefined,
      restrictions: Array.isArray(row.restrictions) ? row.restrictions.map(String) : [],
      verificationStatus: (row.verification_status as AviationLocation["verificationStatus"]) || "DATA_VERIFIED",
      dataStatus: (row.data_status as AviationLocation["dataStatus"]) || "INDICATIVE",
      lastVerifiedAt: row.last_verified_at ? String(row.last_verified_at) : undefined,
    };
  }
}
