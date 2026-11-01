import { redirect } from "next/navigation";
import { createClient } from "../supabase/server";

const ADMIN_EMAILS = [
  "myremaxclubcristianv@gmail.com",
  "contact@cristianvaduva.com",
  "admin@air.aero",
];

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: string;
  name?: string;
}

/**
 * Enforces server-side authentication for Server Components.
 * Redirects to /login if unauthenticated.
 */
export async function requireAuth(returnUrl: string = "/account"): Promise<AuthenticatedUser> {
  const supabase = await createClient();
  if (!supabase) {
    // If Supabase environment is not configured, deny access in production
    if (process.env.NODE_ENV === "production") {
      redirect(`/login?returnUrl=${encodeURIComponent(returnUrl)}`);
    }
    return {
      id: "mock-user-dev",
      email: "client@air.aero",
      role: "client",
      name: "VIP Client Member (Dev Mode)",
    };
  }

  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user || !user.email) {
    redirect(`/login?returnUrl=${encodeURIComponent(returnUrl)}`);
  }

  const role = user.user_metadata?.role || user.app_metadata?.role || "client";

  return {
    id: user.id,
    email: user.email,
    role,
    name: user.user_metadata?.full_name || user.user_metadata?.name || user.email.split("@")[0],
  };
}

/**
 * Enforces server-side Admin authorization.
 */
export async function requireAdmin(returnUrl: string = "/admin"): Promise<AuthenticatedUser> {
  const user = await requireAuth(returnUrl);
  const isAdmin =
    user.role === "admin" ||
    ADMIN_EMAILS.includes(user.email.toLowerCase());

  if (!isAdmin) {
    redirect("/login?error=unauthorized_admin");
  }

  return user;
}

/**
 * Enforces server-side Operator authorization.
 */
export async function requireOperator(returnUrl: string = "/operator"): Promise<AuthenticatedUser> {
  const user = await requireAuth(returnUrl);
  const isOperator =
    user.role === "operator" ||
    user.role === "admin" ||
    ADMIN_EMAILS.includes(user.email.toLowerCase());

  if (!isOperator) {
    redirect("/login?error=unauthorized_operator");
  }

  return user;
}
