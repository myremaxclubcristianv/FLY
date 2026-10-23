import React from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { ProvenanceBadge } from "@/components/shared/ProvenanceBadge";
import { Button } from "@/components/ui/Button";
import { HeliportExplorer } from "@/components/heliports/HeliportExplorer";
import { HeliportRepository } from "@/data/real/heliports";
import { createRouteMetadata } from "@/lib/seo/metadata";

export const metadata = createRouteMetadata({
  path: "/ro/heliports",
  title: "Ghid Heliporturi România & Acces Elicopter | Brașov, Tuzla, Delta Dunării",
  description:
    "Ghid aeronautic al heliporturilor civile certificate, standurilor de rotorcraft din aeroporturi și procedurilor de acces elicopter în Transilvania, Brașov și Delta Dunării.",
});

export default function RomanianHeliportsPage() {
  const heliports = HeliportRepository.getAllHeliports();

  return (
    <div className="w-full bg-white text-neutral-900 font-sans flex-1 flex flex-col">
      {/* 01 — HERO HEADER */}
      <section className="w-full py-20 sm:py-28 border-b border-neutral-200/80 bg-white">
        <Container size="wide">
          <div className="flex flex-col gap-8 max-w-6xl mx-auto">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
              <Link href="/ro" className="hover:text-amber-600 transition">ACASĂ</Link>
              <span>/</span>
              <span className="text-neutral-900 font-bold">DIRECTOR HELIPORTURI ROMÂNIA</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-200 pb-8">
              <div className="space-y-4 max-w-3xl">
                <div className="flex items-center gap-3">
                  <span className="editorial-tag-dark">
                    DIRECTOR AERONAUTIC // HELIPORTURI & ACCES ROTORCRAFT
                  </span>
                  <ProvenanceBadge
                    status="OFFICIAL_SOURCE"
                    sourceName="AACR / ROMATSA AIP România"
                    sourceUrl="https://www.caa.ro"
                    showSource
                  />
                </div>
                <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-neutral-900 leading-[1.05] font-sans">
                  Heliporturi din România<span className="text-amber-600">.</span>
                </h1>
                <p className="text-lg text-neutral-600 font-light leading-relaxed">
                  Explorați heliporturile civile certificate de AACR, platformele dedicate pentru elicoptere din marile aeroporturi și cerințele reale de aterizare în teren în Transilvania, Brașov, Litoral și Delta Dunării.
                </p>
              </div>

              <Link href="/plan?helicopter=true">
                <Button variant="primary" size="lg" className="whitespace-nowrap px-8 shadow-xl">
                  SOLICITĂ ZBOR CU ELICOPTERUL →
                </Button>
              </Link>
            </div>

            {/* Statutory Integrity Notice */}
            <div className="p-5 rounded-2xl bg-[#fafaf7] border border-neutral-200 text-xs text-neutral-600 leading-relaxed">
              <strong className="text-neutral-900 font-mono block mb-1">
                CONFORMITATE AERONAUTICĂ ȘI TRANSPARENȚA ATERIZĂRII:
              </strong>
              AIR distinge strict între heliporturile civile certificate oficial de Autoritatea Aeronautică Civilă Română (AACR) și amplasamentele neomologate de pe proprietăți private, hoteluri sau domenii viticole. Un elicopter nu poate ateriza pe o proprietate privată fără acordul scris al proprietarului terenului, avizul de mediu (ex: ARBDD în Delta Dunării) și evaluarea tehnică de siguranță a operatorului aerian autorizat (AOC).
            </div>
          </div>
        </Container>
      </section>

      {/* 02 — DIRECTORY & EXPLORER */}
      <section className="w-full py-20 sm:py-28 bg-white">
        <Container size="wide">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="space-y-2">
              <h2 className="text-3xl sm:text-4xl font-light text-neutral-900 font-sans">
                Registru Amplasamente & Heliporturi Verificate
              </h2>
              <p className="text-sm text-neutral-500 font-sans">
                Filtrați după regiune sau verificați dacă o facilitate dispune de certificare oficială AACR sau statut neomologat / PPR.
              </p>
            </div>

            <HeliportExplorer heliports={heliports} isRo={true} />
          </div>
        </Container>
      </section>
    </div>
  );
}
