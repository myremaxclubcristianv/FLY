export interface AirServerEnvConfig {
  stripeSecretKey?: string;
  stripeWebhookSecret?: string;
  resendApiKey?: string;
  flightAwareApiKey?: string;
  charterGdsApiKey?: string;
  telegramBotToken?: string;
  telegramChatId?: string;
  isStripeConfigured: boolean;
  isResendConfigured: boolean;
  isFlightAwareConfigured: boolean;
  isGdsConfigured: boolean;
  isTelegramConfigured: boolean;
  environmentMode: "TEST" | "SANDBOX" | "PRODUCTION";
  isProductionMode: boolean;
  paymentProviderStatus: "CONNECTED" | "NOT_CONNECTED" | "PENDING" | "TEST";
  supplyChannelStatus: "CONNECTED" | "NOT_CONNECTED" | "PENDING" | "TEST";
  operatorChannelStatus: "CONNECTED" | "NOT_CONNECTED" | "PENDING" | "TEST";
  notificationProviderStatus: "CONNECTED" | "NOT_CONNECTED" | "PENDING" | "TEST";
  trackingProviderStatus: "CONNECTED" | "NOT_CONNECTED" | "PENDING" | "TEST";
  telegramProviderStatus: "CONNECTED" | "NOT_CONNECTED" | "PENDING" | "TEST";
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
  const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN || "";
  const telegramChatId = process.env.TELEGRAM_CHAT_ID || "";

  const isStripeConfigured = Boolean(stripeSecretKey && !stripeSecretKey.includes("placeholder"));
  const isResendConfigured = Boolean(resendApiKey && !resendApiKey.includes("placeholder"));
  const isFlightAwareConfigured = Boolean(flightAwareApiKey && !flightAwareApiKey.includes("placeholder"));
  const isGdsConfigured = Boolean(charterGdsApiKey && !charterGdsApiKey.includes("placeholder"));
  const isTelegramConfigured = Boolean(
    telegramBotToken && telegramChatId && !telegramBotToken.includes("placeholder")
  );

  const isProductionMode =
    process.env.NODE_ENV === "production" &&
    isStripeConfigured &&
    !stripeSecretKey.startsWith("sk_test_");

  const environmentMode: "TEST" | "SANDBOX" | "PRODUCTION" = isProductionMode
    ? "PRODUCTION"
    : isStripeConfigured || isResendConfigured || isFlightAwareConfigured || isTelegramConfigured
    ? "SANDBOX"
    : "TEST";

  return {
    stripeSecretKey,
    stripeWebhookSecret,
    resendApiKey,
    flightAwareApiKey,
    charterGdsApiKey,
    telegramBotToken,
    telegramChatId,
    isStripeConfigured,
    isResendConfigured,
    isFlightAwareConfigured,
    isGdsConfigured,
    isTelegramConfigured,
    environmentMode,
    isProductionMode,
    paymentProviderStatus: isStripeConfigured
      ? stripeSecretKey.startsWith("sk_test_")
        ? "TEST"
        : "CONNECTED"
      : "NOT_CONNECTED",
    supplyChannelStatus: isGdsConfigured ? "CONNECTED" : "NOT_CONNECTED",
    operatorChannelStatus: isGdsConfigured ? "CONNECTED" : "NOT_CONNECTED",
    notificationProviderStatus: isResendConfigured ? "CONNECTED" : "NOT_CONNECTED",
    trackingProviderStatus: isFlightAwareConfigured ? "CONNECTED" : "NOT_CONNECTED",
    telegramProviderStatus: isTelegramConfigured ? "CONNECTED" : "NOT_CONNECTED",
  };
}
