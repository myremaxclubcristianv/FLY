import React from "react";
import { cn } from "../../lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "text" | "cta";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  asChild?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      fullWidth = false,
      asChild = false,
      className,
      children,
      disabled,
      type = "button",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer tracking-wider text-xs uppercase font-data select-none";

    const variants = {
      primary:
        "bg-amber-400 text-neutral-950 hover:bg-amber-300 active:scale-[0.99] border border-amber-400 font-bold shadow-[0_0_15px_rgba(245,158,11,0.25)] hover:shadow-[0_0_20px_rgba(245,158,11,0.4)]",
      cta:
        "bg-amber-400 text-neutral-950 hover:bg-amber-300 active:scale-[0.99] border border-amber-400 font-bold shadow-[0_0_15px_rgba(245,158,11,0.25)] hover:shadow-[0_0_20px_rgba(245,158,11,0.4)]",
      secondary:
        "bg-white/[0.06] text-white hover:bg-white/[0.1] border border-white/[0.12] hover:border-amber-400/50 backdrop-blur-md",
      outline:
        "bg-transparent text-neutral-200 border border-neutral-700/80 hover:border-amber-400/80 hover:text-amber-400 backdrop-blur-sm",
      text: "bg-transparent text-neutral-400 hover:text-white p-0 underline-offset-4 hover:underline",
    };

    const sizes = {
      sm: "px-3.5 py-2 text-[10px] rounded-sm",
      md: "px-5 py-2.5 text-xs rounded",
      lg: "px-7 py-3.5 text-xs tracking-widest rounded-md",
    };

    const classes = cn(
      baseStyles,
      variants[variant],
      variant !== "text" && sizes[size],
      fullWidth && "w-full",
      className
    );

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<{ className?: string }>, {
        className: cn(classes, (children as React.ReactElement<{ className?: string }>).props.className),
        ...props,
      });
    }

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={classes}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

