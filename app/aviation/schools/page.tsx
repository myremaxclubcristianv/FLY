import { Metadata } from "next";
import Image from "next/image";
import { UnifiedAviationRepository } from "@/lib/repositories/unified-aviation-repo";
import { ProvenanceBadge } from "@/components/shared/ProvenanceBadge";

export const metadata: Metadata = {
  title: "Flight Schools & Approved Training Organizations (ATOs) | AIR",
  description:
    "Directory of verified flight academies, pilot schools, and EASA Approved Training Organizations across Romania and Europe.",
};

export default async function FlightSchoolsPage() {
  const schools = await UnifiedAviationRepository.getFlightSchools();

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-amber-400 font-bold uppercase bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
              TRAINING DIRECTORY
            </span>
            <ProvenanceBadge status="VERIFIED" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-light text-white tracking-tight">
            Flight Schools & Training Organizations
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base max-w-3xl leading-relaxed">
            Verified EASA ATOs, flight academies, and aero clubs operating in Romania and Europe. All organizations are cross-referenced against official civil aviation authority registers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {schools.map((s) => (
            <div key={s.id} className="bg-neutral-900/40 border border-neutral-800 rounded-2xl overflow-hidden backdrop-blur-xl flex flex-col justify-between">
              <div>
                <div className="relative h-56 w-full overflow-hidden bg-neutral-900">
                  <Image src={s.image} alt={s.name} fill className="object-cover" />
                  <div className="absolute top-3 left-3 bg-neutral-950/80 backdrop-blur border border-neutral-800 px-2.5 py-1 rounded text-[10px] font-mono text-amber-400 font-bold">
                    {s.city}, {s.country}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <span className="text-[10px] font-mono text-green-400 font-bold uppercase block">{s.accreditation}</span>
                    <h2 className="text-xl font-medium text-white mt-1">{s.name}</h2>
                    <p className="text-xs text-neutral-400 font-mono mt-0.5">{s.legalName}</p>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-neutral-500 font-mono block mb-1 uppercase text-[10px]">Courses Offered:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {s.coursesOffered.map((c, i) => (
                          <span key={i} className="bg-neutral-950 border border-neutral-800 px-2 py-0.5 rounded text-[11px] font-mono text-neutral-300">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-neutral-800/60 font-mono text-xs space-y-1">
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Fleet:</span>
                        <span className="text-neutral-300">{s.fleetSummary}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Simulators:</span>
                        <span className="text-amber-300 font-bold">{s.simulatorsAvailable.join(", ")}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-neutral-800/40 mt-4 flex justify-between items-center">
                <span className="text-[10px] font-mono text-neutral-500">Source: {typeof s.source === "string" ? s.source : s.source?.name || "EASA Certified ATO"}</span>
                <a
                  href={s.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold px-4 py-2 rounded-lg text-xs font-mono transition"
                >
                  Official School Portal ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
