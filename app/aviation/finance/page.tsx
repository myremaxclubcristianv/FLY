import React from "react";
import Link from "next/link";
import { Container } from "../../../components/layout/Container";
import { SectionHeader } from "../../../components/shared/SectionHeader";
import { DataStatusBadge } from "../../../components/shared/DataStatusBadge";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";

export const metadata = {
  title: "Aviation Finance & Asset Leasing | AIR",
  description:
    "Decision support guidelines on asset-backed aircraft financing, operating leases, capital loans, and ownership structuring.",
};

export default function AviationFinancePage() {
  const topics = [
    { title: "ASSET-BASED FINANCING", desc: "Non-recourse or recourse aircraft debt financing structured against aircraft residual appraisal value." },
    { title: "OPERATING LEASES", desc: "Off-balance-sheet aircraft leasing providing predictable monthly operational costs without residual asset risk." },
    { title: "CAPITAL STRUCTURE & TAX", desc: "Corporate ownership structuring for multi-jurisdictional VAT and depreciation optimization." },
  ];

  return (
    <div className="w-full py-16 bg-[var(--color-bg-primary)] flex-1 flex flex-col gap-12">
      <Container size="default">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4 border-b border-[var(--color-border)] pb-8">
            <div className="flex items-center gap-3">
              <span className="text-xs font-data text-[var(--color-accent)] uppercase tracking-widest">
                AVIATION ECOSYSTEM // FINANCE
              </span>
              <DataStatusBadge status="INDICATIVE" />
            </div>

            <SectionHeader
              title="AIRCRAFT FINANCE & CAPITAL LEASING."
              description="AIR provides decision-support frameworks for evaluating aircraft debt structures, operating leases, and asset financing."
              titleAs="h1"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topics.map((t) => (
              <Card key={t.title} variant="surface" className="flex flex-col gap-4 p-8">
                <span className="text-[10px] font-data text-[var(--color-accent)]">FINANCIAL STRUCTURE</span>
                <h3 className="text-xl font-light text-[var(--color-text-primary)]">{t.title}</h3>
                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed font-sans">{t.desc}</p>
              </Card>
            ))}
          </div>

          <div className="p-6 bg-[var(--color-surface)] border border-[var(--color-border)] text-xs text-[var(--color-text-muted)] leading-relaxed">
            <strong>DISCLOSURE:</strong> AIR is an aviation access platform and does not act as a licensed financial institution or loan broker. Content is provided strictly for educational decision-support.
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)]">
            <Link href="/aviation">
              <Button variant="outline" size="md">← BACK TO AVIATION DIRECTORY</Button>
            </Link>
            <Link href="/plan">
              <Button variant="primary" size="md">PLAN A FLIGHT MISSION →</Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
