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
          { label: "Very Light Jets", href: "/aircraft" },
          { label: "Light Jets", href: "/aircraft" },
          { label: "Super Midsize & Large Cabin", href: "/aircraft" },
          { label: "Turboprops & Helicopters", href: "/aircraft" },
        ],
      },
    ],
  },
  {
    title: "AIRCRAFT",
    triggerHref: "/aircraft",
    columns: [
      {
        heading: "FLEET INTELLIGENCE",
        items: [
          { label: "Explore Fleet Models", href: "/aircraft" },
          { label: "Compare Aircraft Models", href: "/aircraft/compare", badge: "NEW" },
          { label: "Ownership Matrix", href: "/aircraft/ownership" },
        ],
      },
      {
        heading: "CATEGORIES",
        items: [
          { label: "Embraer Phenom 300E", href: "/aircraft/phenom-300" },
          { label: "Bombardier Challenger 350", href: "/aircraft/challenger-350" },
          { label: "Gulfstream G650ER", href: "/aircraft/gulfstream-g650er" },
          { label: "Pilatus PC-12 NGX", href: "/aircraft/pilatus-pc-12" },
          { label: "Leonardo AW139 VIP", href: "/aircraft/leonardo-aw139" },
        ],
      },
    ],
  },
  {
    title: "AVIATION",
    triggerHref: "/aviation",
    columns: [
      {
        heading: "DIRECTORY",
        items: [
          { label: "Aviation Companies Directory", href: "/aviation" },
          { label: "AOC Air Operators", href: "/aviation" },
          { label: "FBO & Ground Handling", href: "/aviation" },
          { label: "Flight Schools & ATO", href: "/aviation" },
        ],
      },
      {
        heading: "FINANCE & SERVICES",
        items: [
          { label: "Aviation Maintenance (MRO)", href: "/aviation" },
          { label: "Aviation Finance", href: "/aviation/finance" },
          { label: "Aviation Insurance", href: "/aviation/insurance" },
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
          { label: "How Private Charter Works", href: "/journal/how-private-charter-works" },
          { label: "Jet vs. Turboprop", href: "/journal/jet-vs-turboprop" },
          { label: "What is an FBO?", href: "/journal/what-is-an-fbo" },
        ],
      },
      {
        heading: "ANALYSIS & DISCOVERY",
        items: [
          { label: "Băneasa vs. Otopeni Report", href: "/journal/baneasa-vs-otopeni-comparative-report" },
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

      <Link
        href="/romania-from-above"
        className="text-xs font-data tracking-widest text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors py-2"
      >
        ROMANIA FROM ABOVE
      </Link>
    </div>
  );
}
