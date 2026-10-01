import { NextRequest, NextResponse } from "next/server";
import { TelemetryEngine } from "@/lib/telemetry/engine";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (body?.sessionId && body?.visitorId) {
      await TelemetryEngine.recordHeartbeat({
        sessionId: String(body.sessionId),
        visitorId: String(body.visitorId),
        path: String(body.path || "/"),
      });
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error("[TELEMETRY HEARTBEAT ERROR]", err);
    return NextResponse.json({ success: false }, { status: 200 });
  }
}
