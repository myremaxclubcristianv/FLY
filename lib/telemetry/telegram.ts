/**
 * AIR Telegram Operational Command Center Gateway
 * Formats and dispatches structured, priority-ranked Telegram intelligence alerts.
 */

import {
  VisitorRecord,
  SessionRecord,
  LeadSubmissionPayload,
} from "./types";

const CANONICAL_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://fly.cristianvaduva.com";

// In-memory deduplication cache for serverless invocation lifecycle
const dedupCache = new Map<string, number>();

function escapeHtml(text: string | null | undefined): string {
  if (!text) return "—";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function formatBucharestTime(dateInput?: string | Date): string {
  const d = dateInput ? new Date(dateInput) : new Date();
  try {
    return new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Bucharest",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(d);
  } catch {
    return d.toISOString().replace("T", " ").substring(0, 19);
  }
}

export function formatBucharestDate(dateInput?: string | Date): string {
  const d = dateInput ? new Date(dateInput) : new Date();
  try {
    return new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Bucharest",
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(d);
  } catch {
    return d.toISOString().substring(0, 10);
  }
}

export function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins < 60) {
    return `${mins.toString().padStart(2, "0")}m ${secs.toString().padStart(2, "0")}s`;
  }
  const hrs = Math.floor(mins / 60);
  const remMins = mins % 60;
  return `${hrs}h ${remMins}m ${secs}s`;
}

/**
 * Sends a preformatted HTML message to the configured Telegram Chat/Channel
 */
export async function sendTelegramHtmlMessage(
  htmlText: string,
  dedupKey?: string,
  cooldownMs: number = 30000
): Promise<{ success: boolean; messageId?: number; throttled?: boolean; error?: string }> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId || botToken.trim() === "" || chatId.trim() === "") {
    console.warn(
      "[TELEGRAM GATEWAY] Missing or unconfigured TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID. Skipping Telegram alert."
    );
    return { success: false, error: "CREDENTIALS_MISSING" };
  }

  // Deduplication / Throttling check
  if (dedupKey) {
    const lastSent = dedupCache.get(dedupKey);
    const now = Date.now();
    if (lastSent && now - lastSent < cooldownMs) {
      return { success: true, throttled: true };
    }
    dedupCache.set(dedupKey, now);
    // Cleanup old keys
    if (dedupCache.size > 2000) {
      for (const [k, v] of dedupCache.entries()) {
        if (now - v > 3600000) dedupCache.delete(k);
      }
    }
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: htmlText,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok || !data || data.ok !== true) {
      console.error("[TELEGRAM GATEWAY FAILED]", {
        status: res.status,
        description: data?.description || "Unknown Telegram API error",
      });
      return {
        success: false,
        error: data?.description || `HTTP_${res.status}`,
      };
    }

    return { success: true, messageId: data.result?.message_id };
  } catch (err: unknown) {
    console.error("[TELEGRAM GATEWAY EXCEPTION]", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "NETWORK_EXCEPTION",
    };
  }
}

/**
 * 1. NEW VISITOR ALERT (P3)
 */
