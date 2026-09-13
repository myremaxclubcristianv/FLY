import React from "react";
import { FlightOption } from "../../types/domain";
import { DataStatusBadge } from "../shared/DataStatusBadge";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { AviationImage } from "../AviationImage";
import { cn } from "../../lib/utils";

export interface FlightOptionCardProps {
  option: FlightOption;
  isSelected?: boolean;
  onSelect?: () => void;
}

const OPTION_PHOTOS: Record<string, string> = {
  LIGHT_JET: "https://images.unsplash.com/photo-1587019158091-1a103c5dd17f?auto=format&fit=crop&w=800&q=80",
  VERY_LIGHT_JET: "https://images.unsplash.com/photo-1559297434-fae8a1916a79?auto=format&fit=crop&w=800&q=80",
  MIDSIZE_JET: "https://images.unsplash.com/photo-1520437358207-323b43b50729?auto=format&fit=crop&w=800&q=80",
  SUPER_MIDSIZE_JET: "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&w=800&q=80",
  HEAVY_JET: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=800&q=80",
  TURBOPROP: "https://images.unsplash.com/photo-1474302770737-173ee21bab63?auto=format&fit=crop&w=800&q=80",
  HELICOPTER: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80",
};

export function FlightOptionCard({
  option,
  isSelected = false,
  onSelect,
}: FlightOptionCardProps) {
  const photo =
    OPTION_PHOTOS[option.aircraftCategory] ||
    "https://images.unsplash.com/photo-1587019158091-1a103c5dd17f?auto=format&fit=crop&w=800&q=80";

  return (
    <Card
      variant="surface"
      className={cn(
        "flex flex-col justify-between overflow-hidden transition-all duration-300 relative border rounded-2xl p-0",
        isSelected
          ? "border-amber-400/80 bg-amber-500/10 shadow-[0_0_30px_rgba(245,158,11,0.15)] ring-1 ring-amber-400/50"
          : "hover:border-white/20"
      )}
    >
      {option.isPrimary && (
        <div className="absolute top-3 right-3 z-20 bg-gradient-to-r from-amber-500 to-amber-400 text-black text-[9px] font-data px-3 py-1 font-bold tracking-widest uppercase rounded-full shadow-lg">
          RECOMMENDED FIT
        </div>
      )}

      {/* Visual Aircraft Photo Showcase */}
      <div className="relative h-44 w-full bg-neutral-900 overflow-hidden">
        <AviationImage
          src={photo}
          alt={option.aircraftName}
          fill
          className="object-cover"
          fallbackTitle={option.aircraftName}
          fallbackCode={`OPTION // ${option.aircraftCategory}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent pointer-events-none" />
        <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md border border-white/10 px-2.5 py-0.5 rounded text-[10px] font-data text-amber-400 font-semibold z-10">
          {option.aircraftCategory.replace(/_/g, " ")}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 flex flex-col justify-between gap-5 flex-1">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-xl font-light text-[var(--color-text-primary)] font-sans">
              {option.aircraftName}
            </h3>
            <DataStatusBadge status={option.dataStatus} showDot={false} />
          </div>

          <p className="text-xs font-data text-[var(--color-text-muted)]">
            {option.routing}
          </p>
        </div>

        {/* Specs Matrix */}
        <div className="grid grid-cols-2 gap-3 text-xs font-data glass-instrument p-3.5 rounded-xl border border-white/5">
          <div>
            <span className="block text-[8px] text-[var(--color-text-muted)] uppercase tracking-wider">ESTIMATED DURATION</span>
            <span className="text-[var(--color-text-primary)] font-medium text-xs">{option.estimatedDuration}</span>
          </div>
          <div>
            <span className="block text-[8px] text-[var(--color-text-muted)] uppercase tracking-wider">PRICING STATUS</span>
            <span className="text-amber-400 font-medium text-xs">{option.indicativePriceRange || "QUOTE REQUIRED"}</span>
          </div>
        </div>

        {/* Recommendation Reason */}
        <div className="text-xs text-[var(--color-text-secondary)] leading-relaxed font-sans border-l-2 border-amber-400/40 pl-3 py-1">
          <span className="text-[9px] font-data text-amber-400/80 block uppercase mb-0.5 tracking-wider font-semibold">
            WHY THIS OPTION FITS
          </span>
          {option.recommendationReason}
        </div>

        {/* Bottom CTA */}
        <div className="pt-2">
          <Button
            fullWidth
            variant={isSelected ? "primary" : "outline"}
            size="md"
            onClick={onSelect}
          >
            {isSelected ? "✓ SELECTED VEHICLE" : "SELECT THIS VEHICLE"}
          </Button>
        </div>
      </div>
    </Card>
  );
}
