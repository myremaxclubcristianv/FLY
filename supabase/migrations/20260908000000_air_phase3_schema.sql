-- AIR — Phase 3 Database Schema Migration
-- Real Aviation Supply, Verification, Quoting, and CRM Infrastructure

-- Enable Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Data Sources (Provenance)
CREATE TABLE IF NOT EXISTS public.data_sources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('OFFICIAL', 'OPERATOR', 'PUBLIC', 'INTERNAL')),
    url TEXT,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Operators
CREATE TABLE IF NOT EXISTS public.operators (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT NOT NULL UNIQUE,
    legal_name TEXT NOT NULL,
    display_name TEXT NOT NULL,
    country TEXT NOT NULL DEFAULT 'Romania',
    base_location_id UUID,
    operator_type TEXT NOT NULL CHECK (operator_type IN ('CHARTER', 'HELICOPTER', 'EXECUTIVE_AVIATION', 'AIRCRAFT_MANAGEMENT', 'FLIGHT_SCHOOL', 'EXPERIENCE_PROVIDER', 'HANDLING', 'MAINTENANCE', 'OTHER')),
    website TEXT,
    verification_status TEXT NOT NULL DEFAULT 'REQUEST' CHECK (verification_status IN ('IDENTITY_CHECKED', 'DATA_VERIFIED', 'REQUEST', 'UNAVAILABLE')),
    data_status TEXT NOT NULL DEFAULT 'INDICATIVE' CHECK (data_status IN ('LIVE', 'VERIFIED', 'INDICATIVE', 'REQUEST', 'UNAVAILABLE', 'LAST_VERIFIED')),
    source_id UUID REFERENCES public.data_sources(id),
    last_verified_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_operators_slug ON public.operators(slug);
CREATE INDEX IF NOT EXISTS idx_operators_country ON public.operators(country);
CREATE INDEX IF NOT EXISTS idx_operators_type ON public.operators(operator_type);

-- 3. Aircraft
CREATE TABLE IF NOT EXISTS public.aircraft (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT NOT NULL UNIQUE,
    registration TEXT,
    manufacturer TEXT NOT NULL,
    model TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('HELICOPTER', 'VERY_LIGHT_JET', 'LIGHT_JET', 'MIDSIZE_JET', 'SUPER_MIDSIZE_JET', 'LARGE_CABIN_JET', 'TURBOPROP', 'EXECUTIVE_AIRCRAFT')),
    passenger_capacity INT NOT NULL DEFAULT 4,
    baggage_capacity TEXT,
    typical_cruise_speed INT,
    approximate_range INT,
    home_base_location_id UUID,
    operator_id UUID REFERENCES public.operators(id) ON DELETE SET NULL,
    verification_status TEXT NOT NULL DEFAULT 'REQUEST' CHECK (verification_status IN ('IDENTITY_CHECKED', 'DATA_VERIFIED', 'REQUEST', 'UNAVAILABLE')),
    data_status TEXT NOT NULL DEFAULT 'INDICATIVE' CHECK (data_status IN ('LIVE', 'VERIFIED', 'INDICATIVE', 'REQUEST', 'UNAVAILABLE', 'LAST_VERIFIED')),
    source_id UUID REFERENCES public.data_sources(id),
    last_verified_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_aircraft_slug ON public.aircraft(slug);
CREATE INDEX IF NOT EXISTS idx_aircraft_category ON public.aircraft(category);
CREATE INDEX IF NOT EXISTS idx_aircraft_operator ON public.aircraft(operator_id);

-- 4. Aviation Locations (Airports, Heliports, Pads)
CREATE TABLE IF NOT EXISTS public.aviation_locations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('AIRPORT', 'HELIPORT', 'AERODROME', 'FBO', 'PAD')),
    iata TEXT,
    icao TEXT,
    city TEXT NOT NULL,
    country TEXT NOT NULL DEFAULT 'Romania',
    latitude NUMERIC(10, 6),
    longitude NUMERIC(10, 6),
    operating_hours TEXT,
    restrictions TEXT[],
    verification_status TEXT NOT NULL DEFAULT 'REQUEST',
    data_status TEXT NOT NULL DEFAULT 'INDICATIVE',
    source_id UUID REFERENCES public.data_sources(id),
    last_verified_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_locations_slug ON public.aviation_locations(slug);
CREATE INDEX IF NOT EXISTS idx_locations_icao ON public.aviation_locations(icao);

-- 5. Experiences
CREATE TABLE IF NOT EXISTS public.experiences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    location_id UUID REFERENCES public.aviation_locations(id) ON DELETE SET NULL,
    duration TEXT,
    capacity INT,
    description TEXT NOT NULL,
    operator_id UUID REFERENCES public.operators(id) ON DELETE SET NULL,
    verification_status TEXT NOT NULL DEFAULT 'REQUEST',
    data_status TEXT NOT NULL DEFAULT 'REQUEST',
    source_id UUID REFERENCES public.data_sources(id),
    last_verified_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. Missions
