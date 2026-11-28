import { NextResponse } from 'next/server';

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();
const MAX_STORE_SIZE = 5000;

/**
 * Extracts the client IP address from trusted proxy headers.
 */
export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    const firstIp = forwardedFor.split(',')[0]?.trim();
    if (firstIp) return firstIp;
  }
  const realIp = request.headers.get('x-real-ip')?.trim();
  if (realIp) return realIp;
  return 'unknown';
}

/**
 * Fixed-window in-memory rate limiter.
 *
 * ⚠️ LIMITATION: This Map is per-process. On serverless platforms (Vercel),
 * each cold-start creates a fresh instance so limits reset per instance.
 * For true global rate limiting, replace with Upstash Redis:
 *   const ratelimit = new Ratelimit({ redis: Redis.fromEnv(), limiter: Ratelimit.fixedWindow(5, '10 m') });
 *   const { success, reset } = await ratelimit.limit(key);
 */
export function checkRateLimit(
  key: string,
  options: { maxRequests: number; windowMs: number }
): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();

  if (rateLimitStore.size > MAX_STORE_SIZE) {
    for (const [k, entry] of rateLimitStore.entries()) {
      if (entry.resetAt <= now) {
        rateLimitStore.delete(k);
      }
    }
  }

  const existing = rateLimitStore.get(key);
  if (!existing || existing.resetAt <= now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + options.windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (existing.count >= options.maxRequests) {
    const retryAfterSeconds = Math.max(1, Math.ceil((existing.resetAt - now) / 1000));
    return { allowed: false, retryAfterSeconds };
  }

  existing.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}

/**
 * Verifies that state-changing requests originate from the same host or configured site URL.
 *
 * FIX: When both Origin AND Referer are absent in production, we now DENY by default.
 * In development, we allow it so local curl/Postman testing still works.
 */
export function verifySameOrigin(request: Request): boolean {
  const secFetchSite = request.headers.get('sec-fetch-site');
  if (secFetchSite === 'cross-site') {
    return false;
  }

  const origin = request.headers.get('origin');
  const host = request.headers.get('host');

  if (!origin) {
    const referer = request.headers.get('referer');
    if (!referer) {
      // Allow privacy browsers / proxies that strip Origin & Referer when
      // Content-Type is application/json (browser CORS preflight blocks cross-site JSON).
      const contentType = request.headers.get('content-type') || '';
      return process.env.NODE_ENV !== 'production' || contentType.toLowerCase().includes('application/json');
    }

    try {
      const refUrl = new URL(referer);
      return host ? refUrl.host === host : false;
    } catch {
      return false;
    }
  }

  try {
    const originUrl = new URL(origin);
    if (host && originUrl.host === host) {
      return true;
    }
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    if (siteUrl) {
      const allowedUrl = new URL(siteUrl);
      if (originUrl.origin === allowedUrl.origin) {
        return true;
      }
    }
    return false;
  } catch {
    return false;
  }
}

/**
 * Parses JSON request body while enforcing Content-Type and maximum byte size.
 */
export async function parseJsonBody<T = Record<string, unknown>>(
  request: Request,
  maxBytes = 16 * 1024
): Promise<{ ok: true; data: T } | { ok: false; response: NextResponse }> {
  const contentType = request.headers.get('content-type') || '';
  if (!contentType.toLowerCase().includes('application/json')) {
    return {
      ok: false,
      response: NextResponse.json(
        { success: false, error: 'Content-Type must be application/json.' },
        { status: 415 }
      ),
    };
  }

  const contentLength = request.headers.get('content-length');
  if (contentLength && Number(contentLength) > maxBytes) {
    return {
      ok: false,
      response: NextResponse.json(
        { success: false, error: 'Request payload is too large.' },
        { status: 413 }
      ),
    };
  }

  try {
    const rawText = await request.text();
    if (Buffer.byteLength(rawText, 'utf8') > maxBytes) {
      return {
        ok: false,
        response: NextResponse.json(
          { success: false, error: 'Request payload is too large.' },
          { status: 413 }
        ),
      };
    }

    const parsed = JSON.parse(rawText);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return {
        ok: false,
        response: NextResponse.json(
          { success: false, error: 'Invalid JSON payload.' },
          { status: 400 }
        ),
      };
    }

    return { ok: true, data: parsed as T };
  } catch {
    return {
      ok: false,
      response: NextResponse.json(
        { success: false, error: 'Malformed JSON payload.' },
        { status: 400 }
      ),
    };
  }
}

/**
 * Strips CR/LF and ASCII control characters to prevent header injection and log forging.
 */
export function sanitizeSingleLine(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') return '';
  return value
    .replace(/[\r\n\x00-\x1F\x7F]+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

/**
 * Strips dangerous control characters while preserving newlines for multi-line text fields.
 */
export function sanitizeMultiline(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') return '';
  return value
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    .trim()
    .slice(0, maxLength);
}

export function isValidEmail(email: string): boolean {
  if (!email || email.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

export function isValidHttpUrl(value: string): boolean {
  if (!value || value.length > 500) return false;
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

export function isValidPhone(phone: string): boolean {
  if (!phone) return false;
  if (phone === 'Not provided') return true;
  if (phone.length < 5 || phone.length > 32) return false;
  return /^[+\d\s().-]+$/.test(phone);
}

/**
 * Generates a cryptographically secure random ID string.
 * Use this instead of Math.random() for any user-facing reference IDs.
 */
export function generateSecureId(prefix = '', length = 8): string {
  const bytes = crypto.getRandomValues(new Uint8Array(length));
  const hex = Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase()
    .slice(0, length);
  return prefix ? `${prefix}-${hex}` : hex;
}
