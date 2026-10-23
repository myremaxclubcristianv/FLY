"use client";

import React, { useState } from "react";
import Link from "next/link";

import { MEGA_MENU_DATA, TOP_LEVEL_NAV_LINKS } from "../../constants/navigation";

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
                    {col.items.map((item) => {
                      const isExternal = item.href.startsWith("http");
                      return (
                        <li key={item.label}>
                          {isExternal ? (
                            <a
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => setActiveTab(null)}
                              className="text-xs text-neutral-300 hover:text-white flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-white/[0.06] transition-all group"
                            >
                              <span className="group-hover:translate-x-1 transition-transform duration-150 font-sans flex items-center gap-1">
                                {item.label}
                                <span className="text-[10px] text-neutral-400">↗</span>
                              </span>
                              {item.badge && (
                                <span className="text-[8px] font-mono px-1.5 py-0.5 bg-neutral-900 border border-amber-500/30 text-amber-400 rounded">
                                  {item.badge}
                                </span>
                              )}
                            </a>
                          ) : (
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
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Direct Quick Links */}
      {TOP_LEVEL_NAV_LINKS.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className="text-xs font-mono tracking-widest text-neutral-300 hover:text-amber-400 transition-colors py-2"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}

