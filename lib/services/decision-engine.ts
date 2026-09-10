import {
  AircraftCategory,
  MissionPriority,
} from "@/types/domain";
import {
  TripType,
  DateFlexibility,
  BudgetPreference,
  MissionPurpose,
  SpecialRequirement,
  TransportOption,
  DecisionPayload,
} from "@/types/flight-request";
import { formatFlightDuration, calculateGreatCircleDistanceNm } from "@/lib/utils/distance";

export interface DecisionEngineInput {
  origin: string;
  destination: string;
  distanceNm?: number;
  passengerCount: number;
  priority: MissionPriority;
  tripType?: TripType;
  date?: string;
  returnDate?: string;
  dateFlexibility?: DateFlexibility;
  budgetPreference?: BudgetPreference;
  purpose?: MissionPurpose;
  requirements?: SpecialRequirement[];
  isHelicopterAccessible?: boolean;
  runwayConstrained?: boolean;
  specialLuggage?: boolean;
}

export interface RecommendationResult {
  category: AircraftCategory;
  categoryDisplayName: string;
  recommendedModelSlug: string;
  recommendedModelName: string;
  rationale: string;
  estimatedDuration: string;
  constraints: string[];
  dataStatus: "VERIFIED" | "INDICATIVE" | "REQUEST";
  verificationStatus: "VERIFIED" | "OFFICIAL_SOURCE" | "PUBLIC";
  recommendationScore: number;
  payload: DecisionPayload;
  alternatives: Array<{
    category: string;
    categoryDisplayName: string;
    title: string;
    estimatedDuration: string;
    rationale: string;
    indicativePriceRange: string;
    pricingStatus: "INDICATIVE" | "REQUEST";
    constraints: string[];
  }>;
}

const CITY_COORDINATES: Record<string, [number, number]> = {
  bucharest: [44.5032, 26.1021], // LRBS
  baneasa: [44.5032, 26.1021],
  otopeni: [44.5711, 26.085],
  bran: [45.515, 25.367],
  brasov: [45.703, 25.529], // LROV
  mamaia: [44.276, 28.618], // LRTZ
  constanta: [44.362, 28.488], // LRCK
  cluj: [46.785, 23.686], // CLJ
  timisoara: [45.81, 21.337], // TSR
  iasi: [47.178, 27.62], // IAS
  sibiu: [45.785, 24.091], // SBZ
  nice: [43.665, 7.215], // LFMN
  cannes: [43.541, 6.953],
  paris: [48.969, 2.441], // LFPB Le Bourget
  london: [51.275, -0.776], // EGLF Farnborough
  geneva: [46.238, 6.108], // LSGG
  zurich: [47.458, 8.548], // LSZH
  vienna: [48.11, 16.569], // LOWW
  munich: [48.353, 11.786], // EDDM
  frankfurt: [50.037, 8.562], // EDDF
  milan: [45.445, 9.276], // LIML Linate
  rome: [41.799, 12.246], // LIRF
  madrid: [40.493, -3.566], // LEMD
  ibiza: [38.872, 1.373], // LEIB
  mykonos: [37.435, 25.348], // LGMK
  athens: [37.936, 23.944], // LGAV
  dubai: [24.896, 55.161], // OMDW
  maldives: [4.191, 73.529], // VRMM
  seychelles: [-4.674, 55.521], // FSIA
  newyork: [40.639, -73.778], // KJFK
};

function resolveCoordinates(name: string): [number, number] | null {
  const lower = name.toLowerCase();
  for (const [key, coords] of Object.entries(CITY_COORDINATES)) {
    if (lower.includes(key)) return coords;
  }
  return null;
}

function resolveDistance(origin: string, destination: string, explicitDistance?: number): number {
  if (explicitDistance && explicitDistance > 0) return explicitDistance;
  const c1 = resolveCoordinates(origin);
  const c2 = resolveCoordinates(destination);
  if (c1 && c2) {
    return Math.max(calculateGreatCircleDistanceNm(c1[0], c1[1], c2[0], c2[1]), 35);
  }
  return 420; // Standard European regional default
}

