import React from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { ProvenanceBadge } from "@/components/shared/ProvenanceBadge";
import {
  ECOSYSTEM_PROJECTS,
  ECOSYSTEM_CATEGORIES,
  ECOSYSTEM_CONTACT,
  EcosystemProject,
} from "@/data/real/ecosystem";
import { createRouteMetadata } from "@/lib/seo/metadata";

export const metadata = createRouteMetadata({
  path: "/ro/ecosystem",
  title: "Explorează Ecosistemul de Afaceri | Rețeaua Cristian Văduva",
  description:
    "Dincolo de aviație, descoperiți un ecosistem integrat ce reunește imobiliare de lux, protecție patrimonială, consultanță credite, construcții, tehnologie și granturi europene.",
});

export default function RoEcosystemPage() {
  return (
    <div className="w-full bg-[#fbfbfa] text-neutral-900 font-sans flex-1 flex flex-col">
      {/* 01 — HERO HEADER */}
      <section className="w-full py-20 sm:py-28 border-b border-neutral-200/80 bg-white">
        <Container size="wide">
          <div className="flex flex-col gap-8 max-w-6xl mx-auto">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
              <Link href="/ro" className="hover:text-amber-600 transition">
                AIR ROMÂNIA
              </Link>
              <span>/</span>
              <span className="text-neutral-900 font-bold">DIRECTOR ECOSISTEM</span>
            </div>

            <div className="space-y-4 max-w-3xl">
              <div className="flex flex-wrap items-center gap-3">
                <span className="editorial-tag-dark">
                  ECOSISTEM DE AFACERI & DIRECTORIUL INTEGRAT
                </span>
                <ProvenanceBadge status="OFFICIAL_SOURCE" sourceName="Rețeaua Cristian Văduva" />
              </div>

              <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-neutral-900 leading-[1.05] font-sans">
                Explorează Ecosistemul<span className="text-amber-600">.</span>
              </h1>

              <p className="text-lg text-neutral-600 font-light leading-relaxed">
                Dincolo de aviație, descoperiți un ecosistem conectat ce reunește imobiliare de lux, protecție patrimonială, consultanță financiară, construcții, tehnologie și oportunități internaționale.
              </p>
            </div>

            {/* Core Principle Notice */}
            <div className="p-6 rounded-2xl bg-neutral-900 text-white max-w-4xl space-y-2 border border-neutral-800">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold uppercase">
                <span>✦</span>
                <span>AIR AVIAȚIE PRIVATĂ CA POARTĂ CENTRALĂ DE ACCES</span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                AIR by Cristian Văduva reprezintă pilonul de aviație privată pentru identificarea zborurilor charter, handling VIP la Băneasa și consultanță pentru aeronave. Fiecare divizie din ecosistem operează cu autorizații distincte, independență profesională și canale dedicate de deservire a clienților.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 02 — DIRECTORY BY CATEGORY */}
      <section className="w-full py-20 sm:py-28">
        <Container size="wide">
          <div className="max-w-6xl mx-auto space-y-20">
            {ECOSYSTEM_CATEGORIES.map((category) => {
              const projects = ECOSYSTEM_PROJECTS.filter((p) => p.category === category.id);
              if (projects.length === 0) return null;

              return (
                <div key={category.id} className="space-y-8 content-auto">
                  {/* Category Header */}
                  <div className="border-b border-neutral-200/90 pb-4">
                    <span className="text-[10px] font-mono text-amber-600 font-bold uppercase tracking-wider block">
                      SECTOR // {category.id.toUpperCase()}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-light text-neutral-900 font-sans mt-1">
                      {category.labelRo}
                    </h2>
                    <p className="text-xs sm:text-sm text-neutral-500 font-sans mt-1">
                      {category.descriptionRo}
                    </p>
                  </div>

                  {/* Category Projects Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {projects.map((project: EcosystemProject) => {
                      const isHero = project.isPrimary;
                      return (
                        <div
                          key={project.id}
                          className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-200 ${
                            isHero
                              ? "bg-neutral-950 text-white border border-amber-500/50 shadow-xl"
                              : "bg-white text-neutral-900 border border-neutral-200/90 hover:border-amber-500/60 shadow-sm"
                          }`}
                        >
                          <div className="space-y-4">
                            <div className="flex items-center justify-between gap-3">
                              <span
                                className={`text-[10px] font-mono uppercase tracking-wider font-bold ${
                                  isHero ? "text-amber-400" : "text-amber-700"
                                }`}
                              >
                                {project.categoryLabelRo}
                              </span>
                              <span
                                className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-bold ${
                                  isHero
                                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                                    : "bg-emerald-500/10 text-emerald-700 border border-emerald-500/30"
                                }`}
                              >
                                {isHero ? "PRODUS PRINCIPAL" : "VERIFICAT"}
                              </span>
                            </div>

                            <div>
                              <h3
                                className={`text-2xl font-light font-sans tracking-tight ${
                                  isHero ? "text-white" : "text-neutral-900"
                                }`}
                              >
                                {project.name}
                              </h3>
                              <p
                                className={`text-xs font-mono mt-1 ${
                                  isHero ? "text-neutral-400" : "text-neutral-500"
                                }`}
                              >
                                {project.taglineRo}
                              </p>
                            </div>

                            <p
                              className={`text-xs font-sans leading-relaxed ${
                                isHero ? "text-neutral-300" : "text-neutral-600"
                              }`}
                            >
                              {project.descriptionRo}
                            </p>

                            {project.metricsOrHighlight && (
                              <div
                                className={`pt-2 text-[11px] font-mono border-t ${
                                  isHero
                                    ? "border-neutral-800 text-neutral-300"
                                    : "border-neutral-100 text-neutral-500"
                                }`}
                              >
                                {project.metricsOrHighlightRo}
                              </div>
                            )}

                            {project.disclaimerRo && (
                              <p className="text-[10px] font-sans text-neutral-400 leading-snug pt-1 italic">
                                {project.disclaimerRo}
                              </p>
                            )}
                          </div>

                          <div className="pt-6 mt-6 border-t border-neutral-100/60 dark:border-neutral-800 flex items-center justify-between">
                            <span
                              className={`text-[10px] font-mono truncate max-w-[170px] ${
                                isHero ? "text-neutral-400" : "text-neutral-400"
                              }`}
                            >
                              {project.url.replace(/^https?:\/\//, "")}
                            </span>

                            {project.url.startsWith("https://fly.cristianvaduva.com") ? (
                              <Link
                                href="/ro/plan"
                                className={`text-xs font-mono font-bold inline-flex items-center gap-1.5 transition ${
                                  isHero
                                    ? "text-amber-400 hover:text-amber-300"
                                    : "text-amber-600 hover:text-amber-700"
                                }`}
                              >
                                <span>{project.ctaTextRo}</span>
                                <span>→</span>
                              </Link>
                            ) : (
                              <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`text-xs font-mono font-bold inline-flex items-center gap-1.5 transition ${
                                  isHero
                                    ? "text-amber-400 hover:text-amber-300"
                                    : "text-amber-600 hover:text-amber-700"
                                }`}
                                aria-label={`${project.name} (${project.ctaTextRo})`}
                              >
                                <span>{project.ctaTextRo}</span>
                                <span aria-hidden="true">↗</span>
                              </a>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 03 — VERIFIED CONTACT CHANNELS & SOCIAL ECOSYSTEM */}
      <section className="w-full py-20 sm:py-28 bg-white border-t border-neutral-200/80">
        <Container size="wide">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 sm:gap-16 items-start">
            <div className="lg:col-span-5 space-y-6">
              <span className="editorial-tag-dark">CANALE OFICIALE DE CONTACT</span>
              <h2 className="text-3xl sm:text-5xl font-light text-neutral-900 font-sans">
                Contactează Direct Brandul Central
              </h2>
              <p className="text-sm text-neutral-600 font-sans leading-relaxed">
                Contactați-ne pentru organizarea zborurilor private, investiții imobiliare internaționale, consultanță credite sau colaborări corporative în cadrul ecosistemului Cristian Văduva.
              </p>

              <div className="p-6 rounded-2xl bg-[#fafaf7] border border-neutral-200 space-y-3 text-xs font-mono">
                <div>
                  <span className="text-neutral-500 uppercase block">EMAIL CENTRAL</span>
                  <a
                    href={`mailto:${ECOSYSTEM_CONTACT.email}`}
                    className="text-amber-600 hover:text-amber-700 font-bold text-sm"
                  >
                    {ECOSYSTEM_CONTACT.email}
                  </a>
                </div>

                <div>
                  <span className="text-neutral-500 uppercase block">WHATSAPP ASISTENȚĂ RAPIDĂ</span>
                  <a
                    href={ECOSYSTEM_CONTACT.whatsappUrlRo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-700 hover:text-emerald-800 font-bold text-sm flex items-center gap-1.5"
                  >
                    <span>{ECOSYSTEM_CONTACT.phoneInternational} (WhatsApp Direct)</span>
                    <span>↗</span>
                  </a>
                </div>

                <div>
                  <span className="text-neutral-500 uppercase block">SEDIU CENTRAL</span>
                  <span className="text-neutral-800 font-bold">{ECOSYSTEM_CONTACT.location}</span>
                </div>

                <div>
                  <span className="text-neutral-500 uppercase block">LINKTREE OFICIAL</span>
                  <a
                    href={ECOSYSTEM_CONTACT.linktree}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-900 hover:underline font-bold"
                  >
                    linktr.ee/cristianvaduvarealestate ↗
                  </a>
                </div>
              </div>
            </div>

            {/* Social Grid */}
            <div className="lg:col-span-7 space-y-6">
              <span className="editorial-tag-dark">PROFILURI SOCIAL MEDIA VERIFICATE</span>
              <h3 className="text-2xl font-light text-neutral-900 font-sans">
                Canale Publice Oficiale
              </h3>
              <p className="text-xs text-neutral-500 font-sans">
                Toate profilurile de mai jos sunt verificate și corespund platformei oficiale cristianvaduva.com.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ECOSYSTEM_CONTACT.socials.map((soc) => (
                  <a
                    key={soc.platform}
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-5 rounded-2xl bg-[#fafaf7] hover:bg-neutral-100 border border-neutral-200 hover:border-amber-400/80 transition-all duration-150 flex items-center justify-between group"
                  >
                    <div className="space-y-1">
                      <span className="text-xs font-mono text-amber-600 font-bold uppercase block">
                        {soc.platform}
                      </span>
                      <span className="text-sm font-sans text-neutral-900 group-hover:text-black">
                        {soc.handle}
                      </span>
                    </div>
                    <span className="text-neutral-400 group-hover:text-amber-600 font-mono text-sm transition">
                      ↗
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 04 — REGULATORY ROLES & NON-CARRIER TRANSPARENCY */}
      <section className="w-full py-16 bg-neutral-950 text-white">
        <Container size="wide">
          <div className="max-w-4xl mx-auto space-y-4 text-center">
            <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-widest block">
              TRANSPARENȚĂ OPERAȚIONALĂ ȘI REGLEMENTARE
            </span>
            <p className="text-xs text-neutral-400 leading-relaxed font-sans">
              AIR by Cristian Văduva (fly.cristianvaduva.com) este un serviciu de concierge aeronautic, coordonare charter și analiză comparativă a flotei. AIR nu este transportator aerian, nu operează zboruri și nu deține certificat de operator aerian (AOC). Toate zborurile sunt efectuate exclusiv de companii aeriene licențiate cu AOC valid. Consultanța în asigurări este furnizată independent prin parteneriat autorizat cu Generali România; consultanța de credite este realizată independent prin CV Finance. Fiecare entitate respectă cerințele specifice de conformitate și protecție a datelor.
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
}
