-- AIR — Phase 5 Database Schema Migration
-- Operational Aviation Infrastructure, Reference IDs, Customer Account RLS, and Supply Management

-- 1. Profiles Table (Linked to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT,
    company_name TEXT,
    phone TEXT,
    role TEXT NOT NULL DEFAULT 'CUSTOMER' CHECK (role IN ('CUSTOMER', 'OPERATOR', 'ADMIN', 'SERVICE_ROLE')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Mission Reference ID helper function
CREATE OR REPLACE FUNCTION generate_mission_reference() 
RETURNS TEXT AS $$
DECLARE
    ref TEXT;
    done BOOL := FALSE;
BEGIN
    WHILE NOT done LOOP
        ref := 'AIR-2026-' || upper(substring(md5(random()::text || clock_timestamp()::text) from 1 for 6));
        IF NOT EXISTS (SELECT 1 FROM public.missions WHERE reference_id = ref) THEN
            done := TRUE;
        END IF;
    END LOOP;
    RETURN ref;
END;
$$ LANGUAGE plpgsql VOLATILE;

-- Extend Missions Table
ALTER TABLE public.missions 
ADD COLUMN IF NOT EXISTS reference_id TEXT UNIQUE DEFAULT generate_mission_reference(),
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS contact_name TEXT,
ADD COLUMN IF NOT EXISTS contact_email TEXT,
ADD COLUMN IF NOT EXISTS contact_phone TEXT,
ADD COLUMN IF NOT EXISTS special_requirements TEXT;

CREATE INDEX IF NOT EXISTS idx_missions_user ON public.missions(user_id);
CREATE INDEX IF NOT EXISTS idx_missions_reference ON public.missions(reference_id);

-- 3. Mission Passengers
CREATE TABLE IF NOT EXISTS public.mission_passengers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mission_id UUID NOT NULL REFERENCES public.missions(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    passport_number TEXT,
    nationality TEXT,
    weight_kg NUMERIC(5, 2),
    special_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_mission_passengers_mission ON public.mission_passengers(mission_id);

-- 4. Aircraft Supply (Actual Operator Fleet / Tail Numbers)
CREATE TABLE IF NOT EXISTS public.aircraft_supply (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT NOT NULL UNIQUE,
    operator_id UUID NOT NULL REFERENCES public.operators(id) ON DELETE CASCADE,
    aircraft_model_slug TEXT NOT NULL, -- references aircraft model slug (e.g. phenom-300e)
    tail_number TEXT NOT NULL UNIQUE, -- e.g. YR-FLY
    year_of_manufacture INT,
    refurbished_year INT,
    home_base_icao TEXT NOT NULL,
    current_location_icao TEXT,
    aoc_number TEXT,
    status TEXT NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'MAINTENANCE', 'CHARTER_ONLY', 'INACTIVE')),
    verification_status TEXT NOT NULL DEFAULT 'DATA_VERIFIED' CHECK (verification_status IN ('UNVERIFIED', 'IDENTITY_CHECKED', 'DATA_VERIFIED', 'DOCUMENT_CHECKED', 'VERIFIED', 'STALE', 'REQUIRES_REVIEW')),
    data_status TEXT NOT NULL DEFAULT 'VERIFIED' CHECK (data_status IN ('LIVE', 'VERIFIED', 'INDICATIVE', 'REQUEST', 'UNAVAILABLE', 'LAST_VERIFIED')),
    last_verified_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_aircraft_supply_operator ON public.aircraft_supply(operator_id);
CREATE INDEX IF NOT EXISTS idx_aircraft_supply_model ON public.aircraft_supply(aircraft_model_slug);

-- 5. Operator Contacts
CREATE TABLE IF NOT EXISTS public.operator_contacts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    operator_id UUID NOT NULL REFERENCES public.operators(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    role_title TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    is_primary BOOL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_operator_contacts_operator ON public.operator_contacts(operator_id);

-- 6. Quote Items (Detailed Quote Breakdown)
CREATE TABLE IF NOT EXISTS public.quote_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quote_id UUID NOT NULL REFERENCES public.quotes(id) ON DELETE CASCADE,
    description TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('FLIGHT_TIME', 'HANDLING', 'LANDING_FEE', 'CATERING', 'OVERNIGHT', 'POSITIONING', 'TAX', 'DE-ICING', 'OTHER')),
    amount NUMERIC(12, 2) NOT NULL,
    currency TEXT NOT NULL DEFAULT 'EUR',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_quote_items_quote ON public.quote_items(quote_id);

-- Extend Quotes Table with operational fields
ALTER TABLE public.quotes
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS operator_id UUID REFERENCES public.operators(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS aircraft_supply_id UUID REFERENCES public.aircraft_supply(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS baggage_allowance TEXT,
ADD COLUMN IF NOT EXISTS cancellation_policy TEXT,
ADD COLUMN IF NOT EXISTS inclusions TEXT[],
ADD COLUMN IF NOT EXISTS exclusions TEXT[],
ADD COLUMN IF NOT EXISTS notes TEXT,
ADD COLUMN IF NOT EXISTS recommendations_reason TEXT;

-- Extend Quote Requests Table
ALTER TABLE public.quote_requests
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;

-- 7. Customer Saved Fleets / Routes / Destinations
CREATE TABLE IF NOT EXISTS public.saved_aircraft (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    aircraft_slug TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, aircraft_slug)
);

CREATE TABLE IF NOT EXISTS public.saved_routes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    route_slug TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, route_slug)
);

CREATE TABLE IF NOT EXISTS public.saved_destinations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    destination_slug TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, destination_slug)
);

