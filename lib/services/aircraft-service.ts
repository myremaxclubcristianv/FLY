import { Aircraft, AircraftCategory } from "../../types/domain";
import { UnifiedAviationRepository } from "../repositories/unified-aviation-repo";

export interface AircraftRepository {
  getAll(): Promise<Aircraft[]>;
  getBySlug(slug: string): Promise<Aircraft | null>;
  getByCategory(category: AircraftCategory): Promise<Aircraft[]>;
}

export class UnifiedAircraftService implements AircraftRepository {
  async getAll(): Promise<Aircraft[]> {
    return UnifiedAviationRepository.getAircraftModels();
  }

  async getBySlug(slug: string): Promise<Aircraft | null> {
    return UnifiedAviationRepository.getAircraftModelBySlug(slug);
  }

  async getByCategory(category: AircraftCategory): Promise<Aircraft[]> {
    const all = await UnifiedAviationRepository.getAircraftModels();
    return all.filter((ac) => ac.category === category);
  }
}

export const DemoAircraftService = UnifiedAircraftService;
export const aircraftService = new UnifiedAircraftService();
