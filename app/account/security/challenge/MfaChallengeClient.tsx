"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function MfaChallengeClient({
  factorId,
  returnUrl,
  userEmail,
}: {
  factorId: string;
  returnUrl: string;
  userEmail: string;
}) {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/mfa/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ factorId, code }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Invalid verification code");
      }

      // Elevation successful -> redirect to returnUrl
      router.push(returnUrl);
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Verification failed");
      setCode("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-mono">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="challenge-code" className="block text-xs font-mono text-neutral-400 mb-1">
          Verification Code (Account: {userEmail})
        </label>
        <input
          id="challenge-code"
          type="text"
          pattern="[0-9]{6}"
          maxLength={6}
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
          placeholder="000000"
          autoFocus
          required
          className="w-full bg-neutral-950 border border-neutral-700 text-white font-mono text-3xl tracking-widest text-center py-3.5 rounded-xl focus:border-amber-400 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading || code.length !== 6}
        className="w-full bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold py-3 rounded-xl text-xs uppercase tracking-wider transition disabled:opacity-50 mt-2"
      >
        {loading ? "Verifying..." : "Verify & Continue"}
      </button>

      <div className="pt-2 text-center">
        <a href="/login" className="text-xs text-neutral-500 hover:text-neutral-400 font-mono transition">
          Sign out and return to login
        </a>
      </div>
    </form>
  );
}
