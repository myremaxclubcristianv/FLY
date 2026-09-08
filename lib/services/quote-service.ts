import { QuoteRequest, QuoteStatus } from "../../types/domain";

export interface QuoteRepository {
  createQuoteRequest(request: Omit<QuoteRequest, "id" | "requestedAt" | "status" | "quoteStatus">): Promise<QuoteRequest>;
  getQuoteRequest(id: string): Promise<QuoteRequest | null>;
  getAllQuoteRequests(): Promise<QuoteRequest[]>;
  updateStatus(id: string, status: QuoteStatus): Promise<QuoteRequest | null>;
}

export class DemoQuoteService implements QuoteRepository {
  private requests: Map<string, QuoteRequest> = new Map();

  constructor() {
    // Seed an initial demo quote request for admin attention
    const demoReq: QuoteRequest = {
      id: "qreq-demo-101",
      missionId: "msn-demo-1",
      customerName: "Alexander Vance",
      customerEmail: "alexander@company.com",
      status: "REQUESTED",
      quoteStatus: "REQUESTED",
      requestedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
      notes: "4 Passengers, Bucharest to Bran Castle Helipad, speed priority.",
    };
    this.requests.set(demoReq.id, demoReq);
  }

  async createQuoteRequest(
    data: Omit<QuoteRequest, "id" | "requestedAt" | "status" | "quoteStatus">
  ): Promise<QuoteRequest> {
    const id = `qreq-${Date.now()}`;
    const req: QuoteRequest = {
      ...data,
      id,
      status: "REQUESTED",
      quoteStatus: "REQUESTED",
      requestedAt: new Date().toISOString(),
    };
    this.requests.set(id, req);
    console.info("[AIR PHASE 2 QUOTE SERVICE] Created Quote Request:", req);
    return req;
  }

  async getQuoteRequest(id: string): Promise<QuoteRequest | null> {
    return this.requests.get(id) || null;
  }

  async getAllQuoteRequests(): Promise<QuoteRequest[]> {
    return Array.from(this.requests.values());
  }

  async updateStatus(id: string, status: QuoteStatus): Promise<QuoteRequest | null> {
    const existing = this.requests.get(id);
    if (!existing) return null;
    const updated = { ...existing, status, quoteStatus: status };
    this.requests.set(id, updated);
    return updated;
  }
}

export const quoteService = new DemoQuoteService();
