import React from "react";
import Link from "next/link";
import { Container } from "../../components/layout/Container";
import { SectionHeader } from "../../components/shared/SectionHeader";
import { DataStatusBadge } from "../../components/shared/DataStatusBadge";
import { ProvenanceBadge } from "../../components/shared/ProvenanceBadge";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { LUXURY_DESTINATIONS } from "../../data/real/destinations";
import { AviationImage } from "../../components/AviationImage";
import { DestinationExplorer } from "../../components/destinations/DestinationExplorer";

export const metadata = {
  title: "Global Luxury Destinations & Route Intelligence | AIR",
  description:
    "Explore premier private jet destinations—Maldives, Seychelles, St. Barth, Mauritius, Ibiza, Mykonos, Cannes, Dubai, and French Riviera—matched to aircraft categories and flight telemetry from Bucharest Băneasa (LRBS).",
};

const BUCHAREST_ROUTES = [
  { origin: "BUCHAREST / LRBS", dest: "MALDIVES / MLE", dist: "3,820 NM", time: "8h 30m", ac: "Heavy Jet", prov: "AIR CALCULATED", img: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80" },
  { origin: "BUCHAREST / LRBS", dest: "SEYCHELLES / SEZ", dist: "3,950 NM", time: "9h 00m", ac: "Intercontinental Jet", prov: "AIR CALCULATED", img: "https://images.unsplash.com/photo-1589553460732-58ef7a71fbb5?auto=format&fit=crop&w=800&q=80" },
  { origin: "BUCHAREST / LRBS", dest: "ST. BARTH / SBH", dist: "5,100 NM", time: "11h 45m", ac: "Heavy Jet + STOL", prov: "AIR CALCULATED", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80" },
  { origin: "BUCHAREST / LRBS", dest: "NICE / LFMN", dist: "890 NM", time: "2h 35m", ac: "Light Jet", prov: "AIR CALCULATED", img: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80" },
  { origin: "BUCHAREST / LRBS", dest: "MYKONOS / JMK", dist: "480 NM", time: "1h 40m", ac: "Light Jet / Turboprop", prov: "AIR CALCULATED", img: "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?auto=format&fit=crop&w=800&q=80" },
  { origin: "BUCHAREST / LRBS", dest: "DUBAI / OMDW", dist: "1,850 NM", time: "4h 50m", ac: "Super Midsize Jet", prov: "AIR CALCULATED", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80" },
];

export default function DestinationsPage() {
  return (
    <div className="w-full py-16 bg-neutral-950 flex-1 flex flex-col gap-16 text-neutral-100 font-sans">
      {/* Header */}
      <Container size="wide">
        <div className="flex flex-col gap-6 border-b border-neutral-800 pb-8">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded border border-amber-500/20 font-bold">
              GLOBAL DISPATCH // DEPARTURE WORLD
            </span>
            <DataStatusBadge status="OFFICIAL_SOURCE" />
          </div>

          <SectionHeader
            title="THE WORLD IS YOUR DEPARTURE BOARD."
            description="AIR connects Bucharest Băneasa (LRBS / BBU) and European executive hubs to premier global luxury island sanctuaries, Mediterranean coastlines, and financial capitals."
            titleAs="h1"
          />
        </div>
      </Container>

      {/* 1. Interactive Departure Board & Map Explorer */}
      <Container size="wide">
        <DestinationExplorer />
      </Container>

      {/* 2. PARADISE BY AIR — Luxury Tropical & Island Destinations */}
      <Container size="wide">
        <div className="flex flex-col gap-8 pt-8 border-t border-neutral-800">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest">
                  PARADISE BY AIR // TROPICAL & ISLAND SANCTUARIES
                </span>
                <ProvenanceBadge status="VERIFIED" />
              </div>
              <h2 className="text-3xl font-light text-white font-sans">
                PARADISE BY AIR<span className="text-amber-400">.</span>
              </h2>
              <p className="text-xs text-neutral-400 font-mono">
                Direct long-range private jet access and luxury intermodal transfers across the World&apos;s most exclusive islands.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {LUXURY_DESTINATIONS.map((dest) => (
              <Card key={dest.id} variant="surface" className="flex flex-col justify-between overflow-hidden group hover:border-amber-400/50 transition-all duration-300 p-0 rounded-2xl">
                <div className="relative h-64 w-full overflow-hidden bg-neutral-900">
                  <AviationImage
                    src={dest.image}
                    alt={dest.name}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                    fallbackTitle={dest.name}
                    fallbackCode={`DEST // ${dest.airportCode}`}
                  />
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[10px] font-data text-amber-400 font-semibold z-10">
                    {dest.airportCode}
                  </div>
                  <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[10px] font-data text-white z-10">
                    {dest.category}
                  </div>
                </div>

                <div className="p-6 flex flex-col justify-between gap-6 flex-1">
                  <div className="space-y-3">
                    <span className="text-[10px] font-data text-amber-400 uppercase tracking-widest block font-semibold">
                      {dest.region} • {dest.country}
                    </span>
                    <h3 className="text-2xl font-light text-white group-hover:text-amber-300 transition">
                      {dest.name}
                    </h3>
                    <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed font-sans">
                      {dest.tagline}
                    </p>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-white/10 font-data text-xs">
                    <div className="flex justify-between">
                      <span className="text-[var(--color-text-muted)]">From Bucharest (LRBS):</span>
                      <span className="text-amber-300 font-bold">{dest.estimatedFlightFromLRBS}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--color-text-muted)]">Recommended Jet:</span>
                      <span className="text-white">{dest.recommendedCategory}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--color-text-muted)]">Last 50 Miles Transfer:</span>
                      <span className="text-neutral-400 text-[11px]">{dest.transferType}</span>
                    </div>

                    <Link href={`/destinations/${dest.slug}`} className="pt-2 block">
                      <Button variant="outline" size="sm" fullWidth className="font-data text-xs">
                        INSPECT DISPATCH SPECS →
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Container>

      {/* 3. FROM BUCHAREST, ANYWHERE — Route Intelligence */}
      <Container size="wide">
        <div className="flex flex-col gap-8 pt-8 border-t border-white/10">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-xs font-data text-amber-400 font-semibold uppercase tracking-widest">
                BUCHAREST DISPATCH VECTOR // LRBS / BBU
              </span>
              <ProvenanceBadge status="AIR_CALCULATED" />
            </div>
            <h2 className="text-3xl font-light text-white font-sans">
              FROM BUCHAREST, ANYWHERE<span className="text-amber-400">.</span>
            </h2>
            <p className="text-xs text-[var(--color-text-secondary)] font-data max-w-3xl">
              Calculated flight durations, air distances, and recommended jet categories originating from Bucharest Băneasa Executive Terminal (LRBS / BBU).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BUCHAREST_ROUTES.map((route, i) => (
              <Card key={i} variant="surface" className="p-6 flex flex-col justify-between gap-6 group hover:border-amber-400/50 transition-all duration-300 rounded-2xl">
                <div className="relative h-48 w-full rounded-xl overflow-hidden bg-neutral-900">
                  <AviationImage src={route.img} alt={route.dest} fill className="object-cover group-hover:scale-105 transition duration-500" fallbackTitle={route.dest} fallbackCode="ROUTE // LRBS" />
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[10px] font-data text-amber-400 font-semibold z-10">
                    {route.dest}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs font-data border-b border-white/10 pb-2">
                    <span className="text-white font-bold">{route.origin}</span>
                    <span className="text-amber-400">→</span>
                    <span className="text-white font-bold">{route.dest}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs font-data">
                    <div>
                      <span className="text-[10px] text-[var(--color-text-muted)] uppercase block">AIR DISTANCE</span>
                      <span className="text-white font-bold">{route.dist}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[var(--color-text-muted)] uppercase block">EST. FLIGHT TIME</span>
                      <span className="text-amber-300 font-bold">{route.time}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-[10px] text-[var(--color-text-muted)] uppercase block">RECOMMENDED FLEET</span>
                      <span className="text-neutral-300">{route.ac}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex justify-between items-center text-[10px] font-data text-[var(--color-text-muted)]">
                  <span>PROVENANCE: {route.prov}</span>
                  <Link href="/plan" className="text-amber-400 hover:underline font-bold">
                    REQUEST FLIGHT ↗
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
