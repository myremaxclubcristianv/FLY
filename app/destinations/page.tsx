import React from "react";
import Link from "next/link";
import { Container } from "../../components/layout/Container";
import { DataStatusBadge } from "../../components/shared/DataStatusBadge";
import { ProvenanceBadge } from "../../components/shared/ProvenanceBadge";
import { Button } from "../../components/ui/Button";
import { LUXURY_DESTINATIONS } from "../../data/real/destinations";
import { AviationImage } from "../../components/AviationImage";
import { DestinationExplorer } from "../../components/destinations/DestinationExplorer";

export const metadata = {
  title: "Global Luxury Destinations & Route Intelligence | AIR",
  description:
    "Explore premier private jet destinations—Maldives, Seychelles, St. Barth, Mauritius, Ibiza, Mykonos, Cannes, Dubai, and French Riviera—matched to aircraft categories and flight telemetry from Bucharest Băneasa (LRBS).",
};

const FEATURED_EDITORIALS = [
  {
    name: "MALDIVES",
    country: "Republic of Maldives",
    airport: "Velana Int'l (VRMM / MLE) + Seaplane",
    flightTime: "8h 30m from LRBS",
    aircraft: "Gulfstream G650ER / Heavy Jet",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1600&q=85",
    aviationImage: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=1200&q=85",
    slug: "maldives",
    quote: "Direct intercontinental flight paired with private twin-otter seaplane transfer directly to your overwater villa lagoon.",
  },
  {
    name: "SEYCHELLES",
    country: "Seychelles Archipelago",
    airport: "Mahé International (FSIA / SEZ)",
    flightTime: "9h 00m from LRBS",
    aircraft: "Praetor 600 / Global 6500",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1600&q=85",
    aviationImage: "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&w=1200&q=85",
    slug: "seychelles",
    quote: "Granite peaks rising from turquoise shallows. Direct executive apron landing at Mahé followed by private island helicopter transfer.",
  },
];

