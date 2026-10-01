import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export function createAdminClient() {
  if (typeof window !== "undefined") {
    throw new Error(
      "[SECURITY VIOLATION] createAdminClient cannot be invoked in browser code."
    );
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

  if (!supabaseUrl || !serviceRoleKey) {
    return null;
  }

  if (!globalThis.WebSocket) {
    // Provide a lightweight dummy constructor for Node.js server REST-only usage
    (globalThis as unknown as { WebSocket: unknown }).WebSocket = class DummyWebSocket {
      constructor() {}
      addEventListener() {}
      removeEventListener() {}
      send() {}
      close() {}
    };
  }

  try {
    return createSupabaseClient(supabaseUrl, serviceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  } catch (err) {
    console.warn("[SUPABASE ADMIN INIT NOTICE]", err);
    return null;
  }
}
