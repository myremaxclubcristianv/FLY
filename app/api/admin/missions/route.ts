import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { createAdminClient } from "@/lib/supabase/admin";
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

  // Security Hardening: Only app_metadata or server-side ADMIN_EMAILS whitelist
  const role = user.app_metadata?.role;
  const isAdmin = role === "admin" || ADMIN_EMAILS.includes(user.email.toLowerCase());

  if (!isAdmin) {
    return { authorized: false, error: "Administrator authorization required" };
  }

  // MFA Assurance Check: If user enrolled MFA, enforce AAL2
  const mfa = await checkMfaStatus(supabase);
  if (mfa.enabled && mfa.currentLevel !== "aal2") {
    return { authorized: false, error: "MFA_AAL2_REQUIRED", mfaRequired: true };
  }

  return { authorized: true, user };
}

export async function GET(req: NextRequest) {
  const auth = await verifyAdminAuth(req);
  if (!auth.authorized) {
    const status = auth.error === "MFA_AAL2_REQUIRED" ? 403 : 401;
    return NextResponse.json({ success: false, error: auth.error }, { status });
  }

  try {
    // 1. Fetch real missions from Durable Edge Buffer
    const bufferMissions = await DurableMissionBuffer.listMissions();

    // 2. Attempt to fetch missions from Supabase client_mission_requests
    const adminSupabase = createAdminClient();
    let supabaseMissions: unknown[] = [];
    if (adminSupabase) {
      try {
        const { data } = await adminSupabase
          .from("client_mission_requests")
          .select("*")
          .order("created_at", { ascending: false });
        if (data) {
          supabaseMissions = data;
        }
      } catch {
        // Table not yet migrated
      }
    }

    // 3. Merge and deduplicate by referenceId
    const mergedMap = new Map<string, unknown>();
    for (const m of bufferMissions) {
      mergedMap.set(m.referenceId, m);
    }
    for (const sm of supabaseMissions as Array<{ reference_id: string }>) {
      if (sm.reference_id && !mergedMap.has(sm.reference_id)) {
        mergedMap.set(sm.reference_id, sm);
      }
    }

    const allMissions = Array.from(mergedMap.values());

    return NextResponse.json({
      success: true,
      count: allMissions.length,
      missions: allMissions,
    });
  } catch (err) {
    console.error("[ADMIN MISSIONS GET ERROR]", err);
    return NextResponse.json(
      { success: false, error: "Failed to load missions" },
      { status: 500 }
    );
  }
}
