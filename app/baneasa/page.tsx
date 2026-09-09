import React from "react";
import Link from "next/link";
import { Container } from "../../components/layout/Container";
import { SectionHeader } from "../../components/shared/SectionHeader";
import { ProvenanceBadge } from "../../components/shared/ProvenanceBadge";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { UnifiedAviationRepository } from "../../lib/repositories/unified-aviation-repo";
import { JsonLd, createAirportJsonLd } from "../../components/shared/JsonLd";

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
          <div className="flex flex-col gap-12">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs font-data text-[var(--color-text-muted)]">
              <Link href="/" className="hover:text-[var(--color-text-primary)]">HOME</Link>
              <span>/</span>
              <span className="text-[var(--color-text-primary)]">BĂNEASA EXECUTIVE GATEWAY (LRBS / BBU)</span>
            </div>

            {/* Header */}
            <div className="flex flex-col gap-4 border-b border-[var(--color-border)] pb-8">
              <div className="flex items-center gap-3">
                <span className="text-xs font-data text-[var(--color-accent)] uppercase tracking-widest">
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

            {/* Technical Infrastructure Specs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card variant="surface" className="p-4 flex flex-col gap-1">
                <span className="text-[10px] font-data text-[var(--color-text-muted)]">ICAO / IATA CODES</span>
                <span className="text-2xl font-light text-[var(--color-text-primary)] font-data">LRBS / BBU</span>
              </Card>

              <Card variant="surface" className="p-4 flex flex-col gap-1">
                <span className="text-[10px] font-data text-[var(--color-text-muted)]">RUNWAY 07/25 SPECS</span>
                <span className="text-xl font-light text-[var(--color-text-primary)] font-data">2,358m x 45m</span>
              </Card>

              <Card variant="surface" className="p-4 flex flex-col gap-1">
                <span className="text-[10px] font-data text-[var(--color-text-muted)]">SURFACE & PCN</span>
                <span className="text-xs font-light text-[var(--color-text-primary)] font-data">Asphalt (PCN 51/F/C/W/T)</span>
              </Card>

              <Card variant="surface" className="p-4 flex flex-col gap-1">
                <span className="text-[10px] font-data text-[var(--color-text-muted)]">AIRPORT AUTHORITY</span>
                <span className="text-xs font-light text-[var(--color-text-primary)] font-data">CNAB (State Airport Co.)</span>
              </Card>
            </div>

            {/* Operational Capabilities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card variant="surface" className="p-6 flex flex-col gap-4">
                <h2 className="text-sm font-data text-[var(--color-text-primary)] uppercase tracking-wider border-b border-[var(--color-border-subtle)] pb-3">
                  EXECUTIVE & BUSINESS AVIATION ADVANTAGES
                </h2>
                <ul className="flex flex-col gap-2.5 text-xs text-[var(--color-text-secondary)] font-sans">
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--color-accent)] font-data">•</span>
                    <span><strong>Zero Commercial Airline Congestion:</strong> Exclusively handles executive jets, twin-engine helicopters, and general aviation.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--color-accent)] font-data">•</span>
                    <span><strong>10-Minute CBD Access:</strong> Located just 7 km from Bucharest central business district and northern commercial towers.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[var(--color-accent)] font-data">•</span>
                    <span><strong>Fast-Track Handling:</strong> Passengers arrive 15-20 minutes before departure directly to the private FBO lounge.</span>
                  </li>
                </ul>
              </Card>

              <Card variant="surface" className="p-6 flex flex-col gap-4">
                <h2 className="text-sm font-data text-[var(--color-text-primary)] uppercase tracking-wider border-b border-[var(--color-border-subtle)] pb-3">
                  AUTHORIZED GROUND HANDLERS AT BĂNEASA
                </h2>
                <div className="flex flex-col gap-2.5 text-xs text-[var(--color-text-secondary)] font-sans">
                  {baneasa.handlingProviders?.map((handler, i) => (
                    <div key={i} className="flex items-center justify-between border-b border-[var(--color-border-subtle)] pb-1.5">
                      <span>{handler}</span>
                      <span className="text-[10px] font-data text-[var(--color-accent)]">VERIFIED HANDLER</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Related Routes from Băneasa */}
            {baneasaRoutes.length > 0 && (
              <div className="flex flex-col gap-6 pt-6 border-t border-[var(--color-border)]">
                <h2 className="text-xs font-data text-[var(--color-accent)] uppercase tracking-widest">
                  DEPARTING CHARTER ROUTES FROM BĂNEASA (LRBS)
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {baneasaRoutes.map((rt) => (
                    <Card key={rt.id} variant="surface" className="p-6 flex flex-col justify-between gap-4">
                      <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-data text-[var(--color-accent)]">{rt.distanceNm} NM • {rt.routeType.replace(/_/g, " ")}</span>
                        <h3 className="text-lg font-light text-[var(--color-text-primary)]">{rt.title}</h3>
                        <p className="text-xs text-[var(--color-text-secondary)]">Light Jet: {rt.calculatedDuration.lightJet}</p>
                      </div>

                      <Link href={`/routes/${rt.slug}`} className="text-xs font-data text-[var(--color-accent)] hover:underline">
                        VIEW ROUTE PROFILE →
                      </Link>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Action Trigger */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-8 bg-[var(--color-surface)] border border-[var(--color-border)]">
              <div>
                <h4 className="text-xl font-light text-[var(--color-text-primary)]">
                  PLAN A DEPARTURE FROM BĂNEASA (LRBS / BBU)
                </h4>
                <p className="text-xs text-[var(--color-text-secondary)]">
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
