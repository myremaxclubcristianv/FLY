import React from "react";
import { FlightOption } from "../../types/domain";
import { DataStatusBadge } from "../shared/DataStatusBadge";
import { AviationImage } from "../AviationImage";
import { Button } from "../ui/Button";
import { cn } from "../../lib/utils";

export interface FlightComparisonProps {
  options: FlightOption[];
  selectedOptionId?: string;
  onSelectOption: (option: FlightOption) => void;
  onProceed: () => void;
  onBack: () => void;
}

const OPTION_PHOTOS: Record<string, string> = {
  LIGHT_JET: "https://images.unsplash.com/photo-1587019158091-1a103c5dd17f?auto=format&fit=crop&w=1200&q=80",
  VERY_LIGHT_JET: "https://images.unsplash.com/photo-1559297434-fae8a1916a79?auto=format&fit=crop&w=1200&q=80",
  MIDSIZE_JET: "https://images.unsplash.com/photo-1520437358207-323b43b50729?auto=format&fit=crop&w=1200&q=80",
  SUPER_MIDSIZE_JET: "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&w=1200&q=80",
  LARGE_CABIN_JET: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=1200&q=80",
  TURBOPROP: "https://images.unsplash.com/photo-1474302770737-173ee21bab63?auto=format&fit=crop&w=1200&q=80",
  HELICOPTER: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&q=80",
};

