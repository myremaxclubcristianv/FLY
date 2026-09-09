import { Metadata } from "next";
import Link from "next/link";
import { UnifiedAviationRepository } from "@/lib/repositories/unified-aviation-repo";

export const metadata: Metadata = {
  title: "Aviation Knowledge & Pilot Education Hub | AIR",
  description:
    "Master the world of flight: pilot licensing pathways (PPL, CPL, ATPL), cabin crew EASA certification, air traffic control, and aviation regulations.",
};

export default async function AviationLearnPage() {
  const explainers = await UnifiedAviationRepository.getExplainers();

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="space-y-4">
          <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
            AVIATION KNOWLEDGE CENTER
          </span>
          <h1 className="text-3xl sm:text-5xl font-light text-white tracking-tight">
            Learn to Fly & Aviation Intelligence
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base max-w-3xl leading-relaxed">
            Whether pursuing a private pilot license (PPL), preparing for an airline ATPL career, or seeking deep clarity on EASA flight regulations, AIR provides authoritative aviation intelligence.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          <Link
            href="/aviation/learn/pilot-guide"
            className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-8 backdrop-blur-xl hover:border-amber-500/50 transition group space-y-4"
          >
            <span className="text-xs font-mono text-amber-400 font-bold uppercase block">STEP-BY-STEP ROADMAP</span>
            <h2 className="text-2xl font-light text-white group-hover:text-amber-300 transition">
              How to Become a Pilot →
            </h2>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Complete 10-stage guide from introductory discovery flights and Class 1 medicals to PPL, Instrument Rating, CPL, and Type Ratings.
            </p>
          </Link>

          <Link
            href="/aviation/schools"
            className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-8 backdrop-blur-xl hover:border-amber-500/50 transition group space-y-4"
          >
            <span className="text-xs font-mono text-amber-400 font-bold uppercase block">DIRECTORY</span>
            <h2 className="text-2xl font-light text-white group-hover:text-amber-300 transition">
              Flight Schools & ATOs →
            </h2>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Explore EASA-certified Approved Training Organizations (ATOs) across Romania and Europe, including fleet and simulator specs.
            </p>
          </Link>

          <Link
            href="/aviation/rules"
            className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-8 backdrop-blur-xl hover:border-amber-500/50 transition group space-y-4"
          >
            <span className="text-xs font-mono text-amber-400 font-bold uppercase block">REGULATION & LAW</span>
            <h2 className="text-2xl font-light text-white group-hover:text-amber-300 transition">
              Aviation Rules & AOC →
            </h2>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Understand EASA Part-CAT, Part-NCO, airport slots, PPR, customs clearance protocols, and continuing airworthiness (CAMO).
            </p>
          </Link>
        </div>

        {/* Explainers Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-light text-white">Featured Aviation Explainers</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {explainers.map((exp) => (
              <div key={exp.id} className="bg-neutral-900/30 border border-neutral-800 rounded-xl p-6 space-y-3">
                <span className="text-[10px] font-mono text-amber-400 font-bold uppercase bg-neutral-950 px-2 py-0.5 rounded border border-amber-500/20">
                  {exp.category}
                </span>
                <h3 className="text-lg font-medium text-white">{exp.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{exp.shortDefinition}</p>
                <div className="pt-2">
                  <span className="text-[10px] font-mono text-neutral-500 block">SOURCE: {exp.authoritativeSource}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
