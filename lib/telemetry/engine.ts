/**
 * AIR Server-Side Telemetry Engine
 * Authoritative visitor identity resolution, session management, attribution,
 * deterministic intent scoring, database persistence & Telegram alerting.
 */

import { createAdminClient } from "../supabase/admin";
import {
  VisitorRecord,
  SessionRecord,
  TelemetryEvent,
  LeadSubmissionPayload,
  IntentLevel,
  ConsentStatus,
  ActiveVisitorState,
  TelemetryEventType,
} from "./types";
import {
  sendNewVisitorTelegramAlert,
  sendReturningVisitorTelegramAlert,
  sendCtaClickTelegramAlert,
  sendFormStartedTelegramAlert,
  sendNewLeadTelegramAlert,
  sendHighEngagementTelegramAlert,
  sendSessionSummaryTelegramAlert,
} from "./telegram";

// Fast in-memory caches for live sessions & active heartbeats
const inMemoryVisitors = new Map<string, VisitorRecord>();
const inMemorySessions = new Map<string, SessionRecord>();
const inMemoryActive = new Map<string, ActiveVisitorState>();
const notifiedHighIntent = new Set<string>();

export function generateVisitorId(): string {
  const chars = "0123456789ABCDEF";
  let id = "";
  for (let i = 0; i < 8; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `V-${id}`;
}

export function generateSessionId(): string {
  const chars = "0123456789ABCDEF";
  let id = "";
  for (let i = 0; i < 8; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `S-${id}`;
}

export function generateEventId(): string {
  const chars = "0123456789ABCDEF";
  let id = "";
  for (let i = 0; i < 8; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `E-${id}`;
}

/**
 * Classify traffic source based on UTM params and Referrer URL
 */
export function classifyAttribution(params: {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  referrer?: string;
}): { source: string; medium: string; referrerHost: string } {
  const { utmSource, utmMedium, referrer } = params;

  let referrerHost = "";
  if (referrer) {
    try {
      const url = new URL(referrer);
      referrerHost = url.hostname.replace(/^www\./, "");
    } catch {
      referrerHost = referrer;
    }
  }

  // 1. Explicit UTM
  if (utmSource) {
    const med = utmMedium || "campaign";
    return {
      source: utmSource.charAt(0).toUpperCase() + utmSource.slice(1),
      medium: med.toLowerCase(),
      referrerHost,
    };
  }

  // 2. Referrer detection
  if (referrerHost) {
    const host = referrerHost.toLowerCase();
    if (host.includes("google.")) return { source: "Google", medium: "organic", referrerHost };
    if (host.includes("bing.")) return { source: "Bing", medium: "organic", referrerHost };
    if (host.includes("duckduckgo.")) return { source: "DuckDuckGo", medium: "organic", referrerHost };
    if (host.includes("instagram.")) return { source: "Instagram", medium: "social", referrerHost };
    if (host.includes("facebook.") || host.includes("fb.me")) return { source: "Facebook", medium: "social", referrerHost };
    if (host.includes("linkedin.")) return { source: "LinkedIn", medium: "social", referrerHost };
    if (host.includes("t.co") || host.includes("twitter.") || host.includes("x.com")) return { source: "X / Twitter", medium: "social", referrerHost };
    if (host.includes("tiktok.")) return { source: "TikTok", medium: "social", referrerHost };
    if (host.includes("youtube.") || host.includes("youtu.be")) return { source: "YouTube", medium: "social", referrerHost };
    if (host.includes("cristianvaduva.com")) return { source: "AIR Ecosystem", medium: "internal", referrerHost };

    return { source: referrerHost, medium: "referral", referrerHost };
  }

  // 3. Direct
  return { source: "Direct", medium: "direct", referrerHost: "Direct" };
}

/**
 * Parses user agent string to identify OS, Browser and Device Type
 */
export function parseUserAgent(ua?: string): {
  deviceType: "Mobile" | "Tablet" | "Desktop" | "Unknown";
  os: string;
  browser: string;
} {
  if (!ua) {
    return { deviceType: "Desktop", os: "macOS", browser: "Safari" };
  }

  let deviceType: "Mobile" | "Tablet" | "Desktop" | "Unknown" = "Desktop";
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    deviceType = "Tablet";
  } else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/i.test(ua)) {
    deviceType = "Mobile";
  }

  let os = "Other";
  if (/iPhone|iPad|iPod/i.test(ua)) os = "iOS";
  else if (/Android/i.test(ua)) os = "Android";
  else if (/Mac OS X|Macintosh/i.test(ua)) os = "macOS";
  else if (/Windows NT/i.test(ua)) os = "Windows";
  else if (/Linux/i.test(ua)) os = "Linux";

  let browser = "Other";
  if (/Edg/i.test(ua)) browser = "Edge";
  else if (/Chrome/i.test(ua) && !/Edg/i.test(ua)) browser = "Chrome";
  else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) browser = "Safari";
  else if (/Firefox/i.test(ua)) browser = "Firefox";
  else if (/Opera|OPR/i.test(ua)) browser = "Opera";

  return { deviceType, os, browser };
}

