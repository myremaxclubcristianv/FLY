/**
 * AIR Durable Mission Buffer Service
 * Edge-resident, persistent mission buffer using Cloudflare KV.
 * Ensures zero data loss and persistent mission records even before or during database synchronization.
 */

export interface MissionBufferRecord {
  id: string;
  referenceId: string;
  idempotencyKey: string;
  ownerFingerprint: string;
  payloadHash: string;
  status: string;
  statusLabel: string;
  assignedAdvisor: string;
  origin: string;
  originIcao?: string | null;
  destination: string;
  destinationIcao?: string | null;
  tripType: string;
  departureDate: string;
  returnDate?: string | null;
  preferredTime?: string | null;
  dateFlexibility: string;
  passengers: number;
  budgetPreference: string;
  priority: string;
  purpose: string;
  requirements: string[];
  name?: string | null;
  email: string;
  phone?: string | null;
  notes?: string | null;
  userId?: string | null;
  quotes: Array<{
    id: string;
    operatorLegalName: string;
    operatorBrand: string;
    aocNumber: string;
    aircraftModel: string;
    aircraftCategory: string;
    tailNumber?: string;
    totalPrice?: number;
    priceRangeFormatted: string;
    validityUntil: string;
    status: string;
  }>;
  selectedQuoteId?: string | null;
  airReviewNotes?: string | null;
  recommendedAircraft?: string | null;
  recommendedCategory?: string | null;
  estimatedFlightTime?: string | null;
  recommendationReason?: string | null;
  createdAt: string;
  updatedAt: string;
  storedIn: "kv_buffer" | "supabase";
}

interface KVNamespaceLike {
  get: (key: string) => Promise<string | null>;
  put: (key: string, value: string, options?: { expirationTtl?: number }) => Promise<void>;
  delete?: (key: string) => Promise<void>;
}

// In-memory fallback for local Node.js unit test runner outside Cloudflare Worker runtime
const localMemoryKV = new Map<string, string>();

async function getKV(): Promise<KVNamespaceLike> {
  // 1. Try OpenNext Cloudflare runtime context
  try {
    const { getCloudflareContext } = await import("@opennextjs/cloudflare");
    const ctx = await getCloudflareContext({ async: true });
    if (ctx && ctx.env && (ctx.env as Record<string, unknown>).FLY_RATE_LIMIT) {
      return (ctx.env as Record<string, unknown>).FLY_RATE_LIMIT as KVNamespaceLike;
    }
  } catch {
    // Outside OpenNext Cloudflare runtime
  }

  // 2. Try globalThis fallback
  const globalKv = (globalThis as unknown as { FLY_RATE_LIMIT?: KVNamespaceLike }).FLY_RATE_LIMIT;
  if (globalKv && typeof globalKv.get === "function" && typeof globalKv.put === "function") {
    return globalKv;
  }

  // 3. In-memory fallback for local test execution
  return {
    async get(key: string) {
      return localMemoryKV.get(key) || null;
    },
    async put(key: string, value: string) {
      localMemoryKV.set(key, value);
    },
  };
}

export class DurableMissionBuffer {
  private static INDEX_KEY = "missions:index:all";

  /**
   * Check or acquire an idempotency key reservation
   */
  static async checkIdempotency(
    key: string,
    ownerFingerprint: string,
    payloadHash: string
  ): Promise<{ status: "NEW" | "MATCH" | "OWNERSHIP_MISMATCH" | "PAYLOAD_MISMATCH"; existingMission?: MissionBufferRecord }> {
    const kv = await getKV();
    const idempRaw = await kv.get(`idemp:${key}`);
    if (!idempRaw) {
      return { status: "NEW" };
    }

    try {
      const data = JSON.parse(idempRaw) as {
        ownerFingerprint: string;
        payloadHash: string;
        referenceId: string;
      };

      if (data.ownerFingerprint !== ownerFingerprint) {
        return { status: "OWNERSHIP_MISMATCH" };
      }

      if (data.payloadHash !== payloadHash) {
        return { status: "PAYLOAD_MISMATCH" };
      }

      const mission = await this.getMission(data.referenceId);
      return { status: "MATCH", existingMission: mission || undefined };
    } catch {
      return { status: "NEW" };
    }
  }

  /**
   * Save a newly ingested mission into the durable buffer
   */
  static async saveMission(mission: MissionBufferRecord): Promise<void> {
    const kv = await getKV();

    // 1. Store the mission payload
    await kv.put(`mission:${mission.referenceId}`, JSON.stringify(mission));

    // 2. Bind the idempotency key permanently
    if (mission.idempotencyKey) {
      await kv.put(
        `idemp:${mission.idempotencyKey}`,
        JSON.stringify({
          ownerFingerprint: mission.ownerFingerprint,
          payloadHash: mission.payloadHash,
          referenceId: mission.referenceId,
          committedAt: new Date().toISOString(),
        })
      );
    }

    // 3. Update the mission index
    try {
      const indexRaw = await kv.get(this.INDEX_KEY);
      const index: string[] = indexRaw ? JSON.parse(indexRaw) : [];
      if (!index.includes(mission.referenceId)) {
        index.unshift(mission.referenceId);
        // Keep up to 500 recent missions in primary index
        const trimmed = index.slice(0, 500);
        await kv.put(this.INDEX_KEY, JSON.stringify(trimmed));
      }
    } catch (err) {
      console.warn("[KV BUFFER INDEX UPDATE NOTICE]", err);
    }
  }

  /**
   * Retrieve a mission by its commercial reference ID
   */
  static async getMission(referenceId: string): Promise<MissionBufferRecord | null> {
    const kv = await getKV();
    const raw = await kv.get(`mission:${referenceId}`);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as MissionBufferRecord;
    } catch {
      return null;
    }
  }

  /**
   * Update mission status or operational details in buffer
   */
  static async updateMission(referenceId: string, updates: Partial<MissionBufferRecord>): Promise<MissionBufferRecord | null> {
    const mission = await this.getMission(referenceId);
    if (!mission) return null;

    const updated: MissionBufferRecord = {
      ...mission,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    const kv = await getKV();
    await kv.put(`mission:${referenceId}`, JSON.stringify(updated));
    return updated;
  }

  /**
   * List all missions stored in the buffer
   */
  static async listMissions(): Promise<MissionBufferRecord[]> {
    const kv = await getKV();
    const indexRaw = await kv.get(this.INDEX_KEY);
    if (!indexRaw) return [];

    try {
      const index: string[] = JSON.parse(indexRaw);
      const records: MissionBufferRecord[] = [];
      for (const ref of index) {
        const m = await this.getMission(ref);
        if (m) records.push(m);
      }
      return records;
    } catch {
      return [];
    }
  }
}
