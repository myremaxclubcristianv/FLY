"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Aircraft } from "../../types/domain";
import { Button } from "../ui/Button";
import { DataStatusBadge } from "../shared/DataStatusBadge";
import { formatFlightDuration } from "../../lib/utils/distance";
import { cn } from "../../lib/utils";

interface AircraftCompareEngineProps {
  allAircraft: Aircraft[];
}

const MISSION_PRESETS = [
  {
    id: "nice",
    title: "Bucharest (LRBS) → Nice (LFMN)",
    distanceNm: 830,
    passengers: 4,
    notes: "European executive corridor // Paved runway >= 2,500m",
  },
  {
    id: "london",
    title: "Bucharest (LRBS) → London Farnborough (EGLF)",
    distanceNm: 1140,
    passengers: 6,
    notes: "Continental range // 450+ KTS mach priority",
  },
  {
    id: "mamaia",
    title: "Bucharest (LRBS) → Mamaia Heliport (LRTZ)",
    distanceNm: 120,
    passengers: 4,
    notes: "Short-hop regional / Mountain or coastal helipad access",
  },
  {
    id: "dubai",
    title: "Bucharest (LRBS) → Dubai Al Maktoum (OMDW)",
    distanceNm: 1850,
    passengers: 8,
    notes: "Transcontinental corridor // Stand-up cabin & fuel endurance",
  },
];

