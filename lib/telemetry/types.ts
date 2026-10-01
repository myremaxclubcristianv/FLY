/**
 * AIR Visitor Intelligence & Customer Journey Telemetry Types
 * First-party, privacy-preserving event taxonomy and identity models.
 */

export type IntentLevel =
  | "CASUAL"
  | "INTERESTED"
  | "ENGAGED"
  | "HIGH_INTENT"
  | "LEAD_CONVERTED";

export type ConsentStatus = "GRANTED" | "DENIED" | "PENDING" | "ESSENTIAL_ONLY";

export type NotificationPriority = "P0" | "P1" | "P2" | "P3" | "P4";

export type TelemetryEventType =
  | "session_started"
  | "session_ended"
  | "page_view"
  | "navigation"
  | "cta_click"
  | "search"
  | "planner_started"
  | "planner_route_selected"
  | "planner_passengers_changed"
  | "planner_date_selected"
  | "planner_budget_selected"
  | "planner_priority_selected"
  | "aircraft_viewed"
  | "aircraft_compared"
  | "operator_viewed"
  | "quote_viewed"
  | "quote_requested"
  | "form_started"
  | "form_field_completed"
  | "form_submitted"
  | "contact_clicked"
  | "phone_clicked"
  | "email_clicked"
  | "whatsapp_clicked"
  | "external_link_clicked"
  | "login"
  | "register"
  | "account_viewed"
  | "gift_started"
  | "business_started"
  | "heartbeat";

export type EventCategory =
  | "NAVIGATION"
  | "COMMERCIAL"
  | "FORM"
  | "ENGAGEMENT"
  | "SYSTEM"
  | "INTERACTION";

export interface GeoLocationInfo {
  country?: string;
  region?: string;
  city?: string;
  timezone?: string;
}

export interface DeviceInfo {
  deviceType: "Mobile" | "Tablet" | "Desktop" | "Unknown";
  os: string;
  browser: string;
  viewportWidth?: number;
  viewportHeight?: number;
  screenWidth?: number;
  screenHeight?: number;
  language?: string;
  connection?: string;
}

export interface AttributionData {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  referrer?: string;
  referrerHost?: string;
  source: string;
  medium: string;
  landingPage: string;
}

export interface VisitorRecord {
  visitorId: string; // 'V-XXXXXXXX'
  userId?: string;
  leadId?: string;
  isAuthenticated: boolean;
  authEmail?: string;
  firstSeenAt: string;
  lastSeenAt: string;
  totalSessions: number;
  totalPageViews: number;
  totalEvents: number;
  firstSource: string;
  firstMedium: string;
  firstCampaign?: string;
  firstReferrer?: string;
  firstLandingPage: string;
  lastSource: string;
  lastMedium: string;
  lastCampaign?: string;
  lastReferrer?: string;
  lastLandingPage: string;
  primaryDevice?: string;
  primaryOs?: string;
  primaryBrowser?: string;
  country?: string;
  region?: string;
  city?: string;
  timezone: string;
  commercialScore: number;
  intentLevel: IntentLevel;
  consentStatus: ConsentStatus;
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface SessionRecord {
  sessionId: string; // 'S-XXXXXXXX'
  visitorId: string; // 'V-XXXXXXXX'
  sessionNumber: number;
  startedAt: string;
  endedAt?: string;
  lastActiveAt: string;
  durationSeconds: number;
  isBounce: boolean;
  pageViewsCount: number;
  eventsCount: number;
  entryPath: string;
  exitPath?: string;
  referrer?: string;
  referrerHost?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  source: string;
  medium: string;
  deviceType: "Mobile" | "Tablet" | "Desktop" | "Unknown";
  os?: string;
  browser?: string;
  viewportWidth?: number;
  viewportHeight?: number;
  screenWidth?: number;
  screenHeight?: number;
  language?: string;
  country?: string;
  region?: string;
  city?: string;
  timezone: string;
  userId?: string;
  leadId?: string;
  commercialScore: number;
  intentLevel: IntentLevel;
  hasStartedPlanner: boolean;
  hasSelectedRoute: boolean;
  hasViewedAircraft: boolean;
  hasComparedAircraft: boolean;
  hasStartedForm: boolean;
  hasSubmittedLead: boolean;
  isLive: boolean;
  journeyTrail: Array<{
    page: string;
    action?: string;
    time: string;
  }>;
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface TelemetryEvent {
  eventId: string; // 'E-XXXXXXXX'
  sessionId: string;
  visitorId: string;
  eventName: TelemetryEventType;
  eventCategory: EventCategory;
  timestamp: string;
  pagePath: string;
  pageTitle?: string;
  componentId?: string;
  ctaName?: string;
  routeContext?: string;
  payload?: Record<string, unknown>;
  durationFromSessionStart?: number;
}

export interface LeadSubmissionPayload {
  referenceId: string;
  visitorId?: string;
  sessionId?: string;
  leadType: "FLIGHT_REQUEST" | "CONTACT_MESSAGE" | "BROCHURE_DOWNLOAD";
  name?: string;
  email?: string;
  phone?: string;
  origin?: string;
  destination?: string;
  passengers?: number;
  tripType?: string;
  date?: string;
  budget?: string;
  priority?: string;
  purpose?: string;
  notes?: string;
  source?: string;
  campaign?: string;
  landingPage?: string;
  pagesBeforeConversion?: number;
  sessionDurationSeconds?: number;
  journeySummary?: Array<string>;
}

export interface ActiveVisitorState {
  sessionId: string;
  visitorId: string;
  startedAt: string;
  lastHeartbeat: string;
  currentPage: string;
  currentSection?: string;
  recentActions: string[];
  deviceSummary: string;
  sourceSummary: string;
  locationSummary?: string;
  activeDurationSeconds: number;
  hasCommercialIntent: boolean;
}
