import React from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { ProvenanceBadge } from "@/components/shared/ProvenanceBadge";
import { Button } from "@/components/ui/Button";
import { HeliportExplorer } from "@/components/heliports/HeliportExplorer";
import { HeliportRepository } from "@/data/real/heliports";
import { createRouteMetadata } from "@/lib/seo/metadata";

export const metadata = createRouteMetadata({
  path: "/heliports",
  title: "Romania Heliport Directory & Helipad Access Guide | Brașov, Transylvania, Delta",
  description:
    "Authoritative guide to certified Romanian heliports, airport rotor stands, and off-airfield landing permissions in Bucharest, Transylvania, Brașov, and the Danube Delta.",
});

export default function HeliportsDirectoryPage() {
  const heliports = HeliportRepository.getAllHeliports();

  return (
    <div className="w-full bg-white text-neutral-900 font-sans flex-1 flex flex-col">
      {/* 01 — HERO HEADER */}
      <section className="w-full py-20 sm:py-28 border-b border-neutral-200/80 bg-white">
        <Container size="wide">
          <div className="flex flex-col gap-8 max-w-6xl mx-auto">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
              <Link href="/" className="hover:text-amber-600 transition">HOME</Link>
              <span>/</span>
              <span className="text-neutral-900 font-bold">ROMANIA HELIPORT DIRECTORY</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-200 pb-8">
              <div className="space-y-4 max-w-3xl">
                <div className="flex items-center gap-3">
                  <span className="editorial-tag-dark">
                    AERONAUTICAL DIRECTORY // HELIPORTS & ROTOR ACCESS
                  </span>
                  <ProvenanceBadge status="OFFICIAL_SOURCE" sourceName="AACR / ROMATSA AIP Romania" sourceUrl="https://www.caa.ro" showSource />
                </div>
                <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-neutral-900 leading-[1.05] font-sans">
                  Romania Heliport Directory<span className="text-amber-600">.</span>
                </h1>
                <p className="text-lg text-neutral-600 font-light leading-relaxed">
                  Explore certified civil heliports, aerodrome rotor stands, and verified off-airfield helicopter access requirements across Transylvania, Brașov, the Black Sea, and the Danube Delta.
                </p>
              </div>

              <Link href="/plan?helicopter=true">
                <Button variant="primary" size="lg" className="whitespace-nowrap px-8 shadow-xl">
                  REQUEST HELICOPTER FLIGHT →
                </Button>
              </Link>
            </div>

            {/* Statutory Integrity Notice */}
            <div className="p-5 rounded-2xl bg-[#fafaf7] border border-neutral-200 text-xs text-neutral-600 leading-relaxed">
              <strong className="text-neutral-900 font-mono block mb-1">
                AERONAUTICAL COMPLIANCE & TOUCHDOWN TRANSPARENCY:
              </strong>
              AIR distinguishes officially certified civil heliports (e.g. Tuzla LRTZ) and aerodrome rotor stands from unverified private estates or resort landing grounds. A helicopter cannot land at a hotel, estate, or delta reserve without written landowner permission, environmental clearance (e.g. ARBDD), and AOC operator risk assessment.
            </div>
          </div>
        </Container>
      </section>

      {/* 02 — INTERACTIVE EXPLORER */}
      <section className="w-full py-16 sm:py-24 bg-[#fafaf7]">
        <Container size="wide">
          <div className="max-w-6xl mx-auto">
            <HeliportExplorer heliports={heliports} />
          </div>
        </Container>
      </section>
    </div>
  );
}