/**
 * Calculates deterministic intent level from score
 */
export function calculateIntentLevel(score: number, hasLead: boolean): IntentLevel {
  if (hasLead) return "LEAD_CONVERTED";
  if (score >= 80) return "HIGH_INTENT";
  if (score >= 50) return "ENGAGED";
  if (score >= 25) return "INTERESTED";
  return "CASUAL";
}

export class TelemetryEngine {
  /**
   * Initializes or refreshes a visitor and session record
   */
  static async registerSession(params: {
    visitorId?: string;
    sessionId?: string;
    path: string;
    referrer?: string;
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
    utmContent?: string;
    utmTerm?: string;
    viewportWidth?: number;
    viewportHeight?: number;
    screenWidth?: number;
    screenHeight?: number;
    language?: string;
    userAgent?: string;
    geoHeaders?: {
      country?: string;
      region?: string;
      city?: string;
      timezone?: string;
    };
    consentStatus?: ConsentStatus;
    userId?: string;
    initialCta?: string;
    firstSection?: string;
  }): Promise<{
    visitor: VisitorRecord;
    session: SessionRecord;
    isNewVisitor: boolean;
    isNewSession: boolean;
  }> {
    const now = new Date().toISOString();
    const cleanVisitorId = params.visitorId && params.visitorId.startsWith("V-")
      ? params.visitorId
      : generateVisitorId();
    const cleanSessionId = params.sessionId && params.sessionId.startsWith("S-")
      ? params.sessionId
      : generateSessionId();

    const attribution = classifyAttribution({
      utmSource: params.utmSource,
      utmMedium: params.utmMedium,
      utmCampaign: params.utmCampaign,
      referrer: params.referrer,
    });

    const parsedUa = parseUserAgent(params.userAgent);
    const country = params.geoHeaders?.country || "RO";
    const city = params.geoHeaders?.city || "Bucharest";
    const region = params.geoHeaders?.region || "Bucharest";
    const timezone = params.geoHeaders?.timezone || "Europe/Bucharest";

    // 1. Resolve or Create Visitor
    let visitor = inMemoryVisitors.get(cleanVisitorId);
    let isNewVisitor = false;

    if (!visitor) {
      isNewVisitor = true;
      visitor = {
        visitorId: cleanVisitorId,
        userId: params.userId,
        isAuthenticated: Boolean(params.userId),
        firstSeenAt: now,
        lastSeenAt: now,
        totalSessions: 1,
        totalPageViews: 1,
        totalEvents: 1,
        firstSource: attribution.source,
        firstMedium: attribution.medium,
        firstCampaign: params.utmCampaign,
        firstReferrer: params.referrer,
        firstLandingPage: params.path || "/",
        lastSource: attribution.source,
        lastMedium: attribution.medium,
        lastCampaign: params.utmCampaign,
        lastReferrer: params.referrer,
        lastLandingPage: params.path || "/",
        primaryDevice: parsedUa.deviceType,
        primaryOs: parsedUa.os,
        primaryBrowser: parsedUa.browser,
        country,
        region,
        city,
        timezone,
        commercialScore: 0,
        intentLevel: "CASUAL",
        consentStatus: params.consentStatus || "GRANTED",
        createdAt: now,
        updatedAt: now,
      };
      inMemoryVisitors.set(cleanVisitorId, visitor);
    } else {
      visitor.lastSeenAt = now;
      visitor.lastSource = attribution.source;
      visitor.lastMedium = attribution.medium;
      visitor.lastCampaign = params.utmCampaign || visitor.lastCampaign;
      visitor.lastLandingPage = params.path || visitor.lastLandingPage;
      if (params.userId) {
        visitor.userId = params.userId;
        visitor.isAuthenticated = true;
      }
      visitor.updatedAt = now;
    }

    // 2. Resolve or Create Session
    let session = inMemorySessions.get(cleanSessionId);
    let isNewSession = false;

    if (!session) {
      isNewSession = true;
      if (!isNewVisitor) {
        visitor.totalSessions += 1;
      }

      session = {
        sessionId: cleanSessionId,
        visitorId: cleanVisitorId,
        sessionNumber: visitor.totalSessions,
        startedAt: now,
        lastActiveAt: now,
        durationSeconds: 0,
        isBounce: true,
        pageViewsCount: 1,
        eventsCount: 1,
        entryPath: params.path || "/",
        exitPath: params.path || "/",
        referrer: params.referrer,
        referrerHost: attribution.referrerHost,
        utmSource: params.utmSource,
        utmMedium: params.utmMedium,
        utmCampaign: params.utmCampaign,
        utmContent: params.utmContent,
        utmTerm: params.utmTerm,
        source: attribution.source,
        medium: attribution.medium,
        deviceType: parsedUa.deviceType,
        os: parsedUa.os,
        browser: parsedUa.browser,
        viewportWidth: params.viewportWidth,
        viewportHeight: params.viewportHeight,
        screenWidth: params.screenWidth,
        screenHeight: params.screenHeight,
        language: params.language || "ro-RO",
        country,
        region,
        city,
        timezone,
        userId: params.userId,
        commercialScore: 0,
        intentLevel: "CASUAL",
        hasStartedPlanner: params.path.startsWith("/plan"),
        hasSelectedRoute: false,
        hasViewedAircraft: params.path.startsWith("/aircraft"),
        hasComparedAircraft: params.path.includes("compare"),
        hasStartedForm: false,
        hasSubmittedLead: false,
        isLive: true,
        journeyTrail: [{ page: params.path || "/", action: "session_started", time: now }],
        createdAt: now,
        updatedAt: now,
      };
      inMemorySessions.set(cleanSessionId, session);

      // Register active visitor state
      inMemoryActive.set(cleanSessionId, {
        sessionId: cleanSessionId,
        visitorId: cleanVisitorId,
        startedAt: now,
        lastHeartbeat: now,
        currentPage: params.path || "/",
        currentSection: params.firstSection,
        recentActions: ["session_started"],
        deviceSummary: `${parsedUa.deviceType} · ${parsedUa.browser}`,
        sourceSummary: attribution.source,
        locationSummary: [city, country].filter(Boolean).join(", "),
        activeDurationSeconds: 0,
        hasCommercialIntent: session.hasStartedPlanner || session.hasViewedAircraft,
      });

      // Send Telegram notification on session start
      if (isNewVisitor) {
        sendNewVisitorTelegramAlert({
          visitor,
          session,
          firstVisibleSection: params.firstSection,
          initialCta: params.initialCta,
        }).catch((err) => console.error("[TELEGRAM ERROR]", err));
      } else {
        sendReturningVisitorTelegramAlert({
          visitor,
          session,
          previousJourneySummary: `${visitor.firstLandingPage} → ${visitor.lastLandingPage}`,
        }).catch((err) => console.error("[TELEGRAM ERROR]", err));
      }
    } else {
      session.lastActiveAt = now;
      session.updatedAt = now;
    }

    // Async persist to Supabase if configured (Fail-safe, non-blocking)
    this.persistVisitorAndSession(visitor, session).catch((e) =>
      console.warn("[SUPABASE PERSIST NOTICE] In-memory persistence active:", e?.message)
    );

    return { visitor, session, isNewVisitor, isNewSession };
  }