export async function sendNewVisitorTelegramAlert(params: {
  visitor: VisitorRecord;
  session: SessionRecord;
  firstVisibleSection?: string;
  initialCta?: string;
  intentSignals?: {
    route?: string;
    passengers?: number;
    tripType?: string;
    budget?: string;
    priority?: string;
    purpose?: string;
    requestStarted?: boolean;
  };
}) {
  const { visitor, session, firstVisibleSection, initialCta, intentSignals } = params;
  const timeStr = formatBucharestTime(session.startedAt);
  const locationStr = [session.city, session.country].filter(Boolean).join(", ") || "—";
  const viewportStr = session.viewportWidth && session.viewportHeight
    ? `${session.viewportWidth} × ${session.viewportHeight}`
    : "—";
  const screenStr = session.screenWidth && session.screenHeight
    ? `${session.screenWidth} × ${session.screenHeight}`
    : "—";

  const liveUrl = `${CANONICAL_SITE_URL}${session.entryPath}`;

  const text = `✈️ <b>AIR — NEW VISITOR</b>
━━━━━━━━━━━━━━━━━━
<b>VISITOR</b>
━━━━━━━━━━━━━━━━━━
Visitor: <i>${visitor.isAuthenticated && visitor.authEmail ? escapeHtml(visitor.authEmail) : "Anonymous"}</i>
Visitor ID: <code>${escapeHtml(visitor.visitorId)}</code>
Session: <code>${escapeHtml(session.sessionId)}</code>
Status: <b>NEW VISITOR</b>
First seen: ${timeStr}
Timezone: Europe/Bucharest

━━━━━━━━━━━━━━━━━━
<b>SOURCE</b>
━━━━━━━━━━━━━━━━━━
Source: <b>${escapeHtml(session.source)}</b>
Medium: ${escapeHtml(session.medium)}
Campaign: ${escapeHtml(session.utmCampaign || "—")}
Content: ${escapeHtml(session.utmContent || "—")}
Term: ${escapeHtml(session.utmTerm || "—")}
Referrer: ${escapeHtml(session.referrerHost || session.referrer || "Direct")}
Landing page: <code>${escapeHtml(session.entryPath)}</code>

━━━━━━━━━━━━━━━━━━
<b>LOCATION</b>
━━━━━━━━━━━━━━━━━━
Location: <b>${escapeHtml(locationStr)}</b>
Region: ${escapeHtml(session.region || "—")}
Timezone: ${escapeHtml(session.timezone || "Europe/Bucharest")}

━━━━━━━━━━━━━━━━━━
<b>DEVICE</b>
━━━━━━━━━━━━━━━━━━
Device: <b>${escapeHtml(session.deviceType)}</b>
OS: ${escapeHtml(session.os || "—")}
Browser: ${escapeHtml(session.browser || "—")}
Viewport: ${viewportStr}
Screen: ${screenStr}
Language: ${escapeHtml(session.language || "ro-RO")}

━━━━━━━━━━━━━━━━━━
<b>ENTRY</b>
━━━━━━━━━━━━━━━━━━
Landing page: <code>${escapeHtml(session.entryPath)}</code>
First visible section: ${escapeHtml(firstVisibleSection || "Hero Dispatch")}
Initial CTA: ${escapeHtml(initialCta || "—")}
Entry timestamp: ${timeStr}

━━━━━━━━━━━━━━━━━━
<b>INTENT SIGNALS</b>
━━━━━━━━━━━━━━━━━━
Flight route: ${escapeHtml(intentSignals?.route || "—")}
Passengers: ${intentSignals?.passengers ? intentSignals.passengers : "—"}
Trip type: ${escapeHtml(intentSignals?.tripType || "—")}
Budget: ${escapeHtml(intentSignals?.budget || "—")}
Priority: ${escapeHtml(intentSignals?.priority || "—")}
Purpose: ${escapeHtml(intentSignals?.purpose || "—")}
Request started: <b>${intentSignals?.requestStarted ? "YES" : "NO"}</b>

━━━━━━━━━━━━━━━━━━
<b>PRIVACY</b>
━━━━━━━━━━━━━━━━━━
Consent status: <b>${escapeHtml(visitor.consentStatus)}</b>
Tracking status: Active (1st-Party Privacy)
Authenticated: <b>${visitor.isAuthenticated ? "YES" : "NO"}</b>

LIVE: <a href="${liveUrl}">${liveUrl}</a>`;

  return sendTelegramHtmlMessage(text, `new_visitor_${session.sessionId}`, 3600000);
}

/**
 * 2. RETURNING VISITOR ALERT (P3)
 */
