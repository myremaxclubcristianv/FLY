import { telemetryClient } from "../telemetry/client";
import { TelemetryEventType } from "../telemetry/types";

export type AnalyticsEvent =
  | "planner_started"
  | "planner_completed"
  | "route_viewed"
  | "aircraft_viewed"
  | "destination_viewed"
  | "search_used"
  | "quote_requested"
  | "quote_received"
  | "option_selected";

export interface AnalyticsPayload {
  event: AnalyticsEvent;
  properties?: Record<string, string | number | boolean>;
  timestamp?: string;
}

export class AnalyticsService {
  private static events: AnalyticsPayload[] = [];

  static track(event: AnalyticsEvent, properties?: Record<string, string | number | boolean>) {
    const payload: AnalyticsPayload = {
      event,
      properties,
      timestamp: new Date().toISOString(),
    };
    this.events.push(payload);

    if (typeof window !== "undefined") {
      try {
        const mappedName: TelemetryEventType =
          event === "route_viewed"
            ? "navigation"
            : event === "planner_completed"
            ? "form_started"
            : (event as TelemetryEventType);

        telemetryClient.trackEvent(mappedName, {
          payload: properties,
          category: "COMMERCIAL",
        });
      } catch {
        // Safe fallback
      }
    }

    if (process.env.NODE_ENV === "development") {
      console.info(`[AIR ANALYTICS EVENT]: ${event}`, properties || "");
    }
  }

  static getLoggedEvents(): AnalyticsPayload[] {
    return [...this.events];
  }
}
