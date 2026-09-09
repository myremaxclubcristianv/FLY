import {
  AircraftCategoryPreview,
  ExperiencePreview,
  DestinationPreview,
  JournalArticlePreview,
} from "../../types/demo-data";

export const AIRCRAFT_PREVIEWS: AircraftCategoryPreview[] = [
  {
    id: "ac-light-jet",
    category: "LIGHT JET",
    name: "LIGHT EXECUTIVE JET",
    description:
      "Efficient short to mid-range European flights. Accesses smaller runways with comfortable stand-up or semi-flush cabins.",
    range: "1,400 - 2,100 NM",
    capacity: "6 - 8 SEATS",
    speed: "420 KTS",
    status: "INDICATIVE",
  },
  {
    id: "ac-mid-jet",
    category: "MIDSIZE JET",
    name: "MIDSIZE SUPERIOR JET",
    description:
      "Transcontinental endurance with full stand-up cabins, dedicated flight attendant service, and expanded baggage bay.",
    range: "2,500 - 3,400 NM",
    capacity: "8 - 10 SEATS",
    speed: "460 KTS",
    status: "INDICATIVE",
  },
  {
    id: "ac-twin-heli",
    category: "HELICOPTER",
    name: "TWIN-ENGINE EXECUTIVE HELI",
    description:
      "Point-to-point transfers landing directly at private pads, mountain resorts, or coastal estates without runway reliance.",
    range: "320 - 450 NM",
    capacity: "5 - 7 SEATS",
    speed: "145 KTS",
    status: "INDICATIVE",
  },
  {
    id: "ac-turboprop",
    category: "TURBOPROP",
    name: "HIGH-PERFORMANCE TURBOPROP",
    description:
      "Superior short-field capability for unpaved or regional airfields with jet-like cabin room and high fuel efficiency.",
    range: "1,100 - 1,800 NM",
    capacity: "6 - 9 SEATS",
    speed: "280 KTS",
    status: "INDICATIVE",
  },
];

export const EXPERIENCE_PREVIEWS: ExperiencePreview[] = [
  {
    id: "exp-transylvania",
    title: "TRANSYLVANIAN CASTLE HELI-HOP",
    location: "BUCHAREST → BRAN & PELEȘ",
    type: "DAY MISSION",
    duration: "4.5 HOURS TOTAL",
    description:
      "Direct heliport transfer from Băneasa (LRBS) to private mountain pads. Bypasses ground highway congestion.",
    status: "REQUEST",
  },
  {
    id: "exp-delta",
    title: "DANUBE DELTA WILDERNESS TOUCHDOWN",
    location: "BUCHAREST → DELTA PRIVATE PAD",
    type: "EXPEDITION",
    duration: "FULL DAY",
    description:
      "Direct amphibian or twin-engine helicopter flight to secluded eco-resorts deep in UNESCO sanctuary waters.",
    status: "REQUEST",
  },
  {
    id: "exp-blacksea",
    title: "BLACK SEA COASTAL FLIGHT DISPATCH",
    location: "BUCHAREST → MAMAIA / CONSTANȚA",
    type: "COASTAL EXPRESS",
    duration: "45 MIN FLIGHT",
    description:
      "Rapid summer weekend positioning connecting Băneasa hub directly with coastal handling facilities.",
    status: "REQUEST",
  },
];

export const DESTINATION_PREVIEWS: DestinationPreview[] = [
  {
    id: "dest-bran",
    name: "BRAN & BRAȘOV REGION",
    region: "TRANSYLVANIA",
    highlights: "Castle Pads, Prahova Valley, Mountain Resorts",
    indicativeAccess: "42 min Heli / 25 min Flight to LROV",
    status: "INDICATIVE",
  },
  {
    id: "dest-constanta",
    name: "CONSTANȚA / MAMAIA",
    region: "BLACK SEA COAST",
    highlights: "LRCK Airport, Helipads, Marina Access",
    indicativeAccess: "35 min Heli / 30 min Turboprop",
    status: "INDICATIVE",
  },
  {
    id: "dest-cluj",
    name: "CLUJ-NAPOCA HUB",
    region: "NORTH-WEST TRANSYLVANIA",
    highlights: "LRCL Airport, Executive FBO, Tech Corridor",
    indicativeAccess: "50 min Light Jet / 1h 10m Turboprop",
    status: "INDICATIVE",
  },
  {
    id: "dest-sibiu",
    name: "SIBIU CULTURAL CAPITAL",
    region: "SOUTHERN TRANSYLVANIA",
    highlights: "LRSB Airport, Medieval Historic Quarter",
    indicativeAccess: "40 min Turboprop / 35 min Light Jet",
    status: "INDICATIVE",
  },
];

export const JOURNAL_PREVIEWS: JournalArticlePreview[] = [
  {
    id: "art-baneasa",
    title: "Băneasa (LRBS) as Bucharest's Premier Business Aviation Gate",
    category: "INFRASTRUCTURE",
    readTime: "4 MIN READ",
    date: "SEP 2026",
    excerpt:
      "Why Bucharest-Băneasa Aurel Vlaicu International Airport provides unmatched 10-minute access to the central business district.",
  },
  {
    id: "art-choosing",
    title: "Choosing Between Turboprop and Light Jet for Regional Missions",
    category: "DECISION GUIDE",
    readTime: "6 MIN READ",
    date: "AUG 2026",
    excerpt:
      "A technical comparison of field length requirements, block time differences, and payload efficiency under 500 nautical miles.",
  },
];
