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
    <div className={cn("inline-flex items-center gap-2 font-mono text-[10px] text-neutral-400 select-none", className)}>
      <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80 animate-pulse" />
      <span className="text-amber-400/90 font-bold">{coordinates}</span>
      {location && (
        <>
          <span className="text-neutral-600">•</span>
          <span className="text-neutral-300 uppercase tracking-wider">{location}</span>
        </>
      )}
    </div>
  );
}

export default CoordinateLabel;
