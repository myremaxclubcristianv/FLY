import React from "react";
import { DataStatus } from "../../types/verification";
import { cn } from "../../lib/utils";

export interface DataStatusBadgeProps {
  status: DataStatus | string;
  showDot?: boolean;
  className?: string;
}

export function DataStatusBadge({
  status,
  showDot = true,
  className,
}: DataStatusBadgeProps) {
  const styles: Record<
    string,
    { label: string; bg: string; text: string; border: string; dotBg: string }
  > = {
    OFFICIAL_SOURCE: {
      label: "OFFICIAL SOURCE",
      bg: "bg-[color-mix(in_srgb,#5a9e7c_15%,transparent)]",
      text: "text-[#7cc49e]",
      border: "border-[#3d6e55]",
      dotBg: "bg-[#5a9e7c]",
    },
    VERIFIED: {
      label: "VERIFIED",
      bg: "bg-[color-mix(in_srgb,#5a9e7c_15%,transparent)]",
      text: "text-[#7cc49e]",
      border: "border-[#3d6e55]",
      dotBg: "bg-[#5a9e7c]",
    },
    AIR_CALCULATED: {
      label: "AIR CALCULATED",
      bg: "bg-[color-mix(in_srgb,#38bdf8_15%,transparent)]",
      text: "text-[#7dd3fc]",
      border: "border-[#0284c7]",
      dotBg: "bg-[#38bdf8]",
    },
    PUBLIC: {
      label: "PUBLIC DATA",
      bg: "bg-[color-mix(in_srgb,#8a9199_12%,transparent)]",
      text: "text-[#a7a9ac]",
      border: "border-[#292c2f]",
      dotBg: "bg-[#8a9199]",
    },
    INDICATIVE: {
      label: "INDICATIVE",
      bg: "bg-[color-mix(in_srgb,#8a9199_12%,transparent)]",
      text: "text-[#a7a9ac]",
      border: "border-[#292c2f]",
      dotBg: "bg-[#8a9199]",
    },
    REQUEST: {
      label: "REQUEST ONLY",
      bg: "bg-[color-mix(in_srgb,var(--color-accent)_15%,transparent)]",
      text: "text-[var(--color-accent)]",
      border: "border-[var(--color-accent-muted)]",
      dotBg: "bg-[var(--color-accent)]",
    },
    LIVE: {
      label: "LIVE AVAILABILITY",
      bg: "bg-[color-mix(in_srgb,#4aab77_15%,transparent)]",
      text: "text-[#5ed193]",
      border: "border-[#2e7a51]",
      dotBg: "bg-[#4aab77]",
    },
    STALE: {
      label: "STALE DATA",
      bg: "bg-[var(--color-surface)]",
      text: "text-[var(--color-text-muted)]",
      border: "border-[var(--color-border)]",
      dotBg: "bg-[var(--color-text-muted)]",
    },
    UNAVAILABLE: {
      label: "UNAVAILABLE",
      bg: "bg-[color-mix(in_srgb,#8c3f3f_15%,transparent)]",
      text: "text-[#d47272]",
      border: "border-[#612b2b]",
      dotBg: "bg-[#8c3f3f]",
    },
    LAST_VERIFIED: {
      label: "LAST VERIFIED",
      bg: "bg-[var(--color-surface)]",
      text: "text-[var(--color-text-secondary)]",
      border: "border-[var(--color-border)]",
      dotBg: "bg-[var(--color-text-muted)]",
    },
  };

  const style = styles[status] || styles.INDICATIVE;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-data font-medium tracking-wider uppercase border transition-colors",
        style.bg,
        style.text,
        style.border,
        className
      )}
      title={`Data Status: ${style.label}`}
    >
      {showDot && (
        <span
          className={cn("w-1.5 h-1.5 rounded-full inline-block", style.dotBg)}
          aria-hidden="true"
        />
      )}
      <span>{style.label}</span>
    </span>
  );
}
