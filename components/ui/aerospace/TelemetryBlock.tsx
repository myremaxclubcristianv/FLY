"use client";

import React from "react";
import { cn } from "../../../lib/utils";

export interface TelemetryBlockProps {
  label: string;
  value: string;
  unit?: string;
  provenance?: string;
  className?: string;
}

export function TelemetryBlock({ label, value, unit, provenance = "AIR_CALCULATED", className }: TelemetryBlockProps) {
  return (
    <div className={cn("glass-instrument p-4 rounded-xl flex flex-col justify-between font-data select-none", className)}>
      <div className="flex items-center justify-between text-[9px] text-[var(--color-text-muted)] uppercase tracking-wider">
        <span>{label}</span>
        <span className="text-amber-400 font-semibold text-[8px]">{provenance}</span>
      </div>

      <div className="flex items-baseline gap-1 mt-2">
        <span className="text-lg sm:text-2xl font-bold text-white tracking-tight">{value}</span>
        {unit && <span className="text-xs text-amber-400 font-semibold">{unit}</span>}
      </div>
    </div>
  );
}

export default TelemetryBlock;
