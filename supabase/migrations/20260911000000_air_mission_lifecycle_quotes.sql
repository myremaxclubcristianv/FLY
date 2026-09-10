-- AIR Phase 9: Real Mission Request Lifecycle, Sourcing & Quote Schema
-- Establishes persistent tables for flight missions, quotes, and audit timelines with secure RLS

-- 1. Mission Requests Table
CREATE TABLE IF NOT EXISTS public.client_mission_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reference_id VARCHAR(64) UNIQUE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    user_email VARCHAR(255) NOT NULL,
    user_name VARCHAR(255),
    user_phone VARCHAR(64),
    origin_name VARCHAR(255) NOT NULL,
    origin_icao VARCHAR(8),
    destination_name VARCHAR(255) NOT NULL,
    destination_icao VARCHAR(8),
    trip_type VARCHAR(32) NOT NULL DEFAULT 'ONE_WAY',
    departure_date DATE NOT NULL,
    return_date DATE,
    preferred_time VARCHAR(32),
    date_flexibility VARCHAR(32) NOT NULL DEFAULT 'EXACT',
    passenger_count INT NOT NULL DEFAULT 1,
    budget_preference VARCHAR(32) NOT NULL DEFAULT 'STANDARD_CHARTER',
    priority VARCHAR(32) NOT NULL DEFAULT 'FASTEST',
    purpose VARCHAR(32) NOT NULL DEFAULT 'EXECUTIVE_BUSINESS',
    special_requirements TEXT[] DEFAULT '{}',
    client_notes TEXT,
    lifecycle_status VARCHAR(32) NOT NULL DEFAULT 'REQUESTED',
    status_label VARCHAR(255) NOT NULL DEFAULT 'Mission Logged // Sourcing Dispatch Initiated',
    assigned_advisor VARCHAR(255) DEFAULT 'AIR Operations Center (Bucharest)',
    recommended_aircraft VARCHAR(255),
    recommended_category VARCHAR(255),
    estimated_flight_time VARCHAR(64),
    recommendation_reason TEXT,
    constraints TEXT[] DEFAULT '{}',
    selected_quote_id UUID,
    air_review_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Mission Quotes Table
CREATE TABLE IF NOT EXISTS public.client_mission_quotes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mission_id UUID NOT NULL REFERENCES public.client_mission_requests(id) ON DELETE CASCADE,
    operator_id UUID,
    operator_legal_name VARCHAR(255) NOT NULL,
    operator_brand VARCHAR(255) NOT NULL,
    aoc_number VARCHAR(64) NOT NULL,
    aircraft_model VARCHAR(255) NOT NULL,
    aircraft_category VARCHAR(64) NOT NULL,
    tail_number VARCHAR(32),
    route VARCHAR(255) NOT NULL,
    departure_date TIMESTAMPTZ,
    return_date TIMESTAMPTZ,
    passenger_capacity INT NOT NULL DEFAULT 6,
    total_price NUMERIC(12, 2) NOT NULL,
    currency VARCHAR(8) NOT NULL DEFAULT 'EUR',
    price_formatted VARCHAR(64) NOT NULL,
    pricing_status VARCHAR(32) NOT NULL DEFAULT 'INDICATIVE',
    validity_until TIMESTAMPTZ NOT NULL,
    inclusions TEXT[] DEFAULT '{}',
    exclusions TEXT[] DEFAULT '{}',
    baggage_allowance VARCHAR(255),
    cancellation_policy TEXT,
    quote_status VARCHAR(32) NOT NULL DEFAULT 'RECEIVED',
    verification_status VARCHAR(32) NOT NULL DEFAULT 'OFFICIAL_SOURCE',
    source_attribution VARCHAR(255) NOT NULL,
    received_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    reviewed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Mission Timeline Audit Log
CREATE TABLE IF NOT EXISTS public.client_mission_timeline (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mission_id UUID NOT NULL REFERENCES public.client_mission_requests(id) ON DELETE CASCADE,
    event_timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    event_title VARCHAR(255) NOT NULL,
    actor_type VARCHAR(32) NOT NULL DEFAULT 'SYSTEM',
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Enable RLS
ALTER TABLE public.client_mission_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_mission_quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_mission_timeline ENABLE ROW LEVEL SECURITY;

-- 5. Secure Row Level Security Policies
-- Users can view and create their own mission requests
CREATE POLICY "Users can view own mission requests"
    ON public.client_mission_requests
    FOR SELECT
    USING (
        auth.uid() = user_id OR
        user_email = (SELECT email FROM auth.users WHERE id = auth.uid()) OR
        auth.jwt()->>'role' = 'service_role' OR
        auth.jwt()->>'role' = 'admin'
    );

CREATE POLICY "Users can insert own mission requests"
    ON public.client_mission_requests
    FOR INSERT
    WITH CHECK (
        auth.uid() = user_id OR
        auth.uid() IS NOT NULL OR
        auth.jwt()->>'role' = 'service_role'
    );

CREATE POLICY "Users can view quotes for their own missions"
    ON public.client_mission_quotes
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.client_mission_requests
            WHERE client_mission_requests.id = client_mission_quotes.mission_id
            AND (
                client_mission_requests.user_id = auth.uid() OR
                client_mission_requests.user_email = (SELECT email FROM auth.users WHERE id = auth.uid()) OR
                auth.jwt()->>'role' = 'service_role' OR
                auth.jwt()->>'role' = 'admin'
            )
            AND client_mission_quotes.quote_status IN ('PRESENTED', 'ACCEPTED')
        )
    );

CREATE POLICY "Users can view timeline for their own missions"
    ON public.client_mission_timeline
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.client_mission_requests
            WHERE client_mission_requests.id = client_mission_timeline.mission_id
            AND (
                client_mission_requests.user_id = auth.uid() OR
                client_mission_requests.user_email = (SELECT email FROM auth.users WHERE id = auth.uid()) OR
                auth.jwt()->>'role' = 'service_role'
            )
        )
    );