  /**
   * Ingest and process a single Telemetry event
   */
  static async ingestEvent(event: {
    eventId?: string;
    visitorId: string;
    sessionId: string;
    eventName: TelemetryEventType;
    eventCategory?: TelemetryEvent["eventCategory"];
    pagePath: string;
    pageTitle?: string;
    componentId?: string;
    ctaName?: string;
    routeContext?: string;
    payload?: Record<string, unknown>;
  }): Promise<{ success: boolean; intentLevel: IntentLevel; commercialScore: number }> {
    const now = new Date().toISOString();
    const eventId = event.eventId || generateEventId();
    const category = event.eventCategory || "INTERACTION";

    let session = inMemorySessions.get(event.sessionId);
    let visitor = inMemoryVisitors.get(event.visitorId);

    // Fallback initialize if missing from memory
    if (!session || !visitor) {
      const reg = await this.registerSession({
        visitorId: event.visitorId,
        sessionId: event.sessionId,
        path: event.pagePath,
      });
      session = reg.session;
      visitor = reg.visitor;
    }

    // Update session metrics
    session.lastActiveAt = now;
    session.exitPath = event.pagePath;
    session.eventsCount += 1;
    visitor.totalEvents += 1;

    // Calculate duration
    const startMs = new Date(session.startedAt).getTime();
    const currentMs = new Date(now).getTime();
    session.durationSeconds = Math.max(0, Math.floor((currentMs - startMs) / 1000));
    if (session.eventsCount > 1 || session.pageViewsCount > 1 || session.durationSeconds > 10) {
      session.isBounce = false;
    }

    // Append to journey trail
    session.journeyTrail.push({
      page: event.pagePath,
      action: event.eventName,
      time: now,
    });
    if (session.journeyTrail.length > 50) {
      session.journeyTrail.shift();
    }

    // Update active visitor registry
    const active = inMemoryActive.get(event.sessionId);
    if (active) {
      active.lastHeartbeat = now;
      active.currentPage = event.pagePath;
      active.activeDurationSeconds = session.durationSeconds;
      active.recentActions = [
        event.eventName.replace(/_/g, " "),
        ...active.recentActions.slice(0, 4),
      ];
    }

    // Deterministic Intent Scoring
    let scoreDelta = 0;
    const observedSignals: string[] = [];

    switch (event.eventName) {
      case "page_view":
        session.pageViewsCount += 1;
        visitor.totalPageViews += 1;
        scoreDelta += 2;
        if (event.pagePath.startsWith("/aircraft/")) {
          session.hasViewedAircraft = true;
          scoreDelta += 15;
          observedSignals.push(`Viewed aircraft: ${event.pagePath.split("/").pop()}`);
        }
        if (event.pagePath.includes("compare")) {
          session.hasComparedAircraft = true;
          scoreDelta += 25;
          observedSignals.push("Evaluated aircraft side-by-side comparison");
        }
        break;

      case "planner_started":
        session.hasStartedPlanner = true;
        scoreDelta += 15;
        observedSignals.push("Launched flight decision planner");
        break;

      case "planner_route_selected":
        session.hasSelectedRoute = true;
        scoreDelta += 25;
        observedSignals.push(`Selected flight route: ${event.routeContext || event.pagePath}`);
        break;

      case "planner_passengers_changed":
        scoreDelta += 10;
        observedSignals.push("Configured passenger complement");
        break;

      case "planner_date_selected":
      case "planner_budget_selected":
      case "planner_priority_selected":
        scoreDelta += 15;
        observedSignals.push(`Specified mission parameters (${event.eventName.replace("planner_", "")})`);
        break;

      case "aircraft_viewed":
        session.hasViewedAircraft = true;
        scoreDelta += 15;
        observedSignals.push("Inspected aircraft specifications");
        break;

      case "aircraft_compared":
        session.hasComparedAircraft = true;
        scoreDelta += 25;
        observedSignals.push("Conducted mission benchmark comparison");
        break;

      case "form_started":
      case "contact_form_started":
        session.hasStartedForm = true;
        scoreDelta += 40;
        observedSignals.push("Initiated commercial contact request form");
        sendFormStartedTelegramAlert({
          visitorId: visitor.visitorId,
          sessionId: session.sessionId,
          formName: (event.payload?.formName as string) || "Contact Request",
          pagePath: event.pagePath,
          completedFields: (event.payload?.fields as Record<string, boolean>) || {
            Name: true,
            Email: true,
          },
        }).catch((e) => console.error("[TELEGRAM FORM START ERROR]", e));
        break;

      case "contact_opened":
        scoreDelta += 10;
        observedSignals.push("Opened Always-On Contact Console");
        break;

      case "cta_click":
        scoreDelta += 10;
        if (event.ctaName) {
          sendCtaClickTelegramAlert({
            visitorId: visitor.visitorId,
            sessionId: session.sessionId,
            ctaName: event.ctaName,
            pagePath: event.pagePath,
            context: event.routeContext,
            source: session.source,
            deviceType: session.deviceType,
          }).catch((e) => console.error("[TELEGRAM CTA CLICK ERROR]", e));
        }
        break;

      case "form_submitted":
      case "contact_form_submitted":
      case "lead_created":
      case "quote_requested":
        session.hasSubmittedLead = true;
        scoreDelta += 100;
        observedSignals.push("Submitted commercial flight inquiry / contact lead");
        break;
    }

    session.commercialScore += scoreDelta;
    visitor.commercialScore += scoreDelta;

    const newIntent = calculateIntentLevel(session.commercialScore, session.hasSubmittedLead);
    session.intentLevel = newIntent;
    visitor.intentLevel = newIntent;

    if (active) {
      active.hasCommercialIntent =
        session.commercialScore >= 40 || session.hasStartedPlanner || session.hasStartedForm;
    }

    // High Engagement alert trigger (P2) - triggers once per session when reaching HIGH_INTENT
    if (newIntent === "HIGH_INTENT" && !notifiedHighIntent.has(session.sessionId)) {
      notifiedHighIntent.add(session.sessionId);
      sendHighEngagementTelegramAlert({
        visitorId: visitor.visitorId,
        sessionId: session.sessionId,
        signals: observedSignals.length > 0 ? observedSignals : [
          "Route selected",
          "Aircraft viewed",
          "Multiple planner interactions",
        ],
        pagesCount: session.pageViewsCount,
        sessionDurationSeconds: session.durationSeconds,
        source: session.source,
        currentPage: event.pagePath,
        reason: "Multiple commercial aviation actions detected.",
      }).catch((e) => console.error("[TELEGRAM HIGH ENGAGEMENT ERROR]", e));
    }

    // Persist event to Supabase if configured
    this.persistEvent({
      eventId,
      sessionId: session.sessionId,
      visitorId: visitor.visitorId,
      eventName: event.eventName,
      eventCategory: category,
      timestamp: now,
      pagePath: event.pagePath,
      pageTitle: event.pageTitle,
      componentId: event.componentId,
      ctaName: event.ctaName,
      routeContext: event.routeContext,
      payload: event.payload,
      durationFromSessionStart: session.durationSeconds,
    }).catch((e) =>
      console.warn("[SUPABASE EVENT NOTICE] Event saved in-memory:", e?.message)
    );

    return {
      success: true,
      intentLevel: session.intentLevel,
      commercialScore: session.commercialScore,
    };
  }

