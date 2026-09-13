import React from "react";
import Link from "next/link";
import { Container } from "../layout/Container";
import { SectionHeader } from "../shared/SectionHeader";
import { DataStatusBadge } from "../shared/DataStatusBadge";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { BUCHAREST_BRAN_DECISION } from "../../data/demo/decision-example";

export function DecisionEngine() {
  const d = BUCHAREST_BRAN_DECISION;

  return (
    <section id="decision-engine" className="w-full py-24 bg-[var(--color-bg-primary)] border-b border-[var(--color-border)]">
      <Container size="wide">
        <div className="flex flex-col gap-16">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <SectionHeader
              eyebrow="THE AIR CORE CONCEPT"
              title="YOU DON'T NEED TO KNOW WHICH AIRCRAFT TO CHOOSE."
              description="Tell us your origin, destination, timing, and priority. AIR evaluates performance ceilings, field lengths, helipad access, and ground connections to recommend the optimal flight vehicle."
            />
            <div className="flex items-center gap-3 self-start md:self-auto">
              <DataStatusBadge status={d.dataStatus} />
              <span className="text-[10px] font-data text-[var(--color-text-muted)]">
                CONCEPTUAL DEMO PAYLOAD
              </span>
            </div>
          </div>

          {/* Decision Card Showcase Container */}
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] p-6 sm:p-10 flex flex-col gap-10">
            {/* Mission Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[var(--color-border)] pb-6">
              <div>
                <span className="text-[10px] font-data text-[var(--color-accent)] tracking-widest uppercase">
                  DEMONSTRATION MISSION PROFILE
                </span>
                <h3 className="text-2xl sm:text-3xl font-light text-[var(--color-text-primary)] mt-1">
                  {d.missionTitle}
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs font-data text-[var(--color-text-secondary)]">
                <span className="bg-[var(--color-bg-primary)] px-3 py-1.5 border border-[var(--color-border-subtle)]">
                  PASSENGERS: {d.passengers}
                </span>
                <span className="bg-[var(--color-bg-primary)] px-3 py-1.5 border border-[var(--color-border-subtle)]">
                  ORIGIN: {d.origin}
                </span>
              </div>
            </div>

            {/* Primary Recommendation Card */}
            <div className="bg-[var(--color-bg-primary)] border-2 border-[var(--color-accent)] p-6 sm:p-8 flex flex-col gap-6 relative">
              <div className="absolute top-0 right-0 bg-[var(--color-accent)] text-[var(--color-bg-primary)] text-[10px] font-data px-4 py-1 font-semibold tracking-widest uppercase">
                RECOMMENDED MISSION PROFILE
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-data text-[var(--color-accent)] tracking-wider">
                    {d.primaryOption.category}
                  </span>
                  <DataStatusBadge status={d.primaryOption.status} />
                </div>
                <span className="text-sm font-data text-[var(--color-text-primary)] tracking-widest bg-[var(--color-surface)] px-3 py-1 border border-[var(--color-border)]">
                  ESTIMATED: {d.primaryOption.estimatedDuration}
                </span>
              </div>

              <div>
                <h3 className="text-3xl font-light text-[var(--color-text-primary)]">
                  {d.primaryOption.name}
                </h3>
                <p className="text-sm font-data text-[var(--color-text-muted)] mt-1">
                  {d.primaryOption.tagline}
                </p>
              </div>

              <div className="p-4 bg-[var(--color-surface)] border-l-2 border-[var(--color-accent)]">
                <span className="text-[10px] font-data text-[var(--color-text-muted)] block uppercase mb-1">
                  WHY THIS IS THE RIGHT WAY TO FLY
                </span>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {d.summaryReason}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[10px] font-data text-[var(--color-text-muted)] block">
                    KEY BENEFIT
                  </span>
                  <span className="text-[var(--color-text-primary)] font-medium">
                    {d.primaryOption.keyBenefit}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-data text-[var(--color-text-muted)] block">
                    SUITABLE MISSION TYPE
                  </span>
                  <span className="text-[var(--color-text-primary)] font-medium">
                    {d.primaryOption.suitableFor}
                  </span>
                </div>
              </div>
            </div>

            {/* Alternative Transport Options */}
            <div className="flex flex-col gap-4">
              <span className="text-xs font-data text-[var(--color-text-secondary)] tracking-widest uppercase">
                ALTERNATIVE MISSION PROFILES EVALUATED
              </span>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {d.alternativeOptions.map((alt) => (
                  <Card key={alt.id} variant="default" className="flex flex-col justify-between gap-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-data text-[var(--color-text-muted)]">
                          {alt.category}
                        </span>
                        <DataStatusBadge status={alt.status} showDot={false} />
                      </div>
                      <h4 className="text-base font-medium text-[var(--color-text-primary)]">
                        {alt.name}
                      </h4>
                      <span className="text-xs font-data text-[var(--color-accent)]">
                        {alt.estimatedDuration}
                      </span>
                      <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mt-1">
                        {alt.keyBenefit}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[var(--color-border-subtle)] text-[10px] font-data text-[var(--color-text-muted)]">
                      {alt.tagline}
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Bottom Section Call to Action */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[var(--color-border)]">
              <p className="text-xs text-[var(--color-text-muted)]">
                Ready to evaluate your own flight requirements?
              </p>
              <Link href="/plan?from=Bucharest&to=Bran&passengers=4">
                <Button variant="primary" size="md">
                  RUN THIS MISSION IN PLANNER
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
