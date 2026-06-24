import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, phone, details, budget, projectTypes } = await request.json();

    // Verify required fields
    if (!name || !email || !phone || !details) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const typesStr = projectTypes && projectTypes.length > 0 ? projectTypes.join(', ') : 'None selected';
    const budgetStr = budget ? budget.replace('_', ' – ') : 'Not specified';

    // Retrieve environment variables
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = parseInt(process.env.SMTP_PORT || '587');
    const smtpSecure = process.env.SMTP_SECURE === 'true';
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    // Check if configuration is missing
    if (!smtpHost || !smtpUser || !smtpPass) {
      console.warn('Warning: SMTP credentials are not configured in environment variables.');
      console.log('=== Mock Email Submission ===');
      console.log(`To: singhmohit101103@gmail.com`);
      console.log(`Subject: New Contact Form Submission - ${name}`);
      console.log(`Body:\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nProject Types: ${typesStr}\nBudget: ${budgetStr}\nDetails: ${details}`);
      console.log('-----------------------------');

      return NextResponse.json({
        success: true,
        message: 'Form processed. (Development Mode: Mock email printed to console)'
      });
    }

    // Configure transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // Setup mail parameters
    const mailOptions = {
      from: `"${name}" <${smtpUser}>`,
      to: 'singhmohit101103@gmail.com',
      replyTo: email,
      subject: `New Contact Form Submission - ${name}`,
      text: `
You have received a new contact form submission:

Name: ${name}
Email: ${email}
Phone: ${phone}
Project Types: ${typesStr}
Estimated Budget: ${budgetStr}

Project Details:
${details}
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: error.message || 'Failed to send email' }, { status: 500 });
  }
}
