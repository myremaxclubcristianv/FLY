"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { HeliportRecord } from "@/data/real/heliports";
import { AviationImage } from "@/components/AviationImage";
import { Button } from "@/components/ui/Button";

interface HeliportExplorerProps {
  heliports: HeliportRecord[];
  isRo?: boolean;
}

export function HeliportExplorer({ heliports, isRo = false }: HeliportExplorerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("ALL");
  const [onlyCertified, setOnlyCertified] = useState(false);

  const filteredHeliports = useMemo(() => {
    return heliports.filter((hp) => {
      const matchesSearch =
        searchQuery === "" ||
        hp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hp.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (hp.icao && hp.icao.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesRegion = selectedRegion === "ALL" || hp.region === selectedRegion;
      const matchesCertified = !onlyCertified || hp.status === "OFFICIALLY_CERTIFIED";

      return matchesSearch && matchesRegion && matchesCertified;
    });
  }, [heliports, searchQuery, selectedRegion, onlyCertified]);

  const regions = ["ALL", "Bucharest & Ilfov", "Transylvania & Brașov", "Black Sea Coast", "Danube Delta"];

  return (
    <div className="space-y-8 font-sans">
      {/* Controls Strip */}
      <div className="p-6 rounded-2xl bg-[#fafaf7] border border-neutral-200/80 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder={isRo ? "Caută heliport, oraș sau cod ICAO (ex: Tuzla, LRTZ, Brașov)..." : "Search heliport, city or ICAO code (e.g. Tuzla, LRTZ, Brașov)..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs font-mono px-4 py-3 bg-white border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-neutral-900"
            />
          </div>

          <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-mono text-neutral-700 bg-white px-4 py-3 rounded-xl border border-neutral-300">
            <input
              type="checkbox"
              checked={onlyCertified}
              onChange={(e) => setOnlyCertified(e.target.checked)}
              className="accent-amber-600 rounded"
            />
            <span>{isRo ? "Doar Heliporturi Certificate AACR" : "Officially Certified Only"}</span>
          </label>
        </div>

        {/* Region Pills */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-neutral-200">
          {regions.map((reg) => (
            <button
              key={reg}
              type="button"
              onClick={() => setSelectedRegion(reg)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition ${
                selectedRegion === reg
                  ? "bg-amber-600 text-white font-bold shadow-xs"
                  : "bg-white text-neutral-600 border border-neutral-200 hover:border-neutral-400"
              }`}
            >
              {reg === "ALL" ? (isRo ? "TOATE REGIUNI" : "ALL REGIONS") : reg}
            </button>
          ))}
        </div>
      </div>

      {/* Heliports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredHeliports.map((hp) => {
          const isCertified = hp.status === "OFFICIALLY_CERTIFIED";

          return (
            <div
              key={hp.id}
              className="editorial-card-light rounded-3xl overflow-hidden bg-white shadow-md border border-neutral-200 flex flex-col justify-between group hover:border-amber-400/80 transition duration-300"
            >
              <div>
                <div className="relative h-56 w-full overflow-hidden bg-neutral-900">
                  <AviationImage
                    src={hp.heroImage}
                    alt={hp.name}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-700"
                    fallbackTitle={hp.name}
                    fallbackCode="HELIPORT // ROMANIA"
                  />
                  <div className="absolute top-3 left-3 z-10">
                    <span
                      className={`text-[9px] font-mono font-bold tracking-wider px-2.5 py-1 rounded-full uppercase border shadow-sm ${
                        isCertified
                          ? "bg-emerald-950/80 text-emerald-300 border-emerald-500/50 backdrop-blur-md"
                          : "bg-amber-950/80 text-amber-300 border-amber-500/50 backdrop-blur-md"
                      }`}
                    >
                      {isRo ? hp.statusLabelRo : hp.statusLabelEn}
                    </span>
                  </div>

                  {hp.icao && (
                    <div className="absolute top-3 right-3 z-10 bg-black/80 backdrop-blur-md text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded border border-white/20">
                      {hp.icao}
                    </div>
                  )}
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <span className="text-[10px] font-mono text-amber-600 font-bold uppercase tracking-wider block">
                      {hp.region} • {hp.city}
                    </span>
                    <h3 className="text-xl font-light text-neutral-900 font-sans mt-1 group-hover:text-amber-700 transition">
                      {hp.name}
                    </h3>
                  </div>

                  <p className="text-xs text-neutral-600 font-sans leading-relaxed">
                    {isRo ? hp.notesRo : hp.notesEn}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-neutral-100 text-[11px] font-mono text-neutral-500">
                    <div>
                      <span className="text-neutral-400 uppercase">{isRo ? "Coordonate:" : "Coords:"}</span>{" "}
                      <span className="text-neutral-700 font-semibold">{hp.coordinatesFormatted || "VFR Point"}</span>
                    </div>
                    <div>
                      <span className="text-neutral-400 uppercase">{isRo ? "Avize:" : "Clearance:"}</span>{" "}
                      <span className="text-neutral-700">{hp.permissionRequirements}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-neutral-100 mt-4 flex items-center justify-between gap-3">
                <Link
                  href={`${isRo ? "/ro" : ""}/heliports/${hp.slug}`}
                  className="text-xs font-mono text-amber-600 font-bold hover:underline"
                >
                  {isRo ? "DETALII TEHNICE →" : "VIEW DOSSIER →"}
                </Link>

                <Link href={`/plan?helicopter=true&to=${encodeURIComponent(hp.city)}`}>
                  <Button variant="outline" size="sm" className="text-xs">
                    {isRo ? "COTATIE ROTOR →" : "REQUEST FLIGHT →"}
                  </Button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {filteredHeliports.length === 0 && (
        <div className="p-12 text-center rounded-2xl bg-white border border-neutral-200 space-y-2">
          <p className="text-neutral-600 font-mono text-sm">
            {isRo ? "Niciun heliport nu corespunde filtrelor selectate." : "No heliports found matching your search criteria."}
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="text-xs font-mono text-amber-600 underline font-bold"
          >
            {isRo ? "Resetează filtrele" : "Reset search filters"}
          </button>
        </div>
      )}
    </div>
  );

  function handleResetFilters() {
    setSearchQuery("");
    setSelectedRegion("ALL");
    setOnlyCertified(false);
  }
}
