-- AIR — Phase 6 Database Schema Migration
-- Live Aviation Connectivity, Multi-Operator Sourcing, Booking Lifecycle & Commercial Infrastructure

-- 1. Aviation Provider Connections
CREATE TABLE IF NOT EXISTS public.aviation_provider_connections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    provider_name TEXT NOT NULL UNIQUE,
    provider_type TEXT NOT NULL CHECK (provider_type IN ('CHARTER_AVAILABILITY', 'FLIGHT_TRACKING', 'AIRPORT_DATA', 'PRICING_ENGINE', 'PAYMENT_GATEWAY', 'NOTIFICATIONS')),
    environment TEXT NOT NULL DEFAULT 'PRODUCTION' CHECK (environment IN ('SANDBOX', 'STAGING', 'PRODUCTION')),
    connection_status TEXT NOT NULL DEFAULT 'NOT_CONNECTED' CHECK (connection_status IN ('CONNECTED', 'DEGRADED', 'NOT_CONNECTED', 'MAINTENANCE', 'ERROR')),
    api_endpoint TEXT,
    last_ping_at TIMESTAMPTZ,
    last_error_log TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Availability Snapshots
CREATE TABLE IF NOT EXISTS public.availability_snapshots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    aircraft_supply_id UUID REFERENCES public.aircraft_supply(id) ON DELETE CASCADE,
    operator_id UUID NOT NULL REFERENCES public.operators(id) ON DELETE CASCADE,
    origin_icao TEXT NOT NULL,
    destination_icao TEXT,
    available_from TIMESTAMPTZ NOT NULL,
    available_until TIMESTAMPTZ NOT NULL,
    status TEXT NOT NULL DEFAULT 'AVAILABLE' CHECK (status IN ('AVAILABLE', 'UNAVAILABLE', 'PENDING', 'UNKNOWN', 'EXPIRED')),
    pricing_status TEXT NOT NULL DEFAULT 'INDICATIVE' CHECK (pricing_status IN ('LIVE', 'INDICATIVE', 'REQUEST')),
    indicative_hourly_rate NUMERIC(12, 2),
    currency TEXT NOT NULL DEFAULT 'EUR',
    source_type TEXT NOT NULL DEFAULT 'OPERATOR' CHECK (source_type IN ('LIVE_API', 'OPERATOR', 'AIR_CALCULATED', 'SIMULATION')),
    provider_id UUID REFERENCES public.aviation_provider_connections(id),
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_availability_snapshots_operator ON public.availability_snapshots(operator_id);
CREATE INDEX IF NOT EXISTS idx_availability_snapshots_dates ON public.availability_snapshots(available_from, available_until);

-- 3. Multi-Operator Sourcing Requests
CREATE TABLE IF NOT EXISTS public.sourcing_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mission_id UUID NOT NULL REFERENCES public.missions(id) ON DELETE CASCADE,
    operator_id UUID NOT NULL REFERENCES public.operators(id) ON DELETE CASCADE,
    requested_aircraft_category TEXT NOT NULL,
    requested_timing TIMESTAMPTZ NOT NULL,
    passenger_count INT NOT NULL DEFAULT 1,
    special_requirements TEXT,
    status TEXT NOT NULL DEFAULT 'DRAFT' CHECK (status IN ('DRAFT', 'SENT', 'ACKNOWLEDGED', 'RESPONDED', 'EXPIRED', 'DECLINED', 'CANCELLED')),
    communication_channel TEXT NOT NULL DEFAULT 'INTERNAL_LOG' CHECK (communication_channel IN ('PORTAL', 'EMAIL', 'WHATSAPP', 'SMS', 'API', 'INTERNAL_LOG')),
    operator_notes TEXT,
    quote_reference TEXT,
    expires_at TIMESTAMPTZ,
    responded_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(mission_id, operator_id)
);

CREATE INDEX IF NOT EXISTS idx_sourcing_requests_mission ON public.sourcing_requests(mission_id);
CREATE INDEX IF NOT EXISTS idx_sourcing_requests_operator ON public.sourcing_requests(operator_id);

