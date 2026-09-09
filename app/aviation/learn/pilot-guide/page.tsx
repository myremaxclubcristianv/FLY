import { Metadata } from "next";
import Link from "next/link";
import { ProvenanceBadge } from "@/components/shared/ProvenanceBadge";

export const metadata: Metadata = {
  title: "How to Become a Pilot | Complete EASA Pilot Training Guide",
  description:
    "Step-by-step EASA pilot training guide: PPL, Class 1 Medical, CPL, Instrument Rating, ATPL theory, Type Ratings, and career opportunities.",
};

export default function PilotGuidePage() {
  const steps = [
    {
      num: "01",
      title: "Discover Aviation (Introductory Flight)",
      desc: "Take an introductory trial flight with a certified instructor at an ATO or DTO to experience hands-on aircraft controls and evaluate your passion for flight.",
    },
    {
      num: "02",
      title: "Obtain Aviation Medical Certificate",
      desc: "Pass a medical examination at an authorized AME center. Class 2 medical is required for PPL/LAPL; Class 1 medical is mandatory for commercial CPL/ATPL pilots.",
    },
    {
      num: "03",
      title: "Private Pilot License — PPL(A) / LAPL(A)",
      desc: "Complete at least 45 flight hours (PPL) or 30 flight hours (LAPL), passing 9 EASA theoretical exams, solo navigation flights, and a practical skill test.",
    },
    {
      num: "04",
      title: "Hour Building & Night Rating",
      desc: "Accumulate required solo and cross-country flight hours to reach the 150-hour commercial threshold while completing night rating qualification.",
    },
    {
      num: "05",
      title: "ATPL Theoretical Knowledge",
      desc: "Complete 14 EASA ATPL theoretical subjects (Air Law, Navigation, Meteorology, Aerodynamics, General Navigation, Operational Procedures, Performance).",
    },
    {
      num: "06",
      title: "Instrument Rating (IR) & Multi-Engine (MEP)",
      desc: "Learn to fly solely by reference to cockpit flight instruments in IMC weather and master twin-engine aircraft emergency handling.",
    },
    {
      num: "07",
      title: "Commercial Pilot License — CPL(A)",
      desc: "Pass the commercial flight skill test with an EASA examiner, qualifying you to fly for remuneration.",
    },
    {
      num: "08",
      title: "Multi-Crew Cooperation (MCC) & UPRT",
      desc: "Master airline cockpit crew coordination on FNPT II simulators and complete Advanced Upset Prevention & Recovery Training.",
    },
    {
      num: "09",
      title: "Aircraft Type Rating (Phenom, B737, A320)",
      desc: "Complete specific simulator and aircraft flight training for your target turbine jet or helicopter type.",
    },
    {
      num: "10",
      title: "Airline / Business Aviation Career Entry",
      desc: "Join an AOC operator or corporate flight department as a First Officer, transitioning to Command after logbook hour thresholds.",
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        <Link href="/aviation/learn" className="text-xs font-mono text-amber-400 hover:underline block">
          ← Return to Aviation Knowledge Center
        </Link>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-amber-400 font-bold uppercase bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
              EASA PILOT PATHWAY
            </span>
            <ProvenanceBadge status="VERIFIED" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-light text-white tracking-tight">
            How to Become a Pilot: Complete Roadmap
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-3xl">
            A structured, regulatory-compliant guide outlining every requirement from your first flight lesson to commanding a commercial turbine aircraft under EASA Part-FCL.
          </p>
        </div>

        {/* Roadmap Steps */}
        <div className="space-y-6">
          {steps.map((s) => (
            <div key={s.num} className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-start">
              <span className="font-mono text-2xl font-light text-amber-400 bg-neutral-950 px-4 py-2 rounded-xl border border-amber-500/20">
                {s.num}
              </span>
              <div className="space-y-2">
                <h2 className="text-xl font-medium text-white">{s.title}</h2>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Regulatory Citation */}
        <div className="bg-neutral-900/30 border border-neutral-800 rounded-xl p-6 text-xs text-neutral-500 font-mono space-y-1">
          <p className="text-neutral-400 font-bold">REGULATORY REFERENCE</p>
          <p>EASA Regulation (EU) No 1178/2011 (Part-FCL Flight Crew Licensing Standards).</p>
        </div>
      </div>
    </div>
  );
}
