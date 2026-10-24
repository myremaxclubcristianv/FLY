"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { telemetryClient } from "@/lib/telemetry/client";
import { ConsentStatus } from "@/lib/telemetry/types";

export function ConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    try {
      const stored = localStorage.getItem("air_consent_status");
      if (!stored) {
        // Defer until browser is idle or after 3.5s so LCP completes cleanly
        if (typeof window !== "undefined" && "requestIdleCallback" in window) {
          const handle = (window as unknown as { requestIdleCallback: (cb: () => void, opts: { timeout: number }) => number }).requestIdleCallback(
            () => setIsVisible(true),
            { timeout: 3500 }
          );
          return () => {
            if ("cancelIdleCallback" in window) {
              (window as unknown as { cancelIdleCallback: (h: number) => void }).cancelIdleCallback(handle);
            }
          };
        } else {
          const timer = setTimeout(() => setIsVisible(true), 3500);
          return () => clearTimeout(timer);
        }
      }
    } catch {
      // Safe fallback
    }
  }, []);

  const handleChoice = (choice: ConsentStatus) => {
    telemetryClient.setConsentStatus(choice);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="region"
      aria-label="Privacy & Cookie Preferences"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="bg-neutral-950/95 border border-amber-500/30 backdrop-blur-xl p-5 rounded-2xl shadow-2xl shadow-black/80 flex flex-col gap-3 text-neutral-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400">
              AIR FIRST-PARTY PRIVACY
            </span>
          </div>
          <span className="text-[9px] font-mono text-neutral-500">DOC-03 // COMPLIANCE</span>
        </div>

        <p className="text-xs text-neutral-300 font-sans leading-relaxed">
          AIR utilizes strictly necessary session tokens and lightweight first-party mission analytics to compute aircraft routing. We never deploy third-party advertising cookies or cross-site tracking.
        </p>

        <div className="flex items-center justify-between gap-3 pt-1 border-t border-white/5">
          <Link
            href="/legal/cookies"
            prefetch={false}
            className="text-[10px] font-mono text-neutral-400 hover:text-amber-400 underline underline-offset-2"
          >
            Cookie Policy →
          </Link>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleChoice("ESSENTIAL_ONLY")}
              className="px-3 py-1.5 rounded text-[10px] font-mono font-medium text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
            >
              ESSENTIAL ONLY
            </button>
            <button
              type="button"
              onClick={() => handleChoice("GRANTED")}
              className="px-3.5 py-1.5 rounded text-[10px] font-mono font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow-sm"
            >
              ACCEPT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
