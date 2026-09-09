"use client";

import { useState } from "react";
import Link from "next/link";
import { DataStatusBadge } from "@/components/shared/DataStatusBadge";
import { ProvenanceBadge } from "@/components/shared/ProvenanceBadge";

export default function QuoteComparisonView({ referenceId }: { referenceId: string }) {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>("opt-1");
  const [clarificationSent, setClarificationSent] = useState(false);

  const mockMission = {
    referenceId,
    origin: "Bucharest Băneasa (LRBS / BBU)",
    destination: "Nice Côte d'Azur (LFMN / NCE)",
    date: "2026-09-24",
    preferredTime: "10:30 EET",
    passengers: 4,
    priority: "FASTEST",
    status: "OPTIONS_READY",
    recommendationReason:
      "AIR Decision Engine recommends the Embraer Phenom 300E for optimal cruise speed (453 KTS), non-stop range across Southern Europe, and low cabin altitude for 4 passengers.",
  };

  const mockOptions = [
    {
      id: "opt-1",
      isPrimary: true,
      operatorName: "Toyo Aviation AOC RO-014",
      aircraftModel: "Embraer Phenom 300E",
      tailNumber: "YR-TYA",
      aircraftCategory: "LIGHT_JET",
      routing: "LRBS → LFMN (Non-stop)",
      estimatedDuration: "2h 15m",
      priceRange: "€8,400 - €9,800",
      pricingStatus: "INDICATIVE" as const,
      availabilityStatus: "REQUEST" as const,
      baggageAllowance: "65 cu ft hold (up to 6 hard suitcases + 4 soft bags)",
      cancellationPolicy: "80% refund up to 48h prior to departure",
      validity: "Valid until 2026-09-20 18:00 EET",
      inclusions: ["VIP handling at Băneasa FBO", "In-flight premium catering & champagne", "Private terminal access"],
      exclusions: ["De-icing if required by winter weather", "High-speed satellite Wi-Fi data usage"],
      reasoning: "Highest speed jet in category; direct home base availability at Băneasa LBS.",
    },
    {
      id: "opt-2",
      isPrimary: false,
      operatorName: "Ion Tiriac Air AOC RO-002",
      aircraftModel: "Bombardier Challenger 350",
      tailNumber: "YR-TIA",
      aircraftCategory: "SUPER_MIDSIZE_JET",
      routing: "LRBS → LFMN (Non-stop)",
      estimatedDuration: "2h 05m",
      priceRange: "€14,500 - €16,800",
      pricingStatus: "INDICATIVE" as const,
      availabilityStatus: "REQUEST" as const,
      baggageAllowance: "106 cu ft hold (Unlimited executive luggage + skis)",
      cancellationPolicy: "90% refund up to 72h prior to departure",
      validity: "Valid until 2026-09-21 12:00 EET",
      inclusions: ["Full stand-up cabin with flight attendant", "Hot VIP catering", "Fast satellite Wi-Fi"],
      exclusions: ["De-icing if required"],
      reasoning: "Maximum cabin comfort and seating capacity for executive meetings in flight.",
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Navigation & Header */}
        <div>
          <Link href="/account" className="text-xs text-amber-400 hover:underline flex items-center gap-1 mb-4 font-mono">
            ← Return to Account Dashboard
          </Link>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 backdrop-blur-xl">
            <div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-amber-400 bg-neutral-950 px-2.5 py-1 rounded border border-amber-500/20">
                  {mockMission.referenceId}
                </span>
                <DataStatusBadge status="INDICATIVE" />
                <ProvenanceBadge status="VERIFIED" />
              </div>
              <h1 className="text-2xl font-light text-white mt-2">
                {mockMission.origin} <span className="text-neutral-500">→</span> {mockMission.destination}
              </h1>
              <p className="text-xs text-neutral-400 mt-1">
                Date: <strong>{mockMission.date}</strong> at <strong>{mockMission.preferredTime}</strong> | Passengers: <strong>{mockMission.passengers} pax</strong>
              </p>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-mono text-neutral-500 uppercase">Operational Status</span>
              <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider font-mono">Options Ready for Review</p>
            </div>
          </div>
        </div>

        {/* WHY AIR RECOMMENDS THIS OPTION Banner */}
        <div className="bg-gradient-to-r from-amber-500/10 via-neutral-900 to-neutral-900 border border-amber-500/30 rounded-2xl p-6 space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase font-bold tracking-wider">
            <span>✨ WHY AIR RECOMMENDS THIS OPTION</span>
          </div>
          <p className="text-sm text-neutral-200 leading-relaxed">
            {mockMission.recommendationReason}
          </p>
        </div>

        {/* Options Comparison Table / Cards */}
        <div className="space-y-6">
          <h2 className="text-xl font-light text-white">Compare Available Charter Options</h2>

          <div className="grid lg:grid-cols-2 gap-6">
            {mockOptions.map((opt) => {
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
                        {opt.isPrimary && (
                          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 mb-2 inline-block">
                            ★ Primary Recommendation
                          </span>
                        )}
                        <h3 className="text-xl font-medium text-white">{opt.aircraftModel}</h3>
                        <p className="text-xs text-neutral-400 font-mono">{opt.operatorName} • Tail: {opt.tailNumber}</p>
                      </div>

                      <div className="text-right">
                        <span className="text-xs text-neutral-400 block font-mono">Estimated Cost</span>
                        <span className="text-xl font-bold text-white">{opt.priceRange}</span>
                        <div className="mt-1">
                          <DataStatusBadge status={opt.pricingStatus} />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 py-3 border-y border-neutral-800 text-xs">
                      <div>
                        <span className="text-neutral-500 block">Flight Duration</span>
                        <span className="text-white font-medium">{opt.estimatedDuration}</span>
                      </div>
                      <div>
                        <span className="text-neutral-500 block">Routing</span>
                        <span className="text-white font-medium">{opt.routing}</span>
                      </div>
                      <div>
                        <span className="text-neutral-500 block">Baggage Hold</span>
                        <span className="text-white font-medium">{opt.baggageAllowance}</span>
                      </div>
                      <div>
                        <span className="text-neutral-500 block">Cancellation Policy</span>
                        <span className="text-white font-medium">{opt.cancellationPolicy}</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2 font-mono">Inclusions & Services</h4>
                      <ul className="text-xs space-y-1 text-neutral-400">
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
                      className={`w-full py-3 px-4 rounded-lg font-semibold text-xs transition flex items-center justify-center gap-2 ${
                        isSelected
                          ? "bg-amber-500 text-neutral-950 hover:bg-amber-400"
                          : "bg-neutral-800 text-neutral-200 hover:bg-neutral-700 border border-neutral-700"
                      }`}
                    >
                      {isSelected ? "✓ Preferred Option Selected" : "Select Option"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Footer */}
          <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 backdrop-blur-xl flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="text-sm font-semibold text-white">Need customization or clarification?</h3>
              <p className="text-xs text-neutral-400">
                AIR Concierge is available to coordinate flight times, catering preferences, or ground transportation.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setClarificationSent(true)}
                className="bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs px-4 py-2.5 rounded-lg border border-neutral-700 transition"
              >
                {clarificationSent ? "✓ Request Logged" : "Request Flight Clarification"}
              </button>
              <button
                onClick={() => alert("Option selection confirmed. AIR Concierge will contact operator to verify schedule.")}
                className="bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold text-xs px-5 py-2.5 rounded-lg transition"
              >
                Proceed with Selected Option
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
