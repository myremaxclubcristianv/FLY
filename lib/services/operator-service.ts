import { Operator } from "../../types/domain";
import { UnifiedAviationRepository } from "../repositories/unified-aviation-repo";

export interface OperatorRepository {
  getAll(): Promise<Operator[]>;
  getBySlug(slug: string): Promise<Operator | null>;
  getById(id: string): Promise<Operator | null>;
}

export class UnifiedOperatorService implements OperatorRepository {
  async getAll(): Promise<Operator[]> {
    return UnifiedAviationRepository.getCompanies();
  }

  async getBySlug(slug: string): Promise<Operator | null> {
    return UnifiedAviationRepository.getCompanyBySlug(slug);
  }

  async getById(id: string): Promise<Operator | null> {
    const all = await UnifiedAviationRepository.getCompanies();
    return all.find((op) => op.id === id) || null;
  }
}

export const DemoOperatorService = UnifiedOperatorService;
export const operatorService = new UnifiedOperatorService();
