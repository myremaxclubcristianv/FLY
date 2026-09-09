import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "../../../components/layout/Container";
import { SectionHeader } from "../../../components/shared/SectionHeader";
import { ProvenanceBadge } from "../../../components/shared/ProvenanceBadge";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { UnifiedAviationRepository } from "../../../lib/repositories/unified-aviation-repo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const route = await UnifiedAviationRepository.getRouteBySlug(slug);

  if (!route) {
    return { title: "Route Profile Not Found | AIR" };
  }

  return {
    title: `${route.title} — Executive Route Intelligence | AIR`,
    description: `Flight time metrics, airport selection, and aircraft performance for flights between ${route.originCity} and ${route.destinationCity}.`,
  };
}

export default async function RouteDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const route = await UnifiedAviationRepository.getRouteBySlug(slug);

  if (!route) {
    notFound();
  }

  // Fetch related aircraft models & companies
  const allAircraft = await UnifiedAviationRepository.getAircraftModels();
  const recommendedAircraft = allAircraft.filter((ac) => route.recommendedAircraftSlugs.includes(ac.slug));

  const allCompanies = await UnifiedAviationRepository.getCompanies();
  const relatedCompanies = allCompanies.filter((c) => route.relatedCompanySlugs.includes(c.slug));

  return (
    <div className="w-full py-16 bg-[var(--color-bg-primary)] flex-1 flex flex-col gap-12">
      <Container size="wide">
        <div className="flex flex-col gap-12">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-data text-[var(--color-text-muted)]">
            <Link href="/routes" className="hover:text-[var(--color-text-primary)]">ROUTES</Link>
            <span>/</span>
            <span className="text-[var(--color-text-primary)]">{route.originCity} → {route.destinationCity}</span>
          </div>

          {/* Header */}
          <div className="flex flex-col gap-4 border-b border-[var(--color-border)] pb-8">
            <div className="flex items-center gap-3">
              <span className="text-xs font-data text-[var(--color-accent)] uppercase tracking-widest">
                ROUTE PROFILE // {route.originIcao || route.originIata} → {route.destinationIcao || route.destinationIata}
              </span>
              <ProvenanceBadge status={route.dataStatus} sourceName={route.source?.name} sourceUrl={route.source?.url} showSource />
            </div>

            <SectionHeader
              title={route.title.toUpperCase()}
              description={`Great-Circle distance: ${route.distanceNm} NM (${Math.round(route.distanceNm * 1.852)} km). ${route.suitabilityNotes}`}
              titleAs="h1"
            />
          </div>

          {/* Scheduled vs Charter Notice */}
          <div className="p-6 bg-[var(--color-surface)] border border-[var(--color-border)] text-xs text-[var(--color-text-secondary)] leading-relaxed">
            <strong className="text-[var(--color-accent)] font-data block mb-1">OPERATIONAL CLASSIFICATION NOTICE:</strong>
            {route.scheduledVsCharterNotice}
          </div>

          {/* AIR Calculated Flight Durations Matrix */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xs font-data text-[var(--color-accent)] uppercase tracking-widest">
              AIR CALCULATED FLIGHT DURATIONS (SPEED-BASED ESTIMATES)
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card variant="surface" className="p-4 flex flex-col gap-1">
                <span className="text-[10px] font-data text-[var(--color-text-muted)]">VERY LIGHT JET (380 KTS)</span>
                <span className="text-2xl font-light text-[var(--color-text-primary)] font-data">{route.calculatedDuration.vljet || "N/A"}</span>
              </Card>

              <Card variant="surface" className="p-4 flex flex-col gap-1">
                <span className="text-[10px] font-data text-[var(--color-text-muted)]">LIGHT JET (420 KTS)</span>
                <span className="text-2xl font-light text-[var(--color-text-primary)] font-data">{route.calculatedDuration.lightJet || "N/A"}</span>
              </Card>

              <Card variant="surface" className="p-4 flex flex-col gap-1">
                <span className="text-[10px] font-data text-[var(--color-text-muted)]">SUPER MIDSIZE (470 KTS)</span>
                <span className="text-2xl font-light text-[var(--color-text-primary)] font-data">{route.calculatedDuration.superMidsize || "N/A"}</span>
              </Card>

              <Card variant="surface" className="p-4 flex flex-col gap-1">
                <span className="text-[10px] font-data text-[var(--color-text-muted)]">TURBOPROP (280 KTS)</span>
                <span className="text-2xl font-light text-[var(--color-text-primary)] font-data">{route.calculatedDuration.turboprop || "N/A"}</span>
              </Card>
            </div>
          </div>

          {/* Airport & Transfer Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card variant="surface" className="p-6 flex flex-col gap-4">
              <h3 className="text-sm font-data text-[var(--color-text-primary)] uppercase tracking-wider border-b border-[var(--color-border-subtle)] pb-3">
                RECOMMENDED AIRPORT SELECTION
              </h3>
              <ul className="flex flex-col gap-2.5 text-xs text-[var(--color-text-secondary)] font-sans">
                {route.airportOptions.map((opt, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[var(--color-accent)] font-data">•</span>
                    <span>{opt}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card variant="surface" className="p-6 flex flex-col gap-4">
              <h3 className="text-sm font-data text-[var(--color-text-primary)] uppercase tracking-wider border-b border-[var(--color-border-subtle)] pb-3">
                GROUND & HELICOPTER TRANSFER POSSIBILITIES
              </h3>
              <ul className="flex flex-col gap-2.5 text-xs text-[var(--color-text-secondary)] font-sans">
                {route.transferPossibilities.map((tf, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[var(--color-accent)] font-data">•</span>
                    <span>{tf}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Recommended Aircraft Models */}
          {recommendedAircraft.length > 0 && (
            <div className="flex flex-col gap-6 pt-6 border-t border-[var(--color-border)]">
              <h2 className="text-xs font-data text-[var(--color-accent)] uppercase tracking-widest">
                RECOMMENDED AIRCRAFT MODELS FOR THIS MISSION
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recommendedAircraft.map((ac) => (
                  <Card key={ac.id} variant="surface" className="p-6 flex flex-col justify-between gap-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-data text-[var(--color-accent)]">{ac.category.replace(/_/g, " ")}</span>
                        <ProvenanceBadge status={ac.dataStatus} />
                      </div>
                      <h3 className="text-lg font-light text-[var(--color-text-primary)]">{ac.manufacturer} {ac.model}</h3>
                      <p className="text-xs text-[var(--color-text-secondary)]">
                        Speed: {ac.typicalCruiseSpeed} KTS • Range: {ac.approximateRange} NM • Seats: {ac.passengerCapacity}
                      </p>
                    </div>

                    <Link href={`/aircraft/${ac.slug}`} className="text-xs font-data text-[var(--color-accent)] hover:underline">
                      VIEW AIRCRAFT SPECS →
                    </Link>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Related Verified Companies */}
          {relatedCompanies.length > 0 && (
            <div className="flex flex-col gap-6 pt-6 border-t border-[var(--color-border)]">
              <h2 className="text-xs font-data text-[var(--color-accent)] uppercase tracking-widest">
                VERIFIED GROUND HANDLING & AVIATION PROVIDERS
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedCompanies.map((comp) => (
                  <Card key={comp.id} variant="surface" className="p-6 flex flex-col justify-between gap-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-data text-[var(--color-accent)]">{comp.category.replace(/_/g, " ")}</span>
                        <ProvenanceBadge status={comp.dataStatus} />
                      </div>
                      <h3 className="text-lg font-light text-[var(--color-text-primary)]">{comp.displayName}</h3>
                      <p className="text-xs text-[var(--color-text-secondary)]">{comp.baseAirportName || comp.city}</p>
                    </div>

                    <Link href={`/aviation/companies/${comp.slug}`} className="text-xs font-data text-[var(--color-accent)] hover:underline">
                      VIEW COMPANY PROFILE →
                    </Link>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Mission Planner Trigger */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-8 bg-[var(--color-surface)] border border-[var(--color-border)]">
            <div>
              <h4 className="text-xl font-light text-[var(--color-text-primary)]">
                REQUEST A CHARTER MISSION FOR THIS ROUTE
              </h4>
              <p className="text-xs text-[var(--color-text-secondary)]">
                Calculate live availability, multi-aircraft options, and operator quotes via AIR Decision Engine.
              </p>
            </div>
            <Link href={`/plan?from=${encodeURIComponent(route.originCity)}&to=${encodeURIComponent(route.destinationCity)}`}>
              <Button variant="primary" size="lg">
                PLAN THIS ROUTE →
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
