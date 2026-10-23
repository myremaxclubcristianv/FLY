import React from "react";
import Link from "next/link";
import { Container } from "../../../components/layout/Container";
import { DataStatusBadge } from "../../../components/shared/DataStatusBadge";
import { Button } from "../../../components/ui/Button";
import { AviationImage } from "../../../components/AviationImage";
import { OwnershipDecisionCalculator } from "../../../components/aircraft/OwnershipDecisionCalculator";

import { createRouteMetadata } from "../../../lib/seo/metadata";

export const metadata = createRouteMetadata({
  path: "/aircraft/ownership",
  title: "Aircraft Ownership & Access Decision Matrix | Charter vs Fractional vs Whole Asset",
  description:
    "Evaluate on-demand charter, jet card membership, fractional ownership, structured leasing, and whole aircraft acquisition based on annual flight hours.",
});

export default function AircraftOwnershipPage() {
  const models = [
    {
      title: "ON-DEMAND CHARTER",
      hours: "< 50 HOURS / YEAR",
      commitment: "ZERO CAPITAL COMMITMENT",
      summary: "Ideal for flexible, occasional flight needs with zero residual asset risk or fixed monthly overhead.",
      bestFor: "Individual missions, occasional corporate trips, seasonal vacation hops.",
      link: "/plan",
      cta: "PLAN FLIGHT →",
    },
    {
      title: "JET CARD / BLOCK HOURS",
      hours: "50 - 99 HOURS / YEAR",
      commitment: "PRE-FUNDED 25-50 HOUR CARDS",
      summary: "Guaranteed aircraft availability with locked hourly rates and zero long-term maintenance or hangar exposure.",
      bestFor: "Executives and corporate teams requiring priority flight callout.",
      link: "/plan",
      cta: "EXPLORE ACCESS →",
    },
    {
      title: "FRACTIONAL OWNERSHIP",
      hours: "100 - 174 HOURS / YEAR",
      commitment: "FRACTIONAL SHARE (1/8 OR 1/4)",
      summary: "Purchasing a structured aircraft share provides tailored cabin familiarity and tax depreciation with shared fixed overhead.",
      bestFor: "Regional leaders requiring consistent tail availability without whole-asset capital lockup.",
      link: "/contact?service=Fractional%20Ownership",
      cta: "FRACTIONAL ADVISORY →",
    },
    {
      title: "MANAGED LEASE / ACMI",
      hours: "175 - 249 HOURS / YEAR",
      commitment: "DRY/WET LEASE & CAMO OVERSIGHT",
      summary: "Dedicated airframe access under turnkey Part-NCC/Part-CAT management, with charter revenue offsetting surplus hours.",
      bestFor: "High-utilization corporations and flight departments with regular cross-European shuttles.",
      link: "/aviation/finance",
      cta: "EXPLORE LEASING →",
    },
    {
      title: "WHOLE AIRCRAFT ACQUISITION",
      hours: "250+ HOURS / YEAR",
      commitment: "FULL CAPITAL ACQUISITION",
      summary: "Complete operational sovereignty, tailored bespoke cabin interiors, and 100% dedicated mission availability.",
      bestFor: "Enterprises, family offices, and high-utilization global flight departments.",
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
                      Turnkey Operational Oversight
                    </h3>
                    <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                      CAMO continuous airworthiness, EASA Part-145 maintenance, and dedicated crew scheduling.
                    </p>
                  </div>
                </div>
              </div>

              <div className="editorial-card-light rounded-3xl overflow-hidden group bg-white shadow-xl">
                <div className="relative h-80 sm:h-96 w-full overflow-hidden bg-neutral-900">
                  <AviationImage
                    src="https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&w=1200&q=85"
                    alt="Executive Private Jet Aircraft Cockpit and Interior"
                    fill
                    className="object-cover group-hover:scale-105 transition duration-700"
                    fallbackTitle="Private Aircraft Cockpit"
                    fallbackCode="FLIGHT // ASSET"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                  <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-2 z-10 text-white">
                    <span className="text-[10px] font-mono text-amber-400 font-bold tracking-wider uppercase">
                      WHOLE ASSET ACQUISITION
                    </span>
                    <h3 className="text-2xl font-light font-sans">
                      Dedicated Fleet Sovereignty
                    </h3>
                    <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                      100% mission availability, customized cabin configuration, and private tail registration.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 02 — INTERACTIVE OWNERSHIP CALCULATOR */}
      <section className="w-full py-20 bg-white border-b border-neutral-200/80">
        <Container size="wide">
          <div className="max-w-6xl mx-auto">
            <OwnershipDecisionCalculator />
          </div>
        </Container>
      </section>

      {/* 03 — COMPARATIVE MATRIX */}
      <section className="w-full py-24 sm:py-32 bg-[#fafaf7] border-b border-neutral-200/80">
        <Container size="wide">
          <div className="max-w-6xl mx-auto space-y-16">
            <div className="space-y-4">
              <span className="editorial-tag-dark">
                DECISION FRAMEWORK // 4 ACCESS TIERS
              </span>
              <h2 className="text-3xl sm:text-5xl font-light text-neutral-900 font-sans">
                Access Models Evaluated
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {models.map((m, i) => (
                <div key={i} className="editorial-card-light p-8 rounded-3xl space-y-6 flex flex-col justify-between bg-white shadow-sm">
                  <div className="space-y-4">
                    <span className="text-[10px] font-mono text-amber-600 font-bold uppercase tracking-wider block">
                      {m.hours}
                    </span>
                    <h3 className="text-xl font-light text-neutral-900 font-sans">
                      {m.title}
                    </h3>
                    <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                      {m.summary}
                    </p>

                    <div className="pt-2 border-t border-neutral-200 text-xs text-neutral-500 font-sans">
                      <span className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">BEST SUITED FOR:</span>
                      {m.bestFor}
                    </div>
                  </div>

                  <Link href={m.link} className="pt-4 border-t border-neutral-200">
                    <Button variant="outline" size="sm" className="w-full text-center justify-center">
                      {m.cta}
                    </Button>
                  </Link>
                </div>
              ))}
            </div>

            {/* Contextual Ecosystem Integration: Asset Financing, Protection & Wealth */}
            <div className="p-8 rounded-3xl bg-white border border-neutral-200/90 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-1.5 max-w-2xl">
                <span className="text-[10px] font-mono text-amber-600 font-bold uppercase tracking-wider block">
                  CRISTIAN VĂDUVA BUSINESS ECOSYSTEM // CAPITAL & ASSET PROTECTION
                </span>
                <h4 className="text-xl font-light text-neutral-900 font-sans">
                  Comprehensive Wealth Structuring & Capital Advisory
                </h4>
                <p className="text-xs text-neutral-600 font-sans leading-relaxed">
                  Beyond aviation asset modeling, explore independent financing advisory through CV Finance, asset risk underwriting in partnership with Generali România, and prime real estate portfolio opportunities.
                </p>
              </div>

              <div className="flex flex-wrap gap-2.5">
                <a
                  href="https://credite.cristianvaduva.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-mono font-bold transition flex items-center gap-1"
                >
                  <span>CV Finance</span>
                  <span>↗</span>
                </a>
                <a
                  href="https://insurance.cristianvaduva.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-mono font-bold transition flex items-center gap-1"
                >
                  <span>Insurance Advisory</span>
                  <span>↗</span>
                </a>
                <Link
                  href="/ecosystem"
                  className="px-4 py-2 rounded-xl border border-neutral-300 hover:border-amber-500 text-neutral-800 text-xs font-mono font-bold transition"
                >
                  All Projects →
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 04 — CTA */}
      <section className="w-full py-24 sm:py-32 bg-neutral-950 text-white">
        <Container size="wide">
          <div className="max-w-6xl mx-auto rounded-3xl border border-amber-500/30 bg-gradient-to-b from-neutral-900 to-black p-10 sm:p-16 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest block">
                AVIATION ASSET ADVISORY
              </span>
              <h3 className="text-3xl sm:text-5xl font-light text-white font-sans">
                TALK WITH AN ASSET STRATEGIST
              </h3>
              <p className="text-sm text-neutral-300 font-sans">
                AIR provides unbiased operational audits comparing charter expenses against dry lease and Part-145 management.
              </p>
            </div>

            <Link href="/plan">
              <Button variant="primary" size="lg" className="whitespace-nowrap px-10 py-5 text-base shadow-2xl">
                REQUEST AUDIT →
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
