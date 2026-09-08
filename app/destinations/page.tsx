import React from "react";
import Link from "next/link";
import { Container } from "../../components/layout/Container";
import { SectionHeader } from "../../components/shared/SectionHeader";
import { DataStatusBadge } from "../../components/shared/DataStatusBadge";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";

export const metadata = {
  title: "Romania Regional Aviation Destinations | AIR",
  description:
    "Explore air access across Romania—Bran Castle, Transylvania, Brașov, Constanța, Cluj-Napoca, Sibiu, and Danube Delta.",
};

export default function DestinationsPage() {
  const regions = [
    { name: "Bran & Brașov", slug: "bran", desc: "Transylvanian mountain resorts & castle helipads.", time: "42 min Heli / 25 min Flight" },
    { name: "Constanța & Black Sea", slug: "constanta", desc: "Mamaia beach pads & LRCK executive handling.", time: "35 min Heli / 30 min Turboprop" },
    { name: "Cluj-Napoca Hub", slug: "cluj", desc: "LRCL airport & Transylvanian tech corridor access.", time: "50 min Light Jet" },
    { name: "Sibiu Cultural Hub", slug: "sibiu", desc: "LRSB medieval quarter & southern Transylvania.", time: "40 min Turboprop" },
  ];

  return (
    <div className="w-full py-16 bg-[var(--color-bg-primary)] flex-1 flex flex-col gap-16">
      <Container size="wide">
        <div className="flex flex-col gap-16">
          <div className="flex flex-col gap-4 border-b border-[var(--color-border)] pb-8">
            <div className="flex items-center gap-3">
              <span className="text-xs font-data text-[var(--color-accent)] uppercase tracking-widest">
                REGIONAL DISPATCH // ROMANIA
              </span>
              <DataStatusBadge status="INDICATIVE" />
            </div>

            <SectionHeader
              title="ROMANIA AVIATION ACCESS."
              description="AIR optimizes access across Romania's key economic centers, mountain helipads, coastal FBOs, and regional airfields."
              titleAs="h1"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {regions.map((r) => (
              <Card key={r.slug} variant="surface" className="flex flex-col justify-between gap-6 p-8">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-data text-[var(--color-accent)]">DESTINATION</span>
                    <DataStatusBadge status="INDICATIVE" showDot={false} />
                  </div>
                  <h3 className="text-xl font-light text-[var(--color-text-primary)]">{r.name}</h3>
                  <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed font-sans">{r.desc}</p>
                </div>
                <div className="pt-4 border-t border-[var(--color-border-subtle)] flex flex-col gap-3">
                  <span className="text-[10px] font-data text-[var(--color-text-muted)]">ACCESS: {r.time}</span>
                  <Link href={`/destinations/${r.slug}`}>
                    <Button variant="outline" size="sm" fullWidth>VIEW ACCESS DETAILS →</Button>
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
