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

export const metadata = {
  title: "AIR — The Easiest Way to Fly | Aviation Access & Intelligence Platform",
  description:
    "AIR is an aviation access, discovery, and decision platform connecting private jets, helicopters, turboprops, experiences, and destinations from Bucharest Băneasa (LRBS) across Europe.",
};

export default async function HomePage() {
  const routes = await UnifiedAviationRepository.getRoutes();
  const aircraftModels = await UnifiedAviationRepository.getAircraftModels();
  const companies = await UnifiedAviationRepository.getCompanies();
  const journalArticles = await UnifiedAviationRepository.getJournalArticles();
  const regions = await UnifiedAviationRepository.getAerialRegions();

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

        {/* 3. Verified Route Intelligence */}
        <Container size="wide">
          <div className="flex flex-col gap-8 pt-8 border-t border-[var(--color-border)]">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-data text-[var(--color-accent)] uppercase tracking-widest">
                    ROUTE INTELLIGENCE // BĂNEASA EXECUTIVE GATEWAY (LRBS)
                  </span>
                  <ProvenanceBadge status="AIR_CALCULATED" />
                </div>
                <SectionHeader
                  title="FEATURED EXECUTIVE ROUTES."
                  description="Great-Circle navigation profiles and AIR calculated flight durations for high-demand business missions."
                />
              </div>
              <Link href="/routes" className="text-xs font-data text-[var(--color-accent)] hover:underline whitespace-nowrap">
                VIEW ALL ROUTES →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {routes.slice(0, 4).map((r) => (
                <Card key={r.id} variant="surface" className="p-6 flex flex-col justify-between gap-4 group hover:border-[var(--color-accent)] transition-colors">
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-data text-[var(--color-accent)]">{r.distanceNm} NM • {r.routeType.replace(/_/g, " ")}</span>
                    <h3 className="text-lg font-light text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors font-sans">{r.title}</h3>
                    <p className="text-xs text-[var(--color-text-secondary)]">Light Jet: {r.calculatedDuration.lightJet}</p>
                  </div>

                  <Link href={`/routes/${r.slug}`} className="text-xs font-data text-[var(--color-accent)] hover:underline">
                    EXPLORE PROFILE →
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </Container>

        {/* 4. Verified Aircraft Explorer */}
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
                    {ac.cabinHighlights && (
                      <p className="text-xs text-[var(--color-text-muted)] line-clamp-2 italic font-sans">
                        &quot;{ac.cabinHighlights}&quot;
                      </p>
                    )}
                  </div>

                  <Link href={`/aircraft/${ac.slug}`} className="text-xs font-data text-[var(--color-accent)] hover:underline">
                    VIEW AIRCRAFT SPECS →
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </Container>

        {/* 5. Băneasa Gateway Spotlight */}
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

        {/* 6. Signature Property: Romania From Above */}
        <Container size="wide">
          <div className="flex flex-col gap-8 pt-8 border-t border-[var(--color-border)]">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-data text-[var(--color-accent)] uppercase tracking-widest">
                    SIGNATURE PROPERTY // ROMANIA FROM ABOVE
                  </span>
                  <ProvenanceBadge status="PUBLIC" />
                </div>
                <SectionHeader
                  title="AERIAL DISCOVERY & SCENIC CORRIDORS."
                  description="Curated aerial perspectives over Transylvania, the Carpathians, and Black Sea coastlines."
                />
              </div>
              <Link href="/romania-from-above" className="text-xs font-data text-[var(--color-accent)] hover:underline whitespace-nowrap">
                DISCOVER REGIONS →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {regions.map((reg) => (
                <Card key={reg.id} variant="surface" className="p-6 flex flex-col justify-between gap-4 group hover:border-[var(--color-accent)] transition-colors">
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-data text-[var(--color-accent)]">REGION // {reg.country}</span>
                    <h3 className="text-xl font-light text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors">{reg.name}</h3>
                    <p className="text-xs text-[var(--color-text-secondary)] font-sans">{reg.subtitle}</p>
                  </div>

                  <Link href={`/romania-from-above/${reg.slug}`} className="text-xs font-data text-[var(--color-accent)] hover:underline">
                    VIEW REGIONAL PROFILE →
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </Container>

        {/* 7. Verified Romanian Aviation Directory */}
        <Container size="wide">
          <div className="flex flex-col gap-8 pt-8 border-t border-[var(--color-border)]">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-data text-[var(--color-accent)] uppercase tracking-widest">
                    VERIFIED DIRECTORY // ROMANIAN AVIATION ECOSYSTEM
                  </span>
                  <ProvenanceBadge status="OFFICIAL_SOURCE" />
                </div>
                <SectionHeader
                  title="VERIFIED AVIATION PROVIDERS."
                  description="AACR authorized air operators, certified FBO handlers, maintenance organizations, and flight academies."
                />
              </div>
              <Link href="/aviation" className="text-xs font-data text-[var(--color-accent)] hover:underline whitespace-nowrap">
                DIRECTORY INDEX →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {companies.slice(0, 3).map((comp) => (
                <Card key={comp.id} variant="surface" className="p-6 flex flex-col justify-between gap-4 group hover:border-[var(--color-accent)] transition-colors">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-data text-[var(--color-accent)]">{comp.category.replace(/_/g, " ")}</span>
                      <ProvenanceBadge status={comp.dataStatus} />
                    </div>
                    <h3 className="text-lg font-light text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors">{comp.displayName}</h3>
                    <p className="text-xs text-[var(--color-text-secondary)]">{comp.baseAirportName || comp.city}</p>
                  </div>

                  <Link href={`/aviation/companies/${comp.slug}`} className="text-xs font-data text-[var(--color-accent)] hover:underline">
                    VIEW PROFILE →
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </Container>

        {/* 8. Aviation Journal Feature */}
        <Container size="wide">
          <div className="flex flex-col gap-8 pt-8 border-t border-[var(--color-border)]">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-data text-[var(--color-accent)] uppercase tracking-widest">
                    AIR JOURNAL // EDITORIAL AVIATION INTELLIGENCE
                  </span>
                  <ProvenanceBadge status="OFFICIAL_SOURCE" />
                </div>
                <SectionHeader
                  title="EDITORIAL PUBLICATION."
                  description="In-depth analysis of charter mechanics, jet vs turboprop economics, AOC verification, and FBO operations."
                />
              </div>
              <Link href="/journal" className="text-xs font-data text-[var(--color-accent)] hover:underline whitespace-nowrap">
                ALL JOURNAL ARTICLES →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {journalArticles.slice(0, 2).map((art) => (
                <Card key={art.id} variant="surface" className="p-8 flex flex-col justify-between gap-4 group hover:border-[var(--color-accent)] transition-colors">
                  <div className="flex flex-col gap-3">
                    <span className="text-[10px] font-data text-[var(--color-accent)]">{art.category.replace(/_/g, " ")} • {art.readTimeMinutes} MIN READ</span>
                    <h3 className="text-2xl font-light text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors font-sans leading-snug">{art.title}</h3>
                    <p className="text-xs font-sans text-[var(--color-text-secondary)] leading-relaxed">{art.subtitle}</p>
                  </div>

                  <Link href={`/journal/${art.slug}`} className="text-xs font-data text-[var(--color-accent)] hover:underline pt-4 border-t border-[var(--color-border-subtle)]">
                    READ ARTICLE →
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </Container>

        {/* 9. Final Flight Planning CTA */}
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
