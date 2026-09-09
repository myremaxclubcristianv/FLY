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

export function formatFlightDuration(distanceNm: number, cruiseSpeedKts: number): string {
  if (distanceNm <= 0 || cruiseSpeedKts <= 0) return "N/A";
  // Add 15 minutes for taxi, climb, vectors, and descent
  const totalHours = distanceNm / cruiseSpeedKts + 0.25;
  const hours = Math.floor(totalHours);
  const minutes = Math.round((totalHours - hours) * 60);

  if (hours === 0) {
    return `${minutes}m`;
  }
  return `${hours}h ${minutes < 10 ? "0" : ""}${minutes}m`;
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
