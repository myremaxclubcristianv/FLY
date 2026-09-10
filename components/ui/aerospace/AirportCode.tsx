"use client";

import React from "react";
import { cn } from "../../../lib/utils";

export interface AirportCodeProps {
  code: string;
  name?: string;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export function AirportCode({ code, name, className, size = "md" }: AirportCodeProps) {
  const sizeClasses = {
    sm: "text-lg font-data tracking-widest",
    md: "text-3xl font-data tracking-widest font-bold",
    lg: "text-5xl font-data tracking-widest font-extrabold",
    xl: "text-7xl sm:text-8xl font-data tracking-widest font-black",
  };

  return (
    <div className={cn("inline-flex flex-col select-none", className)}>
      <span className={cn("text-amber-400 leading-none drop-shadow-md", sizeClasses[size])}>
        {code}
      </span>
      {name && (
        <span className="text-[10px] font-data text-[var(--color-text-secondary)] tracking-wider uppercase mt-1.5">
          {name}
        </span>
      )}
    </div>
  );
}

export default AirportCode;
