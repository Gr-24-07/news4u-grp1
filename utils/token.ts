import crypto from "crypto";
import prisma from "@/lib/db";

const ENCRYPTION_KEY =
  process.env.ENCRYPTION_KEY || crypto.randomBytes(32).toString("hex");
const IV_LENGTH = 16;

// Ensure the key is always 32 bytes (256 bits)
const getKey = () => {
  const key = Buffer.from(ENCRYPTION_KEY, "hex");
  return key.length === 32
    ? key
    : crypto.scryptSync(ENCRYPTION_KEY, "salt", 32);
};

export function generateVerificationToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

export async function createVerificationToken(
  identifier: string
): Promise<string> {
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

export function generateResetToken(email: string): string {
  const iv = crypto.randomBytes(IV_LENGTH);
  const key = getKey();
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  const timestamp = Date.now();
  const encrypted = cipher.update(`${email}|${timestamp}`);
  const finalBuffer = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString("hex") + ":" + finalBuffer.toString("hex");
}

export function validateResetToken(token: string): {
  email: string;
  isValid: boolean;
} {
  try {
    const [ivHex, encryptedHex] = token.split(":");
    const iv = Buffer.from(ivHex, "hex");
    const encrypted = Buffer.from(encryptedHex, "hex");
    const key = getKey();
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    const decrypted = decipher.update(encrypted);
    const finalBuffer = Buffer.concat([decrypted, decipher.final()]);
    const [email, timestamp] = finalBuffer.toString().split("|");
    const isValid = Date.now() - parseInt(timestamp) < 3600000; // Valid for 1 hour
    return { email, isValid };
  } catch (error) {
    console.error("Token validation error:", error);
    return { email: "", isValid: false };
  }
}

export async function createResetToken(email: string): Promise<string> {
  const token = generateResetToken(email);
  const expires = new Date(Date.now() + 3600000); // 1 hour from now

  await prisma.verificationToken.create({
    data: {
      identifier: email,
      token,
      expires,
    },
  });

  return token;
}

export async function validateAndConsumeResetToken(token: string): Promise<{
  email: string;
  isValid: boolean;
}> {
  const { email, isValid } = validateResetToken(token);
  if (!isValid) {
    return { email, isValid: false };
  }

  const storedToken = await prisma.verificationToken.findUnique({
    where: {
      identifier_token: {
        identifier: email,
        token,
      },
    },
  });

  if (!storedToken) {
    return { email, isValid: false };
  }

  // Check if the token has expired
  if (storedToken.expires < new Date()) {
    // Delete expired token
    await prisma.verificationToken.delete({
      where: {
        identifier_token: {
          identifier: email,
          token,
        },
      },
    });
    return { email, isValid: false };
  }

  // Consume the token by deleting it
  await prisma.verificationToken.delete({
    where: {
      identifier_token: {
        identifier: email,
        token,
      },
    },
  });

  return { email, isValid: true };
}
