import React from "react";
import Link from "next/link";
import { Container } from "../components/layout/Container";
import { Hero } from "../components/home/Hero";
import { FlightSearchForm } from "../components/home/FlightSearchForm";
import { SectionHeader } from "../components/shared/SectionHeader";
import { ProvenanceBadge } from "../components/shared/ProvenanceBadge";
import { Button } from "../components/ui/Button";
import { UnifiedAviationRepository } from "../lib/repositories/unified-aviation-repo";
import { JsonLd, createOrganizationJsonLd } from "../components/shared/JsonLd";
import { AviationImage } from "../components/AviationImage";
import { DestinationExplorer } from "../components/destinations/DestinationExplorer";

export const metadata = {
  title: "AIR — The Easiest Way to Fly | Private Aviation Access & Intelligence",
  description:
    "Explore the world of flight: private jets, turboprops, helicopters, certified airports, aircraft marketplace for sale, flight schools, and aviation regulations.",
};

const CITY_STRIP = [
  { city: "BUCHAREST", airport: "LRBS — Băneasa Executive", route: "LRBS ORIGIN", country: "Romania", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80", slug: "baneasa" },
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
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80",
    passengers: 7,
    speed: "464 KTAS",
    range: "2,010 NM",
    mission: "European city pairs (Bucharest to Paris, London, Nice, or Geneva)",
    reason: "Fast, efficient, and ideal for European regional hops with class-leading speed.",
  },
  {
    name: "Praetor 600",
    manufacturer: "Embraer",
    category: "SUPER MIDSIZE JET",
    slug: "praetor-600",
    image: "https://images.unsplash.com/photo-1520437358207-323b43b50729?auto=format&fit=crop&w=1200&q=80",
    passengers: "9 - 12",
    speed: "466 KTAS",
    range: "4,018 NM",
    mission: "Transcontinental & Middle East routes (Bucharest to Dubai, Riyadh, New York)",
    reason: "Stand-up flat-floor luxury with true intercontinental non-stop range.",
  },
  {
    name: "Challenger 350",
    manufacturer: "Bombardier",
    category: "SUPER MIDSIZE JET",
    slug: "challenger-350",
    image: "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&w=1200&q=80",
    passengers: 9,
    speed: "470 KTAS",
    range: "3,200 NM",
    mission: "Cross-continental corporate missions with maximum quietness",
    reason: "Unmatched cabin width, whisper-quiet flight deck, and proven reliability.",
  },
  {
    name: "Gulfstream G650ER",
    manufacturer: "Gulfstream",
    category: "LARGE CABIN JET",
    slug: "gulfstream-g650er",
    image: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=1200&q=80",
    passengers: "14 - 19",
    speed: "516 KTAS",
    range: "7,500 NM",
    mission: "Global non-stop missions (Bucharest to Tokyo, Singapore, Los Angeles)",
    reason: "Ultra-long range flagship connecting continents at Mach 0.90 with 4 living areas.",
  },
];

const EXPERIENCES = [
  {
    title: "ISLAND ESCAPES",
    tagline: "Direct runway & seaplane landing in the Mediterranean & Maldives.",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80",
    badge: "TROPICAL // SEAPLANE",
    link: "/destinations/maldives",
  },
  {
    title: "ALPINE WEEKENDS",
    tagline: "Direct access to Samedan St. Moritz, Courchevel, and Geneva.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
    badge: "ALPINE // RUNWAY",
    link: "/destinations",
  },
  {
    title: "MEDITERRANEAN COAST",
    tagline: "Fly directly into Nice Côte d'Azur, Cannes Mandelieu, or Ibiza.",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80",
    badge: "COASTAL // FBO",
    link: "/destinations",
  },
  {
    title: "ROMANIA FROM ABOVE",
    tagline: "Danube Delta, Transylvanian Alps, and castle helipads.",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80",
    badge: "HELICOPTER // SCENIC",
    link: "/romania-from-above",
  },
];

