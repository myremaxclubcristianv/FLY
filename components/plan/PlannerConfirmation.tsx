import React from "react";
import Link from "next/link";
import { FlightMission, FlightOption, QuoteRequest } from "../../types/domain";
import { DataStatusBadge } from "../shared/DataStatusBadge";
import { Button } from "../ui/Button";

export interface PlannerConfirmationProps {
  mission: FlightMission;
  selectedOption: FlightOption;
  quoteRequest: QuoteRequest;
  onReset: () => void;
}

const WORKFLOW_STEPS = [
  { step: "01", key: "REQUESTED", label: "REQUESTED", desc: "Mission logged & registered", active: true },
  { step: "02", key: "SOURCING", label: "SOURCING", desc: "AOC fleet availability dispatch", active: true },
  { step: "03", key: "QUOTES_RECEIVED", label: "QUOTES RECEIVED", desc: "Direct operator pricing received", active: false },
  { step: "04", key: "AIR_REVIEW", label: "AIR REVIEW", desc: "Safety audit & itinerary vetting", active: false },
  { step: "05", key: "PRESENTED", label: "PRESENTED", desc: "Presented in My AIR portal", active: false },
  { step: "06", key: "CONFIRMED", label: "CONFIRMED", desc: "Contract & flight dispatch", active: false },
];

export function PlannerConfirmation({
  mission,
  selectedOption,
  quoteRequest,
  onReset,
}: PlannerConfirmationProps) {
  const refCode = quoteRequest.id || mission.referenceId || "AIR-2026-DISPATCH";

  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-col gap-3 border-b border-white/10 pb-6">
        <div className="flex items-center gap-3">
          <span className="text-xs font-data text-emerald-400 uppercase font-semibold flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            MISSION DISPATCH // SOURCING INITIATED
          </span>
          <DataStatusBadge status="OFFICIAL_SOURCE" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-light text-white">
          FLIGHT REQUEST SUBMITTED.
        </h2>
        <p className="text-sm text-neutral-300 leading-relaxed max-w-2xl">
          AIR Operations has registered your mission parameters. We are currently querying verified AOC operators for authentic fleet availability and schedule confirmation.
        </p>
      </div>

      {/* Reference Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 via-neutral-900 to-neutral-900 border border-amber-500/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <span className="text-[10px] font-data text-amber-400 uppercase tracking-widest block font-bold">
            SERVER REFERENCE IDENTIFIER
          </span>
          <h3 className="text-2xl sm:text-3xl font-mono font-bold text-white tracking-wider mt-1">
            {refCode}
          </h3>
          <p className="text-xs text-neutral-400 font-mono mt-1">
            Timestamp: {new Date().toISOString()} {"//"} Status: SOURCING DISPATCH
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href={`/account/requests/${refCode}`}>
            <Button variant="primary" size="md">
              TRACK IN MY AIR PORTAL →
            </Button>
          </Link>
          <Button variant="outline" size="md" onClick={onReset}>
            + PLAN ANOTHER FLIGHT
          </Button>
        </div>
      </div>

      {/* SOURCING WORKFLOW PIPELINE */}
      <div className="flex flex-col gap-4">
        <span className="text-xs font-data text-neutral-400 uppercase tracking-widest">
          AIR SOURCING & REVIEW WORKFLOW
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {WORKFLOW_STEPS.map((ws, i) => (
            <div
              key={ws.key}
              className={`p-4 rounded-xl border flex flex-col justify-between gap-3 text-xs font-data ${
                i === 0
                  ? "bg-emerald-500/10 border-emerald-400 text-emerald-400"
                  : i === 1
                  ? "bg-amber-500/10 border-amber-400 text-amber-400 ring-1 ring-amber-400/40 animate-pulse"
                  : "bg-neutral-950/60 border-white/10 text-neutral-500"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] opacity-75 font-mono">{ws.step}</span>
                {i <= 1 && <span>●</span>}
              </div>
              <div>
                <h4 className="font-bold tracking-wider uppercase text-[11px]">
                  {ws.label}
                </h4>
                <p className="text-[9px] text-neutral-400 mt-0.5 leading-tight">
                  {ws.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mission Summary Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-2xl bg-neutral-900/60 border border-white/10">
        <div className="space-y-4">
          <h4 className="text-xs font-data text-amber-400 uppercase tracking-wider font-bold">
            MISSION FLIGHT PARAMETERS
          </h4>
          <div className="space-y-2 text-xs font-data text-neutral-300">
            <div className="flex justify-between py-1.5 border-b border-white/5">
              <span className="text-neutral-500">ROUTING</span>
              <span className="text-white font-medium">{mission.origin} → {mission.destination}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/5">
              <span className="text-neutral-500">DATE & TIME</span>
              <span className="text-white font-medium">{mission.date} {mission.preferredTime ? `@ ${mission.preferredTime}` : ""}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/5">
              <span className="text-neutral-500">PASSENGERS</span>
              <span className="text-white font-medium">{mission.passengers} pax</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/5">
              <span className="text-neutral-500">CORE PRIORITY</span>
              <span className="text-amber-400 font-medium">{mission.priority}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-xs font-data text-amber-400 uppercase tracking-wider font-bold">
            SELECTED AIRCRAFT VEHICLE
          </h4>
          <div className="space-y-2 text-xs font-data text-neutral-300">
            <div className="flex justify-between py-1.5 border-b border-white/5">
              <span className="text-neutral-500">MODEL</span>
              <span className="text-white font-medium">{selectedOption.aircraftName}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/5">
              <span className="text-neutral-500">CATEGORY</span>
              <span className="text-white font-medium">{selectedOption.aircraftCategory.replace(/_/g, " ")}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/5">
              <span className="text-neutral-500">ESTIMATED FLIGHT TIME</span>
              <span className="text-white font-medium">{selectedOption.estimatedDuration}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/5">
              <span className="text-neutral-500">STATUS</span>
              <span className="text-amber-400 font-medium">AOC SOURCING ACTIVE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
