import React from "react";
import Link from "next/link";
import { Container } from "../../../components/layout/Container";
import { Button } from "../../../components/ui/Button";
import { DataStatusBadge } from "../../../components/shared/DataStatusBadge";
import { AviationImage } from "../../../components/AviationImage";
import { InsuranceInquiryForm } from "../../../components/aviation/InsuranceInquiryForm";
import { createRouteMetadata } from "../../../lib/seo/metadata";

export const metadata = createRouteMetadata({
  path: "/aviation/insurance",
  title: "Aviation Insurance Advisory & Aircraft Risk Management",
  description:
    "Advisory guide on aircraft hull risk underwriting, EU statutory third-party liability (Reg 785/2004), Part-CAT vs Part-NCO owner responsibilities, and hangaring risk management.",
});

export default function AviationInsurancePage() {
  const topics = [
    {
      title: "HULL & ALL-RISK UNDERWRITING",
      badge: "AGREED VALUE // IN-FLIGHT & GROUND",
      desc: "Physical damage protection for the aircraft airframe, turbine engines, and avionics suite during taxi, flight, and hangar storage under agreed-value principles.",
      highlights: ["Total & partial loss replacement", "Engine ingestion coverage", "War & allied perils endorsement (AVN 52E)"],
    },
    {
      title: "THIRD-PARTY STATUTORY LIABILITY",
      badge: "EU REGULATION 785/2004 COMPLIANCE",
      desc: "Mandatory statutory liability coverage required across EASA airspace for bodily injury and third-party property damage, indexed directly to aircraft MTOW.",
      highlights: ["Minimum SDR statutory requirements", "Airspace entry verification", "Overflight & international territory extensions"],
    },
    {
      title: "OWNER VS. OPERATOR RESPONSIBILITY",
      badge: "PART-NCC VS PART-CAT DISTINCTIONS",
      desc: "Clear legal separation between corporate private operation (Part-NCC / Part-NCO) where the owner is responsible, versus commercial air charter (Part-CAT) under a certified carrier's AOC policy.",
      highlights: ["Waiver of subrogation clauses", "Additional insured endorsements", "Charter revenue dry-lease covenants"],
    },
    {
      title: "CREW & PASSENGER PROTECTION",
      badge: "ACCIDENT & MEDICAL INDEMNITY",
      desc: "Personal accident, medical evacuation, and baggage liability covering flight crew, corporate executives, and guests onboard private missions.",
      highlights: ["Loss of license insurance for pilots", "Baggage & personal effects", "Search and rescue cost indemnification"],
    },
    {
      title: "HANGAR & GROUND HANDLING RISK",
      badge: "PREMISES & STORAGE LIABILITY",
      desc: "Protection against ramp collisions, hangar roof collapses, ground equipment contact, and fuel contamination during FBO maintenance.",
      highlights: ["Hangarkeeper's liability coordination", "FBO ground handling indemnity", "Ferry flight positioning coverage"],
    },
    {
      title: "BROKER REVIEW CHECKLIST",
      badge: "KEY QUESTIONS FOR QUALIFIED BROKERS",
      desc: "Critical questions aircraft owners and flight departments must address with a licensed, qualified aviation insurance professional prior to policy binding.",
      highlights: ["Pilot minimum flight hour warranties", "Permitted geographic navigation limits", "Deductible buy-back provisions"],
    },
  ];

  return (
    <div className="w-full bg-white text-neutral-900 font-sans flex-1 flex flex-col">
      {/* 01 — EDITORIAL HEADER */}
      <section className="w-full py-20 sm:py-28 border-b border-neutral-200/80 bg-white">
        <Container size="wide">
          <div className="flex flex-col gap-8 max-w-6xl mx-auto">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
              <Link href="/" className="hover:text-amber-600 transition">HOME</Link>
              <span>/</span>
              <Link href="/aircraft/ownership" className="hover:text-amber-600 transition">OWNERSHIP</Link>
              <span>/</span>
              <span className="text-neutral-900 font-bold">AVIATION INSURANCE ADVISORY</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-200 pb-8">
              <div className="space-y-4 max-w-3xl">
                <div className="flex items-center gap-3">
                  <span className="editorial-tag-dark">
                    RISK MANAGEMENT & REGULATORY UNDERWRITING
                  </span>
                  <DataStatusBadge status="INDICATIVE" />
                </div>
                <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-neutral-900 leading-[1.05] font-sans">
                  Aircraft Insurance & Risk Advisory<span className="text-amber-600">.</span>
                </h1>
                <p className="text-lg text-neutral-600 font-light leading-relaxed">
                  Navigating aircraft hull protection, statutory third-party liability, and owner/operator responsibility under EASA and European regulatory frameworks.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a href="#inquiry-form">
                  <Button variant="primary" size="lg" className="whitespace-nowrap px-8 shadow-xl">
                    SUBMIT RISK INQUIRY ↓
                  </Button>
                </a>
              </div>
            </div>

            {/* Visual Hero Feature */}
            <div className="relative h-[360px] sm:h-[480px] w-full rounded-3xl overflow-hidden shadow-2xl border border-neutral-200 bg-neutral-900 group">
              <AviationImage
                src="https://images.unsplash.com/photo-1474302770737-173ee21bab63?auto=format&fit=crop&w=1600&q=85"
                alt="Aircraft Hull & Statutory Risk Verification"
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-1000"
                fallbackTitle="Aircraft Hull Risk"
                fallbackCode="INSURANCE // ADVISORY"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />
              <div className="absolute bottom-8 left-8 right-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 text-white z-10 font-mono text-xs">
                <div>
                  <span className="text-[10px] text-amber-400 font-bold uppercase block tracking-wider">
                    EASA PART-CAT & PART-NCC RISK COMPLIANCE
                  </span>
                  <span className="text-white text-lg sm:text-xl font-light font-sans">
                    Hull, Third-Party Liability & War Risk Protocols
                  </span>
                </div>
                <span className="bg-black/70 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-neutral-300">
                  EU REGULATION (EC) NO 785/2004 STANDARDS
                </span>
              </div>
            </div>

            {/* Mandatory Regulatory Transparency Disclosure */}
            <div className="p-6 rounded-2xl bg-[#fafaf7] border border-neutral-200 text-xs text-neutral-600 leading-relaxed font-sans">
              <strong className="text-neutral-900 font-mono block mb-1">
                DISCLOSURE & REGULATORY COMPLIANCE NOTICE:
              </strong>
              AIR by Cristian Văduva is an executive aviation concierge and decision intelligence platform. AIR is not a licensed insurance broker, intermediary, or insurance underwriting agent. All information provided on this page is strictly for educational, pre-purchase orientation, and decision-support purposes. Insurance binding, formal quotes, and policy contracts must be executed directly through certified, licensed insurance brokers and authorized underwriters.
            </div>

            {/* Contextual Link to Cristian Văduva Insurance Advisory */}
            <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-amber-600 font-bold uppercase tracking-wider block">
                  CRISTIAN VĂDUVA BUSINESS ECOSYSTEM // INSURANCE ADVISORY
                </span>
                <p className="text-sm text-neutral-800 font-sans">
                  Looking for comprehensive business risk management, life protection, or corporate insurance in partnership with Generali România?
                </p>
              </div>
              <a
                href="https://insurance.cristianvaduva.com"
                target="_blank"
                rel="noopener noreferrer"
                className="whitespace-nowrap px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-mono font-bold transition flex items-center gap-1.5"
              >
                <span>insurance.cristianvaduva.com</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* 02 — RISK UNDERWRITING TOPICS */}
      <section className="w-full py-16 sm:py-24 bg-[#fafaf7] border-b border-neutral-200/80">
        <Container size="wide">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="space-y-3">
              <span className="editorial-tag-dark">
                STATUTORY RISK ARCHITECTURE
              </span>
              <h2 className="text-3xl sm:text-4xl font-light text-neutral-900 font-sans">
                Core Aviation Risk Pillars
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topics.map((t) => (
                <div
                  key={t.title}
                  className="editorial-card-light p-6 sm:p-7 rounded-3xl space-y-4 flex flex-col justify-between bg-white shadow-sm border border-neutral-200"
                >
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono text-amber-600 font-bold tracking-wider uppercase block">
                      {t.badge}
                    </span>
                    <h3 className="text-xl font-light text-neutral-900 font-sans">
                      {t.title}
                    </h3>
                    <p className="text-xs text-neutral-600 font-sans leading-relaxed">
                      {t.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-neutral-100">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold block mb-1">
                      Key Underwriting Points:
                    </span>
                    <ul className="space-y-1 text-xs font-sans text-neutral-600">
                      {t.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-amber-600 font-bold">•</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 03 — INQUIRY FORM SECTION */}
      <section id="inquiry-form" className="w-full py-16 sm:py-24 bg-white">
        <Container size="wide">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <span className="editorial-tag-dark">
                DIRECT ADVISORY CONSULTATION
              </span>
              <h2 className="text-3xl sm:text-4xl font-light text-neutral-900 font-sans">
                Request an Aviation Insurance Consultation
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 font-sans">
                Connect with our advisory desk to review airframe parameters, operating models, and qualified insurance broker introductions.
              </p>
            </div>

            <InsuranceInquiryForm />
          </div>
        </Container>
      </section>
    </div>
  );
}
