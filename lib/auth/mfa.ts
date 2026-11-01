import { SupabaseClient } from "@supabase/supabase-js";

export interface MfaStatus {
  enabled: boolean;
  currentLevel: "aal1" | "aal2";
  nextLevel: "aal1" | "aal2";
  factors: Array<{
    id: string;
    factorType: string;
    status: string;
  }>;
}

/**
 * Checks MFA assurance level and enrolled factors for the current session.
 */
export async function checkMfaStatus(supabase: SupabaseClient): Promise<MfaStatus> {
  const { data: aalData, error: aalError } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
  if (aalError || !aalData) {
    return {
      enabled: false,
      currentLevel: "aal1",
      nextLevel: "aal1",
      factors: [],
    };
  }

  const { data: factorsData, error: factorsError } = await supabase.auth.mfa.listFactors();
  const verifiedFactors = factorsError || !factorsData
    ? []
    : factorsData.totp.filter((f) => f.status === "verified");

  return {
    enabled: verifiedFactors.length > 0,
    currentLevel: aalData.currentLevel as "aal1" | "aal2",
    nextLevel: aalData.nextLevel as "aal1" | "aal2",
    factors: verifiedFactors.map((f) => ({
      id: f.id,
      factorType: f.factor_type,
      status: f.status,
    })),
  };
}

/**
 * Enrolls a new TOTP factor for an administrator or operator.
 */
export async function enrollMfaTotp(
  supabase: SupabaseClient,
  friendlyName: string = "AIR Platform Authenticator"
) {
  const { data, error } = await supabase.auth.mfa.enroll({
    factorType: "totp",
    friendlyName,
  });

  if (error || !data) {
    throw new Error(error?.message || "Failed to initialize MFA enrollment");
  }

  return {
    factorId: data.id,
    qrCodeUri: data.totp.uri,
    secret: data.totp.secret,
  };
}

/**
 * Verifies and activates an enrolled TOTP factor with a 6-digit code.
 */
export async function verifyMfaTotp(
  supabase: SupabaseClient,
  factorId: string,
  verificationCode: string
) {
  const challenge = await supabase.auth.mfa.challenge({ factorId });
  if (challenge.error || !challenge.data) {
    throw new Error(challenge.error?.message || "Failed to create MFA challenge");
  }

  const verify = await supabase.auth.mfa.verify({
    factorId,
    challengeId: challenge.data.id,
    code: verificationCode.trim(),
  });

  if (verify.error || !verify.data) {
    throw new Error(verify.error?.message || "Invalid MFA verification code");
  }

  return {
    verified: true,
    user: verify.data.user,
  };
}