CREATE INDEX IF NOT EXISTS idx_saved_aircraft_user ON public.saved_aircraft(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_routes_user ON public.saved_routes(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_destinations_user ON public.saved_destinations(user_id);

-- 8. Communication Events & Audit Events
CREATE TABLE IF NOT EXISTS public.communication_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mission_id UUID REFERENCES public.missions(id) ON DELETE SET NULL,
    quote_request_id UUID REFERENCES public.quote_requests(id) ON DELETE SET NULL,
    channel TEXT NOT NULL CHECK (channel IN ('EMAIL', 'SMS', 'WHATSAPP', 'INTERNAL_LOG', 'SIMULATION')),
    sender TEXT NOT NULL,
    recipient TEXT NOT NULL,
    subject TEXT,
    body TEXT,
    status TEXT NOT NULL DEFAULT 'LOGGED' CHECK (status IN ('SENT', 'LOGGED', 'FAILED', 'SIMULATED')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.audit_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entity_type TEXT NOT NULL,
    entity_id UUID NOT NULL,
    action TEXT NOT NULL,
    performed_by TEXT NOT NULL DEFAULT 'SYSTEM',
    changes JSONB DEFAULT '{}'::jsonb,
    ip_address TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_events_entity ON public.audit_events(entity_type, entity_id);

-- RLS Enablement
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mission_passengers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.aircraft_supply ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.operator_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_aircraft ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.communication_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_events ENABLE ROW LEVEL SECURITY;

-- Profile RLS
CREATE POLICY "Users view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Service role full profiles" ON public.profiles USING (auth.role() = 'service_role');

-- Mission RLS Policy Extension
CREATE POLICY "Users view own missions" ON public.missions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users update own missions" ON public.missions FOR UPDATE USING (auth.uid() = user_id);

-- Quote Requests RLS Extension
CREATE POLICY "Users view own quote requests" ON public.quote_requests FOR SELECT USING (auth.uid() = user_id);

-- Saved Items RLS Policies
CREATE POLICY "Users manage own saved_aircraft" ON public.saved_aircraft FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own saved_routes" ON public.saved_routes FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users manage own saved_destinations" ON public.saved_destinations FOR ALL USING (auth.uid() = user_id);

-- Public Read for Aircraft Supply
CREATE POLICY "Public read aircraft_supply" ON public.aircraft_supply FOR SELECT USING (true);

-- Admin / Service Role Policies for Operations
CREATE POLICY "Service role full aircraft_supply" ON public.aircraft_supply USING (auth.role() = 'service_role');
CREATE POLICY "Service role full operator_contacts" ON public.operator_contacts USING (auth.role() = 'service_role');
CREATE POLICY "Service role full communication_events" ON public.communication_events USING (auth.role() = 'service_role');
CREATE POLICY "Service role full audit_events" ON public.audit_events USING (auth.role() = 'service_role');
