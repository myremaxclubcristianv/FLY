import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "../../../components/layout/Container";
import { SectionHeader } from "../../../components/shared/SectionHeader";
import { ProvenanceBadge } from "../../../components/shared/ProvenanceBadge";
import { Card } from "../../../components/ui/Card";
import { UnifiedAviationRepository } from "../../../lib/repositories/unified-aviation-repo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const article = await UnifiedAviationRepository.getJournalArticleBySlug(slug);

  if (!article) {
    return { title: "Article Not Found | AIR Journal" };
  }

  return {
    title: `${article.title} | AIR Journal`,
    description: article.excerpt,
  };
}

export default async function JournalDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = await UnifiedAviationRepository.getJournalArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="w-full py-16 bg-[var(--color-bg-primary)] flex-1 flex flex-col gap-12">
      <Container size="wide">
        <div className="max-w-4xl mx-auto flex flex-col gap-12">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-data text-[var(--color-text-muted)]">
            <Link href="/journal" className="hover:text-[var(--color-text-primary)]">JOURNAL</Link>
            <span>/</span>
            <span className="text-[var(--color-text-primary)]">{article.category.replace(/_/g, " ")}</span>
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
  );
}