export async function sendReturningVisitorTelegramAlert(params: {
  visitor: VisitorRecord;
  session: SessionRecord;
  previousJourneySummary?: string;
}) {
  const { visitor, session, previousJourneySummary } = params;
  const firstSeenDate = formatBucharestDate(visitor.firstSeenAt);
  const lastSeenDate = formatBucharestDate(visitor.lastSeenAt);

  const text = `🔁 <b>AIR — RETURNING VISITOR</b>
━━━━━━━━━━━━━━━━━━
Visitor: <i>${visitor.isAuthenticated && visitor.authEmail ? escapeHtml(visitor.authEmail) : "Anonymous"}</i>
Visitor ID: <code>${escapeHtml(visitor.visitorId)}</code>
Session: <code>${escapeHtml(session.sessionId)}</code>
Previous sessions: <b>${visitor.totalSessions}</b>
First seen: ${firstSeenDate}
Last seen: ${lastSeenDate}

<b>ATTRIBUTION</b>
Current source: <b>${escapeHtml(session.source)}</b>
Previous source: ${escapeHtml(visitor.firstSource)}
Current landing page: <code>${escapeHtml(session.entryPath)}</code>
Previous meaningful journey:
<i>${escapeHtml(previousJourneySummary || `${visitor.firstLandingPage} → ${visitor.lastLandingPage}`)}</i>

<b>DEVICE & LOCATION</b>
Current device: <b>${escapeHtml(session.deviceType)} / ${escapeHtml(session.browser || "Browser")}</b>
OS: ${escapeHtml(session.os || "—")}
Location: ${escapeHtml([session.city, session.country].filter(Boolean).join(", ") || "—")}
Commercial score: <b>${visitor.commercialScore} pts</b> (${visitor.intentLevel})`;

  return sendTelegramHtmlMessage(text, `returning_visitor_${session.sessionId}`, 3600000);
}

/**
 * 3. PAGE VIEW EVENT (P4)
 */
export async function sendPageViewTelegramAlert(params: {
  visitorId: string;
  sessionId: string;
  pageTitle: string;
  pageUrl: string;
  previousUrl?: string;
  source: string;
  deviceSummary: string;
  sessionDurationSeconds: number;
  pagesViewedCount: number;
}) {
  const {
    visitorId,
    sessionId,
    pageTitle,
    pageUrl,
    previousUrl,
    source,
    deviceSummary,
    sessionDurationSeconds,
    pagesViewedCount,
  } = params;

  const text = `👀 <b>AIR — PAGE VIEW</b>
Visitor: <code>${escapeHtml(visitorId)}</code>
Session: <code>${escapeHtml(sessionId)}</code>

Page:
<b>${escapeHtml(pageTitle)}</b>
URL:
<code>${escapeHtml(pageUrl)}</code>
Previous:
<code>${escapeHtml(previousUrl || "Entry")}</code>

Time:
${formatBucharestTime()}
Source:
${escapeHtml(source)}
Device:
${escapeHtml(deviceSummary)}
Session duration:
${formatDuration(sessionDurationSeconds)}
Pages viewed:
<b>${pagesViewedCount}</b>`;

  return sendTelegramHtmlMessage(text, `pv_${sessionId}_${pageUrl}`, 60000);
}

/**
 * 4. IMPORTANT CTA / INTERACTION CLICK (P1)
 */
export async function sendCtaClickTelegramAlert(params: {
  visitorId: string;
  sessionId: string;
  ctaName: string;
  pagePath: string;
  context?: string;
  source: string;
  deviceType: string;
}) {
  const { visitorId, sessionId, ctaName, pagePath, context, source, deviceType } = params;

  const text = `🎯 <b>AIR — CTA CLICK</b>
Visitor: <code>${escapeHtml(visitorId)}</code>
Session: <code>${escapeHtml(sessionId)}</code>

CTA:
<b>"${escapeHtml(ctaName)}"</b>
Page:
<code>${escapeHtml(pagePath)}</code>

${context ? `Context:\n<i>${escapeHtml(context)}</i>\n` : ""}Source:
${escapeHtml(source)}
Device:
${escapeHtml(deviceType)}
Time:
${formatBucharestTime()}`;

  return sendTelegramHtmlMessage(text, `cta_${sessionId}_${ctaName}`, 15000);
}

