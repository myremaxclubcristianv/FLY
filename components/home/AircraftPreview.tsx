import React from "react";
import { Container } from "../layout/Container";
import { SectionHeader } from "../shared/SectionHeader";
import { DataStatusBadge } from "../shared/DataStatusBadge";
import { Card } from "../ui/Card";
import { PlaceholderImage } from "../shared/PlaceholderImage";
import { AIRCRAFT_PREVIEWS } from "../../data/demo/experiences-preview";

export function AircraftPreview() {
  return (
    <section id="aircraft" className="w-full py-24 bg-[var(--color-bg-secondary)] border-b border-[var(--color-border)]">
      <Container size="wide">
        <div className="flex flex-col gap-16">
          <SectionHeader
            eyebrow="FLEET INTELLIGENCE PREVIEW"
            title="AIRCRAFT CATEGORY SPECIFICATIONS."
            description="AIR categorizes aircraft by mission capability rather than model jargon. Below are indicative range, speed, and cabin payload benchmarks."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {AIRCRAFT_PREVIEWS.map((ac) => (
              <Card key={ac.id} variant="surface" className="flex flex-col justify-between gap-6 p-0 overflow-hidden">
                <PlaceholderImage
                  title={ac.name}
                  code={ac.category}
                  aspectRatio="video"
                />

                <div className="p-6 pt-0 flex flex-col justify-between flex-1 gap-6">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-data text-[var(--color-accent)]">
                        {ac.category}
                      </span>
                      <DataStatusBadge status={ac.status} showDot={false} />
                    </div>

                    <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                      {ac.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[var(--color-border-subtle)] text-[10px] font-data text-[var(--color-text-muted)]">
                    <div>
                      <span className="block text-[8px] uppercase">RANGE</span>
                      <span className="text-[var(--color-text-primary)] font-medium">{ac.range}</span>
                    </div>
                    <div>
                      <span className="block text-[8px] uppercase">CAPACITY</span>
                      <span className="text-[var(--color-text-primary)] font-medium">{ac.capacity}</span>
                    </div>
                    <div>
                      <span className="block text-[8px] uppercase">SPEED</span>
                      <span className="text-[var(--color-text-primary)] font-medium">{ac.speed}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
