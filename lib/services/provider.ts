import { OperatorRepository, DemoOperatorService } from "./operator-service";
import { AircraftRepository, DemoAircraftService } from "./aircraft-service";
import { LocationRepository, DemoLocationService } from "./location-service";
import { MissionRepository, DemoMissionService } from "./mission-service";
import { QuoteRepository, DemoQuoteService } from "./quote-service";

import { SupabaseOperatorRepository } from "../repositories/supabase-operator-repo";
import { SupabaseAircraftRepository } from "../repositories/supabase-aircraft-repo";
import { SupabaseLocationRepository } from "../repositories/supabase-location-repo";
import { SupabaseMissionRepository } from "../repositories/supabase-mission-repo";
import { SupabaseQuoteRepository } from "../repositories/supabase-quote-repo";

export function isSupabaseConfigured(): boolean {
  return (
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  );
}

export function getOperatorRepository(): OperatorRepository {
  return isSupabaseConfigured()
    ? new SupabaseOperatorRepository()
    : new DemoOperatorService();
}

export function getAircraftRepository(): AircraftRepository {
  return isSupabaseConfigured()
    ? new SupabaseAircraftRepository()
    : new DemoAircraftService();
}

export function getLocationRepository(): LocationRepository {
  return isSupabaseConfigured()
    ? new SupabaseLocationRepository()
    : new DemoLocationService();
}

export function getMissionRepository(): MissionRepository {
  return isSupabaseConfigured()
    ? new SupabaseMissionRepository()
    : new DemoMissionService();
}

export function getQuoteRepository(): QuoteRepository {
  return isSupabaseConfigured()
    ? new SupabaseQuoteRepository()
    : new DemoQuoteService();
}
