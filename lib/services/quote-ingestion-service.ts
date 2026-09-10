import {
  OperatorSourcingProvider,
  QuoteValidationResult,
  DirectOperatorDispatchAdapter,
  AvinodeSourcingAdapter,
  PortsideSourcingAdapter,
} from "../integrations/operators/operator-sourcing-provider";
import { missionRequestService, StoredQuote } from "./mission-request-service";

export interface IngestionResult {
  success: boolean;
  message: string;
  errors?: string[];
  quote?: StoredQuote;
}

export class QuoteIngestionService {
  private providers: Map<string, OperatorSourcingProvider> = new Map();

  constructor() {
    this.registerProvider(new DirectOperatorDispatchAdapter());
    this.registerProvider(new AvinodeSourcingAdapter());
    this.registerProvider(new PortsideSourcingAdapter());
  }

  public registerProvider(provider: OperatorSourcingProvider): void {
    this.providers.set(provider.id, provider);
  }

  public getProvider(id: string): OperatorSourcingProvider | undefined {
    return this.providers.get(id);
  }

  public listProviders(): Array<{ id: string; name: string; status: string; type: string }> {
    return Array.from(this.providers.values()).map((p) => ({
      id: p.id,
      name: p.name,
      status: p.getStatus(),
      type: p.type,
    }));
  }

  /**
   * Ingestion pipeline:
   * External Provider -> Normalization -> Strict Validation -> Provenance Tagging -> Attached to Mission in RECEIVED / UNDER_REVIEW state.
   * Note: The quote NEVER enters PRESENTED status until an authorized AIR Review is completed.
   */
  public ingestExternalQuote(
    missionRef: string,
    providerId: string,
    rawPayload: unknown
  ): IngestionResult {
    const provider = this.providers.get(providerId);
    if (!provider) {
      return {
        success: false,
        message: `Provider '${providerId}' is not registered with AIR Sourcing Gateway.`,
      };
    }

    const validation: QuoteValidationResult = provider.normalizeRawQuote(rawPayload);

    if (!validation.isValid || !validation.normalizedQuote) {
      return {
        success: false,
        message: "Quote payload failed AIR aviation safety and pricing validation.",
        errors: validation.errors,
      };
    }

    const norm = validation.normalizedQuote;

    const storedQuote: Omit<StoredQuote, "id" | "receivedAt"> = {
      operatorBrand: norm.operator.brand,
      operatorLegalName: norm.operator.legalName,
      aocNumber: norm.operator.aocNumber,
      aircraftModel: norm.aircraft.model,
      aircraftCategory: norm.aircraft.category,
      tailNumber: norm.aircraft.tailNumber,
      route: `${norm.route.originIcao} → ${norm.route.destinationIcao}`,
      estimatedFlightTime: norm.route.estimatedFlightDuration,
      passengers: norm.aircraft.seatingCapacity,
      totalPrice: norm.pricing.totalAmount,
      currency: norm.pricing.currency,
      priceRangeFormatted: norm.pricing.priceFormatted,
      pricingStatus: norm.pricing.classification,
      validityUntil: norm.validityUntil,
      inclusions: norm.inclusions,
      exclusions: norm.exclusions,
      baggageAllowance: norm.aircraft.baggageAllowance || "65 cu ft hold",
      cancellationPolicy: norm.cancellationPolicy,
      source: norm.provenance.source,
      status: "RECEIVED", // Always initialized as RECEIVED, never immediately PRESENTED
      verificationStatus: norm.provenance.verificationStatus,
    };

    const attached = missionRequestService.attachQuote(missionRef, storedQuote);
    if (!attached) {
      return {
        success: false,
        message: `Mission reference '${missionRef}' not found or in invalid state.`,
      };
    }

    const newlyAdded = attached.quotes[attached.quotes.length - 1];

    return {
      success: true,
      message: `Quote from ${norm.operator.brand} (${norm.aircraft.model}) successfully ingested into mission ${missionRef} audit stream.`,
      quote: newlyAdded,
    };
  }
}

export const quoteIngestionService = new QuoteIngestionService();