export default async function HomePage() {
  const aircraftModels = await UnifiedAviationRepository.getAircraftModels();

  return (
    <>
      <JsonLd data={createOrganizationJsonLd()} />
      <div className="w-full flex flex-col gap-28 pb-24 bg-neutral-950 text-neutral-100 font-sans">
        {/* 01 — HERO (Full Viewport Authentic Aviation Showcase) */}
        <Hero />

        {/* 02 — THE FLIGHT DECISION (Aviation Control Interface) */}
        <Container size="wide">
          <div className="flex flex-col gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded border border-amber-500/20 backdrop-blur-md">
                  MISSION DISPATCH // SECTION 02
                </span>
                <ProvenanceBadge status="VERIFIED" />
              </div>
              <SectionHeader
                title="WHERE DO YOU WANT TO GO?"
                description="Tell AIR where you want to go. We find the right way to fly, calculating direct flight tracks, aircraft performance, and optimal runway access."
                titleAs="h2"
              />
            </div>

            <FlightSearchForm />
          </div>
        </Container>

        {/* 03 — AIR RECOMMENDS (Automotive Configurator Style Aircraft Recommendations) */}
        <Container size="wide">
          <div className="flex flex-col gap-10 pt-8 border-t border-white/[0.08]">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded border border-amber-500/20 backdrop-blur-md">
                    CURATED FLEET RECOMMENDATIONS // SECTION 03
                  </span>
                  <ProvenanceBadge status="OFFICIAL_SOURCE" />
                </div>
                <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight font-sans">
                  YOU DON&apos;T NEED TO KNOW WHICH AIRCRAFT<span className="text-amber-400">.</span><br />
                  <span className="text-neutral-400">YOU JUST NEED TO KNOW WHERE YOU&apos;RE GOING.</span>
                </h2>
              </div>
              <Button variant="outline" size="sm" asChild className="whitespace-nowrap">
                <Link href="/aircraft">
                  EXPLORE ALL AIRCRAFT →
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {AIR_RECOMMENDS.map((rec) => (
                <div
                  key={rec.slug}
                  className="glass-surface glass-surface-hover rounded-3xl overflow-hidden flex flex-col justify-between group border border-white/10"
                >
                  <div className="relative h-64 sm:h-72 w-full bg-neutral-900 overflow-hidden">
                    <AviationImage
                      src={rec.image}
                      alt={`${rec.manufacturer} ${rec.name}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      fallbackTitle={rec.name}
                      fallbackCode={`FLEET // ${rec.name}`}
                    />
                    <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md border border-white/15 px-3 py-1 rounded text-[11px] font-mono text-amber-400 font-bold z-10">
                      {rec.category}
                    </div>
                    <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md border border-white/15 px-3 py-1 rounded text-[11px] font-mono text-white z-10">
                      {rec.speed}
                    </div>
                  </div>

                  <div className="p-8 space-y-6 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider block">
                        {rec.manufacturer}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-light text-white group-hover:text-amber-300 transition font-sans">
                        {rec.name}
                      </h3>
                      <p className="text-sm text-neutral-300 font-sans italic leading-relaxed pt-1">
                        &ldquo;{rec.reason}&rdquo;
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] font-mono text-xs">
                      <div>
                        <span className="text-[9px] text-neutral-400 block uppercase">PASSENGERS</span>
                        <span className="text-white font-bold">{rec.passengers}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-neutral-400 block uppercase">MAX RANGE</span>
                        <span className="text-amber-300 font-bold">{rec.range}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-neutral-400 block uppercase">CRUISE</span>
                        <span className="text-neutral-200">{rec.speed}</span>
                      </div>
                    </div>

                    <div className="space-y-1 text-xs font-mono text-neutral-400">
                      <span className="text-neutral-500 block uppercase text-[10px]">MISSION PROFILE:</span>
                      <span className="text-neutral-300">{rec.mission}</span>
                    </div>

                    <div className="pt-2">
                      <Button variant="outline" size="md" fullWidth asChild className="group-hover:border-amber-400/50">
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

        {/* 04 — THE WORLD FROM ABOVE (Editorial Aviation Atlas & Departure Board) */}
        <Container size="wide">
          <div className="flex flex-col gap-10 pt-8 border-t border-white/[0.08]">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded border border-amber-500/20 backdrop-blur-md">
                    THE WORLD FROM ABOVE // EDITORIAL AVIATION ATLAS
                  </span>
                  <ProvenanceBadge status="VERIFIED" />
                </div>
                <SectionHeader
                  title="DESTINATIONS & AIRPORT INTELLIGENCE."
                  description="Explore premier European business aviation gateways, runway approaches, and FBO handling availability originating from Bucharest Băneasa (LRBS)."
                  titleAs="h2"
                />
              </div>
              <Button variant="outline" size="sm" asChild className="whitespace-nowrap">
                <Link href="/destinations">
                  ALL DESTINATIONS →
                </Link>
              </Button>
            </div>

            {/* City Atlas Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {CITY_STRIP.map((c, i) => (
                <Link
                  key={i}
                  href={`/${c.slug}`}
                  className="group relative h-64 sm:h-72 rounded-2xl overflow-hidden glass-surface glass-surface-hover flex flex-col justify-end p-5 bg-neutral-900 border border-white/10"
                >
                  <AviationImage
                    src={c.image}
                    alt={c.city}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500 opacity-60 group-hover:opacity-85"
                    fallbackTitle={c.city}
                    fallbackCode={`CITY // ${c.country}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent pointer-events-none" />
                  <div className="relative z-10 space-y-1">
                    <span className="text-[10px] font-mono text-amber-400 font-bold uppercase block">{c.country}</span>
                    <h3 className="text-2xl font-light text-white group-hover:text-amber-300 transition font-sans">{c.city}</h3>
                    <p className="text-[10px] font-mono text-neutral-300">{c.airport}</p>
                    <p className="text-[10px] font-mono text-amber-300/90 pt-1 border-t border-white/10">{c.route}</p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Interactive Departure Board Integration */}
            <div className="pt-4">
              <DestinationExplorer />
            </div>
          </div>
        </Container>

        {/* 05 — AIRCRAFT SHOWROOM (The Right Aircraft for the Right Mission) */}
        <Container size="wide">
          <div className="flex flex-col gap-10 pt-8 border-t border-white/[0.08]">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded border border-amber-500/20 backdrop-blur-md">
                    AIRCRAFT SHOWROOM // CATEGORY INTELLIGENCE
                  </span>
                  <ProvenanceBadge status="OFFICIAL_SOURCE" />
                </div>
                <SectionHeader
                  title="THE RIGHT AIRCRAFT FOR THE RIGHT MISSION."
                  description="Manufacturer specifications, cabin dimensions, runway performance, and mission suitability profiles across every business aviation category."
                  titleAs="h2"
                />
              </div>
              <Button variant="outline" size="sm" asChild className="whitespace-nowrap">
                <Link href="/aircraft">
                  VIEW COMPLETE FLEET (23 MODELS) →
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {aircraftModels.slice(0, 3).map((ac) => {
                const modelImg = ac.slug === "phenom-300"
                  ? "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80"
                  : ac.slug === "phenom-100"
                  ? "https://images.unsplash.com/photo-1559297434-fae8a1916a79?auto=format&fit=crop&w=800&q=80"
                  : "https://images.unsplash.com/photo-1474302770737-173ee21bab63?auto=format&fit=crop&w=800&q=80";
                return (
                  <div key={ac.id} className="glass-surface glass-surface-hover rounded-2xl overflow-hidden flex flex-col justify-between group border border-white/[0.08]">
                    <div className="relative h-52 w-full bg-neutral-900 overflow-hidden">
                      <AviationImage
                        src={modelImg}
                        alt={`${ac.manufacturer} ${ac.model}`}
                        fill
                        className="object-cover group-hover:scale-105 transition duration-500"
                        fallbackTitle={`${ac.manufacturer} ${ac.model}`}
                        fallbackCode={`FLEET // ${ac.model}`}
                      />
                      <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-md border border-white/[0.12] px-2.5 py-0.5 rounded text-[10px] font-mono text-amber-400 font-bold z-10">
                        {ac.category.replace(/_/g, " ")}
                      </div>
                    </div>

                    <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-neutral-400 uppercase">{ac.manufacturer}</span>
                          <ProvenanceBadge status={ac.dataStatus} />
                        </div>
                        <h3 className="text-xl font-light text-white group-hover:text-amber-300 transition font-sans">{ac.model}</h3>
                        <p className="text-xs text-neutral-300 font-sans line-clamp-2 leading-relaxed">
                          {ac.cabinHighlights}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-white/[0.08] font-mono text-xs space-y-1.5">
                        <div className="flex justify-between text-neutral-400">
                          <span>Max Range:</span>
                          <span className="text-amber-300 font-bold">{ac.approximateRange} NM</span>
                        </div>
                        <div className="flex justify-between text-neutral-400">
                          <span>Cruise Speed:</span>
                          <span className="text-neutral-200">{ac.typicalCruiseSpeed} KTAS</span>
                        </div>
                        <div className="flex justify-between text-neutral-400">
                          <span>Capacity:</span>
                          <span className="text-neutral-200">{ac.passengerCapacity} Passengers</span>
                        </div>
                      </div>

                      <div className="pt-2">
                        <Button variant="outline" size="sm" fullWidth asChild>
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

        {/* 06 — BĂNEASA (Bucharest Executive Aviation Gateway) */}
        <Container size="wide">
          <div className="glass-elevated rounded-3xl overflow-hidden grid lg:grid-cols-12 shadow-2xl border border-white/10">
            <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-between gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20 backdrop-blur-md">
                    BUCHAREST AVIATION HUB // LRBS / BBU
                  </span>
                  <ProvenanceBadge status="OFFICIAL_SOURCE" sourceName="CNAB AIP Romania" showSource />
                </div>
                <h2 className="text-3xl sm:text-4xl font-light text-white font-sans">
                  BUCHAREST BĂNEASA (LRBS / BBU).
                </h2>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
                  Romania&apos;s dedicated business aviation gateway. 2,358m asphalt runway (07/25), executive FBO VIP lounges, specialized ground handling, and direct proximity to northern Bucharest business hubs.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 font-mono text-xs">
                  <div className="glass-instrument p-3 rounded-xl">
                    <span className="text-[9px] text-neutral-400 block">RUNWAY 07/25</span>
                    <span className="text-white font-bold">2,358 × 45 M</span>
                  </div>
                  <div className="glass-instrument p-3 rounded-xl">
                    <span className="text-[9px] text-neutral-400 block">FBO ACCESS</span>
                    <span className="text-amber-400 font-bold">VIP LOUNGE</span>
                  </div>
                  <div className="glass-instrument p-3 rounded-xl col-span-2 sm:col-span-1">
                    <span className="text-[9px] text-neutral-400 block">LOCATION</span>
                    <span className="text-white font-bold">NORTH BUCHAREST</span>
                  </div>
                </div>
              </div>

              <div>
                <Button variant="primary" size="lg" asChild className="whitespace-nowrap">
                  <Link href="/baneasa">
                    EXPLORE BĂNEASA HUB (LRBS) →
                  </Link>
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5 relative min-h-[280px] lg:min-h-full bg-neutral-900">
              <AviationImage
                src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80"
                alt="Bucharest Băneasa Executive Jet on Ramp"
                fill
                className="object-cover"
                fallbackTitle="Băneasa LRBS Ramp"
                fallbackCode="HUB // LRBS"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-neutral-950/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 z-10 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] font-mono text-amber-400">
                LRBS // 44°30&apos;N 26°06&apos;E
              </div>
            </div>
          </div>
        </Container>

        {/* 07 — EXPERIENCES (Some Places Are Better Reached By Air) */}
        <Container size="wide">
          <div className="flex flex-col gap-10 pt-8 border-t border-white/[0.08]">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded border border-amber-500/20 backdrop-blur-md">
                    AVIATION EXPERIENCES // SECTION 07
                  </span>
                  <ProvenanceBadge status="VERIFIED" />
                </div>
                <SectionHeader
                  title="SOME PLACES ARE BETTER REACHED BY AIR."
                  description="From Mediterranean island airstrips to Alpine mountain runways, discover destinations built for private wings."
                  titleAs="h2"
                />
              </div>
              <Button variant="outline" size="sm" asChild className="whitespace-nowrap">
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
                  className="group relative h-80 rounded-2xl overflow-hidden glass-surface glass-surface-hover flex flex-col justify-between p-6 bg-neutral-900 border border-white/10"
                >
                  <AviationImage
                    src={exp.image}
                    alt={exp.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-700 opacity-60 group-hover:opacity-80"
                    fallbackTitle={exp.title}
                    fallbackCode="EXP // AIR"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent pointer-events-none" />

                  <div className="relative z-10">
                    <span className="text-[10px] font-mono text-amber-400 font-bold bg-black/60 px-2.5 py-1 rounded border border-white/10 backdrop-blur-md">
                      {exp.badge}
                    </span>
                  </div>

                  <div className="relative z-10 space-y-2">
                    <h3 className="text-xl font-light text-white group-hover:text-amber-300 transition font-sans">{exp.title}</h3>
                    <p className="text-xs text-neutral-300 font-sans leading-relaxed">{exp.tagline}</p>
                    <span className="text-xs font-mono text-amber-400 block pt-1 group-hover:underline">
                      EXPLORE MISSION →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Container>

        {/* 08 — HELICOPTERS (When the Road is Too Slow / Intermodal Transfers) */}
        <Container size="wide">
          <div className="glass-elevated rounded-3xl p-8 md:p-12 space-y-10 shadow-2xl border border-white/10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
              <div className="space-y-3 max-w-3xl">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20 backdrop-blur-md">
                    HELICOPTER DIRECT ACCESS // SECTION 08
                  </span>
                  <ProvenanceBadge status="VERIFIED" />
                </div>
                <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight font-sans">
                  WHEN THE ROAD IS TOO SLOW<span className="text-amber-400">.</span>
                </h2>
                <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
                  Aviation doesn&apos;t end at the runway. AIR seamlessly connects fixed-wing jet arrivals with twin-turbine helicopter transfers directly to city helipads, Alpine chalets, island resorts, and private superyachts.
                </p>
              </div>

              <Link href="/plan">
                <Button variant="primary" size="md" className="font-mono text-xs whitespace-nowrap">
                  REQUEST HELICOPTER DISPATCH →
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass-surface rounded-2xl overflow-hidden flex flex-col justify-between border border-white/10 group">
                <div className="relative h-56 w-full overflow-hidden bg-neutral-900">
                  <AviationImage
                    src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80"
                    alt="Executive Jet Touchdown"
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                    fallbackTitle="Executive Touchdown"
                    fallbackCode="STEP // 01"
                  />
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[10px] font-mono text-amber-400 font-semibold z-10">
                    STEP 01 • AIRPORT TOUCHDOWN
                  </div>
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="text-lg font-medium text-white group-hover:text-amber-300 transition font-sans">Bucharest Băneasa Arrival</h3>
                  <p className="text-xs text-neutral-300 font-sans leading-relaxed">Your jet lands at LRBS with zero commercial terminal congestion.</p>
                </div>
              </div>

              <div className="glass-surface rounded-2xl overflow-hidden flex flex-col justify-between border border-white/10 group">
                <div className="relative h-56 w-full overflow-hidden bg-neutral-900">
                  <AviationImage
                    src="https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80"
                    alt="Helicopter Ramp Boarding"
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                    fallbackTitle="Helicopter Ramp Transfer"
                    fallbackCode="STEP // 02"
                  />
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[10px] font-mono text-amber-400 font-semibold z-10">
                    STEP 02 • DIRECT RAMP BOARDING
                  </div>
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="text-lg font-medium text-white group-hover:text-amber-300 transition font-sans">Agusta AW139 / H145</h3>
                  <p className="text-xs text-neutral-300 font-sans leading-relaxed">Board a waiting twin-engine helicopter directly on the apron.</p>
                </div>
              </div>

              <div className="glass-surface rounded-2xl overflow-hidden flex flex-col justify-between border border-white/10 group">
                <div className="relative h-56 w-full overflow-hidden bg-neutral-900">
                  <AviationImage
                    src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80"
                    alt="Point-to-Point Helipad Arrival"
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                    fallbackTitle="Helipad Arrival"
                    fallbackCode="STEP // 03"
                  />
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[10px] font-mono text-amber-400 font-semibold z-10">
                    STEP 03 • POINT-TO-POINT TOUCHDOWN
                  </div>
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="text-lg font-medium text-white group-hover:text-amber-300 transition font-sans">Helipad Direct Touchdown</h3>
                  <p className="text-xs text-neutral-300 font-sans leading-relaxed">Bypass mountain roads and traffic directly to your destination.</p>
                </div>
              </div>
            </div>
          </div>
        </Container>

        {/* 09 — BUSINESS & CORPORATE AVIATION (Buy Back Your Time) */}
        <Container size="wide">
          <div className="glass-elevated rounded-3xl overflow-hidden grid lg:grid-cols-12 shadow-2xl border border-white/10">
            <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-between gap-6">
              <div className="space-y-4">
                <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20 backdrop-blur-md">
                  CORPORATE AVIATION // SECTION 09
                </span>
                <h2 className="text-3xl sm:text-5xl font-light text-white font-sans">
                  BUY BACK YOUR TIME<span className="text-amber-400">.</span>
                </h2>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
                  Executive aviation was built to reclaim control of time. AIR streamlines corporate multi-city itineraries, executive shuttle optimization, and time-critical missions across 3,000+ European airfields.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-2 font-mono text-xs">
                  <div className="glass-instrument p-3 rounded-xl">
                    <span className="text-[9px] text-neutral-400 block">MULTIPLE CITIES</span>
                    <span className="text-white font-bold">SAME-DAY RETURN</span>
                  </div>
                  <div className="glass-instrument p-3 rounded-xl">
                    <span className="text-[9px] text-neutral-400 block">ON-BOARD PRIVACY</span>
                    <span className="text-amber-400 font-bold">CABIN CONFERENCE</span>
                  </div>
                </div>
              </div>

              <div>
                <Button variant="primary" size="lg" asChild className="whitespace-nowrap">
                  <Link href="/business">
                    EXPLORE CORPORATE SOLUTIONS →
                  </Link>
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5 relative min-h-[280px] lg:min-h-full bg-neutral-900">
              <AviationImage
                src="https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=80"
                alt="Executive Cabin Conference Boardroom"
                fill
                className="object-cover"
                fallbackTitle="Executive Cabin"
                fallbackCode="CORP // CABIN"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-neutral-950/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 z-10 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] font-mono text-amber-400">
                BOARDROOM IN THE STRATOSPHERE
              </div>
            </div>
          </div>
        </Container>

        {/* 10 — OWNERSHIP & ASSET INTELLIGENCE (When Flying Becomes Part of the Plan) */}
        <Container size="wide">
          <div className="flex flex-col gap-10 pt-8 border-t border-white/[0.08]">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded border border-amber-500/20 backdrop-blur-md">
                    ASSET & FLEET INTELLIGENCE // SECTION 10
                  </span>
                  <ProvenanceBadge status="VERIFIED" />
                </div>
                <SectionHeader
                  title="WHEN FLYING BECOMES PART OF THE PLAN."
                  description="Evaluate chartering, fractional ownership, full acquisition, and management structures tailored to your annual flight hours."
                  titleAs="h2"
                />
              </div>
              <Button variant="outline" size="sm" asChild className="whitespace-nowrap">
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
                <div key={i} className="glass-surface glass-surface-hover p-6 rounded-2xl flex flex-col justify-between gap-4 border border-white/10">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider block">{p.hours}</span>
                    <h3 className="text-2xl font-light text-white font-sans">{p.title}</h3>
                    <p className="text-xs text-neutral-300 font-sans leading-relaxed">{p.desc}</p>
                  </div>
                  <Link href={p.link} className="text-xs font-mono text-amber-400 hover:underline pt-2 border-t border-white/10">
                    DISCOVER {p.title} →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </Container>

        {/* 11 — JOURNAL & PHOTO ESSAYS (Aviation Editorial) */}
        <Container size="wide">
          <div className="glass-elevated rounded-3xl overflow-hidden grid lg:grid-cols-12 shadow-2xl border border-white/10">
            <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-between gap-6">
              <div className="space-y-4">
                <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20 backdrop-blur-md">
                  AVIATION EDITORIAL & PHOTO STORIES // SECTION 11
                </span>
                <h2 className="text-3xl sm:text-5xl font-light text-white font-sans">AIR Journal & Photo Stories</h2>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
                  Image-led visual stories exploring aviation from above, ramp operations at Băneasa, and the life of executive flight crews.
                </p>
              </div>

              <div>
                <Button variant="outline" size="lg" asChild className="whitespace-nowrap">
                  <Link href="/journal">
                    READ AIR JOURNAL →
                  </Link>
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full bg-neutral-900">
              <AviationImage
                src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80"
                alt="Aircraft Wing at Sunset Over Clouds"
                fill
                className="object-cover"
                fallbackTitle="Aviation Editorial Photo"
                fallbackCode="PHOTO // ESSAYS"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-neutral-950/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 z-10 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] font-mono text-amber-400">
                PHOTO ESSAY // ROMANIA FROM ABOVE
              </div>
            </div>
          </div>
        </Container>

        {/* 12 — FINAL CTA (Your Next Flight Starts Here) */}
        <Container size="wide">
          <div className="relative overflow-hidden rounded-3xl border border-amber-400/30 glass-elevated p-10 sm:p-16 shadow-2xl">
            <div className="absolute inset-0 z-0 opacity-25">
              <AviationImage
                src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1600&q=80"
                alt="Cruising Executive Jet in Clouds"
                fill
                className="object-cover filter brightness-75"
                fallbackTitle="Executive Jet Airborne"
                fallbackCode="CTA // AIRBORNE"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-neutral-950/60" />
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-8">
              <div className="space-y-3 max-w-2xl">
                <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest block">
                  READY TO FIND THE RIGHT WAY TO FLY?
                </span>
                <h3 className="text-4xl sm:text-6xl font-light text-white font-sans tracking-tight leading-none">
                  YOUR NEXT FLIGHT<br />STARTS HERE<span className="text-amber-400">.</span>
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed pt-1">
                  Tell AIR where you want to go. We calculate aircraft range, airport runways, and matched fleet options within seconds.
                </p>
              </div>

              <Button variant="primary" size="lg" asChild className="whitespace-nowrap px-10 py-5 text-base shadow-2xl">
                <Link href="/plan">
                  PLAN A FLIGHT →
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
