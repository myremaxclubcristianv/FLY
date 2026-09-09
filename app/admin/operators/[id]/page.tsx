import { Metadata } from "next";
import Link from "next/link";
import { ProvenanceBadge } from "@/components/shared/ProvenanceBadge";

export const metadata: Metadata = {
  title: "Operator Profile & Fleet Supply — AIR Admin",
  description: "Operator regulatory record, AOC details, and registered tail supply.",
  robots: { index: false, follow: false },
};

export default async function AdminOperatorDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const mockOperator = {
    slug: id,
    displayName: "Toyo Aviation",
    legalName: "Toyo Aviation SRL",
    country: "Romania",
    city: "Bucharest",
    baseAirportIcao: "LRBS",
    baseAirportName: "Băneasa Aurel Vlaicu International Airport",
    aocNumber: "RO-014",
    aocAuthority: "Romanian Civil Aeronautical Authority (AACR)",
    aocVerified: true,
    website: "https://toyoaviation.ro",
    contactEmail: "charter@toyoaviation.ro",
    contactPhone: "+40 21 000 0000",
    verificationStatus: "VERIFIED" as const,
    dataStatus: "VERIFIED" as const,
    lastVerifiedAt: "2026-09-08",
    fleetSupply: [
      {
        tailNumber: "YR-TYA",
        modelSlug: "phenom-300e",
        modelName: "Embraer Phenom 300E",
        category: "LIGHT_JET",
        yom: 2021,
        homeBase: "LRBS Băneasa",
        status: "ACTIVE",
        verificationStatus: "VERIFIED" as const,
      },
      {
        tailNumber: "YR-TYB",
        modelSlug: "citation-cj4",
        modelName: "Cessna Citation CJ4",
        category: "LIGHT_JET",
        yom: 2019,
        homeBase: "LRBS Băneasa",
        status: "ACTIVE",
        verificationStatus: "VERIFIED" as const,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 p-6 sm:p-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <Link href="/admin/operators" className="text-xs text-amber-400 hover:underline flex items-center gap-1 mb-3 font-mono">
            ← Return to Operators Directory
          </Link>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 backdrop-blur-xl">
            <div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-neutral-400">AOC {mockOperator.aocNumber}</span>
                <ProvenanceBadge status={mockOperator.verificationStatus} />
              </div>
              <h1 className="text-2xl font-light text-white mt-2">{mockOperator.displayName}</h1>
              <p className="text-xs text-neutral-400 font-mono mt-1">{mockOperator.legalName} • {mockOperator.city}, {mockOperator.country}</p>
            </div>

            <div className="text-right text-xs font-mono">
              <span className="text-neutral-500 block">Authority</span>
              <span className="text-white font-semibold">{mockOperator.aocAuthority}</span>
            </div>
          </div>
        </div>

        {/* Regulatory & Provenance Details */}
        <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 grid md:grid-cols-3 gap-6 text-xs">
          <div>
            <span className="text-neutral-500 block font-mono">Operating Base</span>
            <span className="text-amber-300 font-semibold">{mockOperator.baseAirportIcao} — {mockOperator.baseAirportName}</span>
          </div>
          <div>
            <span className="text-neutral-500 block font-mono">Charter Contact Email</span>
            <span className="text-white font-mono">{mockOperator.contactEmail}</span>
          </div>
          <div>
            <span className="text-neutral-500 block font-mono">Last Verified Date</span>
            <span className="text-white font-mono">{mockOperator.lastVerifiedAt}</span>
          </div>
        </div>

        {/* Strict Aircraft Model vs Aircraft Supply Section */}
        <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-light text-white">Registered Tail Number Fleet Supply</h2>
            <span className="text-xs font-mono text-amber-400">Model ≠ Aircraft Supply Distinction Enforced</span>
          </div>

          <div className="space-y-3">
            {mockOperator.fleetSupply.map((ac) => (
              <div key={ac.tailNumber} className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-bold text-amber-400 bg-neutral-900 px-2 py-0.5 rounded border border-amber-500/20">
                      {ac.tailNumber}
                    </span>
                    <span className="text-sm font-medium text-white">{ac.modelName}</span>
                  </div>
                  <p className="text-xs text-neutral-400 font-mono mt-1">YOM: {ac.yom} • Home Base: {ac.homeBase}</p>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-green-500/10 text-green-400 border border-green-500/20">
                    {ac.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
