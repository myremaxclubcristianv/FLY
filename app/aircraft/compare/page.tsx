import React from "react";
import { Container } from "../../../components/layout/Container";
import { SectionHeader } from "../../../components/shared/SectionHeader";
import { DataStatusBadge } from "../../../components/shared/DataStatusBadge";
import { AircraftCompareEngine } from "../../../components/aircraft/AircraftCompareEngine";
import { UnifiedAviationRepository } from "../../../lib/repositories/unified-aviation-repo";

export const metadata = {
  title: "Aircraft Comparison Engine | Side-by-Side Aviation Performance | AIR",
  description:
    "Compare private jet models side-by-side: passenger capacity, range, cruise speed, cabin volume, takeoff field length, and mission suitability.",
};

export default async function AircraftComparePage() {
  const allAircraft = await UnifiedAviationRepository.getAircraftModels();

  return (
    <div className="w-full py-16 bg-[var(--color-bg-primary)] flex-1 flex flex-col gap-12">
      <Container size="wide">
        <div className="flex flex-col gap-12">
          {/* Header */}
          <div className="flex flex-col gap-4 border-b border-[var(--color-border)] pb-8">
            <div className="flex items-center gap-3">
              <span className="text-xs font-data text-[var(--color-accent)] uppercase tracking-widest">
                AIRCRAFT INTELLIGENCE // COMPARISON ENGINE
              </span>
              <DataStatusBadge status="OFFICIAL_SOURCE" />
            </div>

            <SectionHeader
              title="HEAD-TO-HEAD AIRCRAFT COMPARISON."
              description="Evaluate cabin cross-sections, nonstop range envelopes, cruise speeds, airfield requirements, and operational tradeoffs side-by-side with verified manufacturer datasets."
              titleAs="h1"
            />
          </div>

          {/* Interactive Engine */}
          <AircraftCompareEngine allAircraft={allAircraft} />
        </div>
      </Container>
    </div>
  );
}
