import React from "react";
import Link from "next/link";
import { Container } from "../../components/layout/Container";
import { SectionHeader } from "../../components/shared/SectionHeader";
import { ProvenanceBadge } from "../../components/shared/ProvenanceBadge";
import { Card } from "../../components/ui/Card";
import { UnifiedAviationRepository } from "../../lib/repositories/unified-aviation-repo";

export const metadata = {
  title: "Aviation Journal & Intelligence Publication | AIR",
  description:
    "Authoritative aviation journalism, charter mechanics, jet vs turboprop analyses, FBO operations, operator verification guides, and regulatory insights.",
};

export default async function JournalIndexPage() {
  const articles = await UnifiedAviationRepository.getJournalArticles();

  return (
    <div className="w-full py-16 bg-[var(--color-bg-primary)] flex-1 flex flex-col gap-12">
      <Container size="wide">
        <div className="flex flex-col gap-12">
          {/* Header */}
          <div className="flex flex-col gap-4 border-b border-[var(--color-border)] pb-8">
            <div className="flex items-center gap-3">
              <span className="text-xs font-data text-[var(--color-accent)] uppercase tracking-widest">
                AIR JOURNAL // AVIATION INTELLIGENCE
              </span>
              <ProvenanceBadge status="OFFICIAL_SOURCE" />
            </div>

            <SectionHeader
              title="EDITORIAL AVIATION PUBLICATION."
              description="Deep-dive articles on private charter mechanics, aircraft comparison analytics, regulatory AOC verification, FBO ground operations, and regional flight intelligence."
              titleAs="h1"
            />
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {articles.map((art) => (
              <Card key={art.id} variant="surface" className="flex flex-col justify-between p-8 gap-6 group hover:border-[var(--color-accent)] transition-colors">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-data text-[var(--color-accent)] uppercase tracking-widest">
                      {art.category.replace(/_/g, " ")} • {art.readTimeMinutes} MIN READ
                    </span>
                    <ProvenanceBadge status={art.dataStatus} />
                  </div>

                  <h2 className="text-2xl font-light text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors font-sans leading-snug">
                    {art.title}
                  </h2>

                  <p className="text-xs font-sans text-[var(--color-text-secondary)] leading-relaxed">
                    {art.subtitle}
                  </p>

                  <p className="text-xs text-[var(--color-text-muted)] line-clamp-3 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border-subtle)] text-[10px] font-data text-[var(--color-text-muted)]">
                  <span>BY {art.author} • {art.publicationDate}</span>
                  <Link href={`/journal/${art.slug}`} className="text-xs font-data text-[var(--color-accent)] hover:underline">
                    READ ARTICLE →
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