/**
 * 5. FORM STARTED (P1)
 */
export async function sendFormStartedTelegramAlert(params: {
  visitorId: string;
  sessionId: string;
  formName: string;
  pagePath: string;
  completedFields: Record<string, boolean>;
}) {
  const { visitorId, sessionId, formName, pagePath, completedFields } = params;

  const fieldsText = Object.entries(completedFields)
    .map(([field, done]) => `${field} ${done ? "✓" : "—"}`)
    .join("\n");

  const text = `🟡 <b>AIR — FORM STARTED</b>
Visitor: <code>${escapeHtml(visitorId)}</code>
Session: <code>${escapeHtml(sessionId)}</code>

Form:
<b>${escapeHtml(formName)}</b>
Page:
<code>${escapeHtml(pagePath)}</code>

Fields completed:
${escapeHtml(fieldsText || "Initializing form...")}
Time:
${formatBucharestTime()}`;

  return sendTelegramHtmlMessage(text, `form_started_${sessionId}_${formName}`, 30000);
}

/**
 * 6. NEW LEAD / DIRECT CONTACT SUBMISSION (P0) - CRITICAL
 */
export async function sendContactLeadTelegramAlert(payload: LeadSubmissionPayload) {
  const duration = formatDuration(payload.sessionDurationSeconds || 0);
  const journeyText = payload.journeySummary && payload.journeySummary.length > 0
    ? payload.journeySummary.slice(-8).map((j) => `${escapeHtml(j)}`).join("\n")
    : `${escapeHtml(payload.landingPage || "/")} → Contact opened → Form submitted`;

  const viewportStr = payload.viewportWidth && payload.viewportHeight
    ? `${payload.viewportWidth} × ${payload.viewportHeight}`
    : "—";

  const openPageUrl = `${CANONICAL_SITE_URL}${payload.currentPage || payload.landingPage || "/"}`;

  const text = `🔴 <b>AIR — NEW LEAD</b>
━━━━━━━━━━━━━━━━━━
👤 <b>CONTACT</b>
━━━━━━━━━━━━━━━━━━
Name:
<b>${escapeHtml(payload.name || "Anonymous Contact")}</b>
Email:
<code>${escapeHtml(payload.email || "—")}</code>
Phone:
<code>${escapeHtml(payload.phone || "—")}</code>
Company:
${escapeHtml(payload.company || "—")}

━━━━━━━━━━━━━━━━━━
✈️ <b>INTEREST</b>
━━━━━━━━━━━━━━━━━━
Service:
<b>${escapeHtml(payload.serviceInterest || payload.leadType.replace(/_/g, " "))}</b>
Message:
<i>${escapeHtml(payload.message || payload.notes || "No message provided")}</i>

━━━━━━━━━━━━━━━━━━
🌍 <b>ATTRIBUTION</b>
━━━━━━━━━━━━━━━━━━
Source:
<b>${escapeHtml(payload.source || "Direct")}</b>
Medium:
${escapeHtml(payload.medium || "direct")}
Campaign:
${escapeHtml(payload.campaign || "—")}
Referrer:
${escapeHtml(payload.referrer || "Direct")}
Landing:
<code>${escapeHtml(payload.landingPage || "/")}</code>
Current page:
<code>${escapeHtml(payload.currentPage || "/contact")}</code>

━━━━━━━━━━━━━━━━━━
📱 <b>DEVICE</b>
━━━━━━━━━━━━━━━━━━
Device:
${escapeHtml(payload.deviceType || "Desktop")}
OS:
${escapeHtml(payload.os || "—")}
Browser:
${escapeHtml(payload.browser || "—")}
Viewport:
${viewportStr}

━━━━━━━━━━━━━━━━━━
📍 <b>LOCATION</b>
━━━━━━━━━━━━━━━━━━
Country:
${escapeHtml(payload.country || "Romania")}
City:
${escapeHtml(payload.city || "—")}

━━━━━━━━━━━━━━━━━━
🧭 <b>CUSTOMER JOURNEY</b>
━━━━━━━━━━━━━━━━━━
Visitor:
<code>${escapeHtml(payload.visitorId || "V-ANONYMOUS")}</code>
Session:
<code>${escapeHtml(payload.sessionId || "S-DIRECT")}</code>
Pages viewed:
<b>${payload.pagesBeforeConversion || 1}</b>
Session duration:
${duration}
Recent journey:
${journeyText}

━━━━━━━━━━━━━━━━━━
🎯 <b>LEAD STATUS</b>
━━━━━━━━━━━━━━━━━━
<b>${payload.leadStatus || "NEW"}</b>
Lead ID:
<code>${escapeHtml(payload.referenceId)}</code>
Created:
${formatBucharestTime()}

━━━━━━━━━━━━━━━━━━
🔗 <b>ACTION</b>
━━━━━━━━━━━━━━━━━━
Open page:
<a href="${openPageUrl}">${openPageUrl}</a>`;

  // P0 leads bypass any cool-down
  return sendTelegramHtmlMessage(text);
}

