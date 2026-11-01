import { Metadata } from "next";
import { requireAuth } from "@/lib/auth/server-guard";
import { createClient } from "@/lib/supabase/server";
import { checkMfaStatus } from "@/lib/auth/mfa";
import { redirect } from "next/navigation";
import MfaChallengeClient from "./MfaChallengeClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "MFA Verification Required — AIR Access Security",
  description: "Verify your identity with two-factor authentication to access privileged resources.",
  robots: { index: false, follow: false },
};

export default async function MfaChallengePage({
  searchParams,
}: {
  searchParams: Promise<{ returnUrl?: string }>;
}) {
  const { returnUrl = "/admin" } = await searchParams;
  const user = await requireAuth(returnUrl);
  const supabase = await createClient();
  const mfaStatus = supabase
    ? await checkMfaStatus(supabase)
    : { enabled: false, currentLevel: "aal1" as const, nextLevel: "aal1" as const, factors: [] };

  // If already at AAL2, redirect immediately to target
  if (mfaStatus.currentLevel === "aal2") {
    redirect(returnUrl);
  }

  // If no MFA enrolled, prompt enrollment first
  if (!mfaStatus.enabled) {
    redirect(`/account/security?notice=mfa_required&returnUrl=${encodeURIComponent(returnUrl)}`);
  }

  const factorId = mfaStatus.factors[0]?.id || "";

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-neutral-900/80 border border-neutral-800 rounded-3xl p-8 backdrop-blur-xl shadow-2xl space-y-6">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20">
            SECURITY CHALLENGE // AAL2
          </span>
          <h1 className="text-2xl font-light text-white mt-2">Two-Factor Authentication</h1>
          <p className="text-xs text-neutral-400 mt-1">
            Access to this resource requires second-factor verification. Enter the 6-digit code from your authenticator app.
          </p>
        </div>

        <MfaChallengeClient factorId={factorId} returnUrl={returnUrl} userEmail={user.email} />
      </div>
    </div>
  );
}
