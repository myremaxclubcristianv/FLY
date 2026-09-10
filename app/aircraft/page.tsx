import React from "react";
import Link from "next/link";
import { Container } from "../../components/layout/Container";
import { DataStatusBadge } from "../../components/shared/DataStatusBadge";
import { Button } from "../../components/ui/Button";
import { AircraftMatcher } from "../../components/aircraft/AircraftMatcher";
import { UnifiedAviationRepository } from "../../lib/repositories/unified-aviation-repo";
import { AviationImage } from "../../components/AviationImage";

export const metadata = {
  title: "Aircraft Explorer & Category Intelligence | AIR",
  description:
    "Explore aircraft categories—very light jets, light jets, midsize, super-midsize, large cabin jets, turboprops, and helicopters—matched to mission performance parameters.",
};

const CHAPTERS = [
  {
    category: "VERY LIGHT JET",
    tagline: "The nimble European regional sprint.",
    headline: "CITATION M2 & PHENOM 100",
    description: "Built for agile 1-2 hour missions connecting regional airfields directly to major business capitals without commercial congestion.",
    range: "1,100 - 1,500 NM",
    speed: "380 - 420 KTAS",
    capacity: "4 - 5 PASSENGERS",
    aspect: "16:9",
    featuredSlug: "phenom-100",
    image: "https://images.unsplash.com/photo-1559297434-fae8a1916a79?auto=format&fit=crop&w=1600&q=85",
    models: ["Phenom 100", "Citation M2", "Cirrus Vision Jet", "HondaJet HA-420"],
  },
  {
    category: "LIGHT JET",
    tagline: "The benchmark for European continental speed and efficiency.",
    headline: "PHENOM 300E & CITATION CJ4",
    description: "The small jet that doesn't feel small. Direct flights from Bucharest to Paris, London, Nice, or Geneva with best-in-class cruise speed and spacious oval cabin.",
    range: "1,400 - 2,200 NM",
    speed: "420 - 464 KTAS",
    capacity: "6 - 8 PASSENGERS",
    aspect: "4:3",
    featuredSlug: "phenom-300",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1600&q=85",
    models: ["Phenom 300E", "Citation CJ4"],
  },
  {
    category: "MIDSIZE JET",
    tagline: "Transcontinental endurance with stand-up cabin comfort.",
    headline: "CITATION LATITUDE & HAWKER 900XP",
    description: "Generous flat-floor standup cabins engineered for multi-passenger cross-European missions with private lavatories and generous baggage capacity.",
    range: "2,500 - 3,400 NM",
    speed: "440 - 470 KTAS",
    capacity: "8 - 9 PASSENGERS",
    aspect: "16:9",
    featuredSlug: "citation-latitude",
    image: "https://images.unsplash.com/photo-1520437358207-323b43b50729?auto=format&fit=crop&w=1600&q=85",
    models: ["Citation Latitude", "Praetor 500", "Hawker 900XP"],
  },
  {
    category: "SUPER MIDSIZE JET",
    tagline: "Transcontinental non-stop power with lowest cabin altitude.",
    headline: "PRAETOR 600 & CHALLENGER 350",
    description: "Connecting Bucharest directly to Dubai, Riyadh, or trans-Atlantic gateways with full-flat double-berth beds, whisper acoustics, and Ka-band connectivity.",
    range: "3,200 - 4,018 NM",
    speed: "466 - 485 KTAS",
    capacity: "9 - 12 PASSENGERS",
    aspect: "4:3",
    featuredSlug: "praetor-600",
    image: "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&w=1600&q=85",
    models: ["Praetor 600", "Challenger 350", "Challenger 3500", "Citation Longitude"],
  },
  {
    category: "LARGE CABIN JET",
    tagline: "Intercontinental flagships connecting hemispheres at Mach 0.90.",
    headline: "GULFSTREAM G650ER & BOMBARDIER GLOBAL",
    description: "Four distinct living zones, master staterooms, dedicated crew rest compartments, and 7,500 NM nonstop capability connecting Bucharest to Singapore, Tokyo, or Los Angeles.",
    range: "6,000 - 7,700 NM",
    speed: "490 - 516 KTAS",
    capacity: "12 - 19 PASSENGERS",
    aspect: "16:9",
    featuredSlug: "gulfstream-g650er",
    image: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=1600&q=85",
    models: ["Gulfstream G650ER", "Gulfstream G700", "Global 6500", "Falcon 8X"],
  },
  {
    category: "TURBOPROP",
    tagline: "Short-field access with unmatched regional efficiency.",
    headline: "PILATUS PC-12 & KING AIR 350i",
    description: "The Swiss army knife of aviation. Access unpaved mountain strips, grass airfields, and regional airports where private jets cannot land, with generous cargo doors.",
    range: "1,100 - 1,800 NM",
    speed: "290 - 330 KTAS",
    capacity: "6 - 9 PASSENGERS",
    aspect: "4:3",
    featuredSlug: "pilatus-pc-12",
    image: "https://images.unsplash.com/photo-1474302770737-173ee21bab63?auto=format&fit=crop&w=1600&q=85",
    models: ["Pilatus PC-12", "Daher TBM 960", "King Air 350i"],
  },
  {
    category: "HELICOPTER",
    tagline: "Point-to-point transfers bypassing airport runways entirely.",
    headline: "AGUSTA AW139 & AIRBUS H145",
    description: "Twin-turbine executive helicopters delivering direct rooftop, helipad, yacht, and mountain access with VIP leather club seating and all-weather avionics.",
    range: "300 - 570 NM",
    speed: "135 - 165 KTAS",
    capacity: "5 - 8 PASSENGERS",
    aspect: "16:9",
    featuredSlug: "leonardo-aw139",
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1600&q=85",
    models: ["Leonardo AW139", "Airbus H145", "Airbus H125"],
  },
];

