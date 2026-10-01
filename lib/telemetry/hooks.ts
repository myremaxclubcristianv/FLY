"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { telemetryClient } from "./client";
import { TelemetryEventType, LeadSubmissionPayload } from "./types";

/**
 * Hook to automatically track page views and session registration on route transitions
 */
export function useVisitorJourneyTracking() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Initialize & Register session with entry or navigation path
    telemetryClient.registerSession(pathname);
    telemetryClient.trackPageView(pathname, document.title, document.referrer);
  }, [pathname, searchParams]);
}

/**
 * Hook to expose interaction tracking handlers for components
 */
export function useTelemetry() {
  return {
    trackCTA: (ctaName: string, path?: string, context?: string) => {
      telemetryClient.trackCTA(ctaName, path, context);
    },
    trackRouteSelection: (from: string, to: string, passengers: number, date?: string) => {
      telemetryClient.trackRouteSelection(from, to, passengers, date);
    },
    trackAircraftView: (aircraftSlug: string, modelName: string) => {
      telemetryClient.trackAircraftView(aircraftSlug, modelName);
    },
    trackAircraftCompare: (missionTitle: string, aircraftModels: string[]) => {
      telemetryClient.trackAircraftCompare(missionTitle, aircraftModels);
    },
    trackFormStart: (formName: string, completedFields: Record<string, boolean>) => {
      telemetryClient.trackFormStart(formName, completedFields);
    },
    trackLeadSubmission: (payload: LeadSubmissionPayload) => {
      telemetryClient.trackLeadSubmission(payload);
    },
    trackCustomEvent: (
      eventName: TelemetryEventType,
      payload?: Record<string, unknown>,
      context?: string
    ) => {
      telemetryClient.trackEvent(eventName, { payload, routeContext: context });
    },
    getVisitorId: () => telemetryClient.getVisitorId(),
    getSessionId: () => telemetryClient.getSessionId(),
  };
}
