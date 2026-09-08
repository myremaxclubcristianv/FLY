"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { SearchResultItem } from "../../types/domain";
import { searchService } from "../../lib/services/search-service";
import { DataStatusBadge } from "../shared/DataStatusBadge";

export interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GlobalSearchModal({ isOpen, onClose }: GlobalSearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleQueryChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (val.trim().length >= 2) {
      setIsSearching(true);
      const res = await searchService.search(val);
      setResults(res);
      setIsSearching(false);
    } else {
      setResults([]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-[var(--color-bg-primary)]/80 backdrop-blur-md animate-fadeIn">
      <div
        className="w-full max-w-3xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-[var(--color-border)]">
          <svg className="w-5 h-5 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            className="w-full bg-transparent text-[var(--color-text-primary)] text-base focus:outline-none placeholder:text-[var(--color-text-muted)] font-sans"
            placeholder="Search operators, aircraft, locations, destinations, experiences..."
            value={query}
            onChange={handleQueryChange}
          />
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-data text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] border border-[var(--color-border)] px-2 py-1"
          >
            ESC
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 flex flex-col gap-2">
          {query.trim().length < 2 ? (
            <div className="p-8 text-center text-xs font-data text-[var(--color-text-muted)]">
              TYPE AT LEAST 2 CHARACTERS TO SEARCH THE AIR NETWORK...
            </div>
          ) : isSearching ? (
            <div className="p-8 text-center text-xs font-data text-[var(--color-accent)]">
              SEARCHING AVIATION DOMAIN...
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center flex flex-col gap-2">
              <span className="text-xs font-data text-[var(--color-text-secondary)]">WE COULDN&apos;T FIND A MATCH YET.</span>
              <span className="text-xs text-[var(--color-text-muted)]">
                Tell us about your mission in the flight planner and AIR will help identify available options.
              </span>
            </div>
          ) : (
            results.map((res) => (
              <Link
                key={`${res.type}-${res.id}`}
                href={res.href}
                onClick={onClose}
                className="flex items-center justify-between p-4 bg-[var(--color-bg-primary)] hover:bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] transition-colors group"
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-data text-[var(--color-accent)] uppercase">
                      {res.type} {"//"} {res.categoryTag}
                    </span>
                    <DataStatusBadge status={res.dataStatus} showDot={false} />
                  </div>
                  <h4 className="text-base font-light text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors">
                    {res.title}
                  </h4>
                  {res.subtitle && (
                    <span className="text-xs text-[var(--color-text-muted)] font-sans">
                      {res.subtitle}
                    </span>
                  )}
                </div>
                <span className="text-xs font-data text-[var(--color-text-muted)] group-hover:text-[var(--color-text-primary)]">
                  SELECT →
                </span>
              </Link>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-[var(--color-bg-primary)] border-t border-[var(--color-border)] flex items-center justify-between text-[10px] font-data text-[var(--color-text-muted)]">
          <span>AIR UNIFIED AVIATION SEARCH ENGINE</span>
          <span>PRESS ESC TO CLOSE</span>
        </div>
      </div>
    </div>
  );
}
