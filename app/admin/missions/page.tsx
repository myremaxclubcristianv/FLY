import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Operations Console — AIR Admin",
  description: "AIR Internal Ops Mission Sourcing & Dispatch Queue.",
  robots: { index: false, follow: false },
};

export default function AdminMissionsQueuePage() {
  const missionsQueue = [
    {
      id: "msn-1",
      referenceId: "AIR-2026-F982A1",
      origin: "Bucharest Băneasa (LBS/BBU)",
      destination: "Nice Côte d'Azur (NCE)",
      date: "2026-09-24",
      passengers: 4,
      priority: "FASTEST",
      status: "OPTIONS_READY",
      sourcingStatus: "QUOTES_LOGGED",
      assignedOperator: "Toyo Aviation AOC RO-014",
      createdAt: "2026-09-08 14:30",
    },
    {
      id: "msn-2",
      referenceId: "AIR-2026-C44109",
      origin: "Cluj-Napoca (CLJ)",
      destination: "Tuzla Heliport (LRTZ)",
      date: "2026-10-12",
      passengers: 2,
      priority: "MOST_MEMORABLE",
      status: "SOURCING",
      sourcingStatus: "REQUESTED",
      assignedOperator: "Carpathian Heli Access",
      createdAt: "2026-09-09 09:15",
    },
    {
      id: "msn-3",
      referenceId: "AIR-2026-B81190",
      origin: "Bucharest Otopeni (OTP)",
      destination: "London Luton (LTN)",
      date: "2026-09-28",
      passengers: 6,
      priority: "BEST_VALUE",
      status: "SUBMITTED",
      sourcingStatus: "UNASSIGNED",
      assignedOperator: "Ion Tiriac Air AOC RO-002",
      createdAt: "2026-09-09 16:45",
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 p-6 sm:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 backdrop-blur-xl">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20">
                AIR INTERNAL OPERATIONS
              </span>
              <span className="text-[10px] font-mono text-neutral-400 bg-neutral-800 px-2 py-0.5 rounded border border-neutral-700">
                SIMULATION / INTERNAL REQUEST MODE
              </span>
            </div>
            <h1 className="text-2xl font-light text-white mt-2">Mission Queue & Sourcing Dispatch</h1>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <Link href="/admin" className="text-neutral-400 hover:text-white underline">
              Admin Overview
            </Link>
            <Link href="/admin/operators" className="text-neutral-400 hover:text-white underline">
              Operators Console
            </Link>
            <Link href="/admin/verification" className="text-amber-400 hover:text-amber-300 font-semibold underline">
              Verification Engine
            </Link>
          </div>
        </div>

        {/* Mission Queue Table */}
        <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-neutral-800 text-neutral-400 uppercase">
                <th className="pb-3 px-2">Ref ID</th>
                <th className="pb-3 px-2">Routing</th>
                <th className="pb-3 px-2">Date</th>
                <th className="pb-3 px-2">Pax</th>
                <th className="pb-3 px-2">Priority</th>
                <th className="pb-3 px-2">Status</th>
                <th className="pb-3 px-2">Sourcing</th>
                <th className="pb-3 px-2">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {missionsQueue.map((m) => (
                <tr key={m.id} className="hover:bg-neutral-900/80 transition">
                  <td className="py-4 px-2 font-bold text-amber-400">{m.referenceId}</td>
                  <td className="py-4 px-2 text-white font-sans text-sm font-medium">{m.origin} → {m.destination}</td>
                  <td className="py-4 px-2 text-neutral-300">{m.date}</td>
                  <td className="py-4 px-2 text-neutral-300">{m.passengers} pax</td>
                  <td className="py-4 px-2 text-amber-300">{m.priority}</td>
                  <td className="py-4 px-2">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase">
                      {m.status}
                    </span>
                  </td>
                  <td className="py-4 px-2">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/10 text-amber-300 border border-amber-500/20">
                      {m.sourcingStatus}
                    </span>
                  </td>
                  <td className="py-4 px-2">
                    <Link
                      href={`/admin/missions/${m.referenceId}`}
                      className="bg-neutral-800 hover:bg-neutral-700 text-amber-300 px-3 py-1 rounded text-[11px] font-sans border border-neutral-700 transition"
                    >
                      Manage Mission →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
