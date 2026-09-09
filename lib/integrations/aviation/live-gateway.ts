import { productionAviationProvider } from "./production-provider";
import { stripeProvider } from "../payment/stripe-provider";
import { emailProvider } from "../notifications/email-provider";
import { radarProvider } from "../tracking/radar-provider";

export interface IntegrationGatewayStatus {
  gdsAvailability: string;
  charterPricing: string;
  stripePayment: string;
  resendEmail: string;
  flightAwareRadar: string;
  totalLiveConnected: number;
}

export class LiveAviationIntegrationGateway {
  async getSystemConnectionStatus(): Promise<IntegrationGatewayStatus> {
    const availStatus = await productionAviationProvider.checkConnection("aviation_availability");
    const pricingStatus = await productionAviationProvider.checkConnection("charter_pricing");
    const stripeConfigured = Boolean(process.env.STRIPE_SECRET_KEY);
    const resendConfigured = Boolean(process.env.RESEND_API_KEY);
    const radarConfigured = Boolean(process.env.FLIGHTAWARE_API_KEY);

    let count = 0;
    if (availStatus === "CONNECTED") count++;
    if (pricingStatus === "CONNECTED") count++;
    if (stripeConfigured) count++;
    if (resendConfigured) count++;
    if (radarConfigured) count++;

    return {
      gdsAvailability: availStatus,
      charterPricing: pricingStatus,
      stripePayment: stripeConfigured ? "CONNECTED" : "NOT_CONNECTED",
      resendEmail: resendConfigured ? "CONNECTED" : "NOT_CONNECTED",
      flightAwareRadar: radarConfigured ? "CONNECTED" : "NOT_CONNECTED",
      totalLiveConnected: count,
    };
  }

  getProviders() {
    return {
      aviation: productionAviationProvider,
      payment: stripeProvider,
      notifications: emailProvider,
      tracking: radarProvider,
    };
  }
}

export const liveAviationGateway = new LiveAviationIntegrationGateway();
