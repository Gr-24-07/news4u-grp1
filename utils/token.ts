import crypto from 'crypto';
import prisma from '@/lib/db';

export function generateVerificationToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export async function createVerificationToken(identifier: string): Promise<string> {
  const token = generateVerificationToken();
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now

  await prisma.verificationToken.create({
    data: {
      identifier,
      token,
      expires,
    },
  });

  return token;
}

export async function cleanupExpiredTokens(): Promise<void> {
  await prisma.verificationToken.deleteMany({
    where: {
      expires: {
        lt: new Date(),
      },
    },
  });
}