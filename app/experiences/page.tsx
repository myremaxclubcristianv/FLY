import React from "react";
import Link from "next/link";
import { Container } from "../../components/layout/Container";
import { SectionHeader } from "../../components/shared/SectionHeader";
import { DataStatusBadge } from "../../components/shared/DataStatusBadge";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { PlaceholderImage } from "../../components/shared/PlaceholderImage";
import { DEMO_EXPERIENCES } from "../../data/demo/experiences";

export const metadata = {
  title: "Curated Aviation Experiences & Journeys | AIR",
  description:
    "Curated point-to-point aviation journeys: Transylvanian heli-skiing, castle pads, coastal dispatch, and scenic mountain flights.",
};

export default function ExperiencesPage() {
  return (
    <div className="w-full py-16 bg-[var(--color-bg-primary)] flex-1 flex flex-col gap-16">
      <Container size="wide">
        <div className="flex flex-col gap-16">
          <div className="flex flex-col gap-4 border-b border-[var(--color-border)] pb-8">
            <div className="flex items-center gap-3">
              <span className="text-xs font-data text-[var(--color-accent)] uppercase tracking-widest">
                WORLD // 02 EXPERIENCES
              </span>
              <DataStatusBadge status="REQUEST" />
            </div>

            <SectionHeader
              title="CURATED AVIATION JOURNEYS."
              description="Aviation becomes an experience when the journey is the destination. Point-to-point itineraries connecting Băneasa hub directly with private pads, mountain peaks, and coastal estates."
              titleAs="h1"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {DEMO_EXPERIENCES.map((exp) => (
              <Card key={exp.id} variant="surface" className="flex flex-col justify-between gap-6 p-0 overflow-hidden">
                <PlaceholderImage
                  title={exp.title}
                  code={exp.category}
                  aspectRatio="video"
                />

                <div className="p-6 pt-0 flex flex-col justify-between flex-1 gap-6">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-data text-[var(--color-accent)]">
                        {exp.locationName}
                      </span>
                      <DataStatusBadge status={exp.dataStatus} />
                    </div>

                    <h3 className="text-lg font-light text-[var(--color-text-primary)]">
                      {exp.title}
                    </h3>

                    <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed font-sans">
                      {exp.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[var(--color-border-subtle)] flex items-center justify-between text-xs font-data">
                    <span className="text-[var(--color-text-muted)]">
                      DURATION: {exp.duration}
                    </span>
                    <Link href={`/experiences/${exp.slug}`}>
                      <Button variant="outline" size="sm">
                        VIEW ITINERARY →
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
