"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { SearchResultItem } from "../../types/domain";
import { UnifiedAviationRepository } from "../../lib/repositories/unified-aviation-repo";
import { ProvenanceBadge } from "../shared/ProvenanceBadge";

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GlobalSearchModal({ isOpen, onClose }: GlobalSearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
      setResults([]);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open trigger handled at layout level
        }
      }
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (results.length > 0 ? (prev + 1) % results.length : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (results.length > 0 ? (prev - 1 + results.length) % results.length : 0));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, onClose]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setSelectedIndex(0);
      return;
    }

    let isMounted = true;
    UnifiedAviationRepository.searchAll(query).then((items) => {
      if (isMounted) {
        setResults(items);
        setSelectedIndex(0);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[var(--color-border-subtle)] bg-[var(--color-bg-primary)]">
          <span className="text-[var(--color-text-muted)] text-sm font-data">⌘K</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search aircraft, companies, airports (LRBS), routes, or journal..."
            className="w-full bg-transparent border-none text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none font-sans"
          />
          <button
            onClick={onClose}
            className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] px-2 py-1 border border-[var(--color-border)] rounded transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Results Container */}
        <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-1 divide-y divide-[var(--color-border-subtle)]">
          {query.trim() === "" ? (
            <div className="p-6 text-center text-xs text-[var(--color-text-muted)] font-data space-y-2">
              <p>Type to search across AIR knowledge repository.</p>
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                <span className="px-2 py-1 bg-[var(--color-surface-hover)] border border-[var(--color-border)] rounded">Băneasa (LRBS)</span>
                <span className="px-2 py-1 bg-[var(--color-surface-hover)] border border-[var(--color-border)] rounded">Phenom 300</span>
                <span className="px-2 py-1 bg-[var(--color-surface-hover)] border border-[var(--color-border)] rounded">Alpha Handling</span>
                <span className="px-2 py-1 bg-[var(--color-surface-hover)] border border-[var(--color-border)] rounded">Bucharest to Paris</span>
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="p-6 text-center text-xs text-[var(--color-text-muted)] font-data">
              No verified aviation entities found for &quot;{query}&quot;.
            </div>
          ) : (
            results.map((item, idx) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={onClose}
                className={`flex items-center justify-between p-3 rounded transition-colors text-left group ${
                  idx === selectedIndex ? "bg-[var(--color-surface-hover)] border-l-2 border-[var(--color-accent)]" : "hover:bg-[var(--color-surface-hover)]"
                }`}
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors">
                      {item.title}
                    </span>
                    <span className="text-[9px] font-data px-1.5 py-0.5 rounded bg-[var(--color-bg-primary)] border border-[var(--color-border-subtle)] text-[var(--color-text-muted)] uppercase">
                      {item.categoryTag}
                    </span>
                  </div>
                  {item.subtitle && (
                    <span className="text-xs text-[var(--color-text-secondary)] font-sans">
                      {item.subtitle}
                    </span>
                  )}
                </div>
                <ProvenanceBadge status={item.dataStatus} />
              </Link>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-[var(--color-bg-primary)] border-t border-[var(--color-border-subtle)] flex items-center justify-between text-[10px] font-data text-[var(--color-text-muted)]">
          <span>Navigate: ↑↓ • Select: ↵ • Close: ESC</span>
          <span>AIR AVIATION SEARCH ENGINE</span>
        </div>
      </div>
    </div>
  );
}
