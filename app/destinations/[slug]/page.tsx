import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "../../../components/layout/Container";
import { ProvenanceBadge } from "../../../components/shared/ProvenanceBadge";
import { AviationImage } from "../../../components/AviationImage";
import { Button } from "../../../components/ui/Button";
import { LUXURY_DESTINATIONS } from "../../../data/real/destinations";

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
    <div className="w-full bg-white text-neutral-900 font-sans flex-1 flex flex-col">
      {/* 01 — EDITORIAL HEADER & GIANT HERO PHOTO */}
      <section className="w-full py-16 sm:py-24 border-b border-neutral-200/80 bg-white">
        <Container size="wide">
          <div className="flex flex-col gap-8 max-w-6xl mx-auto">
            <Link
              href="/destinations"
              className="text-xs font-mono text-neutral-500 hover:text-amber-600 transition flex items-center gap-2"
            >
              ← RETURN TO DESTINATIONS
            </Link>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-200 pb-8">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="editorial-tag-dark">
                    {dest.category} • {dest.region}
                  </span>
                  <ProvenanceBadge status={dest.provenance} />
                </div>
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-neutral-900 leading-none font-sans">
                  {dest.name}
                </h1>
                <p className="text-base sm:text-lg text-neutral-600 font-light max-w-3xl">
                  {dest.description}
                </p>
              </div>

              <Link href={`/plan?destination=${dest.slug}`}>
                <Button variant="primary" size="lg" className="whitespace-nowrap px-8 shadow-xl">
                  PLAN FLIGHT TO {dest.name.toUpperCase()} →
                </Button>
              </Link>
            </div>

            {/* Giant Destination Hero Showcase */}
            <div className="relative h-[420px] sm:h-[600px] w-full rounded-3xl overflow-hidden shadow-2xl border border-neutral-200 bg-neutral-900 group">
              <AviationImage
                src={dest.heroImage}
                alt={`${dest.name} Aerial View`}
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-1000"
                fallbackTitle={dest.name}
                fallbackCode={`HERO // ${dest.airportCode}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-8 left-8 right-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 text-white z-10 font-mono text-xs">
                <div>
                  <span className="text-[10px] text-amber-400 font-bold uppercase block tracking-wider">
                    DESTINATION GATEWAY
                  </span>
                  <span className="text-white text-lg font-light font-sans">
                    {dest.airportName} ({dest.airportCode})
                  </span>
                </div>
                <span className="bg-black/70 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-neutral-300">
                  ESTIMATED FLIGHT: {dest.estimatedFlightFromLRBS} FROM BUCHAREST (LRBS)
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 02 — FLIGHT TELEMETRY STRIP */}
      <section className="w-full py-16 bg-[#fafaf7] border-b border-neutral-200/80">
        <Container size="wide">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm space-y-1">
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block font-bold">
                ESTIMATED FLIGHT TIME
              </span>
              <span className="text-3xl sm:text-4xl font-light text-amber-600 font-sans block">
                {dest.estimatedFlightFromLRBS}
              </span>
              <span className="text-xs font-mono text-neutral-400">DIRECT ROUTE FROM LRBS</span>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm space-y-1">
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block font-bold">
                PRIMARY AIRPORT CODE
              </span>
              <span className="text-3xl sm:text-4xl font-light text-neutral-900 font-sans block">
                {dest.airportCode}
              </span>
              <span className="text-xs font-mono text-neutral-400">{dest.country}</span>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm space-y-1">
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block font-bold">
                LAST-MILE TRANSFER
              </span>
              <span className="text-xl sm:text-2xl font-light text-neutral-900 font-sans block truncate">
                {dest.transferType}
              </span>
              <span className="text-xs font-mono text-neutral-400">INTERMODAL ACCESS</span>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm space-y-1">
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block font-bold">
                RECOMMENDED FLEET
              </span>
              <span className="text-xl sm:text-2xl font-light text-neutral-900 font-sans block truncate">
                {dest.recommendedCategory}
              </span>
              <span className="text-xs font-mono text-amber-600">{dest.recommendedAircraft}</span>
            </div>
          </div>
        </Container>
      </section>

      {/* 03 — DUAL EDITORIAL PRESENTATION: AIRCRAFT + DESTINATION */}
      <section className="w-full py-24 sm:py-32 bg-white border-b border-neutral-200/80">
        <Container size="wide">
          <div className="max-w-6xl mx-auto space-y-16">
            <div className="space-y-4">
              <span className="editorial-tag-dark">
                THE MISSION PROFILE // THIS IS HOW YOU GET THERE
              </span>
              <h2 className="text-3xl sm:text-5xl font-light text-neutral-900 font-sans">
                Aviation & Arrival Architecture
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Aircraft Matched Image */}
              <div className="editorial-card-light rounded-3xl overflow-hidden group bg-white">
                <div className="relative h-80 sm:h-96 w-full overflow-hidden bg-neutral-900">
                  <AviationImage
                    src={dest.aviationImage}
                    alt={`${dest.recommendedAircraft} on approach`}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-700"
                    fallbackTitle={dest.recommendedAircraft}
                    fallbackCode="MISSION // AIRCRAFT"
                  />
                  <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md border border-white/10 px-3.5 py-1 rounded-full text-[10px] font-mono text-amber-400 font-bold z-10">
                    MATCHED AIRCRAFT // {dest.recommendedCategory}
                  </div>
                </div>
                <div className="p-8 space-y-3">
                  <h3 className="text-2xl font-light text-neutral-900 font-sans">
                    {dest.recommendedAircraft}
                  </h3>
                  <p className="text-sm text-neutral-600 font-sans leading-relaxed">
                    Selected for optimal range, cabin altitude comfort, and payload efficiency for non-stop missions to {dest.name}.
                  </p>
                </div>
              </div>

              {/* Destination Atmosphere Image */}
              <div className="editorial-card-light rounded-3xl overflow-hidden group bg-white">
                <div className="relative h-80 sm:h-96 w-full overflow-hidden bg-neutral-900">
                  <AviationImage
                    src={dest.image}
                    alt={`${dest.name} Atmosphere`}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-700"
                    fallbackTitle={dest.name}
                    fallbackCode="SANCTUARY // ARRIVAL"
                  />
                  <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md border border-white/10 px-3.5 py-1 rounded-full text-[10px] font-mono text-amber-400 font-bold z-10">
                    LAST-MILE // {dest.transferType}
                  </div>
                </div>
                <div className="p-8 space-y-3">
                  <h3 className="text-2xl font-light text-neutral-900 font-sans">
                    Seamless Arrival Logistics
                  </h3>
                  <p className="text-sm text-neutral-600 font-sans leading-relaxed">
                    Direct VIP ground handling upon landing at {dest.airportName}, transferring seamlessly to your final resort or villa helipad.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 04 — MISSION PLANNER CTA */}
      <section className="w-full py-24 sm:py-32 bg-neutral-950 text-white">
        <Container size="wide">
          <div className="max-w-6xl mx-auto rounded-3xl border border-amber-500/30 bg-gradient-to-b from-neutral-900 to-black p-10 sm:p-16 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest block">
                MISSION DISPATCH // {dest.name.toUpperCase()}
              </span>
              <h3 className="text-3xl sm:text-5xl font-light text-white font-sans">
                DISPATCH YOUR FLIGHT TO {dest.name.toUpperCase()}
              </h3>
              <p className="text-sm text-neutral-300 font-sans">
                Calculate custom flight times, airfield availability, and matched quotes for {dest.name}.
              </p>
            </div>

            <Link href={`/plan?destination=${dest.slug}`}>
              <Button variant="primary" size="lg" className="whitespace-nowrap px-10 py-5 text-base shadow-2xl">
                PLAN FLIGHT TO {dest.name.toUpperCase()} →
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
