import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { buildAdminLeadEmail, buildClientConfirmationEmail } from '@/lib/emailTemplates';
import {
  checkRateLimit,
  getClientIp,
  isValidEmail,
  isValidPhone,
  parseJsonBody,
  sanitizeMultiline,
  sanitizeSingleLine,
  verifySameOrigin,
} from '@/lib/security';
import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    if (!verifySameOrigin(request)) {
      return NextResponse.json({ error: 'Invalid request origin.' }, { status: 403 });
    }

    const ip = getClientIp(request);
    const rateLimit = checkRateLimit(`contact:${ip}`, {
      maxRequests: 5,
      windowMs: 10 * 60 * 1000, // 5 submissions per 10 minutes per IP
    });
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a few minutes before trying again.' },
        { status: 429, headers: { 'Retry-After': String(rateLimit.retryAfterSeconds) } }
      );
    }

    const parsed = await parseJsonBody<Record<string, unknown>>(request, 16 * 1024);
    if (!parsed.ok) {
      return parsed.response;
    }

    const body = parsed.data;
    const name = sanitizeSingleLine(body.name, 100);
    const email = sanitizeSingleLine(body.email, 254).toLowerCase();
    const phone = sanitizeSingleLine(body.phone, 32);
    const details = sanitizeMultiline(body.details, 4000);
    const budget = body.budget ? sanitizeSingleLine(body.budget, 64) : null;

    if (!name || !email || !phone || !details) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
    }

    if (!isValidPhone(phone)) {
      return NextResponse.json({ error: 'Please provide a valid phone number.' }, { status: 400 });
    }

    const rawTypes = Array.isArray(body.projectTypes) ? body.projectTypes : [];
    const safeProjectTypes = rawTypes
      .slice(0, 10)
      .map((item) => sanitizeSingleLine(item, 60))
      .filter(Boolean);

    const typesStr = safeProjectTypes.length > 0 ? safeProjectTypes.join(', ') : 'None selected';
    const budgetStr = budget || null;

    // Save lead into Neon Database so it appears in ClownBros Dashboard
    try {
      await db.inquiry.create({
        data: {
          name,
          email,
          phone: phone || null,
          budget: budgetStr,
          serviceNeeded: typesStr,
          message: details,
          status: 'NEW',
        },
      });
    } catch (dbErr) {
      console.error('Failed to save inquiry to database:', dbErr instanceof Error ? dbErr.message : 'DB error');
      return NextResponse.json(
        { error: 'Unable to save your inquiry right now. Please try again or email us directly.' },
        { status: 503 }
      );
    }

    // SMTP Email notification
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
    const smtpSecure = process.env.SMTP_SECURE === 'true';
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (smtpHost && smtpUser && smtpPass) {
      const transporter: Transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpSecure,
        auth: { user: smtpUser, pass: smtpPass },
      });

      const emailPayload = {
        name,
        email,
        phone,
        typesStr,
        budgetStr,
        details,
      };

      const adminTemplate = buildAdminLeadEmail(emailPayload);
      const clientTemplate = buildClientConfirmationEmail(emailPayload);

      // Safe header display name (strip quotes/backslashes as extra defense)
      const safeFromName = name.replace(/["\\]/g, '');

      // FIX: await emails so they are not dropped on serverless function exit.
      // Trade-off: adds ~1-2s latency but guarantees delivery.
      // TODO: migrate to a durable queue (Resend, Inngest) for zero-latency + retries.
      try {
        await Promise.all([
          transporter.sendMail({
            from: `"${safeFromName}" <${smtpUser}>`,
            to: process.env.ADMIN_NOTIFICATION_EMAIL || process.env.SMTP_USER,
            replyTo: email,
            subject: adminTemplate.subject,
            text: adminTemplate.text,
            html: adminTemplate.html,
          }),
          transporter.sendMail({
            from: `"ClownBros Team" <${smtpUser}>`,
            to: email,
            subject: clientTemplate.subject,
            text: clientTemplate.text,
            html: clientTemplate.html,
          }),
        ]);
      } catch (mailErr) {
        // Email failure is non-fatal — lead is already saved to DB.
        console.error('Email delivery failed:', mailErr instanceof Error ? mailErr.message : 'Mail error');
      }
    }

    return NextResponse.json({ success: true, message: 'Inquiry received successfully' });
  } catch (error: unknown) {
    console.error('Error processing contact inquiry:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(
      { error: 'Unable to process your inquiry right now. Please try again later.' },
      { status: 500 }
    );
  }
}
