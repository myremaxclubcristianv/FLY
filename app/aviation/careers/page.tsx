import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ProvenanceBadge } from "@/components/shared/ProvenanceBadge";

export const metadata: Metadata = {
  title: "Aviation Careers & Professional Pathways | AIR Intelligence",
  description:
    "Explore professional aviation career pathways: Airline & Business Jet Pilots, Flight Attendants, Maintenance Engineers, Flight Dispatchers, Air Traffic Controllers, and Aviation Operations Managers.",
};

const CAREER_PATHWAYS = [
  {
    title: "Commercial & Business Jet Pilot",
    role: "Flight Deck Command",
    requirements: "EASA CPL(A) / ATPL(A) Frozen • Class 1 Medical • 1,500 Hours for Command",
    desc: "Commanding multi-engine turbine jet and turboprop aircraft in executive charter and scheduled operations.",
    salary: "€45,000 – €180,000 / year",
    img: "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Executive Cabin Crew",
    role: "In-Flight Hospitality & Safety",
    requirements: "EASA Cabin Crew Attestation • Medical Attestation • VIP Service Qualification",
    desc: "Delivering high-end VIP in-flight service, emergency evacuation management, and passenger welfare.",
    salary: "€28,000 – €65,000 / year",
    img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Licensed Maintenance Engineer (B1/B2)",
    role: "Aircraft Airworthiness & Engineering",
    requirements: "EASA Part-66 License (B1 Mechanical / B2 Avionics) • Type Training Ratings",
    desc: "Inspecting, overhauling, and certifying airframe, turbine engine, and avionics airworthiness.",
    salary: "€38,000 – €95,000 / year",
    img: "https://images.unsplash.com/photo-1520437358207-323b43b50729?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Flight Dispatcher & Flight Operations Officer",
    role: "Mission Operations & Navigation",
    requirements: "Flight Dispatcher License (EASA/AACR) • Flight Planning & Meteorology Certification",
    desc: "Calculating fuel loads, filing ATC flight plans, evaluating airport NOTAMs, and monitoring live ADS-B tracking.",
    salary: "€32,000 – €70,000 / year",
    img: "https://images.unsplash.com/photo-1519074069444-1ba4ea16007e?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Air Traffic Controller (ATCO)",
    role: "Airspace Safety & Separation",
    requirements: "EASA ATCO License • Class 3 Medical • ICAO English Level 5+",
    desc: "Managing runway clearance, radar departure vectors, and en-route airspace separation from control towers and ACC centers.",
    salary: "€50,000 – €140,000 / year",
    img: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80",
  },
];

export default function AviationCareersPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-amber-400 font-bold uppercase bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
              AVIATION CAREERS & PROFESSIONS
            </span>
            <ProvenanceBadge status="VERIFIED" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-light text-white tracking-tight">
            Aviation Career Pathways
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base max-w-3xl leading-relaxed">
            Professional orientation across flight crew, engineering, dispatch, air traffic control, and executive aviation management roles governed under EASA and ICAO standards.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CAREER_PATHWAYS.map((c, i) => (
            <div key={i} className="bg-neutral-900/40 border border-neutral-800 rounded-2xl overflow-hidden backdrop-blur-xl flex flex-col justify-between group hover:border-amber-500/50 transition">
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-neutral-900">
                  <Image src={c.img} alt={c.title} fill className="object-cover group-hover:scale-105 transition duration-500" />
                  <div className="absolute top-3 left-3 bg-neutral-950/80 backdrop-blur border border-neutral-800 px-2.5 py-1 rounded text-[10px] font-mono text-amber-400 font-bold">
                    {c.role}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h2 className="text-xl font-medium text-white group-hover:text-amber-300 transition">{c.title}</h2>
                    <p className="text-xs text-neutral-400 leading-relaxed mt-2">{c.desc}</p>
                  </div>

                  <div className="space-y-2 text-xs font-mono pt-3 border-t border-neutral-800">
                    <span className="text-neutral-500 block uppercase text-[10px]">EASA / ICAO Requirements:</span>
                    <p className="text-neutral-200">{c.requirements}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-neutral-800/40 mt-4 flex justify-between items-center font-mono text-xs">
                <span className="text-neutral-500">Est. Compensation</span>
                <span className="text-amber-300 font-bold">{c.salary}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-8 flex flex-col sm:flex-row justify-between items-center gap-6 backdrop-blur-xl">
          <div className="space-y-2">
            <h3 className="text-xl font-light text-white">Ready to start pilot flight training?</h3>
            <p className="text-xs text-neutral-400 font-mono">Explore verified EASA Approved Training Organizations (ATOs).</p>
          </div>
          <Link href="/aviation/schools" className="bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold px-6 py-3 rounded-lg text-xs font-mono transition whitespace-nowrap">
            EXPLORE FLIGHT SCHOOLS →
          </Link>
        </div>
      </div>
    </div>
  );
}
