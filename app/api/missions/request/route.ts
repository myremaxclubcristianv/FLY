import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { createAdminClient } from "@/lib/supabase/admin";
import { checkRateLimit, createRateLimitResponse } from "@/lib/security/rate-limiter";
import { DurableMissionBuffer, MissionBufferRecord } from "@/lib/services/durable-mission-buffer";
import { TelemetryEngine } from "@/lib/telemetry/engine";
import { LeadSubmissionPayload } from "@/lib/telemetry/types";

export const dynamic = "force-dynamic";

function computeSha256(input: string): Promise<string> {
  const enc = new TextEncoder().encode(input);
  return crypto.subtle.digest("SHA-256", enc).then((buf) => {
    return Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  });
}

function generateDynamicMissionReference(): string {
  const alphabet = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";
  const year = new Date().getFullYear();
  let code = "";
  const randomBytes = new Uint8Array(8);
  crypto.getRandomValues(randomBytes);
  for (let i = 0; i < 8; i++) {
    code += alphabet[randomBytes[i] % alphabet.length];
  }
  return `AIR-${year}-${code}`;
}

function canonicalizePayload(body: Record<string, unknown>): string {
  const canonical = {
    budget_preference: String(body.budgetPreference || "STANDARD_CHARTER"),
    date_flexibility: String(body.dateFlexibility || "EXACT"),
    departure_date: String(body.date || body.departure_date || ""),
    destination: String(body.to || body.destination || "").trim().toLowerCase(),
    destination_icao: String(body.toIcao || body.destination_icao || "").trim().toUpperCase(),
    origin: String(body.from || body.origin || "").trim().toLowerCase(),
    origin_icao: String(body.fromIcao || body.origin_icao || "").trim().toUpperCase(),
    passengers: Number(body.passengers || 1),
    priority: String(body.priority || "FASTEST"),
    purpose: String(body.purpose || "EXECUTIVE_BUSINESS"),
    requirements: Array.isArray(body.requirements) ? [...body.requirements].sort() : [],
    return_date: body.returnDate ? String(body.returnDate) : null,
    trip_type: String(body.tripType || "ONE_WAY"),
  };
  return JSON.stringify(canonical, Object.keys(canonical).sort());
}

