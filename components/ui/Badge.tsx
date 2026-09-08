import React from "react";
import { cn } from "../../lib/utils";

export interface BadgeProps {
  variant?: "default" | "accent" | "subtle" | "outline";
  children: React.ReactNode;
  className?: string;
}

export function Badge({
  variant = "default",
  children,
  className,
}: BadgeProps) {
  const base =
    "inline-flex items-center px-2.5 py-0.5 text-[10px] font-data font-medium tracking-wider uppercase border transition-colors";

  const variants = {
    default:
      "bg-[var(--color-surface)] text-[var(--color-text-secondary)] border-[var(--color-border)]",
    accent:
      "bg-[color-mix(in_srgb,var(--color-accent)_15%,transparent)] text-[var(--color-accent)] border-[var(--color-accent-muted)]",
    subtle:
      "bg-[var(--color-bg-secondary)] text-[var(--color-text-muted)] border-[var(--color-border-subtle)]",
    outline:
      "bg-transparent text-[var(--color-text-primary)] border-[var(--color-border)]",
  };

  return (
    <span className={cn(base, variants[variant], className)}>{children}</span>
  );
}
