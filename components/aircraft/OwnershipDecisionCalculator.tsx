"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { DataStatusBadge } from "../shared/DataStatusBadge";
import { Button } from "../ui/Button";
import { cn } from "../../lib/utils";

export function OwnershipDecisionCalculator() {
  const [annualHours, setAnnualHours] = useState<number>(75);
  const [aircraftClass, setAircraftClass] = useState<"LIGHT_JET" | "SUPER_MIDSIZE" | "TURBOPROP">("LIGHT_JET");

  const analysis = useMemo(() => {
    // Indicative economics based on verified European industry benchmarks
    let hourlyCharterRate = 3800;
    let acquisitionCapital = 6500000;
    let annualFixedCosts = 320000; // Crew, hangar, insurance, management, CAMO
    let directHourlyCost = 1650; // Fuel, maintenance reserves, landing fees
    let classNameLabel = "Light Jet (Phenom 300E / CJ4)";

    if (aircraftClass === "TURBOPROP") {
      hourlyCharterRate = 2600;
      acquisitionCapital = 4200000;
      annualFixedCosts = 190000;
      directHourlyCost = 1100;
      classNameLabel = "Single-Engine Executive Turboprop (PC-12 NGX)";
    } else if (aircraftClass === "SUPER_MIDSIZE") {
      hourlyCharterRate = 6800;
      acquisitionCapital = 14500000;
      annualFixedCosts = 550000;
      directHourlyCost = 2800;
      classNameLabel = "Super Midsize Jet (Challenger 350)";
    }

    const charterTotalAnnual = annualHours * hourlyCharterRate;
    const ownershipTotalAnnual = annualFixedCosts + (annualHours * directHourlyCost);
    const ownershipEffectiveHourly = Math.round(ownershipTotalAnnual / Math.max(annualHours, 1));
    const annualDifference = charterTotalAnnual - ownershipTotalAnnual;

    let recommendation = "ON-DEMAND CHARTER";
    let recommendationHeadline = "On-Demand Charter is Strongly Advised";
    let recommendationReason = `At ${annualHours} flight hours per year, on-demand charter eliminates all fixed capital depreciation, monthly crew retainers, and hangar costs. You pay strictly for hours flown with zero residual asset exposure.`;

    if (annualHours >= 150) {
      recommendation = "WHOLE AIRCRAFT OWNERSHIP & ACMI";
      recommendationHeadline = "Full Aircraft Ownership & Management Economically Viable";
      recommendationReason = `At ${annualHours}+ flight hours annually, the fixed cost base is amortized across high utilization, reducing your effective hourly cost to ~€${ownershipEffectiveHourly}/hr compared to €${hourlyCharterRate}/hr on charter. Surplus hours can be chartered out to offset management costs.`;
    } else if (annualHours >= 60) {
      recommendation = "FRACTIONAL LEASE / BLOCK-HOUR JET CARD";
      recommendationHeadline = "Block-Hour Program / Fractional Lease is the Sweet Spot";
      recommendationReason = `Between 60 and 150 hours annually, a 25-50 hour corporate block program or dry lease provides priority fleet access and contracted pricing without committing €${(acquisitionCapital / 1000000).toFixed(1)}M in capital acquisition.`;
    }

    return {
      classNameLabel,
      charterTotalAnnual,
      ownershipTotalAnnual,
      ownershipEffectiveHourly,
      annualDifference,
      recommendation,
      recommendationHeadline,
      recommendationReason,
      acquisitionCapital,
      annualFixedCosts,
      directHourlyCost,
      hourlyCharterRate,
    };
  }, [annualHours, aircraftClass]);

  return (
    <div className="flex flex-col gap-8 w-full p-8 sm:p-10 rounded-3xl bg-[#fafaf7] border border-neutral-200/80 shadow-lg text-neutral-900 font-sans">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="editorial-tag-dark">
              CHARTER / SHARE / OWN // DECISION FRAMEWORK
            </span>
            <DataStatusBadge status="INDICATIVE" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-light text-neutral-900 mt-2 font-sans">
            Interactive Access vs. Ownership Calculator
          </h2>
        </div>
        <span className="text-xs font-mono text-neutral-500">
          European Benchmark Data // Indicative Modeling
        </span>
      </div>

      {/* Control Sliders & Class Selector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3">
            <label className="text-xs font-mono text-amber-600 font-bold uppercase tracking-wider block">
              01 // SELECT AIRCRAFT CATEGORY
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setAircraftClass("TURBOPROP")}
                className={cn(
                  "py-2.5 px-3 rounded-xl text-xs font-mono uppercase tracking-wider transition border text-center",
                  aircraftClass === "TURBOPROP"
                    ? "bg-amber-600 text-white font-bold border-amber-600 shadow-md"
                    : "bg-white text-neutral-700 border-neutral-300 hover:border-neutral-400"
                )}
              >
                Turboprop
              </button>
              <button
                type="button"
                onClick={() => setAircraftClass("LIGHT_JET")}
                className={cn(
                  "py-2.5 px-3 rounded-xl text-xs font-mono uppercase tracking-wider transition border text-center",
                  aircraftClass === "LIGHT_JET"
                    ? "bg-amber-600 text-white font-bold border-amber-600 shadow-md"
                    : "bg-white text-neutral-700 border-neutral-300 hover:border-neutral-400"
                )}
              >
                Light Jet
              </button>
              <button
                type="button"
                onClick={() => setAircraftClass("SUPER_MIDSIZE")}
                className={cn(
                  "py-2.5 px-3 rounded-xl text-xs font-mono uppercase tracking-wider transition border text-center",
                  aircraftClass === "SUPER_MIDSIZE"
                    ? "bg-amber-600 text-white font-bold border-amber-600 shadow-md"
                    : "bg-white text-neutral-700 border-neutral-300 hover:border-neutral-400"
                )}
              >
                Super Mid
              </button>
            </div>
            <span className="text-[11px] text-neutral-500 font-sans block">
              Benchmark: {analysis.classNameLabel}
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-xs font-mono text-amber-600 font-bold uppercase tracking-wider">
                02 // ANNUAL FLIGHT HOURS
              </label>
              <span className="text-lg font-mono font-bold text-neutral-900">
                {annualHours} HRS / YEAR
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="350"
              step="5"
              value={annualHours}
              onChange={(e) => setAnnualHours(parseInt(e.target.value, 10))}
              className="w-full accent-amber-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-neutral-400">
              <span>10 HRS (Charter)</span>
              <span>100 HRS (Lease / Card)</span>
              <span>250+ HRS (Whole Asset)</span>
            </div>
          </div>
        </div>

        {/* Dynamic Verdict Card */}
        <div className="lg:col-span-7 p-6 sm:p-7 rounded-2xl bg-white border border-neutral-200 shadow-md flex flex-col justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-600 animate-pulse" />
              <span className="text-[10px] font-mono text-amber-600 font-bold uppercase tracking-widest">
                AIR STRATEGIC RECOMMENDATION
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-light text-neutral-900 font-sans">
              {analysis.recommendationHeadline}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 font-sans leading-relaxed">
              {analysis.recommendationReason}
            </p>
          </div>

          {/* Comparative Numbers Breakdown */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-xs font-mono">
            <div>
              <span className="block text-[9px] text-neutral-400 uppercase">CHARTER ANNUAL</span>
              <span className="text-neutral-900 font-bold text-sm">
                €{analysis.charterTotalAnnual.toLocaleString()}
              </span>
              <span className="text-[9px] text-neutral-500 block">€{analysis.hourlyCharterRate}/hr direct</span>
            </div>
            <div>
              <span className="block text-[9px] text-neutral-400 uppercase">OWNERSHIP ANNUAL</span>
              <span className="text-neutral-900 font-bold text-sm">
                €{analysis.ownershipTotalAnnual.toLocaleString()}
              </span>
              <span className="text-[9px] text-neutral-500 block">€{analysis.ownershipEffectiveHourly}/hr effective</span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="block text-[9px] text-neutral-400 uppercase">ACQUISITION OUTLAY</span>
              <span className="text-neutral-900 font-bold text-sm">
                €{(analysis.acquisitionCapital / 1000000).toFixed(1)}M
              </span>
              <span className="text-[9px] text-neutral-500 block">Typical pre-owned</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <span className="text-xs font-sans text-neutral-500">
              Optimal Model: <strong className="text-amber-600 font-mono">{analysis.recommendation}</strong>
            </span>
            <Link href="/plan">
              <Button variant="primary" size="sm">
                CONSULT AIR ADVISOR →
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
