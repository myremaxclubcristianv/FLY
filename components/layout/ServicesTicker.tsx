"use client";

import React from "react";
import Link from "next/link";

const TICKER_SERVICES = [
  { label: "AIR", href: "/", isBrand: true },
  { label: "PRIVATE FLIGHTS", href: "/plan" },
  { label: "HELICOPTERS", href: "/aircraft?category=HELICOPTER" },
  { label: "BUSINESS AVIATION", href: "/business" },
  { label: "AIRCRAFT FLEET", href: "/aircraft" },
  { label: "EXPERIENCES", href: "/experiences" },
  { label: "CORPORATE TRAVEL", href: "/business" },
  { label: "BĂNEASA LRBS DISPATCH", href: "/baneasa" },
  { label: "FLIGHT PLANNING", href: "/plan" },
  { label: "AIRCRAFT SOURCING", href: "/aircraft/ownership" },
];

export function ServicesTicker() {
  return (
    <aside
      aria-label="AIR Aviation Services Status Strip"
      className="w-full bg-[#060708] border-b border-white/[0.08] text-neutral-300 py-1.5 px-4 z-40 relative air-ticker-container flex items-center justify-between overflow-hidden"
    >
      <div className="sr-only">
        AIR Available Services: Private Flights, Helicopters, Business Aviation, Aircraft Fleet, Experiences, Corporate Travel, Băneasa LRBS Dispatch, Flight Planning, Aircraft Sourcing.
      </div>

      {/* Operations Status Indicator */}
      <div className="flex items-center gap-1.5 pl-1 pr-2 sm:pl-2 sm:pr-4 bg-[#060708] z-10 border-r border-white/10 shrink-0 font-mono text-[8px] sm:text-[9px] tracking-widest text-neutral-400 uppercase">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-neutral-300 font-semibold hidden xs:inline sm:inline">OPS ACTIVE</span>
      </div>

      {/* Scrolling Track */}
      <div className="flex-1 overflow-hidden">
        <div className="air-ticker-track text-[10px] sm:text-[11px] font-mono tracking-[0.18em] uppercase">
          {/* First loop instance */}
          <div className="flex items-center gap-6 sm:gap-8 px-4">
            {TICKER_SERVICES.map((item, idx) => (
              <React.Fragment key={`ticker-1-${idx}`}>
                <Link
                  href={item.href}
                  className={`transition-colors whitespace-nowrap ${
                    item.isBrand
                      ? "text-amber-400 font-bold tracking-[0.25em]"
                      : "text-neutral-300 hover:text-amber-400"
                  }`}
                >
                  {item.label}
                </Link>
                <span className="text-amber-500/60 select-none text-[8px]">•</span>
              </React.Fragment>
            ))}
          </div>

          {/* Second loop instance for seamless infinite CSS animation */}
          <div className="flex items-center gap-6 sm:gap-8 px-4" aria-hidden="true">
            {TICKER_SERVICES.map((item, idx) => (
              <React.Fragment key={`ticker-2-${idx}`}>
                <Link
                  href={item.href}
                  tabIndex={-1}
                  className={`transition-colors whitespace-nowrap ${
                    item.isBrand
                      ? "text-amber-400 font-bold tracking-[0.25em]"
                      : "text-neutral-300 hover:text-amber-400"
                  }`}
                >
                  {item.label}
                </Link>
                <span className="text-amber-500/60 select-none text-[8px]">•</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Right Direct Ingress Cue */}
      <div className="hidden lg:flex items-center gap-2 pl-4 pr-2 bg-[#060708] z-10 border-l border-white/10 shrink-0 font-mono text-[9px] tracking-widest text-neutral-400 uppercase">
        <span className="text-amber-400 font-medium">BĂNEASA // LRBS</span>
      </div>
    </aside>
  );
}
