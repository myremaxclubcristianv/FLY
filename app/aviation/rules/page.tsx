import { Metadata } from "next";
import Link from "next/link";
import { ProvenanceBadge } from "@/components/shared/ProvenanceBadge";

export const metadata: Metadata = {
  title: "Aviation Rules & Regulations | AIR Intelligence",
  description:
    "Comprehensive aviation regulatory reference covering EASA Part-CAT, AOC vs ATO, General Aviation, slot coordination, PPR, and customs rules.",
};

export default function AviationRulesPage() {
  const topics = [
    {
      title: "EASA Part-CAT (Commercial Air Transport)",
      desc: "Framework governing commercial airline and business jet charter operations. Mandates flight crew duty limits, continuous maintenance audits, and commercial passenger safety requirements.",
    },
    {
      title: "AOC vs ATO: Legal Distinction",
      desc: "An Air Operator Certificate (AOC) grants permission for commercial passenger transport. An Approved Training Organization (ATO) grants permission for pilot flight training. ATOs cannot perform commercial charter.",
    },
    {
      title: "Airport Slots & PPR (Prior Permission Required)",
      desc: "Slot coordination controls runway and gate congestion at constrained airports. PPR requires executive jet operators to obtain advance approval before landing or parking.",
    },
    {
      title: "Customs & Immigration Protocols",
      desc: "Private aviation passengers clear border control through dedicated FBO facilities. Intra-Schengen flights bypass passport control, while extra-Schengen flights require advance passenger information (API).",
    },
    {
      title: "CAMO & Continuing Airworthiness",
      desc: "Continuing Airworthiness Management Organizations audit every flight hour, engine cycle, and component lifespan to guarantee compliance with EASA airworthiness directives.",
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        <Link href="/aviation/learn" className="text-xs font-mono text-amber-400 hover:underline block">
          ← Return to Aviation Knowledge Center
        </Link>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-amber-400 font-bold uppercase bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
              REGULATORY INTELLIGENCE
            </span>
            <ProvenanceBadge status="VERIFIED" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-light text-white tracking-tight">
            Aviation Rules & Regulations
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-3xl">
            Authoritative breakdown of European aviation regulatory frameworks governing commercial air transport, private operations, airport access, and airworthiness.
          </p>
        </div>

        <div className="space-y-6">
          {topics.map((t, i) => (
            <div key={i} className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 space-y-2">
              <h2 className="text-xl font-medium text-amber-300">{t.title}</h2>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-neutral-900/30 border border-neutral-800 rounded-xl p-6 text-xs text-neutral-500 font-mono space-y-1">
          <p className="text-neutral-400 font-bold">GENERAL INFORMATION NOTICE</p>
          <p>This content is provided for informational and educational purposes. Regulatory requirements are governed directly by EASA and national authorities (such as AACR).</p>
        </div>
      </div>
    </div>
  );
}
