import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

/**
 * GET /api/health
 *
 * Basic health check endpoint.
 * - Returns 200 when the app and database are reachable.
 * - Returns 503 when the database is down.
 *
 * Usage: Monitor this in Vercel, UptimeRobot, or any external uptime checker.
 * This endpoint tells you BEFORE a client does that something is broken.
 */
export async function GET() {
  const start = Date.now();

  try {
    // Lightweight DB connectivity check — does not read sensitive data
    await db.$queryRaw`SELECT 1`;
    const latencyMs = Date.now() - start;

    return NextResponse.json(
      {
        status: 'ok',
        db: 'connected',
        latencyMs,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (err) {
    const latencyMs = Date.now() - start;
    console.error('[HealthCheck] Database unreachable:', err instanceof Error ? err.message : 'Unknown error');

    return NextResponse.json(
      {
        status: 'error',
        db: 'unreachable',
        latencyMs,
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }
}
