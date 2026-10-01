/**
 * AIR First-Party Client-Side Telemetry SDK
 * Lightweight, non-blocking, beacon-powered event tracking with zero external scripts.
 */

import {
  TelemetryEventType,
  EventCategory,
  ConsentStatus,
  LeadSubmissionPayload,
} from "./types";

const VISITOR_COOKIE_KEY = "air_vid";
const SESSION_COOKIE_KEY = "air_sid";
const CONSENT_STORAGE_KEY = "air_consent_status";

function generateClientHexId(prefix: "V" | "S" | "E"): string {
  const chars = "0123456789ABCDEF";
  let id = "";
  for (let i = 0; i < 8; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `${prefix}-${id}`;
}

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

function setCookie(name: string, val: string, days: number = 365) {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(val)}; expires=${expires}; path=/; SameSite=Lax`;
}

export class AirTelemetryClient {
  private static instance: AirTelemetryClient | null = null;
  private visitorId: string = "";
  private sessionId: string = "";
  private consentStatus: ConsentStatus = "GRANTED";
  private isInitialized: boolean = false;
  private lastHeartbeatTime: number = 0;

  private constructor() {}

  public static getInstance(): AirTelemetryClient {
    if (!AirTelemetryClient.instance) {
      AirTelemetryClient.instance = new AirTelemetryClient();
    }
    return AirTelemetryClient.instance;
  }

  /**
   * Initializes or restores visitor and session identities from local first-party storage
   */
  public init(): { visitorId: string; sessionId: string } {
    if (typeof window === "undefined") {
      return { visitorId: "V-ANONYMOUS", sessionId: "S-ANONYMOUS" };
    }

    if (this.isInitialized) {
      return { visitorId: this.visitorId, sessionId: this.sessionId };
    }

    // 1. Resolve Visitor ID (Persistent)
    let vid = getCookie(VISITOR_COOKIE_KEY) || localStorage.getItem(VISITOR_COOKIE_KEY);
    if (!vid || !vid.startsWith("V-")) {
      vid = generateClientHexId("V");
    }
    this.visitorId = vid;
    setCookie(VISITOR_COOKIE_KEY, vid, 365);
    try {
      localStorage.setItem(VISITOR_COOKIE_KEY, vid);
    } catch {
      // Safe fallback
    }

    // 2. Resolve Session ID (Session-scoped)
    let sid = sessionStorage.getItem(SESSION_COOKIE_KEY);
    if (!sid || !sid.startsWith("S-")) {
      sid = generateClientHexId("S");
      sessionStorage.setItem(SESSION_COOKIE_KEY, sid);
    }
    this.sessionId = sid;

    // 3. Resolve Consent
    const storedConsent = localStorage.getItem(CONSENT_STORAGE_KEY) as ConsentStatus | null;
    if (storedConsent) {
      this.consentStatus = storedConsent;
    }

    this.isInitialized = true;
    this.setupLifecycleListeners();

    return { visitorId: this.visitorId, sessionId: this.sessionId };
  }

  public getVisitorId(): string {
    if (!this.isInitialized) this.init();
    return this.visitorId;
  }

  public getSessionId(): string {
    if (!this.isInitialized) this.init();
    return this.sessionId;
  }

  public getConsentStatus(): ConsentStatus {
    return this.consentStatus;
  }

  public setConsentStatus(status: ConsentStatus) {
    this.consentStatus = status;
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(CONSENT_STORAGE_KEY, status);
      } catch {
        // Safe storage fallback
      }
    }
  }

  /**
   * Send session startup / registration beacon to server
   */
  public registerSession(path: string = window.location.pathname) {
    if (typeof window === "undefined") return;
    this.init();

    const urlParams = new URLSearchParams(window.location.search);
    const payload = {
      visitorId: this.visitorId,
      sessionId: this.sessionId,
      path,
      referrer: document.referrer || undefined,
      utmSource: urlParams.get("utm_source") || undefined,
      utmMedium: urlParams.get("utm_medium") || undefined,
      utmCampaign: urlParams.get("utm_campaign") || undefined,
      utmContent: urlParams.get("utm_content") || undefined,
      utmTerm: urlParams.get("utm_term") || undefined,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      screenWidth: window.screen?.width,
      screenHeight: window.screen?.height,
      language: navigator.language || "ro-RO",
      consentStatus: this.consentStatus,
    };

    this.sendPost("/api/telemetry/session", payload);
  }

  /**
   * Track general telemetry event
   */
  public trackEvent(
    eventName: TelemetryEventType,
    params: {
      category?: EventCategory;
      pagePath?: string;
      pageTitle?: string;
      componentId?: string;
      ctaName?: string;
      routeContext?: string;
      payload?: Record<string, unknown>;
    } = {}
  ) {
    if (typeof window === "undefined") return;
    this.init();

    // Respect strict consent denial if specified
    if (this.consentStatus === "DENIED") return;

    const eventPayload = {
      eventId: generateClientHexId("E"),
      visitorId: this.visitorId,
      sessionId: this.sessionId,
      eventName,
      eventCategory: params.category || "INTERACTION",
      pagePath: params.pagePath || window.location.pathname,
      pageTitle: params.pageTitle || document.title,
      componentId: params.componentId,
      ctaName: params.ctaName,
      routeContext: params.routeContext,
      payload: params.payload,
    };

    this.sendPost("/api/telemetry/event", eventPayload);
  }

  /**
   * Convenient tracking methods for key business flows
   */
  public trackPageView(path: string, pageTitle?: string, referrer?: string) {
    this.trackEvent("page_view", {
      category: "NAVIGATION",
      pagePath: path,
      pageTitle: pageTitle || document.title,
      payload: { referrer },
    });
  }

  public trackCTA(ctaName: string, pagePath?: string, context?: string) {
    this.trackEvent("cta_click", {
      category: "COMMERCIAL",
      ctaName,
      pagePath: pagePath || window.location.pathname,
      routeContext: context,
    });
  }

  public trackRouteSelection(from: string, to: string, passengers: number, date?: string) {
    this.trackEvent("planner_route_selected", {
      category: "COMMERCIAL",
      pagePath: "/plan",
      routeContext: `${from} → ${to} (${passengers} PAX)`,
      payload: { from, to, passengers, date },
    });
  }

  public trackAircraftView(aircraftSlug: string, modelName: string) {
    this.trackEvent("aircraft_viewed", {
      category: "COMMERCIAL",
      pagePath: `/aircraft/${aircraftSlug}`,
      payload: { aircraftSlug, modelName },
    });
  }

  public trackAircraftCompare(missionTitle: string, aircraftModels: string[]) {
    this.trackEvent("aircraft_compared", {
      category: "COMMERCIAL",
      pagePath: "/aircraft/compare",
      routeContext: missionTitle,
      payload: { missionTitle, aircraftModels },
    });
  }

  public trackFormStart(formName: string, completedFields: Record<string, boolean>) {
    this.trackEvent("form_started", {
      category: "FORM",
      payload: { formName, fields: completedFields },
    });
  }

  public trackLeadSubmission(payload: LeadSubmissionPayload) {
    if (typeof window === "undefined") return;
    this.init();

    const fullPayload: LeadSubmissionPayload = {
      ...payload,
      visitorId: this.visitorId,
      sessionId: this.sessionId,
      landingPage: window.location.pathname,
    };

    this.sendPost("/api/telemetry/lead", fullPayload as unknown as Record<string, unknown>);
  }

  public sendHeartbeat() {
    if (typeof window === "undefined") return;
    const now = Date.now();
    // Throttle heartbeat to once every 20 seconds
    if (now - this.lastHeartbeatTime < 20000) return;
    this.lastHeartbeatTime = now;

    this.sendPost("/api/telemetry/heartbeat", {
      sessionId: this.sessionId,
      visitorId: this.visitorId,
      path: window.location.pathname,
    });
  }

  /**
   * Internal sender with Beacon API and keepalive fallback
   */
  private sendPost(url: string, data: Record<string, unknown>) {
    try {
      const json = JSON.stringify(data);
      if (typeof navigator !== "undefined" && navigator.sendBeacon) {
        const blob = new Blob([json], { type: "application/json" });
        const sent = navigator.sendBeacon(url, blob);
        if (sent) return;
      }

      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: json,
        keepalive: true,
      }).catch(() => {
        // Safe fail-silent for client UX
      });
    } catch {
      // Safe fail-silent
    }
  }

  private setupLifecycleListeners() {
    if (typeof window === "undefined") return;

    // Periodic heartbeat
    window.setInterval(() => {
      if (document.visibilityState === "visible") {
        this.sendHeartbeat();
      }
    }, 25000);

    // Unload & visibility changes
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        this.sendHeartbeat();
      }
    });

    window.addEventListener("pagehide", () => {
      this.sendHeartbeat();
    });
  }
}

export const telemetryClient = AirTelemetryClient.getInstance();
