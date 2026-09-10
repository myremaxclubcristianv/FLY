import React from "react";
import Link from "next/link";
import { Container } from "../../components/layout/Container";
import { DataStatusBadge } from "../../components/shared/DataStatusBadge";
import { Button } from "../../components/ui/Button";
import { AviationImage } from "../../components/AviationImage";

export const metadata = {
  title: "Corporate Aviation & Executive Flight Management | BUY BACK YOUR TIME | AIR",
  description:
    "Buy back your time. Optimize executive team travel, multi-city European shuttle missions, recurring corporate routes, and block-hour flight management.",
};

export default function BusinessPage() {
  const comparison = [
    {
      step: "01. DEPARTURE PLANNING",
      commercial: "Fixed airline flight schedules; 2-hour early arrival required at major hubs.",
      executive: "Depart on your custom schedule; streamlined VIP arrival typically 15–20 minutes prior to boarding at Băneasa (LRBS).",
    },
    {
      step: "02. SECURITY & TERMINAL",
      commercial: "Long public queues, intrusive screening lines, crowded gates, and public exposure.",
      executive: "Dedicated private FBO lounge handling, fast-track discreet customs, direct ramp vehicle to aircraft stairs.",
    },
    {
      step: "03. ROUTING & CONNECTIONS",
      commercial: "Hub-and-spoke layovers, baggage transit risks, connection delays, and rigid routes.",
      executive: "Direct point-to-point vectors; access to 3,000+ regional European airfields closer to final business destinations.",
    },
    {
      step: "04. IN-FLIGHT PRODUCTIVITY",
      commercial: "Noise, tight seating, public eavesdropping risks on confidential M&A discussions.",
      executive: "Private conference cabin, Ka-band high-speed satellite Wi-Fi, four-club executive leather seats.",
    },
  ];

  const corporateSolutions = [
    {
      title: "Executive Shuttle Missions",
      tagline: "Recurring Corridors & Roadshows",
      desc: "Regular scheduled charter flights connecting Bucharest, Cluj, Timișoara, Vienna, Frankfurt, and London for leadership teams.",
      features: ["Fixed dispatch schedules", "Pre-cleared passenger manifests", "Guaranteed aircraft staging at LRBS"],
    },
    {
      title: "Multi-City Same-Day Itineraries",
      tagline: "3 Cities in 1 Day",
      desc: "Fly Bucharest → Munich for morning meeting → Zurich for lunch → return to Bucharest by evening. Impossible on commercial airlines.",
      features: ["Zero overnight hotel costs", "Aircraft stands by on tarmac", "Dynamic route adjustments on demand"],
    },
    {
      title: "Corporate Block-Hour Accounts",
      tagline: "Predictable Flight Access",
      desc: "Pre-funded flight hours with priority booking windows, locked hourly rates, and zero asset ownership liability.",
      features: ["25, 50, and 100 block-hour tiers", "Multi-aircraft fleet interchange", "Consolidated monthly billing & carbon audit"],
    },
  ];

  return (
    <div className="w-full bg-white text-neutral-900 font-sans flex-1 flex flex-col">
      {/* 01 — EDITORIAL HEADER (Pure White Luxury) */}
      <section className="w-full py-24 sm:py-32 border-b border-neutral-200/80 bg-white">
        <Container size="wide">
          <div className="flex flex-col gap-10 max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-200 pb-8">
              <div className="space-y-4 max-w-3xl">
                <div className="flex items-center gap-3">
                  <span className="editorial-tag-dark">
                    EXECUTIVE ADVISORY // TIME SOVEREIGNTY
                  </span>
                  <DataStatusBadge status="OFFICIAL_SOURCE" />
                </div>
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-neutral-900 leading-[1.05] font-sans">
                  BUY BACK YOUR TIME<span className="text-amber-600">.</span>
                </h1>
                <p className="text-lg sm:text-xl text-neutral-600 font-light leading-relaxed">
                  Executive aviation was built to reclaim control of time. AIR streamlines corporate multi-city itineraries, executive shuttle optimization, and time-critical missions across 3,000+ European airfields.
                </p>
              </div>

              <Link href="/plan?priority=FASTEST">
                <Button variant="primary" size="lg" className="whitespace-nowrap px-8 shadow-xl">
                  REQUEST CORPORATE FLIGHT →
                </Button>
              </Link>
            </div>

            {/* Massive Executive Cabin & Ramp Showcase */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="editorial-card-light rounded-3xl overflow-hidden group bg-white shadow-xl">
                <div className="relative h-80 sm:h-96 w-full overflow-hidden bg-neutral-900">
                  <AviationImage
                    src="https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=85"
                    alt="Executive Jet Cabin Conference"
                    fill
                    className="object-cover group-hover:scale-105 transition duration-700"
                    fallbackTitle="Executive Cabin"
                    fallbackCode="CABIN // CONFERENCE"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                  <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-2 z-10 text-white">
                    <span className="text-[10px] font-mono text-amber-400 font-bold tracking-wider uppercase">
                      CONFIDENTIAL IN-FLIGHT WORKSPACE
                    </span>
                    <h3 className="text-2xl font-light font-sans">
                      Boardroom in the Stratosphere
                    </h3>
                    <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                      High-speed Ka-band connectivity, four-club conference seating, and zero acoustic interference.
                    </p>
                  </div>
                </div>
              </div>

              <div className="editorial-card-light rounded-3xl overflow-hidden group bg-white shadow-xl">
                <div className="relative h-80 sm:h-96 w-full overflow-hidden bg-neutral-900">
                  <AviationImage
                    src="https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=1200&q=85"
                    alt="Direct FBO Ramp Boarding"
                    fill
                    className="object-cover group-hover:scale-105 transition duration-700"
                    fallbackTitle="FBO Ramp Transfer"
                    fallbackCode="RAMP // DISPATCH"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                  <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-2 z-10 text-white">
                    <span className="text-[10px] font-mono text-amber-400 font-bold tracking-wider uppercase">
                      STREAMLINED FBO DISPATCH
                    </span>
                    <h3 className="text-2xl font-light font-sans">
                      Direct Tarmac Vehicle Access
                    </h3>
                    <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                      Chauffeured transit directly to aircraft stairs in under 20 minutes from arrival at executive FBO.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 02 — CORPORATE AVIATION PRODUCT ARCHITECTURE */}
      <section className="w-full py-24 sm:py-32 bg-white border-b border-neutral-200/80">
        <Container size="wide">
          <div className="max-w-6xl mx-auto space-y-16">
            <div className="space-y-4">
              <span className="editorial-tag-dark">
                CORPORATE AVIATION CAPABILITIES
              </span>
              <h2 className="text-3xl sm:text-5xl font-light text-neutral-900 font-sans">
                Engineered for Enterprise Mobility
              </h2>
              <p className="text-base text-neutral-600 max-w-2xl font-light leading-relaxed">
                Whether coordinating quarterly roadshows across Central Europe or providing on-call repatriation access, AIR structures verified AOC solutions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {corporateSolutions.map((sol, i) => (
                <div key={i} className="editorial-card-light p-8 rounded-3xl bg-[#fafaf7] border border-neutral-200/80 space-y-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="text-[10px] font-mono text-amber-600 font-bold uppercase tracking-wider block">
                      {sol.tagline}
                    </span>
                    <h3 className="text-2xl font-light text-neutral-900 font-sans">
                      {sol.title}
                    </h3>
                    <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                      {sol.desc}
                    </p>

                    <ul className="space-y-2 pt-2 border-t border-neutral-200 text-xs text-neutral-700 font-data">
                      {sol.features.map((f, fi) => (
                        <li key={fi} className="flex items-center gap-2">
                          <span className="text-amber-600">✓</span> {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link href={`/plan?purpose=EXECUTIVE_BUSINESS&notes=${encodeURIComponent(sol.title)}`} className="w-full pt-4">
                    <Button variant="outline" size="sm" className="w-full text-center justify-center">
                      REQUEST THIS PROGRAM →
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 03 — EFFICIENCY COMPARATIVE TIMELINE */}
      <section className="w-full py-24 sm:py-32 bg-[#fafaf7] border-b border-neutral-200/80">
        <Container size="wide">
          <div className="max-w-6xl mx-auto space-y-16">
            <div className="space-y-4">
              <span className="editorial-tag-dark">
                FLIGHT MECHANICS // TIME EFFICIENCY AUDIT
              </span>
              <h2 className="text-3xl sm:text-5xl font-light text-neutral-900 font-sans">
                Commercial Airline vs. Private Executive Travel
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {comparison.map((c, i) => (
                <div key={i} className="editorial-card-light p-8 rounded-3xl space-y-6 bg-white shadow-sm">
                  <span className="text-xs font-mono text-amber-600 font-bold tracking-wider block">
                    {c.step}
                  </span>
                  <div className="space-y-4 text-sm font-sans">
                    <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-1">
                      <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold block">COMMERCIAL SCHEDULE</span>
                      <p className="text-neutral-600 leading-relaxed">{c.commercial}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-1">
                      <span className="text-[10px] font-mono text-amber-600 uppercase font-bold block">AIR EXECUTIVE FLIGHT</span>
                      <p className="text-neutral-900 font-medium leading-relaxed">{c.executive}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 04 — MISSION PLANNER CTA */}
      <section className="w-full py-24 sm:py-32 bg-neutral-950 text-white">
        <Container size="wide">
          <div className="max-w-6xl mx-auto rounded-3xl border border-amber-500/30 bg-gradient-to-b from-neutral-900 to-black p-10 sm:p-16 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest block">
                EXECUTIVE FLIGHT MANAGEMENT
              </span>
              <h3 className="text-3xl sm:text-5xl font-light text-white font-sans">
                OPTIMIZE YOUR CORPORATE TRAVEL
              </h3>
              <p className="text-sm text-neutral-300 font-sans">
                Set up corporate accounts, recurring multi-city European routes, and guaranteed aircraft availability with verified AOC operators.
              </p>
            </div>

            <Link href="/plan?purpose=EXECUTIVE_BUSINESS">
              <Button variant="primary" size="lg" className="whitespace-nowrap px-10 py-5 text-base shadow-2xl">
                PLAN CORPORATE MISSION →
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
