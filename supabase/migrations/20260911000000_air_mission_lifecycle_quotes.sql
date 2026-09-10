-- AIR Phase 9: Real Mission Request Lifecycle, Sourcing & Quote Schema
-- Establishes persistent tables for flight missions, quotes, and audit timelines with hardened RLS

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
    trip_type VARCHAR(32) NOT NULL DEFAULT 'ONE_WAY' CHECK (trip_type IN ('ONE_WAY', 'ROUND_TRIP', 'MULTI_LEG')),
    departure_date DATE NOT NULL,
    return_date DATE,
    preferred_time VARCHAR(32),
    date_flexibility VARCHAR(32) NOT NULL DEFAULT 'EXACT' CHECK (date_flexibility IN ('EXACT', 'PLUS_MINUS_1_DAY', 'PLUS_MINUS_3_DAYS', 'FLEXIBLE_WEEK')),
    passenger_count INT NOT NULL DEFAULT 1 CHECK (passenger_count >= 1),
    budget_preference VARCHAR(32) NOT NULL DEFAULT 'STANDARD_CHARTER' CHECK (budget_preference IN ('STANDARD_CHARTER', 'SUPERIOR_COMFORT', 'ULTRA_LONG_RANGE', 'OPEN')),
    priority VARCHAR(32) NOT NULL DEFAULT 'FASTEST' CHECK (priority IN ('FASTEST', 'BEST_VALUE', 'MOST_COMFORTABLE', 'MOST_PRIVATE', 'MOST_MEMORABLE')),
    purpose VARCHAR(32) NOT NULL DEFAULT 'EXECUTIVE_BUSINESS' CHECK (purpose IN ('EXECUTIVE_BUSINESS', 'PRIVATE_LEISURE', 'MEDEVAC', 'SPECIAL_MISSION')),
    special_requirements TEXT[] DEFAULT '{}',
    client_notes TEXT,
    lifecycle_status VARCHAR(32) NOT NULL DEFAULT 'REQUESTED' CHECK (lifecycle_status IN ('REQUESTED', 'SOURCING', 'QUOTES_RECEIVED', 'AIR_REVIEW', 'PRESENTED', 'CONFIRMED', 'CANCELLED')),
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
    passenger_capacity INT NOT NULL DEFAULT 6 CHECK (passenger_capacity >= 1),
    total_price NUMERIC(12, 2) NOT NULL CHECK (total_price >= 0),
    currency VARCHAR(8) NOT NULL DEFAULT 'EUR',
    price_formatted VARCHAR(64) NOT NULL,
    pricing_status VARCHAR(32) NOT NULL DEFAULT 'INDICATIVE' CHECK (pricing_status IN ('INDICATIVE', 'REQUEST', 'LIVE')),
    validity_until TIMESTAMPTZ NOT NULL,
    inclusions TEXT[] DEFAULT '{}',
    exclusions TEXT[] DEFAULT '{}',
    baggage_allowance VARCHAR(255),
    cancellation_policy TEXT,
    quote_status VARCHAR(32) NOT NULL DEFAULT 'RECEIVED' CHECK (quote_status IN ('RECEIVED', 'UNDER_REVIEW', 'PRESENTED', 'ACCEPTED', 'DECLINED', 'EXPIRED')),
    verification_status VARCHAR(32) NOT NULL DEFAULT 'OFFICIAL_SOURCE' CHECK (verification_status IN ('OFFICIAL_SOURCE', 'VERIFIED', 'PUBLIC', 'INDICATIVE', 'SIMULATED / ARCHIVE')),
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
    actor_type VARCHAR(32) NOT NULL DEFAULT 'SYSTEM' CHECK (actor_type IN ('CUSTOMER', 'OPERATOR', 'AIR_OPS', 'DECISION_ENGINE', 'SYSTEM')),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Essential Performance & Foreign Key Indexes
