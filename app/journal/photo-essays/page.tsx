import { Metadata } from "next";
import { UnifiedAviationRepository } from "@/lib/repositories/unified-aviation-repo";
import { ProvenanceBadge } from "@/components/shared/ProvenanceBadge";

export const metadata: Metadata = {
  title: "Aviation Photo Essays & Visual Stories | AIR Journal",
  description:
    "Image-led visual stories exploring aviation from above, ramp operations at Băneasa, and the life of executive flight crews.",
};

export default async function PhotoEssaysPage() {
  const essays = await UnifiedAviationRepository.getPhotoEssays();

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-amber-400 font-bold uppercase bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
              EDITORIAL PHOTO ESSAYS
            </span>
            <ProvenanceBadge status="VERIFIED" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-light text-white tracking-tight">
            Aviation Photo Essays
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base max-w-3xl leading-relaxed">
            Atmospheric, image-led documentation of cockpit perspectives, flight ramp operations, and European landscapes from 3,000 feet above.
          </p>
        </div>

        <div className="space-y-16">
          {essays.map((pe) => (
            <div key={pe.id} className="bg-neutral-900/30 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-8 backdrop-blur-xl">
              <div>
                <span className="text-[10px] font-mono text-amber-400 font-bold uppercase block">
                  {pe.location} • Photography by {pe.photographer}
                </span>
                <h2 className="text-2xl sm:text-3xl font-light text-white mt-1">{pe.title}</h2>
                <p className="text-xs sm:text-sm text-neutral-400 font-mono mt-2">{pe.subtitle}</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {pe.slides.map((slide, i) => (
                  <div key={i} className="bg-neutral-950 border border-neutral-800 rounded-xl p-5 space-y-2">
                    <span className="text-[10px] font-mono text-amber-500 font-bold uppercase">SLIDE {i + 1} — {slide.location}</span>
                    <h3 className="text-sm font-medium text-white">{slide.title}</h3>
                    <p className="text-xs text-neutral-400 leading-relaxed">{slide.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
