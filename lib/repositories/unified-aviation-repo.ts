import {
  AviationLocation,
  Company,
  Aircraft,
  RouteIntelligence,
  JournalArticle,
  AerialRegion,
  SearchResultItem,
  AircraftForSale,
  FlightSchool,
  AviationExplainer,
  AviationTechArticle,
  PhotoEssay,
} from "../../types/domain";

import { REAL_AIRPORTS } from "../../data/real/airports";
import { REAL_COMPANIES } from "../../data/real/companies";
import { REAL_AIRCRAFT_MODELS } from "../../data/real/aircraft";
import { REAL_ROUTES } from "../../data/real/routes";
import { REAL_JOURNAL_ARTICLES } from "../../data/real/journal";
import { REAL_AERIAL_REGIONS } from "../../data/real/regions";
import { REAL_AIRCRAFT_FOR_SALE } from "../../data/real/aircraft-sale";
import { REAL_FLIGHT_SCHOOLS } from "../../data/real/schools";
import { REAL_AVIATION_EXPLAINERS } from "../../data/real/explainers";
import { REAL_AVIATION_TECH_ARTICLES } from "../../data/real/tech-articles";
import { REAL_PHOTO_ESSAYS } from "../../data/real/photo-essays";
import { LUXURY_DESTINATIONS } from "../../data/real/destinations";

export class UnifiedAviationRepository {
  // Airports
  static async getAirports(): Promise<AviationLocation[]> {
    return REAL_AIRPORTS;
  }

  static async getAirportBySlug(slug: string): Promise<AviationLocation | null> {
    const airport = REAL_AIRPORTS.find(
      (a) =>
        a.slug === slug ||
        a.icao?.toLowerCase() === slug.toLowerCase() ||
        a.iata?.toLowerCase() === slug.toLowerCase()
    );
    return airport || null;
  }

  static async getBaneasaAirport(): Promise<AviationLocation> {
    const baneasa = REAL_AIRPORTS.find((a) => a.icao === "LRBS");
    if (!baneasa) {
      throw new Error("CRITICAL DATA ERROR: Băneasa (LRBS) airport record missing");
    }
    return baneasa;
  }

  // Companies
  static async getCompanies(): Promise<Company[]> {
    return REAL_COMPANIES;
  }

  static async getCompanyBySlug(slug: string): Promise<Company | null> {
    const comp = REAL_COMPANIES.find((c) => c.slug === slug);
    return comp || null;
  }

  // Aircraft Models
  static async getAircraftModels(): Promise<Aircraft[]> {
    return REAL_AIRCRAFT_MODELS;
  }

  static async getAircraftModelBySlug(slug: string): Promise<Aircraft | null> {
    const ac = REAL_AIRCRAFT_MODELS.find((a) => a.slug === slug);
    return ac || null;
  }

  // Routes
  static async getRoutes(): Promise<RouteIntelligence[]> {
    return REAL_ROUTES;
  }

  static async getRouteBySlug(slug: string): Promise<RouteIntelligence | null> {
    const r = REAL_ROUTES.find((rt) => rt.slug === slug);
    return r || null;
  }

  // Journal
  static async getJournalArticles(): Promise<JournalArticle[]> {
    return REAL_JOURNAL_ARTICLES;
  }

  static async getJournalArticleBySlug(slug: string): Promise<JournalArticle | null> {
    const art = REAL_JOURNAL_ARTICLES.find((a) => a.slug === slug);
    return art || null;
  }

  // Aerial Regions
  static async getAerialRegions(): Promise<AerialRegion[]> {
    return REAL_AERIAL_REGIONS;
  }

  static async getAerialRegionBySlug(slug: string): Promise<AerialRegion | null> {
    const reg = REAL_AERIAL_REGIONS.find((r) => r.slug === slug);
    return reg || null;
  }

  // Phase 11 Extensions: Aircraft For Sale
  static async getAircraftForSale(): Promise<AircraftForSale[]> {
    return REAL_AIRCRAFT_FOR_SALE;
  }

  static async getAircraftForSaleBySlug(slug: string): Promise<AircraftForSale | null> {
    return REAL_AIRCRAFT_FOR_SALE.find((a) => a.slug === slug) || null;
  }

