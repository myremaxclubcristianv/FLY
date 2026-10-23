export type AirportOperationalStatusType =
  | "OPEN_VERIFIED"
  | "RESTRICTION_REPORTED"
  | "CLOSED_VERIFIED"
  | "STATUS_UNVERIFIED";

export interface AirportOperationalRecord {
  icao: string;
  iata?: string;
  name: string;
  officialName: string;
  operationalStatus: AirportOperationalStatusType;
  statusLabel: string;
  sourceName: string;
  sourceUrl: string;
  publicationCycle: string;
  lastVerifiedAt: string;
  liveFeedConnected: boolean;
  notamNotice: string;
  restrictions: string[];
  runwayPhysical: {
    designation: string;
    dimensionsM: string;
    surface: string;
    pcn?: string;
    clarification: string;
  };
  declaredDistancesDisclaimer: string;
}

/**
 * Authoritative airport baseline operational records.
 * Live NOTAM automated feed is currently not integrated, so operational status
 * is strictly reported as STATUS_UNVERIFIED for real-time dispatch, preventing
 * false implications of live clearance or guaranteed runway availability.
 */
const AIRPORT_OPERATIONAL_RECORDS: Record<string, AirportOperationalRecord> = {
  LRBS: {
    icao: "LRBS",
    iata: "BBU",
    name: "Bucharest Băneasa Aurel Vlaicu International Airport",
    officialName: "Aeroportul Internațional București-Băneasa Aurel Vlaicu",
    operationalStatus: "STATUS_UNVERIFIED",
    statusLabel: "STATUS UNVERIFIED (AOC CONFIRMATION REQUIRED)",
    sourceName: "ROMATSA / CNAB AIP Romania AD 2.LRBS",
    sourceUrl: "https://www.aisro.ro",
    publicationCycle: "AIRAC AIP Romania Cycle 2026",
    lastVerifiedAt: "2026-10-24",
    liveFeedConnected: false,
    notamNotice:
      "Automated live NOTAM feed is not connected. Current operational status, temporary runway maintenance, and threshold displacements must be verified directly with certified AOC dispatch or airport handling prior to mission execution.",
    restrictions: [
      "Prior Permission Required (PPR) for all flights",
      "Strict northern departure noise abatement procedures",
      "Dedicated general and business aviation operations (non-scheduled commercial traffic requires advance slot approval)",
      "Night operations require prior handling coordination",
    ],
    runwayPhysical: {
      designation: "07/25",
      dimensionsM: "3,103 × 45 m",
      surface: "Concrete / Asphalt",
      pcn: "51/F/C/W/T",
      clarification:
        "3,103 × 45 m is the published physical runway pavement dimension in official AIP Romania AD 2.12. Declared operational distances (TORA, TODA, ASDA, LDA) vary based on threshold displacement and active NOTAM restrictions (such as temporary threshold works or rehabilitation phases). Standalone unverified 2,358 m figures must not be relied upon without current NOTAM cross-referencing.",
    },
    declaredDistancesDisclaimer:
      "Operational declared distances (TORA, TODA, ASDA, LDA) depend on the active runway in use (07 vs 25), displaced thresholds, and temporary work closures. Flight crews must refer to active NOTAMs and official operational flight plans (OFP).",
  },
  LROP: {
    icao: "LROP",
    iata: "OTP",
    name: "Bucharest Henri Coandă International Airport",
    officialName: "Aeroportul Internațional Henri Coandă București",
    operationalStatus: "STATUS_UNVERIFIED",
    statusLabel: "STATUS UNVERIFIED (AOC CONFIRMATION REQUIRED)",
    sourceName: "ROMATSA / CNAB AIP Romania AD 2.LROP",
    sourceUrl: "https://www.aisro.ro",
    publicationCycle: "AIRAC AIP Romania Cycle 2026",
    lastVerifiedAt: "2026-10-24",
    liveFeedConnected: false,
    notamNotice:
      "Automated live NOTAM feed is not connected. Operational slot clearance must be obtained via Eurocontrol and Romanian CAA / CNAB handling.",
    restrictions: [
      "IATA Level 3 Slot Coordinated Airport",
      "General Aviation movements coordinated with commercial traffic peaks",
    ],
    runwayPhysical: {
      designation: "08L/26R & 08R/26L",
      dimensionsM: "3,500 × 45 m (Both Runways)",
      surface: "Concrete",
      pcn: "74/R/A/W/T",
      clarification: "Dual parallel runway configuration for intercontinental operations.",
    },
    declaredDistancesDisclaimer:
      "Refer to active AIP Romania AD 2.LROP for declared distance calculations.",
  },
};

export class AirportStatusService {
  public static isLiveFeedConfigured(): boolean {
    return false;
  }

  public static getAirportStatus(icao: string): AirportOperationalRecord {
    const key = icao.toUpperCase();
    if (AIRPORT_OPERATIONAL_RECORDS[key]) {
      return AIRPORT_OPERATIONAL_RECORDS[key];
    }

    return {
      icao: key,
      name: `${key} Airfield`,
      officialName: `${key} Aeronautical Facility`,
      operationalStatus: "STATUS_UNVERIFIED",
      statusLabel: "STATUS UNVERIFIED",
      sourceName: "AIP / Public Aeronautical Information",
      sourceUrl: "https://www.eurocontrol.int",
      publicationCycle: "Standard Aeronautical Cycle",
      lastVerifiedAt: "UNVERIFIED",
      liveFeedConnected: false,
      notamNotice:
        "No live operational feed connected. Real-time runway status and NOTAMs must be obtained from an authorized AOC flight operations desk.",
      restrictions: ["PPR confirmation required"],
      runwayPhysical: {
        designation: "UNVERIFIED",
        dimensionsM: "Subject to AOC verification",
        surface: "Standard",
        clarification: "Physical dimensions must be confirmed against current national AIP.",
      },
      declaredDistancesDisclaimer:
        "Declared distances must be confirmed via current flight planning software and NOTAM publications.",
    };
  }
}
