import React from "react";
import { cn } from "../../lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "text";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      fullWidth = false,
      className,
      children,
      disabled,
      type = "button",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer tracking-wider text-xs uppercase font-data";

    const variants = {
      primary:
        "bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] hover:bg-white active:scale-[0.99] border border-[var(--color-text-primary)]",
      secondary:
        "bg-[var(--color-surface)] text-[var(--color-text-primary)] hover:bg-[var(--color-surface-elevated)] border border-[var(--color-border)] hover:border-[var(--color-text-secondary)]",
      outline:
        "bg-transparent text-[var(--color-text-primary)] border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]",
      text: "bg-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] p-0 underline-offset-4 hover:underline",
    };

    const sizes = {
      sm: "px-3 py-2 text-[10px]",
      md: "px-5 py-3 text-xs",
      lg: "px-7 py-4 text-xs tracking-widest",
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={cn(
          baseStyles,
          variants[variant],
          variant !== "text" && sizes[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
