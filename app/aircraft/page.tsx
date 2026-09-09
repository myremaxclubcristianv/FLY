import React from "react";
import Link from "next/link";
import { Container } from "../../components/layout/Container";
import { SectionHeader } from "../../components/shared/SectionHeader";
import { DataStatusBadge } from "../../components/shared/DataStatusBadge";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { AircraftMatcher } from "../../components/aircraft/AircraftMatcher";
import { UnifiedAviationRepository } from "../../lib/repositories/unified-aviation-repo";
import { AviationImage } from "../../components/AviationImage";


export const metadata = {
  title: "Aircraft Explorer & Category Intelligence | AIR",
  description:
    "Explore aircraft categories—very light jets, light jets, midsize, super-midsize, large cabin jets, turboprops, and helicopters—matched to mission performance parameters.",
};

const MODEL_IMAGES: Record<string, string> = {
  "phenom-300": "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80",
  "challenger-350": "https://images.unsplash.com/photo-1520437358207-323b43b50729?auto=format&fit=crop&w=800&q=80",
  "gulfstream-g650er": "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80",
  "pilatus-pc-12": "https://images.unsplash.com/photo-1519074069444-1ba4ea16007e?auto=format&fit=crop&w=800&q=80",
  "leonardo-aw139": "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80",
};

