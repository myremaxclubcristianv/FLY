import React from "react";
import Link from "next/link";
import { Container } from "../../../components/layout/Container";
import { SectionHeader } from "../../../components/shared/SectionHeader";
import { DataStatusBadge } from "../../../components/shared/DataStatusBadge";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { AviationImage } from "../../../components/AviationImage";

export const metadata = {
  title: "Aircraft Ownership & Access Decision Matrix | AIR",
  description:
    "Evaluate charter, membership, fractional, leasing, full ownership, and aircraft management models based on annual flight hours and operational complexity.",
};

export default function AircraftOwnershipPage() {
  const models = [
    {
      title: "ON-DEMAND CHARTER",
      hours: "1 - 25 HOURS / YEAR",
      commitment: "ZERO CAPITAL COMMITMENT",
      summary: "Ideal for flexible, occasional flight needs with zero residual asset risk or fixed monthly overhead.",
      bestFor: "Individual missions, occasional corporate trips, seasonal vacation hops.",
    },
    {
      title: "JET CARD / MEMBERSHIP",
      hours: "25 - 50 HOURS / YEAR",
      commitment: "PRE-PAID FLIGHT DEPOSIT",
      summary: "Guaranteed hourly rate tiers and priority fleet positioning without long-term capital depreciation.",
      bestFor: "Predictable annual hours, executive teams needing guaranteed peak availability.",
    },
    {
      title: "FRACTIONAL OWNERSHIP",
      hours: "50 - 150 HOURS / YEAR",
      commitment: "EQUITY SHARE (1/16 - 1/2 SHARE)",
      summary: "Direct asset share ownership providing tax depreciation benefits and dedicated fleet consistency.",
      bestFor: "Frequent executive travel across fixed regional flight corridors.",
    },
    {
      title: "FULL AIRCRAFT OWNERSHIP",
      hours: "150+ HOURS / YEAR",
      commitment: "FULL CAPITAL ACQUISITION",
      summary: "Complete operational control, custom cabin interior tailoring, and 100% mission availability.",
      bestFor: "Corporations, family offices, and high-utilization flight departments.",
    },
    {
      title: "AIRCRAFT MANAGEMENT (ACMI)",
      hours: "OWNED FLEET OPTIMIZATION",
      commitment: "MANAGEMENT CONTRACT",
      summary: "AIR coordinates crew management, maintenance oversight, hangarage, and charter revenue offsetting.",
      bestFor: "Aircraft owners seeking operational compliance and charter revenue placement.",
    },
  ];

  return (
    <div className="w-full py-16 bg-[var(--color-bg-primary)] flex-1 flex flex-col gap-12">
      <Container size="default">
        <div className="flex flex-col gap-12">
          {/* Header */}
          <div className="flex flex-col gap-4 border-b border-[var(--color-border)] pb-8">
            <div className="flex items-center gap-3">
              <span className="text-xs font-data text-[var(--color-accent)] uppercase tracking-widest">
                DECISION FRAMEWORK // ACCESS VS OWNERSHIP
              </span>
              <DataStatusBadge status="INDICATIVE" />
            </div>

            <SectionHeader
              title="OWN THE RIGHT WAY."
              description="Selecting between on-demand charter, jet cards, fractional shares, full ownership, and management services requires matching annual block hours against capital liquidity goals."
              titleAs="h1"
            />
          </div>

          {/* Visual Asset Inspection Banner */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative h-64 rounded-2xl overflow-hidden glass-surface border border-white/10 group">
              <AviationImage
                src="https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=1200&q=80"
                alt="Aircraft Hangar Delivery & Management"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                fallbackTitle="Hangar Management"
                fallbackCode="HANGAR // 01"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 z-10">
                <span className="text-[10px] font-data text-amber-400 font-semibold tracking-wider block">
                  FACILITY & HANGARAGE
                </span>
                <p className="text-xs text-neutral-200 font-sans mt-0.5">
                  Controlled climate storage, Part-145 line maintenance, and secure ramp positioning at LRBS.
                </p>
              </div>
            </div>

            <div className="relative h-64 rounded-2xl overflow-hidden glass-surface border border-white/10 group">
              <AviationImage
                src="https://images.unsplash.com/photo-1474302770737-173ee21bab63?auto=format&fit=crop&w=1200&q=80"
                alt="Pre-Flight Airframe Inspection"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                fallbackTitle="Asset Inspection"
                fallbackCode="INSPECTION // 02"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 z-10">
                <span className="text-[10px] font-data text-amber-400 font-semibold tracking-wider block">
                  TECHNICAL COMPLIANCE & AUDIT
                </span>
                <p className="text-xs text-neutral-200 font-sans mt-0.5">
                  Rigorous airworthiness verification, engine cycle logging, and CAMO continuing management oversight.
                </p>
              </div>
            </div>
          </div>

          {/* Matrix Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {models.map((m) => (
              <Card key={m.title} variant="surface" className="flex flex-col justify-between gap-6 p-8 rounded-2xl hover:border-amber-400/50 transition-all duration-300">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-data text-amber-400 font-semibold">
                      {m.hours}
                    </span>
                    <span className="text-[9px] font-data text-[var(--color-text-secondary)] border border-white/10 px-2 py-0.5 rounded">
                      {m.commitment}
                    </span>
                  </div>

                  <h3 className="text-2xl font-light text-[var(--color-text-primary)]">
                    {m.title}
                  </h3>

                  <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed font-sans">
                    {m.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
                  <span className="text-[9px] font-data text-[var(--color-text-muted)] block uppercase tracking-wider">
                    BEST SUITED FOR:
                  </span>
                  <span className="text-xs font-medium text-[var(--color-text-primary)] font-sans">
                    {m.bestFor}
                  </span>
                </div>
              </Card>
            ))}
          </div>

          {/* Decision Disclaimer */}
          <div className="p-6 glass-instrument rounded-2xl text-xs text-[var(--color-text-secondary)] leading-relaxed font-sans">
            <strong className="text-amber-400 font-data">DISCLOSURE:</strong> This matrix provides educational decision support for aircraft access evaluation. AIR coordinates aviation services with verified operators and does not provide financial or tax advice.
          </div>

          {/* Action CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 glass-elevated rounded-2xl">
            <p className="text-xs text-[var(--color-text-secondary)] font-data">
              Unsure which model fits your corporate flight department?
            </p>
            <Link href="/plan">
              <Button variant="primary" size="md">
                EVALUATE YOUR MISSION PROFILE →
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
