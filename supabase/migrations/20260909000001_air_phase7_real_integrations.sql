-- AIR — Phase 7 Database Schema Migration
-- Real Provider Credentials Audit, End-to-End Transaction Milestones, and Single-Use Operator Dispatch Tokens

-- 1. Provider Credentials Metadata (No secret keys stored)
CREATE TABLE IF NOT EXISTS public.provider_credentials_metadata (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    provider_name TEXT NOT NULL UNIQUE,
    environment TEXT NOT NULL DEFAULT 'SANDBOX' CHECK (environment IN ('SANDBOX', 'STAGING', 'PRODUCTION')),
    is_credentials_configured BOOL NOT NULL DEFAULT FALSE,
    last_health_check_at TIMESTAMPTZ,
    last_successful_request_at TIMESTAMPTZ,
    last_error_message TEXT,
    status TEXT NOT NULL DEFAULT 'NOT_CONNECTED' CHECK (status IN ('LIVE', 'SANDBOX', 'NOT_CONNECTED', 'ERROR')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. End-to-End Real Transaction Audits
CREATE TABLE IF NOT EXISTS public.real_transaction_audits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    transaction_ref TEXT NOT NULL UNIQUE,
    mission_id UUID REFERENCES public.missions(id) ON DELETE SET NULL,
    quote_id UUID REFERENCES public.quotes(id) ON DELETE SET NULL,
    booking_id UUID REFERENCES public.booking_records(id) ON DELETE SET NULL,
    payment_id UUID REFERENCES public.payment_records(id) ON DELETE SET NULL,
    flight_record_id UUID REFERENCES public.flight_records(id) ON DELETE SET NULL,
    customer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    operator_id UUID REFERENCES public.operators(id) ON DELETE SET NULL,
    milestone TEXT NOT NULL CHECK (milestone IN (
        'MISSION_CREATED',
        'SOURCING_DISPATCHED',
        'OPERATOR_QUOTED',
        'CUSTOMER_APPROVED',
        'PAYMENT_INTENT_CREATED',
        'PAYMENT_CONFIRMED',
        'BOOKING_REQUESTED',
        'OPERATOR_CONFIRMED',
        'FLIGHT_RECORD_ACTIVE',
        'TRANSACTION_COMPLETED',
        'TRANSACTION_FAILED'
    )),
    is_live_production BOOL DEFAULT FALSE,
    is_sandbox BOOL DEFAULT TRUE,
    actor TEXT NOT NULL DEFAULT 'SYSTEM',
    details JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_real_transaction_audits_ref ON public.real_transaction_audits(transaction_ref);
CREATE INDEX IF NOT EXISTS idx_real_transaction_audits_mission ON public.real_transaction_audits(mission_id);

-- 3. Tokenized Operator Dispatch Access
CREATE TABLE IF NOT EXISTS public.operator_tokenized_access (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    token_hash TEXT NOT NULL UNIQUE,
    sourcing_request_id UUID NOT NULL REFERENCES public.sourcing_requests(id) ON DELETE CASCADE,
    operator_id UUID NOT NULL REFERENCES public.operators(id) ON DELETE CASCADE,
    expires_at TIMESTAMPTZ NOT NULL,
    used_at TIMESTAMPTZ,
    is_revoked BOOL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_operator_token_hash ON public.operator_tokenized_access(token_hash);

-- RLS Enablement
ALTER TABLE public.provider_credentials_metadata ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.real_transaction_audits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.operator_tokenized_access ENABLE ROW LEVEL SECURITY;

-- Customer RLS Policies
CREATE POLICY "Users view own transaction audits" ON public.real_transaction_audits FOR SELECT USING (auth.uid() = customer_id);

-- Operator RLS Policies
CREATE POLICY "Operators view own transaction audits" ON public.real_transaction_audits FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.operator_users WHERE operator_users.operator_id = real_transaction_audits.operator_id AND operator_users.user_id = auth.uid())
);

-- Service Role Full Access Policies
CREATE POLICY "Service role full provider metadata" ON public.provider_credentials_metadata USING (auth.role() = 'service_role');
CREATE POLICY "Service role full transaction audits" ON public.real_transaction_audits USING (auth.role() = 'service_role');
CREATE POLICY "Service role full operator token access" ON public.operator_tokenized_access USING (auth.role() = 'service_role');
