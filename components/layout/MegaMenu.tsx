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
            className={`text-xs font-mono tracking-widest transition-all py-2 border-b select-none ${
              activeTab === menu.title
                ? "text-amber-400 border-amber-400 font-bold"
                : "text-neutral-300 border-transparent hover:text-white"
            }`}
          >
            {menu.title}
          </Link>

          {/* Mega Dropdown Glass Panel */}
          {activeTab === menu.title && (
            <div className="absolute top-full left-0 w-[560px] glass-modal p-6 z-50 grid grid-cols-2 gap-8 animate-in fade-in slide-in-from-top-2 duration-200 rounded-2xl">
              {menu.columns.map((col, idx) => (
                <div key={idx} className="flex flex-col gap-3">
                  <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest border-b border-white/[0.08] pb-2 font-bold">
                    {col.heading}
                  </span>
                  <ul className="flex flex-col gap-1.5">
                    {col.items.map((item) => (
                      <li key={item.label}>
                        <Link
                          href={item.href}
                          onClick={() => setActiveTab(null)}
                          className="text-xs text-neutral-300 hover:text-white flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-white/[0.06] transition-all group"
                        >
                          <span className="group-hover:translate-x-1 transition-transform duration-150 font-sans">
                            {item.label}
                          </span>
                          {item.badge && (
                            <span className="text-[8px] font-mono px-1.5 py-0.5 bg-neutral-900 border border-amber-500/30 text-amber-400 rounded">
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
        className="text-xs font-mono tracking-widest text-neutral-300 hover:text-amber-400 transition-colors py-2"
      >
        ROUTES
      </Link>

      <Link
        href="/destinations"
        className="text-xs font-mono tracking-widest text-neutral-300 hover:text-amber-400 transition-colors py-2"
      >
        DESTINATIONS
      </Link>
    </div>
  );
}