export default function DestinationsPage() {
  return (
    <div className="w-full bg-white text-neutral-900 font-sans flex-1 flex flex-col">
      {/* 01 — EDITORIAL HEADER (Pure White Luxury) */}
      <section className="w-full py-24 sm:py-32 border-b border-neutral-200/80 bg-white">
        <Container size="wide">
          <div className="flex flex-col gap-10 max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-4 max-w-3xl">
                <div className="flex items-center gap-3">
                  <span className="editorial-tag-dark">
                    DESTINATION EDITORIAL // GLOBAL DISPATCH
                  </span>
                  <DataStatusBadge status="OFFICIAL_SOURCE" />
                </div>
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-neutral-900 leading-[1.05] font-sans">
                  THE WORLD IS YOUR DEPARTURE BOARD<span className="text-amber-600">.</span>
                </h1>
                <p className="text-lg sm:text-xl text-neutral-600 font-light leading-relaxed">
                  AIR connects Bucharest Băneasa (LRBS / BBU) and European executive hubs to premier luxury island sanctuaries, Alpine runways, and Mediterranean coastlines.
                </p>
              </div>

              <Link href="/plan">
                <Button variant="primary" size="lg" className="whitespace-nowrap px-8 shadow-xl">
                  PLAN A FLIGHT →
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* 02 — FEATURED LUXURY TRAVEL EDITORIALS (Magazine Double-Spread Compositions) */}
      <section className="w-full py-28 sm:py-36 bg-[#fafaf7] border-b border-neutral-200/80">
        <Container size="wide">
          <div className="flex flex-col gap-32 max-w-6xl mx-auto">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <span className="editorial-tag-dark">
                FEATURED ISLAND SANCTUARIES
              </span>
              <h2 className="text-4xl sm:text-5xl font-light text-neutral-900 font-sans">
                Where Private Wings Meet the Horizon
              </h2>
              <p className="text-base text-neutral-600 font-light">
                Discover how long-range private aviation unlocks the world&apos;s most secluded destinations with seamless point-to-point transfers.
              </p>
            </div>

            {FEATURED_EDITORIALS.map((feat) => {
              return (
                <div
                  key={feat.slug}
                  className="rounded-3xl overflow-hidden bg-white border border-neutral-200 shadow-2xl p-8 sm:p-12 space-y-10"
                >
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-100 pb-6">
                    <div className="space-y-1">
                      <span className="text-xs font-mono text-amber-600 font-bold uppercase tracking-widest">
                        {feat.country}
                      </span>
                      <h3 className="text-3xl sm:text-5xl font-light text-neutral-900 font-sans">
                        {feat.name}
                      </h3>
                    </div>
                    <div className="text-right font-mono text-xs text-neutral-500 space-y-0.5">
                      <span className="text-neutral-900 font-bold block">{feat.airport}</span>
                      <span className="text-amber-600 font-bold">{feat.flightTime}</span>
                    </div>
                  </div>

                  {/* Dual Photography Showcase: Destination + Aircraft */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    <div className="md:col-span-8 relative h-[360px] sm:h-[460px] rounded-2xl overflow-hidden group bg-neutral-900">
                      <AviationImage
                        src={feat.image}
                        alt={feat.name}
                        fill
                        className="object-cover group-hover:scale-105 transition duration-700"
                        fallbackTitle={feat.name}
                        fallbackCode={`DEST // ${feat.name}`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-6 left-6 right-6 text-white text-xs font-mono">
                        <span className="bg-black/70 px-3.5 py-1.5 rounded-full border border-white/20">
                          DESTINATION SANCTUARY
                        </span>
                      </div>
                    </div>

                    <div className="md:col-span-4 relative h-[360px] sm:h-[460px] rounded-2xl overflow-hidden group bg-neutral-900">
                      <AviationImage
                        src={feat.aviationImage}
                        alt={`${feat.aircraft} matched to ${feat.name}`}
                        fill
                        className="object-cover group-hover:scale-105 transition duration-700"
                        fallbackTitle={feat.aircraft}
                        fallbackCode="AIRCRAFT // MATCH"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-6 left-6 right-6 text-white text-xs font-mono space-y-1">
                        <span className="text-[10px] text-amber-400 font-bold uppercase block">RECOMMENDED AIRCRAFT</span>
                        <span className="font-sans text-sm font-light text-white block">{feat.aircraft}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-4 border-t border-neutral-100">
                    <p className="text-sm text-neutral-600 font-sans italic max-w-2xl">
                      &ldquo;{feat.quote}&rdquo;
                    </p>
                    <Link href={`/destinations/${feat.slug}`}>
                      <Button variant="primary" size="md" className="whitespace-nowrap px-8 shadow-md">
                        EXPLORE {feat.name} DOSSIER →
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 03 — INTERACTIVE DEPARTURE BOARD & MAP EXPLORER */}
      <section className="w-full py-24 sm:py-32 bg-white border-b border-neutral-200/80">
        <Container size="wide">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="space-y-4">
              <span className="editorial-tag-dark">
                FLIGHT TELEMETRY & RUNWAY CALCULATOR
              </span>
              <h2 className="text-3xl sm:text-5xl font-light text-neutral-900 font-sans">
                Live Departure Board from LRBS
              </h2>
            </div>
            <DestinationExplorer />
          </div>
        </Container>
      </section>

      {/* 04 — ALL GLOBAL DESTINATIONS (Editorial Showcase Grid) */}
      <section className="w-full py-28 sm:py-36 bg-[#fafaf7]">
        <Container size="wide">
          <div className="flex flex-col gap-16 max-w-6xl mx-auto">
            <div className="space-y-4 border-b border-neutral-200 pb-8">
              <div className="flex items-center gap-3">
                <span className="editorial-tag-dark">
                  GLOBAL DESTINATION DIRECTORY
                </span>
                <ProvenanceBadge status="VERIFIED" />
              </div>
              <h2 className="text-4xl sm:text-5xl font-light text-neutral-900 font-sans">
                Curated Executive Gateways
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {LUXURY_DESTINATIONS.map((dest) => (
                <div
                  key={dest.id}
                  className="editorial-card-light rounded-3xl overflow-hidden flex flex-col justify-between group bg-white"
                >
                  <div className="relative h-60 w-full overflow-hidden bg-neutral-900">
                    <AviationImage
                      src={dest.image}
                      alt={dest.name}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-500"
                      fallbackTitle={dest.name}
                      fallbackCode={`DEST // ${dest.airportCode}`}
                    />
                    <div className="absolute top-4 left-4 bg-white/95 text-neutral-900 backdrop-blur-md border border-neutral-200 px-3.5 py-1 rounded-full text-[10px] font-mono font-bold z-10 shadow-sm">
                      {dest.airportCode}
                    </div>
                    <div className="absolute top-4 right-4 bg-neutral-900 text-amber-400 px-3.5 py-1 rounded-full text-[10px] font-mono font-bold z-10 shadow-sm">
                      {dest.category}
                    </div>
                  </div>

                  <div className="p-8 flex flex-col justify-between gap-6 flex-1">
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono text-amber-600 uppercase tracking-widest block font-bold">
                        {dest.region} • {dest.country}
                      </span>
                      <h3 className="text-2xl font-light text-neutral-900 group-hover:text-amber-600 transition font-sans">
                        {dest.name}
                      </h3>
                      <p className="text-xs text-neutral-600 font-sans line-clamp-2 leading-relaxed">
                        {dest.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-neutral-100 font-mono text-xs space-y-2 text-neutral-700">
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Flight Time (LRBS):</span>
                        <span className="text-amber-600 font-bold">{dest.estimatedFlightFromLRBS}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Fleet Class:</span>
                        <span className="text-neutral-900 font-bold truncate max-w-[160px]">{dest.recommendedCategory}</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        fullWidth
                        asChild
                        className="border-neutral-200 hover:border-amber-500"
                      >
                        <Link href={`/destinations/${dest.slug}`}>
                          VIEW DESTINATION DOSSIER →
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
