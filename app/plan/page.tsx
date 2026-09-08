import React from "react";
import { Container } from "../../components/layout/Container";
import { SectionHeader } from "../../components/shared/SectionHeader";
import { DataStatusBadge } from "../../components/shared/DataStatusBadge";
import { PlannerSteps } from "../../components/plan/PlannerSteps";

export default function PlanPage() {
  return (
    <section className="w-full py-12 md:py-20 bg-[var(--color-bg-primary)] flex-1">
      <Container size="default">
        <div className="flex flex-col gap-10 max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex flex-col gap-4 border-b border-[var(--color-border)] pb-8">
            <div className="flex items-center gap-3">
              <span className="text-xs font-data text-[var(--color-accent)] uppercase tracking-widest">
                AIR FLIGHT PLANNER & DECISION ENGINE
              </span>
              <DataStatusBadge status="INDICATIVE" />
            </div>

            <SectionHeader
              title="TELL US WHERE YOU'RE GOING."
              description="We'll calculate the right way to fly. Complete the mission parameters below to generate an indicative flight vehicle recommendation."
              titleAs="h1"
            />
          </div>

          {/* Planner Multi-Step Interface */}
          <PlannerSteps />
        </div>
      </Container>
    </section>
  );
}
