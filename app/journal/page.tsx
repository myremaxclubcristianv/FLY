import React from "react";
import Link from "next/link";
import { Container } from "../../components/layout/Container";
import { SectionHeader } from "../../components/shared/SectionHeader";
import { ProvenanceBadge } from "../../components/shared/ProvenanceBadge";
import { Card } from "../../components/ui/Card";
import { UnifiedAviationRepository } from "../../lib/repositories/unified-aviation-repo";
import { AviationImage } from "../../components/AviationImage";

export const metadata = {
  title: "Aviation Journal & Intelligence Publication | AIR",
  description:
    "Authoritative aviation journalism, charter mechanics, jet vs turboprop analyses, FBO operations, operator verification guides, and regulatory insights.",
};

const ARTICLE_IMAGES: Record<string, string> = {
  "how-private-charter-works": "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80",
  "what-happens-after-requesting-a-flight": "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=800&q=80",
  "what-determines-private-charter-pricing": "https://images.unsplash.com/photo-1520437358207-323b43b50729?auto=format&fit=crop&w=800&q=80",
  "when-private-aviation-makes-sense": "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80",
  "jet-vs-turboprop": "https://images.unsplash.com/photo-1474302770737-173ee21bab63?auto=format&fit=crop&w=800&q=80",
  "light-jet-vs-midsize-jet": "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&w=800&q=80",
  "how-far-can-a-private-jet-fly": "https://images.unsplash.com/photo-1559297434-fae8a1916a79?auto=format&fit=crop&w=800&q=80",
  "choosing-an-aircraft-for-4-passengers": "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=800&q=80",
  "what-is-an-fbo": "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=800&q=80",
  "baneasa-vs-otopeni-comparative-report": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80",
  "how-business-aviation-handling-works": "https://images.unsplash.com/photo-1520437358207-323b43b50729?auto=format&fit=crop&w=800&q=80",
  "what-prior-permission-required-ppr-means": "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=800&q=80",
  "helicopter-transfers-and-landing-access": "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80",
  "helicopter-mountain-operations-and-weather": "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80",
  "charter-vs-ownership": "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80",
  "aircraft-management-and-operating-costs": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
  "verifying-an-aircraft-operator": "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=800&q=80",
  "easa-commercial-air-transport-regulations-explained": "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=800&q=80",
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
            {articles.map((art) => {
              const img = ARTICLE_IMAGES[art.slug] || "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80";
              return (
                <Card key={art.id} variant="surface" className="flex flex-col justify-between overflow-hidden group hover:border-amber-400/50 transition-all duration-300 rounded-2xl">
                  <div className="relative h-52 w-full bg-neutral-900 overflow-hidden">
                    <AviationImage
                      src={img}
                      alt={art.title}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-500"
                      fallbackTitle={art.title}
                      fallbackCode={`JOURNAL // ${art.category}`}
                    />
                    <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[10px] font-data text-amber-400 font-semibold z-10">
                      {art.category.replace(/_/g, " ")} • {art.readTimeMinutes} MIN READ
                    </div>
                  </div>

                  <div className="p-8 flex flex-col justify-between gap-6 flex-1">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-data text-neutral-400 uppercase tracking-widest">
                          AIR INTEL EDITORIAL
                        </span>
                        <ProvenanceBadge status={art.dataStatus} />
                      </div>

                      <h2 className="text-2xl font-light text-[var(--color-text-primary)] group-hover:text-amber-300 transition-colors font-sans leading-snug">
                        {art.title}
                      </h2>

                      <p className="text-xs font-sans text-[var(--color-text-secondary)] leading-relaxed">
                        {art.subtitle}
                      </p>

                      <p className="text-xs text-[var(--color-text-muted)] line-clamp-2 leading-relaxed font-sans">
                        {art.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/10 text-[10px] font-data text-[var(--color-text-muted)]">
                      <span>BY {art.author} • {art.publicationDate}</span>
                      <Link href={`/journal/${art.slug}`} className="text-xs font-data text-amber-400 hover:underline font-semibold">
                        READ ARTICLE →
                      </Link>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </Container>
    </div>
  );
}
