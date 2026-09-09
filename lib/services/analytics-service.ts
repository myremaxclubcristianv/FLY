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
    if (process.env.NODE_ENV === "development") {
      console.info(`[AIR ANALYTICS EVENT]: ${event}`, properties || "");
    }
  }

  static getLoggedEvents(): AnalyticsPayload[] {
    return [...this.events];
  }
}
