"use client";

import React, { useState } from "react";
import Link from "next/link";

interface MegaMenuSection {
  title: string;
  triggerHref: string;
  columns: {
    heading: string;
    items: { label: string; href: string; badge?: string }[];
  }[];
}

const MEGA_MENU_DATA: MegaMenuSection[] = [
  {
    title: "FLY",
    triggerHref: "/plan",
    columns: [
      {
        heading: "ACCESS LAYER",
        items: [
          { label: "Plan a Flight", href: "/plan", badge: "CORE" },
          { label: "Băneasa Executive Hub", href: "/baneasa", badge: "LRBS" },
          { label: "Route Intelligence", href: "/routes" },
          { label: "European Destinations", href: "/destinations" },
        ],
      },
      {
        heading: "AIRCRAFT TYPES",
        items: [
          { label: "Explore Aircraft Fleet", href: "/aircraft" },
          { label: "Compare Models", href: "/aircraft/compare", badge: "COMPARE" },
          { label: "Aircraft Ownership", href: "/aircraft/ownership" },
          { label: "Aircraft For Sale", href: "/aircraft-for-sale", badge: "MARKET" },
        ],
      },
    ],
  },
  {
    title: "MARKET",
    triggerHref: "/aircraft-for-sale",
    columns: [
      {
        heading: "AIRCRAFT MARKETPLACE",
        items: [
          { label: "Aircraft For Sale", href: "/aircraft-for-sale", badge: "AVBUYER" },
          { label: "Jets & Turboprops", href: "/aircraft-for-sale" },
          { label: "Executive Helicopters", href: "/aircraft-for-sale" },
        ],
      },
      {
        heading: "FINANCE & OWNERSHIP",
        items: [
          { label: "Aircraft Ownership Matrix", href: "/aircraft/ownership" },
          { label: "Aviation Finance", href: "/aviation/finance" },
          { label: "Aviation Insurance", href: "/aviation/insurance" },
        ],
      },
    ],
  },
  {
    title: "AVIATION",
    triggerHref: "/aviation",
    columns: [
      {
        heading: "DIRECTORY & HUBS",
        items: [
          { label: "Airports & FBO Hubs", href: "/aviation/airports", badge: "FBO" },
          { label: "Aviation Companies", href: "/aviation" },
          { label: "EASA Flight Schools", href: "/aviation/schools", badge: "ATO" },
          { label: "Global Aviation Directory", href: "/directory" },
        ],
      },
      {
        heading: "INTELLIGENCE & RULES",
        items: [
          { label: "Aviation Rules & AOC", href: "/aviation/rules" },
          { label: "Aviation Visual Explainers", href: "/aviation/explainers" },
          { label: "Aviation Technology Journal", href: "/aviation/technology", badge: "eVTOL" },
          { label: "Aviation Business", href: "/business" },
        ],
      },
    ],
  },
  {
    title: "LEARN",
    triggerHref: "/aviation/learn",
    columns: [
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
    title: "JOURNAL",
    triggerHref: "/journal",
    columns: [
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
          { label: "Helicopter Transfers", href: "/journal/helicopter-transfers-and-landing-access" },
        ],
      },
    ],
  },
];

export function MegaMenu() {
  const [activeTab, setActiveTab] = useState<string | null>(null);

  return (
    <div
      className="hidden lg:flex items-center gap-8 relative"
      onMouseLeave={() => setActiveTab(null)}
    >
      {MEGA_MENU_DATA.map((menu) => (
        <div
          key={menu.title}
          className="relative py-6"
          onMouseEnter={() => setActiveTab(menu.title)}
        >
          <Link
            href={menu.triggerHref}
            className={`text-xs font-data tracking-widest transition-colors py-2 border-b ${
              activeTab === menu.title
                ? "text-[var(--color-text-primary)] border-[var(--color-accent)]"
                : "text-[var(--color-text-secondary)] border-transparent hover:text-[var(--color-text-primary)]"
            }`}
          >
            {menu.title}
          </Link>

          {/* Mega Dropdown Panel */}
          {activeTab === menu.title && (
            <div className="absolute top-full left-0 w-[540px] bg-[var(--color-bg-primary)] border border-[var(--color-border)] p-6 shadow-2xl z-50 grid grid-cols-2 gap-8 animate-in fade-in slide-in-from-top-1 duration-150 rounded-sm">
              {menu.columns.map((col, idx) => (
                <div key={idx} className="flex flex-col gap-3">
                  <span className="text-[10px] font-data text-[var(--color-accent)] uppercase tracking-widest border-b border-[var(--color-border-subtle)] pb-2">
                    {col.heading}
                  </span>
                  <ul className="flex flex-col gap-2">
                    {col.items.map((item) => (
                      <li key={item.label}>
                        <Link
                          href={item.href}
                          onClick={() => setActiveTab(null)}
                          className="text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] flex items-center justify-between py-1 transition-colors group"
                        >
                          <span className="group-hover:translate-x-0.5 transition-transform duration-150">
                            {item.label}
                          </span>
                          {item.badge && (
                            <span className="text-[8px] font-data px-1.5 py-0.5 bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-accent)]">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Direct Quick Links */}
      <Link
        href="/routes"
        className="text-xs font-data tracking-widest text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors py-2"
      >
        ROUTES
      </Link>

      <Link
        href="/destinations"
        className="text-xs font-data tracking-widest text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors py-2"
      >
        DESTINATIONS
      </Link>
    </div>
  );
}
