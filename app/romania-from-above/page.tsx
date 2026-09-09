import React from "react";
import Link from "next/link";
import { Container } from "../../components/layout/Container";
import { SectionHeader } from "../../components/shared/SectionHeader";
import { ProvenanceBadge } from "../../components/shared/ProvenanceBadge";
import { Card } from "../../components/ui/Card";
import { UnifiedAviationRepository } from "../../lib/repositories/unified-aviation-repo";

export const metadata = {
  title: "Romania From Above — Signature Aerial Discovery | AIR",
  description:
    "Explore Transylvania, Carpathian mountain ridges, Black Sea coastlines, and the Danube Delta from an aerial perspective.",
};

export default async function RomaniaFromAboveIndexPage() {
  const regions = await UnifiedAviationRepository.getAerialRegions();

  return (
    <div className="w-full py-16 bg-[var(--color-bg-primary)] flex-1 flex flex-col gap-12">
      <Container size="wide">
        <div className="flex flex-col gap-12">
          {/* Header */}
          <div className="flex flex-col gap-4 border-b border-[var(--color-border)] pb-8">
            <div className="flex items-center gap-3">
              <span className="text-xs font-data text-[var(--color-accent)] uppercase tracking-widest">
                SIGNATURE AIR DISCOVERY // ROMANIA FROM ABOVE
              </span>
              <ProvenanceBadge status="PUBLIC" />
            </div>

            <SectionHeader
              title="ROMANIA FROM ABOVE."
              description="Discover Transylvania's medieval fortresses, Carpathian mountain passes, Danube Delta waterways, and coastal Riviera from a curated aerial perspective."
              titleAs="h1"
            />
          </div>

          {/* Regional Landing Disclosure Notice */}
          <div className="p-6 bg-[var(--color-surface)] border border-[var(--color-border)] text-xs text-[var(--color-text-secondary)] leading-relaxed">
            <strong className="text-[var(--color-accent)] font-data block mb-1">OPERATIONAL & LEGAL DISCLOSURE:</strong>
            Scenic flight corridors and aerial discovery regions do not imply unrestricted helicopter landing permissions. Aircraft landings are strictly performed at certified aerodromes or designated helipads operating under Prior Permission Required (PPR). AIR never guarantees off-airport landing authorization.
          </div>

          {/* Regions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {regions.map((reg) => (
              <Card key={reg.id} variant="surface" className="flex flex-col justify-between p-8 gap-6 group hover:border-[var(--color-accent)] transition-colors">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-data text-[var(--color-accent)] uppercase tracking-widest">
                      REGION // {reg.country}
                    </span>
                    <ProvenanceBadge status={reg.dataStatus} />
                  </div>

                  <h2 className="text-2xl font-light text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors font-sans">
                    {reg.name}
                  </h2>

                  <p className="text-xs font-sans text-[var(--color-text-secondary)] leading-relaxed">
                    {reg.subtitle}
                  </p>

                  <div className="flex flex-col gap-2 pt-2 border-t border-[var(--color-border-subtle)]">
                    <span className="text-[10px] font-data text-[var(--color-text-muted)]">AERIAL HIGHLIGHTS</span>
                    <ul className="flex flex-col gap-1 text-xs text-[var(--color-text-secondary)] font-sans">
                      {reg.aerialHighlights.slice(0, 3).map((hl, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2">
                          <span className="text-[var(--color-accent)] font-data">•</span>
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border-subtle)]">
                  <span className="text-[10px] font-data text-[var(--color-text-muted)]">NEARBY AIRPORTS: {reg.nearbyCertifiedAirports.length}</span>
                  <Link href={`/romania-from-above/${reg.slug}`} className="text-xs font-data text-[var(--color-accent)] hover:underline">
                    EXPLORE REGIONAL DISCOVERY →
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
