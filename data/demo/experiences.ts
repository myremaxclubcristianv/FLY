import { Experience } from "../../types/domain";

export const DEMO_EXPERIENCES: Experience[] = [
  {
    id: "exp-castle-hop",
    slug: "transylvanian-castle-heli-hop",
    title: "TRANSYLVANIAN CASTLE HELI-HOP",
    category: "CASTLE",
    locationName: "BUCHAREST → BRAN & PELEȘ",
    duration: "4.5 HOURS TOTAL",
    capacity: 5,
    description:
      "Direct twin-engine helicopter flight from Băneasa (LROP) to private mountain pads near Bran and Peleș Castles, bypassing highway congestion.",
    highlights: [
      "Point-to-point direct helipad landing",
      "Prahova Valley aerial viewpoint",
      "Private pad handling",
    ],
    operatorId: "op-heli-ro",
    verificationStatus: "IDENTITY_CHECKED",
    dataStatus: "REQUEST",
    lastVerifiedAt: "2026-09-01",
  },
  {
    id: "exp-danube-delta",
    slug: "danube-delta-touchdown",
    title: "DANUBE DELTA WILDERNESS TOUCHDOWN",
    category: "SCENIC_FLIGHT",
    locationName: "BUCHAREST → DELTA PRIVATE PAD",
    duration: "FULL DAY",
    capacity: 6,
    description:
      "Direct aerial flight to secluded eco-resort helipads deep in UNESCO Danube Delta sanctuary waters.",
    highlights: [
      "Aerial sanctuary tour",
      "Direct eco-lodge helipad touchdown",
      "Freshwater coastal route",
    ],
    operatorId: "op-heli-ro",
    verificationStatus: "IDENTITY_CHECKED",
    dataStatus: "REQUEST",
    lastVerifiedAt: "2026-08-25",
  },
  {
    id: "exp-black-sea",
    slug: "black-sea-coastal-dispatch",
    title: "BLACK SEA COASTAL FLIGHT DISPATCH",
    category: "SUNSET",
    locationName: "BUCHAREST → MAMAIA / CONSTANȚA",
    duration: "45 MIN FLIGHT",
    capacity: 7,
    description:
      "Rapid weekend positioning connecting Băneasa hub directly with coastal handling facilities and private beach helipads.",
    highlights: [
      "Coastal sunset flight vector",
      "Fast weekend summer positioning",
      "Direct marina transport option",
    ],
    operatorId: "op-jet-ro",
    verificationStatus: "DATA_VERIFIED",
    dataStatus: "REQUEST",
    lastVerifiedAt: "2026-08-20",
  },
];
