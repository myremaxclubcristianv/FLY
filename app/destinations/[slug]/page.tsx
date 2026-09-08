import React from "react";
import Link from "next/link";
import { Container } from "../../../components/layout/Container";
import { SectionHeader } from "../../../components/shared/SectionHeader";
import { DataStatusBadge } from "../../../components/shared/DataStatusBadge";
import { PlaceholderImage } from "../../../components/shared/PlaceholderImage";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const name = slug.charAt(0).toUpperCase() + slug.slice(1);
  return {
    title: `${name} Aviation Access & Flight Planning | AIR`,
    description: `Aviation access parameters, helipads, regional airfields, and flight times for ${name}.`,
  };
}

export default async function DestinationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const title = slug.toUpperCase();

  return (
    <div className="w-full py-16 bg-[var(--color-bg-primary)] flex-1 flex flex-col gap-12">
      <Container size="default">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4 border-b border-[var(--color-border)] pb-8">
            <div className="flex items-center justify-between">
              <span className="text-xs font-data text-[var(--color-accent)] uppercase tracking-widest">
                DESTINATION ACCESS PROFILE // {title}
              </span>
              <DataStatusBadge status="INDICATIVE" />
            </div>

            <SectionHeader
              title={`${title} REGIONAL AVIATION ACCESS.`}
              description={`AIR evaluates airfield runway specs, helipad access, and ground transfers for missions connecting Bucharest with ${title}.`}
              titleAs="h1"
            />
          </div>

          <PlaceholderImage title={`${title} ACCESS`} code={`DEST // ${title}`} aspectRatio="wide" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-data text-xs">
            <Card variant="surface" className="flex flex-col gap-2">
              <span className="text-[10px] text-[var(--color-text-muted)] uppercase">INDICATIVE HELI TIME</span>
              <span className="text-xl text-[var(--color-text-primary)] font-light">42 MIN FLIGHT</span>
              <span className="text-[10px] text-[var(--color-text-muted)]">Direct Pad Landing</span>
            </Card>

            <Card variant="surface" className="flex flex-col gap-2">
              <span className="text-[10px] text-[var(--color-text-muted)] uppercase">TURBOPROP / JET ACCESS</span>
              <span className="text-xl text-[var(--color-text-primary)] font-light">25 - 35 MIN</span>
              <span className="text-[10px] text-[var(--color-text-muted)]">Airfield Vector</span>
            </Card>

            <Card variant="surface" className="flex flex-col gap-2">
              <span className="text-[10px] text-[var(--color-text-muted)] uppercase">DATA PROVENANCE</span>
              <span className="text-[var(--color-accent)] font-medium">INDICATIVE</span>
              <span className="text-[10px] text-[var(--color-text-muted)]">Quote Request Required</span>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-8 bg-[var(--color-surface)] border border-[var(--color-border)]">
            <div>
              <h4 className="text-xl font-light text-[var(--color-text-primary)]">
                PLAN A FLIGHT TO {title}
              </h4>
              <p className="text-xs text-[var(--color-text-secondary)]">
                Calculate vehicle options and request a verified quote.
              </p>
            </div>
            <Link href={`/plan?to=${encodeURIComponent(title)}`}>
              <Button variant="primary" size="lg">
                RUN MISSION IN PLANNER →
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
