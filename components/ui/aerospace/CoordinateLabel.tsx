"use client";

import React from "react";
import { cn } from "../../../lib/utils";

export interface CoordinateLabelProps {
  coordinates: string;
  location?: string;
  className?: string;
}

export function CoordinateLabel({ coordinates, location, className }: CoordinateLabelProps) {
  return (
    <div className={cn("inline-flex items-center gap-2 font-data text-[10px] text-[var(--color-text-secondary)] select-none bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10", className)}>
      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
      <span className="text-amber-400 font-bold">{coordinates}</span>
      {location && (
        <>
          <span className="text-white/20">•</span>
          <span className="text-white uppercase tracking-wider">{location}</span>
        </>
      )}
    </div>
  );
}

export default CoordinateLabel;
