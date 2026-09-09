import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Multi-Operator Sourcing — AIR Admin",
  description: "Multi-operator dispatch and quote sourcing management.",
  robots: { index: false, follow: false },
};

export default function AdminSourcingPage() {
  const sourcingEntries = [
    {
      id: "src-admin-1",
      missionRef: "AIR-2026-F982A1",
      routing: "LRBS Băneasa → LFMN Nice",
      operatorsContacted: ["Toyo Aviation", "Ion Țiriac Air", "Danube Executive Charter"],
      quotesReceived: 2,
      status: "OPTIONS_READY",
    },
    {
      id: "src-admin-2",
      missionRef: "AIR-2026-C44109",
      routing: "LROV Brașov → LRTZ Tuzla",
      operatorsContacted: ["Carpathian Heli Access"],
      quotesReceived: 1,
      status: "SOURCING",
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 p-6 sm:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase text-amber-400">OPERATIONS DISPATCH</span>
            <h1 className="text-2xl font-light text-white mt-1">Multi-Operator Sourcing Dispatch</h1>
          </div>
          <Link href="/admin/missions" className="text-xs text-amber-400 hover:underline font-mono">← Back to Queue</Link>
        </div>

        <div className="grid gap-4">
          {sourcingEntries.map((entry) => (
            <div key={entry.id} className="p-6 bg-neutral-900/40 border border-neutral-800 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <span className="font-mono text-xs font-bold text-amber-400 bg-neutral-950 px-2.5 py-1 rounded border border-amber-500/20">
                  {entry.missionRef}
                </span>
                <h2 className="text-lg font-medium text-white mt-2">{entry.routing}</h2>
                <p className="text-xs text-neutral-400 font-mono mt-1">
                  Contacted: <span className="text-white">{entry.operatorsContacted.join(", ")}</span>
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs text-neutral-400 font-mono block">Quotes Received: {entry.quotesReceived}</span>
                <span className="px-2 py-0.5 rounded text-[10px] uppercase font-mono font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 mt-1 inline-block">
                  {entry.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
