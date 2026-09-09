import { Metadata } from "next";
import { UnifiedAviationRepository } from "@/lib/repositories/unified-aviation-repo";
import { ProvenanceBadge } from "@/components/shared/ProvenanceBadge";
import { AviationImage } from "@/components/AviationImage";

export const metadata: Metadata = {
  title: "Aviation Technology & Innovation Journal | AIR",
  description:
    "Explore the frontier of flight: eVTOL, Sustainable Aviation Fuel (SAF), electric propulsion, AI flight optimization, and satellite avionics.",
};

export default async function AviationTechPage() {
  const articles = await UnifiedAviationRepository.getTechArticles();

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-amber-400 font-bold uppercase bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
              INNOVATION & FUTURE FLIGHT
            </span>
            <ProvenanceBadge status="VERIFIED" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-light text-white tracking-tight">
            Aviation Technology & Innovation
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base max-w-3xl leading-relaxed">
            In-depth analysis of zero-emission propulsion, Advanced Air Mobility (AAM), Sustainable Aviation Fuel (SAF), predictive AI maintenance, and next-generation satellite avionics.
          </p>
        </div>

        <div className="space-y-12">
          {articles.map((art) => (
            <div key={art.id} className="bg-neutral-900/40 border border-neutral-800 rounded-2xl overflow-hidden grid md:grid-cols-2 gap-8 items-center p-6 sm:p-8 backdrop-blur-xl">
              <div className="relative h-64 sm:h-80 w-full rounded-xl overflow-hidden bg-neutral-900">
                <AviationImage src={art.image} alt={art.title} fill className="object-cover" fallbackTitle={art.title} fallbackCode={`TECH // ${art.category}`} />
              </div>

              <div className="space-y-4">
                <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-widest bg-neutral-950 px-2.5 py-1 rounded border border-amber-500/20">
                  {art.category.replace(/_/g, " ")} • {art.readTimeMinutes} MIN READ
                </span>
                <h2 className="text-2xl font-light text-white">{art.title}</h2>
                <p className="text-xs sm:text-sm text-neutral-300 font-mono leading-relaxed">{art.subtitle}</p>

                <div className="space-y-3 pt-2 text-xs text-neutral-400 leading-relaxed border-t border-neutral-800">
                  {art.sections.map((sec, i) => (
                    <div key={i} className="space-y-1">
                      <h3 className="font-semibold text-white">{sec.heading}</h3>
                      {sec.paragraphs.map((p, j) => (
                        <p key={j}>{p}</p>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
