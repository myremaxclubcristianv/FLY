"use client";

import React, { Suspense } from "react";
import { useVisitorJourneyTracking } from "@/lib/telemetry/hooks";
import { ConsentBanner } from "./ConsentBanner";

function JourneyTrackerInner() {
  useVisitorJourneyTracking();
  return null;
}

export function VisitorTracker() {
  return (
    <>
      <Suspense fallback={null}>
        <JourneyTrackerInner />
      </Suspense>
      <ConsentBanner />
    </>
  );
}