  /**
   * Process lead submission & link previously anonymous visitor/session
   */
  static async registerLead(payload: LeadSubmissionPayload): Promise<{ success: boolean }> {
    const visitor = payload.visitorId ? inMemoryVisitors.get(payload.visitorId) : undefined;
    const session = payload.sessionId ? inMemorySessions.get(payload.sessionId) : undefined;

    if (visitor) {
      visitor.leadId = payload.referenceId;
      visitor.intentLevel = "LEAD_CONVERTED";
      visitor.commercialScore += 100;
    }

    if (session) {
      session.leadId = payload.referenceId;
      session.hasSubmittedLead = true;
      session.intentLevel = "LEAD_CONVERTED";
      session.commercialScore += 100;
      session.journeyTrail.push({
        page: payload.currentPage || session.exitPath || "/contact",
        action: "lead_created",
        time: new Date().toISOString(),
      });
    }

    const journeyTrailStrings = session?.journeyTrail.map((j) => `${j.page} (${j.action})`) || [];

    // Send Critical P0 Telegram Alert (Handles both Contact Inquiries & Flight Requests)
    await sendNewLeadTelegramAlert({
      ...payload,
      pagesBeforeConversion: session?.pageViewsCount || payload.pagesBeforeConversion || 1,
      sessionDurationSeconds: session?.durationSeconds || payload.sessionDurationSeconds || 0,
      source: session?.source || payload.source || "Direct",
      medium: session?.medium || payload.medium || "direct",
      campaign: session?.utmCampaign || payload.campaign,
      referrer: session?.referrer || payload.referrer || "Direct",
      landingPage: session?.entryPath || payload.landingPage || "/",
      currentPage: payload.currentPage || session?.exitPath || "/contact",
      deviceType: session?.deviceType || payload.deviceType || "Desktop",
      os: session?.os || payload.os || "—",
      browser: session?.browser || payload.browser || "—",
      viewportWidth: session?.viewportWidth || payload.viewportWidth,
      viewportHeight: session?.viewportHeight || payload.viewportHeight,
      country: session?.country || payload.country || "Romania",
      city: session?.city || payload.city,
      journeySummary: journeyTrailStrings.length > 0 ? journeyTrailStrings : payload.journeySummary || [],
      leadStatus: payload.leadStatus || "NEW",
    }).catch((e) => console.error("[TELEGRAM LEAD ALERT FAILED]", e));

    // Persist Lead in Supabase
    const admin = createAdminClient();
    if (admin) {
      try {
        await admin.from("air_leads").insert({
          reference_id: payload.referenceId,
          visitor_id: payload.visitorId,
          session_id: payload.sessionId,
          lead_type: payload.leadType,
          name: payload.name,
          email: payload.email,
          phone: payload.phone,
          company: payload.company,
          service_interest: payload.serviceInterest,
          message: payload.message,
          origin: payload.origin,
          destination: payload.destination,
          passengers: payload.passengers,
          trip_type: payload.tripType,
          departure_date: payload.date,
          budget_preference: payload.budget,
          priority: payload.priority,
          purpose: payload.purpose,
          notes: payload.notes || payload.message,
          source: session?.source || payload.source || "Direct",
          medium: session?.medium || payload.medium || "direct",
          campaign: session?.utmCampaign || payload.campaign,
          referrer: session?.referrer || payload.referrer || "Direct",
          landing_page: session?.entryPath || payload.landingPage || "/",
          current_page: payload.currentPage || session?.exitPath || "/contact",
          device_type: session?.deviceType || payload.deviceType || "Desktop",
          os: session?.os || payload.os || "—",
          browser: session?.browser || payload.browser || "—",
          viewport_width: session?.viewportWidth || payload.viewportWidth,
          viewport_height: session?.viewportHeight || payload.viewportHeight,
          country: session?.country || payload.country || "Romania",
          city: session?.city || payload.city,
          lead_status: payload.leadStatus || "NEW",
          pages_before_conversion: session?.pageViewsCount || 1,
          session_duration_seconds: session?.durationSeconds || 0,
          journey_summary: session?.journeyTrail || [],
        });
      } catch (err) {
        console.warn("[SUPABASE LEAD INSERT NOTICE]", err);
      }
    }

    return { success: true };
  }

