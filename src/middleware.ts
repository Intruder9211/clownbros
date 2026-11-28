import { NextResponse, type NextRequest } from 'next/server';

/**
 * Next.js Edge Middleware — runs before every request.
 *
 * Purpose:
 * 1. Generate a per-request cryptographic nonce for use with a nonce-based CSP.
 *    This allows us to remove 'unsafe-inline' from script-src while still letting
 *    Next.js hydration scripts run.
 * 2. The nonce is exposed as a request header so Server Components can read it.
 *
 * NOTE ON 'unsafe-inline' REMOVAL:
 * The nonce is set here, but removing 'unsafe-inline' from script-src in next.config.ts
 * also requires passing the nonce to every <Script> and inline <script> tag via the
 * Next.js nonce prop. This is done by reading `x-nonce` in the root layout.
 *
 * See: https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy
 */
export function middleware(request: NextRequest) {
  // Generate a cryptographically random nonce (base64, 16 bytes → 24 chars)
  const nonce = Buffer.from(crypto.getRandomValues(new Uint8Array(16))).toString('base64');

  const isDev = process.env.NODE_ENV !== 'production';

  const csp = [
    `default-src 'self'`,
    // Allow Next.js hydration scripts only with matching nonce (removes unsafe-inline in prod)
    `script-src 'self' 'nonce-${nonce}'${isDev ? " 'unsafe-eval'" : ''}`,
    `style-src 'self' 'unsafe-inline'`, // unsafe-inline unavoidable for GSAP/Tailwind inline styles
    `img-src 'self' data: blob:`,
    `font-src 'self' data:`,
    `connect-src 'self'`,
    `worker-src 'self' blob:`,
    `frame-ancestors 'none'`,
    `base-uri 'self'`,
    `form-action 'self'`,
    `object-src 'none'`,
    ...(isDev ? [] : [`upgrade-insecure-requests`]),
  ].join('; ');

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('x-csp', csp);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  // Set the CSP header on the response
  response.headers.set('Content-Security-Policy', csp);

  return response;
}

export const config = {
  /*
   * Match all routes except:
   * - _next/static  (static assets)
   * - _next/image   (image optimization)
   * - favicon.ico
   * - public assets (images, svg, fonts)
   */
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|images/|icons/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|eot)$).*)',
  ],
};
