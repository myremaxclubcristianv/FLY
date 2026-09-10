import { AviationTechArticle } from "@/types/domain";

export const REAL_AVIATION_TECH_ARTICLES: AviationTechArticle[] = [
  {
    id: "tech-1",
    slug: "evtol-and-advanced-air-mobility-in-europe",
    title: "eVTOL & Advanced Air Mobility: The Next Era of European Regional Transit",
    subtitle: "How Electric Vertical Takeoff & Landing aircraft are transforming 50-to-200 km regional corridors.",
    category: "EVTOL",
    readTimeMinutes: 7,
    publicationDate: "2026-09-01",
    excerpt:
      "Electric Vertical Takeoff and Landing (eVTOL) aircraft promise to revolutionize regional point-to-point travel between airports, heliports, and city centers with zero operational emissions.",
    sections: [
      {
        heading: "The Technological Breakthrough",
        paragraphs: [
          "Advances in high-density lithium-sulfur batteries, distributed electric propulsion (DEP), and fly-by-wire flight control systems have allowed manufacturers to design ultra-quiet aircraft with noise footprints 100 times lower than conventional turbine helicopters.",
          "Companies like Lilium, Volocopter, Joby, and Eve Air Mobility are undergoing rigorous EASA SC-VTOL certification audits, aiming for commercial entry into service across Europe by 2026–2027.",
        ],
      },
      {
        heading: "Corridor Integration & Vertiports",
        paragraphs: [
          "Rather than replacing jet charter, eVTOLs will act as high-speed zero-emission feeders between central business districts (e.g. Bucharest Financial District or Paris CBD) and executive airports like Băneasa (LRBS) or Le Bourget (LFPB).",
          "Vertiport infrastructure requires high-voltage megawatt charging, automated passenger security screening, and dedicated low-altitude U-space air traffic control protocols.",
        ],
      },
    ],
    image: "https://images.unsplash.com/photo-1474302770737-173ee21bab63?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "tech-2",
    slug: "sustainable-aviation-fuel-saf-revolution",
    title: "Sustainable Aviation Fuel (SAF): Decarbonizing Business Jets Today",
    subtitle: "Drop-in synthetic fuels derived from waste oils and direct air capture are reducing lifecycle carbon footprints by up to 80%.",
    category: "SAF",
    readTimeMinutes: 6,
    publicationDate: "2026-08-20",
    excerpt:
      "Sustainable Aviation Fuel (SAF) is the primary near-term pathway for private aviation to reach net-zero carbon emissions without altering existing jet turbine engines or airport fuel infrastructure.",
    sections: [
      {
        heading: "HEFA and Power-to-Liquid Pathways",
        paragraphs: [
          "Currently, Hydroprocessed Esters and Fatty Acids (HEFA) and synthetic Power-to-Liquid (PtL) e-fuels are blended up to 50% with conventional Jet A-1 fuel.",
          "Major FBO chains in Geneva, Zurich, Nice, and London Farnborough now offer neat or blended SAF directly at the pump for executive jet fleets.",
        ],
      },
    ],
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "tech-3",
    slug: "ai-in-predictive-maintenance-and-flight-optimization",
    title: "Artificial Intelligence in Predictive Aircraft Maintenance & Flight Routing",
    subtitle: "Neural networks analyzing real-time engine telemetry prevent unscheduled downtime and optimize fuel burn.",
    category: "AI_IN_AVIATION",
    readTimeMinutes: 5,
    publicationDate: "2026-08-10",
    excerpt:
      "Modern business jets record thousands of sensor parameters per second. AI algorithms process this telemetry mid-flight to predict component wear before failure occurs.",
    sections: [
      {
        heading: "Mid-Flight Telemetry & Zero Unscheduled Downtime",
        paragraphs: [
          "Pratt & Whitney, Rolls-Royce, and GE Aerospace engine health monitoring systems transmit live sensor telemetry via satellite directly to MRO service centers.",
          "Predictive AI models flag minor thermal anomalies days in advance, allowing technicians to replace parts during scheduled overnights rather than grounding an aircraft during a customer mission.",
        ],
      },
    ],
    image: "https://images.unsplash.com/photo-1520437358207-323b43b50729?auto=format&fit=crop&w=1200&q=80",
  },
];
