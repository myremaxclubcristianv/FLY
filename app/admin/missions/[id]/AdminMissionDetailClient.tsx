"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  missionRequestService,
  MissionDetailRecord,
  StoredQuote,
} from "@/lib/services/mission-request-service";
import { RequestLifecycleStatus } from "@/types/flight-request";
import { DataStatusBadge } from "@/components/shared/DataStatusBadge";
import { ProvenanceBadge } from "@/components/shared/ProvenanceBadge";

const VERIFIED_OPERATOR_PRESETS = [
  {
    brand: "Ţiriac Air",
    legalName: "Ion Ţiriac Air S.R.L.",
    aoc: "RO-003",
    models: ["Embraer Phenom 300E", "Bombardier Challenger 350", "AgustaWestland AW139"],
    typicalCategory: "LIGHT_JET",
    defaultPrice: "€8,600",
    totalPrice: 8600,
  },
  {
    brand: "Toyo Aviation",
    legalName: "Toyo Aviation S.R.L.",
    aoc: "RO-028",
    models: ["Cessna Citation XLS+", "Cessna Citation Mustang"],
    typicalCategory: "MIDSIZE_JET",
    defaultPrice: "€9,200",
    totalPrice: 9200,
  },
  {
    brand: "Regional Air Services",
    legalName: "Regional Air Services S.R.L.",
    aoc: "RO-014",
    models: ["Airbus H135", "Leonardo AW139", "Diamond DA42"],
    typicalCategory: "HELICOPTER",
    defaultPrice: "€3,800",
    totalPrice: 3800,
  },
];

