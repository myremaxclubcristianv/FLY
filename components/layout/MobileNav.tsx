"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PRIMARY_CTA } from "../../constants/navigation";
import { Button } from "../ui/Button";

interface MobileNavProps {
  onOpenSearch?: () => void;
}

interface NavCategory {
  title: string;
  triggerHref: string;
  groups: {
    heading: string;
    items: { label: string; href: string; badge?: string }[];
  }[];
}

const MOBILE_NAV_DATA: NavCategory[] = [
  {
    title: "FLY & MISSIONS",
    triggerHref: "/plan",
    groups: [
      {
        heading: "ACCESS & FLIGHT DISPATCH",
        items: [
          { label: "Plan a Flight", href: "/plan", badge: "CORE" },
          { label: "Băneasa Executive Hub (LRBS)", href: "/baneasa", badge: "LRBS" },
          { label: "Route Intelligence", href: "/routes" },
          { label: "European Destinations", href: "/destinations" },
          { label: "Curated Flight Experiences", href: "/experiences" },
        ],
      },
      {
        heading: "FLEET & PERFORMANCE",
        items: [
          { label: "Explore Aircraft Fleet", href: "/aircraft" },
          { label: "Head-to-Head Comparison", href: "/aircraft/compare", badge: "COMPARE" },
          { label: "Aircraft Ownership Matrix", href: "/aircraft/ownership" },
          { label: "Aircraft For Sale", href: "/aircraft-for-sale", badge: "MARKET" },
        ],
      },
    ],
  },
  {
    title: "AIRCRAFT MARKETPLACE",
    triggerHref: "/aircraft-for-sale",
    groups: [
      {
        heading: "MARKETPLACE FLEET",
        items: [
          { label: "Aircraft For Sale", href: "/aircraft-for-sale", badge: "AVBUYER" },
          { label: "Jets & Turboprops", href: "/aircraft-for-sale" },
          { label: "Executive Helicopters", href: "/aircraft-for-sale" },
        ],
      },
      {
        heading: "FINANCE & ACQUISITION",
        items: [
          { label: "Aircraft Ownership Matrix", href: "/aircraft/ownership" },
          { label: "Aviation Finance", href: "/aviation/finance" },
          { label: "Aviation Insurance", href: "/aviation/insurance" },
        ],
      },
    ],
  },
  {
    title: "AVIATION DIRECTORY",
    triggerHref: "/aviation",
    groups: [
      {
        heading: "DIRECTORY & HUBS",
        items: [
          { label: "Airports & FBO Hubs", href: "/aviation/airports", badge: "FBO" },
          { label: "Aviation Companies & Operators", href: "/aviation" },
          { label: "EASA Flight Schools", href: "/aviation/schools", badge: "ATO" },
          { label: "Global Aviation Directory", href: "/directory" },
        ],
      },
      {
        heading: "INTELLIGENCE & HERITAGE",
        items: [
          { label: "Aviation Careers & Professions", href: "/aviation/careers", badge: "CAREERS" },
          { label: "Aviation History & Pioneers", href: "/aviation/history", badge: "HERITAGE" },
          { label: "Aviation Rules & AOC", href: "/aviation/rules" },
          { label: "Aviation Visual Explainers", href: "/aviation/explainers" },
          { label: "Aviation Technology Journal", href: "/aviation/technology", badge: "eVTOL" },
        ],
      },
    ],
  },
  {
    title: "LEARN & GUIDES",
    triggerHref: "/aviation/learn",
    groups: [
      {
        heading: "KNOWLEDGE CENTER",
        items: [
          { label: "Aviation Knowledge Hub", href: "/aviation/learn" },
          { label: "How to Become a Pilot", href: "/aviation/learn/pilot-guide", badge: "EASA" },
          { label: "Flight Schools Directory", href: "/aviation/schools" },
          { label: "Aviation Rules & Regulations", href: "/aviation/rules" },
        ],
      },
      {
        heading: "VISUAL EXPLAINERS",
        items: [
          { label: "What is an AOC?", href: "/aviation/explainers" },
          { label: "What is an FBO?", href: "/aviation/explainers" },
          { label: "PPR & Slot Coordination", href: "/aviation/explainers" },
          { label: "What is an Empty Leg?", href: "/aviation/explainers" },
        ],
      },
    ],
  },
  {
    title: "JOURNAL & ESSAYS",
    triggerHref: "/journal",
    groups: [
      {
        heading: "EDITORIAL GUIDES",
        items: [
          { label: "All Journal Articles", href: "/journal" },
          { label: "Editorial Photo Essays", href: "/journal/photo-essays", badge: "PHOTO" },
          { label: "Băneasa vs. Otopeni Report", href: "/journal/baneasa-vs-otopeni-comparative-report" },
        ],
      },
      {
        heading: "AERIAL DISCOVERY",
        items: [
          { label: "Romania From Above", href: "/romania-from-above" },
          { label: "Helicopter Transfers & Helipads", href: "/journal/helicopter-transfers-and-landing-access" },
        ],
      },
    ],
  },
];

