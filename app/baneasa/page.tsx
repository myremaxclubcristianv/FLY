import React from "react";
import Link from "next/link";
import { Container } from "../../components/layout/Container";
import { SectionHeader } from "../../components/shared/SectionHeader";
import { ProvenanceBadge } from "../../components/shared/ProvenanceBadge";
import { Card } from "../../components/ui/Card";
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
      <div className="w-full py-16 bg-[var(--color-bg-primary)] flex-1 flex flex-col gap-12">
        <Container size="wide">
          <div className="flex flex-col gap-10">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs font-data text-[var(--color-text-muted)]">
              <Link href="/" className="hover:text-[var(--color-text-primary)]">HOME</Link>
              <span>/</span>
              <span className="text-[var(--color-text-primary)]">BĂNEASA EXECUTIVE GATEWAY (LRBS / BBU)</span>
            </div>

            {/* Header */}
            <div className="flex flex-col gap-4 border-b border-white/10 pb-8">
              <div className="flex items-center gap-3">
                <span className="text-xs font-data text-amber-400 uppercase tracking-widest bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20 font-semibold">
                  BUCHAREST EXECUTIVE GATEWAY // LRBS / BBU
                </span>
                <ProvenanceBadge status="OFFICIAL_SOURCE" sourceName="CNAB AIP Romania" sourceUrl="https://www.cnab.ro" showSource />
              </div>

              <SectionHeader
                title="BUCHAREST BĂNEASA (LRBS / BBU)."
                description="Bucharest-Băneasa Aurel Vlaicu International Airport (LRBS / BBU) serves as Romania's premier dedicated business aviation gateway and general flight hub."
                titleAs="h1"
              />
            </div>

            {/* Editorial Visual Showcase */}
            <div className="relative h-[380px] sm:h-[480px] w-full rounded-3xl overflow-hidden border border-white/10 bg-neutral-900 shadow-2xl">
              <AviationImage
                src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1600&q=85"
                alt="Executive Business Jet on Băneasa LRBS Ramp"
                fill
                priority
                className="object-cover"
                fallbackTitle="Băneasa Executive Ramp"
                fallbackCode="AIRPORT // LRBS"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 font-data text-xs text-neutral-300 z-10">
                <div>
                  <span className="text-[10px] text-amber-400 font-bold uppercase block tracking-wider">AUREL VLAICU INTERNATIONAL</span>
                  <span className="text-white text-lg font-light">Băneasa Dedicated Business Aviation Ramp</span>
                </div>
                <span className="bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-[11px] text-amber-400">
                  COORDINATES: 44°30&apos;N 26°06&apos;E • ELEV 305 FT
                </span>
              </div>
            </div>

            {/* Technical Infrastructure Specs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card variant="instrument" className="p-5 flex flex-col gap-1 rounded-2xl">
                <span className="text-[10px] font-data text-amber-400 uppercase tracking-wider">ICAO / IATA CODES</span>
                <span className="text-2xl font-light text-white font-data">LRBS / BBU</span>
              </Card>

              <Card variant="instrument" className="p-5 flex flex-col gap-1 rounded-2xl">
                <span className="text-[10px] font-data text-amber-400 uppercase tracking-wider">RUNWAY 07/25 SPECS</span>
                <span className="text-xl font-light text-white font-data">2,358m × 45m</span>
              </Card>

              <Card variant="instrument" className="p-5 flex flex-col gap-1 rounded-2xl">
                <span className="text-[10px] font-data text-amber-400 uppercase tracking-wider">SURFACE & PCN</span>
                <span className="text-xs font-light text-white font-data">Asphalt (PCN 51/F/C/W/T)</span>
              </Card>

              <Card variant="instrument" className="p-5 flex flex-col gap-1 rounded-2xl">
                <span className="text-[10px] font-data text-amber-400 uppercase tracking-wider">AIRPORT AUTHORITY</span>
                <span className="text-xs font-light text-white font-data">CNAB (State Airport Co.)</span>
              </Card>
            </div>

            {/* Operational Capabilities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card variant="surface" className="p-8 flex flex-col gap-5 rounded-2xl">
                <h2 className="text-sm font-data text-amber-400 uppercase tracking-wider border-b border-white/10 pb-3 font-semibold">
                  EXECUTIVE & BUSINESS AVIATION ADVANTAGES
                </h2>
                <ul className="flex flex-col gap-3 text-xs text-[var(--color-text-secondary)] font-sans">
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber-400 font-data text-sm leading-none">•</span>
                    <span><strong className="text-white">Zero Commercial Airline Congestion:</strong> Exclusively handles executive jets, twin-engine helicopters, and general aviation.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber-400 font-data text-sm leading-none">•</span>
                    <span><strong className="text-white">10-Minute CBD Access:</strong> Located just 7 km from Bucharest central business district and northern commercial towers.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-amber-400 font-data text-sm leading-none">•</span>
                    <span><strong className="text-white">Fast-Track Handling:</strong> Passengers arrive 15-20 minutes before departure directly to the private FBO lounge.</span>
                  </li>
                </ul>
              </Card>

              <Card variant="surface" className="p-8 flex flex-col gap-5 rounded-2xl">
                <h2 className="text-sm font-data text-amber-400 uppercase tracking-wider border-b border-white/10 pb-3 font-semibold">
                  AUTHORIZED GROUND HANDLERS AT BĂNEASA
                </h2>
                <div className="flex flex-col gap-3 text-xs text-[var(--color-text-secondary)] font-sans">
                  {baneasa.handlingProviders?.map((handler, i) => (
                    <div key={i} className="flex items-center justify-between border-b border-white/5 pb-2">
                      <span className="text-white font-medium">{handler}</span>
                      <span className="text-[10px] font-data text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">VERIFIED HANDLER</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Băneasa Infrastructure Visual Panels */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass-surface rounded-2xl overflow-hidden flex flex-col justify-between border border-white/10">
                <div className="relative h-64 w-full bg-neutral-900 overflow-hidden">
                  <AviationImage
                    src="https://images.unsplash.com/photo-1520437358207-323b43b50729?auto=format&fit=crop&w=1200&q=80"
                    alt="Băneasa Private Jet FBO Ramp"
                    fill
                    className="object-cover"
                    fallbackTitle="Băneasa FBO Ramp"
                    fallbackCode="FBO // HANDLING"
                  />
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] font-data text-amber-400 font-semibold z-10">
                    VIP FBO & PASSENGER HANDLING
                  </div>
                </div>
                <div className="p-6 space-y-2 font-sans text-xs text-[var(--color-text-secondary)]">
                  <h3 className="text-lg font-light text-white">Private Terminal Protocols</h3>
                  <p>Dedicated customs, discreet ramp vehicle drop-off, and executive conference suites.</p>
                </div>
              </div>

              <div className="glass-surface rounded-2xl overflow-hidden flex flex-col justify-between border border-white/10">
                <div className="relative h-64 w-full bg-neutral-900 overflow-hidden">
                  <AviationImage
                    src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80"
                    alt="Runway 07/25 Approach & Lighting"
                    fill
                    className="object-cover"
                    fallbackTitle="Runway 07/25"
                    fallbackCode="RUNWAY // 07-25"
                  />
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] font-data text-amber-400 font-semibold z-10">
                    RUNWAY 07/25 // 2,358M × 45M
                  </div>
                </div>
                <div className="p-6 space-y-2 font-sans text-xs text-[var(--color-text-secondary)]">
                  <h3 className="text-lg font-light text-white">Precision Navigation & Operations</h3>
                  <p>Category II ILS precision approach accommodating all large-cabin and intercontinental business jets.</p>
                </div>
              </div>
            </div>

            {/* Related Routes from Băneasa */}
            {baneasaRoutes.length > 0 && (
              <div className="flex flex-col gap-6 pt-6 border-t border-white/10">
                <h2 className="text-xs font-data text-amber-400 uppercase tracking-widest font-semibold">
                  DEPARTING CHARTER ROUTES FROM BĂNEASA (LRBS)
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {baneasaRoutes.map((rt) => (
                    <Card key={rt.id} variant="surface" className="p-6 flex flex-col justify-between gap-4 rounded-2xl hover:border-amber-400/50 transition-all duration-300">
                      <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-data text-amber-400">{rt.distanceNm} NM • {rt.routeType.replace(/_/g, " ")}</span>
                        <h3 className="text-lg font-light text-[var(--color-text-primary)]">{rt.title}</h3>
                        <p className="text-xs text-[var(--color-text-secondary)] font-data">Light Jet: {rt.calculatedDuration.lightJet}</p>
                      </div>

                      <Link href={`/routes/${rt.slug}`} className="text-xs font-data text-amber-400 hover:underline">
                        VIEW ROUTE PROFILE →
                      </Link>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Action Trigger */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 glass-elevated rounded-2xl">
              <div>
                <h4 className="text-xl font-light text-[var(--color-text-primary)]">
                  PLAN A DEPARTURE FROM BĂNEASA (LRBS / BBU)
                </h4>
                <p className="text-xs text-[var(--color-text-secondary)] font-data mt-1">
                  Calculate flight time, aircraft availability, and ground handling for your Băneasa departure.
                </p>
              </div>
              <Link href="/plan?from=Baneasa%20LRBS">
                <Button variant="primary" size="lg">
                  PLAN BĂNEASA FLIGHT →
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
