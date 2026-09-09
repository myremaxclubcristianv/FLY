"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Aircraft } from "../../types/domain";
import { Button } from "../ui/Button";
import { DataStatusBadge } from "../shared/DataStatusBadge";

interface AircraftCompareEngineProps {
  allAircraft: Aircraft[];
}

export function AircraftCompareEngine({ allAircraft }: AircraftCompareEngineProps) {
  const [selectedSlugA, setSelectedSlugA] = useState<string>("phenom-300");
  const [selectedSlugB, setSelectedSlugB] = useState<string>("citation-cj4");
  const [selectedSlugC, setSelectedSlugC] = useState<string>("challenger-350");

  const acA = allAircraft.find((a) => a.slug === selectedSlugA) || allAircraft[0];
  const acB = allAircraft.find((a) => a.slug === selectedSlugB) || allAircraft[1];
  const acC = allAircraft.find((a) => a.slug === selectedSlugC) || allAircraft[2];

  const compareList = [acA, acB, acC];

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Selector Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-sm">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-data text-[var(--color-accent)] uppercase tracking-wider">
            AIRCRAFT 01
          </label>
          <select
            value={selectedSlugA}
            onChange={(e) => setSelectedSlugA(e.target.value)}
            className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-xs text-[var(--color-text-primary)] p-3 rounded-sm focus:outline-none focus:border-[var(--color-accent)]"
          >
            {allAircraft.map((ac) => (
              <option key={ac.id} value={ac.slug}>
                {ac.manufacturer} {ac.model} ({ac.category.replace(/_/g, " ")})
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-data text-[var(--color-accent)] uppercase tracking-wider">
            AIRCRAFT 02
          </label>
          <select
            value={selectedSlugB}
            onChange={(e) => setSelectedSlugB(e.target.value)}
            className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-xs text-[var(--color-text-primary)] p-3 rounded-sm focus:outline-none focus:border-[var(--color-accent)]"
          >
            {allAircraft.map((ac) => (
              <option key={ac.id} value={ac.slug}>
                {ac.manufacturer} {ac.model} ({ac.category.replace(/_/g, " ")})
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-data text-[var(--color-accent)] uppercase tracking-wider">
            AIRCRAFT 03 (OPTIONAL)
          </label>
          <select
            value={selectedSlugC}
            onChange={(e) => setSelectedSlugC(e.target.value)}
            className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-xs text-[var(--color-text-primary)] p-3 rounded-sm focus:outline-none focus:border-[var(--color-accent)]"
          >
            {allAircraft.map((ac) => (
              <option key={ac.id} value={ac.slug}>
                {ac.manufacturer} {ac.model} ({ac.category.replace(/_/g, " ")})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {compareList.map((ac, idx) => (
          <div
            key={`${ac.id}-${idx}`}
            className="flex flex-col gap-6 p-6 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-sm relative"
          >
            {/* Model Card Header */}
            <div className="flex flex-col gap-2 border-b border-[var(--color-border-subtle)] pb-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-data text-[var(--color-accent)] uppercase tracking-widest">
                  {ac.category.replace(/_/g, " ")}
                </span>
                <DataStatusBadge status={ac.dataStatus} />
              </div>
              <h3 className="text-xl font-light text-[var(--color-text-primary)]">
                {ac.manufacturer} {ac.model}
              </h3>
              <p className="text-xs text-[var(--color-text-muted)] line-clamp-2">
                {ac.idealProfile}
              </p>
            </div>

            {/* Spec Metrics Table */}
            <div className="flex flex-col gap-3 font-data text-xs">
              <div className="flex justify-between py-2 border-b border-[var(--color-border-subtle)]">
                <span className="text-[var(--color-text-muted)] uppercase text-[10px]">PASSENGERS</span>
                <span className="text-[var(--color-text-primary)] font-medium">{ac.passengerCapacity} SEATS</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[var(--color-border-subtle)]">
                <span className="text-[var(--color-text-muted)] uppercase text-[10px]">APPROX RANGE</span>
                <span className="text-[var(--color-text-primary)] font-medium">{ac.approximateRange} NM</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[var(--color-border-subtle)]">
                <span className="text-[var(--color-text-muted)] uppercase text-[10px]">CRUISE SPEED</span>
                <span className="text-[var(--color-text-primary)] font-medium">{ac.typicalCruiseSpeed} KTS</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[var(--color-border-subtle)]">
                <span className="text-[var(--color-text-muted)] uppercase text-[10px]">CABIN HEIGHT</span>
                <span className="text-[var(--color-text-primary)] font-medium">
                  {ac.cabinDimensions?.heightM ? `${ac.cabinDimensions.heightM} m` : "N/A"}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-[var(--color-border-subtle)]">
                <span className="text-[var(--color-text-muted)] uppercase text-[10px]">TAKEOFF RUNWAY</span>
                <span className="text-[var(--color-text-primary)] font-medium">
                  {ac.runwayTakeoffM && ac.runwayTakeoffM > 0 ? `${ac.runwayTakeoffM} m` : "HELIPAD"}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-[var(--color-border-subtle)]">
                <span className="text-[var(--color-text-muted)] uppercase text-[10px]">BAGGAGE VOLUME</span>
                <span className="text-[var(--color-text-primary)] font-medium truncate max-w-[140px]" title={ac.baggageCapacity}>
                  {ac.baggageCapacity}
                </span>
              </div>
            </div>

            {/* Key Strengths & Trade-offs */}
            <div className="flex flex-col gap-3 pt-2">
              <span className="text-[10px] font-data text-[var(--color-accent)] uppercase">KEY STRENGTHS</span>
              <ul className="flex flex-col gap-1">
                {ac.strengths?.map((str, i) => (
                  <li key={i} className="text-xs text-[var(--color-text-secondary)] flex items-start gap-2">
                    <span className="text-[var(--color-accent)]">•</span>
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto pt-4 border-t border-[var(--color-border-subtle)]">
              <Link href={`/aircraft/${ac.slug}`} className="w-full block">
                <Button variant="outline" size="sm" className="w-full text-center justify-center">
                  FULL INTELLIGENCE PROFILE →
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
