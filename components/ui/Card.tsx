import React from "react";
import { cn } from "../../lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "surface" | "interactive" | "elevated" | "instrument";
  children: React.ReactNode;
}

export function Card({
  variant = "default",
  className,
  children,
  ...props
}: CardProps) {
  const base = "p-6 transition-all duration-300";

  const variants = {
    default: "glass-surface rounded-2xl",
    surface: "glass-surface rounded-2xl",
    elevated: "glass-elevated rounded-2xl",
    interactive: "glass-surface glass-surface-hover rounded-2xl cursor-pointer",
    instrument: "glass-instrument rounded-xl",
  };

  return (
    <div className={cn(base, variants[variant], className)} {...props}>
      {children}
    </div>
  );
}

