import React from "react";
import Link from "next/link";
import { Container } from "../layout/Container";
import { Button } from "../ui/Button";
import { DataStatusBadge } from "../shared/DataStatusBadge";
import { PRIMARY_CTA } from "../../constants/navigation";

export function Hero() {
  return (
    <section className="relative w-full min-h-[92vh] sm:min-h-[95vh] bg-neutral-950 pt-4 pb-24 border-b border-white/[0.08] overflow-hidden flex flex-col justify-between aerospace-grid-bg">
      {/* Atmospheric Background Layer with Cinematic Depth */}
      <div className="absolute inset-0 z-0">
        <picture className="absolute inset-0 w-full h-full pointer-events-none">
          <source
            media="(max-width: 768px)"
            type="image/avif"
            srcSet="/images/hero/hero-jet-mobile.avif"
            width={480}
            height={312}
          />
          <source
            media="(max-width: 768px)"
            type="image/webp"
            srcSet="/images/hero/hero-jet-mobile.webp"
            width={480}
            height={312}
          />
          <source
            media="(min-width: 769px)"
            type="image/avif"
            srcSet="/images/hero/hero-jet-desktop.avif"
            width={1280}
            height={779}
          />
          <source
            media="(min-width: 769px)"
            type="image/webp"
            srcSet="/images/hero/hero-jet-desktop.webp"
            width={1280}
            height={779}
          />
          <img
            src="/images/hero/hero-jet-mobile.avif"
            alt="Executive Jet on Runway Tarmac"
            fetchPriority="high"
            loading="eager"
            decoding="async"
            width={480}
            height={312}
            className="w-full h-full object-cover opacity-35 filter brightness-95 contrast-110"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-neutral-950/20" />
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
              <span className="hidden md:inline text-neutral-300">EXECUTIVE CONCIERGE</span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-amber-300/90 font-mono">CRZ 460 KT • FL410 • POINT-TO-POINT</span>
              <DataStatusBadge status="INDICATIVE" showDot={true} />
            </div>
          </div>
        </Container>
      </div>

      {/* Main Hero Viewport Centerpiece */}
      <Container size="wide" className="relative z-10 my-auto py-12">
        <div className="flex flex-col gap-10 max-w-5xl">
          {/* Top Tag & Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-mono text-amber-400 tracking-widest uppercase border border-amber-500/30 px-3.5 py-1.5 bg-amber-500/10 rounded backdrop-blur-md font-bold">
              AIR BY CRISTIAN VĂDUVA
            </span>
            <span className="text-xs font-mono text-neutral-300 border border-white/[0.1] px-3.5 py-1.5 bg-white/[0.04] rounded backdrop-blur-md">
              EXECUTIVE AVIATION ACCESS & INTELLIGENCE
            </span>
          </div>

          {/* Main Hero Headlines */}
          <div className="flex flex-col gap-4">
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tight text-white leading-[0.9] font-sans">
              THE EASIEST WAY TO FLY<span className="text-amber-400">.</span>
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-neutral-300 font-light leading-relaxed max-w-3xl font-sans">
              Tell us where you&apos;re going.<br className="hidden sm:inline" />
              We&apos;ll find the right way to fly.
            </p>
          </div>

          {/* Action Triggers */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button size="lg" variant="primary" asChild className="px-10 shadow-2xl text-base">
              <Link href={PRIMARY_CTA.href} prefetch={false}>
                PLAN A FLIGHT →
              </Link>
            </Button>
            <Button size="lg" variant="secondary" asChild className="px-8 text-base">
              <Link href="/aircraft" prefetch={false}>
                EXPLORE AIRCRAFT
              </Link>
            </Button>
          </div>
        </div>
      </Container>

      {/* Bottom Telemetry Bar */}
      <div className="relative z-10 w-full pt-4">
        <Container size="wide">
          <div className="flex flex-wrap items-center justify-between gap-4 text-[10px] font-mono text-neutral-500 border-t border-white/[0.06] pt-3">
            <span>FLIGHT READY // ALL EUROPEAN CITY PAIRS</span>
            <span>LRBS • LFPB • LFMN • LGMK • LSGG • OMDW • EGLF</span>
          </div>
        </Container>
      </div>
    </section>
  );
}

export default Hero;