export default function AdminMissionDetailClient({ referenceId }: { referenceId: string }) {
  const [mission, setMission] = useState<MissionDetailRecord | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  // New Quote Form State
  const [selectedPresetIndex, setSelectedPresetIndex] = useState(0);
  const [customModel, setCustomModel] = useState("Embraer Phenom 300E");
  const [tailNumber, setTailNumber] = useState("YR-TYA");
  const [quotePriceFormatted, setQuotePriceFormatted] = useState("€8,800");
  const [quotePriceNumber, setQuotePriceNumber] = useState(8800);
  const [pricingStatus, setPricingStatus] = useState<"INDICATIVE" | "REQUEST" | "LIVE">("INDICATIVE");
  const [inclusionsText, setInclusionsText] = useState(
    "VIP FBO Lounge handling, Executive catering onboard, Fast-track private apron transit"
  );
  const baggageHold = "65 cu ft hold (6 hard cases + 4 carry-ons)";
  const reviewNotes = "AOC crew duty cycles, runway landing distance requirements, and slot clearances verified by AIR Flight Desk.";

  useEffect(() => {
    const record = missionRequestService.getRequestByReference(referenceId);
    if (record) {
      setMission(record);
    }
    setIsLoaded(true);
  }, [referenceId]);

  const handleAdvanceStatus = (nextStatus: RequestLifecycleStatus, label?: string, notes?: string) => {
    const updated = missionRequestService.updateLifecycleStatus(
      referenceId,
      nextStatus,
      label,
      "AIR_OPS",
      notes
    );
    if (updated) {
      setMission(updated);
    }
  };

  const handleAddQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const preset = VERIFIED_OPERATOR_PRESETS[selectedPresetIndex];
    const inclusions = inclusionsText.split(",").map((s) => s.trim()).filter(Boolean);

    const newQuote: Omit<StoredQuote, "id" | "receivedAt"> = {
      operatorLegalName: preset.legalName,
      operatorBrand: preset.brand,
      aocNumber: preset.aoc,
      aircraftModel: customModel || preset.models[0],
      aircraftCategory: preset.typicalCategory,
      tailNumber: tailNumber || "YR-FLEET",
      route: `${mission?.from || "LRBS"} → ${mission?.to || "LFMN"}`,
      departureDate: mission?.date || "2026-09-24",
      passengers: mission?.passengers || 4,
      totalPrice: quotePriceNumber || 8800,
      currency: "EUR",
      priceRangeFormatted: quotePriceFormatted,
      pricingStatus,
      validityUntil: new Date(Date.now() + 86400000 * 3).toISOString(),
      inclusions,
      exclusions: ["Winter de-icing fee if required"],
      baggageAllowance: baggageHold,
      cancellationPolicy: "80% refund up to 48 hours prior to departure",
      source: `Verified AOC Direct Sourcing (${preset.aoc})`,
      status: "RECEIVED",
      verificationStatus: "OFFICIAL_SOURCE",
    };

    const updated = missionRequestService.attachQuote(referenceId, newQuote);
    if (updated) {
      setMission(updated);
      setShowQuoteModal(false);
    }
  };

  const handleCompleteAirReview = () => {
    const updated = missionRequestService.recordAirReview(referenceId, reviewNotes);
    if (updated) {
      setMission(updated);
    }
  };

  const handleConfirmFlight = (quoteId: string) => {
    const updated = missionRequestService.confirmMission(referenceId, quoteId);
    if (updated) {
      setMission(updated);
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-neutral-950 text-neutral-100 py-16 flex items-center justify-center font-mono text-xs">
        LOADING OPERATIONS TELEMETRY...
      </div>
    );
  }

  if (!mission) {
    return (
      <div className="min-h-screen bg-neutral-950 text-neutral-100 p-8 font-sans">
        <div className="max-w-4xl mx-auto space-y-6">
          <Link href="/admin/missions" className="text-xs text-amber-400 font-mono hover:underline">
            ← Return to Mission Queue
          </Link>
          <div className="p-8 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4">
            <h1 className="text-xl font-bold text-white">Mission Record Not Found</h1>
            <p className="text-sm text-neutral-400">
              No active or archived flight dispatch matches reference identifier: <code>{referenceId}</code>
            </p>
          </div>
        </div>
      </div>
    );
  }

  const quotes = mission.quotes || [];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 p-6 sm:p-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Navigation & Header */}
        <div>
          <Link href="/admin/missions" className="text-xs text-amber-400 hover:underline flex items-center gap-1 mb-3 font-mono">
            ← Return to Operations Mission Queue
          </Link>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-neutral-900/70 border border-neutral-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl">
            <div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-amber-400 bg-neutral-950 px-2.5 py-1 rounded border border-amber-500/20">
                  {mission.referenceId}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded text-[10px] uppercase font-mono font-bold border ${
                    mission.status === "CONFIRMED"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                      : mission.status === "PRESENTED"
                      ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                      : "bg-neutral-800 text-neutral-300 border-neutral-700"
                  }`}
                >
                  STATE: {mission.status}
                </span>
                <ProvenanceBadge status="VERIFIED" />
              </div>

              <h1 className="text-2xl sm:text-3xl font-light text-white mt-2">
                {mission.from} <span className="text-neutral-500">→</span> {mission.to}
              </h1>
              <p className="text-xs text-neutral-400 mt-1 font-data">
                Client: <strong className="text-white">{mission.name || "Client Member"}</strong> ({mission.email || "client@air.aero"}) • Phone: {mission.phone || "+40 722 000 000"}
              </p>
            </div>

            <div className="text-left md:text-right">
              <span className="text-[10px] font-mono text-neutral-500 uppercase">Operational Status</span>
              <p className="text-sm font-semibold text-amber-400 font-mono mt-0.5 uppercase">
                {mission.statusLabel}
              </p>
              <span className="text-[10px] text-neutral-500 font-mono block mt-1">
                Desk: {mission.assignedAdvisor}
              </span>
            </div>
          </div>
        </div>

        {/* OPERATIONS CONTROLS & STATE MACHINE ACTIONS */}
        <div className="p-6 rounded-2xl bg-neutral-900/50 border border-amber-500/30 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
              LIFECYCLE STATE TRANSITIONS
            </span>
            <span className="text-[10px] text-neutral-400 font-mono">
              Direct Flight Ops Authorization
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            {mission.status === "REQUESTED" && (
              <button
                onClick={() =>
                  handleAdvanceStatus(
                    "SOURCING",
                    "Active Operator Sourcing in Progress",
                    "Flight desk initiated operator fleet availability queries."
                  )
                }
                className="bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs px-4 py-2 rounded-xl transition shadow"
              >
                ▶ Initiate Operator Sourcing (02 SOURCING)
              </button>
            )}

            <button
              onClick={() => setShowQuoteModal(true)}
              className="bg-neutral-800 hover:bg-neutral-700 text-amber-300 font-medium text-xs px-4 py-2 rounded-xl border border-amber-500/30 transition"
            >
              + Log Verified Operator Quote
            </button>

            {mission.status !== "PRESENTED" && mission.status !== "CONFIRMED" && quotes.length > 0 && (
              <button
                onClick={handleCompleteAirReview}
                className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs px-4 py-2 rounded-xl transition shadow"
              >
                ✓ Complete AIR Review & Present to Client (05 PRESENTED)
              </button>
            )}

            {mission.status !== "CONFIRMED" && quotes.length > 0 && (
              <button
                onClick={() => handleConfirmFlight(quotes[0].id)}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2 rounded-xl transition shadow"
              >
                ★ Confirm Flight Dispatch (06 CONFIRMED)
              </button>
            )}
          </div>
        </div>

        {/* DECISION ENGINE RECOMMENDATION DOSSIER */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800 text-xs font-data">
          <div className="space-y-1">
            <span className="text-[10px] text-neutral-500 uppercase block">RECOMMENDED AIRCRAFT</span>
            <span className="text-white font-bold text-sm block">{mission.recommendedAircraft}</span>
            <span className="text-amber-400 text-[11px] block">{mission.recommendedCategory}</span>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] text-neutral-500 uppercase block">ESTIMATED DURATION</span>
            <span className="text-white font-bold text-sm block">{mission.estimatedFlightTime}</span>
            <span className="text-neutral-400 text-[10px] block">Direct Flight Corridor</span>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] text-neutral-500 uppercase block">SPECIAL REQUIREMENTS</span>
            <span className="text-neutral-200 block">
              {mission.requirements && mission.requirements.length > 0
                ? mission.requirements.join(", ").replace(/_/g, " ")
                : "Standard executive handling"}
            </span>
          </div>
        </div>

        {/* LOGGED OPERATOR QUOTES TABLE */}
        <div className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-light text-white">Logged Operator Quotes ({quotes.length})</h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                Quotes entered into the mission record. Only quotes in <code>PRESENTED</code> state are visible to the client.
              </p>
            </div>

            <button
              onClick={() => setShowQuoteModal(true)}
              className="bg-neutral-800 hover:bg-neutral-700 text-amber-400 px-3 py-1.5 rounded-lg text-xs font-mono border border-neutral-700 transition"
            >
              + Add Quote
            </button>
          </div>

          {quotes.length === 0 ? (
            <div className="p-8 text-center text-neutral-500 text-xs font-mono bg-neutral-950 rounded-xl border border-neutral-800/80">
              No operator bids logged yet. Sourcing queue is active.
            </div>
          ) : (
            <div className="grid gap-4">
              {quotes.map((q) => (
                <div
                  key={q.id}
                  className={`p-5 rounded-xl border transition flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${
                    q.status === "PRESENTED" || q.status === "ACCEPTED"
                      ? "bg-neutral-950 border-amber-500/40"
                      : "bg-neutral-950/60 border-neutral-800"
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{q.aircraftModel}</span>
                      <span className="text-xs text-neutral-400 font-mono">({q.tailNumber || "YR-FLEET"})</span>
                      <span
                        className={`text-[9px] font-mono px-2 py-0.5 rounded border uppercase ${
                          q.status === "ACCEPTED"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                            : q.status === "PRESENTED"
                            ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                            : "bg-neutral-800 text-neutral-400 border-neutral-700"
                        }`}
                      >
                        {q.status}
                      </span>
                    </div>

                    <p className="text-xs text-neutral-300 font-mono">
                      Operator: <strong className="text-amber-300">{q.operatorBrand}</strong> ({q.operatorLegalName} • AOC {q.aocNumber})
                    </p>

                    <div className="text-[11px] text-neutral-400">
                      Inclusions: {q.inclusions.join(" • ")}
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-lg font-bold text-white font-mono">{q.priceRangeFormatted}</span>
                    <div className="mt-1 flex items-center gap-2 justify-end">
                      <DataStatusBadge status={q.pricingStatus} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* TIMELINE AUDIT STREAM */}
        <div className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800 space-y-4">
          <h2 className="text-lg font-light text-white">Chronological Audit Timeline</h2>
          <div className="space-y-3 font-mono text-xs">
            {mission.timeline && mission.timeline.length > 0 ? (
              mission.timeline.map((item, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 py-2 border-b border-neutral-800/60 last:border-0">
                  <span className="text-neutral-500 text-[11px] sm:w-48 shrink-0">
                    {new Date(item.time).toLocaleString()}
                  </span>
                  <span className="text-amber-400 font-bold text-[11px] sm:w-32 shrink-0">
                    {item.actor}
                  </span>
                  <span className="text-neutral-200 text-xs">
                    {item.event}
                  </span>
                </div>
              ))
            ) : (
              <span className="text-neutral-500">Timeline initialized at request creation.</span>
            )}
          </div>
        </div>

        {/* ATTACH QUOTE MODAL */}
        {showQuoteModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-neutral-900 border border-neutral-700 rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-6 shadow-2xl">
              <div className="flex justify-between items-center border-b border-neutral-800 pb-4">
                <h3 className="text-lg font-medium text-white">Log Verified Operator Quote</h3>
                <button
                  onClick={() => setShowQuoteModal(false)}
                  className="text-neutral-400 hover:text-white text-lg font-mono"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddQuoteSubmit} className="space-y-4 text-xs font-mono">
                <div>
                  <label className="text-neutral-400 block mb-1">SELECT AOC OPERATOR PRESET</label>
                  <select
                    value={selectedPresetIndex}
                    onChange={(e) => {
                      const idx = parseInt(e.target.value, 10);
                      setSelectedPresetIndex(idx);
                      const p = VERIFIED_OPERATOR_PRESETS[idx];
                      setCustomModel(p.models[0]);
                      setQuotePriceFormatted(p.defaultPrice);
                      setQuotePriceNumber(p.totalPrice);
                    }}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-white focus:border-amber-500 focus:outline-none"
                  >
                    {VERIFIED_OPERATOR_PRESETS.map((p, i) => (
                      <option key={p.aoc} value={i}>
                        {p.brand} ({p.legalName} • AOC {p.aoc})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-neutral-400 block mb-1">AIRCRAFT MODEL</label>
                    <input
                      type="text"
                      value={customModel}
                      onChange={(e) => setCustomModel(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-white focus:border-amber-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-neutral-400 block mb-1">TAIL / REGISTRATION</label>
                    <input
                      type="text"
                      value={tailNumber}
                      onChange={(e) => setTailNumber(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-neutral-400 block mb-1">PRICE DISPLAY STRING</label>
                    <input
                      type="text"
                      value={quotePriceFormatted}
                      onChange={(e) => setQuotePriceFormatted(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-white focus:border-amber-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-neutral-400 block mb-1">PRICE CLASSIFICATION</label>
                    <select
                      value={pricingStatus}
                      onChange={(e) => setPricingStatus(e.target.value as "INDICATIVE" | "REQUEST" | "LIVE")}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-white focus:border-amber-500 focus:outline-none"
                    >
                      <option value="INDICATIVE">INDICATIVE</option>
                      <option value="REQUEST">REQUEST</option>
                      <option value="LIVE">LIVE</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-neutral-400 block mb-1">INCLUSIONS (COMMA SEPARATED)</label>
                  <textarea
                    value={inclusionsText}
                    onChange={(e) => setInclusionsText(e.target.value)}
                    rows={2}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-neutral-800">
                  <button
                    type="button"
                    onClick={() => setShowQuoteModal(false)}
                    className="bg-neutral-800 hover:bg-neutral-700 text-neutral-300 px-4 py-2 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold px-5 py-2 rounded-xl transition"
                  >
                    Save Quote to Mission
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
