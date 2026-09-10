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
            className="text-[10px] font-mono text-neutral-400 tracking-wider uppercase"
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
            "w-full bg-neutral-950/70 text-white border border-white/[0.12] rounded-lg px-4 py-3 text-sm font-sans backdrop-blur-md transition-all duration-200 focus:border-amber-400/90 focus:bg-neutral-900/80 focus:shadow-[0_0_15px_rgba(245,158,11,0.15)] focus:outline-none placeholder:text-neutral-500",
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
            className="text-[11px] text-neutral-400 font-sans"
          >
            {helperText}
          </span>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";

