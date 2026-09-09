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
    <div className={cn("bg-neutral-950/80 border border-neutral-800/80 p-3 rounded-lg flex flex-col justify-between font-mono select-none backdrop-blur-md", className)}>
      <div className="flex items-center justify-between text-[9px] text-neutral-500 uppercase tracking-widest">
        <span>{label}</span>
        <span className="text-amber-400/80 text-[8px]">{provenance}</span>
      </div>

      <div className="flex items-baseline gap-1 mt-1">
        <span className="text-lg sm:text-xl font-bold text-white tracking-tight">{value}</span>
        {unit && <span className="text-xs text-amber-400/90 font-semibold">{unit}</span>}
      </div>
    </div>
  );
}

export default TelemetryBlock;
