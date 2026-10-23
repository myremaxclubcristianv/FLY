import { AircraftForSale } from "@/types/domain";

/**
 * Aircraft Marketplace Dataset
 * 
 * IMPORTANT: Active inventory is restricted strictly to verified aircraft mandates
 * with documented serial numbers, verified logbook hours, and authenticated sellers.
 * 
 * The profiles below are designated as 'illustrative_example' and illustrate typical
 * aircraft performance and external marketplace categories. They are excluded from
 * active inventory counts and live transaction flows.
 */
export const REAL_AIRCRAFT_FOR_SALE: AircraftForSale[] = [
  {
    id: "sale-1",
    slug: "2019-embraer-phenom-300e",
    title: "2019 Embraer Phenom 300E (Illustrative Profile)",
    manufacturer: "Embraer",
    model: "Phenom 300E",
    year: 2019,
    category: "LIGHT_JET",
    passengerCapacity: 7, // 7 typical executive layout (6-seat club + 1 forward side-seat; up to 8 with belted lavatory)
    rangeNm: 2010,
    totalHours: 1420,
    priceFormatted: "Indicative Valuation (~€8.95M EUR)",
    location: "Geneva (LSGG), Switzerland",
    sellerName: "External Marketplace Index (AvBuyer Reference)",
    externalSource: "AVBUYER",
    externalUrl: "https://www.avbuyer.com/aircraft/for-sale/embraer/phenom-300e",
    listingStatus: "illustrative_example",
    verificationStatus: "INDICATIVE",
    dataStatus: "INDICATIVE",
    lastCheckedAt: "2026-10-24",
    image: "https://images.unsplash.com/photo-1587019158091-1a103c5dd17f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "sale-2",
    slug: "2021-pilatus-pc-12-ngx",
    title: "2021 Pilatus PC-12 NGX (Illustrative Profile)",
    manufacturer: "Pilatus",
    model: "PC-12 NGX",
    year: 2021,
    category: "TURBOPROP",
    passengerCapacity: 8,
    rangeNm: 1803,
    totalHours: 850,
    priceFormatted: "Indicative Valuation (~€6.20M EUR)",
    location: "Zurich (LSZH), Switzerland",
    sellerName: "External Marketplace Index (GlobalAir Reference)",
    externalSource: "GLOBALAIR",
    externalUrl: "https://www.globalair.com/aircraft-for-sale/pilatus-pc-12-ngx",
    listingStatus: "illustrative_example",
    verificationStatus: "INDICATIVE",
    dataStatus: "INDICATIVE",
    lastCheckedAt: "2026-10-24",
    image: "https://images.unsplash.com/photo-1474302770737-173ee21bab63?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "sale-3",
    slug: "2018-bombardier-challenger-350",
    title: "2018 Bombardier Challenger 350 (Illustrative Profile)",
    manufacturer: "Bombardier",
    model: "Challenger 350",
    year: 2018,
    category: "SUPER_MIDSIZE_JET",
    passengerCapacity: 10,
    rangeNm: 3200,
    totalHours: 2150,
    priceFormatted: "Price on Request (Market Valuation)",
    location: "London Farnborough (EGLF), UK",
    sellerName: "External Marketplace Index (Controller Reference)",
    externalSource: "CONTROLLER",
    externalUrl: "https://www.controller.com/listings/for-sale/bombardier/challenger-350",
    listingStatus: "illustrative_example",
    verificationStatus: "INDICATIVE",
    dataStatus: "INDICATIVE",
    lastCheckedAt: "2026-10-24",
    image: "https://images.unsplash.com/photo-1520437358207-323b43b50729?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "sale-4",
    slug: "2022-airbus-h145-t2",
    title: "2022 Airbus H145 T2 Executive (Illustrative Profile)",
    manufacturer: "Airbus Helicopters",
    model: "H145 T2",
    year: 2022,
    category: "HELICOPTER",
    passengerCapacity: 8,
    rangeNm: 350,
    totalHours: 390,
    priceFormatted: "Indicative Valuation (~€9.40M EUR)",
    location: "Nice Côte d'Azur (LFMN), France",
    sellerName: "External Marketplace Index (AvBuyer Reference)",
    externalSource: "AVBUYER",
    externalUrl: "https://www.avbuyer.com/aircraft/for-sale/airbus-helicopters/h145",
    listingStatus: "illustrative_example",
    verificationStatus: "INDICATIVE",
    dataStatus: "INDICATIVE",
    lastCheckedAt: "2026-10-24",
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "sale-5",
    slug: "2020-gulfstream-g650er",
    title: "2020 Gulfstream G650ER (Illustrative Profile)",
    manufacturer: "Gulfstream",
    model: "G650ER",
    year: 2020,
    category: "LARGE_CABIN_JET",
    passengerCapacity: 14,
    rangeNm: 7500,
    totalHours: 1100,
    priceFormatted: "Indicative Valuation (~€58.00M EUR)",
    location: "Vienna (LOWW), Austria",
    sellerName: "External Marketplace Index (GlobalAir Reference)",
    externalSource: "GLOBALAIR",
    externalUrl: "https://www.globalair.com/aircraft-for-sale/gulfstream-g650er",
    listingStatus: "illustrative_example",
    verificationStatus: "INDICATIVE",
    dataStatus: "INDICATIVE",
    lastCheckedAt: "2026-10-24",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80",
  },
];

export const ILLUSTRATIVE_AIRCRAFT_EXAMPLES: AircraftForSale[] = REAL_AIRCRAFT_FOR_SALE.filter(
  (a) => a.listingStatus === "illustrative_example"
);

export function getActiveAircraftForSale(): AircraftForSale[] {
  return REAL_AIRCRAFT_FOR_SALE.filter((a) => a.listingStatus === "verified_listing");
}

export function getIllustrativeAircraftExamples(): AircraftForSale[] {
  return ILLUSTRATIVE_AIRCRAFT_EXAMPLES;
}
