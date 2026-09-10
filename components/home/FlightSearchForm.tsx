"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { Button } from "../ui/Button";

export function FlightSearchForm() {
  const router = useRouter();
  const [from, setFrom] = useState("Bucharest");
  const [to, setTo] = useState("Bran");
  const [date, setDate] = useState("2026-09-12");
  const [passengers, setPassengers] = useState("4");

  // Advanced optional fields (Progressive disclosure)
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [time, setTime] = useState("09:00");
  const [budget, setBudget] = useState("flexible");
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

    if (showAdvanced) {
      if (time) params.append("time", time);
      if (budget) params.append("budget", budget);
    }

    router.push(`/plan?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full glass-elevated p-6 sm:p-8 flex flex-col gap-6 rounded-2xl shadow-2xl"
    >
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-xs font-mono text-white tracking-widest uppercase font-bold">
            FLIGHT SEARCH & DECISION DISCOVERY
          </span>
        </div>
        <span className="text-[10px] font-mono text-neutral-400">
          STEP 1 OF MISSION DISPATCH
        </span>
      </div>

      {/* Main Required Search Fields Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Input
          label="FROM // DEPARTURE"
          placeholder="e.g. Bucharest, OTP, BBU"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          error={errors.from}
          required
        />
        <Input
          label="TO // DESTINATION"
          placeholder="e.g. Bran, Transylvania, Paris"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          error={errors.to}
          required
        />
        <Input
          label="DATE // MISSION DEPARTURE"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <Select
          label="PASSENGERS // WHO"
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

      {/* Progressive Disclosure Optional Toggle */}
      <div>
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-xs font-mono text-amber-400 hover:text-amber-300 transition-colors inline-flex items-center gap-2 font-medium"
        >
          <span>{showAdvanced ? "— HIDE ADVANCED MISSION PARAMETERS" : "+ ADVANCED PARAMETERS (TIME, PRIORITY, BUDGET)"}</span>
        </button>

        {showAdvanced && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 mt-4 border-t border-white/[0.08] animate-in fade-in duration-200">
            <Input
              label="TIME // DEPARTURE HOUR"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
            <Select
              label="PRIORITY // MISSION GOAL"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              options={[
                { value: "FASTEST", label: "FASTEST FLIGHT" },
                { value: "BEST_VALUE", label: "BEST VALUE" },
                { value: "MOST_COMFORTABLE", label: "MOST COMFORTABLE" },
                { value: "MOST_PRIVATE", label: "MOST PRIVATE" },
                { value: "MOST_MEMORABLE", label: "MOST MEMORABLE" },
              ]}
            />
            <Select
              label="BUDGET // FLEXIBILITY"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              options={[
                { value: "flexible", label: "FLEXIBLE OPTIMIZATION" },
                { value: "strict", label: "COST CONSCIOUS" },
                { value: "uncompromising", label: "UNCOMPROMISING SPEED" },
              ]}
            />
          </div>
        )}
      </div>

      {/* Form Submission CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-white/[0.08]">
        <p className="text-[11px] font-mono text-neutral-400">
          INDICATIVE DISCOVERY // VERIFIED OPERATOR NETWORK
        </p>
        <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto shadow-lg">
          SHOW ME HOW TO FLY →
        </Button>
      </div>
    </form>
  );
}