const MODEL_IMAGES: Record<string, string> = {
  "phenom-300": "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80",
  "phenom-100": "https://images.unsplash.com/photo-1559297434-fae8a1916a79?auto=format&fit=crop&w=800&q=80",
  "cirrus-vision-jet": "https://images.unsplash.com/photo-1474302770737-173ee21bab63?auto=format&fit=crop&w=800&q=80",
  "hondajet-ha420": "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80",
  "citation-m2": "https://images.unsplash.com/photo-1559297434-fae8a1916a79?auto=format&fit=crop&w=800&q=80",
  "citation-cj4": "https://images.unsplash.com/photo-1520437358207-323b43b50729?auto=format&fit=crop&w=800&q=80",
  "citation-latitude": "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&w=800&q=80",
  "praetor-500": "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80",
  "hawker-900xp": "https://images.unsplash.com/photo-1520437358207-323b43b50729?auto=format&fit=crop&w=800&q=80",
  "challenger-350": "https://images.unsplash.com/photo-1520437358207-323b43b50729?auto=format&fit=crop&w=800&q=80",
  "challenger-3500": "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&w=800&q=80",
  "citation-longitude": "https://images.unsplash.com/photo-1559297434-fae8a1916a79?auto=format&fit=crop&w=800&q=80",
  "praetor-600": "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80",
  "gulfstream-g650er": "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=800&q=80",
  "gulfstream-g700": "https://images.unsplash.com/photo-1559297434-fae8a1916a79?auto=format&fit=crop&w=800&q=80",
  "global-6500": "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&w=800&q=80",
  "dassault-falcon-8x": "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80",
  "pilatus-pc-12": "https://images.unsplash.com/photo-1474302770737-173ee21bab63?auto=format&fit=crop&w=800&q=80",
  "daher-tbm-960": "https://images.unsplash.com/photo-1474302770737-173ee21bab63?auto=format&fit=crop&w=800&q=80",
  "king-air-350i": "https://images.unsplash.com/photo-1474302770737-173ee21bab63?auto=format&fit=crop&w=800&q=80",
  "leonardo-aw139": "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80",
  "airbus-h145": "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80",
  "airbus-h125": "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80",
};

