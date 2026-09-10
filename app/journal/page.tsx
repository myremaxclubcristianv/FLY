import React from "react";
import Link from "next/link";
import { Container } from "../../components/layout/Container";
import { ProvenanceBadge } from "../../components/shared/ProvenanceBadge";
import { Button } from "../../components/ui/Button";
import { UnifiedAviationRepository } from "../../lib/repositories/unified-aviation-repo";
import { AviationImage } from "../../components/AviationImage";

export const metadata = {
  title: "AIR Journal — The Aviation Publication & Intelligence Dossier | AIR",
  description:
    "Authoritative aviation journalism, charter mechanics, jet vs turboprop analyses, FBO operations, operator verification guides, and regulatory insights.",
};

const ARTICLE_IMAGES: Record<string, string> = {
  "how-private-charter-works": "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=85",
  "what-happens-after-requesting-a-flight": "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=1200&q=85",
  "what-determines-private-charter-pricing": "https://images.unsplash.com/photo-1520437358207-323b43b50729?auto=format&fit=crop&w=1200&q=85",
  "when-private-aviation-makes-sense": "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=85",
  "jet-vs-turboprop": "https://images.unsplash.com/photo-1474302770737-173ee21bab63?auto=format&fit=crop&w=1200&q=85",
  "light-jet-vs-midsize-jet": "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&w=1200&q=85",
  "how-far-can-a-private-jet-fly": "https://images.unsplash.com/photo-1559297434-fae8a1916a79?auto=format&fit=crop&w=1200&q=85",
  "choosing-an-aircraft-for-4-passengers": "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1200&q=85",
  "what-is-an-fbo": "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=1200&q=85",
  "baneasa-vs-otopeni-comparative-report": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=85",
  "how-business-aviation-handling-works": "https://images.unsplash.com/photo-1520437358207-323b43b50729?auto=format&fit=crop&w=1200&q=85",
  "what-prior-permission-required-ppr-means": "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=1200&q=85",
  "helicopter-transfers-and-landing-access": "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&q=85",
  "helicopter-mountain-operations-and-weather": "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1200&q=85",
  "charter-vs-ownership": "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=1200&q=85",
  "aircraft-management-and-operating-costs": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85",
  "verifying-an-aircraft-operator": "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=1200&q=85",
  "easa-commercial-air-transport-regulations-explained": "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=1200&q=85",
};

