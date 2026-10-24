import React from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { FlightSearchForm } from "@/components/home/FlightSearchForm";
import { ProvenanceBadge } from "@/components/shared/ProvenanceBadge";
import { Button } from "@/components/ui/Button";
import { AviationImage } from "@/components/AviationImage";
import { EcosystemSection } from "@/components/home/EcosystemSection";
import { createRouteMetadata } from "@/lib/seo/metadata";

export const metadata = createRouteMetadata({
  path: "/ro",
  title: "AIR by Cristian Văduva — Charter Avion Privat București & Aviație Executivă",
  description:
    "Închiriere avioane private și elicoptere în București Băneasa (LRBS). Rute executive directe București–Nisa, Paris, Londra, Geneva, director heliporturi și consultanță dedicată.",
});

const ROMANIAN_PRIORITY_ROUTES = [
  {
    title: "București – Nisa",
    slug: "bucharest-to-nice",
    duration: "2h 25m",
    distance: "980 NM",
    aircraft: "Phenom 300E / Pilatus PC-24",
    fbo: "Băneasa (LRBS) → Nice Côte d'Azur (LFMN)",
    highlight: "Conexiune directă cu elicopterul către Monaco în 7 minute.",
  },
  {
    title: "București – Paris",
    slug: "bucharest-to-paris",
    duration: "2h 55m",
    distance: "1,010 NM",
    aircraft: "Light & Super Midsize Jets",
    fbo: "Băneasa (LRBS) → Le Bourget (LFPB)",
    highlight: "Sosire pe aeroportul dedicat exclusiv aviației de afaceri.",
  },
  {
    title: "București – Londra",
    slug: "bucharest-to-london",
    duration: "3h 15m",
    distance: "1,140 NM",
    aircraft: "Citation CJ4 / Challenger 350",
    fbo: "Băneasa (LRBS) → Farnborough (EGLF)",
    highlight: "Terminal dedicat exclusiv zborurilor private cu control vamal rapid.",
  },
  {
    title: "București – Geneva",
    slug: "bucharest-to-geneva",
    duration: "2h 35m",
    distance: "890 NM",
    aircraft: "Phenom 300E / Praetor 600",
    fbo: "Băneasa (LRBS) → Geneva Cointrin (LSGG)",
    highlight: "Acces direct la centrul financiar elvețian și văile alpine.",
  },
  {
    title: "București – Viena",
    slug: "bucharest-to-vienna",
    duration: "1h 35m",
    distance: "570 NM",
    aircraft: "Very Light & Light Jets",
    fbo: "Băneasa (LRBS) → Viena Schwechat (LOWW VIP)",
    highlight: "Zbor regional rapid pentru întâlniri de afaceri în aceeași zi.",
  },
  {
    title: "București – Dubai",
    slug: "bucharest-to-dubai",
    duration: "4h 50m",
    distance: "1,850 NM",
    aircraft: "Super Midsize & Large Cabin Jets",
    fbo: "Băneasa (LRBS) → Al Maktoum Executive (OMDW)",
    highlight: "Zbor intercontinental direct non-stop la viteză de croazieră Mach 0.85.",
  },
];

