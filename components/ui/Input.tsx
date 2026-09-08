import React from "react";
import { cn } from "../../lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-[11px] font-data text-[var(--color-text-secondary)] tracking-wider"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
          }
          className={cn(
            "w-full bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] border border-[var(--color-border)] px-4 py-3 text-sm transition-colors duration-150 focus:border-[var(--color-accent)] focus:outline-none placeholder:text-[var(--color-text-muted)]",
            error && "border-red-500/80 focus:border-red-500",
            className
          )}
          {...props}
        />
        {error ? (
          <span id={`${inputId}-error`} className="text-xs text-red-400 mt-0.5 font-sans">
            {error}
          </span>
        ) : helperText ? (
          <span
            id={`${inputId}-helper`}
            className="text-[11px] text-[var(--color-text-muted)] font-sans"
          >
            {helperText}
          </span>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";
