-- ============================================================================
-- AIR — Visitor Intelligence & Telegram Customer Journey Database Schema
-- Production-grade first-party telemetry, session tracking & attribution model
-- ============================================================================

-- Enable UUID extension if not present
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ----------------------------------------------------------------------------
-- 1. Visitors Table (Unique first-party visitor entity)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.air_visitors (
    visitor_id TEXT PRIMARY KEY,                       -- e.g. 'V-8F31A2D9'
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    lead_id TEXT,                                      -- Linked lead if submitted
    is_authenticated BOOLEAN NOT NULL DEFAULT FALSE,
    auth_email TEXT,
    first_seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    total_sessions INT NOT NULL DEFAULT 1,
    total_page_views INT NOT NULL DEFAULT 1,
    total_events INT NOT NULL DEFAULT 1,
    first_source TEXT DEFAULT 'Direct',
    first_medium TEXT DEFAULT 'direct',
    first_campaign TEXT,
    first_referrer TEXT,
    first_landing_page TEXT DEFAULT '/',
    last_source TEXT DEFAULT 'Direct',
    last_medium TEXT DEFAULT 'direct',
    last_campaign TEXT,
    last_referrer TEXT,
    last_landing_page TEXT DEFAULT '/',
    primary_device TEXT,
    primary_os TEXT,
    primary_browser TEXT,
    country TEXT,
    region TEXT,
    city TEXT,
    timezone TEXT DEFAULT 'Europe/Bucharest',
    commercial_score INT NOT NULL DEFAULT 0,
    intent_level TEXT NOT NULL DEFAULT 'CASUAL' CHECK (intent_level IN ('CASUAL', 'INTERESTED', 'ENGAGED', 'HIGH_INTENT', 'LEAD_CONVERTED')),
    consent_status TEXT NOT NULL DEFAULT 'GRANTED' CHECK (consent_status IN ('GRANTED', 'DENIED', 'PENDING', 'ESSENTIAL_ONLY')),
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_air_visitors_user_id ON public.air_visitors(user_id);
CREATE INDEX IF NOT EXISTS idx_air_visitors_first_seen ON public.air_visitors(first_seen_at DESC);
CREATE INDEX IF NOT EXISTS idx_air_visitors_last_seen ON public.air_visitors(last_seen_at DESC);
CREATE INDEX IF NOT EXISTS idx_air_visitors_intent_level ON public.air_visitors(intent_level);
CREATE INDEX IF NOT EXISTS idx_air_visitors_first_source ON public.air_visitors(first_source);

-- ----------------------------------------------------------------------------
-- 2. Sessions Table (Visit journeys & attribution)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.air_sessions (
    session_id TEXT PRIMARY KEY,                       -- e.g. 'S-91KD82FA'
    visitor_id TEXT NOT NULL REFERENCES public.air_visitors(visitor_id) ON DELETE CASCADE,
    session_number INT NOT NULL DEFAULT 1,
    started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    ended_at TIMESTAMPTZ,
    last_active_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    duration_seconds INT NOT NULL DEFAULT 0,
    is_bounce BOOLEAN NOT NULL DEFAULT TRUE,
    page_views_count INT NOT NULL DEFAULT 1,
    events_count INT NOT NULL DEFAULT 1,
    entry_path TEXT NOT NULL DEFAULT '/',
    exit_path TEXT DEFAULT '/',
    referrer TEXT,
    referrer_host TEXT,
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    utm_content TEXT,
    utm_term TEXT,
    source TEXT NOT NULL DEFAULT 'Direct',
    medium TEXT NOT NULL DEFAULT 'direct',
    device_type TEXT DEFAULT 'Desktop',
    os TEXT,
    browser TEXT,
    viewport_width INT,
    viewport_height INT,
    screen_width INT,
    screen_height INT,
    language TEXT DEFAULT 'ro-RO',
    country TEXT,
    region TEXT,
    city TEXT,
    timezone TEXT DEFAULT 'Europe/Bucharest',
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    lead_id TEXT,
    commercial_score INT NOT NULL DEFAULT 0,
    intent_level TEXT NOT NULL DEFAULT 'CASUAL' CHECK (intent_level IN ('CASUAL', 'INTERESTED', 'ENGAGED', 'HIGH_INTENT', 'LEAD_CONVERTED')),
    has_started_planner BOOLEAN NOT NULL DEFAULT FALSE,
    has_selected_route BOOLEAN NOT NULL DEFAULT FALSE,
    has_viewed_aircraft BOOLEAN NOT NULL DEFAULT FALSE,
    has_compared_aircraft BOOLEAN NOT NULL DEFAULT FALSE,
    has_started_form BOOLEAN NOT NULL DEFAULT FALSE,
    has_submitted_lead BOOLEAN NOT NULL DEFAULT FALSE,
    is_live BOOLEAN NOT NULL DEFAULT TRUE,
    journey_trail JSONB NOT NULL DEFAULT '[]'::jsonb,
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_air_sessions_visitor_id ON public.air_sessions(visitor_id);
CREATE INDEX IF NOT EXISTS idx_air_sessions_started_at ON public.air_sessions(started_at DESC);
CREATE INDEX IF NOT EXISTS idx_air_sessions_last_active ON public.air_sessions(last_active_at DESC);
CREATE INDEX IF NOT EXISTS idx_air_sessions_source ON public.air_sessions(source);
CREATE INDEX IF NOT EXISTS idx_air_sessions_campaign ON public.air_sessions(utm_campaign);
CREATE INDEX IF NOT EXISTS idx_air_sessions_intent ON public.air_sessions(intent_level);
CREATE INDEX IF NOT EXISTS idx_air_sessions_is_live ON public.air_sessions(is_live);

-- ----------------------------------------------------------------------------
-- 3. Events Table (Structured event taxonomy & clickstream)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.air_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id TEXT NOT NULL UNIQUE,                     -- e.g. 'E-19A2BC84'
    session_id TEXT NOT NULL REFERENCES public.air_sessions(session_id) ON DELETE CASCADE,
    visitor_id TEXT NOT NULL REFERENCES public.air_visitors(visitor_id) ON DELETE CASCADE,
    event_name TEXT NOT NULL,                          -- e.g. 'planner_route_selected', 'cta_click'
    event_category TEXT NOT NULL DEFAULT 'INTERACTION', -- 'NAVIGATION', 'COMMERCIAL', 'FORM', 'ENGAGEMENT', 'SYSTEM'
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    page_path TEXT NOT NULL DEFAULT '/',
    page_title TEXT,
    component_id TEXT,
    cta_name TEXT,
    route_context TEXT,
    payload JSONB NOT NULL DEFAULT '{}'::jsonb,
    duration_from_session_start INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_air_events_session_id ON public.air_events(session_id);
CREATE INDEX IF NOT EXISTS idx_air_events_visitor_id ON public.air_events(visitor_id);
CREATE INDEX IF NOT EXISTS idx_air_events_name ON public.air_events(event_name);
CREATE INDEX IF NOT EXISTS idx_air_events_timestamp ON public.air_events(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_air_events_category ON public.air_events(event_category);
CREATE INDEX IF NOT EXISTS idx_air_events_page_path ON public.air_events(page_path);

-- ----------------------------------------------------------------------------
-- 4. Leads Attribution Table (Real Commercial Inquiries)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.air_leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reference_id TEXT NOT NULL UNIQUE,                 -- e.g. 'AIR-2026-F892A1'
    visitor_id TEXT REFERENCES public.air_visitors(visitor_id) ON DELETE SET NULL,
    session_id TEXT REFERENCES public.air_sessions(session_id) ON DELETE SET NULL,
    lead_type TEXT NOT NULL DEFAULT 'FLIGHT_REQUEST',
    name TEXT,
    email TEXT,
    phone TEXT,
    origin TEXT,
    destination TEXT,
    passengers INT DEFAULT 1,
    trip_type TEXT DEFAULT 'ONE_WAY',
    departure_date TEXT,
    return_date TEXT,
    budget_preference TEXT,
    priority TEXT,
    purpose TEXT,
    notes TEXT,
    source TEXT DEFAULT 'Direct',
    medium TEXT DEFAULT 'direct',
    campaign TEXT,
    landing_page TEXT DEFAULT '/',
    pages_before_conversion INT DEFAULT 1,
    session_duration_seconds INT DEFAULT 0,
    journey_summary JSONB NOT NULL DEFAULT '[]'::jsonb,
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_air_leads_ref ON public.air_leads(reference_id);
CREATE INDEX IF NOT EXISTS idx_air_leads_visitor ON public.air_leads(visitor_id);
CREATE INDEX IF NOT EXISTS idx_air_leads_session ON public.air_leads(session_id);
CREATE INDEX IF NOT EXISTS idx_air_leads_created_at ON public.air_leads(created_at DESC);

-- ----------------------------------------------------------------------------
-- 5. Active Live Visitors Table (Real-time presence registry & heartbeats)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.air_active_visitors (
    session_id TEXT PRIMARY KEY REFERENCES public.air_sessions(session_id) ON DELETE CASCADE,
    visitor_id TEXT NOT NULL REFERENCES public.air_visitors(visitor_id) ON DELETE CASCADE,
    started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_heartbeat TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    current_page TEXT NOT NULL DEFAULT '/',
    current_section TEXT,
    recent_actions JSONB NOT NULL DEFAULT '[]'::jsonb,
    device_summary TEXT DEFAULT 'Desktop',
    source_summary TEXT DEFAULT 'Direct',
    location_summary TEXT,
    active_duration_seconds INT DEFAULT 0,
    has_commercial_intent BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_air_active_heartbeat ON public.air_active_visitors(last_heartbeat DESC);

-- ----------------------------------------------------------------------------
-- 6. Notification History Table (Deduplication & Throttling)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.air_notification_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id TEXT,
    visitor_id TEXT,
    notification_type TEXT NOT NULL,                   -- 'NEW_VISITOR', 'RETURNING_VISITOR', 'HIGH_INTENT', 'NEW_LEAD', 'CTA_CLICK', 'PAGE_VIEW', 'SESSION_SUMMARY'
    priority TEXT NOT NULL DEFAULT 'P3',               -- 'P0', 'P1', 'P2', 'P3', 'P4'
    telegram_message_id BIGINT,
    dedup_key TEXT UNIQUE,
    payload_summary JSONB DEFAULT '{}'::jsonb,
    sent_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_air_notification_session ON public.air_notification_history(session_id);
CREATE INDEX IF NOT EXISTS idx_air_notification_sent ON public.air_notification_history(sent_at DESC);
CREATE INDEX IF NOT EXISTS idx_air_notification_dedup ON public.air_notification_history(dedup_key);

-- ----------------------------------------------------------------------------
-- 7. Row Level Security (RLS) Configuration
-- ----------------------------------------------------------------------------
ALTER TABLE public.air_visitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.air_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.air_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.air_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.air_active_visitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.air_notification_history ENABLE ROW LEVEL SECURITY;

-- Allow anonymous ingestion via service role API routes (Server-side privileged execution)
CREATE POLICY "Service role full access air_visitors" ON public.air_visitors USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access air_sessions" ON public.air_sessions USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access air_events" ON public.air_events USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access air_leads" ON public.air_leads USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access air_active_visitors" ON public.air_active_visitors USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access air_notification_history" ON public.air_notification_history USING (auth.role() = 'service_role');
