import React from "react";
import { cn } from "../../lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "surface" | "interactive";
  children: React.ReactNode;
}

export function Card({
  variant = "default",
  className,
  children,
  ...props
}: CardProps) {
  const base =
    "p-6 border transition-all duration-200";

  const variants = {
    default:
      "bg-[var(--color-bg-primary)] border-[var(--color-border)]",
    surface:
      "bg-[var(--color-surface)] border-[var(--color-border)]",
    interactive:
      "bg-[var(--color-bg-primary)] border-[var(--color-border)] hover:border-[var(--color-accent)] hover:bg-[var(--color-surface)] cursor-pointer",
  };

  return (
    <div className={cn(base, variants[variant], className)} {...props}>
      {children}
    </div>
  );
}
