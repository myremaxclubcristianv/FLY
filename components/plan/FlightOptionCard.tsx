import React from "react";
import { FlightOption } from "../../types/domain";
import { DataStatusBadge } from "../shared/DataStatusBadge";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { cn } from "../../lib/utils";

export interface FlightOptionCardProps {
  option: FlightOption;
  isSelected?: boolean;
  onSelect?: () => void;
}

export function FlightOptionCard({
  option,
  isSelected = false,
  onSelect,
}: FlightOptionCardProps) {
  return (
    <Card
      variant="surface"
      className={cn(
        "flex flex-col justify-between gap-6 p-6 sm:p-8 transition-all duration-300 relative border rounded-2xl",
        isSelected
          ? "border-amber-400/80 bg-amber-500/10 shadow-[0_0_30px_rgba(245,158,11,0.15)] ring-1 ring-amber-400/50"
          : "hover:border-white/20"
      )}
    >
      {option.isPrimary && (
        <div className="absolute -top-3 right-6 bg-gradient-to-r from-amber-500 to-amber-400 text-black text-[9px] font-data px-3 py-1 font-bold tracking-widest uppercase rounded-full shadow-lg">
          RECOMMENDED FIT
        </div>
      )}

      {/* Card Header */}
      <div className="flex flex-col gap-2 pt-1">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-data text-amber-400 uppercase tracking-wider font-semibold">
            {option.aircraftCategory}
          </span>
          <DataStatusBadge status={option.dataStatus} showDot={false} />
        </div>

        <h3 className="text-xl font-light text-[var(--color-text-primary)]">
          {option.aircraftName}
        </h3>
        <p className="text-xs font-data text-[var(--color-text-muted)]">
          {option.routing}
        </p>
      </div>

      {/* Specs Matrix */}
      <div className="grid grid-cols-2 gap-4 text-xs font-data glass-instrument p-4 rounded-xl border border-white/5">
        <div>
          <span className="block text-[9px] text-[var(--color-text-muted)] uppercase tracking-wider">ESTIMATED DURATION</span>
          <span className="text-[var(--color-text-primary)] font-medium text-sm">{option.estimatedDuration}</span>
        </div>
        <div>
          <span className="block text-[9px] text-[var(--color-text-muted)] uppercase tracking-wider">PRICING STATUS</span>
          <span className="text-amber-400 font-medium text-sm">{option.indicativePriceRange || "QUOTE REQUIRED"}</span>
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
          {isSelected ? "✓ SELECTED OPTION" : "SELECT MISSION OPTION"}
        </Button>
      </div>
    </Card>
  );
}
