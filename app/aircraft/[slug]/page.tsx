import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { aircraftService } from "../../../lib/services/aircraft-service";
import { Container } from "../../../components/layout/Container";
import { DataStatusBadge } from "../../../components/shared/DataStatusBadge";
import { Button } from "../../../components/ui/Button";
import { AviationImage } from "../../../components/AviationImage";
import { JsonLd, createAircraftJsonLd } from "../../../components/shared/JsonLd";
import { AIRCRAFT_MODEL_PHOTOS } from "../../../data/real/aviation-photos";

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
    alternates: {
      canonical: `/aircraft/${aircraft.slug}`,
    },
    openGraph: {
      title: `${aircraft.manufacturer} ${aircraft.model} | AIR Aviation`,
      description: aircraft.cabinHighlights,
      url: `/aircraft/${aircraft.slug}`,
    },
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

  const photos = AIRCRAFT_MODEL_PHOTOS[slug] || {
    hero: "https://images.unsplash.com/photo-1587019158091-1a103c5dd17f?auto=format&fit=crop&w=1600&q=85",
    interior: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=85",
    cockpit: "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=1200&q=85",
    exterior: "https://images.unsplash.com/photo-1559297434-fae8a1916a79?auto=format&fit=crop&w=1200&q=85",
  };

  const aircraftJsonLd = createAircraftJsonLd(aircraft, photos);

  return (
    <>
      <JsonLd data={aircraftJsonLd} />
      <div className="w-full bg-white text-neutral-900 font-sans flex-1 flex flex-col">
      {/* 01 — EDITORIAL PRODUCT HEADER */}
      <section className="w-full py-16 sm:py-24 border-b border-neutral-200/80 bg-white">
        <Container size="wide">
          <div className="flex flex-col gap-8 max-w-6xl mx-auto">
            <Link
              href="/aircraft"
              className="text-xs font-mono text-neutral-500 hover:text-amber-600 transition flex items-center gap-2"
            >
              ← RETURN TO FLEET SHOWROOM
            </Link>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-200 pb-8">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="editorial-tag-dark">
                    {aircraft.category.replace(/_/g, " ")}
                  </span>
                  <DataStatusBadge status={aircraft.dataStatus} />
                </div>
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-neutral-900 leading-none font-sans">
                  {aircraft.manufacturer} {aircraft.model}
                </h1>
                <p className="text-base sm:text-lg text-neutral-600 font-light max-w-3xl">
                  {aircraft.cabinHighlights}
                </p>
              </div>

              <Link href={`/plan?aircraft=${aircraft.slug}`}>
                <Button variant="primary" size="lg" className="whitespace-nowrap px-8 shadow-xl">
                  PLAN WITH THIS AIRCRAFT →
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* 02 — MASSIVE AIRCRAFT PHOTOGRAPHY COVER */}
      <section className="w-full py-12 bg-white">
        <Container size="wide">
          <div className="max-w-6xl mx-auto">
            <div className="relative h-[420px] sm:h-[600px] w-full rounded-3xl overflow-hidden shadow-2xl border border-neutral-200 bg-neutral-900 group">
              <AviationImage
                src={photos.hero}
                alt={`${aircraft.manufacturer} ${aircraft.model}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-1000"
                priority
                fallbackTitle={`${aircraft.manufacturer} ${aircraft.model}`}
                fallbackCode={`DOSSIER // ${aircraft.model}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-8 left-8 right-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 text-white z-10 font-mono text-xs">
                <div>
                  <span className="text-[10px] text-amber-400 font-bold uppercase block tracking-wider">
                    MANUFACTURER PROVENANCE
                  </span>
                  <span className="text-white text-lg font-light font-sans">
                    {aircraft.manufacturer} Official Performance Specifications
                  </span>
                </div>
                <span className="bg-black/70 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-neutral-300">
                  PRIMARY OPERATIONAL HUB: {aircraft.homeBaseName || "Băneasa (LRBS / BBU)"}
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 03 — SPECIFICATION STRIP (Large Numerical Editorial Layout) */}
      <section className="w-full py-16 bg-[#fafaf7] border-y border-neutral-200/80">
        <Container size="wide">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm space-y-1">
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block font-bold">
                PASSENGER CAPACITY
              </span>
              <span className="text-3xl sm:text-4xl font-light text-neutral-900 font-sans block">
                {aircraft.passengerCapacity}
              </span>
              <span className="text-xs font-mono text-neutral-400">EXECUTIVE SEATS</span>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm space-y-1">
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block font-bold">
                CRUISE SPEED
              </span>
              <span className="text-3xl sm:text-4xl font-light text-neutral-900 font-sans block">
                {aircraft.typicalCruiseSpeed || "420"}
              </span>
              <span className="text-xs font-mono text-neutral-400">KTAS CRUISE</span>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm space-y-1">
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block font-bold">
                MAXIMUM RANGE
              </span>
              <span className="text-3xl sm:text-4xl font-light text-amber-600 font-sans block">
                {aircraft.approximateRange || "1,800"}
              </span>
              <span className="text-xs font-mono text-amber-700/80">NAUTICAL MILES</span>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm space-y-1">
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block font-bold">
                HOME BASE
              </span>
              <span className="text-xl sm:text-2xl font-light text-neutral-900 font-sans block truncate">
                {aircraft.homeBaseName || "Băneasa (LRBS)"}
              </span>
              <span className="text-xs font-mono text-neutral-400">DIRECT DISPATCH</span>
            </div>
          </div>
        </Container>
      </section>

      {/* 04 — CABIN EXPERIENCE & COCKPIT AVIONICS (Visual Editorial Gallery) */}
      <section className="w-full py-24 sm:py-32 bg-white border-b border-neutral-200/80">
        <Container size="wide">
          <div className="max-w-6xl mx-auto space-y-16">
            <div className="space-y-4">
              <span className="editorial-tag-dark">
                CABIN ARCHITECTURE & AVIONICS
              </span>
              <h2 className="text-3xl sm:text-5xl font-light text-neutral-900 font-sans">
                Interior Ergonomics & Flight Deck
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Cabin Feature */}
              <div className="editorial-card-light rounded-3xl overflow-hidden group bg-white">
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-neutral-900">
                  <AviationImage
                    src={photos.interior}
                    alt="Cabin Interior"
                    fill
                    className="object-cover group-hover:scale-105 transition duration-700"
                    fallbackTitle="Executive Cabin"
                    fallbackCode="CABIN // INTERIOR"
                  />
                  <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md border border-white/10 px-3.5 py-1 rounded-full text-[10px] font-mono text-amber-400 font-bold z-10">
                    EXECUTIVE CABIN CONFIGURATION
                  </div>
                </div>
                <div className="p-8 space-y-3">
                  <h3 className="text-xl font-light text-neutral-900 font-sans">
                    Quiet Comfort in the Stratosphere
                  </h3>
                  <p className="text-xs text-neutral-600 font-sans leading-relaxed">
                    Sculpted leather seating, low cabin altitude pressurization, and acoustic engineering for confidential focus.
                  </p>
                </div>
              </div>

              {/* Cockpit Feature */}
              <div className="editorial-card-light rounded-3xl overflow-hidden group bg-white">
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-neutral-900">
                  <AviationImage
                    src={photos.cockpit}
                    alt="Digital Flight Deck Avionics"
                    fill
                    className="object-cover group-hover:scale-105 transition duration-700"
                    fallbackTitle="Digital Flight Deck"
                    fallbackCode="COCKPIT // AVIONICS"
                  />
                  <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md border border-white/10 px-3.5 py-1 rounded-full text-[10px] font-mono text-amber-400 font-bold z-10">
                    DIGITAL FLIGHT DECK AVIONICS
                  </div>
                </div>
                <div className="p-8 space-y-3">
                  <h3 className="text-xl font-light text-neutral-900 font-sans">
                    Certified EASA / FAA Precision
                  </h3>
                  <p className="text-xs text-neutral-600 font-sans leading-relaxed">
                    Integrated synthetic vision systems, digital flight director, and steep approach approval for restricted airfields.
                  </p>
                </div>
              </div>

              {/* Exterior Airframe Feature */}
              <div className="editorial-card-light rounded-3xl overflow-hidden group bg-white">
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-neutral-900">
                  <AviationImage
                    src={photos.exterior}
                    alt="Aircraft Exterior & Wing Geometry"
                    fill
                    className="object-cover group-hover:scale-105 transition duration-700"
                    fallbackTitle="Airframe Profile"
                    fallbackCode="EXTERIOR // AIRFRAME"
                  />
                  <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md border border-white/10 px-3.5 py-1 rounded-full text-[10px] font-mono text-amber-400 font-bold z-10">
                    AERODYNAMIC PROFILE & WINGS
                  </div>
                </div>
                <div className="p-8 space-y-3">
                  <h3 className="text-xl font-light text-neutral-900 font-sans">
                    Optimized Cruise Performance
                  </h3>
                  <p className="text-xs text-neutral-600 font-sans leading-relaxed">
                    Swept-wing efficiency, high-altitude climb gradient, and short-field takeoff envelope for regional airfields.
                  </p>
                </div>
              </div>
            </div>

            {/* Strengths & Mission Envelope */}
            {aircraft.strengths && aircraft.strengths.length > 0 && (
              <div className="p-8 sm:p-10 rounded-3xl bg-[#fafaf7] border border-neutral-200 space-y-6">
                <span className="text-xs font-mono text-amber-600 font-bold uppercase tracking-wider block">
                  KEY PERFORMANCE STRENGTHS
                </span>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {aircraft.strengths.map((str, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-amber-600 mt-2 flex-shrink-0" />
                      <span className="text-sm text-neutral-700 font-sans leading-relaxed">{str}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* 05 — MISSION DISPATCH CTA (High Impact Editorial Close) */}
      <section className="w-full py-24 sm:py-32 bg-neutral-950 text-white">
        <Container size="wide">
          <div className="max-w-6xl mx-auto rounded-3xl border border-amber-500/30 bg-gradient-to-b from-neutral-900 to-black p-10 sm:p-16 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest block">
                MISSION DISPATCH // {aircraft.model}
              </span>
              <h3 className="text-3xl sm:text-5xl font-light text-white font-sans">
                READY TO FLY THE {aircraft.manufacturer.toUpperCase()} {aircraft.model.toUpperCase()}?
              </h3>
              <p className="text-sm text-neutral-300 font-sans">
                Calculate custom flight times, airfield availability, and matched quotes for your specific journey.
              </p>
            </div>

            <Link href={`/plan?aircraft=${aircraft.slug}`}>
              <Button variant="primary" size="lg" className="whitespace-nowrap px-10 py-5 text-base shadow-2xl">
                PLAN WITH THIS AIRCRAFT →
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
    </>
  );
}
