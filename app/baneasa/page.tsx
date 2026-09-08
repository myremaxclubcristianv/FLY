import React from "react";
import Link from "next/link";
import { Container } from "../../components/layout/Container";
import { SectionHeader } from "../../components/shared/SectionHeader";
import { DataStatusBadge } from "../../components/shared/DataStatusBadge";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { PlaceholderImage } from "../../components/shared/PlaceholderImage";

export const metadata = {
  title: "Băneasa (LROP / BBU) — Bucharest's Aviation Gateway | AIR",
  description:
    "Bucharest-Băneasa Aurel Vlaicu International Airport operational hub for business jet charter, executive FBO handling, twin-engine helicopters, and general aviation.",
};

export default function BaneasaPage() {

  const sections = [
    { title: "PRIVATE AVIATION & CHARTER", desc: "Dedicated general aviation apron with zero commercial airline congestion. 10-minute access to Bucharest CBD." },
    { title: "FBO & VIP HANDLING", desc: "Băneasa Business Flight Terminal featuring private passenger lounges, direct ramp car access, and fast-track customs." },
    { title: "TWIN HELICOPTER ACCESS", desc: "Helicopter positioning hub for rapid point-to-point transfers to Transylvania, mountain pads, and Black Sea resorts." },
    { title: "MAINTENANCE & HANGARS", desc: "Part-145 maintenance infrastructure, aircraft hangarage, and ground handling support services." },
  ];

  return (
    <div className="w-full py-16 bg-[var(--color-bg-primary)] flex-1 flex flex-col gap-16">
      <Container size="wide">
        <div className="flex flex-col gap-16">
          {/* Header */}
          <div className="flex flex-col gap-4 border-b border-[var(--color-border)] pb-8">
            <div className="flex items-center gap-3">
              <span className="text-xs font-data text-[var(--color-accent)] uppercase tracking-widest">
                BUCHAREST AVIATION HUB // LROP / BBU
              </span>
              <DataStatusBadge status="INDICATIVE" />
            </div>

            <SectionHeader
              title="BUCHAREST'S AVIATION GATEWAY."
              description="Bucharest-Băneasa Aurel Vlaicu International Airport (LROP / BBU) serves as Romania's premier business aviation and general flight gateway."
              titleAs="h1"
            />
          </div>

          {/* Visual Showcase */}
          <PlaceholderImage
            title="BĂNEASA AUREL VLAICU (LROP / BBU)"
            code="HUB // COORD: 44.5032° N, 26.1021° E"
            aspectRatio="wide"
          />

          {/* Infrastructure Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sections.map((sec) => (
              <Card key={sec.title} variant="surface" className="flex flex-col gap-3 p-8">
                <span className="text-[10px] font-data text-[var(--color-accent)]">HUB CAPABILITY</span>
                <h3 className="text-xl font-light text-[var(--color-text-primary)]">{sec.title}</h3>
                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed font-sans">{sec.desc}</p>
              </Card>
            ))}
          </div>

          {/* Location Provenance Notice */}
          <div className="p-6 bg-[var(--color-surface)] border border-[var(--color-border)] text-xs text-[var(--color-text-muted)] leading-relaxed">
            <strong>PLATFORM DISCLOSURE:</strong> AIR is an aviation access platform and does not own or operate Băneasa Aurel Vlaicu International Airport. Information is sourced from public aviation registries and verified ground service providers.
          </div>

          {/* Action Trigger */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-8 bg-[var(--color-surface)] border border-[var(--color-border)]">
            <div>
              <h4 className="text-xl font-light text-[var(--color-text-primary)]">
                PLAN A FLIGHT DEPARTING FROM BĂNEASA (LROP)
              </h4>
              <p className="text-xs text-[var(--color-text-secondary)]">
                Calculate helicopter, turboprop, or jet travel time from Băneasa.
              </p>
            </div>
            <Link href="/plan?from=Baneasa%20LROP">
              <Button variant="primary" size="lg">
                PLAN BĂNEASA DEPARTURE →
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
