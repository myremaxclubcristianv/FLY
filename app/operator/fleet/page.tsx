import { Metadata } from "next";
import Link from "next/link";
import { ProvenanceBadge } from "@/components/shared/ProvenanceBadge";

export const metadata: Metadata = {
  title: "Registered Fleet Supply — Operator Portal",
  description: "Manage registered tail numbers, YOM, home base, and AOC availability status.",
  robots: { index: false, follow: false },
};

export default function OperatorFleetPage() {
  const fleetSupply = [
    {
      tailNumber: "YR-TYA",
      modelName: "Embraer Phenom 300E",
      category: "LIGHT_JET",
      yom: 2021,
      homeBase: "LRBS Băneasa",
      paxCapacity: 6,
      status: "ACTIVE",
      verificationStatus: "VERIFIED" as const,
    },
    {
      tailNumber: "YR-TYB",
      modelName: "Cessna Citation CJ4",
      category: "LIGHT_JET",
      yom: 2019,
      homeBase: "LRBS Băneasa",
      paxCapacity: 7,
      status: "ACTIVE",
      verificationStatus: "VERIFIED" as const,
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
              <span className="text-[10px] font-mono font-bold uppercase text-amber-400">REGISTERED SUPPLY</span>
              <h1 className="text-2xl font-light text-white mt-1">Fleet Tail Supply Registry</h1>
            </div>
            <span className="text-xs font-mono text-neutral-400">Strict Tail Number vs Model Distinction</span>
          </div>
        </div>

        <div className="space-y-4">
          {fleetSupply.map((ac) => (
            <div key={ac.tailNumber} className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-bold text-amber-400 bg-neutral-950 px-2.5 py-1 rounded border border-amber-500/20">
                    {ac.tailNumber}
                  </span>
                  <ProvenanceBadge status={ac.verificationStatus} />
                </div>
                <h2 className="text-lg font-medium text-white">{ac.modelName}</h2>
                <p className="text-xs text-neutral-400 font-mono">
                  YOM: {ac.yom} • Home Base: {ac.homeBase} • Capacity: {ac.paxCapacity} pax
                </p>
              </div>

              <div className="text-right font-mono text-xs">
                <span className="px-3 py-1 bg-green-500/10 text-green-400 rounded border border-green-500/20 font-bold uppercase">
                  {ac.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
