export type NotificationEvent =
  | "MISSION_CREATED"
  | "QUOTE_REQUESTED"
  | "QUOTE_RECEIVED"
  | "OPTIONS_READY"
  | "CUSTOMER_CONTACTED";

export interface NotificationPayload {
  event: NotificationEvent;
  recipientEmail: string;
  referenceId: string;
  details: Record<string, unknown>;
}

export interface NotificationService {
  notify(payload: NotificationPayload): Promise<boolean>;
}

export class DevelopmentNotificationService implements NotificationService {
  async notify(payload: NotificationPayload): Promise<boolean> {
    console.info(
      `[AIR NOTIFICATION SERVICE - ${payload.event}] Ref: ${payload.referenceId} -> To: ${payload.recipientEmail}`,
      payload.details
    );
    return true;
  }
}

export const notificationService = new DevelopmentNotificationService();
