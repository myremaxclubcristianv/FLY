import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "../../../components/layout/Container";
import { SectionHeader } from "../../../components/shared/SectionHeader";
import { ProvenanceBadge } from "../../../components/shared/ProvenanceBadge";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { UnifiedAviationRepository } from "../../../lib/repositories/unified-aviation-repo";

interface PageProps {
  params: Promise<{ region: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { region: slug } = await params;
  const reg = await UnifiedAviationRepository.getAerialRegionBySlug(slug);

  if (!reg) {
    return { title: "Region Profile Not Found | AIR" };
  }

  return {
    title: `${reg.name} — Aerial Discovery & Flight Access | AIR`,
    description: reg.subtitle,
  };
}

export default async function AerialRegionDetailPage({ params }: PageProps) {
  const { region: slug } = await params;
  const reg = await UnifiedAviationRepository.getAerialRegionBySlug(slug);

  if (!reg) {
    notFound();
  }

  return (
    <div className="w-full py-16 bg-[var(--color-bg-primary)] flex-1 flex flex-col gap-12">
      <Container size="wide">
        <div className="flex flex-col gap-12">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-data text-[var(--color-text-muted)]">
            <Link href="/romania-from-above" className="hover:text-[var(--color-text-primary)]">ROMANIA FROM ABOVE</Link>
            <span>/</span>
            <span className="text-[var(--color-text-primary)]">{reg.name}</span>
          </div>

          {/* Header */}
          <div className="flex flex-col gap-4 border-b border-[var(--color-border)] pb-8">
            <div className="flex items-center gap-3">
              <span className="text-xs font-data text-[var(--color-accent)] uppercase tracking-widest">
                AERIAL REGION DISCOVERY // {reg.country}
              </span>
              <ProvenanceBadge status={reg.dataStatus} sourceName={reg.source?.name} sourceUrl={reg.source?.url} showSource />
            </div>

            <SectionHeader
              title={reg.name.toUpperCase()}
              description={reg.subtitle}
              titleAs="h1"
            />
          </div>

          {/* Landing Access Disclaimer Card */}
          <Card variant="surface" className="p-6 border-l-4 border-l-[var(--color-accent)] flex flex-col gap-2">
            <span className="text-[10px] font-data text-[var(--color-accent)] uppercase tracking-widest">
              LANDING ACCESS & REGULATORY DISCLAIMER
            </span>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed font-sans">
              {reg.landingAccessNote}
            </p>
          </Card>

          {/* Aerial Highlights */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xs font-data text-[var(--color-accent)] uppercase tracking-widest">
              AERIAL PANORAMA & FLIGHT CORRIDOR HIGHLIGHTS
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reg.aerialHighlights.map((hl, idx) => (
                <Card key={idx} variant="surface" className="p-6 flex items-start gap-3">
                  <span className="text-sm font-data text-[var(--color-accent)]">0{idx + 1}</span>
                  <p className="text-xs text-[var(--color-text-primary)] font-sans leading-relaxed">{hl}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Nearby Certified Gateways & Transfer Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card variant="surface" className="p-6 flex flex-col gap-4">
              <h3 className="text-sm font-data text-[var(--color-text-primary)] uppercase tracking-wider border-b border-[var(--color-border-subtle)] pb-3">
                NEARBY CERTIFIED AERODROMES & AIRPORTS
              </h3>
              <ul className="flex flex-col gap-2.5 text-xs text-[var(--color-text-secondary)] font-sans">
                {reg.nearbyCertifiedAirports.map((ap, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[var(--color-accent)] font-data">•</span>
                    <span>{ap}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card variant="surface" className="p-6 flex flex-col gap-4">
              <h3 className="text-sm font-data text-[var(--color-text-primary)] uppercase tracking-wider border-b border-[var(--color-border-subtle)] pb-3">
                TRANSFER & NAVIGATION CONSIDERATIONS
              </h3>
              <div className="flex flex-col gap-3">
                <ul className="flex flex-col gap-2.5 text-xs text-[var(--color-text-secondary)] font-sans">
                  {reg.transferOptions.map((tf, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[var(--color-accent)] font-data">•</span>
                      <span>{tf}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-3 border-t border-[var(--color-border-subtle)] text-xs text-[var(--color-text-muted)]">
                  <strong>WEATHER:</strong> {reg.weatherConsiderations}
                </div>
              </div>
            </Card>
          </div>

          {/* Action Trigger */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-8 bg-[var(--color-surface)] border border-[var(--color-border)]">
            <div>
              <h4 className="text-xl font-light text-[var(--color-text-primary)]">
                PLAN AN AERIAL EXPERIENCE OR FLIGHT TO THIS REGION
              </h4>
              <p className="text-xs text-[var(--color-text-secondary)]">
                Select scenic flight options or twin-engine helicopter positioning to certified gateways.
              </p>
            </div>
            <Link href={`/plan?destination=${encodeURIComponent(reg.name)}`}>
              <Button variant="primary" size="lg">
                PLAN REGIONAL MISSION →
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
