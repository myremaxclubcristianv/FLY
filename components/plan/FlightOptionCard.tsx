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
        "flex flex-col justify-between gap-6 p-6 sm:p-8 transition-all duration-300 relative border-2",
        isSelected
          ? "border-[var(--color-accent)] bg-[var(--color-surface-elevated)]"
          : "border-[var(--color-border)] hover:border-[var(--color-text-secondary)]"
      )}
    >
      {option.isPrimary && (
        <div className="absolute top-0 right-0 bg-[var(--color-accent)] text-[var(--color-bg-primary)] text-[9px] font-data px-3 py-1 font-semibold tracking-widest uppercase">
          RECOMMENDED FIT
        </div>
      )}

      {/* Card Header */}
      <div className="flex flex-col gap-2 pt-2">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-data text-[var(--color-accent)] uppercase">
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
      <div className="grid grid-cols-2 gap-4 text-xs font-data bg-[var(--color-bg-primary)] p-4 border border-[var(--color-border-subtle)]">
        <div>
          <span className="block text-[9px] text-[var(--color-text-muted)] uppercase">ESTIMATED DURATION</span>
          <span className="text-[var(--color-text-primary)] font-medium">{option.estimatedDuration}</span>
        </div>
        <div>
          <span className="block text-[9px] text-[var(--color-text-muted)] uppercase">PRICING STATUS</span>
          <span className="text-[var(--color-accent)] font-medium">{option.indicativePriceRange || "QUOTE REQUIRED"}</span>
        </div>
      </div>

      {/* Recommendation Reason */}
      <div className="text-xs text-[var(--color-text-secondary)] leading-relaxed font-sans border-l-2 border-[var(--color-accent-muted)] pl-3 py-1">
        <span className="text-[9px] font-data text-[var(--color-text-muted)] block uppercase mb-0.5">
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
          {isSelected ? "✓ SELECTED OPTION" : "REQUEST THIS MISSION OPTION"}
        </Button>
      </div>
    </Card>
  );
}
