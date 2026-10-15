const nodemailer = require("nodemailer");

let transporter;

function getRequiredEnv(name) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`${name} is missing from server/.env`);
  }

  return value;
}

function getTransporter() {
  if (transporter) {
    return transporter;
  }

  const host = getRequiredEnv("SMTP_HOST");
  const port = Number(getRequiredEnv("SMTP_PORT"));
  const user = getRequiredEnv("SMTP_USER");
  const pass = getRequiredEnv("SMTP_PASS");

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("SMTP_PORT must be a valid port number.");
  }

  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });

  return transporter;
}

async function sendEmail({ to, subject, text, html }) {
  if (
    typeof to !== "string" ||
    !to.trim() ||
    typeof subject !== "string" ||
    !subject.trim() ||
    (!text && !html)
  ) {
    throw new Error("Recipient, subject, and email content are required.");
  }

  const mailer = getTransporter();
  const from = getRequiredEnv("SMTP_FROM");

  return mailer.sendMail({
    from,
    to: to.trim(),
    subject,
    ...(text ? { text } : {}),
    ...(html ? { html } : {}),
  });
}

module.exports = {
  sendEmail,
};