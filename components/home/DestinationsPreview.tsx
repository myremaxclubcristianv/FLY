import React from "react";
import Link from "next/link";
import { Container } from "../layout/Container";
import { SectionHeader } from "../shared/SectionHeader";
import { DataStatusBadge } from "../shared/DataStatusBadge";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { DESTINATION_PREVIEWS } from "../../data/demo/experiences-preview";

export function DestinationsPreview() {
  return (
    <section id="destinations" className="w-full py-24 bg-[var(--color-bg-secondary)] border-b border-[var(--color-border)]">
      <Container size="wide">
        <div className="flex flex-col gap-16">
          <SectionHeader
            eyebrow="REGIONAL DISPATCH FOCUS"
            title="ROMANIA DESTINATION ACCESS."
            description="AIR optimizes access to key Romanian economic centers, mountain helipads, and coastal FBO handling facilities."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DESTINATION_PREVIEWS.map((dest) => (
              <Card key={dest.id} variant="default" className="flex flex-col justify-between gap-6">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-data text-[var(--color-accent)]">
                      {dest.region}
                    </span>
                    <DataStatusBadge status={dest.status} showDot={false} />
                  </div>

                  <h4 className="text-xl font-light text-[var(--color-text-primary)]">
                    {dest.name}
                  </h4>

                  <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                    {dest.highlights}
                  </p>
                </div>

                <div className="pt-4 border-t border-[var(--color-border-subtle)] flex flex-col gap-3">
                  <div className="text-[10px] font-data text-[var(--color-text-muted)]">
                    <span className="block">INDICATIVE ACCESS FROM BUCHAREST:</span>
                    <span className="text-[var(--color-text-primary)] font-medium">
                      {dest.indicativeAccess}
                    </span>
                  </div>

                  <Link href={`/plan?from=Bucharest&to=${encodeURIComponent(dest.name)}`}>
                    <Button variant="outline" size="sm" fullWidth>
                      PLAN FLIGHT TO {dest.name.split(" ")[0]}
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
