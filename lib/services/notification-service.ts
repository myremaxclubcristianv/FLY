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

export class DevelopmentNotificationService implements NotificationService {
  async notify(payload: NotificationPayload): Promise<{ success: boolean; status: "NOT_CONNECTED" | "LOGGED" | "SENT" }> {
    // Explicit internal logging adapter without faking external email delivery
    console.info(
      `[AIR NOTIFICATION LOG - STATUS: NOT CONNECTED] Event: ${payload.event} | Ref: ${payload.referenceId} | Recipient: ${payload.recipientEmail}`,
      payload.details
    );
    return {
      success: true,
      status: "NOT_CONNECTED",
    };
  }
}

export const notificationService = new DevelopmentNotificationService();
