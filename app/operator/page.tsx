import { Metadata } from "next";
import Link from "next/link";
import { ProvenanceBadge } from "@/components/shared/ProvenanceBadge";

export const metadata: Metadata = {
  title: "Operator Dispatch Portal — AIR Access Network",
  description: "AOC Operator portal for managing mission sourcing requests and registered fleet supply.",
  robots: { index: false, follow: false },
};

export default function OperatorPortalPage() {
  const mockOperatorInfo = {
    displayName: "Toyo Aviation SRL",
    aocNumber: "RO-014",
    homeBase: "LRBS — Bucharest Băneasa",
    activeSourcingRequests: 2,
    fleetCount: 4,
    verificationStatus: "VERIFIED" as const,
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 p-6 sm:p-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-8 backdrop-blur-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20">
                AOC OPERATOR PORTAL
              </span>
              <ProvenanceBadge status={mockOperatorInfo.verificationStatus} />
            </div>
            <h1 className="text-2xl sm:text-3xl font-light text-white mt-2 tracking-tight">
              {mockOperatorInfo.displayName}
            </h1>
            <p className="text-xs text-neutral-400 font-mono mt-1">
              AOC: <strong className="text-white">{mockOperatorInfo.aocNumber}</strong> | Base: <strong className="text-amber-300">{mockOperatorInfo.homeBase}</strong>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/operator/sourcing"
              className="bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold px-4 py-2.5 rounded-lg text-xs transition"
            >
              Manage Sourcing Requests ({mockOperatorInfo.activeSourcingRequests})
            </Link>
            <Link
              href="/operator/fleet"
              className="bg-neutral-800 hover:bg-neutral-700 text-neutral-200 px-4 py-2.5 rounded-lg text-xs font-mono border border-neutral-700 transition"
            >
              Fleet Tail Supply ({mockOperatorInfo.fleetCount})
            </Link>
          </div>
        </div>

        {/* Operational Overview Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-semibold text-amber-400 uppercase tracking-wider font-mono">Incoming Sourcing Requests</h2>
              <Link href="/operator/sourcing" className="text-xs text-amber-400 hover:underline">View All →</Link>
            </div>
            <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-mono text-amber-400 font-bold">AIR-2026-F982A1</span>
                <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded border border-blue-500/20">Action Required</span>
              </div>
              <p className="text-sm text-white font-medium">LRBS Băneasa → LFMN Nice Côte d&apos;Azur</p>
              <p className="text-xs text-neutral-400 font-mono">Date: 2026-09-24 • 4 Pax • Category: Light Jet (Phenom 300E)</p>
            </div>
          </div>

          <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-semibold text-amber-400 uppercase tracking-wider font-mono">Registered Tail Supply Status</h2>
              <Link href="/operator/fleet" className="text-xs text-amber-400 hover:underline">Manage Fleet →</Link>
            </div>
            <div className="space-y-2">
              <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-lg flex justify-between items-center text-xs font-mono">
                <div>
                  <span className="text-white font-bold">YR-TYA</span> — Embraer Phenom 300E
                </div>
                <span className="text-green-400 bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20">ACTIVE / CHARTER</span>
              </div>
              <div className="p-3 bg-neutral-950 border border-neutral-800 rounded-lg flex justify-between items-center text-xs font-mono">
                <div>
                  <span className="text-white font-bold">YR-TYB</span> — Cessna Citation CJ4
                </div>
                <span className="text-green-400 bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20">ACTIVE / CHARTER</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
