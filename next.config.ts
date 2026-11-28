import type { NextConfig } from "next";

/**
 * Security headers applied globally via next.config.ts.
 *
 * NOTE ON CSP:
 * Content-Security-Policy is now set per-request with a nonce in src/middleware.ts.
 * This allows us to remove 'unsafe-inline' from script-src while supporting
 * Next.js hydration. The middleware-set CSP header takes precedence over any
 * static CSP set here, so we omit it here to avoid conflicts.
 *
 * All other security headers remain here since they don't need per-request values.
 */
const securityHeaders = [
  {
    // Prevents browsers from sniffing MIME types (stops content-type sniffing attacks)
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    // Denies this site being embedded in iframes (clickjacking prevention)
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    // Forces HTTPS for 2 years, including subdomains, with preload eligibility
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    // Controls how much referrer info is sent — protects user privacy on outbound links
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    // Disables access to sensitive browser APIs we don't use
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  // Remove the X-Powered-By: Next.js header — no need to advertise our stack
  poweredByHeader: false,

  async headers() {
    return [
      {
        // Apply security headers to every route
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;