export default function RomanianHomePage() {
  return (
    <div className="w-full bg-white text-neutral-900 font-sans flex-1 flex flex-col">
      {/* 01 — HERO SECTION */}
      <section className="relative w-full py-24 sm:py-36 bg-neutral-950 text-white overflow-hidden border-b border-neutral-800">
        <div className="absolute inset-0 z-0 opacity-30">
          <AviationImage
            src="/images/hero/hero-jet-desktop.webp"
            alt="Avion privat pe platforma București Băneasa"
            fill
            priority
            quality={80}
            sizes="(max-width: 768px) 100vw, 100vw"
            className="object-cover"
            fallbackTitle="AIR by Cristian Văduva"
            fallbackCode="AVIAȚIE EXECUTIVĂ ROMÂNIA"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-950/40 z-0" />

        <Container size="wide">
          <div className="relative z-10 max-w-4xl space-y-8">
            <div className="flex items-center gap-3">
              <span className="editorial-tag-dark bg-amber-500/20 text-amber-400 border border-amber-500/30">
                AVIAȚIE EXECUTIVĂ // BUCUREȘTI BĂNEASA (LRBS)
              </span>
              <ProvenanceBadge status="OFFICIAL_SOURCE" sourceName="AIR Operațiuni Românești" />
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-white leading-[1.05] font-sans">
              Cea Mai Eficientă Modalitate de a Zbura<span className="text-amber-400">.</span>
            </h1>

            <p className="text-lg sm:text-xl text-neutral-300 font-light leading-relaxed max-w-2xl">
              Charter avion privat la comandă, închiriere elicoptere și consultanță aeronautică specializată. Plecări rapide din terminalul dedicat București Băneasa Aurel Vlaicu, fără aglomerație comercială.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/plan">
                <Button variant="primary" size="lg" className="px-8 py-4 text-sm font-bold shadow-2xl">
                  SOLICITĂ OFERTĂ ZBOR PRIVAT →
                </Button>
              </Link>
              <Link href="/ro/heliports">
                <Button variant="outline" size="lg" className="px-8 py-4 text-sm border-white/20 text-white hover:bg-white/10">
                  GHID HELIPORTURI ROMÂNIA
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* 02 — FLIGHT PLANNER STRIP */}
      <section className="relative z-20 -mt-10 sm:-mt-14 w-full">
        <Container size="wide">
          <div className="max-w-5xl mx-auto shadow-2xl rounded-3xl overflow-hidden border border-neutral-200">
            <FlightSearchForm />
          </div>
        </Container>
      </section>

      {/* 03 — RUTE PRIORITARE DIN BUCUREȘTI */}
      <section className="w-full py-24 sm:py-32 bg-white border-b border-neutral-200/80">
        <Container size="wide">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-200 pb-8">
              <div className="space-y-3 max-w-3xl">
                <span className="editorial-tag-dark">
                  DESTINAȚII EUROPENE // PLECARE BĂNEASA (LRBS)
                </span>
                <h2 className="text-3xl sm:text-5xl font-light text-neutral-900 font-sans">
                  Rute Executive Frecvente
                </h2>
                <p className="text-base text-neutral-600 font-light leading-relaxed">
                  Conexiuni directe non-stop din București către marile centre financiare și destinații de lux din Europa și Orientul Mijlociu.
                </p>
              </div>

              <Link href="/routes">
                <Button variant="outline" size="sm" className="whitespace-nowrap">
                  VEZI TOATE RUTELE →
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ROMANIAN_PRIORITY_ROUTES.map((route) => (
                <div
                  key={route.slug}
                  className="p-6 rounded-3xl bg-[#fafaf7] border border-neutral-200 hover:border-amber-400/80 transition-all duration-200 shadow-sm space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-amber-600 font-bold uppercase tracking-wider">
                        {route.distance} • ESTIMARE {route.duration}
                      </span>
                      <span className="text-[9px] font-mono text-neutral-400 bg-neutral-200/60 px-2 py-0.5 rounded">
                        AIRBORNE
                      </span>
                    </div>

                    <h3 className="text-xl font-light text-neutral-900 font-sans">
                      {route.title}
                    </h3>

                    <p className="text-xs font-mono text-neutral-500">
                      {route.fbo}
                    </p>

                    <p className="text-xs text-neutral-600 font-sans leading-relaxed">
                      {route.highlight}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-neutral-200/80 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-neutral-400">
                      {route.aircraft}
                    </span>
                    <Link
                      href={`/ro/routes/${route.slug}`}
                      className="text-xs font-mono text-amber-600 hover:text-amber-700 font-bold"
                    >
                      DOSAR RUTĂ →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 04 — BĂNEASA VS OTOPENI PENTRU AVION PRIVAT */}
      <section className="w-full py-24 sm:py-32 bg-[#fafaf7] border-b border-neutral-200/80">
        <Container size="wide">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 sm:gap-16 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="editorial-tag-dark">
                ANALIZĂ AEROPORTUARĂ // BĂNEASA SAU OTOPENI
              </span>
              <h2 className="text-3xl sm:text-5xl font-light text-neutral-900 font-sans leading-tight">
                De Ce Băneasa (LRBS) Este Alegerea Executivă
              </h2>
              <p className="text-base text-neutral-600 font-light leading-relaxed">
                Pentru zborurile private din București, Aeroportul Băneasa Aurel Vlaicu oferă avantaje logistice de neegalat față de Aeroportul Otopeni (LROP):
              </p>

              <div className="space-y-4 pt-2">
                <div className="p-4 rounded-2xl bg-white border border-neutral-200 space-y-1">
                  <span className="text-xs font-mono text-amber-600 font-bold uppercase block">
                    ÎMBARCARE ÎN 20 DE MINUTE
                  </span>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Sosiți la terminalul VIP cu doar 15-20 de minute înainte de plecare. Fără cozi de check-in, securitate dedicată și acces direct cu limuzina la scara avionului.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-neutral-200 space-y-1">
                  <span className="text-xs font-mono text-amber-600 font-bold uppercase block">
                    PROXIMITATE DE ZONA DE BUSINESS
                  </span>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    La doar 8.5 km de polul corporativ Floreasca – Pipera, evitând traficul intens de pe DN1 spre Otopeni.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-neutral-200 space-y-1">
                  <span className="text-xs font-mono text-amber-600 font-bold uppercase block">
                    PISTĂ DE 3.103 METRI & HANDLING DEDICAT
                  </span>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Infrastructură modernizată capabilă să primească orice clasă de avion privat, de la Light Jets la aeronave transcontinentale de mare capacitate.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link href="/baneasa">
                  <Button variant="primary" size="md">
                    DETALII COMPLETE AEROPORT BĂNEASA →
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 relative h-[420px] sm:h-[520px] rounded-3xl overflow-hidden shadow-2xl border border-neutral-200 bg-neutral-900">
              <AviationImage
                src="https://images.unsplash.com/photo-1520690214124-2405c5217036?auto=format&fit=crop&w=1200&q=85"
                alt="Terminalul Aurel Vlaicu București Băneasa"
                fill
                className="object-cover"
                fallbackTitle="Aeroportul Băneasa LRBS"
                fallbackCode="TERMINAL VIP // LRBS"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-white text-xs font-mono space-y-1">
                <span className="text-amber-400 font-bold uppercase block">LRBS / BBU // AUREL VLAICU</span>
                <span className="font-sans text-sm font-light text-white block">
                  Terminalul istoric modernizat dedicat exclusiv aviației de afaceri.
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 05 — HELIPORTURI & ACCES ROTORCRAFT */}
      <section className="w-full py-24 sm:py-32 bg-white border-b border-neutral-200/80">
        <Container size="wide">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-200 pb-8">
              <div className="space-y-3 max-w-3xl">
                <span className="editorial-tag-dark">
                  ZBORURI CU ELICOPTERUL // TRANSILVANIA & DELTĂ
                </span>
                <h2 className="text-3xl sm:text-5xl font-light text-neutral-900 font-sans">
                  Charter Elicopter & Acces Rotorcraft
                </h2>
                <p className="text-base text-neutral-600 font-light leading-relaxed">
                  Conexiuni rapide din București către Brașov, castelele din Transilvania, complexurile din Delta Dunării sau proprietăți private cu aprobare tehnică.
                </p>
              </div>

              <Link href="/ro/heliports">
                <Button variant="primary" size="md">
                  DIRECTORUL DE HELIPORTURI →
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-3xl bg-[#fafaf7] border border-neutral-200 space-y-3">
                <span className="text-xs font-mono text-amber-600 font-bold uppercase block">
                  CHARTER ELICOPTER BRAȘOV
                </span>
                <h3 className="text-xl font-light font-sans text-neutral-900">
                  București – Brașov în 45 Min
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Evitați traficul de pe Valea Prahovei cu aterizare directă la Aeroportul Internațional Brașov-Ghimbav (LROV) sau helipaduri private autorizate.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-[#fafaf7] border border-neutral-200 space-y-3">
                <span className="text-xs font-mono text-amber-600 font-bold uppercase block">
                  ELICOPTER SPRE DELTA DUNĂRII
                </span>
                <h3 className="text-xl font-light font-sans text-neutral-900">
                  Acces Rapid în Rezervație
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Zboruri directe către Crișan, Sulina sau Sfântu Gheorghe operate cu aviz de mediu ARBDD și evaluare a terenului de aterizare.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-[#fafaf7] border border-neutral-200 space-y-3">
                <span className="text-xs font-mono text-amber-600 font-bold uppercase block">
                  LITORAL & MAREA NEAGRĂ
                </span>
                <h3 className="text-xl font-light font-sans text-neutral-900">
                  Heliportul Tuzla (LRTZ) & Mamaia
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Heliport civil certificat H24 cu proceduri instrumentale și conexiune directă către complexurile de pe litoralul românesc.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 06 — CONSULTANȚĂ ȘI MANAGEMENTUL PROPRIETĂȚII */}
      <section className="w-full py-20 sm:py-28 bg-[#fafaf7] border-b border-neutral-200/80">
        <Container size="wide">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-neutral-200 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-[10px] font-mono text-amber-600 font-bold uppercase tracking-widest block">
                  SIMULATOR FINANCIAR
                </span>
                <h3 className="text-2xl font-light text-neutral-900 font-sans">
                  Economia Proprietății Aeronavei
                </h3>
                <p className="text-sm text-neutral-600 font-sans leading-relaxed">
                  Aflați numărul optim de ore de zbor anual pentru a decide între charter la cerere, card de ore, proprietate fracționată sau achiziția unui avion privat.
                </p>
              </div>

              <div className="pt-4">
                <Link href="/ro/aircraft/ownership">
                  <Button variant="outline" size="md" className="w-full">
                    CALCULATOR PROPRIETATE AERONAVĂ →
                  </Button>
                </Link>
              </div>
            </div>

            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-neutral-200 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-[10px] font-mono text-amber-600 font-bold uppercase tracking-widest block">
                  MANAGEMENTUL RISCULUI
                </span>
                <h3 className="text-2xl font-light text-neutral-900 font-sans">
                  Consultanță Asigurări Aviație
                </h3>
                <p className="text-sm text-neutral-600 font-sans leading-relaxed">
                  Ghidaj specializat privind acoperirea CASCO (Hull All-Risks), răspunderea civilă față de terți conform Regulamentului CE 785/2004 și delimitarea Part-CAT vs Part-NCC.
                </p>
              </div>

              <div className="pt-4">
                <Link href="/ro/aviation/insurance">
                  <Button variant="outline" size="md" className="w-full">
                    CONSULTANȚĂ ASIGURĂRI AVIAȚIE →
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 07 — EXPLOREAZĂ ECOSISTEMUL CRISTIAN VĂDUVA */}
      <EcosystemSection isRo={true} />

      {/* 08 — CONTACT & CONCIERGE CALLOUT */}
      <section className="w-full py-20 bg-neutral-950 text-white">
        <Container size="wide">
          <div className="max-w-6xl mx-auto rounded-3xl border border-amber-500/30 bg-gradient-to-b from-neutral-900 to-black p-10 sm:p-14 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest block">
                BIROU CONCIERGE DEDICAT // 24/7/365
              </span>
              <h3 className="text-3xl sm:text-4xl font-light text-white font-sans">
                Vorbiți Direct cu un Consultant Aeronautic
              </h3>
              <p className="text-sm text-neutral-300 font-sans leading-relaxed">
                Echipa noastră de asistență vă stă la dispoziție pentru organizarea zborurilor charter, evaluarea fezabilității tehnice și oferte personalizate.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/ro/contact">
                <Button variant="primary" size="lg" className="whitespace-nowrap px-8 py-4 text-sm shadow-2xl">
                  CONTACTEAZĂ BIROUL CONCIERGE →
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
