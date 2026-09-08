import React from "react";
import Link from "next/link";
import { Container } from "../../components/layout/Container";
import { SectionHeader } from "../../components/shared/SectionHeader";
import { DataStatusBadge } from "../../components/shared/DataStatusBadge";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { operatorService } from "../../lib/services/operator-service";

export const metadata = {
  title: "Aviation Supply Directory & Infrastructure | AIR",
  description:
    "Discover verified operators, aircraft fleets, airports, heliports, FBO handling facilities, and maintenance infrastructure across Romania and Europe.",
};

export default async function AviationPage() {
  const operators = await operatorService.getAll();

  const categories = [
    { title: "OPERATORS", count: "3 VERIFIED", desc: "Private jet charter, helicopter operators, executive flight operations." },
    { title: "AIRCRAFT", count: "4 CATEGORIES", desc: "Fleet specifications, passenger capacities, and range envelopes." },
    { title: "AIRPORTS & HELIPORTS", count: "4 LOCATIONS", desc: "Băneasa (LROP), Brașov (LROV), Constanța (LRCK), Bran Helipad." },
    { title: "FBO & HANDLING", count: "2 FACILITIES", desc: "VIP lounge access, customs clearance, and direct ramp car transfers." },
    { title: "MAINTENANCE & MRO", count: "INFRASTRUCTURE", desc: "Part-145 certified maintenance facilities and line servicing." },
    { title: "HANGARS & PARKING", count: "INFRASTRUCTURE", desc: "Executive aircraft parking, climate-controlled hangarage, and ground support." },
  ];

  return (
    <div className="w-full py-16 bg-[var(--color-bg-primary)] flex-1 flex flex-col gap-16">
      <Container size="wide">
        <div className="flex flex-col gap-16">
          {/* Header */}
          <div className="flex flex-col gap-4 border-b border-[var(--color-border)] pb-8">
            <div className="flex items-center gap-3">
              <span className="text-xs font-data text-[var(--color-accent)] uppercase tracking-widest">
                WORLD // 05 AVIATION ECOSYSTEM
              </span>
              <DataStatusBadge status="INDICATIVE" />
            </div>

            <SectionHeader
              title="THE INFRASTRUCTURE BEHIND THE WAY YOU FLY."
              description="AIR connects operators, aircraft fleets, airfields, helipads, FBO handling facilities, maintenance providers, and ownership services into a transparent access network."
              titleAs="h1"
            />
          </div>

          {/* Infrastructure Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <Card key={cat.title} variant="surface" className="flex flex-col justify-between gap-6 p-8">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-data text-[var(--color-accent)]">
                      {cat.count}
                    </span>
                    <DataStatusBadge status="INDICATIVE" showDot={false} />
                  </div>
                  <h3 className="text-2xl font-light text-[var(--color-text-primary)]">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                    {cat.desc}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          {/* Operators Directory Section */}
          <div className="flex flex-col gap-8 pt-8 border-t border-[var(--color-border)]">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-data text-[var(--color-accent)] uppercase">
                  VERIFIED SUPPLY DIRECTORY
                </span>
                <h2 className="text-2xl font-light text-[var(--color-text-primary)]">
                  AIR OPERATORS NETWORK
                </h2>
              </div>
              <DataStatusBadge status="VERIFIED" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {operators.map((op) => (
                <Card key={op.id} variant="default" className="flex flex-col justify-between gap-6">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-data text-[var(--color-accent)]">
                        {op.operatorType}
                      </span>
                      <DataStatusBadge status={op.verificationStatus === "DATA_VERIFIED" ? "VERIFIED" : "INDICATIVE"} />
                    </div>

                    <h3 className="text-xl font-light text-[var(--color-text-primary)]">
                      {op.displayName}
                    </h3>
                    <span className="text-xs font-data text-[var(--color-text-muted)]">
                      LEGAL: {op.legalName}
                    </span>

                    <p className="text-xs text-[var(--color-text-secondary)]">
                      Base: {op.baseAirportName}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[var(--color-border-subtle)] flex items-center justify-between">
                    <span className="text-[10px] font-data text-[var(--color-text-muted)]">
                      FLEET: {op.fleetCount} AIRCRAFT
                    </span>
                    <Link href={`/aviation/operators/${op.slug}`}>
                      <Button variant="outline" size="sm">
                        VIEW PROFILE →
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Specialized Services Entry Points */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            <Card variant="surface" className="flex flex-col gap-4 p-8">
              <span className="text-[10px] font-data text-[var(--color-accent)]">
                SERVICES // FINANCE
              </span>
              <h3 className="text-xl font-light text-[var(--color-text-primary)]">
                AVIATION FINANCE & LEASING
              </h3>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                Educational decision support on asset-based financing, leasing structures, and capital allocation.
              </p>
              <Link href="/aviation/finance">
                <Button variant="outline" size="sm">
                  EXPLORE FINANCE ENTRY →
                </Button>
              </Link>
            </Card>

            <Card variant="surface" className="flex flex-col gap-4 p-8">
              <span className="text-[10px] font-data text-[var(--color-accent)]">
                SERVICES // INSURANCE
              </span>
              <h3 className="text-xl font-light text-[var(--color-text-primary)]">
                AIRCRAFT & HULL INSURANCE
              </h3>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                Hull risk, third-party liability, passenger cover, and war risk insurance architecture guidelines.
              </p>
              <Link href="/aviation/insurance">
                <Button variant="outline" size="sm">
                  EXPLORE INSURANCE ENTRY →
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}
