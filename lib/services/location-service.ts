import { AviationLocation } from "../../types/domain";
import { DEMO_LOCATIONS } from "../../data/demo/locations";

export interface LocationRepository {
  getAll(): Promise<AviationLocation[]>;
  getBySlug(slug: string): Promise<AviationLocation | null>;
  getByCity(city: string): Promise<AviationLocation[]>;
}

export class DemoLocationService implements LocationRepository {
  async getAll(): Promise<AviationLocation[]> {
    return DEMO_LOCATIONS;
  }

  async getBySlug(slug: string): Promise<AviationLocation | null> {
    return DEMO_LOCATIONS.find((loc) => loc.slug === slug) || null;
  }

  async getByCity(city: string): Promise<AviationLocation[]> {
    const search = city.toLowerCase();
    return DEMO_LOCATIONS.filter((loc) => loc.city.toLowerCase().includes(search));
  }
}

export const locationService = new DemoLocationService();
