import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { aircraftService } from "../../../lib/services/aircraft-service";
import { Container } from "../../../components/layout/Container";
import { SectionHeader } from "../../../components/shared/SectionHeader";
import { DataStatusBadge } from "../../../components/shared/DataStatusBadge";
import { PlaceholderImage } from "../../../components/shared/PlaceholderImage";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const aircraft = await aircraftService.getBySlug(slug);
  if (!aircraft) return { title: "Aircraft Specs | AIR" };
  return {
    title: `${aircraft.model} Specifications | AIR Aircraft Intelligence`,
    description: aircraft.cabinHighlights,
  };
}

export default async function AircraftDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const aircraft = await aircraftService.getBySlug(slug);

  if (!aircraft) {
    notFound();
  }

  return (
    <div className="w-full py-16 bg-[var(--color-bg-primary)] flex-1 flex flex-col gap-12">
      <Container size="default">
        <div className="flex flex-col gap-10">
          {/* Header */}
          <div className="flex flex-col gap-4 border-b border-[var(--color-border)] pb-8">
            <div className="flex items-center justify-between">
              <span className="text-xs font-data text-[var(--color-accent)] uppercase tracking-widest">
                AIRCRAFT MODEL INTELLIGENCE // {aircraft.category}
              </span>
              <DataStatusBadge status={aircraft.dataStatus} />
            </div>

            <SectionHeader
              title={aircraft.model}
              description={`Manufacturer: ${aircraft.manufacturer}. Base operator: ${aircraft.operatorDisplayName || "Verified Network"}.`}
              titleAs="h1"
            />
          </div>

          {/* Visual Showcase */}
          <PlaceholderImage
            title={aircraft.model}
            code={`REG: ${aircraft.registration || "PROVENANCE CHECKED"}`}
            aspectRatio="wide"
          />

          {/* Key Specifications Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-data">
            <Card variant="surface" className="flex flex-col gap-1">
              <span className="text-[10px] text-[var(--color-text-muted)]">PASSENGER CAPACITY</span>
              <span className="text-xl text-[var(--color-text-primary)] font-light">{aircraft.passengerCapacity} SEATS</span>
            </Card>
            <Card variant="surface" className="flex flex-col gap-1">
              <span className="text-[10px] text-[var(--color-text-muted)]">CRUISE SPEED</span>
              <span className="text-xl text-[var(--color-text-primary)] font-light">{aircraft.typicalCruiseSpeed || "420"} KTS</span>
            </Card>
            <Card variant="surface" className="flex flex-col gap-1">
              <span className="text-[10px] text-[var(--color-text-muted)]">APPROXIMATE RANGE</span>
              <span className="text-xl text-[var(--color-text-primary)] font-light">{aircraft.approximateRange || "1,800"} NM</span>
            </Card>
            <Card variant="surface" className="flex flex-col gap-1">
              <span className="text-[10px] text-[var(--color-text-muted)]">HOME BASE</span>
              <span className="text-sm text-[var(--color-text-primary)] font-light">{aircraft.homeBaseName || "Băneasa (LROP)"}</span>
            </Card>
          </div>

          {/* Cabin Characteristics */}
          <Card variant="surface" className="flex flex-col gap-4 p-8">
            <h3 className="text-lg font-light text-[var(--color-text-primary)]">
              CABIN CHARACTERISTICS & MISSION SUITABILITY
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed font-sans">
              {aircraft.cabinHighlights}
            </p>
            <div className="pt-2 text-xs font-data text-[var(--color-text-muted)]">
              BAGGAGE CAPACITY: {aircraft.baggageCapacity || "Standard luggage payload"}
            </div>
          </Card>

          {/* Action Call */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-8 bg-[var(--color-surface)] border border-[var(--color-border)]">
            <div>
              <h4 className="text-xl font-light text-[var(--color-text-primary)]">
                REQUEST A MISSION WITH THIS VEHICLE
              </h4>
              <p className="text-xs text-[var(--color-text-secondary)]">
                Evaluate route availability, airfield weather, and operator quote proposals.
              </p>
            </div>
            <Link href={`/plan?priority=FASTEST`}>
              <Button variant="primary" size="lg">
                RUN MISSION PLANNER →
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
