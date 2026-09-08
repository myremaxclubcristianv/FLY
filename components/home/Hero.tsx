import React from "react";
import Link from "next/link";
import { Container } from "../layout/Container";
import { Button } from "../ui/Button";
import { FlightSearchForm } from "./FlightSearchForm";
import { DataStatusBadge } from "../shared/DataStatusBadge";
import { PRIMARY_CTA } from "../../constants/navigation";

export function Hero() {
  return (
    <section className="relative w-full min-h-[85vh] hero-atmosphere pt-12 pb-20 border-b border-[var(--color-border)] overflow-hidden flex flex-col justify-center">
      {/* Background SVG Route Geometry & Vectors */}
      <div className="absolute inset-0 pointer-events-none opacity-40" aria-hidden="true">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <line x1="0" y1="20%" x2="100%" y2="20%" stroke="#292c2f" strokeWidth="0.5" />
          <line x1="0" y1="80%" x2="100%" y2="80%" stroke="#292c2f" strokeWidth="0.5" />
          <line x1="25%" y1="0" x2="25%" y2="100%" stroke="#292c2f" strokeWidth="0.5" strokeDasharray="4 4" />
          <line x1="75%" y1="0" x2="75%" y2="100%" stroke="#292c2f" strokeWidth="0.5" strokeDasharray="4 4" />

          {/* Dynamic route line from Bucharest to Bran vector representation */}
          <path
            d="M 150 480 Q 450 150 850 320 T 1350 180"
            fill="none"
            stroke="#5a8fa8"
            strokeWidth="1.5"
            strokeDasharray="6 6"
            className="route-dash-animation opacity-70"
          />

          {/* Coordinate markers */}
          <circle cx="150" cy="480" r="4" fill="#5a8fa8" />
          <text x="162" y="485" fill="#a7a9ac" fontSize="10" fontFamily="monospace">
            BBU // BUCHAREST
          </text>

          <circle cx="850" cy="320" r="4" fill="#5a8fa8" />
          <text x="862" y="325" fill="#a7a9ac" fontSize="10" fontFamily="monospace">
            BRAN // HELIPAD
          </text>
        </svg>
      </div>

      <Container size="wide" className="relative z-10">
        <div className="flex flex-col gap-10 max-w-5xl mx-auto">
          {/* Top Tag & Status */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-data text-[var(--color-accent)] tracking-widest uppercase border border-[var(--color-accent-muted)] px-3 py-1 bg-[color-mix(in_srgb,var(--color-accent)_10%,transparent)]">
              AVIATION ACCESS & DISCOVERY
            </span>
            <DataStatusBadge status="INDICATIVE" />
          </div>

          {/* Main Hero Headlines */}
          <div className="flex flex-col gap-4">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-[var(--color-text-primary)] leading-[0.95]">
              GO BY AIR<span className="text-[var(--color-accent)]">.</span>
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-[var(--color-text-secondary)] font-light leading-relaxed max-w-3xl">
              Tell us where you&apos;re going.<br className="hidden sm:inline" />
              We&apos;ll find the right way to fly.
            </p>
          </div>

          {/* Secondary Statement & Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link href={PRIMARY_CTA.href}>
              <Button size="lg" variant="primary">
                {PRIMARY_CTA.label}
              </Button>
            </Link>
            <Link href="#decision-engine">
              <Button size="lg" variant="outline">
                EXPLORE DECISION ENGINE
              </Button>
            </Link>
          </div>

          {/* Hero Flight Search Component Integration */}
          <div className="pt-6">
            <FlightSearchForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