CREATE INDEX IF NOT EXISTS idx_mission_requests_reference ON public.client_mission_requests(reference_id);
CREATE INDEX IF NOT EXISTS idx_mission_requests_user_id ON public.client_mission_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_mission_requests_user_email ON public.client_mission_requests(user_email);
CREATE INDEX IF NOT EXISTS idx_mission_requests_status ON public.client_mission_requests(lifecycle_status);
CREATE INDEX IF NOT EXISTS idx_mission_requests_created_at ON public.client_mission_requests(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_mission_quotes_mission_id ON public.client_mission_quotes(mission_id);
CREATE INDEX IF NOT EXISTS idx_mission_quotes_status ON public.client_mission_quotes(quote_status);

CREATE INDEX IF NOT EXISTS idx_mission_timeline_mission_id ON public.client_mission_timeline(mission_id);
CREATE INDEX IF NOT EXISTS idx_mission_timeline_timestamp ON public.client_mission_timeline(event_timestamp DESC);

-- 5. Enable Row Level Security (RLS) on all tables
ALTER TABLE public.client_mission_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_mission_quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_mission_timeline ENABLE ROW LEVEL SECURITY;

-- 6. Helper Functions for Role Resolution
CREATE OR REPLACE FUNCTION public.is_air_operations()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN (
        auth.jwt()->>'role' IN ('service_role', 'admin', 'ops', 'air_operations') OR
        (auth.jwt()->'app_metadata'->>'role') IN ('admin', 'ops', 'air_operations')
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7. Hardened Row Level Security Policies

-- A. Mission Requests Policies
CREATE POLICY "Clients can view only their own mission requests"
    ON public.client_mission_requests
    FOR SELECT
    USING (
        (auth.uid() IS NOT NULL AND auth.uid() = user_id) OR
        (auth.uid() IS NOT NULL AND user_email = (SELECT email FROM auth.users WHERE id = auth.uid())) OR
        public.is_air_operations()
    );

CREATE POLICY "Clients can create their own mission requests in REQUESTED state"
    ON public.client_mission_requests
    FOR INSERT
    WITH CHECK (
        (
            auth.uid() IS NOT NULL AND
            auth.uid() = user_id AND
            lifecycle_status = 'REQUESTED'
        ) OR
        public.is_air_operations()
    );

CREATE POLICY "Clients can update only selected quote or notes on their own missions"
    ON public.client_mission_requests
    FOR UPDATE
    USING (
        (auth.uid() IS NOT NULL AND auth.uid() = user_id) OR
        public.is_air_operations()
    )
    WITH CHECK (
        public.is_air_operations() OR
        (
            auth.uid() IS NOT NULL AND
            auth.uid() = user_id AND
            -- Prevent clients from modifying advisor, review notes, or arbitrarily jumping lifecycle status
            (lifecycle_status IN ('PRESENTED', 'CONFIRMED', 'CANCELLED'))
        )
    );

CREATE POLICY "Only operations or admin can delete mission requests"
    ON public.client_mission_requests
    FOR DELETE
    USING (public.is_air_operations());

-- B. Mission Quotes Policies
CREATE POLICY "Clients can view only presented or accepted quotes for their own missions"
    ON public.client_mission_quotes
    FOR SELECT
    USING (
        public.is_air_operations() OR
        (
            quote_status IN ('PRESENTED', 'ACCEPTED') AND
            EXISTS (
                SELECT 1 FROM public.client_mission_requests
                WHERE client_mission_requests.id = client_mission_quotes.mission_id
                AND (
                    client_mission_requests.user_id = auth.uid() OR
                    client_mission_requests.user_email = (SELECT email FROM auth.users WHERE id = auth.uid())
                )
            )
        )
    );

CREATE POLICY "Only operations or service role can insert quotes"
    ON public.client_mission_quotes
    FOR INSERT
    WITH CHECK (public.is_air_operations());

CREATE POLICY "Only operations or service role can update quotes"
    ON public.client_mission_quotes
    FOR UPDATE
    USING (public.is_air_operations())
    WITH CHECK (public.is_air_operations());

CREATE POLICY "Only operations or service role can delete quotes"
    ON public.client_mission_quotes
    FOR DELETE
    USING (public.is_air_operations());

-- C. Mission Timeline Policies
CREATE POLICY "Clients can view timeline for their own missions"
    ON public.client_mission_timeline
    FOR SELECT
    USING (
        public.is_air_operations() OR
        EXISTS (
            SELECT 1 FROM public.client_mission_requests
            WHERE client_mission_requests.id = client_mission_timeline.mission_id
            AND (
                client_mission_requests.user_id = auth.uid() OR
                client_mission_requests.user_email = (SELECT email FROM auth.users WHERE id = auth.uid())
            )
        )
    );

CREATE POLICY "Only operations or system service role can record timeline events"
    ON public.client_mission_timeline
    FOR INSERT
    WITH CHECK (public.is_air_operations());

-- Timeline events are immutable: no client or ops update/delete
CREATE POLICY "Timeline audit logs are strictly immutable"
    ON public.client_mission_timeline
    FOR UPDATE
    USING (false);

CREATE POLICY "Timeline audit logs cannot be deleted"
    ON public.client_mission_timeline
    FOR DELETE
    USING (false);
