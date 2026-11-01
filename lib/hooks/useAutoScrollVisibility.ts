"use client";

import { useState, useEffect, useRef } from "react";

interface AutoScrollOptions {
  topThreshold?: number;
  deltaThreshold?: number;
  disabled?: boolean;
}

/**
 * Smart Auto-Hide scroll hook:
 * - Shows on scroll up or at page top
 * - Hides on scroll down past threshold
 * - Debounces with requestAnimationFrame and ignores micro-jitter (< deltaThreshold)
 * - Clamps negative values (iOS rubber-banding)
 * - Safe for SSR and respects disabled flag (e.g., active modal or open mobile drawer)
 */
export function useAutoScrollVisibility({
  topThreshold = 80,
  deltaThreshold = 10,
  disabled = false,
}: AutoScrollOptions = {}) {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const tickingRef = useRef(false);

  useEffect(() => {
    if (disabled || typeof window === "undefined") {
      setIsVisible(true);
      return;
    }

    lastScrollYRef.current = Math.max(0, window.scrollY || 0);

    const updateVisibility = () => {
      const currentScrollY = Math.max(0, window.scrollY || 0);
      const diff = currentScrollY - lastScrollYRef.current;

      if (currentScrollY <= topThreshold) {
        setIsVisible(true);
      } else if (Math.abs(diff) >= deltaThreshold) {
        if (diff > 0) {
          // Scrolling down
          setIsVisible(false);
        } else {
          // Scrolling up
          setIsVisible(true);
        }
      }

      lastScrollYRef.current = currentScrollY;
      tickingRef.current = false;
    };

    const handleScroll = () => {
      if (!tickingRef.current) {
        window.requestAnimationFrame(updateVisibility);
        tickingRef.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [topThreshold, deltaThreshold, disabled]);

  return isVisible;
}
