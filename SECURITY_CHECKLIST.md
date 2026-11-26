# Security Checklist — ClownBros

Status legend:
- **PASS** — Verified with evidence in this repository.
- **FAIL** — Vulnerability or missing control identified.
- **NOT TESTED** — Not verified in this audit (e.g., external infra or separate repo).
- **NOT APPLICABLE** — Does not apply to this application.

---

## 1. Frontend Security

| Requirement | Status | Evidence / Notes |
|---|---|---|
| No `dangerouslySetInnerHTML`, `innerHTML`, `eval()`, or `new Function()` | **PASS** | Verified via `Select-String` scan across `src/` (0 matches). |
| No secrets or API keys exposed in client bundles (`NEXT_PUBLIC_*`) | **PASS** | Verified via `Select-String` scan across `src/`; all DB/SMTP env vars are server-only. |
| No sensitive user data in `localStorage` or `sessionStorage` | **PASS** | Only theme selection key is stored in `sessionStorage` in `src/components/ThemeProvider.tsx`. |
| Security headers configured (`CSP`, `HSTS`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`) | **PASS** | Configured in `next.config.ts` (`headers()`). |
| `X-Powered-By` server banner disabled | **PASS** | `poweredByHeader: false` set in `next.config.ts`. |
| Safe external URL handling (`http:`/`https:` validation) | **PASS** | `isValidHttpUrl` blocks `javascript:`/`data:` in `src/lib/security.ts`. |

---

## 2. Backend & API Security

| Requirement | Status | Evidence / Notes |
|---|---|---|
| Server-side input validation & sanitization on all `POST` endpoints | **PASS** | Enforced in `src/app/api/contact/route.ts` and `src/app/api/careers/route.ts` via `src/lib/security.ts`. |
| Content-Type (`application/json`) & request size limits (`16 KB`) enforced | **PASS** | `parseJsonBody` tested (returns `415` / `413`); verified by `security-check.ts`. |
| Rate limiting on public API routes (`GET` & `POST`) | **PASS** | `checkRateLimit` applied to `/api/contact`, `/api/careers`, `/api/ecosystem`; returns `429` + `Retry-After`. *(In-memory per instance; edge/Redis recommended for multi-instance scale.)* |
| CSRF / Same-Origin protection on state-changing `POST` endpoints | **PASS** | `verifySameOrigin` enforced on `POST /api/contact` and `POST /api/careers`; verified by `security-check.ts`. |
| Email header injection & HTML injection prevention | **PASS** | `sanitizeSingleLine` strips `\r`/`\n`/control chars; `escapeHtml` applied in `src/lib/emailTemplates.ts`. |
| Safe error responses (no stack traces or raw `error.message` leaks) | **PASS** | Generic error responses returned in `contact`, `careers`, and `ecosystem` routes. |

---

## 3. Authentication & Authorization

| Requirement | Status | Evidence / Notes |
|---|---|---|
| Secure password hashing (`bcrypt` cost 12) for seeded `AdminUser` | **PASS** | `bcrypt.hash(defaultPassword, 12)` in `prisma/seed.ts`. |
| No hardcoded fallback admin passwords or plaintext password logs | **PASS** | Removed hardcoded password & `console.log` from `prisma/seed.ts`. |
| Login, session cookies (`HttpOnly`, `Secure`, `SameSite`), RBAC, IDOR checks | **NOT APPLICABLE / NOT TESTED** | No auth/login routes exist in `clownbros`; admin auth & RBAC reside in the separate `clownbros-dashboard` repository (audit separately). |

---

## 4. Database Security

| Requirement | Status | Evidence / Notes |
|---|---|---|
| Parameterized ORM queries only (no raw string-interpolated SQL) | **PASS** | All queries use Prisma Client (`src/lib/db.ts`, `src/app/api/*`). |
| Explicit `select` projections on public `GET` endpoints | **PASS** | `db.job.findMany` and `db.ecosystemItem.findMany` use explicit `select`. |
| Foreign-key ownership/state check before linking `jobId` | **PASS** | `POST /api/careers` verifies `id` exists and `isActive: true` before linking. |
| Automated encrypted backups & restoration testing (Neon) | **NOT TESTED** | Managed in Neon console; verify backup retention & restore drill manually. |

---

## 5. File Uploads & Storage

| Requirement | Status | Evidence / Notes |
|---|---|---|
| File upload validation, size limits, randomized filenames, safe storage | **NOT APPLICABLE** | Application has no file upload endpoints. |

---

## 6. Secrets, Dependencies & Infrastructure

| Requirement | Status | Evidence / Notes |
|---|---|---|
| `.env` ignored by `.gitignore` and not tracked in Git | **PASS** | Verified via `.gitignore` and `git ls-files ".env*"`. |
| `.env.example` contains placeholder values only | **PASS** | Updated `ADMIN_INITIAL_PASSWORD` to `CHANGE_ME_STRONG_ADMIN_PASSWORD`. |
| Zero known Critical/High vulnerabilities in production dependencies | **FAIL** | `npm audit --omit=dev --json` reports 7 advisories (1 Critical, 4 High, 2 Moderate) including `next@16.2.9`. Upgrade to `next >= 16.4.6` required. |
| Production `next build` & HTTPS/TLS verification | **NOT TESTED** | Run `npm run build` and verify HTTPS/HSTS headers in production deployment. |
