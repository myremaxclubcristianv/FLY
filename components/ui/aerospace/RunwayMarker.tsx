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
    <div className={cn("inline-flex items-center gap-3 border border-neutral-800 bg-neutral-950/90 px-3 py-1.5 rounded font-mono text-xs select-none", className)}>
      <div className="flex items-center gap-1.5 text-amber-400 font-bold">
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="2" x2="12" y2="22" strokeDasharray="3 3" />
          <rect x="7" y="4" width="10" height="16" strokeWidth="1.5" />
        </svg>
        <span>RWY {designation}</span>
      </div>
      <span className="text-neutral-600">|</span>
      <span className="text-neutral-300 font-semibold">{dimensions}</span>
      <span className="text-neutral-600">|</span>
      <span className="text-[10px] text-neutral-400 uppercase">{surface}</span>
    </div>
  );
}

export default RunwayMarker;
