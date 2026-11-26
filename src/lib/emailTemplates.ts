export interface ContactEmailPayload {
  name: string;
  email: string;
  phone: string;
  typesStr: string;
  budgetStr: string | null;
  details: string;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatDetailsHtml(value: string): string {
  return escapeHtml(value).replace(/\r?\n/g, '<br />');
}

/**
 * Builds the HTML + plain-text email sent to the ClownBros admin/receiver
 * when a new contact/project inquiry is submitted.
 */
export function buildAdminLeadEmail(payload: ContactEmailPayload) {
  const safeName = escapeHtml(payload.name);
  const safeEmail = escapeHtml(payload.email);
  const safePhone = escapeHtml(payload.phone);
  const safeTypes = escapeHtml(payload.typesStr);
  const safeBudget = escapeHtml(payload.budgetStr || 'Not specified');
  const safeDetails = formatDetailsHtml(payload.details);
  const receivedAt = new Date().toUTCString();

  const subject = `New Project Lead — ${payload.name}`;

  const text = [
    'NEW PROJECT LEAD — CLOWNBROS',
    '================================',
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone / WhatsApp: ${payload.phone}`,
    `Focus Areas: ${payload.typesStr}`,
    `Estimated Budget: ${payload.budgetStr || 'Not specified'}`,
    `Received: ${receivedAt}`,
    '',
    'Project Brief:',
    payload.details,
  ].join('\n');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background-color:#F4F1EA;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#141414;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F4F1EA;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background-color:#FFFFFF;border:1px solid #E2DDD3;border-radius:16px;overflow:hidden;">
          <!-- Header -->
          <tr>
            <td style="background-color:#111111;padding:24px 28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="font-size:18px;font-weight:800;letter-spacing:0.12em;color:#FFFFFF;text-transform:uppercase;">CLOWNBROS</span>
                    <div style="font-size:11px;letter-spacing:0.14em;color:#A1A1AA;text-transform:uppercase;margin-top:4px;">Admin Lead Notification</div>
                  </td>
                  <td align="right" valign="middle">
                    <span style="display:inline-block;background-color:#E85D2F;color:#FFFFFF;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;padding:6px 12px;border-radius:999px;">New Lead</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Accent Bar -->
          <tr>
            <td style="height:4px;background:linear-gradient(90deg,#E85D2F 0%,#2563EB 45%,#10B981 100%);font-size:0;line-height:0;">&nbsp;</td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:28px;">
              <h1 style="margin:0 0 8px 0;font-size:22px;line-height:1.3;font-weight:700;color:#111111;">New inquiry from ${safeName}</h1>
              <p style="margin:0 0 22px 0;font-size:13px;color:#6B6B6B;">Received on ${escapeHtml(receivedAt)}</p>

              <!-- Lead Metadata Table -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #ECE8DF;border-radius:12px;background-color:#FAF8F4;margin-bottom:22px;">
                <tr>
                  <td style="padding:12px 16px;border-bottom:1px solid #ECE8DF;width:36%;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#6B6B6B;">Client Name</td>
                  <td style="padding:12px 16px;border-bottom:1px solid #ECE8DF;font-size:14px;font-weight:600;color:#111111;">${safeName}</td>
                </tr>
                <tr>
                  <td style="padding:12px 16px;border-bottom:1px solid #ECE8DF;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#6B6B6B;">Work Email</td>
                  <td style="padding:12px 16px;border-bottom:1px solid #ECE8DF;font-size:14px;">
                    <a href="mailto:${safeEmail}" style="color:#2563EB;text-decoration:none;font-weight:600;">${safeEmail}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 16px;border-bottom:1px solid #ECE8DF;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#6B6B6B;">Phone / WhatsApp</td>
                  <td style="padding:12px 16px;border-bottom:1px solid #ECE8DF;font-size:14px;">
                    <a href="tel:${safePhone}" style="color:#111111;text-decoration:none;font-weight:600;">${safePhone}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 16px;border-bottom:1px solid #ECE8DF;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#6B6B6B;">Focus Areas</td>
                  <td style="padding:12px 16px;border-bottom:1px solid #ECE8DF;font-size:14px;color:#111111;">${safeTypes}</td>
                </tr>
                <tr>
                  <td style="padding:12px 16px;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#6B6B6B;">Estimated Budget</td>
                  <td style="padding:12px 16px;font-size:14px;font-weight:600;color:#111111;">${safeBudget}</td>
                </tr>
              </table>

              <!-- Project Brief -->
              <div style="font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#6B6B6B;margin-bottom:8px;">Project Brief</div>
              <div style="padding:16px;border-radius:12px;border:1px solid #ECE8DF;background-color:#FFFFFF;font-size:14px;line-height:1.65;color:#222222;">
                ${safeDetails}
              </div>

              <!-- CTA -->
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:24px;">
                <tr>
                  <td style="background-color:#111111;border-radius:999px;">
                    <a href="mailto:${safeEmail}?subject=${encodeURIComponent('Re: Your Project Inquiry with ClownBros')}" style="display:inline-block;padding:12px 22px;font-size:13px;font-weight:700;color:#FFFFFF;text-decoration:none;">Reply to ${safeName} &rarr;</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:18px 28px;background-color:#FAF8F4;border-top:1px solid #ECE8DF;font-size:12px;color:#78716C;">
              This lead has also been logged in your ClownBros Dashboard.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { subject, text, html };
}

/**
 * Builds the HTML + plain-text confirmation email sent to the client/sender
 * after they submit a project inquiry.
 */
export function buildClientConfirmationEmail(payload: ContactEmailPayload) {
  const safeName = escapeHtml(payload.name);
  const safeTypes = escapeHtml(payload.typesStr);
  const safeBudget = escapeHtml(payload.budgetStr || 'Not specified');
  const safeDetails = formatDetailsHtml(payload.details);

  const subject = 'We received your project brief — ClownBros';

  const text = [
    `Hi ${payload.name},`,
    '',
    'Thank you for reaching out to ClownBros! We have received your project brief and our engineering team is reviewing it.',
    'You can expect an architectural approach and milestone plan from us within 24 hours.',
    '',
    '--- Your Submission Summary ---',
    `Focus Areas: ${payload.typesStr}`,
    `Estimated Budget: ${payload.budgetStr || 'Not specified'}`,
    `Project Brief:\n${payload.details}`,
    '',
    'Best regards,',
    'The ClownBros Team',
    'hello@clownbros.com',
  ].join('\n');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background-color:#F4F1EA;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#141414;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F4F1EA;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background-color:#FFFFFF;border:1px solid #E2DDD3;border-radius:16px;overflow:hidden;">
          <!-- Header -->
          <tr>
            <td style="background-color:#111111;padding:26px 28px;">
              <span style="font-size:20px;font-weight:800;letter-spacing:0.12em;color:#FFFFFF;text-transform:uppercase;">CLOWNBROS</span>
              <div style="font-size:11px;letter-spacing:0.16em;color:#A1A1AA;text-transform:uppercase;margin-top:6px;">We Code. We Create. We Elevate.</div>
            </td>
          </tr>

          <!-- Accent Bar -->
          <tr>
            <td style="height:4px;background:linear-gradient(90deg,#E85D2F 0%,#2563EB 45%,#10B981 100%);font-size:0;line-height:0;">&nbsp;</td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:30px 28px;">
              <div style="font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#E85D2F;margin-bottom:8px;">Project Brief Confirmed</div>
              <h1 style="margin:0 0 14px 0;font-size:24px;line-height:1.28;font-weight:700;color:#111111;">Hi ${safeName}, we&apos;ve got your brief.</h1>
              <p style="margin:0 0 22px 0;font-size:15px;line-height:1.65;color:#444444;">
                Thank you for reaching out to ClownBros. Our engineering team is reviewing your scope and constraints, and we will respond within <strong>24 hours</strong> with an architectural approach and milestone plan.
              </p>

              <!-- What Happens Next -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#FAF8F4;border:1px solid #ECE8DF;border-radius:12px;margin-bottom:24px;">
                <tr>
                  <td style="padding:18px 20px;">
                    <div style="font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#6B6B6B;margin-bottom:12px;">What Happens Next</div>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding-bottom:8px;font-size:13px;line-height:1.5;color:#222222;"><strong style="color:#E85D2F;">01.</strong> Technical review of your goals &amp; stack requirements</td>
                      </tr>
                      <tr>
                        <td style="padding-bottom:8px;font-size:13px;line-height:1.5;color:#222222;"><strong style="color:#2563EB;">02.</strong> Tailored architecture proposal, timeline &amp; estimate</td>
                      </tr>
                      <tr>
                        <td style="font-size:13px;line-height:1.5;color:#222222;"><strong style="color:#10B981;">03.</strong> Quick discovery call to align on milestones and kickoff</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Summary -->
              <div style="font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#6B6B6B;margin-bottom:10px;">Your Submission Summary</div>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #ECE8DF;border-radius:12px;">
                <tr>
                  <td style="padding:11px 16px;border-bottom:1px solid #ECE8DF;width:36%;font-size:12px;font-weight:600;color:#6B6B6B;">Focus Areas</td>
                  <td style="padding:11px 16px;border-bottom:1px solid #ECE8DF;font-size:13px;color:#111111;">${safeTypes}</td>
                </tr>
                <tr>
                  <td style="padding:11px 16px;border-bottom:1px solid #ECE8DF;font-size:12px;font-weight:600;color:#6B6B6B;">Estimated Budget</td>
                  <td style="padding:11px 16px;border-bottom:1px solid #ECE8DF;font-size:13px;color:#111111;">${safeBudget}</td>
                </tr>
                <tr>
                  <td valign="top" style="padding:11px 16px;font-size:12px;font-weight:600;color:#6B6B6B;">Project Brief</td>
                  <td style="padding:11px 16px;font-size:13px;line-height:1.6;color:#222222;">${safeDetails}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 28px;background-color:#FAF8F4;border-top:1px solid #ECE8DF;font-size:12px;line-height:1.6;color:#78716C;">
              Need to add anything? Just reply to this email or write to <a href="mailto:hello@clownbros.com" style="color:#111111;font-weight:600;text-decoration:none;">hello@clownbros.com</a>.<br />
              &copy; ${new Date().getFullYear()} ClownBros Digital Ltd. All rights reserved.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { subject, text, html };
}
