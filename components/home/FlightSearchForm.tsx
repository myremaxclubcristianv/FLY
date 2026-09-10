"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { Button } from "../ui/Button";

const PRIORITIES = [
  { id: "FASTEST", label: "FASTEST", desc: "Direct routing & max cruise speed" },
  { id: "BEST_VALUE", label: "BEST VALUE", desc: "Optimized category economics" },
  { id: "MOST_COMFORTABLE", label: "MOST COMFORTABLE", desc: "Stand-up cabin & wide floor" },
  { id: "MOST_PRIVATE", label: "MOST PRIVATE", desc: "Discreet FBO ramp & VIP security" },
  { id: "MOST_MEMORABLE", label: "MOST MEMORABLE", desc: "Helicopter scenic & island arrival" },
];

export function FlightSearchForm() {
  const router = useRouter();
  const [from, setFrom] = useState("Bucharest (LRBS)");
  const [to, setTo] = useState("Nice (LFMN)");
  const [date, setDate] = useState("2026-09-15");
  const [passengers, setPassengers] = useState("4");
  const [priority, setPriority] = useState("FASTEST");
  const [errors, setErrors] = useState<{ from?: string; to?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { from?: string; to?: string } = {};

    if (!from.trim()) {
      newErrors.from = "Please enter a departure point.";
    }
    if (!to.trim()) {
      newErrors.to = "Please enter a destination.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    const params = new URLSearchParams({
      from,
      to,
      date,
      passengers,
      priority,
    });

    router.push(`/plan?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full glass-elevated p-8 sm:p-10 flex flex-col gap-8 rounded-3xl shadow-2xl border border-white/10"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-xs font-mono text-amber-400 tracking-widest uppercase font-bold">
            FLIGHT DECISION ENGINE // CONTROL INTERFACE
          </span>
        </div>
        <span className="text-[10px] font-mono text-neutral-400">
          LRBS EXECUTIVE DISPATCH ACTIVE
        </span>
      </div>

      {/* Main Required Search Fields Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Input
          label="FROM // DEPARTURE AIRPORT / CITY"
          placeholder="e.g. Bucharest (LRBS), Paris (LFPB)"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          error={errors.from}
          required
        />
        <Input
          label="TO // ARRIVAL DESTINATION"
          placeholder="e.g. Nice (LFMN), Mykonos, Geneva"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          error={errors.to}
          required
        />
        <Input
          label="WHEN // DEPARTURE DATE"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <Select
          label="WHO // PASSENGER COMPLEMENT"
          value={passengers}
          onChange={(e) => setPassengers(e.target.value)}
          options={[
            { value: "1", label: "1 PASSENGER" },
            { value: "2", label: "2 PASSENGERS" },
            { value: "3", label: "3 PASSENGERS" },
            { value: "4", label: "4 PASSENGERS" },
            { value: "5-7", label: "5 - 7 PASSENGERS" },
            { value: "8+", label: "8+ PASSENGERS" },
          ]}
        />
      </div>

      {/* WHAT MATTERS MOST? Priority Selector */}
      <div className="space-y-3 pt-2">
        <span className="text-[11px] font-mono text-neutral-300 font-bold uppercase tracking-wider block">
          WHAT MATTERS MOST? // MISSION CRITERIA
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {PRIORITIES.map((p) => {
            const isSelected = priority === p.id;
            return (
              <button
                type="button"
                key={p.id}
                onClick={() => setPriority(p.id)}
                className={`p-3.5 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between gap-1.5 ${
                  isSelected
                    ? "bg-amber-500/15 border-amber-400/60 shadow-lg shadow-amber-500/5 text-white ring-1 ring-amber-400/30"
                    : "bg-white/[0.03] border-white/[0.08] text-neutral-300 hover:border-white/20 hover:bg-white/[0.06]"
                }`}
              >
                <span className={`text-xs font-mono font-bold ${isSelected ? "text-amber-400" : "text-neutral-200"}`}>
                  {p.label}
                </span>
                <span className="text-[10px] text-neutral-400 leading-tight">
                  {p.desc}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Form Submission Trigger */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 border-t border-white/[0.08]">
        <div className="text-[11px] font-mono text-neutral-400 flex items-center gap-2">
          <span className="text-amber-400">●</span>
          <span>AIR CALCULATES DIRECT ROUTE, AIR MILES & MATCHED FLEET DOSSIER</span>
        </div>
        <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto px-10 shadow-xl text-sm font-bold">
          PLAN THE FLIGHT →
        </Button>
      </div>
    </form>
  );
}

