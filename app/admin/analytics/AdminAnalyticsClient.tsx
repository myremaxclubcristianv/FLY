"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ActiveVisitorState } from "@/lib/telemetry/types";
import { formatDuration } from "@/lib/telemetry/telegram";

export function AdminAnalyticsClient() {
  const [activeVisitors, setActiveVisitors] = useState<ActiveVisitorState[]>([]);
  const [lastRefreshed, setLastRefreshed] = useState<string>("");

  const fetchLive = async () => {
    try {
      const res = await fetch("/api/telemetry/live");
      const data = await res.json();
      setActiveVisitors(data.activeVisitors || []);
      setLastRefreshed(new Date().toLocaleTimeString("ro-RO"));
    } catch {
      // Safe fallback
    }
  };

  useEffect(() => {
    fetchLive();
    const interval = setInterval(fetchLive, 5000); // 5s auto-refresh
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 p-6 sm:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Ribbon */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-mono font-bold uppercase text-amber-400 tracking-widest">
                AIR OPERATIONAL INTELLIGENCE // LIVE RADAR
              </span>
            </div>
            <h1 className="text-2xl font-light text-white mt-1">Real-Time Visitor & Journey Gateway</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-neutral-400 font-mono">
              Live updates active (Synced {lastRefreshed || "—"})
            </span>
            <Link href="/admin" className="text-xs text-amber-400 hover:underline font-mono">
              ← Admin Hub
            </Link>
          </div>
        </div>

        {/* Top Operational Metrics */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-neutral-900/40 border border-neutral-800 rounded-2xl space-y-2">
            <span className="text-xs text-neutral-400 font-mono block">ACTIVE LIVE VISITORS</span>
            <span className="text-3xl font-light text-white font-mono block">
              {activeVisitors.length}
            </span>
            <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 inline-block">
              ● Heartbeat Active
            </span>
          </div>

          <div className="p-6 bg-neutral-900/40 border border-neutral-800 rounded-2xl space-y-2">
            <span className="text-xs text-neutral-400 font-mono block">TELEGRAM DISPATCH CHANNEL</span>
            <span className="text-xl font-light text-white font-mono block">Operational</span>
            <span className="text-[10px] text-amber-400 font-mono bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 inline-block">
              Chat: -1003998698561
            </span>
          </div>

          <div className="p-6 bg-neutral-900/40 border border-neutral-800 rounded-2xl space-y-2">
            <span className="text-xs text-neutral-400 font-mono block">ATTRIBUTION INTEGRITY</span>
            <span className="text-xl font-light text-white font-mono block">100% First-Party</span>
            <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 inline-block">
              Zero 3rd-Party Trackers
            </span>
          </div>

          <div className="p-6 bg-neutral-900/40 border border-neutral-800 rounded-2xl space-y-2">
            <span className="text-xs text-neutral-400 font-mono block">INTENT ENGINE</span>
            <span className="text-xl font-light text-white font-mono block">Deterministic P0-P4</span>
            <span className="text-[10px] text-amber-400 font-mono bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 inline-block">
              Multi-Signal Scoring
            </span>
          </div>
        </div>

        {/* Live Active Visitors Table */}
        <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <h2 className="text-sm font-mono font-bold uppercase text-white tracking-wider">
                ACTIVE LIVE VISITORS ON SITE ({activeVisitors.length})
              </h2>
            </div>
            <button
              onClick={fetchLive}
              className="text-[11px] font-mono text-amber-400 hover:text-amber-300 border border-amber-500/30 px-3 py-1 rounded bg-amber-500/10"
            >
              REFRESH RADAR
            </button>
          </div>

          {activeVisitors.length === 0 ? (
            <div className="py-12 text-center text-xs font-mono text-neutral-500">
              No active visitors currently online. Heartbeat monitoring listening for entry vectors...
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="text-neutral-500 text-[10px] border-b border-neutral-800 uppercase">
                  <tr>
                    <th className="pb-3">VISITOR / SESSION</th>
                    <th className="pb-3">SOURCE & LOCATION</th>
                    <th className="pb-3">DEVICE / OS</th>
                    <th className="pb-3">CURRENT PATH</th>
                    <th className="pb-3">ACTIVE TIME</th>
                    <th className="pb-3">COMMERCIAL INTENT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/60 text-neutral-300">
                  {activeVisitors.map((v) => (
                    <tr key={v.sessionId} className="hover:bg-neutral-800/30 transition-colors">
                      <td className="py-3 font-semibold text-white">
                        <span className="text-amber-400">{v.visitorId}</span>
                        <span className="block text-[10px] text-neutral-500 font-normal">
                          {v.sessionId}
                        </span>
                      </td>
                      <td className="py-3">
                        <span className="text-white">{v.sourceSummary}</span>
                        <span className="block text-[10px] text-neutral-500">{v.locationSummary || "—"}</span>
                      </td>
                      <td className="py-3 text-neutral-400">{v.deviceSummary}</td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white">
                          {v.currentPage}
                        </span>
                      </td>
                      <td className="py-3 text-neutral-300 font-bold">
                        {formatDuration(v.activeDurationSeconds)}
                      </td>
                      <td className="py-3">
                        {v.hasCommercialIntent ? (
                          <span className="text-[10px] text-amber-400 font-bold bg-amber-500/15 px-2 py-0.5 rounded border border-amber-500/30">
                            🔥 HIGH INTENT
                          </span>
                        ) : (
                          <span className="text-[10px] text-neutral-500 bg-white/5 px-2 py-0.5 rounded">
                            CASUAL
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
