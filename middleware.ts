import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import type { User } from "@supabase/supabase-js";

// Admin email whitelist for authorization
const ADMIN_EMAILS = [
  "myremaxclubcristianv@gmail.com",
  "contact@cristianvaduva.com",
  "admin@air.aero",
];

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get("host") || "";
  const pathname = url.pathname;

  // -------------------------------------------------------------
  // PHASE 11: Hostname-aware 301 Redirect for *.workers.dev
  // -------------------------------------------------------------
  if (hostname.includes("workers.dev")) {
    const canonicalUrl = new URL(
      `${pathname}${url.search}`,
      "https://fly.cristianvaduva.com"
    );
    return NextResponse.redirect(canonicalUrl, 301);
  }

  // -------------------------------------------------------------
  // Initialize Response and Session Client
  // -------------------------------------------------------------
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  let user: User | null = null;

  if (supabaseUrl && supabaseAnonKey) {
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    });

    try {
      const { data } = await supabase.auth.getUser();
      user = data.user;
    } catch {
      user = null;
    }
  }

  // -------------------------------------------------------------
  // PHASE 1: Authentication & Authorization Enforcers
  // -------------------------------------------------------------
  const isProtectedAccount = pathname.startsWith("/account");
  const isProtectedAdmin = pathname.startsWith("/admin");
  const isProtectedOperator = pathname.startsWith("/operator");

  if (isProtectedAccount || isProtectedAdmin || isProtectedOperator) {
    // 1. Authentication Check
    if (!user) {
      if (pathname.startsWith("/api/")) {
        return NextResponse.json(
          { error: "Authentication required" },
          {
            status: 401,
            headers: {
              "Cache-Control": "private, no-cache, no-store, max-age=0, must-revalidate",
            },
          }
        );
      }
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("returnUrl", pathname);
      const redirectResponse = NextResponse.redirect(loginUrl);
      redirectResponse.headers.set(
        "Cache-Control",
        "private, no-cache, no-store, max-age=0, must-revalidate"
      );
      return redirectResponse;
    }

    // 2. Authorization Checks (Role & Privilege separation)
    if (isProtectedAdmin) {
      const userRole = user.user_metadata?.role || user.app_metadata?.role;
      const isAdmin =
        userRole === "admin" ||
        ADMIN_EMAILS.includes(user.email?.toLowerCase() || "");

      if (!isAdmin) {
        if (pathname.startsWith("/api/")) {
          return NextResponse.json(
            { error: "Admin authorization required" },
            {
              status: 403,
              headers: {
                "Cache-Control": "private, no-cache, no-store, max-age=0, must-revalidate",
              },
            }
          );
        }
        const unauthorizedUrl = new URL("/login?error=unauthorized_admin", request.url);
        const redirectResponse = NextResponse.redirect(unauthorizedUrl);
        redirectResponse.headers.set(
          "Cache-Control",
          "private, no-cache, no-store, max-age=0, must-revalidate"
        );
        return redirectResponse;
      }
    }

    if (isProtectedOperator) {
      const userRole = user.user_metadata?.role || user.app_metadata?.role;
      const isOperator =
        userRole === "operator" ||
        userRole === "admin" ||
        ADMIN_EMAILS.includes(user.email?.toLowerCase() || "");

      if (!isOperator) {
        if (pathname.startsWith("/api/")) {
          return NextResponse.json(
            { error: "Operator authorization required" },
            {
              status: 403,
              headers: {
                "Cache-Control": "private, no-cache, no-store, max-age=0, must-revalidate",
              },
            }
          );
        }
        const unauthorizedUrl = new URL("/login?error=unauthorized_operator", request.url);
        const redirectResponse = NextResponse.redirect(unauthorizedUrl);
        redirectResponse.headers.set(
          "Cache-Control",
          "private, no-cache, no-store, max-age=0, must-revalidate"
        );
        return redirectResponse;
      }
    }
  }

  // -------------------------------------------------------------
  // PHASE 10: Anti-Cache Headers on Sensitive & Dynamic Routes
  // -------------------------------------------------------------
  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/operator") ||
    pathname.startsWith("/account") ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/register")
  ) {
    response.headers.set(
      "Cache-Control",
      "private, no-cache, no-store, max-age=0, must-revalidate"
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images/ (public images)
     */
    "/((?!_next/static|_next/image|favicon.ico|images/).*)",
  ],
};
