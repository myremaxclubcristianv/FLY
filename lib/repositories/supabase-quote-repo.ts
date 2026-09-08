import { QuoteRequest, QuoteStatus } from "../../types/domain";
import { QuoteRepository, DemoQuoteService } from "../services/quote-service";
import { createClient } from "../supabase/server";

export class SupabaseQuoteRepository implements QuoteRepository {
  private fallback = new DemoQuoteService();

  async createQuoteRequest(
    data: Omit<QuoteRequest, "id" | "requestedAt" | "status" | "quoteStatus">
  ): Promise<QuoteRequest> {
    const supabase = await createClient();
    if (!supabase) {
      return this.fallback.createQuoteRequest(data);
    }

    const { data: row, error } = await supabase
      .from("quote_requests")
      .insert({
        mission_id: data.missionId,
        option_id: data.optionId,
        operator_id: data.operatorId,
        customer_name: data.customerName,
        customer_email: data.customerEmail,
        customer_phone: data.customerPhone,
        notes: data.notes,
        status: "REQUESTED",
      })
      .select()
      .single();

    if (error || !row) {
      console.warn("[AIR SUPABASE QUOTE REPO] Falling back to local quote creation:", error);
      return this.fallback.createQuoteRequest(data);
    }

    // Also record quote event
    await supabase.from("quote_events").insert({
      quote_request_id: row.id,
      event_type: "QUOTE_REQUESTED",
      created_by: "CUSTOMER",
    });

    return {
      id: String(row.id),
      missionId: String(row.mission_id),
      optionId: row.option_id ? String(row.option_id) : undefined,
      operatorId: row.operator_id ? String(row.operator_id) : undefined,
      customerName: String(row.customer_name),
      customerEmail: String(row.customer_email),
      customerPhone: row.customer_phone ? String(row.customer_phone) : undefined,
      status: row.status as QuoteStatus,
      quoteStatus: row.status as QuoteStatus,
      requestedAt: String(row.requested_at || row.created_at),
      notes: row.notes ? String(row.notes) : undefined,
    };
  }

  async getQuoteRequest(id: string): Promise<QuoteRequest | null> {
    const supabase = await createClient();
    if (!supabase) return this.fallback.getQuoteRequest(id);

    const { data, error } = await supabase
      .from("quote_requests")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) return this.fallback.getQuoteRequest(id);

    return {
      id: String(data.id),
      missionId: String(data.mission_id),
      customerName: String(data.customer_name),
      customerEmail: String(data.customer_email),
      status: data.status as QuoteStatus,
      quoteStatus: data.status as QuoteStatus,
      requestedAt: String(data.requested_at || data.created_at),
    };
  }

  async getAllQuoteRequests(): Promise<QuoteRequest[]> {
    const supabase = await createClient();
    if (!supabase) return this.fallback.getAllQuoteRequests();

    const { data, error } = await supabase
      .from("quote_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) return this.fallback.getAllQuoteRequests();

    return data.map((r) => ({
      id: String(r.id),
      missionId: String(r.mission_id),
      customerName: String(r.customer_name),
      customerEmail: String(r.customer_email),
      status: r.status as QuoteStatus,
      quoteStatus: r.status as QuoteStatus,
      requestedAt: String(r.requested_at || r.created_at),
    }));
  }

  async updateStatus(id: string, status: QuoteStatus): Promise<QuoteRequest | null> {
    const supabase = await createClient();
    if (!supabase) return this.fallback.updateStatus(id, status);

    const { data, error } = await supabase
      .from("quote_requests")
      .update({ status })
      .eq("id", id)
      .select()
      .single();

    if (error || !data) return this.fallback.updateStatus(id, status);

    await supabase.from("quote_events").insert({
      quote_request_id: id,
      event_type: status,
      created_by: "SYSTEM_ADMIN",
    });

    return {
      id: String(data.id),
      missionId: String(data.mission_id),
      customerName: String(data.customer_name),
      customerEmail: String(data.customer_email),
      status: data.status as QuoteStatus,
      quoteStatus: data.status as QuoteStatus,
      requestedAt: String(data.requested_at),
    };
  }
}
