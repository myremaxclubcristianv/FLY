import React from "react";
import Link from "next/link";
import { Container } from "../components/layout/Container";
import { Hero } from "../components/home/Hero";
import { SectionHeader } from "../components/shared/SectionHeader";
import { ProvenanceBadge } from "../components/shared/ProvenanceBadge";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { UnifiedAviationRepository } from "../lib/repositories/unified-aviation-repo";
import { JsonLd, createOrganizationJsonLd } from "../components/shared/JsonLd";
import { AviationImage } from "../components/AviationImage";
import { DestinationExplorer } from "../components/destinations/DestinationExplorer";
import { IntermodalSection } from "../components/home/IntermodalSection";
import { LUXURY_DESTINATIONS } from "../data/real/destinations";

export const metadata = {
  title: "AIR — The Digital World of Aviation | Access & Intelligence Platform",
  description:
    "Explore the world of flight: private jets, turboprops, helicopters, certified airports, aircraft marketplace for sale, flight schools, and aviation regulations.",
};

const CITY_STRIP = [
  { city: "BUCHAREST", airport: "LRBS — Băneasa Executive", country: "Romania", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80", slug: "baneasa" },
  { city: "PARIS", airport: "LFPB — Le Bourget", country: "France", image: "https://images.unsplash.com/photo-1520437358207-323b43b50729?auto=format&fit=crop&w=800&q=80", slug: "destinations" },
  { city: "LONDON", airport: "EGLF — Farnborough", country: "United Kingdom", image: "https://images.unsplash.com/photo-1474302770737-173ee21bab63?auto=format&fit=crop&w=800&q=80", slug: "destinations" },
  { city: "NICE", airport: "LFMN — Côte d'Azur", country: "France", image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80", slug: "destinations" },
  { city: "GENEVA", airport: "LSGG — Cointrin", country: "Switzerland", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80", slug: "destinations" },
  { city: "MYKONOS", airport: "LGMK — Island Terminal", country: "Greece", image: "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?auto=format&fit=crop&w=800&q=80", slug: "destinations" },
  { city: "ROME", airport: "LIRA — Ciampino", country: "Italy", image: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=800&q=80", slug: "destinations" },
  { city: "DUBAI", airport: "OMDW — Al Maktoum", country: "UAE", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80", slug: "destinations" },
];

const BUCHAREST_ROUTES = [
  { origin: "BUCHAREST / LRBS", dest: "MALDIVES / MLE", time: "8h 30m", ac: "Heavy Jet", prov: "AIR CALCULATED", img: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80" },
  { origin: "BUCHAREST / LRBS", dest: "SEYCHELLES / SEZ", time: "9h 00m", ac: "Intercontinental Jet", prov: "AIR CALCULATED", img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80" },
  { origin: "BUCHAREST / LRBS", dest: "NICE / LFMN", time: "2h 35m", ac: "Light Jet", prov: "AIR CALCULATED", img: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80" },
  { origin: "BUCHAREST / LRBS", dest: "DUBAI / OMDW", time: "4h 50m", ac: "Super Midsize Jet", prov: "AIR CALCULATED", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80" },
];

export default async function HomePage() {
  const aircraftModels = await UnifiedAviationRepository.getAircraftModels();
  const aircraftForSale = await UnifiedAviationRepository.getAircraftForSale();
  const techArticles = await UnifiedAviationRepository.getTechArticles();

  return (
    <>
      <JsonLd data={createOrganizationJsonLd()} />
      <div className="w-full flex flex-col gap-24 pb-24 bg-neutral-950 text-neutral-100 font-sans">
        {/* 01 — GO BY AIR (Hero) */}
        <Hero />

        {/* 02 — WHERE WILL YOU FLY? (Interactive Departure Board) */}
        <Container size="wide">
          <DestinationExplorer />
        </Container>

        {/* 03 — PARADISE BY AIR (Luxury Tropical Destinations) */}
        <Container size="wide">
          <div className="flex flex-col gap-8 pt-8 border-t border-white/[0.08]">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20 backdrop-blur-md">
                    PARADISE BY AIR // TROPICAL & ISLAND SANCTUARIES
                  </span>
                  <ProvenanceBadge status="VERIFIED" />
                </div>
                <SectionHeader
                  title="PARADISE BY AIR."
                  description="Direct long-range private jet access and luxury intermodal transfers across the World's most exclusive islands."
                />
              </div>
              <Button variant="outline" size="sm" asChild className="whitespace-nowrap">
                <Link href="/destinations">
                  ALL DESTINATIONS →
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {LUXURY_DESTINATIONS.slice(0, 3).map((item) => (
                <div key={item.id} className="glass-surface glass-surface-hover rounded-2xl overflow-hidden flex flex-col justify-between group">
                  <div className="relative h-60 w-full overflow-hidden bg-neutral-900">
                    <AviationImage src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition duration-500" fallbackTitle={item.name} fallbackCode={`DEST // ${item.airportCode}`} />
                    <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md border border-white/[0.12] px-2.5 py-1 rounded text-[10px] font-mono text-amber-400 font-bold z-10">
                      {item.airportCode}
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <span className="text-[10px] font-mono text-amber-400 font-bold uppercase block">{item.region} • {item.country}</span>
                      <h3 className="text-2xl font-light text-white group-hover:text-amber-300 transition mt-1 font-sans">{item.name}</h3>
                      <p className="text-xs text-neutral-300 leading-relaxed font-mono mt-1">{item.tagline}</p>
                    </div>

                    <div className="pt-3 border-t border-white/[0.08] font-mono text-xs space-y-1">
                      <div className="flex justify-between">
                        <span className="text-neutral-400">From LRBS:</span>
                        <span className="text-amber-300 font-bold">{item.estimatedFlightFromLRBS}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Fleet:</span>
                        <span className="text-neutral-200">{item.recommendedCategory}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <Button variant="outline" size="sm" fullWidth asChild>
                      <Link href={`/destinations/${item.slug}`}>
                        EXPLORE DISPATCH SPECS →
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>

        {/* 04 — FROM BUCHAREST, ANYWHERE (Route Intelligence) */}
        <Container size="wide">
          <div className="flex flex-col gap-8 pt-8 border-t border-white/[0.08]">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20 backdrop-blur-md">
                  ROUTE INTELLIGENCE // BĂNEASA ORIGIN
                </span>
                <ProvenanceBadge status="AIR_CALCULATED" />
              </div>
              <SectionHeader
                title="FROM BUCHAREST, ANYWHERE."
                description="Estimated flight durations, air distances, and recommended jet categories originating from Bucharest Băneasa Executive Terminal (LRBS / BBU)."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {BUCHAREST_ROUTES.map((route, i) => (
                <div key={i} className="glass-surface glass-surface-hover rounded-2xl overflow-hidden p-5 flex flex-col justify-between gap-4 group">
                  <div className="relative h-36 w-full rounded-xl overflow-hidden bg-neutral-900">
                    <AviationImage src={route.img} alt={route.dest} fill className="object-cover group-hover:scale-105 transition duration-500" fallbackTitle={route.dest} fallbackCode="VECTOR // LRBS" />
                    <div className="absolute top-2 left-2 bg-black/75 backdrop-blur-md border border-white/[0.12] px-2 py-0.5 rounded text-[9px] font-mono text-amber-400 font-bold z-10">
                      {route.dest}
                    </div>
                  </div>

                  <div className="space-y-2 font-mono text-xs">
                    <div className="flex justify-between items-center border-b border-white/[0.08] pb-1 text-[11px]">
                      <span className="text-neutral-300 font-bold">{route.origin.split(" / ")[0]}</span>
                      <span className="text-amber-400">→</span>
                      <span className="text-white font-bold">{route.dest.split(" / ")[0]}</span>
                    </div>

                    <div className="flex justify-between text-[11px]">
                      <span className="text-neutral-400">Est. Flight:</span>
                      <span className="text-amber-300 font-bold">{route.time}</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-neutral-400">Aircraft:</span>
                      <span className="text-neutral-200">{route.ac}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>

        {/* 05 — THE WORLD FROM ABOVE (City & Airport Intelligence) */}
        <Container size="wide">
          <div className="flex flex-col gap-8 pt-8 border-t border-white/[0.08]">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20 backdrop-blur-md">
                    THE WORLD FROM ABOVE // EDITORIAL GEOGRAPHY
                  </span>
                  <ProvenanceBadge status="VERIFIED" />
                </div>
                <SectionHeader
                  title="DESTINATIONS & AIRPORT INTELLIGENCE."
                  description="Explore premier European business aviation gateways, runway approaches, and FBO handling availability."
                />
              </div>
              <Button variant="outline" size="sm" asChild className="whitespace-nowrap">
                <Link href="/destinations">
                  ALL DESTINATIONS →
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {CITY_STRIP.map((c, i) => (
                <Link
                  key={i}
                  href={`/${c.slug}`}
                  className="group relative h-64 rounded-2xl overflow-hidden glass-surface glass-surface-hover flex flex-col justify-end p-4 bg-neutral-900"
                >
                  <AviationImage src={c.image} alt={c.city} fill className="object-cover group-hover:scale-105 transition duration-500 opacity-60 group-hover:opacity-85" fallbackTitle={c.city} fallbackCode={`CITY // ${c.country}`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent pointer-events-none" />
                  <div className="relative z-10 space-y-1">
                    <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">{c.country}</span>
                    <h3 className="text-xl font-light text-white group-hover:text-amber-300 transition font-sans">{c.city}</h3>
                    <p className="text-[10px] font-mono text-neutral-300">{c.airport}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Container>

        {/* 06 — AIRCRAFT FLEET (Category & Model Explorer) */}
        <Container size="wide">
          <div className="flex flex-col gap-8 pt-8 border-t border-white/[0.08]">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20 backdrop-blur-md">
                    AIRCRAFT FLEET SPECS // MANUFACTURER DATA
                  </span>
                  <ProvenanceBadge status="OFFICIAL_SOURCE" />
                </div>
                <SectionHeader
                  title="AIRCRAFT FLEET INTELLIGENCE."
                  description="Manufacturer specifications, cabin dimensions, runway performance, and mission suitability profiles."
                />
              </div>
              <Button variant="outline" size="sm" asChild className="whitespace-nowrap">
                <Link href="/aircraft">
                  EXPLORE ALL AIRCRAFT →
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {aircraftModels.slice(0, 3).map((ac) => (
                <Card key={ac.id} variant="interactive" className="flex flex-col justify-between gap-4 group">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-amber-400 uppercase font-bold">{ac.category.replace(/_/g, " ")}</span>
                      <ProvenanceBadge status={ac.dataStatus} />
                    </div>
                    <h3 className="text-xl font-light text-white group-hover:text-amber-300 transition font-sans">{ac.manufacturer} {ac.model}</h3>
                    <p className="text-xs text-neutral-300 font-mono leading-relaxed">
                      Speed: {ac.typicalCruiseSpeed} KTS • Range: {ac.approximateRange} NM • Seats: {ac.passengerCapacity}
                    </p>
                  </div>

                  <Link href={`/aircraft/${ac.slug}`} className="text-xs font-mono text-amber-400 hover:underline pt-2 border-t border-white/[0.08]">
                    VIEW AIRCRAFT SPECS →
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </Container>

        {/* 07 — THE LAST 50 MILES (Intermodal Helicopter Transfers) */}
        <IntermodalSection />

        {/* 08 — BĂNEASA (LRBS / BBU Executive Gateway) */}
        <Container size="wide">
          <div className="glass-elevated rounded-3xl overflow-hidden grid lg:grid-cols-12 shadow-2xl border border-white/10">
            <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-between gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-data text-amber-400 font-bold uppercase tracking-widest bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20 backdrop-blur-md">
                    BUCHAREST AVIATION HUB // LRBS / BBU
                  </span>
                  <ProvenanceBadge status="OFFICIAL_SOURCE" sourceName="CNAB AIP Romania" showSource />
                </div>
                <h2 className="text-3xl sm:text-4xl font-light text-white font-sans">
                  BUCHAREST BĂNEASA (LRBS / BBU).
                </h2>
                <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed font-sans">
                  Romania&apos;s premier dedicated executive aviation terminal. 2,358m asphalt runway (07/25), fast-track FBO lounges, zero commercial airline delays, and 10-minute access to Bucharest CBD.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 font-data text-xs">
                  <div className="glass-instrument p-3 rounded-xl">
                    <span className="text-[9px] text-[var(--color-text-muted)] block">RUNWAY 07/25</span>
                    <span className="text-white font-bold">2,358 × 45 M</span>
                  </div>
                  <div className="glass-instrument p-3 rounded-xl">
                    <span className="text-[9px] text-[var(--color-text-muted)] block">FBO ACCESS</span>
                    <span className="text-amber-400 font-bold">VIP LOUNGE</span>
                  </div>
                  <div className="glass-instrument p-3 rounded-xl col-span-2 sm:col-span-1">
                    <span className="text-[9px] text-[var(--color-text-muted)] block">CBD DRIVE</span>
                    <span className="text-white font-bold">10 MINUTES</span>
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
              <div className="absolute bottom-4 left-4 z-10 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] font-data text-amber-400">
                LRBS // 44°30&apos;N 26°06&apos;E
              </div>
            </div>
          </div>
        </Container>

        {/* 09 — LEARN TO FLY (Pilot Pathway & Flight Schools) */}
        <Container size="wide">
          <div className="glass-elevated rounded-3xl overflow-hidden grid lg:grid-cols-12 shadow-2xl border border-white/10">
            <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full bg-neutral-900 order-2 lg:order-1">
              <AviationImage
                src="https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=1200&q=80"
                alt="Modern Digital Flight Deck Cockpit Avionics"
                fill
                className="object-cover"
                fallbackTitle="Flight Deck Avionics"
                fallbackCode="COCKPIT // AVIONICS"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-l from-neutral-950/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 z-10 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] font-data text-amber-400">
                DIGITAL FLIGHT DECK // EASA ATPL
              </div>
            </div>

            <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-between gap-6 order-1 lg:order-2">
              <div className="space-y-4">
                <span className="text-xs font-data text-amber-400 font-bold uppercase tracking-widest">
                  PILOT PATHWAY & FLIGHT SCHOOLS
                </span>
                <h2 className="text-3xl sm:text-4xl font-light text-white font-sans">How Do I Become a Pilot?</h2>
                <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed font-sans">
                  Explore step-by-step EASA pilot training roadmaps, Class 1 medical requirements, PPL to ATPL licensing pathways, and verified Approved Training Organizations (ATOs).
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button variant="primary" size="md" asChild>
                  <Link href="/aviation/learn/pilot-guide">
                    PILOT ROADMAP →
                  </Link>
                </Button>
                <Button variant="outline" size="md" asChild>
                  <Link href="/aviation/schools">
                    FLIGHT SCHOOLS DIRECTORY →
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>

        {/* 10 — THE NEXT WAY TO FLY (Aviation Technology & Innovation) */}
        <Container size="wide">
          <div className="flex flex-col gap-8 pt-8 border-t border-white/10">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-data text-amber-400 font-bold uppercase tracking-widest bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20 backdrop-blur-md">
                    INNOVATION & FUTURE FLIGHT // TECH JOURNAL
                  </span>
                  <ProvenanceBadge status="VERIFIED" />
                </div>
                <SectionHeader
                  title="THE NEXT WAY TO FLY."
                  description="In-depth analysis of zero-emission propulsion, Advanced Air Mobility (AAM), Sustainable Aviation Fuel (SAF), and predictive AI maintenance."
                />
              </div>
              <Button variant="outline" size="sm" asChild className="whitespace-nowrap">
                <Link href="/aviation/technology">
                  ALL TECH ARTICLES →
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {techArticles.slice(0, 3).map((art, i) => {
                const techImgs = [
                  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
                  "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80",
                  "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=800&q=80",
                ];
                return (
                  <Card key={art.id} variant="surface" className="flex flex-col justify-between overflow-hidden group hover:border-amber-400/50 transition-all duration-300 rounded-2xl p-0">
                    <div className="relative h-44 w-full bg-neutral-900 overflow-hidden">
                      <AviationImage src={techImgs[i % techImgs.length]} alt={art.title} fill className="object-cover group-hover:scale-105 transition duration-500" fallbackTitle={art.title} fallbackCode="TECH // FUTURE" />
                      <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md border border-white/10 px-2.5 py-0.5 rounded-full text-[9px] font-data text-amber-400 font-semibold z-10">
                        {art.category.replace(/_/g, " ")}
                      </div>
                    </div>
                    <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <span className="text-[10px] font-data text-[var(--color-text-muted)] block">{art.readTimeMinutes} MIN READ</span>
                        <h3 className="text-lg font-light text-white group-hover:text-amber-300 transition font-sans">{art.title}</h3>
                        <p className="text-xs text-[var(--color-text-secondary)] font-sans line-clamp-2">{art.subtitle}</p>
                      </div>

                      <Link href="/aviation/technology" className="text-xs font-data text-amber-400 hover:underline pt-3 border-t border-white/10 block font-semibold">
                        READ ANALYSIS →
                      </Link>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </Container>

        {/* 11 — AIRCRAFT FOR SALE (Marketplace Discovery) */}
        <Container size="wide">
          <div className="flex flex-col gap-8 pt-8 border-t border-white/10">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-data text-amber-400 font-bold uppercase tracking-widest bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20 backdrop-blur-md">
                    AIRCRAFT MARKETPLACE // DISCOVERY LAYER
                  </span>
                  <ProvenanceBadge status="VERIFIED" />
                </div>
                <SectionHeader
                  title="AIRCRAFT FOR SALE."
                  description="Curated executive jets, turboprops, and helicopters from AvBuyer, GlobalAir, and Controller with verified marketplace provenance."
                />
              </div>
              <Button variant="outline" size="sm" asChild className="whitespace-nowrap">
                <Link href="/aircraft-for-sale">
                  BROWSE MARKETPLACE →
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {aircraftForSale.slice(0, 3).map((item, i) => {
                const saleImgs = [
                  "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80",
                  "https://images.unsplash.com/photo-1520437358207-323b43b50729?auto=format&fit=crop&w=800&q=80",
                  "https://images.unsplash.com/photo-1474302770737-173ee21bab63?auto=format&fit=crop&w=800&q=80",
                ];
                return (
                  <Card key={item.id} variant="surface" className="flex flex-col justify-between overflow-hidden group hover:border-amber-400/50 transition-all duration-300 rounded-2xl p-0">
                    <div className="relative h-48 w-full bg-neutral-900 overflow-hidden">
                      <AviationImage src={saleImgs[i % saleImgs.length]} alt={item.title} fill className="object-cover group-hover:scale-105 transition duration-500" fallbackTitle={item.title} fallbackCode="MARKET // LISTING" />
                      <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md border border-white/10 px-2.5 py-0.5 rounded-full text-[9px] font-data text-amber-400 font-semibold z-10">
                        {item.year} MODEL
                      </div>
                      <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md border border-white/10 px-2.5 py-0.5 rounded-full text-[9px] font-data text-white z-10">
                        {item.externalSource}
                      </div>
                    </div>
                    <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <h3 className="text-xl font-light text-white group-hover:text-amber-300 transition font-sans">{item.title}</h3>
                        <p className="text-xs text-[var(--color-text-secondary)] font-data">
                          Seats: {item.passengerCapacity} • Range: {item.rangeNm} NM • Hours: {item.totalHours} hrs
                        </p>
                        <p className="text-base font-bold text-amber-400 font-data pt-2 border-t border-white/10">
                          {item.priceFormatted}
                        </p>
                      </div>

                      <Link href="/aircraft-for-sale" className="text-xs font-data text-amber-400 hover:underline block font-semibold">
                        VIEW MARKETPLACE LISTING →
                      </Link>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </Container>

        {/* 12 — JOURNAL & PHOTO ESSAYS (Aviation Editorial) */}
        <Container size="wide">
          <div className="glass-elevated rounded-3xl overflow-hidden grid lg:grid-cols-12 shadow-2xl border border-white/10">
            <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-between gap-6">
              <div className="space-y-4">
                <span className="text-xs font-data text-amber-400 font-bold uppercase tracking-widest">
                  AVIATION EDITORIAL & PHOTO ESSAYS
                </span>
                <h2 className="text-3xl sm:text-4xl font-light text-white font-sans">AIR Journal & Photo Stories</h2>
                <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed font-sans">
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
              <div className="absolute bottom-4 left-4 z-10 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] font-data text-amber-400">
                PHOTO ESSAY // ROMANIA FROM ABOVE
              </div>
            </div>
          </div>
        </Container>

        {/* 13 — PLAN A FLIGHT (Final Flight CTA) */}
        <Container size="wide">
          <div className="relative overflow-hidden rounded-3xl border border-amber-400/30 glass-elevated p-10 sm:p-14 shadow-2xl">
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
              <div className="space-y-2 max-w-2xl">
                <span className="text-xs font-data text-amber-400 font-bold uppercase tracking-widest block">
                  READY TO FIND THE RIGHT WAY TO FLY?
                </span>
                <h3 className="text-3xl sm:text-4xl font-light text-white font-sans">
                  TELL US WHERE YOU&apos;RE GOING<span className="text-amber-400">.</span>
                </h3>
                <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] font-sans leading-relaxed">
                  AIR Decision Engine instantly compares jets, turboprops, and helicopters tailored for your exact mission parameters.
                </p>
              </div>

              <Button variant="primary" size="lg" asChild className="whitespace-nowrap shadow-xl">
                <Link href="/plan">
                  PLAN A FLIGHT NOW →
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