export function FlightComparison({
  options,
  selectedOptionId,
  onSelectOption,
  onProceed,
  onBack,
}: FlightComparisonProps) {
  const primaryOption = options.find((o) => o.isPrimary) || options[0];
  const alternatives = options.filter((o) => o.id !== primaryOption?.id);
  const selectedOpt = options.find((o) => o.id === selectedOptionId) || primaryOption;

  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-col gap-2 border-b border-white/10 pb-6">
        <div className="flex items-center gap-3">
          <span className="text-xs font-data text-[var(--color-accent)] uppercase tracking-widest">
            AIR RECOMMENDATION ENGINE // EVALUATION COMPLETE
          </span>
          <DataStatusBadge status="VERIFIED" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-light text-[var(--color-text-primary)]">
          DETERMINED WAY TO FLY
        </h2>
        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed max-w-3xl">
          Based on your mission coordinates, passenger payload, time sensitivity, and airfield constraints, AIR has evaluated the fleet envelope. Review our primary recommendation and verified operational alternatives below.
        </p>
      </div>

      {/* PRIMARY BLOCK: OUR RECOMMENDATION */}
      {primaryOption && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              <h3 className="text-sm font-data font-bold text-amber-400 uppercase tracking-widest">
                OUR RECOMMENDATION
              </h3>
            </div>
            <span className="text-xs font-data text-neutral-400">
              OPTIMAL OPERATIONAL FIT (SCORE: {primaryOption.recommendationScore || 98}/100)
            </span>
          </div>

          <div
            onClick={() => onSelectOption(primaryOption)}
            className={cn(
              "rounded-3xl border overflow-hidden transition-all duration-300 cursor-pointer relative",
              selectedOptionId === primaryOption.id
                ? "border-amber-400 bg-neutral-900/90 shadow-[0_0_40px_rgba(245,158,11,0.15)] ring-1 ring-amber-400/50"
                : "border-white/15 bg-neutral-900/60 hover:border-white/30"
            )}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Image Banner */}
              <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full bg-neutral-950 overflow-hidden">
                <AviationImage
                  src={
                    OPTION_PHOTOS[primaryOption.aircraftCategory] ||
                    OPTION_PHOTOS.LIGHT_JET
                  }
                  alt={primaryOption.aircraftName}
                  fill
                  className="object-cover"
                  fallbackTitle={primaryOption.aircraftName}
                  fallbackCode={`RECOMMENDED // ${primaryOption.aircraftCategory}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-neutral-950" />
                <div className="absolute top-4 left-4 z-10 bg-amber-500 text-black text-[10px] font-data font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                  ★ PRIMARY RECOMMENDATION
                </div>
                <div className="absolute bottom-4 left-4 z-10 bg-black/80 backdrop-blur-md px-3 py-1 rounded text-xs font-data text-amber-400 border border-white/10">
                  {primaryOption.aircraftCategory.replace(/_/g, " ")}
                </div>
              </div>

              {/* Details Column */}
              <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between gap-6">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div>
                      <h4 className="text-2xl sm:text-3xl font-light text-white">
                        {primaryOption.aircraftName}
                      </h4>
                      <p className="text-xs font-data text-[var(--color-text-muted)] mt-1">
                        {primaryOption.routing}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <DataStatusBadge status={primaryOption.dataStatus} />
                    </div>
                  </div>

                  {/* Flight Metrics Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-neutral-950/80 border border-white/10 text-xs font-data">
                    <div>
                      <span className="block text-[9px] text-neutral-400 uppercase tracking-wider">
                        ESTIMATED FLIGHT TIME
                      </span>
                      <span className="text-white font-medium text-sm mt-0.5 block">
                        {primaryOption.estimatedDuration}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[9px] text-neutral-400 uppercase tracking-wider">
                        PRICING STATUS
                      </span>
                      <span className="text-amber-400 font-medium text-xs mt-0.5 block">
                        {primaryOption.indicativePriceRange || "REQUEST QUOTE"}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[9px] text-neutral-400 uppercase tracking-wider">
                        VERIFICATION
                      </span>
                      <span className="text-emerald-400 font-medium text-xs mt-0.5 block">
                        OFFICIAL SOURCE
                      </span>
                    </div>
                  </div>

                  {/* Operational Rationale */}
                  <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs text-neutral-200 leading-relaxed space-y-1.5">
                    <span className="text-[10px] font-data text-amber-400 font-bold uppercase tracking-wider block">
                      WHY AIR DETERMINED THIS SOLUTION:
                    </span>
                    <p>{primaryOption.recommendationReason}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="text-xs font-data text-neutral-400">
                    {selectedOptionId === primaryOption.id ? (
                      <span className="text-amber-400 font-semibold flex items-center gap-1.5">
                        <span>✓</span> Selected for Quote Dispatch
                      </span>
                    ) : (
                      "Click to select this vehicle"
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectOption(primaryOption);
                    }}
                    className={cn(
                      "px-5 py-2.5 rounded-xl text-xs font-data uppercase font-bold transition",
                      selectedOptionId === primaryOption.id
                        ? "bg-amber-400 text-black shadow-lg"
                        : "bg-neutral-800 text-white hover:bg-neutral-700 border border-neutral-700"
                    )}
                  >
                    {selectedOptionId === primaryOption.id ? "✓ SELECTED" : "SELECT OPTION"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECONDARY BLOCK: ALTERNATIVES */}
      {alternatives.length > 0 && (
        <div className="flex flex-col gap-4 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-data font-bold text-neutral-300 uppercase tracking-widest">
              ALTERNATIVES CONSIDERED
            </h3>
            <span className="text-xs font-data text-neutral-400">
              GENUINE OPERATIONAL ALTERNATIVES
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {alternatives.map((alt) => {
              const isSelected = selectedOptionId === alt.id;
              const photo =
                OPTION_PHOTOS[alt.aircraftCategory] || OPTION_PHOTOS.TURBOPROP;
              return (
                <div
                  key={alt.id}
                  onClick={() => onSelectOption(alt)}
                  className={cn(
                    "rounded-2xl border overflow-hidden transition-all duration-300 cursor-pointer flex flex-col justify-between relative",
                    isSelected
                      ? "border-amber-400 bg-neutral-900/90 shadow-[0_0_30px_rgba(245,158,11,0.15)] ring-1 ring-amber-400/50"
                      : "border-white/10 bg-neutral-900/40 hover:border-white/20"
                  )}
                >
                  <div className="relative h-40 w-full bg-neutral-950 overflow-hidden">
                    <AviationImage
                      src={photo}
                      alt={alt.aircraftName}
                      fill
                      className="object-cover"
                      fallbackTitle={alt.aircraftName}
                      fallbackCode={`ALT // ${alt.aircraftCategory}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 bg-black/80 px-2.5 py-0.5 rounded text-[10px] font-data text-amber-400 border border-white/10">
                      {alt.aircraftCategory.replace(/_/g, " ")}
                    </div>
                  </div>

                  <div className="p-5 flex flex-col justify-between gap-4 flex-1">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-light text-white">
                          {alt.aircraftName}
                        </h4>
                        <DataStatusBadge status={alt.dataStatus} showDot={false} />
                      </div>

                      <div className="grid grid-cols-2 gap-2 p-2.5 rounded-lg bg-neutral-950 border border-white/5 text-xs font-data">
                        <div>
                          <span className="block text-[8px] text-neutral-400 uppercase">FLIGHT TIME</span>
                          <span className="text-white font-medium">{alt.estimatedDuration}</span>
                        </div>
                        <div>
                          <span className="block text-[8px] text-neutral-400 uppercase">INDICATIVE COST</span>
                          <span className="text-amber-400 font-medium">{alt.indicativePriceRange || "REQUEST"}</span>
                        </div>
                      </div>

                      <p className="text-xs text-neutral-300 leading-relaxed">
                        {alt.recommendationReason}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[10px] font-data text-neutral-400">
                        {isSelected ? "✓ Option Selected" : "Alternative fit"}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectOption(alt);
                        }}
                        className={cn(
                          "px-4 py-1.5 rounded-lg text-xs font-data uppercase font-bold transition",
                          isSelected
                            ? "bg-amber-400 text-black"
                            : "bg-neutral-800 text-white hover:bg-neutral-700 border border-neutral-700"
                        )}
                      >
                        {isSelected ? "✓ SELECTED" : "SELECT"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Bottom Dispatch Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
        <Button type="button" variant="outline" size="md" onClick={onBack}>
          ← BACK TO MISSION PARAMETERS
        </Button>
        <Button type="button" variant="primary" size="lg" onClick={onProceed}>
          PROCEED WITH {selectedOpt?.aircraftName || "SELECTED VEHICLE"} →
        </Button>
      </div>
    </div>
  );
}
