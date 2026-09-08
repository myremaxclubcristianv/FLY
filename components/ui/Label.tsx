import React from "react";
import { cn } from "../../lib/utils";

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  variant?: "data" | "standard";
  children: React.ReactNode;
}

export function Label({
  variant = "data",
  className,
  children,
  ...props
}: LabelProps) {
  return (
    <label
      className={cn(
        variant === "data"
          ? "text-[11px] font-data text-[var(--color-text-secondary)] tracking-widest uppercase"
          : "text-sm font-medium text-[var(--color-text-primary)]",
        className
      )}
      {...props}
    >
      {children}
    </label>
  );
}
