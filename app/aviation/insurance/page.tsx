import React from "react";
import Link from "next/link";
import { Container } from "../../../components/layout/Container";
import { SectionHeader } from "../../../components/shared/SectionHeader";
import { DataStatusBadge } from "../../../components/shared/DataStatusBadge";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { AviationImage } from "../../../components/AviationImage";

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

          {/* Visual Showcase: Aircraft Hull & Maintenance Risk Verification */}
          <div className="relative h-72 sm:h-80 rounded-2xl overflow-hidden glass-surface border border-white/10 group">
            <AviationImage
              src="https://images.unsplash.com/photo-1519074069444-1ba4ea16007e?auto=format&fit=crop&w=1200&q=80"
              alt="Aircraft Hull & Airframe Risk Verification"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              fallbackTitle="Aircraft Hull Risk"
              fallbackCode="INSURANCE // HULL"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-1.5 z-10">
              <span className="text-[10px] font-data text-amber-400 font-semibold tracking-wider">
                PART-CAT STATUTORY RISK COMPLIANCE
              </span>
              <h3 className="text-xl font-light text-white">
                Hull, War, and Third-Party Underwriting
              </h3>
              <p className="text-xs text-neutral-300 font-sans max-w-2xl">
                Comprehensive flight line liability verification ensuring all charter operators carry minimum $50M–$500M third-party hull and passenger risk cover.
              </p>
            </div>
          </div>

          {/* Topics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topics.map((t) => (
              <Card key={t.title} variant="surface" className="flex flex-col gap-4 p-8 rounded-2xl hover:border-amber-400/50 transition-all duration-300">
                <span className="text-[10px] font-data text-amber-400 font-semibold">RISK COVERAGE</span>
                <h3 className="text-xl font-light text-[var(--color-text-primary)]">{t.title}</h3>
                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed font-sans">{t.desc}</p>
              </Card>
            ))}
          </div>

          <div className="p-6 glass-instrument rounded-2xl text-xs text-[var(--color-text-secondary)] leading-relaxed font-sans">
            <strong className="text-amber-400 font-data">DISCLOSURE:</strong> AIR is an aviation access platform and does not act as a licensed insurance broker or insurer. Information is provided strictly for educational purposes.
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-white/10">
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
