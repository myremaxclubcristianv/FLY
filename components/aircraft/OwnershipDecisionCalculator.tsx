"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { DataStatusBadge } from "../shared/DataStatusBadge";
import { Button } from "../ui/Button";
import { cn } from "../../lib/utils";
import {
  calculateOwnershipRecommendation,
  AircraftCategoryType,
  CATEGORY_BENCHMARKS,
} from "../../lib/calculators/ownership-calculator";

interface OwnershipDecisionCalculatorProps {
  isRo?: boolean;
}

export function OwnershipDecisionCalculator({ isRo = false }: OwnershipDecisionCalculatorProps) {
  const [annualHours, setAnnualHours] = useState<number>(120);
  const [aircraftCategory, setAircraftCategory] = useState<AircraftCategoryType>("LIGHT_JET");
  const [customCharterRate, setCustomCharterRate] = useState<string>("");
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

  const parsedCustomRate = customCharterRate ? Number(customCharterRate) : undefined;

  const result = useMemo(() => {
    return calculateOwnershipRecommendation({
      annualHours,
      category: aircraftCategory,
      customCharterRateEur: parsedCustomRate && parsedCustomRate > 0 ? parsedCustomRate : undefined,
    });
  }, [annualHours, aircraftCategory, parsedCustomRate]);

  const handleReset = () => {
    setAnnualHours(120);
    setAircraftCategory("LIGHT_JET");
    setCustomCharterRate("");
    setShowAdvanced(false);
  };

  return (
    <div className="flex flex-col gap-8 w-full p-6 sm:p-10 rounded-3xl bg-[#fafaf7] border border-neutral-200/80 shadow-lg text-neutral-900 font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="editorial-tag-dark">
              {isRo ? "CADRU DE DECIZIE // CHARTER / FRACTIONAL / PROPRIETATE" : "DECISION FRAMEWORK // CHARTER / SHARE / LEASE / OWN"}
            </span>
            <DataStatusBadge status="INDICATIVE" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-light text-neutral-900 mt-2 font-sans">
            {isRo ? "Calculator Comparativ Acces vs. Proprietate Aeronavă" : "Aircraft Access vs. Ownership Economics Engine"}
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="text-xs font-mono text-neutral-500 hover:text-neutral-900 underline transition"
          >
            {isRo ? "Resetează la Etaloane" : "Reset to Benchmarks"}
          </button>
        </div>
      </div>

      {/* Calculator Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-6">
          {/* Category Selector */}
          <div className="space-y-3">
            <label className="text-xs font-mono text-amber-600 font-bold uppercase tracking-wider block">
              01 // {isRo ? "CATEGORIE AERONAVĂ" : "AIRCRAFT CATEGORY"}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(Object.keys(CATEGORY_BENCHMARKS) as AircraftCategoryType[]).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setAircraftCategory(cat)}
                  className={cn(
                    "py-2.5 px-2 rounded-xl text-xs font-mono uppercase tracking-wider transition border text-center font-bold",
                    aircraftCategory === cat
                      ? "bg-amber-600 text-white border-amber-600 shadow-md"
                      : "bg-white text-neutral-700 border-neutral-300 hover:border-neutral-400"
                  )}
                >
                  {cat.replace(/_/g, " ")}
                </button>
              ))}
            </div>
            <span className="text-[11px] text-neutral-500 font-sans block">
              {isRo ? "Model reprezentativ" : "Benchmark model"}: {result.representativeModel}
            </span>
          </div>

          {/* Annual Flight Hours Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-xs font-mono text-amber-600 font-bold uppercase tracking-wider">
                02 // {isRo ? "ORE ANUALE DE ZBOR" : "ANNUAL FLIGHT HOURS"}
              </label>
              <span className="text-xl font-mono font-bold text-neutral-900 bg-white px-3 py-1 rounded-lg border border-neutral-200 shadow-xs">
                {annualHours} {isRo ? "ORE / AN" : "HRS / YEAR"}
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="400"
              step="5"
              value={annualHours}
              onChange={(e) => setAnnualHours(parseInt(e.target.value, 10))}
              className="w-full accent-amber-600 cursor-pointer h-2 bg-neutral-200 rounded-lg"
              aria-label="Annual Flight Hours Slider"
            />
            <div className="grid grid-cols-5 text-[9px] font-mono text-neutral-500 text-center">
              <span>&lt;50h (Charter)</span>
              <span>50-100h (Card)</span>
              <span>100-175h (Fractional)</span>
              <span>175-250h (Lease)</span>
              <span>250h+ (Whole)</span>
            </div>
          </div>

          {/* Optional Custom Charter Rate Toggle */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-xs font-mono text-neutral-600 hover:text-neutral-900 flex items-center gap-1.5"
            >
              <span>{showAdvanced ? "▼" : "▶"}</span>
              <span>{isRo ? "Ajustează Tarif Orar Charter (Opțional)" : "Customize Hourly Charter Rate (Optional)"}</span>
            </button>

            {showAdvanced && (
              <div className="mt-3 p-4 rounded-xl bg-white border border-neutral-200 space-y-2">
                <label className="text-[10px] font-mono text-neutral-500 uppercase block font-bold">
                  {isRo ? "Tarif Orar Charter Personalizat (€ / oră)" : "Custom Hourly Charter Rate (€ / hour)"}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder={`Etalon: €${CATEGORY_BENCHMARKS[aircraftCategory].defaultHourlyCharterRateEur}`}
                    value={customCharterRate}
                    onChange={(e) => setCustomCharterRate(e.target.value)}
                    className="w-full text-xs font-mono px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  {customCharterRate && (
                    <button
                      type="button"
                      onClick={() => setCustomCharterRate("")}
                      className="text-xs text-neutral-400 hover:text-neutral-700 px-2 font-mono"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Verdict Card */}
        <div className="lg:col-span-7 p-6 sm:p-7 rounded-2xl bg-white border border-neutral-200 shadow-md flex flex-col justify-between gap-6">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-600 animate-pulse" />
                <span className="text-[10px] font-mono text-amber-600 font-bold uppercase tracking-widest">
                  {isRo ? "MODEL RECOMANDAT DE AIR" : "AIR STRATEGIC RECOMMENDATION"}
                </span>
              </div>
              <span className="text-[11px] font-mono bg-amber-50 text-amber-800 px-2.5 py-1 rounded border border-amber-200 font-bold">
                {result.hoursBandDescription}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-light text-neutral-900 font-sans">
              {result.headline}
            </h3>

            <p className="text-xs sm:text-sm text-neutral-600 font-sans leading-relaxed">
              {result.detailedReason}
            </p>
          </div>

          {/* Comparative Numbers Breakdown */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-xs font-mono">
            <div>
              <span className="block text-[9px] text-neutral-400 uppercase">
                {isRo ? "CHARTER ANUAL" : "CHARTER ANNUAL"}
              </span>
              <span className="text-neutral-900 font-bold text-sm">
                €{result.charterAnnualTotalEur.toLocaleString()}
              </span>
              <span className="text-[9px] text-neutral-500 block">
                €{result.hourlyCharterRateEur.toLocaleString()}/hr {result.isCustomized ? "(custom)" : "(direct)"}
              </span>
            </div>

            <div>
              <span className="block text-[9px] text-neutral-400 uppercase">
                {isRo ? "COST PROPRIETATE ANUAL" : "OWNERSHIP ANNUAL OPEX"}
              </span>
              <span className="text-neutral-900 font-bold text-sm">
                €{result.ownershipAnnualTotalEur.toLocaleString()}
              </span>
              <span className="text-[9px] text-neutral-500 block">
                €{result.effectiveOwnershipHourlyEur.toLocaleString()}/hr {isRo ? "efectiv" : "effective"}
              </span>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <span className="block text-[9px] text-neutral-400 uppercase">
                {isRo ? "CAPITAL ACHIZIȚIE" : "CAPITAL OUTLAY"}
              </span>
              <span className="text-neutral-900 font-bold text-sm">
                €{(result.capitalOutlayEur / 1000000).toFixed(1)}M
              </span>
              <span className="text-[9px] text-neutral-500 block">
                {isRo ? "Etalon pre-owned" : "Typical pre-owned"}
              </span>
            </div>
          </div>

          {/* Bottom Action Triggers */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-neutral-100">
            <span className="text-xs font-sans text-neutral-600">
              {isRo ? "Model optim:" : "Recommended Model:"}{" "}
              <strong className="text-amber-600 font-mono">{result.modelTitle}</strong>
            </span>
            <div className="flex items-center gap-2">
              <Link href="/contact?service=Aircraft%20Ownership">
                <Button variant="primary" size="sm">
                  {isRo ? "CONSULTANȚĂ ADVISORY →" : "REQUEST ADVISORY →"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mandatory Statutory Economics & Independence Disclaimer */}
      <div className="p-5 rounded-xl bg-neutral-100 border border-neutral-200 text-xs text-neutral-600 leading-relaxed font-sans">
        <strong className="text-neutral-900 font-mono block mb-1">
          {isRo ? "NOTĂ METODOLOGICĂ ȘI DECLINARE FINANCIARĂ:" : "METHODOLOGY & FINANCIAL TRANSPARENCY NOTICE:"}
        </strong>
        {isRo
          ? "Rezultatele afișate reprezintă simulări economice orientative bazate pe etaloane europene de piață (costuri fixe estimate: echipaj, hangar, asigurări hull/răspundere, management CAMO; costuri variabile: combustibil JET A-1, rezerve revizie motoare, taxe handling). Acestea nu constituie consultanță financiară sau garanții de economii. Decizia optimă depinde de profilul misiunilor, deductibilitatea fiscală a amortizării și termenii contractuali agreați cu operatorul deținător de AOC."
          : "Results displayed represent indicative economic simulations based on standard European operational benchmarks (estimated fixed costs: flight crew, hangarage, hull/liability insurance, CAMO oversight; variable costs: JET A-1 fuel burn, engine overhaul reserves, handling fees). Outputs do not constitute financial advice or guarantees of savings. Optimal structure depends on route profiles, tax depreciation, and actual contractual terms negotiated with certified AOC operators."}
      </div>
    </div>
  );
}
