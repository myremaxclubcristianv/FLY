export type DataStatus =
  | "LIVE"
  | "VERIFIED"
  | "INDICATIVE"
  | "REQUEST"
  | "UNAVAILABLE"
  | "LAST_VERIFIED";

export type VerificationStatus =
  | "IDENTITY_CHECKED"
  | "DATA_VERIFIED"
  | "REQUEST"
  | "UNAVAILABLE";

export interface DataSource {
  name: string;
  type: "OFFICIAL" | "OPERATOR" | "PUBLIC" | "INTERNAL";
  url?: string;
}

export interface VerifiableEntity {
  verificationStatus: VerificationStatus;
  dataStatus: DataStatus;
  source?: DataSource;
  lastVerifiedAt?: string;
  verifiedBy?: string;
}