/**
 * Deterministic AIR Mission Decision & Way-to-Fly Engine
 * Analyzes mission vector, airfield constraints, passenger count, mission purpose,
 * luggage volume, and operational priorities to output the optimal way to fly and alternatives.
 */
export function evaluateMissionDecision(input: DecisionEngineInput): RecommendationResult {
  const {
    origin,
    destination,
    passengerCount = 2,
    priority = "FASTEST",
    tripType = "ONE_WAY",
    date = "2026-09-24",
    returnDate,
    budgetPreference = "STANDARD_CHARTER",
    purpose = "EXECUTIVE_BUSINESS",
    requirements = [],
    isHelicopterAccessible = false,
    runwayConstrained = false,
  } = input;

  const distanceNm = resolveDistance(origin, destination, input.distanceNm);
  const originLower = origin.toLowerCase();
  const destLower = destination.toLowerCase();
  const isShortHop = distanceNm <= 180;
  const hasHelipadReq = requirements.includes("HELIPAD_DIRECT");
  const isMountainOrPad =
    hasHelipadReq ||
    isHelicopterAccessible ||
    purpose === "MOUNTAIN_ALPINE" ||
    originLower.includes("pad") ||
    destLower.includes("pad") ||
    originLower.includes("bran") ||
    destLower.includes("bran") ||
    originLower.includes("mamaia") ||
    destLower.includes("mamaia") ||
    originLower.includes("sinaia") ||
    destLower.includes("sinaia") ||
    destLower.includes("tuzla") ||
    runwayConstrained;

  // Case 1: Point-to-Point Helicopter Mission (Mountain resort, coastal pad, or short hop under 180 NM)
  if (isMountainOrPad && isShortHop && passengerCount <= 6) {
    const primaryOpt: TransportOption = {
      id: "opt-primary-heli",
      category: "HELICOPTER",
      categoryDisplayName: "Twin-Engine Executive Helicopter",
      name: "AIRBUS H145 / BELL 429",
      tagline: "Direct point-to-point landing at destination property without airport transfers",
      estimatedDuration: formatFlightDuration(distanceNm, 140),
      status: "VERIFIED",
      verificationStatus: "OFFICIAL_SOURCE",
      pricingStatus: "REQUEST",
      indicativePriceRange: "REQUEST OPERATOR QUOTE",
      keyBenefit: "Zero airport transfer overhead; lands directly on private estate or hotel pad",
      suitableFor: "Mountain retreats, coastal transfers, castle arrivals, time-critical direct hops",
      operationalConstraints: [
        "Day VFR / IFR minima required",
        "Maximum 6 passengers with standard soft luggage",
        "Subject to destination landing pad authorization",
      ],
      recommendationReason:
        "AIR recommends a dedicated Twin-Engine Executive Helicopter for this mission. Because your route involves mountain terrain or direct helipad access under 180 NM, a helicopter saves over 90 minutes of ground mountain transfer compared to landing at a conventional runway.",
      routing: `${origin} → ${destination} (Direct Rotor Vector)`,
      isPrimary: true,
    };

    const alt1: TransportOption = {
      id: "opt-alt-turboprop",
      category: "TURBOPROP",
      categoryDisplayName: "Single-Engine Executive Turboprop",
      name: "PILATUS PC-12 NGX",
      tagline: "Best-value runway alternative with Swiss-engineered short field access",
      estimatedDuration: formatFlightDuration(distanceNm, 280),
      status: "VERIFIED",
      verificationStatus: "OFFICIAL_SOURCE",
      pricingStatus: "INDICATIVE",
      indicativePriceRange: "€2,600 - €3,900",
      keyBenefit: "Economical hourly cost, massive cargo door for ski/bulky luggage",
      suitableFor: "Nearest certified aerodrome landing followed by 35-45m chauffeured transfer",
      operationalConstraints: ["Requires certified aerodrome (min 750m runway)"],
      recommendationReason:
        "Operates into the nearest regional runway, requiring a short chauffeured ground transfer to destination.",
      routing: `${origin} → Nearest Runway + Ground Transfer`,
    };

    const alt2: TransportOption = {
      id: "opt-alt-light-jet",
      category: "LIGHT_JET",
      categoryDisplayName: "Light Jet",
      name: "EMBRAER PHENOM 300E",
      tagline: "High-speed jet corridor to closest major airport",
      estimatedDuration: formatFlightDuration(distanceNm, 420),
      status: "VERIFIED",
      verificationStatus: "OFFICIAL_SOURCE",
      pricingStatus: "INDICATIVE",
      indicativePriceRange: "€4,200 - €5,800",
      keyBenefit: "Cruises at 453 KTS with pressurized quiet cabin",
      suitableFor: "Intercity jet connection when regional airport infrastructure exists",
      operationalConstraints: ["Requires certified paved runway >= 1,100m"],
      recommendationReason: "Jet speed to nearest airport, followed by executive ground transfer.",
      routing: `${origin} → Nearest Major Airport + VIP Vehicle`,
    };

    return {
      category: "HELICOPTER",
      categoryDisplayName: "Twin-Engine Executive Helicopter",
      recommendedModelSlug: "airbus-h145",
      recommendedModelName: "Airbus H145 / Bell 429",
      rationale:
        "Direct point-to-point landing capability without airport transfers. Ideal for mountain resorts, coastal pads, and regional short-hops under 180 NM.",
      estimatedDuration: formatFlightDuration(distanceNm, 140),
      constraints: ["Day VFR/IFR weather dependent", "Maximum 6 passengers with standard luggage"],
      dataStatus: "VERIFIED",
      verificationStatus: "OFFICIAL_SOURCE",
      recommendationScore: 97,
      payload: {
        missionTitle: `${origin} to ${destination} Point-to-Point Helicopter Mission`,
        origin,
        destination,
        passengers: passengerCount,
        tripType,
        date,
        returnDate,
        priority,
        purpose,
        dataStatus: "VERIFIED",
        verificationStatus: "OFFICIAL_SOURCE",
        summaryReason: primaryOpt.recommendationReason,
        primaryOption: primaryOpt,
        alternativeOptions: [alt1, alt2],
      },
      alternatives: [
        {
          category: "TURBOPROP",
          categoryDisplayName: "Executive Turboprop",
          title: "Pilatus PC-12 NGX",
          estimatedDuration: alt1.estimatedDuration,
          rationale: alt1.recommendationReason,
          indicativePriceRange: alt1.indicativePriceRange || "€2,600 - €3,900",
          pricingStatus: alt1.pricingStatus as "INDICATIVE" | "REQUEST",
          constraints: alt1.operationalConstraints,
        },
        {
          category: "LIGHT_JET",
          categoryDisplayName: "Light Jet",
          title: "Embraer Phenom 300E",
          estimatedDuration: alt2.estimatedDuration,
          rationale: alt2.recommendationReason,
          indicativePriceRange: alt2.indicativePriceRange || "€4,200 - €5,800",
          pricingStatus: alt2.pricingStatus as "INDICATIVE" | "REQUEST",
          constraints: alt2.operationalConstraints,
        },
      ],
    };
  }

  // Case 2: Ultra Long Range (Transcontinental > 1,500 NM) or Heavy Manifest (10+ passengers)
  if (distanceNm > 1500 || passengerCount >= 10) {
    const primaryOpt: TransportOption = {
      id: "opt-primary-heavy",
      category: "LARGE_CABIN_JET",
      categoryDisplayName: "Large Cabin / Heavy Jet",
      name: "BOMBARDIER GLOBAL 6000 / GULFSTREAM G650",
      tagline: "Transcontinental non-stop endurance with 3-zone private staterooms and high-speed cruise",
      estimatedDuration: formatFlightDuration(distanceNm, 490),
      status: "VERIFIED",
      verificationStatus: "OFFICIAL_SOURCE",
      pricingStatus: "REQUEST",
      indicativePriceRange: "REQUEST OPERATOR QUOTE",
      keyBenefit: "Over 6,000 NM non-stop range, full lie-flat berthing, flight attendant, hot galley dining",
      suitableFor: "Transcontinental flights, Middle East/Asia routes, and delegations up to 14 passengers",
      operationalConstraints: [
        "Requires certified airport runway >= 1,650m",
        "Two pilots + flight attendant mandatory",
      ],
      recommendationReason:
        distanceNm > 1500
          ? `For a transcontinental mission of ${distanceNm} NM, AIR recommends a Large Cabin Heavy Jet (Global 6000 / G650) to guarantee direct non-stop fuel endurance with full IFR reserves, eliminating time-consuming technical fuel stops.`
          : `For a manifest of ${passengerCount} passengers, a Large Cabin Heavy Jet is required to provide certified seat belts, weight and balance compliance, and unrestricted baggage hold capacity.`,
      routing: `${origin} → ${destination} (Transcontinental Direct Vector)`,
      isPrimary: true,
    };

    const alt1: TransportOption = {
      id: "opt-alt-super-mid",
      category: "SUPER_MIDSIZE_JET",
      categoryDisplayName: "Super Midsize Jet",
      name: "BOMBARDIER CHALLENGER 350",
      tagline: "Stand-up flat floor cabin for up to 9 passengers",
      estimatedDuration: formatFlightDuration(distanceNm, 470),
      status: "VERIFIED",
      verificationStatus: "OFFICIAL_SOURCE",
      pricingStatus: "INDICATIVE",
      indicativePriceRange: "€14,000 - €18,500",
      keyBenefit: "Economical stand-up cabin for missions up to 2,700 NM",
      suitableFor: "Mid-to-long continental European and Middle East routes",
      operationalConstraints: ["Max 9 passengers", "Range limit 2,700 NM"],
      recommendationReason: "Optimized super-midsize alternative for medium-range legs.",
      routing: `${origin} → ${destination} (Super Mid Vector)`,
    };

    return {
      category: "LARGE_CABIN_JET",
      categoryDisplayName: "Large Cabin Heavy Jet",
      recommendedModelSlug: "global-6000",
      recommendedModelName: "Bombardier Global 6000 / Gulfstream G650",
      rationale: primaryOpt.recommendationReason,
      estimatedDuration: formatFlightDuration(distanceNm, 490),
      constraints: ["Requires minimum 1,650m runway length"],
      dataStatus: "VERIFIED",
      verificationStatus: "OFFICIAL_SOURCE",
      recommendationScore: 96,
      payload: {
        missionTitle: `${origin} to ${destination} Long-Range Heavy Mission`,
        origin,
        destination,
        passengers: passengerCount,
        tripType,
        date,
        returnDate,
        priority,
        purpose,
        dataStatus: "VERIFIED",
        verificationStatus: "OFFICIAL_SOURCE",
        summaryReason: primaryOpt.recommendationReason,
        primaryOption: primaryOpt,
        alternativeOptions: [alt1],
      },
      alternatives: [
        {
          category: "SUPER_MIDSIZE_JET",
          categoryDisplayName: "Super Midsize Jet",
          title: "Bombardier Challenger 350",
          estimatedDuration: alt1.estimatedDuration,
          rationale: alt1.recommendationReason,
          indicativePriceRange: alt1.indicativePriceRange || "€14,000 - €18,500",
          pricingStatus: "INDICATIVE",
          constraints: alt1.operationalConstraints,
        },
      ],
    };
  }

  // Case 3: High Passenger Manifest (7-9 passengers)
  if (passengerCount >= 7) {
    const primaryOpt: TransportOption = {
      id: "opt-primary-super-mid",
      category: "SUPER_MIDSIZE_JET",
      categoryDisplayName: "Super Midsize Jet",
      name: "BOMBARDIER CHALLENGER 350",
      tagline: "Stand-up flat floor cabin with full passenger payload and transcontinental speed",
      estimatedDuration: formatFlightDuration(distanceNm, 470),
      status: "VERIFIED",
      verificationStatus: "OFFICIAL_SOURCE",
      pricingStatus: "REQUEST",
      indicativePriceRange: "REQUEST OPERATOR QUOTE",
      keyBenefit: "Generous stand-up cabin (6ft height), dedicated galley, quietest cabin in class",
      suitableFor: "Executive delegations, corporate boards, large family groups with full luggage",
      operationalConstraints: [
        "Minimum runway length: 1,400m",
        "Dedicated dual-pilot crew + optional flight hostess",
      ],
      recommendationReason:
        `With ${passengerCount} passengers on manifest, AIR recommends a Super Midsize Jet (Bombardier Challenger 350). Smaller light jets cannot comfortably accommodate 7-9 passengers with full luggage without exceeding payload limits. The Challenger 350 delivers true stand-up comfort and high-speed cruise (470 KTS).`,
      routing: `${origin} → ${destination} (Direct Jet Vector)`,
      isPrimary: true,
    };

    const alt1: TransportOption = {
      id: "opt-alt-midsize",
      category: "MIDSIZE_JET",
      categoryDisplayName: "Midsize Jet",
      name: "CESSNA CITATION XLS+",
      tagline: "Efficient stand-up cabin sized precisely for 7-8 passengers on regional legs",
      estimatedDuration: formatFlightDuration(distanceNm, 440),
      status: "VERIFIED",
      verificationStatus: "OFFICIAL_SOURCE",
      pricingStatus: "INDICATIVE",
      indicativePriceRange: "€7,800 - €10,500",
      keyBenefit: "Lower operating cost while maintaining stand-up headroom",
      suitableFor: "Budget-conscious corporate travel within Europe",
      operationalConstraints: ["Reduced luggage allowance per seat compared to Super Midsize"],
      recommendationReason: "Optimized budget alternative for 7-8 passengers on European routes.",
      routing: `${origin} → ${destination} (Midsize Jet Vector)`,
    };

    return {
      category: "SUPER_MIDSIZE_JET",
      categoryDisplayName: "Super Midsize Jet",
      recommendedModelSlug: "challenger-350",
      recommendedModelName: "Bombardier Challenger 350",
      rationale:
        "Stand-up cabin required for 7+ passengers with full luggage capacity, flight attendant service, and extended range capability.",
      estimatedDuration: formatFlightDuration(distanceNm, 470),
      constraints: ["Requires minimum 1,400m runway length"],
      dataStatus: "VERIFIED",
      verificationStatus: "OFFICIAL_SOURCE",
      recommendationScore: 95,
      payload: {
        missionTitle: `${origin} to ${destination} Executive Manifest Mission`,
        origin,
        destination,
        passengers: passengerCount,
        tripType,
        date,
        returnDate,
        priority,
        purpose,
        dataStatus: "VERIFIED",
        verificationStatus: "OFFICIAL_SOURCE",
        summaryReason: primaryOpt.recommendationReason,
        primaryOption: primaryOpt,
        alternativeOptions: [alt1],
      },
      alternatives: [
        {
          category: "MIDSIZE_JET",
          categoryDisplayName: "Midsize Jet",
          title: "Cessna Citation XLS+",
          estimatedDuration: alt1.estimatedDuration,
          rationale: alt1.recommendationReason,
          indicativePriceRange: alt1.indicativePriceRange || "€7,800 - €10,500",
          pricingStatus: "INDICATIVE",
          constraints: alt1.operationalConstraints,
        },
      ],
    };
  }

  // Case 4: Priority BEST_VALUE & Medium Distance (Pilatus PC-12 NGX)
  if (
    (priority === "BEST_VALUE" || budgetPreference === "VALUE_OPTIMIZED") &&
    distanceNm <= 500 &&
    passengerCount <= 6
  ) {
    const primaryOpt: TransportOption = {
      id: "opt-primary-turboprop",
      category: "TURBOPROP",
      categoryDisplayName: "Single-Engine Executive Turboprop",
      name: "PILATUS PC-12 NGX",
      tagline: "The gold standard in Swiss executive efficiency, short-runway capability, and huge cabin space",
      estimatedDuration: formatFlightDuration(distanceNm, 280),
      status: "VERIFIED",
      verificationStatus: "OFFICIAL_SOURCE",
      pricingStatus: "REQUEST",
      indicativePriceRange: "REQUEST OPERATOR QUOTE",
      keyBenefit: "40% lower fuel burn than entry-level jets with equal BMW Designworks interior comfort",
      suitableFor: "Regional European flights under 2.5 hours where value and luggage flexibility matter",
      operationalConstraints: [
        "Cruise speed: 280 KTS (approx 20 mins longer on European routes)",
        "Unpaved/short runway certified",
      ],
      recommendationReason:
        "AIR recommends the Pilatus PC-12 NGX for this mission. Given your priority for Best Value, the PC-12 delivers executive BMW-designed cabin seats, unmatched cargo capacity, and short-field access at a significantly lower operational cost than comparable light jets.",
      routing: `${origin} → ${destination} (Direct Turboprop Vector)`,
      isPrimary: true,
    };

    const alt1: TransportOption = {
      id: "opt-alt-light-jet",
      category: "LIGHT_JET",
      categoryDisplayName: "Light Jet",
      name: "EMBRAER PHENOM 300E",
      tagline: "25 minutes faster flight time with high-altitude jet cruising",
      estimatedDuration: formatFlightDuration(distanceNm, 420),
      status: "VERIFIED",
      verificationStatus: "OFFICIAL_SOURCE",
      pricingStatus: "INDICATIVE",
      indicativePriceRange: "€4,400 - €6,200",
      keyBenefit: "Fastest light jet in the world; best-in-class cabin pressurization",
      suitableFor: "Time-critical schedules requiring maximum speed",
      operationalConstraints: ["Requires certified paved runway >= 1,100m"],
      recommendationReason: "Faster travel speed for higher direct charter cost.",
      routing: `${origin} → ${destination} (Jet Vector)`,
    };

    return {
      category: "TURBOPROP",
      categoryDisplayName: "Single-Engine Executive Turboprop",
      recommendedModelSlug: "pilatus-pc12-ngx",
      recommendedModelName: "Pilatus PC-12 NGX",
      rationale:
        "Optimal balance of operating economics, unpaved runway capability, large cargo door, and executive cabin comfort for flights under 2.5 hours.",
      estimatedDuration: formatFlightDuration(distanceNm, 280),
      constraints: ["Turboprop cruise speed (280 KTS)"],
      dataStatus: "VERIFIED",
      verificationStatus: "OFFICIAL_SOURCE",
      recommendationScore: 96,
      payload: {
        missionTitle: `${origin} to ${destination} Executive Value Mission`,
        origin,
        destination,
        passengers: passengerCount,
        tripType,
        date,
        returnDate,
        priority,
        purpose,
        dataStatus: "VERIFIED",
        verificationStatus: "OFFICIAL_SOURCE",
        summaryReason: primaryOpt.recommendationReason,
        primaryOption: primaryOpt,
        alternativeOptions: [alt1],
      },
      alternatives: [
        {
          category: "LIGHT_JET",
          categoryDisplayName: "Light Jet",
          title: "Embraer Phenom 300E",
          estimatedDuration: alt1.estimatedDuration,
          rationale: alt1.recommendationReason,
          indicativePriceRange: alt1.indicativePriceRange || "€4,400 - €6,200",
          pricingStatus: "INDICATIVE",
          constraints: alt1.operationalConstraints,
        },
      ],
    };
  }

  // Case 5: Default European Light Jet Mission -> EMBRAER PHENOM 300E (Europe's #1 Light Jet)
  const primaryOpt: TransportOption = {
    id: "opt-primary-phenom",
    category: "LIGHT_JET",
    categoryDisplayName: "Light Jet",
    name: "EMBRAER PHENOM 300E",
    tagline: "The world's bestselling light jet for 12 consecutive years: 453 KTS cruise & premium cabin altitude",
    estimatedDuration: formatFlightDuration(distanceNm, 420),
    status: "VERIFIED",
    verificationStatus: "OFFICIAL_SOURCE",
    pricingStatus: "REQUEST",
    indicativePriceRange: "REQUEST OPERATOR QUOTE",
    keyBenefit: "Fastest cruise speed in category, lowest cabin altitude (6,600 ft at FL450), 6-8 seats",
    suitableFor: "European business corridors, Mediterranean leisure, point-to-point speed",
    operationalConstraints: [
      "Requires certified paved runway >= 1,100m",
      "Full IFR operational clearance",
    ],
    recommendationReason:
      `AIR recommends the Embraer Phenom 300E as the optimal way to fly for this ${distanceNm} NM mission. It combines the highest speed in its class (453 KTS) with a quiet, low-altitude pressurized cabin, generous baggage hold, and proven operational availability across Romanian and European bases.`,
    routing: `${origin} → ${destination} (Optimal Direct Jet Vector)`,
    isPrimary: true,
  };

  const alt1: TransportOption = {
    id: "opt-alt-turboprop",
    category: "TURBOPROP",
    categoryDisplayName: "Executive Turboprop",
    name: "PILATUS PC-12 NGX",
    tagline: "Swiss-engineered efficiency and flexible cargo hold",
    estimatedDuration: formatFlightDuration(distanceNm, 280),
    status: "VERIFIED",
    verificationStatus: "OFFICIAL_SOURCE",
    pricingStatus: "INDICATIVE",
    indicativePriceRange: "€3,200 - €4,500",
    keyBenefit: "Economical fuel burn, capable of landing on grass or short runways",
    suitableFor: "Short-field access, regional golf/ski luggage trips",
    operationalConstraints: ["280 KTS cruise speed"],
    recommendationReason: "Cost-effective alternative with large cargo door.",
    routing: `${origin} → ${destination} (Turboprop Vector)`,
  };

  const alt2: TransportOption = {
    id: "opt-alt-midsize",
    category: "MIDSIZE_JET",
    categoryDisplayName: "Midsize Jet",
    name: "CESSNA CITATION XLS+",
    tagline: "Stand-up headroom and wider cabin aisle for up to 8 passengers",
    estimatedDuration: formatFlightDuration(distanceNm, 440),
    status: "VERIFIED",
    verificationStatus: "OFFICIAL_SOURCE",
    pricingStatus: "INDICATIVE",
    indicativePriceRange: "€6,800 - €9,500",
    keyBenefit: "Stand-up comfort, generous galley bar, enclosed private lavatory",
    suitableFor: "Corporate flights where standing room and meeting comfort are desired",
    operationalConstraints: ["Requires minimum 1,250m runway length"],
    recommendationReason: "Greater cabin volume and headroom for extended comfort.",
    routing: `${origin} → ${destination} (Midsize Jet Vector)`,
  };

  return {
    category: "LIGHT_JET",
    categoryDisplayName: "Light Jet",
    recommendedModelSlug: "phenom-300e",
    recommendedModelName: "Embraer Phenom 300E",
    rationale: primaryOpt.recommendationReason,
    estimatedDuration: formatFlightDuration(distanceNm, 420),
    constraints: ["Requires certified asphalt/concrete runway >= 1,100m"],
    dataStatus: "VERIFIED",
    verificationStatus: "OFFICIAL_SOURCE",
    recommendationScore: 98,
    payload: {
      missionTitle: `${origin} to ${destination} Flight Mission`,
      origin,
      destination,
      passengers: passengerCount,
      tripType,
      date,
      returnDate,
      priority,
      purpose,
      dataStatus: "VERIFIED",
      verificationStatus: "OFFICIAL_SOURCE",
      summaryReason: primaryOpt.recommendationReason,
      primaryOption: primaryOpt,
      alternativeOptions: [alt1, alt2],
    },
    alternatives: [
      {
        category: "TURBOPROP",
        categoryDisplayName: "Executive Turboprop",
        title: "Pilatus PC-12 NGX",
        estimatedDuration: alt1.estimatedDuration,
        rationale: alt1.recommendationReason,
        indicativePriceRange: alt1.indicativePriceRange || "€3,200 - €4,500",
        pricingStatus: "INDICATIVE",
        constraints: alt1.operationalConstraints,
      },
      {
        category: "MIDSIZE_JET",
        categoryDisplayName: "Midsize Jet",
        title: "Cessna Citation XLS+",
        estimatedDuration: alt2.estimatedDuration,
        rationale: alt2.recommendationReason,
        indicativePriceRange: alt2.indicativePriceRange || "€6,800 - €9,500",
        pricingStatus: "INDICATIVE",
        constraints: alt2.operationalConstraints,
      },
    ],
  };
}
