"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MAIN_NAV_ITEMS, PRIMARY_CTA } from "../../constants/navigation";
import { Button } from "../ui/Button";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  // Close mobile nav on escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent scrolling when mobile nav is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  return (
    <>
      {/* Mobile Top Header Toggle (Visible only on mobile) */}
      <div className="flex items-center gap-2 lg:hidden">
        <Button size="sm" variant="primary" asChild className="hidden sm:inline-flex">
          <Link href={PRIMARY_CTA.href}>
            {PRIMARY_CTA.label}
          </Link>
        </Button>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          className="p-2.5 text-neutral-200 hover:text-amber-400 bg-white/[0.04] border border-white/[0.08] rounded-lg backdrop-blur-md focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Slide-out Glass Overlay Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col bg-neutral-950/95 backdrop-blur-2xl animate-in fade-in duration-200">
          {/* Top Bar inside Overlay */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.08]">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="text-xl font-light tracking-[0.2em] text-white font-mono"
            >
              AIR <span className="text-[10px] text-amber-400 border border-amber-400/40 px-1.5 py-0.5 rounded ml-2">ACCESS</span>
            </Link>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              className="p-2 text-neutral-300 hover:text-amber-400 rounded-lg bg-white/[0.05]"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-4" aria-label="Mobile Navigation">
            {MAIN_NAV_ITEMS.map((item, idx) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between py-3 px-4 rounded-xl text-base font-light tracking-wider text-white hover:text-amber-400 bg-white/[0.03] border border-white/[0.06] hover:border-amber-400/30 transition-all font-sans"
              >
                <span>{item.label}</span>
                <span className="text-[10px] font-mono text-amber-400/80 font-bold">
                  0{idx + 1}
                </span>
              </Link>
            ))}
          </nav>

          {/* Bottom CTA in Drawer */}
          <div className="p-6 border-t border-white/[0.08] glass-elevated">
            <Button fullWidth variant="primary" size="lg" asChild onClick={() => setIsOpen(false)}>
              <Link href={PRIMARY_CTA.href}>
                {PRIMARY_CTA.label} →
              </Link>
            </Button>
            <p className="text-[10px] font-mono text-center text-neutral-400 mt-3 tracking-wider uppercase">
              THE EASIEST WAY TO FLY // BUCHAREST BĂNEASA
            </p>
          </div>
        </div>
      )}

      {/* Persistent Sticky Mobile Bottom CTA Bar (visible on viewports < 768px) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 p-3 bg-neutral-950/85 backdrop-blur-xl border-t border-white/[0.1] md:hidden shadow-[0_-4px_25px_rgba(0,0,0,0.6)]">
        <Button fullWidth size="md" variant="primary" asChild>
          <Link href={PRIMARY_CTA.href}>
            {PRIMARY_CTA.label} →
          </Link>
        </Button>
      </div>
    </>
  );
}

