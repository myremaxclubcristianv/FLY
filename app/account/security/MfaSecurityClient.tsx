"use client";

import React, { useState } from "react";
import { MfaStatus } from "@/lib/auth/mfa";

export default function MfaSecurityClient({ initialStatus }: { initialStatus: MfaStatus }) {
  const [status, setStatus] = useState<MfaStatus>(initialStatus);
  const [loading, setLoading] = useState(false);
  const [enrollData, setEnrollData] = useState<{ factorId: string; qrCodeUri: string; secret: string } | null>(null);
  const [verificationCode, setVerificationCode] = useState("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleStartEnrollment = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("/api/auth/mfa/enroll", { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to start enrollment");
      }
      setEnrollData(data);
    } catch (err: unknown) {
      setMessage({ type: "error", text: err instanceof Error ? err.message : "Enrollment failed" });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!enrollData) return;

    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("/api/auth/mfa/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ factorId: enrollData.factorId, code: verificationCode }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Verification failed");
      }

      setStatus({
        enabled: true,
        currentLevel: "aal2",
        nextLevel: "aal2",
        factors: [{ id: enrollData.factorId, factorType: "totp", status: "verified" }],
      });
      setEnrollData(null);
      setMessage({ type: "success", text: "Multi-factor authentication enabled successfully. AAL2 assurance active." });
    } catch (err: unknown) {
      setMessage({ type: "error", text: err instanceof Error ? err.message : "Verification code rejected" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {message && (
        <div
          className={`p-4 rounded-xl text-xs font-mono border ${
            message.type === "success"
              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
              : "bg-red-500/10 text-red-400 border-red-500/20"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Current Status Card */}
      <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 backdrop-blur-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs font-mono uppercase text-neutral-400">STATUS</span>
          <div className="flex items-center gap-2 mt-1">
            <span
              className={`w-2 h-2 rounded-full ${status.enabled ? "bg-emerald-400" : "bg-neutral-500"}`}
            />
            <h3 className="text-lg font-light text-white">
              {status.enabled ? "Two-Factor Authentication Active" : "Two-Factor Authentication Not Configured"}
            </h3>
          </div>
          <p className="text-xs text-neutral-400 mt-1 max-w-xl">
            {status.enabled
              ? "Your account is protected by hardware/software TOTP. High-privilege routes require AAL2 assurance."
              : "Protect administrative and operations access by enrolling a TOTP authenticator application (Google Authenticator, 1Password, Authy)."}
          </p>
        </div>

        {!status.enabled && !enrollData && (
          <button
            onClick={handleStartEnrollment}
            disabled={loading}
            className="bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold px-4 py-2.5 rounded-lg text-xs transition disabled:opacity-50 whitespace-nowrap"
          >
            {loading ? "Initializing..." : "Enroll Authenticator (TOTP)"}
          </button>
        )}
      </div>

      {/* Enrollment QR & Secret Card */}
      {enrollData && (
        <div className="bg-neutral-900 border border-amber-500/30 rounded-2xl p-6 sm:p-8 space-y-6">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase text-amber-400">STEP 1: SCAN OR ENTER SECRET</span>
            <h3 className="text-xl font-light text-white mt-1">Configure Authenticator App</h3>
            <p className="text-xs text-neutral-400 mt-1">
              Scan the setup URI in your authenticator app or manually enter the secret key below.
            </p>
          </div>

          <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-3 font-mono text-xs">
            <div>
              <span className="text-neutral-500 block text-[10px] uppercase">Manual Secret Key:</span>
              <span className="text-amber-300 font-bold select-all tracking-wider text-sm">{enrollData.secret}</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[10px] uppercase">TOTP Setup URI:</span>
              <span className="text-neutral-400 select-all break-all text-[11px]">{enrollData.qrCodeUri}</span>
            </div>
          </div>

          <form onSubmit={handleVerifyCode} className="space-y-4 pt-2">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-amber-400">STEP 2: CONFIRM 6-DIGIT CODE</span>
              <label htmlFor="totp-code" className="block text-xs text-neutral-300 mt-1">
                Enter the 6-digit code currently shown in your authenticator app:
              </label>
              <input
                id="totp-code"
                type="text"
                pattern="[0-9]{6}"
                maxLength={6}
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ""))}
                placeholder="123456"
                required
                className="mt-2 bg-neutral-950 border border-neutral-700 text-white font-mono text-2xl tracking-widest text-center px-4 py-3 rounded-xl focus:border-amber-400 focus:outline-none w-48"
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={loading || verificationCode.length !== 6}
                className="bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold px-5 py-2.5 rounded-lg text-xs transition disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Verify & Activate MFA"}
              </button>
              <button
                type="button"
                onClick={() => setEnrollData(null)}
                className="text-neutral-400 hover:text-white text-xs font-mono transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
