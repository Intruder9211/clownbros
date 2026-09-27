import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import nodemailer from 'nodemailer';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { name, email, phone, details, budget, projectTypes } = await request.json();

    if (!name || !email || !phone || !details) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const typesStr = projectTypes && projectTypes.length > 0 ? projectTypes.join(', ') : 'None selected';
    const budgetStr = budget ? budget : null;

    // Save lead into Neon Database so it appears in ClownBros Dashboard
    try {
      await db.inquiry.create({
        data: {
          name,
          email: email.toLowerCase().trim(),
          phone: phone || null,
          budget: budgetStr,
          serviceNeeded: typesStr,
          message: details,
          status: 'NEW',
        },
      });
    } catch (dbErr) {
      console.error('Failed to save inquiry to database:', dbErr);
    }

    // SMTP Email notification
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = parseInt(process.env.SMTP_PORT || '587');
    const smtpSecure = process.env.SMTP_SECURE === 'true';
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (smtpHost && smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpSecure,
        auth: { user: smtpUser, pass: smtpPass },
      });

      // Send to Admin
      const adminMail = transporter.sendMail({
        from: '"' + name + '" <' + smtpUser + '>',
        to: process.env.ADMIN_NOTIFICATION_EMAIL || 'singhmohit101103@gmail.com',
        replyTo: email,
        subject: 'New Contact Lead - ' + name,
        text: 'Name: ' + name + '\nEmail: ' + email + '\nPhone: ' + phone + '\nTypes: ' + typesStr + '\nBudget: ' + (budgetStr || 'N/A') + '\n\nDetails:\n' + details,
      });

      // Send Thank you to Client
      const clientMail = transporter.sendMail({
        from: '"ClownBros Team" <' + smtpUser + '>',
        to: email,
        subject: 'Thank you for contacting ClownBros!',
        text: `Hi ${name},\n\nThank you for reaching out to us! We have received your project details and our team will get back to you shortly.\n\nBest regards,\nThe ClownBros Team\n\n--- Your Details ---\nService: ${typesStr}\nMessage: ${details}`,
      });

      // We don't await the emails to ensure the API responds extremely fast (under 2s)
      // The emails will process in the background.
      Promise.all([adminMail, clientMail]).catch(err => {
        console.error('Failed to send background emails:', err);
      });
    }

    return NextResponse.json({ success: true, message: 'Inquiry received successfully' });
  } catch (error: any) {
    console.error('Error processing contact inquiry:', error);
    return NextResponse.json({ error: error.message || 'Failed to submit inquiry' }, { status: 500 });
  }
}
