import React from "react";
import Link from "next/link";
import { Container } from "../components/layout/Container";
import { Hero } from "../components/home/Hero";
import { FlightSearchForm } from "../components/home/FlightSearchForm";
import { ProvenanceBadge } from "../components/shared/ProvenanceBadge";
import { Button } from "../components/ui/Button";
import { UnifiedAviationRepository } from "../lib/repositories/unified-aviation-repo";
import { AviationImage } from "../components/AviationImage";
import { DestinationExplorer } from "../components/destinations/DestinationExplorer";

import {
  AIRCRAFT_MODEL_PHOTOS,
  EDITORIAL_ATMOSPHERE,
} from "../data/real/aviation-photos";

export const metadata = {
  title: "AIR — The Easiest Way to Fly | Luxury Private Aviation & Intelligence",
  description:
    "Explore the world of flight: private jets, turboprops, helicopters, certified airports, aircraft marketplace for sale, flight schools, and aviation regulations.",
  alternates: {
    canonical: "/",
  },
};

const CITY_STRIP = [
  { city: "BUCHAREST", airport: "LRBS — Băneasa Executive", route: "LRBS ORIGIN", country: "Romania", image: "https://images.unsplash.com/photo-1520690214124-2405c5217036?auto=format&fit=crop&w=800&q=80", slug: "baneasa" },
  { city: "PARIS", airport: "LFPB — Le Bourget", route: "LRBS → LFPB • 2h 55m", country: "France", image: "https://images.unsplash.com/photo-1520437358207-323b43b50729?auto=format&fit=crop&w=800&q=80", slug: "destinations" },
  { city: "NICE", airport: "LFMN — Côte d'Azur", route: "LRBS → LFMN • 2h 35m", country: "France", image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80", slug: "destinations" },
  { city: "GENEVA", airport: "LSGG — Cointrin", route: "LRBS → LSGG • 2h 40m", country: "Switzerland", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80", slug: "destinations" },
  { city: "MYKONOS", airport: "LGMK — Island Terminal", route: "LRBS → LGMK • 1h 35m", country: "Greece", image: "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?auto=format&fit=crop&w=800&q=80", slug: "destinations" },
  { city: "ROME", airport: "LIRA — Ciampino", route: "LRBS → LIRA • 2h 05m", country: "Italy", image: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=800&q=80", slug: "destinations" },
  { city: "DUBAI", airport: "OMDW — Al Maktoum", route: "LRBS → OMDW • 4h 50m", country: "UAE", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80", slug: "destinations" },
  { city: "LONDON", airport: "EGLF — Farnborough", route: "LRBS → EGLF • 3h 15m", country: "United Kingdom", image: "https://images.unsplash.com/photo-1474302770737-173ee21bab63?auto=format&fit=crop&w=800&q=80", slug: "destinations" },
];

const AIR_RECOMMENDS = [
  {
    name: "Phenom 300E",
    manufacturer: "Embraer",
    category: "LIGHT JET",
    slug: "phenom-300",
    image: AIRCRAFT_MODEL_PHOTOS["phenom-300"].hero,
    passengers: "7 PASSENGERS",
    speed: "464 KTAS",
    range: "2,010 NM",
    mission: "European city pairs (Bucharest to Paris, London, Nice, or Geneva)",
    reason: "Fast, efficient, and undisputed class leader for European regional hops with stand-out agility.",
  },
  {
    name: "Praetor 600",
    manufacturer: "Embraer",
    category: "SUPER MIDSIZE JET",
    slug: "praetor-600",
    image: AIRCRAFT_MODEL_PHOTOS["praetor-600"].hero,
    passengers: "9 - 12 PASSENGERS",
    speed: "466 KTAS",
    range: "4,018 NM",
    mission: "Transcontinental & Middle East routes (Bucharest to Dubai, Riyadh, New York)",
    reason: "Stand-up flat-floor luxury with true intercontinental non-stop range and lowest cabin altitude.",
  },
  {
    name: "Challenger 350",
    manufacturer: "Bombardier",
    category: "SUPER MIDSIZE JET",
    slug: "challenger-350",
    image: AIRCRAFT_MODEL_PHOTOS["challenger-350"].hero,
    passengers: "9 PASSENGERS",
    speed: "470 KTAS",
    range: "3,200 NM",
    mission: "Cross-continental corporate missions with maximum cabin width",
    reason: "Unmatched cabin width, whisper-quiet acoustics, and proven trans-European reliability.",
  },
  {
    name: "Gulfstream G650ER",
    manufacturer: "Gulfstream",
    category: "LARGE CABIN JET",
    slug: "gulfstream-g650er",
    image: AIRCRAFT_MODEL_PHOTOS["gulfstream-g650er"].hero,
    passengers: "14 - 19 PASSENGERS",
    speed: "516 KTAS",
    range: "7,500 NM",
    mission: "Global non-stop missions (Bucharest to Tokyo, Singapore, Los Angeles)",
    reason: "Ultra-long range flagship connecting continents at Mach 0.90 with 4 distinct living zones.",
  },
];

const EXPERIENCES = [
  {
    title: "ISLAND ESCAPES",
    tagline: "Direct runway & seaplane landing in the Mediterranean & Maldives.",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1000&q=85",
    badge: "TROPICAL // SEAPLANE",
    link: "/destinations/maldives",
  },
  {
    title: "ALPINE WEEKENDS",
    tagline: "Direct access to Samedan St. Moritz, Courchevel, and Geneva.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=85",
    badge: "ALPINE // RUNWAY",
    link: "/destinations",
  },
  {
    title: "MEDITERRANEAN COAST",
    tagline: "Fly directly into Nice Côte d'Azur, Cannes Mandelieu, or Ibiza.",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=85",
    badge: "COASTAL // FBO",
    link: "/destinations",
  },
  {
    title: "ROMANIA FROM ABOVE",
    tagline: "Danube Delta, Transylvanian Alps, and historic castle helipads.",
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1000&q=85",
    badge: "HELICOPTER // SCENIC",
    link: "/romania-from-above",
  },
];

const MASONRY_PHOTOS = [
  {
    src: "https://images.unsplash.com/photo-1587019158091-1a103c5dd17f?auto=format&fit=crop&w=1200&q=85",
    title: "Executive Jet Apron Staging",
    caption: "RAMP STAGING // LRBS",
    aspect: "col-span-12 md:col-span-7 h-96 sm:h-[480px]",
  },
  {
    src: "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=1000&q=85",
    title: "Digital Flight Deck Avionics",
    caption: "FLIGHT DECK // EASA ATPL",
    aspect: "col-span-12 md:col-span-5 h-96 sm:h-[480px]",
  },
  {
    src: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1000&q=85",
    title: "Four-Club Executive Cabin",
    caption: "CABIN // STRATOSPHERE",
    aspect: "col-span-12 md:col-span-4 h-80 sm:h-[380px]",
  },
  {
    src: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1000&q=85",
    title: "Agusta AW139 Helicopter Touchdown",
    caption: "TWIN TURBINE // HELIPAD",
    aspect: "col-span-12 md:col-span-4 h-80 sm:h-[380px]",
  },
  {
    src: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1000&q=85",
    title: "Cruising at FL410 Sunset",
    caption: "AIRBORNE // CRUISE",
    aspect: "col-span-12 md:col-span-4 h-80 sm:h-[380px]",
  },
];

export default async function HomePage() {
  const aircraftModels = await UnifiedAviationRepository.getAircraftModels();

  return (
    <div className="w-full flex flex-col bg-white text-neutral-900 font-sans">
        {/* 01 — HERO (Full Viewport Authentic Aviation Showcase - Cinematic Darkness) */}
        <Hero />

        {/* 02 — EDITORIAL INTRODUCTION (White / Ivory Editorial Masterpiece) */}
        <section className="w-full py-28 sm:py-40 bg-white border-b border-neutral-200/80">
          <Container size="wide">
            <div className="flex flex-col gap-16 max-w-6xl mx-auto">
              <div className="space-y-6">
                <span className="editorial-tag-dark">
                  EDITORIAL ESSENCE // THE PHILOSOPHY OF FLIGHT
                </span>
                <h2 className="text-4xl sm:text-6xl md:text-7xl font-light text-neutral-900 tracking-tight leading-[1.05] font-sans">
                  THE RIGHT WAY TO FLY<br />
                  <span className="text-neutral-400">STARTS WITH THE RIGHT QUESTION.</span>
                </h2>
                <p className="text-lg sm:text-2xl text-neutral-600 font-light max-w-3xl leading-relaxed">
                  Private aviation is not simply about chartering an aircraft. It is about understanding your exact mission envelope—range, passenger cabin requirements, runway length, and arrival access.
                </p>
              </div>

              {/* Massive Magazine Cover Style Aircraft Showcase */}
              <div className="relative h-[420px] sm:h-[620px] w-full rounded-3xl overflow-hidden shadow-2xl border border-neutral-200 group">
                <AviationImage
                  src={EDITORIAL_ATMOSPHERE.heroJet}
                  alt="Flagship Executive Jet Airborne Over Horizon"
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-1000"
                  fallbackTitle="Flagship Jet"
                  fallbackCode="EDITORIAL // HORIZON"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-8 left-8 right-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 text-white z-10">
                  <div className="space-y-1">
                    <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest block">
                      AIR FLAGSHIP DOSSIER // GULFSTREAM G650ER
                    </span>
                    <h3 className="text-2xl sm:text-4xl font-light font-sans">
                      Stratospheric Precision at Mach 0.90
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-neutral-300 bg-black/60 px-4 py-2 rounded-full border border-white/20 backdrop-blur-md">
                    7,500 NM INTERCONTINENTAL RANGE
                  </span>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* EDITORIAL TRANSITION — AIRCRAFT WING DISAPPEARING INTO CLOUD */}
        <section className="w-full relative h-72 sm:h-96 overflow-hidden bg-neutral-950 border-b border-white/[0.08]">
          <AviationImage
            src={EDITORIAL_ATMOSPHERE.wingOverClouds}
            alt="Aircraft Wing Disappearing into Cloud Horizon"
            fill
            className="object-cover filter brightness-90 contrast-105"
            fallbackTitle="Aircraft Wing Horizon"
            fallbackCode="ATMOSPHERE // CRUISE"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-neutral-950/40" />
          <div className="absolute bottom-6 left-8 right-8 flex justify-between items-end z-10 text-white/80 font-mono text-xs">
            <span className="bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-amber-400 font-bold">
              EN ROUTE // FL410 STRATOSPHERE
            </span>
            <span className="hidden sm:inline text-neutral-400">
              MACH 0.86 • SILENT CABIN CRUISE
            </span>
          </div>
        </section>

        {/* PAUSE SECTION 01 — THE EDITORIAL SILENCE */}
        <section className="w-full py-28 sm:py-36 bg-[#fafaf7] border-b border-neutral-200/80">
          <Container size="wide">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <span className="editorial-tag-muted">
                AIR // MISSION PHILOSOPHY
              </span>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-light text-neutral-900 font-sans tracking-tight leading-tight">
                THE BEST AIRCRAFT<br />
                <span className="text-amber-600">IS THE ONE THAT FITS THE MISSION.</span>
              </h2>
              <p className="text-base sm:text-lg text-neutral-500 font-light max-w-xl mx-auto">
                No single jet solves every journey. Speed, airfield runway length, passenger volume, and economics dictate the right choice.
              </p>
            </div>
          </Container>
        </section>

        {/* 03 — FLIGHT DECISION (White / Ivory Luxury Editorial Environment) */}
        <section className="w-full py-24 sm:py-32 bg-white border-b border-neutral-200/80">
          <Container size="wide">
            <div className="flex flex-col gap-10 max-w-6xl mx-auto">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="editorial-tag-dark">
                    MISSION DISPATCH // SECTION 03
                  </span>
                  <ProvenanceBadge status="VERIFIED" />
                </div>
                <h2 className="text-4xl sm:text-6xl font-light text-neutral-900 tracking-tight font-sans">
                  WHERE DO YOU WANT TO GO<span className="text-amber-600">?</span>
                </h2>
                <p className="text-base sm:text-lg text-neutral-600 font-light max-w-3xl leading-relaxed">
                  Tell AIR where you want to go. We find the right way to fly, calculating direct flight tracks, aircraft performance, and optimal runway access.
                </p>
              </div>

              <FlightSearchForm theme="light" />
            </div>
          </Container>
        </section>

        {/* 04 — AIR RECOMMENDS (Light Editorial Aircraft Gallery) */}
        <section className="w-full py-28 sm:py-36 bg-[#fafaf7] border-b border-neutral-200/80">
          <Container size="wide">
            <div className="flex flex-col gap-16 max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-4">
                  <span className="editorial-tag-dark">
                    CURATED FLEET RECOMMENDATIONS // SECTION 04
                  </span>
                  <h2 className="text-4xl sm:text-6xl font-light text-neutral-900 tracking-tight leading-tight font-sans">
                    YOU DON&apos;T NEED TO KNOW WHICH AIRCRAFT<span className="text-amber-600">.</span><br />
                    <span className="text-neutral-400 font-light">YOU JUST NEED TO KNOW WHERE YOU&apos;RE GOING.</span>
                  </h2>
                </div>
                <Button variant="outline" size="md" asChild className="whitespace-nowrap border-neutral-300 text-neutral-900 hover:bg-neutral-100">
                  <Link href="/aircraft">
                    EXPLORE ALL AIRCRAFT →
                  </Link>
                </Button>
              </div>

              {/* Editorial Product Presentation Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {AIR_RECOMMENDS.map((rec) => (
                  <div
                    key={rec.slug}
                    className="editorial-card-light rounded-3xl overflow-hidden flex flex-col justify-between group bg-white"
                  >
                    <div className="relative h-72 sm:h-80 w-full bg-neutral-100 overflow-hidden">
                      <AviationImage
                        src={rec.image}
                        alt={`${rec.manufacturer} ${rec.name}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        fallbackTitle={rec.name}
                        fallbackCode={`FLEET // ${rec.name}`}
                      />
                      <div className="absolute top-4 left-4 bg-white/95 text-neutral-900 backdrop-blur-md border border-neutral-200 px-3.5 py-1 rounded-full text-[11px] font-mono font-bold z-10 shadow-sm">
                        {rec.category}
                      </div>
                      <div className="absolute top-4 right-4 bg-neutral-900 text-amber-400 px-3.5 py-1 rounded-full text-[11px] font-mono font-bold z-10 shadow-sm">
                        {rec.speed}
                      </div>
                    </div>

                    <div className="p-8 sm:p-10 space-y-6 flex-1 flex flex-col justify-between bg-white">
                      <div className="space-y-2">
                        <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider block font-semibold">
                          {rec.manufacturer} EXECUTIVE JETS
                        </span>
                        <h3 className="text-3xl font-light text-neutral-900 group-hover:text-amber-600 transition font-sans">
                          {rec.name}
                        </h3>
                        <p className="text-sm text-neutral-600 font-sans italic leading-relaxed pt-1">
                          &ldquo;{rec.reason}&rdquo;
                        </p>
                      </div>

                      <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-[#fafaf7] border border-neutral-200/80 font-mono text-xs">
                        <div>
                          <span className="text-[9px] text-neutral-500 block uppercase font-bold">CAPACITY</span>
                          <span className="text-neutral-900 font-bold">{rec.passengers}</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-neutral-500 block uppercase font-bold">RANGE</span>
                          <span className="text-amber-600 font-bold">{rec.range}</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-neutral-500 block uppercase font-bold">SPEED</span>
                          <span className="text-neutral-900 font-bold">{rec.speed}</span>
                        </div>
                      </div>

                      <div className="space-y-1 text-xs font-mono text-neutral-500 border-t border-neutral-100 pt-3">
                        <span className="text-neutral-400 block uppercase text-[10px] font-bold">MISSION PROFILE:</span>
                        <span className="text-neutral-700">{rec.mission}</span>
                      </div>

                      <div className="pt-2">
                        <Button variant="primary" size="md" fullWidth asChild className="shadow-md">
                          <Link href={`/aircraft/${rec.slug}`}>
                            WHY AIR RECOMMENDS IT →
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

        {/* EDITORIAL IMAGE MOMENT 01 — FULL WIDTH MAGAZINE PAUSE */}
        <section className="w-full bg-neutral-950 text-white overflow-hidden relative py-36 sm:py-48">
          <div className="absolute inset-0 z-0">
            <AviationImage
              src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=2200&q=85"
              alt="Executive Jet on Runway at Sunset"
              fill
              className="object-cover opacity-40 filter brightness-90 contrast-110"
              fallbackTitle="Editorial Aviation Moment"
              fallbackCode="MOMENT // 01"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-neutral-950" />
          </div>
          <Container size="wide" className="relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <span className="text-xs font-mono text-amber-400 uppercase tracking-[0.25em] font-bold block">
                AIR // AIRCRAFT 07
              </span>
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-light text-white tracking-tight leading-[1.05] font-sans">
                THE AIRCRAFT SHOULD DISAPPEAR.<br />
                <span className="text-amber-400">THE JOURNEY SHOULD NOT.</span>
              </h2>
              <p className="text-base sm:text-xl text-neutral-300 font-light max-w-2xl mx-auto leading-relaxed pt-2">
                True private aviation is invisible friction: direct tarmac boarding, zero security queues, and quiet cabins engineered for pure focus.
              </p>
            </div>
          </Container>
        </section>

        {/* 05 — PHOTOGRAPHIC AIRCRAFT GRID (Asymmetric Aviation Gallery) */}
        <section className="w-full py-28 sm:py-36 bg-neutral-950 text-white border-b border-neutral-800">
          <Container size="wide">
            <div className="flex flex-col gap-16 max-w-6xl mx-auto">
              <div className="space-y-4">
                <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded border border-amber-500/20">
                  VISUAL ARCHIVE // SECTION 05
                </span>
                <h2 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight font-sans leading-tight">
                  THE AIRCRAFT<br />
                  <span className="text-amber-400">IS THE EXPERIENCE.</span>
                </h2>
                <p className="text-base sm:text-xl text-neutral-400 font-light max-w-2xl leading-relaxed">
                  Every journey is defined by the vehicle that carries you. From flight decks and executive cabins to high-altitude wings and ramp arrivals.
                </p>
              </div>

              {/* Asymmetric Masonry Grid */}
              <div className="grid grid-cols-12 gap-6">
                {MASONRY_PHOTOS.map((photo, i) => (
                  <div
                    key={i}
                    className={`relative rounded-3xl overflow-hidden border border-white/10 group bg-neutral-900 ${photo.aspect}`}
                  >
                    <AviationImage
                      src={photo.src}
                      alt={photo.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                      fallbackTitle={photo.title}
                      fallbackCode={photo.caption}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end z-10">
                      <div>
                        <span className="text-[10px] font-mono text-amber-400 font-bold block">{photo.caption}</span>
                        <h3 className="text-lg sm:text-xl font-light text-white font-sans">{photo.title}</h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* 06 — AIRCRAFT SHOWROOM (Aircraft, Without the Noise - Light Background) */}
        <section className="w-full py-28 sm:py-36 bg-white border-b border-neutral-200/80">
          <Container size="wide">
            <div className="flex flex-col gap-16 max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-4">
                  <span className="editorial-tag-dark">
                    AIRCRAFT SHOWROOM // CATEGORY INTELLIGENCE
                  </span>
                  <h2 className="text-4xl sm:text-6xl font-light text-neutral-900 tracking-tight font-sans">
                    AIRCRAFT, WITHOUT THE NOISE<span className="text-amber-600">.</span>
                  </h2>
                  <p className="text-base sm:text-lg text-neutral-600 font-light max-w-2xl leading-relaxed">
                    Manufacturer specifications, cabin dimensions, runway performance, and mission suitability profiles across 23 verified fleet models.
                  </p>
                </div>
                <Button variant="outline" size="md" asChild className="whitespace-nowrap border-neutral-300 text-neutral-900 hover:bg-neutral-100">
                  <Link href="/aircraft">
                    VIEW COMPLETE FLEET (23 MODELS) →
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {aircraftModels.slice(0, 3).map((ac) => {
                  const modelImg =
                    AIRCRAFT_MODEL_PHOTOS[ac.slug]?.hero ||
                    AIRCRAFT_MODEL_PHOTOS["phenom-300"].hero;
                  return (
                    <div key={ac.id} className="editorial-card-light rounded-3xl overflow-hidden flex flex-col justify-between group bg-white">
                      <div className="relative h-60 w-full bg-neutral-100 overflow-hidden">
                        <AviationImage
                          src={modelImg}
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

                      <div className="p-8 space-y-5 flex-1 flex flex-col justify-between bg-white">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono text-neutral-500 uppercase font-bold">{ac.manufacturer}</span>
                            <ProvenanceBadge status={ac.dataStatus} />
                          </div>
                          <h3 className="text-2xl font-light text-neutral-900 group-hover:text-amber-600 transition font-sans">{ac.model}</h3>
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
                            <span className="text-neutral-900 font-bold">{ac.passengerCapacity} Passengers</span>
                          </div>
                        </div>

                        <div className="pt-2">
                          <Button variant="outline" size="sm" fullWidth asChild className="border-neutral-200 hover:border-amber-500">
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

        {/* PAUSE SECTION 02 — THE ACCESS SOVEREIGNTY */}
        <section className="w-full py-28 sm:py-36 bg-[#fafaf7] border-b border-neutral-200/80">
          <Container size="wide">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <span className="editorial-tag-muted">
                AIR // ACCESS SOVEREIGNTY
              </span>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-light text-neutral-900 font-sans tracking-tight leading-tight">
                THE DISTANCE IS NOT THE PROBLEM.<br />
                <span className="text-amber-600">THE WAY THERE IS.</span>
              </h2>
              <p className="text-base sm:text-lg text-neutral-500 font-light max-w-xl mx-auto">
                Bypass commercial hub layovers and public security corridors with direct point-to-point runway dispatch.
              </p>
            </div>
          </Container>
        </section>

        {/* 07 — DESTINATIONS & AVIATION ATLAS (Light Travel Atlas) */}
        <section className="w-full py-28 sm:py-36 bg-white border-b border-neutral-200/80">
          <Container size="wide">
            <div className="flex flex-col gap-16 max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-4">
                  <span className="editorial-tag-dark">
                    THE WORLD FROM ABOVE // EDITORIAL AVIATION ATLAS
                  </span>
                  <h2 className="text-4xl sm:text-6xl font-light text-neutral-900 tracking-tight font-sans">
                    THE WORLD, CONNECTED BY WINGS<span className="text-amber-600">.</span>
                  </h2>
                  <p className="text-base sm:text-lg text-neutral-600 font-light max-w-2xl leading-relaxed">
                    Explore premier European business aviation gateways, runway approaches, and FBO handling availability originating from Bucharest Băneasa (LRBS).
                  </p>
                </div>
                <Button variant="outline" size="md" asChild className="whitespace-nowrap border-neutral-300 text-neutral-900 hover:bg-neutral-100">
                  <Link href="/destinations">
                    ALL DESTINATIONS →
                  </Link>
                </Button>
              </div>

              {/* City Atlas Strip */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {CITY_STRIP.map((c, i) => (
                  <Link
                    key={i}
                    href={`/${c.slug}`}
                    className="group relative h-72 sm:h-80 rounded-3xl overflow-hidden editorial-card-light flex flex-col justify-end p-6 bg-neutral-900 border border-neutral-200"
                  >
                    <AviationImage
                      src={c.image}
                      alt={c.city}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-700 opacity-60 group-hover:opacity-85"
                      fallbackTitle={c.city}
                      fallbackCode={`CITY // ${c.country}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />
                    <div className="relative z-10 space-y-1 text-white">
                      <span className="text-[10px] font-mono text-amber-400 font-bold uppercase block">{c.country}</span>
                      <h3 className="text-2xl font-light group-hover:text-amber-300 transition font-sans">{c.city}</h3>
                      <p className="text-[10px] font-mono text-neutral-300">{c.airport}</p>
                      <p className="text-[10px] font-mono text-amber-300/90 pt-1 border-t border-white/10">{c.route}</p>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Interactive Departure Board Integration */}
              <div className="pt-6">
                <DestinationExplorer />
              </div>
            </div>
          </Container>
        </section>

        {/* 08 — BUCHAREST BĂNEASA // LRBS / BBU (Home Gateway Dossier) */}
        <section className="w-full py-28 sm:py-36 bg-[#fafaf7] border-b border-neutral-200/80">
          <Container size="wide">
            <div className="max-w-6xl mx-auto rounded-3xl overflow-hidden grid lg:grid-cols-12 shadow-2xl border border-neutral-200 bg-white">
              <div className="lg:col-span-7 p-10 md:p-14 flex flex-col justify-between gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="editorial-tag-dark">
                      BUCHAREST AVIATION HUB // LRBS / BBU
                    </span>
                    <ProvenanceBadge status="OFFICIAL_SOURCE" sourceName="CNAB AIP Romania" showSource />
                  </div>
                  <h2 className="text-4xl sm:text-5xl font-light text-neutral-900 font-sans">
                    BUCHAREST BĂNEASA (LRBS / BBU).
                  </h2>
                  <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-sans">
                    Romania&apos;s dedicated business aviation gateway. 2,358m asphalt runway (07/25), executive FBO VIP lounges, specialized ground handling, and direct proximity to northern Bucharest business hubs.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-3 font-mono text-xs">
                    <div className="p-4 rounded-2xl bg-[#fafaf7] border border-neutral-200 shadow-sm">
                      <span className="text-[9px] text-neutral-500 block uppercase font-bold">RUNWAY 07/25</span>
                      <span className="text-neutral-900 font-bold text-sm">2,358 × 45 M</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#fafaf7] border border-neutral-200 shadow-sm">
                      <span className="text-[9px] text-neutral-500 block uppercase font-bold">FBO ACCESS</span>
                      <span className="text-amber-600 font-bold text-sm">VIP LOUNGE</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#fafaf7] border border-neutral-200 shadow-sm col-span-2 sm:col-span-1">
                      <span className="text-[9px] text-neutral-500 block uppercase font-bold">LOCATION</span>
                      <span className="text-neutral-900 font-bold text-sm">NORTH BUCHAREST</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Button variant="primary" size="lg" asChild className="whitespace-nowrap px-8">
                    <Link href="/baneasa">
                      EXPLORE BĂNEASA HUB (LRBS) →
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-5 relative min-h-[340px] lg:min-h-full bg-neutral-900">
                <AviationImage
                  src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80"
                  alt="Bucharest Băneasa Executive Jet on Ramp"
                  fill
                  className="object-cover"
                  fallbackTitle="Băneasa LRBS Ramp"
                  fallbackCode="HUB // LRBS"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 z-10 bg-black/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-xs font-mono text-amber-400 font-bold">
                  LRBS // 44°30&apos;N 26°06&apos;E
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* 09 — HELICOPTERS (When the Road is Too Slow - Dramatic Photographic Feature) */}
        <section className="w-full py-28 sm:py-36 bg-neutral-950 text-white border-b border-neutral-800">
          <Container size="wide">
            <div className="flex flex-col gap-16 max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
                <div className="space-y-4 max-w-3xl">
                  <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded border border-amber-500/20">
                    HELICOPTER DIRECT ACCESS // SECTION 09
                  </span>
                  <h2 className="text-4xl sm:text-6xl font-light text-white tracking-tight font-sans">
                    WHEN THE ROAD<br />
                    <span className="text-amber-400">IS TOO SLOW.</span>
                  </h2>
                  <p className="text-base sm:text-lg text-neutral-400 font-light leading-relaxed">
                    Aviation doesn&apos;t end at the runway. AIR seamlessly connects fixed-wing jet arrivals with twin-turbine helicopter transfers directly to city helipads, Alpine chalets, island resorts, and private superyachts.
                  </p>
                </div>

                <Link href="/plan">
                  <Button variant="primary" size="lg" className="font-mono text-xs whitespace-nowrap px-8">
                    REQUEST HELICOPTER DISPATCH →
                  </Button>
                </Link>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="rounded-3xl overflow-hidden flex flex-col justify-between border border-white/10 group bg-neutral-900">
                  <div className="relative h-64 w-full overflow-hidden">
                    <AviationImage
                      src="https://images.unsplash.com/photo-1520437358207-323b43b50729?auto=format&fit=crop&w=800&q=80"
                      alt="Executive Jet Touchdown"
                      fill
                      className="object-cover group-hover:scale-105 transition duration-500"
                      fallbackTitle="Executive Touchdown"
                      fallbackCode="STEP // 01"
                    />
                    <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md border border-white/10 px-3.5 py-1 rounded-full text-[10px] font-mono text-amber-400 font-bold z-10">
                      STEP 01 • AIRPORT TOUCHDOWN
                    </div>
                  </div>
                  <div className="p-8 space-y-2">
                    <h3 className="text-xl font-light text-white group-hover:text-amber-300 transition font-sans">Bucharest Băneasa Arrival</h3>
                    <p className="text-xs text-neutral-400 font-sans leading-relaxed">Your jet lands at LRBS with zero commercial terminal congestion.</p>
                  </div>
                </div>

                <div className="rounded-3xl overflow-hidden flex flex-col justify-between border border-white/10 group bg-neutral-900">
                  <div className="relative h-64 w-full overflow-hidden">
                    <AviationImage
                      src="https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80"
                      alt="Helicopter Ramp Boarding"
                      fill
                      className="object-cover group-hover:scale-105 transition duration-500"
                      fallbackTitle="Helicopter Ramp Transfer"
                      fallbackCode="STEP // 02"
                    />
                    <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md border border-white/10 px-3.5 py-1 rounded-full text-[10px] font-mono text-amber-400 font-bold z-10">
                      STEP 02 • DIRECT RAMP BOARDING
                    </div>
                  </div>
                  <div className="p-8 space-y-2">
                    <h3 className="text-xl font-light text-white group-hover:text-amber-300 transition font-sans">Agusta AW139 / H145</h3>
                    <p className="text-xs text-neutral-400 font-sans leading-relaxed">Board a waiting twin-engine turbine helicopter directly on the apron.</p>
                  </div>
                </div>

                <div className="rounded-3xl overflow-hidden flex flex-col justify-between border border-white/10 group bg-neutral-900">
                  <div className="relative h-64 w-full overflow-hidden">
                    <AviationImage
                      src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80"
                      alt="Point-to-Point Helipad Arrival"
                      fill
                      className="object-cover group-hover:scale-105 transition duration-500"
                      fallbackTitle="Helipad Arrival"
                      fallbackCode="STEP // 03"
                    />
                    <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md border border-white/10 px-3.5 py-1 rounded-full text-[10px] font-mono text-amber-400 font-bold z-10">
                      STEP 03 • POINT-TO-POINT TOUCHDOWN
                    </div>
                  </div>
                  <div className="p-8 space-y-2">
                    <h3 className="text-xl font-light text-white group-hover:text-amber-300 transition font-sans">Helipad Direct Touchdown</h3>
                    <p className="text-xs text-neutral-400 font-sans leading-relaxed">Bypass mountain roads and traffic directly to your destination chalet or yacht.</p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* EDITORIAL IMAGE MOMENT 02 — THE SOVEREIGNTY OF TIME */}
        <section className="w-full bg-neutral-950 text-white overflow-hidden relative py-36 sm:py-48">
          <div className="absolute inset-0 z-0">
            <AviationImage
              src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2200&q=85"
              alt="Executive Jet Wing in High Flight Over Stratosphere"
              fill
              className="object-cover opacity-40 filter brightness-90 contrast-110"
              fallbackTitle="Stratospheric Horizon"
              fallbackCode="MOMENT // 02"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-neutral-950" />
          </div>
          <Container size="wide" className="relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <span className="text-xs font-mono text-amber-400 uppercase tracking-[0.25em] font-bold block">
                AIR // FLIGHT PERSPECTIVE
              </span>
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-light text-white tracking-tight leading-[1.05] font-sans">
                SPEED IS CONVENIENCE.<br />
                <span className="text-amber-400">TIME IS SOVEREIGNTY.</span>
              </h2>
              <p className="text-base sm:text-xl text-neutral-300 font-light max-w-2xl mx-auto leading-relaxed pt-2">
                When you fly on your schedule, three European cities become a single productive afternoon.
              </p>
            </div>
          </Container>
        </section>

        {/* 10 — BUSINESS AVIATION (Buy Back Your Time - White Editorial Canvas) */}
        <section className="w-full py-28 sm:py-36 bg-white border-b border-neutral-200/80">
          <Container size="wide">
            <div className="max-w-6xl mx-auto rounded-3xl overflow-hidden grid lg:grid-cols-12 shadow-2xl border border-neutral-200 bg-[#fafaf7]">
              <div className="lg:col-span-7 p-10 md:p-14 flex flex-col justify-between gap-8">
                <div className="space-y-4">
                  <span className="editorial-tag-dark">
                    CORPORATE AVIATION // SECTION 10
                  </span>
                  <h2 className="text-4xl sm:text-6xl font-light text-neutral-900 font-sans">
                    BUY BACK YOUR TIME<span className="text-amber-600">.</span>
                  </h2>
                  <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-sans">
                    Executive aviation was built to reclaim control of time. AIR streamlines corporate multi-city itineraries, executive shuttle optimization, and time-critical missions across 3,000+ European airfields.
                  </p>
                  <div className="grid grid-cols-2 gap-4 pt-3 font-mono text-xs">
                    <div className="p-4 rounded-2xl bg-white border border-neutral-200 shadow-sm">
                      <span className="text-[9px] text-neutral-500 block uppercase font-bold">MULTIPLE CITIES</span>
                      <span className="text-neutral-900 font-bold text-sm">SAME-DAY RETURN</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-white border border-neutral-200 shadow-sm">
                      <span className="text-[9px] text-neutral-500 block uppercase font-bold">ON-BOARD PRIVACY</span>
                      <span className="text-amber-600 font-bold text-sm">CABIN CONFERENCE</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Button variant="primary" size="lg" asChild className="whitespace-nowrap px-8">
                    <Link href="/business">
                      EXPLORE CORPORATE SOLUTIONS →
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-5 relative min-h-[340px] lg:min-h-full bg-neutral-900">
                <AviationImage
                  src="https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=80"
                  alt="Executive Cabin Conference Boardroom"
                  fill
                  className="object-cover"
                  fallbackTitle="Executive Cabin"
                  fallbackCode="CORP // CABIN"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 z-10 bg-black/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-xs font-mono text-amber-400 font-bold">
                  BOARDROOM IN THE STRATOSPHERE
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* 11 — EXPERIENCES (Some Places Are Better Reached By Air) */}
        <section className="w-full py-28 sm:py-36 bg-[#fafaf7] border-b border-neutral-200/80">
          <Container size="wide">
            <div className="flex flex-col gap-16 max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
                <div className="space-y-4">
                  <span className="editorial-tag-dark">
                    AVIATION EXPERIENCES // SECTION 11
                  </span>
                  <h2 className="text-4xl sm:text-6xl font-light text-neutral-900 tracking-tight font-sans">
                    SOME PLACES ARE BETTER REACHED BY AIR<span className="text-amber-600">.</span>
                  </h2>
                  <p className="text-base sm:text-lg text-neutral-600 font-light max-w-2xl leading-relaxed">
                    From Mediterranean island airstrips to Alpine mountain runways, discover destinations built for private wings.
                  </p>
                </div>
                <Button variant="outline" size="md" asChild className="whitespace-nowrap border-neutral-300 text-neutral-900 hover:bg-neutral-100">
                  <Link href="/destinations">
                    ALL EXPERIENCES →
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {EXPERIENCES.map((exp, i) => (
                  <Link
                    key={i}
                    href={exp.link}
                    className="group relative h-96 rounded-3xl overflow-hidden editorial-card-light flex flex-col justify-between p-6 bg-neutral-900 border border-neutral-200"
                  >
                    <AviationImage
                      src={exp.image}
                      alt={exp.title}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-700 opacity-70 group-hover:opacity-90"
                      fallbackTitle={exp.title}
                      fallbackCode="EXP // AIR"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

                    <div className="relative z-10">
                      <span className="text-[10px] font-mono text-amber-400 font-bold bg-black/70 px-3 py-1 rounded-full border border-white/20 backdrop-blur-md">
                        {exp.badge}
                      </span>
                    </div>

                    <div className="relative z-10 space-y-2 text-white">
                      <h3 className="text-2xl font-light group-hover:text-amber-300 transition font-sans">{exp.title}</h3>
                      <p className="text-xs text-neutral-300 font-sans leading-relaxed">{exp.tagline}</p>
                      <span className="text-xs font-mono text-amber-400 block pt-2 group-hover:underline">
                        EXPLORE MISSION →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* 12 — OWNERSHIP (When Flying Becomes Part of the Plan - Light Editorial Canvas) */}
        <section className="w-full py-28 sm:py-36 bg-white border-b border-neutral-200/80">
          <Container size="wide">
            <div className="flex flex-col gap-16 max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
                <div className="space-y-4">
                  <span className="editorial-tag-dark">
                    ASSET & FLEET INTELLIGENCE // SECTION 12
                  </span>
                  <h2 className="text-4xl sm:text-6xl font-light text-neutral-900 tracking-tight font-sans">
                    WHEN FLYING BECOMES PART OF THE PLAN<span className="text-amber-600">.</span>
                  </h2>
                  <p className="text-base sm:text-lg text-neutral-600 font-light max-w-2xl leading-relaxed">
                    Evaluate chartering, fractional ownership, full acquisition, and management structures tailored to your annual flight hours.
                  </p>
                </div>
                <Button variant="outline" size="md" asChild className="whitespace-nowrap border-neutral-300 text-neutral-900 hover:bg-neutral-100">
                  <Link href="/aircraft/ownership">
                    OWNERSHIP GUIDE →
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: "CHARTER", hours: "< 50 HOURS / YR", desc: "Pay-as-you-fly flexibility with zero capital commitment.", link: "/plan" },
                  { title: "LEASE", hours: "50 - 150 HOURS / YR", desc: "Predictable monthly economics with dedicated tail availability.", link: "/aviation/finance" },
                  { title: "MANAGE", hours: "AIRCRAFT OWNERS", desc: "Turnkey CAMO, crew, hangarage, and charter revenue offset.", link: "/aircraft/ownership" },
                  { title: "ACQUIRE", hours: "> 200 HOURS / YR", desc: "Full asset ownership, tax optimization, and bespoke cabin styling.", link: "/aircraft-for-sale" },
                ].map((p, i) => (
                  <div key={i} className="editorial-card-light p-8 rounded-3xl flex flex-col justify-between gap-6 bg-white">
                    <div className="space-y-3">
                      <span className="text-[10px] font-mono text-amber-600 font-bold uppercase tracking-wider block">{p.hours}</span>
                      <h3 className="text-3xl font-light text-neutral-900 font-sans">{p.title}</h3>
                      <p className="text-xs text-neutral-600 font-sans leading-relaxed">{p.desc}</p>
                    </div>
                    <Link href={p.link} className="text-xs font-mono text-amber-600 font-bold hover:underline pt-3 border-t border-neutral-100">
                      DISCOVER {p.title} →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* 13 — JOURNAL & PHOTO ESSAYS (Print Publication Aesthetic) */}
        <section className="w-full py-28 sm:py-36 bg-[#fafaf7] border-b border-neutral-200/80">
          <Container size="wide">
            <div className="max-w-6xl mx-auto rounded-3xl overflow-hidden grid lg:grid-cols-12 shadow-2xl border border-neutral-200 bg-white">
              <div className="lg:col-span-7 p-10 md:p-14 flex flex-col justify-between gap-8">
                <div className="space-y-4">
                  <span className="editorial-tag-dark">
                    AVIATION EDITORIAL & PHOTO STORIES // SECTION 13
                  </span>
                  <h2 className="text-4xl sm:text-6xl font-light text-neutral-900 font-sans">
                    AIR Journal & Photo Stories
                  </h2>
                  <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-sans">
                    Image-led visual stories exploring aviation from above, ramp operations at Băneasa, and the life of executive flight crews.
                  </p>
                </div>

                <div>
                  <Button variant="outline" size="lg" asChild className="whitespace-nowrap border-neutral-300 text-neutral-900 hover:bg-neutral-100 px-8">
                    <Link href="/journal">
                      READ AIR JOURNAL →
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-5 relative min-h-[320px] lg:min-h-full bg-neutral-900">
                <AviationImage
                  src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80"
                  alt="Aircraft Wing at Sunset Over Clouds"
                  fill
                  className="object-cover"
                  fallbackTitle="Aviation Editorial Photo"
                  fallbackCode="PHOTO // ESSAYS"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 z-10 bg-black/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-xs font-mono text-amber-400 font-bold">
                  PHOTO ESSAY // ROMANIA FROM ABOVE
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* 14 — FINAL CTA (Your Next Flight Starts Here) */}
        <section className="w-full py-28 sm:py-36 bg-neutral-950 text-white">
          <Container size="wide">
            <div className="relative overflow-hidden rounded-3xl border border-amber-500/30 bg-gradient-to-b from-neutral-900 to-black p-10 sm:p-20 shadow-2xl max-w-6xl mx-auto">
              <div className="absolute inset-0 z-0 opacity-25">
                <AviationImage
                  src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1600&q=80"
                  alt="Cruising Executive Jet in Clouds"
                  fill
                  className="object-cover filter brightness-75"
                  fallbackTitle="Executive Jet Airborne"
                  fallbackCode="CTA // AIRBORNE"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/60" />
              </div>

              <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-10">
                <div className="space-y-4 max-w-2xl">
                  <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest block">
                    READY TO FIND THE RIGHT WAY TO FLY?
                  </span>
                  <h2 className="text-4xl sm:text-6xl font-light text-white font-sans tracking-tight leading-none">
                    YOUR NEXT FLIGHT<br />STARTS HERE<span className="text-amber-400">.</span>
                  </h2>
                  <p className="text-sm sm:text-base text-neutral-300 font-sans leading-relaxed pt-1">
                    Tell AIR where you want to go. We calculate aircraft range, airport runways, and matched fleet options within seconds.
                  </p>
                </div>

                <Button variant="primary" size="lg" asChild className="whitespace-nowrap px-12 py-6 text-base shadow-2xl font-bold">
                  <Link href="/plan">
                    PLAN A FLIGHT →
                  </Link>
                </Button>
              </div>
            </div>
          </Container>
        </section>
      </div>
  );
}
