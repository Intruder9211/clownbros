# Security Audit Report — ClownBros

**Audit Date:** 2026-11-26  
**Scope:** `clownbros` web application (`c:\Users\singh\OneDrive\Desktop\clownbros`)  
**Standards Referenced:** OWASP Top 10:2025, OWASP ASVS 5.0.0, OWASP API Security, OWASP Authentication & Session Management Cheat Sheets.

---

## 1. Project Architecture & Technologies Inspected

- **Frontend / Full-Stack Framework:** Next.js `16.2.9` (App Router, Turbopack), React `19.2.4`, TypeScript `5`, Tailwind CSS `4`, GSAP, Framer Motion, Three.js (`@react-three/fiber`, `@react-three/drei`).
- **Backend / API Layer:** Next.js Route Handlers:
  - `src/app/api/contact/route.ts` (`POST`) — Saves project inquiries to PostgreSQL and sends SMTP emails via `nodemailer`.
  - `src/app/api/careers/route.ts` (`GET`, `POST`) — Lists active jobs and saves freelancer/job applications.
  - `src/app/api/ecosystem/route.ts` (`GET`) — Lists active ecosystem/partner items.
- **Database & ORM:** PostgreSQL (Neon) via Prisma `6.4.1` (`prisma/schema.prisma`, `src/lib/db.ts`, `prisma/seed.ts`).
- **Authentication & Dashboard Architecture:** This public-facing `clownbros` application has no login/session endpoints; admin authentication (`AdminUser` model with `bcryptjs`) and management CRUD live in the separate `clownbros-dashboard` application sharing the Neon PostgreSQL database.
- **Secrets & Config:** `.env` (gitignored via `.env*`), `.env.example`, `next.config.ts`, `test-email.js`.

---

## 2. Threat Model Summary

- **Key Assets:** Neon PostgreSQL database (`Inquiry`, `Job`, `JobApplication`, `AdminUser`, `CompanyProfile`), SMTP credentials (`SMTP_USER`, `SMTP_PASS`), client PII (names, emails, phone numbers, portfolio links, project briefs).
- **Entry Points:** Public pages (`src/app/**`), `POST /api/contact`, `GET/POST /api/careers`, `GET /api/ecosystem`, HTTP headers/responses.
- **Trust Boundaries:** Browser ↔ Next.js Route Handlers ↔ Neon PostgreSQL / External SMTP Server.
- **Primary Threat Actors:** Automated spam/DoS bots, cross-origin CSRF attackers, XSS/injection attackers targeting admin email clients or database inputs, supply-chain exploits via outdated dependencies.

---

## 3. Vulnerabilities Discovered (Ranked by Severity)

