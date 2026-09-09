import { Metadata } from "next";
import Image from "next/image";
import { UnifiedAviationRepository } from "@/lib/repositories/unified-aviation-repo";
import { ProvenanceBadge } from "@/components/shared/ProvenanceBadge";

export const metadata: Metadata = {
  title: "Aviation Visual Explainers & Concepts | AIR",
  description:
    "Visual guides explaining core aviation concepts: AOC, FBO, PPR, Empty Legs, Aircraft Registration, and Type Ratings.",
};

export default async function AviationExplainersPage() {
  const explainers = await UnifiedAviationRepository.getExplainers();

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-amber-400 font-bold uppercase bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
              AVIATION EXPLAINED
            </span>
            <ProvenanceBadge status="VERIFIED" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-light text-white tracking-tight">
            Aviation Concepts Explained
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base max-w-3xl leading-relaxed">
            Concise, authoritative visual guides demystifying the complex terminology, operations, and regulatory mechanics of general and business aviation.
          </p>
        </div>

        <div className="space-y-12">
          {explainers.map((exp) => (
            <div key={exp.id} className="bg-neutral-900/40 border border-neutral-800 rounded-2xl overflow-hidden grid md:grid-cols-2 gap-8 items-center p-6 sm:p-8 backdrop-blur-xl">
              <div className="relative h-64 sm:h-80 w-full rounded-xl overflow-hidden bg-neutral-900">
                <Image src={exp.image} alt={exp.title} fill className="object-cover" />
              </div>

              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-widest bg-neutral-950 px-2.5 py-1 rounded border border-amber-500/20">
                    {exp.category}
                  </span>
                  <h2 className="text-2xl font-light text-white mt-3">{exp.title}</h2>
                  <p className="text-xs sm:text-sm text-amber-200/90 font-mono mt-2 leading-relaxed bg-amber-500/10 p-3 rounded-lg border border-amber-500/20">
                    &quot;{exp.shortDefinition}&quot;
                  </p>
                </div>

                <div className="space-y-2 text-xs text-neutral-300 leading-relaxed">
                  {exp.detailedExplanation.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                <div className="space-y-2 pt-2 border-t border-neutral-800">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase block font-bold">Key Takeaways:</span>
                  <ul className="list-disc list-inside text-xs text-neutral-400 space-y-1 font-mono">
                    {exp.keyTakeaways.map((k, i) => (
                      <li key={i}>{k}</li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 text-[10px] font-mono text-neutral-500 flex justify-between">
                  <span>REAL WORLD: {exp.realWorldExample}</span>
                  <span>SOURCE: {exp.authoritativeSource}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
