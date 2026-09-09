import { Metadata } from "next";
import Link from "next/link";
import { ProvenanceBadge } from "@/components/shared/ProvenanceBadge";

export const metadata: Metadata = {
  title: "Operator Supply Directory — AIR Admin",
  description: "Internal AIR Operator Management & Fleet Tail Supply Console.",
  robots: { index: false, follow: false },
};

export default function AdminOperatorsDirectoryPage() {
  const operators = [
    {
      id: "op-1",
      slug: "toyo-aviation",
      displayName: "Toyo Aviation",
      legalName: "Toyo Aviation SRL",
      country: "Romania",
      baseAirportIcao: "LRBS",
      aocNumber: "RO-014",
      aocVerified: true,
      fleetCount: 4,
      verificationStatus: "VERIFIED" as const,
      dataStatus: "VERIFIED" as const,
      lastVerifiedAt: "2026-09-08",
    },
    {
      id: "op-2",
      slug: "tiriac-air",
      displayName: "Ion Țiriac Air",
      legalName: "Ion Tiriac Air SRL",
      country: "Romania",
      baseAirportIcao: "LROP",
      aocNumber: "RO-002",
      aocVerified: true,
      fleetCount: 3,
      verificationStatus: "VERIFIED" as const,
      dataStatus: "VERIFIED" as const,
      lastVerifiedAt: "2026-09-08",
    },
    {
      id: "op-3",
      slug: "carpathian-heli",
      displayName: "Carpathian Heli Access",
      legalName: "Carpathian Helicopter Services SRL",
      country: "Romania",
      baseAirportIcao: "LRTZ",
      aocNumber: "RO-029",
      aocVerified: true,
      fleetCount: 2,
      verificationStatus: "DATA_VERIFIED" as const,
      dataStatus: "VERIFIED" as const,
      lastVerifiedAt: "2026-09-08",
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 p-6 sm:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 backdrop-blur-xl">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20">
                AIR SUPPLY CONSOLE
              </span>
            </div>
            <h1 className="text-2xl font-light text-white mt-2">Verified Operator Registry & Fleet Supply</h1>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <Link href="/admin/missions" className="text-neutral-400 hover:text-white underline">
              Mission Queue
            </Link>
            <Link href="/admin/verification" className="text-amber-400 hover:text-amber-300 underline">
              Verification Engine
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {operators.map((op) => (
            <div key={op.id} className="bg-neutral-900/40 border border-neutral-800 hover:border-neutral-700 rounded-2xl p-6 space-y-4 transition flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-mono text-neutral-500 block">AOC {op.aocNumber}</span>
                    <h2 className="text-lg font-medium text-white">{op.displayName}</h2>
                  </div>
                  <ProvenanceBadge status={op.verificationStatus} />
                </div>

                <div className="text-xs space-y-1 font-mono text-neutral-300">
                  <p>Legal: <span className="text-neutral-400">{op.legalName}</span></p>
                  <p>Base Airport: <span className="text-amber-300">{op.baseAirportIcao}</span></p>
                  <p>Registered Fleet: <span className="text-white">{op.fleetCount} Aircraft</span></p>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-800">
                <Link
                  href={`/admin/operators/${op.slug}`}
                  className="block text-center py-2 bg-neutral-800 hover:bg-neutral-700 text-amber-300 rounded-lg text-xs font-mono border border-neutral-700 transition"
                >
                  Manage Operator Supply →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