export default async function JournalIndexPage() {
  const articles = await UnifiedAviationRepository.getJournalArticles();
  const coverStory = articles[0];
  const secondaryStories = articles.slice(1, 4);
  const remainingStories = articles.slice(4);

  return (
    <div className="w-full bg-white text-neutral-900 font-sans flex-1 flex flex-col">
      {/* 01 — PUBLICATION MASTHEAD (Print Aesthetic) */}
      <section className="w-full py-16 sm:py-24 border-b border-neutral-200 bg-white">
        <Container size="wide">
          <div className="flex flex-col gap-8 max-w-6xl mx-auto">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-4 text-xs font-mono text-neutral-500">
              <span className="text-amber-600 font-bold uppercase tracking-widest">
                AIR JOURNAL // VOL. IV • ISSUE 08
              </span>
              <span>AUTHORITATIVE AVIATION INTELLIGENCE</span>
              <span className="hidden sm:inline">QUARTERLY PRINT & DIGITAL EDITION</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2 max-w-3xl">
                <h1 className="text-5xl sm:text-7xl md:text-8xl font-light tracking-tight text-neutral-900 leading-none font-sans">
                  AIR JOURNAL<span className="text-amber-600">.</span>
                </h1>
                <p className="text-lg sm:text-xl text-neutral-600 font-light leading-relaxed">
                  Deep-dive investigative articles on private charter mechanics, aircraft comparison analytics, regulatory AOC verification, FBO ground operations, and regional flight intelligence.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <ProvenanceBadge status="OFFICIAL_SOURCE" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 02 — MASSIVE COVER STORY (Full Magazine Feature Spread) */}
      {coverStory && (
        <section className="w-full py-20 sm:py-28 bg-[#fafaf7] border-b border-neutral-200/80">
          <Container size="wide">
            <div className="max-w-6xl mx-auto">
              <div className="rounded-3xl overflow-hidden bg-white border border-neutral-200 shadow-2xl grid lg:grid-cols-12 group">
                <div className="lg:col-span-7 relative min-h-[380px] lg:min-h-[540px] bg-neutral-900 overflow-hidden">
                  <AviationImage
                    src={ARTICLE_IMAGES[coverStory.slug] || "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1400&q=85"}
                    alt={coverStory.title}
                    fill
                    priority
                    className="object-cover group-hover:scale-105 transition duration-700"
                    fallbackTitle={coverStory.title}
                    fallbackCode="COVER // STORY"
                  />
                  <div className="absolute top-6 left-6 bg-black/70 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-xs font-mono text-amber-400 font-bold z-10">
                    FEATURE COVER STORY • {coverStory.readTimeMinutes} MIN READ
                  </div>
                </div>

                <div className="lg:col-span-5 p-10 sm:p-14 flex flex-col justify-between gap-8 bg-white">
                  <div className="space-y-4">
                    <span className="editorial-tag-dark">
                      {coverStory.category.replace(/_/g, " ")}
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-light text-neutral-900 group-hover:text-amber-600 transition font-sans leading-tight">
                      {coverStory.title}
                    </h2>
                    <p className="text-base text-neutral-600 font-sans leading-relaxed">
                      {coverStory.subtitle}
                    </p>
                    <p className="text-xs text-neutral-500 font-sans leading-relaxed line-clamp-3">
                      {coverStory.excerpt}
                    </p>
                  </div>

                  <Link href={`/journal/${coverStory.slug}`}>
                    <Button variant="primary" size="lg" className="w-full sm:w-auto px-8 shadow-md">
                      READ COVER STORY →
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* 03 — ASYMMETRICAL SECONDARY STORIES */}
      <section className="w-full py-24 sm:py-32 bg-white border-b border-neutral-200/80">
        <Container size="wide">
          <div className="max-w-6xl mx-auto space-y-16">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
              <h3 className="text-2xl sm:text-3xl font-light text-neutral-900 font-sans">
                Aviation Dossiers & Comparative Reports
              </h3>
              <span className="text-xs font-mono text-neutral-500">CURATED EDITORIAL</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {secondaryStories.map((art) => {
                const img = ARTICLE_IMAGES[art.slug] || "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80";
                return (
                  <div key={art.id} className="editorial-card-light rounded-3xl overflow-hidden flex flex-col justify-between group bg-white">
                    <div className="relative h-60 w-full overflow-hidden bg-neutral-900">
                      <AviationImage
                        src={img}
                        alt={art.title}
                        fill
                        className="object-cover group-hover:scale-105 transition duration-500"
                        fallbackTitle={art.title}
                        fallbackCode={`JOURNAL // ${art.category}`}
                      />
                      <div className="absolute top-4 left-4 bg-white/95 text-neutral-900 backdrop-blur-md border border-neutral-200 px-3 py-1 rounded-full text-[10px] font-mono font-bold z-10 shadow-sm">
                        {art.category.replace(/_/g, " ")}
                      </div>
                    </div>

                    <div className="p-8 space-y-4 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block font-semibold">
                          {art.readTimeMinutes} MIN READ
                        </span>
                        <h4 className="text-xl font-light text-neutral-900 group-hover:text-amber-600 transition font-sans leading-snug">
                          {art.title}
                        </h4>
                        <p className="text-xs text-neutral-600 font-sans line-clamp-2 leading-relaxed">
                          {art.subtitle}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-neutral-100">
                        <Link
                          href={`/journal/${art.slug}`}
                          className="text-xs font-mono text-amber-600 font-bold hover:underline flex items-center gap-1"
                        >
                          READ ARTICLE →
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* 04 — ALL ARCHIVED JOURNAL ARTICLES (Light Clean Grid) */}
      <section className="w-full py-24 sm:py-32 bg-[#fafaf7]">
        <Container size="wide">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
              <h3 className="text-2xl sm:text-3xl font-light text-neutral-900 font-sans">
                The Complete Publication Archive
              </h3>
              <span className="text-xs font-mono text-amber-600 font-bold">
                {articles.length} PUBLISHED ARTICLES
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {remainingStories.map((art) => {
                const img = ARTICLE_IMAGES[art.slug] || "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80";
                return (
                  <div key={art.id} className="editorial-card-light rounded-3xl overflow-hidden flex flex-col justify-between group bg-white">
                    <div className="relative h-48 w-full overflow-hidden bg-neutral-900">
                      <AviationImage
                        src={img}
                        alt={art.title}
                        fill
                        className="object-cover group-hover:scale-105 transition duration-500"
                        fallbackTitle={art.title}
                        fallbackCode="JOURNAL // ARCHIVE"
                      />
                      <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-[10px] font-mono text-amber-400 font-bold z-10">
                        {art.readTimeMinutes} MIN READ
                      </div>
                    </div>

                    <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-amber-600 uppercase font-bold block">
                          {art.category.replace(/_/g, " ")}
                        </span>
                        <h4 className="text-lg font-light text-neutral-900 group-hover:text-amber-600 transition font-sans leading-snug">
                          {art.title}
                        </h4>
                        <p className="text-xs text-neutral-600 font-sans line-clamp-2 leading-relaxed">
                          {art.excerpt}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-neutral-100">
                        <Link
                          href={`/journal/${art.slug}`}
                          className="text-xs font-mono text-amber-600 font-bold hover:underline"
                        >
                          READ FULL DOSSIER →
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
