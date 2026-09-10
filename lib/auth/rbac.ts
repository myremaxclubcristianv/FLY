export type AirUserRole = "CLIENT" | "OPERATIONS" | "ADMIN";

export interface AirSessionUser {
  id: string;
  email: string;
  name?: string;
  role: AirUserRole;
  isOperationsStaff?: boolean;
}

/**
 * Server-side and client-safe role evaluator.
 */
export function resolveUserRole(rawRole?: string | null, email?: string | null): AirUserRole {
  if (!rawRole && !email) return "CLIENT";
  
  const normalizedRole = (rawRole || "").toLowerCase().trim();
  if (normalizedRole === "admin" || normalizedRole === "superadmin") {
    return "ADMIN";
  }
  if (
    normalizedRole === "ops" ||
    normalizedRole === "operations" ||
    normalizedRole === "air_operations" ||
    normalizedRole === "flight_desk"
  ) {
    return "OPERATIONS";
  }

  // Check email domain if specified
  if (email && email.toLowerCase().endsWith("@air.aero") && email.toLowerCase().includes("ops")) {
    return "OPERATIONS";
  }

  return "CLIENT";
}

export function isOperationsAuthorized(role: AirUserRole): boolean {
  return role === "OPERATIONS" || role === "ADMIN";
}

export function canClientViewMission(userId: string | undefined, userEmail: string | undefined, mission: { userId?: string; email?: string }): boolean {
  if (userId && mission.userId && userId === mission.userId) return true;
  if (userEmail && mission.email && userEmail.toLowerCase() === mission.email.toLowerCase()) return true;
  return false;
}

export function validateLifecycleTransition(
  currentStatus: string,
  targetStatus: string,
  userRole: AirUserRole,
  hasQuotes: boolean = false,
  hasApprovedReview: boolean = false
): { allowed: boolean; reason?: string } {
  // Terminal states cannot transition backwards
  if (currentStatus === "CONFIRMED") {
    return { allowed: false, reason: "Confirmed flight missions are terminal and locked." };
  }
  if (currentStatus === "CANCELLED") {
    return { allowed: false, reason: "Cancelled missions cannot be transitioned." };
  }

  // Cancel is allowed from any active state
  if (targetStatus === "CANCELLED") {
    return { allowed: true };
  }

  // Clients can only confirm missions when presented
  if (userRole === "CLIENT") {
    if (targetStatus === "CONFIRMED") {
      if (currentStatus !== "PRESENTED") {
        return { allowed: false, reason: "Clients can only confirm flights when quotes are presented." };
      }
      return { allowed: true };
    }
    return { allowed: false, reason: "Clients cannot manually advance operations lifecycle states." };
  }

  // Operations transitions
  const allowedGraph: Record<string, string[]> = {
    REQUESTED: ["SOURCING", "CANCELLED"],
    SOURCING: ["QUOTES_RECEIVED", "CANCELLED"],
    QUOTES_RECEIVED: ["AIR_REVIEW", "SOURCING", "CANCELLED"],
    AIR_REVIEW: ["PRESENTED", "SOURCING", "CANCELLED"],
    PRESENTED: ["CONFIRMED", "SOURCING", "CANCELLED"],
  };

  const possibleNext = allowedGraph[currentStatus] || [];
  if (!possibleNext.includes(targetStatus)) {
    return {
      allowed: false,
      reason: `Transition from ${currentStatus} to ${targetStatus} is not permitted by mission protocol.`,
    };
  }

  if (targetStatus === "AIR_REVIEW" && !hasQuotes) {
    return { allowed: false, reason: "Cannot enter AIR Review without at least one logged operator quote." };
  }

  if (targetStatus === "PRESENTED" && !hasApprovedReview) {
    return { allowed: false, reason: "Cannot present quotes to client without completed AIR Flight Desk safety audit." };
  }

  return { allowed: true };
}
