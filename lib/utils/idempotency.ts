export function generateServerBookingReference(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let randomCode = "";
  for (let i = 0; i < 6; i++) {
    randomCode += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `AIR-BK-2026-${randomCode}`;
}

const processedKeys = new Set<string>();

export function checkAndRegisterIdempotencyKey(key: string): boolean {
  if (!key) return true; // If no key provided, allow initial execution
  if (processedKeys.has(key)) {
    return false; // Key already processed -> duplicate request
  }
  processedKeys.add(key);
  // Auto expire keys after 10 minutes to prevent unneeded memory accumulation
  setTimeout(() => {
    processedKeys.delete(key);
  }, 10 * 60 * 1000);
  return true;
}
