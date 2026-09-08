"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MAIN_NAV_ITEMS, PRIMARY_CTA } from "../../constants/navigation";
import { Button } from "../ui/Button";
import { MobileNav } from "./MobileNav";
import { Container } from "./Container";
import { GlobalSearchModal } from "../search/GlobalSearchModal";

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[var(--color-bg-primary)]/95 backdrop-blur-md border-b border-[var(--color-border)]">
        <Container size="wide">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus)]"
            >
              <span className="text-2xl font-light tracking-[0.25em] text-[var(--color-text-primary)] font-data group-hover:text-[var(--color-accent)] transition-colors duration-200">
                AIR
              </span>
              <span className="hidden sm:inline-block text-[9px] font-data text-[var(--color-text-muted)] border-l border-[var(--color-border)] pl-3 tracking-widest uppercase">
                AVIATION ACCESS
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav
              className="hidden lg:flex items-center gap-8"
              aria-label="Main Navigation"
            >
              {MAIN_NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-xs font-data tracking-widest text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors duration-150 py-2 border-b border-transparent hover:border-[var(--color-accent)]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right Action Trigger & Search */}
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="hidden sm:inline-flex items-center gap-2 px-3 py-2 text-xs font-data text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-colors"
                title="Global Aviation Search (Cmd+K)"
              >
                <svg className="w-4 h-4 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>SEARCH</span>
                <kbd className="text-[9px] bg-[var(--color-surface)] px-1.5 py-0.5 border border-[var(--color-border)] text-[var(--color-text-muted)]">⌘K</kbd>
              </button>

              <div className="hidden lg:block">
                <Link href={PRIMARY_CTA.href}>
                  <Button size="md" variant="primary">
                    {PRIMARY_CTA.label}
                  </Button>
                </Link>
              </div>

              {/* Mobile Navigation Drawer Trigger */}
              <MobileNav />
            </div>
          </div>
        </Container>
      </header>

      {/* Unified Search Modal */}
      <GlobalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
