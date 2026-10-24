"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Container } from "../layout/Container";
import { Button } from "../ui/Button";
import {
  ECOSYSTEM_PROJECTS,
  ECOSYSTEM_CATEGORIES,
  ECOSYSTEM_CONTACT,
  EcosystemProject,
} from "../../data/real/ecosystem";

interface EcosystemSectionProps {
  isRo?: boolean;
}

export function EcosystemSection({ isRo = false }: EcosystemSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredProjects =
    selectedCategory === "all"
      ? ECOSYSTEM_PROJECTS
      : ECOSYSTEM_PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <section
      id="ecosystem"
      className="w-full py-28 sm:py-36 bg-[#fbfbfa] text-neutral-900 border-b border-neutral-200/80 relative overflow-hidden content-auto"
    >
      {/* Subtle background ambient highlight */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/[0.03] rounded-full blur-3xl pointer-events-none" />

      <Container size="wide">
        <div className="max-w-6xl mx-auto space-y-12 sm:space-y-16">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-4 border-b border-neutral-200/80">
            <div className="space-y-4 max-w-3xl">
              <div className="flex items-center gap-3">
                <span className="editorial-tag-dark">
                  {isRo ? "CRISTIAN VĂDUVA BUSINESS ECOSYSTEM" : "CRISTIAN VĂDUVA BUSINESS ECOSYSTEM"}
                </span>
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-bold">
                  VERIFIED DIRECTORY
                </span>
              </div>

              <h2 className="text-4xl sm:text-6xl font-light text-neutral-900 tracking-tight font-sans">
                {isRo ? "Explorează Ecosistemul" : "Explore the Ecosystem"}
                <span className="text-amber-600">.</span>
              </h2>

              <p className="text-base sm:text-lg text-neutral-600 font-light leading-relaxed">
                {isRo
                  ? "Dincolo de aviație, descoperiți un ecosistem integrat ce reunește imobiliare de lux, protecție patrimonială, consultanță financiară, construcții, tehnologie și oportunități internaționale."
                  : "Beyond aviation, discover a connected ecosystem spanning real estate, asset protection, financial advisory, construction, technology and international opportunities."}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link href={isRo ? "/ro/ecosystem" : "/ecosystem"}>
                <Button variant="outline" size="md" className="whitespace-nowrap border-neutral-300 text-neutral-900 hover:bg-neutral-100">
                  {isRo ? "DIRECTOR COMPLET ECOSYSTEM →" : "FULL ECOSYSTEM DIRECTORY →"}
                </Button>
              </Link>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-150 whitespace-nowrap cursor-pointer ${
                selectedCategory === "all"
                  ? "bg-neutral-900 text-white font-bold shadow-sm"
                  : "bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200 hover:border-neutral-300"
              }`}
            >
              {isRo ? "TOATE DOMENIILE" : "ALL SECTORS"} ({ECOSYSTEM_PROJECTS.length})
            </button>
            {ECOSYSTEM_CATEGORIES.map((cat) => {
              const count = ECOSYSTEM_PROJECTS.filter((p) => p.category === cat.id).length;
              if (count === 0) return null;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-150 whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat.id
                      ? "bg-neutral-900 text-white font-bold shadow-sm"
                      : "bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200 hover:border-neutral-300"
                  }`}
                >
                  {isRo ? cat.labelRo : cat.label} ({count})
                </button>
              );
            })}
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project: EcosystemProject) => {
              const isHero = project.isPrimary;
              return (
                <div
                  key={project.id}
                  className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-200 group relative ${
                    isHero
                      ? "bg-neutral-950 text-white border border-amber-500/50 shadow-xl"
                      : "bg-white text-neutral-900 border border-neutral-200/90 hover:border-amber-500/60 hover:shadow-lg shadow-sm"
                  }`}
                >
                  {/* Card Top Information */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className={`text-[10px] font-mono uppercase tracking-wider font-bold ${
                          isHero ? "text-amber-400" : "text-amber-700"
                        }`}
                      >
                        {isRo ? project.categoryLabelRo : project.categoryLabel}
                      </span>
                      {isHero ? (
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                          PRIMARY PRODUCT
                        </span>
                      ) : (
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 border border-emerald-500/30 font-bold">
                          VERIFIED
                        </span>
                      )}
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
                        {isRo ? project.taglineRo : project.tagline}
                      </p>
                    </div>

                    <p
                      className={`text-xs font-sans leading-relaxed ${
                        isHero ? "text-neutral-300" : "text-neutral-600"
                      }`}
                    >
                      {isRo ? project.descriptionRo : project.description}
                    </p>

                    {project.metricsOrHighlight && (
                      <div
                        className={`pt-2 text-[11px] font-mono border-t ${
                          isHero
                            ? "border-neutral-800 text-neutral-300"
                            : "border-neutral-100 text-neutral-500"
                        }`}
                      >
                        {isRo ? project.metricsOrHighlightRo : project.metricsOrHighlight}
                      </div>
                    )}
                  </div>

                  {/* Card Action Link */}
                  <div className="pt-6 mt-6 border-t border-neutral-100/60 dark:border-neutral-800 flex items-center justify-between">
                    <span
                      className={`text-[10px] font-mono truncate max-w-[180px] ${
                        isHero ? "text-neutral-400" : "text-neutral-400"
                      }`}
                    >
                      {project.url.replace(/^https?:\/\//, "")}
                    </span>

                    {project.url.startsWith("https://fly.cristianvaduva.com") ? (
                      <Link
                        href={isRo ? "/ro/plan" : "/plan"}
                        className={`text-xs font-mono font-bold inline-flex items-center gap-1.5 transition ${
                          isHero
                            ? "text-amber-400 hover:text-amber-300"
                            : "text-amber-600 hover:text-amber-700"
                        }`}
                      >
                        <span>{isRo ? project.ctaTextRo : project.ctaText}</span>
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
                        aria-label={`${project.name} (${isRo ? project.ctaTextRo : project.ctaText})`}
                      >
                        <span>{isRo ? project.ctaTextRo : project.ctaText}</span>
                        <span aria-hidden="true">↗</span>
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Ecosystem Contact Strip */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-neutral-200/90 shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono text-amber-600 font-bold uppercase tracking-wider block">
                {isRo ? "CONEXIUNE DIRECTĂ ECOSYSTEM" : "DIRECT ECOSYSTEM CONTACT"}
              </span>
              <h4 className="text-xl font-light text-neutral-900 font-sans">
                {isRo
                  ? "Aveți o solicitare ce implică mai multe sectoare de activitate?"
                  : "Have a cross-sector inquiry across aviation, property, and capital?"}
              </h4>
              <p className="text-xs text-neutral-500 font-sans">
                {isRo
                  ? "Biroul executiv coordonează accesul direct între servicii de aviație, tranzacții imobiliare și protecție de patrimoniu."
                  : "The executive office coordinates direct access across flight sourcing, real estate acquisitions, and asset protection."}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={isRo ? ECOSYSTEM_CONTACT.whatsappUrlRo : ECOSYSTEM_CONTACT.whatsappUrlEn}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold transition flex items-center gap-2 shadow-sm"
              >
                <span>WhatsApp // {ECOSYSTEM_CONTACT.phoneInternational}</span>
                <span aria-hidden="true">↗</span>
              </a>

              <a
                href={`mailto:${ECOSYSTEM_CONTACT.email}`}
                className="px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-mono font-bold transition shadow-sm"
              >
                {ECOSYSTEM_CONTACT.email}
              </a>

              <a
                href={ECOSYSTEM_CONTACT.linktree}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-mono font-bold transition"
              >
                Linktree ↗
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
