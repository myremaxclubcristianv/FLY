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
      <div className="flex items-center gap-3 lg:hidden">
        <Link
          href={PRIMARY_CTA.href}
          className="hidden sm:inline-flex"
        >
          <Button size="sm" variant="primary">
            {PRIMARY_CTA.label}
          </Button>
        </Link>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          className="p-2 text-[var(--color-text-primary)] hover:text-[var(--color-accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)]"
        >
          <svg
            className="w-6 h-6"
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

      {/* Slide-out Overlay Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col bg-[var(--color-bg-primary)] border-b border-[var(--color-border)] animate-fadeIn">
          {/* Top Bar inside Overlay */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--color-border)]">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="text-xl font-light tracking-widest text-[var(--color-text-primary)] font-data"
            >
              AIR
            </Link>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              className="p-2 text-[var(--color-text-primary)] hover:text-[var(--color-accent)]"
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
          <nav className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-6" aria-label="Mobile Navigation">
            {MAIN_NAV_ITEMS.map((item, idx) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between py-2 text-lg font-light tracking-wider text-[var(--color-text-primary)] hover:text-[var(--color-accent)] border-b border-[var(--color-border-subtle)]"
              >
                <span>{item.label}</span>
                <span className="text-xs font-data text-[var(--color-text-muted)]">
                  0{idx + 1}
                </span>
              </Link>
            ))}
          </nav>

          {/* Bottom CTA in Drawer */}
          <div className="p-6 border-t border-[var(--color-border)] bg-[var(--color-surface)]">
            <Link href={PRIMARY_CTA.href} onClick={() => setIsOpen(false)}>
              <Button fullWidth variant="primary" size="lg">
                {PRIMARY_CTA.label}
              </Button>
            </Link>
            <p className="text-[10px] font-data text-center text-[var(--color-text-muted)] mt-3">
              THE EASIEST WAY TO FLY // BUCHAREST
            </p>
          </div>
        </div>
      )}

      {/* Persistent Sticky Mobile Bottom CTA Bar (visible on viewports < 768px) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 p-3 bg-[var(--color-bg-primary)]/90 backdrop-blur-md border-t border-[var(--color-border)] md:hidden">
        <Link href={PRIMARY_CTA.href} className="w-full block">
          <Button fullWidth size="md" variant="primary">
            {PRIMARY_CTA.label}
          </Button>
        </Link>
      </div>
    </>
  );
}