/**
 * 6B. NEW LEAD / FLIGHT REQUEST SUBMISSION (P0) - CRITICAL
 */
export async function sendNewLeadTelegramAlert(payload: LeadSubmissionPayload) {
  if (payload.leadType === "CONTACT_MESSAGE") {
    return sendContactLeadTelegramAlert(payload);
  }

  const duration = formatDuration(payload.sessionDurationSeconds || 0);

  const text = `🔴 <b>AIR — NEW LEAD</b>
━━━━━━━━━━━━━━━━━━
Visitor: <code>${escapeHtml(payload.visitorId || "V-ANONYMOUS")}</code>
Session: <code>${escapeHtml(payload.sessionId || "S-DIRECT")}</code>
Reference: <b>${escapeHtml(payload.referenceId)}</b>

<b>LEAD DETAILS</b>
Lead: <b>${escapeHtml(payload.leadType.replace(/_/g, " "))}</b>
Name: <b>${escapeHtml(payload.name || "Submitted Lead")}</b>
Email: <code>${escapeHtml(payload.email || "—")}</code>
Phone: <code>${escapeHtml(payload.phone || "—")}</code>
${payload.company ? `Company: ${escapeHtml(payload.company)}\n` : ""}
<b>MISSION PROFILE</b>
Route: <b>${escapeHtml(payload.origin || "LRBS")} → ${escapeHtml(payload.destination || "LFMN")}</b>
Passengers: <b>${payload.passengers || 1} PAX</b>
Trip: ${escapeHtml(payload.tripType || "ONE_WAY")}
Date: ${escapeHtml(payload.date || "—")}
Budget: ${escapeHtml(payload.budget || "STANDARD_CHARTER")}
Priority: ${escapeHtml(payload.priority || "FASTEST")}
Purpose: ${escapeHtml(payload.purpose || "EXECUTIVE_BUSINESS")}
${payload.notes ? `Notes: <i>${escapeHtml(payload.notes)}</i>\n` : ""}
<b>ATTRIBUTION & JOURNEY</b>
Source: <b>${escapeHtml(payload.source || "Direct")}</b>
Campaign: ${escapeHtml(payload.campaign || "—")}
Landing page: <code>${escapeHtml(payload.landingPage || "/plan")}</code>
Pages before conversion: <b>${payload.pagesBeforeConversion || 1}</b>
Session duration: <b>${duration}</b>
Submitted at: ${formatBucharestTime()}`;

  // P0 leads bypass any cool-down
  return sendTelegramHtmlMessage(text);
}

/**
 * 7. HIGH ENGAGEMENT / COMMERCIAL SIGNAL (P2)
 */
