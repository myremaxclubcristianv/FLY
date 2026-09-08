import React from "react";
import { cn } from "../../lib/utils";

export interface PlaceholderImageProps {
  title?: string;
  code?: string;
  aspectRatio?: "square" | "video" | "wide" | "auto";
  className?: string;
}

export function PlaceholderImage({
  title,
  code = "AIR // VECTOR",
  aspectRatio = "video",
  className,
}: PlaceholderImageProps) {
  const aspectClasses = {
    square: "aspect-square",
    video: "aspect-video",
    wide: "aspect-[21/9]",
    auto: "h-full min-h-[220px]",
  };

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-[var(--color-surface)] border border-[var(--color-border)] flex flex-col justify-between p-6 select-none group",
        aspectClasses[aspectRatio],
        className
      )}
    >
      {/* Abstract Background SVG Mesh / Visual Geometry */}
      <svg
        className="absolute inset-0 w-full h-full opacity-30 transition-opacity duration-500 group-hover:opacity-45"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <radialGradient
            id="grad-glow"
            cx="50%"
            cy="50%"
            r="50%"
            fx="70%"
            fy="30%"
          >
            <stop offset="0%" stopColor="#5a8fa8" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#090a0b" stopOpacity="0" />
          </radialGradient>
          <pattern
            id="grid-pattern"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 32 0 L 0 0 0 32"
              fill="none"
              stroke="#292c2f"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        <circle cx="65%" cy="35%" r="45%" fill="url(#grad-glow)" />

        {/* Vector Route Flight Paths & Horizon lines */}
        <path
          d="M -20 180 Q 200 40 450 120 T 900 20"
          fill="none"
          stroke="#5a8fa8"
          strokeWidth="1"
          strokeDasharray="4 4"
          className="route-dash-animation opacity-60"
        />
        <path
          d="M 50 250 L 850 50"
          fill="none"
          stroke="#292c2f"
          strokeWidth="1"
        />

        {/* Tactical Crosshairs */}
        <circle cx="20%" cy="30%" r="3" fill="#5a8fa8" opacity="0.6" />
        <circle cx="80%" cy="70%" r="3" fill="#5a8fa8" opacity="0.6" />
        <line
          x1="20%"
          y1="25%"
          x2="20%"
          y2="35%"
          stroke="#5a8fa8"
          strokeWidth="0.75"
          opacity="0.6"
        />
        <line
          x1="18%"
          y1="30%"
          x2="22%"
          y2="30%"
          stroke="#5a8fa8"
          strokeWidth="0.75"
          opacity="0.6"
        />
      </svg>

      {/* Top Bar Label */}
      <div className="relative z-10 flex items-center justify-between w-full">
        <span className="text-[10px] font-data text-[var(--color-accent)] tracking-widest uppercase">
          {code}
        </span>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
          <span className="text-[9px] font-data text-[var(--color-text-muted)] tracking-wider">
            VECTOR GEOMETRY
          </span>
        </div>
      </div>

      {/* Center/Bottom Content */}
      <div className="relative z-10 mt-auto pt-8">
        {title && (
          <h3 className="text-base font-light text-[var(--color-text-primary)] tracking-wide group-hover:text-[var(--color-accent)] transition-colors duration-200">
            {title}
          </h3>
        )}
      </div>

      {/* Decorative Corner Marks */}
      <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-[var(--color-text-muted)] opacity-40 pointer-events-none" />
      <div className="absolute top-2 right-2 w-1.5 h-1.5 border-t border-r border-[var(--color-text-muted)] opacity-40 pointer-events-none" />
      <div className="absolute bottom-2 left-2 w-1.5 h-1.5 border-b border-l border-[var(--color-text-muted)] opacity-40 pointer-events-none" />
      <div className="absolute bottom-2 right-2 w-1.5 h-1.5 border-b border-r border-[var(--color-text-muted)] opacity-40 pointer-events-none" />
    </div>
  );
}
