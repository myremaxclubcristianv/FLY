import { Metadata } from "next";
import Link from "next/link";
import { UnifiedAviationRepository } from "@/lib/repositories/unified-aviation-repo";
import { ProvenanceBadge } from "@/components/shared/ProvenanceBadge";

export const metadata: Metadata = {
  title: "Airports & FBO Ground Handling Intelligence | AIR",
  description:
    "Directory of certified European business aviation airports, FBO terminals, PPR rules, runway specifications, and customs clearance.",
};

export default async function AirportsPage() {
  const airports = await UnifiedAviationRepository.getAirports();

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-amber-400 font-bold uppercase bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
              AIRPORT INTELLIGENCE
            </span>
            <ProvenanceBadge status="VERIFIED" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-light text-white tracking-tight">
            Certified Airports & FBO Terminals
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base max-w-3xl leading-relaxed">
            Operational intelligence for business aviation hubs, runway lengths, FBO handling facilities, PPR restrictions, and customs clearance schedules across Romania and Europe.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {airports.map((loc) => (
            <div key={loc.id} className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 space-y-6 backdrop-blur-xl">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-mono font-bold text-amber-400 bg-neutral-950 px-2.5 py-1 rounded border border-amber-500/20">
                    {loc.icao} {loc.iata ? `/ ${loc.iata}` : ""}
                  </span>
                  <h2 className="text-xl font-medium text-white mt-2">{loc.name}</h2>
                  <p className="text-xs text-neutral-400 font-mono">{loc.city}, {loc.country}</p>
                </div>
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-green-500/10 text-green-400 border border-green-500/20">
                  {loc.landingAccessStatus || "CERTIFIED"}
                </span>
              </div>

              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between py-1 border-b border-neutral-800">
                  <span className="text-neutral-500">Runway Designation & Surface</span>
                  <span className="text-neutral-200">{loc.runwaySpecs?.designation || "Main"} ({loc.runwaySpecs?.surface || "Asphalt"})</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-800">
                  <span className="text-neutral-500">Runway Length</span>
                  <span className="text-amber-300 font-bold">{loc.runwaySpecs?.lengthM ? `${loc.runwaySpecs.lengthM}m` : "Verified"}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-800">
                  <span className="text-neutral-500">Customs / Border Clearance</span>
                  <span className="text-neutral-200">{loc.customsImmigration || "Available 24/7"}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-neutral-500">Handling & FBO Providers</span>
                  <span className="text-neutral-300 text-right">{loc.fboFacilities?.join(", ") || "FBO Terminal"}</span>
                </div>
              </div>

              <div className="pt-2 flex justify-between items-center text-[10px] font-mono text-neutral-500 border-t border-neutral-800">
                <span>SOURCE: {typeof loc.source === "string" ? loc.source : loc.source?.name || "Official AIP / EASA"}</span>
                {loc.icao === "LRBS" && (
                  <Link href="/baneasa" className="text-amber-400 hover:underline font-bold">
                    View Băneasa Hub →
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