export async function sendHighEngagementTelegramAlert(params: {
  visitorId: string;
  sessionId: string;
  signals: string[];
  pagesCount: number;
  sessionDurationSeconds: number;
  source: string;
  currentPage: string;
  reason: string;
}) {
  const {
    visitorId,
    sessionId,
    signals,
    pagesCount,
    sessionDurationSeconds,
    source,
    currentPage,
    reason,
  } = params;

  const signalsText = signals.map((s) => `✓ ${s}`).join("\n");

  const text = `🔥 <b>AIR — HIGH ENGAGEMENT SIGNAL</b>
Visitor: <code>${escapeHtml(visitorId)}</code>
Session: <code>${escapeHtml(sessionId)}</code>

Signal level:
<b>HIGH ENGAGEMENT</b>

Observed signals:
${escapeHtml(signalsText)}

Pages:
<b>${pagesCount}</b>
Session:
${formatDuration(sessionDurationSeconds)}
Source:
${escapeHtml(source)}
Current page:
<code>${escapeHtml(currentPage)}</code>

Reason:
<i>${escapeHtml(reason)}</i>`;

  return sendTelegramHtmlMessage(text, `high_engagement_${sessionId}`, 3600000);
}

/**
 * 8. SESSION SUMMARY (P4)
 */
export async function sendSessionSummaryTelegramAlert(params: {
  visitorId: string;
  sessionId: string;
  durationSeconds: number;
  pagesCount: number;
  eventsCount: number;
  entryPath: string;
  exitPath: string;
  source: string;
  deviceType: string;
  journeyNumbered: string[];
  commercialActions: string[];
  leadSubmitted: boolean;
}) {
  const {
    visitorId,
    sessionId,
    durationSeconds,
    pagesCount,
    eventsCount,
    entryPath,
    exitPath,
    source,
    deviceType,
    journeyNumbered,
    commercialActions,
    leadSubmitted,
  } = params;

  const journeyText = journeyNumbered.slice(0, 10).join("\n");
  const commercialText =
    commercialActions.length > 0
      ? commercialActions.map((a) => `• ${a}`).join("\n")
      : "• General exploration";

  const text = `📊 <b>AIR — SESSION SUMMARY</b>
Visitor: <code>${escapeHtml(visitorId)}</code>
Session: <code>${escapeHtml(sessionId)}</code>

Session:
<b>${formatDuration(durationSeconds)}</b>
Pages:
${pagesCount}
Events:
${eventsCount}
Entry:
<code>${escapeHtml(entryPath)}</code>
Exit:
<code>${escapeHtml(exitPath)}</code>
Source:
${escapeHtml(source)}
Device:
${escapeHtml(deviceType)}

Journey:
${escapeHtml(journeyText || entryPath)}

Commercial actions:
${escapeHtml(commercialText)}

Lead:
<b>${leadSubmitted ? "YES ✓" : "NO"}</b>`;

  return sendTelegramHtmlMessage(text, `session_summary_${sessionId}`, 3600000);
}

/**
 * 9. LIVE VISITOR BATCH UPDATE (P4)
 */
export async function sendLiveVisitorTelegramAlert(params: {
  visitorId: string;
  sessionId: string;
  source: string;
  device: string;
  location: string;
  currentPage: string;
  lastActions: string[];
  activeDurationSeconds: number;
}) {
  const {
    visitorId,
    sessionId,
    source,
    device,
    location,
    currentPage,
    lastActions,
    activeDurationSeconds,
  } = params;

  const actionsText = lastActions.map((a) => `→ ${a}`).join("\n");

  const text = `📡 <b>AIR — LIVE VISITOR</b>
<code>${escapeHtml(visitorId)}</code>
Session <code>${escapeHtml(sessionId)}</code>
Source: <b>${escapeHtml(source)}</b>
Device: ${escapeHtml(device)}
Location: ${escapeHtml(location || "—")}

Currently:
<code>${escapeHtml(currentPage)}</code>

Last actions:
${escapeHtml(actionsText || "Active")}

Session:
<b>${formatDuration(activeDurationSeconds)}</b>`;

  return sendTelegramHtmlMessage(text, `live_update_${sessionId}`, 120000);
}
