"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LUXURY_DESTINATIONS, DestinationItem } from "../../data/real/destinations";
import { AviationImage } from "../AviationImage";
import { ProvenanceBadge } from "../shared/ProvenanceBadge";

export function DestinationExplorer() {
  const [selectedSlug, setSelectedSlug] = useState<string>(LUXURY_DESTINATIONS[0].slug);

  const selectedDestination: DestinationItem =
    LUXURY_DESTINATIONS.find((d) => d.slug === selectedSlug) || LUXURY_DESTINATIONS[0];

  return (
    <div className="w-full bg-neutral-900/60 border border-neutral-800 rounded-3xl overflow-hidden backdrop-blur-2xl p-6 sm:p-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-800 pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
              DEPARTURE BOARD // GLOBAL DISPATCH
            </span>
            <ProvenanceBadge status="AIR_CALCULATED" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight">
            WHERE WILL YOU FLY?
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-mono max-w-2xl">
            Select a global luxury arrival gateway to inspect airport runway data, recommended jet categories, and estimated flight time from Bucharest Băneasa (LRBS / BBU).
          </p>
        </div>

        <Link
          href="/destinations"
          className="text-xs font-mono text-amber-400 hover:underline whitespace-nowrap bg-neutral-950 px-4 py-2 rounded-lg border border-neutral-800"
        >
          VIEW ALL {LUXURY_DESTINATIONS.length} DESTINATIONS →
        </Link>
      </div>

      {/* Main Interactive Grid: Left Selector List, Right Preview Card */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Departure Board Items List */}
        <div className="lg:col-span-5 flex flex-col gap-2 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
          {LUXURY_DESTINATIONS.map((item) => {
            const isSelected = item.slug === selectedSlug;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedSlug(item.slug)}
                className={`w-full text-left p-4 rounded-xl border transition flex items-center justify-between font-mono text-xs ${
                  isSelected
                    ? "bg-amber-500/10 border-amber-500/60 text-white"
                    : "bg-neutral-950/60 border-neutral-800/80 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full ${isSelected ? "bg-amber-400 animate-pulse" : "bg-neutral-700"}`} />
                  <div>
                    <div className="font-bold text-sm text-white">{item.name}</div>
                    <div className="text-[10px] text-neutral-500">{item.country} • {item.airportCode}</div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-amber-400 font-bold block">{item.airportCode.split("/")[0]}</span>
                  <span className="text-[9px] text-neutral-500 block">{item.estimatedFlightFromLRBS}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Active Destination Preview Card */}
        <div className="lg:col-span-7 bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden flex flex-col justify-between">
          <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-neutral-900">
            <AviationImage
              src={selectedDestination.image}
              alt={selectedDestination.name}
              fill
              className="object-cover"
              fallbackTitle={selectedDestination.name}
              fallbackCode={`DEST // ${selectedDestination.airportCode}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent pointer-events-none" />

            <div className="absolute top-4 left-4 z-10 bg-neutral-950/80 backdrop-blur border border-neutral-800 px-3 py-1 rounded text-xs font-mono text-amber-400 font-bold">
              {selectedDestination.airportCode}
            </div>

            <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 text-white">
              <div>
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block">
                  {selectedDestination.region} • {selectedDestination.coordinates}
                </span>
                <h3 className="text-3xl font-light tracking-tight">{selectedDestination.name}</h3>
              </div>
              <span className="bg-amber-500 text-neutral-950 font-bold px-3 py-1 rounded text-xs font-mono">
                {selectedDestination.recommendedCategory}
              </span>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <p className="text-xs sm:text-sm text-neutral-300 font-mono leading-relaxed">
              {selectedDestination.description}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-mono pt-4 border-t border-neutral-800">
              <div>
                <span className="text-[10px] text-neutral-500 uppercase block">FROM LRBS (BĂNEASA)</span>
                <span className="text-amber-300 font-bold">{selectedDestination.estimatedFlightFromLRBS}</span>
              </div>
              <div>
                <span className="text-[10px] text-neutral-500 uppercase block">RECOMMENDED AIRCRAFT</span>
                <span className="text-neutral-200">{selectedDestination.recommendedAircraft.split("/")[0]}</span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="text-[10px] text-neutral-500 uppercase block">TRANSFER METHOD</span>
                <span className="text-neutral-300">{selectedDestination.transferType}</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-[10px] font-mono text-neutral-500">PROVENANCE: {selectedDestination.provenance}</span>
              <Link
                href={`/destinations/${selectedDestination.slug}`}
                className="bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold px-5 py-2.5 rounded-lg text-xs font-mono transition"
              >
                REQUEST MISSION TO {selectedDestination.name.toUpperCase()} →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DestinationExplorer;
