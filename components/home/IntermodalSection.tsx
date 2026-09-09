"use client";

import React from "react";
import Link from "next/link";
import { Container } from "../layout/Container";
import { AviationImage } from "../AviationImage";
import { ProvenanceBadge } from "../shared/ProvenanceBadge";
import { Button } from "../ui/Button";

const INTERMODAL_STEPS = [
  {
    step: "01",
    title: "EXECUTIVE JET TOUCHDOWN",
    desc: "Your private jet lands at Bucharest Băneasa (LRBS), Le Bourget (LFPB), or Geneva (LSGG) with zero commercial terminal delays.",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80",
    badge: "AIRPORT ARRIVAL",
  },
  {
    step: "02",
    title: "DIRECT RAMP HELICOPTER TRANSFER",
    desc: "Board a waiting twin-turbine AgustaAW139 or Airbus H145 helicopter directly from the airfield ramp within 4 minutes of engine shutdown.",
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80",
    badge: "RAMP SHUTTLE",
  },
  {
    step: "03",
    title: "POINT-TO-POINT RESORT & YACHT TOUCHDOWN",
    desc: "Bypass traffic and mountain roads. Land directly on private hotel helipads, Alpine chalets, island resorts, or superyacht helidecks.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    badge: "HELIPAD ARRIVAL",
  },
];

export function IntermodalSection() {
  return (
    <Container size="wide">
      <div className="bg-neutral-900/40 border border-neutral-800 rounded-3xl p-8 md:p-12 space-y-10 backdrop-blur-xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-800 pb-8">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
                INTERMODAL DISPATCH // CONCEPT 06
              </span>
              <ProvenanceBadge status="VERIFIED" />
            </div>
            <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight">
              THE LAST 50 MILES<span className="text-amber-400">.</span>
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 font-mono leading-relaxed">
              Aviation doesn&apos;t end at the airport runway. AIR seamlessly orchestrates private jet arrivals with waiting turbine helicopter shuttles directly to mountain helipads, island resorts, and private superyachts.
            </p>
          </div>

          <Link href="/plan">
            <Button variant="primary" size="md" className="font-mono text-xs whitespace-nowrap">
              REQUEST INTERMODAL DISPATCH →
            </Button>
          </Link>
        </div>

        {/* 3-Step Visual Journey */}
        <div className="grid md:grid-cols-3 gap-8">
          {INTERMODAL_STEPS.map((item) => (
            <div key={item.step} className="bg-neutral-950 border border-neutral-800/80 rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-amber-500/50 transition">
              <div>
                <div className="relative h-56 w-full overflow-hidden bg-neutral-900">
                  <AviationImage src={item.image} alt={item.title} fill className="object-cover group-hover:scale-105 transition duration-500" fallbackTitle={item.title} fallbackCode={`STEP // ${item.step}`} />
                  <div className="absolute top-3 left-3 bg-neutral-950/80 backdrop-blur border border-neutral-800 px-2.5 py-1 rounded text-[10px] font-mono text-amber-400 font-bold z-10">
                    STEP {item.step} • {item.badge}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-lg font-medium text-white group-hover:text-amber-300 transition font-sans">{item.title}</h3>
                  <p className="text-xs text-neutral-400 font-mono leading-relaxed">{item.desc}</p>
                </div>
              </div>

              <div className="p-6 pt-0 text-[10px] font-mono text-neutral-500 flex justify-between items-center border-t border-neutral-900 mt-4">
                <span>INTERMODAL PROVENANCE</span>
                <span className="text-amber-400 font-bold">DISPATCH READY</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}

export default IntermodalSection;
