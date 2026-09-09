-- AIR — Phase 8 Database Schema Migration
-- Production Transaction Records, Passenger Data Minimization Manifests, and Environment Safety Controls

-- 1. Minimal Passenger Flight Manifest (Data Minimization Enforced: NO passports, NO identity scans)
CREATE TABLE IF NOT EXISTS public.production_flight_manifests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID NOT NULL REFERENCES public.booking_records(id) ON DELETE CASCADE,
    passenger_count INT NOT NULL DEFAULT 1 CHECK (passenger_count > 0),
    manifest_status TEXT NOT NULL DEFAULT 'PENDING' CHECK (manifest_status IN ('PENDING', 'SUBMITTED', 'VERIFIED')),
    contact_verified BOOL NOT NULL DEFAULT FALSE,
    documentation_status TEXT NOT NULL DEFAULT 'VERIFIED' CHECK (documentation_status IN ('VERIFIED', 'PENDING', 'EXEMPT')),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_prod_manifest_booking ON public.production_flight_manifests(booking_id);

-- 2. Production Transaction Lifecycle Records (Provenance Chain Audit)
CREATE TABLE IF NOT EXISTS public.production_transaction_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    transaction_ref TEXT NOT NULL UNIQUE,
    mission_id UUID REFERENCES public.missions(id) ON DELETE SET NULL,
    sourcing_request_id UUID REFERENCES public.sourcing_requests(id) ON DELETE SET NULL,
    quote_id UUID REFERENCES public.quotes(id) ON DELETE SET NULL,
    booking_id UUID REFERENCES public.booking_records(id) ON DELETE SET NULL,
    payment_id UUID REFERENCES public.payment_records(id) ON DELETE SET NULL,
    flight_record_id UUID REFERENCES public.flight_records(id) ON DELETE SET NULL,
    milestone TEXT NOT NULL CHECK (milestone IN (
        'MISSION_CREATED',
        'SUPPLY_VERIFIED',
        'DISPATCH_SENT',
        'QUOTE_RECEIVED',
        'CUSTOMER_ACCEPTED',
        'PAYMENT_PENDING',
        'PAYMENT_CONFIRMED',
        'BOOKING_REQUESTED',
        'OPERATOR_CONFIRMED',
        'BOOKING_CONFIRMED',
        'FLIGHT_SCHEDULED',
        'FLIGHT_COMPLETED',
        'TRANSACTION_FAILED'
    )),
    environment TEXT NOT NULL DEFAULT 'SANDBOX' CHECK (environment IN ('TEST', 'SANDBOX', 'PRODUCTION')),
    is_real_production BOOL NOT NULL DEFAULT FALSE,
    actor TEXT NOT NULL DEFAULT 'SYSTEM' CHECK (actor IN ('CUSTOMER', 'OPERATOR', 'ADMIN', 'SYSTEM')),
    source TEXT NOT NULL DEFAULT 'PORTAL' CHECK (source IN ('PORTAL', 'DISPATCH_TOKEN', 'API', 'WEBHOOK')),
    details JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_prod_tx_ref ON public.production_transaction_records(transaction_ref);
CREATE INDEX IF NOT EXISTS idx_prod_tx_mission ON public.production_transaction_records(mission_id);
CREATE INDEX IF NOT EXISTS idx_prod_tx_booking ON public.production_transaction_records(booking_id);

-- Enable RLS
ALTER TABLE public.production_flight_manifests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.production_transaction_records ENABLE ROW LEVEL SECURITY;

-- Customer RLS Policies
CREATE POLICY "Users view own flight manifests" ON public.production_flight_manifests
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.booking_records
            WHERE booking_records.id = production_flight_manifests.booking_id
            AND booking_records.user_id = auth.uid()
        )
    );

CREATE POLICY "Users view own production transaction records" ON public.production_transaction_records
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.missions
            WHERE missions.id = production_transaction_records.mission_id
            AND missions.user_id = auth.uid()
        )
    );

-- Operator RLS Policies
CREATE POLICY "Operators view operational flight manifests" ON public.production_flight_manifests
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.booking_records
            JOIN public.operator_users ON operator_users.operator_id = booking_records.operator_id
            WHERE booking_records.id = production_flight_manifests.booking_id
            AND operator_users.user_id = auth.uid()
        )
    );

CREATE POLICY "Operators view operational transaction records" ON public.production_transaction_records
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.sourcing_requests
            JOIN public.operator_users ON operator_users.operator_id = sourcing_requests.operator_id
            WHERE sourcing_requests.id = production_transaction_records.sourcing_request_id
            AND operator_users.user_id = auth.uid()
        )
    );

-- Service Role Full Access Policies
CREATE POLICY "Service role full access flight manifests" ON public.production_flight_manifests USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access production transaction records" ON public.production_transaction_records USING (auth.role() = 'service_role');
