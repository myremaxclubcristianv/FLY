"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PRIMARY_CTA } from "../../constants/navigation";
import { Button } from "../ui/Button";
import { MobileNav } from "./MobileNav";
import { Container } from "./Container";
import { MegaMenu } from "./MegaMenu";
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
      <header className="sticky top-0 z-40 w-full glass-nav transition-all duration-300">
        <Container size="wide">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <span className="text-2xl font-light tracking-[0.25em] text-white font-mono group-hover:text-amber-400 transition-colors duration-200">
                AIR
              </span>
              <span className="hidden sm:inline-block text-[9px] font-mono text-neutral-400 border-l border-neutral-700/80 pl-3 tracking-widest uppercase">
                AVIATION ACCESS
              </span>
            </Link>

            {/* Desktop Mega Navigation */}
            <MegaMenu />

            {/* Right Action Trigger & Search */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="hidden sm:inline-flex items-center gap-2 px-3 py-2 text-xs font-mono text-neutral-300 hover:text-white bg-white/[0.04] border border-white/[0.1] hover:border-amber-400/50 rounded transition-all backdrop-blur-sm shadow-sm"
                title="Global Aviation Search (Cmd+K)"
                aria-label="Global Aviation Search (Cmd+K)"
              >
                <svg className="w-3.5 h-3.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>SEARCH</span>
                <kbd className="text-[9px] bg-neutral-900 px-1.5 py-0.5 border border-neutral-700 rounded text-neutral-400 font-mono">⌘K</kbd>
              </button>

              <Link
                href="/account"
                prefetch={false}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono text-amber-400 hover:text-amber-300 border border-amber-500/30 hover:border-amber-400/80 bg-amber-500/10 hover:bg-amber-500/20 rounded transition-all backdrop-blur-sm"
                title="My AIR Account & Missions"
              >
                <span>MY AIR</span>
              </Link>

              <div className="hidden lg:block">
                <Button size="md" variant="primary" asChild>
                  <Link href={PRIMARY_CTA.href} prefetch={false}>
                    {PRIMARY_CTA.label}
                  </Link>
                </Button>
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

