import { Metadata } from "next";
import Image from "next/image";
import { UnifiedAviationRepository } from "@/lib/repositories/unified-aviation-repo";
import { ProvenanceBadge } from "@/components/shared/ProvenanceBadge";

export const metadata: Metadata = {
  title: "Aircraft For Sale & Marketplace Intelligence | AIR",
  description:
    "Explore global pre-owned and new executive aircraft, private jets, turboprops, and helicopters with verified marketplace provenance.",
};

export default async function AircraftForSalePage() {
  const listings = await UnifiedAviationRepository.getAircraftForSale();

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
              AIRCRAFT MARKETPLACE DISCOVERY
            </span>
            <ProvenanceBadge status="VERIFIED" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-light text-white tracking-tight">
            Aircraft For Sale & Market Intelligence
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base max-w-3xl leading-relaxed">
            AIR connects executive buyers and flight departments with curated global aircraft marketplace listings across private jets, turboprops, and helicopters. All listings preserve external marketplace provenance.
          </p>
        </div>

        {/* Marketplace Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {listings.map((item) => (
            <div
              key={item.id}
              className="bg-neutral-900/40 border border-neutral-800 rounded-2xl overflow-hidden backdrop-blur-xl flex flex-col justify-between hover:border-amber-500/40 transition group"
            >
              <div>
                <div className="relative h-56 w-full overflow-hidden bg-neutral-900">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-neutral-950/80 backdrop-blur border border-neutral-800 px-2.5 py-1 rounded text-[10px] font-mono text-amber-400 font-bold">
                    SOURCE: {item.externalSource}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider block">
                      {item.year} • {item.category.replace(/_/g, " ")}
                    </span>
                    <h2 className="text-xl font-medium text-white mt-1 group-hover:text-amber-300 transition">
                      {item.title}
                    </h2>
                  </div>

                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex justify-between py-1 border-b border-neutral-800/60">
                      <span className="text-neutral-500">Passenger Capacity</span>
                      <span className="text-neutral-200 font-bold">{item.passengerCapacity} Pax</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-neutral-800/60">
                      <span className="text-neutral-500">Maximum Range</span>
                      <span className="text-neutral-200 font-bold">{item.rangeNm} NM</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-neutral-800/60">
                      <span className="text-neutral-500">Total Airframe Time</span>
                      <span className="text-neutral-200">{item.totalHours} Hours</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-neutral-500">Current Location</span>
                      <span className="text-neutral-300">{item.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-neutral-800/40 mt-4 space-y-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase">Asking Price</span>
                  <span className="text-lg font-bold text-amber-300 font-mono">{item.priceFormatted}</span>
                </div>

                <a
                  href={item.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-neutral-950 hover:bg-amber-500 hover:text-neutral-950 text-neutral-200 font-semibold py-2.5 rounded-lg text-xs font-mono border border-neutral-800 transition"
                >
                  View External Listing ({item.externalSource}) ↗
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="bg-neutral-900/30 border border-neutral-800/60 rounded-xl p-6 text-xs text-neutral-500 space-y-2 font-mono">
          <p className="font-bold text-neutral-400">DATA PROVENANCE & MARKETPLACE NOTICE</p>
          <p>
            AIR displays curated external marketplace listings for discovery and educational purposes. AIR is not an aircraft broker, does not claim ownership of listed inventory, and receives data directly from licensed partner channels (AvBuyer, GlobalAir, Controller). All transactions are handled directly by verified sellers.
          </p>
        </div>
      </div>
    </div>
  );
}
