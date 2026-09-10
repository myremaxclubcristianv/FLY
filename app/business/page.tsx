import React from "react";
import Link from "next/link";
import { Container } from "../../components/layout/Container";
import { SectionHeader } from "../../components/shared/SectionHeader";
import { DataStatusBadge } from "../../components/shared/DataStatusBadge";
import { Button } from "../../components/ui/Button";
import { AviationImage } from "../../components/AviationImage";

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
      executive: "Depart on your custom schedule; streamlined VIP arrival typically 20–30 minutes prior to boarding.",
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

          {/* Visual Showcase: Executive Flight Operations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden glass-surface border border-white/10 group">
              <AviationImage
                src="https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=80"
                alt="Executive Jet Cabin Conference"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                fallbackTitle="Executive Cabin"
                fallbackCode="CABIN // 01"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-2 z-10">
                <span className="text-[10px] font-data text-amber-400 font-semibold tracking-wider">
                  CONFIDENTIAL IN-FLIGHT WORKSPACE
                </span>
                <h3 className="text-xl font-light text-white">
                  Boardroom in the Stratosphere
                </h3>
                <p className="text-xs text-neutral-300 font-sans line-clamp-2">
                  High-speed Ka-band connectivity, four-club conference seating, and zero acoustic interference for executive teams.
                </p>
              </div>
            </div>

            <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden glass-surface border border-white/10 group">
              <AviationImage
                src="https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=1200&q=80"
                alt="Direct FBO Ramp Boarding"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                fallbackTitle="FBO Ramp Transfer"
                fallbackCode="RAMP // 02"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-2 z-10">
                <span className="text-[10px] font-data text-amber-400 font-semibold tracking-wider">
                  STREAMLINED FBO DISPATCH
                </span>
                <h3 className="text-xl font-light text-white">
                  Direct Tarmac Vehicle Access
                </h3>
                <p className="text-xs text-neutral-300 font-sans line-clamp-2">
                  Arrive at Bucharest Băneasa (LRBS) 15 minutes prior to wheels up with dedicated customs, passport control, and ramp clearance.
                </p>
              </div>
            </div>
          </div>

          {/* Telemetry Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-data">
            <div className="glass-instrument p-5 rounded-2xl flex flex-col gap-1">
              <span className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">CURB-TO-CABIN TIME</span>
              <span className="text-2xl text-amber-400 font-bold">15 MIN</span>
              <span className="text-[10px] text-neutral-400">Băneasa LRBS VIP FBO</span>
            </div>
            <div className="glass-instrument p-5 rounded-2xl flex flex-col gap-1">
              <span className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">EUROPEAN AIRFIELD ACCESS</span>
              <span className="text-2xl text-amber-400 font-bold">3,000+</span>
              <span className="text-[10px] text-neutral-400">vs 300 commercial hubs</span>
            </div>
            <div className="glass-instrument p-5 rounded-2xl flex flex-col gap-1">
              <span className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">ANNUAL TIME RECLAIMED</span>
              <span className="text-2xl text-amber-400 font-bold">140+ HRS</span>
              <span className="text-[10px] text-neutral-400">Per executive traveler</span>
            </div>
            <div className="glass-instrument p-5 rounded-2xl flex flex-col gap-1">
              <span className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">CONFIDENTIALITY RISK</span>
              <span className="text-2xl text-amber-400 font-bold">0%</span>
              <span className="text-[10px] text-neutral-400">100% private cabin enclave</span>
            </div>
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
