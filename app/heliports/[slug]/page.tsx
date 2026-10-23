import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { ProvenanceBadge } from "@/components/shared/ProvenanceBadge";
import { AviationImage } from "@/components/AviationImage";
import { Button } from "@/components/ui/Button";
import { HeliportRepository, REAL_ROMANIA_HELIPORTS } from "@/data/real/heliports";
import { createRouteMetadata } from "@/lib/seo/metadata";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const heliport = HeliportRepository.getHeliportBySlug(slug);

  if (!heliport) {
    return { title: "Heliport Not Found | AIR by Cristian Văduva" };
  }

  return createRouteMetadata({
    path: `/heliports/${slug}`,
    title: `${heliport.name} (${heliport.icao || "Heli-Access"}) Technical Dossier`,
    description: `Aeronautical specifications, landing permissions, coordinates, and helicopter charter access for ${heliport.name} in ${heliport.city}, Romania.`,
    ogImage: heliport.heroImage,
  });
}

export function generateStaticParams() {
  return REAL_ROMANIA_HELIPORTS.map((hp) => ({
    slug: hp.slug,
  }));
}

export default async function HeliportDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const hp = HeliportRepository.getHeliportBySlug(slug);

  if (!hp) {
    notFound();
  }

  const isCertified = hp.status === "OFFICIALLY_CERTIFIED";

  return (
    <div className="w-full bg-white text-neutral-900 font-sans flex-1 flex flex-col">
      {/* 01 — HEADER */}
      <section className="w-full py-20 sm:py-28 border-b border-neutral-200/80 bg-white">
        <Container size="wide">
          <div className="flex flex-col gap-8 max-w-6xl mx-auto">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
              <Link href="/" className="hover:text-amber-600 transition">HOME</Link>
              <span>/</span>
              <Link href="/heliports" className="hover:text-amber-600 transition">HELIPORTS</Link>
              <span>/</span>
              <span className="text-neutral-900 font-bold uppercase">{hp.name}</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-200 pb-8">
              <div className="space-y-4 max-w-3xl">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="editorial-tag-dark">
                    HELIPORT TECHNICAL DOSSIER // {hp.icao || hp.region.toUpperCase()}
                  </span>
                  <ProvenanceBadge
                    status={isCertified ? "OFFICIAL_SOURCE" : "INDICATIVE"}
                    sourceName={hp.sourceName}
                    sourceUrl={hp.sourceUrl}
                    showSource
                  />
                </div>
                <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-neutral-900 leading-[1.05] font-sans">
                  {hp.name}<span className="text-amber-600">.</span>
                </h1>
                <p className="text-lg text-neutral-600 font-light leading-relaxed">
                  {hp.notesEn}
                </p>
              </div>

              <Link href={`/plan?helicopter=true&to=${encodeURIComponent(hp.city)}`}>
                <Button variant="primary" size="lg" className="whitespace-nowrap px-8 shadow-xl">
                  REQUEST ROTOR CHARTER →
                </Button>
              </Link>
            </div>

            {/* Visual Hero Feature */}
            <div className="relative h-[380px] sm:h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl border border-neutral-200 bg-neutral-900 group">
              <AviationImage
                src={hp.heroImage}
                alt={hp.name}
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-1000"
                fallbackTitle={hp.name}
                fallbackCode="HELIPORT // DOSSIER"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-8 left-8 right-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 text-white z-10 font-mono text-xs">
                <div>
                  <span className="text-[10px] text-amber-400 font-bold uppercase block tracking-wider">
                    {hp.statusLabelEn}
                  </span>
                  <span className="text-white text-lg sm:text-xl font-light font-sans">
                    {hp.officialDesignation || hp.name}
                  </span>
                </div>
                {hp.coordinatesFormatted && (
                  <span className="bg-black/70 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-neutral-300">
                    COORDINATES: {hp.coordinatesFormatted}
                  </span>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 02 — TECHNICAL SPECIFICATIONS GRID */}
      <section className="w-full py-16 bg-[#fafaf7] border-b border-neutral-200/80">
        <Container size="wide">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm space-y-1">
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block font-bold">
                  FACILITY STATUS
                </span>
                <span className={`text-xl sm:text-2xl font-light font-sans block ${isCertified ? "text-emerald-700 font-semibold" : "text-amber-700"}`}>
                  {isCertified ? "CERTIFIED" : "UNVERIFIED PAD"}
                </span>
                <span className="text-xs font-mono text-neutral-400">{hp.region}</span>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm space-y-1">
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block font-bold">
                  ELEVATION & SURFACE
                </span>
                <span className="text-xl sm:text-2xl font-light text-neutral-900 font-sans block">
                  {hp.elevationFt !== undefined ? `${hp.elevationFt} FT` : "Variable"}
                </span>
                <span className="text-xs font-mono text-neutral-400 truncate block">{hp.fatospecs || "Off-Airfield Ground"}</span>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm space-y-1">
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block font-bold">
                  LIGHTING & NIGHT OPS
                </span>
                <span className="text-lg sm:text-xl font-light text-neutral-900 font-sans block truncate">
                  {hp.lighting || "Daylight VFR Only"}
                </span>
                <span className="text-xs font-mono text-neutral-400">OPERATIONAL RULES</span>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm space-y-1">
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block font-bold">
                  OPERATING HOURS
                </span>
                <span className="text-lg sm:text-xl font-light text-neutral-900 font-sans block truncate">
                  {hp.operatingHours || "On Request (PPR)"}
                </span>
                <span className="text-xs font-mono text-neutral-400">HANDLING AVAILABILITY</span>
              </div>
            </div>

            {/* Permissions & Restrictions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 rounded-3xl bg-white border border-neutral-200 shadow-sm space-y-4">
                <span className="text-[10px] font-mono text-amber-600 uppercase font-bold tracking-wider block">
                  CLEARANCE & PERMISSION REQUIREMENTS
                </span>
                <h3 className="text-2xl font-light text-neutral-900 font-sans">
                  Landing Authorization Protocol
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed font-sans">
                  {hp.permissionRequirements}
                </p>
                <div className="pt-2 border-t border-neutral-100 text-xs font-mono text-neutral-500">
                  Authority / Operator: <strong className="text-neutral-800">{hp.operatorOrAuthority}</strong>
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-white border border-neutral-200 shadow-sm space-y-4">
                <span className="text-[10px] font-mono text-amber-600 uppercase font-bold tracking-wider block">
                  AERONAUTICAL RESTRICTIONS
                </span>
                <h3 className="text-2xl font-light text-neutral-900 font-sans">
                  Operational Guidelines
                </h3>
                <ul className="space-y-2 text-xs font-sans text-neutral-600">
                  {hp.operationalRestrictions.map((r, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Authoritative Citation & Verification Strip */}
            <div className="p-6 rounded-2xl bg-neutral-100 border border-neutral-200 text-xs text-neutral-600 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="space-y-1">
                <div className="font-mono text-neutral-900 font-bold">
                  DATA CITATION & FRESHNESS: {hp.sourceName}
                </div>
                <div className="text-neutral-500">
                  Aeronautical Cycle: {hp.effectiveCycle} • Verified: {hp.lastVerifiedAt}
                </div>
              </div>

              <a
                href={hp.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-amber-700 hover:underline font-bold"
              >
                Official Publication Source ↗
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* 03 — MISSION CTA */}
      <section className="w-full py-20 bg-neutral-950 text-white">
        <Container size="wide">
          <div className="max-w-6xl mx-auto rounded-3xl border border-amber-500/30 bg-gradient-to-b from-neutral-900 to-black p-10 sm:p-14 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest block">
                EXECUTIVE HELICOPTER CHARTER
              </span>
              <h3 className="text-3xl sm:text-4xl font-light text-white font-sans">
                PLAN A ROTORCRAFT FLIGHT TO {hp.city.toUpperCase()}
              </h3>
              <p className="text-sm text-neutral-300 font-sans">
                Point-to-point helicopter charters across Romania operated exclusively by certified EASA AOC carriers with twin-turbine aircraft.
              </p>
            </div>

            <Link href={`/plan?helicopter=true&to=${encodeURIComponent(hp.city)}`}>
              <Button variant="primary" size="lg" className="whitespace-nowrap px-8 py-4 text-base shadow-2xl">
                REQUEST HELICOPTER QUOTE →
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
