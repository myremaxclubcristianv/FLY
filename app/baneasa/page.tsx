import React from "react";
import Link from "next/link";
import { Container } from "../../components/layout/Container";
import { ProvenanceBadge } from "../../components/shared/ProvenanceBadge";
import { Button } from "../../components/ui/Button";
import { UnifiedAviationRepository } from "../../lib/repositories/unified-aviation-repo";
import { JsonLd, createAirportJsonLd } from "../../components/shared/JsonLd";
import { AviationImage } from "../../components/AviationImage";

export const metadata = {
  title: "Băneasa (LRBS / BBU) — Bucharest Executive Aviation Hub | AIR",
  description:
    "Bucharest-Băneasa Aurel Vlaicu International Airport (LRBS / BBU). Dedicated business jet charter, executive FBO handling, VIP terminal, and twin-engine helicopter gateway.",
};

export default async function BaneasaPage() {
  const baneasa = await UnifiedAviationRepository.getBaneasaAirport();
  const allRoutes = await UnifiedAviationRepository.getRoutes();
  const baneasaRoutes = allRoutes.filter((r) => r.originIcao === "LRBS");

  const jsonLdData = createAirportJsonLd({
    name: baneasa.name,
    icao: "LRBS",
    iata: "BBU",
    city: "Bucharest",
    country: "Romania",
    description: "Premier executive aviation and business jet airport for Bucharest.",
  });

  return (
    <>
      <JsonLd data={jsonLdData} />
      <div className="w-full bg-white text-neutral-900 font-sans flex-1 flex flex-col">
        {/* 01 — EDITORIAL HEADER (Pure White Luxury Dossier) */}
        <section className="w-full py-24 sm:py-32 border-b border-neutral-200/80 bg-white">
          <Container size="wide">
            <div className="flex flex-col gap-8 max-w-6xl mx-auto">
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
                <Link href="/" className="hover:text-amber-600 transition">HOME</Link>
                <span>/</span>
                <span className="text-neutral-900 font-bold">BUCHAREST BĂNEASA (LRBS / BBU)</span>
              </div>

              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-200 pb-8">
                <div className="space-y-4 max-w-3xl">
                  <div className="flex items-center gap-3">
                    <span className="editorial-tag-dark">
                      EXECUTIVE GATEWAY DOSSIER // LRBS / BBU
                    </span>
                    <ProvenanceBadge status="OFFICIAL_SOURCE" sourceName="CNAB AIP Romania" sourceUrl="https://www.cnab.ro" showSource />
                  </div>
                  <h1 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-neutral-900 leading-[1.05] font-sans">
                    BUCHAREST BĂNEASA<span className="text-amber-600">.</span>
                  </h1>
                  <p className="text-lg sm:text-xl text-neutral-600 font-light leading-relaxed">
                    Bucharest-Băneasa Aurel Vlaicu International Airport (LRBS / BBU) serves as Romania&apos;s premier dedicated business aviation gateway and executive VIP terminal.
                  </p>
                </div>

                <Link href="/plan">
                  <Button variant="primary" size="lg" className="whitespace-nowrap px-8 shadow-xl">
                    DISPATCH FROM LRBS →
                  </Button>
                </Link>
              </div>

              {/* Massive Architectural Runway / Apron Feature */}
              <div className="relative h-[420px] sm:h-[600px] w-full rounded-3xl overflow-hidden shadow-2xl border border-neutral-200 bg-neutral-900 group">
                <AviationImage
                  src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=2000&q=85"
                  alt="Executive Business Jet on Băneasa LRBS Ramp"
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-1000"
                  fallbackTitle="Băneasa Executive Ramp"
                  fallbackCode="AIRPORT // LRBS"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-8 left-8 right-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 text-white z-10 font-mono text-xs">
                  <div>
                    <span className="text-[10px] text-amber-400 font-bold uppercase block tracking-wider">
                      AUREL VLAICU INTERNATIONAL
                    </span>
                    <span className="text-white text-lg sm:text-xl font-light font-sans">
                      Băneasa Dedicated Executive Aviation Apron
                    </span>
                  </div>
                  <span className="bg-black/70 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-neutral-300">
                    COORDINATES: 44°30&apos;N 26°06&apos;E • ELEVATION 305 FT
                  </span>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* 02 — TECHNICAL INFRASTRUCTURE TELEMETRY */}
        <section className="w-full py-16 bg-[#fafaf7] border-b border-neutral-200/80">
          <Container size="wide">
            <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm space-y-1">
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block font-bold">
                  ICAO / IATA IDENTIFIERS
                </span>
                <span className="text-3xl sm:text-4xl font-light text-neutral-900 font-sans block">
                  LRBS / BBU
                </span>
                <span className="text-xs font-mono text-neutral-400">BUCHAREST BĂNEASA</span>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm space-y-1">
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block font-bold">
                  RUNWAY 07/25 METRICS
                </span>
                <span className="text-3xl sm:text-4xl font-light text-amber-600 font-sans block">
                  2,358 × 45 M
                </span>
                <span className="text-xs font-mono text-neutral-400">ASPHALT (PCN 51/F/C/W/T)</span>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm space-y-1">
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block font-bold">
                  BOARDING SPEED
                </span>
                <span className="text-3xl sm:text-4xl font-light text-neutral-900 font-sans block">
                  20 MIN
                </span>
                <span className="text-xs font-mono text-neutral-400">VIP FAST-TRACK</span>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm space-y-1">
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block font-bold">
                  CITY PROXIMITY
                </span>
                <span className="text-xl sm:text-2xl font-light text-neutral-900 font-sans block truncate">
                  8.5 KM
                </span>
                <span className="text-xs font-mono text-neutral-400">TO NORTH BUSINESS DISTRICT</span>
              </div>
            </div>
          </Container>
        </section>

        {/* 03 — OPERATIONAL ADVANTAGES (Editorial Layout) */}
        <section className="w-full py-24 sm:py-32 bg-white border-b border-neutral-200/80">
          <Container size="wide">
            <div className="max-w-6xl mx-auto space-y-16">
              <div className="space-y-4">
                <span className="editorial-tag-dark">
                  WHY BĂNEASA IS THE PREFERRED EXECUTIVE CHOICE
                </span>
                <h2 className="text-3xl sm:text-5xl font-light text-neutral-900 font-sans">
                  The Băneasa Executive Advantage
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="editorial-card-light p-8 rounded-3xl space-y-4 bg-white">
                  <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 font-mono font-bold text-sm">
                    01
                  </div>
                  <h3 className="text-2xl font-light text-neutral-900 font-sans">
                    Dedicated FBO VIP Lounges
                  </h3>
                  <p className="text-sm text-neutral-600 font-sans leading-relaxed">
                    Private customs and border control directly inside the executive terminal. Arrive 20 minutes prior to departure with zero commercial passenger interaction.
                  </p>
                </div>

                <div className="editorial-card-light p-8 rounded-3xl space-y-4 bg-white">
                  <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 font-mono font-bold text-sm">
                    02
                  </div>
                  <h3 className="text-2xl font-light text-neutral-900 font-sans">
                    Direct Apron Vehicle Access
                  </h3>
                  <p className="text-sm text-neutral-600 font-sans leading-relaxed">
                    Chauffeured vehicles drive directly to the aircraft steps on the ramp, ensuring maximum privacy, security, and discreet luggage handling.
                  </p>
                </div>

                <div className="editorial-card-light p-8 rounded-3xl space-y-4 bg-white">
                  <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 font-mono font-bold text-sm">
                    03
                  </div>
                  <h3 className="text-2xl font-light text-neutral-900 font-sans">
                    Intermodal Helicopter Base
                  </h3>
                  <p className="text-sm text-neutral-600 font-sans leading-relaxed">
                    Direct transition from incoming fixed-wing private jets to twin-turbine helicopters for flights across Romania, Transylvania, and the Black Sea.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* 04 — DIRECT LRBS ROUTE NETWORK */}
        <section className="w-full py-24 sm:py-32 bg-[#fafaf7] border-b border-neutral-200/80">
          <Container size="wide">
            <div className="max-w-6xl mx-auto space-y-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-200 pb-8">
                <div className="space-y-4">
                  <span className="editorial-tag-dark">
                    POPULAR CITY PAIRS FROM BĂNEASA
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-light text-neutral-900 font-sans">
                    Connected European Routes
                  </h2>
                </div>
                <Link href="/plan">
                  <Button variant="outline" size="md" className="border-neutral-300 text-neutral-900 hover:bg-neutral-100">
                    CUSTOM ITINERARY CALCULATOR →
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {baneasaRoutes.slice(0, 6).map((route) => (
                  <div key={route.id} className="editorial-card-light p-6 rounded-2xl space-y-3 bg-white">
                    <div className="flex justify-between items-center text-xs font-mono text-neutral-500">
                      <span>LRBS ORIGIN</span>
                      <span className="text-amber-600 font-bold">{route.destinationIcao} ({route.destinationIata})</span>
                    </div>
                    <h4 className="text-xl font-light text-neutral-900 font-sans">
                      {route.destinationCity}
                    </h4>
                    <p className="text-xs font-mono text-neutral-500">
                      {route.distanceNm} NM • DIRECT EXECUTIVE ROUTE
                    </p>
                    <Link
                      href={`/plan?origin=LRBS&destination=${route.destinationIcao}`}
                      className="text-xs font-mono text-amber-600 font-bold hover:underline block pt-2 border-t border-neutral-100"
                    >
                      PLAN THIS ROUTE →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* 05 — MISSION PLANNER CTA */}
        <section className="w-full py-24 sm:py-32 bg-neutral-950 text-white">
          <Container size="wide">
            <div className="max-w-6xl mx-auto rounded-3xl border border-amber-500/30 bg-gradient-to-b from-neutral-900 to-black p-10 sm:p-16 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-8">
              <div className="space-y-3 max-w-2xl">
                <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest block">
                  BUCHAREST BĂNEASA DISPATCH
                </span>
                <h3 className="text-3xl sm:text-5xl font-light text-white font-sans">
                  PLAN YOUR DEPARTURE FROM LRBS
                </h3>
                <p className="text-sm text-neutral-300 font-sans">
                  Calculate flight times, aircraft range envelopes, and instant quotes departing Bucharest Băneasa.
                </p>
              </div>

              <Link href="/plan">
                <Button variant="primary" size="lg" className="whitespace-nowrap px-10 py-5 text-base shadow-2xl">
                  START MISSION DISPATCH →
                </Button>
              </Link>
            </div>
          </Container>
        </section>
      </div>
    </>
  );
}
