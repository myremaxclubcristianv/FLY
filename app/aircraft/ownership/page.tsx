import React from "react";
import Link from "next/link";
import { Container } from "../../../components/layout/Container";
import { DataStatusBadge } from "../../../components/shared/DataStatusBadge";
import { Button } from "../../../components/ui/Button";
import { AviationImage } from "../../../components/AviationImage";

export const metadata = {
  title: "Aircraft Ownership & Access Decision Matrix | AIR",
  description:
    "Evaluate charter, membership, fractional, leasing, full ownership, and aircraft management models based on annual flight hours and operational complexity.",
};

export default function AircraftOwnershipPage() {
  const models = [
    {
      title: "ON-DEMAND CHARTER",
      hours: "1 - 25 HOURS / YEAR",
      commitment: "ZERO CAPITAL COMMITMENT",
      summary: "Ideal for flexible, occasional flight needs with zero residual asset risk or fixed monthly overhead.",
      bestFor: "Individual missions, occasional corporate trips, seasonal vacation hops.",
      link: "/plan",
      cta: "PLAN FLIGHT →",
    },
    {
      title: "LEASE & FINANCING",
      hours: "50 - 150 HOURS / YEAR",
      commitment: "PREDICTABLE MONTHLY LEASE",
      summary: "Guaranteed aircraft access and fixed monthly economics without balance sheet capital lockup.",
      bestFor: "Growing enterprises needing regular multi-city European shuttle availability.",
      link: "/aviation/finance",
      cta: "EXPLORE LEASING →",
    },
    {
      title: "AIRCRAFT MANAGEMENT (ACMI)",
      hours: "OWNED FLEET OPTIMIZATION",
      commitment: "CAMO & CREW CONTRACT",
      summary: "AIR coordinates certified crew, Part-145 maintenance oversight, hangarage, and charter revenue offsetting.",
      bestFor: "Aircraft owners seeking regulatory compliance, safety oversight, and charter income.",
      link: "/contact",
      cta: "MANAGEMENT ADVISORY →",
    },
    {
      title: "FULL ASSET ACQUISITION",
      hours: "150+ HOURS / YEAR",
      commitment: "FULL CAPITAL ACQUISITION",
      summary: "Complete operational sovereignty, tailored bespoke cabin interiors, and 100% dedicated mission availability.",
      bestFor: "Corporations, family offices, and high-utilization global flight departments.",
      link: "/aircraft-for-sale",
      cta: "ACQUISITION DOSSIER →",
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
                    ASSET ADVISORY // ACCESS VS OWNERSHIP
                  </span>
                  <DataStatusBadge status="INDICATIVE" />
                </div>
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-neutral-900 leading-[1.05] font-sans">
                  OWN THE RIGHT WAY<span className="text-amber-600">.</span>
                </h1>
                <p className="text-lg sm:text-xl text-neutral-600 font-light leading-relaxed">
                  Selecting between on-demand charter, dry leasing, turnkey aircraft management, and full airframe acquisition requires matching annual flight hours against liquidity goals.
                </p>
              </div>

              <Link href="/plan">
                <Button variant="primary" size="lg" className="whitespace-nowrap px-8 shadow-xl">
                  ADVISORY CONSULTATION →
                </Button>
              </Link>
            </div>

            {/* Visual Assets Showcase */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="editorial-card-light rounded-3xl overflow-hidden group bg-white shadow-xl">
                <div className="relative h-80 sm:h-96 w-full overflow-hidden bg-neutral-900">
                  <AviationImage
                    src="https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=1200&q=85"
                    alt="Aircraft Hangar Facility & Management"
                    fill
                    className="object-cover group-hover:scale-105 transition duration-700"
                    fallbackTitle="Hangar Facility"
                    fallbackCode="HANGAR // STORAGE"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                  <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-2 z-10 text-white">
                    <span className="text-[10px] font-mono text-amber-400 font-bold tracking-wider uppercase">
                      FACILITY & HANGARAGE
                    </span>
                    <h3 className="text-2xl font-light font-sans">
                      Controlled Climate Hangarage
                    </h3>
                    <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                      Climate-controlled storage, Part-145 line maintenance, and secure ramp positioning at Băneasa (LRBS).
                    </p>
                  </div>
                </div>
              </div>

              <div className="editorial-card-light rounded-3xl overflow-hidden group bg-white shadow-xl">
                <div className="relative h-80 sm:h-96 w-full overflow-hidden bg-neutral-900">
                  <AviationImage
                    src="https://images.unsplash.com/photo-1474302770737-173ee21bab63?auto=format&fit=crop&w=1200&q=85"
                    alt="Pre-Flight Airframe Inspection"
                    fill
                    className="object-cover group-hover:scale-105 transition duration-700"
                    fallbackTitle="Airframe Inspection"
                    fallbackCode="INSPECTION // CAMO"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                  <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-2 z-10 text-white">
                    <span className="text-[10px] font-mono text-amber-400 font-bold tracking-wider uppercase">
                      AIRWORTHINESS & COMPLIANCE
                    </span>
                    <h3 className="text-2xl font-light font-sans">
                      Continuous CAMO Oversight
                    </h3>
                    <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                      Full regulatory compliance, engine program enrollment, and certified maintenance tracking.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 02 — FOUR PILLARS OF ACCESS & OWNERSHIP */}
      <section className="w-full py-24 sm:py-32 bg-[#fafaf7] border-b border-neutral-200/80">
        <Container size="wide">
          <div className="max-w-6xl mx-auto space-y-16">
            <div className="space-y-4">
              <span className="editorial-tag-dark">
                ANNUAL UTILIZATION MATRIX
              </span>
              <h2 className="text-3xl sm:text-5xl font-light text-neutral-900 font-sans">
                Four Pillars of Private Aviation Access
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {models.map((m, i) => (
                <div key={i} className="editorial-card-light p-8 sm:p-10 rounded-3xl space-y-6 flex flex-col justify-between bg-white">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-amber-600 font-bold tracking-wider uppercase">
                        {m.hours}
                      </span>
                      <span className="text-[10px] font-mono px-3 py-1 bg-neutral-100 rounded-full text-neutral-600 font-semibold">
                        {m.commitment}
                      </span>
                    </div>

                    <h3 className="text-3xl font-light text-neutral-900 font-sans">
                      {m.title}
                    </h3>

                    <p className="text-sm text-neutral-600 font-sans leading-relaxed">
                      {m.summary}
                    </p>

                    <div className="pt-3 border-t border-neutral-100 space-y-1">
                      <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold block">RECOMMENDED PROFILE:</span>
                      <p className="text-xs text-neutral-700 font-sans">{m.bestFor}</p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Link
                      href={m.link}
                      className="text-xs font-mono text-amber-600 font-bold hover:underline"
                    >
                      {m.cta}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 03 — MISSION PLANNER CTA */}
      <section className="w-full py-24 sm:py-32 bg-neutral-950 text-white">
        <Container size="wide">
          <div className="max-w-6xl mx-auto rounded-3xl border border-amber-500/30 bg-gradient-to-b from-neutral-900 to-black p-10 sm:p-16 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest block">
                PRIVATE AVIATION ADVISORY
              </span>
              <h3 className="text-3xl sm:text-5xl font-light text-white font-sans">
                EVALUATE YOUR FLIGHT PROFILE
              </h3>
              <p className="text-sm text-neutral-300 font-sans">
                Receive an objective fleet economics audit tailored to your corporate or family office flight patterns.
              </p>
            </div>

            <Link href="/plan">
              <Button variant="primary" size="lg" className="whitespace-nowrap px-10 py-5 text-base shadow-2xl">
                START ADVISORY REVIEW →
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
