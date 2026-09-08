import { Aircraft, AircraftCategory } from "../../types/domain";
import { DEMO_AIRCRAFT } from "../../data/demo/aircraft";

export interface AircraftRepository {
  getAll(): Promise<Aircraft[]>;
  getBySlug(slug: string): Promise<Aircraft | null>;
  getByCategory(category: AircraftCategory): Promise<Aircraft[]>;
}

export class DemoAircraftService implements AircraftRepository {
  async getAll(): Promise<Aircraft[]> {
    return DEMO_AIRCRAFT;
  }

  async getBySlug(slug: string): Promise<Aircraft | null> {
    return DEMO_AIRCRAFT.find((ac) => ac.slug === slug) || null;
  }

  async getByCategory(category: AircraftCategory): Promise<Aircraft[]> {
    return DEMO_AIRCRAFT.filter((ac) => ac.category === category);
  }
}

export const aircraftService = new DemoAircraftService();
