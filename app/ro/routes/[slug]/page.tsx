import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ProvenanceBadge } from "@/components/shared/ProvenanceBadge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { UnifiedAviationRepository } from "@/lib/repositories/unified-aviation-repo";
import { createRouteMetadata } from "@/lib/seo/metadata";
import { PRIORITY_ROUTE_SLUGS } from "@/lib/i18n/routes";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PRIORITY_ROUTE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const route = await UnifiedAviationRepository.getRouteBySlug(slug);

  if (!route) {
    return { title: "Rută Negăsită | AIR by Cristian Văduva" };
  }

  return createRouteMetadata({
    path: `/ro/routes/${slug}`,
    title: `Zbor Privat ${route.originCity} – ${route.destinationCity} | AIR by Cristian Văduva`,
    description: `Timp de zbor estimat, opțiuni aeroportuare și aeronave recomandate pentru ruta executivă ${route.originCity} – ${route.destinationCity}.`,
  });
}

export default async function RomanianRouteDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const route = await UnifiedAviationRepository.getRouteBySlug(slug);

  if (!route) {
    notFound();
  }

  const allAircraft = await UnifiedAviationRepository.getAircraftModels();
  const recommendedAircraft = allAircraft.filter((ac) =>
    route.recommendedAircraftSlugs.includes(ac.slug)
  );

  const allCompanies = await UnifiedAviationRepository.getCompanies();
  const relatedCompanies = allCompanies.filter((c) =>
    route.relatedCompanySlugs.includes(c.slug)
  );

  return (
    <div className="w-full py-16 bg-[var(--color-bg-primary)] flex-1 flex flex-col gap-12 font-sans">
      <Container size="wide">
        <div className="flex flex-col gap-12">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-text-muted)]">
            <Link href="/ro" className="hover:text-[var(--color-text-primary)]">ACASĂ</Link>
            <span>/</span>
            <Link href="/routes" className="hover:text-[var(--color-text-primary)]">RUTE</Link>
            <span>/</span>
            <span className="text-[var(--color-text-primary)] font-bold">{route.originCity} → {route.destinationCity}</span>
          </div>

          {/* Header */}
          <div className="flex flex-col gap-4 border-b border-[var(--color-border)] pb-8">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-amber-500 font-bold uppercase tracking-widest">
                DOSAR RUTĂ EXECUTIVĂ // {route.originIcao || route.originIata} → {route.destinationIcao || route.destinationIata}
              </span>
              <ProvenanceBadge status={route.dataStatus} sourceName="ROMATSA / EUROCONTROL" showSource />
            </div>

            <SectionHeader
              title={`ZBOR PRIVAT ${route.originCity.toUpperCase()} – ${route.destinationCity.toUpperCase()}`}
              description={`Distanță ortodromică (Great-Circle): ${route.distanceNm} NM (${Math.round(route.distanceNm * 1.852)} km). ${route.suitabilityNotes}`}
              titleAs="h1"
            />
          </div>

          {/* Operational Classification Notice */}
          <div className="p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] text-xs text-[var(--color-text-secondary)] leading-relaxed">
            <strong className="text-amber-500 font-mono block mb-1">
              NOTĂ CLASIFICARE OPERAȚIONALĂ & CONFORMITATE:
            </strong>
            Această pagină ilustrează parametrii tehnici ai unei misiuni charter private între hub-ul executiv București Băneasa (LRBS) și {route.destinationCity}. Este o cursă aeriană la cerere (on-demand), nefiind un zbor de linie cu orar fix. Toate zborurile sunt operate exclusiv de transportatori aerieni licențiați deținători de Certificat de Operator Aerian (AOC).
          </div>

          {/* AIR Calculated Flight Durations Matrix */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-mono text-amber-500 font-bold uppercase tracking-widest">
                TIMPI DE ZBOR ESTIMATIVI (CALCUL BAZAT PE VITEZA DE CROAZIERĂ)
              </h2>
              <span className="text-[10px] font-mono text-[var(--color-text-muted)]">
                ESTIMARE TIMP ÎN AER (AIRBORNE TIME)
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card variant="surface" className="p-5 flex flex-col gap-1 rounded-2xl">
                <span className="text-[10px] font-mono text-[var(--color-text-muted)]">VERY LIGHT JET (380 KTS)</span>
                <span className="text-2xl font-light text-[var(--color-text-primary)] font-mono">{route.calculatedDuration.vljet || "N/A"}</span>
                <span className="text-[9px] text-neutral-400 font-mono mt-1">ex: Phenom 100EV</span>
              </Card>

              <Card variant="surface" className="p-5 flex flex-col gap-1 rounded-2xl">
                <span className="text-[10px] font-mono text-[var(--color-text-muted)]">LIGHT JET (420 KTS)</span>
                <span className="text-2xl font-light text-[var(--color-text-primary)] font-mono">{route.calculatedDuration.lightJet || "N/A"}</span>
                <span className="text-[9px] text-neutral-400 font-mono mt-1">ex: Phenom 300E</span>
              </Card>

              <Card variant="surface" className="p-5 flex flex-col gap-1 rounded-2xl">
                <span className="text-[10px] font-mono text-[var(--color-text-muted)]">SUPER MIDSIZE (470 KTS)</span>
                <span className="text-2xl font-light text-[var(--color-text-primary)] font-mono">{route.calculatedDuration.superMidsize || "N/A"}</span>
                <span className="text-[9px] text-neutral-400 font-mono mt-1">ex: Challenger 350</span>
              </Card>

              <Card variant="surface" className="p-5 flex flex-col gap-1 rounded-2xl">
                <span className="text-[10px] font-mono text-[var(--color-text-muted)]">TURBOPROP (280 KTS)</span>
                <span className="text-2xl font-light text-[var(--color-text-primary)] font-mono">{route.calculatedDuration.turboprop || "N/A"}</span>
                <span className="text-[9px] text-neutral-400 font-mono mt-1">ex: Pilatus PC-12</span>
              </Card>
            </div>

            <p className="text-[11px] text-[var(--color-text-muted)] font-mono leading-relaxed mt-1">
              * Notă metodologică: Timpii afișați reprezintă estimări de timp în aer (airborne time) calculate pe distanța ortodromică directă. Nu includ timpii de rulare la sol (taxi time), vânturile de înălțime (jet stream) sau procedurile specifice de apropiere instrumentală ale fiecărui aeroport.
            </p>
          </div>

          {/* Airport & Transfer Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card variant="surface" className="p-6 flex flex-col gap-4 rounded-3xl">
              <h3 className="text-xs font-mono text-[var(--color-text-primary)] uppercase tracking-wider border-b border-[var(--color-border-subtle)] pb-3 font-bold">
                OPȚIUNI AEROPORTUARE RECOMANDATE
              </h3>
              <ul className="flex flex-col gap-2.5 text-xs text-[var(--color-text-secondary)] font-sans">
                {route.airportOptions.map((opt, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>{opt}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card variant="surface" className="p-6 flex flex-col gap-4 rounded-3xl">
              <h3 className="text-xs font-mono text-[var(--color-text-primary)] uppercase tracking-wider border-b border-[var(--color-border-subtle)] pb-3 font-bold">
                TRANSFER LA SOL ȘI CONEXIUNI ELICOPTER
              </h3>
              <ul className="flex flex-col gap-2.5 text-xs text-[var(--color-text-secondary)] font-sans">
                {route.transferPossibilities.map((tf, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>{tf}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Recommended Aircraft Models */}
          {recommendedAircraft.length > 0 && (
            <div className="flex flex-col gap-6 pt-6 border-t border-[var(--color-border)]">
              <h2 className="text-xs font-mono text-amber-500 font-bold uppercase tracking-widest">
                AERONAVE RECOMANDATE PENTRU ACEASTĂ RUTĂ
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recommendedAircraft.map((ac) => (
                  <Card key={ac.id} variant="surface" className="p-6 flex flex-col justify-between gap-4 rounded-3xl">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-amber-500 font-bold">{ac.category.replace(/_/g, " ")}</span>
                        <ProvenanceBadge status={ac.dataStatus} />
                      </div>
                      <h3 className="text-lg font-light text-[var(--color-text-primary)]">{ac.manufacturer} {ac.model}</h3>
                      <p className="text-xs text-[var(--color-text-secondary)]">
                        Viteză: {ac.typicalCruiseSpeed} KTS • Autonomie: {ac.approximateRange} NM • Pasageri: {ac.passengerCapacity} locuri
                      </p>
                    </div>

                    <Link href={`/aircraft/${ac.slug}`} className="text-xs font-mono text-amber-400 hover:underline">
                      SPECIFICAȚII TEHNICE AERONAVĂ →
                    </Link>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Related Verified Companies */}
          {relatedCompanies.length > 0 && (
            <div className="flex flex-col gap-6 pt-6 border-t border-[var(--color-border)]">
              <h2 className="text-xs font-mono text-amber-500 font-bold uppercase tracking-widest">
                FURNIZORI DE SERVICII LA SOL & OPERATORI ASOCIAȚI
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedCompanies.map((comp) => (
                  <Card key={comp.id} variant="surface" className="p-6 flex flex-col justify-between gap-4 rounded-3xl">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-amber-500 font-bold">{comp.category.replace(/_/g, " ")}</span>
                        <ProvenanceBadge status={comp.dataStatus} />
                      </div>
                      <h3 className="text-lg font-light text-[var(--color-text-primary)]">{comp.displayName}</h3>
                      <p className="text-xs text-[var(--color-text-secondary)]">
                        {comp.baseAirportName || comp.city}
                      </p>
                    </div>

                    <Link href={`/aviation/companies/${comp.slug}`} className="text-xs font-mono text-amber-400 hover:underline">
                      DETALII COMPANIE →
                    </Link>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Action CTAs */}
          <div className="p-8 sm:p-12 rounded-3xl bg-neutral-950 text-white border border-amber-500/30 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest block">
                CERERE OFERTĂ INDICATIVĂ
              </span>
              <h3 className="text-2xl sm:text-3xl font-light font-sans">
                Planifică un Zbor Privat către {route.destinationCity}
              </h3>
              <p className="text-xs text-neutral-300 max-w-xl font-sans">
                Tarifele charter depind de disponibilitatea flotei, poziționarea aeronavei și data exactă. Solicitați o cotație indicativă prin biroul nostru de concierge.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href={`/plan?from=${encodeURIComponent(route.originCity)}&to=${encodeURIComponent(route.destinationCity)}`}>
                <Button variant="primary" size="lg" className="whitespace-nowrap px-8 shadow-xl">
                  SOLICITĂ COTAȚIE ZBOR →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
