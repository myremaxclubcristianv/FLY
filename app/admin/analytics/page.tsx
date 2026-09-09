import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Operational Analytics — AIR Admin",
  description: "Internal AIR demand, quote response time, and conversion metrics.",
  robots: { index: false, follow: false },
};

export default function AdminAnalyticsPage() {
  const metrics = [
    { label: "Missions Created (30d)", value: "14", trend: "+25%" },
    { label: "Avg Operator Response Time", value: "42 min", trend: "-12m" },
    { label: "Quote Conversion Rate", value: "38%", trend: "+5%" },
    { label: "Popular Route", value: "Bucharest → Nice", trend: "4 Missions" },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 p-6 sm:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase text-amber-400">PRODUCT INTELLIGENCE</span>
            <h1 className="text-2xl font-light text-white mt-1">Operational Aviation Analytics</h1>
          </div>
          <Link href="/admin" className="text-xs text-amber-400 hover:underline font-mono">← Admin Overview</Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m, i) => (
            <div key={i} className="p-6 bg-neutral-900/40 border border-neutral-800 rounded-2xl space-y-2">
              <span className="text-xs text-neutral-400 font-mono block">{m.label}</span>
              <span className="text-2xl font-light text-white font-mono block">{m.value}</span>
              <span className="text-[10px] text-amber-400 font-mono bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 inline-block">
                {m.trend}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
