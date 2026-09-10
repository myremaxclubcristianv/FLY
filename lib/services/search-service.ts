import { SearchResultItem } from "../../types/domain";
import { DEMO_OPERATORS } from "../../data/demo/operators";
import { DEMO_AIRCRAFT } from "../../data/demo/aircraft";
import { DEMO_LOCATIONS } from "../../data/demo/locations";
import { DEMO_EXPERIENCES } from "../../data/demo/experiences";
import { JOURNAL_PREVIEWS } from "../../data/demo/experiences-preview";
import { LUXURY_DESTINATIONS } from "../../data/real/destinations";
import { REAL_AIRCRAFT_MODELS } from "../../data/real/aircraft";
import { REAL_COMPANIES } from "../../data/real/companies";

export interface UnifiedSearchEngine {
  search(query: string): Promise<SearchResultItem[]>;
}

export class DemoSearchService implements UnifiedSearchEngine {
  async search(query: string): Promise<SearchResultItem[]> {
    if (!query || query.trim().length < 2) return [];

    const q = query.toLowerCase().trim();
    const results: SearchResultItem[] = [];

    // Search Operators
    DEMO_OPERATORS.forEach((op) => {
      if (
        op.displayName.toLowerCase().includes(q) ||
        op.legalName.toLowerCase().includes(q) ||
        op.baseAirportName?.toLowerCase().includes(q)
      ) {
        results.push({
          id: op.id,
          type: "OPERATOR",
          title: op.displayName,
          subtitle: `Base: ${op.baseAirportName || op.country} // ${op.operatorType}`,
          href: `/aviation/operators/${op.slug}`,
          dataStatus: op.dataStatus,
          categoryTag: op.operatorType,
        });
      }
    });

    // Search Aircraft
    DEMO_AIRCRAFT.forEach((ac) => {
      if (
        ac.model.toLowerCase().includes(q) ||
        ac.category.toLowerCase().includes(q) ||
        ac.manufacturer.toLowerCase().includes(q)
      ) {
        results.push({
          id: ac.id,
          type: "AIRCRAFT",
          title: ac.model,
          subtitle: `${ac.category} // Up to ${ac.passengerCapacity} Passengers`,
          href: `/aircraft/${ac.slug}`,
          dataStatus: ac.dataStatus,
          categoryTag: ac.category,
        });
      }
    });

    // Search Locations
    DEMO_LOCATIONS.forEach((loc) => {
      if (
        loc.name.toLowerCase().includes(q) ||
        loc.city.toLowerCase().includes(q) ||
        loc.iata?.toLowerCase().includes(q) ||
        loc.icao?.toLowerCase().includes(q)
      ) {
        results.push({
          id: loc.id,
          type: "LOCATION",
          title: loc.name,
          subtitle: `${loc.city}, ${loc.country} ${loc.icao ? `(${loc.icao})` : ""}`,
          href: loc.slug === "bucharest-baneasa-airport" ? "/baneasa" : `/destinations/${loc.city.toLowerCase()}`,
          dataStatus: loc.dataStatus,
          categoryTag: loc.type,
        });
      }
    });

    // Search Experiences
    DEMO_EXPERIENCES.forEach((exp) => {
      if (
        exp.title.toLowerCase().includes(q) ||
        exp.locationName.toLowerCase().includes(q) ||
        exp.description.toLowerCase().includes(q)
      ) {
        results.push({
          id: exp.id,
          type: "EXPERIENCE",
          title: exp.title,
          subtitle: `${exp.locationName} // ${exp.duration || "Experience"}`,
          href: `/experiences/${exp.slug}`,
          dataStatus: exp.dataStatus,
          categoryTag: exp.category,
        });
      }
    });

    // Search Luxury Destinations
    LUXURY_DESTINATIONS.forEach((dest) => {
      if (
        dest.name.toLowerCase().includes(q) ||
        dest.country.toLowerCase().includes(q) ||
        dest.region.toLowerCase().includes(q) ||
        dest.airportCode.toLowerCase().includes(q) ||
        dest.tagline.toLowerCase().includes(q) ||
        dest.description.toLowerCase().includes(q)
      ) {
        if (!results.some((r) => r.id === dest.id || r.title.toLowerCase() === dest.name.toLowerCase())) {
          results.push({
            id: dest.id,
            type: "DESTINATION",
            title: dest.name,
            subtitle: `${dest.airportCode} // ${dest.region} • ${dest.country}`,
            href: `/destinations/${dest.slug}`,
            dataStatus: dest.provenance,
            categoryTag: dest.category,
          });
        }
      }
    });

    // Search Real Aircraft Models
    REAL_AIRCRAFT_MODELS.forEach((ac) => {
      if (
        ac.model.toLowerCase().includes(q) ||
        ac.category.toLowerCase().includes(q) ||
        ac.manufacturer.toLowerCase().includes(q)
      ) {
        if (!results.some((r) => r.id === ac.id || r.title.toLowerCase() === ac.model.toLowerCase())) {
          results.push({
            id: ac.id,
            type: "AIRCRAFT",
            title: ac.model,
            subtitle: `${ac.category.replace(/_/g, " ")} // Up to ${ac.passengerCapacity} Passengers`,
            href: `/aircraft/${ac.slug}`,
            dataStatus: ac.dataStatus,
            categoryTag: ac.category,
          });
        }
      }
    });

    // Search Real Companies & Operators
    REAL_COMPANIES.forEach((op) => {
      if (
        op.displayName.toLowerCase().includes(q) ||
        op.legalName.toLowerCase().includes(q) ||
        op.baseAirportName?.toLowerCase().includes(q) ||
        (op.aocNumber && op.aocNumber.toLowerCase().includes(q))
      ) {
        if (!results.some((r) => r.id === op.id || r.title.toLowerCase() === op.displayName.toLowerCase())) {
          results.push({
            id: op.id,
            type: "OPERATOR",
            title: op.displayName,
            subtitle: `Base: ${op.baseAirportName || op.country} // ${op.category.replace(/_/g, " ")}`,
            href: op.slug === "tiriac-air" || op.baseAirportIcao === "LRBS" ? "/baneasa" : `/aviation`,
            dataStatus: op.dataStatus,
            categoryTag: op.category,
          });
        }
      }
    });

    // Search Journal Articles
    JOURNAL_PREVIEWS.forEach((art) => {
      if (art.title.toLowerCase().includes(q) || art.excerpt.toLowerCase().includes(q)) {
        results.push({
          id: art.id,
          type: "JOURNAL",
          title: art.title,
          subtitle: `${art.category} // ${art.date}`,
          href: "/journal",
          dataStatus: "VERIFIED",
          categoryTag: "EDITORIAL",
        });
      }
    });

    return results;
  }
}

export const searchService = new DemoSearchService();
