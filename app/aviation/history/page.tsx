import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ProvenanceBadge } from "@/components/shared/ProvenanceBadge";

export const metadata: Metadata = {
  title: "Aviation History & Romanian Flight Heritage | AIR",
  description:
    "Explore the historic milestones of flight: Traian Vuia, Aurel Vlaicu, Henri Coandă's jet propulsion, the historical evolution of Bucharest Băneasa Airport (1912), and the rise of business jet travel.",
};

const HISTORICAL_TIMELINE = [
  {
    year: "1906",
    title: "Traian Vuia — First Autonomous Powered Takeoff",
    desc: "Romanian inventor Traian Vuia achieved the World's first unassisted powered takeoff on a self-propelled monoplane (Vuia I) at Montesson near Paris.",
    source: "Aéro-Club de France Archives",
    img: "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=800&q=80",
  },
  {
    year: "1910",
    title: "Henri Coandă — First Jet Aircraft Concept (Coandă-1910)",
    desc: "Henri Coandă exhibited the world's first air-reactive engine aircraft (the Coandă-1910) at the International Aeronautic Salon in Paris, introducing the Coandă Effect fluid dynamics phenomenon.",
    source: "Royal Aeronautical Society & Smithsonian Records",
    img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80",
  },
  {
    year: "1912",
    title: "Bucharest Băneasa (LRBS) — Foundation of Europe's Historic Airport",
    desc: "Flight pioneer George Valentin Bibescu established the Băneasa Flight School and Airfield, making Băneasa (LRBS / BBU) one of the five oldest continuously operating airports in the World.",
    source: "CNAB & AIP Romania Official Records",
    img: "https://images.unsplash.com/photo-1520437358207-323b43b50729?auto=format&fit=crop&w=800&q=80",
  },
  {
    year: "1920",
    title: "CFRNA — World's First Transcontinental Airline",
    desc: "The Franco-Rumanian Navigation Company (CFRNA) launched the first transcontinental scheduled passenger and night flight service connecting Paris, Strasbourg, Prague, Vienna, Budapest, and Bucharest Băneasa.",
    source: "ICAO Aviation History Registry",
    img: "https://images.unsplash.com/photo-1519074069444-1ba4ea16007e?auto=format&fit=crop&w=800&q=80",
  },
  {
    year: "1963",
    title: "Inception of Business Jet Charter Operations",
    desc: "The introduction of the Learjet 23 and Dassault Falcon 20 created the modern executive charter industry, enabling on-demand point-to-point business travel across Europe.",
    source: "EBAA Business Aviation History Archive",
    img: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80",
  },
];

export default function AviationHistoryPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-amber-400 font-bold uppercase bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
              HISTORICAL FLIGHT HERITAGE
            </span>
            <ProvenanceBadge status="VERIFIED" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-light text-white tracking-tight">
            Aviation History & Pioneers
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base max-w-3xl leading-relaxed">
            From the pioneering powered flights of Traian Vuia and Henri Coandă to the 1912 establishment of Bucharest Băneasa (LRBS / BBU 2,358m × 45m) and the rise of modern business aviation.
          </p>
        </div>

        <div className="space-y-12">
          {HISTORICAL_TIMELINE.map((item, i) => (
            <div key={i} className="bg-neutral-900/40 border border-neutral-800 rounded-2xl overflow-hidden grid md:grid-cols-3 gap-8 items-center p-6 sm:p-8 backdrop-blur-xl">
              <div className="relative h-56 w-full rounded-xl overflow-hidden bg-neutral-900">
                <Image src={item.img} alt={item.title} fill className="object-cover" />
                <div className="absolute top-3 left-3 bg-neutral-950/90 backdrop-blur px-3 py-1 rounded text-base font-mono text-amber-400 font-bold">
                  {item.year}
                </div>
              </div>

              <div className="md:col-span-2 space-y-4">
                <h2 className="text-2xl font-light text-white">{item.title}</h2>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">{item.desc}</p>
                <div className="pt-2 border-t border-neutral-800 text-[10px] font-mono text-neutral-500">
                  HISTORICAL SOURCE: {item.source}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Băneasa Feature */}
        <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-8 flex flex-col sm:flex-row justify-between items-center gap-6 backdrop-blur-xl">
          <div className="space-y-2">
            <h3 className="text-xl font-light text-white">Explore Bucharest Băneasa (LRBS / BBU) Today</h3>
            <p className="text-xs text-neutral-400 font-mono">2,358m × 45m asphalt runway • 10-minute access to Bucharest CBD.</p>
          </div>
          <Link href="/baneasa" className="bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold px-6 py-3 rounded-lg text-xs font-mono transition whitespace-nowrap">
            EXPLORE BĂNEASA HUB →
          </Link>
        </div>
      </div>
    </div>
  );
}