  /**
   * Process heartbeat to maintain live visitor state & close stale sessions
   */
  static async recordHeartbeat(params: {
    sessionId: string;
    visitorId: string;
    path: string;
  }): Promise<void> {
    const now = new Date().toISOString();
    const session = inMemorySessions.get(params.sessionId);
    const active = inMemoryActive.get(params.sessionId);

    if (session) {
      session.lastActiveAt = now;
      session.exitPath = params.path;
      const startMs = new Date(session.startedAt).getTime();
      const currentMs = new Date(now).getTime();
      session.durationSeconds = Math.max(0, Math.floor((currentMs - startMs) / 1000));
    }

    if (active) {
      active.lastHeartbeat = now;
      active.currentPage = params.path;
      active.activeDurationSeconds = session?.durationSeconds || 0;
    }

    // Cleanup stale active sessions (> 10 minutes inactive)
    const nowMs = Date.now();
    for (const [sId, act] of inMemoryActive.entries()) {
      const hbMs = new Date(act.lastHeartbeat).getTime();
      if (nowMs - hbMs > 600000) {
        inMemoryActive.delete(sId);
        const st = inMemorySessions.get(sId);
        if (st) {
          st.isLive = false;
          st.endedAt = now;
          // Send session summary if visitor had meaningful interaction
          if (st.eventsCount >= 3 || st.pageViewsCount >= 2 || st.hasStartedPlanner) {
            sendSessionSummaryTelegramAlert({
              visitorId: st.visitorId,
              sessionId: st.sessionId,
              durationSeconds: st.durationSeconds,
              pagesCount: st.pageViewsCount,
              eventsCount: st.eventsCount,
              entryPath: st.entryPath,
              exitPath: st.exitPath || st.entryPath,
              source: st.source,
              deviceType: st.deviceType,
              journeyNumbered: st.journeyTrail.map(
                (j, idx) => `${String(idx + 1).padStart(2, "0")} ${j.page}`
              ),
              commercialActions: [
                st.hasComparedAircraft ? "Aircraft comparison" : null,
                st.hasStartedPlanner ? "Flight planner" : null,
                st.hasStartedForm ? "Request started" : null,
                st.hasSubmittedLead ? "Lead submitted" : null,
              ].filter(Boolean) as string[],
              leadSubmitted: st.hasSubmittedLead,
            }).catch((e) => console.error("[TELEGRAM SUMMARY ERROR]", e));
          }
        }
      }
    }
  }

