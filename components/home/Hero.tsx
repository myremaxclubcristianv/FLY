"use client";

import React from "react";
import Link from "next/link";
import { Container } from "../layout/Container";
import { Button } from "../ui/Button";
import { FlightSearchForm } from "./FlightSearchForm";
import { DataStatusBadge } from "../shared/DataStatusBadge";
import { AviationImage } from "../AviationImage";
import { PRIMARY_CTA } from "../../constants/navigation";

export function Hero() {
  return (
    <section className="relative w-full min-h-[90vh] bg-neutral-950 pt-8 pb-20 border-b border-neutral-800 overflow-hidden flex flex-col justify-center">
      {/* Background Visual Aviation Panel */}
      <div className="absolute inset-0 z-0">
        <AviationImage
          src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=2000&q=85"
          alt="Executive Jet Airborne Above Clouds"
          fill
          priority
          className="object-cover opacity-35 filter brightness-90 contrast-110"
          fallbackTitle="AIR Fleet Airborne"
          fallbackCode="HERO // AIRBORNE"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-neutral-950/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent opacity-60" />
      </div>

      {/* Aerospace Telemetry Top Ribbon */}
      <div className="relative z-10 w-full border-b border-white/10 bg-black/40 backdrop-blur-md py-2.5 mb-8">
        <Container size="wide">
          <div className="flex flex-wrap items-center justify-between gap-4 text-[10px] font-mono text-neutral-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-amber-400 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                BUCHAREST / LRBS
              </span>
              <span className="hidden sm:inline text-neutral-600">|</span>
              <span className="hidden sm:inline">POSITION: 47°27&apos;N 26°06&apos;E</span>
              <span className="hidden md:inline text-neutral-600">|</span>
              <span className="hidden md:inline text-neutral-300">DISPATCH: ACTIVE</span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-amber-300/80">ILLUSTRATIVE TELEMETRY: ALT 41,000 FT • CRZ 460 KT</span>
              <DataStatusBadge status="VERIFIED" showDot={false} />
            </div>
          </div>
        </Container>
      </div>

      <Container size="wide" className="relative z-10">
        <div className="flex flex-col gap-10 max-w-5xl mx-auto">
          {/* Top Tag & Status */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-mono text-amber-400 tracking-widest uppercase border border-amber-500/30 px-3 py-1 bg-amber-500/10 rounded-sm">
              THE DIGITAL WORLD OF AVIATION
            </span>
            <span className="text-xs font-mono text-neutral-400 border border-neutral-800 px-3 py-1 bg-neutral-900/60 rounded-sm">
              EASA & ICAO PROVENANCE
            </span>
          </div>

          {/* Main Hero Headlines */}
          <div className="flex flex-col gap-4">
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tight text-white leading-[0.9] font-sans">
              GO BY AIR<span className="text-amber-400">.</span>
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-neutral-300 font-light leading-relaxed max-w-3xl font-sans">
              Tell us where you&apos;re going.<br className="hidden sm:inline" />
              We&apos;ll find the right way to fly.
            </p>
          </div>

          {/* Secondary Statement & Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link href={PRIMARY_CTA.href}>
              <Button size="lg" variant="primary" className="bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold font-mono">
                {PRIMARY_CTA.label} →
              </Button>
            </Link>
            <Link href="/destinations">
              <Button size="lg" variant="outline" className="border-neutral-700 hover:border-amber-400 font-mono text-xs">
                EXPLORE DESTINATIONS ↗
              </Button>
            </Link>
            <Link href="/aircraft">
              <Button size="lg" variant="outline" className="border-neutral-800 hover:border-neutral-600 font-mono text-xs text-neutral-400">
                AIRCRAFT FLEET SPECS
              </Button>
            </Link>
          </div>

          {/* Hero Flight Search Component Integration */}
          <div className="pt-4">
            <FlightSearchForm />
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Hero;
