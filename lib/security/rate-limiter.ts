import { NextRequest, NextResponse } from "next/server";

interface RateLimitConfig {
  limit: number;         // Maximum allowed requests in window
  windowSeconds: number; // Window size in seconds
}

export const RATE_LIMIT_CONFIGS: Record<string, RateLimitConfig> = {
  contact_form: { limit: 5, windowSeconds: 600 },       // 5 contact submissions per 10 minutes
  flight_lead: { limit: 5, windowSeconds: 600 },        // 5 flight requests / leads per 10 minutes
  flight_plan: { limit: 15, windowSeconds: 600 },       // 15 flight planning calculations per 10 minutes
  auth_attempt: { limit: 10, windowSeconds: 900 },      // 10 login / register attempts per 15 minutes
  password_recovery: { limit: 3, windowSeconds: 1800 }, // 3 recovery attempts per 30 minutes
  telemetry_event: { limit: 120, windowSeconds: 60 },   // 120 telemetry events per minute
  telemetry_session: { limit: 20, windowSeconds: 60 },  // 20 session inits per minute
  api_default: { limit: 60, windowSeconds: 60 },        // 60 requests per minute
};

interface KVNamespaceLike {
  get: (key: string) => Promise<string | null>;
  put: (key: string, value: string, options?: { expirationTtl?: number }) => Promise<void>;
}

// In-memory fallback for local unit test runner outside Cloudflare Worker runtime
const localMemoryStore = new Map<string, { count: number; expiresAt: number }>();

/**
 * Resolves the Cloudflare Workers KV binding FLY_RATE_LIMIT using OpenNext context.
 */
async function getCloudflareRateLimitKV(): Promise<KVNamespaceLike | null> {
  // 1. Try OpenNext Cloudflare runtime context
  try {
    const { getCloudflareContext } = await import("@opennextjs/cloudflare");
    const ctx = await getCloudflareContext({ async: true });
    if (ctx && ctx.env && (ctx.env as Record<string, unknown>).FLY_RATE_LIMIT) {
      return (ctx.env as Record<string, unknown>).FLY_RATE_LIMIT as KVNamespaceLike;
    }
  } catch {
    // Outside OpenNext Cloudflare runtime (e.g. Node.js local test execution)
  }

  // 2. Try globalThis fallback
  const globalKv = (globalThis as unknown as { FLY_RATE_LIMIT?: KVNamespaceLike }).FLY_RATE_LIMIT;
  if (globalKv && typeof globalKv.get === "function" && typeof globalKv.put === "function") {
    return globalKv;
  }

  return null;
}

/**
 * Extracts a trusted client identifier, prioritizing Cloudflare CF-Connecting-IP.
 */
export function getClientIp(req: NextRequest | Request): string {
  const headers = req.headers;
  const cfConnectingIp = headers.get("cf-connecting-ip");
  if (cfConnectingIp) {
    return cfConnectingIp.trim();
  }

  const xRealIp = headers.get("x-real-ip");
  if (xRealIp) {
    return xRealIp.trim();
  }

  const xForwardedFor = headers.get("x-forwarded-for");
  if (xForwardedFor) {
    const firstIp = xForwardedFor.split(",")[0].trim();
    if (firstIp) return firstIp;
  }

  return "127.0.0.1";
}

/**
 * Checks and updates rate limit for a client IP and action.
 */
export async function checkRateLimit(
  req: NextRequest | Request,
  action: keyof typeof RATE_LIMIT_CONFIGS = "api_default",
  customKey?: string
): Promise<{ allowed: boolean; remaining: number; resetInSeconds: number }> {
  const config = RATE_LIMIT_CONFIGS[action] || RATE_LIMIT_CONFIGS.api_default;
  const ip = customKey || getClientIp(req);
  const key = `ratelimit:${action}:${ip}`;
  const now = Math.floor(Date.now() / 1000);

  // 1. Access Persistent Cloudflare KV Binding
  const kv = await getCloudflareRateLimitKV();

  if (kv && typeof kv.get === "function" && typeof kv.put === "function") {
    try {
      const dataStr = await kv.get(key);
      let entry = dataStr ? JSON.parse(dataStr) : null;

      if (!entry || entry.resetAt <= now) {
        entry = { count: 1, resetAt: now + config.windowSeconds };
        await kv.put(key, JSON.stringify(entry), {
          expirationTtl: config.windowSeconds,
        });
        return {
          allowed: true,
          remaining: config.limit - 1,
          resetInSeconds: config.windowSeconds,
        };
      }

      if (entry.count >= config.limit) {
        const resetIn = Math.max(1, entry.resetAt - now);
        return {
          allowed: false,
          remaining: 0,
          resetInSeconds: resetIn,
        };
      }

      entry.count += 1;
      const resetIn = Math.max(1, entry.resetAt - now);
      await kv.put(key, JSON.stringify(entry), { expirationTtl: resetIn });

      return {
        allowed: true,
        remaining: config.limit - entry.count,
        resetInSeconds: resetIn,
      };
    } catch (err) {
      console.warn("[RATE_LIMIT KV ERROR, FALLING BACK TO MEMORY]", err);
    }
  }

  // 2. Fallback to Local Memory Store (for local unit tests)
  let record = localMemoryStore.get(key);
  if (!record || record.expiresAt <= now) {
    record = { count: 1, expiresAt: now + config.windowSeconds };
    localMemoryStore.set(key, record);
    return {
      allowed: true,
      remaining: config.limit - 1,
      resetInSeconds: config.windowSeconds,
    };
  }

  if (record.count >= config.limit) {
    const resetIn = Math.max(1, record.expiresAt - now);
    return {
      allowed: false,
      remaining: 0,
      resetInSeconds: resetIn,
    };
  }

  record.count += 1;
  const resetIn = Math.max(1, record.expiresAt - now);
  return {
    allowed: true,
    remaining: config.limit - record.count,
    resetInSeconds: resetIn,
  };
}

/**
 * Creates an HTTP 429 response with RFC-compliant Retry-After header.
 */
export function createRateLimitResponse(resetInSeconds: number) {
  return NextResponse.json(
    {
      success: false,
      error: `Too many requests. Rate limit exceeded. Please retry in ${resetInSeconds} seconds.`,
    },
    {
      status: 429,
      headers: {
        "Retry-After": String(resetInSeconds),
        "Cache-Control": "private, no-cache, no-store, max-age=0, must-revalidate",
      },
    }
  );
}
