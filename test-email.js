const fs = require('fs');
const envFile = fs.readFileSync('.env', 'utf8');
const env = {};
envFile.split('\n').forEach(line => {
  const [k, ...v] = line.split('=');
  if(k && v.length) env[k.trim()] = v.join('=').trim().replace(/^\"|\"$/g, '');
});

const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: parseInt(env.SMTP_PORT),
  secure: env.SMTP_SECURE === 'true',
  auth: { user: env.SMTP_USER, pass: env.SMTP_PASS }
});

transporter.sendMail({
  from: env.SMTP_USER,
  to: env.ADMIN_NOTIFICATION_EMAIL,
  subject: 'Test Email Server',
  text: 'Testing SMTP config'
}).then(info => console.log("Success:", info)).catch(err => console.error("Error:", err));