| ID | Severity | Vulnerability / Finding | Status |
|---|---|---|---|
| **V-01** | **Critical** | `next@16.2.9` and transitive production dependencies (`sharp`, `postcss`, `source-map-js`, `fflate`, `baseline-browser-mapping`) have 7 known advisories in `npm audit --omit=dev --json` (1 Critical, 4 High, 2 Moderate), including Next.js middleware/proxy bypass (`GHSA-6gpp-xcg3-4w24`), Server Actions DoS (`GHSA-m99w-x7hq-7vfj`), and SSRF (`GHSA-89xv-2m56-2m9x`). | **Documented (Manual Upgrade Required)** |
| **V-02** | **High** | Missing HTTP security headers (`Content-Security-Policy`, `Strict-Transport-Security`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`) and `X-Powered-By` header disclosure in `next.config.ts`. | **Fixed** |
| **V-03** | **High** | Public API routes (`POST /api/contact`, `GET/POST /api/careers`, `GET /api/ecosystem`) lacked rate limiting, request size limits, `Content-Type` enforcement, strict input validation, and explicit Prisma `select` projections. | **Fixed** |
| **V-04** | **High** | Potential Email Header Injection (`\r`/`\n` in `name`/`subject`) and HTML injection in `src/app/api/contact/route.ts` + `src/lib/emailTemplates.ts`, plus raw `error.message` disclosure in 500 error responses. | **Fixed** |
| **V-05** | **High** | Hardcoded fallback admin password (`'ClownBros#2026!Secure'`) and plaintext password `console.log` in `prisma/seed.ts` (and non-placeholder password in `.env.example`). | **Fixed** |
| **V-06** | **Medium** | `POST /api/contact` and `POST /api/careers` lacked `Origin`/`Referer` CSRF verification and `portfolioUrl` protocol validation (`javascript:`/`data:` URLs). | **Fixed** |
| **V-07** | **Medium** | `POST /api/careers` accepted client-supplied `jobId` without verifying that the referenced `Job` exists and `isActive: true`. | **Fixed** |
| **V-08** | **Low** | `test-email.js` in the repository root logs full `nodemailer` transport info/error objects during manual CLI runs. | **Documented** |

---

## 4. Files Created & Modified

- **Created:** `src/lib/security.ts` — In-memory sliding-window rate limiter, IP extraction, `verifySameOrigin` CSRF guard, `parseJsonBody` (with `Content-Type: application/json` and 16 KB size limit), `sanitizeSingleLine`, `sanitizeMultiline`, `isValidEmail`, `isValidHttpUrl`, `isValidPhone`.
- **Modified:** `next.config.ts` — Disabled `poweredByHeader` and added `Content-Security-Policy`, `Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, and `Permissions-Policy` headers across `/(.*)`.
- **Modified:** `src/app/api/contact/route.ts` — Added origin check, per-IP rate limiting (5 req / 10 min), 16 KB JSON size limit, strict field/email/phone validation, header-safe sender name, and generic 500 error responses.
- **Modified:** `src/app/api/careers/route.ts` — Added rate limiting (`GET`: 30 req/min, `POST`: 5 req/10 min), origin check, 16 KB JSON size limit, `http:`/`https:` portfolio URL validation, `jobId` existence/`isActive` verification, and explicit Prisma `select` projections.
- **Modified:** `src/app/api/ecosystem/route.ts` — Added rate limiting (30 req/min) and explicit Prisma `select` projection.
- **Modified:** `src/lib/emailTemplates.ts` — HTML-escaped all user inputs (`escapeHtml`) in both admin and client email templates.
- **Modified:** `prisma/seed.ts` & `.env.example` — Removed hardcoded fallback admin password and plaintext password logging; replaced `.env.example` sample password with `CHANGE_ME_STRONG_ADMIN_PASSWORD`.

---

## 5. Verification & Tests Executed

| Check / Test | Command / Scope | Result |
|---|---|---|
| **TypeScript Type-Check** | `.\node_modules\.bin\tsc.cmd --noEmit` | **PASS** (exit code `0`) |
| **ESLint** | `.\node_modules\.bin\eslint.cmd next.config.ts prisma/seed.ts src/lib/security.ts src/lib/emailTemplates.ts src/app/api/contact/route.ts src/app/api/careers/route.ts src/app/api/ecosystem/route.ts` | **PASS** (exit code `0`, 0 errors, 0 warnings) |
| **Security Unit Verification** | `.\node_modules\.bin\tsx.cmd .../scratch/security-check.ts` (6 suites: CR/LF header injection stripping, email/phone/`javascript:` URL blocking, cross-origin CSRF rejection, `415`/`413` content-type & payload limit enforcement, rate limiter `429` trigger, HTML escaping in both email templates) | **PASS** (`ALL_SECURITY_UNIT_TESTS_PASSED (6/6 suites)`, exit code `0`) |
| **Dependency Audit** | `npm audit --omit=dev --json` | **FAIL (7 advisories)** — 1 Critical, 4 High, 2 Moderate (details in Section 3, V-01) |
| **Static Pattern Scan** | `Select-String` across `src/` for `dangerouslySetInnerHTML`, `innerHTML`, `eval(`, `new Function`, `localStorage`, `sessionStorage`, `NEXT_PUBLIC_`, `process.env` | **PASS** — Zero unsafe DOM sinks or client-exposed secrets; `sessionStorage` only stores theme ID |
| **Git Secret Tracking Check** | `git ls-files ".env*"` | **PASS** — Only `.env.example` is tracked; `.env` is ignored by `.gitignore` |

---

## 6. Tests Not Executed / Remaining Risks

- **Live End-to-End HTTP / Database Integration Tests:** Live `POST /api/contact` and `POST /api/careers` requests against a running Next.js server + Neon DB were not executed in this audit to avoid writing synthetic test records to the live database.
- **Next.js Production Build (`npm run build`):** Not re-run in this session (previously blocked on Windows by `EPERM` file lock on Prisma's `query_engine-windows.dll.node` while dev server/OneDrive was active).
- **In-Memory Rate Limiter Scope:** `src/lib/security.ts` uses an in-memory `Map` per server instance. In multi-instance serverless deployments (e.g., Vercel), distributed rate limiting (Upstash Redis / Vercel WAF / Cloudflare Turnstile) is recommended for global enforcement.
- **Separate `clownbros-dashboard` Repository:** Admin authentication, RBAC, session cookies, and admin CRUD endpoints reside in the separate dashboard codebase and were outside this repository's file scope.

---

## 7. Required Manual Actions Before Production Deployment

1. **Upgrade `next` & Run `npm audit fix`:** Upgrade `next` from `16.2.9` to `>= 16.4.6` (and resolve `sharp`, `postcss`, `source-map-js`, `fflate`, `baseline-browser-mapping`) in a dedicated maintenance step, then run `npm run build` and smoke-test all pages and Three.js scenes.
2. **Rotate Credentials if Previously Shared:** If any SMTP, database, or initial admin credentials were ever used in non-local environments, rotate them in Neon and your SMTP provider.
3. **Enable Distributed Bot/Rate Protection:** Configure Cloudflare Turnstile (`CLOUDFLARE_TURNSTILE_SECRET_KEY` is already stubbed in `.env.example`) or edge rate limiting in Vercel/Cloudflare for `/api/contact` and `/api/careers`.
4. **Verify Production HTTPS & Neon Backups:** Confirm HSTS + HTTPS enforcement on your hosting provider and verify Neon automated backup retention & restoration drills.
5. **Audit `clownbros-dashboard` Separately:** Perform an equivalent authentication, RBAC, and session security audit on the separate `clownbros-dashboard` project.
