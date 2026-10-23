import Link from "next/link";
import { UnifiedAviationRepository } from "@/lib/repositories/unified-aviation-repo";
import { ProvenanceBadge } from "@/components/shared/ProvenanceBadge";
import { AviationImage } from "@/components/AviationImage";
import { Button } from "@/components/ui/Button";
import { createRouteMetadata } from "@/lib/seo/metadata";

export const metadata = createRouteMetadata({
  path: "/aircraft-for-sale",
  title: "Aircraft For Sale & Executive Acquisition Intelligence",
  description:
    "Pre-owned business jets, turboprops, and executive helicopters. Verified market intelligence, off-market sourcing advisory, and illustrative aircraft profiles.",
});

export default async function AircraftForSalePage() {
  const activeListings = await UnifiedAviationRepository.getActiveAircraftForSale();
  const illustrativeListings = await UnifiedAviationRepository.getIllustrativeAircraftForSale();

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
              AIRCRAFT SOURCING & MARKET INTELLIGENCE
            </span>
            <ProvenanceBadge status="INDICATIVE" />
          </div>
          <h1 className="text-4xl sm:text-6xl font-light text-white tracking-tight font-sans">
            Aircraft Sourcing & Acquisition Advisory<span className="text-amber-500">.</span>
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base max-w-3xl leading-relaxed">
            AIR connects buyers and flight departments with off-market aircraft mandates and European market intelligence. To maintain absolute integrity, AIR never displays unverified scraped listings as active inventory.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link href="/aircraft/ownership">
              <Button variant="outline" size="sm" className="border-neutral-700 text-neutral-300 hover:text-white">
                OWNERSHIP VS CHARTER CALCULATOR →
              </Button>
            </Link>
            <Link href="/aviation/insurance">
              <Button variant="outline" size="sm" className="border-neutral-700 text-neutral-300 hover:text-white">
                AVIATION INSURANCE ADVISORY →
              </Button>
            </Link>
          </div>
        </div>

        {/* 01 — ACTIVE VERIFIED MARKETPLACE (Dignified Honest Empty State) */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-neutral-800 pb-4">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-light text-white font-sans">
                Active Verified Mandates
              </h2>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-400">
                {activeListings.length} ACTIVE
              </span>
            </div>
            <span className="text-xs font-mono text-neutral-500">
              DIRECT MANDATES // STRICT PROVENANCE VERIFIED
            </span>
          </div>

          {activeListings.length === 0 ? (
            <div className="p-8 sm:p-12 rounded-3xl bg-neutral-900/40 border border-neutral-800 backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="space-y-3 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
                    HONEST MARKETPLACE POLICY
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-light text-white font-sans">
                  No Public Listings Under Active Mandate
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
                  AIR does not publish synthetic inventory or scraped listings with estimated hours. Public listings appear here only when backed by an authorized seller mandate, verified maintenance logbooks, and confirmed asking price.
                </p>
                <p className="text-xs text-neutral-500 font-mono">
                  Looking to acquire or divest? Most premium transactions occur off-market.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button variant="primary" size="lg" className="w-full whitespace-nowrap">
                    RETAIN SOURCING DESK →
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Active listings rendered here when present */}
            </div>
          )}
        </div>

        {/* 02 — ILLUSTRATIVE EXAMPLES (Clearly Separated & Disclosed) */}
        <div className="space-y-6 pt-6 border-t border-neutral-800/80">
          <div className="space-y-2 border-b border-neutral-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                BENCHMARK DATA
              </span>
              <span className="text-xs font-mono text-neutral-400">
                NOT AN ACTIVE LISTING // EDUCATIONAL & MARKETPLACE SEARCH REFERENCES
              </span>
            </div>
            <h2 className="text-2xl font-light text-white font-sans">
              Illustrative Aircraft Profiles & External Category Searches
            </h2>
            <p className="text-xs text-neutral-400 max-w-3xl leading-relaxed">
              The profiles below illustrate representative aircraft categories, typical passenger configurations, and general search links to public portals (AvBuyer, GlobalAir, Controller). They are not active inventory, direct dealer listings, or broker mandates of AIR.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {illustrativeListings.map((item) => (
              <div
                key={item.id}
                className="bg-neutral-900/30 border border-neutral-800 rounded-2xl overflow-hidden backdrop-blur-xl flex flex-col justify-between hover:border-neutral-700 transition group"
              >
                <div>
                  <div className="relative h-56 w-full overflow-hidden bg-neutral-900">
                    <AviationImage
                      src={item.image}
                      alt={`Representative ${item.title} (Illustrative Visual)`}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-500"
                      fallbackTitle={item.title}
                      fallbackCode="ILLUSTRATIVE // PROFILE"
                    />
                    <div className="absolute top-3 left-3 bg-neutral-950/90 backdrop-blur border border-amber-500/30 px-2 py-0.5 rounded text-[9px] font-mono text-amber-400 font-bold z-10">
                      ILLUSTRATIVE EXAMPLE
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <span className="text-[10px] font-mono text-neutral-400 font-bold uppercase tracking-wider block">
                        {item.year} • {item.category.replace(/_/g, " ")}
                      </span>
                      <h3 className="text-xl font-medium text-white mt-1">
                        {item.title}
                      </h3>
                    </div>

                    <div className="space-y-2 text-xs font-mono">
                      <div className="flex justify-between py-1 border-b border-neutral-800/60">
                        <span className="text-neutral-500">Typical Cabin Capacity</span>
                        <span className="text-neutral-200 font-bold">{item.passengerCapacity} Pax</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-neutral-800/60">
                        <span className="text-neutral-500">Maximum Range</span>
                        <span className="text-neutral-200 font-bold">{item.rangeNm} NM</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-neutral-800/60">
                        <span className="text-neutral-500">Representative Airframe Time</span>
                        <span className="text-neutral-300">~{item.totalHours} Hours</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-neutral-500">Location Base</span>
                        <span className="text-neutral-400">{item.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-neutral-800/40 mt-4 space-y-3">
                  <div className="flex justify-between items-baseline">
                    <span className="text-[10px] font-mono text-neutral-500 uppercase">Valuation Benchmark</span>
                    <span className="text-sm font-bold text-amber-400/90 font-mono">{item.priceFormatted}</span>
                  </div>

                  <a
                    href={item.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white py-2.5 rounded-lg text-xs font-mono border border-neutral-800 transition"
                  >
                    Search Model on {item.externalSource} ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 03 — TRANSPARENCY NOTICE */}
        <div className="bg-neutral-900/30 border border-neutral-800/60 rounded-2xl p-8 text-xs text-neutral-400 space-y-3 font-sans leading-relaxed">
          <p className="font-mono text-neutral-200 uppercase tracking-wider font-bold">
            TRANSPARENCY DISCLOSURE REGARDING AIRCRAFT SOURCING & THIRD-PARTY PLATFORMS
          </p>
          <p>
            AIR facilitates bespoke aircraft acquisitions, pre-purchase mission feasibility reviews, and technical evaluations in coordination with certified transaction brokers, authorized dealers, and CAMO inspection organizations.
          </p>
          <p>
            AIR does not maintain licensed direct data feed contracts with AvBuyer, GlobalAir, Controller, or Sandhills Global. Links provided above direct users to general search categories on public portals. All formal acquisitions require independent logbook audits, borescope inspections, and direct contractual agreements with verified aircraft owners or authorized mandated brokers.
          </p>
        </div>
      </div>
    </div>
  );
}
