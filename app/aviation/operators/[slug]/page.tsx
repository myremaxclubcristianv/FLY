import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { operatorService } from "../../../../lib/services/operator-service";
import { Container } from "../../../../components/layout/Container";
import { SectionHeader } from "../../../../components/shared/SectionHeader";
import { DataStatusBadge } from "../../../../components/shared/DataStatusBadge";
import { Card } from "../../../../components/ui/Card";
import { Button } from "../../../../components/ui/Button";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const operator = await operatorService.getBySlug(slug);
  if (!operator) return { title: "Operator Profile | AIR" };
  return {
    title: `${operator.displayName} Profile & Fleet | AIR Aviation Directory`,
    description: `Verified operator profile for ${operator.legalName} based at ${operator.baseAirportName}.`,
  };
}

export default async function OperatorDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const operator = await operatorService.getBySlug(slug);

  if (!operator) {
    notFound();
  }

  return (
    <div className="w-full py-16 bg-[var(--color-bg-primary)] flex-1 flex flex-col gap-12">
      <Container size="default">
        <div className="flex flex-col gap-10">
          {/* Header */}
          <div className="flex flex-col gap-4 border-b border-[var(--color-border)] pb-8">
            <div className="flex items-center justify-between">
              <span className="text-xs font-data text-[var(--color-accent)] uppercase tracking-widest">
                OPERATOR PROFILE // {operator.operatorType}
              </span>
              <DataStatusBadge status={operator.verificationStatus === "DATA_VERIFIED" ? "VERIFIED" : "INDICATIVE"} />
            </div>

            <SectionHeader
              title={operator.displayName}
              description={`Legal Entity: ${operator.legalName}. Headquartered in ${operator.country}. Primary Base: ${operator.baseAirportName}.`}
              titleAs="h1"
            />
          </div>

          {/* Identity & Verification Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-data text-xs">
            <Card variant="surface" className="flex flex-col gap-2">
              <span className="text-[10px] text-[var(--color-text-muted)] uppercase">VERIFICATION PROVENANCE</span>
              <span className="text-[var(--color-accent)] font-medium">
                {operator.verificationStatus}
              </span>
              <span className="text-[10px] text-[var(--color-text-muted)]">
                Source: {operator.source?.name} ({operator.source?.type})
              </span>
            </Card>

            <Card variant="surface" className="flex flex-col gap-2">
              <span className="text-[10px] text-[var(--color-text-muted)] uppercase">PRIMARY OPERATING BASE</span>
              <span className="text-[var(--color-text-primary)] font-medium">
                {operator.baseAirportName}
              </span>
              <span className="text-[10px] text-[var(--color-text-muted)]">
                Last Verified: {operator.lastVerifiedAt}
              </span>
            </Card>

            <Card variant="surface" className="flex flex-col gap-2">
              <span className="text-[10px] text-[var(--color-text-muted)] uppercase">FLEET CAPACITY</span>
              <span className="text-[var(--color-text-primary)] font-medium">
                {operator.fleetCount} ACTIVE VEHICLES
              </span>
              <span className="text-[10px] text-[var(--color-text-muted)]">
                Identity Provenance Checked
              </span>
            </Card>
          </div>

          {/* Services Offered */}
          <Card variant="surface" className="flex flex-col gap-4 p-8">
            <h3 className="text-xl font-light text-[var(--color-text-primary)]">
              OPERATIONAL SERVICES SUMMARY
            </h3>
            <ul className="flex flex-col gap-2.5 font-sans text-sm text-[var(--color-text-secondary)]">
              {operator.servicesSummary?.map((srv) => (
                <li key={srv} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
                  <span>{srv}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Action Trigger */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-8 bg-[var(--color-surface)] border border-[var(--color-border)]">
            <div>
              <h4 className="text-xl font-light text-[var(--color-text-primary)]">
                REQUEST A QUOTE FROM THIS OPERATOR
              </h4>
              <p className="text-xs text-[var(--color-text-secondary)]">
                AIR submits your mission parameters directly to {operator.displayName} for quote evaluation.
              </p>
            </div>
            <Link href={`/plan?from=Bucharest`}>
              <Button variant="primary" size="lg">
                REQUEST MISSION QUOTE →
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