export default async function AircraftPage() {
  const allAircraft = await UnifiedAviationRepository.getAircraftModels();

  const categories = [
    { name: "VERY LIGHT JET", desc: "Rapid 1-2 hour European regional flights for 4-5 passengers.", range: "1,100 - 1,500 NM", seats: "4 - 5 SEATS", speed: "380 - 420 KTS", img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80" },
    { name: "LIGHT JET", desc: "Efficient European travel connecting small & major airports.", range: "1,400 - 2,200 NM", seats: "6 - 8 SEATS", speed: "420 - 464 KTS", img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80" },
    { name: "MIDSIZE JET", desc: "Transcontinental endurance with stand-up cabin comfort.", range: "2,500 - 3,400 NM", seats: "8 - 9 SEATS", speed: "440 - 470 KTS", img: "https://images.unsplash.com/photo-1520437358207-323b43b50729?auto=format&fit=crop&w=800&q=80" },
    { name: "SUPER MIDSIZE JET", desc: "Flat-floor standup cabins with trans-Atlantic & Middle East reach.", range: "3,200 - 4,000 NM", seats: "9 - 12 SEATS", speed: "470 - 485 KTS", img: "https://images.unsplash.com/photo-1520437358207-323b43b50729?auto=format&fit=crop&w=800&q=80" },
    { name: "LARGE CABIN JET", desc: "Non-stop intercontinental global capability with multi-living zones.", range: "6,000 - 7,700 NM", seats: "12 - 19 SEATS", speed: "490 - 516 KTS", img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80" },
    { name: "TURBOPROP", desc: "Short-field regional airfield access with low operating economics.", range: "1,100 - 1,800 NM", seats: "6 - 9 SEATS", speed: "290 - 330 KTS", img: "https://images.unsplash.com/photo-1519074069444-1ba4ea16007e?auto=format&fit=crop&w=800&q=80" },
    { name: "HELICOPTER", desc: "Point-to-point direct helipad access bypassing airport runways.", range: "300 - 570 NM", seats: "5 - 8 SEATS", speed: "135 - 165 KTS", img: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80" },
  ];

  return (
    <div className="w-full py-16 bg-[var(--color-bg-primary)] flex-1 flex flex-col gap-16">
      <Container size="wide">
        <div className="flex flex-col gap-16">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[var(--color-border)] pb-8">
            <div className="flex flex-col gap-4 max-w-3xl">
              <div className="flex items-center gap-3">
                <span className="text-xs font-data text-[var(--color-accent)] uppercase tracking-widest">
                  WORLD // 04 AIRCRAFT INTELLIGENCE
                </span>
                <DataStatusBadge status="OFFICIAL_SOURCE" />
              </div>

              <SectionHeader
                title="AIRCRAFT FLEET MODEL INTELLIGENCE."
                description="AIR translates complex aircraft manufacturer performance metrics—range envelopes, takeoff distance, cabin dimensions, cruise speeds, and mission profiles—into actionable aviation decisions."
                titleAs="h1"
              />
            </div>

            <Link href="/aircraft/compare">
              <Button variant="primary" size="lg" className="whitespace-nowrap">
                COMPARE AIRCRAFT MODELS →
              </Button>
            </Link>
          </div>

          {/* Interactive Aircraft Matcher */}
          <AircraftMatcher />

          {/* Categories Summary */}
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] pb-4">
              <h2 className="text-2xl font-light text-[var(--color-text-primary)]">
                AIRCRAFT CATEGORIES
              </h2>
              <span className="text-xs font-data text-[var(--color-text-muted)]">
                7 CATEGORIES DEFINED
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat) => (
                <Card key={cat.name} variant="surface" className="flex flex-col justify-between overflow-hidden group hover:border-amber-500/50 transition">
                  <div className="relative h-44 w-full bg-neutral-900 overflow-hidden">
                    <AviationImage src={cat.img} alt={cat.name} fill className="object-cover group-hover:scale-105 transition duration-500" fallbackTitle={cat.name} fallbackCode={`CAT // ${cat.name}`} />
                    <div className="absolute top-3 left-3 bg-neutral-950/80 backdrop-blur px-2.5 py-1 rounded text-[10px] font-mono text-amber-400 font-bold z-10">
                      {cat.name}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col justify-between gap-6 flex-1">
                    <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                      {cat.desc}
                    </p>

                    <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[var(--color-border-subtle)] text-[10px] font-data text-[var(--color-text-muted)]">
                      <div>
                        <span className="block text-[8px] uppercase">RANGE</span>
                        <span className="text-[var(--color-text-primary)] font-medium">{cat.range}</span>
                      </div>
                      <div>
                        <span className="block text-[8px] uppercase">SEATS</span>
                        <span className="text-[var(--color-text-primary)] font-medium">{cat.seats}</span>
                      </div>
                      <div>
                        <span className="block text-[8px] uppercase">SPEED</span>
                        <span className="text-[var(--color-text-primary)] font-medium">{cat.speed}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* All Verified Aircraft Models List */}
          <div className="flex flex-col gap-8 pt-8 border-t border-[var(--color-border)]">
            <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] pb-4">
              <h2 className="text-2xl font-light text-[var(--color-text-primary)]">
                VERIFIED FLEET MODELS ({allAircraft.length})
              </h2>
              <span className="text-xs font-data text-[var(--color-accent)]">
                MANUFACTURER VERIFIED DATASETS
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allAircraft.map((ac) => {
                const img = MODEL_IMAGES[ac.slug] || "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80";
                return (
                  <Card key={ac.id} variant="default" className="flex flex-col justify-between overflow-hidden group hover:border-amber-500/50 transition">
                    <div className="relative h-48 w-full bg-neutral-900 overflow-hidden">
                      <AviationImage src={img} alt={`${ac.manufacturer} ${ac.model}`} fill className="object-cover group-hover:scale-105 transition duration-500" fallbackTitle={`${ac.manufacturer} ${ac.model}`} fallbackCode={`FLEET // ${ac.model}`} />
                      <div className="absolute top-3 right-3 bg-neutral-950/80 backdrop-blur border border-neutral-800 px-2.5 py-1 rounded text-[10px] font-mono text-amber-400 font-bold z-10">
                        {ac.category.replace(/_/g, " ")}
                      </div>
                    </div>

                    <div className="p-6 flex flex-col justify-between gap-4 flex-1">
                      <div className="flex flex-col gap-2">
                        <h3 className="text-xl font-light text-[var(--color-text-primary)] group-hover:text-amber-300 transition">
                          {ac.manufacturer} {ac.model}
                        </h3>

                        <p className="text-xs text-[var(--color-text-secondary)] line-clamp-2">
                          {ac.cabinHighlights}
                        </p>
                      </div>

                      <div className="flex flex-col gap-4 pt-4 border-t border-[var(--color-border-subtle)] font-data text-xs">
                        <div className="grid grid-cols-3 gap-2 text-[10px] text-[var(--color-text-muted)]">
                          <div>
                            <span className="block uppercase text-[8px]">PASSENGERS</span>
                            <span className="text-[var(--color-text-primary)] font-medium">{ac.passengerCapacity} SEATS</span>
                          </div>
                          <div>
                            <span className="block uppercase text-[8px]">MAX RANGE</span>
                            <span className="text-[var(--color-text-primary)] font-medium">{ac.approximateRange} NM</span>
                          </div>
                          <div>
                            <span className="block uppercase text-[8px]">CRUISE</span>
                            <span className="text-[var(--color-text-primary)] font-medium">{ac.typicalCruiseSpeed} KTS</span>
                          </div>
                        </div>

                        <Link href={`/aircraft/${ac.slug}`}>
                          <Button variant="outline" size="sm" className="w-full text-center justify-center">
                            VIEW AIRCRAFT SPECS →
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
