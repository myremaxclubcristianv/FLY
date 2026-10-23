"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import {
  MEGA_MENU_DATA,
  TOP_LEVEL_NAV_LINKS,
  PRIMARY_CTA,
  FOOTER_SECTIONS,
} from "../../constants/navigation";
import { Button } from "../ui/Button";
import { LanguageSwitcher } from "./LanguageSwitcher";


interface MobileNavProps {
  onOpenSearch?: () => void;
}

export function MobileNav({ onOpenSearch }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    FLY: true,
    MARKET: true,
    AVIATION: true,
    LEARN: true,
    JOURNAL: true,
  });

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Body scroll lock while mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [isOpen]);

  const toggleSection = (title: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setExpandedSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const handleLinkClick = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleSearchClick = useCallback(() => {
    setIsOpen(false);
    if (onOpenSearch) onOpenSearch();
  }, [onOpenSearch]);

  const handleContactClick = useCallback(() => {
    setIsOpen(false);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("air:open-contact"));
    }
  }, []);

  const scrollToSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target && scrollContainerRef.current) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const legalSection = FOOTER_SECTIONS.find((s) => s.title.includes("LEGAL"));

  // Quick Direct Access Grid items for high-priority desktop destinations
  const CORE_DIRECT_DESTINATIONS = [
    { label: "FLIGHT PLANNER", href: "/plan", badge: "CORE", icon: "✈" },
    { label: "AIRCRAFT FLEET", href: "/aircraft", badge: "FLEET", icon: "🛩" },
    { label: "AIRCRAFT FOR SALE", href: "/aircraft-for-sale", badge: "MARKET", icon: "🏷" },
    { label: "COMPARE MODELS", href: "/aircraft/compare", badge: "COMPARE", icon: "⚖" },
    { label: "ROUTES EXPLORER", href: "/routes", badge: "VECTORS", icon: "🧭" },
    { label: "DESTINATIONS", href: "/destinations", badge: "AIRPORTS", icon: "📍" },
    { label: "BĂNEASA LRBS HUB", href: "/baneasa", badge: "VIP FBO", icon: "🛬" },
    { label: "HELIPORTS DIRECTORY", href: "/heliports", badge: "HELIPAD", icon: "🚁" },
    { label: "BUSINESS AVIATION", href: "/business", badge: "CORP", icon: "🏢" },
    { label: "AIRCRAFT OWNERSHIP", href: "/aircraft/ownership", badge: "MATRIX", icon: "🔑" },
    { label: "AVIATION INSURANCE", href: "/aviation/insurance", badge: "RISK", icon: "🛡" },
    { label: "CONTACT DESK", href: "/contact", badge: "DIRECT", icon: "📞" },
    { label: "EXPERIENCES", href: "/experiences", badge: "SCENIC", icon: "🍷" },
    { label: "GIFT A FLIGHT", href: "/gift", badge: "GIFT", icon: "🎁" },
    { label: "PILOT GUIDE", href: "/aviation/learn/pilot-guide", badge: "EASA", icon: "🎓" },
    { label: "ROMANIA FROM ABOVE", href: "/romania-from-above", badge: "AERIAL", icon: "🇷🇴" },
    { label: "AVIATION DIRECTORY", href: "/aviation", badge: "INDEX", icon: "🏛" },
    { label: "AVIATION JOURNAL", href: "/journal", badge: "ARTICLES", icon: "📰" },
  ];

  const modalContent = isOpen && mounted ? (
    <div
      id="mobile-nav-drawer"
      className="fixed inset-0 z-[99999] w-screen h-[100dvh] max-h-[100dvh] flex flex-col bg-[#050607]/98 backdrop-blur-3xl text-white animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="AIR Complete Mobile Navigation Platform"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100vw",
        height: "100dvh",
      }}
    >
      {/* Top Bar: Wordmark + Language Switcher + High-Contrast Close Button */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-white/[0.08] bg-black/90 shrink-0 pt-[max(0.875rem,env(safe-area-inset-top))]">
        <Link
          href="/"
          onClick={handleLinkClick}
          className="flex items-center gap-2.5 py-1 focus:outline-none"
        >
          <span className="text-xl font-light tracking-[0.25em] text-white font-mono font-bold">
            AIR
          </span>
          <span className="text-[9px] font-mono text-amber-400 border border-amber-400/50 px-2 py-0.5 rounded tracking-widest font-bold bg-amber-500/10">
            BY CRISTIAN VĂDUVA
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />

          <button
            type="button"
            id="mobile-nav-close-btn"
            onClick={() => setIsOpen(false)}
            aria-label="Close navigation menu"
            className="flex items-center gap-2 min-h-[44px] px-3.5 py-2 text-neutral-200 hover:text-amber-400 rounded-xl bg-neutral-900 border border-white/20 hover:border-amber-400 font-mono text-xs font-bold transition-all active:scale-95 cursor-pointer"
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

      {/* Quick Search Bar Trigger */}
      <div className="px-4 sm:px-6 py-3 border-b border-white/[0.06] bg-neutral-950/70 shrink-0">
        <button
          type="button"
          id="mobile-nav-search-btn"
          onClick={handleSearchClick}
          className="w-full flex items-center justify-between min-h-[46px] px-3.5 py-2.5 text-xs font-mono text-neutral-400 bg-neutral-900/80 hover:bg-neutral-800/90 border border-white/10 hover:border-amber-400/50 rounded-xl transition-all cursor-pointer group shadow-sm"
          aria-label="Search AIR Missions, Routes and Fleet"
        >
          <div className="flex items-center gap-2.5 text-neutral-300 group-hover:text-white">
            <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>Search missions, routes, aircraft...</span>
          </div>
          <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/60 border border-neutral-700 text-neutral-400 group-hover:text-amber-400">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Utility Shortcuts: Account & Băneasa Hub */}
      <div className="grid grid-cols-2 gap-2 px-4 sm:px-6 py-2.5 border-b border-white/[0.06] bg-neutral-900/40 text-xs font-mono shrink-0">
        <Link
          href="/account"
          id="mobile-nav-account-link"
          onClick={handleLinkClick}
          className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 transition-colors font-bold min-h-[44px]"
        >
          <span>👤 MY AIR</span>
        </Link>
        <Link
          href="/baneasa"
          id="mobile-nav-baneasa-link"
          onClick={handleLinkClick}
          className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-neutral-200 hover:text-white transition-colors font-bold min-h-[44px]"
        >
          <span>🛬 BĂNEASA LRBS</span>
        </Link>
      </div>

      {/* Sticky Category Quick Jump Strip */}
      <div className="flex items-center gap-1.5 px-4 sm:px-6 py-2 overflow-x-auto border-b border-white/[0.08] bg-neutral-950/90 no-scrollbar shrink-0">
        <button
          type="button"
          onClick={() => scrollToSection(`nav-sec-direct`)}
          className="px-2.5 py-1 text-[11px] font-mono font-bold tracking-wider rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/40 transition-all shrink-0 uppercase cursor-pointer"
        >
          ★ QUICK ACCESS
        </button>
        {MEGA_MENU_DATA.map((sec) => (
          <button
            key={sec.title}
            type="button"
            onClick={() => scrollToSection(`nav-sec-${sec.title.toLowerCase()}`)}
            className="px-2.5 py-1 text-[11px] font-mono font-bold tracking-wider rounded-lg bg-white/[0.04] hover:bg-amber-500/20 text-neutral-300 hover:text-amber-400 border border-white/10 hover:border-amber-400/40 transition-all shrink-0 uppercase cursor-pointer"
          >
            {sec.title}
          </button>
        ))}
        <button
          type="button"
          onClick={() => scrollToSection(`nav-sec-quick-links`)}
          className="px-2.5 py-1 text-[11px] font-mono font-bold tracking-wider rounded-lg bg-white/[0.04] hover:bg-amber-500/20 text-neutral-300 hover:text-amber-400 border border-white/10 hover:border-amber-400/40 transition-all shrink-0 uppercase cursor-pointer"
        >
          ROUTES
        </button>
        {legalSection && (
          <button
            type="button"
            onClick={() => scrollToSection(`nav-sec-legal`)}
            className="px-2.5 py-1 text-[11px] font-mono font-bold tracking-wider rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-neutral-400 hover:text-white border border-white/10 transition-all shrink-0 uppercase cursor-pointer"
          >
            LEGAL
          </button>
        )}
      </div>

      {/* Master Scrollable Navigation Directory (Occupies Entire Viewport) */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 flex flex-col gap-6 scroll-smooth overscroll-contain"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {/* Direct Quick Access Grid (Immediate 1-Tap Navigation to Major Destinations) */}
        <section
          id="nav-sec-direct"
          className="border border-amber-500/30 rounded-2xl p-4 bg-gradient-to-b from-neutral-900/80 to-neutral-950/90 backdrop-blur-md shadow-md scroll-mt-3"
        >
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-amber-500/20">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="font-mono text-xs font-bold tracking-widest text-amber-400 uppercase">
                DIRECT ESSENTIALS
              </span>
            </div>
            <span className="text-[10px] font-mono text-neutral-400 bg-black/60 px-2 py-0.5 rounded border border-white/10">
              1-TAP JUMP
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {CORE_DIRECT_DESTINATIONS.map((dest) => (
              <Link
                key={dest.label}
                href={dest.href}
                onClick={handleLinkClick}
                className="flex items-center justify-between min-h-[46px] p-2.5 rounded-xl bg-white/[0.03] hover:bg-amber-500/20 border border-white/[0.08] hover:border-amber-400/50 transition-all group active:scale-[0.98]"
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <span className="text-xs">{dest.icon}</span>
                  <span className="font-mono text-[11px] font-bold text-neutral-200 group-hover:text-amber-400 truncate">
                    {dest.label}
                  </span>
                </div>
                <span className="text-[8px] font-mono px-1 py-0.5 bg-neutral-900 text-amber-400 border border-amber-500/30 rounded shrink-0">
                  {dest.badge}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Core Master Categories (FLY, MARKET, AVIATION, LEARN, JOURNAL) */}
        {MEGA_MENU_DATA.map((sec) => {
          const isExpanded = expandedSections[sec.title] ?? true;
          return (
            <section
              key={sec.title}
              id={`nav-sec-${sec.title.toLowerCase()}`}
              className="border border-white/[0.1] rounded-2xl p-4 bg-neutral-900/40 backdrop-blur-md shadow-md scroll-mt-3"
            >
              {/* Category Header: Category Root Link (Navigates) + Separate Expand/Collapse Toggle Button */}
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] gap-2">
                {/* Direct Category Link */}
                <Link
                  href={sec.triggerHref}
                  onClick={handleLinkClick}
                  className="flex-1 flex items-center gap-2 py-1 focus:outline-none min-h-[44px] group"
                  title={`Open ${sec.title} Landing Hub`}
                >
                  <span className="font-mono text-base sm:text-lg font-bold tracking-widest text-amber-400 group-hover:text-amber-300">
                    {sec.title}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400 group-hover:text-white border border-white/10 px-2 py-0.5 rounded bg-black/40">
                    OPEN PAGE →
                  </span>
                </Link>

                {/* Dedicated Toggle Accordion Button */}
                <button
                  type="button"
                  onClick={(e) => toggleSection(sec.title, e)}
                  aria-expanded={isExpanded}
                  aria-controls={`nav-body-${sec.title.toLowerCase()}`}
                  className="flex items-center justify-center gap-1.5 min-h-[44px] px-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-neutral-300 hover:text-white font-mono text-xs font-bold transition-all shrink-0 cursor-pointer active:scale-95"
                >
                  <span>{isExpanded ? "HIDE" : "EXPLORE"}</span>
                  <span className="text-amber-400 text-sm font-mono font-bold">
                    {isExpanded ? "−" : "+"}
                  </span>
                </button>
              </div>

              {/* Sub-columns and Navigation Cards */}
              {isExpanded && (
                <div id={`nav-body-${sec.title.toLowerCase()}`} className="pt-4 flex flex-col gap-4">
                  {sec.columns.map((col, colIdx) => (
                    <div key={colIdx} className="flex flex-col gap-2">
                      <span className="text-[10px] font-mono text-amber-400/90 uppercase tracking-widest font-bold flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400/60" />
                        {col.heading}
                      </span>
                      <div className="flex flex-col gap-1.5 pl-1">
                        {col.items.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            onClick={handleLinkClick}
                            className="flex items-start justify-between min-h-[48px] py-2.5 px-3 rounded-xl text-xs text-neutral-200 hover:text-white bg-white/[0.02] hover:bg-white/[0.08] transition-all font-sans group border border-white/[0.04] hover:border-amber-500/30 active:scale-[0.99]"
                          >
                            <div className="flex flex-col gap-0.5 pr-2">
                              <span className="font-medium text-white group-hover:text-amber-400 transition-colors">
                                {item.label}
                              </span>
                              {item.description && (
                                <span className="text-[11px] text-neutral-400 font-sans leading-tight">
                                  {item.description}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0 mt-0.5">
                              {item.badge && (
                                <span className="text-[8px] font-mono px-1.5 py-0.5 bg-neutral-900 border border-amber-500/40 text-amber-400 rounded font-bold">
                                  {item.badge}
                                </span>
                              )}
                              <span className="text-neutral-500 group-hover:text-amber-400 transition-colors font-mono text-xs">
                                →
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          );
        })}

        {/* Direct Top-Level Links (Routes & Destinations) */}
        <section
          id="nav-sec-quick-links"
          className="border border-white/[0.1] rounded-2xl p-4 bg-neutral-900/40 backdrop-blur-md shadow-md scroll-mt-3"
        >
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.08]">
            <span className="font-mono text-base font-bold tracking-widest text-amber-400">
              ROUTES & DESTINATIONS
            </span>
            <span className="text-[10px] font-mono text-neutral-400 bg-neutral-800/80 px-2 py-0.5 rounded border border-white/10">
              EXPLORERS
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {TOP_LEVEL_NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={handleLinkClick}
                className="flex items-center justify-between min-h-[48px] p-3.5 rounded-xl bg-white/[0.03] hover:bg-amber-500/20 border border-white/10 hover:border-amber-400/50 text-xs font-mono text-neutral-200 hover:text-amber-400 transition-all font-bold group active:scale-[0.99]"
              >
                <span>{link.label}</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Legal & Compliance Section */}
        {legalSection && (
          <section
            id="nav-sec-legal"
            className="border border-white/[0.08] rounded-2xl p-4 bg-neutral-950/60 backdrop-blur-md shadow-md scroll-mt-3"
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.06]">
              <span className="font-mono text-xs font-bold tracking-widest text-neutral-300 uppercase">
                {legalSection.title}
              </span>
              <Link
                href="/legal"
                onClick={handleLinkClick}
                className="text-[10px] font-mono text-amber-400 hover:underline"
              >
                LEGAL CENTER →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {legalSection.items.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={handleLinkClick}
                  className="py-2 px-2.5 rounded-lg text-[10px] font-mono text-neutral-400 hover:text-white bg-white/[0.02] hover:bg-white/[0.06] transition-colors border border-transparent hover:border-white/10"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Direct Flight Operations Support Card */}
        <div className="p-4 rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-neutral-950/80 to-neutral-950 text-center flex flex-col items-center gap-2 shadow-lg">
          <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-widest">
            DIRECT FLIGHT OPERATIONS SUPPORT
          </span>
          <p className="text-xs text-neutral-300">
            Băneasa LRBS VIP Terminal Dispatch & Custom Flight Proposals
          </p>
          <button
            type="button"
            onClick={handleContactClick}
            className="mt-1 w-full sm:w-auto px-5 py-2.5 text-xs font-mono font-bold rounded-xl bg-amber-500 hover:bg-amber-400 text-black transition-all min-h-[44px] cursor-pointer shadow-md active:scale-95"
          >
            CONTACT OPERATIONS DESK ✈
          </button>
        </div>

        {/* Bottom Spacer for safe scrolling */}
        <div className="h-10 shrink-0" />
      </div>

      {/* Persistent Primary CTA at Drawer Bottom */}
      <div className="p-4 sm:px-6 border-t border-white/[0.1] bg-black/95 backdrop-blur-xl shrink-0 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <Button fullWidth variant="primary" size="lg" asChild onClick={handleLinkClick}>
          <Link href={PRIMARY_CTA.href}>
            {PRIMARY_CTA.label} →
          </Link>
        </Button>
        <p className="text-[9px] font-mono text-center text-neutral-500 mt-2 tracking-widest uppercase">
          AIR AVIATION ACCESS // BUCHAREST BĂNEASA (LRBS)
        </p>
      </div>
    </div>
  ) : null;

  return (
    <>
      {/* Mobile & Tablet Header Trigger Button */}
      <div className="flex items-center gap-2 lg:hidden">
        <button
          type="button"
          id="mobile-nav-trigger"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close AIR navigation menu" : "Open AIR navigation menu"}
          className="group inline-flex items-center gap-2 min-h-[44px] min-w-[44px] px-3.5 py-2 text-xs font-mono font-bold tracking-wider text-white bg-neutral-900/90 hover:bg-neutral-800 border border-amber-500/50 hover:border-amber-400 rounded-xl backdrop-blur-md shadow-[0_2px_12px_rgba(245,158,11,0.15)] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 transition-all duration-200 active:scale-95 cursor-pointer"
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

      {/* Render Full-Screen Mobile Drawer via React Portal directly into document.body */}
      {mounted && typeof document !== "undefined" ? createPortal(modalContent, document.body) : null}
    </>
  );
}
