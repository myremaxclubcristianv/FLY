import { NextRequest, NextResponse } from "next/server";
import { TelemetryEngine } from "@/lib/telemetry/engine";
import { TelemetryEventType, EventCategory } from "@/lib/telemetry/types";
import { checkRateLimit, createRateLimitResponse } from "@/lib/security/rate-limiter";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const rateLimit = await checkRateLimit(req, "telemetry_event");
    if (!rateLimit.allowed) {
      return createRateLimitResponse(rateLimit.resetInSeconds);
    }

    const body = await req.json().catch(() => null);
    if (!body || !body.visitorId || !body.sessionId || !body.eventName) {
      return NextResponse.json({ success: false, error: "Invalid payload" }, { status: 400 });
    }

    // Sanitize strings & length limits
    const visitorId = String(body.visitorId).substring(0, 32);
    const sessionId = String(body.sessionId).substring(0, 32);
    const eventName = String(body.eventName).substring(0, 64) as TelemetryEventType;
    const eventCategory = body.eventCategory ? (String(body.eventCategory).substring(0, 32) as EventCategory) : undefined;
    const pagePath = String(body.pagePath || "/").substring(0, 255);
    const pageTitle = body.pageTitle ? String(body.pageTitle).substring(0, 255) : undefined;
    const componentId = body.componentId ? String(body.componentId).substring(0, 128) : undefined;
    const ctaName = body.ctaName ? String(body.ctaName).substring(0, 128) : undefined;
    const routeContext = body.routeContext ? String(body.routeContext).substring(0, 255) : undefined;

    const result = await TelemetryEngine.ingestEvent({
      eventId: body.eventId,
      visitorId,
      sessionId,
      eventName,
      eventCategory,
      pagePath,
      pageTitle,
      componentId,
      ctaName,
      routeContext,
      payload: typeof body.payload === "object" ? body.payload : {},
    });

    return NextResponse.json(result);
  } catch (err: unknown) {
    console.error("[TELEMETRY EVENT INGEST ERROR]", err);
    return NextResponse.json({ success: false, error: "Ingestion failed" }, { status: 200 });
  }
}