  // Phase 11 Extensions: Flight Schools
  static async getFlightSchools(): Promise<FlightSchool[]> {
    return REAL_FLIGHT_SCHOOLS;
  }

  static async getFlightSchoolBySlug(slug: string): Promise<FlightSchool | null> {
    return REAL_FLIGHT_SCHOOLS.find((s) => s.slug === slug) || null;
  }

  // Phase 11 Extensions: Explainers
  static async getExplainers(): Promise<AviationExplainer[]> {
    return REAL_AVIATION_EXPLAINERS;
  }

  static async getExplainerBySlug(slug: string): Promise<AviationExplainer | null> {
    return REAL_AVIATION_EXPLAINERS.find((e) => e.slug === slug) || null;
  }

  // Phase 11 Extensions: Tech Articles
  static async getTechArticles(): Promise<AviationTechArticle[]> {
    return REAL_AVIATION_TECH_ARTICLES;
  }

  static async getTechArticleBySlug(slug: string): Promise<AviationTechArticle | null> {
    return REAL_AVIATION_TECH_ARTICLES.find((t) => t.slug === slug) || null;
  }

  // Phase 11 Extensions: Photo Essays
  static async getPhotoEssays(): Promise<PhotoEssay[]> {
    return REAL_PHOTO_ESSAYS;
  }

  static async getPhotoEssayBySlug(slug: string): Promise<PhotoEssay | null> {
    return REAL_PHOTO_ESSAYS.find((p) => p.slug === slug) || null;
  }

