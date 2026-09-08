import { WorldItem } from "../../types/demo-data";

export const WORLDS_DATA: WorldItem[] = [
  {
    id: "world-fly",
    title: "FLY",
    code: "WORLD // 01",
    description:
      "Instant flight decision engine. Match your mission profile with private jets, helicopters, or turboprops across Europe and Romania.",
    href: "/#fly",
    badge: "DECISION ENGINE",
    status: "INDICATIVE",
    metrics: "POINT-TO-POINT DISCOVERY",
  },
  {
    id: "world-experiences",
    title: "EXPERIENCES",
    code: "WORLD // 02",
    description:
      "Curated aviation journeys. Transylvanian heli-skiing, Black Sea coastal hops, and remote estate access.",
    href: "/#experiences",
    badge: "CURATED MISSION",
    status: "REQUEST",
    metrics: "BESPOKE ITINERARIES",
  },
  {
    id: "world-business",
    title: "BUSINESS",
    code: "WORLD // 03",
    description:
      "Corporate flight management, multi-stop European itineraries, and multi-city shuttle optimization.",
    href: "/#business",
    badge: "CORPORATE ACCESS",
    status: "REQUEST",
    metrics: "OPTIMIZED ROUTING",
  },
  {
    id: "world-aircraft",
    title: "AIRCRAFT",
    code: "WORLD // 04",
    description:
      "Category intelligence & fleet specifications. Compare range, cabin dimensions, and field performance without jargon.",
    href: "/#aircraft",
    badge: "FLEET INTELLIGENCE",
    status: "INDICATIVE",
    metrics: "SPECS & CAPABILITIES",
  },
  {
    id: "world-aviation",
    title: "AVIATION",
    code: "WORLD // 05",
    description:
      "Management, acquisition, financing, MRO, and hangar services ecosystem for aircraft owners and operators.",
    href: "/#aviation",
    badge: "ECOSYSTEM",
    status: "INDICATIVE",
    metrics: "OWNERSHIP & INFRASTRUCTURE",
  },
  {
    id: "world-journal",
    title: "JOURNAL",
    code: "WORLD // 06",
    description:
      "Aviation intelligence, regional airfield updates, operational dispatch insights, and destination dispatch.",
    href: "/#journal",
    badge: "EDITORIAL",
    status: "LIVE",
    metrics: "ANALYSIS & DISPATCH",
  },
];
