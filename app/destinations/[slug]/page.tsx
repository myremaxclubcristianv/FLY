import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "../../../components/layout/Container";
import { ProvenanceBadge } from "../../../components/shared/ProvenanceBadge";
import { AviationImage } from "../../../components/AviationImage";
import { Button } from "../../../components/ui/Button";
import { Card } from "../../../components/ui/Card";
import { LUXURY_DESTINATIONS } from "../../../data/real/destinations";
import { AirportCode } from "../../../components/ui/aerospace/AirportCode";
import { CoordinateLabel } from "../../../components/ui/aerospace/CoordinateLabel";
import { TelemetryBlock } from "../../../components/ui/aerospace/TelemetryBlock";
import { RunwayMarker } from "../../../components/ui/aerospace/RunwayMarker";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dest = LUXURY_DESTINATIONS.find((d) => d.slug === slug);
  if (!dest) return { title: "Destination Dossier | AIR" };
  return {
    title: `${dest.name} (${dest.airportCode}) Private Aviation Dossier | AIR`,
    description: `Private jet access, flight times from Bucharest (LRBS), runway specs, and last-mile transfers for ${dest.name}.`,
  };
}

export default async function DestinationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dest = LUXURY_DESTINATIONS.find((d) => d.slug === slug);

  if (!dest) {
    notFound();
  }

  return (
    <div className="w-full py-16 bg-neutral-950 flex-1 flex flex-col gap-16 text-neutral-100 font-sans">
      <Container size="wide">
        <div className="flex flex-col gap-12">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center justify-between font-mono text-xs text-neutral-400">
            <Link href="/destinations" className="text-amber-400 hover:underline">
              ← Return to Global Departure Board
            </Link>
            <span>DISPATCH PROVENANCE: {dest.source}</span>
          </div>

          {/* 01 HERO PANEL — Full-bleed Destination Hero */}
          <div className="relative h-[480px] sm:h-[600px] w-full rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-900">
            <AviationImage
              src={dest.heroImage}
              alt={`${dest.name} Aerial View`}
              fill
              priority
              className="object-cover"
              fallbackTitle={dest.name}
              fallbackCode={`HERO // ${dest.airportCode}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent pointer-events-none" />

            <div className="absolute top-6 left-6 right-6 z-10 flex items-center justify-between">
              <CoordinateLabel coordinates={dest.coordinates} location={dest.country} />
              <ProvenanceBadge status={dest.provenance} />
            </div>

            <div className="absolute bottom-8 left-8 right-8 z-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 text-white">
              <div className="space-y-2">
                <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest block">
                  {dest.category} • {dest.region}
                </span>
                <AirportCode code={dest.airportCode} name={dest.airportName} size="lg" />
                <h1 className="text-4xl sm:text-6xl font-light tracking-tight">{dest.name}</h1>
              </div>

              <div className="bg-neutral-950/90 backdrop-blur border border-neutral-800 p-4 rounded-xl font-mono text-xs space-y-1">
                <span className="text-[10px] text-neutral-500 uppercase block">RECOMMENDED FLEET</span>
                <span className="text-amber-300 font-bold text-sm block">{dest.recommendedCategory}</span>
                <span className="text-neutral-400 text-[11px] block">{dest.recommendedAircraft}</span>
              </div>
            </div>
          </div>

          {/* Telemetry Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <TelemetryBlock label="ESTIMATED FLIGHT (FROM LRBS)" value={dest.estimatedFlightFromLRBS} unit="" provenance={dest.provenance} />
            <TelemetryBlock label="AIRPORT CODE" value={dest.airportCode.split(" / ")[0]} unit={dest.airportCode.split(" / ")[1] || ""} provenance="ICAO VERIFIED" />
            <TelemetryBlock label="TRANSFER METHOD" value={dest.transferType.split(" ")[0]} unit={dest.transferType.split(" ").slice(1).join(" ")} provenance="LAST 50 MILES" />
            <TelemetryBlock label="PRIMARY GATEWAY" value={dest.airportName.split(" ")[0]} unit="EXECUTIVE" provenance="VERIFIED FBO" />
          </div>

          {/* 02 AVIATION VIEW — Aircraft, Runway, or FBO View */}
          <div className="grid md:grid-cols-2 gap-8 items-center glass-surface rounded-3xl p-8 border border-white/10">
            <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden bg-neutral-900 border border-white/10">
              <AviationImage
                src={dest.aviationImage}
                alt={`${dest.name} Airfield Approach`}
                fill
                className="object-cover"
                fallbackTitle={`${dest.name} Airport`}
                fallbackCode={`AVIONICS // ${dest.airportCode}`}
              />
              <div className="absolute top-4 left-4 z-10 bg-black/70 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-xs font-data text-amber-400 font-semibold">
                AIRFIELD APPROACH & FBO SPECS
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-data text-amber-400 font-semibold uppercase tracking-widest bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
                  02 // AVIATION VIEW & RUNWAY DATA
                </span>
                <h2 className="text-3xl font-light text-white font-sans">Airfield & Runway Intelligence</h2>
              </div>

              <p className="text-xs sm:text-sm text-neutral-300 font-data leading-relaxed">
                {dest.description}
              </p>

              <RunwayMarker designation="07 / 25" dimensions="2,358 × 45 M" surface="ASPHALT" />

              <div className="pt-4 border-t border-white/10 font-data text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-[var(--color-text-muted)]">Destination Airport:</span>
                  <span className="text-white font-bold">{dest.airportName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--color-text-muted)]">ICAO / IATA Identifier:</span>
                  <span className="text-amber-400 font-bold">{dest.airportCode}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 03 EXPERIENCE & 04 ARRIVAL VIEWS — Dual Editorial Panel */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Experience Panel */}
            <Card variant="surface" className="rounded-3xl overflow-hidden flex flex-col justify-between p-0">
              <div className="relative h-72 w-full overflow-hidden bg-neutral-900">
                <AviationImage
                  src={dest.experienceImage}
                  alt={`${dest.name} Destination Experience`}
                  fill
                  className="object-cover"
                  fallbackTitle={`${dest.name} Experience`}
                  fallbackCode="03 // EXPERIENCE VIEW"
                />
                <div className="absolute top-4 left-4 z-10 bg-black/70 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-xs font-data text-amber-400 font-semibold">
                  03 // LUXURY DESTINATION SANCTUARY
                </div>
              </div>

              <div className="p-6 space-y-3 font-data text-xs">
                <h3 className="text-xl font-light text-white font-sans">{dest.tagline}</h3>
                <p className="text-[var(--color-text-secondary)] leading-relaxed font-sans">
                  AIR provides bespoke on-demand flight routing tailored for executive passengers, families, and private flight departments.
                </p>
              </div>
            </Card>

            {/* Arrival Panel */}
            <Card variant="surface" className="rounded-3xl overflow-hidden flex flex-col justify-between p-0">
              <div className="relative h-72 w-full overflow-hidden bg-neutral-900">
                <AviationImage
                  src={dest.arrivalImage}
                  alt={`${dest.name} Last-Mile Arrival`}
                  fill
                  className="object-cover"
                  fallbackTitle={`${dest.name} Intermodal Transfer`}
                  fallbackCode="04 // ARRIVAL VIEW"
                />
                <div className="absolute top-4 left-4 z-10 bg-black/70 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-xs font-data text-amber-400 font-semibold">
                  04 // THE LAST 50 MILES TRANSFER
                </div>
              </div>

              <div className="p-6 space-y-3 font-data text-xs">
                <h3 className="text-xl font-light text-white font-sans">Intermodal Arrival Protocol</h3>
                <p className="text-[var(--color-text-secondary)] leading-relaxed font-sans">
                  Transfer protocol: <span className="text-amber-300 font-bold">{dest.transferType}</span>. Seamless transition from jet ramp to luxury touchdown.
                </p>
              </div>
            </Card>
          </div>

          {/* Mission Planner CTA Box */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-10 glass-elevated rounded-3xl">
            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-light text-white font-sans">
                REQUEST MISSION TO {dest.name.toUpperCase()}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 font-data">
                Calculate vehicle options, jet categories, and request a verified quote from AIR Decision Engine.
              </p>
            </div>

            <Link href={`/plan?to=${encodeURIComponent(dest.name)}`}>
              <Button variant="primary" size="lg" className="font-data text-xs whitespace-nowrap">
                RUN MISSION IN PLANNER →
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
