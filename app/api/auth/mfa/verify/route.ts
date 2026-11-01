import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { verifyMfaTotp } from "@/lib/auth/mfa";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

    let response = NextResponse.json({ success: true });

    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => req.cookies.set(name, value));
          response = NextResponse.json({ success: true });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    });

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const factorId = String(body.factorId || "").trim();
    const code = String(body.code || "").trim();

    if (!factorId || !code || code.length !== 6) {
      return NextResponse.json(
        { error: "Valid 6-digit TOTP code and factor ID required" },
        { status: 400 }
      );
    }

    await verifyMfaTotp(supabase, factorId, code);

    // Refresh session to elevate assurance level to AAL2
    await supabase.auth.refreshSession();

    return response;
  } catch (err: unknown) {
    console.error("[MFA VERIFY ERROR]", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "MFA verification failed" },
      { status: 400 }
    );
  }
}