export function AircraftCompareEngine({ allAircraft }: AircraftCompareEngineProps) {
  const [selectedSlugA, setSelectedSlugA] = useState<string>("phenom-300");
  const [selectedSlugB, setSelectedSlugB] = useState<string>("pilatus-pc12");
  const [selectedSlugC, setSelectedSlugC] = useState<string>("challenger-350");
  const [activeMissionId, setActiveMissionId] = useState<string>("nice");

  const acA = allAircraft.find((a) => a.slug === selectedSlugA) || allAircraft[0];
  const acB = allAircraft.find((a) => a.slug === selectedSlugB) || allAircraft[1];
  const acC = allAircraft.find((a) => a.slug === selectedSlugC) || allAircraft[2];

  const compareList = [acA, acB, acC].filter(Boolean);
  const currentMission = MISSION_PRESETS.find((m) => m.id === activeMissionId) || MISSION_PRESETS[0];

  // Evaluate Mission Suitability Verdict
  const missionVerdict = useMemo(() => {
    const dist = currentMission.distanceNm;
    const pax = currentMission.passengers;

    if (dist <= 180 && pax <= 6) {
      const hasHeli = compareList.some((ac) => ac.category === "HELICOPTER");
      if (hasHeli) {
        return {
          winner: compareList.find((ac) => ac.category === "HELICOPTER")?.model || "Executive Helicopter",
          headline: "Helicopter Delivers Point-to-Point Supremacy",
          verdict: `For a short ${dist} NM hop like ${currentMission.title}, direct rotor flight lands directly at property helipads, eliminating over 1.5 hours of ground motorway transit. Fixed-wing jets require airport ground transfers that negate their speed advantage.`,
        };
      }
    }

    if (dist > 1400 || pax >= 8) {
      const superMidOrHeavy = compareList.find(
        (ac) => ac.category === "SUPER_MIDSIZE_JET" || ac.category === "LARGE_CABIN_JET"
      );
      if (superMidOrHeavy) {
        return {
          winner: `${superMidOrHeavy.manufacturer} ${superMidOrHeavy.model}`,
          headline: "Super-Midsize / Heavy Jet Required for Mission Endurance & Payload",
          verdict: `With ${pax} passengers over a ${dist} NM transcontinental vector, the ${superMidOrHeavy.model} provides essential non-stop fuel reserves, full stand-up cabin comfort, and generous baggage allowance that light aircraft cannot match.`,
        };
      }
    }

    // Default European medium mission
    const lightJet = compareList.find((ac) => ac.category === "LIGHT_JET");
    const turboprop = compareList.find((ac) => ac.category === "TURBOPROP");

    if (lightJet && turboprop) {
      return {
        winner: `${lightJet.manufacturer} ${lightJet.model}`,
        headline: "Light Jet Wins on Pure Speed; Turboprop Wins on Direct Operating Economics",
        verdict: `The ${lightJet.model} completes this ${dist} NM flight approximately 35-45 minutes faster with higher cruise ceiling (FL450). However, the ${turboprop.model} reduces direct charter costs by ~30% while offering superior short-field airfield access.`,
      };
    }

    return {
      winner: `${acA?.manufacturer} ${acA?.model}`,
      headline: "Balanced Capability Profile",
      verdict: `For ${currentMission.title}, the ${acA?.model} delivers the best compromise of passenger capacity (${acA?.passengerCapacity} seats) and cruise performance (${acA?.typicalCruiseSpeed || 420} KTS) within verified parameters.`,
    };
  }, [acA, currentMission, compareList]);

  return (
    <div className="flex flex-col gap-10 w-full">
      {/* Mission Profile Selection Bar */}
      <div className="p-6 rounded-2xl bg-neutral-900/80 border border-white/10 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <span className="text-[10px] font-data text-amber-400 uppercase tracking-widest block font-bold">
              ACTIVE MISSION BENCHMARK PROFILE
            </span>
            <h3 className="text-xl font-light text-white mt-0.5">
              Which aircraft makes more sense for this mission?
            </h3>
          </div>
          <span className="text-xs font-data text-neutral-400 font-mono">
            {currentMission.distanceNm} NM // {currentMission.passengers} PASSENGERS
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {MISSION_PRESETS.map((m) => {
            const isSelected = activeMissionId === m.id;
            return (
              <div
                key={m.id}
                onClick={() => setActiveMissionId(m.id)}
                className={cn(
                  "p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col gap-1 text-xs font-data",
                  isSelected
                    ? "bg-amber-500/15 border-amber-400 text-white ring-1 ring-amber-400/40"
                    : "glass-surface border-white/10 text-neutral-400 hover:text-white hover:border-white/20"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-400">{m.distanceNm} NM</span>
                  <span>{m.passengers} PAX</span>
                </div>
                <span className="text-white font-medium truncate">{m.title}</span>
                <span className="text-[9px] text-neutral-500 truncate">{m.notes}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* MISSION SUITABILITY VERDICT BANNER */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-500/15 via-neutral-900 to-neutral-900 border border-amber-500/40 flex flex-col gap-3 shadow-xl">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-xs font-data text-amber-400 uppercase font-bold tracking-widest">
            AIR MISSION SUITABILITY VERDICT // {currentMission.title.toUpperCase()}
          </span>
        </div>
        <h4 className="text-xl sm:text-2xl font-light text-white">
          {missionVerdict.headline}
        </h4>
        <p className="text-sm text-neutral-200 leading-relaxed max-w-4xl">
          {missionVerdict.verdict}
        </p>
      </div>

      {/* Selector Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-neutral-900/60 border border-white/10 rounded-2xl">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-data text-amber-400 uppercase tracking-wider font-semibold">
            AIRCRAFT 01
          </label>
          <select
            value={selectedSlugA}
            onChange={(e) => setSelectedSlugA(e.target.value)}
            className="w-full bg-neutral-950 border border-white/15 text-xs text-white p-3 rounded-xl focus:outline-none focus:border-amber-400"
          >
            {allAircraft.map((ac) => (
              <option key={ac.id} value={ac.slug}>
                {ac.manufacturer} {ac.model} ({ac.category.replace(/_/g, " ")})
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-data text-amber-400 uppercase tracking-wider font-semibold">
            AIRCRAFT 02
          </label>
          <select
            value={selectedSlugB}
            onChange={(e) => setSelectedSlugB(e.target.value)}
            className="w-full bg-neutral-950 border border-white/15 text-xs text-white p-3 rounded-xl focus:outline-none focus:border-amber-400"
          >
            {allAircraft.map((ac) => (
              <option key={ac.id} value={ac.slug}>
                {ac.manufacturer} {ac.model} ({ac.category.replace(/_/g, " ")})
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-data text-amber-400 uppercase tracking-wider font-semibold">
            AIRCRAFT 03 (OPTIONAL)
          </label>
          <select
            value={selectedSlugC}
            onChange={(e) => setSelectedSlugC(e.target.value)}
            className="w-full bg-neutral-950 border border-white/15 text-xs text-white p-3 rounded-xl focus:outline-none focus:border-amber-400"
          >
            {allAircraft.map((ac) => (
              <option key={ac.id} value={ac.slug}>
                {ac.manufacturer} {ac.model} ({ac.category.replace(/_/g, " ")})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Side-by-Side Comparison Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {compareList.map((ac, idx) => {
          const cruiseSpeed = ac.typicalCruiseSpeed || 420;
          const flightTime = formatFlightDuration(currentMission.distanceNm, cruiseSpeed);
          const rangeEnvelope = ac.approximateRange || 1500;
          const isNonStop = rangeEnvelope >= currentMission.distanceNm;

          return (
            <div
              key={`${ac.id}-${idx}`}
              className="flex flex-col justify-between gap-6 p-6 sm:p-7 bg-neutral-900/50 border border-white/10 rounded-2xl relative"
            >
              {/* Model Header */}
              <div className="flex flex-col gap-2 border-b border-white/10 pb-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-data text-amber-400 uppercase tracking-widest font-semibold">
                    {ac.category.replace(/_/g, " ")}
                  </span>
                  <DataStatusBadge status={ac.dataStatus} />
                </div>
                <h3 className="text-2xl font-light text-white">
                  {ac.manufacturer} {ac.model}
                </h3>
                <p className="text-xs text-neutral-400 line-clamp-2">
                  {ac.idealProfile}
                </p>
              </div>

              {/* Mission Calculated Suitability Block */}
              <div className="p-4 rounded-xl bg-neutral-950/80 border border-white/5 space-y-2 text-xs font-data">
                <span className="text-[9px] text-amber-400 uppercase tracking-wider block font-semibold">
                  BENCHMARK MISSION CALCULATION
                </span>
                <div className="flex justify-between">
                  <span className="text-neutral-400">FLIGHT DURATION</span>
                  <span className="text-white font-bold">{flightTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">NON-STOP ENDURANCE</span>
                  <span className={isNonStop ? "text-emerald-400 font-medium" : "text-amber-400 font-medium"}>
                    {isNonStop ? "✓ DIRECT NON-STOP" : "⚠️ FUEL STOP REQ"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">PAYLOAD FIT</span>
                  <span className={ac.passengerCapacity >= currentMission.passengers ? "text-emerald-400" : "text-red-400"}>
                    {ac.passengerCapacity >= currentMission.passengers ? `✓ ACCOMMODATES ${currentMission.passengers} PAX` : "❌ EXCEEDS CAPACITY"}
                  </span>
                </div>
              </div>

              {/* Spec Metrics Table */}
              <div className="flex flex-col gap-2.5 font-data text-xs">
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-neutral-400 uppercase text-[10px]">PASSENGER SEATS</span>
                  <span className="text-white font-medium">{ac.passengerCapacity} SEATS</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-neutral-400 uppercase text-[10px]">MAX RANGE</span>
                  <span className="text-white font-medium">{ac.approximateRange} NM</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-neutral-400 uppercase text-[10px]">CRUISE SPEED</span>
                  <span className="text-white font-medium">{ac.typicalCruiseSpeed} KTS</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-neutral-400 uppercase text-[10px]">CABIN HEIGHT</span>
                  <span className="text-white font-medium">
                    {ac.cabinDimensions?.heightM ? `${ac.cabinDimensions.heightM} m` : "N/A"}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-neutral-400 uppercase text-[10px]">TAKEOFF RUNWAY</span>
                  <span className="text-white font-medium">
                    {ac.runwayTakeoffM && ac.runwayTakeoffM > 0 ? `${ac.runwayTakeoffM} m` : "HELIPAD"}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-neutral-400 uppercase text-[10px]">BAGGAGE HOLD</span>
                  <span className="text-white font-medium truncate max-w-[150px]" title={ac.baggageCapacity}>
                    {ac.baggageCapacity || "Standard hold"}
                  </span>
                </div>
              </div>

              {/* Key Strengths */}
              <div className="flex flex-col gap-2 pt-2">
                <span className="text-[10px] font-data text-amber-400 uppercase font-semibold">
                  OPERATIONAL STRENGTHS
                </span>
                <ul className="flex flex-col gap-1.5">
                  {ac.strengths?.slice(0, 3).map((str, i) => (
                    <li key={i} className="text-xs text-neutral-300 flex items-start gap-2">
                      <span className="text-amber-400">•</span>
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
                <Link href={`/aircraft/${ac.slug}`} className="w-full">
                  <Button variant="outline" size="sm" className="w-full text-center justify-center">
                    FULL SPEC BOOK →
                  </Button>
                </Link>
                <Link href={`/plan?to=${encodeURIComponent(currentMission.title)}&passengers=${currentMission.passengers}`} className="w-full">
                  <Button variant="primary" size="sm" className="w-full text-center justify-center">
                    PLAN THIS MISSION →
                  </Button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
