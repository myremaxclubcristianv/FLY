import React from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { DataStatusBadge } from "@/components/shared/DataStatusBadge";
import { Button } from "@/components/ui/Button";
import { AviationImage } from "@/components/AviationImage";
import { OwnershipDecisionCalculator } from "@/components/aircraft/OwnershipDecisionCalculator";
import { createRouteMetadata } from "@/lib/seo/metadata";

export const metadata = createRouteMetadata({
  path: "/ro/aircraft/ownership",
  title: "Ghid Decizional Proprietate & Acces Aeronave | Charter vs Fracționat vs Achiziție",
  description:
    "Comparați charterul la cerere, cardul de ore, proprietatea fracționată, leasingul gestionat și achiziția integrală a aeronavei în funcție de orele anuale de zbor.",
});

export default function RomanianAircraftOwnershipPage() {
  const models = [
    {
      title: "CHARTER LA CERERE (ON-DEMAND)",
      hours: "< 50 ORE / AN",
      commitment: "ZERO CAPITAL IMOBILIZAT",
      summary: "Ideal pentru nevoi flexibile și ocazionale de zbor, fără riscul devalorizării activului sau costuri lunare fixe de hangarare și echipaj.",
      bestFor: "Misiuni punctuale, călătorii corporative ocazionale, vacanțe sezoniere.",
      link: "/plan",
      cta: "PLANIFICĂ ZBOR →",
    },
    {
      title: "JET CARD / BLOC DE ORE",
      hours: "50 - 99 ORE / AN",
      commitment: "CARDURI PRE-FINANȚATE 25-50 ORE",
      summary: "Disponibilitate garantată a aeronavei cu tarif orar fix și zero expunere la costuri neprevăzute de mentenanță.",
      bestFor: "Lideri executivi și companii ce necesită timp de apel scurt și tarife predictibile.",
      link: "/plan",
      cta: "EXPLOREAZĂ ACCESUL →",
    },
    {
      title: "PROPRIETATE FRACȚIONATĂ",
      hours: "100 - 174 ORE / AN",
      commitment: "COTĂ-PARTE FRACȚIONATĂ (1/8 SAU 1/4)",
      summary: "Achiziția unei cote structurate din aeronavă oferă familiaritatea aceleiași cabine și amortizare fiscală, împărțind costurile fixe.",
      bestFor: "Oameni de afaceri cu zboruri frecvente în Europa care nu doresc imobilizarea capitalului pentru o aeronavă întreagă.",
      link: "/ro/contact?service=Corporate",
      cta: "CONSULTANȚĂ FRACȚIONATĂ →",
    },
    {
      title: "LEASING GESTIONAT / ACMI",
      hours: "175 - 249 ORE / AN",
      commitment: "CONTRACT DRY/WET LEASE & CAMO",
      summary: "Acces dedicat la o aeronavă sub management complet Part-NCC / Part-CAT, orele excedentare putând fi închiriate în piața de charter.",
      bestFor: "Corporații mari și departamente de zbor cu rute regulate între hub-urile europene.",
      link: "/ro/contact?service=Corporate",
      cta: "EXPLOREAZĂ LEASING →",
    },
    {
      title: "ACHIZIȚIE INTEGRALĂ AERONAVĂ",
      hours: "250+ ORE / AN",
      commitment: "ACHIZIȚIE CAPITAL INTEGRAL",
      summary: "Suveranitate operațională deplină, amenajare personalizată a cabinei și disponibilitate 100% dedicată nevoilor companiei.",
      bestFor: "Companii multinaționale și birouri de familie cu utilizare intensivă pe distanțe continentale și intercontinentale.",
      link: "/ro/contact?service=Aircraft",
      cta: "CONSULTANȚĂ ACHIZIȚIE →",
    },
  ];

  return (
    <div className="w-full bg-white text-neutral-900 font-sans flex-1 flex flex-col">
      {/* 01 — HERO HEADER */}
      <section className="w-full py-20 sm:py-28 border-b border-neutral-200/80 bg-white">
        <Container size="wide">
          <div className="flex flex-col gap-10 max-w-6xl mx-auto">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
              <Link href="/ro" className="hover:text-amber-600 transition">ACASĂ</Link>
              <span>/</span>
              <span className="text-neutral-900 font-bold">ECONOMIA PROPRIETĂȚII AERONAVELOR</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-200 pb-8">
              <div className="space-y-4 max-w-3xl">
                <div className="flex items-center gap-3">
                  <span className="editorial-tag-dark">
                    MATRICE DECIZIE // ECONOMIA AVIAȚIEI
                  </span>
                  <DataStatusBadge status="AIR_CALCULATED" />
                </div>
                <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-neutral-900 leading-[1.05] font-sans">
                  Economia Accesului la Aeronavă<span className="text-amber-600">.</span>
                </h1>
                <p className="text-lg text-neutral-600 font-light leading-relaxed">
                  Stabiliți dacă profilul dumneavoastră anual de zbor justifică zborul charter ocazional, un card de ore, proprietatea fracționată sau achiziția unui avion privat complet.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a href="#calculator">
                  <Button variant="primary" size="lg" className="whitespace-nowrap px-8 shadow-xl">
                    CALCULATOR DECIZIONAL ↓
                  </Button>
                </a>
              </div>
            </div>

            {/* Visual Hero Feature */}
            <div className="relative h-[360px] sm:h-[480px] w-full rounded-3xl overflow-hidden shadow-2xl border border-neutral-200 bg-neutral-900 group">
              <AviationImage
                src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1600&q=85"
                alt="Flotă Avioane Executive Private"
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-1000"
                fallbackTitle="Proprietate Aeronavă"
                fallbackCode="ECONOMIE // DECIZIE"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
                <div>
                  <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-widest block mb-1">
                    PRAGURI UTILIZARE ANUALĂ // INTERVALE FĂRĂ GOLURI
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-light font-sans">
                    5 Trepte de Acces la Flotă
                  </h3>
                </div>
                <div className="text-right text-xs font-mono text-neutral-300">
                  <span className="block text-amber-400 font-bold">0 LA 350+ ORE / AN</span>
                  <span>MODELE CU CAPITALIZARE TRANSPARENTĂ</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 02 — THE 5 STRUCTURAL MODELS */}
      <section className="w-full py-20 sm:py-28 bg-[#fafaf7] border-b border-neutral-200/80">
        <Container size="wide">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="space-y-2">
              <span className="editorial-tag-dark">
                STRUCTURĂ CAPITAL & ORE // MODELE DE FINANȚARE
              </span>
              <h2 className="text-3xl sm:text-4xl font-light text-neutral-900 font-sans">
                Treptele de Acces în Aviația de Afaceri
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {models.map((m) => (
                <div
                  key={m.title}
                  className="p-6 rounded-3xl bg-white border border-neutral-200 shadow-sm space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono text-amber-600 font-bold tracking-widest uppercase block">
                      {m.hours}
                    </span>
                    <h3 className="text-xl font-light text-neutral-900 font-sans">
                      {m.title}
                    </h3>
                    <span className="text-xs font-mono text-neutral-500 block">
                      {m.commitment}
                    </span>
                    <p className="text-xs text-neutral-600 font-sans leading-relaxed">
                      {m.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-neutral-100 space-y-3">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block font-bold">
                      IDEAL PENTRU:
                    </span>
                    <p className="text-xs text-neutral-800 font-sans font-medium">
                      {m.bestFor}
                    </p>
                    <Link href={m.link} className="block pt-1">
                      <Button variant="outline" size="sm" className="w-full text-xs">
                        {m.cta}
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 03 — INTERACTIVE DECISION CALCULATOR */}
      <section id="calculator" className="w-full py-20 sm:py-28 bg-white">
        <Container size="wide">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="space-y-2 text-center">
              <span className="editorial-tag-dark">
                ALGORITM DE CALCUL // SIMULARE FINANCIARĂ
              </span>
              <h2 className="text-3xl sm:text-4xl font-light text-neutral-900 font-sans">
                Simulatorul Decizional de Acces la Flotă
              </h2>
              <p className="text-sm text-neutral-600 font-sans max-w-xl mx-auto">
                Ajustați numărul de ore anuale și categoria aeronavei pentru a vizualiza recomandarea optimă și defalcarea estimativă a costurilor.
              </p>
            </div>

            <OwnershipDecisionCalculator isRo={true} />
          </div>
        </Container>
      </section>
    </div>
  );
}