  // Global Search Items across all categories
  static async searchAll(query: string): Promise<SearchResultItem[]> {
    const q = query.toLowerCase().trim();
    if (!q) return [];

    const results: SearchResultItem[] = [];

    // Destinations
    LUXURY_DESTINATIONS.forEach((dest) => {
      if (
        dest.name.toLowerCase().includes(q) ||
        dest.country.toLowerCase().includes(q) ||
        dest.airportCode.toLowerCase().includes(q) ||
        dest.region.toLowerCase().includes(q)
      ) {
        results.push({
          id: `dest-${dest.id}`,
          type: "DESTINATION",
          title: dest.name,
          subtitle: `${dest.region}, ${dest.country} • ${dest.airportCode}`,
          href: `/destinations/${dest.slug}`,
          dataStatus: "VERIFIED",
          categoryTag: "DESTINATION",
        });
      }
    });

    // Aircraft
    REAL_AIRCRAFT_MODELS.forEach((ac) => {
      if (
        ac.model.toLowerCase().includes(q) ||
        ac.manufacturer.toLowerCase().includes(q) ||
        ac.category.toLowerCase().includes(q)
      ) {
        results.push({
          id: `ac-${ac.id}`,
          type: "AIRCRAFT",
          title: `${ac.manufacturer} ${ac.model}`,
          subtitle: `${ac.category.replace(/_/g, " ")} • ${ac.passengerCapacity} seats • ${ac.approximateRange} NM`,
          href: `/aircraft/${ac.slug}`,
          dataStatus: ac.dataStatus,
          categoryTag: "AIRCRAFT",
        });
      }
    });

    // Aircraft For Sale
    REAL_AIRCRAFT_FOR_SALE.forEach((sale) => {
      if (
        sale.title.toLowerCase().includes(q) ||
        sale.manufacturer.toLowerCase().includes(q) ||
        sale.model.toLowerCase().includes(q)
      ) {
        results.push({
          id: `sale-${sale.id}`,
          type: "AIRCRAFT_SALE",
          title: sale.title,
          subtitle: `${sale.priceFormatted} • ${sale.location} • Source: ${sale.externalSource}`,
          href: `/aircraft-for-sale`,
          dataStatus: sale.dataStatus,
          categoryTag: "MARKETPLACE",
        });
      }
    });

    // Flight Schools
    REAL_FLIGHT_SCHOOLS.forEach((school) => {
      if (
        school.name.toLowerCase().includes(q) ||
        school.city.toLowerCase().includes(q) ||
        school.coursesOffered.some((c) => c.toLowerCase().includes(q))
      ) {
        results.push({
          id: `school-${school.id}`,
          type: "FLIGHT_SCHOOL",
          title: school.name,
          subtitle: `${school.city}, ${school.country} • ${school.accreditation}`,
          href: `/aviation/schools`,
          dataStatus: school.dataStatus,
          categoryTag: "FLIGHT SCHOOL",
        });
      }
    });

    // Explainers
    REAL_AVIATION_EXPLAINERS.forEach((exp) => {
      if (
        exp.title.toLowerCase().includes(q) ||
        exp.shortDefinition.toLowerCase().includes(q)
      ) {
        results.push({
          id: `exp-${exp.id}`,
          type: "EXPLAINER",
          title: exp.title,
          subtitle: `${exp.category} • ${exp.shortDefinition.substring(0, 80)}...`,
          href: `/aviation/explainers`,
          dataStatus: "VERIFIED",
          categoryTag: "EXPLAINER",
        });
      }
    });

    // Tech Articles
    REAL_AVIATION_TECH_ARTICLES.forEach((tech) => {
      if (
        tech.title.toLowerCase().includes(q) ||
        tech.subtitle.toLowerCase().includes(q)
      ) {
        results.push({
          id: `tech-${tech.id}`,
          type: "TECH",
          title: tech.title,
          subtitle: `${tech.category.replace(/_/g, " ")} • ${tech.readTimeMinutes} min read`,
          href: `/aviation/technology`,
          dataStatus: "VERIFIED",
          categoryTag: "TECHNOLOGY",
        });
      }
    });

    // Companies
    REAL_COMPANIES.forEach((c) => {
      if (
        c.displayName.toLowerCase().includes(q) ||
        c.legalName.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
      ) {
        results.push({
          id: `comp-${c.id}`,
          type: "COMPANY",
          title: c.displayName,
          subtitle: `${c.category.replace(/_/g, " ")} • ${c.baseAirportName || c.city}`,
          href: `/aviation/companies/${c.slug}`,
          dataStatus: c.dataStatus,
          categoryTag: "COMPANY",
        });
      }
    });

    // Airports
    REAL_AIRPORTS.forEach((loc) => {
      if (
        loc.name.toLowerCase().includes(q) ||
        loc.city.toLowerCase().includes(q) ||
        loc.icao?.toLowerCase().includes(q) ||
        loc.iata?.toLowerCase().includes(q)
      ) {
        results.push({
          id: `loc-${loc.id}`,
          type: "LOCATION",
          title: `${loc.city} (${loc.icao || loc.iata || "HUB"})`,
          subtitle: loc.name,
          href: loc.icao === "LRBS" ? "/baneasa" : `/aviation`,
          dataStatus: loc.dataStatus,
          categoryTag: loc.type,
        });
      }
    });

    // Routes
    REAL_ROUTES.forEach((r) => {
      if (
        r.title.toLowerCase().includes(q) ||
        r.originCity.toLowerCase().includes(q) ||
        r.destinationCity.toLowerCase().includes(q)
      ) {
        results.push({
          id: `rt-${r.id}`,
          type: "ROUTE",
          title: r.title,
          subtitle: `Distance: ${r.distanceNm} NM • ${r.routeType.replace(/_/g, " ")}`,
          href: `/routes/${r.slug}`,
          dataStatus: r.dataStatus,
          categoryTag: "ROUTE",
        });
      }
    });

    // Journal
    REAL_JOURNAL_ARTICLES.forEach((art) => {
      if (
        art.title.toLowerCase().includes(q) ||
        art.category.toLowerCase().includes(q) ||
        art.excerpt.toLowerCase().includes(q)
      ) {
        results.push({
          id: `art-${art.id}`,
          type: "JOURNAL",
          title: art.title,
          subtitle: `${art.category.replace(/_/g, " ")} • ${art.readTimeMinutes} min read`,
          href: `/journal/${art.slug}`,
          dataStatus: art.dataStatus,
          categoryTag: "JOURNAL",
        });
      }
    });

    // Regions
    REAL_AERIAL_REGIONS.forEach((reg) => {
      if (
        reg.name.toLowerCase().includes(q) ||
        reg.subtitle.toLowerCase().includes(q)
      ) {
        results.push({
          id: `reg-${reg.id}`,
          type: "REGION",
          title: reg.name,
          subtitle: reg.subtitle,
          href: `/romania-from-above/${reg.slug}`,
          dataStatus: reg.dataStatus,
          categoryTag: "ROMANIA FROM ABOVE",
        });
      }
    });

    return results;
  }
}
