"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { DataStatusBadge } from "../shared/DataStatusBadge";
import { AviationImage } from "../AviationImage";

export function AircraftMatcher() {
  const [origin, setOrigin] = useState("Bucharest");
  const [destination, setDestination] = useState("Milan");
  const [passengers, setPassengers] = useState("4");
  const [priority, setPriority] = useState("FASTEST");
  const [hasEvaluated, setHasEvaluated] = useState(true);

  const isHeliMission =
    destination.toLowerCase().includes("bran") ||
    destination.toLowerCase().includes("prahova") ||
    destination.toLowerCase().includes("pad");

  const recommendation = isHeliMission
    ? {
        category: "TWIN-ENGINE EXECUTIVE HELICOPTER",
        reason: "Direct helipad access bypassing mountain road congestion and short-field runway constraints.",
        duration: "42 MIN FLIGHT",
        image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80",
      }
    : {
        category: "LIGHT / MIDSIZE EXECUTIVE JET",
        reason: "Optimal balance between direct travel time, high-altitude cruise speed, cabin comfort, and fuel efficiency.",
        duration: "1 HR 55 MIN FLIGHT",
        image: "https://images.unsplash.com/photo-1587019158091-1a103c5dd17f?auto=format&fit=crop&w=800&q=80",
      };

  const handleEvaluate = (e: React.FormEvent) => {
    e.preventDefault();
    setHasEvaluated(true);
  };

  return (
    <div className="w-full glass-elevated rounded-3xl p-6 sm:p-10 flex flex-col gap-8 border border-white/10 shadow-2xl">
      <div className="flex flex-col gap-3 border-b border-white/10 pb-6">
        <div className="flex items-center justify-between">
          <span className="text-xs font-data text-amber-400 uppercase tracking-widest font-semibold">
            AIR INTELLIGENCE MATCHER
          </span>
          <DataStatusBadge status="INDICATIVE" />
        </div>
        <h3 className="text-2xl sm:text-3xl font-light text-[var(--color-text-primary)] font-sans">
          FIND THE RIGHT AIRCRAFT FOR YOUR MISSION
        </h3>
        <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] font-sans">
          Don&apos;t choose an aircraft category first. Enter your mission parameters and let AIR match the performance envelope.
        </p>
      </div>

      <form onSubmit={handleEvaluate} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Input
          label="ORIGIN // FROM"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          required
        />
        <Input
          label="DESTINATION // TO"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
        />
        <Select
          label="PASSENGERS // WHO"
          value={passengers}
          onChange={(e) => setPassengers(e.target.value)}
          options={[
            { value: "1-3", label: "1 - 3 PASSENGERS" },
            { value: "4", label: "4 PASSENGERS" },
            { value: "5-7", label: "5 - 7 PASSENGERS" },
            { value: "8+", label: "8+ PASSENGERS" },
          ]}
        />
        <Select
          label="PRIORITY"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          options={[
            { value: "FASTEST", label: "FASTEST FLIGHT" },
            { value: "BEST_VALUE", label: "BEST VALUE" },
            { value: "MOST_COMFORTABLE", label: "MOST COMFORTABLE" },
            { value: "MOST_PRIVATE", label: "MOST PRIVATE" },
          ]}
        />
      </form>

      {hasEvaluated && (
        <Card variant="surface" className="flex flex-col md:flex-row gap-6 border-2 border-amber-400/60 p-0 rounded-2xl overflow-hidden group shadow-2xl bg-amber-500/[0.03]">
          <div className="relative h-56 md:h-auto md:w-72 bg-neutral-900 overflow-hidden shrink-0">
            <AviationImage
              src={recommendation.image}
              alt={recommendation.category}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              fallbackTitle={recommendation.category}
              fallbackCode="MATCH // AIRCRAFT"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:hidden pointer-events-none" />
            <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded text-[10px] font-data text-amber-400 font-bold z-10">
              OPTIMAL VEHICLE FIT
            </div>
          </div>

          <div className="p-6 sm:p-8 flex flex-col justify-between gap-6 flex-1">
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-3">
                <div>
                  <span className="text-[10px] font-data text-amber-400 uppercase tracking-widest font-semibold block">
                    AIR RECOMMENDED MATCH
                  </span>
                  <h4 className="text-2xl font-light text-white font-sans mt-0.5">
                    {recommendation.category}
                  </h4>
                </div>
                <span className="text-xs font-data text-amber-300 bg-amber-500/10 px-3 py-1.5 border border-amber-500/30 rounded-full font-bold">
                  ESTIMATED: {recommendation.duration}
                </span>
              </div>

              <div className="text-xs text-neutral-300 leading-relaxed font-sans border-l-2 border-amber-400/50 pl-3 py-1">
                <span className="text-[9px] font-data text-amber-400 block mb-0.5 uppercase tracking-wider font-semibold">
                  WHY THIS MATCHES YOUR PARAMETERS
                </span>
                {recommendation.reason}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
              <span className="text-[10px] font-data text-neutral-400">
                PARAMETERS: {origin} → {destination} • {passengers} PAX
              </span>
              <Link href={`/plan?from=${encodeURIComponent(origin)}&to=${encodeURIComponent(destination)}&passengers=${passengers}&priority=${priority}`}>
                <Button variant="primary" size="md">
                  RUN FULL MISSION IN PLANNER →
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
