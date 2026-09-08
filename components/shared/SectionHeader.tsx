import React from "react";
import { cn } from "../../lib/utils";

export interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  titleAs?: "h1" | "h2" | "h3";
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  titleAs: Component = "h2",
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 max-w-3xl",
        align === "center" && "items-center text-center mx-auto",
        className
      )}
    >
      {eyebrow && (
        <span className="text-[11px] font-data text-[var(--color-accent)] tracking-widest uppercase">
          {eyebrow}
        </span>
      )}
      <Component className="text-2xl md:text-3xl lg:text-4xl font-light text-[var(--color-text-primary)] tracking-tight">
        {title}
      </Component>
      {description && (
        <p className="text-sm md:text-base text-[var(--color-text-secondary)] font-normal leading-relaxed text-balance">
          {description}
        </p>
      )}
    </div>
  );
}
