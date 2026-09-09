import React from "react";
import Link from "next/link";
import { Container } from "../components/layout/Container";
import { Hero } from "../components/home/Hero";
import { DecisionEngine } from "../components/home/DecisionEngine";
import { SectionHeader } from "../components/shared/SectionHeader";
import { ProvenanceBadge } from "../components/shared/ProvenanceBadge";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { UnifiedAviationRepository } from "../lib/repositories/unified-aviation-repo";
import { JsonLd, createOrganizationJsonLd } from "../components/shared/JsonLd";
import { AviationImage } from "../components/AviationImage";


export const metadata = {
  title: "AIR — The Digital World of Aviation | Access & Intelligence Platform",
  description:
    "Explore the world of flight: private jets, turboprops, helicopters, certified airports, aircraft marketplace for sale, flight schools, and aviation regulations.",
};

const CITY_STRIP = [
  { city: "BUCHAREST", airport: "LRBS — Băneasa Executive", country: "Romania", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80", slug: "baneasa" },
  { city: "PARIS", airport: "LFPB — Le Bourget", country: "France", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80", slug: "destinations" },
  { city: "LONDON", airport: "EGLF — Farnborough", country: "United Kingdom", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80", slug: "destinations" },
  { city: "NICE", airport: "LFMN — Côte d'Azur", country: "France", image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80", slug: "destinations" },
  { city: "GENEVA", airport: "LSGG — Cointrin", country: "Switzerland", image: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=800&q=80", slug: "destinations" },
  { city: "MYKONOS", airport: "LGMK — Island Terminal", country: "Greece", image: "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?auto=format&fit=crop&w=800&q=80", slug: "destinations" },
  { city: "ROME", airport: "LIRA — Ciampino", country: "Italy", image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80", slug: "destinations" },
  { city: "DUBAI", airport: "OMDW — Al Maktoum", country: "UAE", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80", slug: "destinations" },
];

export default async function HomePage() {
  const aircraftModels = await UnifiedAviationRepository.getAircraftModels();
  const aircraftForSale = await UnifiedAviationRepository.getAircraftForSale();

  return (
    <>
      <JsonLd data={createOrganizationJsonLd()} />
      <div className="w-full flex flex-col gap-20 pb-20 bg-[var(--color-bg-primary)]">
        {/* 1. Hero */}
        <Hero />

        {/* 2. Mission Planner / Decision Engine */}
        <Container size="wide">
          <DecisionEngine />
        </Container>

        {/* 3. The World From Above — Cinematic City Strip */}
        <Container size="wide">
          <div className="flex flex-col gap-8 pt-8 border-t border-[var(--color-border)]">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-data text-[var(--color-accent)] uppercase tracking-widest">
                    THE WORLD FROM ABOVE // EDITORIAL GEOGRAPHY
                  </span>
                  <ProvenanceBadge status="VERIFIED" />
                </div>
                <SectionHeader
                  title="DESTINATIONS & AIRPORT INTELLIGENCE."
                  description="Explore premier European business aviation gateways, runway approaches, and FBO handling availability."
                />
              </div>
              <Link href="/destinations" className="text-xs font-data text-[var(--color-accent)] hover:underline whitespace-nowrap">
                ALL DESTINATIONS →
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {CITY_STRIP.map((c, i) => (
                <Link
                  key={i}
                  href={`/${c.slug}`}
                  className="group relative h-64 rounded-xl overflow-hidden border border-neutral-800 hover:border-amber-500/50 transition flex flex-col justify-end p-4 bg-neutral-900"
                >
                  <AviationImage src={c.image} alt={c.city} fill className="object-cover group-hover:scale-105 transition duration-500 opacity-60 group-hover:opacity-80" fallbackTitle={c.city} fallbackCode={`CITY // ${c.country}`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
                  <div className="relative z-10 space-y-1">
                    <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">{c.country}</span>
                    <h3 className="text-xl font-light text-white group-hover:text-amber-300 transition">{c.city}</h3>
                    <p className="text-[10px] font-mono text-neutral-400">{c.airport}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Container>

        {/* 4. Aircraft Marketplace For Sale */}
        <Container size="wide">
          <div className="flex flex-col gap-8 pt-8 border-t border-[var(--color-border)]">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-data text-[var(--color-accent)] uppercase tracking-widest">
                    AIRCRAFT MARKETPLACE // DISCOVERY LAYER
                  </span>
                  <ProvenanceBadge status="VERIFIED" />
                </div>
                <SectionHeader
                  title="AIRCRAFT FOR SALE."
                  description="Curated executive jets, turboprops, and helicopters from AvBuyer, GlobalAir, and Controller with verified marketplace provenance."
                />
              </div>
              <Link href="/aircraft-for-sale" className="text-xs font-data text-[var(--color-accent)] hover:underline whitespace-nowrap">
                BROWSE MARKETPLACE →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {aircraftForSale.slice(0, 3).map((item) => (
                <Card key={item.id} variant="surface" className="p-6 flex flex-col justify-between gap-4 group hover:border-[var(--color-accent)] transition-colors">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-data text-[var(--color-accent)]">SOURCE: {item.externalSource}</span>
                      <span className="text-[10px] font-data text-amber-300 font-bold">{item.year}</span>
                    </div>
                    <h3 className="text-xl font-light text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors font-sans">{item.title}</h3>
                    <p className="text-xs text-[var(--color-text-secondary)] font-mono">
                      Seats: {item.passengerCapacity} • Range: {item.rangeNm} NM • Hours: {item.totalHours} hrs
                    </p>
                    <p className="text-sm font-bold text-amber-300 font-mono pt-2 border-t border-[var(--color-border-subtle)]">
                      {item.priceFormatted}
                    </p>
                  </div>

                  <Link href="/aircraft-for-sale" className="text-xs font-data text-[var(--color-accent)] hover:underline">
                    VIEW MARKETPLACE LISTING →
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </Container>

        {/* 5. Verified Aircraft Explorer */}
        <Container size="wide">
          <div className="flex flex-col gap-8 pt-8 border-t border-[var(--color-border)]">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-data text-[var(--color-accent)] uppercase tracking-widest">
                    AIRCRAFT MODEL EXPLORER // MANUFACTURER DATA
                  </span>
                  <ProvenanceBadge status="OFFICIAL_SOURCE" />
                </div>
                <SectionHeader
                  title="AIRCRAFT INTELLIGENCE."
                  description="Manufacturer specifications, cabin dimensions, runway performance, and mission suitability profiles."
                />
              </div>
              <Link href="/aircraft" className="text-xs font-data text-[var(--color-accent)] hover:underline whitespace-nowrap">
                EXPLORE ALL AIRCRAFT →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {aircraftModels.slice(0, 3).map((ac) => (
                <Card key={ac.id} variant="surface" className="p-6 flex flex-col justify-between gap-4 group hover:border-[var(--color-accent)] transition-colors">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-data text-[var(--color-accent)]">{ac.category.replace(/_/g, " ")}</span>
                      <ProvenanceBadge status={ac.dataStatus} />
                    </div>
                    <h3 className="text-xl font-light text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors">{ac.manufacturer} {ac.model}</h3>
                    <p className="text-xs text-[var(--color-text-secondary)] font-sans leading-relaxed">
                      Speed: {ac.typicalCruiseSpeed} KTS • Range: {ac.approximateRange} NM • Seats: {ac.passengerCapacity}
                    </p>
                  </div>

                  <Link href={`/aircraft/${ac.slug}`} className="text-xs font-data text-[var(--color-accent)] hover:underline">
                    VIEW AIRCRAFT SPECS →
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </Container>

        {/* 6. Băneasa Gateway Spotlight */}
        <Container size="wide">
          <div className="p-8 md:p-12 bg-[var(--color-surface)] border border-[var(--color-border)] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="flex flex-col gap-4 max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="text-xs font-data text-[var(--color-accent)] uppercase tracking-widest">
                  BUCHAREST AVIATION HUB // LRBS / BBU
                </span>
                <ProvenanceBadge status="OFFICIAL_SOURCE" sourceName="CNAB AIP Romania" showSource />
              </div>
              <h2 className="text-3xl font-light text-[var(--color-text-primary)] font-sans">
                BUCHAREST BĂNEASA (LRBS / BBU).
              </h2>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed font-sans">
                Romania&apos;s premier dedicated executive aviation terminal. 2,358m asphalt runway (07/25), fast-track FBO lounges, zero commercial airline delays, and 10-minute access to Bucharest CBD.
              </p>
            </div>

            <Link href="/baneasa">
              <Button variant="primary" size="lg">
                EXPLORE BĂNEASA HUB (LRBS) →
              </Button>
            </Link>
          </div>
        </Container>

        {/* 7. Learn to Fly & Flight Schools */}
        <Container size="wide">
          <div className="p-8 md:p-12 bg-neutral-900/40 border border-neutral-800 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-8 backdrop-blur-xl">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest">
                PILOT PATHWAY & FLIGHT SCHOOLS
              </span>
              <h2 className="text-3xl font-light text-white">How Do I Become a Pilot?</h2>
              <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                Explore step-by-step EASA pilot training roadmaps, Class 1 medical requirements, PPL to ATPL licensing pathways, and verified Approved Training Organizations (ATOs).
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href="/aviation/learn/pilot-guide">
                <Button variant="primary" size="md">
                  PILOT ROADMAP →
                </Button>
              </Link>
              <Link href="/aviation/schools">
                <Button variant="secondary" size="md">
                  FLIGHT SCHOOLS DIRECTORY →
                </Button>
              </Link>
            </div>
          </div>
        </Container>

        {/* 8. Final Flight Planning CTA */}
        <Container size="wide">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-10 bg-[var(--color-surface)] border border-[var(--color-border)]">
            <div className="flex flex-col gap-2">
              <h3 className="text-2xl font-light text-[var(--color-text-primary)] font-sans">
                READY TO FIND THE RIGHT WAY TO FLY?
              </h3>
              <p className="text-xs text-[var(--color-text-secondary)] font-sans">
                Tell us where you are going. AIR Decision Engine compares jets, turboprops, and helicopters for your exact mission.
              </p>
            </div>

            <Link href="/plan">
              <Button variant="primary" size="lg">
                PLAN A FLIGHT NOW →
              </Button>
            </Link>
          </div>
        </Container>
      </div>
    </>
  );
}
