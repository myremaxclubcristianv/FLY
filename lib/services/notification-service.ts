import { sendTelegramHtmlMessage } from "../telemetry/telegram";

export type NotificationEvent =
  | "MISSION_CREATED"
  | "REQUEST_SUBMITTED"
  | "OPERATOR_REQUESTED"
  | "QUOTE_RECEIVED"
  | "OPTIONS_READY"
  | "CUSTOMER_SELECTED"
  | "REQUEST_UPDATED";

export interface NotificationPayload {
  event: NotificationEvent;
  recipientEmail: string;
  referenceId: string;
  details: Record<string, unknown>;
}

export interface NotificationService {
  notify(payload: NotificationPayload): Promise<{ success: boolean; status: "NOT_CONNECTED" | "LOGGED" | "SENT" }>;
}

export class ProductionNotificationService implements NotificationService {
  async notify(payload: NotificationPayload): Promise<{ success: boolean; status: "NOT_CONNECTED" | "LOGGED" | "SENT" }> {
    const detailsStr = Object.entries(payload.details)
      .map(([k, v]) => `• ${k}: ${typeof v === "object" ? JSON.stringify(v) : String(v)}`)
      .join("\n");

    const text = `✈️ <b>AIR — MISSION DISPATCH EVENT</b>
━━━━━━━━━━━━━━━━━━
Event: <b>${payload.event}</b>
Reference: <code>${payload.referenceId}</code>
Recipient: <code>${payload.recipientEmail}</code>

Details:
${detailsStr || "No extra metadata"}

Time: ${new Date().toISOString()}`;

    // Dispatches via Telegram in background
    sendTelegramHtmlMessage(text, `notif_${payload.referenceId}_${payload.event}`).catch(() => {});

    console.info(
      `[AIR NOTIFICATION DISPATCH] Event: ${payload.event} | Ref: ${payload.referenceId} | Recipient: ${payload.recipientEmail}`
    );

    return {
      success: true,
      status: process.env.TELEGRAM_BOT_TOKEN ? "SENT" : "LOGGED",
    };
  }
}

export const notificationService = new ProductionNotificationService();
