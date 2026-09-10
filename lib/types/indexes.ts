import { AircraftCategory, CompanyCategory } from "../../types/domain";
import { DataStatus, VerificationStatus } from "../../types/verification";

/**
 * AIR PRICE INDEX (APIX)
 * Structured schema for charter market rate intelligence, hourly direct operating benchmarks,
 * and seasonal variance metrics with explicit provenance.
 */
export interface AirPriceIndexEntry {
  id: string;
  routeSlug: string;
  originIcao: string;
  destinationIcao: string;
  aircraftCategory: AircraftCategory;
  representativeModel: string;
  flightTimeMinutes: number;
  indicativeCharterRangeEur: {
    low: number;
    high: number;
    median: number;
  };
  indicativeHourlyRateEur: number;
  fuelBurnEstimateLitersPerHour: number;
  seasonalVarianceFactor: number; // e.g. 1.15 in Mediterranean peak summer
  currency: "EUR" | "USD";
  dataStatus: DataStatus;
  verificationStatus: VerificationStatus;
  lastUpdated: string;
  dataSource: string;
}

/**
 * AIR TIME INDEX (ATIX)
 * Door-to-destination time telemetry comparing commercial airline multi-segment travel
 * vs. private jet direct routing vs. helicopter point-to-point transit.
 */
export interface AirTimeIndexEntry {
  id: string;
  originCity: string;
  destinationCity: string;
  distanceNauticalMiles: number;
  commercialAirlineDoorToDoorMinutes: {
    airportArrivalAndSecurityMinutes: number;
    flightDurationMinutes: number;
    connectionLayoverMinutes: number;
    baggageClaimAndExitMinutes: number;
    totalMinutes: number;
  };
  airPrivateJetDoorToDoorMinutes: {
    fboArrivalAndBoardingMinutes: number;
    flightDurationMinutes: number;
    directRampExitMinutes: number;
    totalMinutes: number;
  };
  airHelicopterDirectMinutes?: {
    padBoardingMinutes: number;
    flightDurationMinutes: number;
    directArrivalMinutes: number;
    totalMinutes: number;
  };
  netMinutesSavedPrivateVsCommercial: number;
  timeSavingsMultiplier: number; // e.g. 3.4x faster
  dataStatus: DataStatus;
  lastVerified: string;
}

/**
 * AIRCRAFT INDEX (ACIX)
 * Comprehensive airframe engineering, cabin geometry, runway envelopes, and operating economics.
 */
export interface AircraftIndexEntry {
  icaoDesignator: string;
  manufacturer: string;
  model: string;
  category: AircraftCategory;
  cabinDimensions: {
    heightMeters: number;
    widthMeters: number;
    lengthMeters: number;
    volumeCubicMeters: number;
    baggageHoldCubicFeet: number;
  };
  performanceEnvelope: {
    maximumRangeNm: number;
    highSpeedCruiseKnots: number;
    longRangeCruiseMach: number;
    serviceCeilingFeet: number;
    seaLevelTakeoffDistanceMeters: number;
    landingFieldLengthMeters: number;
    steepApproachCertified: boolean;
  };
  operatingEconomicsIndicative: {
    fuelBurnGallonsPerHour: number;
    directOperatingCostPerSeatNmEur: number;
    maintenanceLaborHoursPerFlightHour: number;
  };
  verificationStatus: VerificationStatus;
  dataStatus: DataStatus;
  sourceAuthority: string;
}

/**
 * ROMANIA AVIATION INDEX (RAIX)
 * Authoritative registry of Romanian civil aviation infrastructure, certified AOC operators,
 * domestic fleet tail numbers, certified aerodromes, and helipads.
 */
export interface RomaniaAviationIndex {
  id: string;
  summary: {
    totalCertifiedAocOperators: number;
    totalActiveHelipads: number;
    totalCertifiedCivilAirports: number;
    totalRegisteredPrivateAirframes: number;
    hubAirportIcao: "LRBS";
    hubAirportName: "Bucharest Băneasa Aurel Vlaicu International";
  };
  aocOperators: Array<{
    legalName: string;
    brandName: string;
    aocNumber: string;
    category: CompanyCategory;
    baseAirportIcao: string;
    fleetCount: number;
    fleetModels: string[];
    verificationStatus: VerificationStatus;
  }>;
  aerodromes: Array<{
    name: string;
    icao: string;
    iata?: string;
    longestRunwayMeters: number;
    surface: string;
    fboAvailable: boolean;
    customsPortOfEntry: boolean;
  }>;
  helipads: Array<{
    name: string;
    locationCityOrRegion: string;
    padType: "ROOFTOP" | "SURFACE_ESTATE" | "OFFSHORE" | "HOSPITAL";
    twinEngineCertified: boolean;
    nightVfrCertified: boolean;
    landingAccessStatus: "CERTIFIED" | "PRIVATE_PRIOR_APPROVAL" | "REQUEST";
  }>;
  dataStatus: DataStatus;
  sourceAuthority: "AACR (Romanian Civil Aeronautical Authority) // Official AIP";
  lastAuditDate: string;
}