export default async function AircraftPage() {
  const allAircraft = await UnifiedAviationRepository.getAircraftModels();

  return (
    <div className="w-full bg-white text-neutral-900 font-sans flex-1 flex flex-col">
      {/* 01 — HERO / EDITORIAL HEADER (Pure White Luxury) */}
      <section className="w-full py-24 sm:py-32 border-b border-neutral-200/80 bg-white">
        <Container size="wide">
          <div className="flex flex-col gap-10 max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-4 max-w-3xl">
                <div className="flex items-center gap-3">
                  <span className="editorial-tag-dark">
                    AIRCRAFT SHOWROOM // 07 CHAPTERS
                  </span>
                  <DataStatusBadge status="OFFICIAL_SOURCE" />
                </div>
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-neutral-900 leading-[1.05] font-sans">
                  AIRCRAFT, WITHOUT THE NOISE<span className="text-amber-600">.</span>
                </h1>
                <p className="text-lg sm:text-xl text-neutral-600 font-light leading-relaxed">
                  Manufacturer-verified specifications, cabin dimensions, runway performance, and mission suitability profiles across 23 private aircraft models.
                </p>
              </div>

              <Link href="/aircraft/compare">
                <Button variant="outline" size="lg" className="whitespace-nowrap border-neutral-300 text-neutral-900 hover:bg-neutral-100">
                  COMPARE AIRCRAFT MODELS →
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* 02 — MISSION MATCHER (Light Instrument) */}
      <section className="w-full py-20 bg-[#fafaf7] border-b border-neutral-200/80">
        <Container size="wide">
          <div className="max-w-6xl mx-auto">
            <AircraftMatcher />
          </div>
        </Container>
      </section>

      {/* 03 — CHAPTER-BY-CHAPTER PHOTOGRAPHIC SHOWROOM */}
      <section className="w-full py-28 sm:py-36 bg-white border-b border-neutral-200/80">
        <Container size="wide">
          <div className="flex flex-col gap-32 max-w-6xl mx-auto">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <span className="editorial-tag-dark">
                THE 7 AIRCRAFT CHAPTERS
              </span>
              <h2 className="text-4xl sm:text-5xl font-light text-neutral-900 font-sans">
                Curated by Mission Performance
              </h2>
              <p className="text-base text-neutral-600 font-light">
                From 4-passenger regional turboprops to Mach 0.90 intercontinental flagships, understand exactly which aircraft fulfills your itinerary.
              </p>
            </div>

            {CHAPTERS.map((ch, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={ch.category}
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center ${
                    isEven ? "" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Visual Photography Column */}
                  <div className={`lg:col-span-7 ${isEven ? "" : "lg:order-2"}`}>
                    <div className="relative h-[380px] sm:h-[480px] w-full rounded-3xl overflow-hidden shadow-2xl border border-neutral-200 group bg-neutral-900">
                      <AviationImage
                        src={ch.image}
                        alt={`${ch.category} Aircraft`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-1000"
                        fallbackTitle={ch.category}
                        fallbackCode={`SHOWROOM // ${ch.category}`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end z-10 text-white">
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider block">
                            {`CHAPTER 0${idx + 1} // ${ch.category}`}
                          </span>
                          <span className="text-xl sm:text-2xl font-light font-sans">{ch.headline}</span>
                        </div>
                        <span className="text-xs font-mono text-neutral-300 bg-black/60 px-3.5 py-1.5 rounded-full border border-white/20 backdrop-blur-md">
                          {ch.speed}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Editorial Text & Specs Column */}
                  <div className={`lg:col-span-5 space-y-6 ${isEven ? "" : "lg:order-1"}`}>
                    <div className="space-y-3">
                      <span className="text-xs font-mono text-amber-600 font-bold uppercase tracking-widest block">
                        CATEGORY 0{idx + 1}
                      </span>
                      <h3 className="text-3xl sm:text-4xl font-light text-neutral-900 font-sans leading-tight">
                        {ch.category}
                      </h3>
                      <p className="text-sm font-sans text-neutral-500 italic">
                        &ldquo;{ch.tagline}&rdquo;
                      </p>
                      <p className="text-sm text-neutral-700 leading-relaxed font-sans pt-1">
                        {ch.description}
                      </p>
                    </div>

                    {/* Specifications Ribbon */}
                    <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-[#fafaf7] border border-neutral-200/80 font-mono text-xs">
                      <div>
                        <span className="text-[9px] text-neutral-500 block uppercase font-bold">RANGE</span>
                        <span className="text-amber-600 font-bold">{ch.range}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-neutral-500 block uppercase font-bold">SPEED</span>
                        <span className="text-neutral-900 font-bold">{ch.speed}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-neutral-500 block uppercase font-bold">SEATS</span>
                        <span className="text-neutral-900 font-bold">{ch.capacity}</span>
                      </div>
                    </div>

                    {/* Available Models Tags */}
                    <div className="space-y-2 pt-2">
                      <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block font-bold">
                        VERIFIED FLEET MODELS:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {ch.models.map((m) => (
                          <span
                            key={m}
                            className="text-xs font-mono px-3 py-1 bg-white border border-neutral-200 rounded-full text-neutral-700"
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3">
                      <Button variant="primary" size="md" asChild className="px-8 shadow-md">
                        <Link href={`/aircraft/${ch.featuredSlug}`}>
                          VIEW {ch.category} DOSSIER →
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 04 — COMPLETE VERIFIED CATALOG (Light Clean Grid) */}
      <section className="w-full py-28 sm:py-36 bg-[#fafaf7] border-b border-neutral-200/80">
        <Container size="wide">
          <div className="flex flex-col gap-16 max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-200 pb-8">
              <div className="space-y-4">
                <span className="editorial-tag-dark">
                  FULL FLEET CATALOGUE // {allAircraft.length} AIRCRAFT
                </span>
                <h2 className="text-4xl sm:text-5xl font-light text-neutral-900 font-sans">
                  All Manufacturer Verified Models
                </h2>
                <p className="text-base text-neutral-600 font-light">
                  Inspect verified passenger capacities, maximum ranges, and cruise speeds.
                </p>
              </div>

              <Link href="/plan">
                <Button variant="primary" size="lg" className="whitespace-nowrap px-8">
                  PLAN CUSTOM MISSION →
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allAircraft.map((ac) => {
                const img =
                  MODEL_IMAGES[ac.slug] ||
                  "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80";
                return (
                  <div
                    key={ac.id}
                    className="editorial-card-light rounded-3xl overflow-hidden flex flex-col justify-between group bg-white"
                  >
                    <div className="relative h-56 w-full bg-neutral-100 overflow-hidden">
                      <AviationImage
                        src={img}
                        alt={`${ac.manufacturer} ${ac.model}`}
                        fill
                        className="object-cover group-hover:scale-105 transition duration-500"
                        fallbackTitle={`${ac.manufacturer} ${ac.model}`}
                        fallbackCode={`FLEET // ${ac.model}`}
                      />
                      <div className="absolute top-4 right-4 bg-white/95 text-neutral-900 backdrop-blur-md border border-neutral-200 px-3 py-1 rounded-full text-[10px] font-mono font-bold z-10 shadow-sm">
                        {ac.category.replace(/_/g, " ")}
                      </div>
                    </div>

                    <div className="p-8 space-y-5 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-neutral-500 uppercase font-bold">
                            {ac.manufacturer}
                          </span>
                          <DataStatusBadge status={ac.dataStatus} />
                        </div>
                        <h3 className="text-2xl font-light text-neutral-900 group-hover:text-amber-600 transition font-sans">
                          {ac.model}
                        </h3>
                        <p className="text-xs text-neutral-600 font-sans line-clamp-2 leading-relaxed">
                          {ac.cabinHighlights}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-neutral-100 font-mono text-xs space-y-2 text-neutral-700">
                        <div className="flex justify-between">
                          <span className="text-neutral-500">Max Range:</span>
                          <span className="text-amber-600 font-bold">{ac.approximateRange} NM</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-500">Cruise Speed:</span>
                          <span className="text-neutral-900 font-bold">{ac.typicalCruiseSpeed} KTAS</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-500">Capacity:</span>
                          <span className="text-neutral-900 font-bold">{ac.passengerCapacity} Seats</span>
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
                          <Link href={`/aircraft/${ac.slug}`}>
                            VIEW DOSSIER & SPECS →
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
