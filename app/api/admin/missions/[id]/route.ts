import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { DurableMissionBuffer } from "@/lib/services/durable-mission-buffer";
import { checkMfaStatus } from "@/lib/auth/mfa";

export const dynamic = "force-dynamic";

const ADMIN_EMAILS = [
  "myremaxclubcristianv@gmail.com",
  "contact@cristianvaduva.com",
  "admin@air.aero",
];

async function verifyAdminAuth(req: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  if (!supabaseUrl || !supabaseAnonKey) {
    return { authorized: false, error: "Authentication configuration missing" };
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return req.cookies.getAll();
      },
      setAll() {},
    },
  });

  const { data: { user } } = await supabase.auth.getUser();
  if (!user || !user.email) {
    return { authorized: false, error: "Authentication required" };
  }

  const role = user.app_metadata?.role;
  const isAdmin = role === "admin" || ADMIN_EMAILS.includes(user.email.toLowerCase());

  if (!isAdmin) {
    return { authorized: false, error: "Administrator authorization required" };
  }

  const mfa = await checkMfaStatus(supabase);
  if (mfa.enabled && mfa.currentLevel !== "aal2") {
    return { authorized: false, error: "MFA_AAL2_REQUIRED", mfaRequired: true };
  }

  return { authorized: true, user };
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await verifyAdminAuth(req);
  if (!auth.authorized) {
    const status = auth.error === "MFA_AAL2_REQUIRED" ? 403 : 401;
    return NextResponse.json({ success: false, error: auth.error }, { status });
  }

  const { id: referenceId } = await params;
  const mission = await DurableMissionBuffer.getMission(referenceId);
  if (!mission) {
    return NextResponse.json({ success: false, error: "Mission not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, mission });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await verifyAdminAuth(req);
  if (!auth.authorized) {
    const status = auth.error === "MFA_AAL2_REQUIRED" ? 403 : 401;
    return NextResponse.json({ success: false, error: auth.error }, { status });
  }

  const { id: referenceId } = await params;
  const body = await req.json().catch(() => ({}));

  const allowedUpdates: Record<string, unknown> = {};
  if (body.status) allowedUpdates.status = String(body.status);
  if (body.statusLabel) allowedUpdates.statusLabel = String(body.statusLabel);
  if (body.assignedAdvisor) allowedUpdates.assignedAdvisor = String(body.assignedAdvisor);
  if (body.airReviewNotes) allowedUpdates.airReviewNotes = String(body.airReviewNotes);
  if (body.selectedQuoteId) allowedUpdates.selectedQuoteId = String(body.selectedQuoteId);

  const updated = await DurableMissionBuffer.updateMission(referenceId, allowedUpdates);
  if (!updated) {
    return NextResponse.json({ success: false, error: "Mission not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, mission: updated });
}
