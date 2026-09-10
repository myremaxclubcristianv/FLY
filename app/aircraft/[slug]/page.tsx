import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { aircraftService } from "../../../lib/services/aircraft-service";
import { Container } from "../../../components/layout/Container";
import { SectionHeader } from "../../../components/shared/SectionHeader";
import { DataStatusBadge } from "../../../components/shared/DataStatusBadge";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { AviationImage } from "../../../components/AviationImage";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const aircraft = await aircraftService.getBySlug(slug);
  if (!aircraft) return { title: "Aircraft Specs | AIR" };
  return {
    title: `${aircraft.manufacturer} ${aircraft.model} Specs & Intelligence | AIR`,
    description: aircraft.cabinHighlights,
  };
}

const AIRCRAFT_PHOTOS: Record<string, { hero: string; interior: string; cockpit: string }> = {
  "phenom-300": {
    hero: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1600&q=80",
    interior: "https://images.unsplash.com/photo-1520437358207-323b43b50729?auto=format&fit=crop&w=1200&q=80",
    cockpit: "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=1200&q=80",
  },
  "challenger-350": {
    hero: "https://images.unsplash.com/photo-1520437358207-323b43b50729?auto=format&fit=crop&w=1600&q=80",
    interior: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80",
    cockpit: "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=1200&q=80",
  },
  "gulfstream-g650er": {
    hero: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1600&q=80",
    interior: "https://images.unsplash.com/photo-1520437358207-323b43b50729?auto=format&fit=crop&w=1200&q=80",
    cockpit: "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=1200&q=80",
  },
  "pilatus-pc-12": {
    hero: "https://images.unsplash.com/photo-1519074069444-1ba4ea16007e?auto=format&fit=crop&w=1600&q=80",
    interior: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80",
    cockpit: "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=1200&q=80",
  },
  "leonardo-aw139": {
    hero: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1600&q=80",
    interior: "https://images.unsplash.com/photo-1519074069444-1ba4ea16007e?auto=format&fit=crop&w=1200&q=80",
    cockpit: "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=1200&q=80",
  },
};

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

  const photos = AIRCRAFT_PHOTOS[slug] || {
    hero: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1600&q=80",
    interior: "https://images.unsplash.com/photo-1520437358207-323b43b50729?auto=format&fit=crop&w=1200&q=80",
    cockpit: "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=1200&q=80",
  };

  return (
    <div className="w-full py-16 bg-[var(--color-bg-primary)] flex-1 flex flex-col gap-12 text-neutral-100">
      <Container size="default">
        <div className="flex flex-col gap-10">
          <Link href="/aircraft" className="text-xs font-mono text-amber-400 hover:underline">
            ← Return to Fleet Explorer
          </Link>

          {/* Header */}
          <div className="flex flex-col gap-4 border-b border-[var(--color-border)] pb-8">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-amber-400 uppercase tracking-widest bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
                AIRCRAFT MODEL INTELLIGENCE // {aircraft.category.replace(/_/g, " ")}
              </span>
              <DataStatusBadge status={aircraft.dataStatus} />
            </div>

            <SectionHeader
              title={`${aircraft.manufacturer} ${aircraft.model}`}
              description={`Manufacturer verified specifications. Primary operator: ${aircraft.operatorDisplayName || "Certified AOC Operator Network"}.`}
              titleAs="h1"
            />
          </div>

          {/* Editorial Visual Showcase */}
          <div className="relative h-[400px] sm:h-[500px] w-full rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900">
            <AviationImage src={photos.hero} alt={`${aircraft.manufacturer} ${aircraft.model}`} fill className="object-cover" priority fallbackTitle={`${aircraft.manufacturer} ${aircraft.model}`} fallbackCode={`DOSSIER // ${aircraft.model}`} />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 font-mono text-xs text-neutral-300 z-10">
              <div>
                <span className="text-[10px] text-amber-400 font-bold uppercase block">MODEL PROVENANCE</span>
                <span className="text-white font-bold">{aircraft.manufacturer} Official Specs</span>
              </div>
              <span className="bg-neutral-950/80 backdrop-blur px-3 py-1 rounded border border-neutral-800 text-[11px]">
                TAIL REGISTRATION PROVENANCE: AOC CONFIRMED UPON DISPATCH
              </span>
            </div>
          </div>

          {/* Key Specifications Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-data">
            <Card variant="instrument" className="flex flex-col gap-1 p-5 rounded-2xl">
              <span className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">PASSENGER CAPACITY</span>
              <span className="text-2xl text-amber-400 font-bold">{aircraft.passengerCapacity} SEATS</span>
            </Card>
            <Card variant="instrument" className="flex flex-col gap-1 p-5 rounded-2xl">
              <span className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">TYPICAL CRUISE SPEED</span>
              <span className="text-2xl text-amber-400 font-bold">{aircraft.typicalCruiseSpeed || "420"} KTS</span>
            </Card>
            <Card variant="instrument" className="flex flex-col gap-1 p-5 rounded-2xl">
              <span className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">MAXIMUM RANGE</span>
              <span className="text-2xl text-amber-400 font-bold">{aircraft.approximateRange || "1,800"} NM</span>
            </Card>
            <Card variant="instrument" className="flex flex-col gap-1 p-5 rounded-2xl">
              <span className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">HOME OPERATIONAL BASE</span>
              <span className="text-sm text-white font-bold">{aircraft.homeBaseName || "Băneasa (LRBS / BBU)"}</span>
            </Card>
          </div>

          {/* Visual Gallery Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative h-72 rounded-2xl overflow-hidden border border-white/10 bg-neutral-900">
              <AviationImage src={photos.interior} alt="Cabin interior" fill className="object-cover" fallbackTitle="Executive Cabin" fallbackCode="CABIN // INTERIOR" />
              <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[10px] font-data text-amber-400 font-semibold z-10">
                EXECUTIVE CABIN CONFIGURATION
              </div>
            </div>
            <div className="relative h-72 rounded-2xl overflow-hidden border border-white/10 bg-neutral-900">
              <AviationImage src={photos.cockpit} alt="Cockpit avionics" fill className="object-cover" fallbackTitle="Digital Flight Deck" fallbackCode="COCKPIT // AVIONICS" />
              <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[10px] font-data text-amber-400 font-semibold z-10">
                DIGITAL FLIGHT DECK AVIONICS
              </div>
            </div>
          </div>

          {/* Cabin Characteristics & Strengths */}
          <Card variant="surface" className="flex flex-col gap-4 p-8 rounded-2xl">
            <h3 className="text-lg font-light text-amber-400 font-data uppercase tracking-wider">
              Cabin Characteristics & Mission Profile
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed font-sans">
              {aircraft.cabinHighlights}
            </p>
            {aircraft.strengths && aircraft.strengths.length > 0 && (
              <div className="space-y-2 pt-4 border-t border-white/10 text-xs font-data">
                <span className="text-neutral-400 block font-bold uppercase tracking-wider">Key Strengths:</span>
                <ul className="list-disc list-inside text-neutral-300 space-y-1.5 font-sans">
                  {aircraft.strengths.map((str, i) => (
                    <li key={i}>{str}</li>
                  ))}
                </ul>
              </div>
            )}
          </Card>

          {/* Action CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 glass-elevated rounded-2xl">
            <div>
              <h4 className="text-xl font-light text-white">
                EVALUATE THIS VEHICLE FOR YOUR NEXT MISSION
              </h4>
              <p className="text-xs text-neutral-400 font-data mt-1">
                Compare route durations, airfield weather, and binding operator quotes.
              </p>
            </div>
            <Link href="/plan?priority=FASTEST">
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
