"use client";

import Link from "next/link";

export default function OperatorSourcingClient() {
  const sourcingQueue = [
    {
      id: "src-1",
      missionRef: "AIR-2026-F982A1",
      routing: "LRBS Băneasa → LFMN Nice Côte d'Azur",
      date: "2026-09-24 10:30 EET",
      passengers: 4,
      requestedCategory: "LIGHT_JET",
      status: "REQUESTED",
      expiresAt: "2026-09-21 18:00 EET",
    },
    {
      id: "src-2",
      missionRef: "AIR-2026-C44109",
      routing: "LROV Brașov → LRTZ Tuzla Heliport",
      date: "2026-10-12 09:00 EET",
      passengers: 2,
      requestedCategory: "HELICOPTER",
      status: "RESPONDED",
      expiresAt: "2026-10-08 12:00 EET",
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 p-6 sm:p-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <Link href="/operator" className="text-xs text-amber-400 hover:underline font-mono block mb-3">
            ← Return to Operator Portal
          </Link>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 backdrop-blur-xl">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-amber-400">DISPATCH DISPATCHING</span>
              <h1 className="text-2xl font-light text-white mt-1">Incoming Sourcing Requests</h1>
            </div>
            <span className="text-xs font-mono text-neutral-400 bg-neutral-900 px-3 py-1 rounded border border-neutral-800">
              Isolated Operator Dispatch Queue
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {sourcingQueue.map((req) => (
            <div key={req.id} className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-amber-400 bg-neutral-950 px-2.5 py-1 rounded border border-amber-500/20">
                    {req.missionRef}
                  </span>
                  <span className="text-[10px] uppercase font-mono font-bold bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded border border-blue-500/20">
                    {req.status}
                  </span>
                </div>
                <h2 className="text-lg font-medium text-white">{req.routing}</h2>
                <p className="text-xs text-neutral-400 font-mono">
                  Date: {req.date} • Pax: {req.passengers} • Category: {req.requestedCategory}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => alert(`Quote response form logged for mission ${req.missionRef}`)}
                  className="bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold px-4 py-2 rounded-lg text-xs transition"
                >
                  Submit Operator Quote →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
