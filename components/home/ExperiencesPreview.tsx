import React from "react";
import Link from "next/link";
import { Container } from "../layout/Container";
import { SectionHeader } from "../shared/SectionHeader";
import { DataStatusBadge } from "../shared/DataStatusBadge";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { PlaceholderImage } from "../shared/PlaceholderImage";
import { EXPERIENCE_PREVIEWS } from "../../data/demo/experiences-preview";

export function ExperiencesPreview() {
  return (
    <section id="experiences" className="w-full py-24 bg-[var(--color-bg-primary)] border-b border-[var(--color-border)]">
      <Container size="wide">
        <div className="flex flex-col gap-16">
          <SectionHeader
            eyebrow="CURATED AVIATION MISSIONS"
            title="EXPERIENCES PREVIEW."
            description="Direct point-to-point itineraries connecting key regional hubs with remote pads, private estates, and mountain access."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {EXPERIENCE_PREVIEWS.map((exp) => (
              <Card key={exp.id} variant="surface" className="flex flex-col justify-between gap-6 p-0 overflow-hidden">
                <PlaceholderImage
                  title={exp.title}
                  code={exp.type}
                  aspectRatio="video"
                />

                <div className="p-6 pt-0 flex flex-col justify-between flex-1 gap-6">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-data text-[var(--color-accent)]">
                        {exp.location}
                      </span>
                      <DataStatusBadge status={exp.status} />
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
                    <Link href={`/plan?to=${encodeURIComponent(exp.title)}`}>
                      <Button variant="outline" size="sm">
                        REQUEST MISSION
                      </Button>
                    </Link>
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
