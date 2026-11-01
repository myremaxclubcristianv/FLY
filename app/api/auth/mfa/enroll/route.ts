import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { enrollMfaTotp, checkMfaStatus } from "@/lib/auth/mfa";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => req.cookies.set(name, value));
        },
      },
    });

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const mfaStatus = await checkMfaStatus(supabase);
    if (mfaStatus.enabled) {
      return NextResponse.json(
        { error: "MFA is already enrolled for this account" },
        { status: 400 }
      );
    }

    const enrollment = await enrollMfaTotp(supabase, "AIR Executive Authenticator");
    return NextResponse.json({
      success: true,
      factorId: enrollment.factorId,
      qrCodeUri: enrollment.qrCodeUri,
      secret: enrollment.secret,
    });
  } catch (err: unknown) {
    console.error("[MFA ENROLL ERROR]", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to initialize MFA enrollment" },
      { status: 500 }
    );
  }
}
