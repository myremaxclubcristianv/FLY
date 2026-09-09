import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ProvenanceBadge } from "@/components/shared/ProvenanceBadge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { UnifiedAviationRepository } from "@/lib/repositories/unified-aviation-repo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const company = await UnifiedAviationRepository.getCompanyBySlug(slug);

  if (!company) {
    return { title: "Company Profile Not Found | AIR Directory" };
  }

  return {
    title: `${company.displayName} — Verified Aviation Profile | AIR`,
    description: `${company.displayName} (${company.category.replace(/_/g, " ")}) based at ${company.baseAirportName || company.city}. Verified services, certifications, and AOC status.`,
  };
}

export default async function CompanyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const company = await UnifiedAviationRepository.getCompanyBySlug(slug);

  if (!company) {
    notFound();
  }

  return (
    <div className="w-full py-16 bg-[var(--color-bg-primary)] flex-1 flex flex-col gap-12">
      <Container size="wide">
        <div className="flex flex-col gap-12">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-data text-[var(--color-text-muted)]">
            <Link href="/aviation" className="hover:text-[var(--color-text-primary)]">AVIATION DIRECTORY</Link>
            <span>/</span>
            <span className="text-[var(--color-text-primary)]">{company.displayName}</span>
          </div>

          {/* Header */}
          <div className="flex flex-col gap-4 border-b border-[var(--color-border)] pb-8">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <span className="text-xs font-data text-[var(--color-accent)] uppercase tracking-widest">
                  {company.category.replace(/_/g, " ")} • {company.country}
                </span>
                <ProvenanceBadge status={company.dataStatus} sourceName={company.source?.name} sourceUrl={company.source?.url} showSource />
              </div>

              {company.aocVerified && (
                <div className="px-3 py-1 bg-emerald-950/40 border border-emerald-800/60 text-emerald-300 text-xs font-data uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  VERIFIED AOC HOLDER {company.aocNumber ? `(${company.aocNumber})` : ""}
                </div>
              )}
            </div>

            <SectionHeader
              title={company.displayName.toUpperCase()}
              description={`Legal Entity: ${company.legalName}. Operating Base: ${company.baseAirportName || company.city}.`}
              titleAs="h1"
            />
          </div>

          {/* Overview Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="surface" className="p-6 flex flex-col gap-2">
              <span className="text-[10px] font-data text-[var(--color-text-muted)]">PRIMARY CLASSIFICATION</span>
              <span className="text-lg font-light text-[var(--color-text-primary)]">{company.category.replace(/_/g, " ")}</span>
            </Card>

            <Card variant="surface" className="p-6 flex flex-col gap-2">
              <span className="text-[10px] font-data text-[var(--color-text-muted)]">OPERATING BASE / AIRPORT</span>
              <span className="text-lg font-light text-[var(--color-text-primary)]">{company.baseAirportName || company.city}</span>
            </Card>

            <Card variant="surface" className="p-6 flex flex-col gap-2">
              <span className="text-[10px] font-data text-[var(--color-text-muted)]">AOC REGULATORY STATUS</span>
              <span className="text-lg font-light text-[var(--color-text-primary)]">
                {company.aocVerified ? `AOC Verified ${company.aocNumber || ""}` : "Non-AOC Service Provider"}
              </span>
            </Card>
          </div>

          {/* Services & Certifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card variant="surface" className="p-6 flex flex-col gap-4">
              <h2 className="text-sm font-data text-[var(--color-text-primary)] uppercase tracking-wider border-b border-[var(--color-border-subtle)] pb-3">
                VERIFIED SERVICE OFFERINGS
              </h2>
              <ul className="flex flex-col gap-2.5 text-xs text-[var(--color-text-secondary)] font-sans">
                {company.servicesSummary.map((srv, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[var(--color-accent)] font-data">•</span>
                    <span>{srv}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card variant="surface" className="p-6 flex flex-col gap-4">
              <h2 className="text-sm font-data text-[var(--color-text-primary)] uppercase tracking-wider border-b border-[var(--color-border-subtle)] pb-3">
                CERTIFICATIONS & FLEET OPERATED
              </h2>
              <div className="flex flex-col gap-4">
                {company.certifications && company.certifications.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-data text-[var(--color-text-muted)]">CERTIFICATIONS</span>
                    <ul className="flex flex-col gap-1.5 text-xs text-[var(--color-text-secondary)] font-sans">
                      {company.certifications.map((c, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="text-emerald-400 font-data">✓</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {company.fleetModels && company.fleetModels.length > 0 && (
                  <div className="flex flex-col gap-2 pt-3 border-t border-[var(--color-border-subtle)]">
                    <span className="text-[10px] font-data text-[var(--color-text-muted)]">FLEET MODELS OPERATED</span>
                    <div className="flex flex-wrap gap-2">
                      {company.fleetModels.map((fm, i) => (
                        <span key={i} className="text-xs px-2.5 py-1 bg-[var(--color-bg-primary)] border border-[var(--color-border)] rounded text-[var(--color-text-primary)]">
                          {fm}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {company.website && (
                  <div className="pt-3 border-t border-[var(--color-border-subtle)] text-xs">
                    <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] hover:underline inline-flex items-center gap-1 font-data">
                      VISIT OFFICIAL PORTAL ({company.website.replace("https://", "")}) ↗
                    </a>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Action Trigger */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-8 bg-[var(--color-surface)] border border-[var(--color-border)]">
            <div>
              <h4 className="text-xl font-light text-[var(--color-text-primary)]">
                REQUEST SERVICES OR CHARTER WITH {company.displayName.toUpperCase()}
              </h4>
              <p className="text-xs text-[var(--color-text-secondary)]">
                Submit an integrated mission request to connect with verified handling or flight operators.
              </p>
            </div>
            <Link href={`/plan?operator=${encodeURIComponent(company.displayName)}`}>
              <Button variant="primary" size="lg">
                SUBMIT REQUEST →
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
