import React from "react";
import Link from "next/link";
import { Container } from "../../components/layout/Container";
import { SectionHeader } from "../../components/shared/SectionHeader";
import { DataStatusBadge } from "../../components/shared/DataStatusBadge";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { AviationImage } from "../../components/AviationImage";
import { operatorService } from "../../lib/services/operator-service";

export const metadata = {
  title: "Aviation Supply Directory & Infrastructure | AIR",
  description:
    "Discover verified operators, aircraft fleets, airports, heliports, FBO handling facilities, and maintenance infrastructure across Romania and Europe.",
  alternates: {
    canonical: "/aviation",
  },
};

export default async function AviationPage() {
  const operators = await operatorService.getAll();

  const categories = [
    { title: "OPERATORS", count: "3 VERIFIED", desc: "Private jet charter, helicopter operators, executive flight operations.", img: "https://images.unsplash.com/photo-1520690214124-2405c5217036?auto=format&fit=crop&w=800&q=80" },
    { title: "AIRCRAFT", count: "4 CATEGORIES", desc: "Fleet specifications, passenger capacities, and range envelopes.", img: "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&w=800&q=80" },
    { title: "AIRPORTS & HELIPORTS", count: "12 LOCATIONS", desc: "Băneasa (LRBS / BBU), Otopeni (LROP / OTP), Brașov (LROV), Constanța (LRCK), Tuzla (LRTZ).", img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80" },
    { title: "FBO & HANDLING", count: "2 FACILITIES", desc: "VIP lounge access, customs clearance, and direct ramp car transfers.", img: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=800&q=80" },
    { title: "MAINTENANCE & MRO", count: "INFRASTRUCTURE", desc: "Part-145 certified maintenance facilities and line servicing.", img: "https://images.unsplash.com/photo-1474302770737-173ee21bab63?auto=format&fit=crop&w=800&q=80" },
    { title: "HANGARS & PARKING", count: "INFRASTRUCTURE", desc: "Executive aircraft parking, climate-controlled hangarage, and ground support.", img: "https://images.unsplash.com/photo-1520437358207-323b43b50729?auto=format&fit=crop&w=800&q=80" },
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
              <Card key={cat.title} variant="surface" className="flex flex-col justify-between overflow-hidden group hover:border-amber-400/50 transition-all duration-300 rounded-2xl">
                <div className="relative h-44 w-full bg-neutral-900 overflow-hidden">
                  <AviationImage
                    src={cat.img}
                    alt={cat.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                    fallbackTitle={cat.title}
                    fallbackCode={`ECO // ${cat.title}`}
                  />
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[10px] font-data text-amber-400 font-semibold z-10">
                    {cat.count}
                  </div>
                </div>

                <div className="p-6 flex flex-col justify-between gap-3 flex-1">
                  <h3 className="text-xl font-light text-[var(--color-text-primary)] group-hover:text-amber-300 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed font-sans">
                    {cat.desc}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          {/* Operators Directory Section */}
          <div className="flex flex-col gap-8 pt-8 border-t border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-data text-amber-400 uppercase font-semibold">
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
                <Card key={op.id} variant="surface" className="flex flex-col justify-between gap-6 p-8 rounded-2xl hover:border-amber-400/50 transition-all duration-300">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-data text-amber-400 font-semibold">
                        {op.operatorType}
                      </span>
                      <DataStatusBadge status={op.verificationStatus === "VERIFIED" || op.verificationStatus === "OFFICIAL_SOURCE" ? "VERIFIED" : "INDICATIVE"} />
                    </div>

                    <h3 className="text-xl font-light text-[var(--color-text-primary)]">
                      {op.displayName}
                    </h3>
                    <span className="text-xs font-data text-[var(--color-text-muted)]">
                      LEGAL: {op.legalName}
                    </span>

                    <p className="text-xs text-[var(--color-text-secondary)] font-sans">
                      Base: {op.baseAirportName}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
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
            <Card variant="surface" className="flex flex-col gap-4 p-8 rounded-2xl hover:border-amber-400/50 transition-all duration-300">
              <span className="text-[10px] font-data text-amber-400 font-semibold">
                SERVICES // FINANCE
              </span>
              <h3 className="text-xl font-light text-[var(--color-text-primary)]">
                AVIATION FINANCE & LEASING
              </h3>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed font-sans">
                Educational decision support on asset-based financing, leasing structures, and capital allocation.
              </p>
              <Link href="/aviation/finance">
                <Button variant="outline" size="sm">
                  EXPLORE FINANCE ENTRY →
                </Button>
              </Link>
            </Card>

            <Card variant="surface" className="flex flex-col gap-4 p-8 rounded-2xl hover:border-amber-400/50 transition-all duration-300">
              <span className="text-[10px] font-data text-amber-400 font-semibold">
                SERVICES // INSURANCE
              </span>
              <h3 className="text-xl font-light text-[var(--color-text-primary)]">
                AIRCRAFT & HULL INSURANCE
              </h3>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed font-sans">
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
