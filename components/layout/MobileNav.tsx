"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  MEGA_MENU_DATA,
  TOP_LEVEL_NAV_LINKS,
  PRIMARY_CTA,
} from "../../constants/navigation";
import { Button } from "../ui/Button";

interface MobileNavProps {
  onOpenSearch?: () => void;
}

export function MobileNav({ onOpenSearch }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>("FLY");

  // Close mobile nav on escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent background scrolling when mobile nav is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggleSection = (title: string) => {
    setExpandedSection((prev) => (prev === title ? null : title));
  };

  const handleSearchClick = () => {
    setIsOpen(false);
    if (onOpenSearch) onOpenSearch();
  };

  return (
    <>
      {/* Mobile & Tablet Header Menu Trigger (Visible on lg:hidden) */}
      <div className="flex items-center gap-2 lg:hidden">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close AIR navigation menu" : "Open AIR navigation menu"}
          className="group inline-flex items-center gap-2 min-h-[44px] px-3.5 py-2 text-xs font-mono font-bold tracking-wider text-white bg-neutral-900 hover:bg-neutral-800 border border-amber-500/50 hover:border-amber-400 rounded-xl backdrop-blur-md shadow-[0_2px_12px_rgba(245,158,11,0.15)] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 transition-all duration-200 active:scale-95 cursor-pointer"
        >
          <svg
            className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
          <span className="text-amber-400 group-hover:text-amber-300 font-mono tracking-widest text-xs uppercase font-bold">
            {isOpen ? "CLOSE" : "MENU"}
          </span>
        </button>
      </div>

      {/* Slide-out Glass Overlay Drawer (Single Shared Source with Desktop) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] lg:hidden flex flex-col bg-[#070809]/98 backdrop-blur-3xl animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="AIR Complete Mobile Navigation"
        >
          {/* Top Bar inside Overlay */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.1] bg-black/60 shrink-0">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="text-xl font-light tracking-[0.2em] text-white font-mono flex items-center gap-2"
            >
              <span className="text-white font-bold">AIR</span>
              <span className="text-[9px] text-amber-400 border border-amber-400/50 px-2 py-0.5 rounded tracking-widest font-bold bg-amber-500/10">
                NAVIGATION
              </span>
            </Link>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSearchClick}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-mono text-neutral-200 bg-white/[0.08] hover:bg-white/[0.15] border border-white/15 rounded-xl hover:text-amber-400 transition-colors"
                aria-label="Search AIR"
              >
                <svg className="w-3.5 h-3.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>SEARCH</span>
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
                className="flex items-center gap-1 px-3 py-2 text-neutral-200 hover:text-amber-400 rounded-xl bg-neutral-900 border border-white/20 hover:border-amber-400 font-mono text-xs font-bold transition-colors"
              >
                <svg
                  className="w-4 h-4 text-amber-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                <span>CLOSE</span>
              </button>
            </div>
          </div>

          {/* Account & Quick Hub Bar */}
          <div className="grid grid-cols-2 gap-2 px-5 py-3 border-b border-white/[0.08] bg-neutral-900/60 text-xs font-mono shrink-0">
            <Link
              href="/account"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-400 hover:bg-amber-500/25 transition-colors font-bold"
            >
              <span>👤 MY AIR ACCOUNT</span>
            </Link>
            <Link
              href="/baneasa"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white/[0.05] border border-white/15 text-neutral-200 hover:text-white transition-colors font-bold"
            >
              <span>🛬 BĂNEASA LRBS</span>
            </Link>
          </div>

          {/* Navigation Accordion Sections (Shared Exact Model with Desktop MegaMenu) */}
          <nav
            className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-3.5 scroll-smooth"
            style={{ WebkitOverflowScrolling: "touch" }}
            aria-label="AIR Services & Destinations"
          >
            {MEGA_MENU_DATA.map((sec) => {
              const isExpanded = expandedSection === sec.title;
              return (
                <div
                  key={sec.title}
                  className="border border-white/[0.1] rounded-2xl overflow-hidden bg-neutral-900/50 shadow-md"
                >
                  <button
                    type="button"
                    onClick={() => toggleSection(sec.title)}
                    className="w-full flex items-center justify-between p-4 text-left text-sm font-mono tracking-wider text-white hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-neutral-100">{sec.title}</span>
                      <span className="text-[10px] font-mono text-neutral-500">
                        ({sec.columns.reduce((acc, c) => acc + c.items.length, 0)} services)
                      </span>
                    </div>
                    <span className="text-amber-400 text-sm font-mono font-bold">
                      {isExpanded ? "−" : "+"}
                    </span>
                  </button>

                  {isExpanded && (
                    <div className="px-4 pb-4 pt-1 flex flex-col gap-4 border-t border-white/[0.08] bg-neutral-950/40 animate-in fade-in duration-150">
                      {sec.columns.map((col, colIdx) => (
                        <div key={colIdx} className="flex flex-col gap-1.5">
                          <span className="text-[9px] font-mono text-amber-400/90 uppercase tracking-widest font-bold">
                            {col.heading}
                          </span>
                          <div className="flex flex-col gap-1">
                            {col.items.map((item) => (
                              <Link
                                key={item.label}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className="flex items-start justify-between py-2 px-2.5 rounded-xl text-xs text-neutral-200 hover:text-white hover:bg-white/[0.08] transition-colors font-sans group"
                              >
                                <div className="flex flex-col gap-0.5">
                                  <span className="font-medium text-white group-hover:text-amber-400 transition-colors">
                                    {item.label}
                                  </span>
                                  {item.description && (
                                    <span className="text-[10px] text-neutral-400 font-sans">
                                      {item.description}
                                    </span>
                                  )}
                                </div>
                                {item.badge && (
                                  <span className="text-[8px] font-mono px-1.5 py-0.5 bg-neutral-900 border border-amber-500/40 text-amber-400 rounded font-bold shrink-0 mt-0.5 ml-2">
                                    {item.badge}
                                  </span>
                                )}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Direct Top-Level Links (Matching Desktop Header) */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              {TOP_LEVEL_NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="p-3 text-center rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono text-neutral-300 hover:text-amber-400 transition-colors font-bold"
                >
                  {link.label} →
                </Link>
              ))}
            </div>
          </nav>

          {/* Bottom CTA in Drawer */}
          <div className="p-5 border-t border-white/[0.1] bg-black/80 backdrop-blur-xl shrink-0 safe-area-bottom">
            <Button fullWidth variant="primary" size="lg" asChild onClick={() => setIsOpen(false)}>
              <Link href={PRIMARY_CTA.href}>
                {PRIMARY_CTA.label} →
              </Link>
            </Button>
            <p className="text-[9px] font-mono text-center text-neutral-500 mt-2 tracking-widest uppercase">
              AIR AVIATION ACCESS // BUCHAREST BĂNEASA (LRBS)
            </p>
          </div>
        </div>
      )}
    </>
  );
}
