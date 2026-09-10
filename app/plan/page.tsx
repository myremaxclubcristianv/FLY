import React from "react";
import { Container } from "../../components/layout/Container";
import { DataStatusBadge } from "../../components/shared/DataStatusBadge";
import { PlannerSteps } from "../../components/plan/PlannerSteps";
import { AviationImage } from "../../components/AviationImage";
import { EDITORIAL_ATMOSPHERE } from "../../data/real/aviation-photos";

export default function PlanPage() {
  return (
    <div className="w-full flex-1 flex flex-col bg-[var(--color-bg-primary)]">
      {/* Top Aerospace Context Hero Ribbon */}
      <section className="relative w-full h-64 sm:h-80 overflow-hidden bg-neutral-950 border-b border-white/[0.08]">
        <AviationImage
          src={EDITORIAL_ATMOSPHERE.flightDeckCruising}
          alt="Flight Deck Avionics & Runway Approach"
          fill
          priority
          className="object-cover opacity-45 filter brightness-90 contrast-110"
          fallbackTitle="Flight Deck Operations"
          fallbackCode="DISPATCH // CONSOLE"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-neutral-950/30" />
        <Container size="default" className="relative z-10 h-full flex flex-col justify-end pb-8">
          <div className="flex flex-col gap-2 text-white">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded border border-amber-500/20">
                AIR FLIGHT PLANNER & DECISION ENGINE
              </span>
              <DataStatusBadge status="INDICATIVE" />
            </div>
            <h1 className="text-3xl sm:text-5xl font-light tracking-tight font-sans">
              TELL US WHERE YOU&apos;RE GOING<span className="text-amber-400">.</span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-300 font-light max-w-2xl leading-relaxed">
              We calculate aircraft range, airfield runway requirements, and matched vehicle profiles across 23 verified fleet models.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Interactive Planner Console */}
      <section className="w-full py-10 md:py-16">
        <Container size="default">
          <div className="flex flex-col gap-10 max-w-4xl mx-auto">
            {/* Planner Multi-Step Interface */}
            <PlannerSteps />
          </div>
        </Container>
      </section>
    </div>
  );
}
