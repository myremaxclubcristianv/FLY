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
    <section className="relative w-full min-h-[92vh] bg-neutral-950 pt-6 pb-20 border-b border-white/[0.08] overflow-hidden flex flex-col justify-center aerospace-grid-bg">
      {/* Atmospheric Background Layer with Cinematic Depth */}
      <div className="absolute inset-0 z-0">
        <AviationImage
          src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=2000&q=85"
          alt="Executive Jet Airborne Above Clouds"
          fill
          priority
          className="object-cover opacity-40 filter brightness-90 contrast-110"
          fallbackTitle="AIR Fleet Airborne"
          fallbackCode="HERO // AIRBORNE"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-neutral-950/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/80 via-transparent to-neutral-950/80 pointer-events-none" />
      </div>

      {/* Aerospace Telemetry Top Ribbon */}
      <div className="relative z-10 w-full border-b border-white/[0.08] bg-black/40 backdrop-blur-xl py-2.5 mb-8">
        <Container size="wide">
          <div className="flex flex-wrap items-center justify-between gap-4 text-[10px] font-mono text-neutral-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-amber-400 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                BUCHAREST / LRBS
              </span>
              <span className="hidden sm:inline text-neutral-600">|</span>
              <span className="hidden sm:inline">POSITION: 44°30&apos;N 26°06&apos;E</span>
              <span className="hidden md:inline text-neutral-600">|</span>
              <span className="hidden md:inline text-neutral-300">DISPATCH: ACTIVE</span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-amber-300/90 font-mono">CRZ 460 KT • FL410 • POINT-TO-POINT</span>
              <DataStatusBadge status="VERIFIED" showDot={false} />
            </div>
          </div>
        </Container>
      </div>

      <Container size="wide" className="relative z-10">
        <div className="flex flex-col gap-10 max-w-5xl mx-auto">
          {/* Top Tag & Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-mono text-amber-400 tracking-widest uppercase border border-amber-500/30 px-3 py-1 bg-amber-500/10 rounded backdrop-blur-md">
              THE DIGITAL WORLD OF AVIATION
            </span>
            <span className="text-xs font-mono text-neutral-300 border border-white/[0.1] px-3 py-1 bg-white/[0.04] rounded backdrop-blur-md">
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

          {/* Action Triggers */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button size="lg" variant="primary" asChild>
              <Link href={PRIMARY_CTA.href}>
                {PRIMARY_CTA.label} →
              </Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/destinations">
                EXPLORE DESTINATIONS ↗
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/aircraft">
                AIRCRAFT FLEET SPECS
              </Link>
            </Button>
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

