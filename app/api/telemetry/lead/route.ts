import { NextRequest, NextResponse } from "next/server";
import { TelemetryEngine } from "@/lib/telemetry/engine";
import { LeadSubmissionPayload } from "@/lib/telemetry/types";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || !body.referenceId) {
      return NextResponse.json({ success: false, error: "Missing reference ID" }, { status: 400 });
    }

    const payload: LeadSubmissionPayload = {
      referenceId: String(body.referenceId),
      visitorId: body.visitorId ? String(body.visitorId) : undefined,
      sessionId: body.sessionId ? String(body.sessionId) : undefined,
      leadType: body.leadType || "FLIGHT_REQUEST",
      name: body.name ? String(body.name).substring(0, 255) : undefined,
      email: body.email ? String(body.email).substring(0, 255) : undefined,
      phone: body.phone ? String(body.phone).substring(0, 64) : undefined,
      origin: body.origin ? String(body.origin).substring(0, 255) : undefined,
      destination: body.destination ? String(body.destination).substring(0, 255) : undefined,
      passengers: typeof body.passengers === "number" ? body.passengers : 1,
      tripType: body.tripType ? String(body.tripType) : "ONE_WAY",
      date: body.date ? String(body.date) : undefined,
      budget: body.budget ? String(body.budget) : undefined,
      priority: body.priority ? String(body.priority) : undefined,
      purpose: body.purpose ? String(body.purpose) : undefined,
      notes: body.notes ? String(body.notes).substring(0, 1000) : undefined,
      source: body.source ? String(body.source) : undefined,
      campaign: body.campaign ? String(body.campaign) : undefined,
      landingPage: body.landingPage ? String(body.landingPage) : undefined,
      pagesBeforeConversion: body.pagesBeforeConversion,
      sessionDurationSeconds: body.sessionDurationSeconds,
    };

    const result = await TelemetryEngine.registerLead(payload);

    return NextResponse.json(result);
  } catch (err: unknown) {
    console.error("[TELEMETRY LEAD INGEST ERROR]", err);
    return NextResponse.json({ success: false, error: "Failed to register lead" }, { status: 200 });
  }
}
