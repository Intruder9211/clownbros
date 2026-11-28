import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { checkRateLimit, getClientIp } from '@/lib/security';

// FIX: Ecosystem items rarely change — use ISR (5-minute cache) instead of no-store.
// This saves a DB round-trip on every single page load from every visitor.
export const dynamic = 'force-static';
export const revalidate = 300; // 5 minutes

export async function GET(request: Request) {
  try {
    const ip = getClientIp(request);
    const rateLimit = checkRateLimit(`ecosystem-get:${ip}`, {
      maxRequests: 30,
      windowMs: 60 * 1000,
    });
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, error: 'Too many requests.' },
        { status: 429, headers: { 'Retry-After': String(rateLimit.retryAfterSeconds) } }
      );
    }

    const items = await db.ecosystemItem.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
      select: {
        id: true,
        title: true,
        category: true,
        tagline: true,
        description: true,
        logoUrl: true,
        websiteUrl: true,
        metrics: true,
        featured: true,
      },
    });
    return NextResponse.json(
      { success: true, items },
      {
        headers: {
          // Allow CDN / browser to cache for 5 min; stale-while-revalidate for 10 min
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching ecosystem:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json({ success: false, error: 'Failed to fetch ecosystem' }, { status: 500 });
  }
}
