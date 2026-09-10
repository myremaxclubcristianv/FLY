"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { DataStatusBadge } from "@/components/shared/DataStatusBadge";
import { ProvenanceBadge } from "@/components/shared/ProvenanceBadge";
import { missionRequestService, MissionDetailRecord } from "@/lib/services/mission-request-service";

const WORKFLOW_STAGES = [
  { key: "REQUESTED", label: "01 // REQUESTED" },
  { key: "SOURCING", label: "02 // SOURCING" },
  { key: "QUOTES_RECEIVED", label: "03 // QUOTES RECEIVED" },
  { key: "AIR_REVIEW", label: "04 // AIR REVIEW" },
  { key: "PRESENTED", label: "05 // PRESENTED" },
  { key: "CONFIRMED", label: "06 // CONFIRMED" },
];

export default function QuoteComparisonView({ referenceId }: { referenceId: string }) {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>("opt-1");
  const [clarificationSent, setClarificationSent] = useState(false);
  const [missionRecord, setMissionRecord] = useState<MissionDetailRecord | null>(null);

  useEffect(() => {
    const rec = missionRequestService.getRequestByReference(referenceId);
    if (rec) {
      setMissionRecord(rec);
      if (rec.quotes && rec.quotes.length > 0) {
        setSelectedOptionId(rec.quotes[0].id);
      }
    }
  }, [referenceId]);

  const origin = missionRecord?.from || "Bucharest Băneasa (LRBS / BBU)";
  const destination = missionRecord?.to || "Nice Côte d'Azur (LFMN / NCE)";
  const date = missionRecord?.date || "2026-09-24";
  const preferredTime = missionRecord?.time || "10:30 EET";
  const passengers = missionRecord?.passengers || 4;
  const status = missionRecord?.status || "PRESENTED";
  const statusLabel = missionRecord?.statusLabel || "Options Ready for Review";
  const recommendationReason =
    missionRecord?.recommendationReason ||
    "AIR Decision Engine evaluated mission vector, speed requirements, and passenger load for optimal routing.";

  const quotes =
    missionRecord?.quotes && missionRecord.quotes.length > 0
      ? missionRecord.quotes
      : [
          {
            id: "opt-1",
            operatorLegalName: "Ion Ţiriac Air S.R.L.",
            operatorBrand: "Ţiriac Air",
            aocNumber: "RO-003",
            aircraftModel: "Embraer Phenom 300E",
            aircraftCategory: "LIGHT_JET",
            tailNumber: "YR-TYA",
            estimatedFlightTime: "2h 15m",
            priceRangeFormatted: "€8,400 - €9,800",
            pricingStatus: "INDICATIVE" as const,
            validityUntil: "2026-09-21 18:00 EET",
            inclusions: [
              "VIP handling at Băneasa FBO Lounge",
              "In-flight executive champagne & catering",
              "Private terminal fast-track processing",
            ],
            baggageAllowance: "65 cu ft hold (6 hard cases + 4 carry-ons)",
            cancellationPolicy: "80% refund up to 48 hours prior to departure",
            verificationStatus: "OFFICIAL_SOURCE" as const,
          },
          {
            id: "opt-2",
            operatorLegalName: "Ion Ţiriac Air S.R.L.",
            operatorBrand: "Ţiriac Air",
            aocNumber: "RO-003",
            aircraftModel: "Bombardier Challenger 350",
            aircraftCategory: "SUPER_MIDSIZE_JET",
            tailNumber: "YR-TIA",
            estimatedFlightTime: "2h 05m",
            priceRangeFormatted: "€14,500 - €16,800",
            pricingStatus: "INDICATIVE" as const,
            validityUntil: "2026-09-21 12:00 EET",
            inclusions: [
              "Full stand-up cabin with dedicated flight hostess",
              "Hot VIP gourmet catering",
              "High-speed Ka-band satellite Wi-Fi",
            ],
            baggageAllowance: "106 cu ft luggage hold",
            cancellationPolicy: "90% refund up to 72 hours prior to departure",
            verificationStatus: "OFFICIAL_SOURCE" as const,
          },
        ];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Navigation & Header */}
        <div>
          <Link href="/account" className="text-xs text-amber-400 hover:underline flex items-center gap-1 mb-4 font-mono">
            ← Return to My AIR Client Portal
          </Link>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-neutral-900/60 border border-neutral-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl">
            <div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-amber-400 bg-neutral-950 px-2.5 py-1 rounded border border-amber-500/20">
                  {referenceId}
                </span>
                <DataStatusBadge status="OFFICIAL_SOURCE" />
                <ProvenanceBadge status="VERIFIED" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-light text-white mt-2">
                {origin} <span className="text-neutral-500">→</span> {destination}
              </h1>
              <p className="text-xs text-neutral-400 mt-1 font-data">
                Date: <strong className="text-white">{date}</strong> at <strong className="text-white">{preferredTime}</strong> | Passengers: <strong className="text-white">{passengers} pax</strong>
              </p>
            </div>

            <div className="text-left md:text-right">
              <span className="text-[10px] font-mono text-neutral-500 uppercase">Operational Status</span>
              <p className="text-sm font-semibold text-amber-400 uppercase tracking-wider font-mono mt-0.5">
                {statusLabel}
              </p>
            </div>
          </div>
        </div>

        {/* WORKFLOW PIPELINE PROGRESS */}
        <div className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800 space-y-3">
          <span className="text-xs font-data text-neutral-400 uppercase tracking-widest">
            MISSION SOURCING PIPELINE
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {WORKFLOW_STAGES.map((ws, i) => {
              const isCurrent =
                (ws.key === "PRESENTED" && status === "PRESENTED") ||
                (ws.key === "SOURCING" && status === "SOURCING") ||
                (ws.key === "REQUESTED" && status === "REQUESTED");
              const isPast =
                (status === "PRESENTED" && i <= 4) ||
                (status === "SOURCING" && i <= 1) ||
                (status === "REQUESTED" && i === 0);

              return (
                <div
                  key={ws.key}
                  className={`p-2.5 rounded-lg border text-xs font-data flex flex-col gap-1 ${
                    isCurrent
                      ? "bg-amber-500/15 border-amber-400 text-amber-400 font-bold ring-1 ring-amber-400/40"
                      : isPast
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                      : "bg-neutral-950/60 border-neutral-800 text-neutral-600"
                  }`}
                >
                  <span className="text-[10px]">{ws.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* WHY AIR RECOMMENDS THIS OPTION Banner */}
        <div className="bg-gradient-to-r from-amber-500/10 via-neutral-900 to-neutral-900 border border-amber-500/30 rounded-2xl p-6 space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase font-bold tracking-wider">
            <span>✨ WHY AIR DETERMINED THIS SOLUTION</span>
          </div>
          <p className="text-sm text-neutral-200 leading-relaxed">
            {recommendationReason}
          </p>
        </div>

        {/* Options Comparison Table / Cards */}
        <div className="space-y-6">
          <h2 className="text-xl font-light text-white">Compare Verified Operator Options & Quotes</h2>

          <div className="grid lg:grid-cols-2 gap-6">
            {quotes.map((opt, idx) => {
              const isSelected = selectedOptionId === opt.id;
              return (
                <div
                  key={opt.id}
                  className={`bg-neutral-900/40 rounded-2xl p-6 border transition space-y-6 flex flex-col justify-between ${
                    isSelected ? "border-amber-500 ring-1 ring-amber-500/50" : "border-neutral-800 hover:border-neutral-700"
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        {idx === 0 && (
                          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 mb-2 inline-block">
                            ★ Primary Recommended Fit
                          </span>
                        )}
                        <h3 className="text-xl font-medium text-white">{opt.aircraftModel}</h3>
                        <p className="text-xs text-neutral-400 font-mono">
                          {opt.operatorBrand} (AOC {opt.aocNumber}) • Tail: {opt.tailNumber || "Verified Fleet"}
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="text-xs text-neutral-400 block font-mono">Estimated Charter</span>
                        <span className="text-xl font-bold text-white">{opt.priceRangeFormatted}</span>
                        <div className="mt-1">
                          <DataStatusBadge status={opt.pricingStatus} />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 py-3 border-y border-neutral-800 text-xs font-data">
                      <div>
                        <span className="text-neutral-500 block text-[10px]">FLIGHT DURATION</span>
                        <span className="text-white font-medium">{opt.estimatedFlightTime}</span>
                      </div>
                      <div>
                        <span className="text-neutral-500 block text-[10px]">OPERATOR AOC</span>
                        <span className="text-white font-medium">{opt.aocNumber} (Verified)</span>
                      </div>
                      <div>
                        <span className="text-neutral-500 block text-[10px]">BAGGAGE HOLD</span>
                        <span className="text-white font-medium">{opt.baggageAllowance}</span>
                      </div>
                      <div>
                        <span className="text-neutral-500 block text-[10px]">CANCELLATION POLICY</span>
                        <span className="text-white font-medium">{opt.cancellationPolicy}</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2 font-mono">Inclusions & Services</h4>
                      <ul className="text-xs space-y-1.5 text-neutral-400">
                        {opt.inclusions.map((inc, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="text-amber-400">✓</span> {inc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-neutral-800 space-y-3">
                    <button
                      onClick={() => setSelectedOptionId(opt.id)}
                      className={`w-full py-3 px-4 rounded-xl font-semibold text-xs transition flex items-center justify-center gap-2 ${
                        isSelected
                          ? "bg-amber-400 text-neutral-950 hover:bg-amber-300 shadow-md"
                          : "bg-neutral-800 text-neutral-200 hover:bg-neutral-700 border border-neutral-700"
                      }`}
                    >
                      {isSelected ? "✓ Preferred Option Selected" : "Select This Option"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Footer */}
          <div className="bg-neutral-900/60 border border-neutral-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="text-sm font-semibold text-white">Need bespoke modifications or catering preferences?</h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                AIR Flight Concierge is available 24/7 to adjust dispatch slots, arrange ground tarmac transfers, or coordinate helicopter connections.
              </p>
            </div>

            <div className="flex gap-3 shrink-0">
              <button
                onClick={() => setClarificationSent(true)}
                className="bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs px-4 py-2.5 rounded-xl border border-neutral-700 transition"
              >
                {clarificationSent ? "✓ Request Logged" : "Request Flight Clarification"}
              </button>
              <button
                onClick={() => alert("Option selection confirmed. AIR Operations will issue final charter agreement.")}
                className="bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs px-5 py-2.5 rounded-xl transition shadow-lg"
              >
                Confirm Selected Flight
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
