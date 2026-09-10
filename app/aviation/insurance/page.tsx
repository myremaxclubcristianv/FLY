import React from "react";
import Link from "next/link";
import { Container } from "../../../components/layout/Container";
import { DataStatusBadge } from "../../../components/shared/DataStatusBadge";
import { Button } from "../../../components/ui/Button";
import { AviationImage } from "../../../components/AviationImage";

export const metadata = {
  title: "Aviation Insurance & Risk Coverage | AIR",
  description:
    "Decision support on aircraft hull risk insurance, third-party liability, passenger cover, and operator insurance compliance.",
};

export default function AviationInsurancePage() {
  const topics = [
    {
      title: "HULL & ALL-RISK UNDERWRITING",
      desc: "Physical damage coverage for aircraft airframe, engines, and avionics during ground, taxi, and flight operations.",
      highlight: "AIRFRAME & ENGINES",
    },
    {
      title: "THIRD-PARTY STATUTORY LIABILITY",
      desc: "Mandatory statutory coverage protecting against third-party property damage and bodily injury claims.",
      highlight: "MINIMUM $50M–$500M",
    },
    {
      title: "PASSENGER & CREW RISK PROTECTION",
      desc: "Medical expense, baggage liability, and personal accident protection for charter passengers and flight crew.",
      highlight: "PASSENGER SAFETY",
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
                    AVIATION ECOSYSTEM // RISK & UNDERWRITING
                  </span>
                  <DataStatusBadge status="INDICATIVE" />
                </div>
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-neutral-900 leading-[1.05] font-sans">
                  AIRCRAFT RISK & INSURANCE<span className="text-amber-600">.</span>
                </h1>
                <p className="text-lg sm:text-xl text-neutral-600 font-light leading-relaxed">
                  AIR outlines insurance requirements and risk management standards across commercial air charter and private aircraft ownership under EASA and FAA frameworks.
                </p>
              </div>

              <Link href="/plan">
                <Button variant="primary" size="lg" className="whitespace-nowrap px-8 shadow-xl">
                  REQUEST FLIGHT VERIFICATION →
                </Button>
              </Link>
            </div>

            {/* Visual Feature: Aircraft Hull & Risk Verification */}
            <div className="relative h-[380px] sm:h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl border border-neutral-200 bg-neutral-900 group">
              <AviationImage
                src="https://images.unsplash.com/photo-1474302770737-173ee21bab63?auto=format&fit=crop&w=1600&q=85"
                alt="Aircraft Hull & Airframe Risk Verification"
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-1000"
                fallbackTitle="Aircraft Hull Risk"
                fallbackCode="INSURANCE // HULL"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />
              <div className="absolute bottom-8 left-8 right-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 text-white z-10 font-mono text-xs">
                <div>
                  <span className="text-[10px] text-amber-400 font-bold uppercase block tracking-wider">
                    PART-CAT STATUTORY RISK COMPLIANCE
                  </span>
                  <span className="text-white text-lg sm:text-xl font-light font-sans">
                    Hull, War, and Third-Party Risk Verification
                  </span>
                </div>
                <span className="bg-black/70 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-neutral-300">
                  MANDATORY AOC OPERATOR AUDIT
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 02 — RISK COVERAGE CATEGORIES */}
      <section className="w-full py-24 sm:py-32 bg-[#fafaf7] border-b border-neutral-200/80">
        <Container size="wide">
          <div className="max-w-6xl mx-auto space-y-16">
            <div className="space-y-4">
              <span className="editorial-tag-dark">
                STATUTORY RISK CATEGORIES
              </span>
              <h2 className="text-3xl sm:text-5xl font-light text-neutral-900 font-sans">
                Aviation Risk Underwriting Standards
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
              AIR is an aviation access platform and does not act as a licensed insurance broker or insurer. Information is provided strictly for educational and decision-support purposes.
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
                AVIATION SAFETY & COMPLIANCE
              </span>
              <h3 className="text-3xl sm:text-5xl font-light text-white font-sans">
                FLY WITH VERIFIED OPERATORS
              </h3>
              <p className="text-sm text-neutral-300 font-sans">
                Every flight organized through AIR is fulfilled by certified AOC operators carrying verified international liability insurance.
              </p>
            </div>

            <Link href="/plan">
              <Button variant="primary" size="lg" className="whitespace-nowrap px-10 py-5 text-base shadow-2xl">
                PLAN VERIFIED FLIGHT →
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
