import React from "react";
import { Container } from "../../../components/layout/Container";
import { DataStatusBadge } from "../../../components/shared/DataStatusBadge";
import { AircraftCompareEngine } from "../../../components/aircraft/AircraftCompareEngine";
import { UnifiedAviationRepository } from "../../../lib/repositories/unified-aviation-repo";
import { AviationImage } from "../../../components/AviationImage";
import { EDITORIAL_ATMOSPHERE } from "../../../data/real/aviation-photos";

export const metadata = {
  title: "Aircraft Comparison Engine | Side-by-Side Aviation Performance | AIR",
  description:
    "Compare private jet models side-by-side: passenger capacity, range, cruise speed, cabin volume, takeoff field length, and mission suitability.",
};

export default async function AircraftComparePage() {
  const allAircraft = await UnifiedAviationRepository.getAircraftModels();

  return (
    <div className="w-full bg-[var(--color-bg-primary)] flex-1 flex flex-col">
      {/* Top Aerospace Context Hero Ribbon */}
      <section className="relative w-full h-64 sm:h-72 overflow-hidden bg-neutral-950 border-b border-white/[0.08]">
        <AviationImage
          src={EDITORIAL_ATMOSPHERE.mountainOverflight}
          alt="Aircraft in High Flight Comparison"
          fill
          priority
          className="object-cover opacity-45 filter brightness-90 contrast-110"
          fallbackTitle="Aircraft Comparison Intelligence"
          fallbackCode="COMPARE // TELEMETRY"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-neutral-950/30" />
        <Container size="wide" className="relative z-10 h-full flex flex-col justify-end pb-8">
          <div className="flex flex-col gap-2 text-white">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded border border-amber-500/20">
                AIRCRAFT INTELLIGENCE // COMPARISON ENGINE
              </span>
              <DataStatusBadge status="OFFICIAL_SOURCE" />
            </div>
            <h1 className="text-3xl sm:text-5xl font-light tracking-tight font-sans">
              HEAD-TO-HEAD AIRCRAFT COMPARISON<span className="text-amber-400">.</span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-300 font-light max-w-2xl leading-relaxed">
              Evaluate cabin cross-sections, nonstop range envelopes, cruise speeds, airfield requirements, and operational tradeoffs side-by-side with verified manufacturer datasets.
            </p>
          </div>
        </Container>
      </section>

      {/* Interactive Engine */}
      <div className="w-full py-12 md:py-16">
        <Container size="wide">
          <AircraftCompareEngine allAircraft={allAircraft} />
        </Container>
      </div>
    </div>
  );
}