export function MobileNav({ onOpenSearch }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>("FLY & MISSIONS");

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
      {/* Mobile Top Header Toggle (Visible on lg:hidden) */}
      <div className="flex items-center gap-2 lg:hidden">
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
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col bg-neutral-950/98 backdrop-blur-2xl animate-in fade-in duration-200">
          {/* Top Bar inside Overlay */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.08] bg-black/40">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="text-xl font-light tracking-[0.2em] text-white font-mono flex items-center gap-2"
            >
              <span>AIR</span>
              <span className="text-[9px] text-amber-400 border border-amber-400/40 px-1.5 py-0.5 rounded tracking-widest font-bold">
                OPS
              </span>
            </Link>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSearchClick}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-neutral-300 bg-white/[0.05] border border-white/10 rounded-lg hover:text-amber-400 transition-colors"
              >
                <svg className="w-3.5 h-3.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>SEARCH</span>
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
                className="p-2 text-neutral-300 hover:text-amber-400 rounded-lg bg-white/[0.05] border border-white/10"
              >
                <svg
                  className="w-5 h-5"
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
          </div>

          {/* Account & Quick Hub Bar */}
          <div className="grid grid-cols-2 gap-2 px-5 py-3 border-b border-white/[0.06] bg-neutral-900/40 text-xs font-mono">
            <Link
              href="/account"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 transition-colors"
            >
              <span>👤 MY AIR ACCOUNT</span>
            </Link>
            <Link
              href="/baneasa"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 p-2 rounded-xl bg-white/[0.03] border border-white/10 text-neutral-300 hover:text-white transition-colors"
            >
              <span>🛬 BĂNEASA LRBS</span>
            </Link>
          </div>

          {/* Navigation Accordion Sections (Complete Architecture) */}
          <nav className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3" aria-label="Mobile Navigation">
            {MOBILE_NAV_DATA.map((sec) => {
              const isExpanded = expandedSection === sec.title;
              return (
                <div
                  key={sec.title}
                  className="border border-white/[0.08] rounded-2xl overflow-hidden bg-neutral-900/40"
                >
                  <button
                    type="button"
                    onClick={() => toggleSection(sec.title)}
                    className="w-full flex items-center justify-between p-4 text-left text-sm font-mono tracking-wider text-white hover:text-amber-400 transition-colors"
                  >
                    <span className="font-semibold text-neutral-200">{sec.title}</span>
                    <span className="text-amber-400 text-xs font-mono">
                      {isExpanded ? "−" : "+"}
                    </span>
                  </button>

                  {isExpanded && (
                    <div className="px-4 pb-4 pt-1 flex flex-col gap-4 border-t border-white/[0.06] animate-in fade-in duration-150">
                      {sec.groups.map((grp, gIdx) => (
                        <div key={gIdx} className="flex flex-col gap-1.5">
                          <span className="text-[9px] font-mono text-amber-400/90 uppercase tracking-widest font-bold">
                            {grp.heading}
                          </span>
                          <div className="flex flex-col gap-1">
                            {grp.items.map((item) => (
                              <Link
                                key={item.label}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center justify-between py-2 px-2.5 rounded-lg text-xs text-neutral-300 hover:text-white hover:bg-white/[0.06] transition-colors font-sans"
                              >
                                <span>{item.label}</span>
                                {item.badge && (
                                  <span className="text-[8px] font-mono px-1.5 py-0.5 bg-neutral-900 border border-amber-500/30 text-amber-400 rounded">
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

            {/* Direct Quick Destination Links */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <Link
                href="/routes"
                onClick={() => setIsOpen(false)}
                className="p-3 text-center rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono text-neutral-300 hover:text-amber-400 transition-colors"
              >
                ROUTES ENVELOPE →
              </Link>
              <Link
                href="/destinations"
                onClick={() => setIsOpen(false)}
                className="p-3 text-center rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono text-neutral-300 hover:text-amber-400 transition-colors"
              >
                DESTINATIONS →
              </Link>
            </div>
          </nav>

          {/* Bottom CTA in Drawer */}
          <div className="p-5 border-t border-white/[0.08] bg-black/60 backdrop-blur-xl">
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

      {/* Persistent Sticky Mobile Bottom CTA Bar (visible on viewports < 768px) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 p-3 bg-neutral-950/90 backdrop-blur-xl border-t border-white/[0.1] md:hidden shadow-[0_-4px_25px_rgba(0,0,0,0.8)] flex items-center gap-3">
        <Button fullWidth size="md" variant="primary" asChild>
          <Link href={PRIMARY_CTA.href}>
            {PRIMARY_CTA.label} →
          </Link>
        </Button>
      </div>
    </>
  );
}
