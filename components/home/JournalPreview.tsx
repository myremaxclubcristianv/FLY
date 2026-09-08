import React from "react";
import { Container } from "../layout/Container";
import { SectionHeader } from "../shared/SectionHeader";
import { Card } from "../ui/Card";
import { DataStatusBadge } from "../shared/DataStatusBadge";
import { JOURNAL_PREVIEWS } from "../../data/demo/experiences-preview";

export function JournalPreview() {
  return (
    <section id="journal" className="w-full py-24 bg-[var(--color-bg-primary)] border-b border-[var(--color-border)]">
      <Container size="wide">
        <div className="flex flex-col gap-16">
          <SectionHeader
            eyebrow="WORLD // 06 EDITORIAL"
            title="AVIATION JOURNAL & DISPATCH."
            description="Operational insights, regional airfield updates, and decision frameworks for business aircraft users."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {JOURNAL_PREVIEWS.map((art) => (
              <Card key={art.id} variant="surface" className="flex flex-col justify-between gap-6">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-data text-[var(--color-accent)]">
                      {art.category} {"//"} {art.date}
                    </span>
                    <DataStatusBadge status="LIVE" showDot={false} />
                  </div>

                  <h4 className="text-xl font-light text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors cursor-pointer">
                    {art.title}
                  </h4>

                  <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed font-sans">
                    {art.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[var(--color-border-subtle)] flex items-center justify-between text-[10px] font-data text-[var(--color-text-muted)]">
                  <span>READ TIME: {art.readTime}</span>
                  <span className="text-[var(--color-accent)] hover:underline cursor-pointer">
                    READ ANALYSIS →
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