-- 4. Pricing Components Breakdown
CREATE TABLE IF NOT EXISTS public.pricing_components (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quote_id UUID NOT NULL REFERENCES public.quotes(id) ON DELETE CASCADE,
    base_flight_price NUMERIC(12, 2) NOT NULL,
    positioning_fee NUMERIC(12, 2) DEFAULT 0,
    landing_handling_fee NUMERIC(12, 2) DEFAULT 0,
    fuel_surcharge NUMERIC(12, 2) DEFAULT 0,
    catering_fee NUMERIC(12, 2) DEFAULT 0,
    taxes_and_vat NUMERIC(12, 2) DEFAULT 0,
    currency TEXT NOT NULL DEFAULT 'EUR',
    source TEXT NOT NULL DEFAULT 'OPERATOR_QUOTE' CHECK (source IN ('LIVE_PROVIDER', 'OPERATOR_QUOTE', 'AIR_CALCULATED', 'REQUEST')),
    valid_until TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Booking Reference ID Helper
CREATE OR REPLACE FUNCTION generate_booking_reference() 
RETURNS TEXT AS $$
DECLARE
    ref TEXT;
    done BOOL := FALSE;
BEGIN
    WHILE NOT done LOOP
        ref := 'AIR-BK-2026-' || upper(substring(md5(random()::text || clock_timestamp()::text) from 1 for 6));
        IF NOT EXISTS (SELECT 1 FROM public.booking_records WHERE booking_reference = ref) THEN
            done := TRUE;
        END IF;
    END LOOP;
    RETURN ref;
END;
$$ LANGUAGE plpgsql VOLATILE;

-- 6. Booking Records
CREATE TABLE IF NOT EXISTS public.booking_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_reference TEXT NOT NULL UNIQUE DEFAULT generate_booking_reference(),
    mission_id UUID NOT NULL REFERENCES public.missions(id) ON DELETE CASCADE,
    quote_id UUID REFERENCES public.quotes(id) ON DELETE SET NULL,
    customer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    operator_id UUID NOT NULL REFERENCES public.operators(id) ON DELETE CASCADE,
    aircraft_supply_id UUID REFERENCES public.aircraft_supply(id) ON DELETE SET NULL,
    booking_status TEXT NOT NULL DEFAULT 'REQUESTED' CHECK (booking_status IN ('REQUESTED', 'RESERVATION', 'BOOKING', 'CONFIRMED', 'COMPLETED', 'DECLINED', 'EXPIRED', 'CANCELLED', 'FAILED')),
    payment_status TEXT NOT NULL DEFAULT 'PAYMENT_REQUIRED' CHECK (payment_status IN ('PAYMENT_REQUIRED', 'PAYMENT_PENDING', 'DEPOSIT_PAID', 'PAID', 'FAILED', 'REFUNDED', 'CANCELLED')),
    total_amount NUMERIC(12, 2) NOT NULL,
    deposit_amount NUMERIC(12, 2) DEFAULT 0,
    currency TEXT NOT NULL DEFAULT 'EUR',
    operator_confirmation_ref TEXT,
    confirmed_at TIMESTAMPTZ,
    cancellation_policy TEXT,
    special_instructions TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_booking_records_customer ON public.booking_records(customer_id);
CREATE INDEX IF NOT EXISTS idx_booking_records_operator ON public.booking_records(operator_id);
CREATE INDEX IF NOT EXISTS idx_booking_records_reference ON public.booking_records(booking_reference);

-- 7. Payment Records (Tokenized Payments)
CREATE TABLE IF NOT EXISTS public.payment_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID NOT NULL REFERENCES public.booking_records(id) ON DELETE CASCADE,
    customer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    amount NUMERIC(12, 2) NOT NULL,
    currency TEXT NOT NULL DEFAULT 'EUR',
    payment_status TEXT NOT NULL DEFAULT 'PAYMENT_PENDING' CHECK (payment_status IN ('PAYMENT_PENDING', 'DEPOSIT_PAID', 'PAID', 'FAILED', 'REFUNDED', 'CANCELLED')),
    payment_provider TEXT NOT NULL DEFAULT 'NOT_CONNECTED' CHECK (payment_provider IN ('STRIPE', 'BANK_TRANSFER', 'SIMULATION', 'NOT_CONNECTED')),
    provider_transaction_id TEXT,
    tokenized_reference TEXT,
    paid_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_payment_records_booking ON public.payment_records(booking_id);

-- 8. Flight Records (Operational Flight Tracking)
CREATE TABLE IF NOT EXISTS public.flight_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID NOT NULL REFERENCES public.booking_records(id) ON DELETE CASCADE,
    mission_id UUID NOT NULL REFERENCES public.missions(id) ON DELETE CASCADE,
    operator_id UUID NOT NULL REFERENCES public.operators(id) ON DELETE CASCADE,
    aircraft_supply_id UUID REFERENCES public.aircraft_supply(id) ON DELETE SET NULL,
    tail_number TEXT,
    flight_status TEXT NOT NULL DEFAULT 'PLANNED' CHECK (flight_status IN ('PLANNED', 'CONFIRMED', 'BOARDING', 'DEPARTED', 'AIRBORNE', 'LANDED', 'COMPLETED', 'CANCELLED')),
    tracking_provider TEXT NOT NULL DEFAULT 'NOT_CONNECTED' CHECK (tracking_provider IN ('FLIGHTAWARE', 'OPENSKY', 'RADAR24', 'NOT_CONNECTED')),
    tracking_reference TEXT,
    scheduled_departure TIMESTAMPTZ NOT NULL,
    scheduled_arrival TIMESTAMPTZ NOT NULL,
    actual_departure TIMESTAMPTZ,
    actual_arrival TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_flight_records_booking ON public.flight_records(booking_id);

-- 9. Operator Users (Portal Auth Accounts)
CREATE TABLE IF NOT EXISTS public.operator_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    operator_id UUID NOT NULL REFERENCES public.operators(id) ON DELETE CASCADE,
    role TEXT NOT NULL DEFAULT 'OPERATOR_DISPATCH' CHECK (role IN ('OPERATOR_ADMIN', 'OPERATOR_DISPATCH', 'OPERATOR_SALES', 'OPERATOR_VIEWER')),
    is_active BOOL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, operator_id)
);

