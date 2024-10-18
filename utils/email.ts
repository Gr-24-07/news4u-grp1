import nodemailer from "nodemailer";
import { createResetToken } from "@/utils/token";
import { Subscription } from "@prisma/client";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendEmailChangeVerification(to: string, token: string) {
  const verificationUrl = `${process.env.NEXTAUTH_URL}/verify-email?token=${token}`;

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: to,
    subject: "Verify your new email address",
    html: `
      <h1>Verify your new email address</h1>
      <p>Click the link below to verify your new email address:</p>
      <a href="${verificationUrl}">${verificationUrl}</a>
      <p>If you did not request this change, please ignore this email.</p>
    `,
  });
}

export async function sendPasswordResetEmail(email: string) {
  const token = await createResetToken(email);
  const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Reset Your Password",
    html: `
      <p>You requested a password reset. Click the link below to set a new password:</p>
      <a href="${resetUrl}">${resetUrl}</a>
      <p>If you didn't request this, please ignore this email.</p>
    `,
  });
}

function createAccountDeletionEmail(verificationUrl: string) {
  return {
    subject: "Confirm Account Deletion",
    html: `
      <h1>Confirm Account Deletion</h1>
      <p>We received a request to delete your account. If you did not make this request, please ignore this email.</p>
      <p>If you want to proceed with account deletion, please click the link below:</p>
      <a href="${verificationUrl}">${verificationUrl}</a>
      <p>This link will expire in 1 hour for security reasons.</p>
      <p>If you did not request account deletion, please contact our support team immediately.</p>
    `,
  };
}

export async function sendVerificationEmail(
  to: string,
  token: string,
  email: string,
  isEmailChange: boolean = false,
  isAccountDeletion: boolean = false
) {
  let subject: string;
  let htmlContent: string;
  let verificationUrl: string;

  if (isAccountDeletion) {
    verificationUrl = `${process.env.NEXTAUTH_URL}/api/user/profile-delete-account-verification?token=${token}`;
    const accountDeletionEmail = createAccountDeletionEmail(verificationUrl);
    subject = accountDeletionEmail.subject;
    htmlContent = accountDeletionEmail.html;
  } else if (isEmailChange) {
    subject = "Verify your new email address";
    verificationUrl = `${process.env.NEXTAUTH_URL}/verify-email?token=${token}`;
    htmlContent = `
      <h1>Verify your new email address</h1>
      <p>Click the link below to verify your new email address:</p>
      <a href="${verificationUrl}">${verificationUrl}</a>
      <p>If you did not request this change, please ignore this email.</p>
    `;
  } else {
    subject = "Verify your email";
    verificationUrl = `${process.env.NEXTAUTH_URL}/verify-email?token=${token}`;
    htmlContent = `
      <h1>Verify your email</h1>
      <p>Hello ${email}, </p>
      <p>Please click the link below to verify your email:</p>
      <a href="${verificationUrl}">${verificationUrl}</a>
      <p>If you did not request this email, please ignore it.</p>
    `;
  }

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: to,
    subject: subject,
    html: htmlContent,
  });
}

export async function sendSubConfirmation(email: string, sub: Subscription) {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Subscription Purchase Confirmation",
    html: `
    <h1>You are now subscribed to News4U</h1>
    <p>Manage your subscription in your profile page</p>
    <p>Your subscription expires ${sub.expiresAt.toLocaleString("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
      minute: "2-digit",
      hour: "2-digit",
    })}</p>
  `,
  });
}

export async function sendAccountDeletionVerification(
  to: string,
  token: string
) {
  const verificationUrl = `${process.env.NEXTAUTH_URL}/api/user/profile-delete-account-verification?token=${token}`;
  const { subject, html } = createAccountDeletionEmail(verificationUrl);

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: to,
    subject: subject,
    html: html,
  });
}
