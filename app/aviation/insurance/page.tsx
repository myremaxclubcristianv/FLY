import React from "react";
import Link from "next/link";
import { Container } from "../../../components/layout/Container";
import { SectionHeader } from "../../../components/shared/SectionHeader";
import { DataStatusBadge } from "../../../components/shared/DataStatusBadge";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";

export const metadata = {
  title: "Aviation Insurance & Risk Coverage | AIR",
  description:
    "Decision support on aircraft hull risk insurance, third-party liability, passenger cover, and operator insurance compliance.",
};

export default function AviationInsurancePage() {
  const topics = [
    { title: "HULL & ALL-RISK COVER", desc: "Physical damage coverage for aircraft airframe, engines, and avionics during ground, taxi, and flight operations." },
    { title: "THIRD-PARTY LIABILITY", desc: "Mandatory statutory coverage protecting against third-party property damage and bodily injury claims." },
    { title: "PASSENGER & CREW RISK", desc: "Medical expense, baggage liability, and personal accident protection for charter passengers and flight crew." },
  ];

  return (
    <div className="w-full py-16 bg-[var(--color-bg-primary)] flex-1 flex flex-col gap-12">
      <Container size="default">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4 border-b border-[var(--color-border)] pb-8">
            <div className="flex items-center gap-3">
              <span className="text-xs font-data text-[var(--color-accent)] uppercase tracking-widest">
                AVIATION ECOSYSTEM // INSURANCE
              </span>
              <DataStatusBadge status="INDICATIVE" />
            </div>

            <SectionHeader
              title="AIRCRAFT & HULL INSURANCE."
              description="AIR outlines insurance requirements and risk management standards across commercial air charter and private aircraft ownership."
              titleAs="h1"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topics.map((t) => (
              <Card key={t.title} variant="surface" className="flex flex-col gap-4 p-8">
                <span className="text-[10px] font-data text-[var(--color-accent)]">RISK COVERAGE</span>
                <h3 className="text-xl font-light text-[var(--color-text-primary)]">{t.title}</h3>
                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed font-sans">{t.desc}</p>
              </Card>
            ))}
          </div>

          <div className="p-6 bg-[var(--color-surface)] border border-[var(--color-border)] text-xs text-[var(--color-text-muted)] leading-relaxed">
            <strong>DISCLOSURE:</strong> AIR is an aviation access platform and does not act as a licensed insurance broker or insurer. Information is provided strictly for educational purposes.
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
