import React from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { DataStatusBadge } from "@/components/shared/DataStatusBadge";
import { AviationImage } from "@/components/AviationImage";
import { InsuranceInquiryForm } from "@/components/aviation/InsuranceInquiryForm";
import { createRouteMetadata } from "@/lib/seo/metadata";

export const metadata = createRouteMetadata({
  path: "/ro/aviation/insurance",
  title: "Consultanță Asigurări Aviație & Managementul Riscului Aeronavei",
  description:
    "Ghid de consultanță privind asigurarea CASCO aeronavă (Hull All-Risks), răspunderea civilă legală față de terți (Regulamentul CE 785/2004) și responsabilitatea proprietarului în operarea Part-CAT vs Part-NCC.",
});

export default function RomanianAviationInsurancePage() {
  const topics = [
    {
      title: "ASIGURARE CASCO AERONAVĂ (HULL ALL-RISKS)",
      badge: "VALOARE AGREATĂ // ZBOR, RULARE & SOL",
      desc: "Protecție completă pentru fuzelaj, motoare turboreactoare/turbopropulsoare și avionica de bord în timpul rulajului, zborului și parcării în hangar, pe baza principiului valorii agreate de înlocuire.",
      highlights: ["Înlocuire totală & reparații avarii parțiale", "Acoperire ingestie corpuri străine (FOD)", "Endorsement pentru riscuri de război și asimilate (AVN 52E)"],
    },
    {
      title: "RĂSPUNDERE CIVILĂ FAȚĂ DE TERȚI (TPL)",
      badge: "CONFORMITATE REGULAMENT CE 785/2004",
      desc: "Asigurare legală obligatorie pentru operarea în spațiul aerian EASA pentru daune corporale și materiale aduse terților, calculată strict în funcție de masa maximă la decolare (MTOW).",
      highlights: ["Nivel minim legal indexat în DST (Drepturi Speciale de Tragere)", "Verificare intrare în spațiul aerian", "Extensii teritoriale internaționale"],
    },
    {
      title: "RESPONSABILITATE PROPRIETAR VS. OPERATOR",
      badge: "DELIMITARE PART-NCC VS PART-CAT",
      desc: "Delimitare legală clară între operarea privată a corporației (Part-NCC / Part-NCO) unde răspunderea revine proprietarului, și zborul charter comercial (Part-CAT) asigurat sub polița transportatorului aerian cu AOC.",
      highlights: ["Clauze de renunțare la recurs (waiver of subrogation)", "Endorsement de asigurat adițional", "Clauze specifice pentru contracte de dry-lease"],
    },
    {
      title: "PROTECȚIA ECHIPAJULUI ȘI PASAGERILOR",
      badge: "ACCIDENTE & INDEMNIZAȚII MEDICALE",
      desc: "Polițe de accidente corporale, evacuare medicală de urgență și răspundere pentru bagaje acoperind piloții, echipajul de cabină și oaspeții din zborurile executive.",
      highlights: ["Asigurare pierdere licență pentru piloți", "Bagaje și efecte personale", "Indemnizație cheltuieli de căutare și salvare (SAR)"],
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
              <span className="text-neutral-900 font-bold">ASIGURĂRI AVIAȚIE</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-200 pb-8">
              <div className="space-y-4 max-w-3xl">
                <div className="flex items-center gap-3">
                  <span className="editorial-tag-dark">
                    MANAGEMENTUL RISCULUI // AVIAȚIE EXECUTIVĂ
                  </span>
                  <DataStatusBadge status="OFFICIAL_SOURCE" />
                </div>
                <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-neutral-900 leading-[1.05] font-sans">
                  Consultanță Asigurări Aviație<span className="text-amber-600">.</span>
                </h1>
                <p className="text-lg text-neutral-600 font-light leading-relaxed">
                  Ghidaj specializat pentru acoperirea CASCO a aeronavelor, răspunderea civilă obligatorie față de terți și delimitarea riscurilor operaționale sub normele EASA și legislația europeană.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a href="#inquiry-form">
                  <Button variant="primary" size="lg" className="whitespace-nowrap px-8 shadow-xl">
                    SOLICITĂ CONSULTANȚĂ RISC ↓
                  </Button>
                </a>
              </div>
            </div>

            {/* Visual Hero Feature */}
            <div className="relative h-[360px] sm:h-[480px] w-full rounded-3xl overflow-hidden shadow-2xl border border-neutral-200 bg-neutral-900 group">
              <AviationImage
                src="https://images.unsplash.com/photo-1474302770737-173ee21bab63?auto=format&fit=crop&w=1600&q=85"
                alt="Verificare Risc Casco și Răspundere Aeronavă"
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-1000"
                fallbackTitle="Risc Casco Aeronavă"
                fallbackCode="ASIGURĂRI // CONSULTANȚĂ"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
                <div>
                  <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-widest block mb-1">
                    SUBTERANĂ & HANGARARE // ASIGURĂRI COMPLEXE
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-light font-sans">
                    Protecția Patrimoniului Aeronautic
                  </h3>
                </div>
                <div className="text-right text-xs font-mono text-neutral-300">
                  <span className="block text-amber-400 font-bold">EASA & REG. CE 785/2004</span>
                  <span>EVALUARE STRUCTURATĂ DE RISC</span>
                </div>
              </div>
            </div>

            {/* Statutory Compliance Notice */}
            <div className="p-5 rounded-2xl bg-[#fafaf7] border border-neutral-200 text-xs text-neutral-600 leading-relaxed">
              <strong className="text-neutral-900 font-mono block mb-1">
                AVIZ PRIVIND DISTRIBUȚIA DE ASIGURĂRI & ROLUL PLATFORMEI:
              </strong>
              AIR by Cristian Văduva oferă exclusiv asistență informativă și facilitare de contact între proprietarii de aeronave și brokeri sau subscriitori de asigurare autorizați de ASF / autoritățile competente. AIR nu este broker de asigurare autorizat și nu emite, nu vinde și nu leagă polițe de asigurare direct. Acoperirile, excluderile, limitele despăgubirilor și cotațiile finale sunt stabilite exclusiv de companiile de asigurare autorizate.
            </div>
          </div>
        </Container>
      </section>

      {/* 02 — PILLARS OF AVIATION RISK */}
      <section className="w-full py-20 sm:py-28 bg-[#fafaf7] border-b border-neutral-200/80">
        <Container size="wide">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="space-y-2">
              <span className="editorial-tag-dark">
                STRUCTURĂ ACOPERIRE // PILONI DE SUBIECT
              </span>
              <h2 className="text-3xl sm:text-4xl font-light text-neutral-900 font-sans">
                Elemente Cheie ale Polițelor de Aviație
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {topics.map((t) => (
                <div
                  key={t.title}
                  className="p-8 rounded-3xl bg-white border border-neutral-200 shadow-sm space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono text-amber-600 font-bold tracking-widest uppercase block">
                      {t.badge}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-light text-neutral-900 font-sans">
                      {t.title}
                    </h3>
                    <p className="text-sm text-neutral-600 font-sans leading-relaxed">
                      {t.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-neutral-100">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block mb-2 font-bold">
                      ASPECTE PRINCIPALE:
                    </span>
                    <ul className="space-y-1 text-xs text-neutral-700 font-sans">
                      {t.highlights.map((h, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="text-amber-500 font-bold">•</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 03 — INQUIRY FORM SECTION */}
      <section id="inquiry-form" className="w-full py-20 sm:py-28 bg-white">
        <Container size="wide">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center space-y-3">
              <span className="editorial-tag-dark">
                SOLICITARE ASIGURARE // DIALOG CU UN SPECIALIST
              </span>
              <h2 className="text-3xl sm:text-4xl font-light text-neutral-900 font-sans">
                Transmite Parametrii Aeronavei
              </h2>
              <p className="text-sm text-neutral-600 font-sans max-w-xl mx-auto">
                Completați datele de mai jos pentru a iniția o discuție tehnică cu privire la acoperirea CASCO și de răspundere civilă pentru aeronava dumneavoastră.
              </p>
            </div>

            <div className="p-8 sm:p-12 rounded-3xl bg-[#fafaf7] border border-neutral-200 shadow-xl">
              <InsuranceInquiryForm isRo={true} />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
