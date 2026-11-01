import { NextRequest, NextResponse } from "next/server";
import { TelemetryEngine } from "@/lib/telemetry/engine";
import { ConsentStatus } from "@/lib/telemetry/types";
import { checkRateLimit, createRateLimitResponse } from "@/lib/security/rate-limiter";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const rateLimit = await checkRateLimit(req, "telemetry_session");
    if (!rateLimit.allowed) {
      return createRateLimitResponse(rateLimit.resetInSeconds);
    }

    const body = await req.json().catch(() => ({}));
    const headers = req.headers;

    const country =
      headers.get("x-vercel-ip-country") ||
      headers.get("cf-ipcountry") ||
      "RO";
    const city = headers.get("x-vercel-ip-city") || "Bucharest";
    const region = headers.get("x-vercel-ip-country-region") || "Bucharest";
    const timezone = headers.get("x-vercel-ip-timezone") || "Europe/Bucharest";
    const userAgent = headers.get("user-agent") || undefined;

    const result = await TelemetryEngine.registerSession({
      visitorId: body.visitorId,
      sessionId: body.sessionId,
      path: body.path || "/",
      referrer: body.referrer,
      utmSource: body.utmSource,
      utmMedium: body.utmMedium,
      utmCampaign: body.utmCampaign,
      utmContent: body.utmContent,
      utmTerm: body.utmTerm,
      viewportWidth: body.viewportWidth,
      viewportHeight: body.viewportHeight,
      screenWidth: body.screenWidth,
      screenHeight: body.screenHeight,
      language: body.language,
      userAgent,
      geoHeaders: { country, region, city, timezone },
      consentStatus: (body.consentStatus as ConsentStatus) || "GRANTED",
      userId: body.userId,
      initialCta: body.initialCta,
      firstSection: body.firstSection,
    });

    return NextResponse.json({
      success: true,
      visitorId: result.visitor.visitorId,
      sessionId: result.session.sessionId,
      isNewVisitor: result.isNewVisitor,
      isNewSession: result.isNewSession,
    });
  } catch (err: unknown) {
    console.error("[TELEMETRY SESSION ERROR]", err);
    return NextResponse.json(
      { success: false, error: "Ingestion failed" },
      { status: 200 } // Keep 200 to prevent noisy browser errors
    );
  }
}
