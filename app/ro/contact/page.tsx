import React from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { ProvenanceBadge } from "@/components/shared/ProvenanceBadge";
import { ContactForm } from "@/components/contact/ContactForm";
import { BRAND } from "@/constants/brand";
import { createRouteMetadata } from "@/lib/seo/metadata";

export const metadata = createRouteMetadata({
  path: "/ro/contact",
  title: "Contact Birou Concierge | AIR by Cristian Văduva",
  description:
    "Canal direct de comunicare pentru zboruri charter private, achiziții de aeronave și consultanță în aviație executivă la București Băneasa (LRBS).",
});

export default function RomanianContactPage() {
  return (
    <div className="w-full bg-white text-neutral-900 font-sans flex-1 flex flex-col">
      {/* 01 — HERO HEADER */}
      <section className="w-full py-20 sm:py-28 border-b border-neutral-200/80 bg-white">
        <Container size="wide">
          <div className="flex flex-col gap-8 max-w-6xl mx-auto">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
              <Link href="/ro" className="hover:text-amber-600 transition">ACASĂ</Link>
              <span>/</span>
              <span className="text-neutral-900 font-bold">CONTACT CONCIERGE</span>
            </div>

            <div className="space-y-4 max-w-3xl">
              <div className="flex items-center gap-3">
                <span className="editorial-tag-dark">
                  BIROU DE CONCIERGE ȘI CONSULTANȚĂ EXECUTIVĂ
                </span>
                <ProvenanceBadge status="OFFICIAL_SOURCE" sourceName="AIR Operațiuni Executive" />
              </div>
              <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-neutral-900 leading-[1.05] font-sans">
                Contact {BRAND.name}<span className="text-amber-600">.</span>
              </h1>
              <p className="text-lg text-neutral-600 font-light leading-relaxed">
                Contactați direct biroul nostru pentru zboruri private la comandă, achiziții și vânzări de aeronave sau acces cu elicopterul în România.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 02 — MAIN CONTACT BODY */}
      <section className="w-full py-20 sm:py-28 bg-[#fafaf7] border-b border-neutral-200/80">
        <Container size="wide">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 sm:gap-16 items-start">
            {/* Left Column: Direct Access Details & Operational Disclosures */}
            <div className="lg:col-span-5 space-y-8">
              <div className="p-8 rounded-3xl bg-neutral-950 text-white shadow-xl border border-neutral-800 space-y-6">
                <div>
                  <span className="text-xs font-mono text-amber-400 font-bold tracking-widest uppercase block mb-1">
                    BAZĂ PRINCIPALĂ & HUB OPERAȚIONAL
                  </span>
                  <h3 className="text-2xl font-light text-white font-sans">
                    București Băneasa (LRBS / BBU)
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono mt-1">
                    Aeroportul Internațional Aurel Vlaicu • Terminal Aviație Generală
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-neutral-800 text-xs font-mono">
                  <div>
                    <span className="text-neutral-400 block uppercase">EMAIL DIRECT CONCIERGE</span>
                    <a
                      href="mailto:contact@cristianvaduva.com"
                      className="text-amber-400 hover:text-amber-300 font-bold text-sm block mt-0.5"
                    >
                      contact@cristianvaduva.com
                    </a>
                  </div>

                  <div>
                    <span className="text-neutral-400 block uppercase">ASISTENȚĂ RAPIDĂ WHATSAPP</span>
                    <a
                      href="https://wa.me/436509536345?text=Buna%20ziua,%20va%20contactez%20de%20pe%20platforma%20AIR%20(fly.cristianvaduva.com)..."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:text-emerald-300 font-bold block mt-0.5"
                    >
                      +43 650 953 6345 (WhatsApp Concierge Direct) ↗
                    </a>
                  </div>

                  <div>
                    <span className="text-neutral-400 block uppercase">ECOSISTEM DE AFACERI</span>
                    <Link
                      href="/ro/ecosystem"
                      className="text-neutral-300 hover:text-amber-400 block mt-0.5"
                    >
                      Imobiliare, Consultanță Credite & Platforme Tehnologice →
                    </Link>
                  </div>

                  <div>
                    <span className="text-neutral-400 block uppercase">DISPONIBILITATE OPERAȚIONALĂ</span>
                    <span className="text-neutral-300 block mt-0.5">
                      Birou de Zbor: 24/7/365 On-Demand
                    </span>
                  </div>
                </div>
              </div>

              {/* Regulatory Role Disclosure */}
              <div className="p-6 rounded-2xl bg-white border border-neutral-200 text-xs text-neutral-600 space-y-2">
                <span className="text-[10px] font-mono text-neutral-500 font-bold tracking-wider uppercase block">
                  ROL COMERCIAL & TRANSPARENȚĂ AERONAUTICĂ
                </span>
                <p className="leading-relaxed">
                  AIR by Cristian Văduva acționează ca birou de concierge în aviația de afaceri, coordonator de cereri charter și consultant pentru achiziții de aeronave. AIR nu este transportator aerian și nu deține certificat de operator aerian (AOC). Toate zborurile cu avion privat sau elicopter sunt operate exclusiv de transportatori aerieni licențiați și certificați conform reglementărilor EASA / FAA Part-CAT.
                </p>
              </div>
            </div>

            {/* Right Column: Interactive Secure Form */}
            <div className="lg:col-span-7 p-8 sm:p-12 rounded-3xl bg-white border border-neutral-200 shadow-xl space-y-6">
              <div>
                <span className="text-xs font-mono text-amber-600 font-bold tracking-widest uppercase block mb-1">
                  TRANSMITERE SECURIZATĂ SOLICITARE
                </span>
                <h2 className="text-3xl font-light text-neutral-900 font-sans">
                  Trimite o Solicitare de Misiune
                </h2>
                <p className="text-xs text-neutral-500 font-sans mt-1">
                  Introduceți parametrii zborului sau cerința de consultanță. Biroul nostru va analiza fezabilitatea tehnică și va coordona oferta cu operatorii licențiați.
                </p>
              </div>

              <ContactForm isRo={true} />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
