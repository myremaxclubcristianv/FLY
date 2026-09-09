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
    sm: "text-lg font-mono tracking-widest",
    md: "text-3xl font-mono tracking-widest font-bold",
    lg: "text-5xl font-mono tracking-widest font-extrabold",
    xl: "text-7xl sm:text-8xl font-mono tracking-widest font-black",
  };

  return (
    <div className={cn("inline-flex flex-col select-none", className)}>
      <span className={cn("text-amber-400 leading-none drop-shadow-md", sizeClasses[size])}>
        {code}
      </span>
      {name && (
        <span className="text-[10px] font-mono text-neutral-400 tracking-wider uppercase mt-1">
          {name}
        </span>
      )}
    </div>
  );
}

export default AirportCode;
