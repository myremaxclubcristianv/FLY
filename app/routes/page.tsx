import React from "react";
import Link from "next/link";
import { Container } from "../../components/layout/Container";
import { SectionHeader } from "../../components/shared/SectionHeader";
import { ProvenanceBadge } from "../../components/shared/ProvenanceBadge";
import { Card } from "../../components/ui/Card";
import { UnifiedAviationRepository } from "../../lib/repositories/unified-aviation-repo";

export const metadata = {
  title: "Aviation Route Intelligence & Flight Profiles | AIR",
  description:
    "Explore verified aviation route profiles connecting Bucharest (Băneasa LRBS), Cluj, Brașov to London, Paris, Nice, Geneva, and major European destinations.",
};

export default async function RoutesIndexPage() {
  const routes = await UnifiedAviationRepository.getRoutes();

  return (
    <div className="w-full py-16 bg-[var(--color-bg-primary)] flex-1 flex flex-col gap-12">
      <Container size="wide">
        <div className="flex flex-col gap-12">
          {/* Header */}
          <div className="flex flex-col gap-4 border-b border-[var(--color-border)] pb-8">
            <div className="flex items-center gap-3">
              <span className="text-xs font-data text-[var(--color-accent)] uppercase tracking-widest">
                ROUTE INTELLIGENCE // GREAT-CIRCLE METRICS
              </span>
              <ProvenanceBadge status="OFFICIAL_SOURCE" />
            </div>

            <SectionHeader
              title="VERIFIED ROUTE PROFILES."
              description="Explore flight time metrics, airport selection options, transfer possibilities, and aircraft suitability profiles for European executive flight missions."
              titleAs="h1"
            />
          </div>

          {/* Routes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {routes.map((route) => (
              <Card key={route.id} variant="surface" className="flex flex-col justify-between p-6 gap-6 group hover:border-[var(--color-accent)] transition-colors">
                <div className="flex flex-col gap-4">
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-[10px] font-data text-[var(--color-accent)] tracking-widest uppercase">
                      {route.routeType.replace(/_/g, " ")} • {route.distanceNm} NM
                    </span>
                    <ProvenanceBadge status={route.dataStatus} />
                  </div>

                  <h2 className="text-xl font-light text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors font-sans">
                    {route.title}
                  </h2>

                  <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed line-clamp-3">
                    {route.suitabilityNotes}
                  </p>
                </div>

                {/* Duration Bar */}
                <div className="flex flex-col gap-3 pt-4 border-t border-[var(--color-border-subtle)]">
                  <div className="grid grid-cols-3 gap-2 text-[10px] font-data">
                    <div className="flex flex-col">
                      <span className="text-[var(--color-text-muted)]">LIGHT JET</span>
                      <span className="text-[var(--color-text-primary)]">{route.calculatedDuration.lightJet}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[var(--color-text-muted)]">SUPER MID</span>
                      <span className="text-[var(--color-text-primary)]">{route.calculatedDuration.superMidsize}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[var(--color-text-muted)]">TURBOPROP</span>
                      <span className="text-[var(--color-text-primary)]">{route.calculatedDuration.turboprop}</span>
                    </div>
                  </div>

                  <Link href={`/routes/${route.slug}`} className="text-xs font-data text-[var(--color-accent)] hover:underline inline-flex items-center gap-1">
                    EXPLORE DEEP ROUTE PROFILE →
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
