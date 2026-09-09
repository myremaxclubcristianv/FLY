import { Metadata } from "next";
import Link from "next/link";
import { UnifiedAviationRepository } from "@/lib/repositories/unified-aviation-repo";
import { ProvenanceBadge } from "@/components/shared/ProvenanceBadge";

export const metadata: Metadata = {
  title: "Global Aviation Directory | Operators, FBOs, ATOs & Airports | AIR",
  description:
    "Comprehensive directory connecting AOC operators, certified airports, FBO terminals, flight academies, MRO stations, and aircraft marketplace sources.",
};

export default async function DirectoryPage() {
  const companies = await UnifiedAviationRepository.getCompanies();
  const airports = await UnifiedAviationRepository.getAirports();
  const schools = await UnifiedAviationRepository.getFlightSchools();

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-amber-400 font-bold uppercase bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
              AVIATION ECOSYSTEM DIRECTORY
            </span>
            <ProvenanceBadge status="VERIFIED" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-light text-white tracking-tight">
            Global Aviation Directory
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base max-w-3xl leading-relaxed">
            The authoritative index of AOC operators, business aviation airports, FBO handling facilities, EASA flight schools, and aviation service providers.
          </p>
        </div>

        {/* Directory Categories */}
        <div className="space-y-12">
          {/* AOC Operators & Companies */}
          <div className="space-y-6">
            <h2 className="text-2xl font-light text-white border-b border-neutral-800 pb-3 flex justify-between items-center">
              <span>AOC Operators & Aviation Companies ({companies.length})</span>
              <Link href="/aviation" className="text-xs font-mono text-amber-400 hover:underline">View All →</Link>
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {companies.map((c) => (
                <Link key={c.id} href={`/aviation/companies/${c.slug}`} className="bg-neutral-900/40 border border-neutral-800 rounded-xl p-5 hover:border-amber-500/40 transition space-y-2">
                  <span className="text-[10px] font-mono text-amber-400 font-bold uppercase block">{c.category.replace(/_/g, " ")}</span>
                  <h3 className="text-base font-medium text-white">{c.displayName}</h3>
                  <p className="text-xs text-neutral-400 font-mono">{c.baseAirportName || c.city || c.country}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Airports */}
          <div className="space-y-6">
            <h2 className="text-2xl font-light text-white border-b border-neutral-800 pb-3 flex justify-between items-center">
              <span>Certified Airports & FBO Hubs ({airports.length})</span>
              <Link href="/aviation/airports" className="text-xs font-mono text-amber-400 hover:underline">View All →</Link>
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {airports.map((loc) => (
                <div key={loc.id} className="bg-neutral-900/40 border border-neutral-800 rounded-xl p-5 space-y-2">
                  <span className="text-[10px] font-mono text-amber-400 font-bold uppercase block">{loc.icao} {loc.iata ? `/ ${loc.iata}` : ""}</span>
                  <h3 className="text-base font-medium text-white">{loc.name}</h3>
                  <p className="text-xs text-neutral-400 font-mono">{loc.city}, {loc.country}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Flight Schools */}
          <div className="space-y-6">
            <h2 className="text-2xl font-light text-white border-b border-neutral-800 pb-3 flex justify-between items-center">
              <span>EASA Flight Schools & ATOs ({schools.length})</span>
              <Link href="/aviation/schools" className="text-xs font-mono text-amber-400 hover:underline">View All →</Link>
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {schools.map((s) => (
                <div key={s.id} className="bg-neutral-900/40 border border-neutral-800 rounded-xl p-5 space-y-2">
                  <span className="text-[10px] font-mono text-green-400 font-bold uppercase block">{s.accreditation}</span>
                  <h3 className="text-base font-medium text-white">{s.name}</h3>
                  <p className="text-xs text-neutral-400 font-mono">{s.city}, {s.country} • Fleet: {s.fleetSummary}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
