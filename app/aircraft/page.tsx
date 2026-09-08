import React from "react";
import Link from "next/link";
import { Container } from "../../components/layout/Container";
import { SectionHeader } from "../../components/shared/SectionHeader";
import { DataStatusBadge } from "../../components/shared/DataStatusBadge";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { PlaceholderImage } from "../../components/shared/PlaceholderImage";
import { AircraftMatcher } from "../../components/aircraft/AircraftMatcher";
import { DEMO_AIRCRAFT } from "../../data/demo/aircraft";

export const metadata = {
  title: "Aircraft Explorer & Category Intelligence | AIR",
  description:
    "Explore aircraft categories—helicopters, turboprops, light jets, midsize, and large cabin jets—matched to mission performance parameters.",
};

export default function AircraftPage() {
  const categories = [
    { name: "HELICOPTER", desc: "Point-to-point direct helipad access bypassing airport runways.", range: "300 - 450 NM", seats: "5 - 7 SEATS", speed: "145 KTS" },
    { name: "TURBOPROP", desc: "Short-field regional airfield access with jet-like cabin room.", range: "1,100 - 1,800 NM", seats: "6 - 9 SEATS", speed: "280 KTS" },
    { name: "VERY LIGHT JET", desc: "Rapid 1-2 hour European regional flights for 4 passengers.", range: "1,100 - 1,400 NM", seats: "4 - 5 SEATS", speed: "380 KTS" },
    { name: "LIGHT JET", desc: "Efficient European travel connecting small & major airports.", range: "1,400 - 2,100 NM", seats: "6 - 8 SEATS", speed: "420 KTS" },
    { name: "MIDSIZE JET", desc: "Transcontinental endurance with stand-up cabin comfort.", range: "2,500 - 3,400 NM", seats: "8 - 10 SEATS", speed: "460 KTS" },
    { name: "LARGE CABIN JET", desc: "Non-stop intercontinental capability with flight attendant.", range: "4,000 - 6,500 NM", seats: "12 - 16 SEATS", speed: "490 KTS" },
  ];

  return (
    <div className="w-full py-16 bg-[var(--color-bg-primary)] flex-1 flex flex-col gap-16">
      <Container size="wide">
        <div className="flex flex-col gap-16">
          {/* Header */}
          <div className="flex flex-col gap-4 border-b border-[var(--color-border)] pb-8">
            <div className="flex items-center gap-3">
              <span className="text-xs font-data text-[var(--color-accent)] uppercase tracking-widest">
                WORLD // 04 AIRCRAFT INTELLIGENCE
              </span>
              <DataStatusBadge status="INDICATIVE" />
            </div>

            <SectionHeader
              title="AIRCRAFT CATEGORIES & CAPABILITIES."
              description="AIR translates complex aircraft technical specifications into clear mission capabilities—seating payload, cruise speed, range envelope, and landing field requirements."
              titleAs="h1"
            />
          </div>

          {/* Interactive Aircraft Matcher */}
          <AircraftMatcher />

          {/* Categories Grid */}
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] pb-4">
              <h2 className="text-2xl font-light text-[var(--color-text-primary)]">
                AIRCRAFT CATEGORY INTELLIGENCE
              </h2>
              <span className="text-xs font-data text-[var(--color-text-muted)]">
                8 CATEGORIES DEFINED
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat) => (
                <Card key={cat.name} variant="surface" className="flex flex-col justify-between gap-6 p-0 overflow-hidden">
                  <PlaceholderImage
                    title={cat.name}
                    code={cat.name}
                    aspectRatio="video"
                  />

                  <div className="p-6 pt-0 flex flex-col justify-between flex-1 gap-6">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-data text-[var(--color-accent)]">
                          {cat.name}
                        </span>
                        <DataStatusBadge status="INDICATIVE" showDot={false} />
                      </div>
                      <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                        {cat.desc}
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[var(--color-border-subtle)] text-[10px] font-data text-[var(--color-text-muted)]">
                      <div>
                        <span className="block text-[8px] uppercase">RANGE</span>
                        <span className="text-[var(--color-text-primary)] font-medium">{cat.range}</span>
                      </div>
                      <div>
                        <span className="block text-[8px] uppercase">SEATS</span>
                        <span className="text-[var(--color-text-primary)] font-medium">{cat.seats}</span>
                      </div>
                      <div>
                        <span className="block text-[8px] uppercase">SPEED</span>
                        <span className="text-[var(--color-text-primary)] font-medium">{cat.speed}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Sample Verified Fleet Models */}
          <div className="flex flex-col gap-6 pt-8 border-t border-[var(--color-border)]">
            <h2 className="text-2xl font-light text-[var(--color-text-primary)]">
              FEATURED FLEET MODELS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {DEMO_AIRCRAFT.map((ac) => (
                <Card key={ac.id} variant="default" className="flex flex-col justify-between gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-data text-[var(--color-accent)]">
                        {ac.category}
                      </span>
                      <DataStatusBadge status={ac.dataStatus} />
                    </div>
                    <h3 className="text-xl font-light text-[var(--color-text-primary)]">
                      {ac.model}
                    </h3>
                    <p className="text-xs text-[var(--color-text-secondary)]">
                      {ac.cabinHighlights}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border-subtle)] text-xs font-data">
                    <span className="text-[var(--color-text-muted)]">
                      BASE: {ac.homeBaseName}
                    </span>
                    <Link href={`/aircraft/${ac.slug}`}>
                      <Button variant="outline" size="sm">
                        VIEW SPECS →
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
