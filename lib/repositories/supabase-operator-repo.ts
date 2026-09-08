import { Operator } from "../../types/domain";
import { OperatorRepository } from "../services/operator-service";
import { createClient } from "../supabase/server";
import { DEMO_OPERATORS } from "../../data/demo/operators";

export class SupabaseOperatorRepository implements OperatorRepository {
  async getAll(): Promise<Operator[]> {
    const supabase = await createClient();
    if (!supabase) return DEMO_OPERATORS;

    const { data, error } = await supabase
      .from("operators")
      .select("*")
      .order("display_name", { ascending: true });

    if (error || !data || data.length === 0) {
      return DEMO_OPERATORS;
    }

    return data.map(this.mapRowToOperator);
  }

  async getBySlug(slug: string): Promise<Operator | null> {
    const supabase = await createClient();
    if (!supabase) {
      return DEMO_OPERATORS.find((op) => op.slug === slug) || null;
    }

    const { data, error } = await supabase
      .from("operators")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error || !data) {
      return DEMO_OPERATORS.find((op) => op.slug === slug) || null;
    }

    return this.mapRowToOperator(data);
  }

  async getById(id: string): Promise<Operator | null> {
    const supabase = await createClient();
    if (!supabase) {
      return DEMO_OPERATORS.find((op) => op.id === id) || null;
    }

    const { data, error } = await supabase
      .from("operators")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      return DEMO_OPERATORS.find((op) => op.id === id) || null;
    }

    return this.mapRowToOperator(data);
  }

  private mapRowToOperator(row: Record<string, unknown>): Operator {
    return {
      id: String(row.id),
      slug: String(row.slug),
      legalName: String(row.legal_name || row.display_name),
      displayName: String(row.display_name),
      country: String(row.country || "Romania"),
      baseLocationId: row.base_location_id ? String(row.base_location_id) : undefined,
      baseAirportName: row.base_airport_name ? String(row.base_airport_name) : "Bucharest Băneasa (LROP / BBU)",
      operatorType: (row.operator_type as Operator["operatorType"]) || "CHARTER",
      website: row.website ? String(row.website) : undefined,
      verificationStatus: (row.verification_status as Operator["verificationStatus"]) || "IDENTITY_CHECKED",
      dataStatus: (row.data_status as Operator["dataStatus"]) || "INDICATIVE",
      lastVerifiedAt: row.last_verified_at ? String(row.last_verified_at) : undefined,
    };
  }
}
