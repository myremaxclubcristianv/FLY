import { Metadata } from "next";
import Link from "next/link";
import { DataStatusBadge } from "@/components/shared/DataStatusBadge";

export const metadata: Metadata = {
  title: "Mission Sourcing Detail — AIR Operations",
  description: "Internal AIR Operator Sourcing & Quote Logging Console.",
  robots: { index: false, follow: false },
};

export default async function AdminMissionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const mockMissionDetail = {
    referenceId: id,
    origin: "Bucharest Băneasa (LBS / BBU)",
    destination: "Nice Côte d'Azur (NCE)",
    date: "2026-09-24",
    preferredTime: "10:30 EET",
    passengers: 4,
    priority: "FASTEST",
    status: "OPTIONS_READY",
    customerName: "VIP Charter Client",
    customerEmail: "client@air.aero",
    customerPhone: "+40 722 000 000",
    decisionRecommendation:
      "Embraer Phenom 300E (Light Jet) — Speed 453 KTS, door-to-door range 1,971 NM, direct home base at LBS.",
    operatorRequests: [
      {
        id: "op-req-1",
        operatorName: "Toyo Aviation (AOC RO-014)",
        aircraftModel: "Phenom 300E (YR-TYA)",
        status: "QUOTE_RECEIVED",
        requestedPrice: "€8,800",
        pricingStatus: "INDICATIVE" as const,
        requestedAt: "2026-09-08 14:35",
      },
      {
        id: "op-req-2",
        operatorName: "Ion Tiriac Air (AOC RO-002)",
        aircraftModel: "Challenger 350 (YR-TIA)",
        status: "QUOTE_RECEIVED",
        requestedPrice: "€15,200",
        pricingStatus: "INDICATIVE" as const,
        requestedAt: "2026-09-08 14:40",
      },
    ],
    timeline: [
      { time: "2026-09-08 14:30", event: "Mission Created via Customer Planner", actor: "CUSTOMER" },
      { time: "2026-09-08 14:32", event: "AIR Decision Engine Evaluated Parameters: Phenom 300E Recommended", actor: "DECISION_ENGINE" },
      { time: "2026-09-08 14:35", event: "Internal Operator Sourcing Request Logged for Toyo Aviation", actor: "OPS_CONSOLE" },
      { time: "2026-09-08 14:45", event: "Indicative Operator Quote €8,800 Logged to Mission Options", actor: "OPS_DISPATCH" },
    ],
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 p-6 sm:p-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <Link href="/admin/missions" className="text-xs text-amber-400 hover:underline flex items-center gap-1 mb-3 font-mono">
            ← Return to Mission Queue
          </Link>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 backdrop-blur-xl">
            <div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-amber-400 bg-neutral-950 px-2.5 py-1 rounded border border-amber-500/20">
                  {mockMissionDetail.referenceId}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] uppercase font-mono font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  SIMULATION / INTERNAL REQUEST
                </span>
              </div>
              <h1 className="text-2xl font-light text-white mt-2">
                {mockMissionDetail.origin} → {mockMissionDetail.destination}
              </h1>
              <p className="text-xs text-neutral-400 mt-1">
                Client: <strong>{mockMissionDetail.customerName}</strong> ({mockMissionDetail.customerEmail}) | Pax: <strong>{mockMissionDetail.passengers}</strong>
              </p>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-mono text-neutral-500 uppercase">Sourcing Status</span>
              <p className="text-sm font-semibold text-blue-400 font-mono uppercase">{mockMissionDetail.status}</p>
            </div>
          </div>
        </div>

        {/* Decision Engine Recommendation */}
        <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold uppercase">
            <span>✨ DECISION ENGINE RATIONALE</span>
          </div>
          <p className="text-sm text-neutral-200">{mockMissionDetail.decisionRecommendation}</p>
        </div>

        {/* Operator Requests Sourcing Table */}
        <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-light text-white">Operator Sourcing & Logged Quotes</h2>
            <span className="text-xs font-mono text-neutral-400">Internal Simulation Adapter</span>
          </div>

          <div className="space-y-3">
            {mockMissionDetail.operatorRequests.map((req) => (
              <div key={req.id} className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-medium text-white">{req.operatorName}</h3>
                  <p className="text-xs text-neutral-400 font-mono">{req.aircraftModel}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-amber-300 font-mono">{req.requestedPrice}</span>
                  <div className="mt-1 flex items-center gap-2 justify-end">
                    <DataStatusBadge status={req.pricingStatus} />
                    <span className="text-[10px] font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                      {req.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Event Audit Log */}
        <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-light text-white">Mission Event Timeline & Audit Log</h2>
          <div className="space-y-3 font-mono text-xs">
            {mockMissionDetail.timeline.map((item, idx) => (
              <div key={idx} className="flex gap-4 py-2 border-b border-neutral-800/60 last:border-0">
                <span className="text-neutral-500 w-36">{item.time}</span>
                <span className="text-amber-400 font-bold w-32">{item.actor}</span>
                <span className="text-neutral-200">{item.event}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
