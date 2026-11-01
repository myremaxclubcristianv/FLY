import { Metadata } from "next";
import Link from "next/link";
import { requireAuth } from "@/lib/auth/server-guard";
import { createClient } from "@/lib/supabase/server";
import { checkMfaStatus } from "@/lib/auth/mfa";
import MfaSecurityClient from "./MfaSecurityClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Account Security & Multi-Factor Authentication — AIR",
  description: "Configure two-factor authentication (TOTP) and security settings for your AIR account.",
  robots: { index: false, follow: false },
};

export default async function AccountSecurityPage() {
  const user = await requireAuth("/account/security");
  const supabase = await createClient();
  const mfaStatus = supabase
    ? await checkMfaStatus(supabase)
    : { enabled: false, currentLevel: "aal1" as const, nextLevel: "aal1" as const, factors: [] };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 p-6 sm:p-10 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <Link href="/account" className="text-xs text-amber-400 hover:underline font-mono block mb-3">
            ← Return to Account Dashboard
          </Link>
          <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 sm:p-8 backdrop-blur-xl">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20">
              SECURITY ASSURANCE CENTER
            </span>
            <h1 className="text-2xl sm:text-3xl font-light text-white mt-2">
              Multi-Factor Authentication (MFA / TOTP)
            </h1>
            <p className="text-xs text-neutral-400 font-mono mt-1">
              Account: <span className="text-neutral-200">{user.email}</span> | Current Level:{" "}
              <strong className={mfaStatus.currentLevel === "aal2" ? "text-emerald-400" : "text-amber-400"}>
                {mfaStatus.currentLevel.toUpperCase()}
              </strong>
            </p>
          </div>
        </div>

        <MfaSecurityClient initialStatus={mfaStatus} />
      </div>
    </div>
  );
}
