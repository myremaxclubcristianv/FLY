import { Operator } from "../../types/domain";
import { DEMO_OPERATORS } from "../../data/demo/operators";

export interface OperatorRepository {
  getAll(): Promise<Operator[]>;
  getBySlug(slug: string): Promise<Operator | null>;
  getById(id: string): Promise<Operator | null>;
}

export class DemoOperatorService implements OperatorRepository {
  async getAll(): Promise<Operator[]> {
    return DEMO_OPERATORS;
  }

  async getBySlug(slug: string): Promise<Operator | null> {
    return DEMO_OPERATORS.find((op) => op.slug === slug) || null;
  }

  async getById(id: string): Promise<Operator | null> {
    return DEMO_OPERATORS.find((op) => op.id === id) || null;
  }
}

export const operatorService = new DemoOperatorService();