  /**
   * Returns current active live visitors
   */
  static getActiveVisitors(): ActiveVisitorState[] {
    return Array.from(inMemoryActive.values()).sort(
      (a, b) => new Date(b.lastHeartbeat).getTime() - new Date(a.lastHeartbeat).getTime()
    );
  }

  /**
   * Helper: Persist visitor and session record to Supabase
   */
  private static async persistVisitorAndSession(
    visitor: VisitorRecord,
    session: SessionRecord
  ): Promise<void> {
    const admin = createAdminClient();
    if (!admin) return;

    try {
      await admin.from("air_visitors").upsert(
        {
          visitor_id: visitor.visitorId,
          user_id: visitor.userId,
          lead_id: visitor.leadId,
          is_authenticated: visitor.isAuthenticated,
          first_seen_at: visitor.firstSeenAt,
          last_seen_at: visitor.lastSeenAt,
          total_sessions: visitor.totalSessions,
          total_page_views: visitor.totalPageViews,
          total_events: visitor.totalEvents,
          first_source: visitor.firstSource,
          first_medium: visitor.firstMedium,
          first_campaign: visitor.firstCampaign,
          first_referrer: visitor.firstReferrer,
          first_landing_page: visitor.firstLandingPage,
          last_source: visitor.lastSource,
          last_medium: visitor.lastMedium,
          last_campaign: visitor.lastCampaign,
          last_landing_page: visitor.lastLandingPage,
          primary_device: visitor.primaryDevice,
          primary_os: visitor.primaryOs,
          primary_browser: visitor.primaryBrowser,
          country: visitor.country,
          region: visitor.region,
          city: visitor.city,
          timezone: visitor.timezone,
          commercial_score: visitor.commercialScore,
          intent_level: visitor.intentLevel,
          consent_status: visitor.consentStatus,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "visitor_id" }
      );

      await admin.from("air_sessions").upsert(
        {
          session_id: session.sessionId,
          visitor_id: session.visitorId,
          session_number: session.sessionNumber,
          started_at: session.startedAt,
          last_active_at: session.lastActiveAt,
          duration_seconds: session.durationSeconds,
          is_bounce: session.isBounce,
          page_views_count: session.pageViewsCount,
          events_count: session.eventsCount,
          entry_path: session.entryPath,
          exit_path: session.exitPath,
          referrer: session.referrer,
          referrer_host: session.referrerHost,
          utm_source: session.utmSource,
          utm_medium: session.utmMedium,
          utm_campaign: session.utmCampaign,
          utm_content: session.utmContent,
          utm_term: session.utmTerm,
          source: session.source,
          medium: session.medium,
          device_type: session.deviceType,
          os: session.os,
          browser: session.browser,
          viewport_width: session.viewportWidth,
          viewport_height: session.viewportHeight,
          screen_width: session.screenWidth,
          screen_height: session.screenHeight,
          language: session.language,
          country: session.country,
          region: session.region,
          city: session.city,
          timezone: session.timezone,
          user_id: session.userId,
          lead_id: session.leadId,
          commercial_score: session.commercialScore,
          intent_level: session.intentLevel,
          has_started_planner: session.hasStartedPlanner,
          has_selected_route: session.hasSelectedRoute,
          has_viewed_aircraft: session.hasViewedAircraft,
          has_compared_aircraft: session.hasComparedAircraft,
          has_started_form: session.hasStartedForm,
          has_submitted_lead: session.hasSubmittedLead,
          is_live: session.isLive,
          journey_trail: session.journeyTrail,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "session_id" }
      );
    } catch (err) {
      console.warn("[SUPABASE PERSIST EXCEPTION]", err);
    }
  }

  /**
   * Helper: Persist single event to Supabase
   */
  private static async persistEvent(event: TelemetryEvent): Promise<void> {
    const admin = createAdminClient();
    if (!admin) return;

    try {
      await admin.from("air_events").insert({
        event_id: event.eventId,
        session_id: event.sessionId,
        visitor_id: event.visitorId,
        event_name: event.eventName,
        event_category: event.eventCategory,
        timestamp: event.timestamp,
        page_path: event.pagePath,
        page_title: event.pageTitle,
        component_id: event.componentId,
        cta_name: event.ctaName,
        route_context: event.routeContext,
        payload: event.payload || {},
        duration_from_session_start: event.durationFromSessionStart || 0,
      });
    } catch (err) {
      console.warn("[SUPABASE INSERT EVENT EXCEPTION]", err);
    }
  }
}
