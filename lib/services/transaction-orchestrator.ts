import { generateServerMissionReference } from "./mission-service";
import { generateServerBookingReference } from "@/lib/utils/idempotency";
import { stripeProvider } from "@/lib/integrations/payment/stripe-provider";
import { emailProvider } from "@/lib/integrations/notifications/email-provider";

export interface OrchestratedTransactionResult {
  transactionRef: string;
  missionRef: string;
  bookingRef: string;
  statusMilestone: string;
  isLiveProduction: boolean;
  isSandbox: boolean;
  operatorName: string;
  totalAmount: string;
  notes: string;
}

export class TransactionOrchestrator {
  async executeCommercialFlightWorkflow(data: {
    origin: string;
    destination: string;
    date: string;
    passengers: number;
    customerEmail: string;
    customerName: string;
    operatorName: string;
  }): Promise<OrchestratedTransactionResult> {
    if (typeof window !== "undefined") {
      throw new Error("[SECURITY VIOLATION] Transaction orchestrator must run server-side.");
    }

    const missionRef = generateServerMissionReference();
    const bookingRef = generateServerBookingReference();
    const transactionRef = `AIR-TXN-2026-${upperHex(6)}`;

    // Milestone 1: Sourcing & Token Dispatch
    const dispatchToken = `AIR-DISPATCH-${upperHex(12)}`;
    await emailProvider.sendOperatorDispatchEmail({
      operatorEmail: "dispatch@toyoaviation.ro",
      operatorName: data.operatorName,
      missionRef,
      dispatchToken,
    });

    // Milestone 2: Stripe Payment Intent
    const paymentResult = await stripeProvider.createPaymentIntent({
      bookingId: bookingRef,
      amount: 8800,
      currency: "EUR",
    });

    return {
      transactionRef,
      missionRef,
      bookingRef,
      statusMilestone: "BOOKING_CONFIRMED",
      isLiveProduction: paymentResult.isLive,
      isSandbox: !paymentResult.isLive,
      operatorName: data.operatorName,
      totalAmount: "€8,800 EUR",
      notes: `End-to-end commercial transaction orchestrated. Mission: ${missionRef} | Booking: ${bookingRef} | Payment State: ${paymentResult.status} | Adapter: ${paymentResult.providerName}`,
    };
  }
}

function upperHex(len: number): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let res = "";
  for (let i = 0; i < len; i++) {
    res += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return res;
}

export const transactionOrchestrator = new TransactionOrchestrator();
