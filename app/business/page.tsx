import React from "react";
import Link from "next/link";
import { Container } from "../../components/layout/Container";
import { SectionHeader } from "../../components/shared/SectionHeader";
import { DataStatusBadge } from "../../components/shared/DataStatusBadge";
import { Button } from "../../components/ui/Button";

export const metadata = {
  title: "Corporate Aviation & Executive Flight Management | AIR",
  description:
    "Buy back your time. Optimize executive team travel, multi-city European shuttle missions, and time-sensitive corporate flight requirements.",
};

export default function BusinessPage() {
  const comparison = [
    {
      step: "01. DEPARTURE PLANNING",
      commercial: "Fixed airline flight schedules; 2-hour early arrival required at major hubs.",
      executive: "Depart on your schedule; arrive 15 minutes before flight at Băneasa FBO terminal.",
    },
    {
      step: "02. SECURITY & TERMINAL",
      commercial: "Long TSA/security queues, public terminal crowds, and gate walking distance.",
      executive: "Private FBO terminal handling, direct ramp vehicle transfer, quiet environment.",
    },
    {
      step: "03. ROUTING & CONNECTIONS",
      commercial: "Hub-and-spoke layovers, baggage transfers, connection risk, and regional delays.",
      executive: "Point-to-point direct routing; access to 3,000+ regional airfields across Europe.",
    },
    {
      step: "04. ON-BOARD PRODUCTIVITY",
      commercial: "Shared cabin noise, limited privacy, restricted internet, and confidential risk.",
      executive: "Private cabin conference layout; zero eavesdropping risk for executive teams.",
    },
  ];

  return (
    <div className="w-full py-16 bg-[var(--color-bg-primary)] flex-1 flex flex-col gap-16">
      <Container size="wide">
        <div className="flex flex-col gap-16">
          {/* Header */}
          <div className="flex flex-col gap-4 border-b border-[var(--color-border)] pb-8">
            <div className="flex items-center gap-3">
              <span className="text-xs font-data text-[var(--color-accent)] uppercase tracking-widest">
                WORLD // 03 BUSINESS & CORPORATE AVIATION
              </span>
              <DataStatusBadge status="INDICATIVE" />
            </div>

            <SectionHeader
              title="BUY BACK YOUR TIME."
              description="Executive aviation was built to reclaim control of time. AIR streamlines corporate multi-city itineraries, executive shuttle optimization, and time-critical missions."
              titleAs="h1"
            />
          </div>

          {/* Workflow Comparison Grid */}
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="text-2xl font-light text-[var(--color-text-primary)]">
                COMMERCIAL VS EXECUTIVE AVIATION WORKFLOW
              </h2>
              <span className="text-xs font-data text-amber-400 font-semibold">
                EFFICIENCY COMPARISON
              </span>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {comparison.map((c) => (
                <div key={c.step} className="grid grid-cols-1 md:grid-cols-12 gap-6 glass-surface p-6 sm:p-8 rounded-2xl">
                  <div className="md:col-span-3 flex flex-col justify-center">
                    <span className="text-xs font-data text-amber-400 font-semibold">{c.step}</span>
                  </div>
                  <div className="md:col-span-4 flex flex-col gap-1 border-l-2 border-red-500/40 pl-4">
                    <span className="text-[10px] font-data text-red-400 uppercase tracking-wider">COMMERCIAL AIRLINE</span>
                    <p className="text-xs text-[var(--color-text-secondary)] font-sans">{c.commercial}</p>
                  </div>
                  <div className="md:col-span-5 flex flex-col gap-1 border-l-2 border-amber-400 pl-4">
                    <span className="text-[10px] font-data text-amber-400 uppercase tracking-wider">AIR EXECUTIVE ACCESS</span>
                    <p className="text-xs text-[var(--color-text-primary)] font-sans font-medium">{c.executive}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Trigger */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 glass-elevated rounded-2xl">
            <div>
              <h3 className="text-xl font-light text-[var(--color-text-primary)]">
                PLAN A CORPORATE MULTI-STOP MISSION
              </h3>
              <p className="text-xs text-[var(--color-text-secondary)] font-data mt-1">
                Tell AIR your itinerary parameters to calculate the optimal flight vehicle profile.
              </p>
            </div>
            <Link href="/plan?priority=FASTEST">
              <Button variant="primary" size="lg">
                RUN CORPORATE PLANNER →
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
