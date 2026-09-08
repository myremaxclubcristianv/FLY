export type DataStatus =
  | "LIVE"
  | "VERIFIED"
  | "INDICATIVE"
  | "REQUEST"
  | "UNAVAILABLE"
  | "LAST_VERIFIED";

export type VerificationStatus =
  | "DRAFT"
  | "PENDING_REVIEW"
  | "VERIFIED"
  | "PUBLISHED"
  | "SUSPENDED"
  | "ARCHIVED";

export interface VerifiableEntity {
  verification_status: VerificationStatus;
  data_status: DataStatus;
  last_verified_at: string | null;
}