CREATE TABLE IF NOT EXISTS public.missions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    origin TEXT NOT NULL,
    destination TEXT NOT NULL,
    date TEXT NOT NULL,
    preferred_time TEXT,
    passengers INT NOT NULL DEFAULT 1,
    priority TEXT NOT NULL DEFAULT 'FASTEST' CHECK (priority IN ('FASTEST', 'BEST_VALUE', 'MOST_COMFORTABLE', 'MOST_PRIVATE', 'MOST_MEMORABLE')),
    baggage TEXT,
    notes TEXT,
    status TEXT NOT NULL DEFAULT 'SUBMITTED' CHECK (status IN ('DRAFT', 'SUBMITTED', 'MATCHING', 'QUOTING', 'OPTIONS_READY', 'PRESENTED', 'ACCEPTED', 'CANCELLED')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_missions_status ON public.missions(status);

-- 7. Flight Options
CREATE TABLE IF NOT EXISTS public.flight_options (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mission_id UUID NOT NULL REFERENCES public.missions(id) ON DELETE CASCADE,
    aircraft_id UUID REFERENCES public.aircraft(id) ON DELETE SET NULL,
    operator_id UUID REFERENCES public.operators(id) ON DELETE SET NULL,
    routing TEXT NOT NULL,
    estimated_duration TEXT,
    pricing_status TEXT NOT NULL DEFAULT 'REQUEST' CHECK (pricing_status IN ('LIVE', 'INDICATIVE', 'REQUEST')),
    availability_status TEXT NOT NULL DEFAULT 'REQUEST' CHECK (availability_status IN ('AVAILABLE', 'REQUEST', 'UNAVAILABLE', 'UNKNOWN')),
    verification_status TEXT NOT NULL DEFAULT 'REQUEST',
    data_status TEXT NOT NULL DEFAULT 'INDICATIVE',
    recommendation_score INT DEFAULT 80,
    recommendation_reason TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_flight_options_mission ON public.flight_options(mission_id);

-- 8. Quote Requests (Private PII)
CREATE TABLE IF NOT EXISTS public.quote_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mission_id UUID NOT NULL REFERENCES public.missions(id) ON DELETE CASCADE,
    option_id UUID REFERENCES public.flight_options(id) ON DELETE SET NULL,
    operator_id UUID REFERENCES public.operators(id) ON DELETE SET NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT,
    status TEXT NOT NULL DEFAULT 'REQUESTED' CHECK (status IN ('DRAFT', 'REQUESTED', 'SENT', 'RECEIVED', 'UNDER_REVIEW', 'PRESENTED', 'ACCEPTED', 'DECLINED', 'EXPIRED', 'CANCELLED')),
    requested_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    response_deadline TIMESTAMPTZ,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_quote_requests_mission ON public.quote_requests(mission_id);
CREATE INDEX IF NOT EXISTS idx_quote_requests_status ON public.quote_requests(status);

-- 9. Quotes (Commercial)
CREATE TABLE IF NOT EXISTS public.quotes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quote_request_id UUID NOT NULL REFERENCES public.quote_requests(id) ON DELETE CASCADE,
    amount NUMERIC(12, 2),
    currency TEXT NOT NULL DEFAULT 'EUR',
    pricing_status TEXT NOT NULL DEFAULT 'REQUEST',
    valid_until TIMESTAMPTZ,
    estimated_duration TEXT,
    routing TEXT,
    aircraft_id UUID REFERENCES public.aircraft(id),
    received_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. Verification Records (Audit Trail)
CREATE TABLE IF NOT EXISTS public.verification_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entity_type TEXT NOT NULL,
    entity_id UUID NOT NULL,
    verification_type TEXT NOT NULL CHECK (verification_type IN ('IDENTITY', 'WEBSITE', 'AIRCRAFT', 'OPERATIONAL', 'DOCUMENT', 'DATA')),
    status TEXT NOT NULL CHECK (status IN ('IDENTITY_CHECKED', 'DATA_VERIFIED', 'REQUEST', 'UNAVAILABLE')),
    source_id UUID REFERENCES public.data_sources(id),
    verified_by TEXT,
    verified_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 11. Quote Events (Lifecycle Timeline)
CREATE TABLE IF NOT EXISTS public.quote_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quote_request_id UUID NOT NULL REFERENCES public.quote_requests(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL,
    created_by TEXT DEFAULT 'SYSTEM',
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE public.data_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.operators ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.aircraft ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.aviation_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.missions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flight_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verification_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_events ENABLE ROW LEVEL SECURITY;

-- Public Read Policies for Public-Safe Inventory
CREATE POLICY "Public read operators" ON public.operators FOR SELECT USING (true);
CREATE POLICY "Public read aircraft" ON public.aircraft FOR SELECT USING (true);
CREATE POLICY "Public read aviation_locations" ON public.aviation_locations FOR SELECT USING (true);
CREATE POLICY "Public read experiences" ON public.experiences FOR SELECT USING (true);
CREATE POLICY "Public read flight_options" ON public.flight_options FOR SELECT USING (true);

-- Public Insert Policies for Public Mission Creation
CREATE POLICY "Public create missions" ON public.missions FOR INSERT WITH CHECK (true);
CREATE POLICY "Public create quote_requests" ON public.quote_requests FOR INSERT WITH CHECK (true);

-- Service Role Privileged Full Access Policies
CREATE POLICY "Service role full operators" ON public.operators USING (auth.role() = 'service_role');
CREATE POLICY "Service role full quote_requests" ON public.quote_requests USING (auth.role() = 'service_role');
CREATE POLICY "Service role full quotes" ON public.quotes USING (auth.role() = 'service_role');
CREATE POLICY "Service role full verification_records" ON public.verification_records USING (auth.role() = 'service_role');
