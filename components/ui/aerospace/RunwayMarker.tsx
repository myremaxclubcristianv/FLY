"use client";

import React from "react";
import { cn } from "../../../lib/utils";

export interface RunwayMarkerProps {
  designation?: string;
  dimensions?: string;
  surface?: string;
  className?: string;
}

export function RunwayMarker({ designation = "07 / 25", dimensions = "2,358 × 45 M", surface = "ASPHALT", className }: RunwayMarkerProps) {
  return (
    <div className={cn("inline-flex items-center gap-3 glass-instrument px-4 py-2 rounded-xl font-data text-xs select-none", className)}>
      <div className="flex items-center gap-1.5 text-amber-400 font-bold">
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="2" x2="12" y2="22" strokeDasharray="3 3" />
          <rect x="7" y="4" width="10" height="16" strokeWidth="1.5" />
        </svg>
        <span>RWY {designation}</span>
      </div>
      <span className="text-white/20">|</span>
      <span className="text-white font-semibold">{dimensions}</span>
      <span className="text-white/20">|</span>
      <span className="text-[10px] text-[var(--color-text-secondary)] uppercase">{surface}</span>
    </div>
  );
}

export default RunwayMarker;
