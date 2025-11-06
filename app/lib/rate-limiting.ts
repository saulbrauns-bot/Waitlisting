/**
 * In-memory rate limiter for API routes
 * Simple implementation for early testing - consider Redis/Upstash for production
 */

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 60 seconds

/**
 * Check if the given IP address is within rate limits
 * @param ip - IP address to check
 * @returns true if within limits, false if exceeded
 */
export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetAt) {
    // Start new window
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  record.count++;
  return true;
}

/**
 * Clean up expired entries periodically (runs every 5 minutes)
 */
export function startRateLimitCleanup(): void {
  setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of rateLimitMap.entries()) {
      if (now > record.resetAt) {
        rateLimitMap.delete(ip);
      }
    }
  }, 5 * 60 * 1000);
}

// Auto-start cleanup when module is imported
startRateLimitCleanup();
