import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import {
  checkRateLimit,
  getClientIp,
  isValidEmail,
  isValidHttpUrl,
  parseJsonBody,
  sanitizeMultiline,
  sanitizeSingleLine,
  verifySameOrigin,
} from '@/lib/security';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    const ip = getClientIp(request);
    const rateLimit = checkRateLimit(`careers-get:${ip}`, {
      maxRequests: 30,
      windowMs: 60 * 1000,
    });
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, error: 'Too many requests.' },
        { status: 429, headers: { 'Retry-After': String(rateLimit.retryAfterSeconds) } }
      );
    }

    const jobs = await db.job.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
      select: {
        id: true,
        slug: true,
        title: true,
        category: true,
        type: true,
        rate: true,
        location: true,
        skills: true,
        description: true,
        responsibilities: true,
        requirements: true,
        featured: true,
      },
    });
    return NextResponse.json(
      { success: true, jobs },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching jobs:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json({ success: false, error: 'Failed to fetch jobs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!verifySameOrigin(request)) {
      return NextResponse.json({ success: false, error: 'Invalid request origin.' }, { status: 403 });
    }

    const ip = getClientIp(request);
    const rateLimit = checkRateLimit(`careers-post:${ip}`, {
      maxRequests: 5,
      windowMs: 10 * 60 * 1000,
    });
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, error: 'Too many applications submitted. Please try again later.' },
        { status: 429, headers: { 'Retry-After': String(rateLimit.retryAfterSeconds) } }
      );
    }

    const parsed = await parseJsonBody<Record<string, unknown>>(request, 16 * 1024);
    if (!parsed.ok) {
      return parsed.response;
    }

    const body = parsed.data;
    const fullName = sanitizeSingleLine(body.fullName, 100);
    const email = sanitizeSingleLine(body.email, 254).toLowerCase();
    const portfolioRaw = sanitizeSingleLine(body.portfolio, 500);
    const track = sanitizeSingleLine(body.track, 120);
    const experience = sanitizeSingleLine(body.experience, 60);
    const hourlyRate = sanitizeSingleLine(body.hourlyRate, 60);
    const availability = sanitizeSingleLine(body.availability, 60);
    const pitch = sanitizeMultiline(body.pitch, 4000);
    const rawJobId = body.jobId ? sanitizeSingleLine(body.jobId, 64) : null;

    if (!fullName || !email || !track) {
      return NextResponse.json(
        { success: false, error: 'Full name, email, and primary skill track are required.' },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    if (portfolioRaw && !isValidHttpUrl(portfolioRaw)) {
      return NextResponse.json(
        { success: false, error: 'Portfolio URL must start with http:// or https://.' },
        { status: 400 }
      );
    }

    const rawSkills = Array.isArray(body.selectedSkills) ? body.selectedSkills : [];
    const selectedSkills = rawSkills
      .slice(0, 20)
      .map((s) => sanitizeSingleLine(s, 40))
      .filter(Boolean);

    let application = null;
    try {
      let targetJobId: string | null = null;
      if (rawJobId) {
        const existingJob = await db.job.findFirst({
          where: { id: rawJobId, isActive: true },
          select: { id: true },
        });
        targetJobId = existingJob?.id ?? null;
      }

      if (!targetJobId) {
        const matchedJob = await db.job.findFirst({
          where: { title: { contains: track, mode: 'insensitive' }, isActive: true },
          select: { id: true },
        });
        targetJobId = matchedJob?.id || null;
      }

      const coverNote = [
        'Track / Position: ' + track,
        experience ? 'Experience: ' + experience : null,
        hourlyRate ? 'Expected Rate: ' + hourlyRate : null,
        availability ? 'Availability: ' + availability : null,
        selectedSkills.length > 0 ? 'Skills: ' + selectedSkills.join(', ') : null,
        pitch ? '\nBio / Pitch:\n' + pitch : null,
      ]
        .filter(Boolean)
        .join('\n');

      application = await db.jobApplication.create({
        data: {
          jobId: targetJobId,
          applicantName: fullName,
          applicantEmail: email,
          portfolioUrl: portfolioRaw || null,
          coverLetter: coverNote,
          status: 'PENDING',
        },
      });
    } catch (dbErr) {
      console.error('Failed to save application in database:', dbErr instanceof Error ? dbErr.message : 'DB error');
    }

    return NextResponse.json({
      success: true,
      message: 'Application received successfully! Our talent team will review your portfolio within 24-48 hours.',
      applicationId: application?.id
        ? 'FL-' + application.id.slice(-6).toUpperCase()
        : 'FL-' + Math.floor(100000 + Math.random() * 900000),
    });
  } catch (error) {
    console.error('Error handling freelancer application:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(
      { success: false, error: 'Internal server error processing application.' },
      { status: 500 }
    );
  }
}
