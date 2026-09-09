export type DataStatus =
  | "OFFICIAL_SOURCE"
  | "VERIFIED"
  | "PUBLIC"
  | "INDICATIVE"
  | "REQUEST"
  | "STALE"
  | "AIR_CALCULATED"
  | "LIVE";

export type VerificationStatus =
  | "OFFICIAL_SOURCE"
  | "VERIFIED"
  | "PUBLIC"
  | "INDICATIVE"
  | "REQUEST"
  | "STALE"
  | "DATA_VERIFIED"
  | "IDENTITY_CHECKED";

export type SourceType =
  | "AACR"
  | "EASA"
  | "AIP"
  | "CNAB"
  | "EUROCONTROL"
  | "MANUFACTURER"
  | "OFFICIAL_WEBSITE"
  | "PUBLIC_DATABASE"
  | "INTERNAL";

export interface DataSource {
  name: string;
  type: SourceType;
  url?: string;
  lastVerifiedAt?: string;
}

export interface VerifiableEntity {
  verificationStatus: VerificationStatus;
  dataStatus: DataStatus;
  source?: DataSource;
  lastVerifiedAt?: string;
  verifiedBy?: string;
}

