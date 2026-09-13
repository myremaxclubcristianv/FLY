import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "../../../components/layout/Container";
import { SectionHeader } from "../../../components/shared/SectionHeader";
import { ProvenanceBadge } from "../../../components/shared/ProvenanceBadge";
import { Card } from "../../../components/ui/Card";
import { UnifiedAviationRepository } from "../../../lib/repositories/unified-aviation-repo";
import { AviationImage } from "../../../components/AviationImage";
import { JsonLd, createArticleJsonLd } from "../../../components/shared/JsonLd";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const ARTICLE_HERO_IMAGES: Record<string, string> = {
  "how-private-charter-works": "https://images.unsplash.com/photo-1520690214124-2405c5217036?auto=format&fit=crop&w=1600&q=80",
  "what-happens-after-requesting-a-flight": "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=1600&q=80",
  "what-determines-private-charter-pricing": "https://images.unsplash.com/photo-1520437358207-323b43b50729?auto=format&fit=crop&w=1600&q=80",
  "when-private-aviation-makes-sense": "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1600&q=80",
  "jet-vs-turboprop": "https://images.unsplash.com/photo-1474302770737-173ee21bab63?auto=format&fit=crop&w=1600&q=80",
  "light-jet-vs-midsize-jet": "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&w=1600&q=80",
  "how-far-can-a-private-jet-fly": "https://images.unsplash.com/photo-1559297434-fae8a1916a79?auto=format&fit=crop&w=1600&q=80",
  "choosing-an-aircraft-for-4-passengers": "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1600&q=80",
  "what-is-an-fbo": "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=1600&q=80",
  "baneasa-vs-otopeni-comparative-report": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=80",
  "how-business-aviation-handling-works": "https://images.unsplash.com/photo-1520437358207-323b43b50729?auto=format&fit=crop&w=1600&q=80",
  "what-prior-permission-required-ppr-means": "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=1600&q=80",
  "helicopter-transfers-and-landing-access": "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1600&q=80",
  "helicopter-mountain-operations-and-weather": "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1600&q=80",
  "charter-vs-ownership": "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=1600&q=80",
  "aircraft-management-and-operating-costs": "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80",
  "verifying-an-aircraft-operator": "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=1600&q=80",
  "easa-commercial-air-transport-regulations-explained": "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=1600&q=80",
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const article = await UnifiedAviationRepository.getJournalArticleBySlug(slug);

  if (!article) {
    return { title: "Article Not Found | AIR Journal" };
  }

  return {
    title: `${article.title} | AIR Journal`,
    description: article.excerpt,
    alternates: {
      canonical: `/journal/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `/journal/${article.slug}`,
    },
  };
}

export default async function JournalDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = await UnifiedAviationRepository.getJournalArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const heroImg = ARTICLE_HERO_IMAGES[slug] || "https://images.unsplash.com/photo-1520690214124-2405c5217036?auto=format&fit=crop&w=1600&q=80";

  return (
    <>
      <JsonLd data={createArticleJsonLd(article, heroImg)} />
      <div className="w-full py-16 bg-[var(--color-bg-primary)] flex-1 flex flex-col gap-12">
      <Container size="wide">
        <div className="max-w-4xl mx-auto flex flex-col gap-12">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-data text-[var(--color-text-muted)]">
            <Link href="/journal" className="hover:text-[var(--color-text-primary)]">JOURNAL</Link>
            <span>/</span>
            <span className="text-[var(--color-text-primary)]">{article.category.replace(/_/g, " ")}</span>
          </div>

          {/* Hero Editorial Photography Banner */}
          <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden glass-surface border border-white/10 group">
            <AviationImage
              src={heroImg}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              priority
              fallbackTitle={article.title}
              fallbackCode={`JOURNAL // ${article.category}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between z-10">
              <span className="text-[10px] font-data text-amber-400 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                AIR INTEL // {article.category.replace(/_/g, " ")}
              </span>
              <span className="text-[10px] font-data text-neutral-300 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                {article.readTimeMinutes} MIN READ
              </span>
            </div>
          </div>

          {/* Header */}
          <div className="flex flex-col gap-4 border-b border-[var(--color-border)] pb-8">
            <div className="flex items-center gap-3">
              <span className="text-xs font-data text-[var(--color-accent)] uppercase tracking-widest">
                {article.category.replace(/_/g, " ")} • {article.readTimeMinutes} MIN READ
              </span>
              <ProvenanceBadge status={article.dataStatus} sourceName={article.source?.name} sourceUrl={article.source?.url} showSource />
            </div>

            <SectionHeader
              title={article.title}
              description={article.subtitle}
              titleAs="h1"
            />

            <div className="flex items-center gap-4 pt-4 text-xs font-data text-[var(--color-text-muted)] border-t border-[var(--color-border-subtle)]">
              <span>BY {article.author}</span>
              <span>•</span>
              <span>PUBLISHED: {article.publicationDate}</span>
              <span>•</span>
              <span>LAST VERIFIED: {article.lastUpdatedAt}</span>
            </div>
          </div>

          {/* Main Article Content */}
          <div className="flex flex-col gap-8 text-sm text-[var(--color-text-secondary)] font-sans leading-relaxed">
            {article.sections.map((sec, idx) => (
              <div key={idx} className="flex flex-col gap-4">
                <h2 className="text-xl font-light text-[var(--color-text-primary)] font-sans border-b border-[var(--color-border-subtle)] pb-2">
                  {sec.heading}
                </h2>
                {sec.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="leading-relaxed text-sm">
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </div>

          {/* FAQ Section if present */}
          {article.faq && article.faq.length > 0 && (
            <div className="flex flex-col gap-6 pt-8 border-t border-[var(--color-border)]">
              <h3 className="text-xs font-data text-[var(--color-accent)] uppercase tracking-widest">
                FREQUENTLY ASKED QUESTIONS & REGULATORY NOTES
              </h3>

              <div className="flex flex-col gap-4">
                {article.faq.map((f, fIdx) => (
                  <Card key={fIdx} variant="surface" className="p-6 flex flex-col gap-2">
                    <h4 className="text-sm font-medium text-[var(--color-text-primary)]">{f.question}</h4>
                    <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed font-sans">{f.answer}</p>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Back Trigger */}
          <div className="pt-8 border-t border-[var(--color-border)] flex items-center justify-between">
            <Link href="/journal" className="text-xs font-data text-[var(--color-accent)] hover:underline">
              ← BACK TO JOURNAL INDEX
            </Link>

            <Link href="/plan" className="text-xs font-data text-[var(--color-text-primary)] hover:underline">
              PLAN A FLIGHT →
            </Link>
          </div>
        </div>
      </Container>
    </div>
    </>
  );
}
