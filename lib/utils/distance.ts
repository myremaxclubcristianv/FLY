/**
 * Great-Circle Distance (Haversine Formula) & AIR Flight Duration Calculator
 * Nautical Miles (NM) & knots (KTS) speed based calculations.
 */

export function calculateGreatCircleDistanceNm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 3440.065; // Earth radius in Nautical Miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

/**
 * Standard flight duration formatter adding a 15-minute standard allowance
 * for climb to cruise altitude and descent vectors.
 */
export function formatFlightDuration(distanceNm: number, cruiseSpeedKts: number): string {
  if (distanceNm <= 0 || cruiseSpeedKts <= 0) return "N/A";
  // Add 15 minutes (0.25h) for climb profile and standard arrival vectors
  const totalHours = distanceNm / cruiseSpeedKts + 0.25;
  const hours = Math.floor(totalHours);
  const minutes = Math.round((totalHours - hours) * 60);

  if (hours === 0) {
    return `${minutes}m`;
  }
  return `${hours}h ${minutes < 10 ? "0" : ""}${minutes}m`;
}

export interface ExplainableFlightDuration {
  durationFormatted: string;
  metricLabel: string;
  metricLabelRo: string;
  assumptions: string;
  assumptionsRo: string;
  disclaimer: string;
  disclaimerRo: string;
}

/**
 * Explainable flight time with explicit assumptions and transparent disclaimers.
 */
export function getExplainableFlightTime(
  distanceNm: number,
  cruiseSpeedKts: number
): ExplainableFlightDuration {
  const durationFormatted = formatFlightDuration(distanceNm, cruiseSpeedKts);

  return {
    durationFormatted,
    metricLabel: "Estimated Airborne Time (Simplified Great-Circle Calculation)",
    metricLabelRo: "Timp Estimat de Zbor (Calcul Simplificat Ortodromic)",
    assumptions: `Calculated as Great-Circle distance (${distanceNm} NM) ÷ typical cruise speed (${cruiseSpeedKts} KTAS) + 15 min climb/descent vector allowance. Excludes ground taxi, en-route wind components, and airway routing.`,
    assumptionsRo: `Calculat pe baza distanței ortodromice (${distanceNm} NM) ÷ viteza medie de croazieră (${cruiseSpeedKts} KTAS) + 15 min rezervă urcare/coborâre. Exclude rulajul la sol, vânturile de altitudine și devierile de rută ATC.`,
    disclaimer:
      "Indicative estimate only. Not an operational flight plan (OFP) or confirmed carrier schedule. Actual block times depend on aircraft assignment, winds aloft, and airport slot clearance.",
    disclaimerRo:
      "Estimare orientativă. Nu constituie un plan operațional de zbor (OFP) sau o durată garantată de zbor. Timpul efectiv depinde de aeronava alocată, vânturile de altitudine și sloturile de trafic.",
  };
}

export interface CalculatedDurations {
  vljet: string;
  lightJet: string;
  midsizeJet: string;
  superMidsize: string;
  heavyJet: string;
  turboprop: string;
  helicopter: string;
}

export function calculateDurationsForDistance(distanceNm: number): CalculatedDurations {
  return {
    vljet: formatFlightDuration(distanceNm, 380),
    lightJet: formatFlightDuration(distanceNm, 420),
    midsizeJet: formatFlightDuration(distanceNm, 450),
    superMidsize: formatFlightDuration(distanceNm, 470),
    heavyJet: formatFlightDuration(distanceNm, 490),
    turboprop: formatFlightDuration(distanceNm, 280),
    helicopter: formatFlightDuration(distanceNm, 140),
  };
}
