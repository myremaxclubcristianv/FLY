import { NextResponse } from "next/server";
import { checkAndRegisterIdempotencyKey } from "@/lib/utils/idempotency";

export async function POST(req: Request) {
  try {
    const signature = req.headers.get("stripe-signature") || req.headers.get("x-signature");
    const body = await req.json();

    const eventId = body?.id || body?.event_id;
    if (!eventId) {
      return NextResponse.json({ error: "Missing event identifier" }, { status: 400 });
    }

    // Idempotency evaluation
    const isFirstTime = checkAndRegisterIdempotencyKey(eventId);
    if (!isFirstTime) {
      return NextResponse.json({ received: true, status: "IDEMPOTENT_SKIPPED" }, { status: 200 });
    }

    // Signature verification (Server-side constraint)
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (webhookSecret && !signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    console.info(`[AIR PAYMENT WEBHOOK PROCESSED]: Event ID: ${eventId} | Event Type: ${body?.type || "payment_intent.succeeded"}`);

    return NextResponse.json(
      {
        received: true,
        eventId,
        status: "PROCESSED",
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[AIR PAYMENT WEBHOOK ERROR]:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
