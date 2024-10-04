import nodemailer from "nodemailer";
import { createResetToken } from "@/utils/token";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendVerificationEmail(
  to: string,
  token: string,
  email: string
) {
  const verificationUrl = `${process.env.NEXTAUTH_URL}/verify-email?token=${token}`;

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: to,
    subject: "Verify your email",
    html: `
      <h1>Verify your email</h1>
      <p>Hello ${email}, </p>
      <p>Please click the link below to verify your email:</p>
      <a href="${verificationUrl}">${verificationUrl}</a>
      <p>If you did not request this email, please ignore it.</p>
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

export async function sendEmailChangeVerification(
  email: string,
  token: string
) {
  const verificationLink = `${process.env.NEXTAUTH_URL}/api/profile-change-email-verification?token=${token}`;

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: email,
    subject: "Verify Your New Email Address",
    html: `
      <h1>Email Change Verification</h1>
      <p>Hello,</p>
      <p>You've requested to change your email address. Click the link below to verify your new email address:</p>
      <a href="${verificationLink}">${verificationLink}</a>
      <p>If you didn't request this change, please ignore this email and contact support if you have any concerns.</p>
    `,
  });
}
