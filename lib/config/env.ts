export interface AirServerEnvConfig {
  stripeSecretKey?: string;
  stripeWebhookSecret?: string;
  resendApiKey?: string;
  flightAwareApiKey?: string;
  charterGdsApiKey?: string;
  isStripeConfigured: boolean;
  isResendConfigured: boolean;
  isFlightAwareConfigured: boolean;
  isGdsConfigured: boolean;
}

export function getAirServerEnvConfig(): AirServerEnvConfig {
  if (typeof window !== "undefined") {
    throw new Error(
      "[SECURITY VIOLATION] getAirServerEnvConfig cannot be invoked in browser code."
    );
  }

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY || "";
  const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";
  const resendApiKey = process.env.RESEND_API_KEY || "";
  const flightAwareApiKey = process.env.FLIGHTAWARE_API_KEY || "";
  const charterGdsApiKey = process.env.CHARTER_GDS_API_KEY || "";

  return {
    stripeSecretKey,
    stripeWebhookSecret,
    resendApiKey,
    flightAwareApiKey,
    charterGdsApiKey,
    isStripeConfigured: Boolean(stripeSecretKey),
    isResendConfigured: Boolean(resendApiKey),
    isFlightAwareConfigured: Boolean(flightAwareApiKey),
    isGdsConfigured: Boolean(charterGdsApiKey),
  };
}