export async function POST(req: NextRequest) {
  try {
    // 0. Server-Side Rate Limiting
    const rateLimit = await checkRateLimit(req, "flight_lead");
    if (!rateLimit.allowed) {
      return createRateLimitResponse(rateLimit.resetInSeconds);
    }

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ success: false, error: "Invalid flight request payload." }, { status: 400 });
    }

    // 1. Idempotency Key Validation / Auto-Generation
    const clientKey = req.headers.get("Idempotency-Key") || req.headers.get("x-idempotency-key") || body.idempotencyKey;
    const idempotencyKey = clientKey && String(clientKey).trim().length >= 16
      ? String(clientKey).trim().substring(0, 64)
      : `idemp-${crypto.randomUUID()}`;

    // 2. Authentication & Requester Identity Binding
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
    let verifiedUserId: string | null = null;
    let verifiedUserEmail: string | null = null;
    let ownerFingerprint = "";

    if (supabaseUrl && supabaseAnonKey) {
      const ssrClient = createServerClient(supabaseUrl, supabaseAnonKey, {
        cookies: {
          getAll() {
            return req.cookies.getAll();
          },
          setAll() {},
        },
      });

      const { data: { user } } = await ssrClient.auth.getUser();
      if (user && user.id && user.email) {
        if (!user.email_confirmed_at && process.env.NODE_ENV === "production") {
          return NextResponse.json(
            { success: false, error: "Email unconfirmed. Please verify your email before submitting charter requests." },
            { status: 403 }
          );
        }
        verifiedUserId = user.id;
        verifiedUserEmail = user.email.toLowerCase().trim();
        ownerFingerprint = `auth:${user.id}`;
      }
    }

    // Guest fallback binding
    if (!verifiedUserId) {
      const guestEmail = String(body.email || "").trim().toLowerCase();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!guestEmail || !emailRegex.test(guestEmail)) {
        return NextResponse.json(
          { success: false, error: "A valid contact email address is required." },
          { status: 400 }
        );
      }
      const clientIp = req.headers.get("cf-connecting-ip") || req.headers.get("x-forwarded-for") || "127.0.0.1";
      const ipSubnet = clientIp.split(".").slice(0, 3).join(".");
      const visitorId = req.cookies.get("air_vid")?.value || "anon";
      ownerFingerprint = `guest:${await computeSha256(`${guestEmail}:${ipSubnet}:${visitorId}`)}`;
    }

    // 3. Compute Canonical Payload Hash
    const canonicalString = canonicalizePayload(body);
    const payloadHash = await computeSha256(canonicalString);

    // 4. Idempotency Check in Durable Buffer
    const idempStatus = await DurableMissionBuffer.checkIdempotency(idempotencyKey, ownerFingerprint, payloadHash);
    if (idempStatus.status === "OWNERSHIP_MISMATCH") {
      return NextResponse.json(
        { success: false, error: "Access denied: Idempotency key belongs to another requester." },
        { status: 403 }
      );
    }
    if (idempStatus.status === "PAYLOAD_MISMATCH") {
      return NextResponse.json(
        { success: false, error: "Conflict: Idempotency key reused with modified flight parameters." },
        { status: 409 }
      );
    }
    if (idempStatus.status === "MATCH" && idempStatus.existingMission) {
      return NextResponse.json({
        success: true,
        referenceId: idempStatus.existingMission.referenceId,
        missionId: idempStatus.existingMission.id,
        isDuplicate: true,
        status: idempStatus.existingMission.status,
      });
    }

    // 5. Parameter Validation
    const origin = String(body.from || body.origin || "").trim();
    const destination = String(body.to || body.destination || "").trim();
    const departureDate = String(body.date || body.departure_date || "").trim();

    if (!origin || origin.length < 2) {
      return NextResponse.json({ success: false, error: "Origin location is required." }, { status: 400 });
    }
    if (!destination || destination.length < 2) {
      return NextResponse.json({ success: false, error: "Destination location is required." }, { status: 400 });
    }
    if (!departureDate) {
      return NextResponse.json({ success: false, error: "Departure date is required." }, { status: 400 });
    }

    const passengers = Math.max(1, Math.min(150, Number(body.passengers || 1)));
    const referenceId = generateDynamicMissionReference();
    const missionId = crypto.randomUUID();
    const contactEmail = verifiedUserEmail || String(body.email || "").trim().toLowerCase();
    const contactName = body.name ? String(body.name).trim().substring(0, 100) : null;
    const contactPhone = body.phone ? String(body.phone).trim().substring(0, 30) : null;
    const clientNotes = body.message || body.notes ? String(body.message || body.notes).substring(0, 3000) : null;

    const missionRecord: MissionBufferRecord = {
      id: missionId,
      referenceId,
      idempotencyKey,
      ownerFingerprint,
      payloadHash,
      status: "REQUESTED",
      statusLabel: "Mission Logged // Sourcing Dispatch Initiated",
      assignedAdvisor: "AIR Operations Center (Bucharest)",
      origin,
      originIcao: body.fromIcao ? String(body.fromIcao).trim().toUpperCase() : null,
      destination,
      destinationIcao: body.toIcao ? String(body.toIcao).trim().toUpperCase() : null,
      tripType: String(body.tripType || "ONE_WAY"),
      departureDate,
      returnDate: body.returnDate ? String(body.returnDate) : null,
      preferredTime: body.time ? String(body.time) : null,
      dateFlexibility: String(body.dateFlexibility || "EXACT"),
      passengers,
      budgetPreference: String(body.budgetPreference || "STANDARD_CHARTER"),
      priority: String(body.priority || "FASTEST"),
      purpose: String(body.purpose || "EXECUTIVE_BUSINESS"),
      requirements: Array.isArray(body.requirements) ? body.requirements : [],
      name: contactName,
      email: contactEmail,
      phone: contactPhone,
      notes: clientNotes,
      userId: verifiedUserId,
      quotes: [],
      recommendedAircraft: body.recommendedAircraft ? String(body.recommendedAircraft) : null,
      recommendedCategory: body.recommendedCategory ? String(body.recommendedCategory) : null,
      estimatedFlightTime: body.estimatedFlightTime ? String(body.estimatedFlightTime) : null,
      recommendationReason: body.recommendationReason ? String(body.recommendationReason) : null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      storedIn: "kv_buffer",
    };

    // 6. Persistence: Attempt Supabase Atomic Ingestion First
    let storedIn: "supabase" | "kv_buffer" = "kv_buffer";
    const adminSupabase = createAdminClient();
    if (adminSupabase) {
      try {
        const { data: rpcData, error: rpcError } = await adminSupabase.rpc(
          "submit_mission_request_atomic",
          {
            p_idempotency_key: idempotencyKey,
            p_owner_fingerprint: ownerFingerprint,
            p_payload_hash: payloadHash,
            p_payload: {
              origin,
              destination,
              departure_date: departureDate,
              return_date: missionRecord.returnDate,
              preferred_time: missionRecord.preferredTime,
              passengers,
              name: contactName,
              email: contactEmail,
              phone: contactPhone,
              notes: clientNotes,
            },
            p_verified_user_id: verifiedUserId,
            p_verified_user_email: verifiedUserEmail,
          }
        );

        if (!rpcError && rpcData?.success) {
          storedIn = "supabase";
          missionRecord.storedIn = "supabase";
          if (rpcData.reference_id) {
            missionRecord.referenceId = rpcData.reference_id;
          }
          if (rpcData.mission_id) {
            missionRecord.id = rpcData.mission_id;
          }
        }
      } catch (err) {
        console.warn("[SUPABASE RPC ATTEMPT NOTICE]", err);
      }
    }

    // 7. Durable Edge Persistence: Always preserve in KV buffer
    await DurableMissionBuffer.saveMission(missionRecord);

    // 8. Realtime Operations Alert (Telegram Lead Attribution)
    const leadPayload: LeadSubmissionPayload = {
      referenceId: missionRecord.referenceId,
      visitorId: body.visitorId ? String(body.visitorId) : undefined,
      sessionId: body.sessionId ? String(body.sessionId) : undefined,
      leadType: "FLIGHT_REQUEST",
      name: contactName || undefined,
      email: contactEmail,
      phone: contactPhone || undefined,
      origin,
      destination,
      passengers,
      tripType: missionRecord.tripType,
      date: departureDate,
      budget: missionRecord.budgetPreference,
      priority: missionRecord.priority,
      purpose: missionRecord.purpose,
      notes: clientNotes || undefined,
      source: "Planner Direct",
      leadStatus: "NEW",
    };

    await TelemetryEngine.registerLead(leadPayload).catch((e) =>
      console.error("[TELEMETRY ALERT NOTICE]", e)
    );

    return NextResponse.json({
      success: true,
      referenceId: missionRecord.referenceId,
      missionId: missionRecord.id,
      isDuplicate: false,
      status: missionRecord.status,
      storedIn,
      message: "Flight mission request successfully logged & sourcing dispatch initiated.",
    });
  } catch (err: unknown) {
    console.error("[MISSION INGESTION API EXCEPTION]", err);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred while processing flight request." },
      { status: 500 }
    );
  }
}
