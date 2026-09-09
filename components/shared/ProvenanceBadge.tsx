import React from "react";
import { DataStatus, VerificationStatus } from "../../types/verification";

interface ProvenanceBadgeProps {
  status: DataStatus | VerificationStatus;
  sourceName?: string;
  sourceUrl?: string;
  className?: string;
  showSource?: boolean;
}

export function ProvenanceBadge({
  status,
  sourceName,
  sourceUrl,
  className = "",
  showSource = false,
}: ProvenanceBadgeProps) {
  let label = "INDICATIVE";
  let badgeStyle = "bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-secondary)]";
  let dotColor = "bg-amber-400";

  switch (status) {
    case "OFFICIAL_SOURCE":
      label = "OFFICIAL SOURCE";
      badgeStyle = "bg-emerald-950/40 border-emerald-800/60 text-emerald-300";
      dotColor = "bg-emerald-400";
      break;
    case "VERIFIED":
      label = "VERIFIED";
      badgeStyle = "bg-emerald-950/40 border-emerald-800/60 text-emerald-300";
      dotColor = "bg-emerald-400";
      break;
    case "AIR_CALCULATED":
      label = "AIR CALCULATED";
      badgeStyle = "bg-sky-950/40 border-sky-800/60 text-sky-300";
      dotColor = "bg-sky-400";
      break;
    case "PUBLIC":
      label = "PUBLIC DATA";
      badgeStyle = "bg-zinc-900 border-zinc-700 text-zinc-300";
      dotColor = "bg-zinc-400";
      break;
    case "INDICATIVE":
      label = "INDICATIVE";
      badgeStyle = "bg-amber-950/30 border-amber-800/50 text-amber-300";
      dotColor = "bg-amber-400";
      break;
    case "REQUEST":
      label = "REQUEST";
      badgeStyle = "bg-rose-950/30 border-rose-800/50 text-rose-300";
      dotColor = "bg-rose-400";
      break;
    case "STALE":
      label = "STALE DATA";
      badgeStyle = "bg-zinc-950 border-zinc-800 text-zinc-500";
      dotColor = "bg-zinc-600";
      break;
  }

  return (
    <div className={`inline-flex items-center gap-2 text-[10px] font-data tracking-wider uppercase px-2.5 py-1 rounded border ${badgeStyle} ${className}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor} animate-pulse`} />
      <span>{label}</span>
      {showSource && sourceName && (
        <>
          <span className="text-[var(--color-border-subtle)]">•</span>
          {sourceUrl ? (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline opacity-80 hover:opacity-100 transition-opacity"
            >
              SRC: {sourceName} ↗
            </a>
          ) : (
            <span className="opacity-80">SRC: {sourceName}</span>
          )}
        </>
      )}
    </div>
  );
}
