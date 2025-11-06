import { NextRequest } from 'next/server';

/**
 * Extract IP address from request headers
 * Checks common headers set by proxies and CDNs
 *
 * @param request - Next.js request object
 * @returns IP address string or null if not found
 */
export function getIpAddress(request: NextRequest): string | null {
  // Check common headers set by proxies/CDNs
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }

  // Fallback to request IP (may be localhost in dev)
  // @ts-expect-error - ip property exists at runtime but not in types
  return request.ip || null;
}
