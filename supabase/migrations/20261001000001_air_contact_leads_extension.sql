-- ============================================================================
-- AIR — Contact Inquiries & Commercial Leads Extension Migration
-- ============================================================================

-- Add contact-specific fields if not already present
ALTER TABLE public.air_leads 
ADD COLUMN IF NOT EXISTS company TEXT,
ADD COLUMN IF NOT EXISTS service_interest TEXT,
ADD COLUMN IF NOT EXISTS current_page TEXT,
ADD COLUMN IF NOT EXISTS lead_status TEXT NOT NULL DEFAULT 'NEW' 
    CHECK (lead_status IN ('NEW', 'CONTACTED', 'QUALIFIED', 'IN_PROGRESS', 'CONVERTED', 'CLOSED'));

CREATE INDEX IF NOT EXISTS idx_air_leads_status ON public.air_leads(lead_status);
CREATE INDEX IF NOT EXISTS idx_air_leads_service ON public.air_leads(service_interest);
