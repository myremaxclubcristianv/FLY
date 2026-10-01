import { NextResponse } from "next/server";
import { TelemetryEngine } from "@/lib/telemetry/engine";

export const dynamic = "force-dynamic";

export async function GET() {
  const activeVisitors = TelemetryEngine.getActiveVisitors();
  return NextResponse.json({
    count: activeVisitors.length,
    activeVisitors,
    timestamp: new Date().toISOString(),
  });
}