CREATE INDEX IF NOT EXISTS idx_operator_users_user ON public.operator_users(user_id);
CREATE INDEX IF NOT EXISTS idx_operator_users_operator ON public.operator_users(operator_id);

-- 10. Notification Deliveries (Provider Audit Stream)
CREATE TABLE IF NOT EXISTS public.notification_deliveries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    recipient TEXT NOT NULL,
    channel TEXT NOT NULL CHECK (channel IN ('EMAIL', 'SMS', 'WHATSAPP', 'IN_APP', 'INTERNAL_LOG')),
    event_type TEXT NOT NULL,
    delivery_status TEXT NOT NULL DEFAULT 'LOGGED' CHECK (delivery_status IN ('LOGGED', 'SENT', 'DELIVERED', 'FAILED', 'NOT_CONNECTED')),
    provider_reference TEXT,
    error_message TEXT,
    delivered_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 11. Webhook Events (Idempotency Engine)
CREATE TABLE IF NOT EXISTS public.webhook_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    provider TEXT NOT NULL,
    event_type TEXT NOT NULL,
    external_event_id TEXT NOT NULL UNIQUE,
    status TEXT NOT NULL DEFAULT 'PROCESSED' CHECK (status IN ('RECEIVED', 'PROCESSED', 'FAILED', 'REJECTED')),
    payload_hash TEXT NOT NULL,
    processed_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 12. Market Observations for AIR Indices
CREATE TABLE IF NOT EXISTS public.air_price_observations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    route_slug TEXT NOT NULL,
    aircraft_category TEXT NOT NULL,
    distance_nm INT NOT NULL,
    quoted_price NUMERIC(12, 2) NOT NULL,
    currency TEXT NOT NULL DEFAULT 'EUR',
    observation_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.air_time_observations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    origin_icao TEXT NOT NULL,
    destination_icao TEXT NOT NULL,
    airborne_minutes INT NOT NULL,
    ground_transfer_origin_minutes INT DEFAULT 30,
    ground_transfer_dest_minutes INT DEFAULT 30,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS Enablement
ALTER TABLE public.aviation_provider_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.availability_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pricing_components ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sourcing_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flight_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.operator_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification_deliveries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.webhook_events ENABLE ROW LEVEL SECURITY;

-- Customer RLS Policies
CREATE POLICY "Users view own bookings" ON public.booking_records FOR SELECT USING (auth.uid() = customer_id);
CREATE POLICY "Users view own payments" ON public.payment_records FOR SELECT USING (auth.uid() = customer_id);
CREATE POLICY "Users view own flight records" ON public.flight_records FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.booking_records WHERE booking_records.id = flight_records.booking_id AND booking_records.customer_id = auth.uid())
);

-- Operator User RLS Policies
CREATE POLICY "Operators view own sourcing requests" ON public.sourcing_requests FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.operator_users WHERE operator_users.operator_id = sourcing_requests.operator_id AND operator_users.user_id = auth.uid())
);

CREATE POLICY "Operators view own bookings" ON public.booking_records FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.operator_users WHERE operator_users.operator_id = booking_records.operator_id AND operator_users.user_id = auth.uid())
);

-- Service Role Full Access Policies
CREATE POLICY "Service role full provider connections" ON public.aviation_provider_connections USING (auth.role() = 'service_role');
CREATE POLICY "Service role full webhook events" ON public.webhook_events USING (auth.role() = 'service_role');
CREATE POLICY "Service role full notification deliveries" ON public.notification_deliveries USING (auth.role() = 'service_role');
