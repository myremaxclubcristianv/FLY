import React from "react";
import Link from "next/link";
import { Container } from "../../../components/layout/Container";
import { DataStatusBadge } from "../../../components/shared/DataStatusBadge";
import { Button } from "../../../components/ui/Button";
import { AviationImage } from "../../../components/AviationImage";

export const metadata = {
  title: "Aviation Finance & Asset Leasing | AIR",
  description:
    "Decision support guidelines on asset-backed aircraft financing, operating leases, capital loans, and ownership structuring.",
};

export default function AviationFinancePage() {
  const topics = [
    {
      title: "ASSET-BASED DEBT FINANCING",
      desc: "Non-recourse and recourse aircraft debt facilities structured against appraised residual airframe and engine values.",
      highlight: "OPTIMIZED CAPITAL DEPLOYMENT",
    },
    {
      title: "OPERATING & DRY LEASES",
      desc: "Off-balance-sheet aircraft leasing providing predictable monthly flight economics without long-term asset risk.",
      highlight: "FIXED MONTHLY COSTS",
    },
    {
      title: "TAX & JURISDICTIONAL STRUCTURING",
      desc: "Corporate ownership frameworks designed for multi-jurisdictional European VAT, registration, and depreciation schedules.",
      highlight: "REGULATORY COMPLIANCE",
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
                    AVIATION ECOSYSTEM // CAPITAL & LEASING
                  </span>
                  <DataStatusBadge status="INDICATIVE" />
                </div>
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-neutral-900 leading-[1.05] font-sans">
                  AIRCRAFT CAPITAL & FINANCE<span className="text-amber-600">.</span>
                </h1>
                <p className="text-lg sm:text-xl text-neutral-600 font-light leading-relaxed">
                  AIR provides decision-support frameworks for evaluating aircraft debt structures, operating leases, engine reserve programs, and capital asset acquisition.
                </p>
              </div>

              <Link href="/plan">
                <Button variant="primary" size="lg" className="whitespace-nowrap px-8 shadow-xl">
                  REQUEST CONSULTATION →
                </Button>
              </Link>
            </div>

            {/* Visual Feature: Corporate Aircraft Asset Financing */}
            <div className="relative h-[380px] sm:h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl border border-neutral-200 bg-neutral-900 group">
              <AviationImage
                src="https://images.unsplash.com/photo-1520437358207-323b43b50729?auto=format&fit=crop&w=1600&q=85"
                alt="Corporate Aircraft Asset Evaluation"
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-1000"
                fallbackTitle="Aircraft Capital Asset"
                fallbackCode="FINANCE // ASSET"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />
              <div className="absolute bottom-8 left-8 right-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 text-white z-10 font-mono text-xs">
                <div>
                  <span className="text-[10px] text-amber-400 font-bold uppercase block tracking-wider">
                    AIRCRAFT ASSET APPRAISAL & RESIDUAL VALUE
                  </span>
                  <span className="text-white text-lg sm:text-xl font-light font-sans">
                    Structured Capital Frameworks for Flight Assets
                  </span>
                </div>
                <span className="bg-black/70 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-neutral-300">
                  DECISION SUPPORT & ADVISORY
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 02 — FINANCIAL STRUCTURES */}
      <section className="w-full py-24 sm:py-32 bg-[#fafaf7] border-b border-neutral-200/80">
        <Container size="wide">
          <div className="max-w-6xl mx-auto space-y-16">
            <div className="space-y-4">
              <span className="editorial-tag-dark">
                CAPITAL FRAMEWORKS
              </span>
              <h2 className="text-3xl sm:text-5xl font-light text-neutral-900 font-sans">
                Structuring Private Aviation Assets
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {topics.map((t) => (
                <div key={t.title} className="editorial-card-light p-8 rounded-3xl space-y-4 flex flex-col justify-between bg-white">
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono text-amber-600 font-bold tracking-wider uppercase block">
                      {t.highlight}
                    </span>
                    <h3 className="text-2xl font-light text-neutral-900 font-sans">
                      {t.title}
                    </h3>
                    <p className="text-sm text-neutral-600 font-sans leading-relaxed">
                      {t.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-8 rounded-3xl bg-neutral-100 border border-neutral-200 text-xs text-neutral-600 leading-relaxed font-sans">
              <strong className="text-neutral-900 font-mono block mb-1">DISCLOSURE & ADVISORY NOTICE:</strong>
              AIR is an aviation access and decision intelligence platform. Content is provided strictly for educational and decision-support purposes. Consult certified aviation tax and legal counsel prior to executing airframe acquisitions.
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
                AVIATION CAPITAL ADVISORY
              </span>
              <h3 className="text-3xl sm:text-5xl font-light text-white font-sans">
                DISCUSS YOUR ASSET STRATEGY
              </h3>
              <p className="text-sm text-neutral-300 font-sans">
                Connect with aviation asset specialists to model your flight hours against lease and acquisition economics.
              </p>
            </div>

            <Link href="/plan">
              <Button variant="primary" size="lg" className="whitespace-nowrap px-10 py-5 text-base shadow-2xl">
                START ASSET REVIEW →
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
