"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { DataStatusBadge } from "../shared/DataStatusBadge";

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
      }
    : {
        category: "LIGHT / MIDSIZE EXECUTIVE JET",
        reason: "Optimal balance between direct travel time, high-altitude cruise speed, cabin comfort, and fuel efficiency.",
        duration: "1 HR 55 MIN FLIGHT",
      };

  const handleEvaluate = (e: React.FormEvent) => {
    e.preventDefault();
    setHasEvaluated(true);
  };

  return (
    <div className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] p-6 sm:p-10 flex flex-col gap-8">
      <div className="flex flex-col gap-2 border-b border-[var(--color-border)] pb-6">
        <div className="flex items-center justify-between">
          <span className="text-xs font-data text-[var(--color-accent)] uppercase tracking-widest">
            AIR INTELLIGENCE MATCHER
          </span>
          <DataStatusBadge status="INDICATIVE" />
        </div>
        <h3 className="text-2xl sm:text-3xl font-light text-[var(--color-text-primary)]">
          FIND THE RIGHT AIRCRAFT FOR YOUR MISSION
        </h3>
        <p className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
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
        <Card variant="default" className="flex flex-col gap-6 border-2 border-[var(--color-accent)] p-6 sm:p-8 animate-fadeIn">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--color-border-subtle)] pb-4">
            <div>
              <span className="text-[10px] font-data text-[var(--color-accent)] uppercase">
                AIR RECOMMENDED MATCH
              </span>
              <h4 className="text-2xl font-light text-[var(--color-text-primary)]">
                {recommendation.category}
              </h4>
            </div>
            <span className="text-xs font-data text-[var(--color-text-primary)] bg-[var(--color-surface)] px-3 py-1.5 border border-[var(--color-border)]">
              ESTIMATED: {recommendation.duration}
            </span>
          </div>

          <div className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
            <span className="text-[10px] font-data text-[var(--color-accent)] block mb-1">
              WHY THIS MATCHES
            </span>
            {recommendation.reason}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-[var(--color-border-subtle)]">
            <span className="text-[10px] font-data text-[var(--color-text-muted)]">
              MISSION PARAMETERS: {origin} → {destination} {"//"} {passengers} PAX
            </span>
            <Link href={`/plan?from=${encodeURIComponent(origin)}&to=${encodeURIComponent(destination)}&passengers=${passengers}&priority=${priority}`}>
              <Button variant="primary" size="md">
                RUN FULL MISSION IN PLANNER →
              </Button>
            </Link>
          </div>
        </Card>
      )}
    </div>
  );
}
