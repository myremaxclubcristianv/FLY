import { VerificationStatus, DataStatus } from "../../types/verification";
import { createAdminClient } from "../supabase/admin";

export interface VerificationRecord {
  id: string;
  entityType: "OPERATOR" | "AIRCRAFT" | "LOCATION" | "EXPERIENCE";
  entityId: string;
  entityName: string;
  verificationType: "IDENTITY" | "WEBSITE" | "AIRCRAFT" | "OPERATIONAL" | "DOCUMENT" | "DATA";
  status: VerificationStatus;
  dataStatus: DataStatus;
  sourceName?: string;
  verifiedBy?: string;
  verifiedAt: string;
  notes?: string;
}

export class VerificationAuditService {
  private records: VerificationRecord[] = [
    {
      id: "ver-101",
      entityType: "OPERATOR",
      entityId: "op-heli-ro",
      entityName: "Carpathian Heli Access",
      verificationType: "IDENTITY",
      status: "IDENTITY_CHECKED",
      dataStatus: "INDICATIVE",
      sourceName: "Public CAA Registry",
      verifiedBy: "AIR Audit Team",
      verifiedAt: "2026-09-01T10:00:00Z",
      notes: "Legal entity checked against trade register.",
    },
    {
      id: "ver-102",
      entityType: "AIRCRAFT",
      entityId: "ac-light-jet-1",
      entityName: "Phenom 300 Category Jet",
      verificationType: "AIRCRAFT",
      status: "DATA_VERIFIED",
      dataStatus: "INDICATIVE",
      sourceName: "AIR Technical Audit",
      verifiedBy: "AIR Ops",
      verifiedAt: "2026-08-28T14:30:00Z",
      notes: "Seating payload and cruise speed benchmarks verified.",
    },
  ];

  async getPendingQueue(): Promise<VerificationRecord[]> {
    const adminSupabase = createAdminClient();
    if (adminSupabase) {
      const { data } = await adminSupabase
        .from("verification_records")
        .select("*")
        .order("created_at", { ascending: false });

      if (data && data.length > 0) {
        return data.map((r) => ({
          id: String(r.id),
          entityType: r.entity_type as VerificationRecord["entityType"],
          entityId: String(r.entity_id),
          entityName: `Entity ${r.entity_id}`,
          verificationType: r.verification_type as VerificationRecord["verificationType"],
          status: r.status as VerificationStatus,
          dataStatus: "INDICATIVE",
          verifiedBy: r.verified_by ? String(r.verified_by) : "System Audit",
          verifiedAt: String(r.verified_at || r.created_at),
          notes: r.notes ? String(r.notes) : undefined,
        }));
      }
    }

    return this.records;
  }

  async recordVerification(
    record: Omit<VerificationRecord, "id" | "verifiedAt">
  ): Promise<VerificationRecord> {
    const newRecord: VerificationRecord = {
      ...record,
      id: `ver-${Date.now()}`,
      verifiedAt: new Date().toISOString(),
    };

    const adminSupabase = createAdminClient();
    if (adminSupabase) {
      await adminSupabase.from("verification_records").insert({
        entity_type: record.entityType,
        entity_id: record.entityId,
        verification_type: record.verificationType,
        status: record.status,
        verified_by: record.verifiedBy || "ADMIN",
        notes: record.notes,
      });
    }

    this.records.unshift(newRecord);
    return newRecord;
  }
}

export const verificationAuditService = new VerificationAuditService();
