import React from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { ProvenanceBadge } from "@/components/shared/ProvenanceBadge";
import { ContactForm } from "@/components/contact/ContactForm";
import { BRAND } from "@/constants/brand";
import { createRouteMetadata } from "@/lib/seo/metadata";

export const metadata = createRouteMetadata({
  path: "/contact",
  title: "Contact Concierge Desk | AIR by Cristian Văduva",
  description:
    "Direct communication channel for private jet charters, aircraft sourcing, and executive aviation advisory based at Bucharest Băneasa (LRBS).",
});

export default function ContactPage() {
  return (
    <div className="w-full bg-white text-neutral-900 font-sans flex-1 flex flex-col">
      {/* 01 — HERO HEADER */}
      <section className="w-full py-20 sm:py-28 border-b border-neutral-200/80 bg-white">
        <Container size="wide">
          <div className="flex flex-col gap-8 max-w-6xl mx-auto">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
              <Link href="/" className="hover:text-amber-600 transition">HOME</Link>
              <span>/</span>
              <span className="text-neutral-900 font-bold">CONTACT DESK</span>
            </div>

            <div className="space-y-4 max-w-3xl">
              <div className="flex items-center gap-3">
                <span className="editorial-tag-dark">
                  EXECUTIVE CONCIERGE & ADVISORY DESK
                </span>
                <ProvenanceBadge status="OFFICIAL_SOURCE" sourceName="AIR Executive Operations" />
              </div>
              <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-neutral-900 leading-[1.05] font-sans">
                Contact {BRAND.name}<span className="text-amber-600">.</span>
              </h1>
              <p className="text-lg text-neutral-600 font-light leading-relaxed">
                Connect directly with our flight dispatch concierge, aircraft acquisition advisory, or helicopter access desk.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 02 — MAIN CONTACT BODY */}
      <section className="w-full py-20 sm:py-28 bg-[#fafaf7] border-b border-neutral-200/80">
        <Container size="wide">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 sm:gap-16 items-start">
            {/* Left Column: Direct Access Details & Operational Disclosures */}
            <div className="lg:col-span-5 space-y-8">
              <div className="p-8 rounded-3xl bg-neutral-950 text-white shadow-xl border border-neutral-800 space-y-6">
                <div>
                  <span className="text-xs font-mono text-amber-400 font-bold tracking-widest uppercase block mb-1">
                    PRIMARY BASE & DISPATCH HUB
                  </span>
                  <h3 className="text-2xl font-light text-white font-sans">
                    Bucharest Băneasa (LRBS / BBU)
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono mt-1">
                    Aurel Vlaicu International Airport • General Aviation Apron
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-neutral-800 text-xs font-mono">
                  <div>
                    <span className="text-neutral-400 block uppercase">DIRECT CONCIERGE EMAIL</span>
                    <a
                      href="mailto:contact@cristianvaduva.com"
                      className="text-amber-400 hover:text-amber-300 font-bold text-sm block mt-0.5"
                    >
                      contact@cristianvaduva.com
                    </a>
                  </div>

                  <div>
                    <span className="text-neutral-400 block uppercase">WHATSAPP CONCIERGE DESK</span>
                    <a
                      href="https://wa.me/40700000000"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-200 hover:text-white block mt-0.5"
                    >
                      +40 700 000 000 (Dispatch Concierge)
                    </a>
                  </div>

                  <div>
                    <span className="text-neutral-400 block uppercase">HOURS OF OPERATION</span>
                    <span className="text-neutral-300 block mt-0.5">
                      Executive Flight Desk: 24/7/365 On-Demand
                    </span>
                  </div>
                </div>
              </div>

              {/* Regulatory Role Disclosure */}
              <div className="p-6 rounded-2xl bg-white border border-neutral-200 text-xs text-neutral-600 space-y-2">
                <span className="text-[10px] font-mono text-neutral-500 font-bold tracking-wider uppercase block">
                  REGULATORY ROLE & AIR CARRIER TRANSPARENCY
                </span>
                <p className="leading-relaxed">
                  AIR by Cristian Văduva operates as an executive aviation concierge, charter coordinator, and aircraft sourcing advisory. AIR is not an air carrier and does not hold an Air Operator Certificate (AOC). All private jet and helicopter flights are operated exclusively by certified, authorized EASA or FAA Part-135/Part-CAT commercial air carriers.
                </p>
              </div>
            </div>

            {/* Right Column: Interactive Secure Form */}
            <div className="lg:col-span-7 p-8 sm:p-12 rounded-3xl bg-white border border-neutral-200 shadow-xl space-y-6">
              <div>
                <span className="text-xs font-mono text-amber-600 font-bold tracking-widest uppercase block mb-1">
                  SECURE INQUIRY DISPATCH
                </span>
                <h2 className="text-3xl font-light text-neutral-900 font-sans">
                  Send a Mission Inquiry
                </h2>
                <p className="text-xs text-neutral-500 font-sans mt-1">
                  Enter your mission parameters below. Our concierge desk will review feasibility and coordinate with certified operators.
                </p>
              </div>

              <ContactForm isRo={false} />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
