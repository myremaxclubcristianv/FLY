import { NextRequest, NextResponse } from "next/server";
import { TelemetryEngine, parseUserAgent } from "@/lib/telemetry/engine";
import { LeadSubmissionPayload } from "@/lib/telemetry/types";
import { checkRateLimit, createRateLimitResponse } from "@/lib/security/rate-limiter";

export const dynamic = "force-dynamic";

const VALID_SERVICES = [
  "Private Flight",
  "Helicopter",
  "Business Aviation",
  "Aircraft",
  "Experience",
  "Corporate",
  "Other",
];

function generateLeadId(): string {
  const chars = "0123456789ABCDEF";
  let id = "";
  for (let i = 0; i < 8; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `L-${id}`;
}

export async function POST(req: NextRequest) {
  try {
    // 0. Server-Side Rate Limiting
    const rateLimit = await checkRateLimit(req, "contact_form");
    if (!rateLimit.allowed) {
      return createRateLimitResponse(rateLimit.resetInSeconds);
    }

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, error: "Invalid request payload" },
        { status: 400 }
      );
    }

    // 1. Honeypot Anti-Spam Check
    if (body._air_hp_fax_ref && String(body._air_hp_fax_ref).trim().length > 0) {
      console.warn("[ANTI-SPAM] Honeypot triggered in contact inquiry.");
      return NextResponse.json({ success: true, referenceId: generateLeadId() });
    }

    // 2. Field Normalization & Validation
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const phone = String(body.phone || "").trim();
    const company = body.company ? String(body.company).trim().substring(0, 100) : undefined;
    const rawService = String(body.serviceInterest || "Private Flight").trim();
    const message = String(body.message || "").trim();

    if (!name || name.length < 2 || name.length > 100) {
      return NextResponse.json(
        { success: false, error: "Please provide your full name (2-100 characters)." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email) || email.length > 150) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!phone || phone.length < 6 || phone.length > 30) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid contact phone number." },
        { status: 400 }
      );
    }

    if (!message || message.length < 5 || message.length > 3000) {
      return NextResponse.json(
        { success: false, error: "Please provide a message with at least 5 characters." },
        { status: 400 }
      );
    }

    const serviceInterest = VALID_SERVICES.includes(rawService) ? rawService : "Private Flight";
    const leadId = generateLeadId();

    // 3. Extract Geo & Attribution headers
    const headers = req.headers;
    const country = headers.get("x-vercel-ip-country") || headers.get("cf-ipcountry") || "Romania";
    const city = headers.get("x-vercel-ip-city") || undefined;
    const userAgent = headers.get("user-agent") || undefined;
    const parsedDevice = parseUserAgent(userAgent);

    const payload: LeadSubmissionPayload = {
      referenceId: leadId,
      visitorId: body.visitorId ? String(body.visitorId).substring(0, 32) : undefined,
      sessionId: body.sessionId ? String(body.sessionId).substring(0, 32) : undefined,
      leadType: "CONTACT_MESSAGE",
      name,
      email,
      phone,
      company,
      serviceInterest,
      message,
      notes: message,
      currentPage: body.currentPage ? String(body.currentPage).substring(0, 255) : "/contact",
      landingPage: body.landingPage ? String(body.landingPage).substring(0, 255) : "/",
      country,
      city,
      deviceType: parsedDevice.deviceType,
      os: parsedDevice.os,
      browser: parsedDevice.browser,
      leadStatus: "NEW",
    };

    // 4. Server-Side Lead Registration & Telegram Notification
    await TelemetryEngine.registerLead(payload);

    return NextResponse.json({
      success: true,
      referenceId: leadId,
      message: "Thank you. AIR has received your request.",
    });
  } catch (err: unknown) {
    console.error("[CONTACT API ERROR]", err);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred while processing your request." },
      { status: 500 }
    );
  }
}
